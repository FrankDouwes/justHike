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
      type: 'water',
      label: 'water',
      isMajor: true,
      color: '#58aed9',
      iconType: 'fa',
      icon: 'tint',
      rateable: true
    }, {
      type: 'camp',
      label: 'campspot',
      isMajor: true,
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
      isMajor: true,
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
      isMajor: true,
      color: '#d9c558',
      iconType: 'fa',
      icon: 'flag'
    },

    // multiple type
    {
      type: 'multiple',
      label: 'plus',
      color: '#3f3f3f',
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
