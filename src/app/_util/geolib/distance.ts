import * as geolib from 'geolib';
import {Waypoint} from '../../type/waypoint';
import {environment} from '../../../environments/environment.prod';

/* Adjustments to geoLibs Distance class:
- key value for Distance is a string, converting that to a number
- added belongsTo, in case points belong to different sources */
export class Distance {

  public latitude: number;
  public longitude: number;
  public distance: number;
  public belongsTo ?: number;

  private _key?: number;

  get key(): any {
    return this._key;
  }

  set key(key: any) {
    if (typeof key === 'string') {
      this._key = Number(key);
    } else {
      this._key = key;
    }
  }
}

// calculate the distance between 2 points
export function calculateDistance(point1: Waypoint, point2: Waypoint): number {

  return geolib.getDistance(
    {latitude: point1.latitude, longitude: point1.longitude},
    {latitude: point2.latitude, longitude: point2.longitude}, 1, 4);
}

// calculate the scale factor of a section (array of waypoints), using the provided length (by author) and the calculated length
export function calculateSectionScale(section: Array<Waypoint>, length: number, useMile: boolean = true): number {

  let _calcSectionLength = 0;
  let _prevPoint: Waypoint;

  const _length: number = section.length;
  for (let i = 0; i < _length; i++) {

    const _point: Waypoint = section[i];

    if (_prevPoint) {
      _calcSectionLength += calculateDistance(_prevPoint, _point);
    }

    _prevPoint = _point;
  }

  // convert to mile
  if (useMile) {
    _calcSectionLength = _calcSectionLength / environment.MILE;
  }

  return length / _calcSectionLength;
}
