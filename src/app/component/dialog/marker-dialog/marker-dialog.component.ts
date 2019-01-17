import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Poi, PoiType} from '../../../type/poi';
import {distanceInMilesFeet, getPoiTypeByType} from '../../../_util/poi';

@Component({
  selector: 'marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.sass']
})
export class MarkerDialogComponent implements OnInit {

  public poiTypes:  Array<PoiType> = [];
  public poiMi: string;
  public offTrail: string;

  constructor(
    public dialogRef: MatDialogRef<MarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Poi
  ) {}

  ngOnInit() {

    let _self = this;

    // generate poiTypes (icons)
    const _poiStrArr: Array<string> = this.data['type'].split(", ");

    _poiStrArr.forEach(function(poi, index) {

      let _poiData = getPoiTypeByType(poi);

      if (_poiData !== undefined) {

        if (_poiStrArr.length > 2 && index === 1) {
          _self.poiTypes.push(getPoiTypeByType('unknown'));
        }
        _self.poiTypes.push(_poiData);
      } else {
        _self.poiTypes.push(getPoiTypeByType('unknown'));
      }
    });

    // if no types
    if (this.poiTypes.length === 0) {
      this.poiTypes.push(getPoiTypeByType('unknown'));
    }

    // round mileage as string
    const convMileage: object = distanceInMilesFeet(this.data.anchorPoint.distanceTotal, 'mi');
    this.poiMi = 'Mile ' + convMileage['distance'];

    // round distance from trail as string
    const convOffTrail: object = distanceInMilesFeet(this.data.waypoint.distance);
    if (convOffTrail['distance'] < 10 && convOffTrail['unit'] === 'ft.') {
      this.offTrail = 'on trail';
    } else {
      this.offTrail = '~' + convOffTrail['distance'] + ' ' + convOffTrail['unit'] + ' off trail.';
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
