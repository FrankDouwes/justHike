// geographical location
export interface Waypoint {
  longitude:        number;
  latitude:         number;

  elevation?:       number;           // optional elevation
  distance?:        number;           // percentage within mile (so it won't have to be recalculated)
  distanceTotal?:   number;           // distance of total (used for poi spacing)
  nearestToPois?:   Array<number>;    // array of poi indexes that are nearest to this location
}
