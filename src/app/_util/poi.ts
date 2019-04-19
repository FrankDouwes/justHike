import {Settings} from '../settings';
import {PoiType} from '../type/poi';

// since poiType is an array, we'll have to filter subobjects to select one by type
export function getPoiTypeByType(type:string) {

  const _pois = Settings.POITYPES;

  const result = _pois.filter(function(poi) {
    return poi['type'] === type;
  });

  return result[0];     // only return first
}

// get all poi types that are considered major (and therefor visible on elevation profile)
export function getMajorPoiTypes(): Array<string> {

  const _result: Array<string> = [];

  Settings.POITYPES.forEach(function(poi: PoiType) {
    if (poi.isMajor) {
      _result.push(poi.type);
    }
  });

  return _result;
}
