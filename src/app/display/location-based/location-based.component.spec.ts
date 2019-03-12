import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasedComponent } from './location-based.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('LocationBasedComponent', () => {
  let component: LocationBasedComponent;
  let fixture: ComponentFixture<LocationBasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationBasedComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: { params: of({id: 1})}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
