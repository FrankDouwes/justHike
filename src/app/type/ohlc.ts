import { Waypoint } from './waypoint';

export class OHLC {
  open:       number;
  high:       number;
  low:        number;
  close:      number;
}

// calculate elevation range
export function calculateOHLC(data: any, range: object, identifier: string = 'elevation', nested: boolean = true) {

  // select sub data set to use for calculations
  let _subArr = data.slice(range["start"], range["end"]);

  return _ohlc(_subArr);
}


// calculate ohlc of single data point?
function _ohlc(waypoints:Array<Waypoint>){

  // calculate OHLC
  const   _open:    number    = Number(waypoints[0].elevation);
  let     _high:    number    = Number(_open);
  let     _low:     number    = Number(_open);
  const   _close:   number    = Number(waypoints[waypoints.length - 1].elevation);

  for (let waypoint of waypoints) {

    const _elevation = Number(waypoint["elevation"]);

    if (_elevation > _high) {

      _high = _elevation;

    } else if (_elevation < _low) {

      _low = _elevation;
    }
  }

  return {open:_open, high:_high, low:_low, close:_close};
}
