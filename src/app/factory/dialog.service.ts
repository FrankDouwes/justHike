import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NoteDialogComponent} from '../component/dialog/note-dialog/note-dialog.component';
import {Waypoint} from '../type/waypoint';
import {Subscription} from 'rxjs-observable';

@Injectable({
  providedIn: 'root'
})

// TODO: generate the correct dialog, should house all dialogs (from app component)
export class DialogService {

  constructor(private _dialog: MatDialog) {}

  private _currentDialog: any;
  private _currentCloseSubscription: Subscription;

  // marker dialog
  public openNoteDialog(location: Waypoint, anchor: Waypoint, belongsTo: number, belongsToType: string, title: string, createdOn?: number, callback?: Function): void {

    belongsTo = belongsTo || 0;

    console.log(location, anchor, belongsTo, belongsToType, title, createdOn, callback);

    if (!createdOn) {
      createdOn = new Date().getTime();
    }

    // // get marker poi data
    // if (this.navIsVisible) {
    //   this._toggleNavigationVisibility(false);
    // }

    if (this._currentDialog) {
      this._dialog.closeAll();
    }

    if (this._currentCloseSubscription) {
      this._currentCloseSubscription.unsubscribe();
      this._currentCloseSubscription = null;
    }

    this._currentDialog = this._dialog.open(NoteDialogComponent, {
      autoFocus: false,
      width: '60%',
      height: '75%',
      data: {
        location: location,
        belongsTo: belongsTo,
        belongsToType: belongsToType,
        title: title,
        createdOn: createdOn
      }
    });

    this._currentCloseSubscription = this._currentDialog.afterClosed().subscribe(result => {
      if (callback) {
        callback(result);
      }
    });
  }
}
