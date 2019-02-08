import {Component, ElementRef, Injector, isDevMode, OnInit} from '@angular/core';
import {LoaderService} from './service/loader.service';
import {MatDialog} from '@angular/material';
import {SettingsDialogComponent} from './component/dialog/settings-dialog/settings-dialog.component';
import {MarkerDialogComponent} from './component/dialog/marker-dialog/marker-dialog.component';
import {LocationService} from './service/location.service';
import {OfftrailDialogComponent} from './component/dialog/offtrail-dialog/offtrail-dialog.component';
import {DownloadService} from './service/download.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public showLoader      = true;    // show loader/spinner by default

  // navbar
  public navIsVisible      = true;  // nav visibility

  constructor(
    private _dialog: MatDialog,
    private _loaderService: LoaderService,
    private _element: ElementRef,
    private _injector: Injector,
    private _localStorage: LocalStorageService,
    private _downloadService: DownloadService
  ) {

    // makes constructor props accessible through LocationService, needed for inheritance
    LocationService.injector = this._injector;
  }

  ngOnInit(): void {
    const _self = this;

    // storage (user settings)
    this._localStorage.observe('timestamp').subscribe((value) => {
      window.location.reload();
      // this._router.navigate(['/']);
    });

    // loader (spinner)
    this._loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    // show settings on first load
    const _firstRun = this._localStorage.retrieve('firstRun');
    if (_firstRun) {
      this._localStorage.store('firstRun', false);
      const timeOut = setTimeout(() => {
        _self.openSettingsDialog();
      }, 250);
    }
  }

  // EVENT HANDLERS

  // angular event handler for navEvents
  private onNavEvent(event: string): void {

    if (event === 'settings') {
      this.openSettingsDialog();
    }
  }
  // on marker click (using standard events as angular events don't bubble
  private onCustomEvent(event: Event): void {

    // destination reached
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (event.type === 'offtrail') {
      this.openOfftrailDialog(event);
    } else {
      this.openMarkerDialog(event);
    }
  }



  // DIALOGS

  private openMarkerDialog(event): void {

    // get marker poi data
    if (this.navIsVisible) {
      this.toggleNavigationVisibility();
    }

    const _markerDialog = this._dialog.open(MarkerDialogComponent, {
      autoFocus: false,
      width: '85%',
      height: '75%',
      data: event.detail
    });

    _markerDialog.afterClosed().subscribe(result => {
      this.toggleNavigationVisibility();
    });
  }

  private openSettingsDialog(): void {

    if (this.navIsVisible) {
      this.toggleNavigationVisibility();
    }
    const _settingsDialog = this._dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '85%',
      height: '75%',
      data: {icon: 'cog'}
    });

    _settingsDialog.afterClosed().subscribe(result => {
      this.toggleNavigationVisibility();
      if (result) {
        this._loaderService.display(true);
        this._localStorage.store('timestamp', new Date().getTime());
      }
    });
  }

  private openOfftrailDialog(event): void {
    if (this.navIsVisible) {
      this.toggleNavigationVisibility();
    }
    const _offtrailDialog = this._dialog.open(OfftrailDialogComponent, {
      autoFocus: false,
      width: '65%',
      height: '45%',
      data: event.detail
    });

    _offtrailDialog.afterClosed().subscribe(result => {

      this.toggleNavigationVisibility();

      if (result) {
        this._localStorage.store('simulatedMile', Number(result.simulatedMile))
      }

      const _simulate = (result) ? true : false;
      this._injector.get(LocationService).toggleTracking(_simulate);
    });
  }

  private toggleNavigationVisibility(): void {
    this.navIsVisible = !this.navIsVisible;
  }
}

