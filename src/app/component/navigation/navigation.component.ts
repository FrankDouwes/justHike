import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DownloadService} from '../../service/download.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @Output() navEvent: EventEmitter<string> = new EventEmitter<string>();

  public visibleClass:                string = 'hide';
  public oppositeClass:               string = 'show';
  public isDownloading:               boolean;

  private _backIndex:                 object;
  private _downloadSubScription:      Subscription;

  constructor(

    private _location:      Location,
    private _route:         ActivatedRoute,
    private _router:        Router,
    private _downloadService:     DownloadService

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

  ngOnInit(): void {
     this._downloadSubScription = this._downloadService.isDownloadingSubscription.subscribe(isDownloading => {
       this.isDownloading = isDownloading;
    });
  }



  // EVENT HANDLERS

  public onSettingsClick(): void {
    this.navEvent.emit('settings');
  }

  public onBackClick(): void {
    this.visibleClass = 'hide';
    this.oppositeClass = 'show';
    this._router.navigate(['elevation-profile/'], {queryParams: {id: this._backIndex}});
    this.navEvent.emit('elevation-profile');
  }
}
