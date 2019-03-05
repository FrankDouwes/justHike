import { TestBed, async } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {FaSamplerComponent} from './component/fa-sampler/fa-sampler.component';
import {LoaderOverlayComponent} from './component/loader-overlay/loader-overlay.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {FaIconComponent} from './component/fa-sampler/fa-icon/fa-icon.component';
import {ButtonComponent} from './display/button/button.component';
import {MatDialog, MatDialogModule, MatProgressSpinnerModule} from '@angular/material';
import {LocatorComponent} from './component/locator/locator.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IconComponent} from './display/icon/icon.component';
import {LeafletMapComponent} from './component/leaflet-map/leaflet-map.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LocalStorageStrategy, NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategy, StorageStrategyStub} from 'ngx-webstorage';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {

  let _strategyStub: StorageStrategy<any>;

  beforeEach(async(() => {

    _strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

    TestBed.configureTestingModule({
      imports: [
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        MatProgressSpinnerModule,
        FontAwesomeModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        ScrollingModule,
        MatDialogModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        FaSamplerComponent,
        LoaderOverlayComponent,
        NavigationComponent,
        FaIconComponent,
        ButtonComponent,
        LocatorComponent,
        IconComponent,
        LeafletMapComponent
      ],
      providers: [
        MatDialog,
        {provide: STORAGE_STRATEGIES, useFactory: () => _strategyStub, multi: true}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
