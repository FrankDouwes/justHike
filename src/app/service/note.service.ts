import {Injectable, OnDestroy} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {TrailGeneratorService} from './trail-generator.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {share} from 'rxjs/operators';
import {Trail} from '../type/trail';
import {cloneData} from '../_util/generic';
import {HttpClient} from '@angular/common/http';
import {ConnectionService} from './connection.service';
import {environment} from '../../environments/environment.prod';
import {Note} from '../type/note';

@Injectable({
  providedIn: 'root'
})

/* notes are poi, that can be shared. */
// keeps track of new notes that should be uploaded (shared with developer)
export class NoteService implements OnDestroy {

  public noteUpdateObserver: Observable<string>;
  public noteSubject: BehaviorSubject<string>;

  private _notesSubscription: Subscription;
  private _connectionSubscription: Subscription;

  private _notesLibrary: object;
  private _notes: Array<Note>;
  private _lastNote: Note;         // this is the last note an operation was performed on (will also hold the last deleted note)
  private _uploadObserver: Observable<string>;
  private _uploadSubscription: Subscription;
  private _previouslyOffline = false;

  constructor(
    private _localStorage: LocalStorageService,
    private _trailGenerator: TrailGeneratorService,
    private _http: HttpClient,
    private _connectionService: ConnectionService)
  {
    this.noteSubject = new BehaviorSubject('initialize');
    this.noteUpdateObserver = this.noteSubject.asObservable().pipe(share());

    this._setupSubscriptions();
    this._loadFromStorage();
  }

  ngOnDestroy(): void {

    if (this._notesSubscription) {
      this._notesSubscription.unsubscribe();
      this._notesSubscription = null;
    }

    if (this._connectionSubscription) {
      this._connectionSubscription.unsubscribe();
      this._connectionSubscription = null;
    }

    // just to be safe
    this.noteSubject = null;
    this.noteUpdateObserver = null;
  }

  private _setupSubscriptions(): void {

    const _self = this;

    const _trail: Trail = this._trailGenerator.getTrailData();
    const _directionString: string = (_trail.direction === 1) ? 'sobo' : 'nobo';

    this._notesSubscription = this._localStorage.observe( _trail.abbr + '-' + _directionString + '_notes').subscribe(function(result) {
      _self.noteSubject.next('storage changed');
      _self._shareNotes();
    });

    this._connectionSubscription = this._connectionService.connectionObserver.subscribe(function(result: boolean) {
      if (result === true) {
        _self._shareNotes();
      }
    });
  }

  // notes are added 1 at a time, unless there are no notes (initial run)
  private _parseNotes(notes: Array<Note>): void {

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

  private _addNotesToLib(notes: Array<Note>): void {

    const _length = notes.length;
    for (let i = 0; i < _length; i++) {

      const _note: Note = notes[i];
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
  public getNotes(type: string, id: number): Array<Note> {

    if (!this._notesLibrary) {
      return;
    }

    return this._notesLibrary[type][id];
  }

  // get the Poi that was last added to the library
  public getLastNote(): Note {
    return this._lastNote;
  }

  // TODO: double loop, a fetch of new data might be faster with lots of notes?
  public deleteNote(noteId: number, type: string, id: number): void {

    const _group: Array<Note> = this._notesLibrary[type][id];
    let _length = _group.length;
    for (let i = 0; i < _length; i++) {

      const _note: Note = _group[i];

      if (_note.id === noteId) {

        this._lastNote = cloneData(_note) as Note;

        this._notesLibrary[type][id].splice(i, 1);
        break;
      }
    }

    _length = this._notes.length;
    for (let j = 0; j < _length; j++) {

      const _note: Note = this._notes[j];

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

  public saveNote(note: Note): void {

    if (!this._notes) {
      this._notes = [];
    }

    this._notes.push(note);

    this._parseNotes([note]);

    if (note.share) {
      this._localStorage.store('shareNotes', true);
    }

    this._updateStorage();
  }

  // easier to sort by distance (poi list)
  public getFlatNotesArray(): Array<Note> {
    return this._notes;
  }

  /* share notes (upload notes to server), runs when internet becomes available
  - TODO: currently used to share notes with developer, will eventually be shared to a personal online map */
  private _shareNotes(): void {

    const _self = this;

    // check connection
    if (this._connectionService.state !== 'online') {
      this._previouslyOffline = true;
      return;
    }

    if (this._localStorage.retrieve('shareNotes') && this._notes) {

      const _shareableNotes: Array<Note> = this._gatherShareableNotes();

      // upload
      if (_shareableNotes.length > 0) {

        const _trail: Trail = _self._trailGenerator.getTrailData();
        const _directionString: string = (_trail.direction === 1) ? 'sobo' : 'nobo';

        // params to send in post object
        const _params = new FormData();
        _params.append('trail', _trail.abbr);
        _params.append('direction', _directionString);
        _params.append('user', _self._localStorage.retrieve('userName'));
        _params.append('data', JSON.stringify(_shareableNotes));

        this._uploadObserver = this._http.post(environment.mailto, _params, {responseType: 'text'});
        this._uploadSubscription = this._uploadObserver.subscribe(function(result: string) {

          if (result === 'success') {

            // only show an alert if data didn't send before because user was online
            if (_self._previouslyOffline) {
              _self._previouslyOffline = false;
              alert('Successfully shared backed-up note(s) with developer, thanks!');
            }

            _self._clearShareableNotes();
          } else {
            alert('Error while sending note(s) to developer!');
          }

          _self._uploadSubscription.unsubscribe();
          _self._uploadSubscription = null;
        }, function(error) {

          // error handling
          alert('Error while sending note(s) to developer!');
        });
      }
    }
  }

  private _clearShareableNotes(): void {

    this._notes.forEach(function(note: Note) {
      if (note.share) {
        note.share = false;
      }
    });

    // write to storage
    this._updateStorage();

    this._localStorage.clear('shareNotes');
  }

  private _gatherShareableNotes(): Array<Note> {

    const _shareableNotes: Array<Note> = [];

    // run through all data and collect notes that need sharing (duplicates)
    this._notes.forEach(function(note: Note) {

      if (note.share) {

        const _clone: Note = cloneData(note) as Note;
        _shareableNotes.push(_clone);
      }
    });

    return _shareableNotes as Array<Note>;
  }
}
