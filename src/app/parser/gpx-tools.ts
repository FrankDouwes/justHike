import {Trail, TrailMeta} from '../type/trail';
import {isDevMode} from '@angular/core';
import createGpx from 'gps-to-gpx';
import {Waypoint} from '../type/waypoint';


/* dev only class for creating clean GPX data (for use with mobile atlas creator to generate tile sets) */
export function createGPX(trailMeta: TrailMeta, flatTrailData: any): any {

  if (!isDevMode()) {
    alert('Attempting to access a dev only function: gpxCombine()');
    return;
  }

  const _gpxOptions: object = {
    activityName: 'PCT simplified',
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

  return createGpx(flatTrailData, _gpxOptions);
}
