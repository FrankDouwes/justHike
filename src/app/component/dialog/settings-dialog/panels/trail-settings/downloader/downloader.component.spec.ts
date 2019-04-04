import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloaderComponent } from './downloader.component';
import {IconComponent} from '../../../../../../base/icon/icon.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FilesizePipe} from '../../../../../../pipe/filesize.pipe';
import {HttpClientModule} from '@angular/common/http';

describe('DownloaderComponent', () => {
  let component: DownloaderComponent;
  let fixture: ComponentFixture<DownloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        HttpClientModule
      ],
      declarations: [
        DownloaderComponent,
        IconComponent,
        FilesizePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloaderComponent);
    component = fixture.componentInstance;

    // defaults
    component.label = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
