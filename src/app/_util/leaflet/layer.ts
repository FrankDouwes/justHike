import * as L from 'leaflet';
import {fallbackLayer} from './tiles';
import {environment} from '../../../environments/environment.prod';

// create the main map tile layer, based on the custom fallback tile.
// if there's an internet connection use arcGis, else use locally stored tiles (or default error tile)
export function createMapTileLayer(url: string, zoomLevel: number, detectRetina: boolean): any {

  const _fallbackUrl = environment.onlineTileUrl;

  const _fallbackLayer = fallbackLayer(url,
    {
      // regular min & max zoom prop causes flickering
      minNativeZoom: zoomLevel,
      maxNativeZoom: zoomLevel,
      fallbackTileUrl: _fallbackUrl,
      errorTileUrl: './assets/images/missing.png',
      keepBuffer: 1,    // small buffer means faster scrolling
      updateWhenIdle: false,
      updateWhenZooming: false,
      detectRetina: detectRetina,
      name: 'layer_' + zoomLevel
    });

  return _fallbackLayer;
}

// create a square distance grid
export function createGridLayer(): any {
  return L.grids.distance.imperial();
}
