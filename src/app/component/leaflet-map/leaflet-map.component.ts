import * as L from 'leaflet';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';
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

declare const SVG: any;    // fixes SVGjs bug

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass']
})

// uses basic for loops for performance
/* TODO: needs cleanup */
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

  private _map: L;
  private _initialized = false;
  private _showMileGrid: boolean;
  private _animateMap: boolean;
  private _trailLength: number;

  private _centerpoint: object;
  private _userMarker;
  private _visibleMiles: Array<number> = [];

  private renderedData: Array<any> = [];

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

  ngOnInit(): void {
    super.ngOnInit();

    this._showMileGrid = this._localStorageService.retrieve('showMileGrid');
    this._animateMap = this._localStorageService.retrieve('animateMap');
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


  private _setupMap(): void {

    // no data, no map
    if (!this.trailGenerator.getTrailData()) {
      console.log('no map data');
      return;
    }

    let _tileLayers: Array<any> = [];

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

      _tileLayers = _tileLayers.concat(tilesFallback);
    }

    // grid (TODO: overlapping grid issues, investigate UTM grids)
    // considering rewriting this: https://github.com/ggolikov/Leaflet.gmxIndexGrid for leafelt 1.x
    if (this.allowZooming) {

      const _trailUtm: Array<number> = getTrailMetaDataByAbbr(this._trailGenerator.getTrailData().abbr).utm;

      if (_trailUtm && this._showMileGrid) {

        //const _centerUtm = _trailUtm[Math.floor((_trailUtm.length - 1) / 2)];

        _trailUtm.forEach(function (zone) {
          const _utmGrid = L.utmGrid(zone, false, {
            color: '#AAA',
            showAxis100km: false,
            weight: 1,
            minInterval: environment.MILE,
            maxInterval: environment.MILE,
            opacity: 1,
          });

          _tileLayers = _tileLayers.concat(_utmGrid);
        });
      }
    }

    this._map = new L.map('leaflet_' + this.name, {
      minNativeZoom: 15,
      maxNativeZoom: 15,
      minZoom: 13.75,
      maxZoom: 16,
      zoomControl: false, attributionControl: false,
      layers: _tileLayers,
      zoomSnap: 0,
      preferCanvas: true,
      maxBoundsViscosity: 0.95 // solid
    });

    if (!this.allowPanning) {
      this._map.dragging.disable();
    }

    const _self = this;

    if (!this.allowZooming) {
      this._map['scrollWheelZoom'].disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
    } else {
      // add scale indicator
      L.control.scale().addTo(this._map);
    }

    this._map.setView([0, 0], 15);

    if (this.user) {
      this.onUserLocationChange(this.user);
    }
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

      _self.renderedData[_mileId] = {};

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

      try {

        if (_self.renderedData[_mileId] && _self._map) {

          // remove miles/markers/snow data
          for (const key in _self.renderedData[_mileId]) {
            _self._map.removeLayer(_self.renderedData[_mileId][key]);

            if (key === 'markers') {
              _self.renderedData[_mileId][key].clearLayers();
            }

            _self.renderedData[_mileId][key] = null;
            delete _self.renderedData[_mileId][key];
          }

          // clear container
          _self.renderedData[_mileId] = null;
          delete _self.renderedData[_mileId];
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

    this.renderedData[index].trail = _trailLine;

    _trailLine.addTo(this._map);
  }

  private _drawSnow(mile: Mile, index: number): void {

    const snowMile = this._snowGenerator.getSnowForMile(index)[0];

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

    this.renderedData[index].snow = _snowLine;

    _snowLine.addTo(this._map);
  }

  // draw pois
  private _drawPois(mile: Mile, index: number): void {

    let _mileMarkers: Array<any> = [];

    if (mile.id !== 1 && mile.id !== this._trailLength) {
      // startMile marker
      _mileMarkers = _mileMarkers.concat(this._createLabelMarker(index, mile));
    }

    // pois sit on top of label markers
    if (this.showPois && mile.pois) {

      const _maxPoiDistance = this.localStorage.retrieve('poiMaxDistance');

      const _poiLength = mile.pois.length;

      for (let i = 0; i < _poiLength; i++) {

        const _poi: Poi = this._trailGenerator.getPoiById(mile.pois[i]);

        // filter out of range pois
        if (_poi.waypoint.distance >= _maxPoiDistance) {
          return;
        }

        const _element = document.createElement("div");
        const _svg = SVG(_element).size(36, 54).style('overflow', 'visible');

        this._markerFactory.setupMarker(_svg, _poi, null);

        const _icon = htmlIcon({className: 'marker', html: _element});
        const _poiMarker = L.marker([_poi.waypoint.latitude, _poi.waypoint.longitude], {icon: _icon , poi: _poi});
        _poiMarker.on('click', this._onMarkerClick.bind({data: _poi, self: this}));


        // TODO: needs to be optional (settings)
        // if (_poi.waypoint.distance >= environment.MILE / 8) {
        //
        //   _mileMarkers = _mileMarkers.concat(this._createPoiGuideLine(_poi));
        // }

        _mileMarkers.push(_poiMarker);
      }
    }

    const _markerGroup = L.featureGroup(_mileMarkers);

    this.renderedData[index].markers = _markerGroup;
    _markerGroup.addTo(this._map);
  }

  private _drawUser(): void {

    if (!this._userMarker) {
      this._userMarker = this._createUserMarker(this.user);
    }

    if (this.user && this._map && this.user.waypoint) {

      const _userLocation = new L.LatLng(this.user.waypoint.latitude, this.user.waypoint.longitude);

      this._userMarker.setLatLng(_userLocation);

      this._userMarker.addTo(this._map);
    }
  }

  private _setBounds(): void {

    if (!this.poiRange) {
      return;
    }

    // get the poi map objects

    const _bounds: Array<any> = [];

    for (let i = 0; i < this.renderedData.length; i++) {

      const _mileData = this.renderedData[i];

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

      // TODO: animation, it works, I just need a routine to force/finish the current ani before starting the next
      this._map.fitBounds(_group.getBounds().pad(0.1), {animate: this._animateMap, duration: 0.5, maxZoom: 16});
      // this._map.setMaxBounds(_group.getBounds().pad(0.25));
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
  private _createLabelMarker(index: number, mile: Mile) {

    const _prevMile = this._trailGenerator.getTrailData().miles[index - 1];

    const _zeroPoint: Waypoint = mile.waypoints[0];
    const _nearPoint: Waypoint = mile.waypoints[2];
    const _prevNearPoint: Waypoint = _prevMile.waypoints[_prevMile.waypoints.length - 4];
    const _prevCenter: object = _prevMile.centerpoint;
    const _mileCenter: object = mile.centerpoint;

    const _quarterMilePoint: object = {
      latitude: (_zeroPoint.latitude + Number(_mileCenter['latitude'])) / 2,
      longitude: (_zeroPoint.longitude + Number(_mileCenter['longitude'])) / 2,
    };

    const _prevQuarterMilePoint: object = {
      latitude: (_zeroPoint.latitude + Number(_prevCenter['latitude'])) / 2,
      longitude: (_zeroPoint.longitude + Number(_prevCenter['longitude'])) / 2,
    };

    const _prevQPoint = new L.latLng(_prevQuarterMilePoint['latitude'], _prevQuarterMilePoint['longitude'], 0);
    const _qPoint = new L.latLng(_quarterMilePoint['latitude'], _quarterMilePoint['longitude'], 0);
    const _zPoint = new L.latLng(_zeroPoint.latitude, _zeroPoint.longitude, 0);
    const _nPoint = new L.latLng(_nearPoint.latitude, _nearPoint.longitude, 0);
    const _prevNPoint = new L.latLng(_prevNearPoint.latitude, _prevNearPoint.longitude, 0);

    const calcHeading = function (waypoint1: any, waypoint2: any): number {
      return Math.atan2(waypoint2.lng - waypoint1.lng, waypoint2.lat - waypoint1.lat) * 180 / Math.PI;
    }

    const _headingLong = calcHeading(_zPoint, _qPoint);
    const _headingLongPrev = calcHeading(_prevQPoint, _zPoint);

    const _headingShort = calcHeading(_zPoint, _nPoint);
    const _headingShortPrev = calcHeading(_prevNPoint, _zPoint);

    // console.log(mile.id - 1 + ' :', _headingLongPrev, _headingLong, _headingShortPrev, _headingShort);

    const _longBend = _headingLong - _headingLongPrev;
    const _shortBend = _headingShort - _headingShortPrev;

    const _shortPrevLongBend = _headingShort - _headingLongPrev;

    let _useShort:boolean;
    let _overHalf:boolean;

    if (_longBend > 0) {
      if (_shortPrevLongBend < _longBend) {
        console.log(mile.id - 1 + ' positive, use short over long');
        _useShort = true;
      } else {
        _overHalf = true;
        console.log(mile.id - 1 + ' positive, use long');
      }
    } else {
      if (_shortPrevLongBend > _longBend) {
        _useShort = true;
        console.log(mile.id - 1 + ' negative, use short over long');
      } else {
        console.log(mile.id - 1 + ' negative, use long');
      }
    }

    if (_useShort) {
      if (_shortBend > 0) {
        _overHalf = true;
        console.log('positive');
      } else {
        console.log('negative');
      }
    }


    // the actual angle calculation

    const _startAngle = (_useShort) ? _headingShortPrev : _headingLongPrev;
    const _offsetAngle = (_useShort) ? _shortBend : _longBend;

    // distance gets smaller the sharper the corner is...
    const _distancePerc = 1 - Math.abs(_offsetAngle / 180);

    let _angle: number;

    if (_overHalf) {
      _angle = _startAngle + (_offsetAngle / 2) - 90;
    } else {
      _angle = _startAngle + (_offsetAngle / 2) + 90;
    }

    if (_angle > 180) {
      _angle = -180 - (_angle - 180);
    } else if (_angle < -180) {
      _angle = 180 - Math.abs(_angle - 180);
    }

    const _distance = (environment.MILE / 8) * _distancePerc;

    const _point: Waypoint = this._createPoint(_zeroPoint, _angle, _distance / 1000);

    // const T_guideLine1 = new L.Polyline([_prevQPoint, _zPoint, _qPoint], {
    //     color: 'rgb(0, 0, 255)',
    //     dashArray: '5 7',
    //     weight: 2,
    //     opacity: 0.5,
    //     smoothFactor: 0
    //   });
    //
    // const T_guideLine2 = new L.Polyline([_prevNPoint, _zPoint, _nPoint], {
    //     color: 'rgb(0, 255, 0)',
    //     dashArray: '5 7',
    //     weight: 2,
    //     opacity: 0.5,
    //     smoothFactor: 0
    // });

    const _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + (mile.id - 1) + '</div>'});
    const _marker = L.marker([_point.latitude, _point.longitude], {icon: _labelIcon, mileNumber: mile.id - 1});

    const _newPoint = new L.latLng(_point.latitude, _point.longitude, 0);

    const _realGuide = new L.Polyline([_zPoint, _newPoint], {
      color: 'rgb(187, 97, 0)',
      dashArray: '5 7',
      weight: 2,
      opacity: 1,
      smoothFactor: 0
    });

    return [_realGuide, _marker];
  }




  private _createPoint(point: Waypoint, angle: number, dist: number): Waypoint {

    const toRad = function(deg: number) {
      return deg * Math.PI / 180;
    }

    const toDeg = function(rad: number) {
      return rad * 180 / Math.PI;
    }

    dist = dist / 6371;
    angle = toRad(angle);

    const lat1 = toRad(point.latitude), lon1 = toRad(point.longitude);

    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
      Math.cos(lat1) * Math.sin(dist) * Math.cos(angle));

    const lon2 = lon1 + Math.atan2(Math.sin(angle) * Math.sin(dist) *
      Math.cos(lat1),
      Math.cos(dist) - Math.sin(lat1) *
      Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return null;

    return {latitude: toDeg(lat2), longitude: toDeg(lon2), elevation: 0};
  }






  private _createUserMarker(user: User): any {
    if (!user) {
      return;
    }
    return L.marker([user.waypoint.latitude, user.waypoint.longitude], {icon: this._markerFactory.createLeafletUserMarker(), user: user, forceZIndex: 1000});
  }

  // private _createPoiGuideLine(poi: Poi): Array<any> {
  //
  //   const poiLoc = new L.latLng(poi.waypoint.latitude, poi.waypoint.longitude, poi.waypoint.elevation);
  //   const anchorLoc = new L.latLng(poi.anchorPoint.latitude, poi.anchorPoint.longitude, poi.anchorPoint.elevation);
  //
  //   const _guideLine = new L.Polyline([poiLoc, anchorLoc], {
  //     color: 'rgb(187, 97, 0)',
  //     dashArray: '5 7',
  //     weight: 2,
  //     opacity: 1,
  //     smoothFactor: 0
  //   });
  //
  //   const _arrowHead = L.polylineDecorator(_guideLine, {
  //     patterns: [
  //       {
  //         offset: '100%',
  //         repeat: 0,
  //         symbol: L.Symbol.arrowHead({
  //           pixelSize: 5,
  //           headAngle: 90,
  //           polygon: false,
  //           pathOptions: {color: 'rgb(187, 97, 0)', weight: 2}
  //         })
  //       },
  //       {
  //         offset: '0%',
  //         repeat: 0,
  //         symbol: L.Symbol.arrowHead({
  //           pixelSize: 5,
  //           headAngle: 270,
  //           polygon: false,
  //           pathOptions: {color: 'rgb(187, 97, 0)', weight: 2}
  //         })
  //       }
  //     ]
  //   });
  //
  //   return [_guideLine, _arrowHead];
  // }
}
