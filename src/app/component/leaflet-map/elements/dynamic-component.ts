import * as L from 'leaflet';
import {NgElement, WithProperties} from '@angular/elements';
import {PopupComponent} from './popup/popup.component';
import {clearTimeOut, setTimeOut} from '../../../_util/timer';

// load an angular component into a leaflet component
export function createPopupComponent(location: L.LatLng, properties?: object): void {

  const _self = this;
  const _popupContent = _createDynamicComponent('popup', properties);

  const _popup = L.popup({closeButton: false, autoClose: true, closeOnClick: true})
    .setLatLng(location)
    .setContent(_popupContent)
    .addTo(this._map);

  clearTimeOut(this._popupTimer);
  this._popupTimer = setTimeOut(4000, function() {
    _self._map.closePopup(_popup);
    _self._clearOverlayElements();
  });

  _popupContent.timer = this._popupTimer;
}

// load an angular component into a leaflet component
export function createTooltipComponent(location: L.LatLng, properties?: object): void {

  const _self = this;
  const _tooltipContent = _createDynamicComponent('tooltip', properties);

  const _tooltip = L.tooltip({autoClose: true, closeOnClick: true})
    .setLatLng(location)
    .setContent(_tooltipContent)
    .addTo(this._map);

  // provide the content component with the correct alignment value
  if (_tooltip.getElement().classList.contains('leaflet-tooltip-left')) {
    _tooltipContent.direction = 'left';
  } else {
    _tooltipContent.direction = 'right';
  }

  // disable hide on click
  const _tElement = _tooltip.getElement();
  _tElement.addEventListener('click', function(event: Event) {
    event.stopPropagation();
  });

  clearTimeOut(this._tooltipTimer);
  this._tooltipTimer = setTimeOut(2000, function() {
    _self._map.closeTooltip(_tooltip);
    _self._clearOverlayElements();
  });

  _tooltipContent.timer = this._tooltipTimer;
}

function _createDynamicComponent(type: string, properties?: object): any {

  let _component;
  if (type === 'popup' || type === 'tooltip') {
    const _popup: NgElement & WithProperties<PopupComponent> = document.createElement('leaflet-element-popup') as any;
    _component = _popup;
  }

  _component.addEventListener('closed', () => document.body.removeChild(_component));

  // set properties
  if (properties) {
    for (const key in properties) {
      _component[key] = properties[key];
    }
  }

  // add to dom, so I can reference it later
  document.body.appendChild(_component);
  return _component;
}
