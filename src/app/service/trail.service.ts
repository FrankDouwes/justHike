import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { of } from 'rxjs';
import { TrailMeta } from '../type/trail';
import { LocalStorageService } from 'ngx-webstorage';
import { LoaderService } from './loader.service';
import { TrailGeneratorService } from './trail-generator.service';
import { Waypoint } from '../type/waypoint';
import { Poi } from '../type/poi';
import { SnowGeneratorService } from './snow-generator.service';
import { parseSnow, reverseSnow } from '../_util/snow';
import { environment } from '../../environments/environment.prod';
import { getTrailMetaDataById } from '../_util/trail-meta';
import { FilesystemService } from './filesystem.service';

// dynamically called
import { parsePCTData } from '../parser/pct-data';
import { parseDEMOData } from '../parser/demo-data';
import { parseCDTData } from '../parser/cdt-data';
import { parseATData } from '../parser/at-data';
import {parseSHRData} from '../parser/shr-data';


@Injectable({
  providedIn: 'root'
})

/* 2 options
- get the locally stored (user downloaded) combined trail file (that includes trail & poi), 2 separate JSONs, trail has nobo/sobo versions
- get the default combined file (from assets, baked into the app), 2 separate JSONs, trail has nobo/sobo versions*/
export class TrailService {

  // prevent removal of dynamically used imports (tree shaking), see: https://github.com/Microsoft/TypeScript/issues/9191
  // since each dataset has a different source, they all have their own parsing routine, before step 2 (generateMiles() / parseSnow())
  private _parseDEMOData:   Function = parseDEMOData;
  private _parsePCTData:    Function = parsePCTData;
  private _parseCDTData:    Function = parseCDTData;
  private _parseATData:     Function = parseATData;
  private _parseSHRData:    Function = parseSHRData;

  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService,
    private _loaderService: LoaderService,
    private _trailGenerator: TrailGeneratorService,
    private _snowGenerator: SnowGeneratorService,
    private _fileSystemService: FilesystemService
  ) {}

  // Get raw trail data, for parsing (dev mode)
  // this generates the preparsed data files to be used by regular users (stored online for download + default version in assets)
  // supports trails that consist of multiple files (sections)
  public getRawTrailData(trailId: number): Observable<object> {

    let _trailMeta: TrailMeta;
    const _observables = [];

    for (const key in environment.TRAILS_GENERATION) {
      if (environment.TRAILS_GENERATION[key].id === trailId) {
        _trailMeta = environment.TRAILS_GENERATION[key] as TrailMeta;
      }
    }

    const _metaAsObservable = of(_trailMeta);     // so it can be passed into the forkjoin
    _observables.push(_metaAsObservable);

    // AT data from the ATC
    // PCT data from halfmile
    // CDT data from CDTC (might be able to get better dataset)
    // SHR http://onthetrail.org/trekking/shr/ (unofficial)
    // TODO: snow data ripped from postholer (not very nice, I know)

    // .dat is an xml structured file (so .gpx or .kml)


    const _assetsDir: string = 'assets/data/';

    if (_trailMeta.multipart) {
      for(let i = 0; i < _trailMeta.parts; i++) {
        const _trailDownloader = this._http.get(_assetsDir + _trailMeta.dataPath + 'trail_' + i + '.dat', {responseType: 'text'});
        _observables.push(_trailDownloader);
      }
    } else {
      const _trail = this._http.get(_assetsDir + _trailMeta.dataPath + 'trail.dat', {responseType: 'text'});
      _observables.push(_trail);
    }

    const _poi = this._http.get(_assetsDir + _trailMeta.dataPath + 'poi.dat', {responseType: 'text'});
    _observables.push(_poi);

    // snow is an optional data file
    let _snow: Observable<Object>;
    if (_trailMeta.snowVersion) {
      _snow = this._http.get(_assetsDir + _trailMeta.dataPath + 'snow.json', {responseType: 'json'});
      _observables.push(_snow);
    }

    return forkJoin(_observables);
  }

  // Get the pre parsed trail data (regular user), returns a promise
  public getPreParsedTrailData(trailId: number, direction: number): Observable<object> {

    const _self = this;
    const _trailMeta = getTrailMetaDataById(trailId);
    const _directionString: string = (direction === 0) ? 'nobo' : 'sobo';

    this._loaderService.showMessage('fetching trail data');

      const _getData = async function(name: string, hasDirection: boolean) {

        return new Promise(function(resolve, reject) {

          const _fileName = (hasDirection) ? name + '-' + _directionString + '.json' : name + '.json';

          _self._fileSystemService.readFile(_trailMeta.abbr, _fileName, async function(result) {

            if (result && result !== 'error') {

              resolve(result);

            } else {

              // if there isn't a trail, get it from assets
              _self._http.get('assets/files/' + _trailMeta.abbr + '/' + _fileName, {responseType: 'json'}).subscribe(function (file) {
                resolve(file);
              });
            }
          });
      });
    };


    // attempt to get data from filesystem, if that fails, get it from assets
    const _observables = [];

    const _trailData = _getData('trail', true);
    _observables.push(_trailData);

    if (_trailMeta.snowVersion) {
      const _snowData = _getData('snow', false);
      _observables.push(_snowData);
    }

    return forkJoin(_observables);
  }

  // Parse the raw data (routines for each trail), returns a promise
  public parseTrailData(trail: TrailMeta, waypoints: Array<string> | string, pois: string, snow: object, direction: number): object {

    this._loaderService.showMessage('parsing trail data');

    // dynamic function call
    const _parsed = this['_parse' + trail.abbr + 'Data'](trail, waypoints, pois, snow, direction);

    const _trail = this._trailGenerator.generateMiles(
      _parsed[0] as TrailMeta,
      _parsed[1] as  Array<Waypoint>,
      _parsed[2] as Array<Poi>,
      direction
    );

    let _snow;
    if (_parsed[3]) {
      _snow = parseSnow(_parsed[3], _trail.id, _trail.abbr, trail.snowVersion);

      if (direction === 1) {
        _snow = reverseSnow(_snow, _trail.miles.length);
      }

      this._snowGenerator.setSnowData(_snow);
    }


    return {trail: _trail, snow: _snow};
  }
}
