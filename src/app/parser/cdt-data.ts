import {Trail} from '../type/trail';
import {Poi} from '../type/poi';

// trail specific parser for CDT data
export function parseCDTData (trail: Trail, trailData: string, poiData: string, snow: object): Trail {

  return new Trail();
}

// figure out what type of POIS exist in raw data, assign them to poi types XXX
function parsePois(pois: Array<object>): Array<Poi> {

  return [];
}
