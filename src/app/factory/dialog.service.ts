import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs-observable';

// supported dialogs
import {NoteDialogComponent} from '../component/dialog/note-dialog/note-dialog.component';

@Injectable({
  providedIn: 'root'
})

// TODO: generate the correct dialog, should house all dialogs (from app component)
export class DialogService {

  constructor(private _dialog: MatDialog) {}

  private _currentDialog: any;
  private _currentCloseSubscription: Subscription;

  // marker dialog
  public openDialog(type: string, properties: object, callback?: Function): void {

    this._toggleNavigationBar();

    if (this._currentDialog) {
      this._dialog.closeAll();
    }

    if (this._currentCloseSubscription) {
      this._currentCloseSubscription.unsubscribe();
      this._currentCloseSubscription = null;
    }

    this._currentDialog = this._createDialogByType(type, properties);

    // set a self destroying close subscription
    if (this._currentDialog) {
      this._currentCloseSubscription = this._currentDialog.afterClosed().subscribe(result => {

        // result should be success/failure or cancel

        this._currentCloseSubscription.unsubscribe();
        this._currentCloseSubscription = null;

        if (callback) {
          callback(result);
        }

        this._currentDialog = null;
      });
    }
  }

  private _createDialogByType(type: string, properties: object): any {

    if (type === 'note') {
      return this._dialog.open(NoteDialogComponent, {
        autoFocus: false,
        width: '70%',
        height: '85%',
        data: properties
      });
    } else {
      console.warn('attempting to open an unknown dialog type');
      return;
    }
  }

  private _toggleNavigationBar(): void {
    // // get marker poi data
    // if (this.navIsVisible) {
    //   this._toggleNavigationVisibility(false);
    // }
  }
}
