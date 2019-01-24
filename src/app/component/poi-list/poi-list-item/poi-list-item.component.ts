import {Component, Input, OnInit} from '@angular/core';
import {Poi, PoiType} from '../../../type/poi';
import {getPoiTypeByType} from '../../../_util/poi';

@Component({
  selector: 'poi-list-item[class=mat-list-item-content]',
  templateUrl: './poi-list-item.component.html',
  styleUrls: ['./poi-list-item.component.sass']
})
export class PoiListItemComponent implements OnInit {

  @Input() data: Poi;

  public poiTypes: Array<PoiType> = [];

  constructor() { }

  ngOnInit(): void {

    const _self = this;

    if (this.data) {

      // generate poiTypes (icons)
      const _poiStrArr: Array<string> = this.data['type'].split(', ');

      _poiStrArr.forEach(function(poi, index) {

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
