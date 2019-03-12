import {Injectable} from '@angular/core';
import {ActivatedRoute, Resolve, Router} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment.prod';
import {getTrailMetaDataById, setTrailMetaData} from '../_util/trail';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {share, switchMap, take} from 'rxjs/operators';
import {Trail} from '../type/trail';
import {Snow} from '../type/snow';
import {TrailGeneratorService} from './trail-generator.service';
import {SnowGeneratorService} from './snow-generator.service';
import {ConnectionService} from './connection.service';
import {hasConnection} from '../_util/cordova';
import {DownloadService} from './download.service';
import {Downloader, DownloaderStatus} from '../_util/downloader';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VersionResolverService implements Resolve<any> {

  private _updateTimer;

  private _route: ActivatedRoute;
  private _trailData: Trail;
  private _snowData: Snow;

  private _internalDownloader: Downloader;     // downloads file from assets
  private _externalDownloader: Downloader;     // downloads online file

  private _update: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _trail: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _snow: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _tile: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public updateAvailableObservable: Observable<boolean>;
  public trailUpdateAvailable: Observable<boolean>;
  public snowUpdateAvailable: Observable<boolean>;
  public tileUpdateAvailable: Observable<boolean>;

  constructor(
    private _router: Router,
    private _localStorage: LocalStorageService,
    private _snowGeneratorService: SnowGeneratorService,
    private _trailGeneratorService: TrailGeneratorService,
    private _connectionService: ConnectionService,
    private _downloadService: DownloadService
  ) {
    this.updateAvailableObservable      = this._update.asObservable().pipe(share());
    this.trailUpdateAvailable           = this._trail.asObservable().pipe(share());
    this.snowUpdateAvailable            = this._snow.asObservable().pipe(share());
    this.tileUpdateAvailable            = this._tile.asObservable().pipe(share());

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
                  return input.body;      // return just the datas
                } else {
                  return null;            // failed http request
                }
              } else {
                return input;             // not an http response
              }
            }

            const _internal = _parseHttpResponce(data[0]);
            const _external = _parseHttpResponce(data[1]);

            // if we have newly downloaded data
            if (_external) {

              console.log('using external' + _external);

              this._localStorage.store('lastVersionCheck', new Date().getTime());
              this._localStorage.store('versionData', _external);
              setTrailMetaData(_external);
            } else {

              console.log('using internal' + _internal);

              if (!this._localStorage.retrieve('versionData')) {
                this._localStorage.store('versionData', _internal);
              }
              setTrailMetaData(_internal);
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
  this function is also executed from app.component
   */
  public collectVersionData(): Observable<object> {

    let _hasInternetConnection = true;

    if (hasConnection()) {
      _hasInternetConnection = (this._connectionService.getStatus() === 'online');
    }

    // INTERNAL
    // if there is no stored data available (first run) get data from assets
    const _storageVersion = this._localStorage.retrieve('versionData');
    let _internal: Observable<any>;

    if (_storageVersion) {
      _internal = of(_storageVersion);
    } else {
      _internal = this._internalDownloader.downloadFile('assets/data/version.json', false);
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
   * show version mismatch warning (update data dialog) on mismatch
   * trigger auto snow data download if user setting is enabled. */
  public versionCheck(): void {

    const _self = this;

    this.resolve().subscribe(function (result) {

      const _activeTrailId = _self._localStorage.retrieve('activeTrailId');
      const _currentTrailMeta = getTrailMetaDataById(_activeTrailId);
      const _tilesVersion = _self._localStorage.retrieve('tilesVersion');

      const _snowVersion = _self._snowGeneratorService.getSnowVersion();
      const _trailVersion = _self._trailGeneratorService.getTrailVersion();

      console.log('comparing versions', _trailVersion, _snowVersion);

      console.log(_snowVersion, _currentTrailMeta.snowVersion);
      console.log(_tilesVersion, _currentTrailMeta.tilesVersion);
      console.log(_trailVersion, _currentTrailMeta.trailVersion);

      if (_snowVersion !== _currentTrailMeta.snowVersion) {

        _self._update.next(true);
        _self._snow.next(true);
      }

      if (_tilesVersion !== _currentTrailMeta.tilesVersion) {

        if (!_tilesVersion) {
          console.log('no tiles downloaded');
        }

        _self._update.next(true);
        _self._tile.next(true);
      }

      if (_trailVersion !== _currentTrailMeta.trailVersion) {

        _self._update.next(true);
        _self._trail.next(true);
      }
    });
  }
}
