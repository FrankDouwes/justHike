import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OfftrailDialogComponent } from './offtrail-dialog.component';
import {ButtonComponent} from '../../../base/button/button.component';
import {MAT_DIALOG_DATA, MatCardContent, MatDialogRef} from '@angular/material';
import {DistancePipe} from '../../../pipe/distance.pipe';
import {IconComponent} from '../../../base/icon/icon.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatInputModule } from '@angular/material/input';
import {LocalStorageStrategy, NgxWebstorageModule, STORAGE_STRATEGIES, StorageStrategy, StorageStrategyStub} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OfftrailDialogComponent', () => {

  let component: OfftrailDialogComponent;
  let fixture: ComponentFixture<OfftrailDialogComponent>;
  let _strategyStub: StorageStrategy<any>;

  beforeEach(async(() => {

    const _mockData = {
      distance: 5,
      anchorPointDistance: 1,
      trailLength: 2658
    };

    _strategyStub = new StorageStrategyStub(LocalStorageStrategy.strategyName);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        FontAwesomeModule,
        ScrollingModule,
        MatInputModule
      ],
      declarations: [
        OfftrailDialogComponent,
        ButtonComponent,
        DistancePipe,
        MatCardContent,
        IconComponent
      ],
      providers: [
        {provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: _mockData},
        {provide: STORAGE_STRATEGIES, useFactory: () => _strategyStub, multi: true}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfftrailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
