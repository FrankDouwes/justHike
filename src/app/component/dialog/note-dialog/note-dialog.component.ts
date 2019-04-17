import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LocalStorageService} from 'ngx-webstorage';
import {Waypoint} from '../../../type/waypoint';
import {TrailGeneratorService} from '../../../service/trail-generator.service';
import {Poi} from '../../../type/poi';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.sass']
})
export class NoteDialogComponent implements OnInit {

  @ViewChild('titleField') titleField: ElementRef;

  private _notes: Array<Poi>;

  constructor(
    private _dialogRef: MatDialogRef<NoteDialogComponent>,
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    @Inject(MAT_DIALOG_DATA)
    public data: object
  ) {}

  ngOnInit() {

    this._notes = JSON.parse(this._localStorage.retrieve(this._trailGenerator.getTrailData().abbr + '_notes'));

    this.titleField.nativeElement.focus();
  }

  public submitNote(formData: object): void {

    const _notePoi = {
      id: new Date().getTime(),
      trail: this._trailGenerator.getTrailData().abbr,
      waypoint: this.data['location'],
      type: 'note',
      label: formData['title'],
      anchorPoint: this.data['location'],
      distance: 0,
      belongsTo: this.data['belongsTo'],
      description: formData['note']
    } as Poi;

    if (!this._notes) {
      this._notes = [];
    }

    this._notes.push(_notePoi);

    this._localStorage.store(this._trailGenerator.getTrailData().abbr + '_notes', JSON.stringify(this._notes));
    this._dialogRef.close();
  }

  public onButtonClick(action: string): void {
    this['_' + action]();
  }

  private _cancel(): void {
    this._dialogRef.close();
  }

}
