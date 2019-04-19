import {Injectable} from '@angular/core';
import * as GeoLib from 'geolib';
import {OHLC, calculateOHLC} from '../type/ohlc';
import {Waypoint} from '../type/waypoint';
import {Mile} from '../type/mile';
import {Poi} from '../type/poi';
import {Trail, TrailMeta} from '../type/trail';
import {environment} from '../../environments/environment.prod';
import {LoaderService} from './loader.service';

import PositionAsDecimal = geolib.PositionAsDecimal;
import {getPoiTypeByType} from '../_util/poi';
import {cloneData, sortByKey} from '../_util/generic';
import {Distance} from '../_util/geolib/distance';

@Injectable({
  providedIn: 'root'
})

export class TrailGeneratorService {

  public flatTrailData: any;

  private _trailData: Trail;

  private _tolerance = 0.0001;
  private _tree: Array<Array<Waypoint>>;

  constructor(
    private _loaderService: LoaderService,
  ) {}


  public setTrailData(data: Trail) {
    this._trailData = data;
  }

  public getTrailData(): Trail {
    return this._trailData;
  }

  public getTrailVersion(): string {
    return this._trailData.version;
  }

  public getPoiById(id: number): Poi {
    return this._trailData.pois[id];
  }

  public calcDistanceFlat(p1: any, p2: any): number {
    return geolib.getDistance(
      {latitude: p1.latitude, longitude: p1.longitude} as geolib.PositionAsDecimal,
      {latitude: p2.latitude, longitude: p2.longitude} as geolib.PositionAsDecimal
    );
  }

  public getPoisByIds(ids: Array<number>): Array<Poi> {

    const _self = this;
    const _result: Array<Poi> = [];

    ids.forEach(function(id) {
      _result.push(_self.getPoiById(id));
    });

    return _result;
  }

  // called to generate new trail data files (json), only used by admin, not for users)
  // TODO: move this to a webworker, not a priority as it's rarely used (trail data won't update often)
  public generateMiles(trail: TrailMeta, waypoints: Array<Waypoint>, pois: Array<Poi>, direction: number): Trail {

    this._trailData = cloneData(trail) as Trail;
    this._trailData.version = trail.trailVersion;

    // remove unneeded trail meta
    delete this._trailData['trailVersion'];
    delete this._trailData['tilesVersion'];
    delete this._trailData['snowVersion'];
    delete this._trailData['dataPath'];

    this._trailData.direction = direction;

    // // sobo reversal
    if (direction === 1) {
      waypoints.reverse();
      pois.reverse();
    }

    this._trailData.pois = pois;

    // 1. optimise waypoints
    const _optimisedWaypoints: Array<Waypoint> = this.simplify(waypoints, this._tolerance);
    this.flatTrailData = _optimisedWaypoints;

    this._loaderService.showMessage('optimised waypoints');

    // 2. calculate trail properties
    const flatPoints: Array<object> = [];

    // remove elevation, causes errors
    for (let i = 0; i < _optimisedWaypoints.length; i++) {
      flatPoints.push({latitude: _optimisedWaypoints[i].latitude, longitude: _optimisedWaypoints[i].longitude});
    }

    this._trailData.calcLength = geolib.getPathLength(flatPoints as Array<PositionAsDecimal>) / environment.MILE;
    this._trailData.scale = (this._trailData.length / this._trailData.calcLength);
    this._trailData.elevationRange = calculateOHLC(_optimisedWaypoints, {start: 0, end: waypoints.length - 1});

    this._loaderService.showMessage('calculated trail properties');

    // 3. split waypoints into miles
    this._trailData.miles = this._createMiles(_optimisedWaypoints, this._trailData.scale);

    this._loaderService.showMessage('created miles');

    // 4a. generate waypoint tree for easy lookups
    const flatMileCoordinates: Array<Waypoint> = this._trailData.miles.map(function(elem) {
        return elem.centerpoint as Waypoint;
      }
    );

    // create a tree structure to quickly find nearest mile (for Geolocating)
    this.createMileTree(flatMileCoordinates);

    this._loaderService.showMessage('created mile tree');

    // 4b. link pois to trail waypoints
    this._trailData.sortedPoiIds = {};

    if (pois) {
      this._linkPoisToMiles(pois, this._trailData.miles);
      this._loaderService.showMessage('linked pois to miles');
    } else {
      this._loaderService.showMessage('no pois');
    }

    console.log(this._trailData);

    return this._trailData;
  }

