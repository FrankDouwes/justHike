import {Waypoint} from '../type/waypoint';
import {Poi} from '../type/poi';
import {TrailMeta} from '../type/trail';
import {environment} from '../../environments/environment.prod';
import {calculateSectionScale} from '../_util/geolib/distance';
import {pointArrayTypeConversion} from '../_util/leaflet/converter';
import {TrailParser} from '../base/trail-parser/trail-parser';
import {Town} from '../type/town';

/* Pacific Crest Trail www.pcta.org */
export class PCTData extends TrailParser {

  constructor() {
    super();
  }

  // parses the entire PCT as well as the DEMO trail (the first section of the PCT)
  parse(trail: TrailMeta, trailData: Array<string> | string, poiData: string, snow: object, towns: Array<Town>, direction: any): any {

    super.parse(trail, trailData, poiData, snow, towns, direction);

    // set waypoint string property conversion values
    this.findReplaceArray = [
      {find: 'ele', replace: 'elevation'},
      {find: 'lat=', replace: 'latitude='},
      {find: 'lon=', replace: 'longitude='},
      {find: 'desc', replace: 'description'},
      {find: 'cmt', replace: 'comment'},
      {find: 'sym', replace: 'icon'}];



    // WAYPOINTS

    // convert the waypoints
    let _trailData: Array<Waypoint>;
    if (Array.isArray(this.trailData)) {
      _trailData = this.parseTrail(this.trailData as Array<string>);
    } else {
      _trailData = this.parseTrail([this.trailData]);
    }

    trail.length = this.totalDistance / environment.MILE;



    // POIS (=points of interest. water sources, campsites etc.)

    poiData = this.convertToWaypointString(poiData);
    const poiAsJson: JSON = this.x2js.xml2js(poiData);
    const _pois: Array<Poi> = this.directionReverse(this.parsePois(poiAsJson['gpx']['wpt']));

    return [trail, _trailData, _pois, snow['datasets'][0], towns];
  }

  parseTrail(trailData: Array<string>): Array<Waypoint> {

    const _self = this;

    // TRAIL
    let _waypoints: Array<Waypoint> = [];

    trailData.forEach(function(trailString: string, index: number) {

      trailString = _self.convertToWaypointString(trailString);
      const trailAsJson: JSON  = _self.x2js.xml2js(trailString);

      // get just the main trail data, ignore side-trails (for now)
      if (!Array.isArray(trailAsJson['gpx']['trk'])) {
        // convert to array with 1 track
        trailAsJson['gpx']['trk'] = [trailAsJson['gpx']['trk']];
      }

      trailAsJson['gpx']['trk'] = _self.directionReverse(trailAsJson['gpx']['trk']);

      const _length = trailAsJson['gpx']['trk'].length;
      for (let i = 0; i < _length; i ++) {

        const _section = trailAsJson['gpx']['trk'][i];

        // 'Red' identifies the main track
        if (_section.extensions.TrackExtension.DisplayColor.__text.includes('Red')) {

          _section.trkseg.trkpt = _self.directionReverse(_section.trkseg.trkpt);

          let _sectionWaypoints: Array<Waypoint> = pointArrayTypeConversion(_section.trkseg.trkpt, 'waypoint', 'waypoint');

          let _trailLength: number;

          // DEMO data has a single number, PCT has an array (sections)
          if (typeof _self.trail.length === 'number') {
            _trailLength = _self.trail.length;
          } else {
            _trailLength = _self.trail.length[index];
          }

          const _scale: number = calculateSectionScale(_sectionWaypoints, _trailLength);

          _sectionWaypoints = _self.addDistanceToWaypoints(_sectionWaypoints, _scale);
          _waypoints = _waypoints.concat(_sectionWaypoints);
        }
      }
    });

    return _waypoints;
  }

  // TODO: cleanup (dealing with other peoples data files gets messy)
  parsePois(pois: Array<object>): Array<Poi> {

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

        console.log(JSON.stringify(_poi['description']));

        const _textArray = this._splitCleanStrings(_poi['description'], [', ', '---', '<br/>']);
        const _labelArray = _textArray.shift().split('. ');

        _poi['label'] = _labelArray.shift();

        _textArray.unshift(_labelArray.join('. '));

        // filter out blank elements
        var _descriptionArray = _textArray.filter(function (element: string) {
          return element != '';
        });

        const _description: string = _descriptionArray.join(' ').split('. ').join('<br/><br/>');

        _poi['description'] = this._convertDescription(_description);
        _poi['identifier'] = 'HM: ' + _poi['name'];

        delete _poi['name'];

        console.log(_poi['description']);

        _parsedPois.push(_poi as Poi);
      }
    }

    // 4. adjust individual pois

    // Highway elevation seems to be in feet, while rest of the waypoints is in meters
    const _highwayExceptions = ['Highway 78', 'Highway 74', 'Highway 178', 'Highway 108', 'Highway 50', 'Highway 49', 'Highway 36'
      , 'Highway 299', 'Highway 5', 'Highway 99', 'Highway 140', 'Hwy 242', 'under Highway 84', 'Stevens Pass', 'Highway 20']

    const _pLength = _parsedPois.length;
    const _eLength = _highwayExceptions.length;

    for (let p = 0; p < _pLength; p++) {

      let _exception = -1;
      for (let e = 0; e < _eLength; e++) {

        if (_parsedPois[p].label.includes(_highwayExceptions[e])) {
          _parsedPois[p].waypoint.elevation = _parsedPois[p].waypoint.elevation * environment.FOOT;
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

    return _parsedPois;
  }

  private _convertDescription(input: string): string {

    let _description = this.convertStringUrls(input);     // a href tag
    _description = this.convertStringTel(_description);   // a tel tag
    _description = this._capFirstLetter(_description);    // capitalize

    return _description;
  }

  // does not support ~ (tilde), this is slow...
  private _splitCleanStrings(input: string, remove: Array<string>): Array<string> {

    remove.push('~');
    let _input: any = input;

    const _length = remove.length;
    for (let i = 0; i < _length; i++) {

      _input = _input.split(remove[i]);

      if (i !== _length - 1) {
        _input = _input.join('~');
      }
    }

    return _input;
  }

  private _capFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
