import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileDetailComponent } from './mile-detail.component';
import {LeafletMapComponent} from '../leaflet-map/leaflet-map.component';
import {PoiListComponent} from '../poi-list/poi-list.component';
import {MatListModule} from '@angular/material';
import {DynamicItemComponent} from '../poi-list/dynamic-item/dynamic-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('MileDetailComponent', () => {
  let component: MileDetailComponent;
  let fixture: ComponentFixture<MileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        ScrollingModule
      ],
      declarations: [
        MileDetailComponent,
        LeafletMapComponent,
        PoiListComponent,
        DynamicItemComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: { data: of({trail: null, snow: null}) }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
