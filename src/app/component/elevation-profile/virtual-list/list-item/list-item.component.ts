import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import 'seedrandom/seedrandom';

import {OHLC} from '../../../../type/ohlc';
import {Mile} from '../../../../type/mile';
import {User} from '../../../../type/user';
import {Poi} from '../../../../type/poi';

declare const SVG: any;    // fixes SVGjs bug

import { svgPath } from '../../../../_util/smoothLine';
import { isPrime, normalizeElevation } from '../../../../_util/math';
import { createSvgCircleMarker, createSvgFaElement, createSvgPointMarker, sampleFaIcon } from '../../../../_util/markers';
import { getPoiTypeByType } from '../../../../_util/poi';
import { environment } from '../../../../../environments/environment.prod';
import { LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { TrailGeneratorService } from '../../../../service/trail-generator.service';
import { SnowGeneratorService } from '../../../../service/snow-generator.service';
import {Snowpoint} from '../../../../type/snow';



@Component({
  selector: 'display-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListItemComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('map') map: ElementRef;

  @Output() markerEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input() data:                Mile;
  @Input() visibleOHLC:         OHLC;
  @Input() guides:              Array<object>;
  @Input() isLast:              boolean;
  @Input() resize:              number;

  // user inputs only set if this mile is closest to user (else null)
  @Input() user?:               User;
  @Input() triggerUserUpdate?:  number;           // timestamp, set when user location is updated.
  @Input() userStatus?:         string;           // idle/fetching/tracking

  public showCampsites:         boolean;
  private _showSnowPack:        boolean;

  private _snowData:            Array<Array<Snowpoint>>;

  // SVG MAP
  private _lineCanvas;                            // line (trail/snow) canvas
  private _markerSvgCanvas;                       // poi (locations/user/trees) canvas
  private _svgWidth:            number;
  private _svgHeight:           number;

  // USER
  private _userMarker;

  // OTHER
  private _initialized:         boolean;          // can only draw after initialization
  private _campSubscription:    Subscription;
  private _snowSubscription:    Subscription;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    private _snowGenerator: SnowGeneratorService
  ) {}

// LIFECYCLE HOOKS

  ngOnInit(): void {

    this.showCampsites = this._localStorage.retrieve('showCampSites');
    this._campSubscription = this._localStorage.observe('showCampSites').subscribe(result => {
      this.showCampsites = result;
      this._drawMap();
    });

    this._showSnowPack = this._localStorage.retrieve('showSnowPack');
    this._snowSubscription = this._localStorage.observe('showSnowPack').subscribe(result => {
      this._showSnowPack = result;
      this._drawMap();
    });
  }

  ngAfterViewInit(): void {

    // @ViewChild not always available, so get whichever is largest
    this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth) / 4.5);
    this._svgHeight = Math.floor(Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.6);

    this._lineCanvas = SVG('map_' + this.data.id)
      .size(this._svgWidth, this._svgHeight)
      .viewbox(0, 0, this._svgWidth, this._svgHeight)
      .attr({focusable: false});

    this._markerSvgCanvas = SVG('markers_' + this.data.id)
      .size(this._svgWidth, this._svgHeight)
      .viewbox(0, 0, this._svgWidth, this._svgHeight)
      .attr({focusable: false})
      .style('overflow', 'visible');

    this._initialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {

    // since this component requires the dom for drawing svg, it'll have to wait until initialization finishes
    if (!this._initialized) {
      return;
    }

    if (changes.data || changes.visibleOHLC) {
      this._snowData = this._snowGenerator.getSnowForMile(this.data.id);
      this._drawMap();
    }

    if (changes.resize) {

      // this._svgWidth = Math.ceil(this.map.nativeElement.clientWidth);
      // this._svgHeight = Math.ceil(this.map.nativeElement.clientHeight);
      this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth) / 4.5);
      this._svgHeight = Math.floor(Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.6);

      // update svg size
      if (this._lineCanvas) {
        const svg = window.document.getElementById(this._lineCanvas.node.id);
        if (svg) {
          svg.setAttribute('viewBox', '0 0 ' + this._svgWidth + ' ' + this._svgHeight + '');
          svg.setAttribute('width', this._svgWidth + '');
          svg.setAttribute('height', this._svgHeight + '');
        }
      }
    }

    if (changes.triggerUserUpdate || changes.user) {
      this._updateUserLocation();
    }
  }

  ngOnDestroy(): void {
    this._campSubscription.unsubscribe();
    this._snowSubscription.unsubscribe();
  }

  private _drawMap(): void {

    this._clearCanvas(true, true);

    // line
    this._drawLine();

    if (this._showSnowPack) {
      this._drawSnow();
    }

    // pois
    this._drawTrees();
    this._drawPois();

    if (this.user) {
      this._updateUserLocation();
    }
  }




