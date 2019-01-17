import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  ngOnInit() {

    this._route.data
      .subscribe(result => {
        this.trailData = result.trailData;
      });
    // const _id = Number(this._route.snapshot.paramMap.get('id'));
    // if(_id && _id !== -1) {
    //   this.onScrollTo(_id);
    // }
  }

  onScroll(response: object) {
    this.visibleRange = response;
  }

  onResize(response: object) {
    this.resize = response;
  }

  onScrollTo(response: number) {
    this.scrollTo = response;
  }
}
