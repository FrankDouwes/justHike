import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PoiType} from '../../../type/poi';

@Component({
  selector: 'fa-icon-wrapper',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.sass']
})
export class FaIconComponent implements OnInit, AfterViewInit {

  @Input() data: PoiType;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    // fix svg icons, the SVGs need the ID of its container
    const _faWrapper = document.getElementById('wrapper-' + this.data.type);
    _faWrapper.childNodes[0]['id'] = 'sample-' + this.data.type;
  }
}
