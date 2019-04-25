import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../service/loader.service';
import {TrailMeta} from '../../type/trail';
import {getTrailMetaDataById, getTrailsMetaData} from '../../_util/trail-meta';
import {LocalStorageService} from 'ngx-webstorage';
import {switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TrailService} from '../../service/trail.service';
import {saveFileAs} from '../../_util/save';
import {FilesystemService} from '../../service/filesystem.service';
import {createGPX} from '../../_util/admin/gpx-tools';
import {TrailGeneratorService} from '../../service/trail-generator.service';
import {OrientationService} from '../../service/orientation.service';
import {SequentialResolverService} from '../../service/sequential-resolver.service';
import {cloneData} from '../../_util/generic';
import {Waypoint} from '../../type/waypoint';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  // public compass: number;

  public trailMeta: Array<TrailMeta>;
  public selectedTrail = 0;
  public selectedDirection = 0;
  public trailDataStateClassName: string = '';

  private _generatedData: any;

  public directions: Array<any> = [
    {id: 0, name:'nobo'},
    {id: 1, name:'sobo'}
  ];

  constructor(
    private _fileSystemService: FilesystemService,
    private _trailService: TrailService,
    private _trailGeneratorService: TrailGeneratorService,
    private _localStorageService: LocalStorageService,
    private _loaderService: LoaderService,
    // private _orientationService: OrientationService,
    private _sequentialResolver: SequentialResolverService
  ) { }

  ngOnInit() {

    const _trailMetaObj = getTrailsMetaData();

    this.trailMeta = Object.keys(_trailMetaObj).map(function(key) {
      return _trailMetaObj[key];
    });
    //
    // this._orientationService.orientationObserver.subscribe(function(direction) {
    //   _self.compass = direction;
    // });
    //
    // this._orientationService.startTracking();
  }

  public genGpxData(): void {

    const _trailMeta: TrailMeta = getTrailMetaDataById(Number(this.selectedTrail));

    // simplify the track for app: Mobile Atlas Creator
    const _clone: Array<any> = cloneData(this._trailGeneratorService.flatTrailData) as Array<Waypoint>;

    // 55 gives roughly 3 points per mile (PCT)
    // _clone = this._trailGeneratorService.simplify(_clone, 0.1, true);

    alert(this._trailGeneratorService.flatTrailData.length + ' to ' + _clone.length + ' waypoints');

    const _gpx: Array<any> = createGPX(_trailMeta, _clone);

    _gpx.forEach(function(file, index) {
      saveFileAs(file, _trailMeta.abbr + '_' + index + '.gpx');
    })

  }

  public generateTrailData(): void {

    this.trailDataStateClassName = '';

    this._getRawData().subscribe( data => {

      const _trailMeta: TrailMeta = data[0];
      const _dataOffset: number = (_trailMeta.parts) ? _trailMeta.parts - 1 : 0;

      let _waypointData: Array<string> | string;
      if (_trailMeta.multipart) {

        _waypointData = [];

        for (let i = 0; i <= _dataOffset; i++) {
          _waypointData.push(data[i + 1]);
        }
      } else {
        _waypointData = data[1];
      }

      console.log(data);

      const _parsedData = this._trailService.parseTrailData(data[0], _waypointData, data[2 + _dataOffset], data[3 + _dataOffset], data[4 + _dataOffset], Number(this.selectedDirection));

      this._generatedData = _parsedData;
      this.trailDataStateClassName = 'generated';
    });
  }

  private _getRawData(): Observable<any> {

    this._loaderService.showOverlay();

    return this._trailService.getRawTrailData(Number(this.selectedTrail)).pipe(

      take(1),
      switchMap(data => {

        this._loaderService.hideOverlay();

        if (data) {

          // return parsed trail
          return of(data);

        } else {

          alert('Error!');

          this.trailDataStateClassName = 'error';

          return;
        }
      })
    );
  }

  public downloadData(type: string): void {

    const _trailAbbr: string = getTrailMetaDataById(Number(this.selectedTrail)).abbr;
    const _direction: string = this.directions[Number(this.selectedDirection)].name;

    let _fileName:string = _trailAbbr + '-' + type;

    if (type === 'trail') {
      _fileName +=  '-' + _direction;
    }

    saveFileAs(this._generatedData[type], _fileName + '.json');
  }

  public clearStorage(): void {

    const _self = this;

    this.trailMeta.forEach(function(meta:TrailMeta) {
      _self._fileSystemService.deleteDirectory(meta.abbr, function() {
        console.log(meta.abbr + ' directory deleted');
      });
    });
  }

  // clears all user data with the exception of tile downloaded flags ([abbr]Version)
  public defaultUserData(): void {

    // clear all
    this._localStorageService.clear();

    // set defaults
    this._sequentialResolver.firstRun();
  }

  public safeClearUserData(): void {

    const _self = this;
    
    // get tile settings (don't want to delete those flags as it would require a re-download of all tiles)
    const _tileSettings = {};
    this.trailMeta.forEach(function(meta: TrailMeta) {
      _tileSettings[meta.abbr + 'Version'] = _self._localStorageService.retrieve(meta.abbr + 'Version');
    });

    console.log(_tileSettings);

    // clear all
    this._localStorageService.clear();

    // set defaults
    this._sequentialResolver.firstRun();

    this.trailMeta.forEach(function(meta: TrailMeta) {
      console.log(_tileSettings[meta.abbr + 'Version']);
      if (_tileSettings[meta.abbr + 'Version'] !== null) {
        _self._localStorageService.store(meta.abbr + 'Version', _tileSettings[meta.abbr + 'Version']);
      }
    });
  }

  public reset(): void {
    this.clearStorage();
    this.defaultUserData();
  }

  public disableSimulation(): void {

    const _current = this._localStorageService.retrieve('disableSimulation');
    this._localStorageService.store('disableSimulation', !(_current))
  }

  public sendAllNotes(): void {
    const _notes = this._localStorageService.retrieve(this._trailGeneratorService.getTrailData().abbr + '_notes');
    window.open('mailto:frankdouwes@gmail.com?subject=Hello there&body=' + _notes);
  }

  public sendAllPins(): void {
    alert('not implemented');
  }
}
