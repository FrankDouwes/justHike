import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as GeoLib from 'geolib';
import { Waypoint } from '../type/waypoint';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  static injector: Injector;

  // behaviour subjects
  private _locationStatus:  BehaviorSubject<string>     = new BehaviorSubject<string>('idle');
  private _location:        BehaviorSubject<object>     = new BehaviorSubject<object>(undefined);

  // Observable streams
  public locationStatus:    Observable<string>  = this._locationStatus.asObservable();
  public location:          Observable<object>  = this._location.asObservable();

  // watcher
  private _locationWatcher:         number;
  private _previousLocation:        object;
  private _toggleStatus             = false;
  private _locationStatusLocal      = '';

  /* track user location and status:
      location = gps data > converted to Poi
      status = idle/fetching/tracking/stopping
   */

  constructor() {
    this.updateStatusLabel('idle');
  }

  // enable / disable location tracking
  toggleTracking(): void {

    this._toggleStatus = !this._toggleStatus;

    if (this._toggleStatus) {
      this.updateStatusLabel('fetching');
      this.trackLocation();
    } else {
      this.updateStatusLabel('stopping');
      this.stopTracking();
    }
  }

  private trackLocation(): void {
    if (navigator.geolocation) {
      this._locationWatcher = navigator.geolocation.watchPosition(
        this.parseLocation.bind(this),
        this.showTrackingErrors.bind(this)
      );
    } else {
      this.showTrackingErrors(null);
    }
  }

  private stopTracking(): void {
    navigator.geolocation.clearWatch(this._locationWatcher);
    this._location.next(undefined);
    this._previousLocation = null;
    this.updateStatusLabel('idle');
  }

  private parseLocation(location: Position): void {

    // only execute if location changed (optimisation)
    if (!this._previousLocation ||
      this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
      this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
      this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {

      this.updateLocation(location);
    }

    this._previousLocation = location;
  }

  private updateLocation(location: object): void {
    this._location.next(location);
    this.updateStatusLabel('tracking');
  }

  private showTrackingErrors(error): void {

    this.updateStatusLabel('error');

    // needs to show popup, telling user to enable gps on phone! TODO

    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occurred.');
        break;
    }
  }

  private updateStatusLabel(label: string): void {
    // prevent duplicates
    if (label !== this._locationStatusLocal) {
      this._locationStatusLocal = label;
      this._locationStatus.next(this._locationStatusLocal);
    }
  }
}
