import {Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges, ElementRef, ViewChild} from '@angular/core';
import { Mile } from '../../type/mile';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';
import { Poi, PoiType } from '../../type/poi';
import { fallbackLayer } from '../../_util/tiles';
import { getPoiTypeByType } from '../../_util/poi';
import {createFaLeafletMarker, createUserMarker} from '../../_util/markers';
import { LocationBasedComponent } from '../../display/location-based/location-based.component';
import { User } from '../../type/user';
import { Waypoint } from '../../type/waypoint';
import { environment } from '../../../environments/environment.prod';
import { SnowGeneratorService } from '../../service/snow-generator.service';
import { Snowpoint } from '../../type/snow';
import {TrailGeneratorService} from '../../service/trail-generator.service';
import {OrientationService} from '../../service/orientation.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass']
})
export class LeafletMapComponent extends LocationBasedComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('leaflet') leaflet: ElementRef;

  // data
  @Input() name: String;
  @Input() activeMileId: number;      // id of the currently active mile (selected mile in the overview or the mile nearest to the user location)
  @Input() centerUser?: boolean;
  @Input() centerPoint?: Waypoint;
  @Input() range: object;

  // map tiles
  @Input() showMapTiles: boolean;

  // map controls
  @Input() allowPanning: boolean;
  @Input() allowZooming: boolean;

  // elements
  @Input() showPois: boolean;

  private _orientationSubscription: Subscription;
  private _orientation: number;

  private _map: L;
  private _initialized = false;
  private _trailLength: number;

  private _centerpoint: object;
  private _userMarker;
  private _visibleMiles: Array<number> = [];

  private renderedData: Array<any> = [];


  constructor(
    private _route:             ActivatedRoute,
    private _snowGenerator:     SnowGeneratorService,
    private _trailGenerator:    TrailGeneratorService,
    private _orientationService: OrientationService
  ) {
    super();
  }

  ngOnInit(): void {

    super.ngOnInit();

    const _self = this;

    this._trailLength = this._trailGenerator.getTrailData().miles.length;

    // let _mileIds: Array<number> = [];
    // if (this.milesData) {
    //   this.milesData.forEach(function (mile: Mile) {
    //     _mileIds.push(mile.id);
    //   })
    //   this._snowData = this._snowGenerator.getSnowForMile(_mileIds);
    // }
    //
    // this._orientationSubscription = this._orientationService.orientationObserver.subscribe(function(result) {
    //   _self._orientation = result;
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this._initialized) {

      if (changes.centerPoint) {
        this._centerOnPoint();
      }

      if (changes.activeMileId) {
        this._dataManager();
        this.onUserLocationChange(this.user);
        // this._centerMap(this.centerUser);
      }

    //
    //   if (changes.centerPoint) {
    //     this._centerOnPoint(changes.centerPoint.currentValue);
    //   } else {
    //     // this._drawMap();
    //     this.onUserLocationChange(this.user);
    //     this._centerMap(this.centerUser);
    //   }
    }
  }

  ngAfterViewInit(): void {

    this._setupMap();
    this._dataManager();
    this.onUserLocationChange(this.user);

    // // only draw if there's data
    // if (this.milesData && this.milesData.length > 0) {
    //   this._drawMap();
    //   this.onUserLocationChange(this.user);
    //   this._centerMap(this.centerUser);
    // }

    this._initialized = true;
    this._centerOnPoint();
  }


  private _setupMap(): void {

    // no data, no map
    if (!this.trailGenerator.getTrailData()) {
      console.log('no map data');
      return;
    }

    let _tileLayers: Array<any> = [];

    if (this.showMapTiles === true) {

      // appends the ionic compatible root directory URL
      // TODO dynamic version number (set after tile download complete...
      const _url = this.fileSystem.rootPath + this.trailGenerator.getTrailData().abbr + '/1.0/{x}/{y}.png';

      const tilesFallback = fallbackLayer(_url,
      {

        // min & max zoom prp causes flickering
          minNativeZoom: 15,
          maxNativeZoom: 15,
          fallbackTileUrl: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          errorTileUrl: './assets/images/missing.png',
        });

      _tileLayers = _tileLayers.concat(tilesFallback);
    }

    this._map = new L.map('leaflet_' + this.name, {
      minZoom: 14,
      maxZoom: 16,
      zoomControl: false, attributionControl: false,
      layers: _tileLayers,
      zoomSnap: 0
    });

    if (!this.allowPanning) {
      this._map.dragging.disable();
    }

    if (true !== this.allowZooming) {
      this._map['scrollWheelZoom'].disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
    }

    this._map.setView([0, 0], 15);
  }



  // ELEMENT CREATION

  private _dataManager(): void {

    // get visible miles
    const _relativeRange = {start: this.activeMileId - this.range['behind'], end: this.activeMileId + this.range['ahead']}
    let _oldmMilesToDelete: Array<number> = [];
    let _newVisibleMiles: Array<number> =[];

    // create range array (check for trail ends)
    for (let i = _relativeRange.start; i <= _relativeRange.end; i++) {
      if (i >= 0 && i < this._trailGenerator.getTrailData().miles.length) {
        _newVisibleMiles.push(i);
      }
    }

    // compare drawn miles array to new visibleMiles
    this._visibleMiles.forEach(function(mileId, index) {

      if (_newVisibleMiles.indexOf(mileId) < 0) {
        _oldmMilesToDelete.push(mileId);
      } else {
        _newVisibleMiles.splice(_newVisibleMiles.indexOf(mileId), 1);
      }
    });

    // prevent duplicates
    _oldmMilesToDelete = Array.from(new Set(_oldmMilesToDelete));
    _newVisibleMiles = Array.from(new Set(_newVisibleMiles));

    this._drawMiles(_newVisibleMiles);
    this._removeMiles(_oldmMilesToDelete);

    this._visibleMiles = this._visibleMiles.concat(_newVisibleMiles);
    this._visibleMiles = Array.from(new Set(this._visibleMiles));
  }


  private _drawMiles(mileIds: Array<number>): void {

    const _self = this;

    if (mileIds.length === 0) {
      return;
    }

    mileIds.forEach(function(mileId: number, index: number){

      if (_self._visibleMiles.indexOf(mileId) !== -1) {
        return;
      }

      const _mile = _self._trailGenerator.getTrailData().miles[mileId];

      if (!_mile) {
        return;
      }

      if (_mile.id === _self.activeMileId) {
        _self._centerpoint = _mile.centerpoint;
      }

      _self.renderedData[mileId] = {};

      _self._drawTrail(_mile, mileId);
      _self._drawSnow(_mile, mileId);
      _self._drawPois(_mile, mileId);
      _self._setBounds();
    });
  }

  private _removeMiles(mileIds: Array<number>): void {

    const _self = this;

    if (mileIds.length === 0) {
      return;
    }

    console.log(_self.renderedData);

    mileIds.forEach(function(mileId: number, index: number){

      if (_self.renderedData[mileId]) {

        if (_self.renderedData[mileId].trail) {
          _self._map.removeLayer(_self.renderedData[mileId].trail);
          _self.renderedData[mileId].trail = null;
          delete _self.renderedData[mileId].trail;
        }

        if (_self.renderedData[mileId].snow) {
          _self._map.removeLayer(_self.renderedData[mileId].snow);
          _self.renderedData[mileId].snow = null;
          delete _self.renderedData[mileId].snow;
        }

        if (_self.renderedData[mileId].markers) {
          // _self.renderedData[mileId].markers.eachLayer(function (layer) {
          //   console.log(layer);
          // });
          _self._map.removeLayer(_self.renderedData[mileId].markers);
          _self.renderedData[mileId].markers.clearLayers();
          _self.renderedData[mileId].markers = null;
          delete _self.renderedData[mileId].markers;
        }

        _self.renderedData[mileId] = null;
        delete _self.renderedData[mileId];

        _self._visibleMiles.splice(_self._visibleMiles.indexOf(mileId), 1);
      }

    });
  }

  private _drawTrail(mile: Mile, index: number): void {

    const _waypoints: Array<any> = [];

    for (const waypoint of mile.waypoints) {

      let _wp: L.latLng = new L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);

      _waypoints.push(_wp);
    }

    // draw waypoints
    const _trailLine = new L.Polyline(_waypoints, {
      color: 'red', weight: 4, opacity: 1, smoothFactor: 1
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
          let _wp: L.latLng = new L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);
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

  private _drawSnowLine(waypoints: Array<any>, index: number):void {

    // draw waypoints
    const _snowLine = new L.Polyline(waypoints, {
      color: 'white', weight: 8, opacity: 0.9, smoothFactor: 1
    });

    this.renderedData[index].snow = _snowLine;

    _snowLine.addTo(this._map);
  }

  private _drawPois(mile: Mile, index: number): void {

    let _markerArray: Array<any> = [];

    // startMile marker
    _markerArray.push(this._createLabelMarker((mile.id - 1) + '', mile.waypoints[0]));

    // endMile marker
    if (index === this._trailLength - 1) {
      const _wps: Array<Waypoint> = mile.waypoints;
      _markerArray.push(this._createLabelMarker(mile.id + '', _wps[_wps.length - 1]));
    }

    // pois sit on top of label markers
    if (this.showPois && mile.pois) {

      const _maxPoiDistanceOffTrail = this.localStorage.retrieve('poiDistanceOffTrail');

      for (const poi of mile.pois) {

        const _poi: Poi = this._trailGenerator.getPoiById(poi);

        const _poiMarker = this._createmarker(_poi);

        if (_poi.waypoint.distance >= environment.MILE / 8) {

          _markerArray = _markerArray.concat(this._createPoiGuideLine(_poi));
        }

        _markerArray.push(_poiMarker);
      }
    }

    const _markerGroup = L.featureGroup(_markerArray);
    this.renderedData[index].markers = _markerGroup;
    _markerGroup.addTo(this._map);
  }

  private _drawUser(): void {

    if (this._userMarker) {
      this._map.removeLayer(this._userMarker); // remove
      this._userMarker = null;
    }

    if (this.user && !this._userMarker && this._map && this.user.waypoint) {

      this._userMarker = this._createUserMarker(this.user);
      const _userLocation = new L.LatLng(this.user.anchorPoint.latitude, this.user.anchorPoint.longitude);
      this._userMarker.setLatLng(_userLocation);

      this._userMarker.addTo(this._map);
    }
  }

  // private _centerMap(forceCenter:boolean = false): void {
  //
  //   if (this._markers.length > 0 && !forceCenter) {
  //
  //     // if there are markers, show all of them
  //     const _markerGroup = L.featureGroup(this._markers);
  //     _markerGroup.addTo(this._map);
  //
  //     this._map.fitBounds(L.latLngBounds(this._bounds).pad(0.1));
  //
  //   } else if (this.user) {
  //
  //     // set map to center on centerpoint of selected mile
  //     this._map.setView([this.user.anchorPoint.latitude, this.user.anchorPoint.longitude], 16);
  //
  //   } else {
  //
  //     this._map.fitBounds(L.latLngBounds(this._bounds).pad(0.1));
  //
  //   }
  //
  //   // set the panning bounds
  //   this._map.setMaxBounds(L.latLngBounds(this._allElementsBounds).pad(0.1));
  // }

  private _setBounds(): void {
    // this._map.setMaxBounds(L.latLngBounds(this._allElementsBounds).pad(0.1));
  }

  private _centerOnPoint(): void {
    if (this._map && this.centerPoint) {
      this._map.panTo([this.centerPoint.latitude, this.centerPoint.longitude], {duration: 0.5, maxZoom: 15 });
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
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    if (this._map) {
      this._drawUser();
    }
  }




  // CREATE MAP ELEMENTS

  private _createLabelMarker(label: string, waypoint: Waypoint) {

    let _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + label + '</div>'});
    let _marker = L.marker([waypoint.latitude, waypoint.longitude], {icon: _labelIcon});

    return _marker;
  }

  private _createUserMarker(user: User): any {

    let _color = (this.status === "tracking") ? '#00FF00' : '#AAAAAA';

    let _user = L.marker([user.anchorPoint.latitude, user.anchorPoint.longitude], {icon: createUserMarker('hiking', 'fa', _color),user:user});
    return _user;
  }

  private _createmarker(poi: Poi): any {

    let _poiType: PoiType = getPoiTypeByType(poi.type);

    if (!_poiType) {
      _poiType = getPoiTypeByType('multiple');
    }

    let _poi = L.marker([poi.waypoint.latitude, poi.waypoint.longitude], {icon: createFaLeafletMarker(_poiType.icon, _poiType.iconType, _poiType.color), poi:poi});

    _poi.on('click', this._onMarkerClick.bind({data:poi, self:this}));

    return _poi;
  }

  private _createPoiGuideLine(poi: Poi): Array<any> {

    const poiLoc = new L.latLng(poi.waypoint.latitude, poi.waypoint.longitude, poi.waypoint.elevation);
    const anchorLoc = new L.latLng(poi.anchorPoint.latitude, poi.anchorPoint.longitude, poi.anchorPoint.elevation);

    const _guideLine = new L.Polyline([poiLoc, anchorLoc], {
      color: 'rgb(187, 97, 0)',
      dashArray: "5 7",
      weight: 2,
      opacity: 1,
      smoothFactor: 0
    });

    const _arrowHead = L.polylineDecorator(_guideLine, {
      patterns: [
        {
          offset: '100%',
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 5,
            headAngle: 90,
            polygon: false,
            pathOptions: {color: 'rgb(187, 97, 0)', weight: 2}
          })
        },
        {
          offset: '0%',
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 5,
            headAngle: 270,
            polygon: false,
            pathOptions: {color: 'rgb(187, 97, 0)', weight: 2}
          })
        }
      ]
    });

    return [_guideLine, _arrowHead];
  }
}
