import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Rating, Score} from '../../../../../../type/rating';

@Component({
  selector: 'rating-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddScoreComponent implements OnInit {

  @Input() type: string;
  @Input() round: boolean;
  @Input() label: string;
  @Input() rating: Rating;

  public score: Score;
  public scoreArray: Array<string>;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.score = this.rating.getAspect(this.label);
    this.setScoreArray();
  }

  public setScore(event): void {

    let _newScore: number = (event.target.id !== 'wrapper') ? Number(event.target.id) + 1 : 0;
    const _currentScore: number = this.score.getUserScore();

    // toggle
    if (_newScore === _currentScore) {
      _newScore --;
    }

    // change score
    if (_newScore > 0) {
      this.rating.setAspectRating(this.label, _newScore);
    } else {
      this.rating.removeAspectRating(this.label);
    }

    this.setScoreArray();
    this._changeDetector.markForCheck();
  }

  // +1 the score
  public cycleScore(event): void {

    event.stopPropagation();
    event.stopImmediatePropagation();

    let _floorScore = Math.floor(this.score.getUserScore());

    if (_floorScore < 5) {

      _floorScore ++;
      this.rating.setAspectRating(this.label, _floorScore);

    } else {
      this.rating.removeAspectRating(this.label);
    }

    this.setScoreArray();
    this._changeDetector.detectChanges();
  }

  // turns 3.7 into ['x', 'x', 'x', '/', 'o'], can round to the nearest number
  public setScoreArray(): void {

    const _scoreArray: Array<string> = [];

    let _score = this.score.getUserScore();
    _score = (this.round) ? Math.round(_score) : _score;

    for (let i = 0; i < 5; i++) {

      if (_score > i) {
        if (_score - i >= 1) {
          _scoreArray.push('x');
        } else {
          _scoreArray.push('/');
        }
      } else {
        _scoreArray.push('o');
      }
    }

    this.scoreArray = _scoreArray;
  }
}
