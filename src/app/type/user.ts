import {Waypoint} from './waypoint';

// !user does not hold a status property (idle, fetching, tracking, error)

export class User {
  type: 'user';
  waypoint:           Waypoint;           // coordinates (+ elevation)
  anchorPoint:        Waypoint;           // calculated nearest trail location (between 2 waypoints in a mile)
  distance:           number;             // distance from trail (from nearest line segment (2 waypoints) within mile, in meters
  nearestMileId:      number;             // mile closest to user
}
