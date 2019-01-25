import { Component, OnInit } from '@angular/core';
import {LocationBasedComponent} from '../../display/location-based/location-based.component';
import { trailData } from '../../_geo/geoCalc';
import { Mile } from '../../type/mile';
import {User} from '../../type/user';

@Component({
  selector: 'locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.sass']
})
export class LocatorComponent extends LocationBasedComponent implements OnInit {

  public visibleMiles:            Array<Mile>;
  public nearestMileId: number;

  constructor() {
    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    super.ngOnInit();
  }

  // EVENT HANDLERS

  private onClick(): void {
    this.locationService.toggleTracking();
  }

  // OTHER

  public onStatusChange(status: string): void {
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    if (this.status === 'tracking') {
      this.nearestMileId = user.nearestMileId;
      // get the nearest 3 miles
      this.visibleMiles = trailData.miles.slice(user.nearestMileId - 1, user.nearestMileId + 2);
    }
  }
}
