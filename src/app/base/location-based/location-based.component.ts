import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {LocationService} from '../../service/location.service';
import {User} from '../../type/user';
import {Waypoint} from '../../type/waypoint';
import {Mile} from '../../type/mile';
import {environment} from '../../../environments/environment.prod';
import {LocalStorageService} from 'ngx-webstorage';
import {TrailGeneratorService} from '../../service/trail-generator.service';
import {FilesystemService} from '../../service/filesystem.service';
import {sortByKey} from '../../_util/generic';

@Component({
  selector: 'app-location-based',
  templateUrl: './location-based.component.html',
  styleUrls: ['./location-based.component.sass']
})
export class LocationBasedComponent implements OnInit, OnDestroy {

  @ViewChild('container') container;

  public locationService:                   LocationService;
  public localStorage:                      LocalStorageService;
  public trailGenerator:                    TrailGeneratorService;
  public fileSystem:                        FilesystemService;

  public status:                            string;
  public user:                              User;
  public timestamp:                         number;

  private _locationSubscription:            Subscription;
  private _locationStatusSubscription:      Subscription;
  private _centerUserSubscription:          Subscription;
  private _user:                            User;

  constructor() {

    // since we're extending this class, we shouldn't inject through the constructor props
    if (LocationService.injector) {
      this.locationService = LocationService.injector.get(LocationService);
      this.localStorage = LocationService.injector.get(LocalStorageService);
      this.trailGenerator = LocationService.injector.get(TrailGeneratorService);
      this.fileSystem = LocationService.injector.get(FilesystemService);
    }

    this.timestamp = new Date().getTime();

    // create default user
    this._user = this.createBlankUser();
  }



  // TEST FUNCTIONS

  private _hikeMile(mileId: number): void {

    const _self = this;
    const _steps = this.trailGenerator.getTrailData().miles[mileId].waypoints;
    let _stepCount = 0;

    const _interval = setInterval(function() {

      if (_stepCount < _steps.length) {

        const _location = {
          coords: {
            accuracy: 0,
            altitude:  _steps[_stepCount].elevation,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
            latitude: _steps[_stepCount].latitude,
            longitude: _steps[_stepCount].longitude
          },
          timestamp: new Date().getTime()
        };

        _stepCount ++;

        _self._onLocationChange(_location as Position);

      } else {
        clearInterval(_interval);
      }
    }, 4000);

  }



  // LIFECYCLE

  ngOnInit() {

    // why attempt location based stuff if there's no location service?
    if (!this.locationService) {
      // throw new Error('location service error!');
      return;
    }

    // set up subscriptions
    this._locationSubscription = this.locationService.location.subscribe(
      location => {
        if (location) {
          // this._hikeMile(2);
          this._onLocationChange(location as Position);
        }
      });

    this._locationStatusSubscription = this.locationService.locationStatus.subscribe(
      status => {
        this.status = status;
        this.onStatusChange(status);
      });

    this._centerUserSubscription = this.locationService.centerUser.subscribe(trigger => {
      if (trigger !== 0) {
        this.centerOnUser();
      }
    })
  }

  ngOnDestroy() {

    this._locationSubscription.unsubscribe();
    this._locationStatusSubscription.unsubscribe();
    this._centerUserSubscription.unsubscribe();
  }




  // EVENTS

  private _onLocationChange(location: object): void {

    if (location && this.status !== 'idle') {

      // SET USER

      // waypoint
      this._user.waypoint = {
        latitude: location['coords']['latitude'],
        longitude: location['coords']['longitude'],
        elevation: location['coords']['altitude']} as Waypoint;

      // mile
      let _waypoint: object = this.trailGenerator.findNearestPointInMileTree(this._user.waypoint, 1)[0];
      const _mile: Mile = this.trailGenerator.getTrailData().miles[_waypoint['belongsTo']];

      console.log(_waypoint);

      console.log(_waypoint['belongsTo']);
      this._user.nearestMileId = _mile.id;

      // anchorPoint
      const _nearestAnchorPoint = _waypoint;
      this._user.anchorPoint = _mile.waypoints[_nearestAnchorPoint['key']];

      // distance
      this._user.waypoint.distance = _nearestAnchorPoint['distance'];

      //toggle warning / mile simulator
      if (this._user.waypoint.distance > this.localStorage.retrieve('maxPoiDistance')
        && this.localStorage.retrieve('simulatedMile') === -1 && !this.localStorage.retrieve('disableSimulation')) {

        const _event: CustomEvent = new CustomEvent(
          'offtrail',
          {
            bubbles: true,
            cancelable: true,
            detail: {
              distance: this._user.waypoint.distance,
              anchorPointDistance: (this._user.anchorPoint.distanceTotal / environment.MILE).toFixed(2),
              trailLength: this.trailGenerator.getTrailData().miles.length
            }
          });

        if (this.container) {
          if (this.container.nativeElement) {
            this.container.nativeElement.dispatchEvent(_event);
          }
        }

      } else {

        this.user = JSON.parse(JSON.stringify(this._user)) as User;
        this.timestamp = location['timestamp'];
        this.onUserLocationChange(this.user);
      }
    }
  }

  public onStatusChange(status: string): void {
    // OVERRIDE
  }

  public onUserLocationChange(user: User): void {
    // OVERRIDE
  }

  public centerOnUser(): void {
    // OVERRIDE
  }


  // OTHER

  public createBlankUser(): User {
    return {
      type: 'user',
      waypoint: undefined,
      anchorPoint: undefined,
      distance: 0,
      nearestMileId: 0,
      id: -1
    } as User;
  }

}
