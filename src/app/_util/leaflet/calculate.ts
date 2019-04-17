// calculate a new waypoint based on the distance from 2 waypoints (using a distance sorted array (from GeoLib)
import {Waypoint} from '../../type/waypoint';
import {waypointToLatLng} from './converter';
import * as L from 'leaflet';

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
