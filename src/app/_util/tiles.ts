import * as L from 'leaflet';
import * as Util from 'leaflet/src/core/Util';
import * as Browser from 'leaflet/src/core/Browser';


// unused: google elevation shade (+ labels)
// L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   subdomains:['mt0','mt1','mt2','mt3'],
//   opacity: 0.4
// }),

// unused: simular to trail layer, cleaner roads
// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 1
// }),

// (1) elevation shade: 15% normal
// L.tileLayer('https://caltopo.com/tile/hs_m315z45s3/{z}/{x}/{y}.png', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.15
// }),
//
// // (2) earth details: (layer1) 12% linear light
// L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.12,
//   subdomains:['mt0','mt1','mt2','mt3']
// }),
//
// // (3) earth details: (layer2) 25% overlay
// L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.25,
//   subdomains:['mt0','mt1','mt2','mt3']
// }),
//
// // (4) color layer: 75% color
// L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.75
// }),
//
// // (5) elevation shade: 20% color-burn
// L.tileLayer('https://caltopo.com/tile/hs_m315z45s3/{z}/{x}/{y}.png', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.20
// }),

// (6) orange elevation lines: 100% normal
export function elevationLines (): any {
  return new L.tileLayer('https://caltopo.com/tile/mb_clear-0-0-c22BB6100/{z}/{x}/{y}.png', {
    attribution: '',
    maxNativeZoom: 15,
    opacity: 0.75
  });
}

// // (7) trails: 60% multiply
// L.tileLayer('https://caltopo.com/tile/mb_topo/{z}/{x}/{y}.png', {
//   attribution: '',
//   // minZoom: 15,
//   // maxZoom: 15,
//   maxNativeZoom: 15,
//   opacity: 0.6
// }),


// TEMP!!! TODO
export function mapTiles (): Array<any> {

  return [
    // (1) elevation shade: 15% normal
    L.tileLayer('https://caltopo.com/tile/hs_m315z45s3/{z}/{x}/{y}.png', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.15
    }),

    // (2) earth details: (layer1) 12% linear light
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.12,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),

    // (3) earth details: (layer2) 25% overlay
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.25,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),

    // (4) color layer: 75% color
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.75
    }),

    // (5) elevation shade: 20% color-burn
    L.tileLayer('https://caltopo.com/tile/hs_m315z45s3/{z}/{x}/{y}.png', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.20
    }),

    // (6) orange elevation lines: 100% normal
    L.tileLayer('https://caltopo.com/tile/mb_clear-0-0-c22BB6100/{z}/{x}/{y}.png', {
      attribution: '',
      maxNativeZoom: 15,
      opacity: 1
    }),

    // (7) trails: 60% multiply
    L.tileLayer('https://caltopo.com/tile/mb_topo/{z}/{x}/{y}.png', {
      attribution: '',
      // minZoom: 15,
      // maxZoom: 15,
      maxNativeZoom: 15,
      opacity: 0.6
    })
  ];

  // return new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: '',
  //   maxNativeZoom: 15,
  //   opacity: 1
  // });
}

// tile image order:
// 1. locally stored tile images (url)
// 2. internet tiles (fallbackTileUrl)
// 3. assets missing tile image (errorTileUrl)
const FallbackTileLayer = L.TileLayer.extend({

  createTile: function (coords, done) {

    let _tile = L.TileLayer.prototype.createTile.call(this, coords, done);
    _tile.setAttribute('coords', JSON.stringify(coords));
    _tile.setAttribute('state', 'default');

    return _tile;
  },

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
