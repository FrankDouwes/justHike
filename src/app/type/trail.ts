import { Waypoint} from './waypoint';
import { Mile } from './mile';
import { OHLC } from './ohlc';
import { Poi } from './poi';

export class Trail {
  // STATIC
  id:             number;
  version:        string;             // version of trail data (for updating)
  name:           string;
  abbr:           string;
  length:         number;             // the given length of the trail (so not calculated with available waypoints)
  scrollbarSegmentSize: number;       // one scrollbar segment for every X miles

  // CALCULATED
  direction?:         number;             // 0 for NOBO, 1 for SOBO
  calcLength?:        number;             // the calculated length based on waypoints
  elevationRange?:    OHLC;               // the elevation range of the entire trail
  scale?:             number;             // scale, calculated length vs. length
  miles?:             Array<Mile>;        // the calculated miles
  pois:               Array<Poi>;         // all points of interest
  sortedPoiIds?:      any;
  poiTypes?:          Array<object>;      // the poiTypes available for this trail (used for icons / labels)
}

export class TrailMeta {
  id: number;
  name?: string;
  abbr: string;
  trailVersion: string;
  tilesVersion: string;
  snowVersion: string;
  length: number;

  // optional params
  trailFileSize?: number;
  tileFileSize?: number;
  snowFileSize?: number;
  availableForPurchase?: boolean;
  isFree?: boolean;
  dataPath?: string;
  scrollSegmentSize?: number;
}
