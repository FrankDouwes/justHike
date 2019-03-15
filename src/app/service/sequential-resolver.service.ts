import { Injectable } from '@angular/core';
import {VersionResolverService} from './version-resolver.service';
import {TrailResolverService} from './trail-resolver.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FilesystemService} from './filesystem.service';
import {environment} from '../../environments/environment.prod';
import {LocalStorageService} from 'ngx-webstorage';
import {getMajorPoiTypes} from '../_util/poi';
import {setConnection, setCordova, setDialogs, setScreen, setZip} from '../_util/cordova';

// cordova plugins
declare let cordova: any;
declare let screen: any;
declare let download: any;
declare let Connection: any;
declare let zip: any;

@Injectable({
  providedIn: 'root'
})
export class SequentialResolverService implements Resolve<any> {

  private _route: ActivatedRouteSnapshot;
  private _state: RouterStateSnapshot;

  constructor(
    private _versionResolver: VersionResolverService,
    private _trailResolver: TrailResolverService,
    private _fileSystemService: FilesystemService,
    private _localStorage: LocalStorageService,
  ) {}

  // first setup the filesystem
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<object> {

    const _self = this;
    this._route = route;
    this._state = state;

    this._firstRun();

    //cordova enabled or not
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {

      return new Promise(function(resolve, reject) {
        document.addEventListener('deviceready', function(event) {
          resolve(_self._sequencer(event));
        });
      });

    } else {

      return this._sequencer();
    }
  }


  // set default user settings (unless they already exist)
  // good place to force user settings during development/debugging
  private _firstRun() {

    const _self = this;

    // always clear simulatedMile
    this._localStorage.store('simulatedMile', -1);

    const _firstRun = this._localStorage.retrieve('firstRun');

    if (_firstRun !== false) {

      this._localStorage.store('firstRun', true);

      // by default show all major pois
      const _majorPoiTypes: Array<string> = getMajorPoiTypes();

      // dynamic subscriptions based on PoiTypes that are set as being major (important)
      _majorPoiTypes.forEach(function(type: string) {
        const _camelName =  'show' +  type.charAt(0).toUpperCase() + type.slice(1);
        _self._localStorage.store(_camelName, true);
      });

      // set default user settings
      for (const key in environment.DEFAULT_USER_SETTINGS) {

        const _value = environment.DEFAULT_USER_SETTINGS[key];

        if (this._localStorage.retrieve(key) === null) {
          this._localStorage.store(key, _value);
        }
      }
    }
  }

  // app needs version data before it can start resolving trail data, so we await, before returning a promise to the router
  private _sequencer(event?: Event): Promise<any> {

    if (event) {
      console.log('device');

      // setup cordova helpers
      if (cordova) {
        setCordova(cordova);
        setScreen(screen);
        setConnection(Connection);
        setZip(zip);
        setDialogs(navigator['notification']);
      }
    } else {
      console.log('browser');
    }

    const _self = this;

    return this._fileSystemService.initializeStorage().then(async function(result) {
      await _self._versionResolver.resolve().toPromise();
      return _self._trailResolver.resolve(_self._route, _self._state).toPromise();
    });
  }
}
