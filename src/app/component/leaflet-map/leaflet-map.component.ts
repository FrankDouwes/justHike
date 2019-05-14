import * as L from 'leaflet';
import * as geolib from 'geolib';

import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';
import 'node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js';
import 'node_modules/leaflet.Geodesic/Leaflet.Geodesic.js';
import '../../_util/leaflet/marker.js';
import '../../_util/leaflet/plugins/grid/mgrs';
import '../../_util/leaflet/plugins/grid/grid';
import '../../_util/leaflet/plugins/grid/scale';

import {Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Mile} from '../../type/mile';
import {ActivatedRoute} from '@angular/router';
import {Poi} from '../../type/poi';
import {LocationBasedComponent} from '../../base/location-based/location-based.component';
import {User} from '../../type/user';
import {Waypoint} from '../../type/waypoint';
import {environment} from '../../../environments/environment.prod';
import {SnowGeneratorService} from '../../service/snow-generator.service';
import {TrailGeneratorService} from '../../service/trail-generator.service';
import {OrientationService} from '../../service/orientation.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ScreenModeService} from '../../service/screen-mode.service';
import {MarkerService} from '../../factory/marker.service';
import {htmlIcon} from '../../_util/leaflet/icon';
import {calculateLabelLocation, calculatePoint, calculateTrailAnchorPoint} from '../../_util/leaflet/calculate';
import {latLngToWaypoint, waypointToLatLng} from '../../_util/leaflet/converter';
import {distanceInMilesFeet} from '../../_util/math';
import {NoteService} from '../../service/note.service';
import {createGridLayer, createMapTileLayer} from '../../_util/leaflet/layer';
import {clearTimeOut, TimerObj} from '../../_util/timer';
import {Distance} from '../../_util/geolib/distance';
import {DynamicComponentManager} from './elements/dynamic-component-manager';
import {Town} from '../../type/town';
import {getPoiTypeByType} from '../../_util/poi';
import {createGuide} from '../../_util/leaflet/guide';

