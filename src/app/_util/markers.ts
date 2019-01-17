// UTILS for markers (leaflet & elevation profile markers)

// ELEVATION PROFILE (SVG, font-awesome based markers)

// clone a FA svg element.
import {shadeColor} from './color';

export function createSvgFaElement (canvas: any, id: string, scale: number = 1, offsetX: number = -16.5, offsetY: number = -48) {

  let _element = canvas.group();
  _element.use(sampleFaIcon(id)).width(33 * scale).height(50 * scale).move(offsetX, offsetY);

  return _element;
}

// by default a point marker is 30 x 45px, and the border color is 10% darker than the fill color
export function createSvgPointMarker (canvas: any, color: string, scale: number = 1) {

  let _marker = canvas.group();
  _marker.addClass('fa-marker');

  let markerData: string = 'm256,0c-88.359,0 -160,71.625 -160,160c0,24.75 5.625,48.219 15.672,69.125c0.562,1.188 144.328,282.875 144.328,282.875l142.594,-279.375c11.125,-21.781 17.406,-46.469 17.406,-72.625c0,-88.375 -71.625,-160 -160,-160z';
  _marker.path(markerData).fill(color).width(33 * scale).height(50 * scale).stroke({color: shadeColor(color, -10), width: 2 * scale}).move(-(16.5 * scale), -(48 * scale));

  return _marker;
}

// by default a round marker is 30 x 30px, and the border color is 10% darker than the fill color
export function createSvgCircleMarker (canvas: any, color: string, scale: number = 1) {

  let _marker = canvas.group();
  _marker.addClass('fa-marker');

  _marker.circle(33 * scale, 33 * scale).fill(color).stroke({color: shadeColor(color, -10), width: 2 * scale}).move(-(16.5 * scale), -(16.5 * scale));

  return _marker;
}

// check if the svg data exists, and return the full id string to use
export function sampleFaIcon(iconId:string) {

  // test if Font Awesome SVG data exists
  let svgIcon = document.getElementById('sample-' + iconId);

  if (svgIcon === null) {
    iconId = 'unknown';
    console.log('attempting to use unknown Font Awesome icon', iconId);
  }

  return 'sample-' + iconId;
}











// LEAFLET MARKERS
