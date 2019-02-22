// import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {DownloadService} from '../../../../../../service/download.service';
// import {BehaviorSubject, Observable, Subscription} from 'rxjs';
// import {Downloader} from '../../../../../../_util/downloader';
// import {environment} from '../../../../../../../environments/environment.prod';
// import {FilesystemService} from '../../../../../../service/filesystem.service';
// import {getExtensionFromString} from '../../../../../../_util/file';
//
// export class DownloadStatus {
//   label: string;
//   data: any;
// }
//
// @Component({
//   selector: 'downloader',
//   templateUrl: './downloader.component.html',
//   styleUrls: ['./downloader.component.sass']
// })
//
// export class DownloaderComponent implements OnInit, OnDestroy {
//
//   @Input() trailAbbr: string;
//   @Input() name: string;
//   @Input() label: string;
//   @Input() downloadPath: string;
//   @Input() fileSize?: number;
//
//   public hasFiles: boolean;
//   public isActive: boolean;
//   public status: DownloadStatus;
//   public storageAvailable: boolean;
//
//   private _fileExtension: string;
//
//   private _buttonState: string;
//
//   private _downloadSubscription: Subscription;
//   private _downloader: Downloader;
//
//   // fs + zip
//   private _archiveSubscription: Subscription;
//   private _archiveArray: Array<any>;
//
//   private _saveCount: BehaviorSubject<number>    = new BehaviorSubject<number>(0);
//   private _saveProgress: Observable<number>;
//   private _saveProgressSubscription: Subscription;
//
//   constructor(
//     private _downloadService: DownloadService,
//     private _fileSystemService: FilesystemService
//   ) {
//   }
//
//   ngOnInit(): void {
//
//     const _self = this;
//
//     // check if storage is accessible
//     this.storageAvailable = this._fileSystemService.isStorageAvailable;
//
//     // set extension for parsing
//     this._fileExtension = getExtensionFromString(this.downloadPath);
//
//     // // save progress
//     // this._saveProgress  = this._saveCount.asObservable();
//     // this._saveProgressSubscription = this._saveProgress.subscribe(function(count) {
//     //
//     //   console.log(count);
//     //
//     //   if (_self._archiveArray && count === _self._archiveArray.length) {
//     //     console.log('saving complete');
//     //     console.log('================');
//     //     // _self._fileSystemService.listDirectories(_self._fileSystemService.rootDir);
//     //     _self._archiveArray = null;
//     //     _self.isActive = false;
//     //   }
//     // })
//
//     // name based downloader, managed by downloader service
//     this._downloader = this._downloadService.createDownloader(this.name);
//
//     // observe download status
//     this._downloadSubscription = this._downloader.meta.subscribe(
//       status => {
//
//         this.status = status;
//         if (status['label'] && status['label'] === 'downloaded') {
//
//           if (this._fileExtension === 'zip') {
//
//             console.log('zip downloaded');
//
//             // this._parseZip(this._downloader.downloadedFile);
//
//           } else if (this._fileExtension === 'json') {
//
//             console.log('json downloaded');
//
//             // this._parseJson();
//
//           } else {
//
//             this._clear();
//             this.hasFiles = this.isActive = false;
//             throw new Error('downloaded an unsupported file');
//           }
//
//         } else if (status['label'] && status['label'] === 'downloading') {
//           this.isActive = true;
//         } else if (status['label'] && status['label'] === 'error') {
//
//           alert('download failed');
//           this.hasFiles = this.isActive = false;
//         }
//       }, error => {
//
//         console.log(error);
//
//       });
//   }
//
//   ngOnDestroy(): void {
//     this._downloadSubscription.unsubscribe();
//     // this._saveProgressSubscription.unsubscribe();
//     // if (this._archiveSubscription) {
//     //   this._archiveSubscription.unsubscribe();
//     // }
//   }
//
//
//
//
//
//   // EVENT HANDLERS
//
//   public onButtonClick(newState: string) {
//
//     // prevent repetitive actions
//     if (this._buttonState !== newState) {
//       this['_' + newState]();
//     }
//   }
//
//
//
//
//   // BUTTON ACTIONS (dynanically called from button click)
//
//   private _download(): void {
//     const _url = environment.appDomain + environment.fileBaseUrl + this.downloadPath;
//     this._downloader.downloadFile(_url, true, this.downloadPath);
//   }
//
//   // clear all data
//   private _clear(): void {}
//
//   // cancel current download/unzip process
//   private _cancel(): void {}
//
//
//
//
//   // File handling
//   // private _parseZip(file: any): void {
//   //
//   //   const _self = this;
//   //   this.hasFiles = true;
//   //   this.isActive = false;
//   //
//   //   this._archiveSubscription = this._zipService.listZipContents(file).subscribe(archive => {
//   //
//   //     _self._archiveArray = archive;
//   //     // console.log('contents of zip:', archive);
//   //
//   //     // get/create root directory for trail
//   //     this._fileSystemService.setupDirectory(this.trailAbbr, null, function(trailDirectory) {
//   //
//   //       console.log(trailDirectory);
//   //
//   //       _self._trailDirectory = trailDirectory;
//   //
//   //       // console.log('directory setup complete:', trailDirectory);
//   //
//   //       // for each file in zip
//   //       archive.forEach(function(contentPartial, index) {
//   //
//   //         if (contentPartial.compressedSize === 0) {
//   //
//   //           // directory
//   //           _self._archiveArray[index] = null;
//   //           contentPartial = null;
//   //
//   //           _self._saveCount.next(_self._saveCount.getValue() + 1);
//   //
//   //         } else {
//   //
//   //           // file
//   //
//   //           const _file: ZipTask = _self._zipService.getFileFromZip(contentPartial);
//   //           // _file.progress.subscribe(result => {
//   //           //   console.log('progress', result);
//   //           // });
//   //           _file.data.subscribe(unzippedData => {
//   //             _self._saveUnzippedFile(unzippedData, _self._archiveArray[index], index, _file);
//   //           });
//   //         }
//   //       });
//   //     });
//   //   });
//   // }
//
//   // private _saveUnzippedFile(data, archiveRef: any, index: number, file): void {
//   //
//   //   const _self = this;
//   //   const _fileNameSections: Array<string> = archiveRef['filename'].split("/");
//   //
//   //   const _subDirectoryName: string = _fileNameSections[_fileNameSections.length - 2];
//   //   const _fileName: string = _fileNameSections[_fileNameSections.length - 1];
//   //
//   //   let _blob = new Blob([data], {type: 'image/png'});
//   //
//   //   // console.log('save unzipped content');
//   //
//   //   // cg
//   //   file.data = null;
//   //   file.progress = null;
//   //   file = null;
//   //
//   //   this._fileSystemService.saveFile(_blob, _fileName, this._trailDirectory, _subDirectoryName, true, function (message) {
//   //
//   //     // gc
//   //     _blob = null;
//   //     _self._archiveArray[index] = null;
//   //     archiveRef = null;
//   //
//   //     _self._saveCount.next(_self._saveCount.getValue() + 1);
//   //
//   //     //temp XXX
//   //     // _self._fileSystemService.getSavedFile(_fileName, _self._trailDirectory, _subDirectoryName, function(sData) {
//   //     //   console.log(sData);
//   //     //   // console.log(sData.getURL());
//   //     //   // _self._fileSystemService.getSavedFile('13172.png', _self._trailDirectory, '5770', function(sData) {
//   //     //   // _self.showDownloadedFileFromStorage(sData);
//   //     // });
//   //
//   //   });
//   // }
//
//   private _parseJson(): void {
//     this.hasFiles = true;
//     this.isActive = false;
//   }
//
//   // TEMP
// //   private _showDownloadedFileFromStorage(data): void {
// //
// //     const _imgRef = document.getElementById('test-image');
// //
// //     // const _blob = new Blob([data], { type: 'image/png' });
// //     const _blob = new Blob([new Uint8Array(data)], { type: 'image/png' });
// //     const _urlCreator = window['URL'] || window['webkitURL'];
// //     const _imageURL = _urlCreator.createObjectURL(_blob);
// //
// //     // var reader = new FileReader();
// //     // reader.readAsDataURL(_blob);
// //     // reader.onloadend = function() {
// //     //   _imgRef['src'] = _imageURL;
// //     //   // console.log(base64data);
// //     // }
// //     _imgRef['src'] = _imageURL;
// //   }
// }
