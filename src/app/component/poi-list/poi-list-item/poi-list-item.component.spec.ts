import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiListItemComponent } from './poi-list-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Poi} from '../../../type/poi';
import {IconComponent} from '../../../display/icon/icon.component';
import {DistancePipe} from '../../../pipe/distance.pipe';

describe('PoiListItemComponent', () => {
  let component: PoiListItemComponent;
  let fixture: ComponentFixture<PoiListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        PoiListItemComponent,
        IconComponent,
        DistancePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiListItemComponent);
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
