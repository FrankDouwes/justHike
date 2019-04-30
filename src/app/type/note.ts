import {Poi} from './poi';

// a note is a Poi
export interface Note extends Poi {
  share?: boolean;            // share note (right now with dev, later online)
}
