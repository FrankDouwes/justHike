import {LocationBase} from './base';

// !user does not hold a status property (idle, fetching, tracking, error)
export interface User extends LocationBase {
  id:                 -1;                 // for sorting
  type:               'user';
  distance:           number;             // distance from trail (from nearest line segment (2 waypoints) within mile, in meters
  onTrail:            boolean;            // is the user on trail / off trail (based on user settings)
  nearestMileId:      number;             // mile closest to user
}
