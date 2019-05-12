import * as L from 'leaflet';
import {Waypoint} from '../../type/waypoint';
import {waypointToLatLng} from './converter';
import {Mile} from '../../type/mile';
import {Distance} from '../geolib/distance';
import {environment} from '../../../environments/environment.prod';

/* calculate the nearest point on trail for a given location
deals with bends in the trail (situations where the nearest points arent consequative points on trail)
[n1] - - \
           \
             |
[x]         [?]
             |
           /
[n2] - - /
*/
export function calculateTrailAnchorPoint(mile: Mile, nearestPoints: Array<Distance>): Waypoint {

  const _nearestPoint = mile.waypoints[Number(nearestPoints[0].key)];
  const _2ndNearestPoint = mile.waypoints[Number(nearestPoints[1].key)];

  let _location: Waypoint = calculatePointBasedOnDistance(nearestPoints, [_nearestPoint, _2ndNearestPoint]);

  /* found a loop/bend, which causes the _nearestPoint keys to not be in a consecutive order.
  1. figure out the trailDistance between the 2 nearest points
  2. find a point within all points that's closest to that trailDistance
  3. do the distance calculation again with 2 points based on that centerpoint.
  *. this is 'good enough', a trade-off between performance and slightly less optimal overlay/popup locations. */
  if (Number(nearestPoints[1].key) !== Number(nearestPoints[0].key) + 1
    && Number(nearestPoints[1].key) !== Number(nearestPoints[0].key) - 1) {

    let _selectionWaypoints;

    if (nearestPoints[0].key < nearestPoints[1].key) {
      _selectionWaypoints = mile.waypoints.slice(nearestPoints[0].key, nearestPoints[1].key + 1);
    } else {
      _selectionWaypoints = mile.waypoints.slice(nearestPoints[1].key, nearestPoints[0].key + 1);
    }

    // sorting the selection based on the distance of the locations distance
    _selectionWaypoints.sort(function (a, b) {
      return Math.abs(_location.distance - a.distance) - Math.abs(_location.distance - b.distance);
    });

    _location = calculatePointBasedOnDistance(nearestPoints, [_selectionWaypoints[0], _selectionWaypoints[1]]);
  }

  return _location;
}

/* calculate a new waypoint based on the distance from 2 waypoints (using a distance sorted array (from GeoLib)
* calculates a point inline (between p1 & p2), based on the distance of p1 and p2 from x (labeled d1 and d2)
*
*   p1 --------- ? ---------- p2
*    .                      .
*       .                .
*     (d1) .          .  (d2)
*             .     .
*               [x]
*                                   */
function calculatePointBasedOnDistance(distancePoints: Array<any>, waypoints: Array<Waypoint>, returnAsLatlng: boolean = false): Waypoint | L.latlng {

  // get the waypoints from a mile
  const _point1: Waypoint = waypoints[0];
  const _point2: Waypoint = waypoints[1];

  const _distancePerc = distancePoints[0].distance / (distancePoints[0].distance + distancePoints[1].distance);

  // calculate new props based on distance percentage
  const _props: Array<string> = ['latitude', 'longitude', 'elevation', 'distance', 'distanceTotal'];
  const _length: number = _props.length;

  const _waypoint = {};

  for (let i = 0; i < _length; i++) {
    const _prop = _props[i];
    _waypoint[_prop] = _point1[_prop] + (((_point2[_prop] - _point1[_prop]) / 2) * _distancePerc);
  }

  if (returnAsLatlng) {
    return waypointToLatLng(_waypoint as Waypoint) as L.latLng;
  } else {
    return _waypoint as Waypoint;
  }
}

// calculate a point based on distance/angle
export function calculatePoint(point: Waypoint, angle: number, meters: number): Waypoint {

  const toRad = function(deg: number) {
    return deg * Math.PI / 180;
  }

  const toDeg = function(rad: number) {
    return rad * 180 / Math.PI;
  }

  const dist = (meters / 1000) / 6371;
  angle = toRad(angle);

  const lat1 = toRad(point.latitude), lon1 = toRad(point.longitude);

  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
    Math.cos(lat1) * Math.sin(dist) * Math.cos(angle));

  const lon2 = lon1 + Math.atan2(Math.sin(angle) * Math.sin(dist) *
    Math.cos(lat1),
    Math.cos(dist) - Math.sin(lat1) *
    Math.sin(lat2));

  if (isNaN(lat2) || isNaN(lon2)) { return; }

  return {latitude: toDeg(lat2), longitude: toDeg(lon2), elevation: 0};
}


