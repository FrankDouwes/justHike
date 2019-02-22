import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DownloadService} from '../../../../../../service/download.service';
import {environment} from '../../../../../../../environments/environment.prod';
import {FilesystemService} from '../../../../../../service/filesystem.service';
import * as D from 'node_modules/cordova-plugin-file-downloader/src/downloader';

@Component({
  selector: 'downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.sass']
})

export class DownloaderComponent implements OnInit, OnDestroy {

  @Input() trailAbbr:       string;
  @Input() name:            string;
  @Input() label:           string;
  @Input() downloadPath:    string;
  @Input() type:            string;
  @Input() fileSize?:       number;

  public isActive: boolean = false;      // downloader is doing stuff
  public progress: number = 0;    // 0 - 100;
  public state: string = 'idle';
  public hasFiles: boolean = false;

  private _initialized: boolean;
  private _downloader: D;

  constructor(
    private _downloadService: DownloadService,
    private _fileSystemService: FilesystemService
) {}

  ngOnInit(): void {

    const _self = this;

    document.addEventListener('DOWNLOADER_initialized', function(event){
      _self._initialized = true;
      console.log('initialized');
    });

    document.addEventListener('DOWNLOADER_fileCheckSuccess', function(event){
      console.log('success');
      _self.state = 'idle';
      _self.isActive = false;
      _self.hasFiles = true;
    });

    document.addEventListener('DOWNLOADER_downloadProgress', function(event){
      _self.state = 'downloading';
      _self.progress = event['data'].percentage;
      _self.isActive = true;
    });

    document.addEventListener('DOWNLOADER_error', function(event){
      _self.state = 'error';
      console.log('error');
    });

    document.addEventListener('deviceready', function() {
      _self._initializeDownloader();
    });
  }



  // download keeps running in the background as it runs separate from the component
  // TODO: the parsing should also run seperately...
  ngOnDestroy(): void {}



  // DOWNLOADER
  // re initialize after abort/clear
  private _initializeDownloader():void {

    if (!this._downloader) {
      this._downloader = D;     // needs to be an instance using the dowloader service...
    }

    this._downloader.init({folder: this.trailAbbr, unzip: true, delete: true});
  }


  // BUTTON ACTIONS (dynanically called from button click)

  private _download(): void {

    if (this._initialized) {
      const _url = environment.appDomain + environment.fileBaseUrl + this.downloadPath;
      this._downloader.get(_url);
    }
  }

  // clear all data
  private _clear(): void {

    // const _self = this;
    //
    // this._fileSystemService.removeDirectory(this.trailAbbr).then(function() {
    //   _self.state = 'idle';
    // });
  }

  // cancel current download/unzip process
  private _cancel(): void {

    this._downloader.abort();

    this._clear();
    this._initializeDownloader();
  }

  // EVENT HANDLERS

  public onButtonClick(newState: string) {

    if (this.state !== newState) {
      this['_' + newState]();
    }
  }
}
