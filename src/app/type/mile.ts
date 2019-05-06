import { Waypoint } from './waypoint';
import { OHLC } from './ohlc';
import { Snowpoint } from './snow';

export interface Mile {

  id:                 number;             // id (mile number, starts at 1 not 0)
  elevationGain:      number;             // the elevation gain
  elevationLoss:      number;             // the elevation loss
  waypoints:          Array<Waypoint>;    // all the trail waypoints that make up this mile (first and last point of array are outside of mile due to overlap)
  elevationRange:     OHLC;               // the elevation range (open/high/low/close)
  centerpoint:        object;             // calculated centerpoint of waypoints array, for leaflet

  // OPTIONAL
  snowData?:          Array<Snowpoint>;   // snow data, can be empty

  pois?:              Array<number>;      // points of interest that belong to this mile (triangulation)
  towns?:             Array<number>;      // towns that belongTo this mile

  sideTrailsStarts?:  Array<number>;      // TODO: unused: side trails that start on this mile
  sideTrailEnds?:     Array<number>;      // TODO: unused: side trails that end on this mile

  poiTypes?:          any;                // contains water: true, camp: true etc.
  hasMajorPoi?:       boolean;            // major are water/camp/road
  hasMinorPoi?:       boolean;            // minor is everything else

  isCurrent:          boolean;            // holds user location
}
