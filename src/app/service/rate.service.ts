import {Injectable, OnDestroy} from '@angular/core';
import {Waypoint} from '../type/waypoint';
import {Rating, Score} from '../type/rating';
import {concat, Observable, of, Subscription} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {TrailGeneratorService} from './trail-generator.service';
import {HttpClient} from '@angular/common/http';
import {cloneData, isObjectEmpty} from '../_util/generic';
import {ConnectionService} from './connection.service';

@Injectable({
  providedIn: 'root'
})


// Ratings are combined Scores, a water-source (rateable) can be rated on multiple aspects (providing Scores)
export class RateService implements OnDestroy {

  private _lastUpdated = 0;
  private _hasInternet = false;

  private _localScores: Array<Score> = [];         // all scores (aspects of rating)
  private _localRatings: Array<Rating> = [];  // all ratings for the current trail

  private _activeTrailAbbr: string;

  private _connectionSubscription: Subscription;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    private _connectionService: ConnectionService,
    private _http: HttpClient) {
  }

  // LIFECYCLE

  ngOnDestroy(): void {
    this._connectionSubscription.unsubscribe();
    this._connectionSubscription = null;
  }

  // requires active trail meta data (runs after loading/parsing trail
  // - 1. upload all data that needs uploading (offline mode etc.)
  // - 2. download all new data since last update
  // (TODO: this needs to be limited to the last 10 scores per belongsTo, firebase cloud functions...)
  public setup(): void {

    const _self = this;

    this._activeTrailAbbr = this._trailGenerator.getTrailData().abbr;
    this._lastUpdated = this._localStorage.retrieve(this._activeTrailAbbr + '_scores-lastUpdated') || 0;

    this._localScores = this._localStorage.retrieve(this._activeTrailAbbr + '_scores') || [];
    this._connectionSubscription = this._connectionService.connectionObserver.subscribe(function(result) {

      // internet just became available
      if (result !== _self._hasInternet && result === true) {
        _self._hasInternet = result;
        _self._syncData();
      } else {
        _self._hasInternet = result;
      }

    });
  }

  private _syncData(): void {

    const _self = this;
    let runCount = 0;

    const _scoreUpdateObservables = this.sendAllScores();
    let _scoreUpdateLength = 1;
    if (Array.isArray(_scoreUpdateObservables)) {
      _scoreUpdateLength = _scoreUpdateObservables['length'];
    }

    // run in sequence
    let _updateSubscription = concat(
      _scoreUpdateObservables,
      this._getRatingsOnline()
    ).subscribe(function(result) {

      if (runCount === _scoreUpdateLength) {

        // if new scores have been downloaded, parse them
        if (result && !isObjectEmpty(result)) {

          const resultArray: Array<Score> = Object.keys(result).map(function(key) {

            if (!result[key].dbId && result[key].userId) {
              result[key].dbId = key;     // set the firebase id so we can PUT instead of POST to update a users comment
            }

            return result[key];
          });

          _self._localScores = _self._localScores.concat(resultArray);
          _self._writeToLocalStorage();
        }

        // done getting updates / save timestamp & self destruct
        _self._lastUpdated = new Date().getTime();
        _self._localStorage.store(_self._activeTrailAbbr + '_scores-lastUpdated', _self._lastUpdated);
        _updateSubscription.unsubscribe();
        _updateSubscription = null;
      } else {
        runCount ++;
      }
    });
  }


  // gets/sets all ratings, since it's a (mostly) offline app, deals with both online/offline files and syncs everything
  public sendAllScores(): Array<Observable<Object>> | Observable<Object> {

    // get locally stored data
    this._localScores = this._localStorage.retrieve(this._activeTrailAbbr + '_scores') || [];

    if (this._hasInternet && this._localScores.length !== -1) {

      const _localUpdates = this._checkForUnsynced();

      if (_localUpdates) {

        const _postArray: Array<Observable<Object>> = [];

        const _url: string = 'https://just-hike.firebaseio.com/' + this._activeTrailAbbr + '/score.json';
        const _length = _localUpdates.length;

        for (let i = 0; i < _length; i++) {

          const _scoreClone: Score = cloneData(_localUpdates[i]) as Score;

          const _updateObservable: Observable<object> = this._http.post(_url, _scoreClone);
          _updateObservable.subscribe(function(result) {
            _localUpdates[i].unsynced = null;
          });

          _postArray.push(_updateObservable);
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
  public saveRatings(scores: Score | Array<Score>): void {

    if (this._hasInternet) {
      const _scoreObservers: Array<Observable<object>> = [];

      if (!Array.isArray(scores)) {
        scores = [scores];
      }

      const _length = scores.length;

      for (let i = 0; i < _length; i++) {

        const _scoreQuery = this._saveScoreOnline(scores[i]);

        if (_scoreQuery) {
          _scoreObservers.push(_scoreQuery);
        }
      }

      let count = 0;
      concat(_scoreObservers).subscribe((result) => {

        count++;
        if (count === _scoreObservers.length) {
          this._writeToLocalStorage();
        }
      })
    } else {
      this._writeToLocalStorage();
    }
  }


  // creates a Rating object, which houses aspects (Scores) that are locally/externally saved.
  // there's no need to make a separate online call here
  // as the app mostly runs in offline mode and syncRatingsForTrail() is called once the app goes online
  // this way the ratings stay reasonably up to date.
  public getRatingById(type: string, location: Waypoint, create: boolean = true): Rating {

    const _id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    let _rating: Rating;

    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].id === _id) {
        _rating = this._localRatings[i];
        _rating.setupObserver();    // important as they're being destroyed
        break;
      }
    }

    if (!_rating && create) {
      _rating = new Rating(type, location, this._getScoresForRating(type, location));
      this._localRatings.push(_rating);
    }

    return _rating;
  }

  private _getScoresForRating(type: string, location: Waypoint): Array<Score> {

    const id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    let _ratingScoresArray: Array<Score>;

    const _length = this._localScores.length;
    for (let i = 0; i < _length; i++) {

      const _score: Score = this._localScores[i];
      if (_score.belongsTo === id) {

        if (!_ratingScoresArray) {
          _ratingScoresArray = [];
        }
        _ratingScoresArray.push(_score);
      }
    }

    return _ratingScoresArray;
  }

  // get all updated/new ratings online for trail
  // this will fetch 'Score' objects that have a 'belongTo' field with a waypointId
  private _getRatingsOnline(): Observable<Object> {

    let _since = this._lastUpdated || 0;
    const _trailAbbr = this._activeTrailAbbr;

    const _url: string = 'https://just-hike.firebaseio.com/' + _trailAbbr + '/score.json' +
      '?orderBy="timestamp"' +
      '&startAt=' + _since + '';

    return this._http.get(_url);
  }

  // check if there are local Scores that need to be synced online (marked unsynced)
  private _checkForUnsynced(): Array<Score> {

    if (!this._localScores || this._localScores.length === -1) {
      return;
    }

    const _scores = [];

    this._deleteZeroScores();

    const _length = this._localScores.length;

    for (let i = 0; i < _length; i++) {
      if (this._localScores[i].unsynced) {
        if (this._localScores[i].score === 0) {
          console.log('zero score found, BUG!');
        } else {
          _scores.push(this._localScores[i]);
        }
      }
    }

    return (_scores.length > 0) ? _scores : undefined;
  }

  private _deleteZeroScores(): void {

    const _length = this._localScores.length;
    let _deletedScores = 0;

    for (let i = 0; i < _length; i++) {
      if (this._localScores[i - _deletedScores].score === 0) {
        this._localScores.splice(i - _deletedScores, 1);
        _deletedScores ++;
      }
    }
  }


  private _saveScoreOnline(score: Score): Observable<object> {

    const _self = this;
    let _duplicate: Score = cloneData(score) as Score;
    _duplicate.unsynced = null;

    const _trailAbbr: string = this._trailGenerator.getTrailData().abbr;
    const _url: string = 'https://just-hike.firebaseio.com/' + _trailAbbr + '/score';
    const _urlEnd: string = '.json';

    let _scoreQuery: Observable<object>;

    if (_duplicate.dbId && _duplicate.score > 0) {

      // we're updating
      _scoreQuery = this._http.put(_url + '/' + _duplicate.dbId + _urlEnd, _duplicate);
    } else if (_duplicate.dbId) {

      // deleting 0 score
      _scoreQuery = this._http.delete(_url + '/' + _duplicate.dbId + _urlEnd);
    } else if (_duplicate.score > 0) {

      // posting new
      _scoreQuery = this._http.post(_url + _urlEnd, _duplicate);
    } else {

      // score with a 0 value that doesn't exist online, delete
      score = null;
      return;
    }

    let _sub = _scoreQuery.subscribe(
      function(result) {

        score.unsynced = null;

        if (!score.dbId) {
          score.dbId = result['name'];
        }

        if (result === null) {
          _self._localScores.splice(_self._localScores.indexOf(score), 1);
          score = null;
        }

        _sub.unsubscribe();
        _sub = null;
      }
    );

    _duplicate = null;
    return _scoreQuery;
  }

  private _writeToLocalStorage(): void {
    this._localStorage.store(this._activeTrailAbbr + '_scores', this._localScores);
  }
}
