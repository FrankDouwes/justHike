import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { getExtensionFromString } from './file';
import { FilesystemService } from '../service/filesystem.service';

// file downloader
// sets type using file extension, currently supports json & blob (zip)
// has caching (for large files)
// has save / unzip / delete file (for zips)
// if file needs unzipping download progress will be 2/3, unzipping will be 1/3 of progress total
export class DownloaderStatus {
  type: string;       // http, filesystem or downloader (which are generic complete/error messages).
  label: string;
  data: any;
}

export class Downloader {

  public meta:                        Observable<DownloaderStatus>;
  public downloadedFile:              any;      // only available if file is not being saved
  public isActiveSubject:             BehaviorSubject<boolean>    = new BehaviorSubject<boolean>(false);

  private _meta:                      BehaviorSubject<DownloaderStatus>     = new BehaviorSubject<DownloaderStatus>(new DownloaderStatus());
  private _downloadRequest:           Subscription;
  private _fileType:                  string;

  constructor(
    private _filesystemService:       FilesystemService,
    private _httpClient:              HttpClient
  ) {

    // setup status subscription
    this.meta  = this._meta.asObservable().pipe(share());
  }

  // savePath is the location to save the file, blank == no save, allows renaming (so 'download.zip' can be saved as 'DEMO/test-file.zip')
  public downloadFile(url: string, cache: boolean = true, savePath: string = null): Observable<any> {

    this._setStatus('http', 'initialize', null, true);

    const _extension = getExtensionFromString(url);

    this._fileType = (_extension === 'json') ? _extension : 'blob';

    let _headers = new HttpHeaders();
    _headers = _headers.append('Content-Type', 'application/json; charset=utf-8');

    if (!cache) {
      _headers = _headers.append('Cache-Control', 'no-cache');
      _headers = _headers.append('Pragma', 'no-cache');
      url += '?' + (Math.random() * Number.MAX_VALUE);
    }

    // download file
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
      headers: _headers,
      responseType: this._fileType
    });


    const downloadObservable = this._httpClient.request(req);
    this._downloadRequest = downloadObservable.subscribe(event => {

      if (event.type === HttpEventType.DownloadProgress) {

        let _downloadPercentage = Number(((event.loaded / event.total) * 100).toFixed(2));

        if (savePath && this._fileType === 'blob') {
          _downloadPercentage *= 0.66;
        }

        const _fileSize = Number(event.total);

        this._setStatus('http', 'progress', {percentage: _downloadPercentage, fileSize: _fileSize}, true);

      } else if (event instanceof HttpResponse) {

        this.downloadedFile = event.body;
        this._setStatus('http', 'complete', {file: this.downloadedFile}, (savePath !== null));

        if (savePath) {
          this._saveFile(event.body, savePath);
        } else {
        }
      }
    }, error => {
      this.cancelDownload();
      this._setStatus('downloader', 'error', error, false);
    });

    return downloadObservable;
  }

  public cancelDownload(): void {

    if (this._downloadRequest) {
      this._downloadRequest.unsubscribe();
      this._downloadRequest = null;
    }

    this.clearFile();

    this._setStatus('downloader', '', null, false);
  }

  public clearFile(): void {

    if (this.downloadedFile) {
      this.downloadedFile = null;
    }

    // TODO: delete saved files (also unzipped directories)

    this._setStatus('downloader', 'cleared', null, false);
  }

  // STATUS

  private _setStatus(type: string, message: string, data?: object, active?: boolean): void {

    console.log(type, message, data, active);

    if (this.isActiveSubject.getValue() !== active) {
      this.isActiveSubject.next(active);
    }

    if (message !== '') {
      this._meta.next({type: type, label: message, data: data});
    } else {
      this._meta.next(new DownloaderStatus());
    }
  }

  // FILE SAVING
  private _saveFile(data: any, pathName: string):void {

    const _self = this;

    if (!this._filesystemService.root) {
      alert('No file system available, unable to save files.');
      this._setStatus('filesystem', 'error', null, false);
      return;
    }

    this._setStatus('filesystem', 'initialize', null, true);
    this._filesystemService.saveFile(data, null, pathName, function(result) {

      _self._setStatus('filesystem', 'complete', null, true);

      if (_self._fileType === 'blob') {
        _self._unzipFile(pathName);
      } else {
        _self._setStatus('filesystem', 'complete', null, true);
      }
    });
  }

  private _unzipFile(pathName: string): void {

    const _self = this;

    const _observer = this._filesystemService._unzip(pathName).subscribe(function(result: object) {

      if (result['state'] === 'complete') {

        _self._setStatus('downloader', 'complete', null, false);
        _observer.unsubscribe();

      } else if (result['state'] === 'progress') {

        _self._setStatus('filesystem', 'progress', {percentage: (result['percentage'] * 0.33) + 66}, true);

      } else if (result['message'] === 'error') {

        // error, clear
        _self._setStatus('filesystem', 'error', null, false);
        _observer.unsubscribe();
        _self.cancelDownload();
      }
    });
  }
}
