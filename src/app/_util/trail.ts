import {environment} from '../../environments/environment.prod';
import {Trail} from '../type/trail';

export function getTrailDataById(id: Number): Trail {

  for (const key in environment.TRAILS) {
    if (environment.TRAILS[Number(key)].id === id) {
      return environment.TRAILS[key] as Trail;
    }
  }

  throw new Error('Trail not found!');
}
