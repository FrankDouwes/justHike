import * as X2JS from 'x2js';
import { Waypoint } from '../type/waypoint';
import { Poi } from '../type/poi';
import {TrailMeta} from '../type/trail';
import {environment} from '../../environments/environment.prod';

const _identifierList: Array<string> = [];
const _x2js = new X2JS({
  attributePrefix : ''    // no attribute prefix
});

// trail specific parser for PCT data

export function parsePCTData (trail: TrailMeta, trailData: string, poiData: string, snow: object): Array<object> {

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
    .split('cmt').join('comment')
    .split('sym').join('icon');

  // 2. parser to JSON
  const poiAsJson: JSON  = _x2js.xml2js(poiData);

  // 3. adjust poi data
  const _pois: Array<Poi> = parsePois(poiAsJson['gpx']['wpt']);

  // adjust individual pois

  // Highway elevation seems to be in feet, while rest of the waypoints is in meters
  const _highwayExceptions = ['Highway 78', 'Highway 74', 'Highway 178', 'Highway 108', 'Highway 50', 'Highway 49', 'Highway 36'
    , 'Highway 299', 'Highway 5', 'Highway 99', 'Highway 140', 'Hwy 242', 'under Highway 84', 'Stevens Pass', 'Highway 20']

  const _pLength = _pois.length;
  const _eLength = _highwayExceptions.length;

  for (let p = 0; p < _pLength; p++) {

    let _exception = -1;
    for (let e = 0; e < _eLength; e++) {

      if (_pois[p].label.includes(_highwayExceptions[e])) {
        _pois[p].waypoint.elevation = _pois[p].waypoint.elevation * environment.FOOT;
        _exception = e;
        break;
      }
    }

    if (_exception !== -1) {
      _highwayExceptions.splice( _exception,1);
    }

    if (_highwayExceptions.length === 0) {
      break;
    }
  }

  // SNOW (the current snow pack)
  const _snow = snow['datasets'][0];

  return;

  // return
  return [trail, _waypoints, _pois, _snow];
}

