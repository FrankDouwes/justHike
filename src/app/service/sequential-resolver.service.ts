import { Injectable } from '@angular/core';
import {VersionResolverService} from './version-resolver.service';
import {TrailResolverService} from './trail-resolver.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SequentialResolverService implements Resolve<any> {

  constructor(
    private _versionResolver: VersionResolverService,
    private _trailResolver: TrailResolverService
  ) {}

  // app needs version data before it can start resolving trail data, so we await, before returning a promise to the router
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<object> {
    await this._versionResolver.resolve().toPromise();
    return this._trailResolver.resolve(route, state).toPromise();
  }
}
