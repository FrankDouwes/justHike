import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Downloader } from '../_util/downloader';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import {FilesystemService} from './filesystem.service';

@Injectable({
  providedIn: 'root'
})

export class DownloadService {

  // Downloader manager
  // creates separate downloaders for files that continue when components are removed
  // has a global state (isDownloading), to see if there are still active processes

  private _downloaders = {};
  private _observers = {};
  private _states = {};
  private _isDownloading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isDownloadingSubscription: Observable<boolean>;

  constructor(
    private _fileSystemService: FilesystemService,
    private _httpClient: HttpClient
  ) {

    this.isDownloadingSubscription  = this._isDownloading.asObservable().pipe(share());
  }

  // create a new downloader or return existing based on name
  public createDownloader(name: string): Downloader {

    let _dl: Downloader = this._downloaders[name];

    if (!_dl) {
      _dl = new Downloader(this._fileSystemService, this._httpClient);
      this._downloaders[name] = _dl;
      this._addStatusObserver(name, _dl);
    }

    return _dl;
  }

  public clearDownloaders(force: boolean = false): void {

    this._updateGlobalStatus();

    if (this._isDownloading.getValue() && !force) {

      throw new Error('Still Downloading!!!');

    } else {

      for (const key in this._downloaders) {

        let _dl: Downloader = this._downloaders[key];
        _dl.cancelDownload();
        _dl = null;

        let _ob: Subscription = this._observers[key]
        _ob.unsubscribe();
        _ob = null;
      }

      this._downloaders = {};
      this._observers = {};
      this._states = {};
    }
  }

  private _addStatusObserver(name: string, downloader: Downloader): void {

    // observe status
    const _downloadState: Subscription = downloader.meta.subscribe(
      status => {
          this._updateGlobalStatus();
      });

    this._states[name] = downloader.isActiveSubject;
    this._observers[name] = _downloadState;
  }

  private _updateGlobalStatus(): void {

    let _newState = false;

    for (const key in this._states) {

      const _statusSubject: BehaviorSubject<boolean> = this._states[key];

      if (_statusSubject.getValue() === true) {
        _newState = true;
      }
    }

    if (this._isDownloading.getValue() !== _newState) {
      this._isDownloading.next(_newState);
    }
  }
}
