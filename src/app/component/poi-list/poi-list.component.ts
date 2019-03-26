import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { LocationBasedComponent } from '../../display/location-based/location-based.component';

import {BehaviorSubject} from 'rxjs';
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
  @Input() masterPoi?: Poi;
  @Input() showUser: boolean;
  @Input() activeMileId: number;
  @Input() directionReversal?: boolean;     // reverse list
  @Input() trigger: number;     // center user without the need for a service

  // user and pois combined in a single array
  public combinedData: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  private _dataLength: number;    // the length of the combined data (pois + user), speed optimisation
  public timestamp: number;       // used to trigger reload
  public userPosition: string;
  public itemSize: number;
  public cacheSize: number = 10;

  private _staticPoisArray:           Array<any>  = [];
  private _userIndex:                 number;

  constructor() {

    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    const _self = this;

    this.itemSize = Math.round(this.container.elementRef.nativeElement.clientHeight / 7);

    this.combinedData.subscribe(
      data => {

        this._dataLength = data.length;

        if (this.showUser) {
          this.scrollToUser();
        }
      });

    // TODO does not work on ios
    // window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.milesData || changes.poisData) {
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

      const _length = this.milesData.length;
      for (let i = 0; i < _length; i++) {
        const _mile: Mile = this.milesData[i];
        if (_mile.pois && _mile.pois.length > 0) {
          this._staticPoisArray = this._staticPoisArray.concat(_mile.pois);
        }
      }
    } else if (this.poisData) {
      this._staticPoisArray = this.poisData;
    }

    const _poiLength = this._staticPoisArray.length;
    for (let p = 0; p < _poiLength; p++) {
      const _poiId = this._staticPoisArray[p];
      _self._staticPoisArray[p] = _self.trailGenerator.getPoiById(_poiId);
    }


    if (this.showUser) {
      const _userRef: User = (this.user !== undefined) ? this.user : super.createBlankUser();
      this._sortListData(this._staticPoisArray.concat(_userRef));
      this.onUserLocationChange(_userRef);
    } else {
      this._sortListData(this._staticPoisArray);

      if (this.masterPoi) {
        this._calculateDistance(this.masterPoi);
      }
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

    // // if tracking
    if (location && this.status !== 'idle') {

      if (this.showUser) {
        this._sortListData(this._staticPoisArray.concat(user));
      }

      if (this.milesData) {
        this._calculateDistance(user);
      }

    } else if (this.showUser) {

      user.waypoint = user.anchorPoint = undefined;
      this._sortListData(this._staticPoisArray.concat(user));
    }
  }

  private _calculateDistance(master: Poi | User): void {

    if (master) {
      const staticPoisLength = this._staticPoisArray.length;

      // figure out where pois are in relation to the master poi
      for (let i = 0; i < staticPoisLength; i++) {
        const _poi = this._staticPoisArray[i];

        if (master.anchorPoint) {
          if (!this.showUser) {
            _poi.distanceFromPoi = _poi.anchorPoint.distanceTotal - master.anchorPoint.distanceTotal;
          } else {
            _poi.distanceFromUser = _poi.anchorPoint.distanceTotal - master.anchorPoint.distanceTotal;
          }
        }
      }
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

    if (!this.showUser) {
      return;
    }

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

    this._updateUserListIndicator();


    // get the rendered range
    const _renderedRange = this.container.getRenderedRange();

    const _renderedIndexes: Array<number> = [];
    const _renderedPois: Array<number> = [];

    for (let i = _renderedRange.start; i < _renderedRange.end; i++) {

      const _poi: Poi | User = this.combinedData.getValue()[i];

      // filter out the user
      if (_poi.type !== 'user') {
        _renderedIndexes.push(i);
        _renderedPois.push(_poi.id);
      }
    }

    const _firstPoiId: number = (this.directionReversal) ? _renderedIndexes[_renderedIndexes.length - 1] : _renderedIndexes[0];
    const _firstPoi = this.combinedData.getValue()[_firstPoiId];


    // the mile id is based on the center of the list
    const _middlePoiIndex: number = _renderedIndexes[Math.floor(_renderedIndexes.length / 2)];
    const _middlePoi: Poi = this.combinedData.getValue()[_middlePoiIndex];

    const _mile = this.trailGenerator.getTrailData().miles[_firstPoi['belongsTo'] - 1];

    this.scrollToEvent.emit({mileId: _mile.id, renderedRange: _renderedPois});
  }



  private _updateUserListIndicator(): void {
    const _renderedRange = this.container.getRenderedRange();
    if (this._userIndex < _renderedRange.start) {
      this.userPosition = 'above';
    } else if (this._userIndex > _renderedRange.end) {
      this.userPosition = 'below';
    } else if (this._userIndex >= _renderedRange.start && this._userIndex <= _renderedRange.end) {
      this.userPosition = 'visible';
    }
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
