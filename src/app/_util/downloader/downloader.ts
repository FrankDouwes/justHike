import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {share} from 'rxjs/operators';
import {getExtensionFromString} from '../file';
import {LocalStorageService} from 'ngx-webstorage';
import {DownloaderStatus, DownloaderStatusManager} from './status-manager';
import {DownloadParser} from './parser';
import {FilesystemService} from '../../service/filesystem.service';

class FileReference {
  url: string;
  path: string;

  constructor(url: string, path: string) {
    this.url = url;
    this.path = path;
  }
}


/* file downloader
sets type using file extension, currently supports json & blob (zip)
supports multiple files for a single downloader (zip parts, due to size limitations/freezing on mobile)
has save / unzip / delete file (for zips)
has resume download function (for multipart files)
TODO: should probably be an uploader too... */
export class Downloader {

  public meta:                        Observable<DownloaderStatus>;    // the downloader service observes this
  public downloadedFile:              any;                   // only available if file is not being saved
  public status:                      DownloaderStatusManager;
  private _parser:                    DownloadParser;
  private readonly _metaSubject:      BehaviorSubject<DownloaderStatus>;

  private _downloadRequest:           Subscription;
  private _fileType:                  string;

  private _urls:                      Array<string>;     // allow sequential downloading
  private _paths:                     Array<string>;
  private _cache:                     boolean;
  private _completedFiles             = 0;
  private _hasParts:                  boolean;

  constructor(
    private _name:                    string,
    private _filesystemService:       FilesystemService,
    private _httpClient:              HttpClient,
    private _localStorageService:     LocalStorageService,
  ) {

    // setup meta subscription
    this._metaSubject = new BehaviorSubject<DownloaderStatus>(null);
    this.meta = this._metaSubject.asObservable().pipe(share());

    this.status = new DownloaderStatusManager(this._metaSubject);
    this._parser = new DownloadParser(_filesystemService, this.status);
  }

  // allows multipart file downloading
  private _sequencer(): void {

    if (this._downloadRequest) {
      this._downloadRequest.unsubscribe();
      this._downloadRequest = null;
    }

    this._completedFiles += 1;

    if (this._hasParts) {
      this._localStorageService.store(this._name + '_filesDownloaded', this._completedFiles);
    }

    if (this._urls.length > this._completedFiles) {
      this.downloadFile(this._urls, this._cache, this._paths);
    } else {
      if (this._hasParts) {
        this._localStorageService.clear(this._name + '_filesDownloaded');
      }
      this.status.setStatus(new DownloaderStatus('downloader', 'complete', null), false);
    }
  }

  // returns the first/next file reference to download based on completed downloads (for multipart)
  // converts string to array if needed
  private _setupPaths(urls, paths): FileReference {

    const _storedCompletedCount: number = this._localStorageService.retrieve(this._name + '_filesDownloaded');
    if (_storedCompletedCount && _storedCompletedCount > this._completedFiles) {
      this._completedFiles = _storedCompletedCount;
    }

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

    return new FileReference(this._urls[this._completedFiles], this._paths[this._completedFiles]);
  }

  // savePath is the location to save the file, blank == no save, allows renaming (so 'download.zip' can be saved as 'DEMO/test-file.zip')
  // zips will always be unzipped, .zip will be deleted afterwards.
  // multipart files (tiles_0.zip, tiles_1.zip etc) will be unzipped in the same directory based on filename part (in this case 'tiles')
  public downloadFile(urls: string | Array<string>, cache: boolean = true, path?: string | Array<string>): Observable<HttpEvent<any>> {

    const _self = this;
    const _path: FileReference = this._setupPaths(urls, path);

    this._cache = cache;

    this.status.setStatus(new DownloaderStatus('http', 'initialize', null), true);

    const _extension = getExtensionFromString(_path.url);

    this._fileType = (_extension === 'json') ? _extension : 'blob';

    // TODO: research on cloud storage caching/headers
    // https://cloud.google.com/storage/docs/gsutil/addlhelp/WorkingWithObjectMetadata

    // let _headers = new HttpHeaders();
    // if (_extension === 'json') {
    //   _headers = _headers.append('Content-Type', 'application/json; charset=utf-8');
    // } else {
    //   _headers = _headers.append('Content-Type', 'application/zip;');
    // }
    //
    // if (!cache) {
    //   _headers = _headers.append('Cache-Control', 'no-cache');
    //   _headers = _headers.append('Pragma', 'no-cache');
    //   _paths.url += '?' + (Math.random() * Number.MAX_VALUE);
    // }

    // download file
    const req = new HttpRequest('GET', _path.url, {
      reportProgress: true,
      // headers: _headers,
      responseType: this._fileType
    });

    this.downloadedFile = null;

    const _downloadObservable = this._httpClient.request(req);
    this._downloadRequest = _downloadObservable.subscribe(event => {

      if (event.type === HttpEventType.DownloadProgress) {

        let _downloadPercentage = (event.loaded / event.total) * 100;

        const _completedPerc = (this._completedFiles / this._urls.length) * 100;
        _downloadPercentage = Number((_completedPerc + (_downloadPercentage / this._urls.length)).toFixed(2));

        const _fileSize = Number(event.total);

        this.status.setStatus(new DownloaderStatus('http', 'progress', {percentage: _downloadPercentage, fileSize: _fileSize}), true);

      } else if (event instanceof HttpResponse) {

        this.downloadedFile = event.body;
        this.status.setStatus(new DownloaderStatus('http', 'complete', {file: this.downloadedFile}), (_path.path !== null));

        if (!_path.path) {

          // downloader complete
          this._sequencer();
          console.log('downloaded file available');

        } else {
          // save
          this._parser.saveFile(event.body, _path.path, this._hasParts, this._fileType, function(result) {

            // filesystem complete
            _self.status.setStatus(new DownloaderStatus('filesystem', result, null), true);
            _self._sequencer();
          });
        }
      }
    }, error => {
      this.cancelDownload();
      this.status.setStatus(new DownloaderStatus('downloader', 'error', error), false);
    });

    return _downloadObservable;
  }

  public cancelDownload(): void {

    if (this._downloadRequest) {
      this._downloadRequest.unsubscribe();
      this._downloadRequest = null;
    }

    this.clearFile();

    if (this._hasParts) {
      this._localStorageService.clear(this._name + '_filesDownloaded');
    }

    // blank status
    this.status.setStatus(new DownloaderStatus('downloader', '', null), false);
  }

  // clear all files related to this downloader (including unzipped multipart files)
  public clearFile(): void {

    if (this.downloadedFile) {
      this.downloadedFile = null;
    }

    this._parser.clearFile(this._paths, this._completedFiles, this._hasParts);

    this._completedFiles = 0;

    this.status.setStatus(new DownloaderStatus('downloader', 'cleared', null), false);
  }
}
