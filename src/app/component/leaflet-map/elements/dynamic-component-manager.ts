import * as L from 'leaflet';
import {NgElement, WithProperties} from '@angular/elements';
import {PopupComponent} from './popup/popup.component';
import {clearTimeOut, setTimeOut, TimerObj} from '../../../_util/timer';

export class DynamicComponentManager {

  private _map: L.map;
  private _popupTimer: TimerObj;
  private _tooltipTimer: TimerObj;

  constructor(map: L.map) {
    this._map = map;
  }

  // load an angular component into a leaflet component map, _popupTimer
  public createPopupComponent(location: L.LatLng, properties?: object, onTimeOut?: Function): TimerObj {

    const _self = this;
    const _popupContent = this._createDynamicComponent('popup', properties);

    const _popup = L.popup({closeButton: false, autoClose: true, closeOnClick: true})
      .setLatLng(location)
      .setContent(_popupContent)
      .addTo(this._map);

    clearTimeOut(this._popupTimer);
    this._popupTimer = setTimeOut(4000, function() {
      _self._map.closePopup(_popup);
      onTimeOut();
    });

    _popupContent.timer = this._popupTimer;

    return this._popupTimer;
  }

  // load an angular component into a leaflet component
  public createTooltipComponent(location: L.LatLng, properties?: object, onTimeOut?: Function): TimerObj {

    const _self = this;
    const _tooltipContent = this._createDynamicComponent('tooltip', properties);

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
      onTimeOut();
    });

    _tooltipContent.timer = this._tooltipTimer;

    return this._tooltipTimer;
  }

  private _createDynamicComponent(type: string, properties?: object): any {

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
}