  // create overlapping miles (first/last waypoint overlap, insert 2 new points at 0 & 100%
  // input:     x *--------------------------------------* x             (flat array with lon/lat/elevation points
  // output:    x                                                        (arr)
  //              */------/*                                                  (mile)
  //                    */------/*                                            (mile)
  //                          */------/*                                      (mile)
  //                                */------/*                                (mile)
  //                                      */------/*                          (mile)
  //                                            */------/*                    (mile)
  //                                                       x             (/arr)

  private _createMiles(waypoints: Array<object>, scale: number): Array<Mile> {

    this._loaderService.showMessage('create miles');

    const _miles:           Array<Mile>     = [];

    let _prevPoint:         Waypoint;
    let _prevOffset         = 0;

    // distances
    let _distance           = 0;
    let _bridgedDistance    = 0;
    let _totalDistance      = 0;

    // elevation gain
    let _totalGain          = 0;
    let _totalLoss          = 0;

    // mile waypoints
    const _mileWaypoints:   Array<Waypoint> = [];
    let _poisWaypoints:   Array<Waypoint> = []; // for ohlc

    const _wayPointsLength: number          = waypoints.length;      // faster.

    for (let i = 0; i < _wayPointsLength; i++) {

      const _waypoint: Waypoint = waypoints[i] as Waypoint;

      if (!_waypoint.elevation) {
        _waypoint.elevation = 0;
      }

      _waypoint.elevation = _waypoint.elevation / environment.FOOT;

      let _elevationChange = 0;

      // calucalte distance between points
      if (_prevPoint) {

        _distance = geolib.getDistance(
          {latitude: _prevPoint.latitude, longitude: _prevPoint.longitude},
          {latitude: _waypoint.latitude, longitude: _waypoint.longitude}
        );

        _distance = _distance * scale;

        _totalDistance += _distance;
        _bridgedDistance += _distance;

        // calculate elevation gain/loss
        _elevationChange = _waypoint.elevation - _prevPoint.elevation;
        if (_elevationChange > 0) {
          _totalGain += _elevationChange;
        } else {
          _totalLoss += Math.abs(_elevationChange);
        }
      }

      _waypoint.distance = _totalDistance - (_miles.length * environment.MILE);     // the mile distance
      _waypoint.distanceTotal = _totalDistance;                                     // the total distance = NOBO

      _mileWaypoints.push(_waypoint);

      // if a distance of 1 mile+ has been bridged, or end of waypoints reached
      if (_bridgedDistance > environment.MILE || waypoints.length - 1 === i) {

        const _combinedWaypoints: Array<Waypoint> = (_poisWaypoints.length > 0) ? _mileWaypoints.concat(_poisWaypoints) : _mileWaypoints;

        const _combinedOhlc: OHLC = calculateOHLC(_combinedWaypoints, {start: 0, end: _combinedWaypoints.length});

        // set data
        _miles.push({
          id:               _miles.length + 1,
          elevationRange:   _combinedOhlc,
          waypoints:        cloneData(_mileWaypoints) as Array<Waypoint>,
          elevationGain:    Math.round(_totalGain),
          elevationLoss:    Math.round(_totalLoss),
          scale:            scale,
          centerpoint:      geolib.getCenter(_mileWaypoints),
          isCurrent:        false,
          hasMajorPoi:      false,
          hasMinorPoi:      false,
          poiTypes:         {}
        });

        // clear data
        _bridgedDistance -= environment.MILE;
        _totalGain = _totalLoss = 0;
        _mileWaypoints.splice(0, _mileWaypoints.length - 2);    // keep last 2
        _poisWaypoints = [];
        // _hasEscape = _hasCamp = _hasOther = false;

        // adjust offset for the last 2 (which are now the first 2)
        for (const wp of _mileWaypoints) {
          wp.distance -= environment.MILE;
        }
      }

      // set the previous point for next distance calc.
      _prevPoint = _waypoint;
      _prevOffset = _distance;

    }

    return _miles;
  }

