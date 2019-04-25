import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  public isTracking:              boolean;

  public visiblePoiRange:         any;          // the visible poi range (in the poi list)
  public visibleMileRange:        any;          // the visible mile range (in the poi list)
  public drawRange:               any;          // the range thats actually rendered

  private _locationSubscription:  Subscription;

  constructor(
    private _localStorage: LocalStorageService,
    private _locationService: LocationService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {

    const _self = this;

    // get miles data based on route id
    this.routedMile = (this._route.snapshot) ? Number(this._route.snapshot.paramMap.get('id')) : 0;

    console.log(this.routedMile);

    this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this._setMapData(this.routedMile);
      }
    );

    this._locationSubscription = this._locationService.locationStatus.subscribe(function(result) {
      _self.isTracking = (result === 'tracking');
    })

    this.isNobo = (this._localStorage.retrieve('direction') === 0);
    //
    // this._screenModeSubscription = this._screenModeService.screenModeChangeObserver.subscribe(function(screenMode) {
    //
    //   if (_self._screenMode !== screenMode) {
    //     console.log('screenmode changed');
    //     _self._screenMode = screenMode;
    //     _self._changeDetector.markForCheck();
    //   }
    // })
  }

  ngOnDestroy(): void {
    if (this._locationSubscription) {
      this._locationSubscription.unsubscribe();
    }
  }


  // EVENTS
  public onScrollTo(data: any): void {

    console.log('on scroll to', data.mileId);
    this._setMapData(data.mileId, data.renderedPoiRange, data.renderedMileRange);
    this.routedMile = data.mileId;

    /* updating queryParamams (this._router.navigate) seems to cause bugs over time on iOS,
    so i'm setting a property that will be used for the back button navigate call */
    this._router['scrollToPosition'] = this.routedMile;
    //this._router.navigate(['.'], {relativeTo: this._route, queryParams: {back: this.routedMile}});
  }

  private _setMapData(mileId: number, poiRange?: any, mileRange?: any): void {

    if (mileRange && mileRange.length > 0) {

      mileRange.sort((a, b) => a - b);

      this.drawRange = {
        behind: Math.abs(mileId - mileRange[0]) + 3,
        ahead: Math.abs(  mileRange[mileRange.length - 1] - mileId)
      };

      this.visibleMileRange = mileRange;
    }

    if (poiRange && poiRange.length > 0) {
      this.visiblePoiRange = poiRange;
    }

    mileId = (mileId === 0) ? 0 : mileId - 1;

    this.centerPoint = this.trailData.miles[mileId].centerpoint as Waypoint;
  }
}
