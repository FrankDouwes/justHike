import {Snowpoint} from '../type/snowpoint';

// needs optimising (using static data files)
export function parseSnow(snow: Array<any>): Array<any> {

  const _snowPivots: Array<any> = [];

  for (let i = 1; i < snow.length; i++) {

    // get pivots (no snow/snow & snow/no-snow)
    if (i === 0 && snow[i].y > 0) {
      // snow at start of trail
      _snowPivots.push({label: 'start', location: snow[i]});
    } else if (snow[i].y > 0 && snow[i - 1].y === 0) {
      // start of snowlevel
      _snowPivots.push({label: 'start', location: snow[i - 1]});
    } else if (snow[i - 1].y > 0 && snow[i].y === 0) {
      // end of snow level
      _snowPivots.push({label: 'end', location: snow[i]});
    } else if (i === snow.length - 1 && snow[i].y > 0) {
      // snow at end of trail
      _snowPivots.push({label: 'end', location: snow[i]});
    }
  }

  const _snowMiles: Array<Snowpoint> = [];

  // calculate snowlevel elevation line
  for (let s = 0; s < _snowPivots.length; s += 2) {

    const _mileNr: number = Math.floor(_snowPivots[s].location.x);

    // the total distance of this snow patch
    const _distance = _snowPivots[s + 1].location.x - _snowPivots[s].location.x;

    // the elevation change between the start and end of snowpatch
    const _levelChange = Math.abs(_snowPivots[s].location.elev - _snowPivots[s + 1].location.elev);

    // distance to next full mile (if snow starts at mi 37.7, = 0.3)
    let _nextFullMileDist = Math.ceil(_snowPivots[s].location.x) - _snowPivots[s].location.x;
    _nextFullMileDist = +_nextFullMileDist.toFixed(2);    // rounding

    // set start point and end point for start mile
    if (!_snowMiles[_mileNr]) {
      _snowMiles[_mileNr] = [];
    }

    _snowMiles[_mileNr].push(
      {distance: _nextFullMileDist, elevation: _snowPivots[s].location.elev},
      {distance: 1, elevation: _snowPivots[s].location.elev + ((_nextFullMileDist / _distance) * _levelChange)}
    );

    let _miles = _nextFullMileDist;

    // set start / end points for miles in distance
    while (_miles.toFixed(2) < _distance - _nextFullMileDist - 1) {

      _miles ++;

      // start point for next mile
      _snowMiles[_mileNr + _miles - _nextFullMileDist] = [
        {distance: 0, elevation: _snowPivots[s].location.elev + (((_miles - 1) / _distance) * _levelChange)},
        {distance: 1, elevation: _snowPivots[s].location.elev + (((_miles) / _distance) * _levelChange)}
      ];
    }

    // set start / end point for end mile
    _snowMiles[Math.floor(_snowPivots[s + 1].location.x)] = [
      {distance: 0, elevation: _snowPivots[s].location.elev + (((_miles) / _distance) * _levelChange)},
      {distance: Number((_distance - _miles).toFixed(2)), elevation: _snowPivots[s + 1].location.elev}
    ];
  }

  return _snowMiles;
}
