import {Waypoint} from '../type/waypoint';
import {Poi} from '../type/poi';
import {TrailMeta} from '../type/trail';
import {environment} from '../../environments/environment.prod';
import {calculateSectionScale} from '../_util/geolib/distance';
import {pointArrayTypeConversion} from '../_util/leaflet/converter';
import {TrailParser} from '../base/trail-parser/trail-parser';
import {Town} from '../type/town';

/* Sierra High Route, only app that supports it! */
export class SHRData extends TrailParser {

  constructor() {
    super();
  }

  // parses the entire PCT as well as the DEMO trail (the first section of the PCT)
  parse(trail: TrailMeta, trailData: string, poiData: string, snow: object, towns: Array<Town>, direction: any): any {

    super.parse(trail, trailData, poiData, snow, towns, direction);

    // set waypoint string property conversion values
    this.findReplaceArray = [
      {find: 'ele', replace: 'elevation'},
      {find: 'lat=', replace: 'latitude='},
      {find: 'lon=', replace: 'longitude='},
      {find: 'desc', replace: 'description'}]


    // WAYPOINTS

    // convert the waypoints
    const _trailData: Array<Waypoint> = this.parseTrail(this.trailData as string);

    trail.length = this.totalDistance / environment.MILE;

    // POIS (=points of interest. water sources, campsites etc.)

    poiData = this.convertToWaypointString(poiData);
    const poiAsJson: JSON = this.x2js.xml2js(poiData);
    const _pois: Array<Poi> = this.directionReverse(this.parsePois(poiAsJson['gpx']['wpt']));

    return [trail, _trailData, _pois, snow, towns];
  }

  parseTrail(trailData: string): Array<Waypoint> {

    const _self = this;

    // TRAIL
    let _waypoints: Array<Waypoint> = [];

    trailData = _self.convertToWaypointString(trailData);
    const trailAsJson: JSON  = _self.x2js.xml2js(trailData);

    const _tracks: Array<any> = _self.directionReverse(trailAsJson['gpx']['trk'][1]['trkseg']);

      // combine all track segments in a single array
    _tracks.forEach(function(track) {

      const _sectionWaypoints: Array<Waypoint> = _self.directionReverse(pointArrayTypeConversion(track['trkpt'], 'waypoint', 'waypoint'));
      _waypoints = _waypoints.concat(_sectionWaypoints);
    });

    const _trailLength: number = _self.trail.length as number;
    const _scale: number = calculateSectionScale(_waypoints, _trailLength);

    _waypoints = _self.smoothFlatPoints(_waypoints);

    _waypoints = _self.addDistanceToWaypoints(_waypoints, _scale);

    return _waypoints;
  }

  // remove waypoints that don't have elevation
  smoothFlatPoints(waypoints: Array<Waypoint>): Array<Waypoint> {

    const _length = waypoints.length;
    for (let i = 0; i < _length; i++) {
      const _waypoint = waypoints[i];

      if (!_waypoint.elevation) {
        _waypoint.elevation = (waypoints[i - 1].elevation + waypoints[i + 1].elevation) / 2;
      }
    }

    return waypoints;
  }

  parsePois(pois: Array<object>): Array<Poi> {

    pois.forEach(function(poi, index) {

      poi['id'] = index;

      // create waypoint
      poi['waypoint'] = {latitude: poi['latitude'], longitude: poi['longitude'], elevation: poi['elevation']} as Waypoint;
      delete poi['latitude'];
      delete poi['longitude'];
      delete poi['elevation'];

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
      } else if (_identifier.includes('Peak') || _identifier.includes('Mount') || _identifier.includes('Col') || _identifier.includes('Crest')) {
        poi['type'] = 'peak';
      } else if (_identifier.includes('Lake') || _identifier.includes('Outlet') || _identifier.includes('WA')
        || _identifier.includes('Stream') || _identifier.includes('Tarn') || _identifier.includes('Creek')) {
        poi['type'] = 'water';
      } else if (_identifier.includes('WACS')) {
        poi['type'] = 'water, camp';
      } else if (_identifier.includes('Pass') || _identifier.includes('Saddle') || _identifier.includes('Ridge')) {
        poi['type'] = 'view';
      } else if (_identifier.includes('Memorial') || _identifier.includes('Meadow') || _identifier.includes('Descent')) {
        poi['type'] = 'sight';
      } else if (_identifier.includes('OnionValley') || poi['sym'] && poi['sym'].includes('Head')) {
        poi['type'] = 'trailhead';
      } else if (_identifier.includes('CS') || _identifier.includes('Campsite')) {
        poi['type'] = 'camp';
      } else if (_identifier.includes('Point')) {
        poi['type'] = 'view';
      } else if (poi['label'] === 'unknown' || poi['label'].includes('Leave') || poi['label'].includes('Depart') || poi['label'].includes('Abort!')) {
        poi['type'] = 'directions';
      }

      if(poi['type'] === 'unknown') {
        console.log(poi);
      }

      // TODO: cleanup unused properties
      delete poi['sym'];
      delete poi['name'];
    });

    return pois as Array<Poi>;
  }
}
