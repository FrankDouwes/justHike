import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {isDevMode, NgModule, OnInit} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment.prod';
import { AppComponent } from './app.component';
import { AngularFittextModule } from 'angular-fittext';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow,
  faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faExclamationTriangle, faMapMarkedAlt,
  faHiking, faAngleRight, faPlus, faCar, faTrain, faDoorOpen,
  faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faFlag, faStar, faQuestionCircle
  , faSnowflake, faAtlas, faMountain, faSpinner, faTrash
  } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faDotCircle, faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


// ionic capacitor
// import '@ionic/pwa-elements';
import { File } from '@ionic-native/file/ngx';

// display component
import { ButtonComponent } from './display/button/button.component';

// component
import { LocationBasedComponent } from './display/location-based/location-based.component';
import { ListItemComponent } from './component/elevation-profile/virtual-list/list-item/list-item.component';
import { ElevationProfileComponent } from './component/elevation-profile/elevation-profile.component';
import { MileDetailComponent } from './component/mile-detail/mile-detail.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { VirtualListComponent } from './component/elevation-profile/virtual-list/virtual-list.component';
import { ScrollbarComponent } from './component/elevation-profile/scrollbar/scrollbar.component';
import { LabelsComponent } from './component/elevation-profile/virtual-list/labels/labels.component';
import { GuidesComponent } from './component/elevation-profile/virtual-list/guides/guides.component';
import { LocatorComponent} from './component/navigation/locator/locator.component';
import { PoiListComponent } from './component/poi-list/poi-list.component';
import { PoiListItemComponent } from './component/poi-list/poi-list-item/poi-list-item.component';
import { PoiUserItemComponent } from './component/poi-list/poi-user-item/poi-user-item.component';
import { LeafletMapComponent } from './component/leaflet-map/leaflet-map.component';
import { DynamicItemComponent } from './component/poi-list/dynamic-item/dynamic-item.component';
import { OfftrailDialogComponent } from './component/dialog/offtrail-dialog/offtrail-dialog.component';
import { ElevationSettingsComponent } from './component/dialog/settings-dialog/panels/elevation-settings/elevation-settings.component';
import { PurchaseSettingsComponent } from './component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component';
import { DetailSettingsComponent } from './component/dialog/settings-dialog/panels/detail-settings/detail-settings.component';
import { GeneralSettingsComponent } from './component/dialog/settings-dialog/panels/general-settings/general-settings.component';
import { AboutComponent } from './component/dialog/settings-dialog/panels/about/about.component';
import { InstructionsComponent } from './component/dialog/settings-dialog/panels/instructions/instructions.component';
import { SettingsPanelComponent } from './display/settings-panel/settings-panel.component';
import { DownloaderComponent } from './component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component';
import { LoaderOverlayComponent } from './component/loader-overlay/loader-overlay.component';
import { FaSamplerComponent } from './component/fa-sampler/fa-sampler.component';
import { FaIconComponent } from './component/fa-sampler/fa-icon/fa-icon.component';
import { IconComponent } from './display/icon/icon.component';

// dialog
import { MarkerDialogComponent } from './component/dialog/marker-dialog/marker-dialog.component';
import { SettingsDialogComponent } from './component/dialog/settings-dialog/settings-dialog.component';

// pipes
import { PoiSortingPipe } from './pipe/poi-sorting.pipe';
import { DistancePipe } from './pipe/distance.pipe';
import { FilesizePipe } from './pipe/filesize.pipe';

// services
import { LoaderService } from './service/loader.service';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { PlaygroundComponent } from './component/playground/playground.component';
import {FilesystemService} from './service/filesystem.service';
import { SettingsComponent } from './component/navigation/settings/settings.component';
import { TrailSettingsComponent } from './component/dialog/settings-dialog/panels/trail-settings/trail-settings.component';
import { DownloadDialogComponent } from './component/dialog/settings-dialog/panels/trail-settings/download-dialog/download-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationBasedComponent,
    ElevationProfileComponent,
    MileDetailComponent,
    NavigationComponent,
    LocatorComponent,
    ButtonComponent,
    ListItemComponent,
    VirtualListComponent,
    ScrollbarComponent,
    LabelsComponent,
    GuidesComponent,
    SettingsDialogComponent,
    MarkerDialogComponent,
    OfftrailDialogComponent,
    PoiListComponent,
    LeafletMapComponent,
    FaSamplerComponent,
    FaIconComponent,
    IconComponent,
    PoiSortingPipe,
    DistancePipe,
    FilesizePipe,
    PoiUserItemComponent,
    PoiListItemComponent,
    DynamicItemComponent,
    ElevationSettingsComponent,
    PurchaseSettingsComponent,
    DetailSettingsComponent,
    GeneralSettingsComponent,
    AboutComponent,
    InstructionsComponent,
    SettingsPanelComponent,
    DownloaderComponent,
    LoaderOverlayComponent,
    PlaygroundComponent,
    SettingsComponent,
    TrailSettingsComponent,
    DownloadDialogComponent
  ],
  entryComponents: [
    SettingsDialogComponent,
    MarkerDialogComponent,
    OfftrailDialogComponent,
    PoiUserItemComponent,
    PoiListItemComponent,
    DownloadDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    AngularFittextModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCarouselModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [File],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private _localStorage: LocalStorageService,
    private _loaderService: LoaderService,
    private _fileSystemService: FilesystemService,
    private _http: HttpClient,
  ) {

    // activate filesystem
    this._fileSystemService.initializeStorage();

    this._firstRun();

    // always clear simulatedMile
    this._localStorage.store('simulatedMile', -1);

    // font awesome library
    library.add(faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow,
      faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faCompass, faCar, faTrain, faDoorOpen, faMapMarkedAlt,
      faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faQuestionCircle, faFlag, faStar,
      faDotCircle, faExclamationTriangle, faHiking, faArrowAltCircleDown, faAngleRight, faPlus, faSnowflake,
      faAtlas, faMountain, faSpinner, faTrash);
  }

  // set default user settings (unless they already exist)
  // good place to force user settings during development/debugging
  private _firstRun() {

    const _self = this;
    // this._localStorage.clear();
    // this._localStorage.clear('firstRun');

    const _firstRun = this._localStorage.retrieve('firstRun');

    // console.log('dev params in app.module!!!');
    // // this._localStorage.store('activeTrailId', 0);   // set trail to DEMO
    // this._localStorage.clear('versionData');
    // this._localStorage.clear('lastVersionCheck');

    if (_firstRun !== false) {

      console.log('first run');

      this._loaderService.showMessage('initializing first run');
      this._localStorage.store('firstRun', true);

      // set default user settings
      for (const key in environment.DEFAULT_USER_SETTINGS) {

        const _value = environment.DEFAULT_USER_SETTINGS[key];

        if (this._localStorage.retrieve(key) === null) {
          this._localStorage.store(key, _value);
        }
      }
    }
  }
}
