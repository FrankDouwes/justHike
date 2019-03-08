import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.sass']
})
export class SettingsPanelComponent implements OnInit, OnDestroy {

  @Output() onSettingsChanged: EventEmitter<boolean> = new EventEmitter()

  public settingsChanged: boolean = false;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {
   this.validate();
  }

  protected invalidate(): void {
    this.settingsChanged = true;
    this.validate();
  }

  protected validate(): void {
    if (this.settingsChanged) {
      this.onSettingsChanged.emit(true);
    }
  }
}
