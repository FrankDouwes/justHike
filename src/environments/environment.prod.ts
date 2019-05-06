export const environment = {

  production: true,
  simulateTouch: false,           //  simulate touch with hammerjs, production must be set to false

  version: '1.0',     // current application version that settings belong to (in case of update to settings structure)

  // FILES
  // PRODUCTION SERVER:
  // appDomain: 'https://storage.googleapis.com/',
  // fileBaseUrl: 'just-hike/',

  // TEST SERVER:
  appDomain: 'https://hike.frankdouwes.com/',
  fileBaseUrl: 'files/',

  mailto: 'https://hike.frankdouwes.com/scripts/mailto.php',       // TODO: BETA only

  updateCheckInterval: 86400000,      // the time between (online) data update checks
  onlineTileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',

  MILE: 1609.344,    // mile in meters
  FOOT: 0.3048,      // foot in meters
  LINEHEIGHT: 4,     // main line thickness

  // user preferences
  DEFAULT_USER_SETTINGS: {

    activeTrailId: 0,               // the ID of the current trail
    purchasedTrails: [],            // IDs of purchased trails
    direction: 0,                   // northbound (0) or southbound (1)
    showSnow: true,                 // draw the snowpack
    showMiniMap: true,              // show mini map in elevation profile
    showMileGrid: false,            // show square mile grid
    animateMap: false,              // animate the map transitions (panning)

    poiDistanceOffTrail: 250,       // distance (in feet?) that a water source has to be off trail to be rendered as such
    poiMaxDistance: 1000,           // the maximum distance before a poi is ignored (and not rendered), eliminates side trail poi
    userDistanceOffTrail: 10,       // the distance (in feet?) that a user has to be off trail for marker to change
    autoUpdate: true,               // auto download updates (only used for snow data) (TODO UNUSED: add auto updater for snow?)

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
    detectRetina: false             // disable retina by default (battery saving)
  },


  // Data set by DEVs before generating new trail data.
  TRAILS_GENERATION: [
    {
      abbr: 'DEMO',
      id: 0,
      trailVersion: '1.1',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      hasTowns: true,                   // has a seperate file for towns
      length: 109.5,                    // estimated length (first section is 109.5)
      dataPath: 'DEMO/',
      scrollbarSegmentSize: 100,        // one scrollbar segment for every X miles
      multipart: false
    }, {
      abbr: 'PCT',
      id: 1,
      trailVersion: '1.1',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      hasTowns: true,                   // has a seperate file for towns
      length: [109.5, 100, 132.5, 112.5, 111.9, 85.6, 115, 175.5, 74.4, 75.4,
        64.8, 38.3, 91.4, 132.2, 82.2, 98.5, 56.2, 63, 54.5, 74.4, 60.1, 75.9,
        107.9, 55, 148.2, 98.3, 70.9, 127, 70.3],     // estimated length (including 8mi into Canada) according to halfmile pct data
      dataPath: 'PCT/',
      scrollbarSegmentSize: 200,       // one scrollbar segment for every X miles
      multipart: true,
      parts: 29
    }, {
      abbr: 'CDT',
      id: 2,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      length: 3011,                    // estimated length
      dataPath: 'CDT/',
      scrollbarSegmentSize: 200,       // one scrollbar segment for every X miles
      multipart: false,

    }, {
      abbr: 'AT',
      id: 3,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      snowVersion: '1.0',
      length: 2199,                    // estimated length
      dataPath: 'AT/',
      scrollbarSegmentSize: 200,       // one scrollbar segment for every X miles
      multipart: false,
    }, {
      abbr: 'SHR',
      id: 4,
      trailVersion: '1.0',
      tilesVersion: '1.0',
      length: 215,                      // estimated length
      dataPath: 'SHR/',
      scrollbarSegmentSize: 100,        // one scrollbar segment for every X miles
      multipart: false,
    }
  ]
};
