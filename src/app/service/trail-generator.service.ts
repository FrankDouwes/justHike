import {Injectable} from '@angular/core';
import * as geolib from 'geolib';
import {OHLC} from '../type/ohlc';
import {Waypoint} from '../type/waypoint';
import {Mile} from '../type/mile';
import {Poi} from '../type/poi';
import {Trail, TrailMeta} from '../type/trail';
import {environment} from '../../environments/environment.prod';
import {LoaderService} from './loader.service';
import {getPoiTypeByType} from '../_util/poi';
import {cloneData, sortByKey} from '../_util/generic';
import {calculateDistance, Distance} from '../_util/geolib/distance';
import {pointArrayTypeConversion, waypointToLatLng, waypointToWaypoint} from '../_util/leaflet/converter';
import {getClosestPointOnLine} from '../_util/math';
import PositionAsDecimal = geolib.PositionAsDecimal;
import {Town} from '../type/town';
import {calculateOHLC} from '../_util/trail';
import latitude = geolib.latitude;
import longitude = geolib.longitude;

@Injectable({
  providedIn: 'root'
})

// TODO: generating multiple trails causes enormous slowdown in poiToMiles, I'm assuming I'm not clearing something...
export class TrailGeneratorService {

  public flatTrailData: Array<Waypoint>;              // the loaded raw waypoints
  private _trailData: Trail;

  private _mileCenterpointTree: Array<Array<Waypoint>>;

  constructor(
    private _loaderService: LoaderService,
  ) {}


  public setTrailData(data: Trail) {
    this._trailData = data;
  }

  public getTrailData(): Trail {
    return this._trailData;
  }

  public findNearestTown(waypoint: Waypoint, returnTown: boolean = false): Town | Distance {

    if (this._trailData.towns) {

      const _length = this._trailData.towns.length;
      const _townWaypoints: Array<any> = [];

      for (let t = 0; t < _length; t++) {
        const _town: Town = this._trailData.towns[t];
        _townWaypoints.push(_town.waypoint);
      }

      const _nearest: Array<any> = geolib.orderByDistance(waypoint, _townWaypoints)

      if (returnTown) {
        return this._trailData.towns[_nearest[0].key];
      } else {
        return _nearest[0];
      }
    } else {
      console.log('no towns for this trail');
      return;
    }
  }

  public getTrailVersion(): string {
    return this._trailData.version;
  }

  public getPoiById(id: number): Poi {
    return this._trailData.pois[id];
  }

  public getTownById(id: number): Town {
    return this._trailData.towns[id];
  }

