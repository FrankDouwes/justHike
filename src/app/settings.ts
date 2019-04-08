import { Trail } from './type/trail';
import {PoiType} from './type/poi';

export class Settings {

  // TODO: this should be moved somewhere else
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
      rateBy: ['quality', 'flow', 'accessibility']
    }, {
      type: 'camp',
      label: 'campsite',
      isMajor: true,
      color: '#d9a758',
      iconType: 'fa',
      icon: 'campground',
    }, {
      type: 'road',
      label: 'road',
      color: '#878787',
      iconType: 'fa',
      icon: 'road'
    }, {
      type: 'highway',
      label: 'highway',
      isMajor: true,
      color: '#9b9b9b',
      iconType: 'fa',
      icon: 'car'
    }, {
      type: 'railroad',
      label: 'railroad',
      color: '#afafaf',
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
      color: '#8b6765',
      iconType: 'fa',
      icon: 'bolt'
    }, {
      type: 'store',
      label: 'store',
      color: '#9e58d9',
      iconType: 'fa',
      icon: 'store',
      rateable: true,
      rateBy: ['assortment', 'price']
    }, {
      type: 'postoffice',
      label: 'post office',
      color: '#d958aa',
      iconType: 'fa',
      icon: 'box-open'
    }, {
      type: 'food',
      label: 'food',
      color: '#805bd9',
      iconType: 'fa',
      icon: 'utensils',
      rateable: true,
      rateBy: ['quantity', 'quality', 'price']
    }, {
      type: 'information',
      label: 'information',
      color: '#4498d9',
      iconType: 'fa',
      icon: 'info'
    }, {
      type: 'trailhead',
      label: 'trail head',
      color: '#8d5e35',
      iconType: 'fa',
      icon: 'parking'
    }, {
      type: 'sign',
      label: 'sign',
      color: '#d08d4b',
      iconType: 'fa',
      icon: 'map-signs'
    }, {
      type: 'bridge',
      label: 'bridge',
      color: '#d95da5',
      iconType: 'fa',
      icon: 'shoe-prints'
    }, {
      type: 'trail',
      label: 'sign',
      color: '#a5d958',
      iconType: 'fa',
      icon: 'map-signs'
    }, {
      type: 'view',
      label: 'summit / view',
      color: '#d97948',
      iconType: 'fa',
      icon: 'mountain'
    }, {
      type: 'boundary',
      label: 'boundary',
      color: '#d9c558',
      iconType: 'fa',
      icon: 'map-pin'
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
      rateBy: ['amenities', 'price']
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
