import { Component, OnInit } from '@angular/core';
import { Trail } from '../../../../../type/trail';
import { LocalStorageService } from 'ngx-webstorage';
import { MatSelectChange } from '@angular/material';
import { SettingsPanelComponent } from '../../../../../display/settings-panel/settings-panel.component';
import { environment } from '../../../../../../environments/environment.prod';
import { DownloadService } from '../../../../../service/download.service';
import { getTrailDataById } from '../../../../../_util/trail';

@Component({
  selector: 'purchase-settings',
  templateUrl: './purchase-settings.component.html',
  styleUrls: ['./purchase-settings.component.sass'],
})
export class PurchaseSettingsComponent extends SettingsPanelComponent implements OnInit {

  public purchasedTrailList: Array<Trail> = [];
  public availableTrailList: Array<Trail> = [];
  public activeTrail: Trail;
  public basePath: string;
  public version: string;

  private _storedTrailId: number;
  private _purchasedTrails: Array<number>;

  constructor(
    private _localStorage: LocalStorageService,
    private _downloadService: DownloadService
  ) {
    super();
  }

  ngOnInit(): void {

    this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
    this.activeTrail = getTrailDataById(this._localStorage.retrieve('activeTrailId') || 0);

    this.version = environment.version;
    this.basePath = this.activeTrail.dataPath;

    this._generateTrailLists();
  }

  private _generateTrailLists(): void {

    const _self = this;

    this.availableTrailList = [];
    this.purchasedTrailList = [];

    environment.TRAILS.forEach(function(trail, index) {
      if (_self._purchasedTrails.indexOf(trail.id) === -1 && trail.abbr !== 'DEMO') {
        _self.availableTrailList.push(trail);
      } else {
        _self.purchasedTrailList.push(trail);
      }
    });
  }




  // EVENTS

  public onTrailSelect(event: MatSelectChange): void {

    const _id: number = Number(event.value);

    if (_id !== this._storedTrailId) {
      this._downloadService.clearDownloaders();
      this._storedTrailId = this._localStorage.store('activeTrailId', _id);
      this.activeTrail = getTrailDataById(_id);
      super.invalidate();
    }
  }

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
