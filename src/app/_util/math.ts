// is a number a prime number?
import {environment} from '../../environments/environment.prod';
import {Waypoint} from '../type/waypoint';

export function isPrime (number: number): boolean {
  for(let i = 2; i < number; i++) {
    if (number % i === 0)  {
      return false;
    }
  }
  return number !== 1 && number !== 0;
}

// convert meters to miles/feet
export function distanceInMilesFeet(distanceMeters: number, force: string = ''): object {

  let _distance: number;
  let _unit: string;

  if (distanceMeters / environment.MILE >= 0.1 && force !== 'ft' || force === 'mi') {
    // show in miles
    _distance = Number((distanceMeters / environment.MILE).toFixed(2));
    _unit = 'mi.';

  } else {
    // show in feet
    _distance = Number((distanceMeters / environment.FOOT).toFixed(0));
    _unit = 'ft.';
  }

  return {distance: _distance, unit: _unit};
}




/* find a point on a line segment nearest to a point */
// based on: https://stackoverflow.com/questions/32281168/find-a-point-on-a-line-closest-to-a-third-point-javascript
export function getClosestPointOnLine(point: Waypoint, lineSegment: Array<Waypoint>): Waypoint {

  let minDist;
  let fTo;
  let fFrom;
  let latitude: number;
  let longitude: number;
  let i;
  let dist;

  if (lineSegment.length > 1) {

    for (let n = 1 ; n < lineSegment.length ; n++) {

      if (lineSegment[n].latitude !== lineSegment[n - 1].latitude) {
        const a = (lineSegment[n].longitude - lineSegment[n - 1].longitude) / (lineSegment[n].latitude - lineSegment[n - 1].latitude);
        const b = lineSegment[n].longitude - a * lineSegment[n].latitude;
        dist = Math.abs(a * point.latitude + b - point.longitude) / Math.sqrt(a * a + 1);
      } else {
        dist = Math.abs(point.latitude - lineSegment[n].latitude)
      }

      const rl2 = Math.pow(lineSegment[n].longitude - lineSegment[n - 1].longitude, 2) + Math.pow(lineSegment[n].latitude - lineSegment[n - 1].latitude, 2);
      const ln2 = Math.pow(lineSegment[n].longitude - point.longitude, 2) + Math.pow(lineSegment[n].latitude - point.latitude, 2);
      const lnm12 = Math.pow(lineSegment[n - 1].longitude - point.longitude, 2) + Math.pow(lineSegment[n - 1].latitude - point.latitude, 2);
      const dist2 = Math.pow(dist, 2);

      // calculated length^2 of line segment
      const calcrl2 = ln2 - dist2 + lnm12 - dist2;

      // redefine minimum distance to line segment (not infinite line) if necessary
      if (calcrl2 > rl2) {
        dist = Math.sqrt(Math.min(ln2, lnm12));
      }

      if (minDist == null || minDist > dist) {
        if (calcrl2 > rl2) {
          if (lnm12 < ln2) {
            fTo = 0; //nearer to previous point
            fFrom = 1;
          } else {
            fFrom = 0; //nearer to current point
            fTo = 1;
          }
        } else {

          // perpendicular from point intersects line segment
          fTo = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
          fFrom = ((Math.sqrt(ln2 - dist2)) / Math.sqrt(rl2));
        }

        minDist = dist;
        i = n;
      }
    }

    const dx = lineSegment[i - 1].latitude - lineSegment[i].latitude;
    const dy = lineSegment[i - 1].longitude - lineSegment[i].longitude;

    latitude = lineSegment[i - 1].latitude - (dx * fTo);
    longitude = lineSegment[i - 1].longitude - (dy * fTo);

  }

  // console.log({'latitude': latitude, 'longitude': longitude, 'i': i, 'fTo': fTo, 'fFrom': fFrom});

  return { latitude: latitude, longitude: longitude} as Waypoint;
}
