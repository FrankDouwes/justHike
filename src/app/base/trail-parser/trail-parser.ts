import * as X2JS from 'x2js';
import {Waypoint} from '../../type/waypoint';
import {Poi} from '../../type/poi';
import {Snowpoint} from '../../type/snow';
import {TrailMeta} from '../../type/trail';
import {calculateDistance} from '../../_util/geolib/distance';
import {Town} from '../../type/town';

export interface FindReplace {
  find:       string;
  replace:    string;
}

export class TrailParser {

  public trail: TrailMeta;
  public trailData: Array<string> | string;
  public poiData: Array<string> | string;
  public snow: object;
  public direction: number;
  public totalDistance = 0;
  public findReplaceArray: Array<FindReplace>;
  public x2js = new X2JS({
    attributePrefix : ''    // no attribute prefix
  });

  private _prevPoint: Waypoint;

  constructor() {}

  // the main entry point
  public parse(trail: TrailMeta, trailData: Array<string> | string, poiData: Array<string> | string, snow: object, towns: Array<Town>, direction: any): void {

    // set
    this.trail = trail;
    this.trailData = this.directionReverse(trailData);

    this.poiData = this.directionReverse(poiData);
    this.snow = snow;
    this.direction = direction;

    // defaults
    this.findReplaceArray = [];
    this.totalDistance = 0;
    this._prevPoint = null;

    // auto reverse input data
    if (direction === 1 && Array.isArray(trailData)) {
      trailData.reverse();
    }
  }

  public parseTrail(trailData: Array<string> | string): Array<Waypoint> {
    // override

    return;
  }

  public parsePois(pois: Array<object>): Array<Poi> {
    // override

    return;
  }

  public parseSnow(): Array<Snowpoint> {
    // override

    return;
  }



  // CONVERTERS

  // converts urls in strings to html hrefs
  public convertStringUrls(input: string) {

    const _regex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

    return input.replace(_regex, function (match) {

      match = match.split(' ').join('');      // remove spaces
      return '<a href="http://' + match.toLowerCase() + '" target="_blank">' + match.toLowerCase() + '</a> ';
    });
  }


  public convertStringTel(input: string): string {

    const _regex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img;

    return input.replace(_regex, function (match) {
      const _digits = match.split('-').join('');
      return '<a href="tel:+1' + _digits + '">+1-' + match + '</a>';
    });
  }

  // go from gpx to waypoint before converting to JSON (string manipulation is faster?)
  public convertToWaypointString(input: string): string {

    const _length = this.findReplaceArray.length;

    for (let i = 0; i < _length; i++) {
      input = input.split(this.findReplaceArray[i].find).join(this.findReplaceArray[i].replace);
    }
    return input;
  }



  // OTHER

  // set the total distance (the distance on trail) for each waypoint, based on the section scale
  public addDistanceToWaypoints(waypoints: Array<Waypoint>, scale: number): Array<Waypoint> {

    let _sectionLength = 0;
    const _length = waypoints.length;

    for (let i = 0; i < _length; i++) {

      const _waypoint: Waypoint = waypoints[i];

      let _distance = 0;

      if(this._prevPoint) {
        _distance = (calculateDistance(_waypoint, this._prevPoint) * scale);
        _sectionLength += _distance;
        this.totalDistance += _distance;
      }

      _waypoint.distanceTotal = this.totalDistance;

      this._prevPoint = _waypoint;
    }

    return waypoints;
  }

  // reverse data if needed, for sobo
  public directionReverse(input: any): Array<any> {

    if (this.direction === 1 && Array.isArray(input)) {
      return input.reverse();
    } else {
      return input;
    }
  }

  // letting the browser parse it, returning the contents
  public stripHtmlTags(input: string): string {
    const _div = document.createElement('');
    _div.innerHTML = input;
    return _div.textContent || _div.innerText || '';
  }

  // helper class to generate a list of possible identifiers
  // private _generateIdentifierList(input): void {
  //   if (_identifierList.indexOf(input) === -1) {
  //     _identifierList.push(input);
  //   }
  // }
}
