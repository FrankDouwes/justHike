import {
  Component, OnInit, AfterViewInit, OnChanges, Input, ViewChild,
  SimpleChanges, EventEmitter, Output, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy
} from '@angular/core';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationBasedComponent} from '../../../base/location-based/location-based.component';
import {LocalStorageService} from 'ngx-webstorage';
import {ScreenModeService} from '../../../service/screen-mode.service';

// type classes
import {OHLC} from '../../../type/ohlc';
import {Mile} from '../../../type/mile';
import {User} from '../../../type/user';
import {Trail} from '../../../type/trail';

@Component({
  selector: 'virtual-list-component',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VirtualListComponent extends LocationBasedComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('background') background: ElementRef;
  @ViewChild('backgroundFlat') backgroundFlat: ElementRef;
  @ViewChild('scrollViewport') scrollViewport: CdkVirtualScrollViewport;

  @Input() trailData: Trail;
  @Input() scrollTo: number;

  @Output() scrollEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() resizeEvent: EventEmitter<object> = new EventEmitter<object>();

  // public
  public visibleOHLC:   OHLC;
  public resize:        number;
  public itemWidth:     number;

  public guides:        Array<object>     = [];
  public cacheSize:     number;
  public update:        number;

  // private
  private _visibleRange:      object;
  private _resizeTimer:       any;

  private _currentIndex       = 0;
  private _initialIndex       = 0;
  private _isCentered:        boolean;
  private _status             = 'idle';
  private _parallaxEnabled: boolean;

  constructor(
    private _router:                    Router,
    private _route:                     ActivatedRoute,
    private _localStorageService:       LocalStorageService,
    private _screenMode:                ScreenModeService,
    private _changeDetector:            ChangeDetectorRef
  ) {

    super();
    this.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
  }




// LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    this._initialIndex = (this._route.snapshot) ? Number(this._route.snapshot.queryParams['id']) : 0;

    this.cacheSize = Math.floor(this.trailData.miles.length / 10);

    this._setupSubscriptions();
  }

  ngAfterViewInit() {

    const _self = this;

    const _delay = window.requestAnimationFrame(function() {
      if(_self._initialIndex) {
        _self.scrollViewport.scrollToIndex(_self._initialIndex, 'auto');
      }

      window.cancelAnimationFrame(_delay);       // probably not needed
      setTimeout(function() {
        _self.onResize(null, true);                 // fixes fullscreen at startup android
        _self._changeDetector.detectChanges();
      }, 3000);
    });
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

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.scrollViewport.detach();
    this.scrollViewport = null;
  }


// OVERRIDES

  public onStatusChange(status: string): void {
    super.onStatusChange(status);
    if (status !== 'tracking') {
      this._status = status;
    }
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    // if we're switching to tracking
    if (user && this.status === 'tracking' && this.scrollViewport && user.nearestMileId) {
      if (!this._isCentered || this._status !== 'tracking' ) {
        this.centerOnUser();
        this._isCentered = true;
      }
    }

    this._status = this.status;
    this._changeDetector.markForCheck();
  }

  public centerOnUser(): void {
    super.centerOnUser();
    this._scrollToMile(this.user.nearestMileId);
  }

  private _scrollToMile(mileId: number) {
    if (this.user && this.scrollViewport) {
      const _index = (this.user.nearestMileId - 2 < 0) ? 0 : this.user.nearestMileId - 2;
      this.scrollViewport.scrollToIndex(_index, 'auto');
    }
  }


// EVENTS & HANDLERS

  private _setupSubscriptions(): void {

    const _self = this;

    this.toggleParallax(this._localStorageService.retrieve('parallaxEnabled'));
    this.addSubscription('parallax', this._localStorageService.observe('parallaxEnabled').subscribe(function(result) {
      _self.toggleParallax(result);
    }));

    this.addSubscription('screenMode', this._screenMode.screenModeChangeObserver.subscribe(function(result) {
      if (_self.scrollViewport) {
        _self.update = new Date().getTime();
        _self._changeDetector.markForCheck();
      }
    }));
  }

  // parralax effect seems to slow down iOS a lot, optional,
  private _onScrollEvent(event: Event): void {

      const _self = this;

      if (event.target === _self.scrollViewport.elementRef.nativeElement) {

        event.preventDefault();
        event.stopPropagation();

        _self.scrollViewport.checkViewportSize();  // magically fixes everything! somehow...

        const _scrollOffset: number = - (_self.scrollViewport.measureScrollOffset() * 0.015);
        const _width: number = _self.scrollViewport.elementRef.nativeElement.clientWidth;
        const _repeated: number = Math.ceil(_scrollOffset / _width);
        const _finalOffset: number = _scrollOffset - (_repeated * _width);
        _self.background.nativeElement.style.transform = 'translateX(' + _finalOffset + 'px)';
      }
  }

  public onClick(listItem: Mile): void {
    this._router['scrollToPosition'] = listItem.id - 1;
    this._router.navigate(['detail/', this._router['scrollToPosition']]);
  }

  // only executed once every 250ms as it's a redraw of all list items
  public onResize(event?: Event, force: boolean = false): void {

    const self = this;

    clearTimeout(this._resizeTimer);

    this._resizeTimer = setTimeout(function() {
      self.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth, window.outerWidth || 0) / 4.5);
      self.resize = new Date().getTime();
      self.resizeEvent.emit({resize: new Date().getTime()});
      self._redraw(force);
    }, 250);
  }

  public onScroll(viewport: CdkVirtualScrollViewport, index: number): void {
    this._currentIndex = index;
    this._redraw();
  }




