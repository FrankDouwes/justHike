import { Pipe, PipeTransform } from '@angular/core';
import {Poi} from '../type/poi';

@Pipe({ name: 'poisorting' })

export class PoiSortingPipe implements PipeTransform {

  transform(poiArray: Array<Poi>) {

    // sort array by the trail distance of the anchor point (the nearest on trail location)
    poiArray.sort(
      function(a, b) {

        const _aDist = (a.anchorPoint && a.anchorPoint.distanceTotal) ? a.anchorPoint.distanceTotal : 0;
        const _bDist = (b.anchorPoint && b.anchorPoint.distanceTotal) ? b.anchorPoint.distanceTotal : 0;

        return _aDist - _bDist;
      });

    return poiArray;
  };
}
