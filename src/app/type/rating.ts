import {Waypoint} from './waypoint';
import {PoiType} from './poi';
import {getPoiTypeByType} from '../_util/poi';
import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';

export class Score {

  private _score: Array<number>  = [];      // max. the last 10 ratings
  private _count: number = 0;               // max. 10
  private _date: number;                    // if date is set, user has added a score.

  constructor(category: string, score: number = 0) {

    // set initial score
    if (score !== 0) {
      this._score.push(score);
      this._count = 1;
    }
  }

  public addToScore(rating: number, force: boolean = false) {

    // remove old user score
    if (this._date && !force) {
      this.removeFromScore();
    }

    // insert
    this._date = new Date().getTime();

    if (this._count < 10) {
      this._count ++;
    }

    this._score.push(rating);

    if (this._score.length > 10) {
      this._score.shift();
    }
  }

  public getScore(): number {

    let _total = 0;
    let _count = 0;

    for (let i = 0; i < this._score.length; i++) {

      const _multiplier = (1 + (i * 0.5));    // make more recent scores count more

      _total += (this._score[i] * _multiplier);
      _count += _multiplier;
    }

    return Number((_total / _count).toFixed(2));
  }

  public getUserScore(): number {

    if (this._date) {
      return this._score[this._score.length - 1];
    } else {
      return 0;
    }
  }

  public removeFromScore(): void {
    if (this._date) {
      this._score.pop();
      this._count --;
      this._date = null;
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

    this._type = type;
    this.id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);

    const _self = this;
    const _poiType: PoiType = getPoiTypeByType(this._type);

    if (!_poiType.rateable) {
      console.warn('trying to create a rating object for an unrateable type: ' + this._type);
      return;
    }

    _poiType.rateBy.forEach(function(aspect: string) {
      _self._aspects[aspect] = new Score(aspect);
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
}
