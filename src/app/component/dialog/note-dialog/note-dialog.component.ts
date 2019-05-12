import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Waypoint} from '../../../type/waypoint';
import {PoiType} from '../../../type/poi';
import {NoteService} from '../../../service/note.service';
import {Settings} from '../../../settings';
import {Note} from '../../../type/note';
import {createCamelCaseName} from '../../../_util/generic';
import {BaseComponent} from '../../../base/base/base.component';

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
export class NoteDialogComponent extends BaseComponent implements OnInit {

  @ViewChild('titleField') titleField: ElementRef;
  @ViewChild('container') container: ElementRef;

  public defaultType: string;
  public noteTypes: Array<string> = ['note'];
  private _notes: Array<Note>;

  constructor(
    private _dialogRef: MatDialogRef<NoteDialogComponent>,
    private _noteService: NoteService,
    @Inject(MAT_DIALOG_DATA)
    public data: NoteProperties
  ) {
    super();
  }

  ngOnInit() {
    this.defaultType = this.data.type;
    this.titleField.nativeElement.focus();

    // fix for android, soft-keyboard hides dialog, this will make the dialog larger / scroll / based on keyboard size
    if (navigator.userAgent.match(/(Android)/)) {
      this.addEventListener(window, 'native.keyboardshow', (e) => {
        this.container.nativeElement.style.paddingBottom = e['keyboardHeight'] + 'px';
      });

      this.addEventListener(window, 'native.keyboardhide', (e) => {
        this.container.nativeElement.style.paddingBottom = null;
      });
    }
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

  public capName(name: string): string {
    return createCamelCaseName(name);
  }

  // fixes android soft-keyboard overlap issue
  public onFocus(event: Event): void {
    if (navigator.userAgent.match(/(Android)/)) {
      event.target['scrollIntoView']({behavior: 'smooth', block: 'start'});
    }
  }
}
