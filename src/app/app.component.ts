import {Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LoaderService} from './service/loader.service';
import {MatDialog} from '@angular/material';
import {SettingsDialogComponent} from './component/dialog/settings-dialog/settings-dialog.component';
import {MarkerDialogComponent} from './component/dialog/marker-dialog/marker-dialog.component';
import {LocationService} from './service/location.service';
import {OfftrailDialogComponent} from './component/dialog/offtrail-dialog/offtrail-dialog.component';
import {LocalStorageService} from 'ngx-webstorage';
import {FilesystemService} from './service/filesystem.service';
import {ActivatedRoute} from '@angular/router';
import {ConnectionService} from './service/connection.service';
import {BaseComponent} from './base/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('loader', { read: ViewContainerRef }) loader: ViewContainerRef;

  public initialized: boolean;
  public showLoader      = true;    // show loader/spinner by default
  public navIsVisible    = true;    // nav visibility

  private _offtrailDialog: any;
  private _markerDialog: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _fileSystemService: FilesystemService,
    private _dialog: MatDialog,
    private _loaderService: LoaderService,
    private _element: ElementRef,
    private _injector: Injector,
    private _localStorage: LocalStorageService,
    private _connectionService: ConnectionService) {

    super();

    // makes constructor props accessible through LocationService, needed for inheritance
    LocationService.injector = this._injector;
  }

  ngOnInit(): void {

    const _self = this;

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

      console.log('running on mobile device:', navigator.userAgent);

      this.addEventListener(document, 'deviceready', function() {
        _self._onReady();
        _self.removeEventListener(document, 'deviceready');
      });

    } else {

      console.log('debugging in browser');
      this._onReady();
    }

    // loader (spinner)
    this.addSubscription('loaderService', this._loaderService.observe.subscribe((obj: object) => {
      this.showLoader = (obj['type'] === 'self') ? (obj['action'] === 'show') : this.showLoader;
      if (obj['action'] === 'hide') {
        this.initialized = true;
      }
    }));

    // show settings on first load
    const _firstRun = this._localStorage.retrieve('firstRun');
    if (_firstRun) {
      this._localStorage.store('firstRun', false);
      const timeOut = setTimeout(() => {
        _self._openSettingsDialog();
      }, 250);
    }

    this._connectionService.startTracking();
    this.addEventListener(this._element.nativeElement, ['markerClick', 'offtrail'] , this._onDialogEvent.bind(this), false);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._connectionService.stopTracking();
  }

  // STARTUP

  private _onReady(): void {
    // reload on storage timestamp change (user settings changed that require a reload)
    this.addSubscription('reload', this._localStorage.observe('timestamp').subscribe((value) => {
      window.location.reload();
    }));
  }



  // EVENT HANDLERS

  // angular event handler for navEvents (public for aot)
  public onNavEvent(event: string): void {

    if (event === 'settings') {
      this._openSettingsDialog();
    }
  }

  // on marker click (using standard events as angular events don't bubble)
  private _onDialogEvent(event: Event): void {

    // destination reached
    event.stopImmediatePropagation();
    event.stopPropagation();

    this._forceHideNavigation();

    if (event.type === 'offtrail') {
      this._openOfftrailDialog(event);
    } else {
      this._openMarkerDialog(event);
    }
  }



  // DIALOGS
  
  // marker dialog
  private _openMarkerDialog(event): void {

    this._markerDialog = this._dialog.open(MarkerDialogComponent, {
      autoFocus: false, width: '85%', height: '75%', data: event.detail
    });

    this._onDialogClose(this._markerDialog, 'markerClosed');
  }

  // settings dialog
  private _openSettingsDialog(): void {

    this._forceHideNavigation();

    const _settingsDialog = this._dialog.open(SettingsDialogComponent, {
      autoFocus: false, width: '85%', height: '75%', data: {icon: 'cog'}
    });

    this._onDialogClose(_settingsDialog, 'settingsClosed', result => {
      if (result) {
        this._loaderService.showOverlay();
        this._localStorage.store('timestamp', new Date().getTime());
      }
    });
  }

  // off trail dialog (mile simulator)
  private _openOfftrailDialog(event): void {

    this._offtrailDialog = this._dialog.open(OfftrailDialogComponent, {
      panelClass: 'offtrail-dialog', autoFocus: false, width: '50%', height: '75%%', data: event.detail
    });

    this._onDialogClose(this._offtrailDialog, 'offtrailClosed', result => {

      if (result) {
        this._localStorage.store('simulatedMile', Number(result.simulatedMile));
      }

      const _simulate = !!(result);
      this._injector.get(LocationService).toggleTracking(_simulate);

    });
  }

  private _onDialogClose(dialog: any, name: string, callback?: Function): void {

    this.addSubscription(name, dialog.afterClosed().subscribe(result => {
      this._toggleNavigationVisibility(true);

      if (callback) {
        callback(result);
      }

      this.removeSubscription(name);
      dialog = null;
    }));
  }

  private _forceHideNavigation(): void {
    if (this.navIsVisible) {
      this._toggleNavigationVisibility(false);
    }
  }

  private _toggleNavigationVisibility(visible: boolean): void {
    this.navIsVisible = visible;
  }
}

