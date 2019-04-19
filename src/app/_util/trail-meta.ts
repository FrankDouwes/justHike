import {TrailMeta} from '../type/trail';

let trails: Array<TrailMeta>;

// set
export function setTrailMetaData(data: Array<TrailMeta>) {
  trails = data;
}

// get all
export function getTrailsMetaData(): Array<TrailMeta> {
  return trails;
}

// get a trailmeta object based on the trail id (does not have to equal the array index)
export function getTrailMetaDataById(id: number): TrailMeta {

  if (!trails) {
    throw new Error('no trails available!');
  }

  for (const key in trails) {
    if (trails[key].id === id) {
      return trails[key] as TrailMeta;
    }
  }

  throw new Error('Trail not found!');
}

// trail meta does not contain a name, it does contain abbr.
export function getTrailMetaDataByAbbr(abbr: string): TrailMeta {
  if (!trails) {
    throw new Error('no trails available!');
  }

  return trails[abbr] as TrailMeta;
}
