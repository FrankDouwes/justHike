import {Component, Input, OnInit} from '@angular/core';
import {PoiType} from '../../type/poi';

@Component({
  selector: 'display-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})

export class ButtonComponent {

  @Input() icon?:    string;
  @Input() badge?:    string;
  @Input() poiTypes?: Array<PoiType>;

  // simple button with label & font awesome icon
  constructor() { }
}
