import {Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, HostBinding} from '@angular/core';
import {Poi} from '../../../type/poi';

@Component({
  selector: 'poi-user-item[class=mat-list-item-content]',
  templateUrl: './poi-user-item.component.html',
  styleUrls: ['./poi-user-item.component.sass']
})
export class PoiUserItemComponent implements OnInit {

  // there has to be a an easier way to add classes to the host... TODO
  @HostBinding('class.idle') isIdle = false;
  @HostBinding('class.fetching') isFetching = false;
  @HostBinding('class.tracking') isTracking = false;
  @HostBinding('class.error') isError = false;

  public userStatus: string;

  @Input() data: Poi;
  @Input('status') set status(value: string) {

    if (!value) {
      return;
    }

    this.userStatus = value;

    if (value === 'tracking') {
      this.isTracking = true;
      this.isIdle = this.isFetching = this.isError = false;
    } else if (value === 'fetching') {
      this.isFetching = true;
      this.isIdle = this.isTracking = this.isError = false;
    } else if (value === 'error') {
      this.isError = true;
      this.isIdle = this.isFetching = this.isTracking = false;
    } else {
      this.isIdle = true;
      this.isFetching = this.isTracking = this.isError = false;
    }
  }

  constructor() {}

  // LIFECYCLE HOOKS
  ngOnInit(): void {}
}
