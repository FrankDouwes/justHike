import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
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

import {svgPath} from '../../../../_util/smoothLine';
import {isPrime, normalizeElevation} from '../../../../_util/math';
import {getMajorPoiTypes} from '../../../../_util/poi';
import {environment} from '../../../../../environments/environment.prod';
import {LocalStorageService} from 'ngx-webstorage';
import {Subscription} from 'rxjs';
import {TrailGeneratorService} from '../../../../service/trail-generator.service';
import {SnowGeneratorService} from '../../../../service/snow-generator.service';
import {Snowpoint} from '../../../../type/snow';
import {Waypoint} from '../../../../type/waypoint';
import {MarkerService} from '../../../../factory/marker.service';

@Component({
  selector: 'display-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// uses basic for loops for performance
// TODO: iOS scroll performance issues (jumps backwards during scroll event)
export class ListItemComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('map') map: ElementRef;

  @Output() markerEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input() data:                Mile;
  @Input() visibleOHLC:         OHLC;
  @Input() guides:              Array<object>;
  @Input() isLast:              boolean;
  @Input() resize:              number;
  @Input() update:              number;           // triggers a redraw

  // user inputs only set if this mile is closest to user (else null)
  @Input() user?:               User;
  @Input() triggerUserUpdate?:  number;           // timestamp, set when user location is updated.
  @Input() userStatus?:         string;           // idle/fetching/tracking

  private _majorPoiTypes:         Array<string>;
  public hasInvisiblePoi:     boolean;

  private _snowData:            Array<Array<Snowpoint>>;
  private _dynamicSubscriptions: object           = {};
  public settings:              object            = {};
  private _initialized:         boolean;          // can only draw after initialization

  private _screenMode:          string;
  private _trailLength:         number;

  // SVG MAP
  private _lineCanvas;                            // line (trail/snow) canvas
  private _markerSvgCanvas;                       // poi (locations/user/trees) canvas
  private _svgWidth:            number;
  private _svgHeight:           number;

  // USER
  private _userMarker;


  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    private _snowGenerator: SnowGeneratorService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _markerFactory: MarkerService
  ) {}





// LIFECYCLE HOOKS

  ngOnInit(): void {

    const _self = this;
    this._majorPoiTypes = getMajorPoiTypes();

    this._screenMode = this._localStorage.retrieve('screenMode');
    this._trailLength = this._trailGenerator.getTrailData().miles.length;

    // dynamic subscriptions based on PoiTypes that are set as being major (important)
    this._majorPoiTypes.forEach(function(type: string) {
        _self._getSettingFromStorage(type);
        _self._addSubscription(type);
    });

    // add snowPack subscription
    _self._getSettingFromStorage('snow');
    this._hasInvisiblePoi();
    _self._addSubscription('snow');
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

      if (!this.visibleOHLC) {
        return;
      }

      this._snowData = this._snowGenerator.getSnowForMile(this.data.id);
      this._hasInvisiblePoi();
      this._drawMap();
    }

    if (changes.update) {

      this._screenMode = this._localStorage.retrieve('screenMode');
      this._drawMap();
    }

    if (changes.resize) {

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

    if (changes.triggerUserUpdate || changes.user || changes.userStatus) {

      if (this.userStatus !== 'tracking') {
        this._clearUserMarker();
      }

      this._updateUserLocation();
    }
  }

  ngOnDestroy(): void {
    for (const key in this._dynamicSubscriptions) {
      this._removeSubscription(key);
    }
  }




  // add a poi type subscription to the subscriptionsObject
  private _addSubscription(name: string): void {

    const _camelName =  this.createCamelCaseName(name, 'show');

    const _subscription = this._localStorage.observe(_camelName).subscribe(result => {
      this.settings[_camelName] = result;
      if (this._majorPoiTypes.indexOf(name) !== -1) {
        this._hasInvisiblePoi();
      }
      this._drawMap();
    });

    this._dynamicSubscriptions[name] = _subscription;
  }

  // get initial poi type saved values, as subscriptions only listen to updates
  private _getSettingFromStorage(name: string): void {

    const _camelName =  this.createCamelCaseName(name, 'show');
    this.settings[_camelName] = this._localStorage.retrieve(_camelName);
  }

  private _removeSubscription(name: string): void {

    const _subscription: Subscription = this._dynamicSubscriptions[name];

    if (_subscription) {
      _subscription.unsubscribe();
    }
  }

  // used to indicate that this mile has more pois than are being shown in elevation profile
  private _hasInvisiblePoi(): void {

    let _newValue;

    const _self = this;

    if (this.data.hasMinorPoi) {
      _newValue = true;
    } else if (this.data.hasMajorPoi) {
      const _length = this._majorPoiTypes.length;
      for (let i = 0; i < _length; i++) {
        const _type = this._majorPoiTypes[i];
        if (_self.data.poiTypes[_type] !== undefined && !_self.settings[_self.createCamelCaseName(_type, 'show')]) {
          _newValue = true;
          break;
        }
      }
    } else {
      _newValue = false;
    }

    // only redraw if needed
    if (this.hasInvisiblePoi !== _newValue) {
      this.hasInvisiblePoi = _newValue;
      this._changeDetectorRef.detectChanges();
    }
  }

  private _drawMap(): void {

    this._clearCanvas(true, true);

    // line
    this._drawLine();

    if (this.settings['showSnow']) {
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

      if (this._userMarker) {
        this._clearUserMarker();
      }

      this._markerSvgCanvas.clear();

    } else {
      console.log('no marker canvas');
    }

    this._lineCanvas.size(this._svgWidth, this._svgHeight);
    this._lineCanvas.viewbox(0, 0, this._svgWidth, this._svgHeight);
  }

  private _drawLine(): void {

    // console.log('draw line for mile', this.data.id);

    const min: number = this.visibleOHLC.low;   // high point
    const max: number = this.visibleOHLC.high;  // low point
    const range = (max - min);

    const drawPoints: Array<any> = [];

    const _waypointsArr = this.data.waypoints;

    let _waypointDistPerc: number;

    const _totalWaypoints: number = _waypointsArr.length;
    for (let i = 0; i < _totalWaypoints; i++) {

      const _waypoint: Waypoint = _waypointsArr[i];

      // calculate distance, starting at 2nd point
      _waypointDistPerc = _waypoint.distance / environment.MILE;

      const _elevation: number = normalizeElevation(this._svgHeight, _waypoint.elevation, min, range, environment.LINEHEIGHT);

      // set startpoints
      if (i === 0) {
        drawPoints.push([-environment.LINEHEIGHT, this._svgHeight]);
        drawPoints.push([-environment.LINEHEIGHT, _elevation]);
      }

      // add point
      drawPoints.push([Math.round(this._svgWidth * _waypointDistPerc), _elevation]);

      // set endpoints
      if (i === _waypointsArr.length - 1) {
        drawPoints.push([this._svgWidth + environment.LINEHEIGHT, _elevation]);
        drawPoints.push([this._svgWidth + environment.LINEHEIGHT, this._svgHeight]);
      }
    }

    if (this.data.id === this._trailLength) {

      const _waypoint: Waypoint = _waypointsArr[_waypointsArr.length - 1];
      const _lastWaypointDistPerc = _waypoint.distance / environment.MILE;

      this._lineCanvas.size(this._svgWidth * _lastWaypointDistPerc, this._svgHeight);
      this._lineCanvas.viewbox(0, 0, this._svgWidth * _lastWaypointDistPerc, this._svgHeight)
    }

    // draw line

    let _fill: string = 'rgba(233,225,210, 0.5)';

    if (this._screenMode == 'highContrast') {
      _fill = 'rgba(255,255,255, 0.65)';
    } else if (this._screenMode === 'nightHike') {
      _fill = 'rgba(89,89,89, 0.65)';
    }

    const _polyline = this._lineCanvas.path(svgPath(drawPoints)).fill(_fill)
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

      const _stroke: string = (this._screenMode === 'highContrast') ? '#97ffff' : 'rgba(255,255,255,0.9)';

      const _totalWaypoints: number = _waypointsArr.length;
      for (let i = 0; i < _totalWaypoints; i++) {

        const _waypoint: Waypoint = _waypointsArr[i];

        let _elevation = 0;

        const elevationRange = function(): number {
          // waypoint distance (%) on snowarray elevation range
          return _snowArray[0].elevation + ((_waypoint.distance / environment.MILE) * ((_snowArray[1].elevation - _snowArray[0].elevation)));
        };

        // if waypoint is above snowline
        if (_waypoint.elevation >= elevationRange()) {

          // add point
          _elevation = normalizeElevation(this._svgHeight, _waypoint.elevation, min, range, environment.LINEHEIGHT);
          drawPoints.push([Math.round(this._svgWidth * (_waypoint.distance / environment.MILE)), _elevation]);

        } else if (_waypoint.elevation < elevationRange()) {

          // if trail drops below snowline

          const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)')
            .stroke({ color: _stroke, width: environment.LINEHEIGHT * 2, linecap: 'round'});

          drawPoints = [];
        }
      }

      // if there is still snow to be drawn at the end of loop
      if (drawPoints.length >= 1) {

        const snowLine = this._lineCanvas.path(svgPath(drawPoints)).fill('rgba(255,255,255,0)')
          .stroke({ color: _stroke, width: environment.LINEHEIGHT * 2, linecap: 'round'});
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
      const _maxPoiDistance = this._localStorage.retrieve('poiMaxDistance');

      const _totalPois: number = _poisArray.length;
      for (let i = 0; i < _totalPois; i++) {

        const _poi: Poi = this._trailGenerator.getPoiById(_poisArray[i]);

        // filter out of range pois
        if (_poi.waypoint.distance >= _maxPoiDistance) {
          return;
        }

        if (!_poi) {
          console.log('bug at poi with id: ' + _poi.id);
        }

        const _poiTypes = _poi['type'].split(', ');

        // if poi is of visible type
        let _visibleTypes: Array<string> = [];

        const _poiTypesLength = _poiTypes.length;
        for (let p = 0; p < _poiTypesLength; p++) {

          const _type: string = _poiTypes[p];

          // check if poi type is of visible type based on user settings (only camp/water/highway/end
          const _setting: boolean = _self.settings[_self.createCamelCaseName(_type, 'show')];

          if (_setting === true) {
            _visibleTypes.push(_type);
          }
        }

        if (_visibleTypes.length > 0) {

          const _markerElevation: number = normalizeElevation(this._svgHeight, _poi.waypoint.elevation, min, range, environment.LINEHEIGHT / 2);

          const _marker = this._markerFactory.setupMarker(this._markerSvgCanvas, _poi, _visibleTypes);

          _marker.click(this._onMarkerClick.bind({data:_poi, self:this}));
          _marker.move(this._svgWidth * (_poi.anchorPoint.distance / environment.MILE), _markerElevation);
        }

      }
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

        const primeMarker = this._markerFactory.createSvgFaElement(this._markerSvgCanvas, 'tree', 0.5 + Math.random() * 0.75);
        let treeline = normalizeElevation(this._svgHeight, this.data.elevationRange.low, min, range, 0);
        treeline = treeline + (Math.random() * (treeline * 2));

        primeMarker.move(Math.random() * this._svgWidth, treeline);
        _trees.add(primeMarker);
      }
    }
  }

  private _drawUserMarker(): void {

    if (!this.user) {
      return;
    }

    const _onTrail: boolean = (this.user.distance <= this._localStorage.retrieve('userDistanceOffTrail'));

    // if user matches in both type & status, move (animate) the current user to it's new position
    // else redraw

    if (this._userMarker) {

      const _attr = this._userMarker.node.attributes;

      if (Boolean(_attr.onTrail.value) === _onTrail && _attr.type.value === 'pin' ||
        Boolean(_attr.onTrail.value) === _onTrail && _attr.type.value === 'circle') {

        console.log('no redraw');

        return; // marker is already what it should be, no need to redraw
      } else {

        this._clearUserMarker();
      }
    }

    const _color: string = (this.userStatus === 'tracking') ? '#00FF00' : '#CCCCCC';

    // create user maker
    if (_onTrail) {

      this._userMarker = this._markerFactory.createSvgPinMarker(this._markerSvgCanvas, _color, 1);
      this._userMarker.use(this._markerFactory.sampleFaIcon('user')).width(16).height(16).move(-8, -39);

    } else {

      this._userMarker = this._markerFactory.createSvgCircleMarker(this._markerSvgCanvas, _color, 1);
      this._userMarker.use(this._markerFactory.sampleFaIcon('user')).width(16).height(16).move(-8, -8);
    }

    this._userMarker.attr('onTrail', _onTrail);

    this._userMarker.click(this._onUserClick.bind(this));
  }

  private _clearUserMarker(): void {
    if (this._userMarker) {
      this._userMarker.remove();
      this._userMarker = null;
    }
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

    console.log('update location');

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
      if (!this._userMarker.attr('x')) {
        this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / environment.MILE), _userElevation);
      } else {

        const _distance = this._trailGenerator.calcDistanceFlat(
          {latitude:  this._userMarker.attr('x'), longitude: this._userMarker.attr('y')},
          {latitude: this._svgWidth * (this.user.anchorPoint.distance / environment.MILE), longitude: _userElevation});

        if (_distance > 1000000) {
          this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / environment.MILE), _userElevation);
        } else {
          this._userMarker.animate({duration: 300,  ease: ''}).move(this._svgWidth * (this.user.anchorPoint.distance / environment.MILE), _userElevation);
        }
      }

      this._userMarker.attr('x', this._svgWidth * (this.user.anchorPoint.distance / environment.MILE));
      this._userMarker.attr('y', _userElevation);
    }
  }

  public createCamelCaseName(name: string, prepend?: string, append?: string): string {

    prepend = (prepend) ? prepend : '';
    append = (append) ? prepend : '';

    return prepend + name.charAt(0).toUpperCase() + name.slice(1) + append;
  };
}
