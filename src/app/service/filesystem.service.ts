import {Injectable, NgZone} from '@angular/core';
import {Plugins, FilesystemDirectory, FilesystemEncoding, ReaddirResult} from '@capacitor/core';
import {convertToIonicUrl} from '../_util/file';
import {FileEntry, FileError, File, DirectoryEntry} from '@ionic-native/file/ngx';
// const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class FilesystemService {

  public rootPath: string;
  public root;
  public rootDir;
  public isStorageAvailable: boolean;

  constructor(private _file: File) {}

  // set root
  public initializeStorage(): void {

    console.log('initializing filesystem');

    const _self = this;

    const _requestFileSystem = window['requestFileSystem'] || window['webkitRequestFileSystem'];
    _requestFileSystem(1, 0, function(fileSystem) {

      _self.root = fileSystem;
      _self.rootDir = fileSystem.root;
      _self.rootPath = convertToIonicUrl(fileSystem.root.toURL());
      _self.isStorageAvailable = true;

      }, function(error) {
      alert('no filesystem available');
    });
  }


  // DIRECTORY

  // loops through directories within pathName and creates missing directories, callback gets DirectoryEntry of final subDir
  public setupDirectory(pathName: string, within: DirectoryEntry, callback: Function): void {

    const _self = this;
    const _urlSegments: Array<string> = pathName.split('/');

    const _loop = function (directorySegments: Array<string>, wi: DirectoryEntry, cb: Function) {

      _self._getDirectory(directorySegments[0], wi, true, function(directory) {

        directorySegments.shift();

        if (directorySegments.length > 0) {
          _loop(directorySegments, directory, cb);
        } else {
          cb(directory);
        }
      });
    }

    _loop(_urlSegments, within, callback);
  }

  // delete directory and everything in it
  public deleteDirectory(): void {

  }


  // get an exisiting directory within another directory (or root), optional to create the dir if it doesn't exist
  public _getDirectory(dirName: string, within: DirectoryEntry, createMissing: boolean, callback: Function): void {

    const _self = this;

    within = (!within) ? this.rootDir : within;

    within.getDirectory(dirName, {create: false, exclusive: true}, function(directory) {

      callback(directory);

    }, function(error) {

      if (error.code === 1 && createMissing) {
        _self._createDirectory(dirName, within, callback);
      }

    });
  }

  // create a directory in a directory, if it already exists, it returns the existing directory
  private _createDirectory(dirName: string, within: DirectoryEntry, callback: Function): void {

    const _self = this;

    within = (!within) ? this.rootDir : within;

    within.getDirectory(dirName, {create: true, exclusive: true}, function(directory) {

      callback(directory);

    }, function(error: FileError) {

      if (error.code === 12) {
        _self._getDirectory(dirName, within, false, callback);
      }
    });
  }




  // FILE

  // save a file to file system, parse directories
  public saveFile(data: Blob, within: DirectoryEntry, pathName: string, callback: Function): void {

    const _self = this;

    const pathSegments = pathName.split('/');
    const filename = pathSegments[pathSegments.length - 1];

    pathSegments.splice(-1,1);

    const _directories = pathSegments.join('/');

    this.setupDirectory(_directories, within, function(directory: DirectoryEntry) {

      _self._createFile(directory, filename, function(fileEntry: FileEntry) {

        _self._writeFile(fileEntry, data, callback);

      });
    });
  }

  // create an empty fileEntry
  private _createFile(dirEntry: DirectoryEntry, fileName: string, callback: Function) {

    console.log('CREATING FILE');

    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: true}, function(fileEntry) {

      callback(fileEntry);

    }, function(error) {

      alert('error creating file ' + error);

    });
  }

  // write to a fileEntry
  private _writeFile(file: FileEntry, data: Blob, callback: Function) {

    // this._file.writeExistingFile('test', 'tiles.zip', data).then(
    //   function(result) {
    //     console.log('AAAA', result);
    //   }
    // ).catch(function(error) {
    //   console.log('BBBB', error);
    // });

    file.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
        callback('success');
      };

      fileWriter.onprogress = function(p) {
        console.log('progress', p.toString());
      };

      fileWriter.onerror = function (e) {
        callback('error');
        console.log('Failed file write: ' + e);
      };

      fileWriter.write(data);
    });


    // Filesystem.appendFile({
    //   path: file.toURL(),
    //   data: data,
    //   directory: FilesystemDirectory.Documents,
    // }).then(function(result) {
    //   console.log(result);
    // }).catch(function(error) {
    //   console.log(append)
    // })

    // Filesystem.writeFile({
    //   data: data.toString(),
    //   path: 'test2.zip',
    //   directory: FilesystemDirectory.Documents
    // }).then(function (result) {
    //   console.log('done', result);
    // }).catch(function(error) {
    //   console.log('error', error);
    // });





    //   try {
    //
    //   const _blob = new Blob(['dawwdwaawaw'], {type : 'application/json'})
    //
    //   this._file.writeFile(this._file.documentsDirectory, 'test.zip', _blob, {replace: true}).then(function(result){
    //     console.log('finished writing');
    //     console.log(result);
    //   }, function(err) {
    //     console.log(err);
    //   });
    // } catch(e) {
    //   console.error('Unable to write file', e);
    // }

    // try {
    //   this._file.writeFile(this._file.documentsDirectory, 'test.zip', data, {replace: true}).then(function(result){
    //     console.log('finished writing');
    //     console.log(result);
    //   }, function(err) {
    //     console.log(err);
    //   });
    // } catch(e) {
    //   console.error('Unable to write file', e);
    // }


    file.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
        callback('success');
      };

      fileWriter.onprogress = function(p) {
        console.log('progress', p.toString());
      };

      fileWriter.onerror = function (e) {
        callback('error');
        console.log('Failed file write: ' + e);
      };

      fileWriter.write(data);
    });
  }

  // returns the file entry
  public getFile(): any {

  }

  // returns the data from file entry
  public readFileData(): any {

  }

  // delete a file, accepts path
  public deleteFile(): void {

  }

}
