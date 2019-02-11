import {Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import {Mile} from '../../type/mile';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';
import {Poi, PoiType} from '../../type/poi';
import {elevationLines, mapTiles, storedTileLayer} from '../../_util/tiles';
import {getPoiTypeByType} from '../../_util/poi';
import {createFaLeafletMarker} from '../../_util/markers';
import {LocationBasedComponent} from '../../display/location-based/location-based.component';
import {User} from '../../type/user';
import {Waypoint} from '../../type/waypoint';
import {environment} from '../../../environments/environment.prod';
import {SnowGeneratorService, Snowpoint} from '../../service/snow-generator.service';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass']
})
export class LeafletMapComponent extends LocationBasedComponent implements OnInit, AfterViewInit, OnChanges {

  // data
  @Input() name: String;
  @Input() milesData: Array<Mile>;    // miles data for the visible range
  @Input() activeMileId: number;      // id of the currently active mile (selected mile in the overview or the mile nearest to the user location)
  @Input() centerUser?: boolean;

  // map tiles
  @Input() showMapTiles: boolean;
  @Input() showElevationTiles: boolean;

  // map controls
  @Input() allowPanning: boolean;
  @Input() allowZooming: boolean;

  // elements
  @Input() showPois: boolean;


  private _map: L;
  private _initialized = false;

  private _centerpoint: object;
  private _bounds: Array<object> = [];
  private _allElementsBounds: Array<object> = [];
  private _markers: Array<any> = [];
  private _userMarker;
  private _snowData: Array<Array<Snowpoint>>;


