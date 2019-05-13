import {TrailMeta} from '../../type/trail';
import createGpx from 'gps-to-gpx';

/* dev only class for creating clean GPX data (for use with mobile atlas creator to generate tile sets) */
export function createGPX(trailMeta: TrailMeta, flatTrailData: any): any {

  const _gpxOptions: object = {
    activityName: trailMeta.abbr + ' simplified',
    creator: 'Frank Douwes',
    startTime: null,
    timeKey: 'time',
  };

  flatTrailData.forEach( function(waypoint: any) {
    delete waypoint.distanceTotal;
    delete waypoint.nearestToPois;
    delete waypoint.distance;
    waypoint['time'] = '';      // value gpx requires a time
  });

  const _files: Array<any> = [];

  // split in 3 (Atlas generator cant handle lots of waypoints)
  if (trailMeta.abbr !== 'DEMO') {

    const _fileLength = Math.ceil(flatTrailData.length / 3);
    const _arrays = _splitArray(flatTrailData, _fileLength);

    _arrays.forEach(function (fileData) {
      _files.push(createGpx(fileData, _gpxOptions));
    });
  } else {
    _files.push(createGpx(flatTrailData, _gpxOptions));
  }

  return _files;
}

// split an array into sections
function _splitArray(array: Array<any>, count: number) {
  const _res: Array<any> = [];
  while (array.length) {
    _res.push(array.splice(0, count));
  }
  return _res;
}
