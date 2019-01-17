import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Settings } from '../settings';
import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TrailService }  from './trail.service';
import {LoaderService} from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class TrailResolverService implements Resolve<any> {

  constructor(
    private _trailService: TrailService,
    private _router: Router,
    private _loaderService: LoaderService
  ) {}

  // make sure trail data is available before navigating anywhere
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> | Observable<never> {

    return this._trailService.getTrailData(Settings.TRAILS[0].dataPath).pipe(

      take(1),

      switchMap( data => {

        // hide spinner
        this._loaderService.display(false);

        if (data) {

          // return parsed trail
          return of(this._trailService.parseTrailData(Settings.TRAILS[0], data[0], data[1], data[2]));

        } else {

          this._router.navigate(['/error']);
          return EMPTY;
        }
      })
    );
  }
}
