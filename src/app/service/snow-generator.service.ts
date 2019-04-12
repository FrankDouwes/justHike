import { Injectable } from '@angular/core';
import { Snow, Snowpoint } from '../type/snow';

@Injectable({
  providedIn: 'root'
})

export class SnowGeneratorService {

  private _snowData: Snow;

  constructor() { }

  public setSnowData(data: Snow): void {
    this._snowData = data;
  }

  public getSnowForMile(mileId: number | Array<number>): Array<Array<Snowpoint>> {

    if (! this._snowData) {
      return;
    }

    if (typeof mileId === 'number') {
      mileId = [mileId];
    }

    const _partialData: Array<Array<Snowpoint>> = [];

    const _self = this;

    mileId.forEach(function(id) {
      _partialData.push(_self._snowData.snowMiles[id]);
    });

    return (_partialData.length > 0) ? _partialData : undefined;
  }

  // get the snow data version for the current trail
  public getSnowVersion(): string {
    return this._snowData.version;
  }
}