// DRAW ELEMENTS

  private _clearCanvas(polyline: boolean = true, markers: boolean = false): void {

    // polyline canvas
    if (this._lineCanvas && polyline) {
      this._lineCanvas.clear();
    } else {
      console.log('no line canvas');
    }

    // marker canvas
    if (this._markerSvgCanvas && markers) {
      this._markerSvgCanvas.clear();
    } else {
      console.log('no marker canvas');
    }
  }

  private _drawLine(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    const drawPoints: Array<any> = [];

    const _waypointsArr = this.data.waypoints;

    let _waypointDistPerc: number;

    _waypointsArr.forEach((waypoint, index) => {

      // calculate distance, starting at 2nd point
      _waypointDistPerc = waypoint.distance / environment.MILE;

      const _elevation: number = normalizeElevation(this._svgHeight, waypoint.elevation, min, range, environment.LINEHEIGHT);

      // set startpoints
      if (index === 0) {
        drawPoints.push([-environment.LINEHEIGHT, this._svgHeight]);
        drawPoints.push([-environment.LINEHEIGHT, _elevation]);
      }

      // add point
      drawPoints.push([Math.round(this._svgWidth * _waypointDistPerc), _elevation]);

      // set endpoints
      if (index === _waypointsArr.length - 1) {
        drawPoints.push([this._svgWidth + environment.LINEHEIGHT, _elevation]);
        drawPoints.push([this._svgWidth + environment.LINEHEIGHT, this._svgHeight]);
      }

    });

    // draw line
    const _polyline = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(233,225,210, 0.5)')
      .stroke({ color: 'red', width: environment.LINEHEIGHT});
  }

  private _drawSnow(): void {

    if (!this._snowData[0] || this._snowData[0].length < 0) {
      return;
    }

    const _snowArray: any = this._snowData[0];
    const _waypointsArr = this.data.waypoints;

    // if there is snow
    if (_snowArray) {

      const min: number = this.visibleOHLC.low;   // high point
      const max: number = this.visibleOHLC.high;  // low point
      const range = (max - min);

      let drawPoints: Array<any> = [];

      _waypointsArr.forEach((waypoint, index) => {

        let _elevation = 0;

        function elevationRange(): number {
          // waypoint distance (%) on snowarray elevation range
          return _snowArray[0].elevation + ((waypoint.distance / environment.MILE) * ((_snowArray[1].elevation - _snowArray[0].elevation)));
        }

        // if waypoint is above showline
        if (waypoint.elevation >= elevationRange()) {

          // add point
          _elevation = normalizeElevation(this._svgHeight, waypoint.elevation, min, range, environment.LINEHEIGHT);
          drawPoints.push([Math.round(this._svgWidth * (waypoint.distance / environment.MILE)), _elevation]);

        } else if (waypoint.elevation < elevationRange()) {

          // if trail drops below snowlevel
          const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)')
            .stroke({ color: 'rgba(255,255,255,0.9)', width: environment.LINEHEIGHT * 2, linecap: 'round'});

          drawPoints = [];
        }

      });

      // if there is still snow to be drawn at the end of loop
      if (drawPoints.length >= 1) {

        const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)')
          .stroke({ color: 'rgba(255,255,255,0.9)', width: environment.LINEHEIGHT * 2, linecap: 'round'});
      }
    }
  }

  private _drawPois(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    const _poisArray = this.data.pois;

    // draw markers
    if (_poisArray) {

      const _self = this;
      const _maxPoiDistanceOfTrail = this._localStorage.retrieve('poiDistanceOffTrail');

      _poisArray.forEach((poi, index) => {

        const _poi = poi as Poi;

        const _visibleTypes = ['water', 'end'];

        // if user setting is true
        if (this.showCampsites) {
          _visibleTypes.push('camp');
        }

        const _poiTypes = _poi['type'].split(', ');

        // if poi is of visible type
        if (_visibleTypes.some(function(v) { return _poiTypes.indexOf(v) >= 0; })) {

          let _marker;
          let _markerColor: string;
          let _extraOffset: number = 0;
          let _iconSize: number = 16;

          const _markerElevation: number = normalizeElevation(this._svgHeight, _poi.waypoint.elevation, min, range, environment.LINEHEIGHT / 2);

          if (_poiTypes.length > 1 && _visibleTypes.length > 2) {
            _markerColor = getPoiTypeByType('multiple').color;
            _iconSize = 13;
            _extraOffset = (_iconSize / 2);
          } else {
            _markerColor = getPoiTypeByType(_poiTypes[0]).color;
          }

          if (_poi.waypoint.distance <= _maxPoiDistanceOfTrail) {

            _marker = createSvgPointMarker(this._markerSvgCanvas, _markerColor);

            _poiTypes.forEach(function(type, index) {
              if (_visibleTypes.indexOf(type) !== -1 && index <= 1) {

                // max of 2 icons in marker, if more types show plus symbol
                if (index === 1 && _poiTypes.length > 2 || index === 1 && !_self.showCampsites) {
                  type = 'multiple';
                }

                _marker.use(sampleFaIcon(type)).width(_iconSize).height(_iconSize).move(
                  -(_iconSize / 2) + ((index * 1.5) * (_iconSize / 2)) - _extraOffset,
                  -39 + ((index * 1.5) * (_iconSize / 2)) - _extraOffset + (_poiTypes.length - 1)
                );
              }
            });

          } else {

            _marker = createSvgCircleMarker(this._markerSvgCanvas, _markerColor);

            _poiTypes.forEach(function(type, index) {
              if (_visibleTypes.indexOf(type) !== -1 && index <= 1) {

                // max of 2 icons in marker, if more types show plus symbol
                if (index === 1 && _poiTypes.length > 2 || index === 1 && !_self.showCampsites) {
                  type = 'multiple';
                }

                _marker.use(sampleFaIcon(type)).width(_iconSize).height(_iconSize).move(
                  -(_iconSize / 2) + ((index * 1.5) * (_iconSize / 2)) - _extraOffset,
                  -(_iconSize / 2) + ((index * 1.5) * (_iconSize / 2)) - _extraOffset + (_poiTypes.length - 1)
                );
              }
            });
          }

          _marker.click(this._onMarkerClick.bind({data:_poi, self:this}));
          _marker.move(this._svgWidth * (_poi.anchorPoint.distance / environment.MILE), _markerElevation);
        }

      });
    }

  }

  // draw "random" trees below line
  private _drawTrees(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    // only way to execute seedrandom without compile errors
    Math['seedrandom']('' + this.data.id);           // reseed

    const _trees = this._markerSvgCanvas.group().addClass('tree-marker');

    if (isPrime(this.data.id) || Math.random() * 100 < 25) {

      const _count = Math.round(Math.random() * 4);

      for (let i = 0; i < _count; i ++) {

        const primeMarker = createSvgFaElement(this._markerSvgCanvas, 'tree', 0.5 + Math.random() * 0.75);
        let treeline = normalizeElevation(this._svgHeight, this.data.elevationRange.low, min, range, 0);
        treeline = treeline + (Math.random() * (treeline * 2));

        primeMarker.move(Math.random() * this._svgWidth, treeline);
        _trees.add(primeMarker);
      }
    }
  }

  private _drawUserMarker(): void {

    // clear old
    if (this._userMarker) {
      this._userMarker.remove();
      this._userMarker = null;
    }

    if(!this.user) {
      return;
    }

    const _color: string = (this.userStatus === 'tracking') ? '#00FF00' : '#CCCCCC';
    const _onTrail: boolean = (this.user.distance <= this._localStorage.retrieve('userDistanceOffTrail'));


    if (_onTrail) {

      this._userMarker = createSvgPointMarker(this._markerSvgCanvas, _color, 1);
      this._userMarker.use(sampleFaIcon('user')).width(16).height(16).move(-8, -39);

    } else {

      this._userMarker = createSvgCircleMarker(this._markerSvgCanvas, _color, 1);
      this._userMarker.use(sampleFaIcon('user')).width(16).height(16).move(-8, -8);
    }

    this._userMarker.click(this._onUserClick.bind(this));
  }



// EVENT HANDLERS

  private _onUserClick(event: MouseEvent): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  // linked directly to svg marker
  private _onMarkerClick(event: MouseEvent): void {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const _event: CustomEvent = new CustomEvent(
      'markerClick',
      {
        bubbles: true,
        cancelable: true,
        detail: this.data
      });

    // changed scope
    this['self'].map.nativeElement.dispatchEvent(_event);
  }

  private _updateUserLocation(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    this._drawUserMarker();

    if (this.user && this._userMarker) {

      const _withinVertBounds: boolean = (this.user.waypoint.elevation > this.visibleOHLC.low && this.user.waypoint.elevation < this.visibleOHLC.high);

      let _userElevation = 0;

      if (_withinVertBounds) {
        _userElevation = normalizeElevation(this._svgHeight, this.user.waypoint.elevation, min, range, environment.LINEHEIGHT / 2);
      } else {
        if (this.user.waypoint.elevation < this.visibleOHLC.low) {
          _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.low, min, range, environment.LINEHEIGHT / 2);
        } else {
          _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.high, min, range, environment.LINEHEIGHT / 2);
        }
      }

      // set the user marker position
      this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / environment.MILE), _userElevation);
    }
  }
}
