import * as L from 'leaflet';
declare const SVG: any;    // fixes SVGjs bug

// UTILS for markers (leaflet & elevation profile markers)

// ELEVATION PROFILE (SVG, font-awesome based markers)

// clone a FA svg element.
// font awesome webfont doesn't seem to render to svg elements, therefor we're cloning svg data from generated (hidden) elements at start-up.
import {shadeColor} from './color';

const markerData: string = 'm16.75,0.75c-8.28366,0 -15,6.71484 -15,15c0,2.32031 0.52734,4.52053 1.46925,6.48047c0.05269,0.11137 13.53075,26.51953 13.53075,26.51953l13.36819,-26.19141c1.04297,-2.04197 1.63181,-4.35647 1.63181,-6.80859c0,-8.28516 -6.71484,-15 -15,-15z';
// const markerData: string = 'm256,0c-88.359,0 -160,71.625 -160,160c0,24.75 5.625,48.219 15.672,69.125c0.562,1.188 144.328,282.875 144.328,282.875l142.594,-279.375c11.125,-21.781 17.406,-46.469 17.406,-72.625c0,-88.375 -71.625,-160 -160,-160z';

export function createSvgFaElement (canvas: any, id: string, scale: number = 1, offsetX: number = -16.5, offsetY: number = -48) {

  let _element = canvas.group();
  _element.use(sampleFaIcon(id)).width(33 * scale).height(50 * scale).move(offsetX, offsetY);

  return _element;
}

// by default a point marker is 30 x 45px, and the border color is 10% darker than the fill color
export function createSvgPointMarker (canvas: any, color: string, scale: number = 1) {

  let _marker = canvas.group();
  _marker.addClass('fa-marker');

  _marker.path(markerData).fill(color).width(33 * scale).height(50 * scale).stroke({color: shadeColor(color, -10), width: 2 * scale}).move(-(16.5 * scale), -(48 * scale));

  return _marker;
}

// by default a round marker is 30 x 30px, and the border color is 10% darker than the fill color
export function createSvgCircleMarker (canvas: any, color: string, scale: number = 1) {

  let _marker = canvas.group();
  _marker.addClass('fa-marker');

  _marker.circle(33 * scale, 33 * scale).fill(color).stroke({color: shadeColor(color, -10), width: 2 * scale}).move(-(16.5 * scale), -(16.5 * scale));

  return _marker;
}

// check if the svg data exists, and return the full id string to use
export function sampleFaIcon(iconId:string) {

  // test if Font Awesome SVG data exists
  let svgIcon = document.getElementById('sample-' + iconId);

  if (svgIcon === null) {
    iconId = 'unknown';
    console.log('attempting to use unknown Font Awesome icon', iconId);
  }

  return 'sample-' + iconId;
}




// LEAFLET MARKERS

// create leaflet poi marker (using font-awesome 5 webfont)
export function createFaLeafletMarker(icon: string, iconPrefix: string, color:string) {

  const _marker = L.VectorMarkers.icon({
    icon: icon,
    markerColor: color,
    prefix: iconPrefix,
    markerBorderColor: shadeColor(color, -10)
  });

  return _marker;
}

export function createUserMarker(icon: string, iconPrefix: string, color:string) {

  let ele = document.createElement("div");
  let draw = SVG(ele).size(1, 1).style('overflow', 'visible');
  let marker = createSvgCircleMarker(draw, '#00FF00', 0.85);

  let _marker = L.divIcon({className: 'user', html: ele.innerHTML});
  return _marker;
}

// L.CustomMarker = function (options) {
//   return new customMarker(options);
// };
//
// const customMarker = L.Icon.extend({
//
//   options: {
//     shadowUrl: 'leaf-shadow.png'
//   },
//
//   initialize: function(options) {
//     return options = L.Util.setOptions(this, options);
//   },
//
//   createIcon: function(oldIcon) {
//     let ele = document.createElement("div");
//     let draw = SVG(ele).size(300, 300);
//     var rect = draw.rect(100, 100).attr({ fill: '#f06' });
//   },
//
//   _createInner: function() {
//     return;
//   },
//   _setIconStyles: function(img, name) {
//   },
//   createShadow: function() {
//     var div;
//     div = document.createElement("div");
//     this._setIconStyles(div, "shadow");
//     return div;
//   }
// });





// modified version of https://github.com/hiasinho/Leaflet.vector-markers
(function() {
  (function(window, document, undefined_) {

    "use strict";
    L.VectorMarkers = {};
    L.VectorMarkers.version = '1.0.0x';
    L.VectorMarkers.MAP_PIN = markerData;
    L.VectorMarkers.Icon = L.Icon.extend({
      options: {
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [2, -40],
        shadowAnchor: [7, 45],
        shadowSize: [54, 51],
        className: "vector-marker",
        prefix: "fa",
        spinClass: "fa-spin",
        extraClasses: "",
        icon: "home",
        markerColor: "blue",
        markerBorderColor: "black",
        markerStrokeWidth: 2,
        iconColor: "white"
      },
      initialize: function(options) {
        return options = L.Util.setOptions(this, options);
      },
      createIcon: function(oldIcon) {
        var div, icon, options, pin_path;
        div = (oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"));
        options = this.options;
        if (options.icon) {
          icon = this._createInner();
        }
        pin_path = L.VectorMarkers.MAP_PIN;
        div.innerHTML = '<svg viewBox="0 0 33 50" width="33" height="50" stroke="' + options.markerBorderColor + '">' + '<path d="' + pin_path + '" fill="' + options.markerColor + '" stroke-width="' + options.markerStrokeWidth + '"></path>' + icon + '</svg>';
        this._setIconStyles(div, "icon");
        this._setIconStyles(div, "icon-" + options.markerColor);
        return div;
      },
      _createInner: function() {
        var iconClass, iconColorClass, iconColorStyle, iconSpinClass, options;
        iconClass = void 0;
        iconSpinClass = "";
        iconColorClass = "";
        iconColorStyle = "";
        options = this.options;
        if (options.icon.slice(0, options.prefix.length + 1) === options.prefix + "-") {
          iconClass = options.icon;
        } else {
          iconClass = options.prefix + "-" + options.icon;
        }
        if (options.spin && typeof options.spinClass === "string") {
          iconSpinClass = options.spinClass;
        }
        if (options.iconColor) {
          if (options.iconColor === "white" || options.iconColor === "black") {
            iconColorClass = "icon-" + options.iconColor;
          } else {
            iconColorStyle = "style='color: " + options.iconColor + "' ";
          }
        }
        return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
      },
      _setIconStyles: function(img, name) {
        var anchor, options, size;
        options = this.options;
        size = L.point(options[(name === "shadow" ? "shadowSize" : "iconSize")]);
        anchor = void 0;
        if (name === "shadow") {
          anchor = L.point(options.shadowAnchor || options.iconAnchor);
        } else {
          anchor = L.point(options.iconAnchor);
        }
        if (!anchor && size) {
          anchor = size.divideBy(2, true);
        }
        img.className = "vector-marker-" + name + " " + options.className;
        if (anchor) {
          img.style.marginLeft = (-anchor.x) + "px";
          img.style.marginTop = (-anchor.y) + "px";
        }
        if (size) {
          img.style.width = size.x + "px";
          return img.style.height = size.y + "px";
        }
      },
      createShadow: function() {
        var div;
        div = document.createElement("div");
        this._setIconStyles(div, "shadow");
        return div;
      }
    });
    return L.VectorMarkers.icon = function(options) {
      return new L.VectorMarkers.Icon(options);
    };
  })(this, document);

}).call(this);
