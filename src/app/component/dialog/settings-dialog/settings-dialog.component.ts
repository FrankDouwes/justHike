import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.sass']
})
export class SettingsDialogComponent implements OnInit {

  public listItems: Array<object> = [
    {title: 'Trail Data', panel: 'purchase'},
    {title: 'General Settings', panel: 'general'},
    {title: 'Elevation Profile', panel: 'elevation'},
    {title: 'Mile Overview', panel: 'detail'},
    {title: 'About', panel: 'about'}
  ];

  public activePanel: string;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {}

  ngOnInit(): void {}

  onClick(item) {
    this.activePanel = item.panel;
  }
}
