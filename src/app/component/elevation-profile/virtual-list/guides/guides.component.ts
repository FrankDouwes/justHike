import {Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
import {OHLC} from '../../../../type/ohlc';
import {interpolateColors} from '../../../../_util/color';
import {normalizeElevation} from '../../../../_util/math';
import {Settings} from '../../../../settings';

@Component({
  selector: 'guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.sass']
})
export class GuidesComponent implements OnInit {

  @Input() visibleOHLC: OHLC;
  @Input() guides: Array<object>;

  public processedGuides:Array<object> = [];

  private _container: ElementRef;

  constructor(_element: ElementRef) {
    this._container = _element;
  };

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    if (this.visibleOHLC) {

      // remove unused guides
      if (this.guides.length < this.processedGuides.length) {
       this.processedGuides.splice(this.processedGuides.length - this.guides.length, this.processedGuides.length - this.guides.length);
      }

      let min: number = this.visibleOHLC.low;   // high point
      let max: number = this.visibleOHLC.high;  // low point
      let range = (max- min);

      let _colors: Array<string> = interpolateColors("rgb(187, 97, 0)", "rgb(62, 125, 158)", this.guides.length);

      var _self = this;

      this.guides.forEach(function(guide, index) {

        let elevation: number = normalizeElevation(_self._container.nativeElement.clientHeight, guide['elevation'], min, range, Settings.LINEHEIGHT);

        // if item already exists, update
        if (_self.processedGuides[index]) {

          _self.processedGuides[index]['offset'] = elevation;
          _self.processedGuides[index]['range'] = guide['range'];
          _self.processedGuides[index]['color'] = 'rgba(' + String(_colors[index]) + ',0.5)';
        }

        // else add
        else {

          _self.processedGuides.push(
            {
              offset: elevation,
              range: guide['range'],
              color: 'rgba(' + String(_colors[index]) + ',0.5)'

            });
        }
      });
    }
  }
}
