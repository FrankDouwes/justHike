import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ListItemComponent} from './list-item/list-item.component';
import {GuidesComponent} from './guides/guides.component';
import {LabelsComponent} from './labels/labels.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('VirtualListComponent', () => {
  let component: VirtualListComponent;
  let fixture: ComponentFixture<VirtualListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollingModule,
        FontAwesomeModule
      ],
      declarations: [
        VirtualListComponent,
        ListItemComponent,
        GuidesComponent,
        LabelsComponent
      ],
      providers: [
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        {provide: ActivatedRoute, useValue: { params: of({id: 1})}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
