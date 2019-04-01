import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { getExtensionFromString } from './file';
import { FilesystemService } from '../service/filesystem.service';

// file downloader
// TODO: resume download, or check if file exists > skip
// sets type using file extension, currently supports json & blob (zip)
// supports multiple files for a single downloader (zip parts, due to size limitations on mobile)
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
  public isActiveSubject:             BehaviorSubject<boolean>              = new BehaviorSubject<boolean>(false);

  private _meta:                      BehaviorSubject<DownloaderStatus>     = new BehaviorSubject<DownloaderStatus>(new DownloaderStatus());
  private _downloadRequest:           Subscription;
  private _fileType:                  string;

  private _urls:                      Array<string>;     // allow sequential downloading
  private _paths:                     Array<string>;
  private _cache:                     boolean;
  private _completedFiles:            number = 0;        // TODO: write this to storage so I can create a resume download function
  private _hasParts:                  boolean;

  constructor(
    private _filesystemService:       FilesystemService,
    private _httpClient:              HttpClient
  ) {

    // setup status subscription
    this.meta  = this._meta.asObservable().pipe(share());
  }

  // allows multipart file downloading
  private _sequencer(): void {

    // this._urls.splice(0, 1);
    // this._paths.splice(0, 1);

    if (this._downloadRequest) {
      this._downloadRequest.unsubscribe();
      this._downloadRequest = null;
    }

    this._completedFiles += 1;

    if (this._urls.length > this._completedFiles) {
      this.downloadFile(this._urls, this._cache, this._paths);
    } else {
      this._setStatus('downloader', 'complete', null, false);
    }
  }

  // converts string to array if needed
  private _setupPaths(urls, paths): any {

    if (!this._urls && !this._paths) {
      if (typeof urls === 'string') {
        this._hasParts = false;
        this._paths = [paths];
        this._urls = [urls];
      } else {
        this._hasParts = true;
        this._paths = paths;
        this._urls = urls;
      }
    }

    return {url: this._urls[this._completedFiles], path: this._paths[this._completedFiles]}
  }

  // savePath is the location to save the file, blank == no save, allows renaming (so 'download.zip' can be saved as 'DEMO/test-file.zip')
  // zips will always be unzipped, .zip will be deleted afterwards.
  // multipart files (tiles_0.zip, tiles_1.zip etc) will be unzipped in the same directory based on filename part (in this case 'tiles')
  public downloadFile(urls: string | Array<string>, cache: boolean = true, path: any = null): Observable<any> {

    const _paths = this._setupPaths(urls, path);

    this._cache = cache;

    this._setStatus('http', 'initialize', null, true);

    const _extension = getExtensionFromString(_paths.url);

    this._fileType = (_extension === 'json') ? _extension : 'blob';

    let _headers = new HttpHeaders();
    _headers = _headers.append('Content-Type', 'application/json; charset=utf-8');

    if (!cache) {
      _headers = _headers.append('Cache-Control', 'no-cache');
      _headers = _headers.append('Pragma', 'no-cache');
      _paths.url += '?' + (Math.random() * Number.MAX_VALUE);
    }

    // download file
    const req = new HttpRequest('GET', _paths.url, {
      reportProgress: true,
      headers: _headers,
      responseType: this._fileType
    });

    this.downloadedFile = null;

    const downloadObservable = this._httpClient.request(req);
    this._downloadRequest = downloadObservable.subscribe(event => {

      console.log(event);

      if (event.type === HttpEventType.DownloadProgress) {

        let _downloadPercentage = (event.loaded / event.total) * 100;

        const _completedPerc = (this._completedFiles / this._urls.length) * 100;
        _downloadPercentage = Number((_completedPerc + (_downloadPercentage / this._urls.length)).toFixed(2));

        const _fileSize = Number(event.total);

        this._setStatus('http', 'progress', {percentage: _downloadPercentage, fileSize: _fileSize}, true);

      } else if (event instanceof HttpResponse) {

        this.downloadedFile = event.body;
        this._setStatus('http', 'complete', {file: this.downloadedFile}, (_paths.path !== null));

        if (_paths.path) {
          this._saveFile(event.body, _paths.path);
        } else {
          this._sequencer();
          console.log('downloaded file available');
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

  // clear all files related to this downloader (including unzipped multipart files)
  public clearFile(): void {

    const _self = this;

    if (this.downloadedFile) {
      this.downloadedFile = null;
    }

    if (this._paths && this._completedFiles > 0) {

      this._paths.forEach(function (path, index) {

        if (index < _self._completedFiles) {

          // _self._filesystemService.deleteFile(path);

          // multiple parts are all extracted in the same directory, therefor this will only have to run once
          if (index === 0) {

            const _extension = getExtensionFromString(path);

            // if we're dealing with a zip, we'll have to remove the unzipped directory
            if (_extension === 'zip') {

              const _seperator = (_self._hasParts) ? '_' : '.';
              const _directory = path.split(_seperator)[0] + '/';

              _self._filesystemService.deleteDirectory(_directory, function (result) {
                console.log('delete dir', result);
              });
            }
          }
        }
      });
    }

    this._completedFiles = 0;

    this._setStatus('downloader', 'cleared', null, false);
  }

  // STATUS

  private _setStatus(type: string, message: string, data?: object, active?: boolean): void {

    // console.log(type, message, data, active);

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
        _self._sequencer();
      }
    });
  }

  private _unzipFile(pathName: string): void {

    const _self = this;

    const _observer = this._filesystemService.unzip(pathName, this._hasParts).subscribe(function(result: object) {

      if (result['state'] === 'complete') {

        _observer.unsubscribe();
        _self._sequencer();

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
