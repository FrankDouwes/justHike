import { Component, OnInit, OnDestroy } from '@angular/core';
import { trailData } from '../../_geo/geoCalc';
import { LocationService } from '../../service/location.service';

import { Waypoint } from '../../type/waypoint';
import { Subscription } from 'rxjs';
import { Mile } from '../../type/mile';

@Component({
  selector: 'locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.sass']
})
export class LocatorComponent implements OnInit, OnDestroy {

  public status = 'idle';
  public mileIdClosestToUser = -1;
  public visibleMiles:            Array<Mile>;
  public userLocation:            Waypoint;

  private _locationSubscription:            Subscription;
  private _locationStatusSubscription:      Subscription;
  private _location:              object;

  constructor(private _locationService: LocationService) {

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

  }

  ngOnDestroy(): void {
    this._locationSubscription.unsubscribe();
    this._locationStatusSubscription.unsubscribe();
  }



  // EVENT HANDLERS

  private onClick(): void {
    this._locationService.toggleTracking();
  }



  // OTHER

  private onStatusChange(status: string): void {
    this.status = status;
    if (this.status === 'tracking') {
      this.showPosition(this._location);
    }
  }

  private onLocationChange(location: object): void {
    this._location = location;
    if (this.status === 'tracking') {
      this.showPosition(this._location);
    }
  }

  private showPosition(position): void {

    console.log(position);

    // get the nearest 3 miles
    this.mileIdClosestToUser = position.mile.id;
    this.visibleMiles = trailData.miles.slice(position.mile.id - 1, position.mile.id + 2);
    this.userLocation = position.anchorPoint as Waypoint;
  }

}
