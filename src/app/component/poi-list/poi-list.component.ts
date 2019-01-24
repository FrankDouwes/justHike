import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Mile} from '../../type/mile';
import {Poi} from '../../type/poi';
import {Location} from '@angular/common';
import {LocationService} from '../../service/location.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass']
})

export class PoiListComponent implements OnInit {

  @ViewChild('poiList') container: CdkVirtualScrollViewport;

  @Input() milesData: Array<Mile>;

  // subs
  private _locationSubscription:          Subscription;
  private _locationStatusSubscription:    Subscription;

  // vars
  // public combinedPoisArray:     Array<Poi>  = [];       // combines static and user
  public combinedPoisArray: BehaviorSubject<Array<Poi>> = new BehaviorSubject([]);

  public status:                 = 'idle';
  public timestamp:             number;                 // used to update visible items when user location changes

  private _staticPoisArray:     Array<Poi>  = [];
  private _userPoi:             Poi;
  private _userIndex:           number;

  constructor(
    private _location:          Location,
    private _locationService:   LocationService,
  ) {

    this.timestamp = new Date().getTime();

    // user location poi
    this._userPoi = {
      id: -1,
      waypoint: undefined,
      anchorPoint: undefined,
      type: 'user',
      label: 'idle'
    };

    // set up subscriptions
    this._locationStatusSubscription = _locationService.locationStatus.subscribe(
      status => {
        this.onStatusChange(status);
      });

    this._locationSubscription = _locationService.location.subscribe(
      location => {
        this.onLocationChange(location);
      });
  }




  // LIFECYCLE HOOKS

  ngOnInit(): void {


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

    this.combinedPoisArray.subscribe(
      data => {
        this.scrollToUser();
      });

    this.sortListData(this._staticPoisArray.concat(this._userPoi));
  }




  // EVENT HANDLERS

  private onListItemClick(poi: Poi): void {

    if (poi.type === 'user') {
      this._locationService.toggleTracking();
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
      const _delay = setTimeout(function () {
        _self.container.scrollToOffset(72 * _self._userIndex, 'auto');
      }, 1);
    }
  }




  // SUBSCRIPTION HANDLERS

  private onStatusChange(status: string): void {

    // if we're switching to tracking
    if (this.status !== 'tracking' && status === 'tracking') {
      // xxx
    }

    this.status = status;
    this._userPoi.label = status;
  }

  private onLocationChange(location: any): void {

    const _self = this;

    // // if tracking
    if (location && this.status !== 'idle') {

      this._userPoi['waypoint'] = location['waypoint'];

      this._userPoi['anchorPoint'] = location['anchorPoint'];

      this.sortListData(this._staticPoisArray.concat(this._userPoi));
      this.timestamp = location.timestamp;

      // figure out where the pois are in relation to the user
      this._staticPoisArray.forEach(function(poi: Poi) {
        poi.distanceFromUser = poi.anchorPoint.distanceTotal - _self._userPoi.anchorPoint.distanceTotal;
      });

    } else {
      this._userPoi['waypoint'] = this._userPoi['anchorPoint'] = undefined;
      this.sortListData(this._staticPoisArray.concat(this._userPoi));
    }
  }



  // OTHER

  private sortListData(data: Array<Poi>) {
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
    this.combinedPoisArray.next(data);
  }
}
