import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TrailService }  from './trail.service';
import { LoaderService } from './loader.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Trail } from '../type/trail';
import { environment } from '../../environments/environment.prod';
import { Waypoint } from '../type/waypoint';
import { TrailGeneratorService } from './trail-generator.service';
import { SnowGeneratorService } from './snow-generator.service';
import { Snow } from '../type/snow';
import { reverseSnow } from '../_util/snow';

@Injectable({
  providedIn: 'root'
})
export class TrailResolverService implements Resolve<any> {

  private _cachedTrail: Trail;
  private _cachedSnow: Snow;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailService: TrailService,
    private _router: Router,
    private _loaderService: LoaderService,

    private _trailGenerator: TrailGeneratorService,
    private _snowGenerator: SnowGeneratorService
  ) {}

  // makes sure trail data is available before navigating anywhere
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> | Observable<never> {

    const _activeTrailId: number = this._localStorage.retrieve('activeTrailId') | 0;
    const _direction: number = this._localStorage.retrieve('direction') | 0;

    // Dev mode, generate new trail data (slow)
    if (environment.useRawData) {

      return this._trailService.getRawTrailData(_activeTrailId).pipe(
        take(1),
        switchMap(data => {

          this._loaderService.hideOverlay();

          if (data) {

            // return parsed trail
            return of(this._trailService.parseTrailData(data[0], data[1], data[2], data[3], _direction));

          } else {
            this._router.navigate(['/error']);
            return;
          }
        })
      );
    }

    // User mode, get pre-parsed data (fast)
    else {

      if (this._cachedTrail && this._cachedTrail.id === _activeTrailId && this._cachedTrail.direction === _direction) {

        return of({trail: this._cachedTrail, snow: this._cachedSnow});

      } else {

        return this._trailService.getPreParsedTrailData(_activeTrailId, _direction).pipe(
          take(1),
          switchMap(data => {

            if (data) {

              // cache trail
              this._cachedTrail = data[0] as Trail;
              this._trailGenerator.trailData = this._cachedTrail;

              // parse snow data individually (as it's a seperate update/download)
              this._cachedSnow = data[1];
              this._snowGenerator.setSnowData(this._cachedSnow);

              // reverse if needed
              if (_direction === 1) {
                this._cachedSnow = reverseSnow(this._cachedSnow, this._cachedTrail.miles.length);
              }

              // generate a mileTree (for GPS location)
              const flatMileCoordinates: Array<Waypoint> = data[0].miles.map(function (elem) {
                  return elem.centerpoint as Waypoint;
                }
              );

              this._trailGenerator.createMileTree(flatMileCoordinates);
              this._loaderService.showMessage('created mile tree');
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
}
