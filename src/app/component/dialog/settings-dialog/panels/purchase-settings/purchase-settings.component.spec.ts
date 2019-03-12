import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSettingsComponent } from './purchase-settings.component';
import {MatCardModule, MatSelectModule} from '@angular/material';
import {DownloaderComponent} from '../trail-settings/downloader/downloader.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FilesizePipe} from '../../../../../pipe/filesize.pipe';
import {LocalStorageStrategy, NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategy, StorageStrategyStub} from 'ngx-webstorage';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PurchaseSettingsComponent', () => {
  let component: PurchaseSettingsComponent;
  let fixture: ComponentFixture<PurchaseSettingsComponent>;
  let _strategyStub: StorageStrategy<any>;

  beforeEach(async(() => {

    _strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

    TestBed.configureTestingModule({
      imports: [
        NgxWebstorageModule.forRoot(),
        BrowserAnimationsModule,
        MatCardModule,
        MatSelectModule,
        FontAwesomeModule,
        HttpClientModule
      ],
      declarations: [
        PurchaseSettingsComponent,
        DownloaderComponent,
        FilesizePipe
      ],
      providers: [
        {provide: STORAGE_STRATEGIES, useFactory: () => _strategyStub, multi: true}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
