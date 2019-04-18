import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {DialogService} from '../../../../factory/dialog.service';
import {latLngToWaypoint} from '../../../../_util/leaflet/converter';
import {clearTimeOut, pauseTimeOut, resumeTimeOut, TimerObj} from '../../../../_util/timer';
import {NoteProperties} from '../../../dialog/note-dialog/note-dialog.component';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'leaflet-element-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  @Input() waypoint?:       L.latlng;
  @Input() anchorPoint?:    L.latlng;
  @Input() distance:        number;      // the distance off-trail
  @Input() distanceTotal:   number;      // the total trail distance

  @Input() label:           string;
  @Input() description:     string;

  @Input() belongsTo:       number;     // always belong to a mile.

  @Input() showCoords:      boolean;
  @Input() timer:           TimerObj;   // popups have a timer that hides/destroys them

  public position: string = '';

  constructor(private _dialogFactory: DialogService) {}

  ngOnInit(): void {
    // show button inline if it's a single line popup (meaning a tooltip)
    if (!this.description) {
      this.position = 'inline';
    }
  }

  public tag(): void {

    if (!this.waypoint && !this.anchorPoint) {
      console.warn('error: popup must have a waypoint or anchorPoint');
      return;
    }

    const _self = this;

    // pause the timer (so the location will still be shown if the user hits cancel)
    pauseTimeOut(this.timer);

    const _callback = function(result): void {
      if (result === 'success') {
        clearTimeOut(_self.timer);
      } else {
        resumeTimeOut(_self.timer);
      }
    }

    // convert & populate waypoint/anchor
    const _waypoint = (this.waypoint) ? latLngToWaypoint(this.waypoint) : undefined;
    if (_waypoint) {
      _waypoint.distance = this.distance || 0;
      _waypoint.distanceTotal = this.distanceTotal || 0;
    }

    console.log(_waypoint);

    const _anchorPoint = (this.anchorPoint) ? latLngToWaypoint(this.anchorPoint) : undefined;
    if (_anchorPoint) {
      _anchorPoint.distance = this.distanceTotal - (environment.MILE * Math.floor(this.distanceTotal / environment.MILE)) || 0;
      _anchorPoint.distanceTotal = this.distanceTotal || 0;
    }

    const _dialogProperties: NoteProperties = {
      type:             'note',
      label:            this.label,
      waypoint:         _waypoint,
      anchorPoint:      _anchorPoint,
      belongsTo:        this.belongsTo,
      belongsToType:    'mile'
    }

    this._dialogFactory.openDialog('note', _dialogProperties, _callback);
  }

  public createMapsLatLngLink() : string {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
      return 'http://maps.apple.com/?ll=' + this.waypoint.lat + ',' + this.waypoint.lng;
    } else {
      return 'https://www.google.com/maps/search/?api=1&query=' + this.waypoint.lat + ',' + this.waypoint.lng;
    }
  }
}
