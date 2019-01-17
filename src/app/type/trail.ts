import { Waypoint} from './waypoint';
import {Mile} from './mile';
import {OHLC} from './ohlc';
import {Poi} from './poi';

export class Trail {
  // STATIC
  id:             number;
  name:           string;
  abbr:           string;
  length:         number;             // the given length of the trail (so not calculated with available waypoints)
  dataPath:       string;             // path to data file(s)

  // weatherPath?:   string;             // path to weather data (optional)
  // waterPath?:     string;             // path to water data (optional)

  // CALCULATED
  waypoints?:         Array<Waypoint>;    // the parsed waypoint data for this trail (just trail waypoints, no pois)
  calcLength?:        number;             // the calculated length based on waypoints
  elevationRange?:    OHLC                // the elevation range of the entire trail
  scale?:             number;             // scale, calculated length vs. length
  miles?:             Array<Mile>;        // the calculated miles
  waterSources?:      Array<Poi>;         // all water sources (including multi-pois that also have water)

  poiTypes?:          Array<object>;      // the poiTypes available for this trail (used for icons / labels)
}
