import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Mile } from '../../type/mile';
import {Trail} from '../../type/trail';
import {Waypoint} from '../../type/waypoint';
import {LocalStorageService} from 'ngx-webstorage';
import {LocationService} from '../../service/location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-mile-detail',
  templateUrl: './mile-detail.component.html',
  styleUrls: ['./mile-detail.component.sass']
})

export class MileDetailComponent implements OnInit, OnDestroy {

  public routedMile:              number;
  public trailData:               Trail;
  public centerPoint:             Waypoint;
  public isNobo:                  boolean;
  public centerUserTrigger:       number;
  public isTracking:              boolean;

  private _locationSubscription:  Subscription;

  constructor(
    private _localStorage: LocalStorageService,
    private _locationService: LocationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {

    const _self = this;

    // get miles data based on route id
    this.routedMile = (this._route.snapshot) ? Number(this._route.snapshot.paramMap.get('id')) : 0;

    this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this._setCenterpoint(this.routedMile);
      }
    );

    this._locationSubscription = this._locationService.locationStatus.subscribe(function(result) {
      _self.isTracking = (result === 'tracking');
    })

    this.isNobo = (this._localStorage.retrieve('direction') === 0);
  }

  ngOnDestroy(): void {
    if (this._locationSubscription) {
      this._locationSubscription.unsubscribe();
    }
  }


  // EVENTS
  public onScrollTo(data: any): void {
    this._setCenterpoint(data.mileId);
    this.routedMile = data.mileId;
    this._router.navigate(['.'], {relativeTo: this._route, queryParams: {back: this.routedMile}});
  }

  private _setCenterpoint(mileId: number): void {
    this.centerPoint = this.trailData.miles[mileId].centerpoint as Waypoint;
  }

  public centerOnUser():void {
    this.centerUserTrigger = new Date().getTime();
  }
}
