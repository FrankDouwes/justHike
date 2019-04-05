import {Component, Input, OnInit} from '@angular/core';
import {PoiType} from '../../../../type/poi';
import {RateService} from '../../../../service/rate.service';
import {getTrailMetaDataById} from '../../../../_util/trail';
import {Waypoint} from '../../../../type/waypoint';

@Component({
  selector: 'rating-form',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() poiType: PoiType;
  @Input() waypoint: Waypoint;

  constructor(
    private _rateService: RateService
  ) {}
  ngOnInit() {
    const _rating = this._rateService.getRating(this.poiType.type, this.waypoint);
    console.log(_rating);
  }
}
