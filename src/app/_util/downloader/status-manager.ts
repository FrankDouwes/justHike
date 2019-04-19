import {BehaviorSubject} from 'rxjs';

export class DownloaderStatus {
  type:     string;       // http, filesystem or downloader (which are generic complete/error messages).
  label:    string;
  data:     any;

  constructor(type: string, label: string, data: any) {
    this.type = type;
    this.label = label;
    this.data = data;
  }
}

export class DownloaderStatusManager {

  public isActiveSubject: BehaviorSubject<boolean>;

  private _meta: BehaviorSubject<DownloaderStatus>

  constructor(meta: BehaviorSubject<DownloaderStatus>) {
    this.isActiveSubject = new BehaviorSubject<boolean>(false);
    this._meta = meta;
  }

  public setStatus(downloaderStatus: DownloaderStatus, active?: boolean): void {

    if (this.isActiveSubject.getValue() !== active) {
      this.isActiveSubject.next(active);
    }

    if (downloaderStatus.label !== '') {
      this._meta.next(downloaderStatus);
    } else {
      this._meta.next(null);
    }
  }
}
