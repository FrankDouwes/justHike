import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDialogComponent } from './settings-dialog.component';
import {IconComponent} from '../../../base/icon/icon.component';
import {ButtonComponent} from '../../../base/button/button.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  MAT_DIALOG_DATA,
  MatCardModule,
  MatCheckboxModule, MatDialogModule, MatDialogRef,
  MatInputModule,
  MatListModule,
  MatOptionModule, MatRippleModule,
  MatSelectModule
} from '@angular/material';
import {InstructionsComponent} from './panels/instructions/instructions.component';
import {AboutComponent} from './panels/about/about.component';
import {GeneralSettingsComponent} from './panels/general-settings/general-settings.component';
import {PurchaseSettingsComponent} from './panels/purchase-settings/purchase-settings.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import {DownloaderComponent} from './panels/trail-settings/downloader/downloader.component';
import {FilesizePipe} from '../../../pipe/filesize.pipe';

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule,
        ScrollingModule,
        MatInputModule,
        MatCheckboxModule,
        MatRippleModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        MatListModule,
        MatCarouselModule
      ],
      declarations: [
        SettingsDialogComponent,
        IconComponent,
        ButtonComponent,
        InstructionsComponent,
        AboutComponent,
        GeneralSettingsComponent,
        PurchaseSettingsComponent,
        DownloaderComponent,
        FilesizePipe
      ],
      providers: [
        {provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
