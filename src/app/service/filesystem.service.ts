import {Injectable} from '@angular/core';
import {convertToIonicUrl} from '../_util/file';
import {cordovaEnabled, getCordova, getZip, hasZip} from '../_util/cordova';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// TODO: needs better error handling? a retry dialog/function?
export class FilesystemService  {

  public rootPath: string;
  public root;
  public rootDir;
  public isStorageAvailable: boolean;

  constructor() {}


  // set root
  public async initializeStorage() {

    return await this._setupStorage();
  }


  private _setupStorage() {

    const _self = this;
    const _window: any = window;

    return new Promise(function (resolve, reject) {

      if (_self.root) {
        resolve(true);
        return;
      }

      if (cordovaEnabled()) {

        // cordova file plugin storage

        _window.resolveLocalFileSystemURL(getCordova().file.dataDirectory, function (filesystem) {

          _self.root = filesystem;
          _self.rootDir = filesystem;   // no root!
          _self.rootPath = convertToIonicUrl(filesystem.toURL());
          resolve(_self.isStorageAvailable = true);

        }, function (error) {
          reject(false);
          alert('Filesystem error: ' + error);
        });

      } else {

        // chrome (browser storage)
        const _requestFileSystem = window['requestFileSystem'] || window['webkitRequestFileSystem'];

        if (_requestFileSystem) {

          // first prop: 0 = temp, 1 = persistent (errors)
          _requestFileSystem(0, 0, function (fileSystem) {

            console.log('filesystem set', fileSystem);

            _self.root = fileSystem;
            _self.rootDir = fileSystem.root;
            _self.rootPath = fileSystem.root.toURL();

            resolve(_self.isStorageAvailable = true);

          }, function (error) {
            resolve(false);
            alert('Filesystem error: ' + error);
          });
        } else {
          resolve(false);
          alert('No filesystem available, use chrome or do a cordova build (iOS/Android)');
        }
      }
    });
  }



  // DIRECTORY

  // loops through directories within pathName and creates missing directories, callback gets DirectoryEntry of final subDir
  public setupDirectory(pathName: string, within, callback: Function, createMissing:boolean = true): void {

    const _self = this;
    const _urlSegments: Array<string> = pathName.split('/');

    const _loop = function (directorySegments: Array<string>, wi, cb: Function) {

      _self._getDirectory(directorySegments[0], wi, createMissing, function(directory) {

        directorySegments.shift();

        if (directorySegments.length > 0) {
          _loop(directorySegments, directory, cb);
        } else {
          cb(directory);
        }
      });
    };

    _loop(_urlSegments, within, callback);
  }

  // get an exisiting directory within another directory (or root), optional to create the dir if it doesn't exist
  public _getDirectory(dirName: string, within, createMissing: boolean, callback: Function): void {

    const _self = this;
    within = (!within) ? this.rootDir : within;

    if (within === 'error') {
      callback(within);
      return;
    }

    within.getDirectory(dirName, {create: false, exclusive: true}, function(directory) {

      callback(directory);

    }, function(error) {

      if (error && createMissing) {
        _self._createDirectory(dirName, within, callback);
      } else {

        console.log('directory ' + dirName + ' does not exist.');
        callback('error');
      }

    });
  }

  // create a directory in a directory, if it already exists, it returns the existing directory
  private _createDirectory(dirName: string, within, callback: Function): void {

    const _self = this;
    within = (!within) ? this.rootDir : within;

    within.getDirectory(dirName, {create: true, exclusive: true}, function(directory) {

      callback(directory);

    }, function(error) {
      if (error.code === 12) {
        _self._getDirectory(dirName, within, false, callback);
      }
    });
  }

  // save a file to file system, parse directories
  public saveFile(data: any, within: any, pathName: string, callback: Function): void {

    const _self = this;
    const pathSegments = pathName.split('/');
    const filename = pathSegments[pathSegments.length - 1];
    pathSegments.splice(-1, 1);
    const _directories = pathSegments.join('/');

    this.setupDirectory(_directories, within, function(directory) {
      _self._createFile(directory, filename, function(fileEntry) {
        _self._writeFile(fileEntry, data, callback);
      });
    });
  }

