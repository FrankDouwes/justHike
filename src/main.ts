import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
import * as TouchEmulator from 'hammer-touchemulator/touch-emulator';

if (environment.simulateTouch) {
  TouchEmulator();
}

if (environment.production) {
  enableProdMode();
}

// window.addEventListener('native.keyboardshow', function (e) {
//   const _body = document.getElementsByTagName('body')[0];
//   _body.style.bottom = e['keyboardHeight'] + 'px';
//   // _body.appendChild(document.createTextNode(e['keyboardHeight']));
//   window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
// });

// window.addEventListener('native.keyboardhide', function () {
//   const _body = document.getElementsByTagName('body')[0];
//   _body.style.bottom = null;
// });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
