import * as L from 'leaflet';
declare const SVG: any;    // fixes SVGjs bug
import {shadeColor} from './color';
import {Poi} from '../type/poi';
import {getPoiTypeByType} from './poi';
import {toPoint as point} from 'node_modules/leaflet/src/geometry/Point';


// UTILS for markers (leaflet & elevation profile markers)

// clone a FA svg element.
// font awesome webfont doesn't seem to render to svg elements, therefor we're cloning svg data from generated (hidden) elements at start-up.

export function setupMarker(canvasElement: any, poi: Poi, poiTypes?: Array<string>, maxPoiDistanceOffTrail?: number): any {

  // if there are no explicit poi types set, use all poi types
  if (!poiTypes) {
    poiTypes = poi.type.split(', ');
  }

  const _poiTypesLength = poiTypes.length;

  let _marker;
  let _markerColor: string;
  let _extraOffset: number = 0;
  let _iconSize: number = 16;

  const poiMeta = getPoiTypeByType(poiTypes[0]);

  if (!poiMeta || _poiTypesLength > 1) {
    _markerColor = getPoiTypeByType('multiple').color;
  } else {
    _markerColor = poiMeta.color;
  }

  if ( _poiTypesLength > 1) {
    _iconSize = 14;
    _extraOffset = (_iconSize / 2);
  }

  if (poi.waypoint.distance <= maxPoiDistanceOffTrail || !maxPoiDistanceOffTrail) {
    _marker = createSvgPinMarker(canvasElement, _markerColor);
  } else {
    _marker = createSvgCircleMarker(canvasElement, _markerColor);

  }

  // if multipoi
  if (poiTypes.length > 1) {

    // check if there's water or resort (which has water)

    const _waterIndex = poiTypes.indexOf('water');

    // swap elements so water is first
    if (_waterIndex > 0) {
      poiTypes[0] = poiTypes.splice(_waterIndex, 1, poiTypes[0])[0];
    }
  }

  for (let t = 0; t < 2; t++) {

    let _type = poiTypes[t];

    if (_type) {

      // max of 2 icons in marker, if more types show plus symbol
      if (t === 1 && poiTypes.length > 2) {
        _type = 'multiple';
      }

      _marker.use(sampleFaIcon(_type)).width(_iconSize).height(_iconSize).move(
        -(_iconSize / 2) + ((t * 1.5) * (_iconSize / 2)) - _extraOffset,
        Number(_marker.node.attributes.vOffset.value) + (_iconSize / 2) + (t * _extraOffset));
    }
  }
  return _marker;
}

const markerData: string = 'm16.75,0.75c-8.28366,0 -15,6.71484 -15,15c0,2.32031 0.52734,4.52053 1.46925,6.48047c0.05269,0.11137 13.53075,26.51953 13.53075,26.51953l13.36819,-26.19141c1.04297,-2.04197 1.63181,-4.35647 1.63181,-6.80859c0,-8.28516 -6.71484,-15 -15,-15z';

export function createSvgFaElement (canvas: any, id: string, scale: number = 1, offsetX: number = -16.5, offsetY: number = -48) {

  let _element = canvas.group();
  _element.use(sampleFaIcon(id)).width(33 * scale).height(50 * scale).move(offsetX, offsetY);

  return _element;
}

// by default a point marker is 30 x 45px, and the border color is 10% darker than the fill color
export function createSvgPinMarker (canvas: any, color: string, scale: number = 1, opacity: number = 0.9) {

  const _marker = canvas.group();
  _marker.attr('vOffset', -(50 * scale));
  _marker.attr('fill-opacity', opacity);
  _marker.addClass('fa-marker');
  _marker.path(markerData).fill(color).width(33 * scale).height(50 * scale).stroke({color: shadeColor(color, -15), width: 2 * scale}).move(-(16.5 * scale), -(50 * scale));

  return _marker;
}

// by default a round marker is 30 x 30px, and the border color is 10% darker than the fill color
export function createSvgCircleMarker (canvas: any, color: string, scale: number = 1, opacity: number = 0.9) {

  const _marker = canvas.group();
  _marker.attr('vOffset', -(16.5 * scale));
  _marker.attr('fill-opacity', opacity);
  _marker.addClass('fa-marker');
  const _size = Math.round(33 * scale);
  _marker.circle(_size, _size).fill(color).stroke({color: shadeColor(color, -15), width: 2 * scale}).move(-(16.5 * scale), -(16.5 * scale));

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

export function createUserMarker() {

  let _element = document.createElement('div');
  _element.classList.add('user-marker');
  let _draw = SVG(_element).size(50, 50).style('overflow', 'visible');
  createSvgCircleMarker(_draw, '#00FF00', 0.787878);
  _draw.use(sampleFaIcon('user-dot')).width(24).height(24).move(-12, -12);

  // pulsing circle
  let _pulse = document.createElement('div');
  _pulse.classList.add('pulse');
  _element.appendChild(_pulse);

  return divCloneIcon({className: 'user', html: _element.innerHTML});
}


// leaflet z-index
(function(global){
  const MarkerMixin = {
    _updateZIndex: function (offset) {
      this._icon.style.zIndex = this.options.forceZIndex ? (this.options.forceZIndex + (this.options.zIndexOffset || 0)) : (this._zIndex + offset);
    },
    setForceZIndex: function(forceZIndex) {
      this.options.forceZIndex = forceZIndex ? forceZIndex : null;
    }
  };
  if (global) global.include(MarkerMixin);
})(L.Marker);


// because the default div icons takes inner html and that breaks the SVG use() href.
export var DivCloneIcon = L.DivIcon.extend({
  createIcon: function (oldIcon) {
    const _div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : this.options.html,
      options = this.options;

    if (options.bgPos) {
      const bgPos = point(options.bgPos);
      _div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
    }
    this._setIconStyles(_div, 'icon');

    return _div;
  }
});

// @factory L.divIcon(options: DivIcon options)
// Creates a `DivIcon` instance with the given options.
export function divCloneIcon(options) {
  return new DivCloneIcon(options);
}
