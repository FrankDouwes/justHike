import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Mile} from '../../type/mile';
import {Poi} from '../../type/poi';

@Component({
  selector: 'poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.sass']
})
export class PoiListComponent implements OnInit {

  @ViewChild('poiList') container: ElementRef;
  @Input() milesData: Array<Mile>;

  public poisArray: Array<Poi> = [];

  constructor() { }

  ngOnInit() {

    this.poisArray = [];

    const _self = this;

    // get all pois within miles
    if (this.milesData) {
      this.milesData.forEach(function (mile: Mile, index: number) {
        if (mile.pois && mile.pois.length > 0) {
          _self.poisArray = _self.poisArray.concat(mile.pois);
        }
      });
    }
  }

  // on list item click > markerEvent
  onClick (poi) {

    const _event: CustomEvent = new CustomEvent(
      'markerClick',
      {
        bubbles: true,
        cancelable: true,
        detail: poi
      });

    console.log(this.container);
    this.container['elementRef'].nativeElement.dispatchEvent(_event);
  }
}
