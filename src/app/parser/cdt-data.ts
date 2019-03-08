import * as X2JS from 'x2js';
import {Trail} from '../type/trail';
import {Poi} from '../type/poi';
import {Waypoint} from '../type/waypoint';

const _x2js = new X2JS({
  attributePrefix : ''    // no attribute prefix
});

// trail specific parser for CDT data
export function parseCDTData (trail: Trail, trailData: string, poiData: string, snow: object): Array<object> {

  // TRAIL (trail is a KML)
  const _waypoints: Array<Waypoint> = [];

  // 1. parser to JSON
  const _trailAsJson: JSON  = _x2js.xml2js(trailData);

  // 2. convert coordinates (flat string to lat/lon/ele)
  const _coordinates = _trailAsJson['kml'].Document.Folder.Placemark.MultiGeometry.LineString.coordinates;
  const _coordArray = _coordinates.split(' ');
  _coordArray.forEach(function( coord, index): void {
    const _coordValues: Array<number> = coord.split(',');
    _waypoints.push({latitude: _coordValues[1], longitude: _coordValues[0], elevation: _coordValues[2]});
  });

  // POIS TODO XXX

  // SNOW (the current snow pack)
  const _snow = snow['datasets'][0]

  return [trail, _waypoints, null, _snow];
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  return [];
}
