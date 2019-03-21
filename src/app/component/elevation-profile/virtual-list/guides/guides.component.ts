import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { OHLC } from '../../../../type/ohlc';
import { interpolateColors } from '../../../../_util/color';
import { normalizeElevation } from '../../../../_util/math';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GuidesComponent implements OnInit, OnChanges {

  @Input() visibleOHLC: OHLC;
  @Input() guides: Array<object>;

  public processedGuides: Array<object> = [];

  private _container: ElementRef;

  constructor(_element: ElementRef) {
    this._container = _element;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

    if (this.visibleOHLC) {

      // remove unused guides
      if (this.guides.length < this.processedGuides.length) {
       this.processedGuides.splice(this.processedGuides.length - this.guides.length, this.processedGuides.length - this.guides.length);
      }

      const min: number = this.visibleOHLC.low;   // high point
      const max: number = this.visibleOHLC.high;  // low point
      const range = (max - min);

      const _colors: Array<string> = interpolateColors('rgb(187, 97, 0)', 'rgb(62, 125, 158)', this.guides.length);

      const _self = this;

      const _guidesLength = this.guides.length;

      // loop, optimal
      for (let i = 0; i < _guidesLength; i++) {

        const _guide = this.guides[i];

        const elevation: number = normalizeElevation(_self._container.nativeElement.clientHeight
          , _guide['elevation'], min, range, environment.LINEHEIGHT);

        // if item already exists, update
        if (_self.processedGuides[i]) {

          _self.processedGuides[i]['offset'] = elevation;
          _self.processedGuides[i]['range'] = _guide['range'];
          _self.processedGuides[i]['color'] = 'rgba(' + String(_colors[i]) + ',0.5)';
        } else {

          _self.processedGuides.push(
            {
              offset: elevation,
              range: _guide['range'],
              color: 'rgba(' + String(_colors[i]) + ',0.5)'

            });
        }
      }
    }
  }
}
