import * as L from 'leaflet';
import {toPoint as point} from 'node_modules/leaflet/src/geometry/Point';

/* creates a leaflet icon out of an html element
the default divIcon class (that's being extended) uses innerHTML() which breaks svg href links in iOS/Safari */
const _htmlIcon = L.DivIcon.extend({

  createIcon: function (oldIcon) {
    const _div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : this.options.html,
      options = this.options;

    if (options.bgPos) {
      const bgPos = point(options.bgPos);
      _div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
    }
    this._setIconStyles(_div, 'icon');

    return _div;
  }
});

export function htmlIcon(options) {
  return new _htmlIcon(options);
}
