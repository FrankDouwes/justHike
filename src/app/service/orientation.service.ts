import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* Orientation being compass orientation, not device, web standard doesn't work on android, cordova plugin does */
// TODO: research a better compass direction solution, as none seem to be compatible with the various devices (mainly android issues)
export class OrientationService {

  public orientationObserver: Observable<number>;

  private _orientation: BehaviorSubject<number> = new BehaviorSubject(null);
  private _orientationListener;

  constructor() {
    this.orientationObserver = this._orientation.asObservable();
  }

  public startTracking(): void {
    // if (navigator['compass']) {
    //   this._orientationListener = navigator['compass'].watchHeading(this._handleOrientation.bind(this), function (e) {
    //     console.log('ERROR', e);
    //   });
    // }
  }

  public stopTracking(): void {
    // if (navigator['compass']) {
    //   navigator['compass'].clearWatch(this._orientationListener);
    //   this._orientation.next(null);
    // }
  }

  private _handleOrientation(event): void {
    this._orientation.next(event.trueHeading);
  }

}
