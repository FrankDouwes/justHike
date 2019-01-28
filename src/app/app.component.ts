import {Component, ElementRef, Injector} from '@angular/core';
import {LoaderService} from './service/loader.service';
import {MatDialog} from '@angular/material';
import {SettingsDialogComponent} from './component/dialog/settings-dialog/settings-dialog.component';
import {MarkerDialogComponent} from './component/dialog/marker-dialog/marker-dialog.component';
import {LocationService} from './service/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public showLoader:      boolean      = true;      // show loader/spinner by default

  // navbar
  public navIsVisible:    boolean      = false;     // nav visibility

  constructor(
    private _dialog: MatDialog,
    private _loaderService: LoaderService,
    private _element: ElementRef,
    private _injector: Injector
  ) {

    // makes locationService globally accessible, needed for inheritance
    LocationService.injector = this._injector;

    _element.nativeElement.addEventListener('markerClick', this.onMarkerClick.bind(this), false);
  }

  ngOnInit() {

    this._loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    // show settings on first load
    let _self = this;
    let timeOut = setTimeout( () => {
      _self.openSettingsDialog();
    }, 250 );
  }




  // EVENT HANDLERS

  // angular event handler for navEvents
  onNavEvent(event: string) {

    if (event === 'settings') {
      this.openSettingsDialog();
    }
  }
  // on marker click (using standard events as angular events don't bubble
  onMarkerClick(event: Event) {

    // destination reached
    event.stopImmediatePropagation();
    event.stopPropagation();

    this.openMarkerDialog(event);
  }




  // DIALOGS

  openMarkerDialog(event) {

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

  openSettingsDialog() {

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
      // console.log('The settings-dialog was closed');
      // this.animal = result;
    });
  }

  toggleNavigationVisibility() {
    this.navIsVisible = !this.navIsVisible;
  }
}

