import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Input,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {anchorDistanceCalculation} from '../../../_geo/geoCalc';

// type classes
import {OHLC} from '../../../type/ohlc';
import {Mile} from '../../../type/mile';
import {Trail} from '../../../type/trail';
import {LocationBasedComponent} from '../../../display/location-based/location-based.component';
import {Poi} from '../../../type/poi';
import {User} from '../../../type/user';
import {Location} from '@angular/common';

@Component({
  selector: 'virtual-list-component',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush       // needs testing, especially with iOS/Safaris weird scroll event.
})
export class VirtualListComponent extends LocationBasedComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('scrollViewport') scrollViewport: CdkVirtualScrollViewport;

  @Input() trailData: Trail;
  @Input() scrollTo: number;

  @Output() scrollEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() resizeEvent: EventEmitter<object> = new EventEmitter<object>();

  // public
  public userLocation:  Object;
  public visibleOHLC:   OHLC;
  public resize:        number;
  public itemWidth:     number;

  public guides:        Array<object>     = [];
  public scrollOffset       = 0;

  // private
  private _visibleRange:      object;
  private _resizeTimer:       any;

  private _currentIndex       = 0;
  private _initialIndex       = 0;
  private _status             = 'idle';


  constructor(
    private _router:            Router,
    private _route:             ActivatedRoute,
  ) {

    super();
    this.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
  }




// LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    this._initialIndex = Number(this._route.snapshot.queryParams['id']);
    this.setupEventListeners();
  }

  ngAfterViewInit() {

    const _self = this;

    const _delay = setTimeout(function() {
      _self.scrollViewport.scrollToIndex(_self._initialIndex, 'auto');
    }, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.scrollTo) {
      if (changes.scrollTo.currentValue) {
        if (this.scrollViewport) {
          this._currentIndex = Math.floor(this.scrollViewport.getDataLength() * changes.scrollTo.currentValue);
          this.scrollViewport.scrollToIndex(this._currentIndex, 'auto');
        }
      }
    }
  }



// SUBSCRIPTION HANDLERS

  public onStatusChange(status: string): void {

    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    // if we're switching to tracking
    if (this._status !== 'tracking' && this.status === 'tracking' && this.scrollViewport) {
      this.scrollViewport.scrollToIndex(this.user.nearestMileId, 'auto');
      this._status = status;
    }
  }




// EVENTS & HANDLERS

  private setupEventListeners(): void {

    const _self = this;

    // Listen for scroll events (angular "events" will not do!)
    window.addEventListener('scroll', function (event) {

      event.preventDefault();
      event.stopPropagation();

      _self.scrollViewport.checkViewportSize();  // magically fixes everything! somehow...

      _self.scrollOffset = _self.scrollViewport.measureScrollOffset();

      // update background position
      const _wrapper = _self.scrollViewport.elementRef.nativeElement;
      _wrapper.setAttribute('style', 'background-position-x: ' + -(_self.scrollOffset * 0.8) + 'px;');

    }, true);
  }

  onClick(listItem: Mile): void {
    this._router.navigate(['detail/', listItem.id], {queryParams: {back: this._currentIndex}});
  }

  // only executed once every 250ms as it's a redraw of all list items
  onResize(event): void {

    const self = this;

    clearTimeout(this._resizeTimer);

    this._resizeTimer = setTimeout(function() {
      self.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
      self.resize = new Date().getTime();
      self.resizeEvent.emit({resize: new Date().getTime()});
      self.redraw();
    }, 250);
  }

  onScroll(viewport: CdkVirtualScrollViewport, index: number): void {
      this._currentIndex = index;
      this.redraw();
  }




// OTHER

  // calculate the open high low close (for high/low range) for the currently visible elements
  // used to vertically scale svg content and calculate guides etc.
  private calculateVisOHLC(visibleRange: object): OHLC {

    const _visibleItems = this.trailData.miles.slice(visibleRange['start'], visibleRange['end']);

    let _highest:  number;
    let _lowest:   number;

    for (const vi of _visibleItems) {

      const castOhlc = vi['elevationRange'] as OHLC;

      if (!_highest || castOhlc.high > _highest) {
        _highest = castOhlc.high;
      }

      if (!_lowest || castOhlc.low < _lowest) {
        _lowest = castOhlc.low;
      }
    }

    return {open: _visibleItems[0]['open'], high: _highest, low: _lowest, close: _visibleItems[_visibleItems.length - 1]['close']};
  }

  // calculate the number of guides and their values (used for labels and guides)
  private calculateGuides(): void {

    this.guides = [];

    const _stepSize = 200;

    const _startSize = Math.ceil(this.visibleOHLC.low / _stepSize) * _stepSize;
    const _maxSize = Math.ceil(this.visibleOHLC.high / _stepSize) * _stepSize;

    for (let i = _startSize ; i < _maxSize; i += _stepSize) {
      this.guides.push({elevation: i, label: Math.round(i)});
    }

    // max visible elevation
    if (this.guides[this.guides.length - 1]['elevation'] >= this.visibleOHLC.high - (_stepSize / 4)) {
      this.guides.pop();
    }
    this.guides.push({elevation: this.visibleOHLC.high, label: Math.round(this.visibleOHLC.high), range: 'max'});

    // min visible elevation
    if (this.guides[0]['elevation'] <= this.visibleOHLC.low + (_stepSize / 4)) {
      this.guides.shift();
    }
    this.guides.unshift({elevation: this.visibleOHLC.low, label: Math.round(this.visibleOHLC.low), range: 'min'});
  }

  // redraw guides and trigger a scroll event (that redraws the list)
  private redraw(): void {
    const _oldRange = this._visibleRange;
    this._visibleRange = this.scrollViewport.getRenderedRange();

    // only if really needed!
    if (_oldRange !==  this._visibleRange) {
      this.scrollEvent.emit({visibleRange: this._visibleRange, scrollX: this.scrollViewport.getOffsetToRenderedContentStart()});
      this.visibleOHLC = this.calculateVisOHLC(this._visibleRange);
      this.calculateGuides();
    }
  }




// OPTIMISING

  // define ID for better li recycling (according to the CDK virtual scroll docs)
  trackElementBy(index: number, element: any): number {
    return element ? element.id : null;
  }
}
