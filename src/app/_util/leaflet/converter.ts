import {Waypoint} from '../../type/waypoint';
import * as L from 'leaflet';

// define the separate converter functions for easier referencing
const _converters = {
  flat_waypoint: flatToWaypoint,
  latlng_waypoint: latLngToWaypoint,
  waypoint_latlng: waypointToLatLng,
  waypoint_flat: waypointToFlat,
  waypoint_waypoint: waypointToWaypoint
};

// convert an array of Waypoints in a specified format to another format)
export function pointArrayTypeConversion(waypoints: Array<any>, from: 'waypoint' | 'latlng' | 'flat', to: 'waypoint' | 'latlng' | 'flat'): any {

  const _length = waypoints.length;
  const _returnArr: Array<L.latlng> = [];

  const _converter = _converters[from + '_' + to];

  if (!_converter) {
    console.warn('No converter for ' + from + ' to ' + to);
  }

  for (let i = 0; i < _length; i++) {
    _returnArr.push(_converter(waypoints[i]));
  }

  return _returnArr;
}

// convert a single Waypoint to a Latlng (that leaflet uses), optional elevation
export function waypointToLatLng(waypoint: Waypoint, noElevation: boolean = false): L.latlng {

  const _latLng:L.latlng = L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);

  if (noElevation) {
    _latLng['alt'] = null;
    delete _latLng['alt'];
  }

  return _latLng;
}


// convert a latlng to a Waypoint, optional elevation
export function latLngToWaypoint(latlng: L.latLng): Waypoint {

  const _waypoint: Waypoint = {
    latitude: latlng.lat,
    longitude: latlng.lng
  };

  if (latlng.alt) {
    _waypoint.elevation = latlng.alt;
  }

  return _waypoint;
}

// convert flat data to Waypoint (assuming an array with structure [latitude:number, longitude: number, elevation?:number]
export function flatToWaypoint(flat: Array<number>): Waypoint {

  const _waypoint: Waypoint = {
    latitude: flat[0],
    longitude: flat[1]
  };

  if (flat[2]) {
    _waypoint.elevation = flat[2];
  }

  return _waypoint;
}


// convert flat data to Waypoint (assuming an array with structure [latitude:number, longitude: number, elevation?:number]
export function waypointToFlat(waypoint: Waypoint): Array<number> {

  const _flat: Array<number> = [waypoint.latitude, waypoint.longitude];

  if (waypoint.elevation) {
    _flat.push(waypoint.elevation);
  }

  return _flat;
}


// convert Waypoint to Waypoint, turns string to numbers
export function waypointToWaypoint(waypoint: Waypoint): Waypoint {

  const _waypoint: any = {};

  for (const key in waypoint) {
    _waypoint[key] = Number(waypoint[key]);
  }

  return _waypoint as Waypoint;
}
