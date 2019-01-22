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
  public poisArray:           Array<Poi>  = [];

  private _status:            string      = 'idle';
  private _userPoi:           Poi;

  constructor(
    private _location:          Location,
    private _locationService:   LocationService,
  ) {

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

  ngOnInit() {

    this.poisArray = [];


    // user location poi

    this._userPoi = {
      id: -1,
      trail: "USER",
      waypoint: {latitude: 0, longitude: 0, elevation: 0},
      type: 'location-arrow',
      label: this._status
    }

    this.poisArray.push(this._userPoi);

    const _self = this;

    // get all pois within miles
    if (this.milesData) {
      this.milesData.forEach(function (mile: Mile, index: number) {
        if (mile.pois && mile.pois.length > 0) {
          _self.poisArray = _self.poisArray.concat(mile.pois);
        }
      });
    }

  }



  // EVENT HANDLERS

  onListItemClick(poi) {
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

      this._status = status;
      this._userPoi.label = status;
    }
  }

  private onLocationChange(location: any): void {

    console.log("location", location, this._status);

    // // if tracking
    // if (location && this._status === 'tracking') {

      let _userPoi: Poi = {
        id: -1,
        trail: "USER",
        waypoint: {latitude: location.coords.latitude, longitude: location.coords.longitude, elevation: location.coords.altitude},
        type: 'user',
        label: 'user'
      }

      this.poisArray.unshift(_userPoi);

    // } else {
    //
    // }
  }
}
