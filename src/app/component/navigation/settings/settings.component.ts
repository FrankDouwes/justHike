import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'settings-button',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Input() isDownloading: boolean;
  @Input() updateAvailable: boolean;

  constructor() {}

  ngOnInit() {}
}
