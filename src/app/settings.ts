import { Trail } from './type/trail';
import {PoiType} from './type/poi';

export class Settings {

  public static MILE = 1609.344;    // mile in meters
  public static FOOT = 0.3048;      // foot in meters
  public static LINEHEIGHT = 4;     // main line thickness

  // user preferences
  public static USERSETTINGS = {

    useMiles: true,                 // miles (true), km (false)
    useFeet: true,                  // feet (true), meters (false) for elevation gain/loss
    matchEstimatedTrailLength: true,     // calculated trail length wont match what the data claims, this compensates for that

    showCampSites: true,            // show campsites in elevation profile
    showMinimap: true,              // show mini map in elevation profile
    poiDistanceOffTrail: 250,       // distance (in feet?) that a water source has to be off trail to be rendered as such
    userDistanceOffTrail: 10,       // the distance (in feet?) that a user has to be off trail for marker to change

    showExtraDesign: true,          // show extra design features in elevation profile (trees)
    greyScale: false,               // map greyscale mode

    // internal
    maxPoiDistance: 1,              // maximum poi distance from trail (in mi) to be included in the app
    scrollbarSegmentSize: 26,       // scrollbar (elevation profile) renders 1 point for every X points)
    simulatedMile: -1               // the simulated mile number
  };

  public static TRAILS: Array<Trail> = [
    {
      id: 0,
      name: 'Pacific Crest Trail - CA section 1',
      abbr: 'PCT',
      length: 109.5,      //estimated length (including 8mi into Canada) (according to halfmile pct data (first section is 109.5)
      dataPath: 'PCT/X'
    }, {
      id: 1,
      name: 'Continental Divide Trail',
      abbr: 'CDT',
      length: 3100,      //estimated length
      dataPath: 'CDT/'
    }, {
      id: 2,
      name: 'Appalachian Trail',
      abbr: 'AT',
      length: 2199,      //estimated length
      dataPath: 'AT/'
    }
  ];

  public static POITYPES: Array<PoiType> = [

    {
      type: 'user',
      label: 'user',
      iconType: 'fa',
      icon: 'hiking'
    },

    {
      type: 'water',
      label: 'water',
      color: '#58aed9',
      iconType: 'fa',
      icon: 'tint',
      rateable: true
    }, {
      type: 'camp',
      label: 'campspot',
      color: '#d9a758',
      iconType: 'fa',
      icon: 'campground'
    }, {
      type: 'road',
      label: 'road',
      color: '#989898',
      iconType: 'fa',
      icon: 'road'
    }, {
      type: 'highway',
      label: 'highway',
      color: '#8c8c8c',
      iconType: 'fa',
      icon: 'car'
    }, {
      type: 'railroad',
      label: 'railroad',
      color: '#8c8c8c',
      iconType: 'fa',
      icon: 'train'
    }, {
      type: 'gate',
      label: 'gate',
      color: '#58d9aa',
      iconType: 'fa',
      icon: 'door-open'
    }, {
      type: 'powerline',
      label: 'powerline',
      color: '#d96758',
      iconType: 'fa',
      icon: 'bolt'
    }, {
      type: 'warning',
      label: 'warning',
      color: '#F00',
      iconType: 'fa',
      icon: 'exclamation-triangle'
    }, {
      type: 'store',
      label: 'store',
      color: '#9e58d9',
      iconType: 'fa',
      icon: 'store',
      rateable: true

    }, {
      type: 'postoffice',
      label: 'post office',
      color: '#d958aa',
      iconType: 'fa',
      icon: 'box-open'
    }, {
      type: 'food',
      label: 'food',
      color: '#9e58d9',
      iconType: 'fa',
      icon: 'utensils',
      rateable: true
    }, {
      type: 'information',
      label: 'information',
      color: '#5867d9',
      iconType: 'fa',
      icon: 'info'
    }, {
      type: 'sign',
      label: 'sign',
      color: '#5867d9',
      iconType: 'fa',
      icon: 'map-signs'
    },
    {
      type: 'end',
      label: 'sign',
      color: '#d9c558',
      iconType: 'fa',
      icon: 'flag'
    },

    // multiple type
    {
      type: 'multiple',
      label: 'plus',
      color: '#989898',
      iconType: 'fa',
      icon: 'plus'
    },

    // if all else fails
    {
      type: 'unknown',
      label: '',
      color: '#6dd958',
      iconType: 'fa',
      icon: 'question-circle'
    }

  ];

  public trailData: Trail;
}
