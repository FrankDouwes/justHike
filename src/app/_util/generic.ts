import * as L from 'leaflet';

export function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

export function createMapsLatLngLink(latLng: L.latlng) : string {

  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
    return '<a href="http://maps.apple.com/?ll=' + latLng.lat + ',' + latLng.lng + '">Apple maps</a>';
  } else {
    return '<a href="https://www.google.com/maps/search/?api=1&query=' + latLng.lat + ',' + latLng.lng + '">Google maps</a>';
  }
}
