import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Waypoint} from '../../../type/waypoint';
import {PoiType} from '../../../type/poi';
import {NoteService} from '../../../service/note.service';
import {Settings} from '../../../settings';
import {Note} from '../../../type/note';

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
  public noteTypes: Array<string> = ['note'];
  private _notes: Array<Note>;

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

    // add missing properties to data object so we can convert it to a Note
    this.data['id'] = new Date().getTime();

    // only add to type if it differs
    const _types: Array<string> = [this.data['type']];
    for (const key in formData) {
      if (key.includes('type')) {
        if (_types.indexOf(formData[key]) === -1) {
          _types.push(formData[key]);
        }
      }
    }

    this.data['type'] = _types.toString().split(',').join(', ');
    this.data['label'] = formData['title'];
    this.data['description'] = formData['note'];
    this.data['share'] = formData['share'];

    console.log(this.data);

    const _noteObj: Note = this.data as Note;

    this._noteService.saveNote(_noteObj);
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

  public addType(): void {
    this.noteTypes.push('note');
  }

  public removeType(index: number): void {
    this.noteTypes.splice(index, 1);
  }

}
