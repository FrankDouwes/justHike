import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import 'seedrandom/seedrandom';

import {OHLC} from '../../../../type/ohlc';
import {Mile} from '../../../../type/mile';
import {Settings} from '../../../../settings';

declare const SVG: any;    // fixed SVG installation bug
import 'svg.filter.js';
import {svgPath} from '../../../../_geo/smoothLine';
import {Poi} from '../../../../type/poi';
import {isPrime, normalizeElevation} from '../../../../_util/math';
import {createSvgCircleMarker, createSvgFaElement, createSvgPointMarker, sampleFaIcon} from '../../../../_util/markers';
import {Snowpoint} from '../../../../type/snowpoint';
import {getPoiTypeByType} from '../../../../_util/poi';

@Component({
  selector: 'display-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListItemComponent implements OnInit {

  @ViewChild('map') map: ElementRef;

  @Input() data: Mile;
  @Input() isLast: boolean;
  @Input() visibleOHLC: OHLC;
  @Input() guides: Array<object>;
  @Input() resize: number;
  @Input() current: object;

  @Output() markerEvent: EventEmitter<number> = new EventEmitter<number>();

  public showCampsites: boolean;

  // SVG MAP
  private _svgCanvas;
  private _markerSvgCanvas;
  private _svgWidth: number;
  private _svgHeight: number;
  private _polyline;
  private _userMarker;
  private _initialized: boolean;      // can only draw after initialization

  constructor() {}

// LIFECYCLE HOOKS

  ngOnInit() {

    this.showCampsites = Settings.USERSETTINGS.showCampSites;
  }

  ngAfterViewInit() {

    // this._svgWidth = Math.ceil(this.map.nativeElement.clientWidth);
    this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
    this._svgHeight = Math.ceil(this.map.nativeElement.clientHeight);


    this._svgCanvas = SVG('map_' + this.data.id)
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

    // console.log("lala", changes);

    // since this component requires the dom for drawing svg, it'll have to wait until initialization finishes
    if (!this._initialized) {
      return;
    }

    if (changes.resize) {

      // this._svgWidth = Math.ceil(this.map.nativeElement.clientWidth);
      this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
      this._svgHeight = Math.ceil(this.map.nativeElement.clientHeight);

      // update svg size
      if (this._svgCanvas) {
        const svg = window.document.getElementById(this._svgCanvas.node.id);
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
  }

  drawMap() {

    this.clearCanvas(true, true);

    this.drawLine();
    this.drawSnow();

    this.drawTrees();
    this.drawPois();

    this.drawUser();
  }




// DRAW ELEMENTS

  clearCanvas(polyline: boolean = true, markers: boolean = false) {

    // polyline canvas
    if (this._svgCanvas && polyline) {
      this._svgCanvas.clear();
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

  drawLine () {

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
    const _strokeColor: string = (this.data.isCurrent) ? '#429832' : 'red';
    this._polyline = this._svgCanvas.path(svgPath(drawPoints)).fill('rgba(233,225,210, 0.5)').stroke({ color: _strokeColor, width: Settings.LINEHEIGHT});
  }

  drawSnow() {

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
          const snowLine = this._svgCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)').stroke({ color: 'rgba(255,255,255,0.9)', width: Settings.LINEHEIGHT * 2, linecap: 'round'});

          // let _mask = this._polyline.clone().fill("white");
          // snowLine.maskWith(_mask);

          drawPoints = [];
        }

      });

      // if there is still snow to be drawn at the end of loop
      if (drawPoints.length >= 1) {

        const snowLine = this._svgCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)').stroke({ color: 'rgba(255,255,255,0.9)', width: Settings.LINEHEIGHT * 2, linecap: 'round'});

        // let _mask = this._polyline.clone().fill("white");
        // snowLine.maskWith(_mask);
      }
    }
  }

  drawPois () {

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

          if (_poiTypes.length > 1 && _visibleTypes.length > 1) {
            _markerColor = getPoiTypeByType('multiple').color;
            _iconSize = 13;
            _extraOffset = (_iconSize / 2);
          } else {
            _markerColor = getPoiTypeByType(_poiTypes[0]).color;
          }

          if (_poi.waypoint.distance <= Settings.USERSETTINGS.distanceOffTrail) {

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

  drawUser () {

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    // draw user
    if (this.data.isCurrent === true && this.current) {

      let _userElevation = 0;

      // move user
      if (this.current['elevation'] < this.visibleOHLC.low) {

        _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.low, min, range, Settings.LINEHEIGHT / 2);
        this._userMarker = createSvgCircleMarker(this._markerSvgCanvas, '#CCCCCC', 1);
        this._userMarker.use(sampleFaIcon('sample-user')).width(16).height(16).move(-8, -8);

      } else if (this.current['elevation'] > this.visibleOHLC.high) {

        _userElevation = normalizeElevation(this._svgHeight, this.visibleOHLC.high, min, range, Settings.LINEHEIGHT / 2);
        this._userMarker = createSvgCircleMarker(this._markerSvgCanvas, '#CCCCCC', 1);
        this._userMarker.use(sampleFaIcon('sample-user')).width(16).height(16).move(-8, -8);

      } else {

        _userElevation = normalizeElevation(this._svgHeight, this.current['elevation'], min, range, Settings.LINEHEIGHT / 2);
        this._userMarker = createSvgFaElement(this._markerSvgCanvas, 'user', 1.25, -15, -25);
      }

      this._userMarker.click(this.onUserClick.bind(this));
      this._userMarker.move(this._svgWidth * (this.current['anchorDistance'] / Settings.MILE), _userElevation);
    }
  }

  // draw "random" trees below line
  drawTrees () {

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

// EVENT HANDLERS

  onUserClick (event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log('user', event, this.data.id);
  }

  // linked directly to svg marker
  onMarkerClick (event: MouseEvent) {
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
}
