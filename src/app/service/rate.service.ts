import {Injectable, OnDestroy} from '@angular/core';
import {Waypoint} from '../type/waypoint';
import {Rating, Score} from '../type/rating';
import {concat, Observable, of, Subscription} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {TrailGeneratorService} from './trail-generator.service';
import {HttpClient} from '@angular/common/http';
import {getUUID} from '../_util/cordova';

@Injectable({
  providedIn: 'root'
})


// Ratings for ratable poi types
// ratings are stored on local storage and online
// TODO: check the actual filesize of the data stored locally, if large, possibly save to filesystem instead
// TODO: very much WIP!

export class RateService implements OnDestroy {

  private _lastUpdated = 0;               // TODO: needs to be stored/fetched
  private _hasInternet = true;

  private _localRatings: Array<Rating>;      // all ratings for the current trail

  private _activeTrailSubscription: Subscription;
  private _activeTrailAbbr: string;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    private _http: HttpClient) {}

  // LIFECYCLE

  ngOnDestroy(): void {
    this._activeTrailSubscription.unsubscribe();
    this._activeTrailSubscription = null;
  }

  // requires active trail meta data (runs after loading/parsing trail
  // - 1. upload all data that needs uploading (offline mode etc.)
  // - 2. download all new data since last update (TODO: this needs to be limited to the last 10 scores per belongsTo)
  public setup(): void {

    const _self = this;

    this._activeTrailAbbr = this._trailGenerator.getTrailData().abbr;
    this._lastUpdated = this._localStorage.retrieve(this._activeTrailAbbr + '_ratings' + '-lastUpdated') || 0;

    this._lastUpdated -= 1000000;

    let runCount = 0;

    const _scoreUpdateObservables = this.syncRatingsForTrail();
    let _scoreUpdateLength = 1;
    if (Array.isArray(_scoreUpdateObservables)) {
      _scoreUpdateLength = _scoreUpdateObservables['length'];
    }

    // run in sequence
    concat(
      _scoreUpdateObservables,
      this._getRatingsOnline()
    ).subscribe(function(result) {

      if (runCount === _scoreUpdateLength) {

        _self._lastUpdated = new Date().getTime();
        _self._localStorage.store(_self._activeTrailAbbr + '_ratings-lastUpdated', _self._lastUpdated);
      } else {
        runCount ++;
      }
    });
  }


  // gets/sets all ratings, since it's a (mostly) offline app, deals with both online/offline files and syncs everything
  public syncRatingsForTrail(): Array<Observable<Object>> | Observable<Object> {

    // get locally stored data
    this._localRatings = this._localStorage.retrieve(this._activeTrailAbbr + '_ratings') || [];

    if (this._hasInternet && this._localRatings.length !== -1) {

      const _localUpdates = this._checkForUnsynced();

      if (_localUpdates) {

        const _postArray: Array<Observable<Object>> = [];

        const _url: string = 'https://just-hike.firebaseio.com/rating/' + this._activeTrailAbbr + '.json';
        const _length = _localUpdates.length;
        for (let i = 0; i < _length; i++) {
          _postArray.push(this._http.post(_url, {test: 'test123'}));
        }

        return _postArray;

      } else {

        return of(null);
      }

    } else {

      return of(null);
    }
  }

  // whenever a user rates something
  public saveRatings(ratings: Rating | Array<Rating>): void {

    if (!Array.isArray(ratings)) {
      ratings = [ratings];
    }

    const _length = ratings.length;

    for (let i = 0; i < _length; i++) {

      const _rating: Rating = ratings[i];
      const _aspects: Array<Score> = _rating.getAspects();

      const _aspectLength = _aspects.length;
      for (let j = 0; j < _aspectLength; j++) {

        // incorportae a UUID
        const _UUID = getUUID();
        _aspects[j].userId = _UUID;
        this._saveScoreOnline(_aspects[j]);
      }
    }
  }


  // gets a rating from local storage
  // there's no need to make a separate online call here
  // as the app mostly runs in offline mode and syncRatingsForTrail() is called once the app goes online
  // this way the ratings stay reasonably up to date.
  public getRatingById(type: string, location: Waypoint, create: boolean = true): Rating {

    const _trailAbbr: string = this._trailGenerator.getTrailData().abbr;

    const _id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    let _rating: Rating;

    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].id === _id) {
        _rating = this._localRatings[i];
        break;
      }
    }

    if (!_rating && create) {
      _rating = new Rating(type, location);
    }

    return _rating;
  }

  // get all updated/new ratings online for trail
  // this will fetch 'Score' objects that have a 'belongTo' field with a waypointId
  private _getRatingsOnline(): Observable<Object> {

    const _since = this._lastUpdated;
    const _trailAbbr = this._activeTrailAbbr;

    const _url: string = 'https://just-hike.firebaseio.com/score/' + _trailAbbr + '.json' +
      '?orderBy="timestamp"' +
      '&startAt=' + _since + '';

    return this._http.get(_url);
  }

  // markForUpdate means the data still has to be pushed online (but can't be as there is currently no internet)
  private _saveRatingsLocally(ratings: Rating | Array<Rating>, markForUpdate: boolean = false): Observable<string> {

    if (ratings instanceof Rating) {
      ratings = [ratings as Rating];
    }

    const _length = (ratings as Array<Rating>).length;
    for (let i = 0; i < _length ; i++) {

      const _rating = ratings[i];

      if (markForUpdate) {
        _rating.unsynced = true;
      }

      this._setRatingLocally(_rating);
      // progress
    }

    // write everything to local storage
    this._writeToLocalStorage();

    // done
    return new Observable();
  }

  // check if there are local updates that need to be synced online
  private _checkForUnsynced(): Array<Rating> {

    if (!this._localRatings || this._localRatings.length === -1) {
      return;
    }

    const _ratings = [];
    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].unsynced) {
        _ratings.push(this._localRatings[i]);
      }
    }

    return (_ratings.length > 0) ? _ratings : undefined;
  }

  // sets or updates local rating
  private _setRatingLocally(rating: Rating): void {

    let _ratingIndex = -1;

    // check if rating already exists
    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].id === rating.id) {
        _ratingIndex = i;
        break;
      }
    }

    // change rating in local ratings
    if (_ratingIndex !== -1) {
      this._localRatings[_ratingIndex] = rating;
    } else {
      this._localRatings.push(rating);
    }
  }

  private _saveScoreOnline(score: Score): void {

    console.log('WRITING TO ONLINE DB!');

    const _trailAbbr: string = this._trailGenerator.getTrailData().abbr;
    const _url: string = 'https://just-hike.firebaseio.com/score/' + _trailAbbr + '.json';

    this._http.post(_url, score).subscribe(
      function(test) {
        console.log(test);
      }
    );
  }

  private _writeToLocalStorage(): void {
    this._localStorage.store(this._activeTrailAbbr + '_ratings', this._localRatings);
  }
}
