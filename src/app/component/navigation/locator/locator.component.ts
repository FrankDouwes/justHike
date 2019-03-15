import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mile } from '../../../type/mile';
import { User } from '../../../type/user';
import { Subscription } from 'rxjs';
import { LocationBasedComponent } from '../../../display/location-based/location-based.component';
import {Waypoint} from '../../../type/waypoint';

@Component({
  selector: 'locator-button',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.sass']
})
export class LocatorComponent extends LocationBasedComponent implements OnInit, OnDestroy {

  public nearestMileId:           number;
  public showMiniMap:             boolean;

  private _mapObserver:           Subscription;

  constructor() {
    super();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    super.ngOnInit();

    this.showMiniMap = this.localStorage.retrieve('showMiniMap');
    this._mapObserver = this.localStorage.observe('showMiniMap').subscribe(result => {
      this.showMiniMap = result;
    });
  }

  ngOnDestroy():void {

    this._mapObserver.unsubscribe();

    super.ngOnDestroy();
  }



  // EVENT HANDLERS

  public onClick(): void {
    this.locationService.toggleTracking();
  }

  // OTHER

  public onStatusChange(status: string): void {
    this.onUserLocationChange(this.user);
  }

  public onUserLocationChange(user: User): void {

    if (this.user && this.status === 'tracking') {
      this.nearestMileId = user.nearestMileId;
    }
  }
}
