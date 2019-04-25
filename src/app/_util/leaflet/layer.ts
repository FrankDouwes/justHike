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



/* grid (TODO: overlapping grid issues, investigate UTM grids)
considering rewriting this: https://github.com/ggolikov/Leaflet.gmxIndexGrid for leafelt 1.x
creates a square mile grid layer array (currently they're sliced into UTM zones, would prefer a single layer) */
export function createGridLayer(trailAbbr: string): Array<any> {

  const _gridLayers: Array<any> = [];

  const _trailUtm: Array<number> = getTrailMetaDataByAbbr(trailAbbr).utm;

  if (_trailUtm) {

    _trailUtm.forEach(function (zone) {

      const _utmGrid = L.utmGrid(zone, false, {
        color: '#AAA',
        showAxis100km: false,
        weight: 1,
        minInterval: environment.MILE,
        maxInterval: environment.MILE,
        opacity: 1,
      });

      _gridLayers.push(_utmGrid);
    });
  }

  return _gridLayers;
}
