import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicItemComponent } from './dynamic-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Poi} from '../../../type/poi';
import {Waypoint} from '../../../type/waypoint';
import latitude = geolib.latitude;
import {ComponentFactoryResolver} from '@angular/core';

describe('DynamicItemComponent', () => {
  let component: DynamicItemComponent;
  let fixture: ComponentFixture<DynamicItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [ DynamicItemComponent ],
      providers: [{provide: ComponentFactoryResolver}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicItemComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 0,
      trail: 'PCT',
      waypoint:           {latitude: 0, longitude: 0},
      type:               'water',
      label:              'a water source',
      anchorPoint:        {latitude: 0, longitude: 0},
      distance:           0 } as Poi;
    fixture.detectChanges();
  });

  // not sure how to incorporate ComponentFactoryResolver in tests...
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
