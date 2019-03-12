import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { LocationBasedComponent } from '../../display/location-based/location-based.component';

import { BehaviorSubject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Mile } from '../../type/mile';
import { Poi } from '../../type/poi';
import { User } from '../../type/user';
import {Waypoint} from '../../type/waypoint';
import elevation = geolib.elevation;

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass']
})

export class PoiListComponent extends LocationBasedComponent implements OnInit, OnChanges {

  @ViewChild('poiList') container: CdkVirtualScrollViewport;

  @Output() scrollToEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() milesData?: Array<Mile>;
  @Input() poisData?: Array<Mile>;
  @Input() showUser: boolean;
  @Input() activeMileId: number;

  // user and pois combined in a single array
  public combinedData: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public timestamp: number;       // used to trigger reload

  private _staticPoisArray:     Array<any>  = [];
  private _userIndex:           number;

  constructor() {

    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    this.combinedData.subscribe(
      data => {
        if (this.showUser) {
          this._scrollToUser();
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
  }



  // SUBSCRIPTION HANDLERS

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
      this._staticPoisArray.forEach(function(poi: Poi) {
        if (user.anchorPoint) {
          poi.distanceFromUser = poi.anchorPoint.distanceTotal - user.anchorPoint.distanceTotal;
        }
      });

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

  private _scrollToUser(): void {

    const _self = this;
    if (this.container) {
      setTimeout(function () {
        _self.container.scrollToOffset(72 * _self._userIndex, 'auto');
      }, 1);
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

    const _middlePoi: number = _activeMile.pois[Math.floor(_activeMile.pois.length - 1)];

    setTimeout(function () {

      // const _vertOffset = (_self.container.elementRef.nativeElement.clientHeight - 72) / 2;

      // let _offset = (_middlePoi * 72) - _vertOffset;
      // _offset = (_offset > 0) ? _offset : 0;

      _self.container.scrollToOffset(_middlePoi * 72, 'auto');
      _self.onScroll(_middlePoi)
    }, 10);
  }

  public onScroll(event): void {

    console.log('change');

    let _currentIndex: number;

    if (typeof event === 'number') {

      _currentIndex = event;

    } else {

      // the indexes arent correctly ordered while scrolling up, so a calculation is needed
      const _calc = this.container.measureScrollOffset('top');
      _currentIndex = Math.floor(_calc / 72);
      const _percentage = Math.abs((_calc - (_currentIndex * 72)) / 72);
    }


    // convert the scrollIndex to a poi id
    const _currentCenterPoi: Poi | User = this.combinedData.getValue()[_currentIndex];
    // const _nextPoint: Poi | User = this.combinedData.getValue()[_currentIndex + 1];

    if (_currentCenterPoi['belongsTo']) {
      this.scrollToEvent.emit({mileId: _currentCenterPoi['belongsTo']});
    }

    // if (_currentCenterPoi['belongsTo']) {
    //   const _mile = this.trailGenerator.getTrailData().miles[_currentCenterPoi['belongsTo'] - 1];
    //
    //   const _waypointId = Math.round((_mile.waypoints.length - 1) * _percentage);
    //   console.log(_waypointId);
    //   this.scrollToEvent.emit({mileId: _mile.id, waypoint: _mile.waypoints[_waypointId]});
    // }
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
