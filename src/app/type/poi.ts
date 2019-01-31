import { Waypoint } from './waypoint';

export class Poi {
  id:                 number;             // id (mile number, starts at 1 not 0)
  trail:              string;              // abbr. of trail mile belongs to
  waypoint:           Waypoint;           // coordinates (+ elevation)
  type:               string;             // type (PoiType.type)
  label:              string;             // name
  anchorPoint:        Waypoint;           // calculated nearest trail location (between 2 waypoints in a mile)
  distance:           number;             // distance from trail (from nearest line segment (2 waypoints) within mile, in meters

  description?:       string;             // optional description
  distanceFromUser?:  number;             // distance from user in meters
}

export class PoiType {
  type:       string;           // string
  label:      string;           // default label
  color?:      string;          // color (must be hex!, no "white" "red" etc.)
  iconType:   string;           // Font Awesome has prefixes for different icons styles (fa, fas)
  icon:       string;           // the Font Awesome icon name
  rateable?:  boolean;          // can be rated (optional)
}


