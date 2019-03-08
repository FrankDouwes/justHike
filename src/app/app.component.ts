import {AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { LoaderService } from './service/loader.service';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from './component/dialog/settings-dialog/settings-dialog.component';
import { MarkerDialogComponent } from './component/dialog/marker-dialog/marker-dialog.component';
import { LocationService } from './service/location.service';
import { OfftrailDialogComponent } from './component/dialog/offtrail-dialog/offtrail-dialog.component';
import { LocalStorageService } from 'ngx-webstorage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// capacitor
import { Plugins } from '@capacitor/core';
import {FilesystemService} from './service/filesystem.service';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('loader', { read: ViewContainerRef }) loader: ViewContainerRef;

  public initialized: boolean;
  public showLoader      = true;    // show loader/spinner by default
  public navIsVisible    = true;    // nav visibility

  public uri: string;
  public uri2: string;

  private _offtrailDialog: any;

  constructor(
    private _fileSystemService: FilesystemService,
    private _dialog: MatDialog,
    private _loaderService: LoaderService,
    private _element: ElementRef,
    private _injector: Injector,
    private _localStorage: LocalStorageService,
    private _screenOrientation: ScreenOrientation
  ) {
    // makes constructor props accessible through LocationService, needed for inheritance
    LocationService.injector = this._injector;
  }

  ngOnInit(): void {

    const _self = this;

    // check user agent
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      console.log('running on mobile device:', navigator.userAgent);
      document.addEventListener('deviceready', function() {
        _self._screenOrientation.lock(_self._screenOrientation.ORIENTATIONS.LANDSCAPE);
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

    // loader (spinner)
    this._loaderService.observe.subscribe((obj: object) => {
      this.showLoader = (obj['type'] === 'self') ? (obj['action'] === 'show') : this.showLoader;
      if (obj['action'] === 'hide') {
        this.initialized = true;
      }
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

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // this._downloadSubscription.unsubscribe();
    this._element.nativeElement.removeEventListener('markerClick', this._onCustomEvent.bind(this));
    this._element.nativeElement.removeEventListener('offtrail', this._onCustomEvent.bind(this), false);
  }

  // STARTUP

  private _onReady(): void {

    SplashScreen.hide();

    // activate filesystem TODO (for future file downoader)
    // this._fileSystemService.initializeStorage();

    // reload on storage timestamp change (user settings changed that require a reload)
    this._localStorage.observe('timestamp').subscribe((value) => {
      window.location.reload();
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
      panelClass: 'offtrail-dialog',
      autoFocus: false,
      width: '50%',
      height: '75%%',
      data: event.detail
    });

    this._offtrailDialog.afterClosed().subscribe(result => {

      this._toggleNavigationVisibility();

      if (result) {
        this._localStorage.store('simulatedMile', Number(result.simulatedMile));
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

