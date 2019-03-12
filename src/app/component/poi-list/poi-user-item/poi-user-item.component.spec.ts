import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiUserItemComponent } from './poi-user-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Poi} from '../../../type/poi';
import {DistancePipe} from '../../../pipe/distance.pipe';

describe('PoiUserItemComponent', () => {
  let component: PoiUserItemComponent;
  let fixture: ComponentFixture<PoiUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        PoiUserItemComponent,
        DistancePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiUserItemComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
