import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrailMeta} from '../../../../../type/trail';
import {LocalStorageService} from 'ngx-webstorage';
import {MatSelectChange} from '@angular/material';
import {SettingsPanelComponent} from '../../../../../base/settings-panel/settings-panel.component';
import {DownloadService} from '../../../../../service/download.service';
import {getTrailMetaDataById, getTrailsMetaData} from '../../../../../_util/trail-meta';
import {ConnectionService} from '../../../../../service/connection.service';
import {getConnection, getDialogs, hasDialogs} from '../../../../../_util/cordova';
import {Subscription} from 'rxjs';
import {VersionResolverService} from '../../../../../service/version-resolver.service';

@Component({
  selector: 'trail-settings',
  templateUrl: './trail-settings.component.html',
  styleUrls: ['./trail-settings.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrailSettingsComponent extends SettingsPanelComponent implements OnInit, OnDestroy {

  @ViewChild('trailSelector') trailSelector: ElementRef;

  private _dataTypes = ['trail', 'snow', 'tiles'];
  public downloaders = [];

  public purchasedTrailList:        Array<TrailMeta> = [];
  public activeTrail:               TrailMeta;      // meta of the current trail

  // connection type checking
  public hasInternet: boolean;
  public hasWifi: boolean;
  public updates: object = {};                      // update available (accessible by name)

  private _purchasedTrails:         Array<number>;  // ids of all purchased trails
  private _storedTrailId:           number;         // the current trail ID
  private _downloadersActive:       boolean;        // are there active downloaders

  public currentVersions: object = {};                   // version data (accessible by name)
  private _versionSubscriptions: object = {};       // local storage subscriptions
  private _updateSubscriptions: object = {};       // local storage subscriptions

  constructor(
    private _versionResolverService:  VersionResolverService,
    private _changeDetector:        ChangeDetectorRef,
    private _localStorage:          LocalStorageService,
    private _downloadService:       DownloadService,
    private _connectionService:     ConnectionService
  ) {
    super();
  }

  ngOnInit(): void {

    super.ngOnInit();

    const _self = this;

    this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
    this.activeTrail = getTrailMetaDataById(this._localStorage.retrieve('activeTrailId') || 0);

    this._downloadService.isDownloadingObservable.subscribe(function(result) {
      _self._downloadersActive = result;
    });

    this._generateTrailLists();

    this.hasInternet = (this._connectionService.getStatus() === 'online');

    const _internetType = this._connectionService.getConnectionInfo()['state'];
    const _connection = getConnection();

    if (_connection) {
      if (_internetType === _connection.WIFI) {
        this.hasWifi = true;
      }
    }

    this._setupUpdateSubscriptions();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._removeVersionSubscriptions();
    this._removeUpdateSubscriptions();
  }


  // SETUP

  private _generateTrailLists(): void {

    const _self = this;

    this.purchasedTrailList = [];

    const _trailData = getTrailsMetaData();

    for (const key in _trailData) {
      if (_self._purchasedTrails && _self._purchasedTrails.indexOf(_trailData[key].id) !== -1 || _trailData[key].abbr === 'DEMO') {
        _self.purchasedTrailList.push(_trailData[key]);
      }
    }
  }


  private _setupUpdateSubscriptions(): void {

    const _self = this;

    this._removeVersionSubscriptions();
    this._removeUpdateSubscriptions();

    _self.downloaders = [];

    this._dataTypes.forEach(function(type) {
      console.log(_self.activeTrail[type + 'Version']);
      if (_self.activeTrail[type + 'Version']) {
        _self.downloaders.push(type);
      }
    })

    this.downloaders.forEach(function(name) {

      _self._setupVersionSubscription(name);
      _self._updateSubscriptions[name] = _self._versionResolverService.observables[_self.activeTrail.abbr + '_' + name + 'Available'].subscribe(function(result) {
        // console.log('VERSION CHANGED UPDATE', name, result);
        _self.updates[name] = result;
        _self._changeDetector.detectChanges();
      });
    });
  }

  private _setupVersionSubscription(name: string):void {

    this._versionSubscriptions[name] = this._localStorage.observe(this.activeTrail.abbr + '_' + name + 'Version').subscribe(result => {
      console.log('VERSION CHANGED', name, result);
      this.currentVersions[name + 'Version'] = result;
      this._changeDetector.detectChanges();
    });

    // set initial value
    this.currentVersions[name + 'Version'] = this._localStorage.retrieve(this.activeTrail.abbr + '_' + name + 'Version');
  }

  private _removeVersionSubscriptions(): void {
    for (const key in this._versionSubscriptions) {
      let _subscription: Subscription = this._versionSubscriptions[key];
      if (_subscription) {
        _subscription.unsubscribe();
        _subscription = null;
      }
    }
  }

  private _removeUpdateSubscriptions(): void {
    for (const key in this._updateSubscriptions) {
      let _subscription: Subscription = this._updateSubscriptions[key];
      if (_subscription) {
        _subscription.unsubscribe();
        _subscription = null;
      }
    }
  }

  // triggered from template
  public displayVersion(name: string): string {
    // console.log('base version', name);

    if (this.updates[name]) {
      // console.log('- from updates', this.activeTrail[name + 'Version']);
      return this.activeTrail[name + 'Version'];    // the online version
    } else {
      // console.log('- from current', this.currentVersions[name + 'Version']);
      return this.currentVersions[name + 'Version'];      // the installed version
    }
  }

  // triggered from template
  public updateAvailable(name: string): boolean {

    // console.log('updates available', name, this.updates[name]);

    return this.updates[name];
  }

  // triggered from template
  public hasFile(name: string): boolean {
    // console.log('has file', this.currentVersions[name + 'Version']);
    return (this.currentVersions[name + 'Version'] === this.updates[name + 'Version']);
  }


  // EVENTS

  /* when a new trail is selected
  * - check for mismatch to current trail
  * - show a warning if user is still downloading data for the old selected trail
  * - set new trail and invalidate for reload (in app.component) */
  public onTrailSelect(event: MatSelectChange): void {

    const _id: number = Number(event.value);

    if (_id !== this._storedTrailId) {

      if (hasDialogs() && this._downloadersActive) {

        const _dialog = getDialogs();
        _dialog.confirm(
          'Switching trails cancels all active downloads',
          this._setActiveTrail.bind(this),
          'Warning',
          ['Cancel', 'Continue']
        );

      } else {

        if (this._downloadersActive) {
          alert('canceling downloads');
        }
        this._setActiveTrail();
        this._changeDetector.markForCheck();
      }
    }
  }

  // in conjunction with onTrailSelect();
  private _setActiveTrail(buttonId?: number): void {

    buttonId = buttonId || 2;

    const _currentValue: number = this._storedTrailId;
    const _newValue: number = this.trailSelector['value'];

    if (buttonId === 2 && _currentValue !== _newValue) {
      if (this._downloadersActive) {

        // cancels active downloaders and clears data
        this._downloadService.clearDownloaders(this.activeTrail.abbr, true);
      }
      this._storedTrailId = this._localStorage.store('activeTrailId', _newValue);
      this.activeTrail = getTrailMetaDataById(_newValue);



      this._setupUpdateSubscriptions();

      super.invalidate();
    } else {
      this.trailSelector['value'] = _currentValue;      // reset to old value
    }

  }

  public onDownloadComplete(type: string): void {
    console.log(type + 'data downloaded');
    this._localStorage.store(this.activeTrail.abbr + '_' + type + 'Version', this.activeTrail[type + 'Version']);
  }

  public onDownloadCleared(type: string): void {
    console.log('CLEAR');
    this._localStorage.store(this.activeTrail.abbr + '_' + type + 'Version', 0.1);
  }
}