  public calcDistanceFlat(p1: any, p2: any): number {
    return geolib.getDistance(
      {latitude: p1.latitude, longitude: p1.longitude} as geolib.PositionAsDecimal,
      {latitude: p2.latitude, longitude: p2.longitude} as geolib.PositionAsDecimal
      , 0, 4);
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
  public generateMiles(trail: TrailMeta, waypoints: Array<Waypoint>, pois: Array<Poi>, direction: number, towns?: Array<Town>): Trail {

    this._trailData = cloneData(trail) as Trail;
    this._trailData.version = trail.trailVersion;

    // remove unneeded trail meta
    delete this._trailData['trailVersion'];
    delete this._trailData['tilesVersion'];
    delete this._trailData['snowVersion'];
    delete this._trailData['dataPath'];
    delete this._trailData['dataPath'];
    delete this._trailData['waypointsPerMile'];

    this._trailData.direction = direction;

    this._trailData.pois = pois;

    // 1. optimise waypoints
    // const _optimisedWaypoints: Array<Waypoint> = this.simplify(waypoints, this._tolerance);
    this.flatTrailData = pointArrayTypeConversion(waypoints, 'waypoint', 'waypoint');

    this._loaderService.showMessage('optimised waypoints');

    // 2. calculate trail properties
    const flatPoints: Array<object> = [];

    // remove elevation, causes errors
    for (let i = 0; i < this.flatTrailData.length; i++) {
      flatPoints.push({latitude: this.flatTrailData[i].latitude, longitude: this.flatTrailData[i].longitude});
    }

    this._trailData.calcLength = geolib.getPathLength(flatPoints as Array<PositionAsDecimal>) / environment.MILE;
    this._trailData.scale = (this._trailData.length / this._trailData.calcLength);
    this._trailData.elevationRange = calculateOHLC(this.flatTrailData, {start: 0, end: waypoints.length - 1});

    this._loaderService.showMessage('calculated trail properties');

    // 3. split waypoints into miles
    this._trailData.miles = this._createMiles(this.flatTrailData);

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

    // 5. Towns
    this._trailData.towns = this._calculateTownsAnchorPoints(towns);
    // todo: add pois to towns

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
  private _createMiles(waypoints: Array<Waypoint>): Array<Mile> {

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


      // elevation
      if (!_waypoint.elevation) {
        _waypoint.elevation = 0;
      }

      _waypoint.elevation = _waypoint.elevation / environment.FOOT;

      let _elevationChange = 0;

      // calucalte distance between points
      if (_prevPoint) {

        _distance = _waypoint.distanceTotal - _prevPoint.distanceTotal;

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
          centerpoint:      waypointToWaypoint(geolib.getCenter(_mileWaypoints)),
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
  and what the closest waypoint is. */
  public createMileTree(waypoints: Array<Waypoint>): void {
    this._mileCenterpointTree = this._createWaypointTree(waypoints);
  }

  /* create data tree, a sorting mechanism to quickly figure out where a waypoint is in relationship to a tree of waypoints.
  TODO: research optimal algo, someone smart probably made something for this. */
  private _createWaypointTree(startData: Array<Waypoint>, returnArray?: Array<any>): any {

    const resultArray: Array<Waypoint> = [];
    const _length = startData.length;

    for (let i = 0; i < _length; i += 2) {

      let _data: Waypoint;

      if (!startData[i + 1]) {
        _data = startData[i];
      } else {
        _data = geolib.getCenter([startData[i], startData[i + 1]]);
      }

      resultArray.push(_data);
    }

    if (returnArray) {
      returnArray.unshift(resultArray);
    } else {
      returnArray = [resultArray, startData];
    }

    if (resultArray.length > 2) {
      return this._createWaypointTree(resultArray, returnArray);
    } else {
      return returnArray;
    }
  }

  // this should loop
  // TODO: extend geolib.orderByDistance() to include a range within an array, that way I wont have to lookup indexOf(). optimisation!
  private _findNearestWaypointInTree(location: Waypoint, waypointTree: Array<Array<Waypoint>>, branch?: number, index?: number): Array<Distance> {

    branch = (branch) ? branch : 0;
    index = (index) ? index : 0;

    const _multiplier = branch;

    const _waypointBranch: Array<Waypoint> = waypointTree[branch];

    const _startIndex = ((index * 2) - _multiplier > 0) ? (index * 2) - _multiplier : 0;
    const _endIndex = ((index * 2) + _multiplier < waypointTree[branch].length - 1 && (index * 2) + _multiplier > 1) ? (index * 2) + _multiplier : waypointTree[branch].length - 1;

    const _waypointSelection: Array<Waypoint> = _waypointBranch.slice(_startIndex, _endIndex + 1);

    let _orderedWaypoints: Array<Distance> = geolib.orderByDistance(location, _waypointSelection) as Array<Distance>;

    if (branch !== waypointTree.length - 1 && _orderedWaypoints.length > 1) {

      // loop
      branch ++;
      return this._findNearestWaypointInTree(location, waypointTree, branch, _startIndex + _waypointSelection.indexOf(_waypointSelection[_orderedWaypoints[0].key]));

    } else {

      // get the 3 nearest
      _orderedWaypoints = _orderedWaypoints.slice(0,3);

      // fix indexes
      _orderedWaypoints.forEach(function(d: Distance) {
        d.key = _startIndex + _waypointSelection.indexOf(_waypointSelection[d.key]);
      });

      return _orderedWaypoints;
    }
  }

  /* parses nearest 3 miles, sorts the reulting top 2 waypoints for each mile by distance
  returns 1 of 2 nearest points (in nearest mile) */
  public findNearestPointInMileTree(location: Waypoint, count: number = 1): Array<any> {

    const _nearestMiles: Array<any> = this._findNearestWaypointInTree(location, this._mileCenterpointTree);
    let _nearestPoints: Array<any> = [];
    const _nearestMileNearestPoints: Array<any> = [];

    const _mLength = _nearestMiles.length;
    for (let i = 0; i < _mLength; i++) {

      const _mile = this._trailData.miles[_nearestMiles[i].key];
      const _nearestWaypoints: Array<Distance> = this.findNearestWaypointInMile(location, _mile);

      // limit to 2 for faster sorting (as we only really need 2
      const _selection: Array<Distance> = _nearestWaypoints.slice(0, 2);
      for (let j = 0 ; j < _selection.length; j++) {
        _selection[j].belongsTo = _nearestMiles[i].key;
      }

      _nearestPoints = _nearestPoints.concat(_selection);
    }

    _nearestPoints = sortByKey(_nearestPoints, 'distance');

    _nearestPoints.filter(function(point) {
      return point.belongsTo === _nearestPoints[0].belongsTo;
    }).map(function(point) {
      _nearestMileNearestPoints.push(point);
    });

    return _nearestMileNearestPoints.slice(0, count + 1);
  }

  // Get the nearest point (this simply sorts a miles waypoints on distance and returns an array.
  // Not very efficient for larger data sets.
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

      // fix string points
      _poi.waypoint = waypointToWaypoint(_poi.waypoint);

      _poi.id = p; // to prevent mismatching ids in raw data

      _self._loaderService.showMessage('linking pois to miles:' + _poi.id);
      console.log('linking pois to miles:' + _poi.id + ' of ' + (_poisLength - 1));

      _poi.waypoint.elevation = _poi.waypoint.elevation / environment.FOOT;

      // get nearest point from 3 miles to fix potentially odd trail shape (loops and traverses)
      const _nearestMileWaypoints: any = _self.findNearestPointInMileTree({latitude: _poi.waypoint.latitude, longitude: _poi.waypoint.longitude} as Waypoint, 2);
      const _nearestMile = this._trailData.miles[_nearestMileWaypoints[0].belongsTo];

      const _anchorData = _self._anchorDistanceCalculation(_poi.waypoint, _nearestMile, _nearestMileWaypoints);

      _poi.anchorPoint = _anchorData['anchorPoint'];
      _poi.belongsTo = _nearestMile.id;
      _poi.belongsToType = 'trail';

      // setup poi reference in waypoint
      if (!_anchorData['nearestWaypoint'].nearestToPois) {
        _anchorData['nearestWaypoint'].nearestToPois = [];
      }
      _anchorData['nearestWaypoint'].nearestToPois.push(_poi.id);

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

  // TODO: needs a routine for multiple anchorpoints per town (as towns can be accessible from multiple locations)
  private _calculateTownsAnchorPoints(towns: Array<Town>): Array<Town> {

    if (!towns) {
      return;
    }

    const _length = towns.length;

    for (let t = 0; t < _length; t++) {
      const _town: Town = towns[t];

      // fix elevation
      if (!_town.waypoint.elevation) {
        _town.waypoint.elevation = 0;
      }

      let _nearestMileWaypoints;

      if (!_town.anchorPoint) {
        _nearestMileWaypoints = this.findNearestPointInMileTree(_town.waypoint, 2);
      } else {
        _nearestMileWaypoints = this.findNearestPointInMileTree(_town.anchorPoint as Waypoint, 2);
      }

      // link towns to nearest mile
      const _nearestMile: Mile = this._trailData.miles[_nearestMileWaypoints[0].belongsTo];
      if (!_nearestMile.towns) {
        _nearestMile.towns = [];
      }
      _nearestMile.towns.push(_town.id);

      // add/fix anchorpoint to be on trail
      const _anchorData = this._anchorDistanceCalculation(_town.waypoint, _nearestMile, _nearestMileWaypoints);

      _town.waypoint.distance = _anchorData['distance'];
      _town.anchorPoint = _anchorData['anchorPoint'];
      _town.belongsTo = _nearestMile.id;
    }

    return towns;
  }

  // distance calculation
  private _anchorDistanceCalculation(location: Waypoint, nearestMile: Mile, nearestWaypoints: object): object {

    // console.log(location, nearestMile, nearestWaypoints);

    const _nearestWaypoint = nearestMile.waypoints[nearestWaypoints[0].key];
    const _2ndNearestWaypoint = nearestMile.waypoints[nearestWaypoints[1].key];

    // create an anchor waypoint (an on trail point nearest to the poi (simple triangulation)
    const _diffDistPercentage = (nearestWaypoints[0].distance / nearestWaypoints[1].distance);
    const _lat = _nearestWaypoint.latitude + (((_2ndNearestWaypoint.latitude - _nearestWaypoint.latitude) * _diffDistPercentage) || 0);
    const _lon = _nearestWaypoint.longitude + (((_2ndNearestWaypoint.longitude - _nearestWaypoint.longitude) * _diffDistPercentage) || 0);
    const _ele = _nearestWaypoint.elevation + (((_2ndNearestWaypoint.elevation - _nearestWaypoint.elevation) * _diffDistPercentage) || 0);
    const _dist = _nearestWaypoint.distance + (((_2ndNearestWaypoint.distance - _nearestWaypoint.distance) * _diffDistPercentage) || 0);
    const _distT = _nearestWaypoint.distanceTotal + (((_2ndNearestWaypoint.distanceTotal - _nearestWaypoint.distanceTotal) * _diffDistPercentage) || 0);

    // console.log({latitude: _lat, longitude: _lon}, {latitude: location.latitude, longitude: location.longitude});

    // return data
    return {
      anchorPoint: {latitude: _lat, longitude: _lon, elevation: _ele, distance: _dist, distanceTotal: _distT},
      nearestWaypoint: _nearestWaypoint,
      distance: calculateDistance({latitude: _lat, longitude: _lon}, {latitude: location.latitude, longitude: location.longitude})
    };
  }

  // simplify an array of data points using 2 methods (radial distance and the douglas peucker alg.)
  public simplify(points: Array<Waypoint>, tolerance: number, highestQuality: boolean = true): Array<any> {

    const sqTolerance: number = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? this._simplifyRadialDistance(points, sqTolerance) : points;
    points = this._simplifyDouglasPeucker(points, sqTolerance);

    return points;
  }

  // basic distance-based simplification
  private _simplifyRadialDistance(points, sqTolerance): Array<Waypoint> {

    let prevPoint: Waypoint = this._castAsNumbers(points[0]);
    const newPoints: Array<Waypoint> = [prevPoint];
    let point: Waypoint;

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

  private _castAsNumbers(point: object): Waypoint {
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
      dz: number = (p1.elevation - p2.elevation) || 0;

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
}
