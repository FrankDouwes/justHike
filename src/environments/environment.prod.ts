import {Trail} from '../app/type/trail';

export const environment = {

  production: false,               //  parsing raw data will trigger file download if set to false
  simulateTouch: false,           //  simulate touch with hammerjs, production must be set to false

  version: '1.0',     // current application version that settings belong to (in case of update to settings structure)
  appDomain: 'http://hike.frankdouwes.com/',
  fileBaseUrl: 'files/',

  updateCheckInterval: 86400000,      // the time between (online) data update checks

  MILE: 1609.344,    // mile in meters
  FOOT: 0.3048,      // foot in meters
  LINEHEIGHT: 4,     // main line thickness

  // user preferences
  DEFAULT_USER_SETTINGS: {

    activeTrailId: 0,               // the ID of the current trail
    purchasedTrails: [],            // IDs of purchased trails

    useMiles: true,                 // miles (true), km (false) (TODO UNUSED)
    useFeet: true,                  // feet (true), meters (false) for elevation gain/loss (TODO UNUSED)
    direction: 0,                   // northbound (0) or southbound (1)
    showSnow: true,                 // draw the snowpack
    showMiniMap: true,              // show mini map in elevation profile
    showMileGrid: false,            // show square mile grid
    animateMap: false,              // animate the map transitions (panning)

    poiDistanceOffTrail: 250,       // distance (in feet?) that a water source has to be off trail to be rendered as such
    poiMaxDistance: 1000,           // the maximum distance before a poi is ignored (and not rendered), eliminates side trail poi
    userDistanceOffTrail: 10,       // the distance (in feet?) that a user has to be off trail for marker to change
    autoUpdate: true,               // auto update (only used for snow data) (TODO UNUSED)

    // major markers visibility (elevation profile)
    showWater: true,
    showCamp: true,
    showHighway: false,                // not showing roads by default
    showEnd: true,

    // internal
    maxPoiDistance: 1,              // maximum poi distance from trail (in mi) to be included in the app
    scrollbarSegmentSize: 26,       // scrollbar (elevation profile) renders 1 point for every X points)
    simulatedMile: -1,              // the simulated mile number
    userName: 'Hiker',              // default username

    // elevationProfile
    parallaxEnabled: false,         // parallax effect in elevation profile
    screenMode: 'default',          // 'default', 'highContrast' or 'nighHike'
    showExtraDesign: true,          // show extra design features in elevation profile (trees)
  },


  // Data set by DEVs before generating new trail data.
  TRAILS_GENERATION: [
    {
      id: 0,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      abbr: 'DEMO',
      length: 109.5,                  // estimated length (first section is 109.5)
      dataPath: 'DEMO/',
      scrollbarSegmentSize: 100,        // one scrollbar segment for every X miles
    }, {
      id: 1,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      abbr: 'PCT',
      length: 2661.4,                 // estimated length (including 8mi into Canada) according to halfmile pct data
      dataPath: 'PCT/',
      scrollbarSegmentSize: 200,        // one scrollbar segment for every X miles
    }, {
      id: 2,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      abbr: 'CDT',
      length: 3011,                   // estimated length
      dataPath: 'CDT/',
      scrollbarSegmentSize: 200,        // one scrollbar segment for every X miles
    }, {
      id: 3,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      abbr: 'AT',
      length: 2199,                   // estimated length
      dataPath: 'AT/',
      scrollbarSegmentSize: 200,        // one scrollbar segment for every X miles
    }
  ]
};
