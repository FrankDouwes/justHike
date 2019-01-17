import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @Output() navEvent: EventEmitter<string> = new EventEmitter<string>();

  public visibleClass = 'hide';
  private _backIndex: object;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _router: Router) {

    _router.events.forEach((event) => {

      if (event instanceof NavigationEnd && event['url']) {

        this._backIndex = this._route.snapshot.queryParams['back'];

        if (event['url'].includes('detail') || event['url'].includes('settings')) {
          this.visibleClass = 'show';
        } else {
          this.visibleClass = 'hide';
        }
      }
    });
  }

  ngOnInit() {
  }

  onSettingsClick() {
    this.navEvent.emit('settings');
  }

  onBackClick() {
    this.visibleClass = 'hide';
    // this._location.back();
    this._router.navigate(['elevation-profile/'], {queryParams: {id: this._backIndex}});
    this.navEvent.emit('elevation-profile');
  }
}
