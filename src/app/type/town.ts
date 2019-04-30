import {Waypoint} from './waypoint';
import {Poi} from './poi';

export interface Town {
  id:                 number;             // id (mile number, starts at 1 not 0)
  name:               string;             // abbr. of trail mile belongs to
  centerPoint:        Waypoint;           // center of town
  anchorPoint?:       Waypoint;           // either a static or a calculated point on trail (nearest to town)
  radius:             number;             // radius around center point (mi) (TODO: not sure if I need this...?)
  description?:       string;             // optional description
  pois?:              Array<Poi>;         // town pois
}
