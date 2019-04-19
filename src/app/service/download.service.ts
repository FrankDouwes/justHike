import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Downloader } from '../_util/downloader/downloader';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { FilesystemService } from './filesystem.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

// Downloader manager
// creates separate downloaders for files that continue when components are removed
// has a global state (isDownloading), to see if there are still active processes
export class DownloadService {

  public isDownloadingObservable: Observable<boolean>;

  private _downloaders = {};
  private _observers = {};
  private _states = {};
  private _isDownloading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _fileSystemService: FilesystemService,
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {

    this.isDownloadingObservable  = this._isDownloading.asObservable().pipe(share());
  }

  // create a new downloader or return existing based on name
  public createDownloader(name: string): Downloader {

    let _dl: Downloader = this._downloaders[name];

    if (!_dl) {
      _dl = new Downloader(name, this._fileSystemService, this._httpClient, this._localStorageService);
      this._downloaders[name] = _dl;
      this._addStatusObserver(name, _dl);
    }

    return _dl;
  }

  public clearDownloaders(trailAbbr?: string, force: boolean = false): void {

    this._updateGlobalStatus();

    if (this._isDownloading.getValue() && !force) {

      alert('Trying to cancel actively running downloads, use force!');
      return;

    } else {

      let _downloadersToClear = {};

      if (trailAbbr) {

        // only cancel/clear downloaders for trail
        for (const key in this._downloaders) {

          if (key.includes(trailAbbr)) {
            _downloadersToClear[key] = this._downloaders[key];
          }
        }

      } else {
        // clear all
        _downloadersToClear = this._downloaders;
      }

      for (const key in _downloadersToClear) {

        let _dl: Downloader = this._downloaders[key];
        _dl.cancelDownload();
        _dl = null;

        let _ob: Subscription = this._observers[key];
        _ob.unsubscribe();
        _ob = null;
      }

      if (!trailAbbr) {
        this._downloaders = {};
        this._observers = {};
        this._states = {};
      }
    }
  }

  private _addStatusObserver(name: string, downloader: Downloader): void {

    // observe status
    const _downloadState: Subscription = downloader.meta.subscribe(
      status => {
          this._updateGlobalStatus();
      });

    this._states[name] = downloader.status.isActiveSubject;
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
