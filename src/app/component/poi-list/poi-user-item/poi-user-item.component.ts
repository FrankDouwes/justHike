import {Component, Input, OnInit, OnChanges, DoCheck, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import {Poi} from '../../../type/poi';
import {LocationService} from '../../../service/location.service';

@Component({
  selector: 'poi-user-item',
  templateUrl: './poi-user-item.component.html',
  styleUrls: ['./poi-user-item.component.sass']
})
export class PoiUserItemComponent implements OnInit, OnChanges, DoCheck {

  @Input() data: Poi;

  constructor(private _locationService: LocationService) {}

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('change', changes);
    // this.data = changes.currentValue;
  }

  ngDoCheck(): void {
    // console.log(this.data);
  }



  // EVENT HANDLERS

  private toggleTracking(event: MouseEvent): void {
    this._locationService.toggleTracking();
  }
}
