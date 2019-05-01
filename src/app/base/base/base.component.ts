import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

class EventListenerObj {

  public target:      any;
  public type:        string;
  public listener:    EventListenerOrEventListenerObject;
  public options:     boolean | object;

  constructor(target: any, type: string, listener: EventListenerOrEventListenerObject, options: boolean | object = false) {

    this.target = target;
    this.type = type;
    this.listener = listener;
    this.options = options;
  }
}

class SubscriptionObj {

  public name:          string;
  public subscription:  Subscription;

  constructor(name: string, subscription: Subscription) {

    this.name = name;
    this.subscription = subscription;
  }
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.sass']
})

/* base component:
- manages subscriptions
- manages event listeners */
export class BaseComponent implements OnDestroy {

  private _eventListeners: object;
  private _subscriptions: object;

  constructor() {
    this._eventListeners = {};
    this._subscriptions = {};
  }

  ngOnDestroy(): void {
    this._removeAllEventListeners();
    this._removeAllSubscriptions();
  }

  // SUBSCRIPTIONS MANAGER

  public addSubscription(name: string, subscription: Subscription): void {

    if (this._subscriptions.hasOwnProperty(name)) {
      throw new Error('Subscription with name ' + name + ' already exists!');
    }

    this._subscriptions[name] = new SubscriptionObj(name, subscription);
  }

  // remove subscription by name
  public removeSubscription(name: string): void {

    if (this._subscriptions.hasOwnProperty(name)) {

      let _subscription: SubscriptionObj = this._subscriptions[name];

      _subscription.subscription.unsubscribe();
      _subscription.subscription = null;

      delete this._subscriptions[name];
      _subscription = null;
    }
  }

  private _removeAllSubscriptions(): void {

    for (const key in this._subscriptions) {

      let _subscriptionObj: SubscriptionObj = this._subscriptions[key];
      this.removeSubscription(_subscriptionObj.name);
      _subscriptionObj = null;
    }

    this._subscriptions = null;
  }



  // EVENTS MANAGER

  // add an event listener (allows for multiple types per target)
  public addEventListener(target: any, type: string | Array<string>, listener: EventListenerOrEventListenerObject, options: boolean | object = false): void {

    // check if target is DOM element
    if (!this._isDOMElement(target)) {
      throw new Error('Can not add event, target is not a DOM element');
    }

    if (typeof type === 'string') {
      type = [type];
    }

    for (let i = 0; i < type.length; i++) {

      const _uniqueName = target.tagName + '_' + type[i];

      // check if eventlistener already exists
      if (this._eventListeners.hasOwnProperty(_uniqueName)) {
        throw new Error('Event listener for ' + type[i] + ' already exists on ' + target.tagName);
      }

      this._eventListeners[_uniqueName] = new EventListenerObj(target, type[i], listener, options);
      target.addEventListener(type[i], listener, options);
    }
  }

  // remove event listers (allows multiple types per target)
  public removeEventListener(target: any, type: string | Array<string>): void {

    const _uniqueName = target.tagName + '_' + type;

    if (this._eventListeners.hasOwnProperty(_uniqueName)) {

      let _eventListenerObj: EventListenerObj = this._eventListeners[_uniqueName];
      _eventListenerObj.target.removeEventListener(_eventListenerObj.type, _eventListenerObj.listener, _eventListenerObj.options);

      delete this._eventListeners[_uniqueName];
      _eventListenerObj = null;
    }
  }

  private _removeAllEventListeners(): void {

    for (const key in this._eventListeners) {

      let _eventListenerObj: EventListenerObj = this._eventListeners[key];
      this.removeEventListener(_eventListenerObj.target, _eventListenerObj.type);
      _eventListenerObj = null;
    }

    this._eventListeners = null;
  }

  private _isDOMElement(element: any): boolean {
    if (element === window) {
      return true;
    } else {
      return element instanceof Element || element instanceof HTMLDocument;
    }
  }
}
