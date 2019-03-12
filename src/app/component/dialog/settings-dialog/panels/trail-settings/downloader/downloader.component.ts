import {ChangeDetectorRef, Component, Input, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {DownloadService} from '../../../../../../service/download.service';
import {Subscription} from 'rxjs';
import {Downloader, DownloaderStatus} from '../../../../../../_util/downloader';
import {environment} from '../../../../../../../environments/environment.prod';
import {FilesystemService} from '../../../../../../service/filesystem.service';
import {getExtensionFromString} from '../../../../../../_util/file';

export class DownloadStatus {
  label: string;
  data: any;
}

@Component({
  selector: 'downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.sass']
})

export class DownloaderComponent implements OnInit, OnDestroy {

  @Input() trailAbbr: string;
  @Input() name: string;
  @Input() label: string;
  @Input() downloadPath: string;
  @Input() fileSize?: number;
  @Input() callback?: Function;

  public hasFile: boolean;
  public isActive: boolean;
  public status: DownloadStatus;
  public storageAvailable: boolean;
  public progress: number;


  private progressLabel: string;

  private _fileExtension: string;

  private _buttonState: string;

  private _downloadSubscription: Subscription;
  private _downloader: Downloader;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _downloadService: DownloadService,
    private _fileSystemService: FilesystemService
  ) {
  }

  ngOnInit(): void {

    const _self = this;

    // check if storage is accessible
    this.storageAvailable = this._fileSystemService.isStorageAvailable;

    // set extension for parsing
    this._fileExtension = getExtensionFromString(this.downloadPath);

    // name based downloader, managed by downloader service
    this._downloader = this._downloadService.createDownloader(this.name);

    // observe download status
    this._downloadSubscription = this._downloader.meta.subscribe(
      function (status: DownloaderStatus) {

        if (status.type === 'http') {
          _self.progressLabel = 'downloading';
        } else if (status.type === 'filesystem') {
          _self.progressLabel = 'processing';
        }

        _self.status = status;

        if (status.type === 'http' && status.label && status.label === 'complete') {

          if (!_self.downloadPath) {
            _self.isActive = false;
          }

          if (_self._fileExtension === 'zip') {

            console.log('zip downloaded');

          } else if (_self._fileExtension === 'json') {

            console.log('json downloaded');

          } else {

            _self._clear();
            _self.hasFile = _self.isActive = false;
            throw new Error('downloaded an unsupported file');
          }

        } else if (status['label'] && status['label'] === 'progress') {

          _self.isActive = true;
          const _newProgress = status.data.percentage.toFixed(0);
          if (_newProgress !== _self.progress) {
            _self.progress = status.data.percentage.toFixed(0);
            _self._changeDetector.detectChanges();
          }

        } else if (status['label'] && status['label'] === 'error') {

          alert('Downloader error');
          _self.hasFile = _self.isActive = false;

        } else if (status.type === 'downloader' && status.label === 'complete') {
          _self.progress = 100;
          _self.hasFile = true;
          _self.isActive = false;
          _self.callback();
        }


        }, function (error) {

        alert('Download error');
        _self.hasFile = _self.isActive = false;
      });
  }

  ngOnDestroy(): void {
    this._downloadSubscription.unsubscribe();
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
    const _url = environment.appDomain + environment.fileBaseUrl + this.downloadPath;
    this._downloader.downloadFile(_url, !isDevMode(), this.downloadPath);
  }

  // clear all data
  private _clear(): void {

    this._downloader.cancelDownload();
    this._downloader.clearFile();
  }

  // cancel current download/unzip process
  private _cancel(): void {
    this._downloader.cancelDownload();
  }
}
