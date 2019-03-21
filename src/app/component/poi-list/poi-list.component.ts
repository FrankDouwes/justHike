import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { LocationBasedComponent } from '../../display/location-based/location-based.component';

import { BehaviorSubject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Mile } from '../../type/mile';
import { Poi } from '../../type/poi';
import { User } from '../../type/user';

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// using basic for loops, nothing fancy for performance.
export class PoiListComponent extends LocationBasedComponent implements OnInit, OnChanges {

  @ViewChild('poiList') container: CdkVirtualScrollViewport;

  @Output() scrollToEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() milesData?: Array<Mile>;
  @Input() poisData?: Array<Mile>;
  @Input() showUser: boolean;
  @Input() activeMileId: number;
  @Input() directionReversal?: boolean;     // reverse list
  @Input() trigger: number;     // center user without the need for a service

  // user and pois combined in a single array
  public combinedData: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public timestamp: number;       // used to trigger reload
  public userPosition: string;
  public itemSize: number;
  public cacheSize: number = 10;

  private _staticPoisArray:     Array<any>  = [];
  private _userIndex:           number;

  constructor() {

    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    this.itemSize = Math.round(this.container.elementRef.nativeElement.clientHeight / 7);

    this.combinedData.subscribe(
      data => {

        if (this.showUser) {
          this.scrollToUser();
        }
      });

    // TODO does not work on ios
    // window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.milesData) {
      console.log('setup');
      this.setup();
    }

