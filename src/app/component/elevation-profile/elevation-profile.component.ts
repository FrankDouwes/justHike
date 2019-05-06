import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trail } from '../../type/trail';
import {Snow} from '../../type/snow';
import {LoaderService} from '../../service/loader.service';
import {BaseComponent} from '../../base/base/base.component';

@Component({
  selector: 'app-elevation-profile',
  templateUrl: './elevation-profile.component.html',
  styleUrls: ['./elevation-profile.component.sass']
})
export class ElevationProfileComponent extends BaseComponent implements OnInit {

  public visibleRange:  object;
  public resize:        object;
  public scrollTo:      number;

  public trailData: Trail;
  public snowData: Snow;

  constructor(
    private _route: ActivatedRoute,
    private _loaderOverlay: LoaderService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription('routeData', this._route.data.subscribe(result => {
        this.trailData = result.data['trail'];
        this.snowData = result.data['snow'];
        this._loaderOverlay.hideOverlay();
      }
    ));
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


