import * as L from 'leaflet';
import {fallbackLayer} from './tiles';
import {getTrailMetaDataByAbbr} from '../trail-meta';
import {environment} from '../../../environments/environment.prod';

// create the main map tile layer, based on the custom fallback tile.
// if there's an internet connection use arcGis, else use locally stored tiles (or default error tile)
export function createMapTileLayer(url: string, detectRetina: boolean): any {

  const _fallbackUrl = environment.onlineTileUrl;

  const _fallbackLayer = fallbackLayer(url,
    {
      // regular min & max zoom prop causes flickering
      minNativeZoom: 15,
      maxNativeZoom: 15,
      fallbackTileUrl: _fallbackUrl,
      errorTileUrl: './assets/images/missing.png',
      keepBuffer: 0,    // small buffer means faster scrolling
      updateWhenIdle: false,
      updateWhenZooming: false,
      detectRetina: detectRetina
    });

  return _fallbackLayer;
}
