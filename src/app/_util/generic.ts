import * as L from 'leaflet';

export function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// returns a clone of the input (instead of a reference, when dealing with nested objects)
export function cloneData(input: object): object{
  return JSON.parse(JSON.stringify(input));
}
