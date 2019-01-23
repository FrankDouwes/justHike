import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trail } from '../../type/trail';

@Component({
  selector: 'app-elevation-profile',
  templateUrl: './elevation-profile.component.html',
  styleUrls: ['./elevation-profile.component.sass']
})
export class ElevationProfileComponent implements OnInit {

  public trailData:     Trail;
  public visibleRange:  object;
  public resize:        object;
  public scrollTo:      number;

  constructor(
    private _route: ActivatedRoute
  ) {
  }




  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this._route.data
      .subscribe(result => {
        this.trailData = result.trailData;
      });
  }




  // EVENT HANDLERS

  private onScroll(response: object): void {
    this.visibleRange = response;
  }

  private onResize(response: object): void {
    this.resize = response;
  }

  private onScrollTo(response: number): void {
    this.scrollTo = response;
  }
}
