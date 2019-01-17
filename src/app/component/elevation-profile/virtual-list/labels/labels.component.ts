import {Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
import {OHLC} from '../../../../type/ohlc';
import {normalizeElevation} from '../../../../_util/math';
import {Settings} from '../../../../settings';
import {interpolateColors} from '../../../../_util/color';

@Component({
  selector: 'axis',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass']
})
export class LabelsComponent implements OnInit {

  @Input() visibleOHLC: OHLC;
  @Input() guides: Array<object>;

  public processedGuides: Array<object> = [];

  private _container: ElementRef;

  constructor(_element: ElementRef) {
    this._container = _element;
  };

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

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

      this.guides.forEach(function (guide, index) {

        let elevation: number = normalizeElevation(_self._container.nativeElement.clientHeight, guide['elevation'], min, range, Settings.LINEHEIGHT);

        // if item already exists, update
        if (_self.processedGuides[index]) {

          _self.processedGuides[index]['label'] = guide['label'];
          _self.processedGuides[index]['offset'] = elevation + 1;
          _self.processedGuides[index]['range'] = guide['range'];
        }

        // else add
        else {

          _self.processedGuides.push(
            {
              label: guide['label'],
              offset: elevation + 1,      // +1 for guide line height
              range: guide['range']
            });
        }

      });
    }
  }













}
