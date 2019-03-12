import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsComponent } from './general-settings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LocalStorageStrategy, NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategy, StorageStrategyStub} from 'ngx-webstorage';

describe('GeneralSettingsComponent', () => {

  let component: GeneralSettingsComponent;
  let fixture: ComponentFixture<GeneralSettingsComponent>;
  let _strategyStub: StorageStrategy<any>;

  beforeEach(async(() => {

    _strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

    TestBed.configureTestingModule({
      imports: [
        NgxWebstorageModule.forRoot(),
        BrowserAnimationsModule,
        ScrollingModule,
        MatInputModule,
        MatCheckboxModule,
        MatRippleModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule
      ],
      declarations: [ GeneralSettingsComponent ],
      providers: [
        {provide: STORAGE_STRATEGIES, useFactory: () => _strategyStub, multi: true}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
