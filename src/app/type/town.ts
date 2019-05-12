import {Waypoint} from './waypoint';
import {Poi} from './poi';

export interface Town {

  trail:              string;             // abbr. of trail mile belongs to
  id:                 number;             // id (mile number, starts at 1 not 0)
  label:              string;             // town name
  waypoint:           Waypoint;           // center of town
  type:               string;             // type, usually 'town', but can also be 'resort', 'trail angel' etc.
  radius:             number;             // radius around center point (mi) (TODO: not sure if I need this...?)
  belongsTo:          number | Array<number>;       // an id of a mile (this is the mile the anchorPoint(s) belong to

  anchorPoint?:       Waypoint | Array<Waypoint>;   // either a static or a calculated point on trail (nearest to town)
  amenities?:         Array<string> | string;       // things you can get/do in town
  description?:       string;             // optional description
  pois?:              Array<Poi>;         // town pois
}
