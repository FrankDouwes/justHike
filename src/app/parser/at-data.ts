import {Trail} from '../type/trail';
import {Poi} from '../type/poi';

// trail specific parser for AT data
export function parseATData (trail: Trail, trailData: string, poiData: string, snow: object): Array<object> {

  return [new Trail()];
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  return [];
}
