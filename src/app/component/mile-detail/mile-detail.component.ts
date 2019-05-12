import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trail} from '../../type/trail';
import {Waypoint} from '../../type/waypoint';
import {LocalStorageService} from 'ngx-webstorage';
import {LocationService} from '../../service/location.service';
import {BaseComponent} from '../../base/base/base.component';

@Component({
  selector: 'app-mile-detail',
  templateUrl: './mile-detail.component.html',
  styleUrls: ['./mile-detail.component.sass']
})

export class MileDetailComponent extends BaseComponent implements OnInit {

  public routedMile:              number;
  public trailData:               Trail;
  public centerPoint:             Waypoint;
  public isNobo:                  boolean;
  public isTracking:              boolean;

  public visiblePoiRange:         any;          // the visible poi range (in the poi list)
  public visibleMileRange:        any;          // the visible mile range (in the poi list)
  public drawRange:               any;          // the range thats actually rendered

  constructor(
    private _localStorage: LocalStorageService,
    private _locationService: LocationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    super();
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.isNobo = (this._localStorage.retrieve('direction') === 0);
    this._addSubscriptions();
  }



  // SUBSCRIPTIONS

  private _addSubscriptions(): void {

    // get miles data based on route id
    this.routedMile = (this._route.snapshot) ? Number(this._route.snapshot.paramMap.get('id')) : 0;

    this.addSubscription('routeData', this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this._setMapData(this.routedMile);
      }
    ));

    this.addSubscription('location', this._locationService.locationStatus.subscribe((result) => {
      this.isTracking = (result === 'tracking');
    }));

    const _appRoot = document.getElementsByTagName('app-root')[0];
    this.addEventListener(_appRoot, ['markerClick'] , (event: Event) => {

      if (event['detail'] && event['detail'].belongsTo) {
        this.routedMile = event['detail'].belongsTo;
      }
    }, false);
  }



  // EVENTS

  public onScrollTo(data: any): void {

    this._setMapData(data.mileId, data.renderedPoiRange, data.renderedMileRange);
    this.routedMile = data.mileId;

    /* updating queryParamams (this._router.navigate) seems to cause bugs over time on iOS,
    so i'm setting a property that will be used for the back button navigate call */
    // this._router.navigate(['.'], {relativeTo: this._route, queryParams: {back: this.routedMile}});

    this._router['scrollToPosition'] = this.routedMile;
  }

  private _setMapData(mileId: number, poiRange?: any, mileRange?: any): void {

    if (mileId > this.trailData.miles.length) {
      // this only happens when refreshing in browser (debug) after resetting trail...
      mileId = this.trailData.miles.length;
    }

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
