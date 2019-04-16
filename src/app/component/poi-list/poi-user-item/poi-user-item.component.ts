import {Component, Input, OnInit, HostBinding, ChangeDetectorRef} from '@angular/core';
import { Poi } from '../../../type/poi';

@Component({
  selector: 'poi-user-item',
  templateUrl: './poi-user-item.component.html',
  styleUrls: ['./poi-user-item.component.sass']
})
export class PoiUserItemComponent implements OnInit {

  // TODO: there has to be a an easier way to add dynamic classes to the host...
  @HostBinding('class.idle') isIdle = true;
  @HostBinding('class.fetching') isFetching = false;
  @HostBinding('class.tracking') isTracking = false;
  @HostBinding('class.error') isError = false;
  @HostBinding('class.mat-list-item-content') isActive = true;

  public userStatus: string;

  @Input() data: Poi;
  @Input() timestamp: number;
  @Input('status') set status(value: string) {

    if (value) {
      this.userStatus = value;
    }


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

  constructor(
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
}
