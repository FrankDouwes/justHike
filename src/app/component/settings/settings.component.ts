import { Component, OnInit } from '@angular/core';
import {Settings} from '../../settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  public trails: object;

  constructor(
  ) { }

  ngOnInit(): void {
    this.trails = Settings.TRAILS;
  }

}
