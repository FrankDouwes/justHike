import { Component, OnInit } from '@angular/core';
import { TrailMeta } from '../../../../../type/trail';
import { LocalStorageService } from 'ngx-webstorage';
import { SettingsPanelComponent } from '../../../../../display/settings-panel/settings-panel.component';
import {getTrailsMetaData} from '../../../../../_util/trail';

@Component({
  selector: 'purchase-settings',
  templateUrl: './purchase-settings.component.html',
  styleUrls: ['./purchase-settings.component.sass'],
})
export class PurchaseSettingsComponent extends SettingsPanelComponent implements OnInit {

  public availableTrailList: Array<TrailMeta> = [];
  private _purchasedTrails: Array<number>;

  constructor(
    private _localStorage: LocalStorageService,
  ) {
    super();
  }

  ngOnInit(): void {

    this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
    this._generateTrailLists();
  }

  private _generateTrailLists(): void {

    const _self = this;

    this.availableTrailList = [];

    const _trailData = getTrailsMetaData();

    for (const key in _trailData) {
      if (_self._purchasedTrails && _self._purchasedTrails.indexOf(_trailData[key].id) === -1 && _trailData[key].abbr !== 'DEMO') {
        if (_trailData[key].availableForPurchase === true) {
          _self.availableTrailList.push(_trailData[key]);
        }
      }
    }
  }


  // EVENTS

  public onTrailPurchased(trailId): void {

    // TODO app store routines

    if (this._purchasedTrails.indexOf(trailId) === -1) {

      this._purchasedTrails.push(trailId);
      this._purchasedTrails.sort();
      this._localStorage.store('purchasedTrails', this._purchasedTrails);

      this._generateTrailLists();
    }
  }
}
