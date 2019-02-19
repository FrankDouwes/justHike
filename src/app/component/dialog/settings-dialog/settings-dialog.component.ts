import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.sass']
})
export class SettingsDialogComponent implements OnInit {

  @ViewChild('contentPanel') contentPanel: ElementRef;

  public listItems: Array<object> = [
    {title: 'Trail Data', panel: 'purchase'},
    {title: 'General Settings', panel: 'general'},
    // {title: 'Elevation Profile', panel: 'elevation'},
    // {title: 'Mile Overview', panel: 'detail'},
    {title: 'About', panel: 'about'}
  ];

  public activePanel: string;
  private _settingsChanged: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {

    _dialogRef.disableClose = true; // disable default close operation
    _dialogRef.backdropClick().subscribe(result => {
      _dialogRef.close(this._settingsChanged);
    });
  }

  ngOnInit(): void {}

  public onClick(item): void {
    this.activePanel = item.panel;
    this.contentPanel.nativeElement.scrollTo(0, 0);
  }

  // only triggered if true
  public onSettingsChanged(event): void {
    this._settingsChanged = event;
  }
}
