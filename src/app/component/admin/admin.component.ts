import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../service/loader.service';
import {TrailMeta} from '../../type/trail';
import {getTrailMetaDataById, getTrailsMetaData} from '../../_util/trail';
import {LocalStorageService} from 'ngx-webstorage';
import {switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {TrailService} from '../../service/trail.service';
import {saveFileAs} from '../../_util/save';
import {FilesystemService} from '../../service/filesystem.service';
import {createGPX} from '../../parser/gpx-tools';
import {TrailGeneratorService} from '../../service/trail-generator.service';
import {OrientationService} from '../../service/orientation.service';
import {SequentialResolverService} from '../../service/sequential-resolver.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  public compass:number;

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
    private _orientationService: OrientationService,
    private _sequentialResolver: SequentialResolverService
  ) { }

  ngOnInit() {

    const _self = this;
    const _trailMetaObj = getTrailsMetaData();

    this.trailMeta = Object.keys(_trailMetaObj).map(function(key) {
      return _trailMetaObj[key];
    });

    this._orientationService.orientationObserver.subscribe(function(direction) {
      _self.compass = direction;
    });

    this._orientationService.startTracking();
  }

  public genGpxData(): void {

    const _self = this;
    const _trailMeta: TrailMeta = getTrailMetaDataById(Number(this.selectedTrail));

    // simplify the track for app: Mobile Atlas Creator
    let _clone: Array<any> = JSON.parse(JSON.stringify(this._trailGeneratorService.flatTrailData));

    // 55 gives roughly 3 points per mile (PCT)
    _clone = this._trailGeneratorService.simplify(_clone, 80, true);

    alert(this._trailGeneratorService.flatTrailData.length + ' to ' + _clone.length + ' waypoints');

    const _gpx:Array<any> = createGPX(_trailMeta, _clone);

    _gpx.forEach(function(file, index) {
      saveFileAs(file, _trailMeta.abbr + '_' + index + '.gpx');
    })

  }

  public generateTrailData(): void {

    this.trailDataStateClassName = '';

    this._getRawData().subscribe( data => {

      const _parsedData = this._trailService.parseTrailData(data[0], data[1], data[2], data[3], Number(this.selectedDirection));

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
}
