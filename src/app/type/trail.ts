import { Waypoint} from './waypoint';
import { Mile } from './mile';
import { OHLC } from './ohlc';
import { Poi } from './poi';

export class Trail {
  // STATIC
  id:             number;
  tileVersion:    string;             // version of tile data (for updating)
  snowVersion:    string;             // version of snow data (for (auto) updating)
  name:           string;
  abbr:           string;
  length:         number;             // the given length of the trail (so not calculated with available waypoints)
  dataPath:       string;             // path to data file(s)
  scrollbarSegmentSize: number;       // one scrollbar segment for every X miles
  tileDataSize:   number;             // estimated size of tiles (in bytes)
  lineDataSize:   number;             // estimated size of line tiles (in bytes)
  snowDataSize:   number;             // estimated size of show data (in bytes)
  availableForPurchase: boolean;       // if this is currently for sale
  isFree?: boolean;                    // if this is free

  // CALCULATED
  direction?:         number;             // 0 for NOBO, 1 for SOBO
  waypoints?:         Array<Waypoint>;    // the parsed waypoint data for this trail (just trail waypoints, no pois)
  calcLength?:        number;             // the calculated length based on waypoints
  elevationRange?:    OHLC;               // the elevation range of the entire trail
  scale?:             number;             // scale, calculated length vs. length
  miles?:             Array<Mile>;        // the calculated miles
  waterSources?:      Array<Poi>;         // all water sources (including multi-pois that also have water)
  poiTypes?:          Array<object>;      // the poiTypes available for this trail (used for icons / labels)
}
