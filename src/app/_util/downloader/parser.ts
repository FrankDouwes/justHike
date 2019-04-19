import {FilesystemService} from '../../service/filesystem.service';
import {DownloaderStatus, DownloaderStatusManager} from './status-manager';
import {getExtensionFromString} from '../file';

export class DownloadParser {

  private _onComplete: Function;

  constructor(
    private _filesystemService: FilesystemService,
    private _status: DownloaderStatusManager)
  {}


  // FILE SAVING

  public saveFile(data: any, pathName: string, hasParts: boolean, fileType: string, onComplete: Function): void {

    const _self = this;

    this._onComplete = onComplete;

    if (!this._filesystemService.root) {

      alert('No file system available, unable to save files.');

      onComplete('error');
    }

    this._status.setStatus(new DownloaderStatus('filesystem', 'initialize', null), true);

    this._filesystemService.saveFile(data, null, pathName, function(result) {

      if (fileType !== 'blob') {

        onComplete('complete');

      } else {

        // continue unzipping
        return _self._unzipFile(pathName, hasParts);
      }
    });
  }




  // UNZIPPING (happens after saving)

  private _unzipFile(pathName: string, hasParts: boolean): void {

    const _self = this;

    const _observer = this._filesystemService.unzip(pathName, hasParts).subscribe(function(result: object) {

      if (result['state'] === 'complete' || result['message'] === 'error') {
        // success / error
        _self._onComplete(result['message']);
      } else if (result['state'] === 'progress') {
        // progress
        _self._status.setStatus(new DownloaderStatus('filesystem', 'progress', {percentage: (result['percentage'] * 0.33) + 66}), true);
      }

      _observer.unsubscribe();
    });
  }




  // CLEAR FILE

  public clearFile(paths: Array<string>, completedFiles: number, hasParts: boolean): void {

    const _self = this;

    if (paths && completedFiles > 0) {

      // multiple parts are all extracted in the same directory, therefor this will only have to run once
      const _extension = getExtensionFromString(paths[0]);

      // if we're dealing with a zip, we'll have to remove the unzipped directory
      if (_extension === 'zip') {

        const _separator = (hasParts) ? '_' : '.';
        const _directory = paths[0].split(_separator)[0] + '/';

        _self._filesystemService.deleteDirectory(_directory, function (result): string {

          // nothing here... dead end
          return;
        });
      }
    } else if (paths) {

      _self._filesystemService.deleteFile(paths[0]);
    }
  }
}