  // create an empty fileEntry
  private _createFile(dirEntry, fileName: string, callback: Function, override: boolean = true) {

    const _self = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: !override}, function(fileEntry) {

      callback(fileEntry);

    }, function(error) {

      console.log('error creating file ' + error);

      _self.readFile(dirEntry, fileName, callback);

    });
  }

  // // write to a fileEntry
  private _writeFile(file, data: Blob, callback: Function) {

    file.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function () {
        callback('success');
      };

      fileWriter.onprogress = function (p) {
        console.log('progress', p.toString());
      };

      fileWriter.onerror = function (e) {
        callback('error');
        console.log('Failed file write: ' + e);
      };

      fileWriter.write(data);
    });
  }

  // TODO: abort write
  public abort(): void {

    console.warn('abort function (filesystem) is blank');
    // writer.abort();
  }

  // returns the file entry (directry can be string or dirEntry object)
  public readFile(directory, fileName: string, callback: Function): any {

    const _self = this;

    if (typeof directory === 'string') {
      this.setupDirectory(directory, null, function (result) {

        if (result !== 'error') {
          _self._getFile(result, fileName, callback);
        } else {
          callback(result);
        }
      }, false);
    }
  }

  // will return null if file cant be found
  private _getFile(dirEntry, fileName: string, callback: Function): void {

    const _self = this;

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: false}, function(fileEntry) {

      _self._readFileData(fileEntry, callback);

    }, function(error) {

      console.log('file ' + fileName + ' does not exist.');
      callback('error');
    });
  }

  // read the data from a fileEntry
  private _readFileData(fileEntry, callback: Function): void {

    fileEntry.file(function (file) {

      var reader = new FileReader();

      reader.onloadend = function() {
        console.log("Successful file read: " + this.result);
      };

      reader.readAsText(file);

    }, function(error) {
      callback('error');
      alert('error reading file' + error);
    });
  }

  public unzip(filePath: string, parts: boolean = false): Observable<object> {

    const _self = this;

    const _unzipState: BehaviorSubject<object> = new BehaviorSubject<object>({state:'initialize'});

    if (hasZip()) {

      let _seperator = (parts) ? '_' : '.';     // multipart files are _0, _1, _2, else just remove the extension

      const _directoryArr: Array<string> = filePath.split(_seperator);
      _directoryArr.pop();
      const _directoryStr = _directoryArr.join(_seperator) + '/';

      const url = this._joinPaths([getCordova().file.dataDirectory, filePath]);
      const destination = this._joinPaths([getCordova().file.dataDirectory, _directoryStr]);

      console.log(url, destination);

      getZip().unzip(url, destination, function(x) {
        _unzipState.next({state: 'progress', percentage: 100});

        _self.deleteFile(filePath);

        _unzipState.next({state: 'complete'});
      }, function(progressEvent) {
        _unzipState.next({state: 'progress', percentage: (progressEvent.loaded / progressEvent.total) * 100});
      });
    } else {

      alert('Chrome unzipping currently not implemented.')

      _unzipState.next({state: 'error'});
    }

    return _unzipState;
  }

  private _joinPaths(pathList: Array<string>) {
    let path = '';
    if (pathList.length > 0) {
      path += pathList[0].replace(/\/+$/, '') + '/';
      for (let i = 1; i < pathList.length; i++) {
        path += pathList[i].replace(/^\/+/, '').replace(/\/+$/, '') + '/';
      }
      path = path.slice(0, -1);
    }
    return path;
  }

  // // returns the data from file entry (used for stored json)
  // public readFileData(): any {
  //
  // }

  // delete a file or directory, accepts path
  public deleteFile(filePath: string): void {

    const _pathSegments = filePath.split('/');
    const _filename: string = _pathSegments.pop();
    const _directory = _pathSegments.join('/') + '/';

    this.setupDirectory(_directory, null, function(dirEntry) {
      dirEntry.getFile(_filename, {create: false}, function(fileEntry) {
        fileEntry.remove(function (file) {
          // File deleted successfully
          console.log('file deleted');
        }, function (err) {
          console.log(err); // Error while removing File
        });
      });
    }, false);
  }

  // TODO: edited, check functionality!!! delete directory and everything in it
  public deleteDirectory(directoryPath: string, callback: Function): void {

    this.setupDirectory(directoryPath, null, function(dirEntry) {
      if (dirEntry !== 'error') {
        dirEntry.removeRecursively(function (dir) {
          callback(dir);
        }, function (err) {
          console.log(err);
        });
      } else {
        callback(dirEntry);
      }
    }, false);
  }
}