  /* create data tree, a sorting mechanism to quickly figure out where the user is in relation to the trail,
  and what the closest waypoint it. TODO: research optimal algo, someone smart probably made something for this. */
  public createMileTree(startData: Array<Waypoint>, returnArray?: Array<Array<Waypoint>>): void {

    if (!returnArray) {
      this._tree = [startData];
      this._loaderService.showMessage('create mile tree');
    }


    const resultArray: Array<Waypoint> = [];

    for (let i = 0; i < startData.length; i += 2) {

      let _data: Waypoint;

      if (!startData[i + 1]) {
        _data = startData[i] as Waypoint;
      } else {
        _data = geolib.getCenter([startData[i], startData[i + 1]]) as Waypoint;
      }

      resultArray.push(_data);
    }

    this._tree.unshift(resultArray);

    if (resultArray.length > 2) {
      this.createMileTree(resultArray, this._tree);
    }
  }

  /* parses nearest 3 miles, sorts the reulting top 2 waypoints for each mile by distance
  returns 1 of 2 nearest points (in nearest mile) */
  public findNearestPointInMileTree(location: Waypoint, count: number = 1): Array<any> {

    let _nearestMiles: Array<any> = [];
    let _nearestPoints: Array<any> = [];
    const _nearestMileNearestPoints: Array<any> = [];

    for (let i = 0; i < this._tree.length; i ++) {

      const _orderedWaypoints: Array<Distance> = geolib.orderByDistance(location, this._tree[i]);

      if (i === this._tree.length - 1) {
        _nearestMiles = _orderedWaypoints.slice(0,3);
      }
    }

    const _mLength = _nearestMiles.length;
    for (let i = 0; i < _mLength; i++) {

      const _mile = this._trailData.miles[_nearestMiles[i].key];
      const _nearestWaypoints: Array<Distance> = this.findNearestWaypointInMile(location, _mile);

      // limit to 2 for faster sorting (as we only really need 2
      const _selection: Array<Distance> = _nearestWaypoints.splice(0, 2);
      for (let j = 0 ; j < _selection.length; j++) {
        _selection[j].belongsTo = _nearestMiles[i].key;
      }

      _nearestPoints = _nearestPoints.concat(_selection);
    }

    _nearestPoints = sortByKey(_nearestPoints, 'distance');

    _nearestPoints.filter(function(point) {
      return point.belongsTo === _nearestPoints[0].belongsTo
    }).map(function(point) {
      _nearestMileNearestPoints.push(point);
    });

    console.log(_nearestMileNearestPoints);
    return _nearestMileNearestPoints.slice(0, count + 1);
  }

  // get the nearest point
  public findNearestWaypointInMile(waypoint: Waypoint, nearestMile: Mile): Array<Distance> {

    return geolib.orderByDistance({latitude: waypoint.latitude, longitude: waypoint.longitude} as geolib.PositionAsDecimal,
      nearestMile.waypoints);
  }