declare const SVG: any;    // fixes SVGjs bug

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// uses basic for loops for performance
/* TODO: split up this monster into some smaller files */
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

  private _dynamicComponentManager: DynamicComponentManager;

  private _map: any;
  private _initialized = false;
  private _showMileGrid: boolean;
  private _animateMap: boolean;
  private _trailLength: number;
  private _tileLayersVisible = true;

  private _centerpoint: object;
  private _userMarker;
  private _visibleMiles: Array<number> = [];

  private _renderedData: Array<any> = [];
  private _renderedCenterMileId: number;
  private _popupBelongsTo = -1;       // uses mile index, not mile.id

  private _tileLayers: Array<any> = [];
  private _trailLayers: any = L.layerGroup();

  private _popupTimer: TimerObj;
  private _tooltipTimer: TimerObj;

  private _overlayElements: Array<any>;

  constructor(
    private _route:                 ActivatedRoute,
    private _snowGenerator:         SnowGeneratorService,
    private _trailGenerator:        TrailGeneratorService,
    private _orientationService:    OrientationService,
    private _localStorageService:   LocalStorageService,
    private _screenModeService:     ScreenModeService,
    private _markerFactory:         MarkerService,
    private _noteService:           NoteService
  ) {
    super();
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    const _self = this;

    this._showMileGrid = this._localStorageService.retrieve('showMileGrid');
    this._animateMap = this._localStorageService.retrieve('animateMap');
    this._trailLength = this._trailGenerator.getTrailData().miles.length;

    this.addSubscription('notes', this._noteService.noteUpdateObserver.subscribe(function(update) {

      if (update === 'added') {

        const _lastAddedNote: Poi = _self._noteService.getLastNote();

        // extra check, should
        if (_self._visibleMiles.includes(_lastAddedNote.belongsTo - 1)) {
          clearTimeOut(_self._popupTimer);
          clearTimeOut(_self._tooltipTimer);
          _self._addNote(_lastAddedNote);
        }
      } else if (update === 'removed') {
        const _deletedNote: Poi = _self._noteService.getLastNote();
        _self._removeMarkerByPoiId(_deletedNote.id);
      }
    }));


    // TODO: needs a if rendered mile check
    const _appRoot = document.getElementsByTagName('app-root')[0];
    this.addEventListener(_appRoot, ['markerClick'] , function(event: Event) {
      if (event['detail'] && event['detail'].waypoint) {
        _self._centerOnPoint(event['detail'].waypoint, true);
      }
    }, false);
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

    const _showRetinaTiles: boolean = this._localStorageService.retrieve('detectRetina');
    const _url = this._generateTileUrl();

    // create the tile layer (deals with online / offline / missing tiles)
    if (this.showMapTiles) {
      const _1stLayer = createMapTileLayer(_url, 15, _showRetinaTiles);
      this._tileLayers.push(_1stLayer);
    }

    if (this.allowZooming) {
      // add 2nd zoomed out layer
      const _2ndTileLayer = createMapTileLayer(_url, 12, _showRetinaTiles);
      this._tileLayers.push(_2ndTileLayer);

      // grid layer is only shown on the full map, not the mini map
      if (this._showMileGrid) {
        this._tileLayers = this._tileLayers.concat(createGridLayer());
      }
    }

    // setup the leaflet map
    this._map = new L.map('leaflet_' + this.name, {
      minNativeZoom: 15,
      maxNativeZoom: 15,
      minZoom: 12.5,
      maxZoom: 16,
      zoomControl: false, attributionControl: false,
      layers: this._tileLayers,
      zoomSnap: 0,
      preferCanvas: true,
      closePopupOnClick: false,     // manual toggle
      maxBoundsViscosity: 0.95      // near solid
    });

    this._dynamicComponentManager = new DynamicComponentManager(this._map);
    this._setupMapListeners();
    this._setMapInteractionProperties();

    // set an initial location
    this._map.setView([0, 0], 14.5);
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
      const _scaleOptions = {
        gridType: 'distance',
        showMetric: false,
        metric: false
      };

      // if theres a grid, add scale indicator
      if (this._showMileGrid) {
        const _scale = L.control.gridscale(_scaleOptions);
        _scale.addTo(this._map);
      } else {
        L.control.scale(_scaleOptions).addTo(this._map);
      }

    }
  }

  /* setup routines for popup/ indicator showing the position and trail mileage
  * manually closes popup (disabled feature on map */
  private _setupMapListeners(): void {

    const _self = this;

    // show popup or indicator (and guides)
    this._map.on('click', function(e: any) {

      if (!_self.userCentered) {
        // if there's still an overlay, or overlay data, get rid of it.
        if (_self._overlayElements) {

          clearTimeOut(_self._popupTimer);
          clearTimeOut(_self._tooltipTimer);

          return;
        }

        _self._createPopupTooltip(e);
      }
    });

    /* when a user zooms out, render zoom layer 12, this is to prevent drawing a lot of images
    which would be bad for performance/battery */
    this._map.on('zoom', function() {
      _self._onMapZoom();
    });
  }

  private _onMapZoom(): void {
    const _zoomLevel = this._map.getZoom();

    if (_zoomLevel < 13.25 && this._tileLayersVisible) {
      this._tileLayers.forEach((layer) => {

        if (layer.options.name === 'layer_15') {
          layer.removeFrom(this._map);
        } else if (layer.options.name === 'layer_12') {
          layer.addTo(this._map);
        }
      });

      this._tileLayersVisible = false;

    } else if (_zoomLevel >= 13.25 && !this._tileLayersVisible) {
      this._tileLayers.forEach((layer) => {
        if (layer.options.name === 'layer_15') {
          layer.addTo(this._map);
        } else if (layer.options.name === 'layer_12') {
          layer.removeFrom(this._map);
        }
      });

      this._tileLayersVisible = true;
    }
  }


  // clear all the extra elements that belong to the overlays (popups/tooltips)
  private _clearOverlayElements(): void {

    const _self = this;

    if (this._overlayElements && this._overlayElements.length > 0) {
      this._overlayElements.forEach(function(element) {
        if (_self._map && element) {
          _self._map.removeLayer(element); // remove
        }
      });
    }

    this._popupBelongsTo = -1;
    this._overlayElements = null;
  }

  // generate a tile url, if online tiles are available (downloaded) use those, else use an online source
  private _generateTileUrl(): string {

    const _version = this._localStorageService.retrieve(this.trailGenerator.getTrailData().abbr + '_tilesVersion');

    if (_version) {
      // appends the ionic webview compatible root directory URL
      return this.fileSystem.rootPath + this.trailGenerator.getTrailData().abbr + '/' + _version + '/tiles/{z}/{x}/{y}.png';
    } else {
      return environment.onlineTileUrl;
    }
  }

  // display Tooltip (on trail) or Popup (off trail), both use dynamic components as content
  private _createPopupTooltip(e: any): void {

    const _self = this;
    const _eLatLngAsWaypoint = latLngToWaypoint(e.latlng)
    let _anchor: Waypoint;
    let _nearestPoint: Distance;
    let _closerToTown: boolean;

    // use a plugin to get the nearest point in the nearest (rendered) trail segment.
    // check for nearest town, if closer, use town as "belongsTo"
    // TODO: eliminate the plugin dependency, since I'm only using a single function
    const _closestLayer = L.GeometryUtil.closestLayer(this._map, this._trailLayers.getLayers(), e.latlng);

    if (!_closestLayer) {
      return;     // no trail
    }

    const _mile: Mile = this._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
    const _nearestPoints: Array<Distance> = this._trailGenerator.findNearestWaypointInMile(_eLatLngAsWaypoint, _mile);
    _nearestPoint = _nearestPoints[0];
    _anchor = calculateTrailAnchorPoint(_mile, _nearestPoints);
    let _nearestTown: Town;
    _closerToTown = false;

    // check for towns TODO: enable for B3
    // if (this._trailGenerator.getTrailData().towns && this._trailGenerator.getTrailData().towns.length > 0) {
    //   const _nearestTownRef: Distance = this._trailGenerator.findNearestTown(_eLatLngAsWaypoint) as Distance;
    //   if (_nearestTownRef.distance < _nearestPoint.distance) {
    //     _nearestPoint = _nearestTownRef;
    //     _nearestTown = this._trailGenerator.getTownById(Number(_nearestTownRef.key));
    //     _anchor = _nearestTown.waypoint;
    //     _closerToTown = true;
    //   }
    // }

    const _anchorAsLatLng: L.latlng = waypointToLatLng(_anchor);    // convert for leaflet

    // if the distance is substantial, show a guideline/popup, else show a tooltip (always show popup for closer to town)
    const _offTrail = (_closerToTown || _nearestPoint.distance > this.localStorage.retrieve('poiDistanceOffTrail'));

    if (_offTrail) {
      this._popupBelongsTo = (_closerToTown) ? Number(_nearestTown.id || 0) : Number(_closestLayer.layer.mileId);
      this._activatePopup(e.latlng, _anchorAsLatLng, _nearestPoint.distance, _anchor.distanceTotal, (_closerToTown) ? 'town' : 'trail');

      // render guides
      this._overlayElements.forEach(function(element) {
        element.addTo(_self._map);
      });

    } else {

      this._popupBelongsTo = Number(_closestLayer.layer.mileId);
      this._activateTooltip(_anchorAsLatLng, _anchor.distanceTotal);

      // create empty array for 'click' cycle
      this._overlayElements = [];
    }
  }

  // activate a popup (component)
  private _activatePopup(waypoint: L.latLng, anchor: L.latLng, offTrailDistance: number, nearestMileage: number, belongsToType: string): void {

    const _offTrailDistanceConverted: any = distanceInMilesFeet(offTrailDistance);
    const _nearestMileageConverted: any = distanceInMilesFeet(nearestMileage);

    const _label: string =  + _offTrailDistanceConverted.distance + ' ' + _offTrailDistanceConverted.unit + ' off trail';
    const _description: string = 'Nearest: ' + _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance;
    this._popupTimer = this._dynamicComponentManager.createPopupComponent(waypoint,
      {
        label: _label,
        description: _description,
        waypoint: waypoint,
        anchorPoint: anchor,
        distance: offTrailDistance,
        distanceTotal: nearestMileage,
        belongsTo: this._popupBelongsTo,
        belongsToType: belongsToType
      }, this._clearOverlayElements.bind(this));

    this._overlayElements = createGuide(anchor, waypoint, false, false, 'rgba(255, 0, 0, 0.5)', 3, true);
  }

  // activate a tooltip (component)
  private _activateTooltip(waypoint: L.latLng, nearestMileage: number): void {

    const _nearestMileageConverted: any = distanceInMilesFeet(nearestMileage);

    _nearestMileageConverted.unit = String(_nearestMileageConverted.unit).charAt(0).toUpperCase() + String(_nearestMileageConverted.unit).slice(1);

    this._dynamicComponentManager.createTooltipComponent(waypoint, {
      waypoint: waypoint,
      anchorPoint: waypoint,
      label: _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance,
      distance: 0,
      distanceTotal: nearestMileage,
      belongsTo: this._popupBelongsTo
    },this._clearOverlayElements.bind(this));
  }


  // ELEMENT CREATION

  // manages the visible data (mile segments, markers, guides and snow)
  // the map only renders what should be visible based on the range provided)
  private _dataManager(): void {

    if (!this.range) {
      return;
    }

    const _trailLength = this._trailGenerator.getTrailData().miles.length;

    // get visible miles
    const _relativeRange = {start: this.activeMileId - this.range['behind'], end: this.activeMileId + this.range['ahead']};

    const _oldmMilesToDelete: Array<number> = [];
    let _newVisibleMiles: Array<number> = [];

    if (_relativeRange.start < _relativeRange.end - 9) {
      this._renderedCenterMileId = _relativeRange.start + Math.floor((_relativeRange.end - _relativeRange.start) / 2);
    } else {
      this._renderedCenterMileId = -1;
    }

    // create range array (check for trail ends)
    for (let i = _relativeRange.start; i <= _relativeRange.end; i++) {
      if (i >= 0 && i < _trailLength) {
        _newVisibleMiles.push(i);
      }
    }

    // always render at least 7 miles (if trail is shorter, show all)
    if (_newVisibleMiles.length < 7) {
      if (_trailLength < 7) {

        // short trail
        _newVisibleMiles = [];
        for (let i = 0; i < _trailLength; i++) {
          _newVisibleMiles.push(i);
        }
      } else {
        // trail over 7 miles, check for start/end
        if (_newVisibleMiles.indexOf(0) !== -1) {

          // start of trail
          _newVisibleMiles = [0, 1, 2, 3, 4, 5, 6]; // just force it

        } else if (_newVisibleMiles.indexOf(_trailLength - 1) !== -1) {
          // end of trail
          _newVisibleMiles = [];
          for (let i = _trailLength - 1; i > _trailLength - 1 - 6; i--) {
            _newVisibleMiles.push(i);
          }
        }
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
    this._removeMiles(_oldmMilesToDelete);

    this._visibleMiles = this._visibleMiles.concat(_newVisibleMiles);
    this._setBounds();
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
      _self._drawTowns(_mile, _mileId);
      _self._drawNotes(_mile, _mileId);
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

      if (_self._popupBelongsTo === _mileId + 1) {
        clearTimeOut(this._popupTimer);
        clearTimeOut(this._tooltipTimer);
      }

      try {

        if (_self._renderedData[_mileId] && _self._map) {

          // remove miles/markers/snow data/notes/towns
          for (const key in _self._renderedData[_mileId]) {

            // clear from trailLayers
            if (key === 'trail') {
              _self._trailLayers.removeLayer(_self._renderedData[_mileId].trail);
            }

            _self._map.removeLayer(_self._renderedData[_mileId][key]);

            if (key === 'markers' || key === 'notes' || key === 'towns') {
              _self._renderedData[_mileId][key].clearLayers();
            }

            _self._renderedData[_mileId][key] = null;
            delete _self._renderedData[_mileId][key];
          }

          // clear container
          _self._renderedData[_mileId] = null;
          delete _self._renderedData[_mileId];
          _self._visibleMiles.splice(_self._visibleMiles.indexOf(_mileId), 1);

          // this leaves the array structure in place (it'll be the length of the trail, as we're using the index for reference)
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

  private _assemblePoiMarker (poi: Poi, optionalMarkerParams?: object): any {

    const _element = document.createElement('div');
    const _svg = SVG(_element).size(36, 54).style('overflow', 'visible');

    this._markerFactory.setupMarker(_svg, poi, null);

    const _poiTypeClasses  = poi.type.split(',').join('');

    const _icon = htmlIcon({className: 'marker ' + _poiTypeClasses, html: _element});
    let _options = {icon: _icon , poi: poi};

    // add additional params to marker
    if (optionalMarkerParams) {
      _options = {..._options, ...optionalMarkerParams};
    }

    const _poiMarker = L.marker(waypointToLatLng(poi.waypoint), _options);
    _poiMarker.on('click', this._onMarkerClick.bind({data: poi, self: this}));

    return _poiMarker;
  };

  // draw pois
  private _drawPois(mile: Mile, index: number): void {

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

          _mileMarkers.push(this._assemblePoiMarker(_poi));
        }
      }
    }

    const _markerGroup = L.featureGroup(_mileMarkers);
    this._renderedData[index].markers = _markerGroup;
    _markerGroup.addTo(this._map);
  }

  // draw towns
  private _drawTowns(mile: Mile, index: number): void {

    let _towns: Array<any> = [];

    if (mile.towns) {

      const _length = mile.towns.length;
      for (let i = 0; i < _length; i++) {

        const _town: Town = this._trailGenerator.getTownById(mile.towns[i]);

        const _townNotes = this._noteService.getFlatNotesArray('town', _town.id);

        // TODO: draw town notes/poi

        // draw line from anchor point in direction of town
        if (_town.anchorPoint) {

          let _distance: number = geolib.getDistance(waypointToLatLng(_town.waypoint), waypointToLatLng(_town.anchorPoint as Waypoint))

          // only draw guide if trail is over a half mile away
          // max guide length is 0.125mi
          if (_distance > environment.MILE / 2) {

            _distance = ((_distance / 8) > environment.MILE / 2) ? environment.MILE : _distance / 8;

            // const _heading = Math.atan2(_town.centerPoint.longitude - _town.anchorPoint.longitude, _town.centerPoint.latitude - _town.anchorPoint.latitude) * 180 / Math.PI;
            // const _point: Waypoint = calculatePoint(town.anchorPoint, _heading, _distance);

            const _point = _town.waypoint;

            const _guide = createGuide(waypointToLatLng(_town.anchorPoint as Waypoint), waypointToLatLng(_point), false, true, 'rgba(155, 155, 155, 0.5)', 4, true);
            _towns = _towns.concat(_guide);
          }
        }

        const _townMarker = this._assembleTownMarker(_town);
        _townMarker.on('click', this._onMarkerClick.bind({data: _town, self: this}));
        _towns.push(_townMarker);
      }
    }

    const _townsGroup = L.featureGroup(_towns);
    this._renderedData[index].towns = _townsGroup;
    _townsGroup.addTo(this._map);
  }

  // notes are pois, but they're excluded from the marker feature group, meaning they'll be ignored for map bounds
  private _drawNotes(mile: Mile, index: number): void {

    const _noteMarkers: Array<any> = [];

    const _mileNotes: Array<Poi> = this._noteService.getNotes('trail', mile.id - 1);

    if (_mileNotes) {
      const _length = _mileNotes.length;
      for (let i = 0; i < _length; i++) {
        const _note: Poi = _mileNotes[i];
        _noteMarkers.push(this._assemblePoiMarker(_note));
      }
    }

    const _notesGroup = L.featureGroup(_noteMarkers);
    this._renderedData[index].notes = _notesGroup;
    _notesGroup.addTo(this._map);
  }

  // add a single note, using the bounce animation
  private _addNote(note: Poi): void {

    const _bounce = {
      bounceOnAdd: true,
      bounceOnAddOptions: {duration: 600, height: 55},
    };

    const _noteMarker = this._assemblePoiMarker(note, _bounce);
    this._renderedData[note.belongsTo - 1].notes.addLayer(_noteMarker);
  }

  private _drawUser(): void {

    const _self = this;

    if (!this._userMarker) {
      this._userMarker = this._createUserMarker(this.user);
    }

    if (this.user && this._map && this.user.waypoint) {

      const _userLocation = new L.LatLng(this.user.waypoint.latitude, this.user.waypoint.longitude);

      this._userMarker.setLatLng(_userLocation);

      if (!this.userCentered) {
        this._userMarker.on('click', function (e) {

          const _closestLayer = L.GeometryUtil.closestLayer(_self._map,
            _self._trailLayers.getLayers(), e.latlng);

          if (_closestLayer) {

            // get the nearest point(s) for mile
            const _mile: Mile = _self._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
            const _nearestPoints: Array<Distance> = _self._trailGenerator.findNearestWaypointInMile(_self.user.waypoint, _mile);

            const _nearestMileage: string = (_self.user.anchorPoint.distanceTotal / environment.MILE).toFixed(2);

            let _onOffTrailString;
            let _2ndLine = '';

            const _offTrail = (_nearestPoints[0].distance > _self.localStorage.retrieve('poiDistanceOffTrail'));
            if (_offTrail) {
              _onOffTrailString = (_nearestPoints[0].distance / environment.MILE).toFixed(2) + ' mi. off trail';
              _2ndLine = 'Nearest: mi. ' + _nearestMileage;
            } else {
              _onOffTrailString = 'On trail';
              _2ndLine = 'mi. ' + _nearestMileage;
            }

            _self._dynamicComponentManager.createPopupComponent(e.latlng,
              {
                waypoint: e.latlng,
                label: _onOffTrailString,
                description: _2ndLine,
                distance: _nearestPoints[0].distance,
                distanceTotal: _nearestMileage,
                showCoords: true
              }, _self._clearOverlayElements.bind(_self));
          }
        });
      }

      this._userMarker.addTo(this._map);
    }
  }

  // MAP VIEWPORT MANIPULATION (ZOOM/PAN/BOUNDS)

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
            _bounds.push(_marker);
          }
        }
      }
    }

    if (_bounds.length > 0) {

      const _group = new L.featureGroup(_bounds, this.centerPoint);

      this._map.stop();

      // show bounds (based on pois in poi list), add padding if end of trail
      const padding = (this._visibleMiles.indexOf(0) === -1 && this._visibleMiles.indexOf(this._trailGenerator.getTrailData().miles.length - 1) === -1) ? 0 : 0.25;
      this._map.fitBounds(_group.getBounds().pad(padding), {animate: this._animateMap, duration: 0.5, maxZoom: 16, minZoom: 13.25});
      this._onMapZoom();
    }
  }

  private _centerOnPoint(point: Waypoint, forceAnimate?: boolean): void {

    if (!point) {
      return;
    }

    if (this._map) {

      let _animate = (this.userCentered || this._animateMap);

      if (forceAnimate) {
        _animate = forceAnimate;
      }

      this._map.panTo([point.latitude, point.longitude], {animate: _animate, duration: 0.5, maxZoom: 16, minZoom: 13.25});
      this._onMapZoom();
    }
  }

  public centerOnUser(): void {

    console.log('centerOnUser');
    if (this.user) {
      this._centerOnPoint(this.user.waypoint);
    }
  }

  // EVENT HANDLERS

  // linked directly to svg marker (scope change)
  private _onMarkerClick (event: MouseEvent) {

    // clear all overlays
    clearTimeOut(this['self']._popupTimer);
    clearTimeOut(this['self']._tooltipTimer);

    // center on the marker you just clicked
    this['self']._centerOnPoint(this['data'].waypoint, true);

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

    this.status = status;
    super.onStatusChange(status);
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    super.onUserLocationChange(user);

    if (this._map) {
      this._drawUser();
    }

    // use the id for status
    if (this._userMarker) {
      this._userMarker._icon.id = this.status;
    }

    if (this.userCentered) {
      this.centerOnUser();
    }
  }


  // CREATE/DELETE MAP ELEMENTS

  // a label marker is drawn at the start of a mile
  private _createLabelMarker(index: number, mile: Mile): Array<any> {

    let _labelElements: Array<any> = [];

    const _markerLocation: any = calculateLabelLocation(mile, this._trailGenerator.getTrailData().miles[index - 1]);
    const _endPoint: Waypoint = calculatePoint(_markerLocation.waypoint, _markerLocation.angle, _markerLocation.distance);

    const _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + (mile.id - 1) + '</div>'});
    _labelElements.push(L.marker([_endPoint.latitude, _endPoint.longitude], {icon: _labelIcon, mileNumber: mile.id - 1}));

    if (_markerLocation._distance > 0) {
      _labelElements = _labelElements.concat(createGuide(_markerLocation.latlng, waypointToLatLng(_endPoint), true));
    }

    return _labelElements;
  }

  // create an svg user marker
  private _createUserMarker(user: User): any {
    return (!user) ? null : L.marker(
      [user.waypoint.latitude, user.waypoint.longitude],
      {icon: this._markerFactory.createLeafletUserMarker(), user: user, forceZIndex: 1000});
  }

  // create a town marker
  private _assembleTownMarker(town: Town): any {
    const _element = document.createElement('div');
    const _svg = SVG(_element).size(36, 54).style('overflow', 'visible');
    this._markerFactory.createSvgCircleMarker(_svg, getPoiTypeByType(town.type).color, 1.47, 0.5, false);
    _svg.use(this._markerFactory.sampleFaIcon(town.type)).width(24).height(24).move(-12, -12);

    const _icon = htmlIcon({className: 'fa-marker marker ' + town.type, html: _element});
    const _options = {icon: _icon , town: town};
    const _poiMarker = L.marker(waypointToLatLng(town.waypoint), _options);
    return _poiMarker;
  }

  private _removeMarkerByPoiId(poiId: number): void {

    const _self = this;

    if(this._map) {
      this._map.eachLayer(function (layer) {
        if (layer.options.poi && layer.options.poi.id === poiId) {
          _self._map.removeLayer(layer);
        }
      });
    }
  }

}
