import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {DownloadService} from '../../../../../../service/download.service';
import {Subscription} from 'rxjs';
import {Downloader, DownloaderStatus} from '../../../../../../_util/downloader';
import {environment} from '../../../../../../../environments/environment.prod';
import {FilesystemService} from '../../../../../../service/filesystem.service';
import {getExtensionFromString} from '../../../../../../_util/file';
import {getTrailMetaDataById} from '../../../../../../_util/trail';
import {TrailMeta} from '../../../../../../type/trail';

export class DownloadStatus {
  label: string;
  data: any;
}

@Component({
  selector: 'downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DownloaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() trailId:                 number;
  @Input() type:                    string;
  @Input() label ?:                 string;     // if not provided, label will be generated
  @Input() onComplete?:             Function;
  @Input() onClear?:                Function;
  @Input() file:                    string;     // the filename (with extension)
  @Input() hasFile?:                boolean;    // is there a file available locally (in local storage/assets/filesystem)
  @Input() hasUpdate?:              boolean;    // is there an update available for this files
  @Input() version:                 string;

  public trailMeta:                 TrailMeta;
  public isActive:                  boolean;
  public storageAvailable:          boolean;
  public progress:                  number;

  private progressLabel:            string;
  private _fileExtension:           string;
  private _buttonState:             string;
  private _downloadSubscription:    Subscription;
  private _downloader:              Downloader;
  private _url:                     string;

  constructor(
    private _changeDetector:        ChangeDetectorRef,
    private _downloadService:       DownloadService,
    private _fileSystemService:     FilesystemService
  ) {
  }

  ngOnInit(): void {

    const _self = this;

    this._setup();

    // check if storage is accessible
    this.storageAvailable = this._fileSystemService.isStorageAvailable;

    // observe download status
    this._downloadSubscription = this._downloader.meta.subscribe(
      function (status: DownloaderStatus) {

        // if (status.type === 'http') {
        //   _self.progressLabel = 'downloading';
        // } else if (status.type === 'filesystem') {
        //   _self.progressLabel = 'processing';
        // }

        _self.isActive = _self._downloader.isActiveSubject.getValue();

        if (status.type === 'http' && status.label && status.label === 'complete') {

          if (_self._fileExtension !== 'zip' && _self._fileExtension !== 'json') {

            _self._clear();
            _self.hasFile = false;
            throw new Error('downloaded an unsupported file');
          }

        } else if (status['label'] && status['label'] === 'progress') {

          const _newProgress = status.data.percentage.toFixed(0);
          if (_newProgress !== _self.progress) {
            _self.progress = status.data.percentage.toFixed(0);
            _self._changeDetector.detectChanges();
          }

        } else if (status['label'] && status['label'] === 'error') {

          alert('Downloader error');
          _self.hasFile = false;
          _self.onClear(_self.type);
          _self.progress = 0;

        } else if (status.type === 'downloader' && status.label === 'complete') {
          _self.progress = 100;
          _self.hasFile = true;

          console.log('downloader complete?');
          _self.onComplete(_self.type);

        } else if (status.type === 'downloader' && status.label === 'cleared') {
          _self.progress = 0;
        }


        }, function (error) {

        alert('Download error');
        _self.isActive = _self._downloader.isActiveSubject.getValue();
        _self.onClear(_self.type);
        _self.hasFile = false;
        _self.progress = 0;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.trailId) {
      this._setup();
      this._createDownloader();
    }
  }


  ngOnDestroy(): void {
    this._downloadSubscription.unsubscribe();
  }




  // SETUP
  private _createDownloader(): void {

    if (this._downloader) {
      this._downloader.cancelDownload();
    }

    // name based downloader, managed by downloader service
    this._downloader = this._downloadService.createDownloader(this.trailMeta.abbr +  '_' + this.type);
  }

  private _setup(): void {

    this.trailMeta = getTrailMetaDataById(this.trailId);

    this._fileExtension = getExtensionFromString(this.file);
    this._url = this.trailMeta.abbr + '/' + this.trailMeta[this.type + 'Version'] + '/' + this.file;

    // since object changes won't trigger a redraw
    this._changeDetector.detectChanges();
  }



  // EVENT HANDLERS

  public onButtonClick(newState: string) {

    // prevent repetitive actions
    if (this._buttonState !== newState) {
      this['_' + newState]();     // dynamic function call
    }
  }



  // BUTTON ACTIONS (dynanically called from button click)

  private _download(): void {
    const _url = environment.appDomain + environment.fileBaseUrl + this._url;
    this._downloader.downloadFile(_url, !isDevMode(), this._url);
  }

  // clear all data
  private _clear(): void {

    this._downloader.cancelDownload();
    this._downloader.clearFile();
    this.onClear(this.type);
  }

  // cancel current download/unzip process
  private _cancel(): void {
    this._downloader.cancelDownload();
    this.onClear(this.type);
  }
}
