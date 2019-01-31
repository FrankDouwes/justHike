import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import 'seedrandom/seedrandom';

import {Settings} from '../../../../settings';

import {OHLC} from '../../../../type/ohlc';
import {Mile} from '../../../../type/mile';
import {User} from '../../../../type/user';
import {Snowpoint} from '../../../../type/snowpoint';
import {Poi} from '../../../../type/poi';

declare const SVG: any;    // fixes SVGjs bug
import 'svg.filter.js';

import {svgPath} from '../../../../_geo/smoothLine';
import {isPrime, normalizeElevation} from '../../../../_util/math';
import {createSvgCircleMarker, createSvgFaElement, createSvgPointMarker, sampleFaIcon} from '../../../../_util/markers';
import {getPoiTypeByType} from '../../../../_util/poi';



@Component({
  selector: 'display-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListItemComponent implements OnInit, AfterViewInit, OnChanges {

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

  // SVG MAP
  private _lineCanvas;                            // line (trail/snow) canvas
  private _markerSvgCanvas;                       // poi (locations/user/trees) canvas
  private _svgWidth:            number;
  private _svgHeight:           number;

  // USER
  private _userMarker;

  // OTHER
  private _initialized:         boolean;          // can only draw after initialization

  constructor() {}

// LIFECYCLE HOOKS

  ngOnInit() {

    this.showCampsites = Settings.USERSETTINGS.showCampSites;
  }

  ngAfterViewInit() {

    this._svgWidth = Math.ceil(this.map.nativeElement.clientWidth);
    // this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
    this._svgHeight = Math.ceil(this.map.nativeElement.clientHeight);

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

  ngOnChanges(changes: SimpleChanges) {

    // since this component requires the dom for drawing svg, it'll have to wait until initialization finishes
    if (!this._initialized) {
      return;
    }

    if (changes.resize) {

      this._svgWidth = Math.ceil(this.map.nativeElement.clientWidth);
      // this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
      this._svgHeight = Math.ceil(this.map.nativeElement.clientHeight);

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

    if (this.visibleOHLC) {
      this.drawMap();
    }

    if (changes.triggerUserUpdate || changes.user) {
      this.updateUserLocation();
    }
  }

  private drawMap(): void {

    this.clearCanvas(true, true);

    // line
    this.drawLine();
    this.drawSnow();

    // pois
    this.drawTrees();
    this.drawPois();

    if (this.user) {
      this.updateUserLocation();
    }
  }




// DRAW ELEMENTS

  private clearCanvas(polyline: boolean = true, markers: boolean = false): void {

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

  private drawLine(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    const drawPoints: Array<any> = [];

    const _waypointsArr = this.data.waypoints;

    let _waypointDistPerc: number;

    _waypointsArr.forEach((waypoint, index) => {

      // calculate distance, starting at 2nd point
      _waypointDistPerc = waypoint.distance / Settings.MILE;

      const _elevation: number = normalizeElevation(this._svgHeight, waypoint.elevation, min, range, Settings.LINEHEIGHT);

      // set startpoints
      if (index === 0) {
        drawPoints.push([-Settings.LINEHEIGHT, this._svgHeight]);
        drawPoints.push([-Settings.LINEHEIGHT, _elevation]);
      }

      // add point
      drawPoints.push([Math.round(this._svgWidth * _waypointDistPerc), _elevation]);

      // set endpoints
      if (index === _waypointsArr.length - 1) {
        drawPoints.push([this._svgWidth + Settings.LINEHEIGHT, _elevation]);
        drawPoints.push([this._svgWidth + Settings.LINEHEIGHT, this._svgHeight]);
      }

    });

    // draw line
    const _polyline = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(233,225,210, 0.5)').stroke({ color: 'red', width: Settings.LINEHEIGHT});
  }

  private drawSnow(): void {

    const _snowArray: Array<Snowpoint> = this.data.snowData;
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
          const _computedElevation = _snowArray[0].elevation + ((waypoint.distance / Settings.MILE) * ((_snowArray[1].elevation - _snowArray[0].elevation)));
          return _computedElevation;
        }

        // if waypoint is above showline
        if (waypoint.elevation >= elevationRange()) {

          // add point
          _elevation = normalizeElevation(this._svgHeight, waypoint.elevation, min, range, Settings.LINEHEIGHT);
          drawPoints.push([Math.round(this._svgWidth * (waypoint.distance / Settings.MILE)), _elevation]);

        } else if (waypoint.elevation < elevationRange()) {

          // if trail drops below snowlevel
          const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)').stroke({ color: 'rgba(255,255,255,0.9)', width: Settings.LINEHEIGHT * 2, linecap: 'round'});

          drawPoints = [];
        }

      });

      // if there is still snow to be drawn at the end of loop
      if (drawPoints.length >= 1) {

        const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)').stroke({ color: 'rgba(255,255,255,0.9)', width: Settings.LINEHEIGHT * 2, linecap: 'round'});
      }
    }
  }

  private drawPois(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    const _poisArray = this.data.pois;

    // draw markers
    if (_poisArray) {

      _poisArray.forEach((poi, index) => {

        const _poi = poi as Poi;

        const _visibleTypes = ['water', 'end'];

        // if user setting is true
        if (Settings.USERSETTINGS.showCampSites) {
          _visibleTypes.push('camp');
        }

        const _poiTypes = _poi['type'].split(', ');

        // if poi is of visible type
        if (_visibleTypes.some(function(v) { return _poiTypes.indexOf(v) >= 0; })) {

          let _marker;
          let _markerColor: string;
          let _extraOffset: number = 0;
          let _iconSize: number = 16;

          const _markerElevation: number = normalizeElevation(this._svgHeight, _poi.waypoint.elevation, min, range, Settings.LINEHEIGHT / 2);

          if (_poiTypes.length > 1 && _visibleTypes.length > 2) {
            _markerColor = getPoiTypeByType('multiple').color;
            _iconSize = 13;
            _extraOffset = (_iconSize / 2);
          } else {
            _markerColor = getPoiTypeByType(_poiTypes[0]).color;
          }

          if (_poi.waypoint.distance <= Settings.USERSETTINGS.poiDistanceOffTrail) {

            _marker = createSvgPointMarker(this._markerSvgCanvas, _markerColor);

            _poiTypes.forEach(function(type, index) {
              if (_visibleTypes.indexOf(type) !== -1 && index <= 1) {

                // max of 2 icons in marker, if more types show plus symbol
                if (index === 1 && _poiTypes.length > 2 || index === 1 && !Settings.USERSETTINGS.showCampSites) {
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
                if (index === 1 && _poiTypes.length > 2 || index === 1 && !Settings.USERSETTINGS.showCampSites) {
                  type = 'multiple';
                }

                _marker.use(sampleFaIcon(type)).width(_iconSize).height(_iconSize).move(
                  -(_iconSize / 2) + ((index * 1.5) * (_iconSize / 2)) - _extraOffset,
                  -(_iconSize / 2) + ((index * 1.5) * (_iconSize / 2)) - _extraOffset + (_poiTypes.length - 1)
                );
              }
            });
          }

          _marker.click(this.onMarkerClick.bind({data:_poi, self:this}));
          _marker.move(this._svgWidth * (_poi.anchorPoint.distance / Settings.MILE), _markerElevation);
        }

      });
    }

  }

  // draw "random" trees below line
  private drawTrees(): void {

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

  private drawUserMarker(): void {

    const _color: string = (this.userStatus === 'tracking') ? '#00FF00' : '#CCCCCC';
    const _onTrail: boolean = (this.user.distance <= Settings.USERSETTINGS.userDistanceOffTrail);

      // clear old
      if (this._userMarker) {
        this._userMarker.remove();
        this._userMarker = null;
      }

      if (_onTrail) {

        this._userMarker = createSvgPointMarker(this._markerSvgCanvas, _color, 1);
        this._userMarker.use(sampleFaIcon('user')).width(16).height(16).move(-8, -39);

      } else {

        this._userMarker = createSvgCircleMarker(this._markerSvgCanvas, _color, 1);
        this._userMarker.use(sampleFaIcon('user')).width(16).height(16).move(-8, -8);
      }

      this._userMarker.click(this.onUserClick.bind(this));
  }



// EVENT HANDLERS

  private onUserClick(event: MouseEvent): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  // linked directly to svg marker
  private onMarkerClick(event: MouseEvent): void {
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
  
  private updateUserLocation(): void {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    this.drawUserMarker();

    if (this.user && this._userMarker) {

      const _withinVertBounds: boolean = (this.user.waypoint.elevation > this.visibleOHLC.low && this.user.waypoint.elevation < this.visibleOHLC.high);

      let _userElevation = 0;

      if (_withinVertBounds) {
        _userElevation = normalizeElevation(this._svgHeight, this.user.waypoint.elevation, min, range, Settings.LINEHEIGHT / 2);
      } else {
        if (this.user.waypoint.elevation < this.visibleOHLC.low) {
          _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.low, min, range, Settings.LINEHEIGHT / 2);
        } else {
          _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.high, min, range, Settings.LINEHEIGHT / 2);
        }
      }

      // set the user marker position
      this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / Settings.MILE), _userElevation);
    }
  }
}
