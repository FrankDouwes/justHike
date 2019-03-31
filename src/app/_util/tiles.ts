import * as L from 'leaflet';
import * as Util from 'leaflet/src/core/Util';
import * as Browser from 'leaflet/src/core/Browser';

// tile image order:
// 1. locally stored tile images (url)
// 2. internet tiles (fallbackTileUrl)
// 3. assets missing tile image (errorTileUrl)
// TODO: prevent 404 on image URL (stackoverflow.com/questions/9893886/prevent-image-load-errors-going-to-the-javascript-console)

const FallbackTileLayer = L.TileLayer.extend({

  createTile: function (coords, done) {
    let _tile = L.TileLayer.prototype.createTile.call(this, coords, done);
    _tile.setAttribute('coords', JSON.stringify(coords));
    _tile.setAttribute('state', 'default');

    return _tile;
  },

  // override
  _tileOnError: function (done, tile, e) {

    const _tileState = tile.getAttribute('state');
    const _tileCoords = JSON.parse(tile.getAttribute('coords'));

    if (_tileState === 'default') {
      tile.setAttribute('state', 'fallback');
      tile.src = this.updateTileUrl(_tileCoords, this.options.fallbackTileUrl);
    } else if (_tileState === 'fallback') {
      tile.setAttribute('state', 'error');
      tile.src = this.options.errorTileUrl;
    }

    done(e, tile);
  },

  updateTileUrl: function (coords, url) {

    const data = {
      r: Browser.retina ? '@2x' : '',
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl()
    };
    if (this._map && !this._map.options.crs.infinite) {
      const invertedY = this._globalTileRange.max.y - coords.y;
      if (this.options.tms) {
        data['y'] = invertedY;
      }
      data['-y'] = invertedY;
    }

    return Util.template(url, Util.extend(data, this.options));
  }
});

// Supply with a factory for consistency with Leaflet.
export function fallbackLayer (url, options) {
  return new FallbackTileLayer(url, options);
}
