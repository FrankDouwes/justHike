import { Component, OnInit } from '@angular/core';
import {SettingsPanelComponent} from '../../../../../display/settings-panel/settings-panel.component';

@Component({
  selector: 'detail-settings',
  templateUrl: './detail-settings.component.html',
  styleUrls: ['./detail-settings.component.sass']
})
export class DetailSettingsComponent extends SettingsPanelComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
