import {Component, Input, OnInit} from '@angular/core';
import {PoiType} from '../../type/poi';

@Component({
  selector: 'display-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})

export class ButtonComponent implements OnInit {

  @Input() icon:    string;
  @Input() poiTypes: Array<PoiType>;

  @Input() label:   string;

  // simple button with label & font awesome icon
  constructor() { }

  ngOnInit() {

    console.log(this.poiTypes);

  }
}
