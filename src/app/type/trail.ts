import { Mile } from './mile';
import { OHLC } from './ohlc';
import { Poi } from './poi';

// the current trail data
export interface Trail {

  // STATIC
  id:                     number;
  utm:                    Array<number>;      // utm zones (for grid generation)
  version:                string;             // version of trail data (for updating)
  name:                   string;
  abbr:                   string;
  length:                 number;             // the given length of the trail (so not calculated with available waypoints)
  scrollbarSegmentSize:   number;       // one scrollbar segment for every X miles

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



/* the data that is always available regardless of the currently selected trail. (provided by version.json)
TrailMeta represents the most recent available data for a given trail, meaning the version data is what is available online,
not what it downloaded. TrailMeta is used for Trail generation as well as version checking */
export class TrailMeta {
  id:             number;
  abbr:           string;
  trailVersion:   string;
  tilesVersion:   string;
  length:         number;

  // optional params
  utm?:                   Array<number>;
  name?:                  string;
  snowVersion?:           string;           // not all trails have snow
  trailFileSize?:         number;
  tileFileSize?:          number;
  tilesFileCount?:        number;
  snowFileSize?:          number;
  availableForPurchase?:  boolean;
  isFree?:                boolean;
  dataPath?:              string;
  scrollSegmentSize?:     number;
}
