import {Waypoint} from './waypoint';

export interface Score {
  category:         string;
  score:            number;
}

export class Rating {
  location:         Waypoint;           // your rating is attached to a waypoint (a location) this is its id.
  total:            number;                // total number of ratings
  date:             Date;                   // last rating
  rating:           Array<Score>;         // you can rate different things (water: flow / quality / ease of use

  id ?:             string;                   // id = lat_lng
  unsynced?:        boolean;      // (optional) locally stored but still has to be pushed online
}
