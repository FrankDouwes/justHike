import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// class that injects stylesheets based on (user) screen settings
export class ScreenModeService implements OnDestroy {

  private _screenModeSubscription: Subscription;

  private _currentScreenMode: Array<string>;
  public screenModeChangeObserver: Observable<any>;     // when screen mode changes
  public screenModeSubject: BehaviorSubject<string>;

  constructor(private _localStorage: LocalStorageService) {

    const _self = this;

    // listen for greyscale mode
    _self._screenModeSubscription = _self._localStorage.observe('screenMode').subscribe(function(result) {

      _self.screenModeSubject.next(result);

      _self._toggleStyleSheet(result);

    });

    const _initial = this._localStorage.retrieve('screenMode');

    _self.screenModeSubject = new BehaviorSubject(_initial);
    _self._toggleStyleSheet(_initial);
    this.screenModeChangeObserver = this.screenModeSubject.asObservable().pipe(share());
  }

  private _toggleStyleSheet(name: string): void {

    const _self = this;

    const _names: Array<string> =  (name !== 'nightHike') ? [name] : ['highContrast', name];

    _names.forEach(function(n) {
      _self._injectStylesheet(n);
    });

    if (this._currentScreenMode) {
      this._currentScreenMode.forEach(function (n) {
        _self._removeInjectedStylesheet(n);
      });
    }

    this._currentScreenMode = _names;
  }

  // inject a stylesheet into the head of the
  private _injectStylesheet(name: string): void {

    if (name === 'default' || !name) {
      return;
    }

    const _head = document.head;
    const _link = document.createElement('link');

    _link.type = 'text/css';
    _link.rel = 'stylesheet';
    _link.href = 'assets/css/' + name + '.css';
    _link.setAttribute('data-name', name);

    _head.appendChild(_link);
  }

  private _removeInjectedStylesheet(name: string): void {

    if (name === 'default') {
      return;
    }

    const _link = document.querySelectorAll('[data-name="' + name + '"]')[0];
    if (_link) {
      _link.parentNode.removeChild(_link);
    }
  }

  ngOnDestroy(): void {

    this._screenModeSubscription.unsubscribe();
    this._screenModeSubscription = null;
  }
}
