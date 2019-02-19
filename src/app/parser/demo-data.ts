import * as X2JS from 'x2js';
import { Waypoint } from '../type/waypoint';
import { Poi } from '../type/poi';
import { Trail } from '../type/trail';

const _x2js = new X2JS({
  attributePrefix : ''    // no attribute prefix
});

// trail specific parser for PCT data

export function parseDEMOData (trail: Trail, trailData: string, poiData: string, snow: object): Array<object> {

  // TRAIL
  let _waypoints: Array<Waypoint> = [];

  // 1. parse string
  // fix keys
  trailData = trailData
    .split('ele').join('elevation')
    .split('lat=').join('latitude=')
    .split('lon=').join('longitude=');

  // 2. parser to JSON
  const trailAsJson: JSON  = _x2js.xml2js(trailData);

  // 3. parse json
  // get just the main trail data, ignore side-trails
  trailAsJson['gpx']['trk'].filter(function(track) {
    return track.extensions.TrackExtension.DisplayColor.__text.includes('Red');
  }).map(function(track) {
    _waypoints = _waypoints.concat(track.trkseg.trkpt);
  });



  // POIS (=points of interest. water sources, campsites etc.)

  // 1. parse string
  // fix keys
  poiData = poiData
    .split('ele').join('elevation')
    .split('lat=').join('latitude=')
    .split('lon=').join('longitude=')
    .split('desc').join('description')
    .split('sym').join('icon');

  // 2. parser to JSON
  const poiAsJson: JSON  = _x2js.xml2js(poiData);

  // 3. adjust poi data
  const _pois: Array<Poi> = parsePois(poiAsJson['gpx']['wpt']);

  // SNOW (the current snow pack, from postholer.com

  let _snow: Array<any> = [];
  snow['datasets'][0].forEach(function(point, index) {
    if (point.x <= trail.length) {
      _snow.push(point);
    }
  })

  // return
  return [trail, _waypoints, _pois, _snow];
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  const _poisLength: number = pois.length;     // faster
  const _parsedPois: Array<Poi> = [];

  const _identifierTypes: object = {
    BGCa: "",
    BV: "",
    BVB: "",
    CS: 'camp',
    CSB: "",
    CSC: "",
    GT: 'gate',
    GTB: "",
    GTC: "",
    Hwy: 'highway',
    MexB: 'end',
    CanB: 'end',
    PL: 'powerline',
    PLB: "",
    PO: 'postoffice',
    RD: 'road',
    RDB: 'road',
    RDb: "",
    RR: 'railroad',
    TR: 'trail',
    WACS: 'water, camp',
    WR: 'water',
    WRA: 'water',
    WRB: 'water',
    WRC: 'water',
    WRCS: 'water, camp',
  };

  for (let i = 0; i < _poisLength; i++) {

    const _poi: object = pois[i];

    _poi['id'] = i;

    // delete if poi is mile marker
    if (_poi['icon'] === 'Triangle, Red') {
      delete pois[i];
    } else {

      // create waypoint
      _poi['waypoint'] = {latitude: _poi['latitude'], longitude: _poi['longitude'], elevation: _poi['elevation']} as Waypoint;
      delete _poi['latitude'];
      delete _poi['longitude'];
      delete _poi['elevation'];

      // remove color from icon
      delete _poi['icon'];
      // _poi['icon'] = _poi['icon'].split(', ')[0].replace(/\s/g, '');

      // set the type based on the remaining string
      const _identifier = _poi['name'].replace(/\d+/g, '').substr(0, 4);

      _poi['type'] = _identifierTypes[_identifier];
      if (!_poi['type']) {
        _poi['type'] = 'unknown';
      }

      // title & description
      const _descriptionArr = _poi['description'].split('---').join('').split(',');
      _poi['label'] = _descriptionArr.shift();
      _poi['description'] = parseStringUrls(_descriptionArr.join(''));

      _parsedPois.push(_poi as Poi);
    }
  }

  return _parsedPois;
}


function parseStringUrls(s: string) {

  const _regex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

  s = s.replace(_regex, function (match, offset, string) {
    return '<a href="http://' + match.toLowerCase() + '" target="_blank">' + match.toLowerCase() + '</a>';
  });

  return s;
}
