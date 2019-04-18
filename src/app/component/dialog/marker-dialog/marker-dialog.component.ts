import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Poi, PoiType } from '../../../type/poi';
import { getPoiTypeByType } from '../../../_util/poi';
import {TrailGeneratorService} from '../../../service/trail-generator.service';
import {NoteService} from '../../../service/note.service';

@Component({
  selector: 'marker-dialog',
  templateUrl: './marker-dialog.component.html',
  styleUrls: ['./marker-dialog.component.sass']
})
export class MarkerDialogComponent implements OnInit, OnDestroy {

  public poiTypes:  Array<PoiType> = [];
  public poiCollection: Array<object> = [];
  public showRelated: boolean;

  constructor(
    private _trailGeneratorService: TrailGeneratorService,
    private _noteService: NoteService,
    public dialogRef: MatDialogRef<MarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Poi
  ) {}

  ngOnInit() {

    const _self = this;

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

    if (this.data.type.includes('water')) {
      this.showRelated = true;
      this._getRelatedPois('water');
    }

    if (this.data.type.includes('camp')) {
      this.showRelated = true;
      this._getRelatedPois('camp');
    }
  }

  ngOnDestroy(): void {

  }

  private _getRelatedPois(poiType: string): void {
    const _relatedPois: Array<number> = this._trailGeneratorService.getTrailData().sortedPoiIds[poiType];
    const _poiIndex: number = _relatedPois.indexOf(this.data.id);
    const _poiIds: Array<number> = _relatedPois.slice(_poiIndex + 1, _poiIndex + 4);

    this.poiCollection.push({label: poiType, data: _poiIds});
  }

  public relatedLabel(type: string): string {
    return getPoiTypeByType(type).label;
  }

  public deletePoi(): void {
    this._noteService.deleteNote(this.data.id, this.data.belongsToType, this.data.belongsTo);
    this.dialogRef.close();
  }


  // EVENT HANDLERS

  // private onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
