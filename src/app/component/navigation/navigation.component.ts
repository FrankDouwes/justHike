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

  public visibleClass:      string = 'hide';
  public oppositeClass:     string = 'show';

  private _backIndex:       object;

  constructor(

    private _location:      Location,
    private _route:         ActivatedRoute,
    private _router:        Router

  ) {

    _router.events.forEach((event) => {

      if (event instanceof NavigationEnd && event['url']) {

        this._backIndex = this._route.snapshot.queryParams['back'];

        if (event['url'].includes('detail') || event['url'].includes('settings')) {
          this.visibleClass = 'show';
          this.oppositeClass = 'hide';
        } else {
          this.visibleClass = 'hide';
          this.oppositeClass = 'show';
        }
      }
    });
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {}



  // EVENT HANDLERS

  private onSettingsClick(): void {
    this.navEvent.emit('settings');
  }

  private onBackClick(): void {
    this.visibleClass = 'hide';
    this.oppositeClass = 'show';
    // this._location.back();
    this._router.navigate(['elevation-profile/'], {queryParams: {id: this._backIndex}});
    this.navEvent.emit('elevation-profile');
  }
}
