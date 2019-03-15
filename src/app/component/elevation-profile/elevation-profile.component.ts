import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trail } from '../../type/trail';
import {Snow} from '../../type/snow';

@Component({
  selector: 'app-elevation-profile',
  templateUrl: './elevation-profile.component.html',
  styleUrls: ['./elevation-profile.component.sass']
})
export class ElevationProfileComponent implements OnInit {

  public visibleRange:  object;
  public resize:        object;
  public scrollTo:      number;

  public trailData: Trail;
  public snowData: Snow;

  constructor(
    private _route: ActivatedRoute)
  {}

  ngOnInit(): void {
    this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this.snowData = result.data['snow'];
      }
    );
  }


  // EVENT HANDLERS

  public onScroll(response: object): void {
    this.visibleRange = response;
  }

  public onResize(response: object): void {
    this.resize = response;
  }

  public onScrollTo(response: number): void {
    this.scrollTo = response;
  }
}


