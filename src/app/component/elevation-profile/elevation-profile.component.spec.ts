import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevationProfileComponent } from './elevation-profile.component';
import {VirtualListComponent} from './virtual-list/virtual-list.component';
import {ScrollbarComponent} from './scrollbar/scrollbar.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ListItemComponent} from './virtual-list/list-item/list-item.component';
import {GuidesComponent} from './virtual-list/guides/guides.component';
import {LabelsComponent} from './virtual-list/labels/labels.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

describe('ElevationProfileComponent', () => {
  let component: ElevationProfileComponent;
  let fixture: ComponentFixture<ElevationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollingModule,
        FontAwesomeModule
      ],
      declarations: [
        ElevationProfileComponent,
        VirtualListComponent,
        ScrollbarComponent,
        ListItemComponent,
        GuidesComponent,
        LabelsComponent
      ],
      providers: [
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        {provide: ActivatedRoute, useValue: { data: of({trail: null, snow: null}) }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
