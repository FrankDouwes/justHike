import {Waypoint} from '../../type/waypoint';
import * as L from 'leaflet';

// convert an array of Waypoints (that my app is built on) to and array of LatLngs (that leaflet uses)
export function waypointsToLatLng(waypoints: Array<Waypoint>): Array<L.latlng> {

  const _length = waypoints.length;
  const _returnArr: Array<L.latlng> = [];

  for (var i = 0; i < _length; i++) {
    _returnArr.push(waypointToLatLng(waypoints[i]));
  }

  return _returnArr;
}

// convert a single Waypoint to a Latlng (that leaflet uses)
export function waypointToLatLng(waypoint: Waypoint): L.latlng {
  return {lat: waypoint.latitude, lng: waypoint.longitude, alt: waypoint.elevation};
}


// convert a latlng to a waypoint
export function latLngToWaypoint(latlng: L.latLng): Waypoint {
  return {latitude: latlng.lat, longitude: latlng.lng, elevation: latlng.alt};
}
