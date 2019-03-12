import { Component, OnInit } from '@angular/core';
import { TrailMeta } from '../../../../../type/trail';
import { LocalStorageService } from 'ngx-webstorage';
import { MatSelectChange } from '@angular/material';
import { SettingsPanelComponent } from '../../../../../display/settings-panel/settings-panel.component';
import { DownloadService } from '../../../../../service/download.service';
import {getTrailMetaDataById} from '../../../../../_util/trail';
import {ConnectionService} from '../../../../../service/connection.service';
import {getConnection} from '../../../../../_util/cordova';

@Component({
  selector: 'trail-settings',
  templateUrl: './trail-settings.component.html',
  styleUrls: ['./trail-settings.component.sass']
})

export class TrailSettingsComponent extends SettingsPanelComponent implements OnInit {

  public purchasedTrailList: Array<TrailMeta> = [];
  public activeTrail: TrailMeta;
  public basePath: string;
  public version: string = '1.0';

  public hasInternet: boolean;
  public hasWifi: boolean;

  private _storedTrailId: number;
  private _purchasedTrails: Array<number>;

  constructor(
    private _localStorage: LocalStorageService,
    private _downloadService: DownloadService,
    private _connectionService: ConnectionService
  ) {
    super();
  }

  ngOnInit(): void {

    this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
    this.activeTrail = getTrailMetaDataById(this._localStorage.retrieve('activeTrailId') || 0);
    this.basePath = this.activeTrail.abbr + '/';

    this._generateTrailLists();

    this.hasInternet = (this._connectionService.getStatus() === 'online');

    const _internetType = this._connectionService.getConnectionInfo()['state'];
    const _connection = getConnection();

    if (_connection) {
      if (_internetType === _connection.WIFI) {
        this.hasWifi = true;
      }
    }

  }

  private _generateTrailLists(): void {

    const _self = this;

    this.purchasedTrailList = [];

    const _trailData = this._localStorage.retrieve('versionData');

    for (const key in _trailData) {
      if (_self._purchasedTrails && _self._purchasedTrails.indexOf(_trailData[key].id) !== -1 || _trailData[key].abbr === 'DEMO') {
        _self.purchasedTrailList.push(_trailData[key]);
      }
    }
  }


  // EVENTS

  public onTrailSelect(event: MatSelectChange): void {

    const _id: number = Number(event.value);

    if (_id !== this._storedTrailId) {
      this._downloadService.clearDownloaders();
      this._storedTrailId = this._localStorage.store('activeTrailId', _id);
      this.activeTrail = getTrailMetaDataById(_id);
      super.invalidate();
    }
  }

  public onTilesDownloaded(): void {
    this._localStorage.store('tilesVersion',  this.activeTrail.tilesVersion);
    alert('download complete, version updated to ' + this.activeTrail.tilesVersion);
  }
}
