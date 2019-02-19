import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { TrailGeneratorService } from './trail-generator.service';

// ionic capacitor
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

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
  private _locationWatcher:         any;        // web uses number, capacitor uses string?
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
    // simulate mile number
    this._parseLocation(this._localStorage.retrieve('simulatedMile'));
  }

  private _trackLocation(): void {

    const _self = this;

    const _watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 3000,
      requireAltitude: true
    };

    this._locationWatcher  = Geolocation.watchPosition(_watchOptions, (position, error) => {
      if (error) {
        _self._showTrackingErrors(error);
      } else {
        _self._parseLocation(position);
      }
    });

    // web version
    // if (navigator.geolocation) {
    //   this._locationWatcher = navigator.geolocation.watchPosition(
    //     this.parseLocation.bind(this),
    //     this.showTrackingErrors.bind(this)
    //   );
    // } else {
    //   this.showTrackingErrors(null);
    // }
  }

  private _stopTracking(simulate: boolean = false): void {

    Geolocation.clearWatch({id:this._locationWatcher});

    if (!simulate) {
      this._location.next(undefined);
      this._localStorage.store('simulatedMile', -1);
      this._previousLocation = null;
      this._updateStatusLabel('idle');
    }

    // web version
    // if (navigator.geolocation) {
    //   navigator.geolocation.clearWatch(this._locationWatcher);
    //
    //   if (!simulate) {
    //     this._location.next(undefined);
    //     this._localStorage.store('simulatedMile', -1);
    //     this._previousLocation = null;
    //     this._updateStatusLabel('idle');
    //   }
    // }
  }

  private _parseLocation(location: any): void {

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
}
