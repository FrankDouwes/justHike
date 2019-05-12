import * as L from 'leaflet';
import * as Util from 'leaflet/src/core/Util';
import * as Browser from 'leaflet/src/core/Browser';

// tile image order:
// 1. locally stored tile images (url)
// 2. internet tiles (fallbackTileUrl)
// 3. assets missing tile image (errorTileUrl)
// TODO: prevent 404 on image URL (stackoverflow.com/questions/9893886/prevent-image-load-errors-going-to-the-javascript-console)
// TODO: this might cause a memory leak, investigate further, empty gifs arent drawn (they are for regular tile layer)
const _fallbackTileLayer = L.TileLayer.extend({

  createTile: function (coords, done) {
    const _tile = L.TileLayer.prototype.createTile.call(this, coords, done);

    // html attributes are strings
    _tile.setAttribute('cx', coords.x);
    _tile.setAttribute('cy', coords.y);
    _tile.setAttribute('cz', coords.z);

    _tile.setAttribute('state', 'default');

    return _tile;
  },

  // override
  _tileOnError: function (done, tile, e) {

    const _tileState = tile.getAttribute('state');

    const _tileCoords = {
        x: tile.getAttribute('cx'),
        y: tile.getAttribute('cy'),
        z: tile.getAttribute('cz')
    };

    if (_tileState === 'default') {
      tile.setAttribute('state', 'fallback');
      tile.src = '';
      tile.src = this.updateTileUrl(_tileCoords, this.options.fallbackTileUrl);
    } else if (_tileState === 'fallback') {
      tile.setAttribute('state', 'error');
      tile.src = this.options.errorTileUrl;
    }

    done(e, tile);
  },

  updateTileUrl: function (coords, url) {

    // console.log(this.options);

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

export function fallbackLayer (url, options) {
  return new _fallbackTileLayer(url, options);
}
