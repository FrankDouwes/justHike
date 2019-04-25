import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from '@angular/material';
import {SettingsPanelComponent} from '../../../../../base/settings-panel/settings-panel.component';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent extends SettingsPanelComponent implements OnInit {

  public direction: number;       // 0: NOBO, 1: SOBO
  public userName: string;
  public directionList: Array<object> = [{id: 0, label: 'Northbound (NOBO)'}, {id: 1, label: 'Southbound (SOBO)'}];

  constructor(
    private _localStorage: LocalStorageService
  ) {
    super();
  }

  ngOnInit() {
    this.direction = this._localStorage.retrieve('direction');

    const _savedName: string = this._localStorage.retrieve('userName');
    if (_savedName) {
      this.userName = _savedName;
    }
  }

  public onDirectionSelect(event: MatSelectChange): void {

    this._localStorage.store('direction', event.value);

    if (event.value !== this.direction) {
      this.invalidate();
    }
  }

  public onUserNameChange(username): void {
    this._localStorage.store('userName', username);
  }


}
