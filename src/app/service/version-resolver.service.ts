import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment.prod';
import {getTrailMetaDataById, setTrailMetaData} from '../_util/trail';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {share, switchMap, take} from 'rxjs/operators';
import {TrailGeneratorService} from './trail-generator.service';
import {SnowGeneratorService} from './snow-generator.service';
import {ConnectionService} from './connection.service';
import {hasConnection} from '../_util/cordova';
import {DownloadService} from './download.service';
import {Downloader} from '../_util/downloader';
import {HttpResponse} from '@angular/common/http';
import {TrailMeta} from '../type/trail';

@Injectable({
  providedIn: 'root'
})

export class VersionResolverService implements Resolve<any> {

  private _internalDownloader: Downloader;     // downloads file from assets
  private _externalDownloader: Downloader;     // downloads online file

  public observables: any = {};       // object containing all observables
  private _subjects: any = {};        // object containing all behaviorSubjects

  // TODO: incorporate town list (will be a seperate file)
  private _dataTypes: Array<string> = ['trail', 'snow', 'tiles'];

  constructor(
    private _router:                  Router,
    private _localStorage:            LocalStorageService,
    private _snowGeneratorService:    SnowGeneratorService,
    private _trailGeneratorService:   TrailGeneratorService,
    private _connectionService:       ConnectionService,
    private _downloadService:         DownloadService
  ) {

    // create the update available observer
    const _sub = this._subjects['updateAvailable'] = new BehaviorSubject(false);
    this.observables['updateAvailable'] = _sub.asObservable().pipe(share());

    this._internalDownloader = this._downloadService.createDownloader('DATA_version_internal');
    this._externalDownloader = this._downloadService.createDownloader('DATA_version_external');
  }

  resolve(): Observable<string> | Observable<never> {

    return this.collectVersionData().pipe(

      take(1),
      switchMap(data => {

          if (data) {

            const _parseHttpResponce = function(input): any {
              if (input && input instanceof HttpResponse) {
                if (input.status === 200) {
                  return input.body;      // return just the data
                } else {
                  return null;            // failed http request
                }
              } else {
                return input;             // not an http response
              }
            };

            const _self = this;
            const _internal = _parseHttpResponce(data[0]);
            const _external = _parseHttpResponce(data[1]);

            /* check if this is the first run
            if so, write all the internal version to local storage, so we can later check against those versions) */
            for (const key in _internal) {

              const _trail: TrailMeta = _internal[key];

              this._dataTypes.forEach(function(type) {

                const _storedKeyName: string = _trail.abbr + '_' + type + 'Version';

                if (type !== 'tiles' && !_self._localStorage.retrieve(_storedKeyName)) {

                  // if the trail has data of type (not all trails have snow data)
                  if (_trail[type + 'Version']) {
                    _self._localStorage.store(_storedKeyName, _trail[type + 'Version']);
                  }
                }
              });
            }

            // if we have newly downloaded data
            if (_external) {

              this._localStorage.store('lastVersionCheck', new Date().getTime());
              this._localStorage.store('availableUpdates', _external);
              setTrailMetaData(_external);

            } else {

              /* we're using internal data, so the last version data is what we saved to local storage
              the last time internet was available, if nothing was ever downloaded use internal data */
              const _updateData: any = this._localStorage.retrieve('availableUpdates');
              if (_updateData) {
                setTrailMetaData(_updateData);
              } else {
                setTrailMetaData(_internal);
              }
            }
            return of('success');
          } else {
            this._router.navigate(['/error']);
            return of('error');
          }
        }
      )
    );
  }

  /* collect version data, from assets/local storage and external,
  this function is also executed from app.component */
  public collectVersionData(): Observable<object> {

    let _hasInternetConnection = true;

    if (hasConnection()) {
      _hasInternetConnection = (this._connectionService.getStatus() === 'online');
    }

    // INTERNAL
    // if there is no stored data available (first run) get data from assets
    const _storageVersion = this._localStorage.retrieve('availableUpdates');
    let _internal: Observable<any>;

    if (_storageVersion) {
      _internal = of(_storageVersion);
    } else {
      _internal = this._internalDownloader.downloadFile('assets/files/version.json', false);
    }


    // EXTERNAL
    // only update once every 24 hours to save bandwidth
    let _lastChecked = this._localStorage.retrieve('lastVersionCheck');

    let _external: Observable<any>;

    if (!_lastChecked) {
      _lastChecked = 0;
    }

    if (_lastChecked + environment.updateCheckInterval < new Date().getTime() && _hasInternetConnection) {
      _external = this._externalDownloader.downloadFile(      environment.appDomain + environment.fileBaseUrl + 'version.json'
        , false);
    } else {
      _external = of(null);
    }

    return forkJoin([_internal, _external]);
  }




  /* separately called: if internet were to become available and the app hasn't checked for updates in 24 hours, check.
   * check if the version of currently loaded trail data === the latest available trail data
   * show version mismatch (download available indicator)
   * TODO: trigger auto snow data download if user setting is enabled. */
  public versionCheck(currentTrailOnly: boolean = false): void {

    const _self = this;

    this.resolve().subscribe(function (result) {

      _self._subjects['updateAvailable'].next(false);

      const _activeTrailId = _self._localStorage.retrieve('activeTrailId') | 0;

      let _trails = _self._localStorage.retrieve('availableUpdates');

      if (currentTrailOnly) {
        _trails = { activeTrail: getTrailMetaDataById(_activeTrailId) };
      }

      // for each trail
      for (const key in _trails) {

        const _trailMeta: TrailMeta = _trails[key];

        // compare versions for each data type
        _self._dataTypes.forEach(function(type: string) {

          if (!_self.observables[_trailMeta.abbr + '_' + type + 'Available']) {

            // dynamically create behavior subjects / observables for each type
            const _sub = _self._subjects[_trailMeta.abbr + '_' + type] = new BehaviorSubject(false);
            _self.observables[_trailMeta.abbr + '_' + type + 'Available'] = _sub.asObservable().pipe(share());

            // subscribe to localstorage
            _self._localStorage.observe(_trailMeta.abbr + '_' + type + 'Version').subscribe(function () {
              _self.versionCheck(true);  // as soon as the local storage version changes we re-resolve
            });
          }

          // the actual comparison
          const _storedVersion = _self._localStorage.retrieve(_trailMeta.abbr + '_' + type + 'Version');

          if (_storedVersion !== _trailMeta[type + 'Version']) {

            _self._subjects[_trailMeta.abbr + '_' + type].next(true);

            if (_activeTrailId === _trailMeta.id) {
              // set the general update available flag
              _self._subjects['updateAvailable'].next(true);
            }
          } else {
            _self._subjects[_trailMeta.abbr + '_' + type].next(false);
          }
        });
      }
    });
  }
}
