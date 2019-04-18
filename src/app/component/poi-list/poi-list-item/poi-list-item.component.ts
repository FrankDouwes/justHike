import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { Poi, PoiType } from '../../../type/poi';
import { getPoiTypeByType } from '../../../_util/poi';

@Component({
  selector: 'poi-list-item',
  templateUrl: './poi-list-item.component.html',
  styleUrls: ['./poi-list-item.component.sass']
})
export class PoiListItemComponent implements OnInit {

  @HostBinding('class')
  get typeClass(){
    return 'mat-list-item-content ' + this.data['type'].split(',').join('');
  };

  @Input() data: Poi;
  @Input('status') status: string = 'idle';
  @Input() timeStamp: number;

  public poiTypes: Array<PoiType> = [];

  constructor() {}

  ngOnInit(): void {
    this.setupIcons();
  }

  public setupIcons(): void {

    const _self = this;
    this.poiTypes = [];

    if (this.data) {

      // generate poiTypes (icons)
      const _poiStrArr: Array<string> = this.data['type'].split(', ');

      _poiStrArr.forEach(function(poi, index) {

        if (poi === 'offtrail') {
          return;
        }

        const _poiData = getPoiTypeByType(poi);

        if (_poiData !== undefined) {

          if (_poiStrArr.length > 2 && index === 1) {
            _self.poiTypes.push(getPoiTypeByType('unknown'));
          }
          _self.poiTypes.push(_poiData);
        } else {
          _self.poiTypes.push(getPoiTypeByType('unknown'));
        }
      });

      // if no types
      if (this.poiTypes.length === 0) {
        this.poiTypes.push(getPoiTypeByType('unknown'));
      }
    }
  }
}
