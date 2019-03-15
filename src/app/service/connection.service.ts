import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {getConnection, hasConnection} from '../_util/cordova';

@Injectable({
  providedIn: 'root'
})

// TODO: online / offline doesn't seem to work reliably (and is slow), consider using another method/package
export class ConnectionService {

  private _connection: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public connectionObserver: Observable<boolean>;

  constructor() {
    this.connectionObserver = this._connection.asObservable();
  }

  public startTracking(): void {

    if (hasConnection()) {
      document.addEventListener('online', this._isOnline.bind(this), true);
      document.addEventListener('offline', this._isOffline.bind(this), true);
    }
  }

  public stopTracking(): void {
    if (hasConnection()) {
      document.removeEventListener('online', this._isOnline.bind(this), true);
      document.removeEventListener('offline', this._isOffline.bind(this), true);
      this._connection.next(null);
    }
  }

  public getConnectionInfo(): object {

    if (!hasConnection()) {
      return {state: 0, message: 'Unknown connection'};
    }

    const _connection = getConnection();
    const _navigator: any = navigator;
    const _networkState = _navigator.connection.type;

    const _states = {};
    _states[_connection.UNKNOWN]  = 'Unknown connection';
    _states[_connection.ETHERNET] = 'Ethernet connection';
    _states[_connection.WIFI]     = 'WiFi connection';
    _states[_connection.CELL_2G]  = 'Cell 2G connection';
    _states[_connection.CELL_3G]  = 'Cell 3G connection';
    _states[_connection.CELL_4G]  = 'Cell 4G connection';
    _states[_connection.CELL]     = 'Cell generic connection';
    _states[_connection.NONE]     = 'No network connection';

    alert('Connection type: ' + _states[_networkState]);

    return {state: _networkState, message: _states[_networkState]};
  }

  public getStatus(): string {

    if (!hasConnection()) {
      return 'unknown';
    }

    const _connection = getConnection();
    const _navigator: any = navigator;
    const _networkState = _navigator.connection.type;

    return (_networkState === _connection.NONE || _networkState === _connection.UNKNOWN)? 'offline' : 'online';
  }

  private _isOnline(event): void {

    // console.log('on', navigator.onLine);

    // console.log('online');
    //
    // // Handle the online event
    // const _navigator: any = navigator;
    // const _connection = getConnection();
    // var _networkState = _navigator.connection.type;
    //
    // if (_networkState !== _connection.NONE) {
      this._connection.next(true);
    // }
  }

  private _isOffline(event): void {

    // console.log('off', navigator.onLine);

    // console.log('offline');
    //
    // // Handle the online event
    // const _navigator: any = navigator;
    // const _connection = getConnection();
    // const _networkState = _navigator.connection.type;
    //
    // if (_networkState === _connection.NONE) {
      this._connection.next(false);
    // }
  }
}
