import * as L from 'leaflet';

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
    opacity: 1
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


// TEMP!!! XXX
export function mapTiles (): any {
  return new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '',
    maxNativeZoom: 15,
    opacity: 1
  });
}
