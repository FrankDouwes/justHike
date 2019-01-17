import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { findNearestMileInTree } from '../_geo/geoCalc';

import { Waypoint } from '../type/waypoint';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  // subjects
  private _locationStatus:  Subject<string>     = new Subject<string>();
  private _location:        Subject<object>     = new Subject<object>();

  // Observable streams
  public locationStatus:    Observable<string>  = this._locationStatus.asObservable();
  public location:          Observable<object>  = this._location.asObservable();

  // watcher
  private _locationWatcher:         number;
  private _previousLocation:        Location;
  private _toggleStatus:            boolean     = false;
  private _locationStatusLocal:     string      = '';

  /* track user location and status:
      location = gps data
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
    this._location.next();
    this._previousLocation = null;
    this.updateStatusLabel('idle');
  }

  private parseLocation(location): void {

    // FIXED POSITION XXX
    const _tempLocation = {
      coords: {latitude: 33.257092, longitude: -116.615705, altitude: 3436.2532808398946, accuracy: 53, altitudeAccuracy: 1},
      timestamp: 1546899591215
    };
    location = _tempLocation;

    // only execute if location changed (optimisation)
    if (!this._previousLocation ||
      this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
      this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
      this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {

      // figure out the nearest mile
      const mileData = findNearestMileInTree(
        { latitude: location['coords']['latitude'],
          longitude: location['coords']['longitude'],
          elevation: location['coords']['altitude']} as Waypoint);

      location['mile'] = mileData;

      this.updateLocation(location);
    }

    this._previousLocation = location;
  }

  private updateLocation(location): void {
    this._location.next(location);
    this.updateStatusLabel('tracking');
  }

  private showTrackingErrors(error): void {

    this.updateStatusLabel('error');

    // needs to show popup, telling user to enable gps on phone! XXX

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
