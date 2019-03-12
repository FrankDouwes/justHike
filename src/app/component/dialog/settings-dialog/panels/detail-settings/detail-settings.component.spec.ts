import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSettingsComponent } from './detail-settings.component';
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

describe('DetailSettingsComponent', () => {
  let component: DetailSettingsComponent;
  let fixture: ComponentFixture<DetailSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ScrollingModule,
        MatInputModule,
        MatCheckboxModule,
        MatRippleModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule
      ],
      declarations: [ DetailSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
