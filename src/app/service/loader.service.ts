import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// to communicate with the overlay loader component, which lives outside of the router
export class LoaderService {

  constructor() {}

  private _overlaySubject:  BehaviorSubject<object>     = new BehaviorSubject<object>({});
  public observe:    Observable<object>  = this._overlaySubject.asObservable();

  public showOverlay(): void {

    this._overlaySubject.next({action: 'show', type: 'self'});
  }

  public hideOverlay(): void {

    this._overlaySubject.next({action: 'hide', type: 'self'});
  }

  public showSpinner(): void {

    this._overlaySubject.next({action: 'show', type: 'spinner'});
  }

  public showMessage(message: string): void {

    this._overlaySubject.next({action: 'show', type: 'message', data: message});
  }

  public showButton(label: string, action: Function): void {

    this._overlaySubject.next({action: 'show', type: 'button', data:{label: label, action: action}});
  }

  // spinner, button, message
  public hideContent(type?: string): void {

    if (!type) {
      this.hideOverlay();
    } else {
      this._overlaySubject.next({action: 'hide', type: type});
    }
  }
}
