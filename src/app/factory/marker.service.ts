import { Injectable } from '@angular/core';
import {User} from '../type/user';
declare const SVG: any;    // fixes SVGjs bug
import {Poi} from '../type/poi';
import {getPoiTypeByType} from '../_util/poi';
import {htmlIcon} from '../_util/leaflet/icon';
import {LocalStorageService} from 'ngx-webstorage';
import {shadeColor} from '../_util/color';
import {Town} from '../type/town';

@Injectable({
  providedIn: 'root'
})

// factory for generating markers (leaflet & elevation profile markers)
export class MarkerService {

  // svg pin icon
  private _markerData: string = 'm16.75,0.75c-8.28366,0 -15,6.71484 -15,15c0,2.32031 0.52734,4.52053 ' +
    '1.46925,6.48047c0.05269,0.11137 13.53075,26.51953 13.53075,26.51953l13.36819,-26.19141c1.04297,-2.04197 ' +
    '1.63181,-4.35647 1.63181,-6.80859c0,-8.28516 -6.71484,-15 -15,-15z';

  private maxPoiDistanceOffTrail: number;

  constructor(private _localStorageService: LocalStorageService) {

    this.maxPoiDistanceOffTrail = _localStorageService.retrieve('poiDistanceOffTrail');
  }

  /* deals with multiple poi icons per marker:
  - if a poi has 1 type, base it
  - if a poi has 2 types, base them
  - if a poi has > 2 types, base 1+
  if a poi contains water always show that icon first */
  public setupMarker(containerElement: any, poi: Poi | Town, poiTypes?: Array<string>): any {

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

    _marker = this._createMarkerType(poi, containerElement, _markerColor);

    // set classes
    const _length = (_poiTypesLength > 2) ? 2 : _poiTypesLength;
    for (let i = 0; i < _length; i++) {
      _marker.addClass(poiTypes[i]);
    }

    if ( _poiTypesLength > 1) {
      _marker.addClass('multiple');
      _iconSize = 14;
      _extraOffset = (_iconSize / 2);
    }

    // if multipoi
    if (poiTypes.length > 1) {

      // check if there's water
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

        _marker.use(this.sampleFaIcon(_type)).width(_iconSize).height(_iconSize).move(
          -(_iconSize / 2) + ((t * 1.5) * (_iconSize / 2)) - _extraOffset,
          Number(_marker.node.attributes.vOffset.value) + (_iconSize / 2) + (t * _extraOffset));
      }
    }
    return _marker;
  }

  private _createMarkerType(poi: Poi | User, containerElement: any, color: string): any {

    let _marker;

    if (poi.waypoint.distance <= this.maxPoiDistanceOffTrail || !this.maxPoiDistanceOffTrail) {
      _marker = this.createSvgPinMarker(containerElement, color);
    } else {
      _marker = this.createSvgCircleMarker(containerElement, color);
    }

    return _marker;
  }

  public createSvgFaElement(canvas: any, id: string, scale: number = 1, offsetX: number = -16.5, offsetY: number = -48) {

    const _element = canvas.group();
    _element.use(this.sampleFaIcon(id)).width(33 * scale).height(50 * scale).move(offsetX, offsetY);

    return _element;
  }

  // by default a point marker is 30 x 45px, and the border color is 10% darker than the fill color
  public createSvgPinMarker (canvas: any, color: string, scale: number = 1, opacity: number = 0.85) {

    const _marker = canvas.group();
    _marker.attr('vOffset', -(50 * scale));
    _marker.attr('fill-opacity', opacity);
    _marker.addClass('fa-marker');
    _marker.attr('type', 'pin');
    _marker.path(this._markerData).fill(color).width(33 * scale).height(50 * scale).stroke({color: shadeColor(color, -15), width: 2 * scale}).move(-(16.5 * scale), -(50 * scale)).addClass('pin');

    return _marker;
  }

  // by default a round marker is 30 x 30px, and the border color is 10% darker than the fill color
  public createSvgCircleMarker (canvas: any, color: string, scale: number = 1, opacity: number = 0.85, stroke: boolean = true) {

    const _marker = canvas.group();
    _marker.attr('vOffset', -(16.5 * scale));
    _marker.attr('fill-opacity', opacity);
    _marker.addClass('fa-marker');
    _marker.attr('type', 'pin');
    _marker.attr('type', 'circle');
    const _size = Math.round(33 * scale);
    _marker.circle(_size, _size).fill(color).move(-(16.5 * scale), -(16.5 * scale)).addClass('circle');

    if (stroke) {
      _marker.stroke({color: shadeColor(color, -15), width: 2 * scale})
    }

    return _marker;
  }

  // font awesome webfont doesn't seem to render to svg elements
  // to fix this we're cloning svg data from generated (hidden) elements at start-up, see fa-sampler (component)
  // check if the svg data exists, and return the full id string to use
  public sampleFaIcon(iconId: string) {

    // test if Font Awesome SVG data exists
    let svgIcon = document.getElementById('sample-' + iconId);

    if (svgIcon === null) {
      iconId = 'unknown';
      console.log('attempting to use unknown Font Awesome icon', iconId);
    }

    return 'sample-' + iconId;
  }

  // leaflet only, creates a circular leaflet marker that pulses (tracking only, invisible when idle/fetching)
  public createLeafletUserMarker(): any {

    // create root + svg element
    const _element = document.createElement('div');
    _element.classList.add('user-marker');

    // create circle + icon
    const _draw = SVG(_element).size(26, 26).style('overflow', 'visible');
    this.createSvgCircleMarker(_draw, '#7f7f7f', 0.787878);
    _draw.use(this.sampleFaIcon('user-dot')).width(24).height(24).move(-12, -12);

    // pulsing circle
    const _pulse = document.createElement('div');
    _pulse.classList.add('pulse');
    _element.appendChild(_pulse);

    return htmlIcon({className: 'user', html: _element});
  }

  // public createLeafletIndicatorMarker(): any {
  //
  //   // create root + svg element
  //   const _element = document.createElement('div');
  //   _element.classList.add('indicator-marker');
  //
  //   // create circle + icon
  //   const _draw = SVG(_element).size(8, 8).style('overflow', 'visible');
  //   this.createSvgCircleMarker(_draw, '#FF0000', 0.25);
  //
  //   return htmlIcon({className: 'indicator', html: _element});
  // }
}
