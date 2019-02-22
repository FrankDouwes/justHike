import { Component, ElementRef, Injector, isDevMode, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from './component/dialog/settings-dialog/settings-dialog.component';
import { MarkerDialogComponent } from './component/dialog/marker-dialog/marker-dialog.component';
import { LocationService } from './service/location.service';
import { OfftrailDialogComponent } from './component/dialog/offtrail-dialog/offtrail-dialog.component';
import { DownloadService } from './service/download.service';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../environments/environment.prod';
import { Subscription } from 'rxjs';
import { Trail } from './type/trail';
import { getTrailDataById } from './_util/trail';

declare let downloader;

// capacitor
import { Plugins } from '@capacitor/core';
import {FilesystemService} from './service/filesystem.service';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('loader', { read: ViewContainerRef }) loader: ViewContainerRef;

  public showLoader      = true;    // show loader/spinner by default
  public navIsVisible    = true;    // nav visibility

  public uri: string;
  public uri2: string;

  private _downloadSubscription: Subscription;
  private _currentTrail: Trail;

  private _offtrailDialog: any;

  constructor(
    private _dialog: MatDialog,
    private _loaderService: LoaderService,
    private _element: ElementRef,
    private _injector: Injector,
    private _localStorage: LocalStorageService,
    private _downloadService: DownloadService,
    private _fileSystemService: FilesystemService
  ) {
    // makes constructor props accessible through LocationService, needed for inheritance
    LocationService.injector = this._injector;
  }

  ngOnInit(): void {

    // check user agent
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      console.log('running on mobile device:', navigator.userAgent);
      document.addEventListener('deviceready', function() {
        _self._onReady();
      });
    } else {
      console.log('running in browser');
      this._onReady();
    }

    // reload on storage timestamp change (user settings changed that require a reload)
    this._localStorage.observe('timestamp').subscribe((value) => {
      window.location.reload();
    });

    // get active trail (default = 0)
    this._currentTrail = getTrailDataById(this._localStorage.retrieve('activeTrailId'));
    const _self = this;

    // check app version
    this._versionCheck();

    // loader (spinner)
    this._loaderService.observe.subscribe((obj: object) => {
      this.showLoader = (obj['type'] === 'self') ? (obj['action'] === 'show') : this.showLoader;
      SplashScreen.hide();
    });

    // show settings on first load
    const _firstRun = this._localStorage.retrieve('firstRun');
    if (_firstRun) {
      this._localStorage.store('firstRun', false);
      const timeOut = setTimeout(() => {
        _self._openSettingsDialog();
      }, 250);
    }

    this._element.nativeElement.addEventListener('markerClick', this._onCustomEvent.bind(this), false);
    this._element.nativeElement.addEventListener('offtrail', this._onCustomEvent.bind(this), false);
  }

  ngOnDestroy(): void {
    this._downloadSubscription.unsubscribe();
    this._element.nativeElement.removeEventListener('markerClick', this._onCustomEvent.bind(this));
    this._element.nativeElement.removeEventListener('offtrail', this._onCustomEvent.bind(this), false);
  }

  // STARTUP

  private _onReady(): void {

    // activate filesystem
    this._fileSystemService.initializeStorage();

    // reload on storage timestamp change (user settings changed that require a reload)
    this._localStorage.observe('timestamp').subscribe((value) => {
      window.location.reload();
    });
  }

  // compare data version to online data version
  private _versionCheck(): void {

    // only check once every 24 hours
    const _lastCheck = this._localStorage.retrieve('lastVersionCheck');
    if (_lastCheck && _lastCheck + environment.updateCheckInterval > new Date().getTime()) {
      return;
    }

    // download version file for current trail
    const _versionDownloader = this._downloadService.createDownloader('versionChecker');

    this._downloadSubscription = _versionDownloader.meta.subscribe( status => {

      // if download complete
      if (status['label'] && status['label'] === 'downloaded') {

        // check snow data (auto update, depending on settings) todo
        if (this._currentTrail.snowVersion !== status['snowVersion']) {
          this._updateSnowData();
        }

        // check tile data (manual update) todo
        if (environment.version === _versionDownloader.downloadedFile['tileVersion']) {
          console.log('versions matched');
        } else {
          console.log('version mismatch, toggle warning');
        }
      }

    });

    _versionDownloader.downloadFile(environment.appDomain + 'files/' + this._currentTrail.abbr + '/version.json', false);
  }

  // update the snow data (using auto update setting)
  private _updateSnowData(): void {

    const _url = environment.appDomain + environment.fileBaseUrl + this._currentTrail.abbr + '/snow.json';
    const _snowDownloader = this._downloadService.createDownloader(this._currentTrail.abbr + '_snow');

    this._downloadSubscription.unsubscribe();
    this._downloadSubscription = _snowDownloader.meta.subscribe( status => {
      console.log(status);
    });
  }



  // EVENT HANDLERS

  // angular event handler for navEvents (public for aot)
  public onNavEvent(event: string): void {

    if (event === 'settings') {
      this._openSettingsDialog();
    }
  }
  // on marker click (using standard events as angular events don't bubble
  private _onCustomEvent(event: Event): void {

    // destination reached
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (event.type === 'offtrail') {
      this._openOfftrailDialog(event);
    } else {
      this._openMarkerDialog(event);
    }
  }



  // DIALOGS

  // marker dialog
  private _openMarkerDialog(event): void {

    // get marker poi data
    if (this.navIsVisible) {
      this._toggleNavigationVisibility();
    }

    const _markerDialog = this._dialog.open(MarkerDialogComponent, {
      autoFocus: false,
      width: '85%',
      height: '75%',
      data: event.detail
    });

    _markerDialog.afterClosed().subscribe(result => {
      this._toggleNavigationVisibility();
    });
  }

  // settings dialog
  private _openSettingsDialog(): void {

    if (this.navIsVisible) {
      this._toggleNavigationVisibility();
    }
    const _settingsDialog = this._dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '85%',
      height: '75%',
      data: {icon: 'cog'}
    });

    _settingsDialog.afterClosed().subscribe(result => {
      this._toggleNavigationVisibility();
      if (result) {
        this._loaderService.showOverlay();
        this._localStorage.store('timestamp', new Date().getTime());
      }
    });
  }

  // off trail dialog (mile simulator)
  private _openOfftrailDialog(event): void {
    if (this.navIsVisible) {
      this._toggleNavigationVisibility();
    }

    if (this._offtrailDialog) {
      return;
    }

    this._offtrailDialog = this._dialog.open(OfftrailDialogComponent, {
      autoFocus: false,
      width: '65%',
      height: '45%',
      data: event.detail
    });

    this._offtrailDialog.afterClosed().subscribe(result => {

      this._toggleNavigationVisibility();

      if (result) {
        this._localStorage.store('simulatedMile', Number(result.simulatedMile))
      }

      const _simulate = !!(result);
      this._injector.get(LocationService).toggleTracking(_simulate);

      this._offtrailDialog = null;
    });
  }

  private _toggleNavigationVisibility(): void {
    this.navIsVisible = !this.navIsVisible;
  }
}