// figure out what type of POIS exist in raw data, assign them to poi types TODO
function parsePois(pois: Array<object>): Array<Poi> {

  const _poisLength: number = pois.length;     // faster
  const _parsedPois: Array<Poi> = [];

  // a static list of poi types based on the raw data identifiers, which are manually linked to poiTypes (or unknown)
  const _identifierTypes: object =
    {MexB: 'end', WR: 'water', RD: 'road', RDB: 'road', PO: 'postoffice', Trad: 'store, food', Hwy: 'highway', RR: 'railroad', CS: 'camp', GT: 'gate', GTB: 'gate', PL: 'powerline', PLB: 'powerline', WRCS: 'water, camp', WACS: 'water, camp', OakS: 'store, food', Kitc: 'water', TR: 'trail', RedT: 'information', RDb: 'road', Deck: 'view', TH: 'trailhead', WRA: 'water', WRB: 'water', WRC: 'water', BV: 'camp', BVB: 'camp', CSC: 'camp', CSB: 'camp', BGCa: 'sight', Ranc: 'view', GTC: 'gate', Eagl: 'sight', HwyB: 'highway', TRb: 'trail', WRb: 'water', Heme: 'store, food', Tqtz: 'water', Humb: 'trailhead', Sadd: 'trail', PSTr: 'trail', TrRo: 'trail', WA: 'water', MtSa: 'view', Roun: 'boundary', SJSh: 'shelter', TrWi: 'trail', Well: 'water', SJTr: 'trail', BY: 'boundary', Suic: 'peak', TrSu: 'trail', Stra: 'trailhead', Zigg: 'resort', RDC: 'road', CCra: 'sight', Fish: 'trail', Anim: 'sight', Spli: 'shelter', Brid: 'bridge', MFSp: 'unknown', Stat: 'boundary', Moja: 'powerline', Fore: 'boundary', McDo: 'food', RRB: 'railroad', RDD: 'road', Bald: 'trailhead', MtBa: 'peak', Memo: 'sight', Door: 'water', TRB: 'trail', TRC: 'trail', HwyC: 'highway', BigR: 'water', Burk: 'peak', Punc: 'water', HwyD: 'highway', HwyE: 'highway', Buck: 'road', HWYF: 'highway', HwyG: 'highway', HwyH: 'highway', HwyI: 'highway', Mess: 'camp', Acto: 'resort', Gold: 'sight', Agua: 'town', Sier: 'highway', Benc: 'sight', Casa: 'resort', Iber: 'postoffice, water', Wind: 'sight', Pass: 'peak', Gull: 'sight', KMSt: 'resort', WAB: 'water', Hors: 'camp', JMT: 'trail', BVI: 'camp', CSH: 'camp', CSL: 'camp', CSM: 'camp', MTWh: 'peak', Trai: 'peak', WAC: 'water', WAD: 'water', WAE: 'water', WAJ: 'water', WAN: 'water', WAO: 'water', WAQ: 'water', WAS: 'water', WAT: 'water', WAU: 'water', Onio: 'trailhead', RaeL: 'information', GTD: 'gate', McCl: 'information', HotS: 'sight', Muir: 'resort', CSD: 'camp', VVR: 'resort', Reds: 'resort', CSO: 'camp', WAF: 'water', WAK: 'water', WAV: 'water', MMSk: 'unknown', NoCa: 'warning', Tuol: 'postoffice, store, food', JMTC: 'camp', Happ: 'road', HWYB: 'highway', JMTW: 'water', Walk: 'trailhead', Cars: 'boundary', Meis: 'water', Echo: 'trailhead', Ski: 'sight', Weat: 'sight', Rest: 'sight', Pete: 'camp', Chur: 'sight', Road: 'road', Paul: 'water', EBra: 'water', WBra: 'water', RDN: 'road', Bear: 'water', Hask: 'store, resort', Lake: 'resort', Beld: 'resort', Will: 'water', Myrt: 'water', Cold: 'water', PCTM: 'sight', HWY: 'highway', Drak: 'resort', OldS: 'town', JJsC: 'food, store', Subw: 'water', HatC: 'view', Crys: 'water', Brit: 'water', Fitz: 'water', Fern: 'water', Dead: 'water', Litt: 'water', Wolf: 'water', Etna: 'road', Shel: 'water', Marb: 'water, camp', Seia: 'resort', Alex: 'water', Ward: 'road', Oreg: 'boundary', Rogu: 'boundary', Call: 'resort', OldH: 'highway', Camp: 'resort', Klum: 'camp, water', Howa: 'water, road', Brow: 'water, camp', RimD: 'highway', RimV: 'information', RimT: 'trailhead', Casc: 'water', Summ: 'trailhead', Maza: 'resort', ORWA: 'sign', CSDi: 'camp', SkiS: 'sight, camp', Isla: 'water', Koos: 'camp', Obsi: 'boundary, warning', Sant: 'trailhead', Jeff: 'boundary', SFor: 'water', Park: 'camp', Many: 'view', Olal: 'resort', Pinh: 'trailhead', OakG: 'water', Kohn: 'boundary', Timb: 'resort', Radi: 'sight', Ramo: 'water', Mudd: 'water, camp', Indi: 'water', Mile: 'sight', High: 'sight', Tunn: 'sight', SWMo: 'road', Tabl: 'information', Blue: 'water, camp', Yaka: 'warning', Krac: 'resort', TwoL: 'water', BigC: 'camp', Mart: 'camp', Uric: 'camp, water', Olla: 'sight', MFor: 'camp, water', Dutc: 'view', Lema: 'camp', Deep: 'water', Dece: 'water', HwyJ: 'highway', Rain: 'water', Monu: 'end', RESO: 'resort'};
  let _count: number = 0;

  for (let i = 0; i < _poisLength; i++) {

    const _poi: object = pois[i];

    // delete if poi is mile marker
    if (_poi['icon'] === 'Triangle, Red') {
      delete pois[i];
    } else {

      _poi['id'] = _count;
      _count++;

      // create waypoint
      _poi['waypoint'] = {latitude: _poi['latitude'], longitude: _poi['longitude'], elevation: _poi['elevation']} as Waypoint;
      delete _poi['latitude'];
      delete _poi['longitude'];
      delete _poi['elevation'];

      // remove color from icon
      delete _poi['icon'];

      // set the type based on the remaining string
      let _identifier = _poi['name'].replace(/\d+/g, '');

      // '-' means side trail, which we're ignoring for now.
      if (!_poi['name'].includes('-')) {

        const _last2Letters = _identifier.substr(_identifier.length - 2, _identifier.length - 1).toLowerCase();
        const _last3Letters = _identifier.substr(_identifier.length - 3, _identifier.length - 1).toLowerCase();
        const _last4Letters = _identifier.substr(_identifier.length - 4, _identifier.length - 1).toLowerCase();
        if (_last2Letters === 'tr') {
          _identifier = 'TR';
        } else if (_last2Letters === 'th') {
          _identifier = 'TH';
        } else if (_last2Letters === 'cg' || _last3Letters === 'cmp') {
          _identifier = 'WRCS';
        } else if (_last2Letters === 'np' || _last2Letters === 'nf' || _last2Letters === 'sp' || _last4Letters === 'wild') {
          _identifier = 'BY';
        } else if (_last2Letters === 'rd' || _last4Letters === 'road') {
          _identifier = 'RD';
        } else if (_last4Letters === 'inn' || _last4Letters === 'odge' || _last4Letters === 'sort') {
          _identifier = 'RESO';
        } else if (_last4Letters === 'pass') {
          _identifier = 'Pass';
        } else if (_last4Letters === 'ring' || _last4Letters === 'reek' || _last4Letters === 'iver'
          || _last4Letters === 'trib' || _last4Letters === 'lake' || _last4Letters === 'pond' || _last4Letters === 'seep'
          || _last3Letters === 'crk' || _last3Letters === 'spg' || _last4Letters === 'fork') {
          _identifier = 'WA';
        } else if (_last4Letters === 'camp') {
          _identifier = 'CS';
        } else {
          _identifier = _poi['name'].replace(/\d+/g, '').substr(0, 4);
        }
        // generateIdentifierList(_identifier);
      }

      _poi['type'] = _identifierTypes[_identifier];
      if (!_poi['type']) {
        _poi['type'] = 'unknown';
      }

      // title & description
      const _descriptionArr = _poi['description'].split('---').join('').split(',');
      _poi['label'] = _descriptionArr.shift();
      _poi['description'] = parseStringUrls(_descriptionArr.join(''));

      console.log(_poi);

      _parsedPois.push(_poi as Poi);
    }
  }

  return _parsedPois;
}

function generateIdentifierList(input): void {
  if (_identifierList.indexOf(input) === -1) {
    _identifierList.push(input);
  }
}

function parseStringUrls(s: string) {

  const _regex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

  s = s.replace(_regex, function (match, offset, string) {
    return '<a href="http://' + match.toLowerCase() + '" target="_blank">' + match.toLowerCase() + '</a>';
  });

  return s;
}
