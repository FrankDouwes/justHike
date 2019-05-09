import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {PoiType} from '../../../../type/poi';
import {RateService} from '../../../../service/rate.service';
import {Waypoint} from '../../../../type/waypoint';
import {Rating, Score, TotalScore} from '../../../../type/rating';
import {Subscription} from 'rxjs';
import {LocationBasedComponent} from '../../../../base/location-based/location-based.component';
import {waypointToLatLng} from '../../../../_util/leaflet/converter';
import {environment} from '../../../../../environments/environment.prod';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent extends LocationBasedComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('ratingPanel') ratingPanel: ElementRef;
  @Input() poiTypes: Array<PoiType>;
  @Input() waypoint: Waypoint;
  @Input() update: number;

  public totalRating = 0;
  public state: 'current' | 'add' = 'current';
  public timestamp: number;
  public rateablePoiTypes: Array<PoiType>;

  private _ratings: object;
  private _ratingSubscriptions: Array<Subscription>;
  private _disableDistanceCheck: boolean;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _rateService: RateService,
    private _localStorage: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {

    super.ngOnInit();

    this._setup();
  }

  private _setup(): void {

    this.rateablePoiTypes = [];
    this._ratings = {};
    this._ratingSubscriptions = [];

    const _self = this;

    this._disableDistanceCheck = this._localStorage.retrieve('disableDistanceCheck');

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

  ngOnChanges(changes: SimpleChanges): void {

    // reload component
    if (changes.update && changes.update.previousValue) {
      this._clear();
      this._setup();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._clear();
  }

  private _clear(): void {
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

    // you're only allowed to rate if you're nearby (4.5 miles)
    if (state === 'add' && !this._disableDistanceCheck) {
      if (this.status !== 'tracking' && !this.user) {
        this.ratingPanel.nativeElement.classList.add('warn');
        this.ratingPanel.nativeElement.classList.add('warn-gps');
      } else {
        const _distance = geolib.getDistance(waypointToLatLng(this.waypoint), waypointToLatLng(this.user.waypoint));
        if (_distance > (environment.MILE * 4.5)) {
          this.ratingPanel.nativeElement.classList.add('warn');
          this.ratingPanel.nativeElement.classList.add('warn-distance');
        }
      }
    } else if (!this._disableDistanceCheck) {

      this._saveRating();
      this.ratingPanel.nativeElement.classList.remove('warn');
      this.ratingPanel.nativeElement.classList.remove('warn-gps');
      this.ratingPanel.nativeElement.classList.remove('warn-distance');
    }

    this.state = state;
  }

  public calculateTotalRating(): void {

    // TODO: BUG: rating not always adding up to total...

    let _ratingCount = 0;
    let _cumulativeScore = 0;

    for (const key in this._ratings) {
      const _rating: Rating = this._ratings[key];
      const _rScore = _rating.getRating();

      if (_rScore !== 0) {
        _ratingCount ++;
        _cumulativeScore += _rating.getRating();
      }
    }

    this.totalRating = Number((_cumulativeScore / _ratingCount).toFixed(2)) || 0;
  }

  public getAspect(type: string, aspect: string): TotalScore {
    console.log('get aspect');
    return this.getRating(type).getAspect(aspect);
  }

  public getRating(type: string): Rating {
    return this._ratings[type];
  }

  // when a user switches from 'your rating' to 'ratings' (or when closing the dialog), save the users rating
  private _saveRating(): void {

    const _scoreArray: Array<Score> = [];

    for (const key in this._ratings) {

      const _rating: Rating = this._ratings[key];

      const _aspects: Array<TotalScore> = _rating.getAspects();
      for (let j = 0; j < _aspects.length; j++) {
        const _totalScore: TotalScore = _aspects[j];
        if (_totalScore.userScore && _totalScore.userScore.unsynced && _totalScore.userScore.score) {
          _scoreArray.push(_totalScore.userScore);
        }
      }
    }

    this._rateService.saveRatings(_scoreArray);
  }
}
