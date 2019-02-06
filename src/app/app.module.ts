import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFittextModule } from 'angular-fittext';
import {LocalStorageService, NgxWebstorageModule} from 'ngx-webstorage';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow,
  faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faExclamationTriangle, faMapMarkedAlt,
  faHiking, faArrowAltCircleDown, faAngleRight, faPlus, faCar, faTrain, faDoorOpen,
  faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faFlag, faStar, faQuestionCircle
  } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faDotCircle} from '@fortawesome/free-regular-svg-icons';

// virtual scroll & material
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


import {MatIconModule} from '@angular/material/icon';

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
import { LocatorComponent} from './component/locator/locator.component';
import { LoaderOverlayComponent } from './component/loader-overlay/loader-overlay.component';
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

// dialog
import { MarkerDialogComponent } from './component/dialog/marker-dialog/marker-dialog.component';
import { SettingsDialogComponent } from './component/dialog/settings-dialog/settings-dialog.component';
import { FaSamplerComponent } from './component/fa-sampler/fa-sampler.component';
import { FaIconComponent } from './component/fa-sampler/fa-icon/fa-icon.component';
import { IconComponent } from './display/icon/icon.component';

// pipes
import { PoiSortingPipe } from './pipe/poi-sorting.pipe';
import { DistancePipe } from './pipe/distance.pipe';
import { environment } from '../environments/environment.prod';
import { SettingsPanelComponent } from './display/settings-panel/settings-panel.component';

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
    LoaderOverlayComponent,
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
    PoiUserItemComponent,
    PoiListItemComponent,
    DynamicItemComponent,
    ElevationSettingsComponent,
    PurchaseSettingsComponent,
    DetailSettingsComponent,
    GeneralSettingsComponent,
    AboutComponent,
    InstructionsComponent,
    SettingsPanelComponent
  ],
  entryComponents: [
    SettingsDialogComponent,
    MarkerDialogComponent,
    OfftrailDialogComponent,
    PoiUserItemComponent,
    PoiListItemComponent
  ],
  imports: [
    BrowserModule,
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private _localStorage: LocalStorageService
  ) {

    this.firstRun();

    // font awesome library
    library.add(faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow,
      faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faCompass, faCar, faTrain, faDoorOpen, faMapMarkedAlt,
      faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faQuestionCircle, faFlag, faStar,
      faDotCircle, faExclamationTriangle, faHiking, faArrowAltCircleDown, faAngleRight, faPlus);
  }


  // set default user settings (unless they exist)
  private firstRun() {

    // DEBUG: FORCE FIRST RUN
    // this._localStorage.store('firstRun', undefined);
    this._localStorage.store('activeTrailId', 0);

    const _firstRun = this._localStorage.retrieve('firstRun');

    if (_firstRun !== false) {
      this._localStorage.store('firstRun', true);
    }

    for (const key in environment.DEFAULT_USER_SETTINGS) {

      const _value = environment.DEFAULT_USER_SETTINGS[key];

      if (this._localStorage.retrieve(key) === null) {
        this._localStorage.store(key, _value);
      }
    }

    // always clear simulatedMile
    this._localStorage.store('simulatedMile', -1);
  }
}
