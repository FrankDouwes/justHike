import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {getConnection, hasConnection} from '../_util/cordova';
import {BaseComponent} from '../base/base/base.component';

@Injectable({
  providedIn: 'root'
})

// TODO: online / offline doesn't seem to work reliably (and is slow), consider using another method/package
export class ConnectionService extends BaseComponent {

  private _connection: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public connectionObserver: Observable<boolean>;
  public state: string = 'unknown';

  constructor() {
    super();
    this.connectionObserver = this._connection.asObservable();
  }

  public startTracking(): void {

    console.log(window);
    this.addEventListener(window, ['online', 'offline'], this._toggleConnection.bind(this), true);
    this._toggleConnection();
  }

  public stopTracking(): void {
    this.removeEventListener(window, ['online', 'offline']);
    this._connection.next(null);
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

    // alert('Connection type: ' + _states[_networkState]);

    return {state: _networkState, message: _states[_networkState]};
  }

  public getStatus(): string {

    if (!hasConnection()) {
      return 'unknown';
    }

    // cordova navigator
    const _connection = getConnection();
    const _navigator: any = navigator;
    const _networkState = _navigator.connection.type;

    return (_networkState === _connection.NONE || _networkState === _connection.UNKNOWN)? 'offline' : 'online';
  }

  private _toggleConnection(event?: Event): void {

    const _isOnline: boolean = navigator.onLine;

    if (this._connection.getValue() !== _isOnline) {
      this.state = (_isOnline) ? 'online' : 'offline';
      this._connection.next(_isOnline);
    }
  }
}
