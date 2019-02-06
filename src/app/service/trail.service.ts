import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { parsePCTData  } from '../parser/pct-data';
import {getTrailDataById, Trail} from '../type/trail';
import {catchError, map} from 'rxjs/operators';
import {parseDemoData} from '../parser/demo-data';
import {parseCDTData} from '../parser/cdt-data';
import {parseATData} from '../parser/at-data';

@Injectable({
  providedIn: 'root'
})

export class TrailService {

  private _baseUrl = 'assets/data/';
  private _cachedTrail: Trail;

  constructor(private _http: HttpClient) {}

  /* SERVICE to fetch raw (xml/gpx) data and convert it into usable JSON data,
  // TODO: this will eventually be replaced with a fetch of already parsed/optimised JSON data */
  getTrailData(trailId: number): Observable<object> {

    const _trailMeta = getTrailDataById(trailId);
    const _metaAsObservable = of(_trailMeta);     // so it can be passed into the forkjoin

    const _trail = this._http.get(this._baseUrl + _trailMeta.dataPath + 'trail.gpx', {responseType: 'text'});
    const _poi = this._http.get(this._baseUrl + _trailMeta.dataPath + 'poi.gpx', {responseType: 'text'});
    const _snow = this._http.get(this._baseUrl + _trailMeta.dataPath + 'snow.json', {responseType: 'json'});

    // TODO: needs error handling ???

    return forkJoin([_metaAsObservable, _trail, _poi, _snow]);
  }

  // TODO: only to parse raw (external) trail data to usable data, data as text (string), will be replaced
  parseTrailData(trail: Trail, waypoints: string, pois: string, snow: object): Trail {

    // if it matches the cached trail
    if (this._cachedTrail && this._cachedTrail.abbr === trail.abbr) {
      return this._cachedTrail;
    }

    // else parse new trail data (slow)
    else {
      if (trail.abbr === 'DEMO') {
        return  this._cachedTrail = parseDemoData(trail, waypoints, pois, snow);
      } else if (trail.abbr === 'PCT') {
        return this._cachedTrail = parsePCTData(trail, waypoints, pois, snow);
      } else if (trail.abbr === 'CDT') {
        return this._cachedTrail = parseCDTData(trail, waypoints, pois, snow);
      } else if (trail.abbr === 'AT') {
        return this._cachedTrail = parseATData(trail, waypoints, pois, snow);
      }
    }
  }

  handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    // return throwError('Something bad happened; please try again later.');

    // TODO: show popup with retry button
  }

}
