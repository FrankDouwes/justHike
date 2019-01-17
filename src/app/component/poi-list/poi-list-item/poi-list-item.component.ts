import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {PoiType} from '../../../type/poi';
import {distanceInMilesFeet, getPoiTypeByType} from '../../../_util/poi';

@Component({
  selector: 'poi-list-item',
  templateUrl: './poi-list-item.component.html',
  styleUrls: ['./poi-list-item.component.sass']
})
export class PoiListItemComponent implements OnInit {

  @Input() data:object;
  public poiTypes: Array<PoiType> = [];
  public poiMi;
  public offTrail;

  constructor() { }

  ngOnInit() {

    const _self = this;

    if(this.data) {

      // generate poiTypes (icons)
      let _poiStrArr: Array<string> = this.data['type'].split(', ');

      _poiStrArr.forEach(function(poi, index) {

        let _poiData = getPoiTypeByType(poi);

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

      const convMileage: object = distanceInMilesFeet(this.data.anchorPoint.distanceTotal, 'mi');
      this.poiMi = 'Mile ' + convMileage['distance'];

      const convOffTrail: object = distanceInMilesFeet(this.data.waypoint.distance);
      if (convOffTrail['distance'] < 10 && convOffTrail['unit'] === 'ft.') {
        this.offTrail = '';
      } else {
        this.offTrail = '(~' + convOffTrail['distance'] + ' ' + convOffTrail['unit'] + ' off trail)';
      }

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }
}
