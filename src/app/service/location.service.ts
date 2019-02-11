import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {Waypoint} from '../type/waypoint';
import {TrailGeneratorService} from './trail-generator.service';

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
      holds a mile tree (centerpoints per mile, for nearest trail location)
      status = idle/fetching/tracking/stopping */

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService
  ) {
    this.updateStatusLabel('idle');
  }

  // enable / disable location tracking
  public toggleTracking(force: boolean = false): void {

    const _simulate: boolean = (this._localStorage.retrieve('simulatedMile') !== -1);

    this._toggleStatus = (!force) ? !this._toggleStatus : force;

    if (this._toggleStatus) {

      this.updateStatusLabel('fetching');

      if (_simulate) {
        this.stopTracking(true);
        this.simulateLocation();
      } else {
        this.trackLocation();
      }

    } else {
      this.updateStatusLabel('stopping');
      this.stopTracking();
    }
  }

  // simulate location
  private simulateLocation(): void {
    // simulate mile number
    this.parseLocation(this._localStorage.retrieve('simulatedMile'));
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

  private stopTracking(simulate: boolean = false): void {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this._locationWatcher);

      if (!simulate) {
        this._location.next(undefined);
        this._localStorage.store('simulatedMile', -1);
        this._previousLocation = null;
        this.updateStatusLabel('idle');
      }
    }
  }

  private parseLocation(location: any): void {

    if (typeof location === 'number') {

      // get first waypoints of mile
      const _firstWaypoint = this._trailGenerator.trailData.miles[location].waypoints[0];

      location = {
        coords: {
          latitude: _firstWaypoint.latitude,
          longitude: _firstWaypoint.longitude,
          altitude: _firstWaypoint.elevation,
        },
        timestamp: new Date().getTime()
      };

      this.updateLocation(location, true);

    } else if (location){

      // only execute if location changed (optimisation)
      if (!this._previousLocation ||
        this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
        this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
        this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {

        this.updateLocation(location);
      }

      this._previousLocation = location;
    }
  }

  private updateLocation(location: object, simulate: boolean = false): void {
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
