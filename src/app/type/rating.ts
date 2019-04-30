import {Waypoint} from './waypoint';
import {PoiType} from './poi';
import {getPoiTypeByType} from '../_util/poi';
import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';


// maintains a score based on the last 10 inputs
export class Score {

  // need to be public for database POST
  public timestamp: number;               // if date is set, user has added a score
  public score: Array<number>  = [];      // max. the last 10 ratings
  public count = 0;                       // max. 10
  public aspect: string;                  // the 'aspect' (scoreable property within rating. 'flow', 'quality' etc.)
  public belongsTo: string;               // the ID (waypoint) of a rating this score belongs to
  public userId?: string;                 // UUID (TODO: v2, accounts)

  constructor(belongsTo: string, aspect: string, score: number = 0) {

    this.belongsTo = belongsTo;
    this.aspect = aspect;

    // set initial score
    if (score !== 0) {
      this.score.push(score);
      this.count = 1;
    }

    this.timestamp = 0;
  }

  public addToScore(rating: number, force: boolean = false) {

    // remove old user score
    if (this.timestamp && !force) {
      this.removeFromScore();
    }

    // insert
    this.timestamp = new Date().getTime();

    if (this.count < 10) {
      this.count ++;
    }

    this.score.push(rating);

    if (this.score.length > 10) {
      this.score.shift();
    }
  }

  public getScore(): number {

    let _total = 0;
    let _count = 0;

    for (let i = 0; i < this.score.length; i++) {

      const _multiplier = (1 + (i * 0.5));    // make more recent scores count more

      _total += (this.score[i] * _multiplier);
      _count += _multiplier;
    }

    return Number((_total / _count).toFixed(2));
  }

  public getUserScore(): number {

    if (this.timestamp) {
      return this.score[this.score.length - 1];
    } else {
      return 0;
    }
  }

  public removeFromScore(): void {
    if (this.timestamp) {
      this.score.pop();
      this.count --;
      this.timestamp = 0;
    }
  }
}




export class Rating {

  public id?:               string;             // id = type_lat_lng
  public unsynced?:         boolean;            // (optional) locally stored but still has to be pushed online
  public date:              number;             // last rating

  public ratingChangedObserver: Observable<number>;

  private _aspects:          Object = {};        // you can rate different aspects (water: flow / quality / ease of use)
  private _rating:  number;
  private _ratingChangedSubject: BehaviorSubject<number>;
  private _type: string;

  constructor(type: string, location: Waypoint) {

    const _self = this;

    this._type = type;
    this.id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    const _poiType: PoiType = getPoiTypeByType(this._type);

    if (!_poiType.rateable) {
      console.warn('trying to create a rating object for an unrateable type: ' + this._type);
      return;
    }

    _poiType.rateBy.forEach(function(aspect: string) {
      _self._aspects[aspect] = new Score(_self.id, aspect);
      console.log('setup aspect', aspect);
    });

    this._ratingChangedSubject = new BehaviorSubject(-1);
    this.ratingChangedObserver = this._ratingChangedSubject.asObservable().pipe(share());

    this.calculateRating();
  }

  public destroy(): void {
    if (this.ratingChangedObserver) {
      this.ratingChangedObserver = null;
      this._ratingChangedSubject = null;
    }
  }

  // updates the user rating within the rating object,
  // sets the new total value
  public setAspectRating(aspect: string, rating: number, force: boolean = false): void {
    this._aspects[aspect].addToScore(rating, force);
    this.calculateRating();
  }

  public removeAspectRating(aspect: string): void {
    this._aspects[aspect].removeFromScore();
    this.calculateRating();
  }

  public calculateRating(): void {

    let _aspectCount = 0;
    let _cummulativeScore = 0;

    for (const key in this._aspects) {

      const _rating: Score = this._aspects[key];
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

  public getAspect(name: string): Score {
    return this._aspects[name];
  }

  public getAspects(): Array<Score> {

    const _returnArray: Array<Score> = [];

    for (const key in this._aspects) {

      const _score: Score = this._aspects[key];
      if (_score.timestamp !== 0) {
        _returnArray.push(this._aspects[key])
      }
    }

    return _returnArray;
  }
}
