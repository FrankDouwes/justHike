import { Injectable } from '@angular/core';
import * as GeoLib from 'geolib';
import { OHLC, calculateOHLC } from '../type/ohlc';
import { Waypoint } from '../type/waypoint';
import { Mile } from '../type/mile';
import { Poi } from '../type/poi';
import { Trail } from '../type/trail';
import { environment } from '../../environments/environment.prod';
import { isDevMode } from '@angular/core';
import { LoaderService } from './loader.service';
import { LocalStorageService } from 'ngx-webstorage';
import { saveFileAs } from '../_util/save';

import PositionAsDecimal = geolib.PositionAsDecimal;

@Injectable({
  providedIn: 'root'
})
export class TrailGeneratorService {

  public trailData: Trail;

  private _tolerance = 0.0001;
  private _tree: Array<Array<Waypoint>>;

  constructor(
    private _loaderService: LoaderService,
    private _localStorage: LocalStorageService
  ) { }


  public generateMiles(trail: Trail, waypoints: Array<Waypoint>, pois: Array<Poi>, direction: number): Trail {

    this.trailData = trail;

    trail.direction = direction;
    // // sobo reversal
    if (direction === 1) {
      waypoints.reverse();
      pois.reverse();
    }

    // 1. optimise waypoints
    const _optimisedWaypoints: Array<Waypoint> = this._simplify(waypoints, this._tolerance);
    trail.waypoints = _optimisedWaypoints;

    this._loaderService.showMessage('optimised waypoints');

    // 2. calculate trail properties
    const flatPoints: Array<object> = [];

    // remove elevation, causes errors
    for (let i = 0; i < _optimisedWaypoints.length; i++) {
      flatPoints.push({latitude: _optimisedWaypoints[i].latitude, longitude: _optimisedWaypoints[i].longitude});
    }

    trail.calcLength = geolib.getPathLength(flatPoints as Array<PositionAsDecimal>) / environment.MILE;
    trail.scale = (trail.length / trail.calcLength);
    trail.elevationRange = calculateOHLC(trail.waypoints, {start: 0, end: waypoints.length - 1});

    this._loaderService.showMessage('calculated trail properties');

    // 3. split waypoints into miles
    trail.miles = this._createMiles(_optimisedWaypoints, pois, trail.scale);

    this._loaderService.showMessage('created miles');

    // 4a. generate waypoint tree for easy lookups
    const flatMileCoordinates: Array<Waypoint> = trail.miles.map(function(elem) {
        return elem.centerpoint as Waypoint;
      }
    );

    this.createMileTree(flatMileCoordinates);

    this._loaderService.showMessage('created mile tree');

    // 4b. link pois to trail waypoints
    trail.waterSources = [];
    this._linkPoisToMiles(pois, trail.miles);

    this._loaderService.showMessage('linked pois to miles');

    this.trailData = trail;

    if (isDevMode() && environment.dowloadParsedData) {
      const _direction: string = (direction === 0) ? 'nobo' : 'sobo';
      saveFileAs(trail, this.trailData.abbr + '-trail-' + _direction + '.json');
      this._loaderService.showMessage('downloaded file');
    }

    return trail;
  }

  // create overlapping miles (first/last waypoint overlap, insert 2 new points at 0 & 100%
  // input:     x *------------------------------------* x               (flat array with lon/lat/elevation points
  // output:    x                                                        (arr)
  //              */------/*                                                  (mile)
  //                    */------/*                                            (mile)
  //                          */------/*                                      (mile)
  //                                */------/*                                (mile)
  //                                      */------/*                          (mile)
  //                                            */------/*                    (mile)
  //                                                       x             (/arr)