    if (changes.trigger) {
      this.scrollToUser();
    }
  }

  private setup(): void {

    this._staticPoisArray = [];

    const _self = this;

    // get all pois within miles
    if (this.milesData) {

      this.milesData.forEach(function (mile: Mile, index: number) {
        if (mile.pois && mile.pois.length > 0) {
          _self._staticPoisArray = _self._staticPoisArray.concat(mile.pois);
        }
      });
    } else if (this.poisData) {
      console.log('NOT IMPLEMENTED');
    }

    this._staticPoisArray.forEach(function(poiId, index) {
      _self._staticPoisArray[index] = _self.trailGenerator.getPoiById(poiId);
    });

    if (this.showUser) {
      const _userRef: User = (this.user !== undefined) ? this.user : super.createBlankUser();
      this._sortListData(this._staticPoisArray.concat(_userRef));
      this.onUserLocationChange(_userRef);
    } else {
      this._sortListData(this._staticPoisArray);
    }

    this._scrollToCenterMile();
  }



  // SUBSCRIPTION HANDLERS

  public onStatusChange(status: string): void {

    // if we're switching to tracking
    if (this.status !== 'tracking' && status === 'tracking') {
      // xxx
    }
  }

  public onUserLocationChange(user: User): void {

    const _self = this;

    // // if tracking
    if (location && this.status !== 'idle') {

      this._sortListData(this._staticPoisArray.concat(user));

      // figure out where the pois are in relation to the user
      const staticPoisLength = this._staticPoisArray.length;
      for (let i = 0; i < staticPoisLength; i++) {
        const _poi = this._staticPoisArray[i];
        if (user.anchorPoint) {
          _poi.distanceFromUser = _poi.anchorPoint.distanceTotal - user.anchorPoint.distanceTotal;
        }
      }

    } else {

      user.waypoint = user.anchorPoint = undefined;
      this._sortListData(this._staticPoisArray.concat(user));
    }
  }




  // EVENT HANDLERS

  public onListItemClick(poi: Poi): void {

    if (poi.type === 'user') {
      this.locationService.toggleTracking();
      return;
    }

    const _event: CustomEvent = new CustomEvent(
      'markerClick',
      {
        bubbles: true,
        cancelable: true,
        detail: poi
      });

    this.container['elementRef'].nativeElement.dispatchEvent(_event);
  }

  public scrollToUser(): void {

    const _self = this;
    if (this.container) {

      window.requestAnimationFrame(function() {
        const _padding = _self.itemSize / 2;    // this makes sure the user list item is fully on screen, therefor the poi/mile index is correct
        let _verticalOffset = _padding;

        if (_self.directionReversal) {
          _verticalOffset = _self.container.elementRef.nativeElement.clientHeight - _self.itemSize - _padding;
        }

        _self.container.scrollToOffset((_self.itemSize * _self._userIndex) - _verticalOffset, 'auto');
      });
    }
  }

  private _scrollToCenterMile(): void {

    const _self = this;

    const trailLength: number = this.trailGenerator.getTrailData().miles.length;

    let _activeMile: Mile;

    // find the first mile containing a poi
    for (let i = this.activeMileId; i < trailLength; i++) {
      if (this.trailGenerator.getTrailData().miles[i].pois) {
        _activeMile = this.trailGenerator.getTrailData().miles[i];
        break;
      }
    }

    if (!_activeMile) {
      return;
    }

    let _middlePoi: number = _activeMile.pois[Math.floor(_activeMile.pois.length - 1)];

    setTimeout(function () {

      const _maxIndex = _self.combinedData.getValue().length;

      if (_self.directionReversal) {
        _middlePoi = _maxIndex - _middlePoi - 7;
        if (_middlePoi < 0) {
          _middlePoi = 0;
        }else if ( _middlePoi > _maxIndex) {
          _middlePoi = _maxIndex;
        }
      }

      // scrolling to 0 somehow scrolls to the end of the list (cdk bug)
      const _total = (_middlePoi === 0) ? 1 : _middlePoi * _self.itemSize;

      _self.container.scrollToOffset(_total, 'auto');
      _self.onScroll(_middlePoi)
    }, 10);
  }

  public onScroll(event): void {

    let _currentIndex: number = event;

    if (this.directionReversal) {
      _currentIndex = event + 7;
    }

    // TODO: not perfect, sometimes _currentPoi is blank, BUG: cant reach start/end.
    // convert the scrollIndex to a poi id
    let _currentPoi: Poi | User = this.combinedData.getValue()[_currentIndex];

    if (!_currentPoi || !_currentPoi['belongsTo']) {
      const _maxIndex = this.combinedData.getValue().length - 1;
      // current poi is the user location indicator, get next/prev poi
      if (_currentIndex === _maxIndex || this.directionReversal) {
        _currentPoi = this.combinedData.getValue()[_currentIndex - 1];
      } else if (_currentIndex === 0 || !this.directionReversal) {
        _currentPoi = this.combinedData.getValue()[_currentIndex + 1];
      }
    }

    // shouldn't be needed BUG
    if (!_currentPoi || !_currentPoi['belongsTo']) {
      return;
    }

    // check user position (to show indecator to scroll up/down
    const _renderedRange = this.container.getRenderedRange();
    if (this._userIndex < _renderedRange.start) {
      this.userPosition = 'above';
    } else if (this._userIndex > _renderedRange.end) {
      this.userPosition = 'below';
    } else if (this._userIndex >= _renderedRange.start && this._userIndex <= _renderedRange.end) {
      this.userPosition = 'visible';
    }

    // get the mile that the poi belongs to
    const _mile = this.trailGenerator.getTrailData().miles[_currentPoi['belongsTo']];
    this.scrollToEvent.emit({mileId: _mile.id});
  }




  // OTHER

  private _sortListData(data: Array<any>): void {

    if (!data) {
      return;
    }

    // sort array by the trail distance of the anchor point (the nearest on trail location)
    data.sort(
      function(a, b) {

        const _aDist = (a.anchorPoint && a.anchorPoint.distanceTotal) ? a.anchorPoint.distanceTotal : 0;
        const _bDist = (b.anchorPoint && b.anchorPoint.distanceTotal) ? b.anchorPoint.distanceTotal : 0;

        return _aDist - _bDist;
      });

    if (this.directionReversal) {
      data.reverse();
    }

    this.cacheSize = Math.floor(data.length / 10);
    this.cacheSize = (this.cacheSize < 7 ) ? 7 : this.cacheSize;

    this._userIndex = data.findIndex(poi => poi.type === 'user');
    this.combinedData.next(data);
    this.timestamp = new Date().getTime();
    this.container.checkViewportSize();  // magically fixes everything! somehow...
  }

  // define ID for better li recycling (according to the CDK virtual scroll docs)
  public trackElementBy(index: number, element: any): number {
    return element.id;
  }
}
