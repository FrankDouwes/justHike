import { Waypoint } from './waypoint';
import { OHLC } from './ohlc';
import { Poi } from './poi';
import { Snowpoint } from './snow';

export class Mile {

  id:                 number;             // id (mile number, starts at 1 not 0)
  elevationGain:      number;             // the elevation gain
  elevationLoss:      number;             // the elevation loss
  waypoints:          Array<Waypoint>;    // all the trail waypoints that make up this mile (first and last point of array are outside of mile due to overlap)
  elevationRange:     OHLC;               // the elevation range (open/high/low/close)
  scale:              number;             // scale factor (the calculated trail length does not match the provided trail length)
  centerpoint:        object;             // calculated centerpoint of waypoints array, for leaflet

  // OPTIONAL
  snowData?:          Array<Snowpoint>;   // snow data, can be empty
  pois?:              Array<Poi>;         // points of interest that belong to this mile (triangulation)
  hasWater?:          boolean;            // contains water
  hasCamp?:           boolean;            // contains campsite
  hasEscape?:         boolean;            // has a road crossing
  hasOther?:          boolean;            // has other
  isCurrent:          boolean;            // holds user location
}
