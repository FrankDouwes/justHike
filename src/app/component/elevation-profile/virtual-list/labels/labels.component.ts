import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { OHLC } from '../../../../type/ohlc';
import { normalizeElevation } from '../../../../_util/math';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LabelsComponent implements OnInit, OnChanges {

  @Input() visibleOHLC: OHLC;
  @Input() guides: Array<object>;

  public processedGuides: Array<object> = [];

  private _container: ElementRef;

  constructor(_element: ElementRef) {
    this._container = _element;
  };

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

    if (this.visibleOHLC) {

      // draw labels

      // remove unused guides
      if (this.guides.length < this.processedGuides.length) {
        this.processedGuides.splice(this.processedGuides.length - this.guides.length, this.processedGuides.length - this.guides.length);
      }

      let min: number = this.visibleOHLC.low;   // high point
      let max: number = this.visibleOHLC.high;  // low point
      let range = (max - min);

      var _self = this;

      const _guidesLength = this.guides.length;

      // loop, optimal
      for (let i = 0; i < _guidesLength; i++) {

        const _guide = this.guides[i];

        const elevation: number = normalizeElevation(_self._container.nativeElement.clientHeight
          , _guide['elevation'], min, range, environment.LINEHEIGHT);

        // if item already exists, update
        if (_self.processedGuides[i]) {

          _self.processedGuides[i]['label'] = _guide['label'];
          _self.processedGuides[i]['offset'] = elevation + 1;
          _self.processedGuides[i]['range'] = _guide['range'];
        }

        // else add
        else {

          _self.processedGuides.push(
            {
              label: _guide['label'],
              offset: elevation + 1,      // +1 for guide line height
              range: _guide['range']
            });
        }

      }
    }
  }
}
