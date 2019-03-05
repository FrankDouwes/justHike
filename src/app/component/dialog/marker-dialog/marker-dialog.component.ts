import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Poi, PoiType } from '../../../type/poi';
import { getPoiTypeByType } from '../../../_util/poi';

@Component({
  selector: 'marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.sass']
})
export class MarkerDialogComponent implements OnInit {

  public poiTypes:  Array<PoiType> = [];

  constructor(
    public dialogRef: MatDialogRef<MarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Poi
  ) {}

  ngOnInit() {

    let _self = this;

    // generate poiTypes (icons)
    const _poiStrArr: Array<string> = this.data.type.split(", ");

    _poiStrArr.forEach(function(poi, index) {

      const _poiData = getPoiTypeByType(poi);

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
  }



  // EVENT HANDLERS

  // private onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