  // links points of interest to miles, this is a slow loop
  private _linkPoisToMiles(pois: Array<Poi>, miles: Array<Mile>): void {

    const _self = this;

    this._loaderService.showMessage('linking pois to miles');

    const _poisLength = pois.length;
    for (let p = 0; p < _poisLength; p++) {

      const _poi = pois[p];

      _poi.id = p; // to prevent mismatching ids in raw data

      _self._loaderService.showMessage('linking pois to miles:' + _poi.id);

      _poi.waypoint.elevation = _poi.waypoint.elevation / environment.FOOT;

      // get nearest point from 3 miles to fix potentially odd trail shape (loops and traverses)
      const _nearestMileWaypoints: any = _self.findNearestPointInMileTree({latitude: _poi.waypoint.latitude, longitude: _poi.waypoint.longitude} as Waypoint, 2);
      const _nearestMile = this._trailData.miles[_nearestMileWaypoints[0].belongsTo];

      const _anchorData = _self._anchorDistanceCalculation(_poi.waypoint, _nearestMile, _nearestMileWaypoints);

      _poi.anchorPoint = _anchorData.anchorPoint;
      _poi.belongsTo = _nearestMile.id;

      // setup poi reference in waypoint
      if (!_anchorData.nearestWaypoint.nearestToPois) {
        _anchorData.nearestWaypoint.nearestToPois = [];
      }
      _anchorData.nearestWaypoint.nearestToPois.push(_poi.id);

      // the distance of poi from trail
      _poi.waypoint.distance = _nearestMileWaypoints[0].distance;

      // add poi to mile
      if (!_nearestMile.pois) {
        _nearestMile.pois = [];
      }

      _nearestMile.pois.push(_poi.id);


      // set poi types for current mile, so it's clear what kind of poi a mile has in it
      // differentiates between major and minor poi (major are the ones possibly shown on elevation profile
      // sets a flag for each poi type in 'poiTypes' property
      const _curPoiTypes: Array<string> = String(_poi.type).split(', ');

      const _poiTypesLength = _curPoiTypes.length;
      for (let t = 0; t < _poiTypesLength; t++) {

        const _type = _curPoiTypes[t];

        // create arrays for each type
        if (!_self._trailData.sortedPoiIds.hasOwnProperty(_type)) {
          _self._trailData.sortedPoiIds[_type] = [];
        }
        _self._trailData.sortedPoiIds[_type].push(_poi.id);

        _nearestMile.poiTypes[_type + ''] = true;

        // identify major/minor poi per mile
        if (getPoiTypeByType(_type) && getPoiTypeByType(_type).isMajor) {
          _nearestMile.hasMajorPoi = true;
        } else {
          _nearestMile.hasMinorPoi = true;
        }
      }

      if (_nearestMile.hasMajorPoi) {
        // refactor ohlc if needed
        if (_nearestMile.elevationRange.high < _poi.waypoint.elevation) {
          _nearestMile.elevationRange.high = _poi.waypoint.elevation;
        } else if (_nearestMile.elevationRange.low > _poi.waypoint.elevation) {
          _nearestMile.elevationRange.low = _poi.waypoint.elevation;
        }
      }
    }
  }

  // distance calculation
  private _anchorDistanceCalculation(location: Waypoint, nearestMile: Mile, nearestWaypoints: object) {

    const _nearestWaypoint = nearestMile.waypoints[nearestWaypoints[0].key];
    const _2ndNearestWaypoint = nearestMile.waypoints[nearestWaypoints[1].key];

    // create an anchor waypoint (an on trail point nearest to the poi (simple triangulation)
    const _diffDistPercentage = (nearestWaypoints[0].distance / nearestWaypoints[1].distance);
    const _lat = _nearestWaypoint.latitude + ((_2ndNearestWaypoint.latitude - _nearestWaypoint.latitude) * _diffDistPercentage);
    const _lon = _nearestWaypoint.longitude + ((_2ndNearestWaypoint.longitude - _nearestWaypoint.longitude) * _diffDistPercentage);
    const _ele = _nearestWaypoint.elevation + ((_2ndNearestWaypoint.elevation - _nearestWaypoint.elevation) * _diffDistPercentage);
    const _dist = _nearestWaypoint.distance + ((_2ndNearestWaypoint.distance - _nearestWaypoint.distance) * _diffDistPercentage);
    const _distT = _nearestWaypoint.distanceTotal + ((_2ndNearestWaypoint.distanceTotal - _nearestWaypoint.distanceTotal) * _diffDistPercentage);

    // return data
    return {
      anchorPoint: {latitude: _lat, longitude: _lon, elevation: _ele, distance: _dist, distanceTotal: _distT},
      nearestWaypoint: _nearestWaypoint,
      distance: geolib.getDistance(
        {latitude: _lat, longitude: _lon} as geolib.PositionAsDecimal,
        {latitude: location.latitude, longitude: location.longitude} as geolib.PositionAsDecimal
      )
    };
  }

