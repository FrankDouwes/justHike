import {Trail} from '../app/type/trail';

export const environment = {

  production: false,               //  parsing raw data will trigger file download if set to false
    useRawData: true,            //  use raw data (create json), production must be set to false
      dowloadParsedData: false,   //  use raw data must be set to true in order for this to work
    simulateTouch: true,            //  simulate touch with hammerjs, production must be set to false

  version: '1.0',     // current application version that settings belong to (in case of update to settings structure)
  appDomain: 'https://hike.frankdouwes.com/',
  fileBaseUrl: 'files/',

  updateCheckInterval: 86400000,      // the time between data update checks (maptiles/snow data)

  MILE: 1609.344,    // mile in meters
  FOOT: 0.3048,      // foot in meters
  LINEHEIGHT: 4,     // main line thickness

  // user preferences
  DEFAULT_USER_SETTINGS: {

    activeTrailId: 0,               // the ID of the current trail
    purchasedTrails: [],            // IDs of purchased trails

    useMiles: true,                 // miles (true), km (false) (UNUSED)
    useFeet: true,                  // feet (true), meters (false) for elevation gain/loss (UNUSED)
    direction: 0,                   // northbound (0) or southbound (1)
    showSnowPack: true,             // draw the snowpack
    showCampSites: true,            // show campsites in elevation profile
    showMiniMap: true,              // show mini map in elevation profile

    poiDistanceOffTrail: 250,       // distance (in feet?) that a water source has to be off trail to be rendered as such
    userDistanceOffTrail: 10,       // the distance (in feet?) that a user has to be off trail for marker to change

    showExtraDesign: true,          // show extra design features in elevation profile (trees)
    greyScale: false,               // map greyscale mode (UNUSED)

    // internal
    maxPoiDistance: 1,              // maximum poi distance from trail (in mi) to be included in the app
    scrollbarSegmentSize: 26,       // scrollbar (elevation profile) renders 1 point for every X points)
    simulatedMile: -1,              // the simulated mile number
    userName: 'unknown',             // default username
  },

  TRAILS: [
    {
      id: 0,
      tileVersion: '1.0',
      snowVersion: '1.0',
      name: 'DEMO: Campo - Warner Springs',
      abbr: 'DEMO',
      length: 109.5,      //estimated length (first section is 109.5)
      dataPath: 'DEMO/',
      tileDataSize: 20971520,
      lineDataSize: 20971520,
      snowDataSize: 60000,
      scrollbarSegmentSize: 1,      // one scrollbar segment for every X miles
      availableForPurchase: false,
      isFree: true                    // always free

    }, {
      id: 1,
      tileVersion: '1.0',
      snowVersion: '1.0',
      name: 'Pacific Crest Trail',
      abbr: 'PCT',
      length: 2661.4,      //estimated length (including 8mi into Canada) according to halfmile pct data
      dataPath: 'PCT/',
      tileDataSize: 209715200,
      lineDataSize: 209715200,
      snowDataSize: 600000,
      scrollbarSegmentSize: 1,      // one scrollbar segment for every X miles
      availableForPurchase: true,
      isFree: true                    // free in V1
    }, {
      id: 2,
      tileVersion: '1.0',
      snowVersion: '1.0',
      name: 'Continental Divide Trail',
      abbr: 'CDT',
      length: 3100,      //estimated length
      dataPath: 'CDT/',
      tileDataSize: 209715200,
      lineDataSize: 209715200,
      snowDataSize: 600000,
      scrollbarSegmentSize: 1,      // one scrollbar segment for every X miles
      availableForPurchase: false
    }, {
      id: 3,
      tileVersion: '1.0',
      snowVersion: '1.0',
      name: 'Appalachian Trail',
      abbr: 'AT',
      length: 2199,      //estimated length
      dataPath: 'AT/',
      tileDataSize: 209715200,
      lineDataSize: 209715200,
      snowDataSize: 600000,
      scrollbarSegmentSize: 1,      // one scrollbar segment for every X miles
      availableForPurchase: false
    }
  ]
};
