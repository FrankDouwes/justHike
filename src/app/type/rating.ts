import {Waypoint} from './waypoint';
import {PoiType} from './poi';
import {getPoiTypeByType} from '../_util/poi';
import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {getUUID} from '../_util/cordova';

// score
export interface Score {

  // need to be public for database POST
  timestamp: number;               // if date is set, user has added a score
  score: number;                   // max. the last 10 ratings
  aspect: string;                  // the 'aspect' (scoreable property within rating. 'flow', 'quality' etc.)
  belongsTo: string;               // the ID (waypoint) of a rating this score belongs to
  userId?: string;                 // UUID (TODO: v2, accounts)
  unsynced?: boolean;              // (optional) locally stored but still has to be pushed online
  dbId?: string;                   // firebase database id
}

// maintains a total score based on the last 10 inputs
export class TotalScore {

  public userScore: Score;                  // if set, the user has rated;

  private _scores: Array<number> = [];      // max. the last 10 ratings
  private _count = 0;                       // max. 10
  private _aspect: string;                  // the 'aspect' (scoreable property within rating. 'flow', 'quality' etc.)
  private _belongsTo: string;               // the ID (waypoint) of a rating this score belongs to

  constructor(belongsTo: string, aspect: string, scores?: Array<Score>) {

    this._belongsTo = belongsTo;
    this._aspect = aspect;

    this._setScore(scores);

    console.log(this);
  }

  private _setScore(scores: Array<Score>) {

    if (scores) {

      const _length = scores.length;
      const _UUID = getUUID();

      for (let i = 0; i < _length; i++) {

        const _score: Score = scores[i];
        this._scores.push(_score.score);

        // set user score ref
        if (_score.userId === _UUID) {
          this.userScore = _score;
        }

        this._count ++;
      }
    }
  }

  public addToScore(score: number, force: boolean = false) {

    // without forcing a user can only have a single score
    if (this.userScore && !force) {

      this.userScore.score = score;
      this.userScore.unsynced = true;
      this.userScore.timestamp = new Date().getTime();
      this.removeUserScore(false);

    } else {
      this.userScore = {
        aspect: this._aspect,
        belongsTo: this._belongsTo,
        score: score,
        timestamp: new Date().getTime(),
        unsynced: true,
        userId: getUUID()
      }

      if (this._count < 10) {
        this._count++;
      }

    }

    this._scores.push(this.userScore.score);

    if (this._scores.length > 10) {
      this._scores.shift();
    }
  }

  public getScore(): number {

    let _total = 0;
    let _count = 0;

    for (let i = 0; i < this._scores.length; i++) {

      const _multiplier = (1 + (i * 0.5));    // make more recent scores count more

      _total += (this._scores[i] * _multiplier);
      _count += _multiplier;
    }

    return Number((_total / _count).toFixed(2));
  }

  public getUserScore(): number {

    if (this.userScore) {
      return this.userScore.score;
    } else {
      return 0;
    }
  }

  public removeUserScore(clearUserScoreObj: boolean = true): void {
    if (this.userScore) {

      const _userScroreIndex = this._scores.indexOf(this.userScore.score);
      this._scores.splice(_userScroreIndex, 1);

      if (clearUserScoreObj) {
        this.userScore = null;
      }
      this._count--;
    }
  }
}

export class Rating {

  public id?:               string;             // id = type_lat_lng
  public date:              number;             // last rating

  public ratingChangedObserver: Observable<number>;

  private _aspects:         Object = {};        // you can rate different aspects (water: flow / quality / ease of use)
  private _rating:          number;
  private _ratingChangedSubject: BehaviorSubject<number>;
  private _type:            string;

  constructor(type: string, location: Waypoint, scores?: Array<Score>) {

    const _self = this;

    this._type = type;
    this.id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    const _poiType: PoiType = getPoiTypeByType(this._type);

    if (!_poiType.rateable) {
      console.warn('trying to create a rating object for an unrateable type: ' + this._type);
      return;
    }

    _self._setTotalScores(scores, _poiType.rateBy);

    this.setupObserver();

    this.calculateRating();
  }

  public destroy(): void {
    if (this.ratingChangedObserver) {
      this.ratingChangedObserver = null;
      this._ratingChangedSubject = null;
    }
  }

  public setupObserver(): void {

    if (!this.ratingChangedObserver) {
      this._ratingChangedSubject = new BehaviorSubject(-1);
      this.ratingChangedObserver = this._ratingChangedSubject.asObservable().pipe(share());
    }
  }

  // sort scores by aspect
  private _setTotalScores(scores: Array<Score>, aspects: Array<string>): void {

    let aspectCount = 0;

    if (scores) {

      const _aspectsTypeCollection: Object = {};
      const _length = scores.length;
      for (let i = 0; i < _length; i++) {

        const _score: Score = scores[i];

        if (!_aspectsTypeCollection[_score.aspect]) {
          _aspectsTypeCollection[_score.aspect] = [];
        }

        _aspectsTypeCollection[_score.aspect].push(_score);
      }

      // create total scores based on the aspects provided by scores
      for (const key in _aspectsTypeCollection) {
        this._aspects[key] = new TotalScore(this.id, key, _aspectsTypeCollection[key]);
        aspectCount ++;
      }
    }

    // create blank total scores
    if (aspects.length !== aspectCount) {

      aspects.forEach((aspect: string) => {
        if (!this._aspects.hasOwnProperty(aspect)) {
          this._aspects[aspect] = new TotalScore(this.id, aspect);
        }
      })
    }
  }

  // updates the user rating within the total score object
  // sets the new total value
  public setAspectRating(aspect: string, rating: number, force: boolean = false): void {

    const _curAspect: TotalScore = this._aspects[aspect];
    _curAspect.addToScore(rating, force);

    this.calculateRating();
  }

  public calculateRating(): void {

    let _aspectCount = 0;
    let _cummulativeScore = 0;

    for (const key in this._aspects) {

      const _rating: TotalScore = this._aspects[key];
      const _aspectScore = _rating.getScore() || 0;

      if (_aspectScore) {
        _aspectCount ++;
        _cummulativeScore += _aspectScore;
      }
    }

    this._rating = Number((_cummulativeScore / _aspectCount).toFixed(2)) || 0;

    // trigger
    this._ratingChangedSubject.next(new Date().getTime());
  }

  public getRating(): number {
    return this._rating;
  }

  public getAspect(name: string): TotalScore {
    return this._aspects[name];
  }

  public getAspects(): Array<TotalScore> {

    const _returnArray: Array<TotalScore> = [];

    for (const key in this._aspects) {
      _returnArray.push(this._aspects[key]);
    }

    return _returnArray;
  }
}
