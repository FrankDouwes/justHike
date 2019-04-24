// Adjustments to geoLibs Distance class:
// - key value for Distance is a string, converting that to a number
// - added belongsTo, in case points belong to different sources
import * as geolib from "geolib";
import {Waypoint} from '../../type/waypoint';
import {environment} from '../../../environments/environment.prod';

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

export function calculateDistance(p1: any, p2: any): number {
  return geolib.getDistance(
    {latitude: p1.latitude, longitude: p1.longitude} as geolib.PositionAsDecimal,
    {latitude: p2.latitude, longitude: p2.longitude} as geolib.PositionAsDecimal
    , 0, 4);
}

// calculate the scale factor of a section (array of waypoints), using the provided length (by author) and the calculated length
export function calculateSectionScale(section: Array<Waypoint>, length: number): number {

  const _calculatedLength = geolib.getPathLength(section) / environment.MILE;

  return _calculatedLength / length;
}
