import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';

import { parsePCTData  } from '../parser/pct-data';
import {Trail} from '../type/trail';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TrailService {

  private _baseUrl = 'assets/data/';
  private _cachedData: Trail;

  constructor(private _http: HttpClient) {}

  /* SERVICE to fetch raw (xml/gpx) data and convert it into usable JSON data,
  // this will eventually be replaced with a fetch of already parsed/optimised JSON data TODO */
  getTrailData(path: string): Observable<object> {

    // if cached

    // else load parsed

    // else download raw

    const _trail = this._http.get(this._baseUrl + path + 'trail.gpx', {responseType: 'text'});
    const _poi = this._http.get(this._baseUrl + path + 'poi.gpx', {responseType: 'text'});
    const _snow = this._http.get(this._baseUrl + path + 'snow.json', {responseType: 'json'});

    // needs error handling ??? TODO

    return forkJoin([_trail, _poi, _snow]);
  }

  // only to parse raw (external) trail data to usable data, data as text (string), will be replaced TODO
  parseTrailData(trail: Trail, waypoints: string, pois: string, snow: object): Trail {
    if (trail.abbr === 'PCT') {
      return (this._cachedData) ? this._cachedData : this._cachedData = parsePCTData(trail, waypoints, pois, snow);
    }
  }

  handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}`);
    }
    // return throwError('Something bad happened; please try again later.');

    // show popup with retry button TODO
  }

}
