import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // Loader spinner graphic while the trail-resolver resolves
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  display(value: boolean) {
    this.status.next(value);
  }
}
