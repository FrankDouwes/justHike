import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevationSettingsComponent } from './elevation-settings.component';

describe('ElevationSettingsComponent', () => {
  let component: ElevationSettingsComponent;
  let fixture: ComponentFixture<ElevationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
