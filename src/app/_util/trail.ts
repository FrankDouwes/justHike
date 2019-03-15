import {Trail, TrailMeta} from '../type/trail';

let trails: any;

export function setTrailMetaData(data: Array<TrailMeta>) {
  trails = data;
  console.log('trail data set');
}

export function getTrailsMetaData(): Array<TrailMeta> {
  return trails;
}

export function getTrailMetaDataById(id: Number): TrailMeta {

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
