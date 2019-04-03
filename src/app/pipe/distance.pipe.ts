import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment.prod';

@Pipe({ name: 'distance' })

export class DistancePipe implements PipeTransform {

  // converts a number in a string indicating distance
  // optional: distance from trail

  transform(

    value:                  number,
    currentUnit:            string,
    desiredUnit:            string,

    fromTrailIndicator:     boolean       = false,
    round:                  number        = 2,
    force:                  boolean       = false,
    relative:               boolean       = false

  ): string {

    let _currentUnit: string = (currentUnit) ? currentUnit : 'meters';
    let _convertedValue: number;
    let _format: string = 'm';

    // convert to meters
    if (_currentUnit !== 'meters') {
      if (_currentUnit === 'miles' || _currentUnit === 'mile') {
        value = value * environment.MILE;
      }
      if (_currentUnit === 'feet' || _currentUnit === 'foot') {
        value = value * environment.FOOT;
      }
      _currentUnit = 'meters';
    }

    // convert value from meters to desiredUnit (if needed)
    if (desiredUnit === 'miles' || desiredUnit === 'mile') {

      if (value / environment.MILE >= 0.1 || force === true) {

        _convertedValue = Number((value / environment.MILE).toFixed(round));
        _format = 'mi.';

      } else {

        _convertedValue = Number((value / environment.FOOT).toFixed(0));
        _format = (_convertedValue > 1) ? 'feet' : 'foot';
        _format = (!fromTrailIndicator) ? _format : 'ft.';

      }

    } else if (desiredUnit === 'feet' || desiredUnit === 'foot') {

      _convertedValue = Number((value / environment.FOOT).toFixed(0));
      _format = (_convertedValue > 1) ? 'feet' : 'foot';
      _format = (!fromTrailIndicator) ? _format : 'ft.';

    } else {

      _convertedValue = Number(value.toFixed(round));
    }

    // on/off trail
    if (fromTrailIndicator) {

      if (value > 10) {
        return '~' + _convertedValue + ' ' + _format + ' off trail';
      } else {
        return 'on trail';
      }
    } else if (relative) {

      const _relativeString = (value > 0) ? ' ahead' : ' back';

      return Math.abs(_convertedValue) + ' ' + _format + ' ' + _relativeString;

    } else {
      // return distance
      return _format + ' ' + _convertedValue;
    }
  }
}