  private _createMiles(waypoints: Array<object>, pois: Array<Poi>, scale: number): Array<Mile> {

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

    let _milePois: Array<Poi> = [];

    for (let i = 0; i < _wayPointsLength; i++) {

      const _waypoint: Waypoint = waypoints[i] as Waypoint;

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
      _waypoint.distanceTotal = _totalDistance;                                       // the total distance = NOBO

      _mileWaypoints.push(_waypoint);

      // if a distance of 1 mile+ has been bridged, or end of waypoints reached
      if (_bridgedDistance > environment.MILE || waypoints.length - 1 === i) {

        const _combinedWaypoints: Array<Waypoint> = (_poisWaypoints.length > 0) ? _mileWaypoints.concat(_poisWaypoints) : _mileWaypoints;

        const _combinedOhlc: OHLC = calculateOHLC(_combinedWaypoints, {start: 0, end: _combinedWaypoints.length});

        // set data
        _miles.push({
          id:               _miles.length + 1,
          elevationRange:   _combinedOhlc,
          waypoints:        JSON.parse(JSON.stringify(_mileWaypoints)),     // duplicate data
          elevationGain:    Math.round(_totalGain),
          elevationLoss:    Math.round(_totalLoss),
          scale:            scale,
          centerpoint:      geolib.getCenter(_mileWaypoints),
          isCurrent:        false,
        });

        // clear data
        _bridgedDistance -= environment.MILE;
        _totalGain = _totalLoss = 0;
        _mileWaypoints.splice(0, _mileWaypoints.length - 2);    // keep last 2
        _milePois = [];
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

  // create data tree
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

  public findNearestMileInTree(location: Waypoint):object {

    let nearestMile: object;

    for (let i = 0; i < this._tree.length; i ++) {

      const orderedWaypoints: Array<object> = geolib.orderByDistance(location, this._tree[i]);

      if (i === this._tree.length - 1) {
        nearestMile = orderedWaypoints[0];
      }
    }

    return {id: Number(nearestMile['key']), distance: nearestMile['distance'], mile: this.trailData.miles[nearestMile['key']]};
  }


  public findNearestWaypointInMile(waypoint: Waypoint, nearestMile: Mile): object {

    return geolib.orderByDistance({latitude: waypoint.latitude, longitude: waypoint.longitude} as geolib.PositionAsDecimal,
      nearestMile.waypoints);
  }

  private _linkPoisToMiles(pois: Array<Poi>, miles: Array<Mile>): void {

    this._loaderService.showMessage('linking pois to miles');

    for (const poi of pois) {

      this._loaderService.showMessage('linking pois to miles:' + poi.id);

      // update elevation to feet TODO
      poi.waypoint.elevation = poi.waypoint.elevation / environment.FOOT;

      // find nearest mile
      const _nearestMile: Mile = miles[this.findNearestMileInTree({latitude: poi.waypoint.latitude, longitude: poi.waypoint.longitude} as Waypoint)['id']];

      const _nearestWaypointRef: object = this.findNearestWaypointInMile(poi.waypoint, _nearestMile);

      const _anchorData = this._anchorDistanceCalculation(poi.waypoint, _nearestMile, _nearestWaypointRef);

      poi.anchorPoint = _anchorData.anchorPoint;

      // setup poi reference in waypoint
      if (!_anchorData.nearestWaypoint.nearestToPois) {
        _anchorData.nearestWaypoint.nearestToPois = [];
      }
      _anchorData.nearestWaypoint.nearestToPois.push(poi.id);

      // the distance of poi from trail
      poi.waypoint.distance = _nearestWaypointRef[0].distance;

      // add poi to mile
      if (!_nearestMile.pois) {
        _nearestMile.pois = [];
      }

      _nearestMile.pois.push(JSON.parse(JSON.stringify(poi)));

      _nearestMile.hasWater = _nearestMile.hasEscape = _nearestMile.hasCamp = _nearestMile.hasOther = false;

      if (String(poi.type).includes('water')) {
        this.trailData.waterSources.push(poi);
        _nearestMile.hasWater = true;
      } else if (String(poi.type).includes('highway')) {
        _nearestMile.hasEscape = true;
      } else if (String(poi.type).includes('camp')) {
        _nearestMile.hasCamp = true;
      } else {
        _nearestMile.hasOther = true;
      }


      if (_nearestMile.hasWater || _nearestMile.hasCamp) {
        // refactor ohlc if needed
        if (_nearestMile.elevationRange.high < poi.waypoint.elevation) {
          _nearestMile.elevationRange.high = poi.waypoint.elevation;
        } else if (_nearestMile.elevationRange.low > poi.waypoint.elevation) {
          _nearestMile.elevationRange.low = poi.waypoint.elevation;
        }
      }
    }
  }

  private _anchorDistanceCalculation(location: Waypoint, nearestMile: Mile, nearestWaypoints: object) {

    const _nearestWaypoint = nearestMile.waypoints[nearestWaypoints[0]['key'] as number];
    const _2ndNearestWaypoint = nearestMile.waypoints[nearestWaypoints[1]['key'] as number];

    // create an anchor waypoint (an on trail point nearest to the poi (simple triangulation)
    const _diffDistPercentage = (nearestWaypoints[0]['distance'] / nearestWaypoints[1]['distance']);
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
  private _simplify(points: Array<any>, tolerance: number, highestQuality: boolean = true): Array<any> {

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