import { Waypoint } from './waypoint';

export interface Poi {
  id:                 number;             // id (mile number, starts at 1 not 0)
  trail:              string;              // abbr. of trail mile belongs to
  waypoint:           Waypoint;           // coordinates (+ elevation)
  type:               string;             // type (PoiType.type)
  label:              string;             // name
  anchorPoint:        Waypoint;           // calculated nearest trail location (between 2 waypoints in a mile)
  // distance:           number;             // distance from trail (from nearest line segment (2 waypoints) within mile, in meters
  belongsTo?:         number;             // an id of a mile/poi this poi belongs to
  belongsToType:      string;             // belongs to either a mile or another poi
  description?:       string;             // optional description
  comment?:           string;             // optional comment
  distanceFromUser?:  number;             // distance from user in meters
  distanceFromPoi?:   number;             // distance from another poi in meters
  identifier?:       string;             // corresponding identifier for map system (for example halfmiles waypoint codes)
}

export interface PoiType {
  type:           string;           // string
  label:          string;           // default label
  iconType:       string;           // Font Awesome has prefixes for different icons styles (fa, fas)
  icon:           string;           // the Font Awesome icon name

  isMajor?:       boolean;          // crucial are 'water', 'camp', 'road'
  color?:         string;           // color (must be hex!, no "white" "red" etc.
  rateable?:      boolean;          // can be rated (optional)
  rateBy?:        Array<string>;       // all the aspects the poi can be rated by
  userEnabled?:   boolean;          // user can add a marker of this type

}


