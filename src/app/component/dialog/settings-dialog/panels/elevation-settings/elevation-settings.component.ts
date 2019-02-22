import { Component, OnInit } from '@angular/core';
import {SettingsPanelComponent} from '../../../../../display/settings-panel/settings-panel.component';

@Component({
  selector: 'elevation-settings',
  templateUrl: './elevation-settings.component.html',
  styleUrls: ['./elevation-settings.component.sass']
})
export class ElevationSettingsComponent extends SettingsPanelComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
