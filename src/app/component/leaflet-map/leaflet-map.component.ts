import * as L from 'leaflet';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';
import 'node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js';
import 'node_modules/leaflet.Geodesic/Leaflet.Geodesic.js';

import '../../_util/leaflet/grid.js';
import '../../_util/leaflet/marker.js';

import {Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { Mile } from '../../type/mile';
import { ActivatedRoute } from '@angular/router';
import { Poi } from '../../type/poi';
import { fallbackLayer } from '../../_util/leaflet/tiles';
import { LocationBasedComponent } from '../../base/location-based/location-based.component';
import { User } from '../../type/user';
import { Waypoint } from '../../type/waypoint';
import { environment } from '../../../environments/environment.prod';
import { SnowGeneratorService } from '../../service/snow-generator.service';
import { TrailGeneratorService } from '../../service/trail-generator.service';
import { OrientationService } from '../../service/orientation.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenModeService } from '../../service/screen-mode.service';
import { getTrailMetaDataByAbbr } from '../../_util/trail';
import { MarkerService } from '../../factory/marker.service';
import { htmlIcon } from '../../_util/leaflet/icon';
import {NgElement, WithProperties} from '@angular/elements';
import {PopupComponent} from './elements/popup/popup.component';
import {calclatePointBasedOnDistance} from '../../_util/leaflet/calculate';
import {latLngToWaypoint, waypointToLatLng} from '../../_util/leaflet/converter';
import {distanceInMilesFeet} from '../../_util/math';

declare const SVG: any;    // fixes SVGjs bug

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass']
})

