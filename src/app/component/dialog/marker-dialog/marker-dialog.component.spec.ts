import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDialogComponent } from './marker-dialog.component';
import {ButtonComponent} from '../../../display/button/button.component';
import {DistancePipe} from '../../../pipe/distance.pipe';
import {PoiListComponent} from '../../poi-list/poi-list.component';
import {IconComponent} from '../../../display/icon/icon.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {DynamicItemComponent} from '../../poi-list/dynamic-item/dynamic-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material';
import {Poi} from '../../../type/poi';

describe('MarkerDialogComponent', () => {
  let component: MarkerDialogComponent;
  let fixture: ComponentFixture<MarkerDialogComponent>;

  beforeEach(async(() => {

    const _mockData = {
      id:                 0,
      trail:              'PCT',
      waypoint:           {longitude: 0, latitude: 0},
      type:               'water',
      label:              'test',
      anchorPoint:        {longitude: 0, latitude: 0},
      distance:           0
    } as Poi;

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule,
        ScrollingModule,
        FontAwesomeModule
      ],
      declarations: [
        MarkerDialogComponent,
        ButtonComponent,
        DistancePipe,
        PoiListComponent,
        IconComponent,
        DynamicItemComponent
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: _mockData }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
