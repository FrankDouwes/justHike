import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import {
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatInputModule, MatOptionModule, MatRippleModule, MatSelectModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

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
        MatOptionModule,
      ],
      declarations: [
        AboutComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
