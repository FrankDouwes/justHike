import {Component, isDevMode, OnInit} from '@angular/core';
import { VirtualListComponent } from './virtual-list/virtual-list.component';
import { ActivatedRoute } from '@angular/router';
import { Trail } from '../../type/trail';
import {Snow} from '../../type/snow';

@Component({
  selector: 'app-elevation-profile',
  templateUrl: './elevation-profile.component.html',
  styleUrls: ['./elevation-profile.component.sass']
})
export class ElevationProfileComponent implements OnInit {

  public trailData:     Trail;
  public snowData:      Snow;

  public visibleRange:  object;
  public resize:        object;
  public scrollTo:      number;

  constructor(
    private _route: ActivatedRoute
  ) {}



  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this._route.data
      .subscribe(result => {

        if (isDevMode()) {
          console.log('data loaded: ', result.data);
        }

        this.trailData = result.data.trail;
        this.snowData = result.data.snow;

      });
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
