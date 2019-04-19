// Adjustments to geoLibs Distance class:
// - key value for Distance is a string, converting that to a number
// - added belongsTo, in case points belong to different sources
export class Distance {

  public latitude: number;
  public longitude: number;
  public distance: number;
  public belongsTo ?: number;

  private _key?: number;

  get key(): any {
    return this._key;
  }

  set key(key: any) {
    if (typeof key === 'string') {
      this._key = Number(key);
    } else {
      this._key = key;
    }
  }
}
