import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {DialogService} from '../../../../factory/dialog.service';
import {latLngToWaypoint} from '../../../../_util/leaflet/converter';

@Component({
  selector: 'leaflet-element-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  @Input() location: L.latlng
  @Input() anchor: L.latlng;
  @Input() title: string;
  @Input() message: string;
  @Input() showCoords: boolean;
  @Input() belongsTo: number;     // always belong to a mile.
  @Input() timer ?: number;

  public position: string = '';

  constructor(private _dialogFactory: DialogService) {}

  public onLockClick(): void {

    if (this.timer) {

      // TODO: PAUSE
      clearTimeout(this.timer);
    }

    const _waypoint = (this.location) ? latLngToWaypoint(this.location) : undefined;
    const _anchor = (this.anchor) ? latLngToWaypoint(this.anchor) : undefined;

    const _resumeTimeOut = function(result) {
      // TODO: RESUME (if closed without saving)
    };

    this._dialogFactory.openNoteDialog(_waypoint, _anchor, this.belongsTo, 'Mile', this.title, null, _resumeTimeOut);
  }

  ngOnInit(): void {

    // show button inline if it's a single line popup (meaning a tooltip)
    if (!this.message) {
      this.position = 'inline';
    }
  }

  public createMapsLatLngLink() : string {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
      return 'http://maps.apple.com/?ll=' + this.location.lat + ',' + this.location.lng;
    } else {
      return 'https://www.google.com/maps/search/?api=1&query=' + this.location.lat + ',' + this.location.lng;
    }
  }
}
