import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SettingsPanelComponent} from '../../../../../base/settings-panel/settings-panel.component';
import {LocalStorageService} from 'ngx-webstorage';
import {MatCheckboxChange, MatSelectChange} from '@angular/material';
import {VersionResolverService} from '../../../../../service/version-resolver.service';
import {getMajorPoiTypes} from '../../../../../_util/poi';

@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.sass']
})
export class GeneralSettingsComponent extends SettingsPanelComponent implements OnInit {

  @ViewChild('panel') panel: ElementRef;

  public showSnow: boolean;
  public parallaxEnabled: boolean;
  public highContrast: boolean;
  public showMiniMap: boolean;
  public detectRetina: boolean;
  public direction: number;       // 0: NOBO, 1: SOBO
  public majorPoiTypes: Array<string>;
  public userName: string = 'test';
  public showMileGrid: boolean;
  public animateMap: boolean;

  public directionList: Array<object> = [{id: 0, label: 'Northbound (NOBO)'}, {id: 1, label: 'Southbound (SOBO)'}];
  public screenModes: Array<any> = [
    {value: 'default', label: 'Default'},
    {value: 'highContrast', label: 'High Contrast'},
    {value: 'nightHike', label: 'Night Hiking'}
  ];
  public screenMode;

  constructor(
    private _localStorage: LocalStorageService,
  ) {
    super();
  }

  ngOnInit() {

    const _self = this;

    this.showSnow = this._localStorage.retrieve('showSnow');
    this.parallaxEnabled = this._localStorage.retrieve('parallaxEnabled');
    this.screenMode = this._localStorage.retrieve('screenMode');
    this.showMiniMap = this._localStorage.retrieve('showMiniMap');
    this.direction = this._localStorage.retrieve('direction');
    this.showMileGrid = this._localStorage.retrieve('showMileGrid');
    this.animateMap = this._localStorage.retrieve('animateMap');
    this.detectRetina = this._localStorage.retrieve('detectRetina');

    // dynamic poi type properties
    this.majorPoiTypes = getMajorPoiTypes();

    this.majorPoiTypes.forEach(function(name) {
      const _camelName = _self.createCamelCaseName(name, 'show');
      _self[_camelName] = _self._localStorage.retrieve(_camelName);
    });
  }

  // EVENTS

  // checkboxes are named after their data property
  public onCheckboxChange(event: MatCheckboxChange): void {
    this._localStorage.store(event.source.name, event.checked);
  }

  public onRadioClick(radioValue): void {
    this._localStorage.store('screenMode', radioValue);
  }

  public onDirectionSelect(event: MatSelectChange): void {

    this._localStorage.store('direction', event.value);

    if (event.value !== this.direction) {
      this.invalidate();
    }
  }

  public onUserNameChange(username): void {

    // enable god mode (admin panel)
    if (username.toLowerCase() === 'iddqd') {

      const _isAdmin = this._localStorage.retrieve('isAdmin');

      if (!_isAdmin) {
        this._localStorage.store('isAdmin', true);
        alert('God mode enabled!');
      } else {
        this._localStorage.clear('isAdmin');
        alert('Just a regular mortal.');
      }
    }
  }

  public createCamelCaseName(name: string, prepend?: string, append?: string): string {

    prepend = (prepend) ? prepend : '';
    append = (append) ? prepend : '';

    return prepend + name.charAt(0).toUpperCase() + name.slice(1) + append;
  };

}
