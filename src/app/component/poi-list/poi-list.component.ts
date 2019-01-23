import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Mile} from '../../type/mile';
import {Poi} from '../../type/poi';
import {Location} from '@angular/common';
import {LocationService} from '../../service/location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass']
})

export class PoiListComponent implements OnInit {

  @ViewChild('poiList') container: ElementRef;
  @Input() milesData: Array<Mile>;

  // subs
  private _locationSubscription:          Subscription;
  private _locationStatusSubscription:    Subscription;

  // vars
  public combinedPoisArray:     Array<Poi>  = [];       // combines static and user

  private _status:                string      = 'idle';
  private _staticPoisArray:     Array<Poi>  = [];
  private _userPoi:             Poi;


  constructor(
    private _location:          Location,
    private _locationService:   LocationService,
  ) {

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

    this.combinedPoisArray = this._staticPoisArray.concat(this._userPoi);

  }




  // EVENT HANDLERS

  private onListItemClick(poi: Poi): void {

    if (poi.type === 'user') {
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




  // SUBSCRIPTION HANDLERS

  private onStatusChange(status: string): void {

    // if we're switching to tracking
    if (this._status !== 'tracking' && status === 'tracking') {
      //xxx
    }

    this._status = status;
    this._userPoi.label = status;
  }

  private onLocationChange(location: any): void {

    // // if tracking
    if (location && this._status !== 'idle') {

      this._userPoi['waypoint'] = location['waypoint'];

      this._userPoi['anchorPoint'] = location['anchorPoint'];

      this.combinedPoisArray = this._staticPoisArray.concat(this._userPoi);

      // figure out where the pois are in relation to the user
      // this.poisArray.forEach(function(poi:Poi, index:number) {
      //   console.log(poi, index);
      // })

    } else {
      this._userPoi['waypoint'] = this._userPoi['anchorPoint'] = undefined;
      this.combinedPoisArray = this._staticPoisArray.concat(this._userPoi);
    }
  }
}
