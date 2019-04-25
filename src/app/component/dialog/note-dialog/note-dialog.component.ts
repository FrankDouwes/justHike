import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Waypoint} from '../../../type/waypoint';
import {Poi, PoiType} from '../../../type/poi';
import {NoteService} from '../../../service/note.service';
import {Settings} from '../../../settings';

export class NoteProperties {
  type: string;
  label: string;
  anchorPoint: Waypoint;
  belongsTo: number;
  belongsToType: string;
  waypoint?: Waypoint;
}

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.sass']
})
export class NoteDialogComponent implements OnInit {

  @ViewChild('titleField') titleField: ElementRef;

  public defaultType: string;
  private _notes: Array<Poi>;

  constructor(
    private _dialogRef: MatDialogRef<NoteDialogComponent>,
    private _noteService: NoteService,
    @Inject(MAT_DIALOG_DATA)
    public data: NoteProperties
  ) {}

  ngOnInit() {

    this.defaultType = this.data.type;
    this.titleField.nativeElement.focus();
  }

  public submitNote(formData: object): void {

    // add missing properties to data object so we can convert it to a Poi
    this.data['id'] = new Date().getTime();

    // only add to type if it differs
    if (formData['type'] !== this.data['type']) {
      this.data['type'] += ', ' + formData['type'];
    }

    this.data['label'] = formData['title'];
    this.data['description'] = formData['note'];
    this.data['share'] = formData['share'];

    const _notePoi: Poi = this.data as Poi;

    this._noteService.saveNote(_notePoi);
    this._dialogRef.close('success');
  }

  public onButtonClick(action: string): void {
    this['_' + action]();
  }

  private _cancel(): void {
    this._dialogRef.close('cancel');
  }

  public getTypes(): Array<PoiType> {

    const _types = [];
    Settings.POITYPES.forEach(function(type) {
      if (type.userEnabled) {
        _types.push(type);
      }
    });

    return _types;
  }

}
