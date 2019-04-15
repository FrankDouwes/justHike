import {Trail, TrailMeta} from '../type/trail';
import {isDevMode} from '@angular/core';
import createGpx from 'gps-to-gpx';
import {Waypoint} from '../type/waypoint';


/* dev only class for creating clean GPX data (for use with mobile atlas creator to generate tile sets) */
export function createGPX(trailMeta: TrailMeta, flatTrailData: any): any {

  const _gpxOptions: object = {
    activityName: trailMeta.abbr + 'simplified',
    creator: 'Frank Douwes',
    startTime: null,
    timeKey: 'time',
  }

  flatTrailData.forEach( function(waypoint: any) {
    delete waypoint.distanceTotal;
    delete waypoint.nearestToPois;
    delete waypoint.distance;
    waypoint['time'] = null;
  })

  // split in 3
  // const _fileLength = Math.ceil(flatTrailData.length / 3);
  // const _arrays = _splitArray(flatTrailData, _fileLength);
  const _files: Array<any> = [];
  //
  // _arrays.forEach(function(fileData) {
  //   _files.push(createGpx(fileData, _gpxOptions));
  // });

  _files.push(createGpx(flatTrailData, _gpxOptions));
  
  return _files;
}

function _splitArray(array: Array<any>, count: number) {
  const _res: Array<any> = [];
  while (array.length) {
    _res.push(array.splice(0, count));
  }
  return _res;
}
