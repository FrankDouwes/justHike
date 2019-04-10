import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  constructor(
    private _localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  public toggleAdmin(): void {
    const _isAdmin = this._localStorage.retrieve('isAdmin');
    if (!_isAdmin) {
      this._localStorage.store('isAdmin', true);
      alert('God mode enabled!');
    } else {
      this._localStorage.clear('isAdmin');
      alert('Just a regular mortal.');
    }
  }

}
