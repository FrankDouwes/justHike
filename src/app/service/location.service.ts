import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as GeoLib from 'geolib';

import {findNearestMileInTree, findNearestWaypointInMile} from '../_geo/geoCalc';

import { Waypoint } from '../type/waypoint';
import {Mile} from '../type/mile';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  // behaviour subjects see https://stackoverflow.com/questions/37174598/how-to-get-last-value-when-subscribing-to-an-observable
  private _locationStatus:  BehaviorSubject<string>     = new BehaviorSubject<string>("idle");
  private _location:        BehaviorSubject<object>     = new BehaviorSubject<object>(undefined);

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
    this._location.next(undefined);
    this._previousLocation = null;
    this.updateStatusLabel('idle');
  }

  private parseLocation(location): void {

    const _waypoint: Waypoint = {
      latitude: location['coords']['latitude'],
      longitude: location['coords']['longitude'],
      elevation: location['coords']['altitude']} as Waypoint;

    // only execute if location changed (optimisation)
    if (!this._previousLocation ||
      this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
      this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
      this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {

      // figure out the nearest mile
      const mileData = findNearestMileInTree(_waypoint);
      location['mile'] = mileData['mile'] as Mile;

      const _nearestWaypoint = findNearestWaypointInMile(_waypoint, location['mile'])[0];
      location['anchorPoint'] = location['mile'].waypoints[Number(_nearestWaypoint.key)];

      location['waypoint'] = _waypoint as Waypoint;
      location['waypoint'].distance = _nearestWaypoint.distance;

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

    console.log(label);
  }
}
