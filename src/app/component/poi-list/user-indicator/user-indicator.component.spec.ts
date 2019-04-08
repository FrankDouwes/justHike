import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIndicatorComponent } from './user-indicator.component';

describe('UserIndicatorComponent', () => {
  let component: UserIndicatorComponent;
  let fixture: ComponentFixture<UserIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
