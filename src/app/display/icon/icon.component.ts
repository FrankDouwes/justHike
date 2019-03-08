import {Component, Input, OnInit} from '@angular/core';
import {PoiType} from '../../type/poi';

@Component({
  selector: 'display-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass']
})
export class IconComponent implements OnInit {

  @Input() data: Array<PoiType>;
  @Input() showRating: boolean;
  @Input() showUpdates: boolean;

  public rateable: boolean;

  constructor() { }

  ngOnInit() {

    const _self = this;

    this.data.forEach(function(poiType, index) {
      if (poiType.rateable === true && _self.showRating) {
        _self.rateable = true;
      }
    });
  }

}
