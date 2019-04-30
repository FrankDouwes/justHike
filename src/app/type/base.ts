import { Waypoint } from './waypoint';

// extended by Poi (& Note) and User
export interface LocationBase {
  id:                 number | number;    // unique
  type:               string;             // bridge to PoiTypes
  waypoint:           Waypoint;           // coordinates (+ elevation)
  anchorPoint:        Waypoint;           // calculated nearest trail location (between 2 waypoints in a mile)
}

// extended by Trail and TrailMeta
export interface TrailBase {
  id:             number;                 // unique
  abbr:           string;                 // short name (for lookup / differentiation)
  length:         number | Array<number>; // in miles
}
