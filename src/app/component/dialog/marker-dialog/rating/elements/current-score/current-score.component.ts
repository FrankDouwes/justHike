import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Score} from '../../../../../../type/rating';

@Component({
  selector: 'rating-current-score',
  templateUrl: './current-score.component.html',
  styleUrls: ['./current-score.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentScoreComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() score: Score;
  @Input() update: number;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.update) {
      this._changeDetector.detectChanges();
    }
  }

  // turns 3.7 into ['x', 'x', 'x', '/', 'o'], can round to the nearest number
  public scoreArray(score: number, round: boolean): Array<string> {

    const _scoreArray: Array<string> = [];

    score = (round) ? Math.round(score) : score;

    for (let i = 0; i < 5; i++) {

      if (score > i) {
        if (score - i >= 1) {
          _scoreArray.push('x');
        } else {
          _scoreArray.push('/');
        }
      } else {
        _scoreArray.push('o');
      }
    }

    console.log(_scoreArray);

    return _scoreArray;
  }
}