// uses basic for loops for performance
/* TODO: needs cleanup! a lot of it! */
/* TODO: needs guidelines for towns */
export class LeafletMapComponent extends LocationBasedComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('leaflet') leaflet: ElementRef;

  // data
  @Input() name: String;
  @Input() activeMileId: number;      // id of the currently active mile (selected mile in the overview or the mile nearest to the user location)
  @Input() userCentered?: boolean;
  @Input() centerPoint?: Waypoint;
  @Input() range: object;             // the range of miles to show

  @Input() poiRange?: any;            // the visible poi (in poi list) that should be bounded on map
  @Input() mileRange?: any;           //  the visible miles (in poi list) that should be bounded on map
  // map tiles
  @Input() showMapTiles: boolean;

  // map controls
  @Input() allowPanning: boolean;
  @Input() allowZooming: boolean;

  // elements
  @Input() showPois: boolean;

  private _map: any;
  private _initialized = false;
  private _showMileGrid: boolean;
  private _animateMap: boolean;
  private _trailLength: number;

  private _centerpoint: object;
  private _userMarker;
  private _visibleMiles: Array<number> = [];

  private _renderedData: Array<any> = [];
  private _renderedCenterMileId: number;
  private _popupBelongsTo = -1;       // uses mile index, not mile.id

  private _tileLayers: Array<any> = [];
  private _trailLayers: any = L.layerGroup();
  private _notes: Array<Poi>;

  private _popupTimer: any;
  private _tooltipTimer: any;
  private _overlayElements: Array<any>;

  constructor(
    private _route:                 ActivatedRoute,
    private _snowGenerator:         SnowGeneratorService,
    private _trailGenerator:        TrailGeneratorService,
    private _orientationService:    OrientationService,
    private _localStorageService:   LocalStorageService,
    private _screenModeService:     ScreenModeService,
    private _markerFactory:         MarkerService
  ) {
    super();
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {
    super.ngOnInit();

    this._showMileGrid = this._localStorageService.retrieve('showMileGrid');
    this._animateMap = this._localStorageService.retrieve('animateMap');
    this._notes = JSON.parse(this._localStorageService.retrieve(this._trailGenerator.getTrailData().abbr + '_notes'));

    this._trailLength = this._trailGenerator.getTrailData().miles.length;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this._initialized) {

      if (changes.activeMileId) {
        this._dataManager();
        this.onUserLocationChange(this.user);
      }
    }
  }

  ngAfterViewInit(): void {

    this._setupMap();
    this._dataManager();
    this.onUserLocationChange(this.user);

    this._initialized = true;
    if (!this.userCentered) {
      this._centerOnPoint(this.centerPoint);
    }
  }

  ngOnDestroy() {

    super.ngOnDestroy();

    this._removeMiles(this._visibleMiles);

    if (this._map){
      this._map.eachLayer(function(layer){
        layer.remove();
      });
      this._map.remove();
      this._map = null;
    }
  }



  // SETUP

  private _setupMap(): void {

    // no data, no map
    if (!this.trailGenerator.getTrailData()) {
      console.log('no map data');
      return;
    }

    this._createMapTileLayer();
    this._createGridLayer();

    this._map = new L.map('leaflet_' + this.name, {
      minNativeZoom: 15,
      maxNativeZoom: 15,
      minZoom: 13.75,
      maxZoom: 16,
      zoomControl: false, attributionControl: false,
      layers: this._tileLayers,
      zoomSnap: 0,
      // preferCanvas: true,
      closePopupOnClick: false,     // manual toggle
      maxBoundsViscosity: 0.95      // near solid
    });

    this._setupMapListeners();
    this._setMapInteractionProperties();

    // set an initial location
    this._map.setView([0, 0], 15);
  }

  // create the main map tile layer, based on the custom fallback tile.
  // if there's an internet connection use arcGis, else use locally stored tiles (or default error tile)
  private _createMapTileLayer(): void {

    if (this.showMapTiles === true) {

      // appends the ionic webview compatible root directory URL
      const _version = this._localStorageService.retrieve(this.trailGenerator.getTrailData().abbr + '_tilesVersion');

      let _url: string;
      if (_version) {
        _url = this.fileSystem.rootPath + this.trailGenerator.getTrailData().abbr + '/' + _version + '/tiles/{x}/{y}.png';
      } else {
        _url  = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      }

      const tilesFallback = fallbackLayer(_url,
        {
          // regular min & max zoom prop causes flickering
          minNativeZoom: 15,
          maxNativeZoom: 15,
          fallbackTileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          errorTileUrl: './assets/images/missing.png',
          keepBuffer: 0,    // small buffer means faster scrolling
          updateWhenIdle: false,
          updateWhenZooming: false
        });

      this._tileLayers = this._tileLayers.concat(tilesFallback);
    }
  }

  // grid (TODO: overlapping grid issues, investigate UTM grids)
  // considering rewriting this: https://github.com/ggolikov/Leaflet.gmxIndexGrid for leafelt 1.x
  private _createGridLayer(): void {

    const _self = this;

    if (this.allowZooming) {

      const _trailUtm: Array<number> = getTrailMetaDataByAbbr(this._trailGenerator.getTrailData().abbr).utm;

      if (_trailUtm && this._showMileGrid) {

        _trailUtm.forEach(function (zone) {
          const _utmGrid = L.utmGrid(zone, false, {
            color: '#AAA',
            showAxis100km: false,
            weight: 1,
            minInterval: environment.MILE,
            maxInterval: environment.MILE,
            opacity: 1,
          });

          _self._tileLayers = _self._tileLayers.concat(_utmGrid);
        });
      }
    }
  }

  private _setMapInteractionProperties(): void {

    // panning
    if (!this.allowPanning) {
      this._map.dragging.disable();
    }

    // zooming
    if (!this.allowZooming) {
      this._map['scrollWheelZoom'].disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
    } else {

      // if zoom is enabled, add scale indicator
      L.control.scale().addTo(this._map);
    }
  }

  /* setup routines for popup/ indicator showing the poition and trail mileage
  * manually closes popup (disabled feature on map */
  private _setupMapListeners(): void {

    const _self = this;

    // show popup or inditor (and guides)
    this._map.on('click', function(e: any) {

      // if there's still an overlay, or overlay data, get rid of it.
      if (_self._overlayElements) {

        _self._clearOverlayElements();

        return;
      }

      _self._createPopupTooltip(e);

    });

    const _onClose = function(e) {

      clearTimeout(_self._popupTimer);
      clearTimeout(_self._tooltipTimer);

      _self._clearOverlayElements();
    }

    // hide indicator (and guides)
    this._map.on('tooltipclose', _onClose.bind(this));
    this._map.on('popupclose', _onClose.bind(this));
  }

  // clear all the extra elements that belong to the overlays (popups/tooltips)
  private _clearOverlayElements(): void {

    const _self = this;

    if (this._overlayElements && this._overlayElements.length > 0) {
      this._overlayElements.forEach(function(element) {
        _self._map.removeLayer(element); // remove
      });
    }

    this._popupBelongsTo = -1;
    this._overlayElements = null;

    this._map.closePopup();
    this._map.closeTooltip();
  }

  // display Tooltip (on trail) or Popup (off trail), both use dynamic components as content
  private _createPopupTooltip(e: any): void {

    const _self = this;
    const _eLatLngAsWaypoint = latLngToWaypoint(e.latlng)
    let _anchor: Waypoint;
    let _nearestPoints: Array<any>;

    // use a plugin to get the nearest point in the nearest (rendered) trail segment.
    // TODO: eliminate the plugin, since I'm only using a single function
    const _closestLayer = L.GeometryUtil.closestLayer(this._map, this._trailLayers.getLayers(), e.latlng);

    if (!_closestLayer) {
      return;     // no trail
    } else {
      const _mile: Mile = this._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
      _nearestPoints = this._trailGenerator.findNearestWaypointInMile(_eLatLngAsWaypoint, _mile);
      _anchor = this._calculateTrailAnchorPoint(_eLatLngAsWaypoint, _mile, _nearestPoints);
    }

    const _anchorAsLatLng: L.latlng = waypointToLatLng(_anchor);    // convert for leaflet

    // if the distance is substantial, show a guideline/popup, else show a tooltip
    const _offTrail = (_nearestPoints[0]['distance'] > this.localStorage.retrieve('poiDistanceOffTrail'));

    if (_offTrail) {

      this._popupBelongsTo = Number(_closestLayer.layer.mileId) - 1;
      this._activatePopup(e.latlng, _anchorAsLatLng, _nearestPoints[0]['distance'], _anchor.distanceTotal);

      // render guides
      this._overlayElements.forEach(function(element) {
        element.addTo(_self._map);
      });

    } else {

      this._popupBelongsTo = Number(_closestLayer.layer.mileId) - 1;
      this._activateTooltip(_anchorAsLatLng, _anchor.distanceTotal);

      // create empty array for 'click' cycle
      this._overlayElements = [];
    }
  }

  // activate a popup (component)
  private _activatePopup(coordinates: L.latLng, anchor: L.latLng, offTrailDistance: number, nearestMileage: number): void {

    const _offTrailDistanceConverted: any = distanceInMilesFeet(offTrailDistance);
    const _nearestMileageConverted: any = distanceInMilesFeet(nearestMileage);

    const _title: string =  + _offTrailDistanceConverted.distance + ' ' + _offTrailDistanceConverted.unit + ' off trail';
    const _message: string = 'Nearest: ' + _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance;
    this._createPopupComponent(coordinates,
      {
        title: _title,
        message: _message,
        location: coordinates,
        anchor: anchor,
        belongsTo: this._popupBelongsTo
      });

    this._overlayElements = this._createGuide(anchor, coordinates, false, false, 'rgb(180, 163, 146)', 3);
  }

  // activate a tooltip (component)
  private _activateTooltip(anchor: L.latLng, nearestMileage: number): void {

    const _nearestMileageConverted: any = distanceInMilesFeet(nearestMileage);

    _nearestMileageConverted.unit = String(_nearestMileageConverted.unit).charAt(0).toUpperCase() + String(_nearestMileageConverted.unit).slice(1);

    this._createTooltipComponent(anchor, {
        title: _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance,
        location: anchor,
        belongsTo: this._popupBelongsTo
      });
  }

  /* calculate the nearest point on trail for a given location */
  private _calculateTrailAnchorPoint(waypoint: Waypoint, mile: Mile, nearestPoints: Array<any>): Waypoint {

    const _nearestPoint = mile.waypoints[Number(nearestPoints[0].key)];
    const _2ndNearestPoint = mile.waypoints[Number(nearestPoints[1].key)];

    let _location: Waypoint = calclatePointBasedOnDistance(nearestPoints, [_nearestPoint, _2ndNearestPoint]);

    /* found a loop/bend, which causes the _nearestPoint keys to not be in a consecutive order.
    figure out the trailDistance between the 2 nearest points
    find a point within all points that's closest to that trailDistance
    after that do the above calculation with 2 points based on that centerpoint.
    this is 'good enough, a trade-off between performance and slightly less optimal overlay/popup locations. */
    if (Number(nearestPoints[1]['key']) !== Number(nearestPoints[0]['key']) + 1
      && Number(nearestPoints[1]['key']) !== Number(nearestPoints[0]['key']) - 1) {

      let _selectionWaypoints;

      if ((nearestPoints[0]['key'] < nearestPoints[1]['key'])) {
        _selectionWaypoints = mile.waypoints.slice(nearestPoints[0]['key'], nearestPoints[1]['key'] + 1);
      } else {
        _selectionWaypoints = mile.waypoints.slice(nearestPoints[1]['key'], nearestPoints[0]['key'] + 1);
      }

      // sorting the selection based on the distance of the locations distance
      _selectionWaypoints.sort(function (a, b) {
        return Math.abs(_location.distance - a.distance) - Math.abs(_location.distance - b.distance);
      });

      _location = calclatePointBasedOnDistance(nearestPoints, [_selectionWaypoints[0], _selectionWaypoints[1]]);
    }

    return _location;
  }



  // ELEMENT CREATION

  // manages the visible data (mile segments, markers, guides and snow)
  // the map only renders what should be visible based on the range provided)
  private _dataManager(): void {

    if (!this.range) {
      return;
    }

    // get visible miles
    const _relativeRange = {start: this.activeMileId - this.range['behind'], end: this.activeMileId + this.range['ahead']};
    const _oldmMilesToDelete: Array<number> = [];
    const _newVisibleMiles: Array<number> = [];

    if (_relativeRange.start < _relativeRange.end - 9) {
      this._renderedCenterMileId = _relativeRange.start + Math.floor((_relativeRange.end - _relativeRange.start) / 2);
    } else {
      this._renderedCenterMileId = -1;
    }

    // create range array (check for trail ends)
    for (let i = _relativeRange.start; i <= _relativeRange.end; i++) {
      if (i >= 0 && i < this._trailGenerator.getTrailData().miles.length) {
        _newVisibleMiles.push(i);
      }
    }

    // compare drawn miles array to new visibleMiles
    const _visibleMilesLength = this._visibleMiles.length;
    for (let i = 0; i < _visibleMilesLength; i++) {

      const _mileId = this._visibleMiles[i]

      if (_newVisibleMiles.indexOf(_mileId) < 0) {
        _oldmMilesToDelete.push(_mileId);
      } else {
        _newVisibleMiles.splice(_newVisibleMiles.indexOf(_mileId), 1);
      }
    }

    this._drawMiles(_newVisibleMiles);
    this._setBounds();
    this._removeMiles(_oldmMilesToDelete);

    this._visibleMiles = this._visibleMiles.concat(_newVisibleMiles);
  }

  // draw all mile data
  private _drawMiles(mileIds: Array<number>): void {

    const _self = this;

    if (mileIds.length === 0) {
      return;
    }

    const _mileIdsLength = mileIds.length;

    for (let i = 0; i < _mileIdsLength; i++) {

      const _mileId = mileIds[i];

      if (_self._visibleMiles.indexOf(_mileId) !== -1) {
        return;
      }

      const _mile = _self._trailGenerator.getTrailData().miles[_mileId];

      if (!_mile) {
        return;
      }

      if (_mile.id === _self.activeMileId) {
        _self._centerpoint = _mile.centerpoint;
      }

      _self._renderedData[_mileId] = {};

      _self._drawTrail(_mile, _mileId);
      _self._drawSnow(_mile, _mileId);
      _self._drawPois(_mile, _mileId);
    }
  }

  // removes miles (trail/snow/pois/labels/lines that are no longer visible
  private _removeMiles(mileIds: Array<number>): void {

    const _self = this;

    if (mileIds.length === 0) {
      return;
    }

    const _mileIdsLength = mileIds.length;
    for (let i = 0; i < _mileIdsLength; i++) {

      const _mileId = mileIds[i];

      if (_self._popupBelongsTo === _mileId) {
        // todo: reference the popup/tooltip or it wont work
        this._map.closePopup();
        this._map.closeTooltip();
      }

      try {

        if (_self._renderedData[_mileId] && _self._map) {

          // remove miles/markers/snow data
          for (const key in _self._renderedData[_mileId]) {
            _self._map.removeLayer(_self._renderedData[_mileId][key]);

            if (key === 'markers') {
              _self._renderedData[_mileId][key].clearLayers();
            }

            _self._renderedData[_mileId][key] = null;
            delete _self._renderedData[_mileId][key];
          }

          // clear container
          _self._renderedData[_mileId] = null;
          delete _self._renderedData[_mileId];
          _self._visibleMiles.splice(_self._visibleMiles.indexOf(_mileId), 1);

          // this leaves the array structure in plac (it'll be the length of the trail, as we're using the index for reference)
        }
      } catch (e) {
        console.log(e);
      }

    }
  }

  // TODO: there is overlap between this and how the elevation profile deals with the same data, could/should be optimised

  // draw trail line segment
  private _drawTrail(mile: Mile, index: number): void {

    const _waypoints: Array<any> = [];

    const _waypointsLength = mile.waypoints.length;

    for (let i = 0; i < _waypointsLength; i++) {

      const _wp: L.latLng = new L.latLng(mile.waypoints[i].latitude, mile.waypoints[i].longitude, mile.waypoints[i].elevation);

      _waypoints.push(_wp);
    }

    // draw waypoints
    const _trailLine = new L.Polyline(_waypoints, {
      color: 'red', weight: 4, opacity: 1, smoothFactor: 0
    });

    _trailLine['mileId'] = mile.id;       // set the mileId for referencing

    this._renderedData[index].trail = _trailLine;

    this._trailLayers.addLayer(_trailLine);
    _trailLine.addTo(this._map);
  }

  private _drawSnow(mile: Mile, index: number): void {

    const _snowData = this._snowGenerator.getSnowForMile(index);

    const snowMile = (_snowData) ? _snowData[0] : undefined;

    let _snowPoints: Array<any> = [];

    if (snowMile) {

      mile.waypoints.forEach((waypoint) => {

        function elevationRange(): number {

          // waypoint distance (%) on snowarray elevation range
          return snowMile[0].elevation + ((waypoint.distance / environment.MILE) * ((snowMile[1].elevation - snowMile[0].elevation)));
        }

        // if waypoint is above showline
        if (waypoint.elevation >= elevationRange()) {

          // add point
          const _wp: L.latLng = new L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);
          _snowPoints.push(_wp);

        } else if (waypoint.elevation < elevationRange() && _snowPoints.length > 0) {

          this._drawSnowLine(_snowPoints, index);

          _snowPoints = [];
        }

      });

      // if there is still snow to be drawn at the end of loop
      if (_snowPoints.length > 0) {

        this._drawSnowLine(_snowPoints, index);
      }
    }
  }

  // draw snow line segment
  private _drawSnowLine(waypoints: Array<any>, index: number): void {

    const _stroke: string = (this._screenModeService.screenModeSubject.getValue() === 'highContrast') ? '#97ffff' : 'rgba(255,255,255,0.9)';

    // draw waypoints
    const _snowLine = new L.Polyline(waypoints, {
      color: _stroke, weight: 8, smoothFactor: 0
    });

    this._renderedData[index].snow = _snowLine;

    _snowLine.addTo(this._map);
  }

  // draw pois
  private _drawPois(mile: Mile, index: number): void {

    const _self = this;

    const _assemblePoiMarker = function (poi: Poi): any {

      const _element = document.createElement('div');
      const _svg = SVG(_element).size(36, 54).style('overflow', 'visible');

      _self._markerFactory.setupMarker(_svg, poi, null);

      const _icon = htmlIcon({className: 'marker', html: _element});
      const _poiMarker = L.marker(waypointToLatLng(poi.waypoint), {icon: _icon , poi: poi});
      _poiMarker.on('click', _self._onMarkerClick.bind({data: poi, self: _self}));

      return _poiMarker;
    };

    // get notes for mile
    // notes should be saved as an object per mile, so the loop is shorter?
    const _notePois: Array<Poi> = [];
    if (this._notes) {
      const _length = this._notes.length;
      for (let i = 0; i < _length; i++) {

        const _note: Poi = this._notes[i];
        _notePois.push(_note);
      }
    }

    let _mileMarkers: Array<any> = [];

    if (mile.id !== 1) {
      // startMile marker
      _mileMarkers = _mileMarkers.concat(this._createLabelMarker(index, mile));
    }

    // pois sit on top of label markers
    if (this.showPois) {

      const _maxPoiDistance = this.localStorage.retrieve('poiMaxDistance');

      if (mile.pois) {

        const _poiLength = mile.pois.length;
        for (let i = 0; i < _poiLength; i++) {

          const _poi: Poi = this._trailGenerator.getPoiById(mile.pois[i]);

          // filter out of range pois (TODO: side trails)
          if (_poi.waypoint.distance >= _maxPoiDistance) {
            return;
          }

          _mileMarkers.push(_assemblePoiMarker(_poi));
        }
      } else if (_notePois.length > 0) {

        const _length = _notePois.length;
        for (let j = 0; j < _length; j++) {

          const _poi = _notePois[j];

          // filter out of range pois (TODO: side trails)
          if (_poi.waypoint.distance >= _maxPoiDistance) {
            return;
          }

          _mileMarkers.push(_assemblePoiMarker(_poi));
        }
      }
    }

    const _markerGroup = L.featureGroup(_mileMarkers);

    this._renderedData[index].markers = _markerGroup;
    _markerGroup.addTo(this._map);
  }

  private _drawUser(): void {

    const _self = this;

    if (!this._userMarker) {
      this._userMarker = this._createUserMarker(this.user);
    }

    if (this.user && this._map && this.user.waypoint) {

      const _userLocation = new L.LatLng(this.user.waypoint.latitude, this.user.waypoint.longitude);

      this._userMarker.setLatLng(_userLocation);
      this._userMarker.on('click', function(e) {

        const _closestLayer = L.GeometryUtil.closestLayer(_self._map,
          _self._trailLayers.getLayers(), e.latlng);

        if (_closestLayer) {

          // get the nearest point(s) for mile (own data routine)
          const _mile: Mile = _self._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
          const _nearestPoints = _self._trailGenerator.findNearestWaypointInMile(_self.user.waypoint, _mile);

          const _nearestMileage: string = (_self.user.anchorPoint.distanceTotal / environment.MILE).toFixed(2);

          let _onOffTrailString;
          let _2ndLine = '';

          // TODO: user also has a distance from trail value, needs to be displayed?
          const _offTrail = (_nearestPoints[0]['distance'] > _self.localStorage.retrieve('poiDistanceOffTrail'));
          if (_offTrail) {
            _onOffTrailString = (_nearestPoints[0]['distance'] / environment.MILE).toFixed(2) + ' mi. off trail';
            _2ndLine = 'Nearest: mi. ' + _nearestMileage;
          } else {
            _onOffTrailString = 'On trail';
            _2ndLine = 'mi. ' + _nearestMileage;
          }

          _self._createPopupComponent(e.latlng,
            {title: _onOffTrailString, message: _2ndLine, showCoords: true, location: e.latlng});
        }
      });

      this._userMarker.addTo(this._map);
    }
  }

  private _setBounds(): void {

    if (!this.poiRange) {
      return;
    }

    // get the poi map objects

    const _bounds: Array<any> = [];

    const _rLength = this._renderedData.length;
    let _visibleMileCount = 0;

    for (let i = 0; i < _rLength; i++) {

      const _mileData = this._renderedData[i];

      if (_mileData && _mileData.markers) {

        for (const key in _mileData.markers._layers) {

          const _marker = _mileData.markers._layers[key];

          if (_marker.options.poi && this.poiRange.indexOf(_marker.options.poi.id) !== -1
            || _marker.options.mileNumber && this.mileRange.indexOf(Number(_marker.options.mileNumber)) !== -1) {

            if (_visibleMileCount < 5) {
              _visibleMileCount++;
              _bounds.push(_marker);
            }
          }
        }
      }
    }

    if (_bounds.length > 0) {

      const _group = new L.featureGroup(_bounds, this.centerPoint);

      this._map.stop();

      // else center on the center mile of the rendered range.
      if (this._renderedCenterMileId === -1) {
        this._map.fitBounds(_group.getBounds(), {animate: this._animateMap, duration: 0.5, maxZoom: 16});
      } else {
        const _centerPoint = this._trailGenerator.getTrailData().miles[this._renderedCenterMileId].centerpoint;
        this._map.setView([_centerPoint['latitude'], _centerPoint['longitude']], 13.75, {animate: this._animateMap, duration: 0.5, maxZoom: 16});
      }
    }
  }

  private _centerOnPoint(point: Waypoint): void {
    if (this._map) {

      const _animate = (this.userCentered || this._animateMap);

      this._map.panTo([point.latitude, point.longitude], {animate: _animate, duration: 0.5, maxZoom: 16});
    }
  }

  public centerOnUser(): void {
    if (this.user) {
      this._centerOnPoint(this.user.waypoint);
    }
  }

  // EVENT HANDLERS

  // linked directly to svg marker (scope change)
  private _onMarkerClick (event: MouseEvent) {

    const _event: CustomEvent = new CustomEvent(
      'markerClick',
      {
        bubbles: true,
        cancelable: true,
        detail: this['data']
      });

    // get DOM element on changed scope
    this['self']._map._container.dispatchEvent(_event);
  }


  public onStatusChange(status: string): void {

    super.onStatusChange(status);
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    // use the id for status
    if (this._userMarker) {
      this._userMarker._icon.id = this.status;
    }

    super.onUserLocationChange(user);

    if (this._map) {
      this._drawUser();
    }

    if (this.userCentered) {
      this.centerOnUser();
    }
  }


  // CREATE MAP ELEMENTS

  // a label marker is drawn at the start of a mile
  private _createLabelMarker(index: number, mile: Mile): Array<any> {

    let _labelElements: Array<any> = [];

    /* calculate the exact X (start) location for the mile,
    miles overlap so it's somewhere between point 0 and 1
    [0]=====[X]=====[1] */

    // calculate percentage of X point in total covered distance by 2 points
    const _xDistance = Math.abs(mile.waypoints[0].distance) + mile.waypoints[1].distance;
    const _xPercentage = Math.abs(mile.waypoints[0].distance) / _xDistance;

    // calculate lang/long/elevation based on percentage
    const _xPoint: Waypoint = {
      latitude: mile.waypoints[0].latitude + ((mile.waypoints[1].latitude - mile.waypoints[0].latitude) * _xPercentage),
      longitude: mile.waypoints[0].longitude + ((mile.waypoints[1].longitude - mile.waypoints[0].longitude) * _xPercentage),
      elevation: mile.waypoints[0].elevation + ((mile.waypoints[1].elevation - mile.waypoints[0].elevation) * _xPercentage),
      distance: 0,    // unused
      distanceTotal: (mile.id - 1) * environment.MILE
    };

    /* calculate the position of the mile marker based on the angle of the trail
    * there are 2 measurements:
    * - a long one (based on a quarter mile in either direction
    * - a short one (based on 2 points ahead / 2 points behind
    *
    * depending on the angle and the direction a new point is generated
    * depending on the sharpness of bend the marker distance is calucated*/

    // TODO: optimise / cleanup, works fine, could/should be shorter/clearer

    const _prevMile = this._trailGenerator.getTrailData().miles[index - 1];

    const _nearPoint: Waypoint = mile.waypoints[2];
    const _prevNearPoint: Waypoint = _prevMile.waypoints[_prevMile.waypoints.length - 3];
    const _prevCenter: object = _prevMile.centerpoint;
    const _mileCenter: object = mile.centerpoint;

    const _quarterMilePoint: object = {
      latitude: (_xPoint.latitude + Number(_mileCenter['latitude'])) / 2,
      longitude: (_xPoint.longitude + Number(_mileCenter['longitude'])) / 2,
    };

    const _prevQuarterMilePoint: object = {
      latitude: (_xPoint.latitude + Number(_prevCenter['latitude'])) / 2,
      longitude: (_xPoint.longitude + Number(_prevCenter['longitude'])) / 2,
    };

    const _prevQPoint = new L.latLng(_prevQuarterMilePoint['latitude'], _prevQuarterMilePoint['longitude'], 0);
    const _qPoint = new L.latLng(_quarterMilePoint['latitude'], _quarterMilePoint['longitude'], 0);
    const _zPoint = new L.latLng(_xPoint.latitude, _xPoint.longitude, 0);
    const _nPoint = new L.latLng(_nearPoint.latitude, _nearPoint.longitude, 0);
    const _prevNPoint = new L.latLng(_prevNearPoint.latitude, _prevNearPoint.longitude, 0);

    const calcHeading = function (waypoint1: any, waypoint2: any): number {
      return Math.atan2(waypoint2.lng - waypoint1.lng, waypoint2.lat - waypoint1.lat) * 180 / Math.PI;
    }

    const _headingLong = calcHeading(_zPoint, _qPoint);
    const _headingLongPrev = calcHeading(_prevQPoint, _zPoint);
    const _headingShort = calcHeading(_zPoint, _nPoint);
    const _headingShortPrev = calcHeading(_prevNPoint, _zPoint);

    const _longBend = _headingLong - _headingLongPrev;
    const _shortBend = _headingShort - _headingShortPrev;

    const _shortPrevLongBend = _headingShort - _headingLongPrev;

    let _useShort: boolean;
    let _overHalf: boolean;

    if (_longBend > 0) {
      if (_shortPrevLongBend < _longBend) {
        _useShort = true;
      } else {
        _overHalf = true;
      }
    } else {
      if (_shortPrevLongBend > _longBend) {
        _useShort = true;
      } else {
      }
    }

    if (_useShort) {
      if (_shortBend > 0) {
        _overHalf = true;
      }
    }

    // the actual angle calculation
    const _startAngle = (_useShort) ? _headingShortPrev : _headingLongPrev;
    const _offsetAngle = (_useShort) ? _shortBend : _longBend;

    // distance gets smaller the sharper the corner is...
    const _distancePerc = 1 - Math.abs(_offsetAngle / 180);

    let _angle: number = _startAngle + (_offsetAngle / 2);
    _angle = (_overHalf) ? _angle - 90 : _angle + 90;

    // from -180 to 180
    if (_angle > 180) {
      _angle = -180 - (_angle - 180);
    } else if (_angle < -180) {
      _angle = 180 - Math.abs(_angle - 180);
    }

    const _distance = (environment.MILE / 8) * _distancePerc;

    const _point: Waypoint = this._createPoint(_xPoint, _angle, _distance);

    const _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + (mile.id - 1) + '</div>'});
    _labelElements.push(L.marker([_point.latitude, _point.longitude], {icon: _labelIcon, mileNumber: mile.id - 1}));

    const _newPoint = new L.latLng(_point.latitude, _point.longitude, 0);

    if (_distance > 0) {
      _labelElements = _labelElements.concat(this._createGuide(_zPoint, _newPoint));
    }

    return _labelElements;
  }

  // create a point based on distance/angle of another point
  private _createPoint(point: Waypoint, angle: number, kms: number): Waypoint {

    const toRad = function(deg: number) {
      return deg * Math.PI / 180;
    }

    const toDeg = function(rad: number) {
      return rad * 180 / Math.PI;
    }

    const dist = (kms / 1000) / 6371;
    angle = toRad(angle);

    const lat1 = toRad(point.latitude), lon1 = toRad(point.longitude);

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
      Math.cos(lat1) * Math.sin(dist) * Math.cos(angle));

    const lon2 = lon1 + Math.atan2(Math.sin(angle) * Math.sin(dist) *
      Math.cos(lat1),
      Math.cos(dist) - Math.sin(lat1) *
      Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) { return; }

    return {latitude: toDeg(lat2), longitude: toDeg(lon2), elevation: 0};
  }

  // create an svg user marker
  private _createUserMarker(user: User): any {
    if (!user) {
      return;
    }
    return L.marker([user.waypoint.latitude, user.waypoint.longitude], {icon: this._markerFactory.createLeafletUserMarker(), user: user, forceZIndex: 1000});
  }

  // create a guide line, with optional arrowheads on either side.
  private _createGuide(point1: any, point2: any, arrowHeadStart?: boolean, arrowHeadEnd?: boolean, color?: string, width?: number): Array<any> {

    const _elements: Array<any> = [];

    const _weight = width || 2;

    const _guide = new L.geodesic([], {
      color: color || 'rgb(119, 119, 119)',
      dashArray: _weight * 2.5 + ' ' + _weight * 3.5,
      weight: _weight,
      opacity: 1,
      smoothFactor: 3,
      steps: 10
    });

    _guide.setLatLngs([[point1, point2]]);

    _elements.push(_guide);

    const _createArrowHead = function (guide: any, positionPerc: number): any {

      const _angle = (positionPerc === 0 ) ? 270 : 90;

      return L.polylineDecorator(guide, {
        patterns: [{
          offset: positionPerc + '%',
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 5,
            headAngle: _angle,
            polygon: false,
            pathOptions: {
              color: color,
              weight: 2}
          })
        }]
      });
    };

    if (arrowHeadStart) {
      _elements.push(_createArrowHead(_guide, 0));
    }

    if (arrowHeadEnd) {
      _elements.push(_createArrowHead(_guide, 100));
    }

    return _elements;
  }

  // load an angular component into a leaflet component
  private _createPopupComponent(location: L.LatLng, properties?: object): void {

    const _self = this;
    const _popupContent = this._createDynamicComponent('popup', properties);

    const _popup = L.popup({closeButton: false, autoClose: true, closeOnClick: true})
      .setLatLng(location)
      .setContent(_popupContent)
      .addTo(this._map);

    clearTimeout(this._popupTimer);
    this._popupTimer = setTimeout(function() {
      _self._map.closePopup(_popup);
      _self._clearOverlayElements();
    }, 4000);

    _popupContent.timer = this._popupTimer;
  }

  // load an angular component into a leaflet component
  private _createTooltipComponent(location: L.LatLng, properties?: object): void {

    const _self = this;
    const _tooltipContent = this._createDynamicComponent('tooltip', properties);

    const _tooltip = L.tooltip({autoClose: true, closeOnClick: true})
      .setLatLng(location)
      .setContent(_tooltipContent)
      .addTo(this._map);

    // disable hide on click
    const _tElement = _tooltip.getElement();
    _tElement.addEventListener('click', function(event: Event) {
      event.stopPropagation();
    });

    clearTimeout(this._tooltipTimer);
    this._tooltipTimer = setTimeout(function() {
      console.log('close tooltip timer');
      _self._map.closeTooltip(_tooltip);
      _self._clearOverlayElements();
    }, 2000);

    _tooltipContent.timer = this._tooltipTimer;
  }

  private _createDynamicComponent(type: string, properties?: object): any {

    let _component;
    if (type === 'popup' || type === 'tooltip') {
      const _popup: NgElement & WithProperties<PopupComponent> = document.createElement('leaflet-element-popup') as any;
      _component = _popup;
    }

    _component.addEventListener('closed', () => document.body.removeChild(_component));

    // set properties
    if (properties) {
      for (const key in properties) {
        _component[key] = properties[key];
      }
    }

    document.body.appendChild(_component);
    return _component;
  }

}
