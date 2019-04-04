import * as L from 'leaflet';

/* simple mixin to force a z-index for a marker
this overrides the default index sorting leaflet has.
used for the User marker (always on top) */
(function(global){
  const MarkerMixin = {
    _updateZIndex: function (offset) {
      this._icon.style.zIndex = this.options.forceZIndex ? (this.options.forceZIndex + (this.options.zIndexOffset || 0)) : (this._zIndex + offset);
    },
    setForceZIndex: function(forceZIndex) {
      console.log('force');

      this.options.forceZIndex = forceZIndex ? forceZIndex : null;
    }
  };
  if (global) global.include(MarkerMixin)
})(L.Marker);
