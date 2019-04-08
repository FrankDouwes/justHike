import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Waypoint} from '../type/waypoint';
import {Rating} from '../type/rating';
import {Observable, Subscription} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {getTrailMetaDataById} from '../_util/trail';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})


// Ratings for ratable poi types
// ratings are stored on local storage and online
// TODO: check the actual filesize of the data stored locally, if large, possibly save to filesystem instead / or use mongodb?
// TODO: very much WIP!

export class RateService implements OnDestroy {

  private _lastUpdated: number = new Date().getTime();      // TODO: needs to be stored/fetched
  private _hasInternet = true;

  private _localRatings: Array<Rating>;      // all ratings for the current trail

  private _activeTrailSubscription: Subscription;
  private _activeTrailAbbr: string;

  constructor(
    // private _fireStore: AngularFirestore,
    private _localStorage: LocalStorageService) {

    // const items = _fireStore.collection('ratings').valueChanges().subscribe(response => {
    //   console.log(response);
    // });

    this._activeTrailSubscription = this._localStorage.observe('activeTrailId').subscribe(trailId => {
      this._activeTrailAbbr = getTrailMetaDataById(trailId).abbr;
      this.syncRatingsForTrail(this._activeTrailAbbr, this._lastUpdated);
    });

    // initial values
    const _id = this._localStorage.retrieve('activeTrailId');
    this._activeTrailAbbr = getTrailMetaDataById(_id).abbr;
    this.syncRatingsForTrail(this._activeTrailAbbr, this._lastUpdated);
  }

  // LIFECYCLE

  ngOnDestroy(): void {
    this._activeTrailSubscription.unsubscribe();
    this._activeTrailSubscription = null;
  }

  // gets/sets all ratings, since it's a (mostly) offline app, deals with both online/offline files and syncs everything
  public syncRatingsForTrail(trailAbbr: string, since: number): void {

    // get locally stored data
    this._localRatings = this._localStorage.retrieve(this._activeTrailAbbr + '_ratings') || [];

    // if there is no data, it's the first online run (or previously empty db), so we'll fetch all records
    if (this._localRatings.length === -1) {
      since = 0;
    }

    if (this._hasInternet) {

      if (since !== 0) {

        const _localUpdates = this._checkForUnsynced();

        if (_localUpdates) {
          // TODO: http update _localUpdates;
        }
      }

      const _result = this._getRatingsOnline(trailAbbr, since);
      if (_result && _result !== 'error') {
        this._saveRatingsLocally(_result);
      }
    }
  }


  // update a single rating, ratings are location and type based
  public updateRating(type:string, waypoint: Waypoint, data:object): boolean {

    const _rating = data as Rating;

    _rating.id = type + '-' + waypoint.latitude.toFixed(4) + '_' + waypoint.longitude.toFixed(4);

    if (this._hasInternet) {

      // http
      // should probably use a downloader for this...

      // result = updated rating
      const _result: any = '';

      if (_result !== 'error') {
        this._saveRatingsLocally(_result);
      }

    } else {
      this._saveRatingsLocally(_rating, true);
    }

    return true;
  }


  // gets a rating from local storage (and id = lat_lng)
  // there's no need to make a separate online call here
  // as the app mostly runs in offline mode and syncRatingsForTrail() is called once the app goes online
  // this way the ratings stay reasonably up to date.
  public getRating(type: string, waypoint: Waypoint): Rating {

    console.log(waypoint)

    const _id = type + '-' + Number(waypoint.latitude).toFixed(4) + '_' + Number(waypoint.longitude).toFixed(4);

    console.log(this._localRatings);

    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {

      if (this._localRatings[i].id === _id) {
        return this._localRatings[i];
      }
    }

    return;
  }

  // get all updated/new ratings online for trail
  private _getRatingsOnline(trailAbbr: string, since: number): any {
    return;
  }

  // markForUpdate means the data still has to be pushed online (but can't be as there is currently no internet)
  private _saveRatingsLocally(ratings: Rating | Array<Rating>, markForUpdate: boolean = false): Observable<string> {

    if (ratings instanceof Rating) {
      ratings = [ratings as Rating];
    }

    const _length = (ratings as Array<Rating>).length;
    for (let i = 0; i < _length ; i++) {

      const _rating = ratings[i];

      if (markForUpdate) {
        _rating.unsynced = true;
      }

      this._setRatingLocally(_rating);
      console.log(i);
      // progress
    }

    // write everything to local storage
    this._writeToLocalStorage();

    // done
    return new Observable();
  }

  // check if there are local updates that need to be synced online
  private _checkForUnsynced(): Array<Rating> {

    if (!this._localRatings || this._localRatings.length === -1) {
      return;
    }

    const _ratings = [];
    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].unsynced) {
        _ratings.push(this._localRatings[i]);
      }
    }

    return (_ratings.length > 0) ? _ratings : undefined;
  }

  // sets or updates local rating
  private _setRatingLocally(rating: Rating): void {

    let _ratingIndex = -1;

    // check if rating already exists
    const _length = this._localRatings.length;
    for (let i = 0; i < _length; i++) {
      if (this._localRatings[i].id === rating.id) {
        _ratingIndex = i;
        break;
      }
    }

    // change rating in local ratings
    if (_ratingIndex !== -1) {
      this._localRatings[_ratingIndex] = rating;
    } else {
      this._localRatings.push(rating);
    }
  }

  private _setRatingsOnline(ratings: Array<Rating>): void {

    // TODO: save online
  }

  private _writeToLocalStorage(): void {
    this._localStorage.store(this._activeTrailAbbr + '_ratings', this._localRatings);
  }
}
