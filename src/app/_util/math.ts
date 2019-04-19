// is a number a prime number?
import {environment} from '../../environments/environment.prod';

export function isPrime (number: number): boolean {
  for(let i = 2; i < number; i++) {
    if (number % i === 0)  {
      return false;
    }
  }
  return number !== 1 && number !== 0;
}

// TODO: find all usages of this routine (or similar) there are a bunch
// normalizes elevation within a range (converts a value in feet to a y position in pixels)
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

// convert meters to miles/feet
export function distanceInMilesFeet(distanceMeters: number, force: string = ''): object {

  let _distance: number;
  let _unit: string;

  if (distanceMeters / environment.MILE >= 0.1 && force !== 'ft' || force === 'mi') {
    // show in miles
    _distance = Number((distanceMeters / environment.MILE).toFixed(2));
    _unit = 'mi.';

  } else {
    // show in feet
    _distance = Number((distanceMeters / environment.FOOT).toFixed(0));
    _unit = 'ft.';
  }

  return {distance: _distance, unit: _unit};
}