/* attempts to calculate a 'safe' position for mile label markers,
a position that won't be covered by the trail */
// TODO: optimise / cleanup, works fine, could/should be shorter/clearer
export function calculateLabelLocation(mile: Mile, prevMile: Mile): any {

  /* calculate the exact X (start) location for the mile,
  miles overlap so it's somewhere between point 0 and 1
  [0]=====[?]=====[1] */

  // calculate percentage of point in total covered distance by 2 points
  const _xDistance = Math.abs(mile.waypoints[0].distance) + mile.waypoints[1].distance;
  const _xPercentage = Math.abs(mile.waypoints[0].distance) / _xDistance;

  // calculate lang/long/elevation based on percentage
  const _xPoint: Waypoint = {
    latitude: mile.waypoints[0].latitude + ((mile.waypoints[1].latitude - mile.waypoints[0].latitude) * _xPercentage),
    longitude: mile.waypoints[0].longitude + ((mile.waypoints[1].longitude - mile.waypoints[0].longitude) * _xPercentage),
    elevation: mile.waypoints[0].elevation + ((mile.waypoints[1].elevation - mile.waypoints[0].elevation) * _xPercentage),
    distance: 0,    // unused
    distanceTotal: (mile.id - 1) * environment.MILE
  };

  /* calculate the position of the mile marker based on the angle of the trail
  * there are 2 measurements:
  * - a long one (based on a quarter mile in either direction
  * - a short one (based on 2 points ahead / 2 points behind
  *
  * depending on the angle and the direction a new point is generated
  * depending on the sharpness of bend the marker distance is calucated*/

  const _nearPoint: Waypoint = mile.waypoints[2];
  const _prevNearPoint: Waypoint = prevMile.waypoints[prevMile.waypoints.length - 3];
  const _prevCenter: object = prevMile.centerpoint;
  const _mileCenter: object = mile.centerpoint;

  const _quarterMilePoint: object = {
    latitude: (_xPoint.latitude + Number(_mileCenter['latitude'])) / 2,
    longitude: (_xPoint.longitude + Number(_mileCenter['longitude'])) / 2,
  };

  const _prevQuarterMilePoint: object = {
    latitude: (_xPoint.latitude + Number(_prevCenter['latitude'])) / 2,
    longitude: (_xPoint.longitude + Number(_prevCenter['longitude'])) / 2,
  };

  const _prevQPoint = new L.latLng(_prevQuarterMilePoint['latitude'], _prevQuarterMilePoint['longitude'], 0);
  const _qPoint = new L.latLng(_quarterMilePoint['latitude'], _quarterMilePoint['longitude'], 0);
  const _zPoint = new L.latLng(_xPoint.latitude, _xPoint.longitude, 0);
  const _nPoint = new L.latLng(_nearPoint.latitude, _nearPoint.longitude, 0);
  const _prevNPoint = new L.latLng(_prevNearPoint.latitude, _prevNearPoint.longitude, 0);

  const calcHeading = function (waypoint1: any, waypoint2: any): number {
    return Math.atan2(waypoint2.lng - waypoint1.lng, waypoint2.lat - waypoint1.lat) * 180 / Math.PI;
  }

  const _headingLong = calcHeading(_zPoint, _qPoint);
  const _headingLongPrev = calcHeading(_prevQPoint, _zPoint);
  const _headingShort = calcHeading(_zPoint, _nPoint);
  const _headingShortPrev = calcHeading(_prevNPoint, _zPoint);

  const _longBend = _headingLong - _headingLongPrev;
  const _shortBend = _headingShort - _headingShortPrev;

  const _shortPrevLongBend = _headingShort - _headingLongPrev;

  let _useShort: boolean;
  let _overHalf: boolean;

  if (_longBend > 0) {
    if (_shortPrevLongBend < _longBend) {
      _useShort = true;
    } else {
      _overHalf = true;
    }
  } else {
    if (_shortPrevLongBend > _longBend) {
      _useShort = true;
    } else {
    }
  }

  if (_useShort) {
    if (_shortBend > 0) {
      _overHalf = true;
    }
  }

  // the actual angle calculation
  const _startAngle = (_useShort) ? _headingShortPrev : _headingLongPrev;
  const _offsetAngle = (_useShort) ? _shortBend : _longBend;

  // distance gets smaller the sharper the corner is...
  const _distancePerc = 1 - Math.abs(_offsetAngle / 180);

  let _angle: number = _startAngle + (_offsetAngle / 2);
  _angle = (_overHalf) ? _angle - 90 : _angle + 90;

  // from -180 to 180
  if (_angle > 180) {
    _angle = -180 - (_angle - 180);
  } else if (_angle < -180) {
    _angle = 180 - Math.abs(_angle - 180);
  }

  const _distance = (environment.MILE / 8) * _distancePerc;

  return {latlng: _zPoint, waypoint: _xPoint, angle: _angle, distance: _distance}
}
