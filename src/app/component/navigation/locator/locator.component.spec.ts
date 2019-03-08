import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorComponent } from './locator.component';
import {LeafletMapComponent} from '../../leaflet-map/leaflet-map.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('LocatorComponent', () => {
  let component: LocatorComponent;
  let fixture: ComponentFixture<LocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        LocatorComponent,
        LeafletMapComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
