import {AfterViewInit, Component, isDevMode, OnInit} from '@angular/core';
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
    private _orientationService: OrientationService
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

    // 55 gives roughly 3 points per mile
    _clone = this._trailGeneratorService.simplify(_clone, 80, true);

    alert(this._trailGeneratorService.flatTrailData.length + ' to ' + _clone.length + ' waypoints');

    const _gpx = createGPX(_trailMeta, _clone);

    saveFileAs(_gpx, _trailMeta.abbr + '.gpx');
  }

  public restore(): void {

    // clear the first run paramater, which triggers
    this._localStorageService.clear('firstRun');
    // this._localStorageService.clear();
    // should also delete local storage

    alert('Please restart the application');
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
}
