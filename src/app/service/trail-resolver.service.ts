import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TrailService }  from './trail.service';
import { LoaderService } from './loader.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Trail } from '../type/trail';
import { Waypoint } from '../type/waypoint';
import { TrailGeneratorService } from './trail-generator.service';
import { SnowGeneratorService } from './snow-generator.service';
import { Snow } from '../type/snow';
import { reverseSnow } from '../_util/snow';
import { DownloadService } from './download.service';
import {RateService} from './rate.service';

@Injectable({
  providedIn: 'root'
})

export class TrailResolverService implements Resolve<any> {

  private _cachedTrail: Trail;
  private _cachedSnow: Snow;
  private _activeTrailId: number;

  // makes sure trail data is available before navigating anywhere
  constructor(
    private _localStorage: LocalStorageService,
    private _trailService: TrailService,
    private _router: Router,
    private _loaderService: LoaderService,
    private _downloadService: DownloadService,
    private _trailGenerator: TrailGeneratorService,
    private _snowGenerator: SnowGeneratorService,
    private _rateService: RateService
  ) {}


  /* there are 3 locations for trail data
   * - assets: contains default trail data that shipped with the app
   * - filesystem: contains downloaded versions of the trail data
   * - online data */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> | Observable<never> {

    this._activeTrailId = this._localStorage.retrieve('activeTrailId') || 0;
    const _direction: number = this._localStorage.retrieve('direction') || 0;

      if (this._cachedTrail && this._cachedTrail.id === this._activeTrailId && this._cachedTrail.direction === _direction) {

        return of({trail: this._cachedTrail, snow: this._cachedSnow});

      } else {

        return this._trailService.getPreParsedTrailData(this._activeTrailId, _direction).pipe(

          take(1),                // closes subscription
          switchMap(data => {

            if (data) {

              // cache trail
              this._cachedTrail = data[0] as Trail;
              this._trailGenerator.setTrailData(this._cachedTrail);

              // if there's snow data, there might not be
              if (data[1]) {

                // parse snow data individually (as it's a separate update/download)
                this._cachedSnow = data[1] as Snow;
                this._snowGenerator.setSnowData(this._cachedSnow);


                // reverse if needed
                if (_direction === 1) {
                  this._cachedSnow = reverseSnow(this._cachedSnow, this._cachedTrail.miles.length);
                }
              }

              // generate a mileTree (for GPS location)
              const flatMileCoordinates: Array<Waypoint> = data[0].miles.map(function (elem) {
                  return elem.centerpoint as Waypoint;
                }
              );

              this._trailGenerator.createMileTree(flatMileCoordinates);
              this._loaderService.showMessage('created mile tree');

              // set up the rating system (requires active trail data)
              this._rateService.setup();
              this._loaderService.showMessage('initialized rating system');

              this._loaderService.hideOverlay();

              return of({trail: this._cachedTrail, snow: this._cachedSnow});

            } else {

              this._loaderService.hideOverlay();
              this._router.navigate(['/error']);
              return;
            }
          })
        );
      }
  }
}
