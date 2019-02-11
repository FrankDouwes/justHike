import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LocationBasedComponent} from '../../display/location-based/location-based.component';

import {BehaviorSubject} from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

import {Mile} from '../../type/mile';
import {Poi} from '../../type/poi';
import {User} from '../../type/user';

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass']
})

export class PoiListComponent extends LocationBasedComponent implements OnInit {

  @ViewChild('poiList') container: CdkVirtualScrollViewport;

  @Input() milesData: Array<Mile>;

  // user and pois combined in a single array
  public combinedData: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  private _staticPoisArray:     Array<any>  = [];
  private _userIndex:           number;

  constructor() {

    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit();

    this._staticPoisArray = [];

    const _self = this;

    // get all pois within miles
    if (this.milesData) {
      this.milesData.forEach(function (mile: Mile, index: number) {
        if (mile.pois && mile.pois.length > 0) {
          _self._staticPoisArray = _self._staticPoisArray.concat(mile.pois);
        }
      });
    }

    this.combinedData.subscribe(
      data => {
        this.scrollToUser();
      });

    const _userRef: User = (this.user !== undefined) ? this.user : super.createBlankUser();
    this.sortListData(this._staticPoisArray.concat(_userRef));
    this.onUserLocationChange(_userRef);
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

      this.sortListData(this._staticPoisArray.concat(user));

      // figure out where the pois are in relation to the user
      this._staticPoisArray.forEach(function(poi: Poi) {
        if (user.anchorPoint) {
          poi.distanceFromUser = poi.anchorPoint.distanceTotal - user.anchorPoint.distanceTotal;
        }
      });

    } else {

      user.waypoint = user.anchorPoint = undefined;
      this.sortListData(this._staticPoisArray.concat(user));
    }
  }


  // EVENT HANDLERS

  private onListItemClick(poi: Poi): void {

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

  private scrollToUser() {

    const _self = this;
    if (this.container) {
      setTimeout(function () {
        _self.container.scrollToOffset(72 * _self._userIndex, 'auto');
      }, 1);
    }
  }



  // OTHER

  private sortListData(data: Array<any>) {
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
  }
}
