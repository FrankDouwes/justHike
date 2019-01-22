import {Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import {Mile} from '../../type/mile';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';

import {Poi, PoiType} from '../../type/poi';
import {Waypoint} from '../../type/waypoint';
import {Settings} from '../../settings';
import {elevationLines, mapTiles} from '../../_util/tiles';
import {getPoiTypeByType} from '../../_util/poi';
import {createFaLeafletMarker} from '../../_util/markers';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.sass']
})
export class LeafletMapComponent implements OnInit {

  // data
  @Input() name: String;
  @Input() milesData: Array<Mile>;    // miles data for the visible range
  @Input() activeMileId: number;      // id of the currently active mile (the selected mile in the overview or the mile nearest to the user location)
  @Input() userLocation: Waypoint;    // the user location

  // map tiles
  @Input() showMapTiles: string;
  @Input() showElevationTiles: string;

  // map controls
  @Input() allowPanning: string;
  @Input() allowZooming: string;

  // elements
  @Input() showPois: string;

  private _map: L;
  private _initialized: Boolean = false;

  constructor(
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this._initialized) {
      this.drawMap();
    }
  }


  ngAfterViewInit() {

    L.Icon.Default.prototype.options.iconUrl = '/assets/icons/marker-icon.png';
    L.Icon.Default.prototype.options.iconRetinaUrl = '/assets/icons/marker-icon-2x.png';
    L.Icon.Default.prototype.options.shadowUrl = '/assets/icons/marker-shadow.png';

    let _tileLayers: Array<any> = [];

    if (this.showMapTiles === 'true') {
      _tileLayers.push(mapTiles());
    }

    if (this.showElevationTiles === 'true') {
      _tileLayers.push(elevationLines());
    }

    this._map = new L.map('leaflet_' + this.name, {
      zoomControl: false, attributionControl: false,
      layers: _tileLayers
    });

    if (this.allowPanning !== 'true') {
      this._map.dragging.disable();
    }

    if (this.allowZooming !== 'true') {
      this._map['scrollWheelZoom'].disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
    }

    // only draw on data
    if (this.milesData && this.milesData.length > 0) {
      this.drawMap();
    }

    this._initialized = true;
  }

  drawMap():void {

    let _points:Array<any> = [];
    var _markers: Array<object> = [];
    let _centerpoint: object;
    let _bounds: Array<object> = [];

    for (let i = 0; i < this.milesData.length; i++) {

      let mile =this.milesData[i];

      // startMile marker
      let _labelIcon = L.divIcon({className: 'mile-marker', html: '<div class="label">' + (mile.id - 1) + '</div>'});
      const _marker = L.marker([mile.waypoints[0].latitude, mile.waypoints[0].longitude], {icon: _labelIcon}).addTo(this._map);

      if (mile.id === this.activeMileId) {
        _centerpoint = mile.centerpoint;
      }

      //render pois
      if (this.showPois && mile.pois) {


          for (let poi of mile.pois) {

            let _poiMarker = this.createmarker(poi as Poi);

            if (poi.waypoint.distance >= Settings.MILE / 8) {
              let _poiGuideLine = this.createPoiGuideLine(poi as Poi);
              _poiGuideLine.addTo(this._map);

              const _arrowHead = L.polylineDecorator(_poiGuideLine, {
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
            }

            _markers.push(_poiMarker);

            if (mile.id === this.activeMileId) {
              _bounds.push(_poiMarker._latlng);
            }
          }
      }

      for (let waypoint of mile.waypoints) {

        let point = new L.latLng(waypoint.latitude, waypoint.longitude, waypoint.elevation);

        _points.push(point);

        if (mile.id === this.activeMileId) {
          _bounds.push(point);
        }
      }

    }

    // show the trail
    let _trailLine = new L.Polyline(_points, {
      color: 'red',
      weight: 4,
      opacity: 1,
      smoothFactor: 1
    });

    _trailLine.addTo(this._map);


    if (_markers.length > 0) {

      // if there are markers, show all of them
      const _markerGroup = L.featureGroup(_markers);
      _markerGroup.addTo(this._map);

      this._map.fitBounds(L.latLngBounds(_bounds).pad(0.1));

    } else {

      // set map to center on centerpoint of selected mile
      this._map.setView({lat: _centerpoint['latitude'], lon: _centerpoint['longitude']}, 16);

      // this._map.fitBounds(_bounds, {padding: [4,4]});
    }
  }

  createmarker(poi: Poi) {

    let _poiType: PoiType = getPoiTypeByType(poi.type);

    if (!_poiType) {
      _poiType = getPoiTypeByType('multiple');
    }

    let _poi = L.marker([poi.waypoint.latitude, poi.waypoint.longitude], {icon: createFaLeafletMarker(_poiType.icon, _poiType.iconType, _poiType.color), poi:poi});

    _poi.on('click', this.onMarkerClick.bind({data:poi, self:this}));

    return _poi;
  }

  createPoiGuideLine(poi: Poi) {

    let poiLoc = new L.latLng(poi.waypoint.latitude, poi.waypoint.longitude, poi.waypoint.elevation);
    let anchorLoc = new L.latLng(poi.anchorPoint.latitude, poi.anchorPoint.longitude, poi.anchorPoint.elevation);

    let _firstpolyline = new L.Polyline([poiLoc, anchorLoc], {
      color: 'rgb(187, 97, 0)',
      dashArray: "5 7",
      weight: 2,
      opacity: 1,
      smoothFactor: 0
    });

    return _firstpolyline;
  }

  // linked directly to svg marker (scope change)
  onMarkerClick (event: MouseEvent) {

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

}


