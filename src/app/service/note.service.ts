import {Injectable, OnDestroy} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {TrailGeneratorService} from './trail-generator.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Poi} from '../type/poi';
import {share} from 'rxjs/operators';
import {Trail} from '../type/trail';
import {cloneData} from '../_util/generic';

@Injectable({
  providedIn: 'root'
})

/* there are 2 types of notes:
- notes that belong to a mile
- notes that belong to a poi

structure of notes library object:

notes.mile
            1: [Poi, Poi]
            13: [Poi, Poi, Poi]
            87: [Poi]

notes.poi
            5: [Poi, Poi]
            68: [Poi, Poi, Poi]
            123: [Poi]
*/

export class NoteService implements OnDestroy {

  private _notesSubscription: Subscription;
  private _notesLibrary: object;
  private _notes: Array<Poi>;

  private _lastNote: Poi;         // this is the last note an operation was performed on (will also hold the last deleted note)

  public noteUpdateObserver: Observable<string>;
  public noteSubject: BehaviorSubject<string>;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService)
  {

    const _self = this;
    const _trail: Trail = this._trailGenerator.getTrailData();
    const _directionString: string = (_trail.direction === 1) ? 'sobo' : 'nobo';

    this.noteSubject = new BehaviorSubject('initialize');
    this.noteUpdateObserver = this.noteSubject.asObservable().pipe(share());

    this._notesSubscription = this._localStorage.observe( _trail.abbr + '-' + _directionString + '_notes').subscribe(function(result) {
      _self.noteSubject.next('storage changed');
    });

    this._loadFromStorage();
  }

  ngOnDestroy(): void {

    if (this._notesSubscription) {
      this._notesSubscription.unsubscribe();
      this._notesSubscription = null;
    }

    // just to be safe
    this.noteSubject = null;
    this.noteUpdateObserver = null;
  }

  // notes are added 1 at a time, unless there are no notes (initial run)
  private _parseNotes(notes: Array<Poi>): void {

    if (!notes || notes.length < 1) {
      return;
    }

    const _lastAddedNote = notes[notes.length - 1];

    if (!this._notesLibrary) {

      this._notesLibrary = {};

      // sort all notes by belongsTo (mile)
      this._addNotesToLib(notes);

    } else {

      // only the last added
      this._addNotesToLib([_lastAddedNote]);
    }
  }

  private _addNotesToLib(notes: Array<Poi>): void {

    const _length = notes.length;
    for (let i = 0; i < _length; i++) {

      const _note: Poi = notes[i];
      const _typeLib: object = this._notesLibrary[_note.belongsToType];

      if (_typeLib) {
        if (_typeLib[_note.belongsTo]) {
          this._notesLibrary[_note.belongsToType][_note.belongsTo].push(_note);
        } else {
          this._notesLibrary[_note.belongsToType][_note.belongsTo] = [_note];
        }
      } else {
        this._notesLibrary[_note.belongsToType] = {};
        this._notesLibrary[_note.belongsToType][_note.belongsTo] = [_note];
      }

      // set the last added note
      if (i === _length - 1) {
        this._lastNote = _note;
        this.noteSubject.next('added');
      }
    }
  }

  // get notes based on a given type and id (of that type)
  public getNotes(type: string, id: number): Array<Poi> {

    if (!this._notesLibrary) {
      return;
    }

    return this._notesLibrary[type][id];
  }

  // get the Poi that was last added to the library
  public getLastNote(): Poi {
    return this._lastNote;
  }

  // TODO: double loop, a fetch of new data might be faster with lots of notes?
  public deleteNote(noteId: number, type: string, id: number): void {

    const _group: Array<Poi> = this._notesLibrary[type][id];
    let _length = _group.length;
    for (let i = 0; i < _length; i++) {

      const _note: Poi = _group[i];

      if (_note.id === noteId) {

        this._lastNote = cloneData(_note) as Poi;

        this._notesLibrary[type][id].splice(i, 1);
        break;
      }
    }

    _length = this._notes.length;
    for (let j = 0; j < _length; j++) {

      const _note: Poi = this._notes[j];

      if (_note.id === noteId) {
        this._notes.splice(j, 1);
        break;
      }
    }

    this._updateStorage();
    this.noteSubject.next('removed');
  }

  private _updateStorage(): void {
    const _trail: Trail = this._trailGenerator.getTrailData();
    const _directionString: string = (_trail.direction === 1) ? 'sobo' : 'nobo';
    this._localStorage.store( _trail.abbr + '-' + _directionString + '_notes', JSON.stringify(this._notes));
  }

  private _loadFromStorage(): void {

    const _trail: Trail = this._trailGenerator.getTrailData();
    const _directionString: string = (_trail.direction === 1) ? 'sobo' : 'nobo';
    const _notesString = this._localStorage.retrieve( _trail.abbr + '-' + _directionString + '_notes');

    if (_notesString === null || _notesString === undefined || _notesString === '') {
      return;
    }

    this._notes = JSON.parse(_notesString);

    this._parseNotes(this._notes);
  }

  public saveNote(note: Poi): void {

    if (!this._notes) {
      this._notes = [];
    }

    this._notes.push(note)

    this._parseNotes([note]);
    this._updateStorage();
  }
}
