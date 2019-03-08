import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import {getExtensionFromString} from './file';
import {FilesystemService} from '../service/filesystem.service';

// file downloader
// sets type using file extension, currently supports json & blob
// has caching (for large files)
// has saving (to filesystem), including auto unzipping

export class DownloaderStatus {
  label: string;
  data: object;
}

export class Downloader {

  public meta:                        Observable<DownloaderStatus>;
  public downloadedFile:              any;      // only available if file is not being saved
  public isActiveSubject:             BehaviorSubject<boolean>    = new BehaviorSubject<boolean>(false);

  private _meta:                      BehaviorSubject<DownloaderStatus>     = new BehaviorSubject<DownloaderStatus>(new DownloaderStatus());
  private _downloadRequest:           Subscription;

  constructor(
    private _filesystemService:       FilesystemService,
    private _httpClient:              HttpClient
  ) {

    // setup status subscription
    this.meta  = this._meta.asObservable().pipe(share());
  }

  // savePath is the location to save the file, blank == no save, allows renaming (so 'download.zip' can be saved as 'DEMO/test-file.zip')
  public downloadFile(url: string, cache: boolean = true, savePath: string = null): void {

    const _extension = getExtensionFromString(url);

    const _type: string = (_extension === 'json') ? _extension : 'blob';

    this._setStatus('fetching', null, false);

    let _headers = new HttpHeaders();
    _headers = _headers.append('Content-Type', 'application/json; charset=utf-8');

    if (!cache) {
      _headers = _headers.append('Cache-Control', 'no-cache');
      _headers = _headers.append('Pragma', 'no-cache');
    }

    // download file
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
      headers: _headers,
      responseType: _type
    });


    this._downloadRequest = this._httpClient.request(req).subscribe(event => {

      if (event.type === HttpEventType.DownloadProgress) {

        const _downloadPercentage = Number(((event.loaded / event.total) * 100).toFixed(2));
        const _fileSize = Number(event.total);

        this._setStatus('downloading', {percentage: _downloadPercentage, fileSize: _fileSize}, true);

      } else if (event instanceof HttpResponse) {


        if (savePath) {

          console.log('Blob size', event.body['size']);

          this._saveFile(event.body, savePath);

        } else {
          this.downloadedFile = event.body;
          this._setStatus('complete', {file: this.downloadedFile}, false);
        }
      }
    }, error => {
      this.cancelDownload();
      this._setStatus('error', error, false);
    });
  }

  public cancelDownload(): void {

    if (this._downloadRequest) {
      this._downloadRequest.unsubscribe();
      this._downloadRequest = null;
    }

    this.clearFile();

    this._setStatus('', null, false);
  }

  public clearFile(): void {

    if (this.downloadedFile) {
      this.downloadedFile = null;
    }
    this._setStatus('cleared', null, false);
  }


  // FILE SAVING

  private _saveFile(data: any, pathName: string):void {

    console.log('DOWNLOADER SAVE FILE', data);

    this._filesystemService.saveFile(data, null, pathName, function(result) {
      console.log(result);
    });
  }

  // STATUS

  private _setStatus(message: string, data?: object, active?: boolean): void {

    if (this.isActiveSubject.getValue() !== active) {
      this.isActiveSubject.next(active);
    }

    if (message !== '') {
      this._meta.next({label: message, data: data});
    } else {
      this._meta.next(new DownloaderStatus());
    }
  }
}