  constructor(
    private _route:             ActivatedRoute,
    private _snowGenerator:     SnowGeneratorService
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    let _mileIds: Array<number> = [];
    this.milesData.forEach(function(mile: Mile, index) {
      _mileIds.push(mile.id);
    })

    this._snowData = this._snowGenerator.getSnowForMile(_mileIds);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this._initialized) {
      this.drawMap();
      this.onUserLocationChange(this.user);
      this.centerMap(this.centerUser);
    }
  }

  ngAfterViewInit(): void {

    this.setupMap();

    // only draw if there's data
    if (this.milesData && this.milesData.length > 0) {
      this.drawMap();
      this.onUserLocationChange(this.user);
      this.centerMap(this.centerUser);
    }

    this._initialized = true;
  }


  setupMap() {

    let _tileLayers: Array<any> = [];

    if (this.showMapTiles === true) {
      _tileLayers = _tileLayers.concat(new L.TileLayer.blob());
    }

    if (this.showElevationTiles === true) {
      _tileLayers.push(elevationLines());
    }

    this._map = new L.map('leaflet_' + this.name, {
      zoomControl: false, attributionControl: false,
      layers: _tileLayers
    });

    if (this.allowPanning !== true) {
      this._map.dragging.disable();
    }

    if (this.allowZooming !== true) {
      this._map['scrollWheelZoom'].disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
    }
  }



  // ELEMENT CREATION

  private drawMap(): void {

    const _self = this;

    this.milesData.forEach(function(mile: Mile, index: number){

      if (mile.id === _self.activeMileId) {
        _self._centerpoint = mile.centerpoint;
      }

      _self.drawTrail(mile, index);
      _self.drawSnow(mile, _self._snowData[index], index);
      _self.drawPois(mile, index);
    });
  }

  private drawTrail(mile: Mile, index: number): void {

    let _waypoints: Array<any> = [];

    for (let waypoint of mile.waypoints) {

      let _wp: L.latLng = new L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);

      _waypoints.push(_wp);

      if (mile.id === this.activeMileId) {
        this._bounds.push(_wp);
      }

      this._allElementsBounds.push(_wp);
    }

    // draw waypoints
    const _trailLine = new L.Polyline(_waypoints, {
      color: 'red',
      weight: 4,
      opacity: 1,
      smoothFactor: 1
    });

    _trailLine.addTo(this._map);

  }

  private drawSnow(mile: Mile, snowMile: Array<Snowpoint>, index: number): void {

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

          this.drawSnowLine(_snowPoints);

          _snowPoints = [];
        }

      });

      // if there is still snow to be drawn at the end of loop
      if (_snowPoints.length > 0) {

        this.drawSnowLine(_snowPoints);
      }
    }
  }

  private drawSnowLine(waypoints: Array<any>):void {

    // draw waypoints
    const _trailLine = new L.Polyline(waypoints, {
      color: 'white',
      weight: 8,
      opacity: 0.9,
      smoothFactor: 1
    });

    _trailLine.addTo(this._map);
  }

  private drawPois(mile: Mile, index: number): void {

    // startMile marker
    this.createLabelMarker((mile.id - 1) + '', mile.waypoints[0]);

    // endMile marker
    if (index === this.milesData.length - 1) {
      const _wps: Array<Waypoint> = mile.waypoints;
      this.createLabelMarker(mile.id + '', _wps[_wps.length - 1]);
    }

    // pois sit on top of label markers
    if (this.showPois && mile.pois) {

      const _maxPoiDistanceOffTrail = this.localStorage.retrieve('poiDistanceOffTrail');

      for (const poi of mile.pois) {

        const _poiMarker = this.createmarker(poi as Poi);

        if (poi.waypoint.distance >= environment.MILE / 8) {

          this.createPoiGuideLine(poi as Poi);
        }

        this._markers.push(_poiMarker);

        if (mile.id === this.activeMileId && poi.waypoint.distance <= _maxPoiDistanceOffTrail * 2) {
          this._bounds.push(_poiMarker._latlng);
        }

        this._allElementsBounds.push(_poiMarker._latlng);
      }

      const _markerGroup = L.featureGroup(this._markers);
      _markerGroup.addTo(this._map);
    }
  }

  private drawUser(): void {

    if (this._userMarker) {
      this._map.removeLayer(this._userMarker); // remove
      this._userMarker = null;
    }

    if (this.user && !this._userMarker && this._map && this.user.waypoint) {

      this._userMarker = this.createUserMarker(this.user);
      const _userLocation = new L.LatLng(this.user.anchorPoint.latitude, this.user.anchorPoint.longitude);
      this._userMarker.setLatLng(_userLocation);

      this._userMarker.addTo(this._map);
    }
  }

  private centerMap(forceCenter:boolean = false): void {

    if (this._markers.length > 0 && !forceCenter) {

      // if there are markers, show all of them
      const _markerGroup = L.featureGroup(this._markers);
      _markerGroup.addTo(this._map);

      this._map.fitBounds(L.latLngBounds(this._bounds).pad(0.1));
    } else {

      // set map to center on centerpoint of selected mile
      this._map.setView([this.user.anchorPoint.latitude, this.user.anchorPoint.longitude], 16);
    }

    // set the panning bounds
    this._map.setMaxBounds(L.latLngBounds(this._allElementsBounds).pad(0.1));
  }





  // EVENT HANDLERS

  // linked directly to svg marker (scope change)
  private onMarkerClick (event: MouseEvent) {

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
      this.drawUser();
    }
  }





  // CREATE MAP ELEMENTS

  private createLabelMarker(label: string, waypoint: Waypoint) {

    let _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + label + '</div>'});
    let _marker = L.marker([waypoint.latitude, waypoint.longitude], {icon: _labelIcon}).addTo(this._map);
  }

  private createUserMarker(user: User): any {

    let _color = (this.status === "tracking") ? '#00FF00' : '#AAAAAA';

    let _user = L.marker([user.anchorPoint.latitude, user.anchorPoint.longitude], {icon: createFaLeafletMarker('hiking', 'fa', _color),user:user});
    return _user;
  }

  private createmarker(poi: Poi): any {

    let _poiType: PoiType = getPoiTypeByType(poi.type);

    if (!_poiType) {
      _poiType = getPoiTypeByType('multiple');
    }

    let _poi = L.marker([poi.waypoint.latitude, poi.waypoint.longitude], {icon: createFaLeafletMarker(_poiType.icon, _poiType.iconType, _poiType.color), poi:poi});

    _poi.on('click', this.onMarkerClick.bind({data:poi, self:this}));

    return _poi;
  }

  private createPoiGuideLine(poi: Poi): void {

    let poiLoc = new L.latLng(poi.waypoint.latitude, poi.waypoint.longitude, poi.waypoint.elevation);
    let anchorLoc = new L.latLng(poi.anchorPoint.latitude, poi.anchorPoint.longitude, poi.anchorPoint.elevation);

    let _guideLine = new L.Polyline([poiLoc, anchorLoc], {
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
    }).addTo(this._map);

    _guideLine.addTo(this._map);
  }
}
