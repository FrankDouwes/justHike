import * as X2JS from 'x2js';
import {TrailMeta} from '../type/trail';
import {Poi} from '../type/poi';
import {Waypoint} from '../type/waypoint';

const _x2js = new X2JS({
  attributePrefix : ''    // no attribute prefix
});

// trail specific parser for AT data
export function parseSHRData (trail: TrailMeta, trailData: string, poiData: string, snow: object): Array<object> {

  // TRAIL
  let _waypoints: Array<Waypoint> = [];

  // 1. parse string
  // fix keys
  trailData = trailData
    .split('ele').join('elevation')
    .split('lat=').join('latitude=')
    .split('lon=').join('longitude=')

  // 2. parser to JSON
  const trailAsJson: JSON  = _x2js.xml2js(trailData);

  // 3. parse json
  // combine all track segments in a single array
  trailAsJson['gpx']['trk'][1]['trkseg'].forEach(function(track) {
    _waypoints = _waypoints.concat(track.trkpt);
  });

  // 1. parse string
  // fix keys
  poiData = poiData
    .split('ele').join('elevation')
    .split('lat=').join('latitude=')
    .split('lon=').join('longitude=')
    .split('dsc').join('description')
    .split('cmt').join('comment');

  // 2. parser to JSON
  const poiAsJson: JSON  = _x2js.xml2js(poiData);

  const _combinedPoiData = poiAsJson['gpx']['wpt'];

  // 3. adjust poi data
  const _pois: Array<Poi> = parsePois(_combinedPoiData);

  return [trail, _waypoints, _pois, snow];
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  pois.forEach(function(poi, index) {

    console.log(poi);

    poi['id'] = index;

    // create waypoint
    poi['waypoint'] = {latitude: poi['latitude'], longitude: poi['longitude'], elevation: poi['elevation']} as Waypoint;
    delete poi['latitude'];
    delete poi['longitude'];
    delete poi['elevation'];

    console.log(poi['waypoint']);

    // fix name

    if (poi['name'].match(/^\d/)) {
      // string starts with a number
      const _parts = poi['name'].split(' - ');
      poi['name'] = _parts[0];
      poi['label'] = _parts[1] || 'unknown';
    } else {
      poi['name'] = poi['label'] = poi['name'].split(' - ')[0];
    }

    // if no name, use a part of the description
    if (!poi['name']) {
      if (String(poi['description']).includes(' - ')) {
        poi['name'] = poi['label'] = poi['description'].split(' - ')[0] || 'unknown';
      } else {
        poi['name'] = poi['label'] = 'alternate';
      }
    }

    // TODO: parse poi types

    // set the type based on the remaining string
    const _identifier = poi['name'] + poi['label'];

    poi['type'] = 'unknown';

    if (_identifier.includes('Begin') || _identifier.includes('Mono Village')) {
      poi['type'] = 'end';
    }

    if (_identifier.includes('Peak') || _identifier.includes('Mount') || _identifier.includes('Col')) {
      poi['type'] = 'peak';
    }

    if (_identifier.includes('Lake') || _identifier.includes('Outlet') || _identifier.includes('WA')
      || _identifier.includes('Stream') || _identifier.includes('Tarn') || _identifier.includes('Creek')) {
      poi['type'] = 'water';
    }

    if (_identifier.includes('WACS')) {
      poi['type'] = 'water, camp';
    }

    if (_identifier.includes('Pass') || _identifier.includes('Saddle')) {
      poi['type'] = 'view';
    }

    if (_identifier.includes('Memorial')) {
      poi['type'] = 'sight';
    }

    if (_identifier.includes('OnionValley')) {
      poi['type'] = 'trailhead';
    }

    if (_identifier.includes('CS') || _identifier.includes('Campsite')) {
      poi['type'] = 'camp';
    }

    if (_identifier.includes('Point')) {
      poi['type'] = 'view';
    }

  });

  return pois as Array<Poi>;
}
