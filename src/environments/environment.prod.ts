import {Trail} from '../app/type/trail';

export const environment = {
  production: true,

  MILE: 1609.344,    // mile in meters
  FOOT: 0.3048,      // foot in meters
  LINEHEIGHT: 4,     // main line thickness

  // user preferences
  DEFAULT_USER_SETTINGS: {

    version: 0.1,                   // current application version that settings belong to (in case of update to settings structure)

    activeTrailId: 0,               // the ID of the current trail
    purchasedTrails: [1, 2],        // IDs of purchased trails

    useMiles: true,                 // miles (true), km (false) (UNUSED)
    useFeet: true,                  // feet (true), meters (false) for elevation gain/loss

    showCampSites: true,            // show campsites in elevation profile
    showMinimap: true,              // show mini map in elevation profile
    poiDistanceOffTrail: 250,       // distance (in feet?) that a water source has to be off trail to be rendered as such
    userDistanceOffTrail: 10,       // the distance (in feet?) that a user has to be off trail for marker to change

    showExtraDesign: true,          // show extra design features in elevation profile (trees)
    greyScale: false,               // map greyscale mode

    // internal
    maxPoiDistance: 1,              // maximum poi distance from trail (in mi) to be included in the app
    scrollbarSegmentSize: 26,       // scrollbar (elevation profile) renders 1 point for every X points)
    simulatedMile: -1,              // the simulated mile number
    userName: 'unknown',             // default username
  },
  TRAILS: [
    {
      id: 0,
      name: 'DEMO: Pacific Crest Trail - CA section 1',
      abbr: 'DEMO',
      length: 109.5,      //estimated length (first section is 109.5)
      dataPath: 'DEMO/',
      scrollbarSegmentSize: 10      // one scrollbar segment for every X miles
    }, {
      id: 1,
      name: 'Pacific Crest Trail',
      abbr: 'PCT',
      length: 2660,      //estimated length (including 8mi into Canada) according to halfmile pct data
      dataPath: 'PCT/',
      scrollbarSegmentSize: 26      // one scrollbar segment for every X miles
    }, {
      id: 2,
      name: 'Continental Divide Trail',
      abbr: 'CDT',
      length: 3100,      //estimated length
      dataPath: 'CDT/',
      scrollbarSegmentSize: 31      // one scrollbar segment for every X miles
    }, {
      id: 3,
      name: 'Appalachian Trail',
      abbr: 'AT',
      length: 2199,      //estimated length
      dataPath: 'AT/',
      scrollbarSegmentSize: 22      // one scrollbar segment for every X miles
    }
  ]
};