  // simplify an array of data points using 2 methods (radial distance and the douglas peucker alg.)
  public simplify(points: Array<any>, tolerance: number, highestQuality: boolean = true): Array<any> {

    const originalPointCount: number = points.length;
    const sqTolerance: number = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? this._simplifyRadialDistance(points, sqTolerance) : points;
    points = this._simplifyDouglasPeucker(points, sqTolerance);

    // console.log('simplified from: ' + originalPointCount + ' to ' + points.length + ' data points');

    return points;
  }

  // basic distance-based simplification
  private _simplifyRadialDistance(points, sqTolerance) {

    let prevPoint: object = this._castAsNumbers(points[0]);
    const newPoints: Array<object> = [prevPoint];
    let point: object;

    for (let i = 1, len = points.length; i < len; i++) {
      // cast as number
      point = this._castAsNumbers(points[i]);
      if (this._getSquareDistance(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }

    if (prevPoint !== point) {
      newPoints.push(point);
    }

    return newPoints;
  }

  private _castAsNumbers(point: object) {
    return {longitude: Number(point['longitude']), latitude: Number(point['latitude']), elevation: Number(point['elevation'])};
  }

  // simplification using optimized Douglas-Peucker algorithm with recursion elimination
  private _simplifyDouglasPeucker(points, sqTolerance) {

    let len = points.length,
      MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
      markers = new MarkerArray(len),

      first = 0,
      last = len - 1,

      stack = [],
      newPoints = [],

      i, maxSqDist, sqDist, index;

    markers[first] = markers[last] = 1;

    while (last) {

      maxSqDist = 0;

      for (i = first + 1; i < last; i++) {

        sqDist = this._getSquareSegmentDistance(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
          index = i;
          maxSqDist = sqDist;
        }
      }

      if (maxSqDist > sqTolerance) {
        markers[index] = 1;
        stack.push(first, index, index, last);
      }

      last = stack.pop();
      first = stack.pop();
    }

    for (i = 0; i < len; i++) {
      if (markers[i]) {
        newPoints.push(points[i]);
      }
    }

    return newPoints;
  }



  /*
   (c) 2013, Vladimir Agafonkin
   Simplify.js, a high-performance JS polyline simplification library
   mourner.github.io/simplify-js
  */

  // square distance between 2 points
  private _getSquareDistance(p1, p2) {

    const dx: number = p1.latitude - p2.latitude,
      dy: number = p1.longitude - p2.longitude,
      dz: number = p1.elevation - p2.elevation;

    return dx * dx + dy * dy + dz * dz;
  }

  // square distance from a point to a segment
  private _getSquareSegmentDistance(p, p1, p2) {

    let x: number = p1.latitude,
      y: number = p1.longitude,
      z: number = p1.elevation,

      dx: number = p2.latitude - x,
      dy: number = p2.longitude - y,
      dz: number = p2.elevation - z;

    if (dx !== 0 || dy !== 0 || dz !== 0) {

      const t = ((p.latitude - x) * dx + (p.longitude - y) * dy + (p.elevation - z) * dz) /
        (dx * dx + dy * dy + dz * dz);

      if (t > 1) {
        x = p2.latitude;
        y = p2.longitude;
        z = p2.elevation;

      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p.latitude - x;
    dy = p.longitude - y;
    dz = p.elevation - z;

    return dx * dx + dy * dy + dz * dz;
  }

  public toMile(number: number): number {
    return number / environment.MILE;
  }

}
