import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PoiType} from '../../../../type/poi';
import {RateService} from '../../../../service/rate.service';
import {Waypoint} from '../../../../type/waypoint';
import {Rating, Score} from '../../../../type/rating';
import {Subscription} from 'rxjs';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit, OnDestroy {

  @Input() poiTypes: Array<PoiType>;
  @Input() waypoint: Waypoint;

  public totalRating = 0;
  public state: 'current' | 'add' = 'current';
  public timestamp: number;
  public rateablePoiTypes: Array<PoiType> = [];

  private _ratings: object = {};
  private _ratingSubscriptions: Array<Subscription> = [];

  constructor(
    private _rateService: RateService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const _self = this;

    this.poiTypes.forEach(function(type: PoiType) {

      if (type.rateable) {

        _self.rateablePoiTypes.push(type);

        const _rating: Rating = _self._rateService.getRatingById(type.type, _self.waypoint);

        _self._ratings[type.type] = _rating;
        _self._ratingSubscriptions.push(_rating.ratingChangedObserver.subscribe(function(update: number){
          if (update !== -1) {
            _self.calculateTotalRating();
          }
        }));
      }
    });

    this.calculateTotalRating();
  }

  ngOnDestroy(): void {

    this._saveRating();

    // clear subscriptions
    this._ratingSubscriptions.forEach(function(subscription: Subscription) {
      subscription.unsubscribe();
      subscription = null;
    });

    this._ratingSubscriptions = null;

    // destroy ratings (as everything is stored in Score
    for (const key in this._ratings) {
      this._ratings[key].destroy();
    }

    this._ratings = null;
  }

  public onToggleClick(state: 'current' | 'add'): void {

    // TODO: check if gps is tracking
    // TODO: check within X miles
    
    this.state = state;
  }

  public calculateTotalRating(): void {

    let _ratingCount: number = 0;
    let _cummulativeScore: number = 0;

    for (const key in this._ratings) {
      _ratingCount ++;
      const _rating: Rating = this._ratings[key];
      _cummulativeScore += _rating.getRating();
    }

    this.totalRating = Number((_cummulativeScore / _ratingCount).toFixed(2));
  }

  public getAspect(type: string, aspect: string): Score {
    return this.getRating(type).getAspect(aspect);
  }

  public getRating(type: string): Rating {
    return this._ratings[type];
  }

  // when a user switches from 'your rating' to 'ratings', save the users rating
  private _saveRating(): void {

    const _ratingArray: Array<Rating> = [];

    for (const key in this._ratings) {
      _ratingArray.push(this._ratings[key]);
    }

    this._rateService.saveRatings(_ratingArray);
  }
}
