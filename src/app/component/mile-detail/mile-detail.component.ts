import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Mile } from '../../type/mile';
import {Trail} from '../../type/trail';
import {Waypoint} from '../../type/waypoint';

@Component({
  selector: 'app-mile-detail',
  templateUrl: './mile-detail.component.html',
  styleUrls: ['./mile-detail.component.sass']
})

export class MileDetailComponent implements OnInit {

  public visibleMiles:            Array<Mile>;
  public routedMile:              number;
  public trailData:               Trail;
  public centerPoint:             Waypoint;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    // get miles data based on route id
    this.routedMile = (this._route.snapshot) ? Number(this._route.snapshot.paramMap.get('id')) : 0;

    this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this._setCenterpoint(this.routedMile);
      }
    );
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
}
