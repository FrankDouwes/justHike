import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {isDevMode, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow, faStreetView,
  faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faExclamationTriangle, faMapMarkedAlt,
  faHiking, faAngleRight, faPlus, faCar, faTrain, faDoorOpen, faTimes, faDownload, faMapPin, faHotel,
  faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faFlag, faStar, faQuestionCircle, faGem,
  faSnowflake, faAtlas, faMountain, faSpinner, faTrash, faSkull, faCircle, faChevronDown, faChevronUp, faParking, faShoePrints
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxWebstorageModule } from 'ngx-webstorage';

// component
import { LocationBasedComponent } from './base/location-based/location-based.component';
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
import { PurchaseSettingsComponent } from './component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component';
import { GeneralSettingsComponent } from './component/dialog/settings-dialog/panels/general-settings/general-settings.component';
import { AboutComponent } from './component/dialog/settings-dialog/panels/about/about.component';
import { InstructionsComponent } from './component/dialog/settings-dialog/panels/instructions/instructions.component';
import { SettingsPanelComponent } from './base/settings-panel/settings-panel.component';
import { DownloaderComponent } from './component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component';
import { LoaderOverlayComponent } from './component/loader-overlay/loader-overlay.component';
import { FaSamplerComponent } from './component/fa-sampler/fa-sampler.component';
import { FaIconComponent } from './component/fa-sampler/fa-icon/fa-icon.component';
import { IconComponent } from './base/icon/icon.component';
import { ButtonComponent } from './base/button/button.component';
import { SettingsComponent } from './component/navigation/settings/settings.component';
import { TrailSettingsComponent } from './component/dialog/settings-dialog/panels/trail-settings/trail-settings.component';
import { AdminComponent } from './component/admin/admin.component';
import { UserIndicatorComponent } from './component/poi-list/user-indicator/user-indicator.component';

// dialog
import { MarkerDialogComponent } from './component/dialog/marker-dialog/marker-dialog.component';
import { SettingsDialogComponent } from './component/dialog/settings-dialog/settings-dialog.component';

// pipes
import { PoiSortingPipe } from './pipe/poi-sorting.pipe';
import { DistancePipe } from './pipe/distance.pipe';
import { FilesizePipe } from './pipe/filesize.pipe';
import { RatingComponent } from './component/dialog/marker-dialog/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationBasedComponent,
    ButtonComponent,
    FaIconComponent,
    IconComponent,
    LoaderOverlayComponent,
    FaSamplerComponent,
    NavigationComponent,
    LocatorComponent,
    ElevationProfileComponent,
    MileDetailComponent,
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
    PoiSortingPipe,
    DistancePipe,
    FilesizePipe,
    PoiUserItemComponent,
    PoiListItemComponent,
    DynamicItemComponent,
    PurchaseSettingsComponent,
    GeneralSettingsComponent,
    AboutComponent,
    InstructionsComponent,
    SettingsPanelComponent,
    DownloaderComponent,
    SettingsComponent,
    TrailSettingsComponent,
    AdminComponent,
    UserIndicatorComponent,
    RatingComponent
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
    FormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    ScrollingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCarouselModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

    if (isDevMode()) {
      console.log('\n');
      console.log('***** ***** ***** ***** ***** ***** ***** *****');
      console.log('RUNNING IN DEV MODE, CHECK ENVIRONMENT SETTINGS');
      console.log('***** ***** ***** ***** ***** ***** ***** *****');
      console.log('\n');
    }

    // font awesome library
    library.add(faLongArrowAltUp, faLongArrowAltDown, faCampground, faCog, faLocationArrow, faHotel, faStreetView,
      faArrowLeft, faRoad, faMapMarkerAlt, faTint, faTree, faCompass, faCar, faTrain, faDoorOpen, faMapMarkedAlt,
      faBolt, faStore, faBoxOpen, faUtensils, faInfo, faMapSigns, faQuestionCircle, faFlag, faStar, faDownload,
      faDotCircle, faExclamationTriangle, faHiking, faArrowAltCircleDown, faAngleRight, faPlus, faSnowflake, faGem, faMapPin,
      faAtlas, faMountain, faSpinner, faTrash, faSkull, faCircle, faChevronDown, faChevronUp, faTimes, faParking, faShoePrints);
  }
}
