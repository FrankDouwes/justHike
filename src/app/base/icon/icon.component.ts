import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PoiType} from '../../type/poi';

@Component({
  selector: 'display-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass']
})
export class IconComponent implements OnChanges {

  @Input() data: Array<PoiType>;
  @Input() name ?: string;

  public rateable: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this._setupIcons();
    }
  }

  private _setupIcons(): void {

    let _newRateable: boolean;

    const _length = this.data.length;

    for (let i = 0; i < _length; i++) {
      const _poiType:PoiType = this.data[i];
      if (_poiType.rateable === true) {
        _newRateable = true;
      }
    }

    // only update if needed
    if (_newRateable !== this.rateable) {
      this.rateable = _newRateable;
    }
  }
}
