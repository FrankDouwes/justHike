import * as L from 'leaflet';
import {Waypoint} from '../../type/waypoint';
import {waypointToLatLng} from './converter';
import {Mile} from '../../type/mile';

/* calculate a new waypoint based on the distance from 2 waypoints (using a distance sorted array (from GeoLib)
* calculates a point (x) inline (between p1 & p2), based on the distance of p1 and p2 from y (labeled d1 and d2)
*
*   p1 --------- x ---------- p2
*    .                      .
*       .                .
*     (d1) .          .  (d2)
*             .     .
*                y
*                                   */
export function calclatePointBasedOnDistance(distancePoints: Array<any>, waypoints: Array<Waypoint>, returnAsLatlng: boolean = false): Waypoint | L.latlng {

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

/* calculate the nearest point on trail for a given location */
export function calculateTrailAnchorPoint(mile: Mile, nearestPoints: Array<any>): Waypoint {

  const _nearestPoint = mile.waypoints[Number(nearestPoints[0].key)];
  const _2ndNearestPoint = mile.waypoints[Number(nearestPoints[1].key)];

  let _location: Waypoint = calclatePointBasedOnDistance(nearestPoints, [_nearestPoint, _2ndNearestPoint]);

  /* found a loop/bend, which causes the _nearestPoint keys to not be in a consecutive order.
  figure out the trailDistance between the 2 nearest points
  find a point within all points that's closest to that trailDistance
  after that do the above calculation with 2 points based on that centerpoint.
  this is 'good enough, a trade-off between performance and slightly less optimal overlay/popup locations. */
  if (Number(nearestPoints[1]['key']) !== Number(nearestPoints[0]['key']) + 1
    && Number(nearestPoints[1]['key']) !== Number(nearestPoints[0]['key']) - 1) {

    let _selectionWaypoints;

    if ((nearestPoints[0]['key'] < nearestPoints[1]['key'])) {
      _selectionWaypoints = mile.waypoints.slice(nearestPoints[0]['key'], nearestPoints[1]['key'] + 1);
    } else {
      _selectionWaypoints = mile.waypoints.slice(nearestPoints[1]['key'], nearestPoints[0]['key'] + 1);
    }

    // sorting the selection based on the distance of the locations distance
    _selectionWaypoints.sort(function (a, b) {
      return Math.abs(_location.distance - a.distance) - Math.abs(_location.distance - b.distance);
    });

    _location = calclatePointBasedOnDistance(nearestPoints, [_selectionWaypoints[0], _selectionWaypoints[1]]);
  }

  return _location;
}