// OTHER

  // calculate the open high low close (for high/low range) for the currently visible elements
  // used to vertically scale svg content and calculate guides etc.
  private _calculateVisOHLC(visibleRange: object): OHLC {

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
  private _calculateGuides(): void {

    const _newGuides = [];

    const _range = this.visibleOHLC.high - this.visibleOHLC.low;

    const _stepSize = (_range > 1000 ) ? _range / 5 : 200;

    const _startSize = Math.ceil(this.visibleOHLC.low / _stepSize) * _stepSize;
    const _maxSize = Math.ceil(this.visibleOHLC.high / _stepSize) * _stepSize;

    for (let i = _startSize ; i < _maxSize; i += _stepSize) {
      _newGuides.push({elevation: i, label: Math.round(i)});
    }

    // max visible elevation
    if (_newGuides[_newGuides.length - 1]['elevation'] >= this.visibleOHLC.high - (_stepSize / 4)) {
      _newGuides.pop();
    }
    _newGuides.push({elevation: this.visibleOHLC.high, label: Math.round(this.visibleOHLC.high), range: 'max'});

    // min visible elevation
    if (_newGuides[0]['elevation'] <= this.visibleOHLC.low + (_stepSize / 4)) {
      _newGuides.shift();
    }
    _newGuides.unshift({elevation: this.visibleOHLC.low, label: Math.round(this.visibleOHLC.low), range: 'min'});

    this.guides = _newGuides;     // triggers a single redraw as guides is only changed once.
  }

  // redraw guides and trigger a scroll event (that redraws the list)
  private _redraw(force: boolean = false): void {

    if (!this.scrollViewport) {
      return;
    }

    const _oldRange = this._visibleRange;

    this._visibleRange = this.scrollViewport.getRenderedRange();

    // only if really needed!
    if (_oldRange !==  this._visibleRange || force) {
      this.scrollEvent.emit({visibleRange: this._visibleRange, scrollX: this.scrollViewport.getOffsetToRenderedContentStart()});

      // prevent redraw if not needed
      const _newOHLC = this._calculateVisOHLC(this._visibleRange);
      if (!this.visibleOHLC || _newOHLC.high !== this.visibleOHLC.high || _newOHLC.low !== this.visibleOHLC.low || force) {
        this.visibleOHLC = _newOHLC;
        this.update = new Date().getTime();
        this._calculateGuides();
      }
    }
  }

  // toggle parallax based on settings
  private toggleParallax(enable:boolean): void {

    // Listen for scroll events (angular "events" will not do!), needs to run on window for ios
    if (this._parallaxEnabled && !enable) {
      this.removeEventListener(window, 'scroll');
    } else if (!this._parallaxEnabled && enable) {
      this.addEventListener(window, 'scroll', this._onScrollEvent.bind(this), true);
    }

    this._parallaxEnabled = enable;
  }




// OPTIMISING

  // define ID for better li recycling (according to the CDK virtual scroll docs)
  public trackElementBy(index: number, element: any): number {
    return element.id;
  }
}
