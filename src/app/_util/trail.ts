// TODO: find all usages of this routine (or similar) there are a bunch
// normalizes elevation within a range (converts a value in feet to a y position in pixels)
import {environment} from '../../environments/environment.prod';
import {Waypoint} from '../type/waypoint';

// normalize the elevation based on the hieght of the container (so that the max elevation matches the container height)
export function normalizeElevation(containerHeight: number, elevation: number, min: number, range: number, padding: number): number {

  const _halfMile: number = environment.MILE / 2;

  if (range < _halfMile / 2) {
    const _difference = _halfMile / 2 - range;
    range = _halfMile;
    elevation += _difference / 3;
  }

  elevation = (elevation - (min - padding)) / (range + (padding * 2));

  // invert as svg draws from top left
  elevation = Math.abs(elevation - 1);

  return Math.round(elevation * containerHeight);
}


// calculate elevation range
export function calculateOHLC(data: any, range: object, identifier: string = 'elevation', nested: boolean = true) {

  // select sub data set to use for calculations
  const _subArr = data.slice(range['start'], range['end']);

  return _ohlc(_subArr);
}


// calculate ohlc of single data point?
function _ohlc(waypoints: Array<Waypoint>){

  // calculate OHLC
  const   _open:    number    = Number(waypoints[0].elevation);
  let     _high:    number    = Number(_open);
  let     _low:     number    = Number(_open);
  const   _close:   number    = Number(waypoints[waypoints.length - 1].elevation);

  const _length = waypoints.length;   // speed
  for (let i = 0; i < _length; i++) {

    const _waypoint = waypoints[i];
    const _elevation = Number(_waypoint.elevation);

    if (_elevation > _high) {

      _high = _elevation;

    } else if (_elevation < _low) {

      _low = _elevation;
    }
  }

  return {open: _open, high: _high, low: _low, close: _close};
}
