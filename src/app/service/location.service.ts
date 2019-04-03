import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { TrailGeneratorService } from './trail-generator.service';

// ionic capacitor
import {Waypoint} from '../type/waypoint';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  static injector: Injector;

  // behaviour subjects
  private _locationStatus:  BehaviorSubject<string>     = new BehaviorSubject<string>('idle');
  private _location:        BehaviorSubject<object>     = new BehaviorSubject<object>(undefined);
  private _centerUser:      BehaviorSubject<number>     = new BehaviorSubject<number>(0);

  // Observable streams
  public locationStatus:    Observable<string>  = this._locationStatus.asObservable();
  public location:          Observable<object>  = this._location.asObservable();
  public centerUser:        Observable<number>  = this._centerUser.asObservable();

  // watcher
  private _locationWatcher:         any;        // web uses number?
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
    this._updateStatusLabel('idle');
  }

  // enable / disable location tracking
  public toggleTracking(force: boolean = false): void {

    const _simulate: boolean = (this._localStorage.retrieve('simulatedMile') !== -1);

    this._toggleStatus = (!force) ? !this._toggleStatus : force;

    if (this._toggleStatus) {

      this._updateStatusLabel('fetching');

      if (_simulate) {
        this._stopTracking(true);
        this._simulateLocation();
      } else {
        this._trackLocation();
      }

    } else {
      this._updateStatusLabel('stopping');
      this._stopTracking();
    }
  }

  // simulate location
  private _simulateLocation(): void {
    this._parseLocation(this._localStorage.retrieve('simulatedMile'));
  }

  private _trackLocation(): void {

    const _watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 3000,
      requireAltitude: true
    };

    if (navigator.geolocation) {

      this._locationWatcher  = navigator.geolocation.watchPosition(
        this._parseLocation.bind(this),
        this._showTrackingErrors.bind(this),
        _watchOptions);
    } else {
      this._showTrackingErrors(null);
    }
  }

  private _stopTracking(simulate: boolean = false): void {

    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this._locationWatcher)

      this._centerUser.next(0);

      if (!simulate) {
        this._location.next(undefined);
        this._localStorage.store('simulatedMile', -1);
        this._previousLocation = null;
        this._updateStatusLabel('idle');
      }
    }
  }

  private _parseLocation(location: any): void {

    if (typeof location === 'number') {

      const _waypoints: Array<Waypoint> = this._trailGenerator.getTrailData().miles[Math.floor(location)].waypoints;

      let _nearestPoint: Waypoint = _waypoints[1];

      const _mileInMeters: number = location * environment.MILE;

      if (_mileInMeters >= _waypoints[_waypoints.length - 1].distanceTotal) {
        // this only applies to the last (incomplete) mile, if your total simulated distance is greater than the trail length, use last waypoint
        _nearestPoint = _waypoints[_waypoints.length - 1];
      } else {
        // find nearest 2 waypoints, find out which is closest
        for (var i = 0; i < _waypoints.length - 1; i++) {
          if (_waypoints[i].distanceTotal <= _mileInMeters && _waypoints[i + 1].distanceTotal >= _mileInMeters) {
            _nearestPoint = (Math.abs(_waypoints[i].distanceTotal - _mileInMeters) < Math.abs(_waypoints[i + 1].distanceTotal - _mileInMeters)) ? _waypoints[i] : _waypoints[i + 1];
            break;
          }
        }
      }

      location = {
        coords: {
          latitude: _nearestPoint.latitude,
          longitude: _nearestPoint.longitude,
          altitude: _nearestPoint.elevation,
        },
        timestamp: new Date().getTime()
      };

      this._updateLocation(location, true);

    } else if (location){

      // only execute if location changed (optimisation)
      if (!this._previousLocation ||
        this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
        this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
        this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {

        this._updateLocation(location);
      }

      this._previousLocation = location;
    }
  }

  private _updateLocation(location: object, simulate: boolean = false): void {
    this._location.next(location);
    this._updateStatusLabel('tracking');
  }

  private _showTrackingErrors(error): void {

    let _errorMessage;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        _errorMessage = 'User denied request.';
        break;
      case error.POSITION_UNAVAILABLE:
        _errorMessage = 'Location unavailable.';
        break;
      case error.TIMEOUT:
        _errorMessage = 'Location timeout.';
        break;
      case error.UNKNOWN_ERROR:
        _errorMessage = 'Unknown error.';
        break;
    }

    this._updateStatusLabel('error');
  }

  private _updateStatusLabel(label: string): void {
    // prevent duplicates
    if (label !== this._locationStatusLocal) {
      this._locationStatusLocal = label;
      this._locationStatus.next(this._locationStatusLocal);
    }
  }

  public onCenterUser(): void {
    if (this._locationStatus.value === 'tracking') {
      this._centerUser.next(new Date().getTime());
    }
  }
}
