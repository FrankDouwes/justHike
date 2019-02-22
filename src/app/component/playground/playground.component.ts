import { Component, OnInit } from '@angular/core';
import { File} from '@ionic-native/file/ngx';
import {FilesystemService} from '../../service/filesystem.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.sass']
})
export class PlaygroundComponent implements OnInit {

  private _rootDir;

  constructor(
    private _fileSystemService: FilesystemService,
    private _file: File
  ){}

  ngOnInit() {

    const _self = this;

    document.addEventListener('deviceready', function() {
      _self._onReady();
    });
  }

  private _onReady(): void {

    const _self = this;

    // this._fileSystemService.initializeStorage();

    const _timeOut = setTimeout(function() {
      // _self._readFile('test.png');
    }, 3000)

    // this._fileSystemService.getUri('test.png').then(function(result) {
    //   _self._displayImageByFileURL(result.uri);
    // })
  }


  // private _readFile(fileName) {
  //
  //   console.log('read file');
  //   const _self = this;
  //
  //   // Creates a new file or returns the file if it already exists.
  //   this._fileSystemService.rootDir.getFile(fileName, {create: false, exclusive: true}, function(fileEntry) {
  //
  //     console.log('found file', fileEntry.nativeURL);
  //
  //     _self._displayImageByFileURL(fileEntry);
  //
  //   }, function(error) {
  //     console.log(error);
  //   });
  //
  // }


  // private _readBinaryFile(fileEntry) {
  //
  //   const _self = this;
  //
  //   fileEntry.file(function (file) {
  //     var reader = new FileReader();
  //
  //     reader.onloadend = function(result) {
  //
  //       var blob = new Blob([this.result], { type: "image/png" });
  //       _self._displayImage(blob);
  //     };
  //
  //     reader.readAsArrayBuffer(file);
  //
  //   }, function(error) {
  //     console.log('blob error');
  //   });
  // }


  // private _displayImage(blob) {
  //
  //   // Displays image if result is a valid DOM string for an image.
  //   var elem = document.getElementById('test-image');
  //   // Note: Use window.URL.revokeObjectURL when finished with image.
  //   elem['src'] = window.URL.createObjectURL(blob);
  // }

  // private _setupFileSystem(): void {
  //
  //   // const _self = this;
  //   //
  //   // const _requestFileSystem = window['requestFileSystem'] || window['webkitRequestFileSystem'];
  //   //
  //   // _requestFileSystem(1, 0, function(fileSystem) {
  //   //   // _self._rootDir = fileSystem.root;
  //   //   // console.log(fileSystem);
  //   //   // _self._getFile();
  //   // }, function(error) {
  //   //   alert('no filesystem available');
  //   // });
  // }

  // _getFile(): void {
  //
  //   window.resolveLocalFileSystemURL(, function(result) {
  //     console.log(result)
  //   });
  // }
  //
  //
  // private _displayImageByFileURL(fileEntry) {
  //   console.log('test image', fileEntry);
  //   var elem = document.getElementById('test-image');
  //   const _url = this._fileSystemService._convertURL(fileEntry.toURL());
  //   console.log(_url);
  //   elem['src'] = _url;
  // }
}
