import {Component, OnInit, OnDestroy} from '@angular/core';
import { findNearestMileInTree, trailData } from '../../_geo/geoCalc';
import { LocationService } from '../../service/location.service';

import {Waypoint} from '../../type/waypoint';
import * as L from 'leaflet';
import {Subscription} from 'rxjs';
import {Poi} from '../../type/poi';
import {elevationLines} from '../../_util/tiles';
import {Mile} from '../../type/mile';

@Component({
  selector: 'locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.sass']
})
export class LocatorComponent implements OnInit {

  public status: string = 'idle';
  public mileIdClosestToUser: number = -1;
  public visibleMiles: Array<Mile>;
  public userLocation: Waypoint;

  private _locationSubscription: Subscription;
  private _locationStatusSubscription: Subscription;

  private _map;
  private _location;

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

  ngOnInit() {

  }

  onStatusChange(status: string) {

    this.status = status;

    if (this.status === 'tracking') {
      this.showPosition(this._location);
    }
  }

  onLocationChange(location: object) {
    this._location = location;
  }

  showPosition(position) {

    // get the nearest 3 miles

    this.mileIdClosestToUser = position.mile.id;

    this.visibleMiles = trailData.miles.slice(position.mile.id - 1, position.mile.id + 2);

    this.userLocation = position.coords as Waypoint;
  }

  onClick() {
    this._locationService.toggleTracking();
  }

  ngOnDestroy() {
    this._locationSubscription.unsubscribe();
    this._locationStatusSubscription.unsubscribe();
  }

}
