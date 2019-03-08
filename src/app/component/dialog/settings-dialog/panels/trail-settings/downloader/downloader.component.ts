import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../../../environments/environment.prod';
import * as D from 'node_modules/cordova-plugin-file-downloader/src/downloader';
import {MatDialog} from '@angular/material';
import {DownloadDialogComponent} from '../download-dialog/download-dialog.component';


@Component({
  selector: 'downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.sass']
})

/* downloader component using a package (bunch of cordova plugins mixed together, not the way I want it to be, waiting for a capacitor update to allow blobs,
there's a 2nd XYZdownloader.component that will eventually work, which works with the downloader service allowing multiple downloads, background downloads etc.*/
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
    private _elementRef: ElementRef,
    private _dialog: MatDialog,
) {}

  ngOnInit(): void {
    this._initializeDownloader();
  }

  // download keeps running in the background as it runs separate from the component
  // TODO: the parsing should also run seperately...
  ngOnDestroy(): void {}


  // DOWNLOADER
  // re initialize after abort/clear
  private _initializeDownloader():void {

    const _self = this;

    if (!this._downloader) {
      this._downloader = D;     // "There can be only one! =(" ~ Highlander
    }

    this._elementRef.nativeElement.addEventListener('DOWNLOADER_initialized', function(event) {
      console.log('downloader initialized');
      _self._initialized = true;
    }, false);

    this._downloader.init({folder: this.trailAbbr, unzip: true, delete: true, nativeElement: this._elementRef.nativeElement});

  }


  // BUTTON ACTIONS (dynanically called from button click)

  private _download(): void {

    if (this._initialized) {

      const _url = environment.appDomain + environment.fileBaseUrl + this.downloadPath;
      const _downloadDialog = this._dialog.open(DownloadDialogComponent, {
        autoFocus: true,
        closeOnNavigation: false,
        disableClose: true,
        width: '50%',
        height: '50%',
        data: { nativeElement: this._elementRef.nativeElement }
      });

      this._downloader.get(_url);

    } else {
      alert('The (mobile only) downloader failed to initialize!');
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

    console.log(this.state);

    if (this.state !== newState) {

      this['_' + newState]();     // dynamic function call based on state
    }
  }
}
