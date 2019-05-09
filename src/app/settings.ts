import { Trail } from './type/trail';
import {PoiType} from './type/poi';

export class Settings {

  public static POITYPES: Array<PoiType> = [
    {
      type: 'user',
      label: 'user',
      iconType: 'fa',
      icon: 'hiking'
    }, {
      type: 'user-dot',
      label: '',
      iconType: 'far',
      icon: 'dot-circle'
    }, {
      type: 'water',
      label: 'water source',
      isMajor: true,
      color: '#58aed9',
      iconType: 'fa',
      icon: 'tint',
      rateable: true,
      rateBy: ['quality', 'flow', 'accessibility'],
      userEnabled: true
    }, {
      type: 'camp',
      label: 'campsite',
      isMajor: true,
      color: '#d9a758',
      iconType: 'fa',
      icon: 'campground',
      userEnabled: true
    }, {
      type: 'shelter',
      label: 'shelter',
      isMajor: false,
      color: '#d9a758',
      iconType: 'fa',
      icon: 'house-damage',
      rateBy: ['pests', 'amenities'],
      userEnabled: true
    },{
      type: 'road',
      label: 'road',
      color: '#878787',
      iconType: 'fa',
      icon: 'road',
      userEnabled: true
    }, {
      type: 'highway',
      label: 'highway',
      isMajor: true,
      color: '#9b9b9b',
      iconType: 'fa',
      icon: 'car',
      userEnabled: true
    }, {
      type: 'railroad',
      label: 'railroad',
      color: '#afafaf',
      iconType: 'fa',
      icon: 'train',
      userEnabled: true
    }, {
      type: 'gate',
      label: 'gate',
      color: '#58d9aa',
      iconType: 'fa',
      icon: 'door-open',
      userEnabled: true
    }, {
      type: 'powerline',
      label: 'powerline',
      color: '#8b6765',
      iconType: 'fa',
      icon: 'bolt',
      userEnabled: true
    }, {
      type: 'store',
      label: 'store',
      color: '#9e58d9',
      iconType: 'fa',
      icon: 'store',
      rateable: true,
      rateBy: ['assortment', 'price'],
      userEnabled: true
    }, {
      type: 'postoffice',
      label: 'post office',
      color: '#d958aa',
      iconType: 'fa',
      icon: 'box-open',
      userEnabled: true
    }, {
      type: 'food',
      label: 'food',
      color: '#805bd9',
      iconType: 'fa',
      icon: 'utensils',
      rateable: true,
      rateBy: ['quantity', 'quality', 'price'],
      userEnabled: true
    }, {
      type: 'information',
      label: 'information',
      color: '#4498d9',
      iconType: 'fa',
      icon: 'info',
      userEnabled: true
    }, {
      type: 'trailhead',
      label: 'trail head',
      color: '#8d5e35',
      iconType: 'fa',
      icon: 'parking',
      userEnabled: true
    }, {
      type: 'sign',
      label: 'sign',
      color: '#d08d4b',
      iconType: 'fa',
      icon: 'map-signs',
      userEnabled: true
    }, {
      type: 'bridge',
      label: 'bridge',
      color: '#d95da5',
      iconType: 'fa',
      icon: 'shoe-prints',
      userEnabled: true
    }, {
      type: 'trail',
      label: 'trail',
      color: '#a5d958',
      iconType: 'fa',
      icon: 'map-signs',
      userEnabled: true
    }, {
      type: 'view',
      label: 'view',
      color: '#d97948',
      iconType: 'fa',
      icon: 'mountain',
      userEnabled: true
    }, {
      type: 'peak',
      label: 'summit',
      color: '#d97948',
      iconType: 'fa',
      icon: 'mountain',
      userEnabled: true
    }, {
      type: 'boundary',
      label: 'boundary',
      color: '#d9c558',
      iconType: 'fa',
      icon: 'map-pin',
      userEnabled: true
    }, {
      type: 'end',
      label: 'sign',
      isMajor: true,
      color: '#d9c558',
      iconType: 'fa',
      icon: 'flag'
    }, {
      type: 'sight',
      label: 'sight',
      color: '#56ccd9',
      iconType: 'fa',
      icon: 'gem'
    }, {
      type: 'resort',
      label: 'resort / inn / lodge / angel',
      isMajor: true,
      color: '#48d965',
      iconType: 'fa',
      icon: 'hotel',
      rateable: true,
      rateBy: ['amenities', 'price'],
      userEnabled: true
    }, {
      type: 'town',
      label: 'town / city',
      isMajor: true,
      color: '#9b9b9b',
      iconType: 'fa',
      icon: 'city'
    }, {
      type: 'directions',
      label: 'directions',
      isMajor: false,
      color: '#b78e27',
      iconType: 'fa',
      icon: 'directions'
    },

    // note
    {
      type: 'note',       // add
      label: 'note',
      color: '#E8D6BD',
      iconType: 'fas',
      icon: 'pen-alt',
      userEnabled: true
    },

    // warning
    {
      type: 'warning',       // add
      label: 'warning',
      color: '#d75b4e',
      iconType: 'fa',
      icon: 'exclamation-triangle'
    },

    // multiple type
    {
      type: 'multiple',
      label: 'plus',
      color: '#4b4b4b',
      iconType: 'fa',
      icon: 'plus'
    },

    // if all else fails
    {
      type: 'unknown',
      label: '',
      color: '#808080',
      iconType: 'fa',
      icon: 'question-circle'
    }

  ];

  public trailData: Trail;
}
