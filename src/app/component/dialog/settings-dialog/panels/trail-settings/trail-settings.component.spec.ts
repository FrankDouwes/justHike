import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailSettingsComponent } from './trail-settings.component';

describe('TrailSettingsComponent', () => {
  let component: TrailSettingsComponent;
  let fixture: ComponentFixture<TrailSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
