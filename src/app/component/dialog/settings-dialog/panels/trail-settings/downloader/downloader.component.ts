import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, isDevMode,
  OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DownloadService} from '../../../../../../service/download.service';
import {Subscription} from 'rxjs';
import {Downloader} from '../../../../../../_util/downloader/downloader';
import {FilesystemService} from '../../../../../../service/filesystem.service';
import {getTrailMetaDataById} from '../../../../../../_util/trail-meta';
import {TrailMeta} from '../../../../../../type/trail';
import {environment} from '../../../../../../../environments/environment.prod';
import {DownloaderStatus} from '../../../../../../_util/downloader/status-manager';
import {ConnectionService} from '../../../../../../service/connection.service';

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
  @Input() hasFile?:                boolean;    // is there a file available locally (in local storage/assets/filesystem)
  @Input() hasUpdate?:              boolean;    // is there an update available for this files
  @Input() version:                 string;
  @Input() isVersionSpecific?:      boolean;    // is the download based on version (trail data / tiles data)

  @Input() file:                    string;     // the filename (without extension)
  @Input() extension:               string;     // just the extension, no .)
  @Input() parts?:                  number;     // support for multi part (sequential downloading, as there is a max filesize)

  public trailMeta:                 TrailMeta;
  public isActive:                  boolean;
  public storageAvailable:          boolean;
  public progress:                  number;
  public progressState              = 'determinate';

  private _buttonState:             string;
  private _downloadSubscription:    Subscription;
  private _downloader:              Downloader;
  private _url:                     string | Array<string>;

  constructor(
    private _changeDetector:        ChangeDetectorRef,
    private _downloadService:       DownloadService,
    private _fileSystemService:     FilesystemService,
    private _connectionService:     ConnectionService
  ) {
  }

  ngOnInit(): void {
    this.trailMeta = getTrailMetaDataById(this.trailId);
    this._createDownloader();
    this._setup();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.trailId) {
      this.trailMeta = getTrailMetaDataById(this.trailId);
      this._createDownloader();
      this._setup();
    }
  }


  ngOnDestroy(): void {
    this._downloadSubscription.unsubscribe();
  }




  // SETUP
  private _createDownloader(): void {

    // name based downloader, managed by downloader service
    this._downloader = this._downloadService.createDownloader(this.trailMeta.abbr +  '_' + this.type);
  }

  private _setup(): void {

    const _self = this;

    this.isActive = this._downloader.status.isActiveSubject.getValue();

    let _base: string = this.trailMeta.abbr + '/';
    if (this.isVersionSpecific) {
      _base += this.trailMeta[this.type + 'Version'] + '/';
    }

    if (this.parts > 1) {

      // multipart download
      this._url = [];

      for (let i = 0; i < this.parts; i++) {

        this._url.push(_base + this.file + '_' + i + '.' + this.extension);
      }

    } else {

      // single file
      this._url = _base + this.file + '.' + this.extension;
    }

    // check if storage is accessible
    this.storageAvailable = this._fileSystemService.isStorageAvailable;

    // observe download status
    if (this._downloadSubscription) {
      this._downloadSubscription.unsubscribe();
    }

    this._downloadSubscription = this._downloader.meta.subscribe(
      function (status: DownloaderStatus) {

        _self.isActive = _self._downloader.status.isActiveSubject.getValue();

        if (status && status.label) {

          if (status.type === 'http' && status.label === 'complete') {

            if (_self.extension !== 'zip' && _self.extension !== 'json') {

              _self._clear();
              _self.hasFile = false;
              _self.isActive = false;
              throw new Error('downloaded an unsupported file');
            }

          } else if (status.label === 'progress') {

            // TODO: currently not showing saving/unzipping as part of the progress bar

            if (status.type === 'http') {

              // only updates on full % difference, to save redraws
              const _newProgress = Math.floor(status.data.percentage);
              if (_newProgress !== _self.progress) {
                _self.progressState = 'determinate';
                _self.progress = status.data.percentage;
                _self._changeDetector.detectChanges();
              }
            } else {
              _self.progressState = 'buffer';
              _self._changeDetector.detectChanges();
            }
          } else if (status.label === 'error') {

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
        }
      }, function (error) {

        alert('Download error');
        _self.isActive = _self._downloader.status.isActiveSubject.getValue();
        _self.onClear(_self.type);
        _self.hasFile = false;
        _self.progress = 0;
      });

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

    if (this._connectionService.state !== 'online') {
      alert('You\'re currently offline!');
      return;
    }

    let _url;

    if (typeof this._url === 'string') {
      _url = environment.appDomain + environment.fileBaseUrl + this._url;
    } else {

      _url = [];

      this._url.forEach(function(file) {
        _url.push(environment.appDomain + environment.fileBaseUrl + file);
      });
    }

    this._downloader.downloadFile(_url, !isDevMode(), this._url);
  }

  // clear all data
  private _clear(): void {
    this._downloader.cancelDownload();
    this._downloader.clearFile();
    this.hasFile = false;
    this.onClear(this.type);
  }

  // cancel current download/unzip process
  private _cancel(): void {
    this._downloader.cancelDownload();
    this.onClear(this.type);
  }
}
