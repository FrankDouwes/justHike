import { Component, OnInit } from '@angular/core';
import {SettingsPanelComponent} from '../../../../../display/settings-panel/settings-panel.component';
import {LocalStorageService} from 'ngx-webstorage';
import {MatCheckboxChange, MatSelectChange} from '@angular/material';

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.sass']
})
export class GeneralSettingsComponent extends SettingsPanelComponent implements OnInit {

  public showSnowPack: boolean;
  public showCampSites: boolean;
  public showMiniMap: boolean;
  public direction: number;       // 0: NOBO, 1: SOBO

  public directionList: Array<object> = [{id: 0, label: 'Northbound (NOBO)'}, {id: 1, label: 'Southbound (SOBO)'}];

  constructor(
    private _localStorage: LocalStorageService,
  ) {
    super();
  }

  ngOnInit() {
    this.showSnowPack = this._localStorage.retrieve('showSnowPack');
    this.showCampSites = this._localStorage.retrieve('showCampSites');
    this.showMiniMap = this._localStorage.retrieve('showMiniMap');
    this.direction = this._localStorage.retrieve('direction');
  }

  // EVENTS

  // checkboxes are named after their data property
  public onCheckboxChange(event: MatCheckboxChange): void {
    this._localStorage.store(event.source.name, event.checked);
  }

  public onDirectionSelect(event: MatSelectChange): void {

    this._localStorage.store('direction', event.value);

    if (event.value !== this.direction) {
      this.invalidate();
    }
  }
}
