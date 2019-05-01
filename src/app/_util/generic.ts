import * as L from 'leaflet';

// sort an array of objects by a key (in each object)
export function sortByKey(array, key) {
  return array.sort(function(a, b) {
    const x = a[key];
    const y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// returns a clone of the input (instead of a reference, when dealing with nested objects)
export function cloneData(input: object): object{
  return JSON.parse(JSON.stringify(input));
}

export function isObjectEmpty(obj:object): boolean {
  for(const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
