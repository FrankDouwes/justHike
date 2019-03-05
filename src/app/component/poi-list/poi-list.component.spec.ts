import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiListComponent } from './poi-list.component';
import {MatListModule} from '@angular/material';
import {DynamicItemComponent} from './dynamic-item/dynamic-item.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

describe('PoiListComponent', () => {
  let component: PoiListComponent;
  let fixture: ComponentFixture<PoiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        ScrollingModule
      ],
      declarations: [
        PoiListComponent,
        DynamicItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
