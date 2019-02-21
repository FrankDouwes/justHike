import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';

// file downloader
// has type (for json/blob etc)
// has caching (for large files)

export class DownloaderStatus {
  label: string;
  data: object;
}

export class Downloader {

  public meta:                        Observable<DownloaderStatus>;
  public downloadedFile:              any;
  public isActiveSubject:             BehaviorSubject<boolean>    = new BehaviorSubject<boolean>(false);

  private _meta:                      BehaviorSubject<DownloaderStatus>     = new BehaviorSubject<DownloaderStatus>(new DownloaderStatus());
  private _downloadRequest:           Subscription;

  constructor(
    private _httpClient:              HttpClient
  ) {

    // setup status subscription
    this.meta  = this._meta.asObservable().pipe(share());
  }

  public downloadFile(url: string, type: string, cache: boolean = true): void {

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
      responseType: type
    });


    this._downloadRequest = this._httpClient.request(req).subscribe(event => {

      if (event.type === HttpEventType.DownloadProgress) {

        const _downloadPercentage = Number(((event.loaded / event.total) * 100).toFixed(2));
        const _fileSize = Number(event.total);

        this._setStatus('downloading', {percentage: _downloadPercentage, fileSize: _fileSize}, true);

      } else if (event instanceof HttpResponse) {
        console.log(event);
        this.downloadedFile = event.body;
        this._setStatus('complete', {file: this.downloadedFile}, false);
      }
      // TODO error handling
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
