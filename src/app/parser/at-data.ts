import * as X2JS from 'x2js';
import {TrailMeta} from '../type/trail';
import {Poi} from '../type/poi';
import {Waypoint} from '../type/waypoint';

const _x2js = new X2JS({
  attributePrefix : ''    // no attribute prefix
});

// trail specific parser for AT data
export function parseATData (trail: TrailMeta, trailData: string, poiData: string, snow: object): Array<object> {

  // TRAIL (trail is KML)
  const _waypoints: Array<Waypoint> = [];

  // 1. parser to JSON
  const _trailAsJson: JSON  = _x2js.xml2js(trailData);

  const _coordinates = _trailAsJson['kml'].Document.Folder.Placemark;

  console.log(_coordinates);

  //
  // const _coordArray = _coordinates.split(' ');
  //
  // _coordArray.forEach(function( coord, index): void {
  //
  //   const _coordValues: Array<number> = coord.split(',');
  //   _waypoints.push({latitude: _coordValues[1], longitude: _coordValues[0], elevation: _coordValues[2]});
  // });
  //
  // // POIS TODO XXX
  //
  // // SNOW (the current snow pack)
  // const _snow = snow['datasets'][0]
  //
  // return [trail, _waypoints, null, _snow];

  return;
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  return [];
}
