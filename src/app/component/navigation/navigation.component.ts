import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DownloadService} from '../../service/download.service';
import {Subscription} from 'rxjs';
import {VersionResolverService} from '../../service/version-resolver.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit, OnChanges {

  @Input() appInitialized: boolean;
  @Output() navEvent: EventEmitter<string> = new EventEmitter<string>();

  public visibleClass:                string = 'hide';
  public oppositeClass:               string = 'show';
  public isDownloading:               boolean = false;
  public updateAvailable:             boolean = false;
  public isAdmin:                     boolean;

  private _backIndex:                 object;

  private _downloadSubScription:      Subscription;
  private _updateSubscription:        Subscription;

  constructor(

    private _location:      Location,
    private _versionResolverService: VersionResolverService,
    private _localStorage: LocalStorageService,
    private _route:         ActivatedRoute,
    private _router:        Router,
    private _downloadService:     DownloadService,
  ) {
    _router.events.forEach((event) => {

      if (event instanceof NavigationEnd && event['url']) {

        this._backIndex = this._route.snapshot.queryParams['back'];

        if (event['url'].includes('detail')) {
          this.visibleClass = 'show';
          this.oppositeClass = 'hide';
        } else if (event['url'].includes('admin')) {
          this.visibleClass = this.oppositeClass = 'show';
        } else {
          this.visibleClass = 'hide';
          this.oppositeClass = 'show';
        }
      }
    });
  }



  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this._downloadSubScription = this._downloadService.isDownloadingObservable.subscribe(isDownloading => {
       this.isDownloading = isDownloading;
    });

    this._updateSubscription = this._versionResolverService.updateAvailableObservable.subscribe( updateAvailable => {
      this.updateAvailable = updateAvailable;
    });

    this.isAdmin = this._localStorage.retrieve('isAdmin');
    this._localStorage.observe('isAdmin').subscribe( value => {
      this.isAdmin = value;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {

    // wait for loader to be ready, as the app requires trail/snow version data to run the version check
    // since navigator isn't part of the router, we're waiting for the loader to finish (which triggers initialized on the app component)
    if (changes.appInitialized.firstChange === false && this.appInitialized === true) {
      this._versionResolverService.versionCheck();
    }
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

  public onAdminClick(): void {
    this._router.navigate(['admin'], {queryParams: {id: this._backIndex}});
    this.navEvent.emit('admin');
  }

  public notifyUser(message: string): void {
    this.updateAvailable = true;
  }
}
