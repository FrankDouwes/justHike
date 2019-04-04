import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import {IconComponent} from '../../../../base/icon/icon.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LocalStorageStrategy, NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategy, StorageStrategyStub} from 'ngx-webstorage';
import {Mile} from '../../../../type/mile';
import {Waypoint} from '../../../../type/waypoint';
import {OHLC} from '../../../../type/ohlc';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let _strategyStub: StorageStrategy<any>;
  const _mockMile = {
    id:                 0,
    elevationGain:      0,
    elevationLoss:      0,
    waypoints:          [{latitude: 0, longitude: 0}],
    elevationRange:     {open: 0, high: 0, low: 0, close: 0},
    scale:              1,
    centerpoint:        {latitude: 0, longitude: 0}
  } as Mile;

  beforeEach(async(() => {

    _strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

    TestBed.configureTestingModule({

    imports: [
      NgxWebstorageModule.forRoot(),
      FontAwesomeModule
      ],
      declarations: [
        ListItemComponent,
        IconComponent
      ],
      providers: [
        {provide: STORAGE_STRATEGIES, useFactory: () => _strategyStub, multi: true}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.data = _mockMile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
