import {Settings} from '../settings';

// since poiType is an array, we'll have to filter subobjects to select one by type
export function getPoiTypeByType(type:string) {

  const _pois = Settings.POITYPES;

  var result = _pois.filter(function(poi) {
    return poi['type'] === type;
  });

  return result[0];     // only return first
}


export function distanceInMilesFeet(distanceMeters:number, force: string = ""): object {

  let _distance: number;
  let _unit: string;

  if (distanceMeters / Settings.MILE >= 0.1 && force !== 'ft' || force === 'mi') {
    // show in miles

    _distance = (distanceMeters / Settings.MILE).toFixed(2);
    _unit = 'mi.'

  } else {
    // show in feet

    _distance = (distanceMeters / Settings.FOOT).toFixed(0);
    _unit = 'ft.';
  }

  return {distance: _distance, unit: _unit};
}
