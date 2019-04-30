(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_util/admin/gpx-tools.ts":
/*!******************************************!*\
  !*** ./src/app/_util/admin/gpx-tools.ts ***!
  \******************************************/
/*! exports provided: createGPX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGPX", function() { return createGPX; });
/* harmony import */ var gps_to_gpx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gps-to-gpx */ "./node_modules/gps-to-gpx/lib/index.js");
/* harmony import */ var gps_to_gpx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gps_to_gpx__WEBPACK_IMPORTED_MODULE_0__);

/* dev only class for creating clean GPX data (for use with mobile atlas creator to generate tile sets) */
function createGPX(trailMeta, flatTrailData) {
    var _gpxOptions = {
        activityName: trailMeta.abbr + 'simplified',
        creator: 'Frank Douwes',
        startTime: null,
        timeKey: 'time',
    };
    flatTrailData.forEach(function (waypoint) {
        delete waypoint.distanceTotal;
        delete waypoint.nearestToPois;
        delete waypoint.distance;
        waypoint['time'] = null;
    });
    // split in 3
    // const _fileLength = Math.ceil(flatTrailData.length / 3);
    // const _arrays = _splitArray(flatTrailData, _fileLength);
    var _files = [];
    //
    // _arrays.forEach(function(fileData) {
    //   _files.push(createGpx(fileData, _gpxOptions));
    // });
    _files.push(gps_to_gpx__WEBPACK_IMPORTED_MODULE_0___default()(flatTrailData, _gpxOptions));
    return _files;
}
function _splitArray(array, count) {
    var _res = [];
    while (array.length) {
        _res.push(array.splice(0, count));
    }
    return _res;
}


/***/ }),

/***/ "./src/app/_util/color.ts":
/*!********************************!*\
  !*** ./src/app/_util/color.ts ***!
  \********************************/
/*! exports provided: interpolateColors, shadeColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateColors", function() { return interpolateColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadeColor", function() { return shadeColor; });
// UTILS for colors
// get X (steps) colors inbetween 2 colors
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1), interpolatedColorArray = [];
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);
    for (var i = 0; i < steps; i++) {
        interpolatedColorArray.push(_interpolateColor(color1, color2, stepFactor * i));
    }
    return interpolatedColorArray;
}
// based on https://codepen.io/njmcode/pen/axoyD?editors=0010
function _interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
// get a darker shade of a color
function shadeColor(color, percent) {
    if (!color.startsWith('#')) {
        console.log('color is not HEX', color);
        color = '#F00';
    }
    // hex values
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    // decimal values
    R = parseInt(String(R * (100 + percent) / 100), 10);
    G = parseInt(String(G * (100 + percent) / 100), 10);
    B = parseInt(String(B * (100 + percent) / 100), 10);
    // take care of max values
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    // create a hex value, both values of the different channels are always the same value 77 CC FF etc,
    // as the shade does not affect the color
    var RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));
    return '#' + RR + GG + BB;
}


/***/ }),

/***/ "./src/app/_util/cordova.ts":
/*!**********************************!*\
  !*** ./src/app/_util/cordova.ts ***!
  \**********************************/
/*! exports provided: getCordova, setCordova, cordovaEnabled, setDevice, getUUID, getScreen, setScreen, getConnection, setConnection, hasConnection, setZip, getZip, hasZip, setDialogs, getDialogs, hasDialogs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCordova", function() { return getCordova; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCordova", function() { return setCordova; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cordovaEnabled", function() { return cordovaEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDevice", function() { return setDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUUID", function() { return getUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreen", function() { return getScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScreen", function() { return setScreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConnection", function() { return getConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConnection", function() { return setConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasConnection", function() { return hasConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setZip", function() { return setZip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZip", function() { return getZip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasZip", function() { return hasZip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDialogs", function() { return setDialogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDialogs", function() { return getDialogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasDialogs", function() { return hasDialogs; });
/* just some helper functions to make sure everything is available,
 * useful for debugging in browser (when cordova isn't available) and simple guarding */
/* cordova for native stuff (that tends to be buggy) */
var _cordova;
/* cordova */
function getCordova() {
    return _cordova;
}
function setCordova(c) {
    _cordova = c;
}
function cordovaEnabled() {
    return !!(_cordova);
}
/* device (general device info) */
var _device;
function setDevice(device) {
    _device = device;
}
function getUUID() {
    if (cordovaEnabled()) {
        return _device.uuid;
    }
    else {
        return '1234567890';
    }
}
/* screen is used to lock orientation using cordova-plugin-screen-orientation */
var _screen;
function getScreen() {
    return _screen;
}
function setScreen(s) {
    _screen = s;
}
/* used to test connection using cordova-plugin-network-information */
/* TODO plugin not working as advertised, what else is new! */
var _connection;
function getConnection() {
    return _connection;
}
function setConnection(c) {
    _connection = c;
}
function hasConnection() {
    return !!(_connection);
}
/* zip plugin cordova */
var _zip;
function setZip(z) {
    _zip = z;
}
function getZip() {
    return _zip;
}
function hasZip() {
    return !!(_zip);
}
/* cordova dialogs plugin, to use native dialogs for warnings etc. */
var _dialogs;
function setDialogs(d) {
    _dialogs = d;
}
function getDialogs() {
    return _dialogs;
}
function hasDialogs() {
    return !!(_dialogs);
}


/***/ }),

/***/ "./src/app/_util/downloader/downloader.ts":
/*!************************************************!*\
  !*** ./src/app/_util/downloader/downloader.ts ***!
  \************************************************/
/*! exports provided: Downloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Downloader", function() { return Downloader; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../file */ "./src/app/_util/file.ts");
/* harmony import */ var _status_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./status-manager */ "./src/app/_util/downloader/status-manager.ts");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parser */ "./src/app/_util/downloader/parser.ts");






var FileReference = /** @class */ (function () {
    function FileReference(url, path) {
        this.url = url;
        this.path = path;
    }
    return FileReference;
}());
/* file downloader
sets type using file extension, currently supports json & blob (zip)
supports multiple files for a single downloader (zip parts, due to size limitations/freezing on mobile)
has save / unzip / delete file (for zips)
has resume download function (for multipart files)
TODO: should probably be an uploader too... */
var Downloader = /** @class */ (function () {
    function Downloader(_name, _filesystemService, _httpClient, _localStorageService) {
        this._name = _name;
        this._filesystemService = _filesystemService;
        this._httpClient = _httpClient;
        this._localStorageService = _localStorageService;
        this._completedFiles = 0;
        // setup meta subscription
        this._metaSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.meta = this._metaSubject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        this.status = new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatusManager"](this._metaSubject);
        this._parser = new _parser__WEBPACK_IMPORTED_MODULE_5__["DownloadParser"](_filesystemService, this.status);
    }
    // allows multipart file downloading
    Downloader.prototype._sequencer = function () {
        if (this._downloadRequest) {
            this._downloadRequest.unsubscribe();
            this._downloadRequest = null;
        }
        this._completedFiles += 1;
        if (this._hasParts) {
            this._localStorageService.store(this._name + '_filesDownloaded', this._completedFiles);
        }
        if (this._urls.length > this._completedFiles) {
            this.downloadFile(this._urls, this._cache, this._paths);
        }
        else {
            if (this._hasParts) {
                this._localStorageService.clear(this._name + '_filesDownloaded');
            }
            this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('downloader', 'complete', null), false);
        }
    };
    // returns the first/next file reference to download based on completed downloads (for multipart)
    // converts string to array if needed
    Downloader.prototype._setupPaths = function (urls, paths) {
        var _storedCompletedCount = this._localStorageService.retrieve(this._name + '_filesDownloaded');
        if (_storedCompletedCount && _storedCompletedCount > this._completedFiles) {
            this._completedFiles = _storedCompletedCount;
        }
        if (!this._urls && !this._paths) {
            if (typeof urls === 'string') {
                this._hasParts = false;
                this._paths = [paths];
                this._urls = [urls];
            }
            else {
                this._hasParts = true;
                this._paths = paths;
                this._urls = urls;
            }
        }
        return new FileReference(this._urls[this._completedFiles], this._paths[this._completedFiles]);
    };
    // savePath is the location to save the file, blank == no save, allows renaming (so 'download.zip' can be saved as 'DEMO/test-file.zip')
    // zips will always be unzipped, .zip will be deleted afterwards.
    // multipart files (tiles_0.zip, tiles_1.zip etc) will be unzipped in the same directory based on filename part (in this case 'tiles')
    Downloader.prototype.downloadFile = function (urls, cache, path) {
        var _this = this;
        if (cache === void 0) { cache = true; }
        var _self = this;
        var _path = this._setupPaths(urls, path);
        this._cache = cache;
        this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('http', 'initialize', null), true);
        var _extension = Object(_file__WEBPACK_IMPORTED_MODULE_3__["getExtensionFromString"])(_path.url);
        this._fileType = (_extension === 'json') ? _extension : 'blob';
        // TODO: research on cloud storage caching/headers
        // https://cloud.google.com/storage/docs/gsutil/addlhelp/WorkingWithObjectMetadata
        // let _headers = new HttpHeaders();
        // if (_extension === 'json') {
        //   _headers = _headers.append('Content-Type', 'application/json; charset=utf-8');
        // } else {
        //   _headers = _headers.append('Content-Type', 'application/zip;');
        // }
        //
        // if (!cache) {
        //   _headers = _headers.append('Cache-Control', 'no-cache');
        //   _headers = _headers.append('Pragma', 'no-cache');
        //   _paths.url += '?' + (Math.random() * Number.MAX_VALUE);
        // }
        // download file
        var req = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"]('GET', _path.url, {
            reportProgress: true,
            // headers: _headers,
            responseType: this._fileType
        });
        this.downloadedFile = null;
        var _downloadObservable = this._httpClient.request(req);
        this._downloadRequest = _downloadObservable.subscribe(function (event) {
            if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].DownloadProgress) {
                var _downloadPercentage = (event.loaded / event.total) * 100;
                var _completedPerc = (_this._completedFiles / _this._urls.length) * 100;
                _downloadPercentage = Number((_completedPerc + (_downloadPercentage / _this._urls.length)).toFixed(2));
                var _fileSize = Number(event.total);
                _this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('http', 'progress', { percentage: _downloadPercentage, fileSize: _fileSize }), true);
            }
            else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]) {
                _this.downloadedFile = event.body;
                _this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('http', 'complete', { file: _this.downloadedFile }), (_path.path !== null));
                if (!_path.path) {
                    // downloader complete
                    _this._sequencer();
                    console.log('downloaded file available');
                }
                else {
                    // save
                    _this._parser.saveFile(event.body, _path.path, _this._hasParts, _this._fileType, function (result) {
                        // filesystem complete
                        _self.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('filesystem', result, null), true);
                        _self._sequencer();
                    });
                }
            }
        }, function (error) {
            _this.cancelDownload();
            _this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('downloader', 'error', error), false);
        });
        return _downloadObservable;
    };
    Downloader.prototype.cancelDownload = function () {
        if (this._downloadRequest) {
            this._downloadRequest.unsubscribe();
            this._downloadRequest = null;
        }
        this.clearFile();
        if (this._hasParts) {
            this._localStorageService.clear(this._name + '_filesDownloaded');
        }
        // blank status
        this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('downloader', '', null), false);
    };
    // clear all files related to this downloader (including unzipped multipart files)
    Downloader.prototype.clearFile = function () {
        if (this.downloadedFile) {
            this.downloadedFile = null;
        }
        this._parser.clearFile(this._paths, this._completedFiles, this._hasParts);
        this._completedFiles = 0;
        this.status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_4__["DownloaderStatus"]('downloader', 'cleared', null), false);
    };
    return Downloader;
}());



/***/ }),

/***/ "./src/app/_util/downloader/parser.ts":
/*!********************************************!*\
  !*** ./src/app/_util/downloader/parser.ts ***!
  \********************************************/
/*! exports provided: DownloadParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadParser", function() { return DownloadParser; });
/* harmony import */ var _status_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status-manager */ "./src/app/_util/downloader/status-manager.ts");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../file */ "./src/app/_util/file.ts");


var DownloadParser = /** @class */ (function () {
    function DownloadParser(_filesystemService, _status) {
        this._filesystemService = _filesystemService;
        this._status = _status;
    }
    // FILE SAVING
    DownloadParser.prototype.saveFile = function (data, pathName, hasParts, fileType, onComplete) {
        var _self = this;
        this._onComplete = onComplete;
        if (!this._filesystemService.root) {
            alert('No file system available, unable to save files.');
            onComplete('error');
        }
        this._status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_0__["DownloaderStatus"]('filesystem', 'initialize', null), true);
        this._filesystemService.saveFile(data, null, pathName, function (result) {
            if (fileType !== 'blob') {
                onComplete('complete');
            }
            else {
                // continue unzipping
                return _self._unzipFile(pathName, hasParts);
            }
        });
    };
    // UNZIPPING (happens after saving)
    DownloadParser.prototype._unzipFile = function (pathName, hasParts) {
        var _self = this;
        var _observer = this._filesystemService.unzip(pathName, hasParts).subscribe(function (result) {
            if (result['state'] === 'complete' || result['message'] === 'error') {
                // success / error
                _self._onComplete(result['message']);
            }
            else if (result['state'] === 'progress') {
                // progress
                _self._status.setStatus(new _status_manager__WEBPACK_IMPORTED_MODULE_0__["DownloaderStatus"]('filesystem', 'progress', { percentage: (result['percentage'] * 0.33) + 66 }), true);
            }
            _observer.unsubscribe();
        });
    };
    // CLEAR FILE
    DownloadParser.prototype.clearFile = function (paths, completedFiles, hasParts) {
        var _self = this;
        if (paths && completedFiles > 0) {
            // multiple parts are all extracted in the same directory, therefor this will only have to run once
            var _extension = Object(_file__WEBPACK_IMPORTED_MODULE_1__["getExtensionFromString"])(paths[0]);
            // if we're dealing with a zip, we'll have to remove the unzipped directory
            if (_extension === 'zip') {
                var _separator = (hasParts) ? '_' : '.';
                var _directory = paths[0].split(_separator)[0] + '/';
                _self._filesystemService.deleteDirectory(_directory, function (result) {
                    // nothing here... dead end
                    return;
                });
            }
        }
        else if (paths) {
            _self._filesystemService.deleteFile(paths[0]);
        }
    };
    return DownloadParser;
}());



/***/ }),

/***/ "./src/app/_util/downloader/status-manager.ts":
/*!****************************************************!*\
  !*** ./src/app/_util/downloader/status-manager.ts ***!
  \****************************************************/
/*! exports provided: DownloaderStatus, DownloaderStatusManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloaderStatus", function() { return DownloaderStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloaderStatusManager", function() { return DownloaderStatusManager; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

var DownloaderStatus = /** @class */ (function () {
    function DownloaderStatus(type, label, data) {
        this.type = type;
        this.label = label;
        this.data = data;
    }
    return DownloaderStatus;
}());

var DownloaderStatusManager = /** @class */ (function () {
    function DownloaderStatusManager(meta) {
        this.isActiveSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this._meta = meta;
    }
    DownloaderStatusManager.prototype.setStatus = function (downloaderStatus, active) {
        if (this.isActiveSubject.getValue() !== active) {
            this.isActiveSubject.next(active);
        }
        if (downloaderStatus.label !== '') {
            this._meta.next(downloaderStatus);
        }
        else {
            this._meta.next(null);
        }
    };
    return DownloaderStatusManager;
}());



/***/ }),

/***/ "./src/app/_util/file.ts":
/*!*******************************!*\
  !*** ./src/app/_util/file.ts ***!
  \*******************************/
/*! exports provided: getExtensionFromString, convertToIonicUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtensionFromString", function() { return getExtensionFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToIonicUrl", function() { return convertToIonicUrl; });
// get the file extension as different filetypes are parsed differently
function getExtensionFromString(filename) {
    var _urlSplit = filename.split('.');
    if (_urlSplit.length === 1) {
        alert('are you sure this is a full filename?');
        return;
    }
    return _urlSplit[_urlSplit.length - 1];
}
/* Converts file:// urls to something a local server url, poorly documented nonsense!
https://github.com/ionic-team/capacitor/issues/448
https://stackoverflow.com/questions/52141085/file-uri-path-for-camera-not-working-on-ionic-4
https://forum.ionicframework.com/t/normalizeurl-depricated-cannot-get-webview-convertfilesrc-to-work/136329
this is an IONIC webview specific implementation (iOS cordova plugin) */
function convertToIonicUrl(fileUrl) {
    var _window = window;
    //window.Ionic.normalizeURL... does not exist
    if (!_window.Ionic || !_window.Ionic.WebView.convertFileSrc) {
        alert('Unsupported filesystem.');
        return;
    }
    else {
        return _window.Ionic.WebView.convertFileSrc(fileUrl);
    }
}


/***/ }),

/***/ "./src/app/_util/generic.ts":
/*!**********************************!*\
  !*** ./src/app/_util/generic.ts ***!
  \**********************************/
/*! exports provided: sortByKey, cloneData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByKey", function() { return sortByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneData", function() { return cloneData; });
// sort an array of objects by a key (in each object)
function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
// returns a clone of the input (instead of a reference, when dealing with nested objects)
function cloneData(input) {
    return JSON.parse(JSON.stringify(input));
}


/***/ }),

/***/ "./src/app/_util/geolib/distance.ts":
/*!******************************************!*\
  !*** ./src/app/_util/geolib/distance.ts ***!
  \******************************************/
/*! exports provided: Distance, calculateDistance, calculateSectionScale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Distance", function() { return Distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateDistance", function() { return calculateDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateSectionScale", function() { return calculateSectionScale; });
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! geolib */ "./node_modules/geolib/dist/geolib.js");
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
// Adjustments to geoLibs Distance class:
// - key value for Distance is a string, converting that to a number
// - added belongsTo, in case points belong to different sources


var Distance = /** @class */ (function () {
    function Distance() {
    }
    Object.defineProperty(Distance.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (key) {
            if (typeof key === 'string') {
                this._key = Number(key);
            }
            else {
                this._key = key;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Distance;
}());

// calculate the distance between 2 points
function calculateDistance(point1, point2) {
    return geolib__WEBPACK_IMPORTED_MODULE_0__["getDistance"]({ latitude: point1.latitude, longitude: point1.longitude }, { latitude: point2.latitude, longitude: point2.longitude }, 1, 4);
}
// calculate the scale factor of a section (array of waypoints), using the provided length (by author) and the calculated length
function calculateSectionScale(section, length, useMile) {
    if (useMile === void 0) { useMile = true; }
    var _calcSectionLength = 0;
    var _prevPoint;
    var _length = section.length;
    for (var i = 0; i < _length; i++) {
        var _point = section[i];
        if (_prevPoint) {
            _calcSectionLength += calculateDistance(_prevPoint, _point);
        }
        _prevPoint = _point;
    }
    // convert to mile
    if (useMile) {
        _calcSectionLength = _calcSectionLength / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].MILE;
    }
    var _scale = length / _calcSectionLength;
    return _scale;
}


/***/ }),

/***/ "./src/app/_util/leaflet/calculate.ts":
/*!********************************************!*\
  !*** ./src/app/_util/leaflet/calculate.ts ***!
  \********************************************/
/*! exports provided: calculateTrailAnchorPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTrailAnchorPoint", function() { return calculateTrailAnchorPoint; });
/* harmony import */ var _converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./converter */ "./src/app/_util/leaflet/converter.ts");

/* calculate the nearest point on trail for a given location */
function calculateTrailAnchorPoint(mile, nearestPoints) {
    var _nearestPoint = mile.waypoints[Number(nearestPoints[0].key)];
    var _2ndNearestPoint = mile.waypoints[Number(nearestPoints[1].key)];
    var _location = calculatePointBasedOnDistance(nearestPoints, [_nearestPoint, _2ndNearestPoint]);
    /* found a loop/bend, which causes the _nearestPoint keys to not be in a consecutive order.
    1. figure out the trailDistance between the 2 nearest points
    2. find a point within all points that's closest to that trailDistance
    3. do the distance calculation again with 2 points based on that centerpoint.
    *. this is 'good enough', a trade-off between performance and slightly less optimal overlay/popup locations. */
    if (Number(nearestPoints[1].key) !== Number(nearestPoints[0].key) + 1
        && Number(nearestPoints[1].key) !== Number(nearestPoints[0].key) - 1) {
        var _selectionWaypoints = void 0;
        if (nearestPoints[0].key < nearestPoints[1].key) {
            _selectionWaypoints = mile.waypoints.slice(nearestPoints[0].key, nearestPoints[1].key + 1);
        }
        else {
            _selectionWaypoints = mile.waypoints.slice(nearestPoints[1].key, nearestPoints[0].key + 1);
        }
        // sorting the selection based on the distance of the locations distance
        _selectionWaypoints.sort(function (a, b) {
            return Math.abs(_location.distance - a.distance) - Math.abs(_location.distance - b.distance);
        });
        _location = calculatePointBasedOnDistance(nearestPoints, [_selectionWaypoints[0], _selectionWaypoints[1]]);
    }
    return _location;
}
/* calculate a new waypoint based on the distance from 2 waypoints (using a distance sorted array (from GeoLib)
* calculates a point (x) inline (between p1 & p2), based on the distance of p1 and p2 from y (labeled d1 and d2)
*
*   p1 --------- x ---------- p2
*    .                      .
*       .                .
*     (d1) .          .  (d2)
*             .     .
*                y
*                                   */
function calculatePointBasedOnDistance(distancePoints, waypoints, returnAsLatlng) {
    if (returnAsLatlng === void 0) { returnAsLatlng = false; }
    // get the waypoints from a mile
    var _point1 = waypoints[0];
    var _point2 = waypoints[1];
    var _distancePerc = distancePoints[0].distance / (distancePoints[0].distance + distancePoints[1].distance);
    // calculate new props based on distance percentage
    var _props = ['latitude', 'longitude', 'elevation', 'distance', 'distanceTotal'];
    var _length = _props.length;
    var _waypoint = {};
    for (var i = 0; i < _length; i++) {
        var _prop = _props[i];
        _waypoint[_prop] = _point1[_prop] + (((_point2[_prop] - _point1[_prop]) / 2) * _distancePerc);
    }
    if (returnAsLatlng) {
        return Object(_converter__WEBPACK_IMPORTED_MODULE_0__["waypointToLatLng"])(_waypoint);
    }
    else {
        return _waypoint;
    }
}


/***/ }),

/***/ "./src/app/_util/leaflet/converter.ts":
/*!********************************************!*\
  !*** ./src/app/_util/leaflet/converter.ts ***!
  \********************************************/
/*! exports provided: pointArrayTypeConversion, waypointToLatLng, latLngToWaypoint, flatToWaypoint, waypointToFlat, waypointToWaypoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointArrayTypeConversion", function() { return pointArrayTypeConversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waypointToLatLng", function() { return waypointToLatLng; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latLngToWaypoint", function() { return latLngToWaypoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatToWaypoint", function() { return flatToWaypoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waypointToFlat", function() { return waypointToFlat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "waypointToWaypoint", function() { return waypointToWaypoint; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

// define the seperate converter functions for easier referencing
var _converters = {
    flat_waypoint: flatToWaypoint,
    latlng_waypoint: latLngToWaypoint,
    waypoint_latlng: waypointToLatLng,
    waypoint_flat: waypointToFlat,
    waypoint_waypoint: waypointToWaypoint
};
// convert an array of Waypoints in a specified format to another format)
function pointArrayTypeConversion(waypoints, from, to) {
    var _length = waypoints.length;
    var _returnArr = [];
    var _converter = _converters[from + '_' + to];
    if (!_converter) {
        console.warn('No converter for ' + from + ' to ' + to);
    }
    for (var i = 0; i < _length; i++) {
        _returnArr.push(_converter(waypoints[i]));
    }
    return _returnArr;
}
// convert a single Waypoint to a Latlng (that leaflet uses), optional elevation
function waypointToLatLng(waypoint) {
    return leaflet__WEBPACK_IMPORTED_MODULE_0__["latLng"](waypoint.latitude, waypoint.longitude, waypoint.elevation);
}
// convert a latlng to a waypoint, optional elevation
function latLngToWaypoint(latlng) {
    var _waypoint = {
        latitude: latlng.lat,
        longitude: latlng.lng
    };
    if (latlng.alt) {
        _waypoint.elevation = latlng.alt;
    }
    return _waypoint;
}
// convert flat data to waypoint (assuming an array with structure [latitude:number, longitude: number, elevation?:number]
function flatToWaypoint(flat) {
    var _waypoint = {
        latitude: flat[0],
        longitude: flat[1]
    };
    if (flat[2]) {
        _waypoint.elevation = flat[2];
    }
    return _waypoint;
}
// convert flat data to waypoint (assuming an array with structure [latitude:number, longitude: number, elevation?:number]
function waypointToFlat(waypoint) {
    var _flat = [waypoint.latitude, waypoint.longitude];
    if (waypoint.elevation) {
        _flat.push(waypoint.elevation);
    }
    return _flat;
}
// convert waypoint to waypoint, turns string to numbers
function waypointToWaypoint(waypoint) {
    var _waypoint = {};
    for (var key in waypoint) {
        _waypoint[key] = Number(waypoint[key]);
    }
    return _waypoint;
}


/***/ }),

/***/ "./src/app/_util/leaflet/icon.ts":
/*!***************************************!*\
  !*** ./src/app/_util/leaflet/icon.ts ***!
  \***************************************/
/*! exports provided: htmlIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlIcon", function() { return htmlIcon; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_modules_leaflet_src_geometry_Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node_modules/leaflet/src/geometry/Point */ "./node_modules/leaflet/src/geometry/Point.js");


/* creates a leaflet icon out of an html element
the default divIcon class (that's being extended) uses innerHTML() which breaks svg href links in iOS/Safari*/
var _htmlIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__["DivIcon"].extend({
    createIcon: function (oldIcon) {
        var _div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : this.options.html, options = this.options;
        if (options.bgPos) {
            var bgPos = Object(node_modules_leaflet_src_geometry_Point__WEBPACK_IMPORTED_MODULE_1__["toPoint"])(options.bgPos);
            _div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
        }
        this._setIconStyles(_div, 'icon');
        return _div;
    }
});
function htmlIcon(options) {
    return new _htmlIcon(options);
}


/***/ }),

/***/ "./src/app/_util/leaflet/layer.ts":
/*!****************************************!*\
  !*** ./src/app/_util/leaflet/layer.ts ***!
  \****************************************/
/*! exports provided: createMapTileLayer, createGridLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMapTileLayer", function() { return createMapTileLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGridLayer", function() { return createGridLayer; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tiles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tiles */ "./src/app/_util/leaflet/tiles.ts");
/* harmony import */ var _trail_meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment.prod */ "./src/environments/environment.prod.ts");




// create the main map tile layer, based on the custom fallback tile.
// if there's an internet connection use arcGis, else use locally stored tiles (or default error tile)
function createMapTileLayer(url, detectRetina) {
    var _fallbackUrl = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].onlineTileUrl;
    var _fallbackLayer = Object(_tiles__WEBPACK_IMPORTED_MODULE_1__["fallbackLayer"])(url, {
        // regular min & max zoom prop causes flickering
        minNativeZoom: 15,
        maxNativeZoom: 15,
        fallbackTileUrl: _fallbackUrl,
        errorTileUrl: './assets/images/missing.png',
        keepBuffer: 0,
        updateWhenIdle: false,
        updateWhenZooming: false,
        detectRetina: detectRetina
    });
    return _fallbackLayer;
}
/* grid (TODO: overlapping grid issues, investigate UTM grids)
considering rewriting this: https://github.com/ggolikov/Leaflet.gmxIndexGrid for leafelt 1.x
creates a square mile grid layer array (currently they're sliced into UTM zones, would prefer a single layer) */
function createGridLayer(trailAbbr) {
    var _gridLayers = [];
    var _trailUtm = Object(_trail_meta__WEBPACK_IMPORTED_MODULE_2__["getTrailMetaDataByAbbr"])(trailAbbr).utm;
    if (_trailUtm) {
        _trailUtm.forEach(function (zone) {
            var _utmGrid = leaflet__WEBPACK_IMPORTED_MODULE_0__["utmGrid"](zone, false, {
                color: '#AAA',
                showAxis100km: false,
                weight: 1,
                minInterval: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE,
                maxInterval: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE,
                opacity: 1,
            });
            _gridLayers.push(_utmGrid);
        });
    }
    return _gridLayers;
}


/***/ }),

/***/ "./src/app/_util/leaflet/marker.js":
/*!*****************************************!*\
  !*** ./src/app/_util/leaflet/marker.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);

/* simple mixin to force a z-index for a marker
this overrides the default index sorting leaflet has.
used for the User marker (always on top) */
(function (global) {
    var MarkerMixin = {
        _updateZIndex: function (offset) {
            this._icon.style.zIndex = this.options.forceZIndex ? (this.options.forceZIndex + (this.options.zIndexOffset || 0)) : (this._zIndex + offset);
        },
        setForceZIndex: function (forceZIndex) {
            console.log('force');
            this.options.forceZIndex = forceZIndex ? forceZIndex : null;
        }
    };
    if (global)
        global.include(MarkerMixin);
})(leaflet__WEBPACK_IMPORTED_MODULE_0__["Marker"]);
/**
 * Copyright (C) 2013 Maxime Hadjinlian <maxime.hadjinlian@gmail.com>
 * All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
(function () {
    // Retain the value of the original onAdd and onRemove functions
    var originalOnAdd = leaflet__WEBPACK_IMPORTED_MODULE_0__["Marker"].prototype.onAdd;
    var originalOnRemove = leaflet__WEBPACK_IMPORTED_MODULE_0__["Marker"].prototype.onRemove;
    // Add bounceonAdd options
    leaflet__WEBPACK_IMPORTED_MODULE_0__["Marker"].mergeOptions({
        bounceOnAdd: false,
        bounceOnAddOptions: {
            duration: 1000,
            height: -1,
            loop: 1,
        },
        bounceOnAddCallback: function () { },
    });
    leaflet__WEBPACK_IMPORTED_MODULE_0__["Marker"].include({
        _toPoint: function (latlng) {
            return this._map.latLngToContainerPoint(latlng);
        },
        _toLatLng: function (point) {
            return this._map.containerPointToLatLng(point);
        },
        _motionStep: function (opts) {
            var self = this;
            var timePassed = new Date().getTime() - opts.start;
            var progress = timePassed / opts.duration;
            if (progress > 1) {
                progress = 1;
            }
            var delta = self._easeOutBounce(progress);
            opts.step(delta);
            if (progress === 1) {
                opts.start = new Date().getTime();
                progress = 0;
                if (opts.loop > 0)
                    opts.loop = opts.loop - 1;
                if (opts.loop === 0) {
                    opts.end();
                    return;
                }
            }
            self._animationId = leaflet__WEBPACK_IMPORTED_MODULE_0__["Util"].requestAnimFrame(function (timestamp) {
                self._motionStep(opts);
            });
        },
        _bounceMotion: function (opts, callback) {
            var original = leaflet__WEBPACK_IMPORTED_MODULE_0__["latLng"](this._origLatlng);
            var start_y = this._dropPoint.y;
            var start_x = this._dropPoint.x;
            var distance = this._point.y - start_y;
            var self = this;
            self._animationId = leaflet__WEBPACK_IMPORTED_MODULE_0__["Util"].requestAnimFrame(function () {
                self._motionStep({
                    duration: opts.duration || 1000,
                    loop: opts.loop || 1,
                    start: new Date(),
                    step: function (delta) {
                        self._dropPoint.y =
                            start_y
                                + (distance * delta)
                                - (self._map.project(self._map.getCenter()).y - self._origMapCenter.y);
                        self._dropPoint.x =
                            start_x
                                - (self._map.project(self._map.getCenter()).x - self._origMapCenter.x);
                        self.setLatLng(self._toLatLng(self._dropPoint));
                    },
                    end: function () {
                        self.setLatLng(original);
                        if (typeof callback === 'function')
                            callback();
                    },
                });
            });
        },
        // Many thanks to Robert Penner for this function
        _easeOutBounce: function (pos) {
            if ((pos) < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            }
            else if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            }
            else if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            }
            else {
                return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },
        // Bounce : if options.height in pixels is not specified, drop from top.
        // If options.duration is not specified animation is 1s long.
        bounce: function (options, endCallback) {
            if (typeof options === 'function') {
                endCallback = options;
                options = null;
            }
            options = options || { duration: 1000, height: -1, loop: 1 };
            // backward compatibility
            if (typeof options === 'number') {
                options['duration'] = arguments[0];
                options['height'] = arguments[1];
            }
            // Keep original map center
            this._origMapCenter = this._map.project(this._map.getCenter());
            this._dropPoint = this._getDropPoint(options.height);
            this._bounceMotion(options, endCallback);
        },
        stopBounce: function () {
            // We may have modified the marker; so we need to place it where it
            // belongs so next time its coordinates are not changed.
            this.setLatLng(this._origLatlng);
            leaflet__WEBPACK_IMPORTED_MODULE_0__["Util"].cancelAnimFrame(this._animationId);
        },
        // This will get you a drop point given a height.
        // If no height is given, the top y will be used.
        _getDropPoint: function (height) {
            // Get current coordidates in pixel
            this._point = this._toPoint(this._origLatlng);
            var top_y;
            if (height === undefined || height < 0) {
                top_y = this._toPoint(this._map.getBounds()._northEast).y;
            }
            else {
                top_y = this._point.y - height;
            }
            return new leaflet__WEBPACK_IMPORTED_MODULE_0__["Point"](this._point.x, top_y);
        },
        onAdd: function (map) {
            this._map = map;
            // Call leaflet original method to add the Marker to the map.
            originalOnAdd.call(this, map);
            // Keep original latitude and longitude
            this._origLatlng = this.getLatLng();
            if (this.options.bounceOnAdd === true) {
                this.bounce(this.options.bounceOnAddOptions, this.options.bounceOnAddCallback);
            }
        },
        onRemove: function (map) {
            this.stopBounce();
            originalOnRemove.call(this, map);
        },
    });
})();
//# sourceMappingURL=marker.js.map

/***/ }),

/***/ "./src/app/_util/leaflet/plugins/grid.js":
/*!***********************************************!*\
  !*** ./src/app/_util/leaflet/plugins/grid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// leaflet metric grid from https://github.com/bill-chadwick/Leaflet.MetricGrid (not an npm package)
/**
 *  A general purpose metric grid overlay for Leaflet.
 *  Designed to show grids such as the British, Irish and UTM.
 *  Such grids are composed of fixed size squares and were
 *  traditionally used for estimating grid references on printed maps.
 *  The grid is restricted to 100m, 1km, 10km or 100km intervals (more intervals would be possible but unusual).
 *  Most grids repeat their numbering every 100km.
 *  Grid lines will tend to straight as a Web Mercator map is zoomed in.
 *  At low zooms, the minimum number of straight line segments are used to
 *  draw grid lines that project as curves on Web Mercator.
 *  Depends on proj4.js 2.5.0 or later
 *  Author: bill.chadwick2@gmail.com
 *  Inspired by lanwei@cloudybay.com.tw and Open Layers 3
 */

var proj4 = window['proj4'];

L.MetricGrid = L.Layer.extend({

  options: {

    proj4ProjDef: "must be provided",                    // must be provided
    bounds: [[0, 0] , [0, 0]],                           // must be provided. First coord is bottom left, second is top right in [x,y] format
    clip: null,                                          // optional, clip polygon in grid coordinates
    latLonClipBounds: null,                              // optional, Leaflet.LatLngBounds or equivalent array
    drawClip: false,                                     // optional, when true, the clip bounds are drawn with the same pen as the grid
    hundredKmSquareFunc: function(e, n) {return "";},    // optional, params are eastings and northings in metres

    showAxisLabels: [100, 1000, 10000],                  // show axis for listed grid spacings - omit 100000
    showAxis100km: false,
    showSquareLabels: [],                                // show square labels for listed grid spacings
    opacity: 0.7,
    weight: 2,                                           // use 2 for best results, else label rub-out is less good (antialiased pixels)
    color: "#00f",
    font: "bold 16px Verdana",
    minInterval: 100,                   // minimum grid interval in metres
    maxInterval: 100000,                // maximum grid interval in metres, the bounds values should be multiples of this
    minZoom: 4                          // minimum zoom at which grid is drawn
  },


  // Pseudo class constructor
  initialize: function (options) {

    L.setOptions(this, options); // merge with default options above

    if (!this.options.fontColor) {
      this.options.fontColor = this.options.color;
    }
  },


  // Base class override
  onAdd: function (map) {

    this._map = map;

    if (!this._container) {
      this._initCanvas();
    }

    map._panes.overlayPane.appendChild(this._container);
    map.on("viewreset", this._reset, this);
    map.on("move", this._reset, this);
    map.on("moveend", this._reset, this);

    this._reset();
  },


  // Base class override
  onRemove: function (map) {

    map.getPanes().overlayPane.removeChild(this._container);
    map.off("viewreset", this._reset, this);
    map.off("move", this._reset, this);
    map.off("moveend", this._reset, this);
  },


  // Base class override
  addTo: function (map) {
    map.addLayer(this);
    return this;
  },


  // Base class override, unlikely to be needed
  getAttribution: function () {
    return this.options.attribution;
  },


  // MetricGrid method
  setOpacity: function (opacity) {
    this.options.opacity = opacity;
    this._updateOpacity();
    return this;
  },


  // MetricGrid method
  bringToFront: function () {
    if (this._canvas) {
      this._map._panes.overlayPane.appendChild(this._canvas);
    }
    return this;
  },


  // MetricGrid method
  bringToBack: function () {
    var pane = this._map._panes.overlayPane;
    if (this._canvas) {
      pane.insertBefore(this._canvas, pane.firstChild);
    }
    return this;
  },


  // Private method to initialize a drawing canvas for the grid.
  // No animation support (yet).
  _initCanvas: function () {

    this._container = L.DomUtil.create("div", "leaflet-image-layer");
    this._canvas = L.DomUtil.create("canvas", "");
    this._updateOpacity();
    this._container.appendChild(this._canvas);

    // No canvas interactions, but bind canvas onload to our _onCanvasLoad
    L.extend(this._canvas, {
      onselectstart: L.Util.falseFn,
      onmousemove: L.Util.falseFn,
      onload: L.bind(this._onCanvasLoad, this)
    });
  },


  // Sets the clip region for a grid.
  // Useful at low zooms to prevent multiple grids drawing on top of each other.
  // See the demo for clipping of the British and Irish grids.
  // The clip path is specified in the options as an array of grid coordinates.
  // These should represent a simple closed polygon and start and end with the same point.
  // Individual points are an array of two coordinates - east/x then north/y.
  // The clip outline is drawn using the same pen (color and width) as the grid lines
  // Clipping is only used if one or more of the corners of the grid covering the visible map
  // lie outside of the clipping path.
  _setClip: function (ctx) {

    var map = this._map;
    var proj = this.options.proj4ProjDef;
    var i;

    if (this.options.clip) {

      // iterate the segments of the clip path
      var x2;
      var y2;
      var x1;
      var y1;
      var dX;
      var dY;
      var pts;
      var j;

      for(i=0; i < (this.options.clip.length-1); i+=1) {

        x2 = this.options.clip[i+1][0];
        x1 = this.options.clip[i][0];
        y2 = this.options.clip[i+1][1];
        y1 = this.options.clip[i][1];
        dX = x2-x1;
        dY = y2-y1;

        // interpolate a point along the line segment
        function _interpolate (frac) {
          return proj4(proj).inverse([x1 + (frac * dX), y1 + (frac * dY)]);
        }

        // get set of Web Mercator line segments fitted to this segment with a maximum error of 1 pixel
        pts = this._getPoints(_interpolate, 1.0, map);

        // draw the clip path segment
        j = 0;
        if (i == 0) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          j = 1;
        }
        for (j=j; j < pts.length; j+=1) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }
      }

      // finish the path and set the clip region
      if (this.options.drawClip) {
        ctx.stroke();
      }
      ctx.clip();



    }
  },

  // sets a rectangular lat/lon clip
  // the latLonClipBounds should be [[bottom lat, left lon],[top lat, right lon]]
  // return is clip bounds in canvas coords
  _setLLClipBounds: function (ctx, map) {

    var b = L.latLngBounds(this.options.latLonClipBounds);
    var bl = map.latLngToContainerPoint(b.getSouthWest());
    var tr = map.latLngToContainerPoint(b.getNorthEast());

    ctx.beginPath();
    ctx.moveTo(bl.x, bl.y);
    ctx.lineTo(tr.x, bl.y);
    ctx.lineTo(tr.x, tr.y);
    ctx.lineTo(bl.x, tr.y);
    ctx.lineTo(bl.x, bl.y);

    // finish the path and set the clip region
    if (this.options.drawClip) {
      ctx.stroke();
    }
    ctx.clip();

    // LL bounds in canvas coords, for use when labelling
    return L.bounds(bl, tr);
  },


  // redraw the overlay after a map pan or zoom etc
  _reset: function () {

    var container = this._container;
    var canvas = this._canvas;
    var size = this._map.getSize();
    var lt = this._map.containerPointToLayerPoint([0, 0]);

    // position the canvas ontop of the map
    L.DomUtil.setPosition(container, lt);

    container.style.width = size.x + "px";
    container.style.height = size.y + "px";

    canvas.width  = size.x;
    canvas.height = size.y;
    canvas.style.width  = size.x + "px";
    canvas.style.height = size.y + "px";

    this._draw();
  },


  // fire a Layer loaded event
  _onCanvasLoad: function () {
    this.fire("load");
  },


  // internal opacity control
  _updateOpacity: function () {
    L.DomUtil.setOpacity(this._canvas, this.options.opacity);
  },


  // Formats eastings or northings within a 100km square for axis / square labelling
  // Most grids repeat their numbering every 100km
  // If grid spacing < 1km, uses 3 digits,
  // else if grid spacing < 10km uses 2 digits,
  // else one digit
  _formatEastOrNorth(n, spacing) {

    var r;
    var h = Math.floor(n / 100000);
    n = n % 100000; // metres within 100km square

    if (spacing < 1000) {
      r = Math.floor(n / 100).toString();
      r = (r.length == 1) ? "0" + r : r;
      r = (r.length == 2) ? "0" + r : r;
    }
    else if (spacing < 10000) {
      r = Math.floor(n / 1000).toString();
      r = (r.length == 1) ? "0" + r : r;
    }
    else {
      r = Math.floor(n / 10000).toString();
    }

    // prepend hundreds of km in subscript
    if (this.options.showAxis100km) {
      var hs = h.toString();
      var i;
      for(i = (hs.length-1); i >= 0; i--) {
        r = String.fromCharCode(hs.charCodeAt(i) + 8272) + r;
      }
    }

    return r;
  },


  // Formats eastings value for grid line labels
  // This shows distance within each 100 km grid square - most grid stytems work like this
  _format_eastings: function(eastings, spacing) {
    return this._formatEastOrNorth(eastings, spacing);
  },


  // Formats northings value for grid line labels
  // This shows distance within each 100 km grid square - most grid stytems work like this
  _format_northings: function(northings, spacing) {
    return this._formatEastOrNorth(northings, spacing);
  },


  // Calculates map scale at the center of map in metres per pixel
  // On a Web Mercator map, scale changes with latitude (y axis)
  _mPerPx: function()
  {
    // get map resolution by moving 1 pixel at the center
    var ll1 = this._map.getCenter();
    var p1 = this._map.project(ll1);
    var p2 = p1.add(new L.Point(1,0));
    var ll2 = this._map.unproject(p2);
    return ll1.distanceTo(ll2);
  },


  // Determines graticule interval according to map scale
  // Because the grid can only be a power of 10 and map zooms are powers of two
  // some zooms will have small grid squares and some large.
  // The only way around this would be to introduce grids at decimal multiples of say 2 and 5 meters.
  // We don't do that as such a grid square can not be properly labeled.
  _calcInterval: function() {

    var mPerPx = this._mPerPx();

    // select the grid interval according to the map resolution
    // TODO make these limits into an option perhaps setting spacing by zoom
    var spacing;
    if (mPerPx <= 1) {
      spacing = 100;
    } else if (mPerPx <= 20) {
      spacing = 1000;
    } else if (mPerPx <= 175) {
      spacing = 10000;
    } else {
      spacing = 100000;
    }

    //limit to min/max interval
    if (spacing < this.options.minInterval) {
      spacing = this.options.minInterval;
    }
    if (spacing > this.options.maxInterval) {
      spacing = this.options.maxInterval;
    }

    return spacing;
  },

  // Finds the set of screen points corresponding to a grid line.
  // Most metric grid lines are nearly straight on a Web Mercator map, especially when zoomed in.
  // We use the minimum number of line segments that represent the actual grid line,
  // by chopping the grid line into a set of straight line segments that fit the grid line curve with less
  // than 1 screen pixel of error.
  // This approach can be used to draw e.g. a great circle on a Web Mercator map.
  // However if the WM curve of your line has a point of inflexion then you will need to
  // proceed in two parts about the inflexion.
  // There is an inflexion when a Great Circle crosses the equator on a WM map.
  //
  // The interpolate function should return the Lat/Lon of point a for a fraction of 0.0
  // and the Lat/Lon of point b for a fraction of 1.0.
  //
  // This code is adapted from OpenLayers 3
  //
  _getPoints: function (interpolate, tolerance, map) {

    var geoA = interpolate(0);
    var geoB = interpolate(1);

    var a = map.latLngToContainerPoint(L.latLng(geoA[1], geoA[0]));
    var b = map.latLngToContainerPoint(L.latLng(geoB[1], geoB[0]));

    var coords = [];
    var geoStack = [geoB, geoA];
    var stack = [b, a];
    var fractionStack = [1, 0];
    var fractions = {};
    var maxIterations = 1000;
    var geoM;
    var m;
    var fracA;
    var fracB;
    var fracM;
    var key;

    while (--maxIterations > 0 && fractionStack.length > 0) {
      // Pop the a coordinate off the stack
      fracA = fractionStack.pop();
      geoA = geoStack.pop();
      a = stack.pop();

      // Add the a coordinate if it has not been added yet
      key = fracA.toString();
      if (!fractions[key]) {
        coords.push(a);
        fractions[key] = true;
      }

      // Pop the b coordinate off the stack
      fracB = fractionStack.pop();
      geoB = geoStack.pop();
      b = stack.pop();

      // Find the m point between the a and b coordinates
      fracM = (fracA + fracB) / 2;
      geoM = interpolate(fracM);
      m = map.latLngToContainerPoint(L.latLng(geoM[1], geoM[0]));

      if (L.LineUtil.pointToSegmentDistance(m, a, b) < tolerance){
        // If the m point is sufficiently close to the straight line, then we
        // discard it.  Just use the b coordinate and move on to the next line
        // segment.
        coords.push(b);
        key = fracB.toString();
        fractions[key] = true;
      }
      else {
        // Otherwise, we need to subdivide the current line segment.  Split it
        // into two and push the two line segments onto the stack.
        fractionStack.push(fracB, fracM, fracM, fracA);
        stack.push(b, m, m, a);
        geoStack.push(geoB, geoM, geoM, geoA);
      }
    }
    return coords;
  },


  // Determine if a point lies inside a polygon
  // This is used to check if a point lies outside the clipping region.
  // vs is an array of 2d points [[x,y],,,]
  _inside: function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0];
    var y = point[1];
    var i;

    var inside = false;
    for (i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  },


  // Draw the grid.
  // We compute, in the current grid interval, a bounding box that contains the map view.
  // Then we draw vertical and horizontal grid lines for that box.
  // Then we optionally label the left and right axis, taking care to avoid colliding labels.
  // Then we optionally label each grid square in its bottom left corner.
  _draw: function() {

    var canvas = this._canvas;
    var map = this._map;

    if (L.Browser.canvas && map && ((map.getZoom() >= this.options.minZoom))) {

      var spacing = this._calcInterval();
      var proj = this.options.proj4ProjDef
      var ctx = canvas.getContext("2d");

      //set up canvas for drawing and writing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setLineDash([3, 2]);
      ctx.lineWidth = this.options.weight;
      ctx.strokeStyle = this.options.color;
      ctx.fillStyle = this.options.fontColor;

      if (this.options.font) {
        ctx.font = this.options.font;
      }
      var txtWidth = ctx.measureText("0").width;
      var txtHeight;
      var _font_frags = ctx.font.split(" ");
      var i;
      for (i=0; i < _font_frags.length; i+=1) {
        txtHeight = parseInt(_font_frags[i], 10);
        if (!isNaN(txtHeight)) {
          break;
        }
      }

      // get bounds of map corners in grid projection
      var mapB = map.getBounds();
      var mapSW = mapB.getSouthWest();
      var mapNE = mapB.getNorthEast();
      var mapNW = mapB.getNorthWest();
      var mapSE = mapB.getSouthEast();
      var mapSWg = proj4(proj).forward([mapSW.lng, mapSW.lat]);
      var mapNEg = proj4(proj).forward([mapNE.lng, mapNE.lat]);
      var mapNWg = proj4(proj).forward([mapNW.lng, mapNW.lat]);
      var mapSEg = proj4(proj).forward([mapSE.lng, mapSE.lat]);

      //also the middles of the sides of the map
      var mapSMg = proj4(proj).forward([mapB.getCenter().lng, mapB.getSouth()]);
      var mapNMg = proj4(proj).forward([mapB.getCenter().lng, mapB.getNorth()]);
      var mapWMg = proj4(proj).forward([mapB.getWest(), mapB.getCenter().lat]);
      var mapEMg = proj4(proj).forward([mapB.getEast(), mapB.getCenter().lat,]);

      // extend grid bounds to enclose the map corners
      var grdWx = Math.min(mapSWg[0], mapNWg[0]);
      var grdEx = Math.max(mapSEg[0], mapNEg[0]);
      var grdSy = Math.min(mapSWg[1], mapSEg[1]);
      var grdNy = Math.max(mapNWg[1], mapNEg[1]);

      // extend grid bounds to enclose the middles of the sides
      grdWx = Math.min(mapWMg[0], grdWx);
      grdEx = Math.max(mapEMg[0], grdEx);
      grdSy = Math.min(mapSMg[1], grdSy);
      grdNy = Math.max(mapNMg[1], grdNy);

      // round up/down based on the spacing
      grdWx = Math.floor(grdWx / spacing) * spacing;
      grdSy = Math.floor(grdSy / spacing) * spacing;
      grdEx = Math.ceil(grdEx / spacing) * spacing;
      grdNy = Math.ceil(grdNy / spacing) * spacing;

      var canvasClipBounds = null;
      if (this.options.clip) {
        // if any of the corners of our grid are outside the clip path then we need to clip
        // must do this before restricting to grid bounds

        var swInClip = this._inside([grdWx, grdSy], this.options.clip);
        var seInClip = this._inside([grdEx, grdSy], this.options.clip);
        var neInClip = this._inside([grdEx, grdNy], this.options.clip);
        var nwInClip = this._inside([grdWx, grdNy], this.options.clip);

        if ((!swInClip) || (!seInClip) || (!neInClip) || (!nwInClip)){
          this._setClip(ctx);
        }
      }
      else if (this.options.latLonClipBounds) {
        canvasClipBounds = this._setLLClipBounds(ctx, map);
      }

      // Limit to grid bounds. We don't need to draw anything
      // if the map is way outside the area of the grid.
      if (grdWx < this.options.bounds[0][0]) {
        grdWx = Math.floor(this.options.bounds[0][0] / spacing) * spacing;
      }
      if (grdWx > this.options.bounds[1][0]) {
        return; // left of grid > east limit
      }
      if (grdEx > this.options.bounds[1][0]) {
        grdEx = Math.ceil(this.options.bounds[1][0] / spacing) * spacing;
      }
      if (grdEx < this.options.bounds[0][0]) {
        return; // right of grid < west limit
      }
      if (grdSy < this.options.bounds[0][1]) {
        grdSy = Math.floor(this.options.bounds[0][1] / spacing) * spacing;
      }
      if (grdSy > this.options.bounds[1][1]) {
        return; // south of grid > north limit
      }
      if (grdNy > this.options.bounds[1][1]) {
        grdNy = Math.ceil(this.options.bounds[1][1] / spacing) * spacing;
      }
      if (grdNy < this.options.bounds[0][1]) {
        return; // north of grid < south limit
      }

      var ww = canvas.width;
      var hh = canvas.height;

      // now draw lines
      var d = spacing;
      var d2 = d / 2;

      // Verticals of constant Eastings
      var h = grdNy - grdSy;
      for (x = grdWx; x <= grdEx; x += d) {

        // interpolate northings from top to bottom
        function _interpolateY (frac) {
          return proj4(proj).inverse([x, grdNy - (frac * h)]);
        }

        var pts = this._getPoints(_interpolateY, 1.0, map)

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      }

      // Horizontals of constant Northings
      var w = grdEx - grdWx;
      for (y = grdSy; y <= grdNy; y += d) {

        // interpolate eastings from right to left
        function _interpolateX (frac) {
          return proj4(proj).inverse([grdEx - (frac * w), y]);
        }

        var pts = this._getPoints(_interpolateX, 1.0, map)

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      }

      // Now the axis labels
      // We label the West and South axis at grid croosings that are on screen.
      // We label in the middle of the vertical or horizontal edge of a grid square,
      // like the OS do on their printed maps. This means the labels never collide.

      ctx.fillStyle=this.options.color; // for rub out
      var rubWidth = this.options.weight * 3;

      // Eastings axis labels
      if (this.options.showAxisLabels.indexOf(d) >= 0) {
        for (x = grdWx; x <= grdEx; x += d) {
          for (y = grdSy; y <= grdNy; y += d) {

            var ll = proj4(proj).inverse([x, y+d2]); // middle of vertical square edge
            var s = map.latLngToContainerPoint(L.latLng(ll[1], ll[0])); // screen point

            // check on screen and within grid bounds
            if ((s.x > 0) && (s.y < hh) && (x < this.options.bounds[1][0])) {

              if (this.options.clip) {
                if (!this._inside([x, y+d2], this.options.clip)) {
                  continue;
                }
              }
              else if (this.options.latLonClipBounds) {
                if (!canvasClipBounds.contains([s.x, s.y])) {
                  continue;
                }
              }

              var eStr = this._format_eastings(x, d);
              txtWidth = ctx.measureText(eStr).width;

              // rub out the bit of the grid line the text will be over
              ctx.globalCompositeOperation = "destination-out";
              ctx.fillRect(s.x - (rubWidth/2), s.y-txtHeight, rubWidth, txtHeight * 1.2);
              ctx.globalCompositeOperation = "source-over";

              ctx.fillText(eStr, s.x - (txtWidth / 2), s.y);
              break;
            }
          }
        }
      }

      // Northings axis labels
      if (this.options.showAxisLabels.indexOf(d) >= 0) {
        for (y = grdSy; y <= grdNy; y += d) {
          for (x = grdWx; x <= grdEx; x += d) {

            var ll = proj4(proj).inverse([x+d2, y]); // middle of horizontal square edge
            var s = map.latLngToContainerPoint(L.latLng(ll[1], ll[0])); // screen point

            // check on screen and within grid bounds
            if ((s.x > 0) && (s.y < hh) && (y < this.options.bounds[1][1])) {

              if (this.options.clip) {
                if (!this._inside([x+d2, y], this.options.clip)) {
                  continue;
                }
              }
              else if (this.options.latLonClipBounds) {
                if (!canvasClipBounds.contains([s.x, s.y])) {
                  continue;
                }
              }

              var nStr = this._format_northings(y, d);
              txtWidth = ctx.measureText(nStr).width;

              // rub out the bit of the grid line the text will be over
              ctx.globalCompositeOperation = "destination-out";
              ctx.fillRect(s.x - txtWidth * 0.1, s.y - (rubWidth/2), txtWidth * 1.2, rubWidth);
              ctx.globalCompositeOperation = "source-over";

              ctx.fillText(nStr, s.x, s.y + (txtHeight / 2));
              break;
            }
          }
        }
      }

      // Grid Square labels in bottom left of each square, with a 2px padding
      var str;
      if (this.options.showSquareLabels.indexOf(d) >= 0) {
        for (y = grdSy; y <= grdNy; y += d) {
          for (x = grdWx; x <= grdEx; x += d) {

            var ll = proj4(proj).inverse([x, y]); // bottom left corner of grid square
            var s = map.latLngToContainerPoint(L.latLng(ll[1], ll[0]));

            // check on screen and within grid bounds
            if ((s.x > 0) && (s.y < hh) && (x < this.options.bounds[1][0]) && (y < this.options.bounds[1][1])) {
              var nStr = this._format_northings(y, d);
              var eStr = this._format_eastings(x, d);
              var sq = this.options.hundredKmSquareFunc(x, y);
              str = sq;
              if (d < 100000) {
                str += eStr + nStr;
              }
              ctx.fillText(str, s.x + 2, s.y - 2);
            }
          }
        }
      }
    }
  },

});

// instance factory
L.metricGrid = function (options) {
  return new L.MetricGrid(options);
};

/** Definitions for a British Grid - EPSG code 27700
 * Clip path avoids overlaying L.IrishGrid.
 */
L.BritishGrid = L.MetricGrid.extend({

  options: {
    proj4ProjDef: "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs",
    bounds: [[0, 0] , [700000, 1300000]],
    clip: [[0, 0], [700000, 0], [700000, 1300000], [0, 1300000], [0, 700000],
      [100000, 650000], [150000, 600000],  [190000, 550000], [200000, 500000], [200000, 400000],[0,0]],
    hundredKmSquareFunc: function(e, n) {
      var osgbGridSquares =  // index by  Northing kM / 100, Easting kM / 100
        [
          ["SV","SW","SX","SY","SZ","TV","TW"],
          ["SQ","SR","SS","ST","SU","TQ","TR"],
          ["SL","SM","SN","SO","SP","TL","TM"],
          ["SF","SG","SH","SJ","SK","TF","TG"],
          ["SA","SB","SC","SD","SE","TA","TB"],
          ["SV","NW","NX","NY","NZ","OV","OW"],
          ["NQ","NR","NS","NT","NU","OQ","OR"],
          ["NL","NM","NN","NO","NP","OL","OM"],
          ["NF","NG","NH","NJ","NK","OF","OG"],
          ["NA","NB","NC","ND","NE","OA","OB"],
          ["HV","HW","HX","HY","HZ","JV","JW"],
          ["HQ","HR","HS","HT","HU","JQ","JR"],
          ["HL","HM","HN","HO","HP","JL","JM"]
        ];
      var eSq = Math.floor(e / 100000);
      var nSq = Math.floor(n / 100000);
      return ((eSq < 7) && (nSq < 13) && (eSq >= 0) && (nSq >= 0)) ? osgbGridSquares[nSq][eSq] : "--";
    }
  }
});

// instance factory
L.britishGrid = function (options) {
  return new L.BritishGrid(options);
};

/** Definitions for a Irish Grid - EPSG code 29903 (TM75)
 * Clip path avoids overlaying L.BritishGrid
 */
L.IrishGrid = L.MetricGrid.extend({

  options: {
    proj4ProjDef: "+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=1.000035 +x_0=200000 +y_0=250000 +ellps=mod_airy +towgs84=482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15 +uni+units=m +no_defs",
    bounds: [[0, 0] , [500000, 500000]],
    clip: [
      [0, 0],
      [290000, 0],
      [370000, 300000],
      [370000, 400000],
      [310000, 460000],
      [200000, 500000],
      [0, 500000],
      [0, 0]],
    hundredKmSquareFunc: function(e, n) {
      var    irishGridSquares = // index by Easting kM / 100, Northing kM / 100
        [
          ["V", "Q", "L", "F", "A"],
          ["W", "R", "M", "G", "B"],
          ["X", "S", "N", "H", "C"],
          ["Y", "T", "O", "J", "D"],
          ["Z", "U", "P", "K", "E"]
        ];
      var eSq = Math.floor(e / 100000);
      var nSq = Math.floor(n / 100000);
      return ((eSq < 5) && (nSq < 5) && (eSq >= 0) && (nSq >= 0)) ? irishGridSquares[eSq][nSq] : "--";
    }
  }
});

// instance factory
L.irishGrid = function (options) {
  return new L.IrishGrid(options);
};

/** Definitions for UTM grid
 */

L.UtmGrid = L.MetricGrid.extend({

  options: {
    bounds: [[100000, 0] , [900000, 9400000]]
  },

  initialize: function(zone, bSouth, options) {

    options.proj4ProjDef = "+proj=utm +zone=" + zone + " +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
    if (bSouth) {
      options.proj4ProjDef += " +south";
      options.bounds = [[100000, 600000] , [900000, 10000000]];
    }

    options.hundredKmSquareFunc = function(e, n) {

      var r = "";

      // 100kM square UTM Easting letters, standard treatment (NIMA 8358.1 Appx B3)

      var UTMEast = [
        "ABCDEFGH", // zones 1,4, ...,   -400, -300, -200, -100, 0, 100, 200, 300 kM
        "JKLMNPQR", // zones 2,5, ...,
        "STUVWXYZ"  // zones 3,6, ...,
      ];

      // 100kM square UTM Northing letters, standard treatment (NIMA 8358.1 Appx B3)
      // repeat every 2000 kM
      // start at A at 0 Lat and go forwards for northern hemisphere
      // start at V at 0 Lat and go backwards for southern hemisphere

      var UTMNorthGroup1 =
        [
          "ABCDEFGHJKLMNPQRSTUV", // odd numbered zones
          "FGHJKLMNPQRSTUVABCDE"  // even numbered zones
        ];

      var x = Math.floor(e / 100000);
      var y = Math.floor(n / 100000);
      var z = zone - 1;

      if (bSouth) {
        y -= 100;
      }

      if ((x >= 1) && (x <= 8)) {
        r  = UTMEast[z % 3].charAt(x - 1);
      }
      else {
        r = '-';
      }

      if (y >= 0) {
        r += UTMNorthGroup1[z % 2].charAt(y % 20);// Northern Hemisphere
      }
      else {
        r += UTMNorthGroup1[z  % 2].charAt(19+((y+1) % 20));// Southern Hemisphere
      }
      return r;
    }

    L.setOptions(this, options);
  }

});

// instance factory
// constructor params are UTM zone 1..60 and boolean true for southern hemisphere
L.utmGrid = function (zone, bSouth, options) {
  return new L.UtmGrid(zone, bSouth, options);
};


/***/ }),

/***/ "./src/app/_util/leaflet/tiles.ts":
/*!****************************************!*\
  !*** ./src/app/_util/leaflet/tiles.ts ***!
  \****************************************/
/*! exports provided: fallbackLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fallbackLayer", function() { return fallbackLayer; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_src_core_Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet/src/core/Util */ "./node_modules/leaflet/src/core/Util.js");
/* harmony import */ var leaflet_src_core_Browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet/src/core/Browser */ "./node_modules/leaflet/src/core/Browser.js");



// tile image order:
// 1. locally stored tile images (url)
// 2. internet tiles (fallbackTileUrl)
// 3. assets missing tile image (errorTileUrl)
// TODO: prevent 404 on image URL (stackoverflow.com/questions/9893886/prevent-image-load-errors-going-to-the-javascript-console)
var _fallbackTileLayer = leaflet__WEBPACK_IMPORTED_MODULE_0__["TileLayer"].extend({
    createTile: function (coords, done) {
        var _tile = leaflet__WEBPACK_IMPORTED_MODULE_0__["TileLayer"].prototype.createTile.call(this, coords, done);
        // html attributes are strings
        _tile.setAttribute('cx', coords.x);
        _tile.setAttribute('cy', coords.y);
        _tile.setAttribute('cz', coords.z);
        _tile.setAttribute('state', 'default');
        return _tile;
    },
    // override
    _tileOnError: function (done, tile, e) {
        var _tileState = tile.getAttribute('state');
        var _tileCoords = {
            x: tile.getAttribute('cx'),
            y: tile.getAttribute('cy'),
            z: tile.getAttribute('cz')
        };
        if (_tileState === 'default') {
            tile.setAttribute('state', 'fallback');
            tile.src = this.updateTileUrl(_tileCoords, this.options.fallbackTileUrl);
        }
        else if (_tileState === 'fallback') {
            tile.setAttribute('state', 'error');
            tile.src = this.options.errorTileUrl;
        }
        done(e, tile);
    },
    updateTileUrl: function (coords, url) {
        var data = {
            r: leaflet_src_core_Browser__WEBPACK_IMPORTED_MODULE_2__["retina"] ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }
        return leaflet_src_core_Util__WEBPACK_IMPORTED_MODULE_1__["template"](url, leaflet_src_core_Util__WEBPACK_IMPORTED_MODULE_1__["extend"](data, this.options));
    }
});
function fallbackLayer(url, options) {
    return new _fallbackTileLayer(url, options);
}


/***/ }),

/***/ "./src/app/_util/math.ts":
/*!*******************************!*\
  !*** ./src/app/_util/math.ts ***!
  \*******************************/
/*! exports provided: isPrime, distanceInMilesFeet, getClosestPointOnLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrime", function() { return isPrime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceInMilesFeet", function() { return distanceInMilesFeet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestPointOnLine", function() { return getClosestPointOnLine; });
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
// is a number a prime number?

function isPrime(number) {
    for (var i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return number !== 1 && number !== 0;
}
// convert meters to miles/feet
function distanceInMilesFeet(distanceMeters, force) {
    if (force === void 0) { force = ''; }
    var _distance;
    var _unit;
    if (distanceMeters / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__["environment"].MILE >= 0.1 && force !== 'ft' || force === 'mi') {
        // show in miles
        _distance = Number((distanceMeters / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__["environment"].MILE).toFixed(2));
        _unit = 'mi.';
    }
    else {
        // show in feet
        _distance = Number((distanceMeters / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__["environment"].FOOT).toFixed(0));
        _unit = 'ft.';
    }
    return { distance: _distance, unit: _unit };
}
/* find a point on a line segment nearest to a point */
// based on: https://stackoverflow.com/questions/32281168/find-a-point-on-a-line-closest-to-a-third-point-javascript
function getClosestPointOnLine(point, lineSegment) {
    var minDist;
    var fTo;
    var fFrom;
    var latitude;
    var longitude;
    var i;
    var dist;
    if (lineSegment.length > 1) {
        for (var n = 1; n < lineSegment.length; n++) {
            if (lineSegment[n].latitude !== lineSegment[n - 1].latitude) {
                var a = (lineSegment[n].longitude - lineSegment[n - 1].longitude) / (lineSegment[n].latitude - lineSegment[n - 1].latitude);
                var b = lineSegment[n].longitude - a * lineSegment[n].latitude;
                dist = Math.abs(a * point.latitude + b - point.longitude) / Math.sqrt(a * a + 1);
            }
            else {
                dist = Math.abs(point.latitude - lineSegment[n].latitude);
            }
            var rl2 = Math.pow(lineSegment[n].longitude - lineSegment[n - 1].longitude, 2) + Math.pow(lineSegment[n].latitude - lineSegment[n - 1].latitude, 2);
            var ln2 = Math.pow(lineSegment[n].longitude - point.longitude, 2) + Math.pow(lineSegment[n].latitude - point.latitude, 2);
            var lnm12 = Math.pow(lineSegment[n - 1].longitude - point.longitude, 2) + Math.pow(lineSegment[n - 1].latitude - point.latitude, 2);
            var dist2 = Math.pow(dist, 2);
            // calculated length^2 of line segment
            var calcrl2 = ln2 - dist2 + lnm12 - dist2;
            // redefine minimum distance to line segment (not infinite line) if necessary
            if (calcrl2 > rl2) {
                dist = Math.sqrt(Math.min(ln2, lnm12));
            }
            if (minDist == null || minDist > dist) {
                if (calcrl2 > rl2) {
                    if (lnm12 < ln2) {
                        fTo = 0; //nearer to previous point
                        fFrom = 1;
                    }
                    else {
                        fFrom = 0; //nearer to current point
                        fTo = 1;
                    }
                }
                else {
                    // perpendicular from point intersects line segment
                    fTo = ((Math.sqrt(lnm12 - dist2)) / Math.sqrt(rl2));
                    fFrom = ((Math.sqrt(ln2 - dist2)) / Math.sqrt(rl2));
                }
                minDist = dist;
                i = n;
            }
        }
        var dx = lineSegment[i - 1].latitude - lineSegment[i].latitude;
        var dy = lineSegment[i - 1].longitude - lineSegment[i].longitude;
        latitude = lineSegment[i - 1].latitude - (dx * fTo);
        longitude = lineSegment[i - 1].longitude - (dy * fTo);
    }
    // console.log({'latitude': latitude, 'longitude': longitude, 'i': i, 'fTo': fTo, 'fFrom': fFrom});
    return { latitude: latitude, longitude: longitude };
}


/***/ }),

/***/ "./src/app/_util/poi.ts":
/*!******************************!*\
  !*** ./src/app/_util/poi.ts ***!
  \******************************/
/*! exports provided: getPoiTypeByType, getMajorPoiTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoiTypeByType", function() { return getPoiTypeByType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMajorPoiTypes", function() { return getMajorPoiTypes; });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../settings */ "./src/app/settings.ts");

// since poiType is an array, we'll have to filter subobjects to select one by type
function getPoiTypeByType(type) {
    var _pois = _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].POITYPES;
    var result = _pois.filter(function (poi) {
        return poi['type'] === type;
    });
    return result[0]; // only return first
}
// get all poi types that are considered major (and therefor visible on elevation profile)
function getMajorPoiTypes() {
    var _result = [];
    _settings__WEBPACK_IMPORTED_MODULE_0__["Settings"].POITYPES.forEach(function (poi) {
        if (poi.isMajor) {
            _result.push(poi.type);
        }
    });
    return _result;
}


/***/ }),

/***/ "./src/app/_util/save.ts":
/*!*******************************!*\
  !*** ./src/app/_util/save.ts ***!
  \*******************************/
/*! exports provided: saveFileAs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFileAs", function() { return saveFileAs; });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);

// save file as, only works for desktop, used for generating data files (admin only)
function saveFileAs(data, filename) {
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(blob, filename);
}


/***/ }),

/***/ "./src/app/_util/smooth-line.ts":
/*!**************************************!*\
  !*** ./src/app/_util/smooth-line.ts ***!
  \**************************************/
/*! exports provided: svgPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgPath", function() { return svgPath; });
// TODO: currently unused, would add another calculation
// The smoothing ratio
var smoothing = 0.025;
// Properties of a line
var line = function (pointA, pointB) {
    var lengthX = pointB[0] - pointA[0];
    var lengthY = pointB[1] - pointA[1];
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};
// Position of a control point
var controlPoint = function (current, previous, next, reverse) {
    if (reverse === void 0) { reverse = false; }
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    var p = previous || current;
    var n = next || current;
    // Properties of the opposed-line
    var o = line(p, n);
    // If is end-control-point, add PI to the angle to go backward
    var angle = o.angle + (reverse ? Math.PI : 0);
    var length = o.length * smoothing;
    // The control point position is relative to the current point
    var x = current[0] + Math.cos(angle) * length;
    var y = current[1] + Math.sin(angle) * length;
    return [x, y];
};
// Create the bezier curve command
var bezierCommand = function (point, i, a) {
    // start control point
    var cps = controlPoint(a[i - 1], a[i - 2], point);
    // end control point
    var cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return "C " + cps[0] + "," + cps[1] + " " + cpe[0] + "," + cpe[1] + " " + point[0] + "," + point[1];
};
// Render the svg <path> element
function svgPath(points) {
    // build the d attributes by looping over the points
    var d = points.reduce(function (acc, point, i, a) { return i === 0
        ? "M " + point[0] + "," + point[1]
        : acc + " " + bezierCommand(point, i, a); }, '');
    return d;
}


/***/ }),

/***/ "./src/app/_util/snow.ts":
/*!*******************************!*\
  !*** ./src/app/_util/snow.ts ***!
  \*******************************/
/*! exports provided: parseSnow, reverseSnow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSnow", function() { return parseSnow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseSnow", function() { return reverseSnow; });
/* harmony import */ var _type_snow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../type/snow */ "./src/app/type/snow.ts");

var SnowPivot = /** @class */ (function () {
    function SnowPivot() {
    }
    return SnowPivot;
}());
// from source file
var SnowLocation = /** @class */ (function () {
    function SnowLocation() {
    }
    return SnowLocation;
}());
function parseSnow(snow, trailId, abbr, version) {
    if (!snow || snow.length === 0) {
        return;
    }
    var _returnObj = new _type_snow__WEBPACK_IMPORTED_MODULE_0__["Snow"]();
    _returnObj.trailId = trailId;
    _returnObj.version = version;
    _returnObj.abbr = abbr;
    var _snowPivots = [];
    // starting at 1 for a comparison with the previous point
    for (var i = 1; i < snow.length; i++) {
        // get pivots (no snow/snow & snow/no-snow)
        if (i === 0 && snow[i].y > 0) {
            // snow at start of trail
            _snowPivots.push({ label: 'start', location: snow[i] });
        }
        else if (snow[i].y > 0 && snow[i - 1].y === 0) {
            // start of snowlevel
            _snowPivots.push({ label: 'start', location: snow[i - 1] });
        }
        else if (snow[i - 1].y > 0 && snow[i].y === 0) {
            // end of snow level
            _snowPivots.push({ label: 'end', location: snow[i] });
        }
        else if (i === snow.length - 1 && snow[i].y > 0) {
            // snow at end of trail
            _snowPivots.push({ label: 'end', location: snow[i] });
        }
    }
    var _snowMiles = [];
    // calculate snowlevel elevation line
    for (var s = 0; s < _snowPivots.length; s += 2) {
        var _mileNr = Math.floor(_snowPivots[s].location.x);
        // the total distance of this snow patch
        var _distance = _snowPivots[s + 1].location.x - _snowPivots[s].location.x;
        // the elevation change between the start and end of snowpatch
        var _levelChange = Math.abs(_snowPivots[s].location.elev - _snowPivots[s + 1].location.elev);
        // distance to next full mile (if snow starts at mi 37.7, = 0.3)
        var _nextFullMileDist = Math.ceil(_snowPivots[s].location.x) - _snowPivots[s].location.x;
        _nextFullMileDist = +_nextFullMileDist.toFixed(2); // rounding
        // set start point and end point for start mile
        if (!_snowMiles[_mileNr]) {
            _snowMiles[_mileNr] = [];
        }
        _snowMiles[_mileNr].push({ distance: _nextFullMileDist, elevation: _snowPivots[s].location.elev }, { distance: 1, elevation: _snowPivots[s].location.elev + ((_nextFullMileDist / _distance) * _levelChange) });
        var _miles = _nextFullMileDist;
        // set start / end points for miles in distance
        while (Number(_miles.toFixed(2)) < _distance - _nextFullMileDist - 1) {
            _miles++;
            // start point for next mile
            _snowMiles[_mileNr + _miles - _nextFullMileDist] = [
                { distance: 0, elevation: _snowPivots[s].location.elev + (((_miles - 1) / _distance) * _levelChange) },
                { distance: 1, elevation: _snowPivots[s].location.elev + (((_miles) / _distance) * _levelChange) }
            ];
        }
        // set start / end point for end mile
        _snowMiles[Math.floor(_snowPivots[s + 1].location.x)] = [
            new _type_snow__WEBPACK_IMPORTED_MODULE_0__["Snowpoint"](0, _snowPivots[s].location.elev + (((_miles) / _distance) * _levelChange)),
            new _type_snow__WEBPACK_IMPORTED_MODULE_0__["Snowpoint"](Number((_distance - _miles).toFixed(2)), _snowPivots[s + 1].location.elev)
        ];
    }
    _returnObj.snowMiles = _snowMiles;
    return _returnObj;
}
function reverseSnow(snow, trailLength) {
    // sobo reverse snow
    // snow.snowMiles.reverse();
    var _newSnowArray = [];
    snow.snowMiles.forEach(function (snowMile, index) {
        if (snowMile) {
            snowMile.reverse();
            snowMile.forEach(function (point) {
                if (point) {
                    point.distance = Math.abs(point.distance - 1);
                }
            });
        }
        _newSnowArray[trailLength - index] = snowMile;
    });
    snow.snowMiles = _newSnowArray;
    return snow;
}


/***/ }),

/***/ "./src/app/_util/timer.ts":
/*!********************************!*\
  !*** ./src/app/_util/timer.ts ***!
  \********************************/
/*! exports provided: TimerObj, setTimeOut, pauseTimeOut, resumeTimeOut, clearTimeOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerObj", function() { return TimerObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeOut", function() { return setTimeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pauseTimeOut", function() { return pauseTimeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resumeTimeOut", function() { return resumeTimeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTimeOut", function() { return clearTimeOut; });
var TimerObj = /** @class */ (function () {
    function TimerObj(id, runTime, action, startTime, timeRemaining) {
        this.id = id;
        this.runTime = runTime;
        this.action = action;
        this.startTime = (startTime) ? startTime : new Date().getTime();
        this.timeRemaining = timeRemaining;
    }
    return TimerObj;
}());

// timeout in miliseconds, returns id, start-time
function setTimeOut(runTime, action) {
    var _id = setTimeout(function () {
        action();
    }, runTime);
    return new TimerObj(_id, runTime, action);
}
// clearing the current timeout but setting the remaining time
function pauseTimeOut(timerObj) {
    var _currentTime = new Date().getTime();
    clearTimeout(timerObj.id);
    timerObj.timeRemaining = timerObj.runTime - (_currentTime - timerObj.startTime);
    timerObj.startTime = null;
    return timerObj;
}
// resumes the timeOut (creating a new timeout for the remaining time)
function resumeTimeOut(timerObj) {
    return setTimeOut(timerObj.timeRemaining, timerObj.action);
}
// clear timer
function clearTimeOut(timerObj) {
    if (timerObj) {
        if (timerObj.id) {
            clearTimeout(timerObj.id);
        }
        timerObj.action();
    }
    timerObj = null;
}


/***/ }),

/***/ "./src/app/_util/trail-meta.ts":
/*!*************************************!*\
  !*** ./src/app/_util/trail-meta.ts ***!
  \*************************************/
/*! exports provided: setTrailMetaData, getTrailsMetaData, getTrailMetaDataById, getTrailMetaDataByAbbr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTrailMetaData", function() { return setTrailMetaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTrailsMetaData", function() { return getTrailsMetaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTrailMetaDataById", function() { return getTrailMetaDataById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTrailMetaDataByAbbr", function() { return getTrailMetaDataByAbbr; });
var trails;
// set
function setTrailMetaData(data) {
    trails = data;
}
// get all
function getTrailsMetaData() {
    return trails;
}
// get a trailmeta object based on the trail id (does not have to equal the array index)
function getTrailMetaDataById(id) {
    if (!trails) {
        throw new Error('no trails available!');
    }
    for (var key in trails) {
        if (trails[key].id === id) {
            return trails[key];
        }
    }
    throw new Error('Trail not found!');
}
// trail meta does not contain a name, it does contain abbr.
function getTrailMetaDataByAbbr(abbr) {
    if (!trails) {
        throw new Error('no trails available!');
    }
    return trails[abbr];
}


/***/ }),

/***/ "./src/app/_util/trail.ts":
/*!********************************!*\
  !*** ./src/app/_util/trail.ts ***!
  \********************************/
/*! exports provided: normalizeElevation, calculateOHLC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeElevation", function() { return normalizeElevation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateOHLC", function() { return calculateOHLC; });
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
// TODO: find all usages of this routine (or similar) there are a bunch
// normalizes elevation within a range (converts a value in feet to a y position in pixels)

// normalize the elevation based on the hieght of the container (so that the max elevation matches the container height)
function normalizeElevation(containerHeight, elevation, min, range, padding) {
    var _halfMile = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__["environment"].MILE / 2;
    if (range < _halfMile / 2) {
        var _difference = _halfMile / 2 - range;
        range = _halfMile;
        elevation += _difference / 3;
    }
    elevation = (elevation - (min - padding)) / (range + (padding * 2));
    // invert as svg draws from top left
    elevation = Math.abs(elevation - 1);
    return Math.round(elevation * containerHeight);
}
// calculate elevation range
function calculateOHLC(data, range, identifier, nested) {
    if (identifier === void 0) { identifier = 'elevation'; }
    if (nested === void 0) { nested = true; }
    // select sub data set to use for calculations
    var _subArr = data.slice(range['start'], range['end']);
    return _ohlc(_subArr);
}
// calculate ohlc of single data point?
function _ohlc(waypoints) {
    // calculate OHLC
    var _open = Number(waypoints[0].elevation);
    var _high = Number(_open);
    var _low = Number(_open);
    var _close = Number(waypoints[waypoints.length - 1].elevation);
    var _length = waypoints.length; // speed
    for (var i = 0; i < _length; i++) {
        var _waypoint = waypoints[i];
        var _elevation = Number(_waypoint.elevation);
        if (_elevation > _high) {
            _high = _elevation;
        }
        else if (_elevation < _low) {
            _low = _elevation;
        }
    }
    return { open: _open, high: _high, low: _low, close: _close };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _component_mile_detail_mile_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/mile-detail/mile-detail.component */ "./src/app/component/mile-detail/mile-detail.component.ts");
/* harmony import */ var _component_elevation_profile_elevation_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/elevation-profile/elevation-profile.component */ "./src/app/component/elevation-profile/elevation-profile.component.ts");
/* harmony import */ var _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./service/sequential-resolver.service */ "./src/app/service/sequential-resolver.service.ts");
/* harmony import */ var _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/admin/admin.component */ "./src/app/component/admin/admin.component.ts");



// component


// resolvers


// // TODO: temp, iOS navigation error...
// export function handleErrors(error: NavigationError):void {
//   console.log('app routing error');
// }
var routes = [
    {
        path: 'elevation-profile',
        component: _component_elevation_profile_elevation_profile_component__WEBPACK_IMPORTED_MODULE_4__["ElevationProfileComponent"],
        resolve: {
            data: _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_5__["SequentialResolverService"]
        }
    },
    {
        path: 'detail/:id',
        component: _component_mile_detail_mile_detail_component__WEBPACK_IMPORTED_MODULE_3__["MileDetailComponent"],
        resolve: {
            data: _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_5__["SequentialResolverService"]
        }
    },
    {
        path: '',
        redirectTo: 'elevation-profile',
        pathMatch: 'full'
    },
    // {
    //   path: '*',
    //   redirectTo: 'elevation-profile',
    // },
    {
        path: 'admin',
        component: _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_6__["AdminComponent"],
        resolve: {
            data: _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_5__["SequentialResolverService"]
        }
    }
];
// , errorHandler: handleErrors
var AppRoutingModule = /** @class */ (function () {
    // STARTUP
    function AppRoutingModule(_router) {
        this._router = _router;
        // iOS router error testing
        _router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationStart"]) {
                // Show loading indicator
            }
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                // Hide loading indicator
            }
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationError"]) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { onSameUrlNavigation: 'ignore', useHash: false, enableTracing: false })
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fa-sampler></fa-sampler>\n<router-outlet>\n  <loader-overlay [showLoader]=\"showLoader\" #loader></loader-overlay>\n  <navigation-component [ngClass]=\"(navIsVisible) ? 'showNav' : 'hideNav'\" (navEvent)=\"onNavEvent($event)\" [appInitialized]=\"initialized\"></navigation-component>\n</router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.sass":
/*!************************************!*\
  !*** ./src/app/app.component.sass ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .showNav {\n  margin-top: 0;\n  visibility: visible;\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  transition: visibility 200ms linear, margin-top 100ms ease-out; }\n\n:host .hideNav {\n  margin-top: -400px;\n  visibility: hidden;\n  transition: visibility 200ms linear, margin-top 100ms ease-in; }\n\n:host .hidden {\n  display: none;\n  visibility: hidden; }\n\n:host::ng-deep .note:not(.multiple) {\n  color: rgba(95, 83, 73, 0.85); }\n\n:host::ng-deep .fa-marker {\n  color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUVHLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsMkJBQW1CO1VBQW5CLG1CQUFtQjtFQUNuQiw4REFBOEQsRUFBQTs7QUFMakU7RUFRRyxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLDZEQUE2RCxFQUFBOztBQVZoRTtFQWFHLGFBQWE7RUFDYixrQkFBa0IsRUFBQTs7QUFFckI7RUFHRyw2QkFBNkIsRUFBQTs7QUFIaEM7RUFNRyxZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuICAuc2hvd05hdiB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAyMDBtcyBsaW5lYXIsIG1hcmdpbi10b3AgMTAwbXMgZWFzZS1vdXQ7IH1cblxuICAuaGlkZU5hdiB7XG4gICAgbWFyZ2luLXRvcDogLTQwMHB4O1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDIwMG1zIGxpbmVhciwgbWFyZ2luLXRvcCAxMDBtcyBlYXNlLWluOyB9XG5cbiAgLmhpZGRlbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH0gfVxuXG4gOmhvc3Q6Om5nLWRlZXAge1xuXG4gIC5ub3RlOm5vdCgubXVsdGlwbGUpIHtcbiAgICBjb2xvcjogcmdiYSg5NSwgODMsIDczLCAwLjg1KTsgfVxuXG4gIC5mYS1tYXJrZXIge1xuICAgIGNvbG9yOiB3aGl0ZTsgfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _component_dialog_settings_dialog_settings_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/dialog/settings-dialog/settings-dialog.component */ "./src/app/component/dialog/settings-dialog/settings-dialog.component.ts");
/* harmony import */ var _component_dialog_marker_dialog_marker_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/dialog/marker-dialog/marker-dialog.component */ "./src/app/component/dialog/marker-dialog/marker-dialog.component.ts");
/* harmony import */ var _service_location_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service/location.service */ "./src/app/service/location.service.ts");
/* harmony import */ var _component_dialog_offtrail_dialog_offtrail_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/dialog/offtrail-dialog/offtrail-dialog.component */ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_filesystem_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./service/filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_connection_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./service/connection.service */ "./src/app/service/connection.service.ts");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./base/base/base.component */ "./src/app/base/base/base.component.ts");













var AppComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AppComponent, _super);
    function AppComponent(_route, _fileSystemService, _dialog, _loaderService, _element, _injector, _localStorage, _connectionService) {
        var _this = _super.call(this) || this;
        _this._route = _route;
        _this._fileSystemService = _fileSystemService;
        _this._dialog = _dialog;
        _this._loaderService = _loaderService;
        _this._element = _element;
        _this._injector = _injector;
        _this._localStorage = _localStorage;
        _this._connectionService = _connectionService;
        _this.showLoader = true; // show loader/spinner by default
        _this.navIsVisible = true; // nav visibility
        // makes constructor props accessible through LocationService, needed for inheritance
        _service_location_service__WEBPACK_IMPORTED_MODULE_6__["LocationService"].injector = _this._injector;
        return _this;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _self = this;
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            console.log('running on mobile device:', navigator.userAgent);
            this.addEventListener(document, 'deviceready', function () {
                _self._onReady();
                _self.removeEventListener(document, 'deviceready');
            });
        }
        else {
            console.log('debugging in browser');
            this._onReady();
        }
        // loader (spinner)
        this.addSubscription('loaderService', this._loaderService.observe.subscribe(function (obj) {
            _this.showLoader = (obj['type'] === 'self') ? (obj['action'] === 'show') : _this.showLoader;
            if (obj['action'] === 'hide') {
                _this.initialized = true;
            }
        }));
        // show settings on first load
        var _firstRun = this._localStorage.retrieve('firstRun');
        if (_firstRun) {
            this._localStorage.store('firstRun', false);
            var timeOut = setTimeout(function () {
                _self._openSettingsDialog();
            }, 250);
        }
        this._connectionService.startTracking();
        this.addEventListener(this._element.nativeElement, ['markerClick', 'offtrail'], this._onDialogEvent.bind(this), false);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this._connectionService.stopTracking();
    };
    // STARTUP
    AppComponent.prototype._onReady = function () {
        // reload on storage timestamp change (user settings changed that require a reload)
        this.addSubscription('reload', this._localStorage.observe('timestamp').subscribe(function (value) {
            window.location.reload();
        }));
    };
    // EVENT HANDLERS
    // angular event handler for navEvents (public for aot)
    AppComponent.prototype.onNavEvent = function (event) {
        if (event === 'settings') {
            this._openSettingsDialog();
        }
    };
    // on marker click (using standard events as angular events don't bubble)
    AppComponent.prototype._onDialogEvent = function (event) {
        // destination reached
        event.stopImmediatePropagation();
        event.stopPropagation();
        this._forceHideNavigation();
        if (event.type === 'offtrail') {
            this._openOfftrailDialog(event);
        }
        else {
            this._openMarkerDialog(event);
        }
    };
    // DIALOGS
    // marker dialog
    AppComponent.prototype._openMarkerDialog = function (event) {
        if (this._markerDialog) {
            this._markerDialog.close();
        }
        this._markerDialog = this._dialog.open(_component_dialog_marker_dialog_marker_dialog_component__WEBPACK_IMPORTED_MODULE_5__["MarkerDialogComponent"], {
            autoFocus: false, width: '85%', height: '75%', data: event.detail
        });
        this._onDialogClose(this._markerDialog, 'markerClosed_' + event.detail.id);
    };
    // settings dialog
    AppComponent.prototype._openSettingsDialog = function () {
        var _this = this;
        this._forceHideNavigation();
        var _settingsDialog = this._dialog.open(_component_dialog_settings_dialog_settings_dialog_component__WEBPACK_IMPORTED_MODULE_4__["SettingsDialogComponent"], {
            autoFocus: false, width: '85%', height: '75%', data: { icon: 'cog' }
        });
        this._onDialogClose(_settingsDialog, 'settingsClosed', function (result) {
            if (result) {
                _this._loaderService.showOverlay();
                _this._localStorage.store('timestamp', new Date().getTime());
            }
        });
    };
    // off trail dialog (mile simulator)
    AppComponent.prototype._openOfftrailDialog = function (event) {
        var _this = this;
        this._offtrailDialog = this._dialog.open(_component_dialog_offtrail_dialog_offtrail_dialog_component__WEBPACK_IMPORTED_MODULE_7__["OfftrailDialogComponent"], {
            panelClass: 'offtrail-dialog', autoFocus: false, width: '50%', height: '75%%', data: event.detail
        });
        this._onDialogClose(this._offtrailDialog, 'offtrailClosed', function (result) {
            if (result) {
                _this._localStorage.store('simulatedMile', Number(result.simulatedMile));
            }
            var _simulate = !!(result);
            _this._injector.get(_service_location_service__WEBPACK_IMPORTED_MODULE_6__["LocationService"]).toggleTracking(_simulate);
        });
    };
    AppComponent.prototype._onDialogClose = function (dialog, name, callback) {
        var _this = this;
        this.addSubscription(name, dialog.afterClosed().subscribe(function (result) {
            console.log('close');
            _this._toggleNavigationVisibility(true);
            if (callback) {
                callback(result);
            }
            _this.removeSubscription(name);
            dialog = null;
        }));
    };
    AppComponent.prototype._forceHideNavigation = function () {
        if (this.navIsVisible) {
            this._toggleNavigationVisibility(false);
        }
    };
    AppComponent.prototype._toggleNavigationVisibility = function (visible) {
        this.navIsVisible = visible;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('loader', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"])
    ], AppComponent.prototype, "loader", void 0);
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.sass */ "./src/app/app.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            _service_filesystem_service__WEBPACK_IMPORTED_MODULE_9__["FilesystemService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _service_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_8__["LocalStorageService"],
            _service_connection_service__WEBPACK_IMPORTED_MODULE_11__["ConnectionService"]])
    ], AppComponent);
    return AppComponent;
}(_base_base_base_component__WEBPACK_IMPORTED_MODULE_12__["BaseComponent"]));



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/esm5/radio.es5.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm5/checkbox.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _ngmodule_material_carousel__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngmodule/material-carousel */ "./node_modules/@ngmodule/material-carousel/fesm5/ngmodule-material-carousel.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./base/location-based/location-based.component */ "./src/app/base/location-based/location-based.component.ts");
/* harmony import */ var _component_elevation_profile_virtual_list_list_item_list_item_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./component/elevation-profile/virtual-list/list-item/list-item.component */ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.ts");
/* harmony import */ var _component_elevation_profile_elevation_profile_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./component/elevation-profile/elevation-profile.component */ "./src/app/component/elevation-profile/elevation-profile.component.ts");
/* harmony import */ var _component_mile_detail_mile_detail_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./component/mile-detail/mile-detail.component */ "./src/app/component/mile-detail/mile-detail.component.ts");
/* harmony import */ var _component_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./component/navigation/navigation.component */ "./src/app/component/navigation/navigation.component.ts");
/* harmony import */ var _component_elevation_profile_virtual_list_virtual_list_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./component/elevation-profile/virtual-list/virtual-list.component */ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.ts");
/* harmony import */ var _component_elevation_profile_scrollbar_scrollbar_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./component/elevation-profile/scrollbar/scrollbar.component */ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.ts");
/* harmony import */ var _component_elevation_profile_virtual_list_labels_labels_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./component/elevation-profile/virtual-list/labels/labels.component */ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.ts");
/* harmony import */ var _component_elevation_profile_virtual_list_guides_guides_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./component/elevation-profile/virtual-list/guides/guides.component */ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.ts");
/* harmony import */ var _component_navigation_locator_locator_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./component/navigation/locator/locator.component */ "./src/app/component/navigation/locator/locator.component.ts");
/* harmony import */ var _component_poi_list_poi_list_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./component/poi-list/poi-list.component */ "./src/app/component/poi-list/poi-list.component.ts");
/* harmony import */ var _component_poi_list_poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./component/poi-list/poi-list-item/poi-list-item.component */ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.ts");
/* harmony import */ var _component_poi_list_poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./component/poi-list/poi-user-item/poi-user-item.component */ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.ts");
/* harmony import */ var _component_leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./component/leaflet-map/leaflet-map.component */ "./src/app/component/leaflet-map/leaflet-map.component.ts");
/* harmony import */ var _component_poi_list_dynamic_item_dynamic_item_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./component/poi-list/dynamic-item/dynamic-item.component */ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.ts");
/* harmony import */ var _component_dialog_offtrail_dialog_offtrail_dialog_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./component/dialog/offtrail-dialog/offtrail-dialog.component */ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_purchase_settings_purchase_settings_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component */ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_general_settings_general_settings_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/general-settings/general-settings.component */ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_about_about_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/about/about.component */ "./src/app/component/dialog/settings-dialog/panels/about/about.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_instructions_instructions_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/instructions/instructions.component */ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.ts");
/* harmony import */ var _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./base/settings-panel/settings-panel.component */ "./src/app/base/settings-panel/settings-panel.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_trail_settings_downloader_downloader_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.ts");
/* harmony import */ var _component_loader_overlay_loader_overlay_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./component/loader-overlay/loader-overlay.component */ "./src/app/component/loader-overlay/loader-overlay.component.ts");
/* harmony import */ var _component_fa_sampler_fa_sampler_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./component/fa-sampler/fa-sampler.component */ "./src/app/component/fa-sampler/fa-sampler.component.ts");
/* harmony import */ var _component_fa_sampler_fa_icon_fa_icon_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./component/fa-sampler/fa-icon/fa-icon.component */ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.ts");
/* harmony import */ var _base_icon_icon_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./base/icon/icon.component */ "./src/app/base/icon/icon.component.ts");
/* harmony import */ var _base_button_button_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./base/button/button.component */ "./src/app/base/button/button.component.ts");
/* harmony import */ var _component_navigation_settings_settings_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./component/navigation/settings/settings.component */ "./src/app/component/navigation/settings/settings.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_trail_settings_trail_settings_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/trail-settings/trail-settings.component */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.ts");
/* harmony import */ var _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./component/admin/admin.component */ "./src/app/component/admin/admin.component.ts");
/* harmony import */ var _component_poi_list_user_indicator_user_indicator_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./component/poi-list/user-indicator/user-indicator.component */ "./src/app/component/poi-list/user-indicator/user-indicator.component.ts");
/* harmony import */ var _component_dialog_marker_dialog_marker_dialog_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./component/dialog/marker-dialog/marker-dialog.component */ "./src/app/component/dialog/marker-dialog/marker-dialog.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_settings_dialog_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./component/dialog/settings-dialog/settings-dialog.component */ "./src/app/component/dialog/settings-dialog/settings-dialog.component.ts");
/* harmony import */ var _pipe_poi_sorting_pipe__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./pipe/poi-sorting.pipe */ "./src/app/pipe/poi-sorting.pipe.ts");
/* harmony import */ var _pipe_distance_pipe__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./pipe/distance.pipe */ "./src/app/pipe/distance.pipe.ts");
/* harmony import */ var _pipe_filesize_pipe__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./pipe/filesize.pipe */ "./src/app/pipe/filesize.pipe.ts");
/* harmony import */ var _component_dialog_marker_dialog_rating_rating_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./component/dialog/marker-dialog/rating/rating.component */ "./src/app/component/dialog/marker-dialog/rating/rating.component.ts");
/* harmony import */ var _component_leaflet_map_elements_popup_popup_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./component/leaflet-map/elements/popup/popup.component */ "./src/app/component/leaflet-map/elements/popup/popup.component.ts");
/* harmony import */ var _angular_elements__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @angular/elements */ "./node_modules/@angular/elements/fesm5/elements.js");
/* harmony import */ var _component_dialog_note_dialog_note_dialog_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./component/dialog/note-dialog/note-dialog.component */ "./src/app/component/dialog/note-dialog/note-dialog.component.ts");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./base/base/base.component */ "./src/app/base/base/base.component.ts");
/* harmony import */ var _component_dialog_settings_dialog_panels_user_settings_user_settings_component__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./component/dialog/settings-dialog/panels/user-settings/user-settings.component */ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.ts");
/* harmony import */ var _component_dialog_marker_dialog_rating_elements_current_score_current_score_component__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./component/dialog/marker-dialog/rating/elements/current-score/current-score.component */ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.ts");
/* harmony import */ var _component_dialog_marker_dialog_rating_elements_add_score_add_score_component__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./component/dialog/marker-dialog/rating/elements/add-score/add-score.component */ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.ts");







// font awesome





// material


















// component































// dialog


// pipes











var AppModule = /** @class */ (function () {
    function AppModule(_injector) {
        this._injector = _injector;
        // Register custom element(s)
        var _popupElement = Object(_angular_elements__WEBPACK_IMPORTED_MODULE_67__["createCustomElement"])(_component_leaflet_map_elements_popup_popup_component__WEBPACK_IMPORTED_MODULE_66__["PopupComponent"], { injector: _injector });
        customElements.define('leaflet-element-popup', _popupElement);
        if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["isDevMode"])()) {
            console.log('\n');
            console.log('***** ***** ***** ***** ***** ***** ***** *****');
            console.log('RUNNING IN DEV MODE, CHECK ENVIRONMENT SETTINGS');
            console.log('***** ***** ***** ***** ***** ***** ***** *****');
            console.log('\n');
        }
        // font awesome library
        _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_8__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faLongArrowAltUp"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faLongArrowAltDown"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCampground"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCog"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faLocationArrow"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faHotel"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faStreetView"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faPenAlt"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faArrowLeft"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faRoad"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMapMarkerAlt"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTint"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTree"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_10__["faCompass"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCar"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTrain"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faDoorOpen"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMapMarkedAlt"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faHouseDamage"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faBolt"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faStore"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faBoxOpen"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faUtensils"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faInfo"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMapSigns"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faQuestionCircle"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faFlag"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faStar"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faDownload"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCity"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faStarHalfAlt"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_10__["faDotCircle"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faExclamationTriangle"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faHiking"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_10__["faArrowAltCircleDown"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faAngleRight"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faPlus"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faSnowflake"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faGem"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMapPin"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_10__["faStar"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faAtlas"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMountain"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faSpinner"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTrash"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faSkull"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCircle"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faChevronDown"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faChevronUp"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTimes"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faParking"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faShoePrints"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faLock"]);
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_29__["LocationBasedComponent"],
                _base_button_button_component__WEBPACK_IMPORTED_MODULE_55__["ButtonComponent"],
                _component_fa_sampler_fa_icon_fa_icon_component__WEBPACK_IMPORTED_MODULE_53__["FaIconComponent"],
                _base_icon_icon_component__WEBPACK_IMPORTED_MODULE_54__["IconComponent"],
                _component_loader_overlay_loader_overlay_component__WEBPACK_IMPORTED_MODULE_51__["LoaderOverlayComponent"],
                _component_fa_sampler_fa_sampler_component__WEBPACK_IMPORTED_MODULE_52__["FaSamplerComponent"],
                _component_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_33__["NavigationComponent"],
                _component_navigation_locator_locator_component__WEBPACK_IMPORTED_MODULE_38__["LocatorComponent"],
                _component_elevation_profile_elevation_profile_component__WEBPACK_IMPORTED_MODULE_31__["ElevationProfileComponent"],
                _component_mile_detail_mile_detail_component__WEBPACK_IMPORTED_MODULE_32__["MileDetailComponent"],
                _component_elevation_profile_virtual_list_list_item_list_item_component__WEBPACK_IMPORTED_MODULE_30__["ListItemComponent"],
                _component_elevation_profile_virtual_list_virtual_list_component__WEBPACK_IMPORTED_MODULE_34__["VirtualListComponent"],
                _component_elevation_profile_scrollbar_scrollbar_component__WEBPACK_IMPORTED_MODULE_35__["ScrollbarComponent"],
                _component_elevation_profile_virtual_list_labels_labels_component__WEBPACK_IMPORTED_MODULE_36__["LabelsComponent"],
                _component_elevation_profile_virtual_list_guides_guides_component__WEBPACK_IMPORTED_MODULE_37__["GuidesComponent"],
                _component_dialog_settings_dialog_settings_dialog_component__WEBPACK_IMPORTED_MODULE_61__["SettingsDialogComponent"],
                _component_dialog_marker_dialog_marker_dialog_component__WEBPACK_IMPORTED_MODULE_60__["MarkerDialogComponent"],
                _component_dialog_offtrail_dialog_offtrail_dialog_component__WEBPACK_IMPORTED_MODULE_44__["OfftrailDialogComponent"],
                _component_poi_list_poi_list_component__WEBPACK_IMPORTED_MODULE_39__["PoiListComponent"],
                _component_leaflet_map_leaflet_map_component__WEBPACK_IMPORTED_MODULE_42__["LeafletMapComponent"],
                _pipe_poi_sorting_pipe__WEBPACK_IMPORTED_MODULE_62__["PoiSortingPipe"],
                _pipe_distance_pipe__WEBPACK_IMPORTED_MODULE_63__["DistancePipe"],
                _pipe_filesize_pipe__WEBPACK_IMPORTED_MODULE_64__["FilesizePipe"],
                _component_poi_list_poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_41__["PoiUserItemComponent"],
                _component_poi_list_poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_40__["PoiListItemComponent"],
                _component_poi_list_dynamic_item_dynamic_item_component__WEBPACK_IMPORTED_MODULE_43__["DynamicItemComponent"],
                _component_dialog_settings_dialog_panels_purchase_settings_purchase_settings_component__WEBPACK_IMPORTED_MODULE_45__["PurchaseSettingsComponent"],
                _component_dialog_settings_dialog_panels_general_settings_general_settings_component__WEBPACK_IMPORTED_MODULE_46__["GeneralSettingsComponent"],
                _component_dialog_settings_dialog_panels_about_about_component__WEBPACK_IMPORTED_MODULE_47__["AboutComponent"],
                _component_dialog_settings_dialog_panels_instructions_instructions_component__WEBPACK_IMPORTED_MODULE_48__["InstructionsComponent"],
                _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_49__["SettingsPanelComponent"],
                _component_dialog_settings_dialog_panels_trail_settings_downloader_downloader_component__WEBPACK_IMPORTED_MODULE_50__["DownloaderComponent"],
                _component_navigation_settings_settings_component__WEBPACK_IMPORTED_MODULE_56__["SettingsComponent"],
                _component_dialog_settings_dialog_panels_trail_settings_trail_settings_component__WEBPACK_IMPORTED_MODULE_57__["TrailSettingsComponent"],
                _component_admin_admin_component__WEBPACK_IMPORTED_MODULE_58__["AdminComponent"],
                _component_poi_list_user_indicator_user_indicator_component__WEBPACK_IMPORTED_MODULE_59__["UserIndicatorComponent"],
                _component_dialog_marker_dialog_rating_rating_component__WEBPACK_IMPORTED_MODULE_65__["RatingComponent"],
                _component_leaflet_map_elements_popup_popup_component__WEBPACK_IMPORTED_MODULE_66__["PopupComponent"],
                _component_dialog_note_dialog_note_dialog_component__WEBPACK_IMPORTED_MODULE_68__["NoteDialogComponent"],
                _base_base_base_component__WEBPACK_IMPORTED_MODULE_69__["BaseComponent"],
                _component_dialog_settings_dialog_panels_user_settings_user_settings_component__WEBPACK_IMPORTED_MODULE_70__["UserSettingsComponent"],
                _component_dialog_marker_dialog_rating_elements_current_score_current_score_component__WEBPACK_IMPORTED_MODULE_71__["CurrentScoreComponent"],
                _component_dialog_marker_dialog_rating_elements_add_score_add_score_component__WEBPACK_IMPORTED_MODULE_72__["AddScoreComponent"]
            ],
            entryComponents: [
                _component_dialog_settings_dialog_settings_dialog_component__WEBPACK_IMPORTED_MODULE_61__["SettingsDialogComponent"],
                _component_dialog_marker_dialog_marker_dialog_component__WEBPACK_IMPORTED_MODULE_60__["MarkerDialogComponent"],
                _component_dialog_offtrail_dialog_offtrail_dialog_component__WEBPACK_IMPORTED_MODULE_44__["OfftrailDialogComponent"],
                _component_poi_list_poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_41__["PoiUserItemComponent"],
                _component_poi_list_poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_40__["PoiListItemComponent"],
                _component_leaflet_map_elements_popup_popup_component__WEBPACK_IMPORTED_MODULE_66__["PopupComponent"],
                _component_dialog_note_dialog_note_dialog_component__WEBPACK_IMPORTED_MODULE_68__["NoteDialogComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ngx_webstorage__WEBPACK_IMPORTED_MODULE_28__["NgxWebstorageModule"].forRoot(),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_13__["ScrollingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinnerModule"],
                _angular_material_dialog__WEBPACK_IMPORTED_MODULE_14__["MatDialogModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_16__["MatSelectModule"],
                _angular_material_radio__WEBPACK_IMPORTED_MODULE_17__["MatRadioModule"],
                _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_18__["MatCheckboxModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_19__["MatCardModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_20__["MatButtonModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_15__["MatListModule"],
                _angular_material_core__WEBPACK_IMPORTED_MODULE_21__["MatRippleModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__["MatIconModule"],
                _angular_material_form_field__WEBPACK_IMPORTED_MODULE_22__["MatFormFieldModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_23__["MatInputModule"],
                _ngmodule_material_carousel__WEBPACK_IMPORTED_MODULE_24__["MatCarouselModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_26__["MatSnackBarModule"],
                _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_27__["MatProgressBarModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_4__["Injector"]])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/base/base/base.component.html":
/*!***********************************************!*\
  !*** ./src/app/base/base/base.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/base/base/base.component.sass":
/*!***********************************************!*\
  !*** ./src/app/base/base/base.component.sass ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Jhc2UvYmFzZS9iYXNlLmNvbXBvbmVudC5zYXNzIn0= */"

/***/ }),

/***/ "./src/app/base/base/base.component.ts":
/*!*********************************************!*\
  !*** ./src/app/base/base/base.component.ts ***!
  \*********************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EventListenerObj = /** @class */ (function () {
    function EventListenerObj(target, type, listener, options) {
        if (options === void 0) { options = false; }
        this.target = target;
        this.type = type;
        this.listener = listener;
        this.options = options;
    }
    return EventListenerObj;
}());
var SubscriptionObj = /** @class */ (function () {
    function SubscriptionObj(name, subscription) {
        this.name = name;
        this.subscription = subscription;
    }
    return SubscriptionObj;
}());
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
        this._eventListeners = {};
        this._subscriptions = {};
    }
    BaseComponent.prototype.ngOnDestroy = function () {
        this._removeAllEventListeners();
        this._removeAllSubscriptions();
    };
    // SUBSCRIPTIONS MANAGER
    BaseComponent.prototype.addSubscription = function (name, subscription) {
        if (this._subscriptions.hasOwnProperty(name)) {
            throw new Error('Subscription with name ' + name + ' already exists!');
        }
        this._subscriptions[name] = new SubscriptionObj(name, subscription);
    };
    // remove subscription by name
    BaseComponent.prototype.removeSubscription = function (name) {
        if (this._subscriptions.hasOwnProperty(name)) {
            var _subscription = this._subscriptions[name];
            _subscription.subscription.unsubscribe();
            _subscription.subscription = null;
            delete this._subscriptions[name];
            _subscription = null;
        }
    };
    BaseComponent.prototype._removeAllSubscriptions = function () {
        for (var key in this._subscriptions) {
            var _subscriptionObj = this._subscriptions[key];
            this.removeSubscription(_subscriptionObj.name);
            _subscriptionObj = null;
        }
        this._subscriptions = null;
    };
    // EVENTS MANAGER
    // add an event listener (allows for multiple types per target)
    BaseComponent.prototype.addEventListener = function (target, type, listener, options) {
        if (options === void 0) { options = false; }
        // check if target is DOM element
        if (!this._isDOMElement(target)) {
            throw new Error('Can not add event, target is not a DOM element');
        }
        if (typeof type === 'string') {
            type = [type];
        }
        for (var i = 0; i < type.length; i++) {
            var _uniqueName = target.tagName + '_' + type[i];
            // check if eventlistener already exists
            if (this._eventListeners.hasOwnProperty(_uniqueName)) {
                throw new Error('Event listener for ' + type[i] + ' already exists on ' + target.tagName);
            }
            this._eventListeners[_uniqueName] = new EventListenerObj(target, type[i], listener, options);
            target.addEventListener(type[i], listener, options);
        }
    };
    // remove event listers (allows multiple types per target)
    BaseComponent.prototype.removeEventListener = function (target, type) {
        var _uniqueName = target.tagName + '_' + type;
        if (this._eventListeners.hasOwnProperty(_uniqueName)) {
            var _eventListenerObj = this._eventListeners[_uniqueName];
            _eventListenerObj.target.removeEventListener(_eventListenerObj.type, _eventListenerObj.listener, _eventListenerObj.options);
            delete this._eventListeners[_uniqueName];
            _eventListenerObj = null;
        }
    };
    BaseComponent.prototype._removeAllEventListeners = function () {
        for (var key in this._eventListeners) {
            var _eventListenerObj = this._eventListeners[key];
            this.removeEventListener(_eventListenerObj.target, _eventListenerObj.type);
            _eventListenerObj = null;
        }
        this._eventListeners = null;
    };
    BaseComponent.prototype._isDOMElement = function (element) {
        return element instanceof Element || element instanceof HTMLDocument;
    };
    BaseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-base',
            template: __webpack_require__(/*! ./base.component.html */ "./src/app/base/base/base.component.html"),
            styles: [__webpack_require__(/*! ./base.component.sass */ "./src/app/base/base/base.component.sass")]
        })
        /* base component:
        - manages subscriptions
        - manages event listeners */
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BaseComponent);
    return BaseComponent;
}());



/***/ }),

/***/ "./src/app/base/button/button.component.html":
/*!***************************************************!*\
  !*** ./src/app/base/button/button.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button>\n  <display-icon *ngIf=\"this.poiTypes\" [data]=\"this.poiTypes\"></display-icon>\n  <fa-layers [fixedWidth]=\"true\">\n    <fa-icon *ngIf=\"this.icon\" [icon]=\"icon\" size=\"2x\" [classes]=\"['icon']\"></fa-icon>\n    <fa-icon *ngIf=\"this.badge && this.badge !== 'spinner'\" [icon]=\"badge\" size=\"2x\" [classes]=\"['badge']\"></fa-icon>\n    <fa-icon *ngIf=\"this.badge && this.badge === 'spinner'\" icon=\"spinner\" size=\"2x\" [classes]=\"['spinner']\" [pulse]=\"true\"></fa-icon>\n  </fa-layers>\n</button>\n"

/***/ }),

/***/ "./src/app/base/button/button.component.sass":
/*!***************************************************!*\
  !*** ./src/app/base/button/button.component.sass ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button {\n  background-image: unset;\n  user-focus: none;\n  padding: 0 !important;\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0.78+0,0.55+100 */\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.55) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c7ffffff', endColorstr='#8cffffff',GradientType=1 );\n  border-radius: 50%;\n  font-size: 1.5vw;\n  width: 7vw;\n  height: 7vw;\n  margin: 10px 10px 0 0;\n  border: 2px solid white;\n  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.35);\n  -webkit-backdrop-filter: blur(6px);\n          backdrop-filter: blur(6px);\n  outline: none !important;\n  -webkit-transition: opacity 3s ease-in-out;\n    -webkit-transition--moz-transition: opacity 3s ease-in-out;\n    -webkit-transition--ms-transition: opacity 3s ease-in-out;\n    -webkit-transition--o-transition: opacity 3s ease-in-out; }\n  button display-icon {\n    -webkit-filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white);\n            filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white);\n    text-rendering: optimizeLegibility;\n    display: block;\n    width: 100%;\n    height: 100%;\n    padding-top: 22.5%;\n    color: #555; }\n  button fa-icon {\n    -webkit-filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white);\n            filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white);\n    position: absolute;\n    top: 50%;\n    left: -35%;\n    text-rendering: optimizeLegibility;\n    color: #555; }\n  button:focus, button:active {\n  outline: none !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2Jhc2UvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFFaEIscUJBQXFCO0VBRXJCLGdJQUFBO0VBR0EsaUdBQTBGO0VBQzFGLHVIQUF1SDtFQUV2SCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLHVCQUF1QjtFQUd2QixpREFBOEM7RUFDOUMsa0NBQTBCO1VBQTFCLDBCQUEwQjtFQUUxQix3QkFBd0I7RUFFeEIsMENBQTBDO0lBQ3hDLDBEQUF1QztJQUN2Qyx5REFBc0M7SUFDdEMsd0RBQXFDLEVBQUE7RUE1QnpDO0lBZ0NJLDRGQUFpRjtZQUFqRixvRkFBaUY7SUFDakYsa0NBQWtDO0lBQ2xDLGNBQWM7SUFDZCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixXQUFXLEVBQUE7RUF0Q2Y7SUF5Q0ksNEZBQWlGO1lBQWpGLG9GQUFpRjtJQUNqRixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFVBQVU7SUFDVixrQ0FBa0M7SUFDbEMsV0FBVyxFQUFBO0VBR2Y7RUFDRSx3QkFBd0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2Jhc2UvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbImJ1dHRvbiB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVuc2V0OyAgICAgICAvLyBtYXRlcmlhbCBmaXhcbiAgdXNlci1mb2N1czogbm9uZTtcblxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG5cbiAgLyogUGVybWFsaW5rIC0gdXNlIHRvIGVkaXQgYW5kIHNoYXJlIHRoaXMgZ3JhZGllbnQ6IGh0dHA6Ly9jb2xvcnppbGxhLmNvbS9ncmFkaWVudC1lZGl0b3IvI2ZmZmZmZiswLGZmZmZmZisxMDAmMC43OCswLDAuNTUrMTAwICovXG4gIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KC00NWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwLjc4KSAwJSwgcmdiYSgyNTUsMjU1LDI1NSwwLjU1KSAxMDAlKSAvKiBGRjMuNi0xNSAqLztcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDAuNzgpIDAlLHJnYmEoMjU1LDI1NSwyNTUsMC41NSkgMTAwJSkgLyogQ2hyb21lMTAtMjUsU2FmYXJpNS4xLTYgKi87XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMC43OCkgMCUscmdiYSgyNTUsMjU1LDI1NSwwLjU1KSAxMDAlKSAvKiBXM0MsIElFMTArLCBGRjE2KywgQ2hyb21lMjYrLCBPcGVyYTEyKywgU2FmYXJpNysgKi87XG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KCBzdGFydENvbG9yc3RyPScjYzdmZmZmZmYnLCBlbmRDb2xvcnN0cj0nIzhjZmZmZmZmJyxHcmFkaWVudFR5cGU9MSApIC8qIElFNi05IGZhbGxiYWNrIG9uIGhvcml6b250YWwgZ3JhZGllbnQgKi87XG5cbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDEuNXZ3O1xuICB3aWR0aDogN3Z3O1xuICBoZWlnaHQ6IDd2dztcbiAgbWFyZ2luOiAxMHB4IDEwcHggMCAwO1xuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggNXB4IDEwcHggLTVweCByZ2JhKDAsMCwwLDAuMzUpO1xuICAtbW96LWJveC1zaGFkb3c6IDBweCA1cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsMC4zNSk7XG4gIGJveC1zaGFkb3c6IDBweCA1cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsMC4zNSk7XG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpOyAgICAvLyBzYWZhcmkvaU9TIG9ubHksIGNhdXNlcyBnbGl0Y2hpbmcuLi5cblxuICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG5cbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDNzIGVhc2UtaW4tb3V0IHtcbiAgICAtbW96LXRyYW5zaXRpb246IG9wYWNpdHkgM3MgZWFzZS1pbi1vdXQ7XG4gICAgLW1zLXRyYW5zaXRpb246IG9wYWNpdHkgM3MgZWFzZS1pbi1vdXQ7XG4gICAgLW8tdHJhbnNpdGlvbjogb3BhY2l0eSAzcyBlYXNlLWluLW91dDsgfVxuXG5cbiAgZGlzcGxheS1pY29uIHtcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KC0xcHggLTJweCAxcHggcmdiYSgwLDAsMCwwLjEpKSBkcm9wLXNoYWRvdygycHggM3B4IDJweCB3aGl0ZSk7XG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgcGFkZGluZy10b3A6IDIyLjUlO1xuICAgIGNvbG9yOiAjNTU1OyB9XG5cbiAgZmEtaWNvbiB7XG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygtMXB4IC0ycHggMXB4IHJnYmEoMCwwLDAsMC4xKSkgZHJvcC1zaGFkb3coMnB4IDNweCAycHggd2hpdGUpO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiAtMzUlO1xuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gICAgY29sb3I6ICM1NTU7IH0gfVxuXG5cbmJ1dHRvbjpmb2N1cywgYnV0dG9uOmFjdGl2ZSB7XG4gIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDsgfVxuXG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/base/button/button.component.ts":
/*!*************************************************!*\
  !*** ./src/app/base/button/button.component.ts ***!
  \*************************************************/
/*! exports provided: ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return ButtonComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ButtonComponent = /** @class */ (function () {
    // simple button with label & font awesome icon
    function ButtonComponent() {
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ButtonComponent.prototype, "icon", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ButtonComponent.prototype, "badge", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ButtonComponent.prototype, "poiTypes", void 0);
    ButtonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'display-button',
            template: __webpack_require__(/*! ./button.component.html */ "./src/app/base/button/button.component.html"),
            styles: [__webpack_require__(/*! ./button.component.sass */ "./src/app/base/button/button.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ButtonComponent);
    return ButtonComponent;
}());



/***/ }),

/***/ "./src/app/base/icon/icon.component.html":
/*!***********************************************!*\
  !*** ./src/app/base/icon/icon.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"icon noselect fa-2x\">\n  <fa-layers id=\"icons\" [fixedWidth]=\"true\">\n    <fa-icon *ngFor=\"let poiType of data\" [icon]=\"[poiType.iconType, poiType.icon]\"></fa-icon>\n  </fa-layers>\n\n  <!-- star rating -->\n  <!--<fa-layers *ngIf=\"rateable\" id=\"rating\" [fixedWidth]=\"true\">-->\n    <!--<fa-icon icon=\"star\" class=\"fa-icon-star\" size=\"sm\"></fa-icon>-->\n    <!--<fa-layers-text content=\"1\" transform=\"shrink-8\" class=\"fa-icon-star-label\"></fa-layers-text>-->\n  <!--</fa-layers>-->\n\n</div>\n"

/***/ }),

/***/ "./src/app/base/icon/icon.component.sass":
/*!***********************************************!*\
  !*** ./src/app/base/icon/icon.component.sass ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  color: #555; }\n  .icon fa-layers {\n    display: block;\n    margin: 0 auto;\n    pointer-events: none; }\n  .icon fa-icon {\n    pointer-events: none; }\n  .icon #icons fa-icon:first-child:nth-last-child(2), .icon #icons fa-icon:first-child:nth-last-child(2) ~ fa-icon {\n    position: absolute;\n    font-size: 2.2vw; }\n  .icon #icons fa-icon:first-child:nth-last-child(2) {\n    text-align: left;\n    top: 35%;\n    left: 20%; }\n  .icon #icons fa-icon:first-child:nth-last-child(2) ~ fa-icon {\n    text-align: right;\n    left: 40%;\n    bottom: 35%; }\n  .icon #rating {\n    position: absolute;\n    left: 0;\n    bottom: 15%; }\n  .icon #rating .fa-icon-star {\n      color: #e8aa1b !important; }\n  .icon #rating .fa-icon-star-label {\n      color: white !important;\n      font-size: 5vh !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2Jhc2UvaWNvbi9pY29uLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVyxFQUFBO0VBRGI7SUFJSSxjQUFjO0lBQ2QsY0FBYztJQUNkLG9CQUFvQixFQUFBO0VBTnhCO0lBVUksb0JBQW9CLEVBQUE7RUFWeEI7SUFnQk0sa0JBQWtCO0lBQ2xCLGdCQUFnQixFQUFBO0VBakJ0QjtJQW9CTSxnQkFBZ0I7SUFDaEIsUUFBUTtJQUNSLFNBQVMsRUFBQTtFQXRCZjtJQXlCTSxpQkFBaUI7SUFDakIsU0FBUztJQUNULFdBQVcsRUFBQTtFQTNCakI7SUE4Qkksa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxXQUFXLEVBQUE7RUFoQ2Y7TUFtQ00seUJBQXlCLEVBQUE7RUFuQy9CO01Bc0NNLHVCQUF1QjtNQUN2Qix5QkFBeUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2Jhc2UvaWNvbi9pY29uLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiLmljb24ge1xuICBjb2xvcjogIzU1NTtcblxuICBmYS1sYXllcnMge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XG5cbiAgZmEtaWNvbiB7XG4gICAgLy9maWx0ZXI6IGRyb3Atc2hhZG93KC0xcHggLTJweCAxcHggcmdiYSgwLDAsMCwwLjEpKSBkcm9wLXNoYWRvdygycHggM3B4IDJweCB3aGl0ZSk7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cblxuICAjaWNvbnMge1xuXG4gICAgLy8gaWYgMiBpY29uc1xuICAgIGZhLWljb246Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoMiksIGZhLWljb246Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoMikgfiBmYS1pY29uIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGZvbnQtc2l6ZTogMi4ydnc7IH1cblxuICAgIGZhLWljb246Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoMikge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIHRvcDogMzUlO1xuICAgICAgbGVmdDogMjAlOyB9XG5cbiAgICBmYS1pY29uOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKDIpIH4gZmEtaWNvbiB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGxlZnQ6IDQwJTtcbiAgICAgIGJvdHRvbTogMzUlOyB9IH1cblxuICAjcmF0aW5nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDE1JTtcblxuICAgIC5mYS1pY29uLXN0YXIge1xuICAgICAgY29sb3I6ICNlOGFhMWIgIWltcG9ydGFudDsgfVxuXG4gICAgLmZhLWljb24tc3Rhci1sYWJlbCB7XG4gICAgICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgICAgIGZvbnQtc2l6ZTogNXZoICFpbXBvcnRhbnQ7IH0gfSB9XG5cbi8vXG4vLyAgI2ljb25zXG4vL1xuLy8gICAgLy8gaWYgMiBpY29uc1xuLy8gICAgZmEtaWNvbjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZCgyKSwgZmEtaWNvbjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZCgyKSB+IGZhLWljb25cbi8vICAgICAgLy9wb3NpdGlvbjogYWJzb2x1dGVcbi8vICAgICAgYmFzZTogYmxvY2tcbi8vICAgICAgZm9udC1zaXplOiAwLjY1ZW1cbi8vXG4vLyAgICBmYS1pY29uOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKDIpXG4vLyAgICAgIHRleHQtYWxpZ246IGxlZnRcbi8vICAgICAgdG9wOiAyNSVcbi8vICAgICAgbGVmdDogMFxuLy9cbi8vICAgIGZhLWljb246Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoMikgfiBmYS1pY29uXG4vLyAgICAgIHRleHQtYWxpZ246IHJpZ2h0XG4vLyAgICAgIGJvdHRvbTogMjUlXG4vLyAgICAgIHJpZ2h0OiA2NSVcbi8vXG4vL1xuLy8gIC8vI3JhdGluZywgI3VwZGF0ZVxuLy8gIC8vICBwb3NpdGlvbjogcmVsYXRpdmVcbi8vICAvLyAgbWFyZ2luLXRvcDogLTgwJVxuLy8gIC8vXG4vLyAgLy8gIC5mYS1pY29uLXN0YXIsIC5mYS1pY29uLWNvdW50ZXIsIC5mYS1pY29uLXN0YXItbGFiZWxcbi8vICAvL1xuLy8gIC8vICAuZmEtaWNvbi1zdGFyXG4vLyAgLy8gICAgcG9zaXRpb246IGFic29sdXRlXG4vLyAgLy8gICAgY29sb3I6IG9yYW5nZVxuLy8gIC8vICAgIHJpZ2h0OiA1MCVcbi8vICAvLyAgICB0b3A6IDExNSVcbi8vICAvL1xuLy8gIC8vICAuZmEtaWNvbi1zdGFyLWxhYmVsXG4vLyAgLy8gICAgcG9zaXRpb246IGFic29sdXRlXG4vLyAgLy8gICAgcmlnaHQ6IDEwJVxuLy8gIC8vICAgIHRvcDogMTIwJVxuLy8gIC8vXG4vLyAgLy8gIC5mYS1pY29uLWNvdW50ZXJcbi8vICAvLyAgICBwb3NpdGlvbjogYWJzb2x1dGVcbi8vICAvLyAgICB6b29tOiAyMDAlXG4vLyAgLy8gICAgcmlnaHQ6IC0xMCVcbi8vICAvLyAgICB0b3A6IDExMCVcbiJdfQ== */"

/***/ }),

/***/ "./src/app/base/icon/icon.component.ts":
/*!*********************************************!*\
  !*** ./src/app/base/icon/icon.component.ts ***!
  \*********************************************/
/*! exports provided: IconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconComponent", function() { return IconComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var IconComponent = /** @class */ (function () {
    function IconComponent() {
    }
    IconComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data) {
            this._setupIcons();
        }
    };
    IconComponent.prototype._setupIcons = function () {
        var _newRateable;
        var _length = this.data.length;
        for (var i = 0; i < _length; i++) {
            var _poiType = this.data[i];
            if (_poiType.rateable === true) {
                _newRateable = true;
            }
        }
        // only update if needed
        if (_newRateable !== this.rateable) {
            this.rateable = _newRateable;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], IconComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], IconComponent.prototype, "name", void 0);
    IconComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'display-icon',
            template: __webpack_require__(/*! ./icon.component.html */ "./src/app/base/icon/icon.component.html"),
            styles: [__webpack_require__(/*! ./icon.component.sass */ "./src/app/base/icon/icon.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], IconComponent);
    return IconComponent;
}());



/***/ }),

/***/ "./src/app/base/location-based/location-based.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/base/location-based/location-based.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- needed for event dispatching -->\n<div class=\"hidden\" #container></div>\n"

/***/ }),

/***/ "./src/app/base/location-based/location-based.component.sass":
/*!*******************************************************************!*\
  !*** ./src/app/base/location-based/location-based.component.sass ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".hidden {\n  visibility: hidden;\n  display: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2Jhc2UvbG9jYXRpb24tYmFzZWQvbG9jYXRpb24tYmFzZWQuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYmFzZS9sb2NhdGlvbi1iYXNlZC9sb2NhdGlvbi1iYXNlZC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oaWRkZW4ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIGRpc3BsYXk6IG5vbmU7IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/base/location-based/location-based.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/base/location-based/location-based.component.ts ***!
  \*****************************************************************/
/*! exports provided: LocationBasedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationBasedComponent", function() { return LocationBasedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_location_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/location.service */ "./src/app/service/location.service.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _service_filesystem_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _util_generic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_util/generic */ "./src/app/_util/generic.ts");
/* harmony import */ var _base_base_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../base/base.component */ "./src/app/base/base/base.component.ts");









var LocationBasedComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LocationBasedComponent, _super);
    function LocationBasedComponent() {
        var _this = _super.call(this) || this;
        // since we're extending this class, we shouldn't inject through the constructor props
        if (_service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"].injector) {
            _this.locationService = _service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"].injector.get(_service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"]);
            _this.localStorage = _service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"].injector.get(ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"]);
            _this.trailGenerator = _service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"].injector.get(_service_trail_generator_service__WEBPACK_IMPORTED_MODULE_5__["TrailGeneratorService"]);
            _this.fileSystem = _service_location_service__WEBPACK_IMPORTED_MODULE_2__["LocationService"].injector.get(_service_filesystem_service__WEBPACK_IMPORTED_MODULE_6__["FilesystemService"]);
        }
        _this.timestamp = new Date().getTime();
        // create default user
        _this._user = _this.createBlankUser();
        return _this;
    }
    // TEST FUNCTIONS
    // private _hikeMile(mileId: number): void {
    //
    //   const _self = this;
    //   const _steps = this.trailGenerator.getTrailData().miles[mileId].waypoints;
    //   let _stepCount = 0;
    //
    //   const _interval = setInterval(function() {
    //
    //     if (_stepCount < _steps.length) {
    //
    //       const _location = {
    //         coords: {
    //           accuracy: 0,
    //           altitude:  _steps[_stepCount].elevation,
    //           altitudeAccuracy: 0,
    //           heading: 0,
    //           speed: 0,
    //           latitude: _steps[_stepCount].latitude,
    //           longitude: _steps[_stepCount].longitude
    //         },
    //         timestamp: new Date().getTime()
    //       };
    //
    //       _stepCount ++;
    //
    //       _self._onLocationChange(_location as Position);
    //
    //     } else {
    //       clearInterval(_interval);
    //     }
    //   }, 4000);
    //
    // }
    // LIFECYCLE
    LocationBasedComponent.prototype.ngOnInit = function () {
        var _this = this;
        // why attempt location based stuff if there's no location service?
        if (!this.locationService) {
            // throw new Error('location service error!');
            return;
        }
        // set up subscriptions
        this.addSubscription('location', this.locationService.location.subscribe(function (location) {
            if (location) {
                // this._hikeMile(2);
                _this._onLocationChange(location);
            }
        }));
        this.addSubscription('locationStatus', this.locationService.locationStatus.subscribe(function (status) {
            _this.status = status;
            _this.onStatusChange(status);
        }));
        this.addSubscription('centerUser', this.locationService.centerUser.subscribe(function (trigger) {
            if (trigger !== 0) {
                _this.centerOnUser();
            }
        }));
    };
    // EVENTS
    LocationBasedComponent.prototype._onLocationChange = function (location) {
        if (location && this.status !== 'idle') {
            // SET USER
            // waypoint
            this._user.waypoint = {
                latitude: location['coords']['latitude'],
                longitude: location['coords']['longitude'],
                elevation: location['coords']['altitude']
            };
            // mile
            var _waypoint = this.trailGenerator.findNearestPointInMileTree(this._user.waypoint, 1)[0];
            var _mile = this.trailGenerator.getTrailData().miles[_waypoint['belongsTo']];
            this._user.nearestMileId = _mile.id;
            // anchorPoint
            var _nearestAnchorPoint = _waypoint;
            this._user.anchorPoint = _mile.waypoints[_nearestAnchorPoint.key];
            // distance
            this._user.waypoint.distance = _nearestAnchorPoint.distance;
            //toggle warning / mile simulator
            if (this._user.waypoint.distance > this.localStorage.retrieve('maxPoiDistance')
                && this.localStorage.retrieve('simulatedMile') === -1 && !this.localStorage.retrieve('disableSimulation')) {
                var _event = new CustomEvent('offtrail', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        distance: this._user.waypoint.distance,
                        anchorPointDistance: (this._user.anchorPoint.distanceTotal / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE).toFixed(2),
                        trailLength: this.trailGenerator.getTrailData().miles.length
                    }
                });
                if (this.container) {
                    if (this.container.nativeElement) {
                        this.container.nativeElement.dispatchEvent(_event);
                    }
                }
            }
            else {
                this.user = Object(_util_generic__WEBPACK_IMPORTED_MODULE_7__["cloneData"])(this._user);
                this.timestamp = location['timestamp'];
                this.onUserLocationChange(this.user);
            }
        }
    };
    LocationBasedComponent.prototype.onStatusChange = function (status) {
        // OVERRIDE
    };
    LocationBasedComponent.prototype.onUserLocationChange = function (user) {
        // OVERRIDE
    };
    LocationBasedComponent.prototype.centerOnUser = function () {
        // OVERRIDE
    };
    // OTHER
    LocationBasedComponent.prototype.createBlankUser = function () {
        return {
            type: 'user',
            waypoint: undefined,
            anchorPoint: undefined,
            distance: 0,
            nearestMileId: 0,
            id: -1
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('container'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LocationBasedComponent.prototype, "container", void 0);
    LocationBasedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-location-based',
            template: __webpack_require__(/*! ./location-based.component.html */ "./src/app/base/location-based/location-based.component.html"),
            styles: [__webpack_require__(/*! ./location-based.component.sass */ "./src/app/base/location-based/location-based.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LocationBasedComponent);
    return LocationBasedComponent;
}(_base_base_component__WEBPACK_IMPORTED_MODULE_8__["BaseComponent"]));



/***/ }),

/***/ "./src/app/base/settings-panel/settings-panel.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/base/settings-panel/settings-panel.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/base/settings-panel/settings-panel.component.sass":
/*!*******************************************************************!*\
  !*** ./src/app/base/settings-panel/settings-panel.component.sass ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Jhc2Uvc2V0dGluZ3MtcGFuZWwvc2V0dGluZ3MtcGFuZWwuY29tcG9uZW50LnNhc3MifQ== */"

/***/ }),

/***/ "./src/app/base/settings-panel/settings-panel.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/base/settings-panel/settings-panel.component.ts ***!
  \*****************************************************************/
/*! exports provided: SettingsPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPanelComponent", function() { return SettingsPanelComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SettingsPanelComponent = /** @class */ (function () {
    function SettingsPanelComponent() {
        this.onSettingsChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.settingsChanged = false;
    }
    SettingsPanelComponent.prototype.ngOnInit = function () { };
    SettingsPanelComponent.prototype.ngOnDestroy = function () {
        this.onSettingsChanged = null;
        this.validate();
    };
    SettingsPanelComponent.prototype.invalidate = function () {
        this.settingsChanged = true;
        this.validate();
    };
    SettingsPanelComponent.prototype.validate = function () {
        if (this.settingsChanged) {
            this.onSettingsChanged.emit(true);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], SettingsPanelComponent.prototype, "onSettingsChanged", void 0);
    SettingsPanelComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'settings-panel',
            template: __webpack_require__(/*! ./settings-panel.component.html */ "./src/app/base/settings-panel/settings-panel.component.html"),
            styles: [__webpack_require__(/*! ./settings-panel.component.sass */ "./src/app/base/settings-panel/settings-panel.component.sass")]
        })
        // a panel with an invalidate function which triggers a reload of the application
        // used for forms that require an app reload on change
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SettingsPanelComponent);
    return SettingsPanelComponent;
}());



/***/ }),

/***/ "./src/app/base/trail-parser/trail-parser.ts":
/*!***************************************************!*\
  !*** ./src/app/base/trail-parser/trail-parser.ts ***!
  \***************************************************/
/*! exports provided: TrailParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailParser", function() { return TrailParser; });
/* harmony import */ var x2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! x2js */ "./node_modules/x2js/x2js.js");
/* harmony import */ var x2js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(x2js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_geolib_distance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_util/geolib/distance */ "./src/app/_util/geolib/distance.ts");


var TrailParser = /** @class */ (function () {
    function TrailParser() {
        this.totalDistance = 0;
        this.x2js = new x2js__WEBPACK_IMPORTED_MODULE_0__({
            attributePrefix: '' // no attribute prefix
        });
    }
    // the main entry point
    TrailParser.prototype.parse = function (trail, trailData, poiData, snow, towns, direction) {
        // set
        this.trail = trail;
        this.trailData = this.directionReverse(trailData);
        this.poiData = this.directionReverse(poiData);
        this.snow = snow;
        this.direction = direction;
        // defaults
        this.findReplaceArray = [];
        this.totalDistance = 0;
        this._prevPoint = null;
        // auto reverse input data
        if (direction === 1 && Array.isArray(trailData)) {
            trailData.reverse();
        }
    };
    TrailParser.prototype.parseTrail = function (trailData) {
        // override
        return;
    };
    TrailParser.prototype.parsePois = function (pois) {
        // override
        return;
    };
    TrailParser.prototype.parseSnow = function () {
        // override
        return;
    };
    // CONVERTERS
    // converts urls in strings to html hrefs
    TrailParser.prototype.convertStringUrls = function (input) {
        var _regex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
        return input.replace(_regex, function (match) {
            match = match.split(' ').join(''); // remove spaces
            return '<a href="http://' + match.toLowerCase() + '" target="_blank">' + match.toLowerCase() + '</a> ';
        });
    };
    TrailParser.prototype.convertStringTel = function (input) {
        var _regex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img;
        return input.replace(_regex, function (match) {
            var _digits = match.split('-').join('');
            return '<a href="tel:+1' + _digits + '">+1-' + match + '</a>';
        });
    };
    // go from gpx to waypoint before converting to JSON (string manipulation is faster?)
    TrailParser.prototype.convertToWaypointString = function (input) {
        var _length = this.findReplaceArray.length;
        for (var i = 0; i < _length; i++) {
            input = input.split(this.findReplaceArray[i].find).join(this.findReplaceArray[i].replace);
        }
        return input;
    };
    // OTHER
    // set the total distance (the distance on trail) for each waypoint, based on the section scale
    TrailParser.prototype.addDistanceToWaypoints = function (waypoints, scale) {
        var _sectionLength = 0;
        var _length = waypoints.length;
        for (var i = 0; i < _length; i++) {
            var _waypoint = waypoints[i];
            var _distance = 0;
            if (this._prevPoint) {
                _distance = (Object(_util_geolib_distance__WEBPACK_IMPORTED_MODULE_1__["calculateDistance"])(_waypoint, this._prevPoint) * scale);
                _sectionLength += _distance;
                this.totalDistance += _distance;
            }
            _waypoint.distanceTotal = this.totalDistance;
            this._prevPoint = _waypoint;
        }
        return waypoints;
    };
    // reverse data if needed, for sobo
    TrailParser.prototype.directionReverse = function (input) {
        if (this.direction === 1 && Array.isArray(input)) {
            return input.reverse();
        }
        else {
            return input;
        }
    };
    // letting the browser parse it, returning the contents
    TrailParser.prototype.stripHtmlTags = function (input) {
        var _div = document.createElement('');
        _div.innerHTML = input;
        return _div.textContent || _div.innerText || '';
    };
    return TrailParser;
}());



/***/ }),

/***/ "./src/app/component/admin/admin.component.html":
/*!******************************************************!*\
  !*** ./src/app/component/admin/admin.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"container\">\n\n  <h2>Generate data</h2>\n\n  <span>\n    <select [(ngModel)]=\"selectedTrail\">\n      <option *ngFor=\"let trail of trailMeta\" [value]=\"trail.id\">\n        {{trail.abbr}}\n      </option>\n    </select>\n\n    <span> : </span>\n\n    <select  [(ngModel)]=\"selectedDirection\">\n       <option *ngFor=\"let dir of directions\" [value]=\"dir.id\">\n        {{dir.name}}\n      </option>\n    </select>\n\n    <span> : </span>\n\n    <button class=\"{{trailDataStateClassName}}\" (click)=\"generateTrailData()\">Generate Trail Data</button>\n\n  </span>\n  <hr/>\n\n  <div *ngIf=\"trailDataStateClassName !== ''\">\n\n    <h2>Download files</h2>\n\n    <button (click)=\"downloadData('trail')\">Download Trail Data</button>\n    <button (click)=\"downloadData('snow')\">Download Snow Data</button>\n    <button (click)=\"genGpxData()\">Download (clean) GPX file</button>\n    <hr/>\n\n  </div>\n\n  <h2>App data helpers</h2>\n\n  <button (click)=\"safeClearUserData()\">clean user (excl. tiles)</button>\n  <button (click)=\"defaultUserData()\">default user data</button>\n  <button (click)=\"clearStorage()\">clear storage</button>\n  <button (click)=\"reset()\">RESET ALL</button>\n\n  <h2>Communication (requires an internet connection)</h2>\n  <button (click)=\"sendAllNotes()\">Send all notes</button>\n  <button (click)=\"sendAllPins()\">Send all pins</button>\n\n  <h2>Other</h2>\n  <button (click)=\"disableSimulation()\">disable mile simulation</button>\n\n</div>\n"

/***/ }),

/***/ "./src/app/component/admin/admin.component.sass":
/*!******************************************************!*\
  !*** ./src/app/component/admin/admin.component.sass ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #container > * {\n  margin: 10px; }\n\n:host #container {\n  text-align: center;\n  overflow-y: scroll;\n  min-height: 100%;\n  height: 100%; }\n\n:host #container h1, :host #container h2 {\n    text-align: center; }\n\n:host #container button {\n    margin: 4px; }\n\n:host #container button:focus {\n    outline: 0; }\n\n:host #container .generated {\n    background-color: lightgreen; }\n\n:host #container .error {\n    background-color: lightcoral; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9hZG1pbi9hZG1pbi5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLFlBQVksRUFBQTs7QUFIZjtFQU1HLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFlBQVksRUFBQTs7QUFUZjtJQVlLLGtCQUFrQixFQUFBOztBQVp2QjtJQWVLLFdBQVcsRUFBQTs7QUFmaEI7SUFrQkssVUFBVSxFQUFBOztBQWxCZjtJQXFCSyw0QkFBNEIsRUFBQTs7QUFyQmpDO0lBd0JLLDRCQUE0QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2FkbWluL2FkbWluLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcblxuICAjY29udGFpbmVyID4gKiB7XG4gICAgbWFyZ2luOiAxMHB4OyB9XG5cbiAgI2NvbnRhaW5lciB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGgxLCBoMiB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuICAgIGJ1dHRvbiB7XG4gICAgICBtYXJnaW46IDRweDsgfVxuXG4gICAgYnV0dG9uOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IDA7IH1cblxuICAgIC5nZW5lcmF0ZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmVlbjsgfVxuXG4gICAgLmVycm9yIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Y29yYWw7IH0gfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/admin/admin.component.ts":
/*!****************************************************!*\
  !*** ./src/app/component/admin/admin.component.ts ***!
  \****************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_util/trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _service_trail_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/trail.service */ "./src/app/service/trail.service.ts");
/* harmony import */ var _util_save__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_util/save */ "./src/app/_util/save.ts");
/* harmony import */ var _service_filesystem_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../service/filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _util_admin_gpx_tools__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_util/admin/gpx-tools */ "./src/app/_util/admin/gpx-tools.ts");
/* harmony import */ var _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../service/trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../service/sequential-resolver.service */ "./src/app/service/sequential-resolver.service.ts");
/* harmony import */ var _util_generic__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../_util/generic */ "./src/app/_util/generic.ts");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../base/base/base.component */ "./src/app/base/base/base.component.ts");















var AdminComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AdminComponent, _super);
    function AdminComponent(_fileSystemService, _trailService, _trailGeneratorService, _localStorageService, _loaderService, 
    // private _orientationService: OrientationService,
    _sequentialResolver) {
        var _this = _super.call(this) || this;
        _this._fileSystemService = _fileSystemService;
        _this._trailService = _trailService;
        _this._trailGeneratorService = _trailGeneratorService;
        _this._localStorageService = _localStorageService;
        _this._loaderService = _loaderService;
        _this._sequentialResolver = _sequentialResolver;
        _this.selectedTrail = 0;
        _this.selectedDirection = 0;
        _this.trailDataStateClassName = '';
        _this.directions = [
            { id: 0, name: 'nobo' },
            { id: 1, name: 'sobo' }
        ];
        return _this;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _trailMetaObj = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_3__["getTrailsMetaData"])();
        this.trailMeta = Object.keys(_trailMetaObj).map(function (key) {
            return _trailMetaObj[key];
        });
        //
        // this._orientationService.orientationObserver.subscribe(function(direction) {
        //   _self.compass = direction;
        // });
        //
        // this._orientationService.startTracking();
    };
    AdminComponent.prototype.genGpxData = function () {
        var _trailMeta = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_3__["getTrailMetaDataById"])(Number(this.selectedTrail));
        // simplify the track for app: Mobile Atlas Creator
        var _clone = Object(_util_generic__WEBPACK_IMPORTED_MODULE_13__["cloneData"])(this._trailGeneratorService.flatTrailData);
        // 55 gives roughly 3 points per mile (PCT)
        // _clone = this._trailGeneratorService.simplify(_clone, 0.1, true);
        alert(this._trailGeneratorService.flatTrailData.length + ' to ' + _clone.length + ' waypoints');
        var _gpx = Object(_util_admin_gpx_tools__WEBPACK_IMPORTED_MODULE_10__["createGPX"])(_trailMeta, _clone);
        _gpx.forEach(function (file, index) {
            Object(_util_save__WEBPACK_IMPORTED_MODULE_8__["saveFileAs"])(file, _trailMeta.abbr + '_' + index + '.gpx');
        });
    };
    AdminComponent.prototype.generateTrailData = function () {
        var _this = this;
        this.trailDataStateClassName = '';
        this.addSubscription('rawTrailData', this._getRawData().subscribe(function (data) {
            var _trailMeta = data[0];
            var _dataOffset = (_trailMeta.parts) ? _trailMeta.parts - 1 : 0;
            var _waypointData;
            if (_trailMeta.multipart) {
                _waypointData = [];
                for (var i = 0; i <= _dataOffset; i++) {
                    _waypointData.push(data[i + 1]);
                }
            }
            else {
                _waypointData = data[1];
            }
            var _parsedData = _this._trailService.parseTrailData(data[0], _waypointData, data[2 + _dataOffset], data[3 + _dataOffset], data[4 + _dataOffset], Number(_this.selectedDirection));
            _this._generatedData = _parsedData;
            _this.trailDataStateClassName = 'generated';
        }));
    };
    AdminComponent.prototype._getRawData = function () {
        var _this = this;
        this._loaderService.showOverlay();
        return this._trailService.getRawTrailData(Number(this.selectedTrail)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (data) {
            _this._loaderService.hideOverlay();
            if (data) {
                // return parsed trail
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(data);
            }
            else {
                alert('Error!');
                _this.trailDataStateClassName = 'error';
                return;
            }
        }));
    };
    AdminComponent.prototype.downloadData = function (type) {
        var _trailAbbr = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_3__["getTrailMetaDataById"])(Number(this.selectedTrail)).abbr;
        var _direction = this.directions[Number(this.selectedDirection)].name;
        var _fileName = _trailAbbr + '-' + type;
        if (type === 'trail') {
            _fileName += '-' + _direction;
        }
        Object(_util_save__WEBPACK_IMPORTED_MODULE_8__["saveFileAs"])(this._generatedData[type], _fileName + '.json');
    };
    AdminComponent.prototype.clearStorage = function () {
        var _self = this;
        this.trailMeta.forEach(function (meta) {
            _self._fileSystemService.deleteDirectory(meta.abbr, function () {
                console.log(meta.abbr + ' directory deleted');
            });
        });
    };
    // clears all user data with the exception of tile downloaded flags ([abbr]Version)
    AdminComponent.prototype.defaultUserData = function () {
        // clear all
        this._localStorageService.clear();
        // set defaults
        this._sequentialResolver.firstRun();
    };
    AdminComponent.prototype.safeClearUserData = function () {
        var _self = this;
        // get tile settings (don't want to delete those flags as it would require a re-download of all tiles)
        var _tileSettings = {};
        this.trailMeta.forEach(function (meta) {
            _tileSettings[meta.abbr + 'Version'] = _self._localStorageService.retrieve(meta.abbr + 'Version');
        });
        console.log(_tileSettings);
        // clear all
        this._localStorageService.clear();
        // set defaults
        this._sequentialResolver.firstRun();
        this.trailMeta.forEach(function (meta) {
            console.log(_tileSettings[meta.abbr + 'Version']);
            if (_tileSettings[meta.abbr + 'Version'] !== null) {
                _self._localStorageService.store(meta.abbr + 'Version', _tileSettings[meta.abbr + 'Version']);
            }
        });
    };
    AdminComponent.prototype.reset = function () {
        this.clearStorage();
        this.defaultUserData();
    };
    AdminComponent.prototype.disableSimulation = function () {
        var _current = this._localStorageService.retrieve('disableSimulation');
        this._localStorageService.store('disableSimulation', !(_current));
    };
    // TODO: does not work on all devices...
    AdminComponent.prototype.sendAllNotes = function () {
        var _notes = this._localStorageService.retrieve(this._trailGeneratorService.getTrailData().abbr + '_notes');
        window.open('mailto:frankdouwes@gmail.com?subject=Hello there&body=' + _notes);
    };
    AdminComponent.prototype.sendAllPins = function () {
        alert('not implemented');
    };
    AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/component/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.sass */ "./src/app/component/admin/admin.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_filesystem_service__WEBPACK_IMPORTED_MODULE_9__["FilesystemService"],
            _service_trail_service__WEBPACK_IMPORTED_MODULE_7__["TrailService"],
            _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_11__["TrailGeneratorService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
            _service_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"],
            _service_sequential_resolver_service__WEBPACK_IMPORTED_MODULE_12__["SequentialResolverService"]])
    ], AdminComponent);
    return AdminComponent;
}(_base_base_base_component__WEBPACK_IMPORTED_MODULE_14__["BaseComponent"]));



/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/marker-dialog.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/marker-dialog.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"center-icon\" >\n  <display-button class=\"button\" label=\"\" [poiTypes]=\"poiTypes\" routerLink=\"\"></display-button>\n</div>\n\n<!-- left -->\n<div id=\"left-panel\">\n  <button *ngIf=\"data.type.includes('note')\" (click)=\"deletePoi()\">delete</button>\n\n  <!-- information -->\n  <div id=\"information-container\">\n\n    <h1 mat-dialog-title [innerHTML]=\"data.label\"></h1>\n    <h2 id=\"mileage\" *ngIf=\"data.anchorPoint && data.waypoint\">{{data.anchorPoint.distanceTotal | distance:'meters':'miles'}} ({{data.waypoint.distance | distance:'meters':'miles':true}})</h2>\n    <small *ngIf=\"data.identifier\">{{data.identifier}}</small>\n\n    <div id=\"description\" *ngIf=\"data.description\">\n      <p [innerHTML]=\"data.description\"></p>\n    </div>\n\n    <div id=\"comment\" *ngIf=\"data.comment\">\n      <p [innerHTML]=\"data.comment\"></p>\n    </div>\n\n  </div>\n\n  <!-- rating -->\n  <rating *ngIf=\"rateable\" [waypoint]=\"data.waypoint\" [poiTypes]=\"poiTypes\"></rating>\n\n</div>\n\n<!-- right -->\n<div id=\"right-panel\" [ngStyle]=\"{'background-color': poiTypes[0].color} \">\n  <div id=\"scroll-container\">\n    <div class=\"related-poi-list\" *ngFor=\"let poiGroup of poiCollection\">\n      <h3>Next {{relatedLabel(poiGroup.label)}}</h3>\n      <poi-list\n        class=\"poi-list\"\n        [showUser]=\"false\"\n        [masterPoi]=\"data\"\n        [poisData]=\"poiGroup.data\">\n      </poi-list>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/marker-dialog.component.sass":
/*!*****************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/marker-dialog.component.sass ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #center-icon {\n  position: absolute;\n  left: 50%;\n  margin: -3.5vw 0 0 -3.5vw;\n  z-index: 1000; }\n  :host #center-icon button {\n    user-focus: none; }\n  :host #left-panel, :host #right-panel {\n  box-sizing: border-box;\n  display: inline-block;\n  width: 50%;\n  height: 100%; }\n  :host #left-panel {\n  height: 98%;\n  vertical-align: bottom;\n  overflow-y: scroll; }\n  :host #left-panel #information-container {\n    margin-top: 12px; }\n  :host #left-panel #information-container #mileage, :host #left-panel #information-container h1, :host #left-panel #information-container h2, :host #left-panel #information-container small {\n      padding: 0 12px; }\n  :host #left-panel #information-container #description, :host #left-panel #information-container #comment {\n      padding: 6px 12px; }\n  :host #left-panel #information-container h1, :host #left-panel #information-container h2 {\n      display: block;\n      text-align: left;\n      width: 90%;\n      overflow: hidden; }\n  :host #left-panel #information-container h1 {\n      font-size: 4.2vh;\n      line-height: 5.5vh;\n      margin-bottom: 0 !important; }\n  :host #left-panel #information-container h2 {\n      font-size: 3.8vh;\n      line-height: 4.4vh; }\n  :host #right-panel {\n  background-color: #AAAAAA;\n  vertical-align: top;\n  padding: 0 12px 12px 12px; }\n  :host #right-panel #scroll-container {\n    height: 100%;\n    overflow-y: scroll; }\n  :host #right-panel #scroll-container h3 {\n      text-align: center; }\n  :host #right-panel #scroll-container .related-poi-list {\n      height: calc((100vh / 7) * 3.75); }\n  :host /deep/ .mat-list-item-content {\n  padding: 0 12px !important;\n  margin: 0 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbWFya2VyLWRpYWxvZy9tYXJrZXItZGlhbG9nLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBR0csa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCx5QkFBeUI7RUFDekIsYUFBYSxFQUFBO0VBTmhCO0lBU0ssZ0JBQWdCLEVBQUE7RUFUckI7RUFZRyxzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLFVBQVU7RUFDVixZQUFZLEVBQUE7RUFmZjtFQWtCRyxXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLGtCQUFrQixFQUFBO0VBcEJyQjtJQXVCSyxnQkFBZ0IsRUFBQTtFQXZCckI7TUEwQk8sZUFBZSxFQUFBO0VBMUJ0QjtNQTZCTyxpQkFBaUIsRUFBQTtFQTdCeEI7TUFnQ08sY0FBYztNQUNkLGdCQUFnQjtNQUNoQixVQUFVO01BQ1YsZ0JBQWdCLEVBQUE7RUFuQ3ZCO01Bc0NPLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsMkJBQTJCLEVBQUE7RUF4Q2xDO01BMkNPLGdCQUFnQjtNQUNoQixrQkFBa0IsRUFBQTtFQTVDekI7RUErQ0cseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQix5QkFBeUIsRUFBQTtFQWpENUI7SUFvREssWUFBWTtJQUNaLGtCQUFrQixFQUFBO0VBckR2QjtNQXdETyxrQkFBa0IsRUFBQTtFQXhEekI7TUEyRE8sZ0NBQWdDLEVBQUE7RUFJdkM7RUFHRywwQkFBMEI7RUFDMUIsb0JBQW9CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZGlhbG9nL21hcmtlci1kaWFsb2cvbWFya2VyLWRpYWxvZy5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG5cbiAgI2NlbnRlci1pY29uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbjogLTMuNXZ3IDAgMCAtMy41dnc7XG4gICAgei1pbmRleDogMTAwMDtcblxuICAgIGJ1dHRvbiB7XG4gICAgICB1c2VyLWZvY3VzOiBub25lOyB9IH1cblxuICAjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsIHtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogNTAlO1xuICAgIGhlaWdodDogMTAwJTsgfVxuXG4gICNsZWZ0LXBhbmVsIHtcbiAgICBoZWlnaHQ6IDk4JTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcblxuICAgICNpbmZvcm1hdGlvbi1jb250YWluZXIge1xuICAgICAgbWFyZ2luLXRvcDogMTJweDtcblxuICAgICAgI21pbGVhZ2UsIGgxLCBoMiwgc21hbGwge1xuICAgICAgICBwYWRkaW5nOiAwIDEycHg7IH1cblxuICAgICAgI2Rlc2NyaXB0aW9uLCAjY29tbWVudCB7XG4gICAgICAgIHBhZGRpbmc6IDZweCAxMnB4OyB9XG5cbiAgICAgIGgxLCBoMiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XG5cbiAgICAgIGgxIHtcbiAgICAgICAgZm9udC1zaXplOiA0LjJ2aDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDUuNXZoO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7IH1cblxuICAgICAgaDIge1xuICAgICAgICBmb250LXNpemU6IDMuOHZoO1xuICAgICAgICBsaW5lLWhlaWdodDogNC40dmg7IH0gfSB9XG5cbiAgI3JpZ2h0LXBhbmVsIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQUFBQUFBO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgcGFkZGluZzogMCAxMnB4IDEycHggMTJweDtcblxuICAgICNzY3JvbGwtY29udGFpbmVyIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcblxuICAgICAgaDMge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuICAgICAgLnJlbGF0ZWQtcG9pLWxpc3Qge1xuICAgICAgICBoZWlnaHQ6IGNhbGMoKDEwMHZoIC8gNykgKiAzLjc1KTsgfSB9IH0gfVxuXG5cblxuIDpob3N0IC9kZWVwLyB7XG5cbiAgLm1hdC1saXN0LWl0ZW0tY29udGVudCB7XG4gICAgcGFkZGluZzogMCAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7IH0gfVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/marker-dialog.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/marker-dialog.component.ts ***!
  \***************************************************************************/
/*! exports provided: MarkerDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerDialogComponent", function() { return MarkerDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _service_note_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/note.service */ "./src/app/service/note.service.ts");






var MarkerDialogComponent = /** @class */ (function () {
    function MarkerDialogComponent(_trailGeneratorService, _noteService, dialogRef, data) {
        this._trailGeneratorService = _trailGeneratorService;
        this._noteService = _noteService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.poiTypes = [];
        this.poiCollection = [];
    }
    MarkerDialogComponent.prototype.ngOnInit = function () {
        var _self = this;
        // generate poiTypes (icons)
        var _poiStrArr = this.data.type.split(', ');
        _poiStrArr.forEach(function (poi, index) {
            var _poiData = Object(_util_poi__WEBPACK_IMPORTED_MODULE_3__["getPoiTypeByType"])(poi);
            if (!_poiData) {
                // TODO: a bug in cottonwood creek below lake morena (PCT), seems to be a blank poi in data...
                return;
            }
            if (_poiData.rateable && !_self.rateable) {
                _self.rateable = true;
            }
            if (_poiData !== undefined) {
                if (_poiStrArr.length > 2 && index === 1) {
                    _self.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_3__["getPoiTypeByType"])('unknown'));
                }
                _self.poiTypes.push(_poiData);
            }
            else {
                _self.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_3__["getPoiTypeByType"])('unknown'));
            }
        });
        // if no types
        if (this.poiTypes.length === 0) {
            this.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_3__["getPoiTypeByType"])('unknown'));
        }
        if (this.data.type.includes('water')) {
            this.showRelated = true;
            this._getRelatedPois('water');
        }
        if (this.data.type.includes('camp')) {
            this.showRelated = true;
            this._getRelatedPois('camp');
        }
    };
    MarkerDialogComponent.prototype.ngOnDestroy = function () {
    };
    MarkerDialogComponent.prototype.deletePoi = function () {
        this._noteService.deleteNote(this.data.id, this.data.belongsToType, this.data.belongsTo);
        this.dialogRef.close();
    };
    // only show individual rating labels if there is more than 1 poitype that allows rating
    MarkerDialogComponent.prototype.showRatingLabel = function () {
        if (this.poiTypes.length < 2) {
            return false;
        }
        else {
            // check if there are multiple rateable types)
            var _rateableCount = 0;
            for (var i = 0; i < this.poiTypes.length; i++) {
                if (this.poiTypes[i].rateable) {
                    _rateableCount++;
                }
            }
            return (_rateableCount > 1);
        }
    };
    MarkerDialogComponent.prototype.relatedLabel = function (type) {
        return Object(_util_poi__WEBPACK_IMPORTED_MODULE_3__["getPoiTypeByType"])(type).label;
    };
    // get related pois (by type) to display
    MarkerDialogComponent.prototype._getRelatedPois = function (poiType) {
        var _relatedPois = this._trailGeneratorService.getTrailData().sortedPoiIds[poiType];
        var _poiIndex = _relatedPois.indexOf(this.data.id);
        var _poiIds = _relatedPois.slice(_poiIndex + 1, _poiIndex + 4);
        this.poiCollection.push({ label: poiType, data: _poiIds });
    };
    MarkerDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'marker-dialog',
            template: __webpack_require__(/*! ./marker-dialog.component.html */ "./src/app/component/dialog/marker-dialog/marker-dialog.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./marker-dialog.component.sass */ "./src/app/component/dialog/marker-dialog/marker-dialog.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_trail_generator_service__WEBPACK_IMPORTED_MODULE_4__["TrailGeneratorService"],
            _service_note_service__WEBPACK_IMPORTED_MODULE_5__["NoteService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], MarkerDialogComponent);
    return MarkerDialogComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"wrapper\" (click)=\"setScore($event)\">\n\n  <span id=\"label\" (click)=\"cycleScore($event)\">{{label}}:</span>\n\n  <span id=\"star-container\">\n    <fa-icon\n      *ngFor=\"let score of scoreArray; let i = index\"\n      [id]=\"i\"\n      [icon]=\"(score === '/') ? 'star-half-alt' : ((score === 'o') ? ['far', 'star'] : 'star')\"\n      [ngClass]=\"(score !== 'o') ? 'active' : 'inactive'\" class=\"fa-icon-star\"\n      [fixedWidth]=\"true\">\n    </fa-icon>\n  </span>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.sass":
/*!***************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.sass ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #wrapper #label {\n  text-transform: capitalize; }\n\n:host #star-container {\n  float: right;\n  color: #e8aa1b !important; }\n\n:host /deep/ fa-icon svg {\n  pointer-events: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbWFya2VyLWRpYWxvZy9yYXRpbmcvZWxlbWVudHMvYWRkLXNjb3JlL2FkZC1zY29yZS5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUtLLDBCQUEwQixFQUFBOztBQUwvQjtFQVFHLFlBQVk7RUFDWix5QkFBeUIsRUFBQTs7QUFFNUI7RUFLSyxvQkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbWFya2VyLWRpYWxvZy9yYXRpbmcvZWxlbWVudHMvYWRkLXNjb3JlL2FkZC1zY29yZS5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG5cbiAgI3dyYXBwZXIge1xuXG4gICAgI2xhYmVsIHtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplOyB9IH1cblxuICAjc3Rhci1jb250YWluZXIge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBjb2xvcjogI2U4YWExYiAhaW1wb3J0YW50OyB9IH1cblxuIDpob3N0IC9kZWVwLyB7XG5cbiAgZmEtaWNvbiB7XG5cbiAgICBzdmcge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH0gfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: AddScoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddScoreComponent", function() { return AddScoreComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _type_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../type/rating */ "./src/app/type/rating.ts");



var AddScoreComponent = /** @class */ (function () {
    function AddScoreComponent(_changeDetector) {
        this._changeDetector = _changeDetector;
    }
    AddScoreComponent.prototype.ngOnInit = function () {
        this.score = this.rating.getAspect(this.label);
        this.setScoreArray();
    };
    AddScoreComponent.prototype.setScore = function (event) {
        var _newScore = (event.target.id !== 'wrapper') ? Number(event.target.id) + 1 : 0;
        var _currentScore = this.score.getUserScore();
        // toggle
        if (_newScore === _currentScore) {
            _newScore--;
        }
        // change score
        if (_newScore > 0) {
            this.rating.setAspectRating(this.label, _newScore);
        }
        else {
            this.rating.removeAspectRating(this.label);
        }
        this.setScoreArray();
        this._changeDetector.markForCheck();
    };
    // +1 the score
    AddScoreComponent.prototype.cycleScore = function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var _floorScore = Math.floor(this.score.getUserScore());
        if (_floorScore < 5) {
            _floorScore++;
            this.rating.setAspectRating(this.label, _floorScore);
        }
        else {
            this.rating.removeAspectRating(this.label);
        }
        this.setScoreArray();
        this._changeDetector.detectChanges();
    };
    // turns 3.7 into ['x', 'x', 'x', '/', 'o'], can round to the nearest number
    AddScoreComponent.prototype.setScoreArray = function () {
        var _scoreArray = [];
        var _score = this.score.getUserScore();
        _score = (this.round) ? Math.round(_score) : _score;
        for (var i = 0; i < 5; i++) {
            if (_score > i) {
                if (_score - i >= 1) {
                    _scoreArray.push('x');
                }
                else {
                    _scoreArray.push('/');
                }
            }
            else {
                _scoreArray.push('o');
            }
        }
        this.scoreArray = _scoreArray;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], AddScoreComponent.prototype, "type", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], AddScoreComponent.prototype, "round", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], AddScoreComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _type_rating__WEBPACK_IMPORTED_MODULE_2__["Rating"])
    ], AddScoreComponent.prototype, "rating", void 0);
    AddScoreComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rating-add-score',
            template: __webpack_require__(/*! ./add-score.component.html */ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./add-score.component.sass */ "./src/app/component/dialog/marker-dialog/rating/elements/add-score/add-score.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], AddScoreComponent);
    return AddScoreComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span id=\"label\">{{label}}:</span>\n\n<span id=\"star-container\">\n    <fa-icon\n      *ngFor=\"let score of scoreArray(score.getScore(), false); let i = index\"\n      [id]=\"i\"\n      icon=\"star\"\n      [ngClass]=\"(score === 'x') ? 'active' : 'inactive'\" class=\"fa-icon-star\"\n      [fixedWidth]=\"true\">\n    </fa-icon>\n    <!--<span>({{score.getScore()}})</span>-->\n</span>\n"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.sass":
/*!***********************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.sass ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #label {\n  text-transform: capitalize; }\n\n:host #star-container {\n  float: right;\n  color: #d1d1d1 !important; }\n\n:host #star-container .active {\n    color: #e8aa1b !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbWFya2VyLWRpYWxvZy9yYXRpbmcvZWxlbWVudHMvY3VycmVudC1zY29yZS9jdXJyZW50LXNjb3JlLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBR0csMEJBQTBCLEVBQUE7O0FBSDdCO0VBTUcsWUFBWTtFQUNaLHlCQUFvQyxFQUFBOztBQVB2QztJQVVLLHlCQUF5QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9tYXJrZXItZGlhbG9nL3JhdGluZy9lbGVtZW50cy9jdXJyZW50LXNjb3JlL2N1cnJlbnQtc2NvcmUuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gICNsYWJlbCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7IH1cblxuICAjc3Rhci1jb250YWluZXIge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBjb2xvcjogcmdiKDIwOSwgMjA5LCAyMDkpICFpbXBvcnRhbnQ7XG5cbiAgICAuYWN0aXZlIHtcbiAgICAgIGNvbG9yOiAjZThhYTFiICFpbXBvcnRhbnQ7IH0gfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: CurrentScoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentScoreComponent", function() { return CurrentScoreComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _type_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../type/rating */ "./src/app/type/rating.ts");



var CurrentScoreComponent = /** @class */ (function () {
    function CurrentScoreComponent(_changeDetector) {
        this._changeDetector = _changeDetector;
    }
    CurrentScoreComponent.prototype.ngOnInit = function () { };
    CurrentScoreComponent.prototype.ngOnChanges = function (changes) {
        if (changes.update) {
            this._changeDetector.detectChanges();
        }
    };
    // turns 3.7 into ['x', 'x', 'x', '/', 'o'], can round to the nearest number
    CurrentScoreComponent.prototype.scoreArray = function (score, round) {
        var _scoreArray = [];
        score = (round) ? Math.round(score) : score;
        for (var i = 0; i < 5; i++) {
            if (score > i) {
                if (score - i >= 1) {
                    _scoreArray.push('x');
                }
                else {
                    _scoreArray.push('/');
                }
            }
            else {
                _scoreArray.push('o');
            }
        }
        return _scoreArray;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], CurrentScoreComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _type_rating__WEBPACK_IMPORTED_MODULE_2__["Score"])
    ], CurrentScoreComponent.prototype, "score", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], CurrentScoreComponent.prototype, "update", void 0);
    CurrentScoreComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rating-current-score',
            template: __webpack_require__(/*! ./current-score.component.html */ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./current-score.component.sass */ "./src/app/component/dialog/marker-dialog/rating/elements/current-score/current-score.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], CurrentScoreComponent);
    return CurrentScoreComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/rating.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/rating.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rate-container\">\n\n  <div id=\"rate-toggle\">\n    <h2 (click)=\"onToggleClick('current')\" [ngClass]=\"{'active': state === 'current'}\">Rating ({{totalRating}})</h2>\n    <span id=\"divider\"> | </span>\n    <h2 (click)=\"onToggleClick('add')\" [ngClass]=\"{'active': state === 'add'}\">Your Rating</h2>\n  </div>\n\n  <div id=\"rating-panel\" *ngFor=\"let type of rateablePoiTypes\">\n\n    <!--<button (click)=\"score()\">test score</button>-->\n\n    <h4 *ngIf=\"(rateablePoiTypes.length > 1)\">{{type.label}}</h4>\n\n    <!-- toggle between current / add (form)-->\n\n    <div id=\"rating\" *ngFor=\"let name of type.rateBy\">\n\n      <rating-current-score *ngIf=\"state === 'current'\" [label]=\"name\" [score]=\"getAspect(type.type, name)\" [update]=\"timestamp\"></rating-current-score>\n      <rating-add-score *ngIf=\"state === 'add'\" [label]=\"name\" [type]=\"type.type\" [rating]=\"getRating(type.type)\"></rating-add-score>\n\n    </div>\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/rating.component.sass":
/*!*****************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/rating.component.sass ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #rate-container {\n  border-top: 1px solid #CCC;\n  background-color: #EEE;\n  padding: 12px; }\n  :host #rate-container #rate-toggle {\n    text-align: center;\n    padding-bottom: 12px; }\n  :host #rate-container #rate-toggle h2 {\n      display: inline;\n      font-size: 3.4vh;\n      font-family: Roboto, \"Helvetica Neue\", sans-serif;\n      font-weight: 500; }\n  :host #rate-container #rate-toggle h2:not(.active) {\n      color: grey; }\n  :host #rate-container #rate-toggle #divider {\n      color: #CCC; }\n  :host #rate-container #rating-panel h4 {\n    margin: 0 auto !important;\n    font-size: 3vh; }\n  :host #rate-container #rating-panel #rating {\n    padding: 6px 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbWFya2VyLWRpYWxvZy9yYXRpbmcvcmF0aW5nLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBR0csMEJBQTBCO0VBQzFCLHNCQUFzQjtFQUN0QixhQUFhLEVBQUE7RUFMaEI7SUFRSyxrQkFBa0I7SUFDbEIsb0JBQW9CLEVBQUE7RUFUekI7TUFZTyxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGlEQUFpRDtNQUNqRCxnQkFBZ0IsRUFBQTtFQWZ2QjtNQWtCTyxXQUFXLEVBQUE7RUFsQmxCO01BcUJPLFdBQVcsRUFBQTtFQXJCbEI7SUEwQk8seUJBQXlCO0lBQ3pCLGNBQWMsRUFBQTtFQTNCckI7SUE4Qk8sY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9tYXJrZXItZGlhbG9nL3JhdGluZy9yYXRpbmcuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gICNyYXRlLWNvbnRhaW5lciB7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0VFRTtcbiAgICBwYWRkaW5nOiAxMnB4O1xuXG4gICAgI3JhdGUtdG9nZ2xlIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMnB4O1xuXG4gICAgICBoMiB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgZm9udC1zaXplOiAzLjR2aDtcbiAgICAgICAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXdlaWdodDogNTAwOyB9XG5cbiAgICAgIGgyOm5vdCguYWN0aXZlKSB7XG4gICAgICAgIGNvbG9yOiBncmV5OyB9XG5cbiAgICAgICNkaXZpZGVyIHtcbiAgICAgICAgY29sb3I6ICNDQ0M7IH0gfVxuXG4gICAgI3JhdGluZy1wYW5lbCB7XG5cbiAgICAgIGg0IHtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG8gIWltcG9ydGFudDtcbiAgICAgICAgZm9udC1zaXplOiAzdmg7IH1cblxuICAgICAgI3JhdGluZyB7XG4gICAgICAgIHBhZGRpbmc6IDZweCAwOyB9IH0gfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/marker-dialog/rating/rating.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/component/dialog/marker-dialog/rating/rating.component.ts ***!
  \***************************************************************************/
/*! exports provided: RatingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingComponent", function() { return RatingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_rate_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../service/rate.service */ "./src/app/service/rate.service.ts");



var RatingComponent = /** @class */ (function () {
    function RatingComponent(_rateService, _changeDetector) {
        this._rateService = _rateService;
        this._changeDetector = _changeDetector;
        this.totalRating = 0;
        this.state = 'current';
        this.rateablePoiTypes = [];
        this._ratings = {};
        this._ratingSubscriptions = [];
    }
    RatingComponent.prototype.ngOnInit = function () {
        var _self = this;
        this.poiTypes.forEach(function (type) {
            if (type.rateable) {
                _self.rateablePoiTypes.push(type);
                var _rating = _self._rateService.getRatingById(type.type, _self.waypoint);
                _self._ratings[type.type] = _rating;
                _self._ratingSubscriptions.push(_rating.ratingChangedObserver.subscribe(function (update) {
                    if (update !== -1) {
                        _self.calculateTotalRating();
                    }
                }));
            }
        });
        this.calculateTotalRating();
    };
    RatingComponent.prototype.ngOnDestroy = function () {
        this._saveRating();
        // clear subscriptions
        this._ratingSubscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
            subscription = null;
        });
        this._ratingSubscriptions = null;
        // destroy ratings (as everything is stored in Score
        for (var key in this._ratings) {
            this._ratings[key].destroy();
        }
        this._ratings = null;
    };
    RatingComponent.prototype.onToggleClick = function (state) {
        // TODO: check if gps is tracking
        // TODO: check within X miles
        this.state = state;
    };
    RatingComponent.prototype.calculateTotalRating = function () {
        var _ratingCount = 0;
        var _cummulativeScore = 0;
        for (var key in this._ratings) {
            _ratingCount++;
            var _rating = this._ratings[key];
            _cummulativeScore += _rating.getRating();
        }
        this.totalRating = Number((_cummulativeScore / _ratingCount).toFixed(2));
    };
    RatingComponent.prototype.getAspect = function (type, aspect) {
        return this.getRating(type).getAspect(aspect);
    };
    RatingComponent.prototype.getRating = function (type) {
        return this._ratings[type];
    };
    // when a user switches from 'your rating' to 'ratings', save the users rating
    RatingComponent.prototype._saveRating = function () {
        var _ratingArray = [];
        for (var key in this._ratings) {
            _ratingArray.push(this._ratings[key]);
        }
        this._rateService.saveRatings(_ratingArray);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], RatingComponent.prototype, "poiTypes", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], RatingComponent.prototype, "waypoint", void 0);
    RatingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'rating',
            template: __webpack_require__(/*! ./rating.component.html */ "./src/app/component/dialog/marker-dialog/rating/rating.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./rating.component.sass */ "./src/app/component/dialog/marker-dialog/rating/rating.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_rate_service__WEBPACK_IMPORTED_MODULE_2__["RateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], RatingComponent);
    return RatingComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/note-dialog/note-dialog.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/component/dialog/note-dialog/note-dialog.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card-content>\n\n  <h2>Add location</h2>\n\n  <form #noteForm=\"ngForm\" class=\"example-form\" (ngSubmit)=\"submitNote(noteForm.value)\">\n\n    <mat-form-field class=\"example-full-width\">\n      <input matInput placeholder=\"title\" name=\"title\" id=\"title\" ngModel #titleField>\n    </mat-form-field>\n\n    <mat-form-field class=\"example-full-width\">\n      <textarea matInput placeholder=\"note\" name=\"note\" id=\"note\" rows=\"5\" ngModel maxlength=\"140\"></textarea>\n    </mat-form-field>\n\n    <mat-form-field class=\"select-form-field\">\n      <mat-select placeholder=\"type\" [(ngModel)]=\"defaultType\" name=\"type\" ngModel>\n        <mat-option *ngFor=\"let poiType of getTypes()\" [value]=\"poiType.type\">\n          {{poiType.label}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <mat-checkbox name=\"share\" [ngModel]=\"true\">Share (with developer!)</mat-checkbox>\n\n    <div class=\"btn-group\">\n      <button mat-stroked-button (click)=\"onButtonClick('cancel')\" type=\"button\">Cancel</button>\n      <button mat-stroked-button color=\"primary\" type=\"submit\">Save</button>\n    </div>\n  </form>\n\n</mat-card-content>\n"

/***/ }),

/***/ "./src/app/component/dialog/note-dialog/note-dialog.component.sass":
/*!*************************************************************************!*\
  !*** ./src/app/component/dialog/note-dialog/note-dialog.component.sass ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep mat-card-content {\n  display: block;\n  padding: 0 12px; }\n  :host ::ng-deep mat-card-content h2 {\n    text-align: center;\n    margin-bottom: 0 !important; }\n  :host ::ng-deep mat-card-content mat-form-field {\n    width: 100% !important; }\n  :host ::ng-deep mat-card-content mat-form-field .mat-form-field-infix {\n      border-top: 0 !important; }\n  :host ::ng-deep mat-card-content mat-form-field .mat-select, :host ::ng-deep mat-card-content mat-form-field input, :host ::ng-deep mat-card-content mat-form-field textarea {\n      box-sizing: border-box !important;\n      padding: 0 12px !important;\n      background-color: #EEE !important;\n      border-radius: 6px !important;\n      border: none !important; }\n  :host ::ng-deep mat-card-content mat-form-field textarea {\n      padding: 12px !important; }\n  :host ::ng-deep mat-card-content mat-form-field .mat-select, :host ::ng-deep mat-card-content mat-form-field input {\n      height: 48px !important; }\n  :host ::ng-deep mat-card-content mat-form-field .mat-select .mat-select-trigger, :host ::ng-deep mat-card-content mat-form-field input .mat-select-trigger {\n        height: 48px; }\n  :host ::ng-deep mat-card-content .btn-group {\n    text-align: center;\n    margin-bottom: 12px; }\n  :host ::ng-deep mat-card-content .btn-group button {\n      margin: 0 6px; }\n  :host ::ng-deep mat-card-content .mat-form-field-underline {\n    display: none; }\n  :host ::ng-deep mat-card-content .mat-form-field-underline .mat-list-item-content {\n      padding: 0 12px !important;\n      margin: 0 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvbm90ZS1kaWFsb2cvbm90ZS1kaWFsb2cuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFHRyxjQUFjO0VBQ2QsZUFBZSxFQUFBO0VBSmxCO0lBT0ssa0JBQWtCO0lBQ2xCLDJCQUEyQixFQUFBO0VBUmhDO0lBV0ssc0JBQXNCLEVBQUE7RUFYM0I7TUFjTyx3QkFBd0IsRUFBQTtFQWQvQjtNQWlCTyxpQ0FBaUM7TUFDakMsMEJBQTBCO01BQzFCLGlDQUFpQztNQUNqQyw2QkFBNkI7TUFDN0IsdUJBQXVCLEVBQUE7RUFyQjlCO01Bd0JPLHdCQUF3QixFQUFBO0VBeEIvQjtNQTJCTyx1QkFBdUIsRUFBQTtFQTNCOUI7UUE4QlMsWUFBWSxFQUFBO0VBOUJyQjtJQWlDSyxrQkFBa0I7SUFDbEIsbUJBQW1CLEVBQUE7RUFsQ3hCO01BcUNPLGFBQWEsRUFBQTtFQXJDcEI7SUF3Q0ssYUFBYSxFQUFBO0VBeENsQjtNQTJDTywwQkFBMEI7TUFDMUIsb0JBQW9CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZGlhbG9nL25vdGUtZGlhbG9nL25vdGUtZGlhbG9nLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IDo6bmctZGVlcCB7XG5cbiAgbWF0LWNhcmQtY29udGVudCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuXG4gICAgaDIge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9XG5cbiAgICBtYXQtZm9ybS1maWVsZCB7XG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuXG4gICAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgICBib3JkZXItdG9wOiAwICFpbXBvcnRhbnQ7IH1cblxuICAgICAgLm1hdC1zZWxlY3QsIGlucHV0LCB0ZXh0YXJlYSB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDtcbiAgICAgICAgcGFkZGluZzogMCAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNFRUUgIWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyB9XG5cbiAgICAgIHRleHRhcmVhIHtcbiAgICAgICAgcGFkZGluZzogMTJweCAhaW1wb3J0YW50OyB9XG5cbiAgICAgIC5tYXQtc2VsZWN0LCBpbnB1dCB7XG4gICAgICAgIGhlaWdodDogNDhweCAhaW1wb3J0YW50O1xuXG4gICAgICAgIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgICAgICAgIGhlaWdodDogNDhweDsgfSB9IH1cblxuICAgIC5idG4tZ3JvdXAge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAgICAgYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luOiAwIDZweDsgfSB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG5cbiAgICAgIC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICAgICAgICBwYWRkaW5nOiAwIDEycHggIWltcG9ydGFudDtcbiAgICAgICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7IH0gfSB9IH1cblxuIl19 */"

/***/ }),

/***/ "./src/app/component/dialog/note-dialog/note-dialog.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/component/dialog/note-dialog/note-dialog.component.ts ***!
  \***********************************************************************/
/*! exports provided: NoteProperties, NoteDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteProperties", function() { return NoteProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteDialogComponent", function() { return NoteDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_note_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/note.service */ "./src/app/service/note.service.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../settings */ "./src/app/settings.ts");





var NoteProperties = /** @class */ (function () {
    function NoteProperties() {
    }
    return NoteProperties;
}());

var NoteDialogComponent = /** @class */ (function () {
    function NoteDialogComponent(_dialogRef, _noteService, data) {
        this._dialogRef = _dialogRef;
        this._noteService = _noteService;
        this.data = data;
    }
    NoteDialogComponent.prototype.ngOnInit = function () {
        this.defaultType = this.data.type;
        this.titleField.nativeElement.focus();
    };
    NoteDialogComponent.prototype.submitNote = function (formData) {
        // add missing properties to data object so we can convert it to a Note
        this.data['id'] = new Date().getTime();
        // only add to type if it differs
        if (formData['type'] !== this.data['type']) {
            this.data['type'] += ', ' + formData['type'];
        }
        this.data['label'] = formData['title'];
        this.data['description'] = formData['note'];
        this.data['share'] = formData['share'];
        var _noteObj = this.data;
        this._noteService.saveNote(_noteObj);
        this._dialogRef.close('success');
    };
    NoteDialogComponent.prototype.onButtonClick = function (action) {
        this['_' + action]();
    };
    NoteDialogComponent.prototype._cancel = function () {
        this._dialogRef.close('cancel');
    };
    NoteDialogComponent.prototype.getTypes = function () {
        var _types = [];
        _settings__WEBPACK_IMPORTED_MODULE_4__["Settings"].POITYPES.forEach(function (type) {
            if (type.userEnabled) {
                _types.push(type);
            }
        });
        return _types;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('titleField'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], NoteDialogComponent.prototype, "titleField", void 0);
    NoteDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-note-dialog',
            template: __webpack_require__(/*! ./note-dialog.component.html */ "./src/app/component/dialog/note-dialog/note-dialog.component.html"),
            styles: [__webpack_require__(/*! ./note-dialog.component.sass */ "./src/app/component/dialog/note-dialog/note-dialog.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _service_note_service__WEBPACK_IMPORTED_MODULE_3__["NoteService"],
            NoteProperties])
    ], NoteDialogComponent);
    return NoteDialogComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"center-icon\" >\n</div>\n\n<div id=\"panel\">\n  <div id=\"top\">\n    <display-button class=\"button\" label=\"\" icon=\"map-marked-alt\" routerLink=\"\"></display-button>\n    <div id=\"meta\">\n      <h2>You are currently</h2>\n      <h3>{{ data['distance'] | distance:'meters':'miles':true}}.</h3>\n    </div>\n  </div>\n  <div id=\"bottom\">\n    <mat-card-content class=\"form-container\">\n      <mat-form-field>\n        <input matInput placeholder=\"simulate mile\" value=\"{{simulatedMile || 0}}\" type=\"tel\" min=0 max={{trailLength}} (keyup)=\"onKey($event)\" #simulate>\n      </mat-form-field>\n      <div id=\"button-group\">\n        <span>\n          <button mat-stroked-button (click)=\"onCancel()\">Cancel</button>\n          <button mat-stroked-button color=\"primary\" (click)=\"onOk()\">OK</button>\n        </span>\n      </div>\n    </mat-card-content>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.sass":
/*!*********************************************************************************!*\
  !*** ./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.sass ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #panel {\n  background: url('overlay.png') repeat-x; }\n\n:host #top {\n  display: grid;\n  height: 50%;\n  padding: 5vh;\n  grid-template-columns: 20% auto;\n  grid-template-areas: 'button meta'; }\n\n:host #top .button {\n    user-focus: none;\n    grid-area: button; }\n\n:host #top #meta {\n    grid-area: meta;\n    padding-top: 1.5vh; }\n\n:host #top #meta h2, :host #top #meta h3 {\n      vertical-align: center;\n      -webkit-margin-before: 0 !important;\n              margin-block-start: 0 !important;\n      -webkit-margin-after: 0 !important;\n              margin-block-end: 0 !important;\n      margin: 0; }\n\n:host #top #meta h2 {\n      font-size: 4vw; }\n\n:host #top #meta h3 {\n      font-size: 2vw; }\n\n:host #bottom {\n  display: block;\n  height: 50%;\n  padding: 12px 48px !important;\n  vert-align: bottom;\n  bottom: 0; }\n\n:host #bottom .form-container {\n    display: flex;\n    flex-direction: column; }\n\n:host #bottom .form-container > * {\n    width: 100%; }\n\n:host #button-group {\n  width: 100%;\n  text-align: center; }\n\n:host #button-group span button {\n    margin: 0 6px; }\n\n:host /deep/ .mat-form-field-infix .mat-input-element {\n  background: rgba(255, 255, 255, 0.5);\n  padding: 12px 0;\n  border: 2px solid white;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 4.5vw;\n  color: #555; }\n\n:host /deep/ .mat-form-field-infix .mat-input-element::-moz-selection {\n  background: #88b2c7; }\n\n:host /deep/ .mat-form-field-infix .mat-input-element::selection {\n  background: #88b2c7; }\n\n:host /deep/ .mat-form-field-underline {\n  display: none;\n  visibility: hidden; }\n\n:host /deep/ .mat-form-field-label {\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvb2ZmdHJhaWwtZGlhbG9nL29mZnRyYWlsLWRpYWxvZy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLHVDQUFpRSxFQUFBOztBQUhwRTtFQU9HLGFBQWE7RUFDYixXQUFXO0VBQ1gsWUFBWTtFQUVaLCtCQUErQjtFQUMvQixrQ0FBa0MsRUFBQTs7QUFackM7SUFpQkssZ0JBQWdCO0lBQ2hCLGlCQUFpQixFQUFBOztBQWxCdEI7SUFzQkssZUFBZTtJQUNmLGtCQUFrQixFQUFBOztBQXZCdkI7TUE0Qk8sc0JBQXNCO01BQ3RCLG1DQUFnQztjQUFoQyxnQ0FBZ0M7TUFDaEMsa0NBQThCO2NBQTlCLDhCQUE4QjtNQUM5QixTQUFTLEVBQUE7O0FBL0JoQjtNQWtDTyxjQUFjLEVBQUE7O0FBbENyQjtNQW9DTyxjQUFjLEVBQUE7O0FBcENyQjtFQXVDRyxjQUFjO0VBQ2QsV0FBVztFQUNYLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsU0FBUyxFQUFBOztBQTNDWjtJQThDSyxhQUFhO0lBQ2Isc0JBQXNCLEVBQUE7O0FBL0MzQjtJQWtESyxXQUFXLEVBQUE7O0FBbERoQjtFQXFERyxXQUFXO0VBQ1gsa0JBQWtCLEVBQUE7O0FBdERyQjtJQTBETyxhQUFhLEVBQUE7O0FBSXBCO0VBS0ssb0NBQWlDO0VBQ2pDLGVBQWU7RUFDZix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVyxFQUFBOztBQVhoQjtFQWNLLG1CQUFtQixFQUFBOztBQWR4QjtFQWNLLG1CQUFtQixFQUFBOztBQWR4QjtFQWlCRyxhQUFhO0VBQ2Isa0JBQWtCLEVBQUE7O0FBbEJyQjtFQXFCRyxrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvb2ZmdHJhaWwtZGlhbG9nL29mZnRyYWlsLWRpYWxvZy5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG5cbiAgI3BhbmVsIHtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvb3ZlcmxheS5wbmcnKSByZXBlYXQteDsgfVxuXG4gICN0b3Age1xuXG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBoZWlnaHQ6IDUwJTtcbiAgICBwYWRkaW5nOiA1dmg7XG5cbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDIwJSBhdXRvO1xuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICdidXR0b24gbWV0YSc7XG5cbiAgICAvL3BhZGRpbmc6IDQ4cHggMjAlIDAgMjAlICFpbXBvcnRhbnRcblxuICAgIC5idXR0b24ge1xuICAgICAgdXNlci1mb2N1czogbm9uZTtcbiAgICAgIGdyaWQtYXJlYTogYnV0dG9uOyB9XG5cbiAgICAjbWV0YSB7XG5cbiAgICAgIGdyaWQtYXJlYTogbWV0YTtcbiAgICAgIHBhZGRpbmctdG9wOiAxLjV2aDtcblxuICAgICAgaDIsIGgzIHtcbiAgICAgICAgZ3JpZC1jb2x1bW46IHt9XG4gICAgICAgIC8vdGV4dC1hbGlnbjogY2VudGVyXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi1ibG9jay1zdGFydDogMCAhaW1wb3J0YW50O1xuICAgICAgICBtYXJnaW4tYmxvY2stZW5kOiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIG1hcmdpbjogMDsgfVxuXG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogNHZ3OyB9XG4gICAgICBoMyB7XG4gICAgICAgIGZvbnQtc2l6ZTogMnZ3OyB9IH0gfVxuXG4gICNib3R0b20ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogNTAlO1xuICAgIHBhZGRpbmc6IDEycHggNDhweCAhaW1wb3J0YW50O1xuICAgIHZlcnQtYWxpZ246IGJvdHRvbTtcbiAgICBib3R0b206IDA7XG5cbiAgICAuZm9ybS1jb250YWluZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cblxuICAgIC5mb3JtLWNvbnRhaW5lciA+ICoge1xuICAgICAgd2lkdGg6IDEwMCU7IH0gfVxuXG4gICNidXR0b24tZ3JvdXAge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgIHNwYW4ge1xuICAgICAgYnV0dG9uIHtcbiAgICAgICAgbWFyZ2luOiAwIDZweDtcbiAgICAgICAgLy9wYWRkaW5nOiA0cHggMTJweFxuIH0gfSB9IH0gICAgICAgIC8vZm9udC1zaXplOiAydndcblxuIDpob3N0IC9kZWVwLyB7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcblxuICAgIC5tYXQtaW5wdXQtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7XG4gICAgICBwYWRkaW5nOiAxMnB4IDA7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDQuNXZ3O1xuICAgICAgY29sb3I6ICM1NTU7IH1cblxuICAgIC5tYXQtaW5wdXQtZWxlbWVudDo6c2VsZWN0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6ICM4OGIyYzc7IH0gfVxuXG4gIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuOyB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.ts ***!
  \*******************************************************************************/
/*! exports provided: OfftrailDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfftrailDialogComponent", function() { return OfftrailDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");




var OfftrailDialogComponent = /** @class */ (function () {
    function OfftrailDialogComponent(_dialogRef, _localStorage, data) {
        this._dialogRef = _dialogRef;
        this._localStorage = _localStorage;
        this.data = data;
    }
    OfftrailDialogComponent.prototype.ngOnInit = function () {
        this.simulatedMile = Math.floor(Number(this.data['anchorPointDistance']));
        this.trailLength = this.data['trailLength'];
    };
    OfftrailDialogComponent.prototype.onOk = function () {
        // const _value: number = (Math.floor(Number(this.simulateInput.nativeElement.value)) > this.trailLength) ? this.trailLength : Math.floor(Number(this.simulateInput.nativeElement.value));
        var _value = this.simulateInput.nativeElement.value.replace(',', '.'); // in case of comma
        _value = (Number(_value) < this.trailLength) ? Number(_value) : this.trailLength - 1;
        var _self = this;
        setTimeout(function () {
            _self._dialogRef.close({ simulatedMile: _value });
        }, 100);
    };
    OfftrailDialogComponent.prototype.onKey = function (event) {
        // if enter pressed
        if (event.key === 'Enter') {
            this.onOk();
        }
    };
    OfftrailDialogComponent.prototype.onCancel = function () {
        this._dialogRef.close();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('simulate'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], OfftrailDialogComponent.prototype, "simulateInput", void 0);
    OfftrailDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'offtrail-dialog',
            template: __webpack_require__(/*! ./offtrail-dialog.component.html */ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.html"),
            styles: [__webpack_require__(/*! ./offtrail-dialog.component.sass */ "./src/app/component/dialog/offtrail-dialog/offtrail-dialog.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"], Object])
    ], OfftrailDialogComponent);
    return OfftrailDialogComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/about/about.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/about/about.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-card-title>About</mat-card-title>\n  </mat-card-header>\n\n  <mat-card-content>\n    <p>This app was developed by Frank Douwes, after successfully finishing the triple crown in 2019.</p>\n    <p>While hiking I valued a good elevation profile over maps, this app is an attempt to give future hikers exactly that.</p>\n  </mat-card-content>\n\n  <!--<mat-card-header>-->\n    <!--<mat-card-title>Report Bug / Contact</mat-card-title>-->\n  <!--</mat-card-header>-->\n\n  <!--<mat-card-content>-->\n    <!--<p>Found something that needs fixing, or just have a suggestion for improvements? feel free to contact me using the form below:</p>-->\n  <!--</mat-card-content>-->\n\n  <!--<mat-card-content class=\"form-container\">-->\n    <!--<mat-form-field>-->\n      <!--<input matInput placeholder=\"Name\" type=\"text\" required>-->\n    <!--</mat-form-field>-->\n\n    <!--<mat-form-field>-->\n      <!--<mat-select placeholder=\"Type\" required>-->\n        <!--<mat-option value=\"bug\">Bug Report</mat-option>-->\n        <!--<mat-option value=\"message\">Message</mat-option>-->\n      <!--</mat-select>-->\n    <!--</mat-form-field>-->\n\n    <!--<mat-form-field>-->\n      <!--<textarea matInput placeholder=\"Message\" rows=\"5\" required></textarea>-->\n    <!--</mat-form-field>-->\n    <!--<button>Send</button>-->\n  <!--</mat-card-content>-->\n\n  <!--<br/><br/>-->\n\n  <mat-card-header>\n    <mat-card-title>Sources</mat-card-title>\n  </mat-card-header>\n\n  <mat-card-content>\n    <ul>\n      <li>Halfmile's PCT maps - <a href=\"https://www.pctmap.net\">pctmap.net</a></li>\n      <!--<li>Jonathan Ley's CDT maps - <a href=\"http://phlumf.com\">phlumf.com</a></li>-->\n      <!--<li>AT? - <a href=\"\">AT</a></li>-->\n      <li>National Park typeface - <a href=\"http://nationalparktypeface.com\">nationalparktypeface.com</a></li>\n    </ul>\n  </mat-card-content>\n\n  <button mat-raised-button (click)=\"toggleAdmin()\" color=\"warn\">💀 IDDQD 💀</button>\n\n</mat-card>\n\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/about/about.component.sass":
/*!************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/about/about.component.sass ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy9hYm91dC9hYm91dC5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/about/about.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/about/about.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");



var AboutComponent = /** @class */ (function () {
    function AboutComponent(_localStorage) {
        this._localStorage = _localStorage;
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.prototype.toggleAdmin = function () {
        var _isAdmin = this._localStorage.retrieve('isAdmin');
        if (!_isAdmin) {
            this._localStorage.store('isAdmin', true);
            alert('God mode enabled!');
        }
        else {
            this._localStorage.clear('isAdmin');
            alert('Just a regular mortal.');
        }
    };
    AboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/component/dialog/settings-dialog/panels/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.sass */ "./src/app/component/dialog/settings-dialog/panels/about/about.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.html":
/*!**********************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card #panel>\n\n  <h2>Settings</h2>\n\n  <mat-card-content>\n\n    <h3>Display Mode</h3>\n\n    <section>\n      <mat-radio-group [(ngModel)]=\"screenMode\">\n        <mat-radio-button *ngFor=\"let mode of screenModes\" [value]=\"mode.value\" (click)=\"onRadioClick(mode.value)\">\n          {{mode.label}}\n        </mat-radio-button>\n      </mat-radio-group>\n\n      <br/>\n    </section>\n\n    <h3>Elements</h3>\n\n    <mat-checkbox name=\"showSnow\" [(ngModel)]=\"showSnow\" (change)=\"onCheckboxChange($event)\">show snowpack</mat-checkbox>\n\n    <section>\n\n      <!--<mat-form-field>-->\n        <!--<input type=\"number\" value=\"250\" input=\"\" placeholder=\"Poi offtrail distance (ft.)\">-->\n      <!--</mat-form-field>-->\n\n      <!--<mat-form-field>-->\n        <!--<input type=\"number\" value=\"250\" input=\"\" placeholder=\"User offtrail distance (ft.)\">-->\n      <!--</mat-form-field>-->\n\n      <!--<hr/>-->\n\n      <!--<mat-form-field>-->\n        <!--<input type=\"number\" value=\"1000\" input=\"\" placeholder=\"Poi render radius (ft.)\">-->\n      <!--</mat-form-field>-->\n    </section>\n\n    <h3>Elevation Profile</h3>\n\n    <section>\n      <div *ngFor=\"let poiType of majorPoiTypes\">\n        <mat-checkbox [name]=\"createCamelCaseName(poiType, 'show')\" [(ngModel)]=\"this[createCamelCaseName(poiType, 'show')]\" (change)=\"onCheckboxChange($event)\">Show {{poiType}}</mat-checkbox>\n      </div>\n      <hr/>\n      <mat-checkbox name=\"showMiniMap\" [(ngModel)]=\"showMiniMap\" (change)=\"onCheckboxChange($event)\">Show mini-map</mat-checkbox>\n      <mat-checkbox name=\"parallaxEnabled\" [(ngModel)]=\"parallaxEnabled\" (change)=\"onCheckboxChange($event)\">Enable parallax</mat-checkbox>\n    </section>\n\n    <h3>Scroll Map</h3>\n\n    <section>\n      <mat-checkbox name=\"animateMap\" [(ngModel)]=\"animateMap\" (change)=\"onCheckboxChange($event)\">Animate Map (buggy)</mat-checkbox>\n      <mat-checkbox name=\"showMileGrid\" [(ngModel)]=\"showMileGrid\" (change)=\"onCheckboxChange($event)\">Show Mile Grid (buggy)</mat-checkbox>\n      <mat-checkbox name=\"detectRetina\" [(ngModel)]=\"detectRetina\" (change)=\"onCheckboxChange($event)\">Use Retina Tiles (battery intensive)</mat-checkbox>\n    </section>\n\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.sass":
/*!**********************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.sass ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-radio-button {\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy9nZW5lcmFsLXNldHRpbmdzL2dlbmVyYWwtc2V0dGluZ3MuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZGlhbG9nL3NldHRpbmdzLWRpYWxvZy9wYW5lbHMvZ2VuZXJhbC1zZXR0aW5ncy9nZW5lcmFsLXNldHRpbmdzLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXJhZGlvLWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrOyB9XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: GeneralSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralSettingsComponent", function() { return GeneralSettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../base/settings-panel/settings-panel.component */ "./src/app/base/settings-panel/settings-panel.component.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../_util/poi */ "./src/app/_util/poi.ts");





var GeneralSettingsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GeneralSettingsComponent, _super);
    function GeneralSettingsComponent(_localStorage) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this.screenModes = [
            { value: 'default', label: 'Default' },
            { value: 'highContrast', label: 'High Contrast' },
            { value: 'nightHike', label: 'Night Hiking' }
        ];
        return _this;
    }
    GeneralSettingsComponent.prototype.ngOnInit = function () {
        var _self = this;
        this.showSnow = this._localStorage.retrieve('showSnow');
        this.parallaxEnabled = this._localStorage.retrieve('parallaxEnabled');
        this.screenMode = this._localStorage.retrieve('screenMode');
        this.showMiniMap = this._localStorage.retrieve('showMiniMap');
        this.showMileGrid = this._localStorage.retrieve('showMileGrid');
        this.animateMap = this._localStorage.retrieve('animateMap');
        this.detectRetina = this._localStorage.retrieve('detectRetina');
        // dynamic poi type properties
        this.majorPoiTypes = Object(_util_poi__WEBPACK_IMPORTED_MODULE_4__["getMajorPoiTypes"])();
        this.majorPoiTypes.forEach(function (name) {
            var _camelName = _self.createCamelCaseName(name, 'show');
            _self[_camelName] = _self._localStorage.retrieve(_camelName);
        });
    };
    // EVENTS
    // checkboxes are named after their data property
    GeneralSettingsComponent.prototype.onCheckboxChange = function (event) {
        this._localStorage.store(event.source.name, event.checked);
    };
    GeneralSettingsComponent.prototype.onRadioClick = function (radioValue) {
        this._localStorage.store('screenMode', radioValue);
    };
    GeneralSettingsComponent.prototype.createCamelCaseName = function (name, prepend, append) {
        prepend = (prepend) ? prepend : '';
        append = (append) ? prepend : '';
        return prepend + name.charAt(0).toUpperCase() + name.slice(1) + append;
    };
    ;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('panel'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], GeneralSettingsComponent.prototype, "panel", void 0);
    GeneralSettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'general-settings',
            template: __webpack_require__(/*! ./general-settings.component.html */ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.html"),
            styles: [__webpack_require__(/*! ./general-settings.component.sass */ "./src/app/component/dialog/settings-dialog/panels/general-settings/general-settings.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], GeneralSettingsComponent);
    return GeneralSettingsComponent;
}(_base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_2__["SettingsPanelComponent"]));



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<mat-tab label=\"•\"> on/offline indicator </mat-tab>-->\n<!--<mat-tab label=\"•\"> icons </mat-tab>-->\n<!--<mat-tab label=\"•\"> syncing/updating </mat-tab>-->\n\n<mat-carousel>\n  <mat-carousel-slide\n    #matCarouselSlide\n    *ngFor=\"let slide of slides; let i = index\"\n    [image]=\"slide.image\"\n    maxWidth=\"auto\"\n    loop=\"true\"\n    slides=\"3\"\n    hideIndicators=false\n    color=\"unset\"\n  ></mat-carousel-slide>\n</mat-carousel>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.sass":
/*!**************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.sass ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "::ng-deep .carousel, ::ng-deep .carousel-list {\n  display: block;\n  height: 100% !important; }\n\n::ng-deep .carousel-slide {\n  background-size: contain !important;\n  height: 100% !important;\n  padding-bottom: 0 !important; }\n\n::ng-deep .carousel-slide-overlay {\n  background-color: unset !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy9pbnN0cnVjdGlvbnMvaW5zdHJ1Y3Rpb25zLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBR0ksY0FBYztFQUNkLHVCQUF1QixFQUFBOztBQUozQjtFQU9JLG1DQUFtQztFQUNuQyx1QkFBdUI7RUFDdkIsNEJBQTRCLEVBQUE7O0FBVGhDO0VBYUksa0NBQWtDLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZGlhbG9nL3NldHRpbmdzLWRpYWxvZy9wYW5lbHMvaW5zdHJ1Y3Rpb25zL2luc3RydWN0aW9ucy5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCB7XG5cbiAgLmNhcm91c2VsLCAuY2Fyb3VzZWwtbGlzdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7IH1cblxuICAuY2Fyb3VzZWwtc2xpZGUge1xuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbiAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctYm90dG9tOiAwICFpbXBvcnRhbnQ7IH1cblxuICAuY2Fyb3VzZWwtc2xpZGUtb3ZlcmxheSB7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB1bnNldCAhaW1wb3J0YW50OyB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.ts ***!
  \************************************************************************************************/
/*! exports provided: InstructionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionsComponent", function() { return InstructionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var InstructionsComponent = /** @class */ (function () {
    function InstructionsComponent() {
        this.slides = [
            { image: 'assets/images/slides/instructions-1.jpg' },
            { image: 'assets/images/slides/instructions-2.jpg' },
            { image: 'assets/images/slides/instructions-3.jpg' }
        ];
    }
    InstructionsComponent.prototype.ngOnInit = function () {
    };
    InstructionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'instructions',
            template: __webpack_require__(/*! ./instructions.component.html */ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.html"),
            styles: [__webpack_require__(/*! ./instructions.component.sass */ "./src/app/component/dialog/settings-dialog/panels/instructions/instructions.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], InstructionsComponent);
    return InstructionsComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.html":
/*!************************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card id=\"purchase-trails\">\n\n  <!--<h2>Purchase Trail Data</h2>-->\n\n  <mat-card-content>\n    <section class=\"purchase\">\n      <div *ngFor=\"let trail of availableTrailList\" class=\"purchase-container sign-{{trail.abbr}}\" >\n        <div class=\"sign\">\n          <img class=\"cap\" src=\"../assets/images/sign-post/post-cap.png\"/>\n          <div class=\"post\">\n            <button mat-raised-button\n                    [value]=\"trail.id\"\n                    (click)=\"onTrailPurchased(trail.id)\"\n                    [disabled]=\"!trail.availableForPurchase\">\n              <img class=\"marker\" src=\"../assets/images/logos/{{trail.abbr}}.png\" width=\"48\" height=\"48\"/>\n              <!--<div class=\"unavailable\" *ngIf=\"!trail.availableForPurchase\">Unavailable</div>-->\n              <!--<div class=\"free\" *ngIf=\"trail.isFree\">Free</div>-->\n              <p>{{trail.name}}\n                <!--<small>({{trail.length}} mi.)</small>-->\n              </p>\n              <div>•</div>\n            </button>\n          </div>\n        </div>\n      </div>\n    </section>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.sass":
/*!************************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.sass ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n:host {\n  display: block;\n  width: 100%;\n  min-height: 100%;\n  height: auto;\n  padding-bottom: 12px; }\n:host #purchase-trails {\n    background: unset;\n    border: unset;\n    box-shadow: unset;\n    padding-bottom: 0;\n    border-radius: unset; }\n:host #purchase-trails .sign-PCT {\n      background-image: url('pct.jpg'); }\n:host #purchase-trails .sign-CDT {\n      background-image: url('cdt.jpg'); }\n:host #purchase-trails .sign-SHR {\n      background-image: url('shr.jpg'); }\n:host #purchase-trails .purchase-container {\n      -webkit-perspective: 1000px;\n              perspective: 1000px;\n      background-size: cover;\n      height: 200px;\n      overflow-y: hidden;\n      border-radius: 12px;\n      margin-bottom: 6px;\n      border: 1px solid #CCC; }\n:host #purchase-trails .purchase-container .sign {\n        max-width: 75%;\n        height: 100%;\n        margin: 0 5% 0 auto;\n        padding-top: 12px;\n        -webkit-transform: rotate(1deg) skewY(3deg) skewX(-3deg) rotateX(-10deg);\n        transform: rotate(1deg) skewY(3deg) skewX(-3deg) rotateX(-10deg); }\n:host #purchase-trails .purchase-container .sign .cap {\n          display: block;\n          width: 48px;\n          margin: 0 auto -3px auto; }\n:host #purchase-trails .purchase-container .sign .post {\n          background-image: url('post-backgound.jpg');\n          background-position: center top;\n          background-repeat: repeat-y;\n          padding: 24px 0 48px 0;\n          width: 100%;\n          text-align: center; }\n:host #purchase-trails .purchase-container .sign .post button {\n            width: auto;\n            box-sizing: border-box;\n            padding: 20px 12px 0px 12px;\n            text-align: center;\n            text-wrap: normal;\n            white-space: normal;\n            line-height: 24px;\n            font-size: 18px;\n            text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.25);\n            border-radius: 6px;\n            -webkit-transform: rotate(-1deg) skewY(1deg);\n            transform: rotate(-1deg) skewY(1deg); }\n:host #purchase-trails .purchase-container .sign .post button .unavailable {\n              color: red; }\n:host #purchase-trails .purchase-container .sign .post button .free {\n              color: green; }\n:host #purchase-trails .purchase-container .sign .post button p {\n              margin: 0;\n              padding: 0; }\n:host #purchase-trails .purchase-container .sign .post button p small {\n                text-wrap: none;\n                white-space: nowrap; }\n:host #purchase-trails .purchase-container .sign .post button .marker {\n              width: 48px;\n              height: 48px;\n              margin-bottom: 6px;\n              opacity: 0.8; }\n:host #purchase-trails .purchase-container .sign .post button::after {\n            content: \"•\";\n            background-image: url('sign-background.jpg');\n            opacity: 1;\n            width: 100%;\n            height: 100%;\n            left: 0;\n            bottom: 0;\n            position: absolute;\n            z-index: -1;\n            border-radius: 6px;\n            vertical-align: bottom;\n            border-top: 3px solid #8c7457; }\n:host #purchase-trails .purchase-container .sign .post button:disabled {\n            color: rgba(0, 0, 0, 0.87); }\n:host #purchase-trails .purchase-container .sign .post button:disabled::after {\n            opacity: 1; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9zZXR0aW5ncy1kaWFsb2cvcGFuZWxzL3B1cmNoYXNlLXNldHRpbmdzL3B1cmNoYXNlLXNldHRpbmdzLmNvbXBvbmVudC5zYXNzIiwiL1VzZXJzL2ZyYW5rZG91d2VzL3dvcmsvanVzdC1oaWtlL3NyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9zZXR0aW5ncy1kaWFsb2cvcGFuZWxzL3B1cmNoYXNlLXNldHRpbmdzL3B1cmNoYXNlLXNldHRpbmdzLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FmO0VBQ0MsY0FBYztFQUNkLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLG9CQUFvQixFQUFBO0FBTHJCO0lBUUcsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLG9CQUFvQixFQUFBO0FBWnZCO01BZUssZ0NBQWtGLEVBQUE7QUFmdkY7TUFrQkssZ0NBQWtGLEVBQUE7QUFsQnZGO01BcUJLLGdDQUFrRixFQUFBO0FBckJ2RjtNQXdCSywyQkFBbUI7Y0FBbkIsbUJBQW1CO01BQ25CLHNCQUFzQjtNQUN0QixhQUFhO01BQ2Isa0JBQWtCO01BQ2xCLG1CQUFtQjtNQUNuQixrQkFBa0I7TUFDbEIsc0JBQXNCLEVBQUE7QUE5QjNCO1FBb0NPLGNBQWM7UUFDZCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUdqQix3RUFBd0U7UUFDeEUsZ0VBQWdFLEVBQUE7QUEzQ3ZFO1VBOENTLGNBQWM7VUFDZCxXQUFXO1VBQ1gsd0JBQXdCLEVBQUE7QUFoRGpDO1VBbURTLDJDQUFxRjtVQUNyRiwrQkFBK0I7VUFDL0IsMkJBQTJCO1VBQzNCLHNCQUFzQjtVQUN0QixXQUFXO1VBQ1gsa0JBQWtCLEVBQUE7QUF4RDNCO1lBMkRXLFdBQVc7WUFDWCxzQkFBc0I7WUFDdEIsMkJBQTJCO1lBQzNCLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2Ysa0RBQStDO1lBQy9DLGtCQUFrQjtZQUdsQiw0Q0FBNEM7WUFDNUMsb0NBQW9DLEVBQUE7QUF4RS9DO2NBMkVhLFVBQVUsRUFBQTtBQTNFdkI7Y0E4RWEsWUFBWSxFQUFBO0FBOUV6QjtjQWlGYSxTQUFTO2NBQ1QsVUFBVSxFQUFBO0FBbEZ2QjtnQkFxRmUsZUFBZTtnQkFDZixtQkFBbUIsRUFBQTtBQXRGbEM7Y0F5RmEsV0FBVztjQUNYLFlBQVk7Y0FDWixrQkFBa0I7Y0FDbEIsWUFBWSxFQUFBO0FBNUZ6QjtZQStGVyxZQUFTO1lBQ1QsNENBQXNGO1lBQ3RGLFVBQVU7WUFDVixXQUFXO1lBQ1gsWUFBWTtZQUNaLE9BQU87WUFDUCxTQUFTO1lBQ1Qsa0JBQWtCO1lBQ2xCLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsc0JBQXNCO1lBQ3RCLDZCQUE2QixFQUFBO0FBMUd4QztZQTZHVywwQkFBc0IsRUFBQTtBQTdHakM7WUFnSFcsVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9zZXR0aW5ncy1kaWFsb2cvcGFuZWxzL3B1cmNoYXNlLXNldHRpbmdzL3B1cmNoYXNlLXNldHRpbmdzLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDEycHg7IH1cbiAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyB7XG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XG4gICAgYm9yZGVyOiB1bnNldDtcbiAgICBib3gtc2hhZG93OiB1bnNldDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICBib3JkZXItcmFkaXVzOiB1bnNldDsgfVxuICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnNpZ24tUENUIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFuZWwtYmFja2dyb3VuZHMvcGN0LmpwZ1wiKTsgfVxuICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnNpZ24tQ0RUIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFuZWwtYmFja2dyb3VuZHMvY2R0LmpwZ1wiKTsgfVxuICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnNpZ24tU0hSIHtcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFuZWwtYmFja2dyb3VuZHMvc2hyLmpwZ1wiKTsgfVxuICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnB1cmNoYXNlLWNvbnRhaW5lciB7XG4gICAgICBwZXJzcGVjdGl2ZTogMTAwMHB4O1xuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgIGhlaWdodDogMjAwcHg7XG4gICAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI0NDQzsgfVxuICAgICAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyAucHVyY2hhc2UtY29udGFpbmVyIC5zaWduIHtcbiAgICAgICAgbWF4LXdpZHRoOiA3NSU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgbWFyZ2luOiAwIDUlIDAgYXV0bztcbiAgICAgICAgcGFkZGluZy10b3A6IDEycHg7XG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxZGVnKSBza2V3WSgzZGVnKSBza2V3WCgtM2RlZykgcm90YXRlWCgtMTBkZWcpO1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDFkZWcpIHNrZXdZKDNkZWcpIHNrZXdYKC0zZGVnKSByb3RhdGVYKC0xMGRlZyk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDFkZWcpIHNrZXdZKDNkZWcpIHNrZXdYKC0zZGVnKSByb3RhdGVYKC0xMGRlZyk7IH1cbiAgICAgICAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyAucHVyY2hhc2UtY29udGFpbmVyIC5zaWduIC5jYXAge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvIC0zcHggYXV0bzsgfVxuICAgICAgICA6aG9zdCAjcHVyY2hhc2UtdHJhaWxzIC5wdXJjaGFzZS1jb250YWluZXIgLnNpZ24gLnBvc3Qge1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvc2lnbi1wb3N0L3Bvc3QtYmFja2dvdW5kLmpwZ1wiKTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgdG9wO1xuICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcbiAgICAgICAgICBwYWRkaW5nOiAyNHB4IDAgNDhweCAwO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuICAgICAgICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnB1cmNoYXNlLWNvbnRhaW5lciAuc2lnbiAucG9zdCBidXR0b24ge1xuICAgICAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgcGFkZGluZzogMjBweCAxMnB4IDBweCAxMnB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgdGV4dC13cmFwOiBub3JtYWw7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgtMWRlZykgc2tld1koMWRlZyk7XG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0xZGVnKSBza2V3WSgxZGVnKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKSBza2V3WSgxZGVnKTsgfVxuICAgICAgICAgICAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyAucHVyY2hhc2UtY29udGFpbmVyIC5zaWduIC5wb3N0IGJ1dHRvbiAudW5hdmFpbGFibGUge1xuICAgICAgICAgICAgICBjb2xvcjogcmVkOyB9XG4gICAgICAgICAgICA6aG9zdCAjcHVyY2hhc2UtdHJhaWxzIC5wdXJjaGFzZS1jb250YWluZXIgLnNpZ24gLnBvc3QgYnV0dG9uIC5mcmVlIHtcbiAgICAgICAgICAgICAgY29sb3I6IGdyZWVuOyB9XG4gICAgICAgICAgICA6aG9zdCAjcHVyY2hhc2UtdHJhaWxzIC5wdXJjaGFzZS1jb250YWluZXIgLnNpZ24gLnBvc3QgYnV0dG9uIHAge1xuICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDA7IH1cbiAgICAgICAgICAgICAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyAucHVyY2hhc2UtY29udGFpbmVyIC5zaWduIC5wb3N0IGJ1dHRvbiBwIHNtYWxsIHtcbiAgICAgICAgICAgICAgICB0ZXh0LXdyYXA6IG5vbmU7XG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuICAgICAgICAgICAgOmhvc3QgI3B1cmNoYXNlLXRyYWlscyAucHVyY2hhc2UtY29udGFpbmVyIC5zaWduIC5wb3N0IGJ1dHRvbiAubWFya2VyIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAwLjg7IH1cbiAgICAgICAgICA6aG9zdCAjcHVyY2hhc2UtdHJhaWxzIC5wdXJjaGFzZS1jb250YWluZXIgLnNpZ24gLnBvc3QgYnV0dG9uOjphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiBcIuKAolwiO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9zaWduLXBvc3Qvc2lnbi1iYWNrZ3JvdW5kLmpwZ1wiKTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgICAgICAgICBib3JkZXItdG9wOiAzcHggc29saWQgIzhjNzQ1NzsgfVxuICAgICAgICAgIDpob3N0ICNwdXJjaGFzZS10cmFpbHMgLnB1cmNoYXNlLWNvbnRhaW5lciAuc2lnbiAucG9zdCBidXR0b246ZGlzYWJsZWQge1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7IH1cbiAgICAgICAgICA6aG9zdCAjcHVyY2hhc2UtdHJhaWxzIC5wdXJjaGFzZS1jb250YWluZXIgLnNpZ24gLnBvc3QgYnV0dG9uOmRpc2FibGVkOjphZnRlciB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxOyB9XG4iLCIgOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDEycHg7XG5cbiAgI3B1cmNoYXNlLXRyYWlscyB7XG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XG4gICAgYm9yZGVyOiB1bnNldDtcbiAgICBib3gtc2hhZG93OiB1bnNldDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgICBib3JkZXItcmFkaXVzOiB1bnNldDtcblxuICAgIC5zaWduLVBDVCB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3BhbmVsLWJhY2tncm91bmRzL3BjdC5qcGdcIik7IH1cblxuICAgIC5zaWduLUNEVCB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3BhbmVsLWJhY2tncm91bmRzL2NkdC5qcGdcIik7IH1cblxuICAgIC5zaWduLVNIUiB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3BhbmVsLWJhY2tncm91bmRzL3Noci5qcGdcIik7IH1cblxuICAgIC5wdXJjaGFzZS1jb250YWluZXIge1xuICAgICAgcGVyc3BlY3RpdmU6IDEwMDBweDtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNDQ0M7XG4gICAgICAvL2Rpc3BsYXk6IGZsZXhcbiAgICAgIC8vZmxleC13cmFwOiB3cmFwXG4gICAgICAvL2FsaWduLWl0ZW1zOiBmbGV4LWVuZFxuXG4gICAgICAuc2lnbiB7XG4gICAgICAgIG1heC13aWR0aDogNzUlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIG1hcmdpbjogMCA1JSAwIGF1dG87XG4gICAgICAgIHBhZGRpbmctdG9wOiAxMnB4O1xuXG4gICAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxZGVnKSBza2V3WSgzZGVnKSBza2V3WCgtM2RlZykgcm90YXRlWCgtMTBkZWcpIC8qIElFIDkgKi87XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMWRlZykgc2tld1koM2RlZykgc2tld1goLTNkZWcpIHJvdGF0ZVgoLTEwZGVnKSAvKiBTYWZhcmkgMy04ICovO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxZGVnKSBza2V3WSgzZGVnKSBza2V3WCgtM2RlZykgcm90YXRlWCgtMTBkZWcpO1xuXG4gICAgICAgIC5jYXAge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvIC0zcHggYXV0bzsgfVxuXG4gICAgICAgIC5wb3N0IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3NpZ24tcG9zdC9wb3N0LWJhY2tnb3VuZC5qcGdcIik7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIHRvcDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXk7XG4gICAgICAgICAgcGFkZGluZzogMjRweCAwIDQ4cHggMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAgICAgICBidXR0b24ge1xuICAgICAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgcGFkZGluZzogMjBweCAxMnB4IDBweCAxMnB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgdGV4dC13cmFwOiBub3JtYWw7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAxcHggcmdiYSgyNTUsMjU1LDI1NSwwLjI1KTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcblxuICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC0xZGVnKSBza2V3WSgxZGVnKSAvKiBJRSA5ICovO1xuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMWRlZykgc2tld1koMWRlZykgLyogU2FmYXJpIDMtOCAqLztcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xZGVnKSBza2V3WSgxZGVnKTtcblxuICAgICAgICAgICAgLnVuYXZhaWxhYmxlIHtcbiAgICAgICAgICAgICAgY29sb3I6IHJlZDsgfVxuXG4gICAgICAgICAgICAuZnJlZSB7XG4gICAgICAgICAgICAgIGNvbG9yOiBncmVlbjsgfVxuXG4gICAgICAgICAgICBwIHtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgICAgICAgIHNtYWxsIHtcbiAgICAgICAgICAgICAgICB0ZXh0LXdyYXA6IG5vbmU7XG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfSB9XG5cbiAgICAgICAgICAgIC5tYXJrZXIge1xuICAgICAgICAgICAgICB3aWR0aDogNDhweDtcbiAgICAgICAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDAuODsgfSB9XG5cbiAgICAgICAgICBidXR0b246OmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwi4oCiXCI7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvaW1hZ2VzL3NpZ24tcG9zdC9zaWduLWJhY2tncm91bmQuanBnXCIpO1xuICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHotaW5kZXg6IC0xO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAjOGM3NDU3OyB9XG5cbiAgICAgICAgICBidXR0b246ZGlzYWJsZWQge1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMCwwLDAsLjg3KTsgfVxuXG4gICAgICAgICAgYnV0dG9uOmRpc2FibGVkOjphZnRlciB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxOyB9IH0gfSB9XG5cblxuXG4gICAgLy8ucHVyY2hhc2UtY29udGFpbmVyIC5zaWduOm5vdCg6Zmlyc3QtY2hpbGQpXG4gICAgLy8gIG1hcmdpbi1sZWZ0OiA1JVxuICAgIC8vXG4gICAgLy8vKiBvbmUgaXRlbSAqL1xuICAgIC8vLnB1cmNoYXNlLWNvbnRhaW5lciAuc2lnbjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZCgxKVxuICAgIC8vICB3aWR0aDogMTAwJVxuICAgIC8vXG4gICAgLy8vKiB0d28gaXRlbXMgKi9cbiAgICAvLy5wdXJjaGFzZS1jb250YWluZXIgLnNpZ246Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoMiksXG4gICAgLy8ucHVyY2hhc2UtY29udGFpbmVyIC5zaWduOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKDIpIH4gLnNpZ25cbiB9IH0gICAgLy8gIHdpZHRoOiA0Ny41JVxuIl19 */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: PurchaseSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseSettingsComponent", function() { return PurchaseSettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../base/settings-panel/settings-panel.component */ "./src/app/base/settings-panel/settings-panel.component.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../_util/trail-meta */ "./src/app/_util/trail-meta.ts");





var PurchaseSettingsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PurchaseSettingsComponent, _super);
    function PurchaseSettingsComponent(_localStorage) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this.availableTrailList = [];
        return _this;
    }
    PurchaseSettingsComponent.prototype.ngOnInit = function () {
        this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
        this._generateTrailLists();
    };
    PurchaseSettingsComponent.prototype._generateTrailLists = function () {
        var _self = this;
        this.availableTrailList = [];
        var _trailData = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_4__["getTrailsMetaData"])();
        for (var key in _trailData) {
            if (_self._purchasedTrails && _self._purchasedTrails.indexOf(_trailData[key].id) === -1 && _trailData[key].abbr !== 'DEMO') {
                if (_trailData[key].availableForPurchase === true) {
                    _self.availableTrailList.push(_trailData[key]);
                }
            }
        }
    };
    // EVENTS
    PurchaseSettingsComponent.prototype.onTrailPurchased = function (trailId) {
        // TODO app store routines
        if (this._purchasedTrails.indexOf(trailId) === -1) {
            this._purchasedTrails.push(trailId);
            this._purchasedTrails.sort();
            this._localStorage.store('purchasedTrails', this._purchasedTrails);
            this._generateTrailLists();
        }
    };
    PurchaseSettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'purchase-settings',
            template: __webpack_require__(/*! ./purchase-settings.component.html */ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.html"),
            styles: [__webpack_require__(/*! ./purchase-settings.component.sass */ "./src/app/component/dialog/settings-dialog/panels/purchase-settings/purchase-settings.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"]])
    ], PurchaseSettingsComponent);
    return PurchaseSettingsComponent;
}(_base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_3__["SettingsPanelComponent"]));



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.html":
/*!*************************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main\">\n\n  <!--idle-->\n  <button *ngIf=\"hasUpdate && !isActive\" mat-fab class=\"download\" (click)=\"onButtonClick('download')\">\n    <fa-icon icon=\"download\" size=\"lg\"></fa-icon>\n  </button>\n\n  <!--downloading-->\n  <button *ngIf=\"isActive && !hasFile\" mat-fab class=\"cancel\" (click)=\"onButtonClick('cancel')\">\n      <fa-icon icon=\"times\" size=\"lg\"></fa-icon>\n    </button>\n\n  <!-- download complete / has file-->\n  <button *ngIf=\"!hasUpdate && !isActive\" mat-fab class=\"delete\" (click)=\"onButtonClick('clear')\">\n    <fa-icon icon=\"trash\" size=\"lg\"></fa-icon>\n  </button>\n</div>\n<div id=\"meta\">\n  <h3>{{type + ' data '}}<small>{{'v' + version}}</small></h3>\n  <div>\n    <p *ngIf=\"!isActive && hasUpdate\">{{trailMeta[type + 'FileSize'] | filesize}}</p>\n    <p *ngIf=\"!isActive && !hasUpdate\">Downloaded</p>\n    <!--<p *ngIf=\"isActive\">{{progressLabel}}</p>-->\n    <mat-progress-bar *ngIf=\"isActive\" mode=\"determinate\" [value]=\"progress\" class=\"progress\"></mat-progress-bar>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.sass":
/*!*************************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.sass ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-block;\n  box-sizing: border-box;\n  position: relative;\n  width: 33%;\n  height: 100%;\n  vertical-align: center; }\n  :host #main {\n    text-align: center; }\n  :host #main button {\n      box-shadow: none; }\n  :host #meta {\n    height: 100%;\n    vertical-align: middle;\n    margin: 8px 12px;\n    text-align: center; }\n  :host #meta h3 {\n      margin: 0 12px 3px 0 !important;\n      width: 100%;\n      text-transform: capitalize; }\n  :host #meta h3 small {\n        text-transform: lowercase; }\n  :host #meta p {\n      margin: 0; }\n  :host .delete {\n    background-color: #b4b4b4; }\n  :host .download {\n    background-color: #60be69; }\n  :host .cancel {\n    background-color: rgba(232, 92, 0, 0.62); }\n  :host::ng-deep .mat-progress-bar-fill::after {\n  background-color: #b4b4b4; }\n  :host::ng-deep .mat-progress-bar-buffer {\n  background: #e9edf0; }\n  :host::ng-deep .mat-progress-bar {\n  margin-top: 8px;\n  border-radius: 4px;\n  height: 8px;\n  width: 100%;\n  border: 0.5px solid #cdcdcd; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy90cmFpbC1zZXR0aW5ncy9kb3dubG9hZGVyL2Rvd25sb2FkZXIuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDQyxxQkFBcUI7RUFDckIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsWUFBWTtFQUNaLHNCQUFzQixFQUFBO0VBTnZCO0lBU0csa0JBQWtCLEVBQUE7RUFUckI7TUFZSyxnQkFBZ0IsRUFBQTtFQVpyQjtJQWVHLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQixFQUFBO0VBbEJyQjtNQXFCSywrQkFBK0I7TUFDL0IsV0FBVztNQUNYLDBCQUEwQixFQUFBO0VBdkIvQjtRQTBCTyx5QkFBeUIsRUFBQTtFQTFCaEM7TUE2QkssU0FBUyxFQUFBO0VBN0JkO0lBZ0NHLHlCQUFvQyxFQUFBO0VBaEN2QztJQW1DRyx5QkFBbUMsRUFBQTtFQW5DdEM7SUFzQ0csd0NBQXdDLEVBQUE7RUFFM0M7RUFHRyx5QkFBb0MsRUFBQTtFQUh2QztFQU1HLG1CQUFtQixFQUFBO0VBTnRCO0VBU0csZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsV0FBVztFQUNYLDJCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9zZXR0aW5ncy1kaWFsb2cvcGFuZWxzL3RyYWlsLXNldHRpbmdzL2Rvd25sb2FkZXIvZG93bmxvYWRlci5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMzMlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG5cbiAgI21haW4ge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgIGJ1dHRvbiB7XG4gICAgICBib3gtc2hhZG93OiBub25lOyB9IH1cblxuICAjbWV0YSB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgbWFyZ2luOiA4cHggMTJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICBoMyB7XG4gICAgICBtYXJnaW46IDAgMTJweCAzcHggMCAhaW1wb3J0YW50O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcblxuICAgICAgc21hbGwge1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlOyB9IH1cblxuICAgIHAge1xuICAgICAgbWFyZ2luOiAwOyB9IH1cblxuICAuZGVsZXRlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgwLCAxODAsIDE4MCk7IH1cblxuICAuZG93bmxvYWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig5NiwgMTkwLCAxMDUpOyB9XG5cbiAgLmNhbmNlbCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzIsIDkyLCAwLCAwLjYyKTsgfSB9XG5cbiA6aG9zdDo6bmctZGVlcCB7XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXItZmlsbDo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODAsIDE4MCwgMTgwKTsgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyLWJ1ZmZlciB7XG4gICAgYmFja2dyb3VuZDogI2U5ZWRmMDsgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyIHtcbiAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogMC41cHggc29saWQgI2NkY2RjZDsgfVxuXG4gIC8vI21haW46OmFmdGVyXG4gIC8vICBwb3NpdGlvbjogYWJzb2x1dGVcbiAgLy8gIGJveC1zaXppbmc6IGJvcmRlci1ib3hcbiAgLy8gIGNvbnRlbnQ6IFwiXCJcbiAgLy8gIHBhZGRpbmc6IDAgYXV0b1xuICAvLyAgdG9wOiAwXG4gIC8vICBsZWZ0OiAwXG4gIC8vICB0ZXh0LWFsaWduOiBjZW50ZXJcbiAgLy8gIHZlcnRpY2FsLWFsaWduOiBib3R0b21cbiAgLy8gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjUzLDIyNywyMjcsMC43NSlcbiAgLy8gIHdpZHRoOiAxMDAlXG4gIC8vICBoZWlnaHQ6IDEwMCVcbiB9ICAvLyAgYm9yZGVyLXJhZGl1czogMjhweCA2cHggNnB4IDI4cHhcbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: DownloaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloaderComponent", function() { return DownloaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_download_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../service/download.service */ "./src/app/service/download.service.ts");
/* harmony import */ var _service_filesystem_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../service/filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../_util/trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _service_connection_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../service/connection.service */ "./src/app/service/connection.service.ts");







var DownloaderComponent = /** @class */ (function () {
    function DownloaderComponent(_changeDetector, _downloadService, _fileSystemService, _connectionService) {
        this._changeDetector = _changeDetector;
        this._downloadService = _downloadService;
        this._fileSystemService = _fileSystemService;
        this._connectionService = _connectionService;
        this.progressState = 'determinate';
    }
    DownloaderComponent.prototype.ngOnInit = function () {
        this.trailMeta = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_4__["getTrailMetaDataById"])(this.trailId);
        this._createDownloader();
        this._setup();
    };
    DownloaderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.trailId) {
            this.trailMeta = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_4__["getTrailMetaDataById"])(this.trailId);
            this._createDownloader();
            this._setup();
        }
    };
    DownloaderComponent.prototype.ngOnDestroy = function () {
        this._downloadSubscription.unsubscribe();
    };
    // SETUP
    DownloaderComponent.prototype._createDownloader = function () {
        // name based downloader, managed by downloader service
        this._downloader = this._downloadService.createDownloader(this.trailMeta.abbr + '_' + this.type);
    };
    DownloaderComponent.prototype._setup = function () {
        var _self = this;
        this.isActive = this._downloader.status.isActiveSubject.getValue();
        var _base = this.trailMeta.abbr + '/';
        if (this.isVersionSpecific) {
            _base += this.trailMeta[this.type + 'Version'] + '/';
        }
        if (this.parts > 1) {
            // multipart download
            this._url = [];
            for (var i = 0; i < this.parts; i++) {
                this._url.push(_base + this.file + '_' + i + '.' + this.extension);
            }
        }
        else {
            // single file
            this._url = _base + this.file + '.' + this.extension;
        }
        // check if storage is accessible
        this.storageAvailable = this._fileSystemService.isStorageAvailable;
        // observe download status
        if (this._downloadSubscription) {
            this._downloadSubscription.unsubscribe();
        }
        this._downloadSubscription = this._downloader.meta.subscribe(function (status) {
            _self.isActive = _self._downloader.status.isActiveSubject.getValue();
            if (status && status.label) {
                if (status.type === 'http' && status.label === 'complete') {
                    if (_self.extension !== 'zip' && _self.extension !== 'json') {
                        _self._clear();
                        _self.hasFile = false;
                        _self.isActive = false;
                        throw new Error('downloaded an unsupported file');
                    }
                }
                else if (status.label === 'progress') {
                    // TODO: currently not showing saving/unzipping as part of the progress bar
                    if (status.type === 'http') {
                        // only updates on full % difference, to save redraws
                        var _newProgress = Math.floor(status.data.percentage);
                        if (_newProgress !== _self.progress) {
                            _self.progressState = 'determinate';
                            _self.progress = status.data.percentage;
                            _self._changeDetector.detectChanges();
                        }
                    }
                    else {
                        _self.progressState = 'buffer';
                        _self._changeDetector.detectChanges();
                    }
                }
                else if (status.label === 'error') {
                    alert('Downloader error');
                    _self.hasFile = false;
                    _self.onClear(_self.type);
                    _self.progress = 0;
                }
                else if (status.type === 'downloader' && status.label === 'complete') {
                    _self.progress = 100;
                    _self.hasFile = true;
                    console.log('downloader complete?');
                    _self.onComplete(_self.type);
                }
                else if (status.type === 'downloader' && status.label === 'cleared') {
                    _self.progress = 0;
                }
            }
        }, function (error) {
            alert('Download error');
            _self.isActive = _self._downloader.status.isActiveSubject.getValue();
            _self.onClear(_self.type);
            _self.hasFile = false;
            _self.progress = 0;
        });
        // since object changes won't trigger a redraw
        this._changeDetector.detectChanges();
    };
    // EVENT HANDLERS
    DownloaderComponent.prototype.onButtonClick = function (newState) {
        // prevent repetitive actions
        if (this._buttonState !== newState) {
            this['_' + newState](); // dynamic function call
        }
    };
    // BUTTON ACTIONS (dynanically called from button click)
    DownloaderComponent.prototype._download = function () {
        if (this._connectionService.state !== 'online') {
            alert('You\'re currently offline!');
            return;
        }
        var _url;
        if (typeof this._url === 'string') {
            _url = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].appDomain + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].fileBaseUrl + this._url;
        }
        else {
            _url = [];
            this._url.forEach(function (file) {
                _url.push(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].appDomain + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].fileBaseUrl + file);
            });
        }
        this._downloader.downloadFile(_url, !Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])(), this._url);
    };
    // clear all data
    DownloaderComponent.prototype._clear = function () {
        this._downloader.cancelDownload();
        this._downloader.clearFile();
        this.hasFile = false;
        this.onClear(this.type);
    };
    // cancel current download/unzip process
    DownloaderComponent.prototype._cancel = function () {
        this._downloader.cancelDownload();
        this.onClear(this.type);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DownloaderComponent.prototype, "trailId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DownloaderComponent.prototype, "type", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DownloaderComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
    ], DownloaderComponent.prototype, "onComplete", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function)
    ], DownloaderComponent.prototype, "onClear", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], DownloaderComponent.prototype, "hasFile", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], DownloaderComponent.prototype, "hasUpdate", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DownloaderComponent.prototype, "version", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], DownloaderComponent.prototype, "isVersionSpecific", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DownloaderComponent.prototype, "file", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DownloaderComponent.prototype, "extension", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DownloaderComponent.prototype, "parts", void 0);
    DownloaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'downloader',
            template: __webpack_require__(/*! ./downloader.component.html */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./downloader.component.sass */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/downloader/downloader.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _service_download_service__WEBPACK_IMPORTED_MODULE_2__["DownloadService"],
            _service_filesystem_service__WEBPACK_IMPORTED_MODULE_3__["FilesystemService"],
            _service_connection_service__WEBPACK_IMPORTED_MODULE_6__["ConnectionService"]])
    ], DownloaderComponent);
    return DownloaderComponent;
}());



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.html":
/*!******************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card id=\"trail-selector\">\n\n  <h2>Trail Downloads</h2>\n\n  <mat-card-content>\n    <section>\n      <mat-form-field class=\"select-form-field\">\n        <mat-select [value]=\"activeTrail.id\" (selectionChange)=\"onTrailSelect($event)\" #trailSelector>\n          <mat-option *ngFor=\"let trail of purchasedTrailList\" [value]=\"trail.id\">\n            {{trail.name}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </section>\n\n    <section id=\"download\">\n\n      <div class=\"warning\" *ngIf=\"hasInternet\">{{(!hasWifi) ? 'Cellular network detected, consider locating wifi before downloading large files!' : ''}}</div>\n\n      <downloader\n        *ngFor=\"let downloader of downloaders\"\n\n        [hasFile]=\"hasFile(downloader)\"\n        [version]=\"displayVersion(downloader)\"\n        [hasUpdate]=\"updateAvailable(downloader)\"\n        [type]=\"downloader\"\n        [trailId]=\"activeTrail.id\"\n        [file]=\"downloader\"\n        [isVersionSpecific]=\"(downloader !== 'snow') ? true : false\"\n        [extension]=\"(downloader === 'snow') ? 'json' : 'zip'\"\n        [parts]=\"(downloader === 'tiles') ? activeTrail.tilesFileCount : 1\"\n        [onComplete]=\"onDownloadComplete.bind(this)\"\n        [onClear]=\"onDownloadCleared.bind(this)\"\n      >\n      </downloader>\n\n    </section>\n\n  </mat-card-content>\n\n</mat-card>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.sass":
/*!******************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.sass ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "::ng-deep .mat-form-field-wrapper {\n  padding-bottom: 0px !important; }\n\n#download {\n  border-radius: 0 0 6px 6px;\n  background-color: #F9F9F9;\n  padding: 36px 0 12px 0;\n  margin-top: -12px !important; }\n\n.warning {\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy90cmFpbC1zZXR0aW5ncy90cmFpbC1zZXR0aW5ncy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUdJLDhCQUE4QixFQUFBOztBQU1sQztFQUNFLDBCQUEwQjtFQUMxQix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLDRCQUE0QixFQUFBOztBQUU5QjtFQUNFLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2RpYWxvZy9zZXR0aW5ncy1kaWFsb2cvcGFuZWxzL3RyYWlsLXNldHRpbmdzL3RyYWlsLXNldHRpbmdzLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIHtcblxuICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgcGFkZGluZy1ib3R0b206IDBweCAhaW1wb3J0YW50OyB9XG5cbiAgLnNlbGVjdC1mb3JtLWZpZWxkIHtcbiAgICAubWF0LXNlbGVjdCB7XG4gfSB9IH0gICAgICAvL2JhY2tncm91bmQtY29sb3I6IHNhbG1vbiAhaW1wb3J0YW50XG5cbiNkb3dubG9hZCB7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCA2cHggNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjlGOUY5O1xuICBwYWRkaW5nOiAzNnB4IDAgMTJweCAwO1xuICBtYXJnaW4tdG9wOiAtMTJweCAhaW1wb3J0YW50OyB9XG5cbi53YXJuaW5nIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.ts":
/*!****************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: TrailSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailSettingsComponent", function() { return TrailSettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../base/settings-panel/settings-panel.component */ "./src/app/base/settings-panel/settings-panel.component.ts");
/* harmony import */ var _service_download_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../service/download.service */ "./src/app/service/download.service.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../_util/trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var _service_connection_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../service/connection.service */ "./src/app/service/connection.service.ts");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../_util/cordova */ "./src/app/_util/cordova.ts");
/* harmony import */ var _service_version_resolver_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../service/version-resolver.service */ "./src/app/service/version-resolver.service.ts");









var TrailSettingsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TrailSettingsComponent, _super);
    function TrailSettingsComponent(_versionResolverService, _changeDetector, _localStorage, _downloadService, _connectionService) {
        var _this = _super.call(this) || this;
        _this._versionResolverService = _versionResolverService;
        _this._changeDetector = _changeDetector;
        _this._localStorage = _localStorage;
        _this._downloadService = _downloadService;
        _this._connectionService = _connectionService;
        _this._dataTypes = ['trail', 'snow', 'tiles'];
        _this.downloaders = [];
        _this.purchasedTrailList = [];
        _this.updates = {}; // update available (accessible by name)
        _this.currentVersions = {}; // version data (accessible by name)
        _this._versionSubscriptions = {}; // local storage subscriptions
        _this._updateSubscriptions = {}; // local storage subscriptions
        return _this;
    }
    TrailSettingsComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var _self = this;
        this._purchasedTrails = this._localStorage.retrieve('purchasedTrails');
        this.activeTrail = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["getTrailMetaDataById"])(this._localStorage.retrieve('activeTrailId') || 0);
        this._downloadService.isDownloadingObservable.subscribe(function (result) {
            _self._downloadersActive = result;
        });
        this._generateTrailLists();
        this.hasInternet = (this._connectionService.getStatus() === 'online');
        var _internetType = this._connectionService.getConnectionInfo()['state'];
        var _connection = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_7__["getConnection"])();
        if (_connection) {
            if (_internetType === _connection.WIFI) {
                this.hasWifi = true;
            }
        }
        this._setupUpdateSubscriptions();
    };
    TrailSettingsComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this._removeVersionSubscriptions();
        this._removeUpdateSubscriptions();
    };
    // SETUP
    TrailSettingsComponent.prototype._generateTrailLists = function () {
        var _self = this;
        this.purchasedTrailList = [];
        var _trailData = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["getTrailsMetaData"])();
        for (var key in _trailData) {
            if (_self._purchasedTrails && _self._purchasedTrails.indexOf(_trailData[key].id) !== -1 || _trailData[key].abbr === 'DEMO') {
                _self.purchasedTrailList.push(_trailData[key]);
            }
        }
    };
    TrailSettingsComponent.prototype._setupUpdateSubscriptions = function () {
        var _self = this;
        this._removeVersionSubscriptions();
        this._removeUpdateSubscriptions();
        _self.downloaders = [];
        this._dataTypes.forEach(function (type) {
            console.log(_self.activeTrail[type + 'Version']);
            if (_self.activeTrail[type + 'Version']) {
                _self.downloaders.push(type);
            }
        });
        this.downloaders.forEach(function (name) {
            _self._setupVersionSubscription(name);
            _self._updateSubscriptions[name] = _self._versionResolverService.observables[_self.activeTrail.abbr + '_' + name + 'Available'].subscribe(function (result) {
                // console.log('VERSION CHANGED UPDATE', name, result);
                _self.updates[name] = result;
                _self._changeDetector.detectChanges();
            });
        });
    };
    TrailSettingsComponent.prototype._setupVersionSubscription = function (name) {
        var _this = this;
        this._versionSubscriptions[name] = this._localStorage.observe(this.activeTrail.abbr + '_' + name + 'Version').subscribe(function (result) {
            console.log('VERSION CHANGED', name, result);
            _this.currentVersions[name + 'Version'] = result;
            _this._changeDetector.detectChanges();
        });
        // set initial value
        this.currentVersions[name + 'Version'] = this._localStorage.retrieve(this.activeTrail.abbr + '_' + name + 'Version');
    };
    TrailSettingsComponent.prototype._removeVersionSubscriptions = function () {
        for (var key in this._versionSubscriptions) {
            var _subscription = this._versionSubscriptions[key];
            if (_subscription) {
                _subscription.unsubscribe();
                _subscription = null;
            }
        }
    };
    TrailSettingsComponent.prototype._removeUpdateSubscriptions = function () {
        for (var key in this._updateSubscriptions) {
            var _subscription = this._updateSubscriptions[key];
            if (_subscription) {
                _subscription.unsubscribe();
                _subscription = null;
            }
        }
    };
    // triggered from template
    TrailSettingsComponent.prototype.displayVersion = function (name) {
        // console.log('base version', name);
        if (this.updates[name]) {
            // console.log('- from updates', this.activeTrail[name + 'Version']);
            return this.activeTrail[name + 'Version']; // the online version
        }
        else {
            // console.log('- from current', this.currentVersions[name + 'Version']);
            return this.currentVersions[name + 'Version']; // the installed version
        }
    };
    // triggered from template
    TrailSettingsComponent.prototype.updateAvailable = function (name) {
        // console.log('updates available', name, this.updates[name]);
        return this.updates[name];
    };
    // triggered from template
    TrailSettingsComponent.prototype.hasFile = function (name) {
        // console.log('has file', this.currentVersions[name + 'Version']);
        return (this.currentVersions[name + 'Version'] === this.updates[name + 'Version']);
    };
    // EVENTS
    /* when a new trail is selected
    * - check for mismatch to current trail
    * - show a warning if user is still downloading data for the old selected trail
    * - set new trail and invalidate for reload (in app.component) */
    TrailSettingsComponent.prototype.onTrailSelect = function (event) {
        var _id = Number(event.value);
        if (_id !== this._storedTrailId) {
            if (Object(_util_cordova__WEBPACK_IMPORTED_MODULE_7__["hasDialogs"])() && this._downloadersActive) {
                var _dialog = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_7__["getDialogs"])();
                _dialog.confirm('Switching trails cancels all active downloads', this._setActiveTrail.bind(this), 'Warning', ['Cancel', 'Continue']);
            }
            else {
                if (this._downloadersActive) {
                    alert('canceling downloads');
                }
                this._setActiveTrail();
                this._changeDetector.markForCheck();
            }
        }
    };
    // in conjunction with onTrailSelect();
    TrailSettingsComponent.prototype._setActiveTrail = function (buttonId) {
        buttonId = buttonId || 2;
        var _currentValue = this._storedTrailId;
        var _newValue = this.trailSelector['value'];
        if (buttonId === 2 && _currentValue !== _newValue) {
            if (this._downloadersActive) {
                // cancels active downloaders and clears data
                this._downloadService.clearDownloaders(this.activeTrail.abbr, true);
            }
            this._storedTrailId = this._localStorage.store('activeTrailId', _newValue);
            this.activeTrail = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["getTrailMetaDataById"])(_newValue);
            this._setupUpdateSubscriptions();
            _super.prototype.invalidate.call(this);
        }
        else {
            this.trailSelector['value'] = _currentValue; // reset to old value
        }
    };
    TrailSettingsComponent.prototype.onDownloadComplete = function (type) {
        console.log(type + 'data downloaded');
        this._localStorage.store(this.activeTrail.abbr + '_' + type + 'Version', this.activeTrail[type + 'Version']);
    };
    TrailSettingsComponent.prototype.onDownloadCleared = function (type) {
        console.log('CLEAR');
        this._localStorage.store(this.activeTrail.abbr + '_' + type + 'Version', 0.1);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('trailSelector'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], TrailSettingsComponent.prototype, "trailSelector", void 0);
    TrailSettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'trail-settings',
            template: __webpack_require__(/*! ./trail-settings.component.html */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./trail-settings.component.sass */ "./src/app/component/dialog/settings-dialog/panels/trail-settings/trail-settings.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_version_resolver_service__WEBPACK_IMPORTED_MODULE_8__["VersionResolverService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
            _service_download_service__WEBPACK_IMPORTED_MODULE_4__["DownloadService"],
            _service_connection_service__WEBPACK_IMPORTED_MODULE_6__["ConnectionService"]])
    ], TrailSettingsComponent);
    return TrailSettingsComponent;
}(_base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_3__["SettingsPanelComponent"]));



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card id=\"user-settings\">\n\n  <h2>User Settings</h2>\n\n  <mat-card-content>\n\n    <section>\n\n      <mat-form-field id=\"user-name\">\n        <input type=\"text\" matInput placeholder=\"name\" value=\"{{userName}}\" (input)=\"onUserNameChange($event.target.value)\">\n      </mat-form-field>\n\n      <small>ID: {{UUID}}</small>\n\n      <mat-form-field class=\"direction\">\n        <mat-select placeholder=\"direction\" [value]=\"direction\" (selectionChange)=\"onDirectionSelect($event)\">\n          <mat-option *ngFor=\"let direction of directionList\" [value]=\"direction.id\">\n            {{direction.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n\n    </section>\n\n  </mat-card-content>\n\n</mat-card>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.sass":
/*!****************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.sass ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep #user-name .mat-form-field-wrapper {\n  padding-bottom: 0 !important; }\n\n:host small {\n  float: right;\n  margin-bottom: 17.5px;\n  color: grey; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy91c2VyLXNldHRpbmdzL3VzZXItc2V0dGluZ3MuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFHRyw0QkFBNEIsRUFBQTs7QUFHL0I7RUFHRyxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3BhbmVscy91c2VyLXNldHRpbmdzL3VzZXItc2V0dGluZ3MuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3QgOjpuZy1kZWVwIHtcblxuICAjdXNlci1uYW1lIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9IH1cblxuXG4gOmhvc3Qge1xuXG4gIHNtYWxsIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMTcuNXB4O1xuICAgIGNvbG9yOiBncmV5OyB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: UserSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSettingsComponent", function() { return UserSettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../base/settings-panel/settings-panel.component */ "./src/app/base/settings-panel/settings-panel.component.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../_util/cordova */ "./src/app/_util/cordova.ts");





var UserSettingsComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UserSettingsComponent, _super);
    function UserSettingsComponent(_localStorage) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this.directionList = [{ id: 0, label: 'Northbound (NOBO)' }, { id: 1, label: 'Southbound (SOBO)' }];
        return _this;
    }
    UserSettingsComponent.prototype.ngOnInit = function () {
        this.direction = this._localStorage.retrieve('direction');
        this.UUID = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_4__["getUUID"])();
        var _savedName = this._localStorage.retrieve('userName');
        if (_savedName) {
            this.userName = _savedName;
        }
    };
    UserSettingsComponent.prototype.onDirectionSelect = function (event) {
        this._localStorage.store('direction', event.value);
        if (event.value !== this.direction) {
            this.invalidate();
        }
    };
    UserSettingsComponent.prototype.onUserNameChange = function (username) {
        this._localStorage.store('userName', username);
    };
    UserSettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'user-settings',
            template: __webpack_require__(/*! ./user-settings.component.html */ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.html"),
            styles: [__webpack_require__(/*! ./user-settings.component.sass */ "./src/app/component/dialog/settings-dialog/panels/user-settings/user-settings.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], UserSettingsComponent);
    return UserSettingsComponent;
}(_base_settings_panel_settings_panel_component__WEBPACK_IMPORTED_MODULE_2__["SettingsPanelComponent"]));



/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/settings-dialog.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/settings-dialog.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <div id=\"center-icon\" >\n    <display-button class=\"button\" label=\"\" icon=\"{{data['icon']}}\" routerLink=\"\"></display-button>\n  </div>\n\n  <!-- left -->\n  <div id=\"left-panel\">\n\n    <div id=\"setings-meta\">\n      <h1>Settings</h1>\n      <div mat-dialog-content>\n        <p>Select a topic below</p>\n      </div>\n    </div>\n\n    <mat-action-list id=\"settings-menu\">\n      <button [disableRipple]=\"true\" *ngFor=\"let item of listItems\" mat-list-item (click)=\"onClick(item)\"> <h2>{{item.title}}</h2><span><fa-icon icon=\"angle-right\" size=\"lg\"></fa-icon></span></button>\n    </mat-action-list>\n  </div>\n\n  <!-- right -->\n  <div id=\"right-panel\" #contentPanel>\n\n    <!-- purchase / download panel -->\n    <instructions *ngIf=\"!activePanel\"></instructions>\n\n    <!-- purchase trails -->\n    <purchase-settings *ngIf=\"activePanel === 'purchase'\" (onSettingsChanged)=\"onSettingsChanged($event)\"></purchase-settings>\n\n    <!-- trail data -->\n    <trail-settings *ngIf=\"activePanel === 'trail'\" (onSettingsChanged)=\"onSettingsChanged($event)\"></trail-settings>\n\n    <!-- user settings -->\n    <user-settings *ngIf=\"activePanel === 'user'\" (onSettingsChanged)=\"onSettingsChanged($event)\"></user-settings>\n\n    <!-- general settings panel -->\n    <general-settings *ngIf=\"activePanel === 'general'\" (onSettingsChanged)=\"onSettingsChanged($event)\"></general-settings>\n\n    <!-- about panel-->\n    <about *ngIf=\"activePanel === 'about'\"></about>\n\n  </div>\n"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/settings-dialog.component.sass":
/*!*********************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/settings-dialog.component.sass ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host ::ng-deep hr {\n  border: unset;\n  border-top: 1px solid #CCC; }\n\n:host ::ng-deep mat-card h2 {\n  text-align: center;\n  margin-bottom: 0 !important; }\n\n:host ::ng-deep .input {\n  display: flex;\n  flex-direction: column; }\n\n:host ::ng-deep .input > * {\n  width: 100% !important; }\n\n:host ::ng-deep mat-form-field, :host ::ng-deep input {\n  width: 100% !important; }\n\n:host ::ng-deep .mat-select, :host ::ng-deep input {\n  box-sizing: border-box !important;\n  padding: 0 12px !important;\n  background-color: #EEE !important;\n  border-radius: 6px !important;\n  height: 48px !important;\n  border: none !important; }\n\n:host ::ng-deep .mat-select .mat-select-trigger, :host ::ng-deep input .mat-select-trigger {\n    height: 48px; }\n\n:host ::ng-deep .mat-select .mat-select-trigger .mat-select-value, :host ::ng-deep input .mat-select-trigger .mat-select-value {\n      vertical-align: middle; }\n\n:host ::ng-deep input {\n  background-color: transparent !important;\n  border: 2px solid #EEE !important; }\n\n:host ::ng-deep .mat-form-field-underline {\n  display: none; }\n\n:host ::ng-deep .mat-form-field-underline .mat-list-item-content {\n    padding: 0 12px !important;\n    margin: 0 !important; }\n\n:host ::ng-deep mat-radio-button, :host ::ng-deep mat-checkbox {\n  display: block;\n  padding: 3px 0 !important;\n  height: 28px !important; }\n\n:host ::ng-deep .mat-radio-container, :host ::ng-deep .mat-radio-outer-circle, :host ::ng-deep .mat-radio-inner-circle, :host ::ng-deep .mat-checkbox-inner-container {\n  width: 28px !important;\n  height: 28px !important; }\n\n:host ::ng-deep .mat-checkbox-frame, :host ::ng-deep .mat-checkbox-background {\n  width: 24px !important;\n  height: 24px !important;\n  border-radius: 4px !important; }\n\n:host #center-icon {\n  position: absolute;\n  left: 38.2%;\n  margin: -3.5vw 0 0 -3.5vw;\n  z-index: 1000; }\n\n:host #center-icon button {\n    user-focus: none; }\n\n:host #left-panel, :host #right-panel {\n  display: inline-block;\n  height: 100%; }\n\n:host #left-panel {\n  height: 98%;\n  width: 38.2%;\n  vertical-align: bottom;\n  overflow-y: hidden; }\n\n:host #left-panel h1, :host #left-panel h2 {\n    display: block;\n    text-align: left;\n    width: 90%;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n\n:host #left-panel h1 {\n    font-size: 4.2vh;\n    padding: 0 12px; }\n\n:host #left-panel h2 {\n    font-size: 3.4vh;\n    font-weight: 300; }\n\n:host #left-panel #setings-meta {\n    background-color: white;\n    box-sizing: border-box;\n    height: 25%;\n    border-bottom: 1px solid #DDD;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 3vh; }\n\n:host #left-panel #setings-meta .mat-dialog-title {\n      margin-bottom: 0;\n      padding-bottom: 0; }\n\n:host #left-panel #setings-meta .mat-dialog-content {\n      display: block; }\n\n:host #left-panel #setings-meta .mat-dialog-content p {\n        display: block;\n        margin: 0 12px 12px 12px; }\n\n:host #left-panel #settings-menu {\n    height: 75%;\n    overflow-y: scroll;\n    padding: 0;\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f7f7f7+0,f9f9f9+7 */\n    background: #f7f7f7;\n    background: linear-gradient(to bottom, #f7f7f7 0%, #f9f9f9 7%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#f9f9f9',GradientType=0 ); }\n\n:host #left-panel #settings-menu button {\n      border-bottom: 1px solid #EEE;\n      height: 22.22%; }\n\n:host #left-panel #settings-menu span {\n      display: block;\n      position: absolute;\n      right: 0;\n      padding: 0 12px 0 12px;\n      vertical-align: center;\n      color: #CCC; }\n\n:host #right-panel {\n  box-sizing: border-box;\n  width: 61.8%;\n  background-color: #EEE;\n  vertical-align: top;\n  overflow-y: scroll; }\n\n:host #right-panel mat-card {\n    box-sizing: border-box;\n    background-color: #97a895;\n    min-height: 100%;\n    border: unset;\n    border-radius: unset; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3NldHRpbmdzLWRpYWxvZy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLGFBQWE7RUFDYiwwQkFBMEIsRUFBQTs7QUFKN0I7RUFTSyxrQkFBa0I7RUFDbEIsMkJBQTJCLEVBQUE7O0FBVmhDO0VBYUcsYUFBYTtFQUNiLHNCQUFzQixFQUFBOztBQWR6QjtFQWlCRyxzQkFBc0IsRUFBQTs7QUFqQnpCO0VBcUJHLHNCQUFzQixFQUFBOztBQXJCekI7RUF3QkcsaUNBQWlDO0VBQ2pDLDBCQUEwQjtFQUMxQixpQ0FBaUM7RUFDakMsNkJBQTZCO0VBQzdCLHVCQUF1QjtFQUN2Qix1QkFBdUIsRUFBQTs7QUE3QjFCO0lBZ0NLLFlBQVksRUFBQTs7QUFoQ2pCO01BbUNPLHNCQUFzQixFQUFBOztBQW5DN0I7RUFzQ0csd0NBQXdDO0VBQ3hDLGlDQUFpQyxFQUFBOztBQXZDcEM7RUEyQ0csYUFBYSxFQUFBOztBQTNDaEI7SUE4Q0ssMEJBQTBCO0lBQzFCLG9CQUFvQixFQUFBOztBQS9DekI7RUFtREcsY0FBYztFQUNkLHlCQUF5QjtFQUN6Qix1QkFBdUIsRUFBQTs7QUFyRDFCO0VBd0RHLHNCQUFzQjtFQUN0Qix1QkFBdUIsRUFBQTs7QUF6RDFCO0VBNERHLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsNkJBQTZCLEVBQUE7O0FBRWhDO0VBR0csa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsYUFBYSxFQUFBOztBQU5oQjtJQVNLLGdCQUFnQixFQUFBOztBQVRyQjtFQVlHLHFCQUFxQjtFQUNyQixZQUFZLEVBQUE7O0FBYmY7RUFnQkcsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsa0JBQWtCLEVBQUE7O0FBbkJyQjtJQXNCSyxjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLGdCQUFnQixFQUFBOztBQTNCckI7SUE4QkssZ0JBQWdCO0lBQ2hCLGVBQWUsRUFBQTs7QUEvQnBCO0lBa0NLLGdCQUFnQjtJQUNoQixnQkFBZ0IsRUFBQTs7QUFuQ3JCO0lBc0NLLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsV0FBVztJQUNYLDZCQUE2QjtJQUM3QixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLGNBQWMsRUFBQTs7QUE1Q25CO01BK0NPLGdCQUFnQjtNQUNoQixpQkFBaUIsRUFBQTs7QUFoRHhCO01BbURPLGNBQWMsRUFBQTs7QUFuRHJCO1FBc0RTLGNBQWM7UUFDZCx3QkFBd0IsRUFBQTs7QUF2RGpDO0lBMERLLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsVUFBVTtJQUVWLDhHQUFBO0lBQ0EsbUJBQTRCO0lBRzVCLDhEQUFxRjtJQUNyRixtSEFBbUgsRUFBQTs7QUFuRXhIO01Bc0VPLDZCQUE2QjtNQUM3QixjQUFjLEVBQUE7O0FBdkVyQjtNQTBFTyxjQUFjO01BQ2Qsa0JBQWtCO01BQ2xCLFFBQVE7TUFDUixzQkFBc0I7TUFDdEIsc0JBQXNCO01BQ3RCLFdBQVcsRUFBQTs7QUEvRWxCO0VBa0ZHLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixrQkFBa0IsRUFBQTs7QUF0RnJCO0lBeUZLLHNCQUFzQjtJQUN0Qix5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixvQkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kaWFsb2cvc2V0dGluZ3MtZGlhbG9nL3NldHRpbmdzLWRpYWxvZy5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCA6Om5nLWRlZXAge1xuXG4gIGhyIHtcbiAgICBib3JkZXI6IHVuc2V0O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDOyB9XG5cbiAgbWF0LWNhcmQge1xuXG4gICAgaDIge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyB9IH1cblxuICAuaW5wdXQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuXG4gIC5pbnB1dCA+ICoge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IH1cblxuXG4gIG1hdC1mb3JtLWZpZWxkLCBpbnB1dCB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgfVxuXG4gIC5tYXQtc2VsZWN0LCBpbnB1dCB7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDAgMTJweCAhaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRUUgIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDQ4cHggIWltcG9ydGFudDtcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgICAgaGVpZ2h0OiA0OHB4O1xuXG4gICAgICAubWF0LXNlbGVjdC12YWx1ZSB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0gfSB9IC8vIHVzZXMgdGFibGUtY2VsbFxuXG4gIGlucHV0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICNFRUUgIWltcG9ydGFudDsgfVxuXG5cbiAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSB7XG4gICAgZGlzcGxheTogbm9uZTtcblxuICAgIC5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xuICAgICAgcGFkZGluZzogMCAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgICBtYXJnaW46IDAgIWltcG9ydGFudDsgfSB9XG5cbiAgLy8gcmFkaW8gYnV0dG9uICYgY2hlY2tib3hcbiAgbWF0LXJhZGlvLWJ1dHRvbiwgbWF0LWNoZWNrYm94IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwYWRkaW5nOiAzcHggMCAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMjhweCAhaW1wb3J0YW50OyB9XG5cbiAgLm1hdC1yYWRpby1jb250YWluZXIsIC5tYXQtcmFkaW8tb3V0ZXItY2lyY2xlLCAubWF0LXJhZGlvLWlubmVyLWNpcmNsZSwgLm1hdC1jaGVja2JveC1pbm5lci1jb250YWluZXIge1xuICAgIHdpZHRoOiAyOHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAyOHB4ICFpbXBvcnRhbnQ7IH1cblxuICAubWF0LWNoZWNrYm94LWZyYW1lLCAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgIHdpZHRoOiAyNHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAyNHB4ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4ICFpbXBvcnRhbnQ7IH0gfVxuXG4gOmhvc3Qge1xuXG4gICNjZW50ZXItaWNvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDM4LjIlO1xuICAgIG1hcmdpbjogLTMuNXZ3IDAgMCAtMy41dnc7XG4gICAgei1pbmRleDogMTAwMDtcblxuICAgIGJ1dHRvbiB7XG4gICAgICB1c2VyLWZvY3VzOiBub25lOyB9IH1cblxuICAjbGVmdC1wYW5lbCwgI3JpZ2h0LXBhbmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAxMDAlOyB9XG5cbiAgI2xlZnQtcGFuZWwge1xuICAgIGhlaWdodDogOTglO1xuICAgIHdpZHRoOiAzOC4yJTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcblxuICAgIGgxLCBoMiB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICB3aWR0aDogOTAlO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiA0LjJ2aDtcbiAgICAgIHBhZGRpbmc6IDAgMTJweDsgfVxuXG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzLjR2aDtcbiAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7IH1cblxuICAgICNzZXRpbmdzLW1ldGEge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgaGVpZ2h0OiAyNSU7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0RERDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgIGZvbnQtc2l6ZTogM3ZoO1xuXG4gICAgICAubWF0LWRpYWxvZy10aXRsZSB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwOyB9XG5cbiAgICAgIC5tYXQtZGlhbG9nLWNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcblxuICAgICAgICBwIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICBtYXJnaW46IDAgMTJweCAxMnB4IDEycHg7IH0gfSB9XG5cbiAgICAjc2V0dGluZ3MtbWVudSB7XG4gICAgICBoZWlnaHQ6IDc1JTtcbiAgICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgICAgIHBhZGRpbmc6IDA7XG5cbiAgICAgIC8qIFBlcm1hbGluayAtIHVzZSB0byBlZGl0IGFuZCBzaGFyZSB0aGlzIGdyYWRpZW50OiBodHRwOi8vY29sb3J6aWxsYS5jb20vZ3JhZGllbnQtZWRpdG9yLyNmN2Y3ZjcrMCxmOWY5ZjkrNyAqL1xuICAgICAgYmFja2dyb3VuZDogcmdiKDI0NywyNDcsMjQ3KSAvKiBPbGQgYnJvd3NlcnMgKi87XG4gICAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsIHJnYmEoMjQ3LDI0NywyNDcsMSkgMCUsIHJnYmEoMjQ5LDI0OSwyNDksMSkgNyUpIC8qIEZGMy42LTE1ICovO1xuICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCByZ2JhKDI0NywyNDcsMjQ3LDEpIDAlLHJnYmEoMjQ5LDI0OSwyNDksMSkgNyUpIC8qIENocm9tZTEwLTI1LFNhZmFyaTUuMS02ICovO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgyNDcsMjQ3LDI0NywxKSAwJSxyZ2JhKDI0OSwyNDksMjQ5LDEpIDclKSAvKiBXM0MsIElFMTArLCBGRjE2KywgQ2hyb21lMjYrLCBPcGVyYTEyKywgU2FmYXJpNysgKi87XG4gICAgICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudCggc3RhcnRDb2xvcnN0cj0nI2Y3ZjdmNycsIGVuZENvbG9yc3RyPScjZjlmOWY5JyxHcmFkaWVudFR5cGU9MCApIC8qIElFNi05ICovO1xuXG4gICAgICBidXR0b24ge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0VFRTtcbiAgICAgICAgaGVpZ2h0OiAyMi4yMiU7IH1cblxuICAgICAgc3BhbiB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBwYWRkaW5nOiAwIDEycHggMCAxMnB4O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xuICAgICAgICBjb2xvcjogI0NDQzsgfSB9IH1cblxuICAjcmlnaHQtcGFuZWwge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgd2lkdGg6IDYxLjglO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRUU7XG4gICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG5cbiAgICBtYXQtY2FyZCB7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzk3YTg5NTtcbiAgICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgICBib3JkZXI6IHVuc2V0O1xuICAgICAgYm9yZGVyLXJhZGl1czogdW5zZXQ7IH0gfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/dialog/settings-dialog/settings-dialog.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/component/dialog/settings-dialog/settings-dialog.component.ts ***!
  \*******************************************************************************/
/*! exports provided: SettingsDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsDialogComponent", function() { return SettingsDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var SettingsDialogComponent = /** @class */ (function () {
    function SettingsDialogComponent(_dialogRef, data) {
        var _this = this;
        this._dialogRef = _dialogRef;
        this.data = data;
        this.listItems = [
            { title: 'Purchase', panel: 'purchase' },
            { title: 'Download', panel: 'trail' },
            { title: 'User', panel: 'user' },
            { title: 'Application', panel: 'general' },
            { title: 'About', panel: 'about' }
        ];
        this._settingsChanged = false;
        _dialogRef.disableClose = true; // disable default close operation
        if (_dialogRef.backdropClick) {
            _dialogRef.backdropClick().subscribe(function (result) {
                _dialogRef.close(_this._settingsChanged);
            });
        }
    }
    SettingsDialogComponent.prototype.ngOnInit = function () { };
    SettingsDialogComponent.prototype.onClick = function (item) {
        this.activePanel = item.panel;
        this.contentPanel.nativeElement.scrollTo(0, 0);
    };
    // only triggered if true
    SettingsDialogComponent.prototype.onSettingsChanged = function (event) {
        this._settingsChanged = event;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('contentPanel'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], SettingsDialogComponent.prototype, "contentPanel", void 0);
    SettingsDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'settings-dialog',
            template: __webpack_require__(/*! ./settings-dialog.component.html */ "./src/app/component/dialog/settings-dialog/settings-dialog.component.html"),
            styles: [__webpack_require__(/*! ./settings-dialog.component.sass */ "./src/app/component/dialog/settings-dialog/settings-dialog.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], SettingsDialogComponent);
    return SettingsDialogComponent;
}());



/***/ }),

/***/ "./src/app/component/elevation-profile/elevation-profile.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/component/elevation-profile/elevation-profile.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<virtual-list-component id=\"elevation-profile-list\" [trailData]=\"trailData\" (scrollEvent)=\"onScroll($event)\" (resizeEvent)=\"onResize($event)\" [scrollTo]=\"scrollTo\"></virtual-list-component>\n<scrollbar-component [trailData]=\"trailData\" [visibleRange]=\"visibleRange\" [resize]=\"resize\" (scrollToEvent)=\"onScrollTo($event)\"></scrollbar-component>\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/elevation-profile.component.sass":
/*!******************************************************************************!*\
  !*** ./src/app/component/elevation-profile/elevation-profile.component.sass ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .cdk-virtual-scroll-orientation-horizontal, :host .cdk-virtual-scroll-content-wrapper, :host .cdk-virtual-scroll-viewport {\n  display: block; }\n\n:host .cdk-virtual-scroll-orientation-horizontal {\n  padding-bottom: 25px;\n  height: 90vh; }\n\n:host /deep/ .fa-marker {\n  color: white; }\n\n:host /deep/ .tree-marker {\n  color: rgba(224, 223, 213, 0.65); }\n\n:host /deep/ #wrap {\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#c7e2ed+0,eeeeee+50,eeeeee+77,e9e1d2+78,b8cbb5+100&1+0,1+77,0.65+78,1+100 */\n  background: linear-gradient(to bottom, #c7e2ed 0%, #eeeeee 50%, #eeeeee 77%, rgba(233, 225, 210, 0.65) 78%, #b8cbb5 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c7e2ed', endColorstr='#b8cbb5',GradientType=0 ); }\n\n:host /deep/ .marker-container {\n  overflow: visible !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS9lbGV2YXRpb24tcHJvZmlsZS5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUVHLGNBQWMsRUFBQTs7QUFGakI7RUFLRyxvQkFBb0I7RUFDcEIsWUFBWSxFQUFBOztBQUdmO0VBR0csWUFBWSxFQUFBOztBQUhmO0VBTUcsZ0NBQTZCLEVBQUE7O0FBTmhDO0VBU0cscUtBQUE7RUFHQSx5SEFBa0s7RUFDbEssbUhBQW1ILEVBQUE7O0FBYnRIO0VBZ0JHLDRCQUE0QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2VsZXZhdGlvbi1wcm9maWxlL2VsZXZhdGlvbi1wcm9maWxlLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcbiAgLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi1ob3Jpem9udGFsLCAuY2RrLXZpcnR1YWwtc2Nyb2xsLWNvbnRlbnQtd3JhcHBlciwgLmNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCB7XG4gICAgZGlzcGxheTogYmxvY2s7IH1cblxuICAuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWwge1xuICAgIHBhZGRpbmctYm90dG9tOiAyNXB4O1xuICAgIGhlaWdodDogOTB2aDsgfSB9XG5cbi8vIFRPRE8gbW92ZSB0aGlzP1xuIDpob3N0IC9kZWVwLyB7XG5cbiAgLmZhLW1hcmtlciB7XG4gICAgY29sb3I6IHdoaXRlOyB9XG5cbiAgLnRyZWUtbWFya2VyIHtcbiAgICBjb2xvcjogcmdiYSgyMjQsMjIzLDIxMywwLjY1KTsgfVxuXG4gICN3cmFwIHtcbiAgICAvKiBQZXJtYWxpbmsgLSB1c2UgdG8gZWRpdCBhbmQgc2hhcmUgdGhpcyBncmFkaWVudDogaHR0cDovL2NvbG9yemlsbGEuY29tL2dyYWRpZW50LWVkaXRvci8jYzdlMmVkKzAsZWVlZWVlKzUwLGVlZWVlZSs3NyxlOWUxZDIrNzgsYjhjYmI1KzEwMCYxKzAsMSs3NywwLjY1Kzc4LDErMTAwICovXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCByZ2JhKDE5OSwyMjYsMjM3LDEpIDAlLCByZ2JhKDIzOCwyMzgsMjM4LDEpIDUwJSwgcmdiYSgyMzgsMjM4LDIzOCwxKSA3NyUsIHJnYmEoMjMzLDIyNSwyMTAsMC42NSkgNzglLCByZ2JhKDE4NCwyMDMsMTgxLDEpIDEwMCUpIC8qIEZGMy42LTE1ICovO1xuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgcmdiYSgxOTksMjI2LDIzNywxKSAwJSxyZ2JhKDIzOCwyMzgsMjM4LDEpIDUwJSxyZ2JhKDIzOCwyMzgsMjM4LDEpIDc3JSxyZ2JhKDIzMywyMjUsMjEwLDAuNjUpIDc4JSxyZ2JhKDE4NCwyMDMsMTgxLDEpIDEwMCUpIC8qIENocm9tZTEwLTI1LFNhZmFyaTUuMS02ICovO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMTk5LDIyNiwyMzcsMSkgMCUscmdiYSgyMzgsMjM4LDIzOCwxKSA1MCUscmdiYSgyMzgsMjM4LDIzOCwxKSA3NyUscmdiYSgyMzMsMjI1LDIxMCwwLjY1KSA3OCUscmdiYSgxODQsMjAzLDE4MSwxKSAxMDAlKSAvKiBXM0MsIElFMTArLCBGRjE2KywgQ2hyb21lMjYrLCBPcGVyYTEyKywgU2FmYXJpNysgKi87XG4gICAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9JyNjN2UyZWQnLCBlbmRDb2xvcnN0cj0nI2I4Y2JiNScsR3JhZGllbnRUeXBlPTAgKSAvKiBJRTYtOSAqLzsgfVxuXG4gIC5tYXJrZXItY29udGFpbmVyIHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZSAhaW1wb3J0YW50OyB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/elevation-profile/elevation-profile.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/component/elevation-profile/elevation-profile.component.ts ***!
  \****************************************************************************/
/*! exports provided: ElevationProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElevationProfileComponent", function() { return ElevationProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_loader_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../base/base/base.component */ "./src/app/base/base/base.component.ts");





var ElevationProfileComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ElevationProfileComponent, _super);
    function ElevationProfileComponent(_route, _loaderOverlay) {
        var _this = _super.call(this) || this;
        _this._route = _route;
        _this._loaderOverlay = _loaderOverlay;
        return _this;
    }
    ElevationProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addSubscription('routeData', this._route.data.subscribe(function (result) {
            _this.trailData = result.data['trail'];
            _this.snowData = result.data['snow'];
            _this._loaderOverlay.hideOverlay();
        }));
    };
    // EVENT HANDLERS
    ElevationProfileComponent.prototype.onScroll = function (response) {
        this.visibleRange = response;
    };
    ElevationProfileComponent.prototype.onResize = function (response) {
        this.resize = response;
    };
    ElevationProfileComponent.prototype.onScrollTo = function (response) {
        this.scrollTo = response;
    };
    ElevationProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-elevation-profile',
            template: __webpack_require__(/*! ./elevation-profile.component.html */ "./src/app/component/elevation-profile/elevation-profile.component.html"),
            styles: [__webpack_require__(/*! ./elevation-profile.component.sass */ "./src/app/component/elevation-profile/elevation-profile.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _service_loader_service__WEBPACK_IMPORTED_MODULE_3__["LoaderService"]])
    ], ElevationProfileComponent);
    return ElevationProfileComponent;
}(_base_base_base_component__WEBPACK_IMPORTED_MODULE_4__["BaseComponent"]));



/***/ }),

/***/ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/component/elevation-profile/scrollbar/scrollbar.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<button id=\"left\" (click)=\"onPan('backward')\">back</button>-->\n\n<div id=\"main\" #main>\n\n  <div id=\"scroll-map\" (click)=\"onClick($event)\" [ngStyle]=\"{'left': -mapOffset + 'px'}\"></div>\n\n  <div class=\"viewport-wrapper\" [ngStyle]=\"{'padding-left': viewportOffset + 'px'}\">\n    <div class=\"viewport\" [ngStyle]=\"{'width': viewportSize + 'px'}\" #viewport></div>\n  </div>\n\n</div>\n\n<!--<button id=\"right\" (click)=\"onPan('forward')\">forw</button>-->\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.sass":
/*!********************************************************************************!*\
  !*** ./src/app/component/elevation-profile/scrollbar/scrollbar.component.sass ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  bottom: 0;\n  left: 0;\n  width: 100vw;\n  height: 10vh;\n  border-top: 1px solid #999;\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#b2b2b2+0,dddddd+5 */\n  background: #b2b2b2;\n  /* Old browsers */\n  /* FF3.6-15 */\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to bottom, #b2b2b2 0%, #dddddd 5%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b2b2b2', endColorstr='#dddddd',GradientType=0 );\n  /* IE6-9 */\n  display: inline-grid;\n  grid-template-columns: 0 100% 0;\n  grid-template-areas: 'leftbutton main rightbutton';\n  overflow: hidden; }\n\n#main {\n  grid-area: main;\n  height: 10vh; }\n\n#main #scroll-map {\n    position: absolute;\n    left: 0;\n    -webkit-filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));\n            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));\n    height: 100%; }\n\n#main .viewport-wrapper {\n    grid-area: main;\n    pointer-events: none;\n    display: block;\n    box-sizing: border-box;\n    position: absolute;\n    height: 10vh;\n    overflow-x: visible;\n    width: 100vw;\n    z-index: 100;\n    left: 0;\n    top: 0;\n    transition: padding-left 0.05s;\n    overflow-x: visible; }\n\n#main .viewport-wrapper .viewport {\n      pointer-events: none;\n      position: absolute;\n      box-sizing: border-box;\n      width: 100%;\n      background-color: rgba(172, 204, 229, 0.25);\n      height: 100%;\n      border: solid #AAA;\n      border-width: 0 1px 0 1px;\n      transition: width 0.25s; }\n\n#left {\n  grid-area: leftbutton; }\n\n#right {\n  grid-area: rightbutton; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS9zY3JvbGxiYXIvc2Nyb2xsYmFyLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0MsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsU0FBUztFQUNULE9BQU87RUFDUCxZQUFZO0VBQ1osWUFBWTtFQUVaLDBCQUEwQjtFQUMxQiw4R0FBQTtFQUNBLG1CQUFtQjtFQUFFLGlCQUFBO0VBQzBDLGFBQUE7RUFDRSw0QkFBQTtFQUNqRSw4REFBNkQ7RUFBRSxxREFBQTtFQUMvRCxtSEFBbUg7RUFBRSxVQUFBO0VBQ3JILG9CQUFvQjtFQUNwQiwrQkFBK0I7RUFDL0Isa0RBQWtEO0VBQ2xELGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLGVBQWU7RUFDZixZQUFZLEVBQUE7O0FBRmQ7SUFLSSxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLCtEQUFvRDtZQUFwRCx1REFBb0Q7SUFDcEQsWUFBWSxFQUFBOztBQVJoQjtJQVdJLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osWUFBWTtJQUNaLE9BQU87SUFDUCxNQUFNO0lBRU4sOEJBQThCO0lBQzlCLG1CQUFtQixFQUFBOztBQXhCdkI7TUE0Qk0sb0JBQW9CO01BQ3BCLGtCQUFrQjtNQUNsQixzQkFBc0I7TUFDdEIsV0FBVztNQUNYLDJDQUF3QztNQUN4QyxZQUFZO01BRVosa0JBQWtCO01BQ2xCLHlCQUF5QjtNQUV6Qix1QkFBdUIsRUFBQTs7QUFFN0I7RUFDRSxxQkFBcUIsRUFBQTs7QUFFdkI7RUFDRSxzQkFBc0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS9zY3JvbGxiYXIvc2Nyb2xsYmFyLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTB2aDtcbiAgLy9wYWRkaW5nLXRvcDogMTBweFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzk5OTtcbiAgLyogUGVybWFsaW5rIC0gdXNlIHRvIGVkaXQgYW5kIHNoYXJlIHRoaXMgZ3JhZGllbnQ6IGh0dHA6Ly9jb2xvcnppbGxhLmNvbS9ncmFkaWVudC1lZGl0b3IvI2IyYjJiMiswLGRkZGRkZCs1ICovXG4gIGJhY2tncm91bmQ6ICNiMmIyYjI7IC8qIE9sZCBicm93c2VycyAqLztcbiAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjYjJiMmIyIDAlLCAjZGRkZGRkIDUlKTsgLyogRkYzLjYtMTUgKi87XG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2IyYjJiMiAwJSwjZGRkZGRkIDUlKTsgLyogQ2hyb21lMTAtMjUsU2FmYXJpNS4xLTYgKi87XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNiMmIyYjIgMCUsI2RkZGRkZCA1JSk7IC8qIFczQywgSUUxMCssIEZGMTYrLCBDaHJvbWUyNissIE9wZXJhMTIrLCBTYWZhcmk3KyAqLztcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9JyNiMmIyYjInLCBlbmRDb2xvcnN0cj0nI2RkZGRkZCcsR3JhZGllbnRUeXBlPTAgKTsgLyogSUU2LTkgKi87XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDAgMTAwJSAwO1xuICBncmlkLXRlbXBsYXRlLWFyZWFzOiAnbGVmdGJ1dHRvbiBtYWluIHJpZ2h0YnV0dG9uJztcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuXG4jbWFpbiB7XG4gIGdyaWQtYXJlYTogbWFpbjtcbiAgaGVpZ2h0OiAxMHZoO1xuXG4gICNzY3JvbGwtbWFwIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAxMHB4IHJnYmEoMjU1LDI1NSwyNTUsMC4yNSkpO1xuICAgIGhlaWdodDogMTAwJTsgfVxuXG4gIC52aWV3cG9ydC13cmFwcGVyIHtcbiAgICBncmlkLWFyZWE6IG1haW47XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiAxMHZoO1xuICAgIG92ZXJmbG93LXg6IHZpc2libGU7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIHotaW5kZXg6IDEwMDtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHBhZGRpbmctbGVmdCAwLjA1cyAvKiBTYWZhcmkgKi87XG4gICAgdHJhbnNpdGlvbjogcGFkZGluZy1sZWZ0IDAuMDVzO1xuICAgIG92ZXJmbG93LXg6IHZpc2libGU7XG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiByZWRcblxuICAgIC52aWV3cG9ydCB7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTcyLDIwNCwyMjksMC4yNSk7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAvL2JvcmRlci1yYWRpdXM6IDNweFxuICAgICAgYm9yZGVyOiBzb2xpZCAjQUFBO1xuICAgICAgYm9yZGVyLXdpZHRoOiAwIDFweCAwIDFweDtcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC4yNXMgLyogU2FmYXJpICovO1xuICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4yNXM7IH0gfSB9XG5cbiNsZWZ0IHtcbiAgZ3JpZC1hcmVhOiBsZWZ0YnV0dG9uOyB9XG5cbiNyaWdodCB7XG4gIGdyaWQtYXJlYTogcmlnaHRidXR0b247IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/component/elevation-profile/scrollbar/scrollbar.component.ts ***!
  \******************************************************************************/
/*! exports provided: ScrollbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollbarComponent", function() { return ScrollbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hammerjs/hammer.min */ "./node_modules/hammerjs/hammer.min.js");
/* harmony import */ var hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_trail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_util/trail */ "./src/app/_util/trail.ts");





var ScrollbarComponent = /** @class */ (function () {
    function ScrollbarComponent() {
        this.scrollToEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.viewportSize = 0;
        this.viewportOffset = 0;
        this._verticalPadding = 8;
    }
    // LIFECYCLE HOOKS
    ScrollbarComponent.prototype.ngOnInit = function () {
        var sliderManager = new hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3__["Manager"](this.main.nativeElement);
        sliderManager.add(new hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3__["Pan"]({ threshold: 0, pointers: 0, direction: hammerjs_hammer_min__WEBPACK_IMPORTED_MODULE_3__["DIRECTION_HORIZONTAL"] }));
        sliderManager.on('pan', this._onSlide.bind(this));
    };
    ScrollbarComponent.prototype.ngAfterViewInit = function () {
        var _self = this;
        if (!this.trailData) {
            return;
        }
        // convert mile data to flat waypoints
        this._flatWaypoints = [];
        var _milesCount = this.trailData.miles.length;
        this.trailData.miles.forEach(function (mile, index) {
            // remove overlapping first and last point
            if (index !== 0 || index !== _milesCount - 1) {
                var _waypointsSection = mile.waypoints.slice(1, mile.waypoints.length - 1);
                _self._flatWaypoints = _self._flatWaypoints.concat(_waypointsSection);
            }
            else {
                _self._flatWaypoints = _self._flatWaypoints.concat(mile.waypoints);
            }
        });
        // show 100 miles
        this._sectionLength = this.trailData.scrollbarSegmentSize;
        this._segments = (Math.ceil(this.trailData.length) / this._sectionLength < 1) ? 1 : Math.ceil(this.trailData.length) / this._sectionLength;
        this._svgWidth = this._segments * this.main.nativeElement.clientWidth;
        this._svgHeight = this.main.nativeElement.clientHeight;
        this._svgCanvas = SVG('scroll-map')
            .size(this._svgWidth, this._svgHeight)
            .viewbox(0, 0, this._svgWidth, this._svgHeight);
        this._drawMap();
        this._drawGuides();
    };
    ScrollbarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.visibleRange && changes.visibleRange.currentValue) {
            this.visibleRange = changes.visibleRange;
            var _start = this.visibleRange['currentValue']['visibleRange'].start;
            var _end = this.visibleRange['currentValue']['visibleRange'].end;
            var _range = _end - _start;
            var _scrollX = this.visibleRange['currentValue']['scrollX'];
            // map
            var _maxOffset = this._svgWidth - this.main.nativeElement.clientWidth;
            var _mileWidth = this.main.nativeElement.clientWidth / 4.5;
            var _scrollXPerc = (_scrollX / _mileWidth) / this.trailData.miles.length;
            this.mapOffset = (_scrollXPerc * _maxOffset);
            // viewport
            var _viewPortWidthPerc = _range / this._sectionLength;
            var _viewPortWidth = _viewPortWidthPerc * this.main.nativeElement.clientWidth;
            // todo: not sure why this is...
            var _maxViewPortOffset = this.main.nativeElement.clientWidth;
            if (this.trailData.abbr !== 'DEMO') {
                _maxViewPortOffset = this.main.nativeElement.clientWidth - _viewPortWidth;
            }
            this.viewportOffset = (_scrollXPerc * (_maxViewPortOffset + 5));
            this.viewportSize = _viewPortWidth;
        }
        if (changes.resize) {
            this._svgWidth = this._segments * this.main.nativeElement.clientWidth;
            this._svgHeight = this.main.nativeElement.clientHeight;
            // update svg size
            if (this._svgCanvas) {
                var svg = window.document.getElementById(this._svgCanvas.node.id);
                if (svg) {
                    svg.setAttribute('viewBox', '0 0 ' + this._svgWidth + ' ' + this._svgHeight + '');
                    svg.setAttribute('width', this._svgWidth + '');
                    svg.setAttribute('height', this._svgHeight + '');
                }
            }
            if (this.visibleRange) {
                this._drawMap();
                this._drawGuides();
            }
        }
    };
    // DRAW
    ScrollbarComponent.prototype._drawMap = function () {
        var min = Number(this.trailData.elevationRange.low) / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].FOOT;
        var max = Number(this.trailData.elevationRange.high) / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].FOOT;
        var elevation;
        var drawPoints = [];
        var counter = 0;
        var range = (max - min);
        var l = (this._svgWidth / this._flatWaypoints.length);
        // start points
        drawPoints.push([0, max]);
        elevation = this._invertValue(Object(_util_trail__WEBPACK_IMPORTED_MODULE_4__["normalizeElevation"])(this._svgHeight - (this._verticalPadding * 2), this._flatWaypoints[0]['elevation'], min, range, this._verticalPadding));
        drawPoints.push([0, elevation]);
        var prevPoint;
        var totalDistancePerc = 0;
        for (var i = 0; i < this._flatWaypoints.length; i += Math.round(this.trailData.scrollbarSegmentSize / 10)) {
            var waypoint = this._flatWaypoints[i];
            // calculate distance, starting at 2nd point
            if (counter > 0) {
                totalDistancePerc = (waypoint.distanceTotal / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].MILE) / this.trailData.length;
            }
            elevation = this._invertValue(Object(_util_trail__WEBPACK_IMPORTED_MODULE_4__["normalizeElevation"])(this._svgHeight - (this._verticalPadding * 2), waypoint.elevation, min, range, this._verticalPadding));
            drawPoints.push([this._svgWidth * totalDistancePerc, elevation]);
            counter += l;
            prevPoint = waypoint;
        }
        // fill til end, back down to 0
        drawPoints.push([this._svgWidth, elevation]);
        drawPoints.push([this._svgWidth, max]);
        if (this._svgCanvas) {
            this._svgCanvas.clear();
        }
        var polyline = this._svgCanvas.polyline(drawPoints).fill('#C3C3C3');
    };
    ScrollbarComponent.prototype._drawGuides = function () {
        for (var i = 1; i < Math.ceil(this._segments) * 5; i++) {
            var line = this._svgCanvas.line((this.main.nativeElement.clientWidth / 5) * i, 0, (this.main.nativeElement.clientWidth / 5) * i, this._svgHeight).stroke({ width: 1, color: '#AAA', opacity: '0.85', dasharray: '2, 2' });
        }
    };
    // svg draws from lop to bottom
    ScrollbarComponent.prototype._invertValue = function (input) {
        return Math.abs(input - 1) + this._verticalPadding;
    };
    // EVENT HANDLERS
    ScrollbarComponent.prototype.onClick = function (event) {
        var percent = (event.clientX + this.mapOffset) / this._svgWidth;
        this.scrollToEvent.emit(percent);
    };
    // fast scrolling
    ScrollbarComponent.prototype._onSlide = function (event) {
        // support touch events and mouse events
        var _xPos = event.srcEvent.x || event.srcEvent.pageX || 0;
        var percent = _xPos / this.main.nativeElement.clientWidth;
        this.scrollToEvent.emit(percent);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('main'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ScrollbarComponent.prototype, "main", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('viewport'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ScrollbarComponent.prototype, "viewport", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ScrollbarComponent.prototype, "trailData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ScrollbarComponent.prototype, "visibleRange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ScrollbarComponent.prototype, "resize", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ScrollbarComponent.prototype, "scrollToEvent", void 0);
    ScrollbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'scrollbar-component',
            template: __webpack_require__(/*! ./scrollbar.component.html */ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.html"),
            styles: [__webpack_require__(/*! ./scrollbar.component.sass */ "./src/app/component/elevation-profile/scrollbar/scrollbar.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ScrollbarComponent);
    return ScrollbarComponent;
}());



/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/guides/guides.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let guide of processedGuides\" [ngStyle]=\"{'margin-top': guide.offset + 'px', 'border-color': guide.color}\" class=\"guide\"></div>\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.sass":
/*!***************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/guides/guides.component.sass ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: fixed;\n  top: 10vh;\n  left: 0;\n  height: 60vh;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  overflow-y: visible;\n  pointer-events: none;\n  z-index: 100; }\n  :host .guide {\n    position: absolute;\n    white-space: nowrap;\n    left: 0;\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    border-top: 1px solid;\n    width: 100%;\n    transition: margin-top 0.1s linear; }\n  :host .guide .max {\n      top: -19px; }\n  :host .guide:first-child {\n    border-top: 2px dashed; }\n  :host .guide:last-child {\n    border-top: 2px dashed; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS92aXJ0dWFsLWxpc3QvZ3VpZGVzL2d1aWRlcy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNDLGNBQWM7RUFDZCxlQUFlO0VBQ2YsU0FBUztFQUNULE9BQU87RUFDUCxZQUFZO0VBQ1osV0FBVztFQUNYLFNBQVM7RUFDVCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixZQUFZLEVBQUE7RUFYYjtJQWNHLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixXQUFXO0lBQ1gsa0NBQWtDLEVBQUE7RUF0QnJDO01BeUJLLFVBQVUsRUFBQTtFQXpCZjtJQTRCRyxzQkFBc0IsRUFBQTtFQTVCekI7SUErQkcsc0JBQXNCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZWxldmF0aW9uLXByb2ZpbGUvdmlydHVhbC1saXN0L2d1aWRlcy9ndWlkZXMuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDEwdmg7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNjB2aDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgb3ZlcmZsb3cteTogdmlzaWJsZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHotaW5kZXg6IDEwMDtcblxuICAuZ3VpZGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIGxlZnQ6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdHJhbnNpdGlvbjogbWFyZ2luLXRvcCAwLjFzIGxpbmVhcjtcblxuICAgIC5tYXgge1xuICAgICAgdG9wOiAtMTlweDsgfSB9XG5cbiAgLmd1aWRlOmZpcnN0LWNoaWxkIHtcbiAgICBib3JkZXItdG9wOiAycHggZGFzaGVkOyB9XG5cbiAgLmd1aWRlOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci10b3A6IDJweCBkYXNoZWQ7IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/guides/guides.component.ts ***!
  \*************************************************************************************/
/*! exports provided: GuidesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuidesComponent", function() { return GuidesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../_util/color */ "./src/app/_util/color.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_trail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_util/trail */ "./src/app/_util/trail.ts");





var GuidesComponent = /** @class */ (function () {
    function GuidesComponent(_element) {
        this.processedGuides = [];
        this._container = _element;
    }
    GuidesComponent.prototype.ngOnInit = function () { };
    GuidesComponent.prototype.ngOnChanges = function (changes) {
        if (this.visibleOHLC) {
            // remove unused guides
            if (this.guides.length < this.processedGuides.length) {
                this.processedGuides.splice(this.processedGuides.length - this.guides.length, this.processedGuides.length - this.guides.length);
            }
            var min = this.visibleOHLC.low; // high point
            var max = this.visibleOHLC.high; // low point
            var range = (max - min);
            var _colors = Object(_util_color__WEBPACK_IMPORTED_MODULE_2__["interpolateColors"])('rgb(187, 97, 0)', 'rgb(62, 125, 158)', this.guides.length);
            var _self = this;
            var _guidesLength = this.guides.length;
            // loop, optimal
            for (var i = 0; i < _guidesLength; i++) {
                var _guide = this.guides[i];
                var elevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_4__["normalizeElevation"])(_self._container.nativeElement.clientHeight, _guide['elevation'], min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].LINEHEIGHT);
                // if item already exists, update
                if (_self.processedGuides[i]) {
                    _self.processedGuides[i]['offset'] = elevation;
                    _self.processedGuides[i]['range'] = _guide['range'];
                    _self.processedGuides[i]['color'] = 'rgba(' + String(_colors[i]) + ',0.5)';
                }
                else {
                    _self.processedGuides.push({
                        offset: elevation,
                        range: _guide['range'],
                        color: 'rgba(' + String(_colors[i]) + ',0.5)'
                    });
                }
            }
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], GuidesComponent.prototype, "visibleOHLC", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], GuidesComponent.prototype, "guides", void 0);
    GuidesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'guides',
            template: __webpack_require__(/*! ./guides.component.html */ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./guides.component.sass */ "./src/app/component/elevation-profile/virtual-list/guides/guides.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], GuidesComponent);
    return GuidesComponent;
}());



/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/labels/labels.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let guide of processedGuides\" [ngStyle]=\"{'margin-top': guide.offset + 'px'}\" class=\"guide\">\n  <span class=\"guide-label {{guide.range}}\">{{guide.label}} ft.</span>\n</div>\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.sass":
/*!***************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/labels/labels.component.sass ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: fixed;\n  top: 10vh;\n  left: 0;\n  height: 60vh;\n  width: 100px;\n  margin: 0;\n  padding: 0;\n  overflow-y: visible;\n  pointer-events: none;\n  z-index: 300; }\n  :host .guide {\n    position: absolute;\n    white-space: nowrap;\n    left: 0;\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    width: 20vw;\n    transition: margin-top 0.1s linear; }\n  :host .guide .guide-label {\n      position: absolute;\n      text-align: left;\n      background-color: rgba(243, 243, 243, 0.75);\n      top: -1px;\n      left: 10px;\n      padding: 4px 6px 2px 6px;\n      line-height: 15px;\n      border-radius: 0 0 4px 0;\n      border: 0.5px solid rgba(136, 178, 199, 0.25);\n      font-size: 12px;\n      -webkit-backdrop-filter: blur(3px);\n              backdrop-filter: blur(3px); }\n  :host .guide .max {\n      top: -23px;\n      border-radius: 0 4px 0 0; }\n  :host .guide .min {\n      top: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS92aXJ0dWFsLWxpc3QvbGFiZWxzL2xhYmVscy5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNDLGNBQWM7RUFDZCxlQUFlO0VBQ2YsU0FBUztFQUNULE9BQU87RUFDUCxZQUFZO0VBQ1osWUFBWTtFQUNaLFNBQVM7RUFDVCxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixZQUFZLEVBQUE7RUFYYjtJQWNHLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsT0FBTztJQUNQLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLFdBQVc7SUFDWCxrQ0FBa0MsRUFBQTtFQXJCckM7TUF3Qkssa0JBQWtCO01BQ2xCLGdCQUFnQjtNQUNoQiwyQ0FBd0M7TUFDeEMsU0FBUztNQUNULFVBQVU7TUFDVix3QkFBd0I7TUFDeEIsaUJBQWlCO01BQ2pCLHdCQUF3QjtNQUN4Qiw2Q0FBNkM7TUFDN0MsZUFBZTtNQUNmLGtDQUEwQjtjQUExQiwwQkFBMEIsRUFBQTtFQWxDL0I7TUFxQ0ssVUFBVTtNQUNWLHdCQUF3QixFQUFBO0VBdEM3QjtNQXlDSyxRQUFRLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZWxldmF0aW9uLXByb2ZpbGUvdmlydHVhbC1saXN0L2xhYmVscy9sYWJlbHMuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDEwdmg7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNjB2aDtcbiAgd2lkdGg6IDEwMHB4O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIG92ZXJmbG93LXk6IHZpc2libGU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB6LWluZGV4OiAzMDA7XG5cbiAgLmd1aWRlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBsZWZ0OiAwO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgd2lkdGg6IDIwdnc7XG4gICAgdHJhbnNpdGlvbjogbWFyZ2luLXRvcCAwLjFzIGxpbmVhcjtcblxuICAgIC5ndWlkZS1sYWJlbCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDMsMjQzLDI0MywwLjc1KTtcbiAgICAgIHRvcDogLTFweDtcbiAgICAgIGxlZnQ6IDEwcHg7XG4gICAgICBwYWRkaW5nOiA0cHggNnB4IDJweCA2cHg7XG4gICAgICBsaW5lLWhlaWdodDogMTVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCA0cHggMDtcbiAgICAgIGJvcmRlcjogMC41cHggc29saWQgcmdiYSgxMzYsIDE3OCwgMTk5LCAwLjI1KTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigzcHgpOyB9ICAgIC8vIHNhZmFyaS9pT1Mgb25seSwgY2F1c2VzIGdsaXRjaGluZy4uLlxuXG4gICAgLm1heCB7XG4gICAgICB0b3A6IC0yM3B4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMCA0cHggMCAwOyB9XG5cbiAgICAubWluIHtcbiAgICAgIHRvcDogMHB4OyB9IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/labels/labels.component.ts ***!
  \*************************************************************************************/
/*! exports provided: LabelsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelsComponent", function() { return LabelsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_trail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../_util/trail */ "./src/app/_util/trail.ts");




var LabelsComponent = /** @class */ (function () {
    function LabelsComponent(_element) {
        this.processedGuides = [];
        this._container = _element;
    }
    ;
    LabelsComponent.prototype.ngOnInit = function () { };
    LabelsComponent.prototype.ngOnChanges = function (changes) {
        if (this.visibleOHLC) {
            // draw labels
            // remove unused guides
            if (this.guides.length < this.processedGuides.length) {
                this.processedGuides.splice(this.processedGuides.length - this.guides.length, this.processedGuides.length - this.guides.length);
            }
            var min = this.visibleOHLC.low; // high point
            var max = this.visibleOHLC.high; // low point
            var range = (max - min);
            var _self = this;
            var _guidesLength = this.guides.length;
            // loop, optimal
            for (var i = 0; i < _guidesLength; i++) {
                var _guide = this.guides[i];
                var elevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_3__["normalizeElevation"])(_self._container.nativeElement.clientHeight, _guide['elevation'], min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].LINEHEIGHT);
                // if item already exists, update
                if (_self.processedGuides[i]) {
                    _self.processedGuides[i]['label'] = _guide['label'];
                    _self.processedGuides[i]['offset'] = elevation + 1;
                    _self.processedGuides[i]['range'] = _guide['range'];
                }
                // else add
                else {
                    _self.processedGuides.push({
                        label: _guide['label'],
                        offset: elevation + 1,
                        range: _guide['range']
                    });
                }
            }
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LabelsComponent.prototype, "visibleOHLC", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], LabelsComponent.prototype, "guides", void 0);
    LabelsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'labels',
            template: __webpack_require__(/*! ./labels.component.html */ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./labels.component.sass */ "./src/app/component/elevation-profile/virtual-list/labels/labels.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]])
    ], LabelsComponent);
    return LabelsComponent;
}());



/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"map\" id=\"map_{{data.id}}\" #map></div>\n<div class=\"markers\" id=\"markers_{{data.id}}\" #markers></div>\n<div class=\"meta\">\n  <div class=\"elevation-container\">\n    <div class=\"elevation-change\">\n      <div class=\"gain\"><fa-icon [icon]=\"['fas', 'long-arrow-alt-up']\" transform=\"rotate-45\"></fa-icon> {{data.elevationGain}} ft.</div>\n      <div class=\"loss\"><fa-icon [icon]=\"['fas', 'long-arrow-alt-down']\" transform=\"rotate--45\"></fa-icon> {{data.elevationLoss}} ft.</div>\n    </div>\n  </div>\n\n  <div class=\"icons\">\n    <span class=\"icon-wrap\" *ngIf=\"hasInvisiblePoi\"><fa-icon [icon]=\"['fas', 'map-marker-alt']\" [ngClass]=\"['fa-fw']\" size=\"sm\"></fa-icon></span>\n    <span class=\"icon-wrap\" *ngIf=\"hasNotes\"><fa-icon [icon]=\"['fas', 'pen-alt']\" [ngClass]=\"['fa-fw']\" size=\"sm\"></fa-icon></span>\n  </div>\n\n  <div class=\"label\" *ngIf=\"!isLast\">{{data.id}}</div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.sass":
/*!*********************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.sass ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: relative;\n  display: inline-block;\n  width: 22.22vw;\n  height: 90vh;\n  border-right: 1px dashed #BBB;\n  align-items: center;\n  overflow: visible; }\n  :host .map, :host .markers {\n    display: block;\n    margin-top: 10vh;\n    width: 22.22vw;\n    height: 60vh;\n    font-size: 1.33em; }\n  :host .markers {\n    overflow: visible;\n    padding-top: 0;\n    top: 0;\n    position: absolute;\n    z-index: 200; }\n  :host .markers svg {\n      shape-rendering: optimizeSpeed; }\n  .meta {\n  position: absolute;\n  bottom: 0;\n  width: 22.22vw;\n  height: 20vh; }\n  .meta .elevation-container {\n    padding-top: 1.5vh;\n    display: flex;\n    width: 100%;\n    justify-content: center; }\n  .meta .elevation-container .elevation-change {\n      text-align: left;\n      font-size: 3.5vh;\n      color: #333; }\n  .meta .label {\n    display: block;\n    position: absolute;\n    box-sizing: border-box;\n    float: right;\n    width: 44px;\n    padding: 2px 3px 2px 3px;\n    bottom: 2vh;\n    right: -22px;\n    z-index: 0;\n    background-color: rgba(243, 243, 243, 0.75);\n    border: 0.5px solid rgba(151, 168, 149, 0.75);\n    border-radius: 3px;\n    font-size: 12px;\n    text-align: center;\n    -webkit-backdrop-filter: blur(6px);\n            backdrop-filter: blur(6px); }\n  .icons {\n  display: block;\n  text-align: center;\n  padding-top: 1vh; }\n  .icons .icon-wrap {\n    display: inline-block;\n    padding: 4px 0;\n    margin: 2px;\n    width: 28px;\n    text-align: center;\n    border: 1px solid #97a895;\n    border-radius: 50%;\n    font-size: 16px;\n    color: #666; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS92aXJ0dWFsLWxpc3QvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNDLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsY0FBYztFQUNkLFlBQVk7RUFDWiw2QkFBNkI7RUFDN0IsbUJBQW1CO0VBQ25CLGlCQUFpQixFQUFBO0VBUGxCO0lBVUcsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsWUFBWTtJQUNaLGlCQUFpQixFQUFBO0VBZHBCO0lBaUJHLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsTUFBTTtJQUNOLGtCQUFrQjtJQUNsQixZQUFZLEVBQUE7RUFyQmY7TUF3QkssOEJBQThCLEVBQUE7RUFFcEM7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULGNBQWM7RUFDZCxZQUFZLEVBQUE7RUFKZDtJQU9JLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsV0FBVztJQUNYLHVCQUF1QixFQUFBO0VBVjNCO01BYU0sZ0JBQWdCO01BQ2hCLGdCQUFnQjtNQUNoQixXQUFXLEVBQUE7RUFmakI7SUFrQkksY0FBYztJQUVkLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsWUFBWTtJQUVaLFdBQVc7SUFDWCx3QkFBd0I7SUFFeEIsV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0lBRVYsMkNBQXdDO0lBQ3hDLDZDQUE2QztJQUU3QyxrQkFBa0I7SUFFbEIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQ0FBMEI7WUFBMUIsMEJBQTBCLEVBQUE7RUFFOUI7RUFDRSxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGdCQUFnQixFQUFBO0VBSGxCO0lBTUkscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsV0FBVztJQUNYLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZWxldmF0aW9uLXByb2ZpbGUvdmlydHVhbC1saXN0L2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDIyLjIydnc7XG4gIGhlaWdodDogOTB2aDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggZGFzaGVkICNCQkI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuXG4gIC5tYXAsIC5tYXJrZXJzIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tdG9wOiAxMHZoO1xuICAgIHdpZHRoOiAyMi4yMnZ3O1xuICAgIGhlaWdodDogNjB2aDtcbiAgICBmb250LXNpemU6IDEuMzNlbTsgfVxuXG4gIC5tYXJrZXJzIHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgICBwYWRkaW5nLXRvcDogMDtcbiAgICB0b3A6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDIwMDtcblxuICAgIHN2ZyB7XG4gICAgICBzaGFwZS1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7IH0gfSB9XG5cbi5tZXRhIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAyMi4yMnZ3O1xuICBoZWlnaHQ6IDIwdmg7XG5cbiAgLmVsZXZhdGlvbi1jb250YWluZXIge1xuICAgIHBhZGRpbmctdG9wOiAxLjV2aDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgLmVsZXZhdGlvbi1jaGFuZ2Uge1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIGZvbnQtc2l6ZTogMy41dmg7XG4gICAgICBjb2xvcjogIzMzMzsgfSB9XG5cbiAgLmxhYmVsIHtcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGZsb2F0OiByaWdodDtcblxuICAgIHdpZHRoOiA0NHB4O1xuICAgIHBhZGRpbmc6IDJweCAzcHggMnB4IDNweDtcblxuICAgIGJvdHRvbTogMnZoO1xuICAgIHJpZ2h0OiAtMjJweDtcbiAgICB6LWluZGV4OiAwO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDMsMjQzLDI0MywwLjc1KTtcbiAgICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYmEoMTUxLCAxNjgsIDE0OSwgMC43NSk7XG5cbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG5cbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpOyB9IH0gICAgLy8gc2FmYXJpL2lPUyBvbmx5LCBjYXVzZXMgZ2xpdGNoaW5nLi4uXG5cbi5pY29ucyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiAxdmg7XG5cbiAgLmljb24td3JhcCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDRweCAwO1xuICAgIG1hcmdpbjogMnB4O1xuICAgIHdpZHRoOiAyOHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTdhODk1O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6ICM2NjY7IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: ListItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemComponent", function() { return ListItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../base/base/base.component */ "./src/app/base/base/base.component.ts");
/* harmony import */ var seedrandom_seedrandom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! seedrandom/seedrandom */ "./node_modules/seedrandom/seedrandom.js");
/* harmony import */ var seedrandom_seedrandom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(seedrandom_seedrandom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_smooth_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_util/smooth-line */ "./src/app/_util/smooth-line.ts");
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../_util/math */ "./src/app/_util/math.ts");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../service/trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _service_snow_generator_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../service/snow-generator.service */ "./src/app/service/snow-generator.service.ts");
/* harmony import */ var _factory_marker_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../factory/marker.service */ "./src/app/factory/marker.service.ts");
/* harmony import */ var _service_note_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../service/note.service */ "./src/app/service/note.service.ts");
/* harmony import */ var _util_trail__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../_util/trail */ "./src/app/_util/trail.ts");














var ListItemComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ListItemComponent, _super);
    function ListItemComponent(_localStorage, _trailGenerator, _snowGenerator, _changeDetectorRef, _markerFactory, _noteService) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this._trailGenerator = _trailGenerator;
        _this._snowGenerator = _snowGenerator;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._markerFactory = _markerFactory;
        _this._noteService = _noteService;
        _this.markerEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.settings = {};
        return _this;
    }
    // LIFECYCLE HOOKS
    ListItemComponent.prototype.ngOnInit = function () {
        var _self = this;
        this._majorPoiTypes = Object(_util_poi__WEBPACK_IMPORTED_MODULE_6__["getMajorPoiTypes"])();
        this._screenMode = this._localStorage.retrieve('screenMode');
        this._trailLength = this._trailGenerator.getTrailData().miles.length;
        // dynamic subscriptions based on PoiTypes that are set as being major (important)
        this._majorPoiTypes.forEach(function (type) {
            _self._getSettingFromStorage(type);
            _self._addSubscription(type);
        });
        // add snowPack subscription
        _self._getSettingFromStorage('snow');
        this._hasInvisiblePoi();
        _self._addSubscription('snow');
    };
    ListItemComponent.prototype.ngAfterViewInit = function () {
        // @ViewChild not always available, so get whichever is largest
        this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth) / 4.5);
        this._svgHeight = Math.floor(Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.6);
        this._lineCanvas = SVG('map_' + this.data.id)
            .size(this._svgWidth, this._svgHeight)
            .viewbox(0, 0, this._svgWidth, this._svgHeight)
            .attr({ focusable: false });
        this._markerSvgCanvas = SVG('markers_' + this.data.id)
            .size(this._svgWidth, this._svgHeight)
            .viewbox(0, 0, this._svgWidth, this._svgHeight)
            .attr({ focusable: false })
            .style('overflow', 'visible');
        this._initialized = true;
    };
    ListItemComponent.prototype.ngOnChanges = function (changes) {
        // since this component requires the dom for drawing svg, it'll have to wait until initialization finishes
        if (!this._initialized) {
            return;
        }
        if (changes.data || changes.visibleOHLC) {
            if (!this.visibleOHLC) {
                return;
            }
            this._snowData = this._snowGenerator.getSnowForMile(this.data.id);
            this._hasInvisiblePoi();
            this._drawMap();
        }
        if (changes.update) {
            console.log('changes, set screenmode, redraw');
            this._screenMode = this._localStorage.retrieve('screenMode');
            this._drawMap();
        }
        if (changes.resize) {
            this._svgWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth) / 4.5);
            this._svgHeight = Math.floor(Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.6);
            // update svg size
            if (this._lineCanvas) {
                var svg = window.document.getElementById(this._lineCanvas.node.id);
                if (svg) {
                    svg.setAttribute('viewBox', '0 0 ' + this._svgWidth + ' ' + this._svgHeight + '');
                    svg.setAttribute('width', this._svgWidth + '');
                    svg.setAttribute('height', this._svgHeight + '');
                }
            }
        }
        if (changes.triggerUserUpdate || changes.user || changes.userStatus) {
            if (this.userStatus !== 'tracking') {
                this._clearUserMarker();
            }
            this._updateUserLocation();
        }
    };
    // add a poi type subscription to the subscriptionsObject
    ListItemComponent.prototype._addSubscription = function (name) {
        var _this = this;
        var _camelName = this.createCamelCaseName(name, 'show');
        this.addSubscription(_camelName, this._localStorage.observe(_camelName).subscribe(function (result) {
            _this.settings[_camelName] = result;
            if (_this._majorPoiTypes.indexOf(name) !== -1) {
                _this._hasInvisiblePoi();
            }
            _this._drawMap();
        }));
    };
    // get initial poi type saved values, as subscriptions only listen to updates
    ListItemComponent.prototype._getSettingFromStorage = function (name) {
        var _camelName = this.createCamelCaseName(name, 'show');
        this.settings[_camelName] = this._localStorage.retrieve(_camelName);
    };
    // used to indicate that this mile has more pois than are being shown in elevation profile
    ListItemComponent.prototype._hasInvisiblePoi = function () {
        var _newValue;
        var _self = this;
        if (this.data.hasMinorPoi) {
            _newValue = true;
        }
        else if (this.data.hasMajorPoi) {
            var _length = this._majorPoiTypes.length;
            for (var i = 0; i < _length; i++) {
                var _type = this._majorPoiTypes[i];
                if (_self.data.poiTypes[_type] !== undefined && !_self.settings[_self.createCamelCaseName(_type, 'show')]) {
                    _newValue = true;
                    break;
                }
            }
        }
        else {
            _newValue = false;
        }
        this._hasNotes();
        // only redraw if needed
        if (this.hasInvisiblePoi !== _newValue) {
            this.hasInvisiblePoi = _newValue;
            this._changeDetectorRef.markForCheck();
        }
    };
    ListItemComponent.prototype._hasNotes = function () {
        var _mileNotes = this._noteService.getNotes('mile', this.data.id);
        var _newValue;
        if (_mileNotes) {
            _newValue = true;
        }
        // only redraw if needed
        if (this.hasNotes !== _newValue) {
            this.hasNotes = _newValue;
            this._changeDetectorRef.markForCheck();
        }
    };
    ListItemComponent.prototype._drawMap = function () {
        this._clearCanvas(true, true);
        // line
        this._drawLine();
        if (this.settings['showSnow']) {
            this._drawSnow();
        }
        // pois
        this._drawTrees();
        this._drawPois();
        if (this.user) {
            this._updateUserLocation();
        }
    };
    // DRAW ELEMENTS
    ListItemComponent.prototype._clearCanvas = function (polyline, markers) {
        if (polyline === void 0) { polyline = true; }
        if (markers === void 0) { markers = false; }
        // polyline canvas
        if (this._lineCanvas && polyline) {
            this._lineCanvas.clear();
        }
        else {
            console.log('no line canvas');
        }
        // marker canvas
        if (this._markerSvgCanvas && markers) {
            if (this._userMarker) {
                this._clearUserMarker();
            }
            this._markerSvgCanvas.clear();
        }
        else {
            console.log('no marker canvas');
        }
        this._lineCanvas.size(this._svgWidth, this._svgHeight);
        this._lineCanvas.viewbox(0, 0, this._svgWidth, this._svgHeight);
    };
    ListItemComponent.prototype._drawLine = function () {
        // console.log('draw line for mile', this.data.id);
        var min = this.visibleOHLC.low; // high point
        var max = this.visibleOHLC.high; // low point
        var range = (max - min);
        var drawPoints = [];
        var _waypointsArr = this.data.waypoints;
        var _waypointDistPerc;
        var _totalWaypoints = _waypointsArr.length;
        for (var i = 0; i < _totalWaypoints; i++) {
            var _waypoint = _waypointsArr[i];
            // calculate distance, starting at 2nd point
            _waypointDistPerc = _waypoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE;
            var _elevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, _waypoint.elevation, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT);
            // set startpoints
            if (i === 0) {
                drawPoints.push([-_environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT, this._svgHeight]);
                drawPoints.push([-_environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT, _elevation]);
            }
            // add point
            drawPoints.push([Math.round(this._svgWidth * _waypointDistPerc), _elevation]);
            // set endpoints
            if (i === _waypointsArr.length - 1) {
                drawPoints.push([this._svgWidth + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT, _elevation]);
                drawPoints.push([this._svgWidth + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT, this._svgHeight]);
            }
        }
        if (this.data.id === this._trailLength) {
            var _waypoint = _waypointsArr[_waypointsArr.length - 1];
            var _lastWaypointDistPerc = _waypoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE;
            this._lineCanvas.size(this._svgWidth * _lastWaypointDistPerc, this._svgHeight);
            this._lineCanvas.viewbox(0, 0, this._svgWidth * _lastWaypointDistPerc, this._svgHeight);
        }
        // draw line
        var _fill = 'rgba(233,225,210, 0.5)';
        if (this._screenMode == 'highContrast') {
            _fill = 'rgba(255,255,255, 0.65)';
        }
        else if (this._screenMode === 'nightHike') {
            _fill = 'rgba(89,89,89, 0.65)';
        }
        var _polyline = this._lineCanvas.path(Object(_util_smooth_line__WEBPACK_IMPORTED_MODULE_4__["svgPath"])(drawPoints)).fill(_fill)
            .stroke({ color: 'red', width: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT });
    };
    ListItemComponent.prototype._drawSnow = function () {
        if (!this._snowData || !this._snowData[0] || this._snowData[0].length < 0) {
            return;
        }
        var _snowArray = this._snowData[0];
        var _waypointsArr = this.data.waypoints;
        // if there is snow
        if (_snowArray) {
            var min = this.visibleOHLC.low; // high point
            var max = this.visibleOHLC.high; // low point
            var range = (max - min);
            var drawPoints = [];
            var _stroke = (this._screenMode === 'highContrast') ? '#97ffff' : 'rgba(255,255,255,0.9)';
            var _totalWaypoints = _waypointsArr.length;
            var _loop_1 = function (i) {
                var _waypoint = _waypointsArr[i];
                var _elevation = 0;
                var elevationRange = function () {
                    // waypoint distance (%) on snowarray elevation range
                    return _snowArray[0].elevation + ((_waypoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE) * ((_snowArray[1].elevation - _snowArray[0].elevation)));
                };
                // if waypoint is above snowline
                if (_waypoint.elevation >= elevationRange()) {
                    // add point
                    _elevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this_1._svgHeight, _waypoint.elevation, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT);
                    drawPoints.push([Math.round(this_1._svgWidth * (_waypoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE)), _elevation]);
                }
                else if (_waypoint.elevation < elevationRange()) {
                    // if trail drops below snowline
                    var snowLine = this_1._lineCanvas.path(Object(_util_smooth_line__WEBPACK_IMPORTED_MODULE_4__["svgPath"])(drawPoints)).fill('rgba(255,255,255,0)')
                        .stroke({ color: _stroke, width: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT * 2, linecap: 'round' });
                    drawPoints = [];
                }
            };
            var this_1 = this;
            for (var i = 0; i < _totalWaypoints; i++) {
                _loop_1(i);
            }
            // if there is still snow to be drawn at the end of loop
            if (drawPoints.length >= 1) {
                var snowLine = this._lineCanvas.path(Object(_util_smooth_line__WEBPACK_IMPORTED_MODULE_4__["svgPath"])(drawPoints)).fill('rgba(255,255,255,0)')
                    .stroke({ color: _stroke, width: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT * 2, linecap: 'round' });
            }
        }
    };
    ListItemComponent.prototype._drawPois = function () {
        var min = this.visibleOHLC.low; // high point
        var max = this.visibleOHLC.high; // low point
        var range = (max - min);
        var _poisArray = this.data.pois;
        // draw markers
        if (_poisArray) {
            var _self = this;
            var _maxPoiDistance = this._localStorage.retrieve('poiMaxDistance');
            var _totalPois = _poisArray.length;
            for (var i = 0; i < _totalPois; i++) {
                var _poi = this._trailGenerator.getPoiById(_poisArray[i]);
                // filter out of range pois
                if (_poi.waypoint.distance >= _maxPoiDistance) {
                    return;
                }
                if (!_poi) {
                    console.log('bug at poi with id: ' + _poi.id);
                }
                var _poiTypes = _poi['type'].split(', ');
                // if poi is of visible type
                var _visibleTypes = [];
                var _poiTypesLength = _poiTypes.length;
                for (var p = 0; p < _poiTypesLength; p++) {
                    var _type = _poiTypes[p];
                    // check if poi type is of visible type based on user settings (only camp/water/highway/end
                    var _setting = _self.settings[_self.createCamelCaseName(_type, 'show')];
                    if (_setting === true) {
                        _visibleTypes.push(_type);
                    }
                }
                if (_visibleTypes.length > 0) {
                    var _markerElevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, _poi.waypoint.elevation, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT / 2);
                    var _marker = this._markerFactory.setupMarker(this._markerSvgCanvas, _poi, _visibleTypes);
                    _marker.click(this._onMarkerClick.bind({ data: _poi, self: this }));
                    _marker.move(this._svgWidth * (_poi.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE), _markerElevation);
                }
            }
        }
    };
    // draw "random" trees below line
    ListItemComponent.prototype._drawTrees = function () {
        var min = this.visibleOHLC.low; // high point
        var max = this.visibleOHLC.high; // low point
        var range = (max - min);
        // only way to execute seedrandom without compile errors
        Math['seedrandom']('' + this.data.id); // reseed
        var _trees = this._markerSvgCanvas.group().addClass('tree-marker');
        if (Object(_util_math__WEBPACK_IMPORTED_MODULE_5__["isPrime"])(this.data.id) || Math.random() * 100 < 25) {
            var _count = Math.round(Math.random() * 4);
            for (var i = 0; i < _count; i++) {
                var primeMarker = this._markerFactory.createSvgFaElement(this._markerSvgCanvas, 'tree', 0.5 + Math.random() * 0.75);
                var treeline = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, this.data.elevationRange.low, min, range, 0);
                treeline = treeline + (Math.random() * (treeline * 2));
                primeMarker.move(Math.random() * this._svgWidth, treeline);
                _trees.add(primeMarker);
            }
        }
    };
    ListItemComponent.prototype._drawUserMarker = function () {
        if (!this.user) {
            return;
        }
        var _onTrail = (this.user.distance <= this._localStorage.retrieve('userDistanceOffTrail'));
        // if user matches in both type & status, move (animate) the current user to it's new position
        // else redraw
        if (this._userMarker) {
            this._userMarker.node.id = this.userStatus;
            var _attr = this._userMarker.node.attributes;
            if (Boolean(_attr.onTrail.value) === _onTrail && _attr.type.value === 'pin' ||
                Boolean(_attr.onTrail.value) === _onTrail && _attr.type.value === 'circle') {
                return; // marker is already what it should be, no need to redraw
            }
            else {
                this._clearUserMarker();
            }
        }
        // create user maker
        if (_onTrail) {
            this._userMarker = this._markerFactory.createSvgPinMarker(this._markerSvgCanvas, '#7f7f7f', 1);
            this._userMarker.use(this._markerFactory.sampleFaIcon('user')).width(16).height(16).move(-8, -39);
        }
        else {
            this._userMarker = this._markerFactory.createSvgCircleMarker(this._markerSvgCanvas, '#7f7f7f', 1);
            this._userMarker.use(this._markerFactory.sampleFaIcon('user')).width(16).height(16).move(-8, -8);
        }
        this._userMarker.node.id = this.userStatus;
        this._userMarker.attr('onTrail', _onTrail);
        this._userMarker.click(this._onUserClick.bind(this));
    };
    ListItemComponent.prototype._clearUserMarker = function () {
        if (this._userMarker) {
            this._userMarker.remove();
            this._userMarker = null;
        }
    };
    // EVENT HANDLERS
    ListItemComponent.prototype._onUserClick = function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
    };
    // linked directly to svg marker
    ListItemComponent.prototype._onMarkerClick = function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var _event = new CustomEvent('markerClick', {
            bubbles: true,
            cancelable: true,
            detail: this.data
        });
        // changed scope
        this['self'].map.nativeElement.dispatchEvent(_event);
    };
    ListItemComponent.prototype._updateUserLocation = function () {
        var min = this.visibleOHLC.low; // high point
        var max = this.visibleOHLC.high; // low point
        var range = (max - min);
        this._drawUserMarker();
        if (this.user && this._userMarker) {
            var _withinVertBounds = (this.user.waypoint.elevation > this.visibleOHLC.low && this.user.waypoint.elevation < this.visibleOHLC.high);
            var _userElevation = 0;
            if (_withinVertBounds) {
                _userElevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, this.user.waypoint.elevation, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT / 2);
            }
            else {
                if (this.user.waypoint.elevation < this.visibleOHLC.low) {
                    _userElevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, this.visibleOHLC.low, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT / 2);
                }
                else {
                    _userElevation = Object(_util_trail__WEBPACK_IMPORTED_MODULE_13__["normalizeElevation"])(this._svgHeight, this.visibleOHLC.high, min, range, _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].LINEHEIGHT / 2);
                }
            }
            // set the user marker position
            if (!this._userMarker.attr('x')) {
                this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE), _userElevation);
            }
            else {
                var _distance = this._trailGenerator.calcDistanceFlat({ latitude: this._userMarker.attr('x'), longitude: this._userMarker.attr('y') }, { latitude: this._svgWidth * (this.user.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE), longitude: _userElevation });
                if (_distance > 1000000) {
                    this._userMarker.move(this._svgWidth * (this.user.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE), _userElevation);
                }
                else {
                    this._userMarker.animate({ duration: 300, ease: '' }).move(this._svgWidth * (this.user.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE), _userElevation);
                }
            }
            this._userMarker.attr('x', this._svgWidth * (this.user.anchorPoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_7__["environment"].MILE));
            this._userMarker.attr('y', _userElevation);
        }
    };
    ListItemComponent.prototype.createCamelCaseName = function (name, prepend, append) {
        prepend = (prepend) ? prepend : '';
        append = (append) ? prepend : '';
        return prepend + name.charAt(0).toUpperCase() + name.slice(1) + append;
    };
    ;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ListItemComponent.prototype, "map", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ListItemComponent.prototype, "markerEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ListItemComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ListItemComponent.prototype, "visibleOHLC", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ListItemComponent.prototype, "guides", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], ListItemComponent.prototype, "isLast", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ListItemComponent.prototype, "resize", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ListItemComponent.prototype, "update", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ListItemComponent.prototype, "user", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], ListItemComponent.prototype, "triggerUserUpdate", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ListItemComponent.prototype, "userStatus", void 0);
    ListItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'display-list-item',
            template: __webpack_require__(/*! ./list-item.component.html */ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./list-item.component.sass */ "./src/app/component/elevation-profile/virtual-list/list-item/list-item.component.sass")]
        })
        // uses basic for loops for performance
        // TODO: iOS scroll performance issues (jumps backwards during scroll event)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_8__["LocalStorageService"],
            _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_9__["TrailGeneratorService"],
            _service_snow_generator_service__WEBPACK_IMPORTED_MODULE_10__["SnowGeneratorService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _factory_marker_service__WEBPACK_IMPORTED_MODULE_11__["MarkerService"],
            _service_note_service__WEBPACK_IMPORTED_MODULE_12__["NoteService"]])
    ], ListItemComponent);
    return ListItemComponent;
}(_base_base_base_component__WEBPACK_IMPORTED_MODULE_2__["BaseComponent"]));



/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/virtual-list.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"background-wrap\">\n  <div class=\"background-layer\" #background></div>\n</div>\n\n<div id=\"wrap\">\n\n  <cdk-virtual-scroll-viewport\n    #scrollViewport\n\n    *ngIf=\"trailData\"\n\n    itemSize=\"{{itemWidth}}\"\n    orientation=\"horizontal\"\n    class=\"virtual-list\"\n\n    (window:resize)=\"onResize($event)\"\n    (scrolledIndexChange)=\"onScroll(scrollViewport, $event)\">\n\n    <display-list-item\n      class=\"list-item\"\n\n      *cdkVirtualFor=\"let li of trailData.miles; let last = last; templateCacheSize: cacheSize; trackBy: trackElementBy\"\n      [resize]=\"resize\"\n      [data]=\"li\"\n      [isLast]=\"last\"\n\n      [user]=\"(user && li.id === user.nearestMileId) ? user : null\"\n      [triggerUserUpdate]=\"(update && user && status === 'tracking' && li.id === user.nearestMileId) ? update : null\"\n      [userStatus] = \"(user && li.id === user.nearestMileId) ? status : null\"\n\n      [visibleOHLC]=\"visibleOHLC\"\n      [guides]=\"guides\"\n      [update]=\"update\"\n\n      (click)=\"onClick(li)\">\n      matRipple\n    </display-list-item>\n\n    <!-- runs under marker layer (in list item) -->\n    <guides id=\"guides\" [visibleOHLC]=\"visibleOHLC\" [guides]=\"guides\"></guides>\n\n  </cdk-virtual-scroll-viewport>\n\n</div>\n\n<!-- runs above marker layer (in list item) -->\n<labels id=\"axis\" [visibleOHLC]=\"visibleOHLC\" [guides]=\"guides\"></labels>\n"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.sass":
/*!**************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/virtual-list.component.sass ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .background-wrap {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden; }\n  :host .background-wrap .background-layer {\n    width: 200vw;\n    height: 90vh;\n    background: url('overlay.png') repeat-x;\n    background-size: auto 100%;\n    position: absolute;\n    left: 0;\n    right: 100vw;\n    top: 0;\n    -webkit-animation-timing-function: linear; }\n  :host .virtual-list {\n  position: unset !important;\n  display: block;\n  width: 100vw;\n  height: 90vh;\n  overflow-y: hidden;\n  white-space: nowrap; }\n  :host /deep/ .cdk-virtual-scroll-orientation-horizontal::-webkit-scrollbar-thumb {\n  background-color: transparent; }\n  :host /deep/ .cdk-virtual-scroll-orientation-horizontal::-webkit-scrollbar-track {\n  background-color: transparent; }\n  :host /deep/ .cdk-virtual-scroll-orientation-horizontal::-webkit-scrollbar {\n  background-color: transparent; }\n  :host /deep/ .cdk-virtual-scroll-orientation-horizontal::-webkit-scrollbar-thumb {\n  background-color: transparent; }\n  :host /deep/ #idle .circle, :host /deep/ #undefined .circle, :host /deep/ #idle .pin, :host /deep/ #undefined .pin {\n  fill: #7f7f7f;\n  stroke: #6c6c6c; }\n  :host /deep/ #fetching .circle, :host /deep/ #fetching .pin {\n  fill: #feff00;\n  stroke: #d7d800; }\n  :host /deep/ #tracking .circle, :host /deep/ #tracking .pin {\n  fill: #00ff00;\n  stroke: #00d800; }\n  :host /deep/ #error .circle, :host /deep/ #error .pin {\n  fill: #ff0100;\n  stroke: #d80100; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9lbGV2YXRpb24tcHJvZmlsZS92aXJ0dWFsLWxpc3QvdmlydHVhbC1saXN0LmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBSUcsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixhQUFhO0VBQ2IsZ0JBQWdCLEVBQUE7RUFQbkI7SUFVSyxZQUFZO0lBQ1osWUFBWTtJQUNaLHVDQUFpRTtJQUNqRSwwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxZQUFZO0lBQ1osTUFBTTtJQUNOLHlDQUF5QyxFQUFBO0VBbEI5QztFQXFCRywwQkFBMEI7RUFDMUIsY0FBYztFQUNkLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQixFQUFBO0VBRXRCO0VBR0csNkJBQTZCLEVBQUE7RUFIaEM7RUFNRyw2QkFBNkIsRUFBQTtFQU5oQztFQVNHLDZCQUE2QixFQUFBO0VBVGhDO0VBWUcsNkJBQTZCLEVBQUE7RUFaaEM7RUFlRyxhQUFhO0VBQ2IsZUFBZSxFQUFBO0VBaEJsQjtFQW1CRyxhQUFhO0VBQ2IsZUFBZSxFQUFBO0VBcEJsQjtFQXVCRyxhQUFhO0VBQ2IsZUFBZSxFQUFBO0VBeEJsQjtFQTJCRyxhQUFhO0VBQ2IsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2VsZXZhdGlvbi1wcm9maWxlL3ZpcnR1YWwtbGlzdC92aXJ0dWFsLWxpc3QuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gIC8vIGFuZHJvaWQgZG9lc24ndCByZXNwZWN0IG92ZXJmbG93IGhpZGRlbiwgc28gaXQgbmVlZHMgYW4gYWJzb2x1dGUgd3JhcFxuICAuYmFja2dyb3VuZC13cmFwIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5iYWNrZ3JvdW5kLWxheWVyIHtcbiAgICAgIHdpZHRoOiAyMDB2dztcbiAgICAgIGhlaWdodDogOTB2aDtcbiAgICAgIGJhY2tncm91bmQ6IHVybCgnLi4vLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9vdmVybGF5LnBuZycpIHJlcGVhdC14O1xuICAgICAgYmFja2dyb3VuZC1zaXplOiBhdXRvIDEwMCU7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDEwMHZ3O1xuICAgICAgdG9wOiAwO1xuICAgICAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7IH0gfVxuXG4gIC52aXJ0dWFsLWxpc3Qge1xuICAgIHBvc2l0aW9uOiB1bnNldCAhaW1wb3J0YW50O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDkwdmg7XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH0gfVxuXG4gOmhvc3QgL2RlZXAvIHtcblxuICAuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxuXG4gIC5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24taG9yaXpvbnRhbDo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XG5cbiAgLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi1ob3Jpem9udGFsOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cblxuICAuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWw6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxuXG4gICNpZGxlIC5jaXJjbGUsICN1bmRlZmluZWQgLmNpcmNsZSwgI2lkbGUgLnBpbiwgI3VuZGVmaW5lZCAucGluIHtcbiAgICBmaWxsOiAjN2Y3ZjdmO1xuICAgIHN0cm9rZTogIzZjNmM2YzsgfVxuXG4gICNmZXRjaGluZyAuY2lyY2xlLCAjZmV0Y2hpbmcgLnBpbiB7XG4gICAgZmlsbDogI2ZlZmYwMDtcbiAgICBzdHJva2U6ICNkN2Q4MDA7IH1cblxuICAjdHJhY2tpbmcgLmNpcmNsZSwgI3RyYWNraW5nIC5waW4ge1xuICAgIGZpbGw6ICMwMGZmMDA7XG4gICAgc3Ryb2tlOiAjMDBkODAwOyB9XG5cbiAgI2Vycm9yIC5jaXJjbGUsICNlcnJvciAucGluIHtcbiAgICBmaWxsOiAjZmYwMTAwO1xuICAgIHN0cm9rZTogI2Q4MDEwMDsgfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/component/elevation-profile/virtual-list/virtual-list.component.ts ***!
  \************************************************************************************/
/*! exports provided: VirtualListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualListComponent", function() { return VirtualListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../base/location-based/location-based.component */ "./src/app/base/location-based/location-based.component.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_screen_mode_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/screen-mode.service */ "./src/app/service/screen-mode.service.ts");







var VirtualListComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](VirtualListComponent, _super);
    function VirtualListComponent(_router, _route, _localStorageService, _screenMode, _changeDetector) {
        var _this = _super.call(this) || this;
        _this._router = _router;
        _this._route = _route;
        _this._localStorageService = _localStorageService;
        _this._screenMode = _screenMode;
        _this._changeDetector = _changeDetector;
        _this.scrollEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.resizeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.guides = [];
        _this._currentIndex = 0;
        _this._initialIndex = 0;
        _this._status = 'idle';
        _this.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
        return _this;
    }
    // LIFECYCLE HOOKS
    VirtualListComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this._initialIndex = (this._route.snapshot) ? Number(this._route.snapshot.queryParams['id']) : 0;
        var _notes = this._localStorageService.retrieve(this.trailData.abbr + '_notes');
        this.cacheSize = Math.floor(this.trailData.miles.length / 10);
        this._setupSubscriptions();
    };
    VirtualListComponent.prototype.ngAfterViewInit = function () {
        var _self = this;
        window.requestAnimationFrame(function () {
            if (_self._initialIndex) {
                _self.scrollViewport.scrollToIndex(_self._initialIndex, 'auto');
            }
        });
    };
    VirtualListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.scrollTo) {
            if (changes.scrollTo.currentValue) {
                if (this.scrollViewport) {
                    this._currentIndex = Math.floor(this.scrollViewport.getDataLength() * changes.scrollTo.currentValue);
                    this.scrollViewport.scrollToIndex(this._currentIndex, 'auto');
                }
            }
        }
    };
    // OVERRIDES
    VirtualListComponent.prototype.onStatusChange = function (status) {
        _super.prototype.onStatusChange.call(this, status);
        if (status !== 'tracking') {
            this._status = status;
        }
        this.onUserLocationChange(this.user);
    };
    VirtualListComponent.prototype.onUserLocationChange = function (user) {
        // if we're switching to tracking
        if (user && this.status === 'tracking' && this.scrollViewport && user.nearestMileId) {
            if (!this._isCentered || this._status !== 'tracking') {
                this.centerOnUser();
                this._isCentered = true;
            }
        }
        this._status = this.status;
        this._changeDetector.markForCheck();
    };
    VirtualListComponent.prototype.centerOnUser = function () {
        _super.prototype.centerOnUser.call(this);
        this._scrollToMile(this.user.nearestMileId);
    };
    VirtualListComponent.prototype._scrollToMile = function (mileId) {
        if (this.user && this.scrollViewport) {
            var _index = (this.user.nearestMileId - 2 < 0) ? 0 : this.user.nearestMileId - 2;
            this.scrollViewport.scrollToIndex(_index, 'auto');
        }
    };
    // EVENTS & HANDLERS
    VirtualListComponent.prototype._setupSubscriptions = function () {
        var _self = this;
        this.toggleParallax(this._localStorageService.retrieve('parallaxEnabled'));
        this.addSubscription('parallax', this._localStorageService.observe('parallaxEnabled').subscribe(function (result) {
            _self.toggleParallax(result);
        }));
        this.addSubscription('screenMode', this._screenMode.screenModeChangeObserver.subscribe(function (result) {
            if (_self.scrollViewport) {
                _self.update = new Date().getTime();
                _self._changeDetector.markForCheck();
            }
        }));
    };
    // parralax effect seems to slow down iOS a lot, optional,
    VirtualListComponent.prototype._onScrollEvent = function (event) {
        var _self = this;
        if (event.target === _self.scrollViewport.elementRef.nativeElement) {
            event.preventDefault();
            event.stopPropagation();
            _self.scrollViewport.checkViewportSize(); // magically fixes everything! somehow...
            var _scrollOffset = -(_self.scrollViewport.measureScrollOffset() * 0.015);
            var _width = _self.scrollViewport.elementRef.nativeElement.clientWidth;
            var _repeated = Math.ceil(_scrollOffset / _width);
            var _finalOffset = _scrollOffset - (_repeated * _width);
            _self.background.nativeElement.style.transform = 'translateX(' + _finalOffset + 'px)';
        }
    };
    VirtualListComponent.prototype.onClick = function (listItem) {
        this._router['scrollToPosition'] = listItem.id - 1;
        this._router.navigate(['detail/', this._router['scrollToPosition']]);
    };
    // only executed once every 250ms as it's a redraw of all list items
    VirtualListComponent.prototype.onResize = function (event) {
        var self = this;
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(function () {
            self.itemWidth = Math.floor(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 4.5);
            self.resize = new Date().getTime();
            self.resizeEvent.emit({ resize: new Date().getTime() });
            self._redraw();
        }, 250);
    };
    VirtualListComponent.prototype.onScroll = function (viewport, index) {
        this._currentIndex = index;
        this._redraw();
    };
    // OTHER
    // calculate the open high low close (for high/low range) for the currently visible elements
    // used to vertically scale svg content and calculate guides etc.
    VirtualListComponent.prototype._calculateVisOHLC = function (visibleRange) {
        var _visibleItems = this.trailData.miles.slice(visibleRange['start'], visibleRange['end']);
        var _highest;
        var _lowest;
        for (var _i = 0, _visibleItems_1 = _visibleItems; _i < _visibleItems_1.length; _i++) {
            var vi = _visibleItems_1[_i];
            var castOhlc = vi['elevationRange'];
            if (!_highest || castOhlc.high > _highest) {
                _highest = castOhlc.high;
            }
            if (!_lowest || castOhlc.low < _lowest) {
                _lowest = castOhlc.low;
            }
        }
        return { open: _visibleItems[0]['open'], high: _highest, low: _lowest, close: _visibleItems[_visibleItems.length - 1]['close'] };
    };
    // calculate the number of guides and their values (used for labels and guides)
    VirtualListComponent.prototype._calculateGuides = function () {
        this.guides = [];
        var _range = this.visibleOHLC.high - this.visibleOHLC.low;
        var _stepSize = (_range > 1000) ? _range / 5 : 200;
        var _startSize = Math.ceil(this.visibleOHLC.low / _stepSize) * _stepSize;
        var _maxSize = Math.ceil(this.visibleOHLC.high / _stepSize) * _stepSize;
        for (var i = _startSize; i < _maxSize; i += _stepSize) {
            this.guides.push({ elevation: i, label: Math.round(i) });
        }
        // max visible elevation
        if (this.guides[this.guides.length - 1]['elevation'] >= this.visibleOHLC.high - (_stepSize / 4)) {
            this.guides.pop();
        }
        this.guides.push({ elevation: this.visibleOHLC.high, label: Math.round(this.visibleOHLC.high), range: 'max' });
        // min visible elevation
        if (this.guides[0]['elevation'] <= this.visibleOHLC.low + (_stepSize / 4)) {
            this.guides.shift();
        }
        this.guides.unshift({ elevation: this.visibleOHLC.low, label: Math.round(this.visibleOHLC.low), range: 'min' });
    };
    // redraw guides and trigger a scroll event (that redraws the list)
    VirtualListComponent.prototype._redraw = function () {
        var _oldRange = this._visibleRange;
        this._visibleRange = this.scrollViewport.getRenderedRange();
        // only if really needed!
        if (_oldRange !== this._visibleRange) {
            this.scrollEvent.emit({ visibleRange: this._visibleRange, scrollX: this.scrollViewport.getOffsetToRenderedContentStart() });
            // prevent redraw if not needed
            var _newOHLC = this._calculateVisOHLC(this._visibleRange);
            if (!this.visibleOHLC || _newOHLC.high !== this.visibleOHLC.high || _newOHLC.low !== this.visibleOHLC.low) {
                this.visibleOHLC = _newOHLC;
                this._calculateGuides();
            }
        }
    };
    // toggle parallax based on settings
    VirtualListComponent.prototype.toggleParallax = function (enable) {
        // Listen for scroll events (angular "events" will not do!), needs to run on window for ios
        if (this._parallaxEnabled && !enable) {
            this.removeEventListener(window, 'scroll');
        }
        else if (!this._parallaxEnabled && enable) {
            this.addEventListener(window, 'scroll', this._onScrollEvent.bind(this), true);
        }
        this._parallaxEnabled = enable;
    };
    // OPTIMISING
    // define ID for better li recycling (according to the CDK virtual scroll docs)
    VirtualListComponent.prototype.trackElementBy = function (index, element) {
        return element.id;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('background'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], VirtualListComponent.prototype, "background", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('backgroundFlat'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], VirtualListComponent.prototype, "backgroundFlat", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('scrollViewport'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_2__["CdkVirtualScrollViewport"])
    ], VirtualListComponent.prototype, "scrollViewport", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], VirtualListComponent.prototype, "trailData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], VirtualListComponent.prototype, "scrollTo", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VirtualListComponent.prototype, "scrollEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VirtualListComponent.prototype, "resizeEvent", void 0);
    VirtualListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'virtual-list-component',
            template: __webpack_require__(/*! ./virtual-list.component.html */ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./virtual-list.component.sass */ "./src/app/component/elevation-profile/virtual-list/virtual-list.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
            _service_screen_mode_service__WEBPACK_IMPORTED_MODULE_6__["ScreenModeService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], VirtualListComponent);
    return VirtualListComponent;
}(_base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_4__["LocationBasedComponent"]));



/***/ }),

/***/ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-icon/fa-icon.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<fa-icon [icon]=\"[data.iconType, data.icon]\" class=\"fa-sample-icon\" [id]=\"'wrapper-' + data.type\"></fa-icon>\n"

/***/ }),

/***/ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.sass":
/*!*********************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-icon/fa-icon.component.sass ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9mYS1zYW1wbGVyL2ZhLWljb24vZmEtaWNvbi5jb21wb25lbnQuc2FzcyJ9 */"

/***/ }),

/***/ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-icon/fa-icon.component.ts ***!
  \*******************************************************************/
/*! exports provided: FaIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaIconComponent", function() { return FaIconComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FaIconComponent = /** @class */ (function () {
    function FaIconComponent() {
    }
    FaIconComponent.prototype.ngOnInit = function () { };
    FaIconComponent.prototype.ngAfterViewInit = function () {
        // fix svg icons, the SVGs need the ID of its container
        var _faWrapper = document.getElementById('wrapper-' + this.data.type);
        _faWrapper.childNodes[0]['id'] = 'sample-' + this.data.type;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FaIconComponent.prototype, "data", void 0);
    FaIconComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'fa-icon-wrapper',
            template: __webpack_require__(/*! ./fa-icon.component.html */ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.html"),
            styles: [__webpack_require__(/*! ./fa-icon.component.sass */ "./src/app/component/fa-sampler/fa-icon/fa-icon.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FaIconComponent);
    return FaIconComponent;
}());



/***/ }),

/***/ "./src/app/component/fa-sampler/fa-sampler.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-sampler.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- sample svg data to clone, static data created from: <fa-icon [icon]=\"['fas', 'campground']\"></fa-icon>-->\n<fa-icon-wrapper *ngFor=\"let poi of data\" [data]=\"poi\" class=\"hidden\"></fa-icon-wrapper>\n<svg id=\"sample-tree\" aria-hidden=\"true\" data-prefix=\"fas\" data-icon=\"tree\" class=\"svg-inline--fa fa-tree fa-w-12 hidden\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><path fill=\"currentColor\" d=\"M378.31 378.49L298.42 288h30.63c9.01 0 16.98-5 20.78-13.06 3.8-8.04 2.55-17.26-3.28-24.05L268.42 160h28.89c9.1 0 17.3-5.35 20.86-13.61 3.52-8.13 1.86-17.59-4.24-24.08L203.66 4.83c-6.03-6.45-17.28-6.45-23.32 0L70.06 122.31c-6.1 6.49-7.75 15.95-4.24 24.08C69.38 154.65 77.59 160 86.69 160h28.89l-78.14 90.91c-5.81 6.78-7.06 15.99-3.27 24.04C37.97 283 45.93 288 54.95 288h30.63L5.69 378.49c-6 6.79-7.36 16.09-3.56 24.26 3.75 8.05 12 13.25 21.01 13.25H160v24.45l-30.29 48.4c-5.32 10.64 2.42 23.16 14.31 23.16h95.96c11.89 0 19.63-12.52 14.31-23.16L224 440.45V416h136.86c9.01 0 17.26-5.2 21.01-13.25 3.8-8.17 2.44-17.47-3.56-24.26z\"></path></svg>\n"

/***/ }),

/***/ "./src/app/component/fa-sampler/fa-sampler.component.sass":
/*!****************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-sampler.component.sass ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".hidden {\n  position: fixed;\n  top: -100px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9mYS1zYW1wbGVyL2ZhLXNhbXBsZXIuY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2ZhLXNhbXBsZXIvZmEtc2FtcGxlci5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oaWRkZW4geyAgICAgICAvLyB1c2VkIGZvciBmb250LWF3ZXNvbWUgc3ZncyBhdCB0b3Agb2YgdGVtcGxhdGVcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IC0xMDBweDsgfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/fa-sampler/fa-sampler.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/fa-sampler/fa-sampler.component.ts ***!
  \**************************************************************/
/*! exports provided: FaSamplerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaSamplerComponent", function() { return FaSamplerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../settings */ "./src/app/settings.ts");



var FaSamplerComponent = /** @class */ (function () {
    function FaSamplerComponent() {
        this.data = _settings__WEBPACK_IMPORTED_MODULE_2__["Settings"].POITYPES;
    }
    FaSamplerComponent.prototype.ngOnInit = function () { };
    FaSamplerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'fa-sampler',
            template: __webpack_require__(/*! ./fa-sampler.component.html */ "./src/app/component/fa-sampler/fa-sampler.component.html"),
            styles: [__webpack_require__(/*! ./fa-sampler.component.sass */ "./src/app/component/fa-sampler/fa-sampler.component.sass")]
        })
        // create a Font awesome icon for each poi type (and hide it), as rendering font awesome as graphic within an SVG gets messy
        // give the svg element the correct id so it can be sampled/cloned by svgjs (through _utils/marker.ts)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FaSamplerComponent);
    return FaSamplerComponent;
}());



/***/ }),

/***/ "./src/app/component/leaflet-map/elements/dynamic-component-manager.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/component/leaflet-map/elements/dynamic-component-manager.ts ***!
  \*****************************************************************************/
/*! exports provided: DynamicComponentManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponentManager", function() { return DynamicComponentManager; });
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_util/timer */ "./src/app/_util/timer.ts");


var DynamicComponentManager = /** @class */ (function () {
    function DynamicComponentManager(map) {
        this._map = map;
    }
    // load an angular component into a leaflet component map, _popupTimer
    DynamicComponentManager.prototype.createPopupComponent = function (location, properties, onTimeOut) {
        var _self = this;
        var _popupContent = this._createDynamicComponent('popup', properties);
        var _popup = leaflet__WEBPACK_IMPORTED_MODULE_0__["popup"]({ closeButton: false, autoClose: true, closeOnClick: true })
            .setLatLng(location)
            .setContent(_popupContent)
            .addTo(this._map);
        Object(_util_timer__WEBPACK_IMPORTED_MODULE_1__["clearTimeOut"])(this._popupTimer);
        this._popupTimer = Object(_util_timer__WEBPACK_IMPORTED_MODULE_1__["setTimeOut"])(4000, function () {
            _self._map.closePopup(_popup);
            onTimeOut();
        });
        _popupContent.timer = this._popupTimer;
        return this._popupTimer;
    };
    // load an angular component into a leaflet component
    DynamicComponentManager.prototype.createTooltipComponent = function (location, properties, onTimeOut) {
        var _self = this;
        var _tooltipContent = this._createDynamicComponent('tooltip', properties);
        var _tooltip = leaflet__WEBPACK_IMPORTED_MODULE_0__["tooltip"]({ autoClose: true, closeOnClick: true })
            .setLatLng(location)
            .setContent(_tooltipContent)
            .addTo(this._map);
        // provide the content component with the correct alignment value
        if (_tooltip.getElement().classList.contains('leaflet-tooltip-left')) {
            _tooltipContent.direction = 'left';
        }
        else {
            _tooltipContent.direction = 'right';
        }
        // disable hide on click
        var _tElement = _tooltip.getElement();
        _tElement.addEventListener('click', function (event) {
            event.stopPropagation();
        });
        Object(_util_timer__WEBPACK_IMPORTED_MODULE_1__["clearTimeOut"])(this._tooltipTimer);
        this._tooltipTimer = Object(_util_timer__WEBPACK_IMPORTED_MODULE_1__["setTimeOut"])(2000, function () {
            _self._map.closeTooltip(_tooltip);
            onTimeOut();
        });
        _tooltipContent.timer = this._tooltipTimer;
        return this._tooltipTimer;
    };
    DynamicComponentManager.prototype._createDynamicComponent = function (type, properties) {
        var _component;
        if (type === 'popup' || type === 'tooltip') {
            var _popup = document.createElement('leaflet-element-popup');
            _component = _popup;
        }
        _component.addEventListener('closed', function () { return document.body.removeChild(_component); });
        // set properties
        if (properties) {
            for (var key in properties) {
                _component[key] = properties[key];
            }
        }
        // add to dom, so I can reference it later
        document.body.appendChild(_component);
        return _component;
    };
    return DynamicComponentManager;
}());



/***/ }),

/***/ "./src/app/component/leaflet-map/elements/popup/popup.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/component/leaflet-map/elements/popup/popup.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper {{position}}\">\n  <div class=\"container {{direction}}\">\n    <span class=\"icon-wrap\" (click)=\"tag()\">\n      <fa-icon class=\"menu\" [icon]=\"['fas', 'pen-alt']\"></fa-icon>\n    </span>\n    <div class=\"content\">\n      <h3>{{label}}</h3>\n      <p>{{description}}</p>\n      <a *ngIf=\"showCoords\" [href]=\"createMapsLatLngLink()\" target=\"_blank\">Coordinates</a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/leaflet-map/elements/popup/popup.component.sass":
/*!***************************************************************************!*\
  !*** ./src/app/component/leaflet-map/elements/popup/popup.component.sass ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  color: #5f5349 !important; }\n  :host .wrapper .container {\n    padding-top: 16.5px; }\n  :host .wrapper .container .icon-wrap {\n      position: absolute;\n      top: -16.5px;\n      left: 0;\n      width: 100%; }\n  :host .wrapper .container .icon-wrap fa-icon {\n        display: inline-block;\n        padding: 5px 0;\n        width: 31px;\n        text-align: center;\n        border: 2px solid #b4a392;\n        background-color: rgba(232, 214, 189, 0.85) !important;\n        border-radius: 50%;\n        font-size: 15px;\n        color: rgba(95, 83, 73, 0.85); }\n  :host .wrapper .container .content h3, :host .wrapper .container .content p {\n      margin: 0 3px; }\n  :host .wrapper .container .content h3 {\n      font-weight: 600 !important; }\n  :host .inline > div {\n    padding-top: 0 !important; }\n  :host .inline > div .icon-wrap {\n      width: 36px !important; }\n  :host .inline > div .icon-wrap fa-icon {\n        width: 24px !important;\n        font-size: 10px !important; }\n  :host .inline > div h3 {\n      padding-top: 3px; }\n  :host .left .icon-wrap {\n    top: -2px !important;\n    left: -36px !important; }\n  :host .right .icon-wrap {\n    top: -2px !important;\n    left: 100% !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9sZWFmbGV0LW1hcC9lbGVtZW50cy9wb3B1cC9wb3B1cC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUVDLHlCQUFpQyxFQUFBO0VBRmxDO0lBT0ssbUJBQW1CLEVBQUE7RUFQeEI7TUFVTyxrQkFBa0I7TUFDbEIsWUFBWTtNQUNaLE9BQU87TUFDUCxXQUFXLEVBQUE7RUFibEI7UUFnQlMscUJBQXFCO1FBQ3JCLGNBQWM7UUFDZCxXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLHlCQUFvQztRQUNwQyxzREFBc0Q7UUFDdEQsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZiw2QkFBNkIsRUFBQTtFQXhCdEM7TUE0QlMsYUFBYSxFQUFBO0VBNUJ0QjtNQStCUywyQkFBMkIsRUFBQTtFQS9CcEM7SUFrQ0cseUJBQXlCLEVBQUE7RUFsQzVCO01BdUNLLHNCQUFzQixFQUFBO0VBdkMzQjtRQTRDTyxzQkFBc0I7UUFDdEIsMEJBQTBCLEVBQUE7RUE3Q2pDO01BK0NLLGdCQUFnQixFQUFBO0VBL0NyQjtJQW9ESyxvQkFBb0I7SUFDcEIsc0JBQXNCLEVBQUE7RUFyRDNCO0lBMERLLG9CQUFvQjtJQUNwQixxQkFBcUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9sZWFmbGV0LW1hcC9lbGVtZW50cy9wb3B1cC9wb3B1cC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG5cbiAgY29sb3I6IHJnYig5NSwgODMsIDczKSAhaW1wb3J0YW50O1xuXG4gIC53cmFwcGVyIHtcblxuICAgIC5jb250YWluZXIge1xuICAgICAgcGFkZGluZy10b3A6IDE2LjVweDtcblxuICAgICAgLmljb24td3JhcCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAtMTYuNXB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcblxuICAgICAgICBmYS1pY29uIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgcGFkZGluZzogNXB4IDA7XG4gICAgICAgICAgd2lkdGg6IDMxcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYigxODAsIDE2MywgMTQ2KTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzMiwgMjE0LCAxODksIDAuODUpICFpbXBvcnRhbnQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgICBjb2xvcjogcmdiYSg5NSwgODMsIDczLCAwLjg1KTsgfSB9XG5cbiAgICAgIC5jb250ZW50IHtcbiAgICAgICAgaDMsIHAge1xuICAgICAgICAgIG1hcmdpbjogMCAzcHg7IH1cblxuICAgICAgICBoMyB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMCAhaW1wb3J0YW50OyB9IH0gfSB9XG5cbiAgLmlubGluZSA+IGRpdiB7XG4gICAgcGFkZGluZy10b3A6IDAgIWltcG9ydGFudDtcblxuICAgIC5pY29uLXdyYXAge1xuICAgICAgLy9wb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudFxuICAgICAgLy93aWR0aDogdW5zZXQgIWltcG9ydGFudFxuICAgICAgd2lkdGg6IDM2cHggIWltcG9ydGFudDtcbiAgICAgIC8vdG9wOiB1bnNldCAhaW1wb3J0YW50XG4gICAgICAvL2xlZnQ6IHVuc2V0ICFpbXBvcnRhbnRcblxuICAgICAgZmEtaWNvbiB7XG4gICAgICAgIHdpZHRoOiAyNHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBweCAhaW1wb3J0YW50OyB9IH1cbiAgICBoMyB7XG4gICAgICBwYWRkaW5nLXRvcDogM3B4OyB9IH1cblxuICAubGVmdCB7XG5cbiAgICAuaWNvbi13cmFwIHtcbiAgICAgIHRvcDogLTJweCAhaW1wb3J0YW50O1xuICAgICAgbGVmdDogLTM2cHggIWltcG9ydGFudDsgfSB9XG5cbiAgLnJpZ2h0IHtcblxuICAgIC5pY29uLXdyYXAge1xuICAgICAgdG9wOiAtMnB4ICFpbXBvcnRhbnQ7XG4gICAgICBsZWZ0OiAxMDAlICFpbXBvcnRhbnQ7IH0gfSB9XG5cbi8vXG4vLyAgI21lbnVcbi8vICAgIHBvc2l0aW9uOiBhYnNvbHV0ZVxuLy8gICAgdG9wOiAtMzNweFxuLy8gICAgbGVmdDogMFxuLy8gICAgd2lkdGg6IDEwMCVcbi8vXG4vLyAgICBidXR0b25cbi8vICAgICAgaGVpZ2h0OiAzM3B4ICFpbXBvcnRhbnRcbi8vICAgICAgd2lkdGg6IDMzcHggIWltcG9ydGFudFxuLy9cbi8vICBoMywgcFxuLy8gICAgbWFyZ2luOiAwIDNweFxuLy8gICAgY29sb3I6IHJnYig5NSwgODMsIDczKSAhaW1wb3J0YW50XG4vL1xuLy8gIGgzXG4vLyAgICBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnRcbi8vXG4vLy5pbmxpbmVcbi8vXG4vLyAgLnJpZ2h0XG4vLyAgICBmbG9hdDogcmlnaHRcbi8vXG4vLyAgICBoM1xuLy8gICAgICBmbG9hdDogcmlnaHRcbi8vXG4vLyAgI21lbnVcbi8vICAgIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50XG4vLyAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2sgIWltcG9ydGFudFxuLy8gICAgd2lkdGg6IHVuc2V0ICFpbXBvcnRhbnRcbi8vICAgIHRvcDogdW5zZXQgIWltcG9ydGFudFxuLy8gICAgbGVmdDogdW5zZXQgIWltcG9ydGFudFxuLy9cbi8vICBoM1xuLy8gICAgZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnRcbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/leaflet-map/elements/popup/popup.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/component/leaflet-map/elements/popup/popup.component.ts ***!
  \*************************************************************************/
/*! exports provided: PopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _factory_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../factory/dialog.service */ "./src/app/factory/dialog.service.ts");
/* harmony import */ var _util_leaflet_converter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_util/leaflet/converter */ "./src/app/_util/leaflet/converter.ts");
/* harmony import */ var _util_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../_util/timer */ "./src/app/_util/timer.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../environments/environment.prod */ "./src/environments/environment.prod.ts");







var PopupComponent = /** @class */ (function () {
    function PopupComponent(_dialogFactory) {
        this._dialogFactory = _dialogFactory;
        this.direction = '';
        this.position = '';
    }
    PopupComponent.prototype.ngOnInit = function () {
        // show button inline if it's a single line popup (meaning a tooltip)
        if (!this.description) {
            this.position = 'inline';
        }
    };
    PopupComponent.prototype.tag = function () {
        if (!this.waypoint && !this.anchorPoint) {
            console.warn('error: popup must have a waypoint or anchorPoint');
            return;
        }
        var _self = this;
        // pause the timer (so the location will still be shown if the user hits cancel)
        Object(_util_timer__WEBPACK_IMPORTED_MODULE_5__["pauseTimeOut"])(this.timer);
        var _callback = function (result) {
            if (result === 'success') {
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_5__["clearTimeOut"])(_self.timer);
            }
            else {
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_5__["resumeTimeOut"])(_self.timer);
            }
        };
        // convert & populate waypoint/anchor
        var _waypoint = (this.waypoint) ? Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_4__["latLngToWaypoint"])(this.waypoint) : undefined;
        if (_waypoint) {
            _waypoint.distance = this.distance || 0;
            _waypoint.distanceTotal = this.distanceTotal || 0;
        }
        var _anchorPoint = (this.anchorPoint) ? Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_4__["latLngToWaypoint"])(this.anchorPoint) : undefined;
        if (_anchorPoint) {
            _anchorPoint.distance = this.distanceTotal - (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].MILE * Math.floor(this.distanceTotal / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_6__["environment"].MILE)) || 0;
            _anchorPoint.distanceTotal = this.distanceTotal || 0;
        }
        var _dialogProperties = {
            type: 'note',
            label: this.label,
            waypoint: _waypoint,
            anchorPoint: _anchorPoint,
            belongsTo: this.belongsTo,
            belongsToType: 'mile'
        };
        this._dialogFactory.openDialog('note', _dialogProperties, _callback);
    };
    PopupComponent.prototype.createMapsLatLngLink = function () {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
            return 'http://maps.apple.com/?ll=' + this.waypoint.lat + ',' + this.waypoint.lng;
        }
        else {
            return 'https://www.google.com/maps/search/?api=1&query=' + this.waypoint.lat + ',' + this.waypoint.lng;
        }
    };
    var _a, _b;
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", typeof (_a = typeof leaflet__WEBPACK_IMPORTED_MODULE_2__ !== "undefined" && leaflet__WEBPACK_IMPORTED_MODULE_2__["latlng"]) === "function" ? _a : Object)
    ], PopupComponent.prototype, "waypoint", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", typeof (_b = typeof leaflet__WEBPACK_IMPORTED_MODULE_2__ !== "undefined" && leaflet__WEBPACK_IMPORTED_MODULE_2__["latlng"]) === "function" ? _b : Object)
    ], PopupComponent.prototype, "anchorPoint", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PopupComponent.prototype, "distance", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PopupComponent.prototype, "distanceTotal", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PopupComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PopupComponent.prototype, "description", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PopupComponent.prototype, "belongsTo", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], PopupComponent.prototype, "showCoords", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _util_timer__WEBPACK_IMPORTED_MODULE_5__["TimerObj"])
    ], PopupComponent.prototype, "timer", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PopupComponent.prototype, "direction", void 0);
    PopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'leaflet-element-popup',
            template: __webpack_require__(/*! ./popup.component.html */ "./src/app/component/leaflet-map/elements/popup/popup.component.html"),
            styles: [__webpack_require__(/*! ./popup.component.sass */ "./src/app/component/leaflet-map/elements/popup/popup.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_factory_dialog_service__WEBPACK_IMPORTED_MODULE_3__["DialogService"]])
    ], PopupComponent);
    return PopupComponent;
}());



/***/ }),

/***/ "./src/app/component/leaflet-map/leaflet-map.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/leaflet-map/leaflet-map.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"leaflet_{{this.name}}\" #leaflet></div>\n"

/***/ }),

/***/ "./src/app/component/leaflet-map/leaflet-map.component.sass":
/*!******************************************************************!*\
  !*** ./src/app/component/leaflet-map/leaflet-map.component.sass ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%; }\n  :host .leaflet-container {\n    height: 100% !important;\n    background-color: rgba(0, 0, 0, 0); }\n  :host .leaflet-pane {\n    width: 100% !important;\n    height: 100% !important; }\n  :host .leaflet-pane .icon-white {\n      color: white; }\n  :host /deep/ #idle .circle, :host /deep/ #undefined .circle, :host /deep/ #idle .pin, :host /deep/ #undefined .pin {\n  fill: #7f7f7f;\n  stroke: #6c6c6c; }\n  :host /deep/ #fetching .circle, :host /deep/ #fetching .pin {\n  fill: #feff00;\n  stroke: #d7d800; }\n  :host /deep/ #tracking .circle, :host /deep/ #tracking .pin {\n  fill: #00ff00;\n  stroke: #00d800; }\n  :host /deep/ #error .circle, :host /deep/ #error .pin {\n  fill: #ff0100;\n  stroke: #d80100; }\n  :host /deep/ .user {\n  color: white;\n  width: 0 !important;\n  height: 0 !important;\n  margin: 0 !important;\n  transition: -webkit-transform .3s ease-out;\n  transition: transform .3s ease-out;\n  transition: transform .3s ease-out, -webkit-transform .3s ease-out;\n  text-rendering: optimizeLegibility; }\n  :host /deep/ #tracking .pulse {\n  position: absolute;\n  top: -13px;\n  left: -13px;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background-color: #4eba00;\n  -webkit-animation: pulse 3s ease-out;\n          animation: pulse 3s ease-out;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  z-index: -1; }\n  :host /deep/ .user-marker svg {\n  position: absolute;\n  top: 2px;\n  shape-rendering: optimizeSpeed;\n  text-rendering: optimizeLegibility; }\n  :host /deep/ .marker svg {\n  position: absolute;\n  top: 6px;\n  left: 6px;\n  shape-rendering: optimizeSpeed;\n  text-rendering: optimizeLegibility; }\n  :host /deep/ .mile-marker .label {\n  background-color: rgba(237, 237, 237, 0.75);\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  padding: 0 3px;\n  width: auto;\n  min-width: 20px;\n  bottom: 0;\n  right: -50%;\n  border: 1px solid #888;\n  border-radius: 3px;\n  font-size: 12px;\n  text-align: center;\n  -webkit-backdrop-filter: blur(3px);\n          backdrop-filter: blur(3px); }\n  :host /deep/ .leaflet-control-scale {\n  padding: 0 0 10px 10px !important;\n  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left) !important; }\n  :host /deep/ .pin-marker {\n  margin: 0 !important;\n  color: white; }\n  :host /deep/ .leaflet-popup-content-wrapper, :host /deep/ .leaflet-tooltip {\n  border-radius: 6px;\n  border: 2px solid #b4a392; }\n  :host /deep/ .leaflet-popup {\n  margin-bottom: 13px !important; }\n  :host /deep/ .leaflet-popup-content-wrapper, :host /deep/ .leaflet-tooltip, :host /deep/ .leaflet-popup-tip {\n  box-shadow: 0px -3px 20px -5px rgba(56, 50, 47, 0.25) !important;\n  text-align: center !important;\n  background-color: rgba(232, 214, 189, 0.85) !important;\n  -webkit-backdrop-filter: blur(3px);\n          backdrop-filter: blur(3px); }\n  :host /deep/ .leaflet-tooltip {\n  border-radius: 5px;\n  padding: 0 2px !important;\n  color: #5f5349;\n  background-color: #e8d6bd !important;\n  pointer-events: unset !important;\n  cursor: default !important; }\n  :host /deep/ .leaflet-popup-tip {\n  width: 6px;\n  height: 6px;\n  margin-top: -4px;\n  background-color: #5f5349 !important; }\n  :host /deep/ .leaflet-popup-tip-container {\n  height: 7px;\n  bottom: -7px; }\n  :host /deep/ .leaflet-popup-content {\n  margin: 0;\n  padding: 0; }\n  :host /deep/ .leaflet-popup-content .btn-pill {\n    background-color: #b4a392;\n    border-radius: 26px;\n    padding: 4px 8px;\n    border: none;\n    color: white !important; }\n  :host /deep/ .leaflet-tooltip-left:before {\n  border-left-color: #5f5349 !important; }\n  :host /deep/ .leaflet-tooltip-right:before {\n  border-right-color: #5f5349 !important; }\n  @-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0.0; }\n  75% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.6; }\n  100% {\n    -webkit-transform: scale(1.65);\n            transform: scale(1.65);\n    opacity: 0.0; } }\n  @keyframes pulse {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 0.0; }\n  75% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0.6; }\n  100% {\n    -webkit-transform: scale(1.65);\n            transform: scale(1.65);\n    opacity: 0.0; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9sZWFmbGV0LW1hcC9sZWFmbGV0LW1hcC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNDLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWSxFQUFBO0VBSGI7SUFNRyx1QkFBdUI7SUFDdkIsa0NBQW9DLEVBQUE7RUFQdkM7SUFVRyxzQkFBc0I7SUFDdEIsdUJBQXVCLEVBQUE7RUFYMUI7TUFjSyxZQUFZLEVBQUE7RUFFakI7RUFHRyxhQUFhO0VBQ2IsZUFBZSxFQUFBO0VBSmxCO0VBT0csYUFBYTtFQUNiLGVBQWUsRUFBQTtFQVJsQjtFQVdHLGFBQWE7RUFDYixlQUFlLEVBQUE7RUFabEI7RUFlRyxhQUFhO0VBQ2IsZUFBZSxFQUFBO0VBaEJsQjtFQW1CRyxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixvQkFBb0I7RUFDcEIsMENBQWtDO0VBQWxDLGtDQUFrQztFQUFsQyxrRUFBa0M7RUFDbEMsa0NBQWtDLEVBQUE7RUF4QnJDO0VBMkJLLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsV0FBVztFQUNYLFdBQVc7RUFDWCxZQUFZO0VBR1osa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLDJDQUFtQztVQUFuQyxtQ0FBbUM7RUFDbkMsV0FBVyxFQUFBO0VBdENoQjtFQXlDRyxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLDhCQUE4QjtFQUM5QixrQ0FBa0MsRUFBQTtFQTVDckM7RUFnREcsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsOEJBQThCO0VBQzlCLGtDQUFrQyxFQUFBO0VBcERyQztFQTBESywyQ0FBMkM7RUFFM0MsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFFdEIsY0FBYztFQUVkLFdBQVc7RUFDWCxlQUFlO0VBRWYsU0FBUztFQUNULFdBQVc7RUFFWCxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBRWxCLGVBQWU7RUFDZixrQkFBa0I7RUFFbEIsa0NBQTBCO1VBQTFCLDBCQUEwQixFQUFBO0VBOUUvQjtFQWtGRyxpQ0FBaUM7RUFDakMsNkhBQTZILEVBQUE7RUFuRmhJO0VBc0ZHLG9CQUFvQjtFQUNwQixZQUFZLEVBQUE7RUF2RmY7RUEwRkcsa0JBQWtCO0VBQ2xCLHlCQUFvQyxFQUFBO0VBM0Z2QztFQThGRyw4QkFBOEIsRUFBQTtFQTlGakM7RUFvR0csZ0VBQTZEO0VBRTdELDZCQUE2QjtFQUM3QixzREFBc0Q7RUFDdEQsa0NBQTBCO1VBQTFCLDBCQUEwQixFQUFBO0VBeEc3QjtFQTJHRyxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGNBQXNCO0VBQ3RCLG9DQUFtRDtFQUNuRCxnQ0FBZ0M7RUFDaEMsMEJBQTBCLEVBQUE7RUFoSDdCO0VBbUhHLFVBQVU7RUFDVixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLG9DQUE0QyxFQUFBO0VBdEgvQztFQXlIRyxXQUFXO0VBQ1gsWUFBWSxFQUFBO0VBMUhmO0VBNkhHLFNBQVM7RUFDVCxVQUFVLEVBQUE7RUE5SGI7SUFpSUsseUJBQW9DO0lBQ3BDLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLHVCQUF1QixFQUFBO0VBckk1QjtFQXdJRyxxQ0FBNkMsRUFBQTtFQXhJaEQ7RUEwSUcsc0NBQThDLEVBQUE7RUFHbEQ7RUFDRTtJQUNFLDJCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsWUFBWSxFQUFBO0VBQ2Q7SUFDRSwyQkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLFlBQVksRUFBQTtFQUNkO0lBQ0UsOEJBQXNCO1lBQXRCLHNCQUFzQjtJQUN0QixZQUFZLEVBQUEsRUFBQTtFQVRoQjtFQUNFO0lBQ0UsMkJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQixZQUFZLEVBQUE7RUFDZDtJQUNFLDJCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsWUFBWSxFQUFBO0VBQ2Q7SUFDRSw4QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLFlBQVksRUFBQSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2xlYWZsZXQtbWFwL2xlYWZsZXQtbWFwLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgLmxlYWZsZXQtY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMCk7IH1cblxuICAubGVhZmxldC1wYW5lIHtcbiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuXG4gICAgLmljb24td2hpdGUge1xuICAgICAgY29sb3I6IHdoaXRlOyB9IH0gfVxuXG4gOmhvc3QgL2RlZXAvIHtcblxuICAjaWRsZSAuY2lyY2xlLCAjdW5kZWZpbmVkIC5jaXJjbGUsICNpZGxlIC5waW4sICN1bmRlZmluZWQgLnBpbiB7XG4gICAgZmlsbDogIzdmN2Y3ZjtcbiAgICBzdHJva2U6ICM2YzZjNmM7IH1cblxuICAjZmV0Y2hpbmcgLmNpcmNsZSwgI2ZldGNoaW5nIC5waW4ge1xuICAgIGZpbGw6ICNmZWZmMDA7XG4gICAgc3Ryb2tlOiAjZDdkODAwOyB9XG5cbiAgI3RyYWNraW5nIC5jaXJjbGUsICN0cmFja2luZyAucGluIHtcbiAgICBmaWxsOiAjMDBmZjAwO1xuICAgIHN0cm9rZTogIzAwZDgwMDsgfVxuXG4gICNlcnJvciAuY2lyY2xlLCAjZXJyb3IgLnBpbiB7XG4gICAgZmlsbDogI2ZmMDEwMDtcbiAgICBzdHJva2U6ICNkODAxMDA7IH1cblxuICAudXNlciB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAwICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAwICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4zcyBlYXNlLW91dDtcbiAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5OyB9XG5cbiAgI3RyYWNraW5nIC5wdWxzZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IC0xM3B4O1xuICAgICAgbGVmdDogLTEzcHg7XG4gICAgICB3aWR0aDogMjZweDtcbiAgICAgIGhlaWdodDogMjZweDtcbiAgICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLW1vei1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGViYTAwO1xuICAgICAgYW5pbWF0aW9uOiBwdWxzZSAzcyBlYXNlLW91dDtcbiAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgei1pbmRleDogLTE7IH1cblxuICAudXNlci1tYXJrZXIgc3ZnIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAycHg7XG4gICAgc2hhcGUtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cblxuXG4gIC5tYXJrZXIgc3ZnIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA2cHg7XG4gICAgbGVmdDogNnB4O1xuICAgIHNoYXBlLXJlbmRlcmluZzogb3B0aW1pemVTcGVlZDtcbiAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5OyB9XG5cbiAgLm1pbGUtbWFya2VyIHtcblxuICAgIC5sYWJlbCB7XG5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjM3LCAyMzcsIDIzNywgMC43NSk7XG5cbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgICAgcGFkZGluZzogMCAzcHg7XG5cbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgbWluLXdpZHRoOiAyMHB4O1xuXG4gICAgICBib3R0b206IDA7XG4gICAgICByaWdodDogLTUwJTtcblxuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzg4ODtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcblxuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoM3B4KTsgfSB9ICAgIC8vIHNhZmFyaS9pT1Mgb25seSwgY2F1c2VzIGdsaXRjaGluZy4uLlxuXG4gIC8vIGZpeCBmb3IgaU9TIG5vdGNoXG4gIC5sZWFmbGV0LWNvbnRyb2wtc2NhbGUge1xuICAgIHBhZGRpbmc6IDAgMCAxMHB4IDEwcHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiBlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCkgZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCkgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pIGVudihzYWZlLWFyZWEtaW5zZXQtbGVmdCkgIWltcG9ydGFudDsgfVxuXG4gIC5waW4tbWFya2VyIHtcbiAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcbiAgICBjb2xvcjogd2hpdGU7IH1cblxuICAubGVhZmxldC1wb3B1cC1jb250ZW50LXdyYXBwZXIsIC5sZWFmbGV0LXRvb2x0aXAge1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMTgwLCAxNjMsIDE0Nik7IH1cblxuICAubGVhZmxldC1wb3B1cCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTNweCAhaW1wb3J0YW50OyB9XG5cbiAgLmxlYWZsZXQtcG9wdXAtY29udGVudC13cmFwcGVyLCAubGVhZmxldC10b29sdGlwLCAubGVhZmxldC1wb3B1cC10aXAge1xuXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggLTNweCAyMHB4IC01cHggcmdiYSg1Niw1MCw0NywwLjI1KSAhaW1wb3J0YW50O1xuICAgIC1tb3otYm94LXNoYWRvdzogMHB4IC0zcHggMjBweCAtNXB4IHJnYmEoNTYsNTAsNDcsMC4yNSkgIWltcG9ydGFudDtcbiAgICBib3gtc2hhZG93OiAwcHggLTNweCAyMHB4IC01cHggcmdiYSg1Niw1MCw0NywwLjI1KSAhaW1wb3J0YW50O1xuXG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzIsIDIxNCwgMTg5LCAwLjg1KSAhaW1wb3J0YW50O1xuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigzcHgpOyB9ICAgIC8vIHNhZmFyaS9pT1Mgb25seSwgY2F1c2VzIGdsaXRjaGluZy4uLlxuXG4gIC5sZWFmbGV0LXRvb2x0aXAge1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiAwIDJweCAhaW1wb3J0YW50O1xuICAgIGNvbG9yOiByZ2IoOTUsIDgzLCA3Myk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzIsIDIxNCwgMTg5LCAxKSAhaW1wb3J0YW50O1xuICAgIHBvaW50ZXItZXZlbnRzOiB1bnNldCAhaW1wb3J0YW50O1xuICAgIGN1cnNvcjogZGVmYXVsdCAhaW1wb3J0YW50OyB9XG5cbiAgLmxlYWZsZXQtcG9wdXAtdGlwIHtcbiAgICB3aWR0aDogNnB4O1xuICAgIGhlaWdodDogNnB4O1xuICAgIG1hcmdpbi10b3A6IC00cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDk1LCA4MywgNzMpICFpbXBvcnRhbnQ7IH1cblxuICAubGVhZmxldC1wb3B1cC10aXAtY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDdweDtcbiAgICBib3R0b206IC03cHg7IH1cblxuICAubGVhZmxldC1wb3B1cC1jb250ZW50IHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcblxuICAgIC5idG4tcGlsbCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgwLCAxNjMsIDE0Nik7XG4gICAgICBib3JkZXItcmFkaXVzOiAyNnB4O1xuICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50OyB9IH1cblxuICAubGVhZmxldC10b29sdGlwLWxlZnQ6YmVmb3JlIHtcbiAgICBib3JkZXItbGVmdC1jb2xvcjogcmdiKDk1LCA4MywgNzMpICFpbXBvcnRhbnQ7IH1cbiAgLmxlYWZsZXQtdG9vbHRpcC1yaWdodDpiZWZvcmUge1xuICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiKDk1LCA4MywgNzMpICFpbXBvcnRhbnQ7IH0gfVxuXG5cbkBrZXlmcmFtZXMgcHVsc2Uge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICBvcGFjaXR5OiAwLjA7IH1cbiAgNzUlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIG9wYWNpdHk6IDAuNjsgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNjUpO1xuICAgIG9wYWNpdHk6IDAuMDsgfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/leaflet-map/leaflet-map.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/leaflet-map/leaflet-map.component.ts ***!
  \****************************************************************/
/*! exports provided: LeafletMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeafletMapComponent", function() { return LeafletMapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_polylinedecorator_dist_leaflet_polylineDecorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet-polylinedecorator/dist/leaflet.polylineDecorator */ "./node_modules/leaflet-polylinedecorator/dist/leaflet.polylineDecorator.js");
/* harmony import */ var leaflet_polylinedecorator_dist_leaflet_polylineDecorator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet_polylinedecorator_dist_leaflet_polylineDecorator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_modules_leaflet_geometryutil_src_leaflet_geometryutil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js */ "./node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js");
/* harmony import */ var node_modules_leaflet_geometryutil_src_leaflet_geometryutil_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_modules_leaflet_geometryutil_src_leaflet_geometryutil_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_modules_leaflet_Geodesic_Leaflet_Geodesic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node_modules/leaflet.Geodesic/Leaflet.Geodesic.js */ "./node_modules/leaflet.Geodesic/Leaflet.Geodesic.js");
/* harmony import */ var node_modules_leaflet_Geodesic_Leaflet_Geodesic_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_modules_leaflet_Geodesic_Leaflet_Geodesic_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_leaflet_plugins_grid_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_util/leaflet/plugins/grid.js */ "./src/app/_util/leaflet/plugins/grid.js");
/* harmony import */ var _util_leaflet_plugins_grid_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_util_leaflet_plugins_grid_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_leaflet_marker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_util/leaflet/marker.js */ "./src/app/_util/leaflet/marker.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../base/location-based/location-based.component */ "./src/app/base/location-based/location-based.component.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _service_snow_generator_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../service/snow-generator.service */ "./src/app/service/snow-generator.service.ts");
/* harmony import */ var _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../service/trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _service_orientation_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../service/orientation.service */ "./src/app/service/orientation.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_screen_mode_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../service/screen-mode.service */ "./src/app/service/screen-mode.service.ts");
/* harmony import */ var _factory_marker_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../factory/marker.service */ "./src/app/factory/marker.service.ts");
/* harmony import */ var _util_leaflet_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../_util/leaflet/icon */ "./src/app/_util/leaflet/icon.ts");
/* harmony import */ var _util_leaflet_calculate__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../_util/leaflet/calculate */ "./src/app/_util/leaflet/calculate.ts");
/* harmony import */ var _util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../_util/leaflet/converter */ "./src/app/_util/leaflet/converter.ts");
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../_util/math */ "./src/app/_util/math.ts");
/* harmony import */ var _service_note_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../service/note.service */ "./src/app/service/note.service.ts");
/* harmony import */ var _util_leaflet_layer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../_util/leaflet/layer */ "./src/app/_util/leaflet/layer.ts");
/* harmony import */ var _util_timer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../_util/timer */ "./src/app/_util/timer.ts");
/* harmony import */ var _elements_dynamic_component_manager__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./elements/dynamic-component-manager */ "./src/app/component/leaflet-map/elements/dynamic-component-manager.ts");
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! geolib */ "./node_modules/geolib/dist/geolib.js");
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_25__);


























var LeafletMapComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LeafletMapComponent, _super);
    function LeafletMapComponent(_route, _snowGenerator, _trailGenerator, _orientationService, _localStorageService, _screenModeService, _markerFactory, _noteService) {
        var _this = _super.call(this) || this;
        _this._route = _route;
        _this._snowGenerator = _snowGenerator;
        _this._trailGenerator = _trailGenerator;
        _this._orientationService = _orientationService;
        _this._localStorageService = _localStorageService;
        _this._screenModeService = _screenModeService;
        _this._markerFactory = _markerFactory;
        _this._noteService = _noteService;
        _this._initialized = false;
        _this._visibleMiles = [];
        _this._renderedData = [];
        _this._popupBelongsTo = -1; // uses mile index, not mile.id
        _this._tileLayers = [];
        _this._trailLayers = leaflet__WEBPACK_IMPORTED_MODULE_1__["layerGroup"]();
        return _this;
    }
    // LIFECYCLE HOOKS
    LeafletMapComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var _self = this;
        this._showMileGrid = this._localStorageService.retrieve('showMileGrid');
        this._animateMap = this._localStorageService.retrieve('animateMap');
        this._trailLength = this._trailGenerator.getTrailData().miles.length;
        this.addSubscription('notes', this._noteService.noteUpdateObserver.subscribe(function (update) {
            if (update === 'added') {
                var _lastAddedNote = _self._noteService.getLastNote();
                // extra check, should
                if (_self._visibleMiles.includes(_lastAddedNote.belongsTo - 1)) {
                    Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(_self._popupTimer);
                    Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(_self._tooltipTimer);
                    _self._addNote(_lastAddedNote);
                }
            }
            else if (update === 'removed') {
                var _deletedNote = _self._noteService.getLastNote();
                _self._removeMarkerByPoiId(_deletedNote.id);
            }
        }));
    };
    LeafletMapComponent.prototype.ngOnChanges = function (changes) {
        if (this._initialized) {
            if (changes.activeMileId) {
                this._dataManager();
                this.onUserLocationChange(this.user);
            }
        }
    };
    LeafletMapComponent.prototype.ngAfterViewInit = function () {
        this._setupMap();
        this._dataManager();
        this.onUserLocationChange(this.user);
        this._initialized = true;
        if (!this.userCentered) {
            this._centerOnPoint(this.centerPoint);
        }
    };
    LeafletMapComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this._removeMiles(this._visibleMiles);
        if (this._map) {
            this._map.eachLayer(function (layer) {
                layer.remove();
            });
            this._map.remove();
            this._map = null;
        }
    };
    // SETUP
    LeafletMapComponent.prototype._setupMap = function () {
        var _self = this;
        // no data, no map
        if (!this.trailGenerator.getTrailData()) {
            console.log('no map data');
            return;
        }
        // create the tile layer (deals with online / offline / missing tiles)
        if (this.showMapTiles) {
            var _url = this._generateTileUrl();
            this._tileLayers.push(Object(_util_leaflet_layer__WEBPACK_IMPORTED_MODULE_22__["createMapTileLayer"])(_url, this._localStorageService.retrieve('detectRetina')));
        }
        // grid layer is only shown on the full map, not the mini map)
        if (this.allowZooming && this._showMileGrid) {
            var _gridLayerArray = Object(_util_leaflet_layer__WEBPACK_IMPORTED_MODULE_22__["createGridLayer"])(this._trailGenerator.getTrailData().abbr);
            this._tileLayers = this._tileLayers.concat(_gridLayerArray);
        }
        this._map = new leaflet__WEBPACK_IMPORTED_MODULE_1__["map"]('leaflet_' + this.name, {
            minNativeZoom: 15,
            maxNativeZoom: 15,
            minZoom: 13.75,
            maxZoom: 16,
            zoomControl: false, attributionControl: false,
            layers: this._tileLayers,
            zoomSnap: 0,
            preferCanvas: true,
            closePopupOnClick: false,
            maxBoundsViscosity: 0.95 // near solid
        });
        this._setupMapListeners();
        this._dynamicComponentManager = new _elements_dynamic_component_manager__WEBPACK_IMPORTED_MODULE_24__["DynamicComponentManager"](this._map);
        this._setMapInteractionProperties();
        // set an initial location
        this._map.setView([0, 0], 15);
        // TODO: temp
        // draw campo
        if (this._trailGenerator.getTrailData().towns) {
            this._drawTown(this._trailGenerator.getTrailData().towns[0]);
        }
        this._trailGenerator.getTrailData().towns.forEach(function (town) {
            _self._drawTown(town);
        });
    };
    // draw pois
    LeafletMapComponent.prototype._drawTown = function (town) {
        var _towns = [];
        _towns.push(this._assembleTownMarker(town));
        var _markerGroup = leaflet__WEBPACK_IMPORTED_MODULE_1__["featureGroup"](_towns);
        _markerGroup.addTo(this._map);
        // draw line from anchor point in direction of town
        if (town.anchorPoint) {
            var _distance = geolib__WEBPACK_IMPORTED_MODULE_25__["getDistance"](Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(town.centerPoint), Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(town.anchorPoint));
            // only draw guide if trail is over a mile away
            // max guide length is 0.2mi
            if (_distance < _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE) {
                return;
            }
            else {
                _distance = ((_distance / 8) > _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE) ? _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE : _distance / 8;
            }
            var _heading = Math.atan2(town.centerPoint.longitude - town.anchorPoint.longitude, town.centerPoint.latitude - town.anchorPoint.latitude) * 180 / Math.PI;
            var _point = this._createPoint(town.anchorPoint, _heading, _distance);
            console.log(_point, town.anchorPoint);
            var _guide = this._createGuide(Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(town.anchorPoint), Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(_point), false, true, 'rgb(0, 255, 0)');
            _guide[0].addTo(this._map);
            _guide[1].addTo(this._map);
        }
    };
    LeafletMapComponent.prototype._assembleTownMarker = function (town) {
        var _element = document.createElement('div');
        var _svg = SVG(_element).size(36, 54).style('overflow', 'visible');
        this._markerFactory.createSvgCircleMarker(_svg, '#FF0000', 0.787878);
        _svg.use(this._markerFactory.sampleFaIcon('town')).width(24).height(24).move(-12, -12);
        var _icon = Object(_util_leaflet_icon__WEBPACK_IMPORTED_MODULE_17__["htmlIcon"])({ className: 'marker town', html: _element });
        var _options = { icon: _icon, town: town };
        var _poiMarker = leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"](Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(town.centerPoint), _options);
        return _poiMarker;
    };
    LeafletMapComponent.prototype._setMapInteractionProperties = function () {
        // panning
        if (!this.allowPanning) {
            this._map.dragging.disable();
        }
        // zooming
        if (!this.allowZooming) {
            this._map['scrollWheelZoom'].disable();
            this._map.touchZoom.disable();
            this._map.doubleClickZoom.disable();
        }
        else {
            // if zoom is enabled, add scale indicator
            leaflet__WEBPACK_IMPORTED_MODULE_1__["control"].scale().addTo(this._map);
        }
    };
    /* setup routines for popup/ indicator showing the poition and trail mileage
    * manually closes popup (disabled feature on map */
    LeafletMapComponent.prototype._setupMapListeners = function () {
        var _self = this;
        // show popup or inditor (and guides)
        this._map.on('click', function (e) {
            // if there's still an overlay, or overlay data, get rid of it.
            if (_self._overlayElements) {
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(_self._popupTimer);
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(_self._tooltipTimer);
                return;
            }
            _self._createPopupTooltip(e);
        });
    };
    // clear all the extra elements that belong to the overlays (popups/tooltips)
    LeafletMapComponent.prototype._clearOverlayElements = function () {
        var _self = this;
        if (this._overlayElements && this._overlayElements.length > 0) {
            this._overlayElements.forEach(function (element) {
                if (_self._map && element) {
                    _self._map.removeLayer(element); // remove
                }
            });
        }
        this._popupBelongsTo = -1;
        this._overlayElements = null;
    };
    // generate a tile url, if online tiles are available (downloaded) use those, else use an online source
    LeafletMapComponent.prototype._generateTileUrl = function () {
        var _version = this._localStorageService.retrieve(this.trailGenerator.getTrailData().abbr + '_tilesVersion');
        if (_version) {
            // appends the ionic webview compatible root directory URL
            return this.fileSystem.rootPath + this.trailGenerator.getTrailData().abbr + '/' + _version + '/tiles/{x}/{y}.png';
        }
        else {
            return _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].onlineTileUrl;
        }
    };
    // display Tooltip (on trail) or Popup (off trail), both use dynamic components as content
    LeafletMapComponent.prototype._createPopupTooltip = function (e) {
        var _self = this;
        var _eLatLngAsWaypoint = Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["latLngToWaypoint"])(e.latlng);
        var _anchor;
        var _nearestPoints;
        // use a plugin to get the nearest point in the nearest (rendered) trail segment.
        // TODO: eliminate the plugin dependency, since I'm only using a single function
        var _closestLayer = leaflet__WEBPACK_IMPORTED_MODULE_1__["GeometryUtil"].closestLayer(this._map, this._trailLayers.getLayers(), e.latlng);
        if (!_closestLayer) {
            return; // no trail
        }
        else {
            var _mile = this._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
            _nearestPoints = this._trailGenerator.findNearestWaypointInMile(_eLatLngAsWaypoint, _mile);
            _anchor = Object(_util_leaflet_calculate__WEBPACK_IMPORTED_MODULE_18__["calculateTrailAnchorPoint"])(_mile, _nearestPoints);
        }
        var _anchorAsLatLng = Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(_anchor); // convert for leaflet
        // if the distance is substantial, show a guideline/popup, else show a tooltip
        var _offTrail = (_nearestPoints[0].distance > this.localStorage.retrieve('poiDistanceOffTrail'));
        if (_offTrail) {
            this._popupBelongsTo = Number(_closestLayer.layer.mileId);
            this._activatePopup(e.latlng, _anchorAsLatLng, _nearestPoints[0].distance, _anchor.distanceTotal);
            // render guides
            this._overlayElements.forEach(function (element) {
                element.addTo(_self._map);
            });
        }
        else {
            this._popupBelongsTo = Number(_closestLayer.layer.mileId);
            this._activateTooltip(_anchorAsLatLng, _anchor.distanceTotal);
            // create empty array for 'click' cycle
            this._overlayElements = [];
        }
    };
    // activate a popup (component)
    LeafletMapComponent.prototype._activatePopup = function (waypoint, anchor, offTrailDistance, nearestMileage) {
        var _offTrailDistanceConverted = Object(_util_math__WEBPACK_IMPORTED_MODULE_20__["distanceInMilesFeet"])(offTrailDistance);
        var _nearestMileageConverted = Object(_util_math__WEBPACK_IMPORTED_MODULE_20__["distanceInMilesFeet"])(nearestMileage);
        var _label = +_offTrailDistanceConverted.distance + ' ' + _offTrailDistanceConverted.unit + ' off trail';
        var _description = 'Nearest: ' + _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance;
        this._popupTimer = this._dynamicComponentManager.createPopupComponent(waypoint, {
            label: _label,
            description: _description,
            waypoint: waypoint,
            anchorPoint: anchor,
            distance: offTrailDistance,
            distanceTotal: nearestMileage,
            belongsTo: this._popupBelongsTo
        }, this._clearOverlayElements.bind(this));
        this._overlayElements = this._createGuide(anchor, waypoint, false, false, 'rgba(255, 0, 0, 0.75)', 3);
    };
    // activate a tooltip (component)
    LeafletMapComponent.prototype._activateTooltip = function (waypoint, nearestMileage) {
        var _nearestMileageConverted = Object(_util_math__WEBPACK_IMPORTED_MODULE_20__["distanceInMilesFeet"])(nearestMileage);
        _nearestMileageConverted.unit = String(_nearestMileageConverted.unit).charAt(0).toUpperCase() + String(_nearestMileageConverted.unit).slice(1);
        this._dynamicComponentManager.createTooltipComponent(waypoint, {
            waypoint: waypoint,
            anchorPoint: waypoint,
            label: _nearestMileageConverted.unit + ' ' + _nearestMileageConverted.distance,
            distance: 0,
            distanceTotal: nearestMileage,
            belongsTo: this._popupBelongsTo
        }, this._clearOverlayElements.bind(this));
    };
    // ELEMENT CREATION
    // manages the visible data (mile segments, markers, guides and snow)
    // the map only renders what should be visible based on the range provided)
    LeafletMapComponent.prototype._dataManager = function () {
        if (!this.range) {
            return;
        }
        // get visible miles
        var _relativeRange = { start: this.activeMileId - this.range['behind'], end: this.activeMileId + this.range['ahead'] };
        var _oldmMilesToDelete = [];
        var _newVisibleMiles = [];
        if (_relativeRange.start < _relativeRange.end - 9) {
            this._renderedCenterMileId = _relativeRange.start + Math.floor((_relativeRange.end - _relativeRange.start) / 2);
        }
        else {
            this._renderedCenterMileId = -1;
        }
        // create range array (check for trail ends)
        for (var i = _relativeRange.start; i <= _relativeRange.end; i++) {
            if (i >= 0 && i < this._trailGenerator.getTrailData().miles.length) {
                _newVisibleMiles.push(i);
            }
        }
        // compare drawn miles array to new visibleMiles
        var _visibleMilesLength = this._visibleMiles.length;
        for (var i = 0; i < _visibleMilesLength; i++) {
            var _mileId = this._visibleMiles[i];
            if (_newVisibleMiles.indexOf(_mileId) < 0) {
                _oldmMilesToDelete.push(_mileId);
            }
            else {
                _newVisibleMiles.splice(_newVisibleMiles.indexOf(_mileId), 1);
            }
        }
        this._drawMiles(_newVisibleMiles);
        this._setBounds();
        this._removeMiles(_oldmMilesToDelete);
        this._visibleMiles = this._visibleMiles.concat(_newVisibleMiles);
    };
    // draw all mile data
    LeafletMapComponent.prototype._drawMiles = function (mileIds) {
        var _self = this;
        if (mileIds.length === 0) {
            return;
        }
        var _mileIdsLength = mileIds.length;
        for (var i = 0; i < _mileIdsLength; i++) {
            var _mileId = mileIds[i];
            if (_self._visibleMiles.indexOf(_mileId) !== -1) {
                return;
            }
            var _mile = _self._trailGenerator.getTrailData().miles[_mileId];
            if (!_mile) {
                return;
            }
            if (_mile.id === _self.activeMileId) {
                _self._centerpoint = _mile.centerpoint;
            }
            _self._renderedData[_mileId] = {};
            _self._drawTrail(_mile, _mileId);
            _self._drawSnow(_mile, _mileId);
            _self._drawPois(_mile, _mileId);
            _self._drawNotes(_mile, _mileId);
        }
    };
    // removes miles (trail/snow/pois/labels/lines that are no longer visible
    LeafletMapComponent.prototype._removeMiles = function (mileIds) {
        var _self = this;
        if (mileIds.length === 0) {
            return;
        }
        var _mileIdsLength = mileIds.length;
        for (var i = 0; i < _mileIdsLength; i++) {
            var _mileId = mileIds[i];
            if (_self._popupBelongsTo === _mileId + 1) {
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(this._popupTimer);
                Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(this._tooltipTimer);
            }
            try {
                if (_self._renderedData[_mileId] && _self._map) {
                    // remove miles/markers/snow data/notes
                    for (var key in _self._renderedData[_mileId]) {
                        // clear from trailLayers
                        if (key === 'trail') {
                            _self._trailLayers.removeLayer(_self._renderedData[_mileId].trail);
                        }
                        _self._map.removeLayer(_self._renderedData[_mileId][key]);
                        if (key === 'markers' || key === 'notes') {
                            _self._renderedData[_mileId][key].clearLayers();
                        }
                        _self._renderedData[_mileId][key] = null;
                        delete _self._renderedData[_mileId][key];
                    }
                    // clear container
                    _self._renderedData[_mileId] = null;
                    delete _self._renderedData[_mileId];
                    _self._visibleMiles.splice(_self._visibleMiles.indexOf(_mileId), 1);
                    // this leaves the array structure in place (it'll be the length of the trail, as we're using the index for reference)
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    // TODO: there is overlap between this and how the elevation profile deals with the same data, could/should be optimised
    // draw trail line segment
    LeafletMapComponent.prototype._drawTrail = function (mile, index) {
        var _waypoints = [];
        var _waypointsLength = mile.waypoints.length;
        for (var i = 0; i < _waypointsLength; i++) {
            var _wp = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](mile.waypoints[i].latitude, mile.waypoints[i].longitude, mile.waypoints[i].elevation);
            _waypoints.push(_wp);
        }
        // draw waypoints
        var _trailLine = new leaflet__WEBPACK_IMPORTED_MODULE_1__["Polyline"](_waypoints, {
            color: 'red', weight: 4, opacity: 1, smoothFactor: 0
        });
        _trailLine['mileId'] = mile.id; // set the mileId for referencing
        this._renderedData[index].trail = _trailLine;
        this._trailLayers.addLayer(_trailLine);
        _trailLine.addTo(this._map);
    };
    LeafletMapComponent.prototype._drawSnow = function (mile, index) {
        var _this = this;
        var _snowData = this._snowGenerator.getSnowForMile(index);
        var snowMile = (_snowData) ? _snowData[0] : undefined;
        var _snowPoints = [];
        if (snowMile) {
            mile.waypoints.forEach(function (waypoint) {
                function elevationRange() {
                    // waypoint distance (%) on snowarray elevation range
                    return snowMile[0].elevation + ((waypoint.distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE) * ((snowMile[1].elevation - snowMile[0].elevation)));
                }
                // if waypoint is above showline
                if (waypoint.elevation >= elevationRange()) {
                    // add point
                    var _wp = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](waypoint.latitude, waypoint.longitude, waypoint.elevation);
                    _snowPoints.push(_wp);
                }
                else if (waypoint.elevation < elevationRange() && _snowPoints.length > 0) {
                    _this._drawSnowLine(_snowPoints, index);
                    _snowPoints = [];
                }
            });
            // if there is still snow to be drawn at the end of loop
            if (_snowPoints.length > 0) {
                this._drawSnowLine(_snowPoints, index);
            }
        }
    };
    // draw snow line segment
    LeafletMapComponent.prototype._drawSnowLine = function (waypoints, index) {
        var _stroke = (this._screenModeService.screenModeSubject.getValue() === 'highContrast') ? '#97ffff' : 'rgba(255,255,255,0.9)';
        // draw waypoints
        var _snowLine = new leaflet__WEBPACK_IMPORTED_MODULE_1__["Polyline"](waypoints, {
            color: _stroke, weight: 8, smoothFactor: 0
        });
        this._renderedData[index].snow = _snowLine;
        _snowLine.addTo(this._map);
    };
    LeafletMapComponent.prototype._assemblePoiMarker = function (poi, optionalMarkerParams) {
        var _element = document.createElement('div');
        var _svg = SVG(_element).size(36, 54).style('overflow', 'visible');
        this._markerFactory.setupMarker(_svg, poi, null);
        var _poiTypeClasses = poi.type.split(',').join('');
        var _icon = Object(_util_leaflet_icon__WEBPACK_IMPORTED_MODULE_17__["htmlIcon"])({ className: 'marker ' + _poiTypeClasses, html: _element });
        var _options = { icon: _icon, poi: poi };
        // add additional params to marker
        if (optionalMarkerParams) {
            _options = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _options, optionalMarkerParams);
        }
        var _poiMarker = leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"](Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_19__["waypointToLatLng"])(poi.waypoint), _options);
        _poiMarker.on('click', this._onMarkerClick.bind({ data: poi, self: this }));
        return _poiMarker;
    };
    ;
    // draw pois
    LeafletMapComponent.prototype._drawPois = function (mile, index) {
        var _mileMarkers = [];
        if (mile.id !== 1) {
            // startMile marker
            _mileMarkers = _mileMarkers.concat(this._createLabelMarker(index, mile));
        }
        // pois sit on top of label markers
        if (this.showPois) {
            var _maxPoiDistance = this.localStorage.retrieve('poiMaxDistance');
            if (mile.pois) {
                var _poiLength = mile.pois.length;
                for (var i = 0; i < _poiLength; i++) {
                    var _poi = this._trailGenerator.getPoiById(mile.pois[i]);
                    // filter out of range pois (TODO: side trails)
                    if (_poi.waypoint.distance >= _maxPoiDistance) {
                        return;
                    }
                    _mileMarkers.push(this._assemblePoiMarker(_poi));
                }
            }
        }
        var _markerGroup = leaflet__WEBPACK_IMPORTED_MODULE_1__["featureGroup"](_mileMarkers);
        this._renderedData[index].markers = _markerGroup;
        _markerGroup.addTo(this._map);
    };
    // notes are pois, but they're excluded from the marker feature group, meaning they'll be ignored for map bounds
    LeafletMapComponent.prototype._drawNotes = function (mile, index) {
        var _noteMarkers = [];
        var _mileNotes = this._noteService.getNotes('mile', mile.id - 1);
        if (_mileNotes) {
            var _length = _mileNotes.length;
            for (var i = 0; i < _length; i++) {
                var _note = _mileNotes[i];
                _noteMarkers.push(this._assemblePoiMarker(_note));
            }
        }
        var _notesGroup = leaflet__WEBPACK_IMPORTED_MODULE_1__["featureGroup"](_noteMarkers);
        this._renderedData[index].notes = _notesGroup;
        _notesGroup.addTo(this._map);
    };
    // add a single note, using the bounce animation
    LeafletMapComponent.prototype._addNote = function (note) {
        var _bounce = {
            bounceOnAdd: true,
            bounceOnAddOptions: { duration: 600, height: 55 },
        };
        var _noteMarker = this._assemblePoiMarker(note, _bounce);
        this._renderedData[note.belongsTo].notes.addLayer(_noteMarker);
    };
    LeafletMapComponent.prototype._drawUser = function () {
        var _self = this;
        if (!this._userMarker) {
            this._userMarker = this._createUserMarker(this.user);
        }
        if (this.user && this._map && this.user.waypoint) {
            var _userLocation = new leaflet__WEBPACK_IMPORTED_MODULE_1__["LatLng"](this.user.waypoint.latitude, this.user.waypoint.longitude);
            this._userMarker.setLatLng(_userLocation);
            this._userMarker.on('click', function (e) {
                var _closestLayer = leaflet__WEBPACK_IMPORTED_MODULE_1__["GeometryUtil"].closestLayer(_self._map, _self._trailLayers.getLayers(), e.latlng);
                if (_closestLayer) {
                    // get the nearest point(s) for mile (own data routine)
                    var _mile = _self._trailGenerator.getTrailData().miles[Number(_closestLayer.layer.mileId) - 1];
                    var _nearestPoints = _self._trailGenerator.findNearestWaypointInMile(_self.user.waypoint, _mile);
                    var _nearestMileage = (_self.user.anchorPoint.distanceTotal / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE).toFixed(2);
                    var _onOffTrailString = void 0;
                    var _2ndLine = '';
                    // TODO: user also has a distance from trail value, needs to be displayed?
                    var _offTrail = (_nearestPoints[0].distance > _self.localStorage.retrieve('poiDistanceOffTrail'));
                    if (_offTrail) {
                        _onOffTrailString = (_nearestPoints[0].distance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE).toFixed(2) + ' mi. off trail';
                        _2ndLine = 'Nearest: mi. ' + _nearestMileage;
                    }
                    else {
                        _onOffTrailString = 'On trail';
                        _2ndLine = 'mi. ' + _nearestMileage;
                    }
                    _self._dynamicComponentManager.createPopupComponent(e.latlng, {
                        waypoint: e.latlng,
                        label: _onOffTrailString,
                        description: _2ndLine,
                        distance: _nearestPoints[0].distance,
                        distanceTotal: _nearestMileage,
                        showCoords: true
                    }, _self._clearOverlayElements.bind(_self));
                }
            });
            this._userMarker.addTo(this._map);
        }
    };
    LeafletMapComponent.prototype._setBounds = function () {
        if (!this.poiRange) {
            return;
        }
        // get the poi map objects
        var _bounds = [];
        var _rLength = this._renderedData.length;
        var _visibleMileCount = 0;
        for (var i = 0; i < _rLength; i++) {
            var _mileData = this._renderedData[i];
            if (_mileData && _mileData.markers) {
                for (var key in _mileData.markers._layers) {
                    var _marker = _mileData.markers._layers[key];
                    if (_marker.options.poi && this.poiRange.indexOf(_marker.options.poi.id) !== -1
                        || _marker.options.mileNumber && this.mileRange.indexOf(Number(_marker.options.mileNumber)) !== -1) {
                        if (_visibleMileCount < 5) {
                            _visibleMileCount++;
                            _bounds.push(_marker);
                        }
                    }
                }
            }
        }
        if (_bounds.length > 0) {
            var _group = new leaflet__WEBPACK_IMPORTED_MODULE_1__["featureGroup"](_bounds, this.centerPoint);
            this._map.stop();
            // else center on the center mile of the rendered range.
            if (this._renderedCenterMileId === -1) {
                this._map.fitBounds(_group.getBounds(), { animate: this._animateMap, duration: 0.5, maxZoom: 16 });
            }
            else {
                var _centerPoint = this._trailGenerator.getTrailData().miles[this._renderedCenterMileId].centerpoint;
                this._map.setView([_centerPoint['latitude'], _centerPoint['longitude']], 13.75, { animate: this._animateMap, duration: 0.5, maxZoom: 16 });
            }
        }
    };
    LeafletMapComponent.prototype._centerOnPoint = function (point, forceAnimate) {
        if (this._map) {
            var _animate = (this.userCentered || this._animateMap);
            if (forceAnimate) {
                _animate = forceAnimate;
            }
            this._map.panTo([point.latitude, point.longitude], { animate: _animate, duration: 0.5, maxZoom: 16 });
        }
    };
    LeafletMapComponent.prototype.centerOnUser = function () {
        if (this.user) {
            this._centerOnPoint(this.user.waypoint);
        }
    };
    // EVENT HANDLERS
    // linked directly to svg marker (scope change)
    LeafletMapComponent.prototype._onMarkerClick = function (event) {
        // clear all overlays
        Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(this['self']._popupTimer);
        Object(_util_timer__WEBPACK_IMPORTED_MODULE_23__["clearTimeOut"])(this['self']._tooltipTimer);
        // center on the marker you just clicked
        this['self']._centerOnPoint(this['data'].waypoint, true);
        var _event = new CustomEvent('markerClick', {
            bubbles: true,
            cancelable: true,
            detail: this['data']
        });
        // get DOM element on changed scope
        this['self']._map._container.dispatchEvent(_event);
    };
    LeafletMapComponent.prototype.onStatusChange = function (status) {
        _super.prototype.onStatusChange.call(this, status);
        this.onUserLocationChange(this.user);
    };
    LeafletMapComponent.prototype.onUserLocationChange = function (user) {
        // use the id for status
        if (this._userMarker) {
            this._userMarker._icon.id = this.status;
        }
        _super.prototype.onUserLocationChange.call(this, user);
        if (this._map) {
            this._drawUser();
        }
        if (this.userCentered) {
            this.centerOnUser();
        }
    };
    // CREATE MAP ELEMENTS
    // a label marker is drawn at the start of a mile
    LeafletMapComponent.prototype._createLabelMarker = function (index, mile) {
        var _labelElements = [];
        /* calculate the exact X (start) location for the mile,
        miles overlap so it's somewhere between point 0 and 1
        [0]=====[X]=====[1] */
        // calculate percentage of X point in total covered distance by 2 points
        var _xDistance = Math.abs(mile.waypoints[0].distance) + mile.waypoints[1].distance;
        var _xPercentage = Math.abs(mile.waypoints[0].distance) / _xDistance;
        // calculate lang/long/elevation based on percentage
        var _xPoint = {
            latitude: mile.waypoints[0].latitude + ((mile.waypoints[1].latitude - mile.waypoints[0].latitude) * _xPercentage),
            longitude: mile.waypoints[0].longitude + ((mile.waypoints[1].longitude - mile.waypoints[0].longitude) * _xPercentage),
            elevation: mile.waypoints[0].elevation + ((mile.waypoints[1].elevation - mile.waypoints[0].elevation) * _xPercentage),
            distance: 0,
            distanceTotal: (mile.id - 1) * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE
        };
        /* calculate the position of the mile marker based on the angle of the trail
        * there are 2 measurements:
        * - a long one (based on a quarter mile in either direction
        * - a short one (based on 2 points ahead / 2 points behind
        *
        * depending on the angle and the direction a new point is generated
        * depending on the sharpness of bend the marker distance is calucated*/
        // TODO: optimise / cleanup, works fine, could/should be shorter/clearer
        var _prevMile = this._trailGenerator.getTrailData().miles[index - 1];
        var _nearPoint = mile.waypoints[2];
        var _prevNearPoint = _prevMile.waypoints[_prevMile.waypoints.length - 3];
        var _prevCenter = _prevMile.centerpoint;
        var _mileCenter = mile.centerpoint;
        var _quarterMilePoint = {
            latitude: (_xPoint.latitude + Number(_mileCenter['latitude'])) / 2,
            longitude: (_xPoint.longitude + Number(_mileCenter['longitude'])) / 2,
        };
        var _prevQuarterMilePoint = {
            latitude: (_xPoint.latitude + Number(_prevCenter['latitude'])) / 2,
            longitude: (_xPoint.longitude + Number(_prevCenter['longitude'])) / 2,
        };
        var _prevQPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_prevQuarterMilePoint['latitude'], _prevQuarterMilePoint['longitude'], 0);
        var _qPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_quarterMilePoint['latitude'], _quarterMilePoint['longitude'], 0);
        var _zPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_xPoint.latitude, _xPoint.longitude, 0);
        var _nPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_nearPoint.latitude, _nearPoint.longitude, 0);
        var _prevNPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_prevNearPoint.latitude, _prevNearPoint.longitude, 0);
        var calcHeading = function (waypoint1, waypoint2) {
            return Math.atan2(waypoint2.lng - waypoint1.lng, waypoint2.lat - waypoint1.lat) * 180 / Math.PI;
        };
        var _headingLong = calcHeading(_zPoint, _qPoint);
        var _headingLongPrev = calcHeading(_prevQPoint, _zPoint);
        var _headingShort = calcHeading(_zPoint, _nPoint);
        var _headingShortPrev = calcHeading(_prevNPoint, _zPoint);
        var _longBend = _headingLong - _headingLongPrev;
        var _shortBend = _headingShort - _headingShortPrev;
        var _shortPrevLongBend = _headingShort - _headingLongPrev;
        var _useShort;
        var _overHalf;
        if (_longBend > 0) {
            if (_shortPrevLongBend < _longBend) {
                _useShort = true;
            }
            else {
                _overHalf = true;
            }
        }
        else {
            if (_shortPrevLongBend > _longBend) {
                _useShort = true;
            }
            else {
            }
        }
        if (_useShort) {
            if (_shortBend > 0) {
                _overHalf = true;
            }
        }
        // the actual angle calculation
        var _startAngle = (_useShort) ? _headingShortPrev : _headingLongPrev;
        var _offsetAngle = (_useShort) ? _shortBend : _longBend;
        // distance gets smaller the sharper the corner is...
        var _distancePerc = 1 - Math.abs(_offsetAngle / 180);
        var _angle = _startAngle + (_offsetAngle / 2);
        _angle = (_overHalf) ? _angle - 90 : _angle + 90;
        // from -180 to 180
        if (_angle > 180) {
            _angle = -180 - (_angle - 180);
        }
        else if (_angle < -180) {
            _angle = 180 - Math.abs(_angle - 180);
        }
        var _distance = (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_10__["environment"].MILE / 8) * _distancePerc;
        console.log(_distance);
        var _point = this._createPoint(_xPoint, _angle, _distance);
        var _labelIcon = leaflet__WEBPACK_IMPORTED_MODULE_1__["divIcon"]({ className: 'mile-marker', html: '<div class="label">' + (mile.id - 1) + '</div>' });
        _labelElements.push(leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"]([_point.latitude, _point.longitude], { icon: _labelIcon, mileNumber: mile.id - 1 }));
        var _newPoint = new leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"](_point.latitude, _point.longitude, 0);
        if (_distance > 0) {
            _labelElements = _labelElements.concat(this._createGuide(_zPoint, _newPoint));
        }
        return _labelElements;
    };
    // create a point based on distance/angle of another point
    LeafletMapComponent.prototype._createPoint = function (point, angle, meters) {
        var toRad = function (deg) {
            return deg * Math.PI / 180;
        };
        var toDeg = function (rad) {
            return rad * 180 / Math.PI;
        };
        var dist = (meters / 1000) / 6371;
        angle = toRad(angle);
        var lat1 = toRad(point.latitude), lon1 = toRad(point.longitude);
        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(angle));
        var lon2 = lon1 + Math.atan2(Math.sin(angle) * Math.sin(dist) *
            Math.cos(lat1), Math.cos(dist) - Math.sin(lat1) *
            Math.sin(lat2));
        if (isNaN(lat2) || isNaN(lon2)) {
            return;
        }
        return { latitude: toDeg(lat2), longitude: toDeg(lon2), elevation: 0 };
    };
    // create an svg user marker
    LeafletMapComponent.prototype._createUserMarker = function (user) {
        if (!user) {
            return;
        }
        return leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"]([user.waypoint.latitude, user.waypoint.longitude], { icon: this._markerFactory.createLeafletUserMarker(), user: user, forceZIndex: 1000 });
    };
    // create a guide line, with optional arrowheads on either side.
    LeafletMapComponent.prototype._createGuide = function (point1, point2, arrowHeadStart, arrowHeadEnd, color, width) {
        var _elements = [];
        var _weight = width || 2;
        var _guide = new leaflet__WEBPACK_IMPORTED_MODULE_1__["geodesic"]([], {
            color: color || 'rgb(119, 119, 119)',
            dashArray: _weight * 2.5 + ' ' + _weight * 3.5,
            weight: _weight,
            opacity: 1,
            smoothFactor: 3,
            steps: 10
        });
        _guide.setLatLngs([[point1, point2]]);
        _elements.push(_guide);
        var _createArrowHead = function (guide, positionPerc) {
            var _angle = (positionPerc === 0) ? 270 : 90;
            return leaflet__WEBPACK_IMPORTED_MODULE_1__["polylineDecorator"](guide, {
                patterns: [{
                        offset: positionPerc + '%',
                        repeat: 0,
                        symbol: leaflet__WEBPACK_IMPORTED_MODULE_1__["Symbol"].arrowHead({
                            pixelSize: 5,
                            headAngle: _angle,
                            polygon: false,
                            pathOptions: {
                                color: color,
                                weight: 2
                            }
                        })
                    }]
            });
        };
        if (arrowHeadStart) {
            _elements.push(_createArrowHead(_guide, 0));
        }
        if (arrowHeadEnd) {
            _elements.push(_createArrowHead(_guide, 100));
        }
        return _elements;
    };
    LeafletMapComponent.prototype._removeMarkerByPoiId = function (poiId) {
        var _self = this;
        if (this._map) {
            this._map.eachLayer(function (layer) {
                if (layer.options.poi && layer.options.poi.id === poiId) {
                    _self._map.removeLayer(layer);
                }
            });
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"])('leaflet'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ElementRef"])
    ], LeafletMapComponent.prototype, "leaflet", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], LeafletMapComponent.prototype, "name", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LeafletMapComponent.prototype, "activeMileId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LeafletMapComponent.prototype, "userCentered", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LeafletMapComponent.prototype, "centerPoint", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LeafletMapComponent.prototype, "range", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LeafletMapComponent.prototype, "poiRange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], LeafletMapComponent.prototype, "mileRange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LeafletMapComponent.prototype, "showMapTiles", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LeafletMapComponent.prototype, "allowPanning", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LeafletMapComponent.prototype, "allowZooming", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LeafletMapComponent.prototype, "showPois", void 0);
    LeafletMapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"])({
            selector: 'leaflet-map',
            template: __webpack_require__(/*! ./leaflet-map.component.html */ "./src/app/component/leaflet-map/leaflet-map.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./leaflet-map.component.sass */ "./src/app/component/leaflet-map/leaflet-map.component.sass")]
        })
        // uses basic for loops for performance
        /* TODO: split up this monster into some smaller files */
        /* TODO: needs guidelines for towns */
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _service_snow_generator_service__WEBPACK_IMPORTED_MODULE_11__["SnowGeneratorService"],
            _service_trail_generator_service__WEBPACK_IMPORTED_MODULE_12__["TrailGeneratorService"],
            _service_orientation_service__WEBPACK_IMPORTED_MODULE_13__["OrientationService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_14__["LocalStorageService"],
            _service_screen_mode_service__WEBPACK_IMPORTED_MODULE_15__["ScreenModeService"],
            _factory_marker_service__WEBPACK_IMPORTED_MODULE_16__["MarkerService"],
            _service_note_service__WEBPACK_IMPORTED_MODULE_21__["NoteService"]])
    ], LeafletMapComponent);
    return LeafletMapComponent;
}(_base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_9__["LocationBasedComponent"]));



/***/ }),

/***/ "./src/app/component/loader-overlay/loader-overlay.component.html":
/*!************************************************************************!*\
  !*** ./src/app/component/loader-overlay/loader-overlay.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"{{this.state}}\" id=\"loader-wrap\">\n  <div id=\"loader\">\n    <div id=\"box\"></div>\n    <div id=\"hill\"></div>\n    <div id=\"meta\">\n      <div id=\"spinner\" *ngIf=\"spinner\">spin</div>\n      <p id=\"message\" *ngIf=\"message\">{{message}}</p>\n      <button id=\"button\" *ngIf=\"button\">{{button.label}}</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/loader-overlay/loader-overlay.component.sass":
/*!************************************************************************!*\
  !*** ./src/app/component/loader-overlay/loader-overlay.component.sass ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #loader-wrap {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background-color: #EEE;\n  z-index: 2000; }\n\n:host .show {\n  visibility: visible;\n  opacity: 1;\n  transition: opacity 0.25s linear; }\n\n:host .hide {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0s 0.15s, opacity 0.15s linear; }\n\n:host #loader {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: -2.7em;\n  margin-left: -2.7em;\n  width: 5.4em;\n  height: 5.4em;\n  background-color: transparent; }\n\n:host #loader #meta {\n    padding-top: 8em;\n    width: 100vw;\n    font-size: 12px; }\n\n:host #loader #meta #message {\n      display: block;\n      width: 100%; }\n\n:host #loader #hill {\n    position: absolute;\n    width: 7.1em;\n    height: 7.1em;\n    top: 1.7em;\n    left: 1.7em;\n    background-color: transparent;\n    border-left: .25em solid #333;\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n\n:host #loader #hill:after {\n    content: '';\n    position: absolute;\n    width: 7.1em;\n    height: 7.1em;\n    left: 0;\n    background-color: transparent; }\n\n:host #loader #box {\n    position: absolute;\n    left: 0;\n    bottom: -.1em;\n    width: 1em;\n    height: 1em;\n    background-color: transparent;\n    border: .25em solid #333;\n    border-radius: 15%;\n    -webkit-transform: translate(0, -1em) rotate(-45deg);\n            transform: translate(0, -1em) rotate(-45deg);\n    -webkit-animation: push 2.5s cubic-bezier(0.79, 0, 0.47, 0.97) infinite;\n            animation: push 2.5s cubic-bezier(0.79, 0, 0.47, 0.97) infinite; }\n\n@-webkit-keyframes push {\n  0% {\n    -webkit-transform: translate(0, -1em) rotate(-45deg);\n            transform: translate(0, -1em) rotate(-45deg); }\n  5% {\n    -webkit-transform: translate(0, -1em) rotate(-50deg);\n            transform: translate(0, -1em) rotate(-50deg); }\n  20% {\n    -webkit-transform: translate(1em, -2em) rotate(47deg);\n            transform: translate(1em, -2em) rotate(47deg); }\n  25% {\n    -webkit-transform: translate(1em, -2em) rotate(45deg);\n            transform: translate(1em, -2em) rotate(45deg); }\n  30% {\n    -webkit-transform: translate(1em, -2em) rotate(40deg);\n            transform: translate(1em, -2em) rotate(40deg); }\n  45% {\n    -webkit-transform: translate(2em, -3em) rotate(137deg);\n            transform: translate(2em, -3em) rotate(137deg); }\n  50% {\n    -webkit-transform: translate(2em, -3em) rotate(135deg);\n            transform: translate(2em, -3em) rotate(135deg); }\n  55% {\n    -webkit-transform: translate(2em, -3em) rotate(130deg);\n            transform: translate(2em, -3em) rotate(130deg); }\n  70% {\n    -webkit-transform: translate(3em, -4em) rotate(217deg);\n            transform: translate(3em, -4em) rotate(217deg); }\n  75% {\n    -webkit-transform: translate(3em, -4em) rotate(220deg);\n            transform: translate(3em, -4em) rotate(220deg); }\n  100% {\n    -webkit-transform: translate(0, -1em) rotate(-225deg);\n            transform: translate(0, -1em) rotate(-225deg); } }\n\n@keyframes push {\n  0% {\n    -webkit-transform: translate(0, -1em) rotate(-45deg);\n            transform: translate(0, -1em) rotate(-45deg); }\n  5% {\n    -webkit-transform: translate(0, -1em) rotate(-50deg);\n            transform: translate(0, -1em) rotate(-50deg); }\n  20% {\n    -webkit-transform: translate(1em, -2em) rotate(47deg);\n            transform: translate(1em, -2em) rotate(47deg); }\n  25% {\n    -webkit-transform: translate(1em, -2em) rotate(45deg);\n            transform: translate(1em, -2em) rotate(45deg); }\n  30% {\n    -webkit-transform: translate(1em, -2em) rotate(40deg);\n            transform: translate(1em, -2em) rotate(40deg); }\n  45% {\n    -webkit-transform: translate(2em, -3em) rotate(137deg);\n            transform: translate(2em, -3em) rotate(137deg); }\n  50% {\n    -webkit-transform: translate(2em, -3em) rotate(135deg);\n            transform: translate(2em, -3em) rotate(135deg); }\n  55% {\n    -webkit-transform: translate(2em, -3em) rotate(130deg);\n            transform: translate(2em, -3em) rotate(130deg); }\n  70% {\n    -webkit-transform: translate(3em, -4em) rotate(217deg);\n            transform: translate(3em, -4em) rotate(217deg); }\n  75% {\n    -webkit-transform: translate(3em, -4em) rotate(220deg);\n            transform: translate(3em, -4em) rotate(220deg); }\n  100% {\n    -webkit-transform: translate(0, -1em) rotate(-225deg);\n            transform: translate(0, -1em) rotate(-225deg); } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9sb2FkZXItb3ZlcmxheS9sb2FkZXItb3ZlcmxheS5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixhQUFhLEVBQUE7O0FBUGhCO0VBVUcsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixnQ0FBZ0MsRUFBQTs7QUFabkM7RUFlRyxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLHFEQUFxRCxFQUFBOztBQWpCeEQ7RUFvQkcsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osYUFBYTtFQUNiLDZCQUE2QixFQUFBOztBQTNCaEM7SUErQkssZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixlQUFlLEVBQUE7O0FBakNwQjtNQW9DTyxjQUFjO01BQ2QsV0FBVyxFQUFBOztBQXJDbEI7SUF3Q0ssa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixhQUFhO0lBQ2IsVUFBVTtJQUNWLFdBQVc7SUFDWCw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLGdDQUF3QjtZQUF4Qix3QkFBd0IsRUFBQTs7QUEvQzdCO0lBa0RLLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFDYixPQUFPO0lBQ1AsNkJBQTZCLEVBQUE7O0FBdkRsQztJQTBESyxrQkFBa0I7SUFDbEIsT0FBTztJQUNQLGFBQWE7SUFDYixVQUFVO0lBQ1YsV0FBVztJQUNYLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFDeEIsa0JBQWtCO0lBQ2xCLG9EQUE0QztZQUE1Qyw0Q0FBNEM7SUFDNUMsdUVBQTREO1lBQTVELCtEQUE0RCxFQUFBOztBQUVoRTtFQUNFO0lBQ0Usb0RBQTRDO1lBQTVDLDRDQUE0QyxFQUFBO0VBQzlDO0lBQ0Usb0RBQTRDO1lBQTVDLDRDQUE0QyxFQUFBO0VBQzlDO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBLEVBQUE7O0FBdEJqRDtFQUNFO0lBQ0Usb0RBQTRDO1lBQTVDLDRDQUE0QyxFQUFBO0VBQzlDO0lBQ0Usb0RBQTRDO1lBQTVDLDRDQUE0QyxFQUFBO0VBQzlDO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBO0VBQy9DO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0Usc0RBQThDO1lBQTlDLDhDQUE4QyxFQUFBO0VBQ2hEO0lBQ0UscURBQTZDO1lBQTdDLDZDQUE2QyxFQUFBLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvbG9hZGVyLW92ZXJsYXkvbG9hZGVyLW92ZXJsYXkuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gICNsb2FkZXItd3JhcCB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFO1xuICAgIHotaW5kZXg6IDIwMDA7IH1cblxuICAuc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4yNXMgbGluZWFyOyB9XG5cbiAgLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMHMgMC4xNXMsIG9wYWNpdHkgMC4xNXMgbGluZWFyOyB9XG5cbiAgI2xvYWRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tdG9wOiAtMi43ZW07XG4gICAgbWFyZ2luLWxlZnQ6IC0yLjdlbTtcbiAgICB3aWR0aDogNS40ZW07XG4gICAgaGVpZ2h0OiA1LjRlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblxuICAgICNtZXRhIHtcblxuICAgICAgcGFkZGluZy10b3A6IDhlbTtcbiAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcblxuICAgICAgI21lc3NhZ2Uge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6IDEwMCU7IH0gfVxuXG4gICAgI2hpbGwge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgaGVpZ2h0OiA3LjFlbTtcbiAgICAgIHRvcDogMS43ZW07XG4gICAgICBsZWZ0OiAxLjdlbTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWxlZnQ6IC4yNWVtIHNvbGlkICMzMzM7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IH1cblxuICAgICNoaWxsOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgaGVpZ2h0OiA3LjFlbTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxuXG4gICAgI2JveCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgYm90dG9tOiAtLjFlbTtcbiAgICAgIHdpZHRoOiAxZW07XG4gICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyOiAuMjVlbSBzb2xpZCAjMzMzO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTUlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgcm90YXRlKC00NWRlZyk7XG4gICAgICBhbmltYXRpb246IHB1c2ggMi41cyBjdWJpYy1iZXppZXIoLjc5LCAwLCAuNDcsIC45NykgaW5maW5pdGU7IH0gfVxuXG4gIEBrZXlmcmFtZXMgcHVzaCB7XG4gICAgMCUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgcm90YXRlKC00NWRlZyk7IH1cbiAgICA1JSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSByb3RhdGUoLTUwZGVnKTsgfVxuICAgIDIwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0N2RlZyk7IH1cbiAgICAyNSUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDVkZWcpOyB9XG4gICAgMzAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQwZGVnKTsgfVxuICAgIDQ1JSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzdkZWcpOyB9XG4gICAgNTAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzNWRlZyk7IH1cbiAgICA1NSUge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTMwZGVnKTsgfVxuICAgIDcwJSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzZW0sIC00ZW0pIHJvdGF0ZSgyMTdkZWcpOyB9XG4gICAgNzUlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIyMGRlZyk7IH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pIHJvdGF0ZSgtMjI1ZGVnKTsgfSB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/loader-overlay/loader-overlay.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/component/loader-overlay/loader-overlay.component.ts ***!
  \**********************************************************************/
/*! exports provided: LoaderOverlayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderOverlayComponent", function() { return LoaderOverlayComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/loader.service */ "./src/app/service/loader.service.ts");



var LoaderOverlayComponent = /** @class */ (function () {
    // simple loader animation component, uses the loader service
    function LoaderOverlayComponent(_changeDetector, _loaderService) {
        this._changeDetector = _changeDetector;
        this._loaderService = _loaderService;
        this.state = 'show';
        this.activeMetaObjects = [];
    }
    LoaderOverlayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._loaderService.observe.subscribe(function (obj) {
            if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["isDevMode"])()) {
                console.log(obj['action'], obj['type'], obj['data']);
            }
            if (obj['action'] === 'show' && obj['type'] !== 'self') {
                if (obj['type'] === 'spinner') {
                    _this.spinner = true;
                }
                else {
                    _this[obj['type']] = obj['data'];
                }
            }
            else if (obj['action'] === 'hide' && obj['type'] !== 'self') {
                if (obj['type'] === 'spinner') {
                    _this.spinner = false;
                }
                else {
                    _this[obj['type']] = null;
                }
            }
            _this._changeDetector.detectChanges();
        });
    };
    // only gets triggered through @Input showLoader
    LoaderOverlayComponent.prototype.ngOnChanges = function (changes) {
        this.state = (this.showLoader) ? 'show' : 'hide';
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], LoaderOverlayComponent.prototype, "showLoader", void 0);
    LoaderOverlayComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'loader-overlay',
            template: __webpack_require__(/*! ./loader-overlay.component.html */ "./src/app/component/loader-overlay/loader-overlay.component.html"),
            styles: [__webpack_require__(/*! ./loader-overlay.component.sass */ "./src/app/component/loader-overlay/loader-overlay.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _service_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"]])
    ], LoaderOverlayComponent);
    return LoaderOverlayComponent;
}());



/***/ }),

/***/ "./src/app/component/mile-detail/mile-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/mile-detail/mile-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"layout\">\n  <div id=\"main\">\n    <leaflet-map\n      name=\"detail-map\"\n      [allowPanning]=true\n      [allowZooming]=true\n      [showPois]=true\n      [showMapTiles]=true\n      [activeMileId]=\"routedMile\"\n      [centerPoint]=\"centerPoint\"\n      [poiRange]=\"visiblePoiRange\"\n      [mileRange]=\"visibleMileRange\"\n      [range]=\"drawRange\">\n    </leaflet-map>\n    <div id=\"overlay\"></div>    <!-- inner shadow -->\n  </div>\n  <div id=\"list\">\n    <poi-list\n      [directionReversal]=\"isNobo\"\n      [milesData]=\"trailData.miles\"\n      [showUser]=\"true\"\n      [activeMileId]=\"routedMile\"\n      (scrollToEvent)=\"onScrollTo($event)\">\n    </poi-list>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/mile-detail/mile-detail.component.sass":
/*!******************************************************************!*\
  !*** ./src/app/component/mile-detail/mile-detail.component.sass ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host #layout {\n  display: grid;\n  grid-template-columns: 61.8vw auto;\n  grid-template-areas: 'main list';\n  height: 100vh; }\n  :host #layout #main {\n    height: 100%;\n    grid-area: main; }\n  :host #layout #main #overlay {\n      position: absolute;\n      top: 0;\n      width: 61.8vw;\n      height: 100vh;\n      pointer-events: none;\n      box-shadow: inset -15px 0px 20px -20px rgba(0, 0, 0, 0.5);\n      z-index: 1000; }\n  :host #layout #list {\n    grid-area: list;\n    min-width: 150px;\n    overflow-y: scroll;\n    border-left: 1px solid #CCC;\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f7f7f7+0,f9f9f9+7 */\n    background: #f7f7f7;\n    background: linear-gradient(to right, #f7f7f7 0%, #f9f9f9 7%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7f7f7', endColorstr='#f9f9f9',GradientType=1 ); }\n  :host #center-user-btn {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: 1000; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9taWxlLWRldGFpbC9taWxlLWRldGFpbC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLGFBQWE7RUFDYixrQ0FBa0M7RUFDbEMsZ0NBQWdDO0VBQ2hDLGFBQWEsRUFBQTtFQU5oQjtJQVNLLFlBQVk7SUFDWixlQUFlLEVBQUE7RUFWcEI7TUFhTyxrQkFBa0I7TUFDbEIsTUFBTTtNQUNOLGFBQWE7TUFDYixhQUFhO01BQ2Isb0JBQW9CO01BR3BCLHlEQUFzRDtNQUN0RCxhQUFhLEVBQUE7RUFyQnBCO0lBd0JLLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBRWxCLDJCQUEyQjtJQUUzQiw4R0FBQTtJQUNBLG1CQUE0QjtJQUc1Qiw2REFBb0Y7SUFDcEYsbUhBQW1ILEVBQUE7RUFuQ3hIO0VBdUNHLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsT0FBTztFQUNQLGFBQWEsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9taWxlLWRldGFpbC9taWxlLWRldGFpbC5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG5cbiAgI2xheW91dCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDYxLjh2dyBhdXRvO1xuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6ICdtYWluIGxpc3QnO1xuICAgIGhlaWdodDogMTAwdmg7XG5cbiAgICAjbWFpbiB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBncmlkLWFyZWE6IG1haW47XG5cbiAgICAgICNvdmVybGF5IHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiA2MS44dnc7XG4gICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IC0xNXB4IDBweCAyMHB4IC0yMHB4IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgICAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAtMTVweCAwcHggMjBweCAtMjBweCByZ2JhKDAsMCwwLDAuNSk7XG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IC0xNXB4IDBweCAyMHB4IC0yMHB4IHJnYmEoMCwwLDAsMC41KTtcbiAgICAgICAgei1pbmRleDogMTAwMDsgfSB9XG5cbiAgICAjbGlzdCB7XG4gICAgICBncmlkLWFyZWE6IGxpc3Q7XG4gICAgICBtaW4td2lkdGg6IDE1MHB4O1xuICAgICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuXG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNDQ0M7XG5cbiAgICAgIC8qIFBlcm1hbGluayAtIHVzZSB0byBlZGl0IGFuZCBzaGFyZSB0aGlzIGdyYWRpZW50OiBodHRwOi8vY29sb3J6aWxsYS5jb20vZ3JhZGllbnQtZWRpdG9yLyNmN2Y3ZjcrMCxmOWY5ZjkrNyAqL1xuICAgICAgYmFja2dyb3VuZDogcmdiKDI0NywyNDcsMjQ3KSAvKiBPbGQgYnJvd3NlcnMgKi87XG4gICAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudChsZWZ0LCByZ2JhKDI0NywyNDcsMjQ3LDEpIDAlLCByZ2JhKDI0OSwyNDksMjQ5LDEpIDclKSAvKiBGRjMuNi0xNSAqLztcbiAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMjQ3LDI0NywyNDcsMSkgMCUscmdiYSgyNDksMjQ5LDI0OSwxKSA3JSkgLyogQ2hyb21lMTAtMjUsU2FmYXJpNS4xLTYgKi87XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMjQ3LDI0NywyNDcsMSkgMCUscmdiYSgyNDksMjQ5LDI0OSwxKSA3JSkgLyogVzNDLCBJRTEwKywgRkYxNissIENocm9tZTI2KywgT3BlcmExMissIFNhZmFyaTcrICovO1xuICAgICAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9JyNmN2Y3ZjcnLCBlbmRDb2xvcnN0cj0nI2Y5ZjlmOScsR3JhZGllbnRUeXBlPTEgKSAvKiBJRTYtOSAqLzsgfSB9XG5cblxuICAjY2VudGVyLXVzZXItYnRuIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgei1pbmRleDogMTAwMDsgfSB9XG4iXX0= */"

/***/ }),

/***/ "./src/app/component/mile-detail/mile-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/mile-detail/mile-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: MileDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MileDetailComponent", function() { return MileDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_location_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/location.service */ "./src/app/service/location.service.ts");
/* harmony import */ var _base_base_base_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../base/base/base.component */ "./src/app/base/base/base.component.ts");






var MileDetailComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MileDetailComponent, _super);
    function MileDetailComponent(_localStorage, _locationService, _route, _router) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this._locationService = _locationService;
        _this._route = _route;
        _this._router = _router;
        return _this;
    }
    // LIFECYCLE HOOKS
    MileDetailComponent.prototype.ngOnInit = function () {
        this.isNobo = (this._localStorage.retrieve('direction') === 0);
        this._addSubscriptions();
    };
    // SUBSCRIPTIONS
    MileDetailComponent.prototype._addSubscriptions = function () {
        var _this = this;
        var _self = this;
        // get miles data based on route id
        this.routedMile = (this._route.snapshot) ? Number(this._route.snapshot.paramMap.get('id')) : 0;
        this.addSubscription('routeData', this._route.data.subscribe(function (result) {
            _this.trailData = result.data['trail'];
            _this._setMapData(_this.routedMile);
        }));
        this.addSubscription('location', this._locationService.locationStatus.subscribe(function (result) {
            _self.isTracking = (result === 'tracking');
        }));
    };
    // EVENTS
    MileDetailComponent.prototype.onScrollTo = function (data) {
        console.log('on scroll to', data.mileId);
        this._setMapData(data.mileId, data.renderedPoiRange, data.renderedMileRange);
        this.routedMile = data.mileId;
        /* updating queryParamams (this._router.navigate) seems to cause bugs over time on iOS,
        so i'm setting a property that will be used for the back button navigate call */
        this._router['scrollToPosition'] = this.routedMile;
        //this._router.navigate(['.'], {relativeTo: this._route, queryParams: {back: this.routedMile}});
    };
    MileDetailComponent.prototype._setMapData = function (mileId, poiRange, mileRange) {
        if (mileRange && mileRange.length > 0) {
            mileRange.sort(function (a, b) { return a - b; });
            this.drawRange = {
                behind: Math.abs(mileId - mileRange[0]) + 3,
                ahead: Math.abs(mileRange[mileRange.length - 1] - mileId)
            };
            this.visibleMileRange = mileRange;
        }
        if (poiRange && poiRange.length > 0) {
            this.visiblePoiRange = poiRange;
        }
        mileId = (mileId === 0) ? 0 : mileId - 1;
        this.centerPoint = this.trailData.miles[mileId].centerpoint;
    };
    MileDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mile-detail',
            template: __webpack_require__(/*! ./mile-detail.component.html */ "./src/app/component/mile-detail/mile-detail.component.html"),
            styles: [__webpack_require__(/*! ./mile-detail.component.sass */ "./src/app/component/mile-detail/mile-detail.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
            _service_location_service__WEBPACK_IMPORTED_MODULE_4__["LocationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], MileDetailComponent);
    return MileDetailComponent;
}(_base_base_base_component__WEBPACK_IMPORTED_MODULE_5__["BaseComponent"]));



/***/ }),

/***/ "./src/app/component/navigation/locator/locator.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/component/navigation/locator/locator.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button id=\"locator\" (click)=\"onClick()\" [className]=\"(status === 'tracking' && showMiniMap) ? 'active' : 'inactive'\" #container>\n  <span *ngIf=\"user && showMiniMap\">\n    <leaflet-map\n\n      id=\"mini-map\"\n\n      [className]=\"status === 'tracking' ? 'visible' : 'invisible'\"\n\n      name=\"mini-map\"\n\n      [allowPanning]=false\n      [allowZooming]=false\n      [showPois]=false\n      [showMapTiles]=true\n      [activeMileId]=\"nearestMileId\"\n      [userCentered]=true\n      [range]=\"{behind: 2, ahead: 2}\"\n    >\n    </leaflet-map>\n  </span>\n  <fa-layers [fixedWidth]=\"true\">\n    <fa-icon icon=\"location-arrow\" size=\"2x\" [className]=\"status === 'idle' ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon [icon]=\"['far', 'compass']\" [spin]=\"true\" size=\"2x\" [className]=\"status === 'fetching' ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon icon=\"hiking\" size=\"2x\" [className]=\"status === 'tracking' && !showMiniMap ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon id=\"error\" icon=\"exclamation-triangle\" size=\"2x\" [className]=\"status === 'error' ? 'visible' : 'invisible'\"></fa-icon>\n  </fa-layers>\n</button>\n"

/***/ }),

/***/ "./src/app/component/navigation/locator/locator.component.sass":
/*!*********************************************************************!*\
  !*** ./src/app/component/navigation/locator/locator.component.sass ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host button:focus {\n  outline: 0; }\n\n:host button {\n  position: relative;\n  background-image: unset;\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0.78+0,0.55+100 */\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.55) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c7ffffff', endColorstr='#8cffffff',GradientType=1 );\n  border-radius: 50%;\n  font-size: 1.5vw;\n  width: 7vw;\n  height: 7vw;\n  margin: 10px 10px 0 0;\n  padding: 0;\n  outline: none;\n  border: 2px solid white;\n  overflow: hidden;\n  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.35);\n  -webkit-backdrop-filter: blur(6px);\n          backdrop-filter: blur(6px);\n  color: #555;\n  transition: all 200ms ease;\n  transition-property: width, height, border-radius, padding; }\n\n:host button fa-icon {\n    -webkit-filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white);\n            filter: drop-shadow(-1px -2px 1px rgba(0, 0, 0, 0.1)) drop-shadow(2px 3px 2px white); }\n\n:host button #mini-map {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 15vw;\n    height: 15vw;\n    transition-property: opacity;\n    opacity: 0;\n    visibility: hidden;\n    transition: all 200ms ease; }\n\n:host button fa-icon {\n    position: absolute;\n    top: 50%;\n    left: -35%; }\n\n:host button #error {\n    color: red; }\n\n:host .active {\n  padding: env(safe-area-inset-right);\n  width: 15vw;\n  height: 15vw;\n  border-radius: 5%; }\n\n:host .active #mini-map {\n    opacity: 1;\n    visibility: visible; }\n\n:host .visible {\n  opacity: 1;\n  visibility: visible; }\n\n:host .invisible {\n  opacity: 0;\n  visibility: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9uYXZpZ2F0aW9uL2xvY2F0b3IvbG9jYXRvci5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLFVBQVUsRUFBQTs7QUFIYjtFQU1HLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFFdkIsZ0lBQUE7RUFHQSxpR0FBMEY7RUFDMUYsdUhBQXVIO0VBRXZILGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsVUFBVTtFQUNWLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsZ0JBQWdCO0VBR2hCLGlEQUE4QztFQUM5QyxrQ0FBMEI7VUFBMUIsMEJBQTBCO0VBQzFCLFdBQVc7RUFFWCwwQkFBMEI7RUFDMUIsMERBQTBELEVBQUE7O0FBL0I3RDtJQWtDSyw0RkFBaUY7WUFBakYsb0ZBQWlGLEVBQUE7O0FBbEN0RjtJQXFDSyxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLE9BQU87SUFDUCxXQUFXO0lBQ1gsWUFBWTtJQUNaLDRCQUE0QjtJQUM1QixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLDBCQUEwQixFQUFBOztBQTdDL0I7SUFnREssa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixVQUFVLEVBQUE7O0FBbERmO0lBcURLLFVBQVUsRUFBQTs7QUFyRGY7RUF3REcsbUNBQW1DO0VBQ25DLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCLEVBQUE7O0FBM0RwQjtJQThESyxVQUFVO0lBQ1YsbUJBQW1CLEVBQUE7O0FBL0R4QjtFQWtFRyxVQUFVO0VBQ1YsbUJBQW1CLEVBQUE7O0FBbkV0QjtFQXFFRyxVQUFVO0VBQ1Ysa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvbmF2aWdhdGlvbi9sb2NhdG9yL2xvY2F0b3IuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gIGJ1dHRvbjpmb2N1cyB7XG4gICAgb3V0bGluZTogMDsgfVxuXG4gIGJ1dHRvbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVuc2V0O1xuXG4gICAgLyogUGVybWFsaW5rIC0gdXNlIHRvIGVkaXQgYW5kIHNoYXJlIHRoaXMgZ3JhZGllbnQ6IGh0dHA6Ly9jb2xvcnppbGxhLmNvbS9ncmFkaWVudC1lZGl0b3IvI2ZmZmZmZiswLGZmZmZmZisxMDAmMC43OCswLDAuNTUrMTAwICovXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCByZ2JhKDI1NSwyNTUsMjU1LDAuNzgpIDAlLCByZ2JhKDI1NSwyNTUsMjU1LDAuNTUpIDEwMCUpIC8qIEZGMy42LTE1ICovO1xuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KC00NWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwLjc4KSAwJSxyZ2JhKDI1NSwyNTUsMjU1LDAuNTUpIDEwMCUpIC8qIENocm9tZTEwLTI1LFNhZmFyaTUuMS02ICovO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMC43OCkgMCUscmdiYSgyNTUsMjU1LDI1NSwwLjU1KSAxMDAlKSAvKiBXM0MsIElFMTArLCBGRjE2KywgQ2hyb21lMjYrLCBPcGVyYTEyKywgU2FmYXJpNysgKi87XG4gICAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9JyNjN2ZmZmZmZicsIGVuZENvbG9yc3RyPScjOGNmZmZmZmYnLEdyYWRpZW50VHlwZT0xICkgLyogSUU2LTkgZmFsbGJhY2sgb24gaG9yaXpvbnRhbCBncmFkaWVudCAqLztcblxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmb250LXNpemU6IDEuNXZ3O1xuICAgIHdpZHRoOiA3dnc7XG4gICAgaGVpZ2h0OiA3dnc7XG4gICAgbWFyZ2luOiAxMHB4IDEwcHggMCAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDVweCAxMHB4IC01cHggcmdiYSgwLDAsMCwwLjM1KTtcbiAgICAtbW96LWJveC1zaGFkb3c6IDBweCA1cHggMTBweCAtNXB4IHJnYmEoMCwwLDAsMC4zNSk7XG4gICAgYm94LXNoYWRvdzogMHB4IDVweCAxMHB4IC01cHggcmdiYSgwLDAsMCwwLjM1KTtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNnB4KTtcbiAgICBjb2xvcjogIzU1NTtcblxuICAgIHRyYW5zaXRpb246IGFsbCAyMDBtcyBlYXNlO1xuICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IHdpZHRoLCBoZWlnaHQsIGJvcmRlci1yYWRpdXMsIHBhZGRpbmc7XG5cbiAgICBmYS1pY29uIHtcbiAgICAgIGZpbHRlcjogZHJvcC1zaGFkb3coLTFweCAtMnB4IDFweCByZ2JhKDAsMCwwLDAuMSkpIGRyb3Atc2hhZG93KDJweCAzcHggMnB4IHdoaXRlKTsgfVxuXG4gICAgI21pbmktbWFwIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB3aWR0aDogMTV2dztcbiAgICAgIGhlaWdodDogMTV2dztcbiAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDIwMG1zIGVhc2U7IH1cblxuICAgIGZhLWljb24ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICBsZWZ0OiAtMzUlOyB9XG5cbiAgICAjZXJyb3Ige1xuICAgICAgY29sb3I6IHJlZDsgfSB9XG5cbiAgLmFjdGl2ZSB7XG4gICAgcGFkZGluZzogZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCk7XG4gICAgd2lkdGg6IDE1dnc7XG4gICAgaGVpZ2h0OiAxNXZ3O1xuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xuXG4gICAgI21pbmktbWFwIHtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9IH1cblxuICAudmlzaWJsZSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlOyB9XG4gIC5pbnZpc2libGUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuOyB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/navigation/locator/locator.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/component/navigation/locator/locator.component.ts ***!
  \*******************************************************************/
/*! exports provided: LocatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocatorComponent", function() { return LocatorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../base/location-based/location-based.component */ "./src/app/base/location-based/location-based.component.ts");



var LocatorComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LocatorComponent, _super);
    function LocatorComponent() {
        return _super.call(this) || this;
    }
    // LIFECYCLE HOOKS
    LocatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.showMiniMap = this.localStorage.retrieve('showMiniMap');
        this._mapObserver = this.localStorage.observe('showMiniMap').subscribe(function (result) {
            _this.showMiniMap = result;
        });
    };
    LocatorComponent.prototype.ngOnDestroy = function () {
        this._mapObserver.unsubscribe();
        _super.prototype.ngOnDestroy.call(this);
    };
    // EVENT HANDLERS
    LocatorComponent.prototype.onClick = function () {
        this.locationService.toggleTracking();
    };
    // OTHER
    LocatorComponent.prototype.onStatusChange = function (status) {
        this.onUserLocationChange(this.user);
    };
    LocatorComponent.prototype.onUserLocationChange = function (user) {
        if (this.user && this.status === 'tracking') {
            this.nearestMileId = user.nearestMileId;
        }
    };
    LocatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'locator-button',
            template: __webpack_require__(/*! ./locator.component.html */ "./src/app/component/navigation/locator/locator.component.html"),
            styles: [__webpack_require__(/*! ./locator.component.sass */ "./src/app/component/navigation/locator/locator.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LocatorComponent);
    return LocatorComponent;
}(_base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_2__["LocationBasedComponent"]));



/***/ }),

/***/ "./src/app/component/navigation/navigation.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/navigation/navigation.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"container\">\n\n\n  <div class=\"right {{this.oppositeClass}}\">\n    <locator-button></locator-button>\n  </div>\n\n  <div class=\"right {{this.oppositeClass}}\">\n    <settings-button (click)=\"onSettingsClick()\" [updateAvailable]=\"updateAvailable\" [isDownloading]=\"isDownloading\"></settings-button>\n  </div>\n\n  <div class=\"right {{this.oppositeClass}}\" *ngIf=\"isAdmin\">\n    <display-button class=\"button\" label=\"\" icon=\"skull\" (click)=\"onAdminClick()\"></display-button>\n  </div>\n\n  <div class=\"left {{this.visibleClass}}\">\n    <display-button class=\"button back\" label=\"\" icon=\"arrow-left\" (click)=\"onBackClick()\"></display-button>\n  </div>\n\n  <div id=\"center-user-btn\" [class]=\"dynamicSide\" *ngIf=\"locationStatus === 'tracking'\">\n    <display-button class=\"button\" label=\"\" icon=\"street-view\" (click)=\"onCenterUserClick()\"></display-button>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/component/navigation/navigation.component.sass":
/*!****************************************************************!*\
  !*** ./src/app/component/navigation/navigation.component.sass ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  float: left;\n  top: 0;\n  position: absolute;\n  z-index: 1000;\n  pointer-events: none;\n  padding-bottom: 10px; }\n  :host #container {\n    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); }\n  :host #container .button, :host #container .right, :host #container .left {\n      pointer-events: all;\n      color: #555; }\n  :host #container .left {\n      float: left; }\n  :host #container .right {\n      float: right; }\n  :host #container .show {\n      visibility: visible;\n      opacity: 1;\n      transition: opacity 0.15s linear;\n      pointer-events: all; }\n  :host #container .hide {\n      visibility: hidden;\n      opacity: 0;\n      transition: visibility 0.15s linear, opacity 0.15s linear;\n      pointer-events: none; }\n  :host #container .back {\n      padding-left: 10px; }\n  :host #container #center-user-btn {\n      transition: all 300ms ease; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDQyxXQUFXO0VBQ1gsV0FBVztFQUNYLE1BQU07RUFDTixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixvQkFBb0IsRUFBQTtFQVByQjtJQVVHLGtIQUFrSCxFQUFBO0VBVnJIO01BYUssbUJBQW1CO01BQ25CLFdBQVcsRUFBQTtFQWRoQjtNQWlCSyxXQUFXLEVBQUE7RUFqQmhCO01Bb0JLLFlBQVksRUFBQTtFQXBCakI7TUF1QkssbUJBQW1CO01BQ25CLFVBQVU7TUFDVixnQ0FBZ0M7TUFDaEMsbUJBQW1CLEVBQUE7RUExQnhCO01BNkJLLGtCQUFrQjtNQUNsQixVQUFVO01BQ1YseURBQXlEO01BQ3pELG9CQUFvQixFQUFBO0VBaEN6QjtNQW1DSyxrQkFBa0IsRUFBQTtFQW5DdkI7TUFzQ0ssMEJBQTBCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsb2F0OiBsZWZ0O1xuICB0b3A6IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTAwMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4OyAgLy8gZml4ZXMgZHJvcCBzaGFkb3cgY2xpcHBpbmdcblxuICAjY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiBlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCkgZW52KHNhZmUtYXJlYS1pbnNldC1yaWdodCkgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pIGVudihzYWZlLWFyZWEtaW5zZXQtbGVmdCk7XG5cbiAgICAuYnV0dG9uLCAucmlnaHQsIC5sZWZ0IHtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XG4gICAgICBjb2xvcjogIzU1NTsgfVxuXG4gICAgLmxlZnQge1xuICAgICAgZmxvYXQ6IGxlZnQ7IH1cblxuICAgIC5yaWdodCB7XG4gICAgICBmbG9hdDogcmlnaHQ7IH1cblxuICAgIC5zaG93IHtcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBsaW5lYXI7XG4gICAgICBwb2ludGVyLWV2ZW50czogYWxsOyB9XG5cbiAgICAuaGlkZSB7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwLjE1cyBsaW5lYXIsIG9wYWNpdHkgMC4xNXMgbGluZWFyO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cblxuICAgIC5iYWNrIHtcbiAgICAgIHBhZGRpbmctbGVmdDogMTBweDsgfVxuXG4gICAgI2NlbnRlci11c2VyLWJ0biB7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXMgZWFzZTsgfSB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/navigation/navigation.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/navigation/navigation.component.ts ***!
  \**************************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_download_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/download.service */ "./src/app/service/download.service.ts");
/* harmony import */ var _service_version_resolver_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/version-resolver.service */ "./src/app/service/version-resolver.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_location_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/location.service */ "./src/app/service/location.service.ts");
/* harmony import */ var _service_loader_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/loader.service */ "./src/app/service/loader.service.ts");








var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(_versionResolverService, _locationService, _localStorage, _route, _router, _downloadService, _loaderOverlay) {
        var _this = this;
        this._versionResolverService = _versionResolverService;
        this._locationService = _locationService;
        this._localStorage = _localStorage;
        this._route = _route;
        this._router = _router;
        this._downloadService = _downloadService;
        this._loaderOverlay = _loaderOverlay;
        this.navEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.visibleClass = 'hide';
        this.oppositeClass = 'show';
        this.isDownloading = false;
        this.updateAvailable = false;
        _router.events.forEach(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"] && event['url']) {
                _this._backIndex = _this._route.snapshot.queryParams['back'];
                if (event['url'].includes('detail')) {
                    _this.visibleClass = 'show';
                    _this.oppositeClass = 'hide';
                    _this.dynamicSide = 'left';
                }
                else if (event['url'].includes('admin')) {
                    _this.visibleClass = _this.oppositeClass = 'show';
                }
                else {
                    _this.visibleClass = 'hide';
                    _this.oppositeClass = 'show';
                    _this.dynamicSide = 'right';
                }
            }
        });
    }
    // LIFECYCLE HOOKS
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _self = this;
        this._downloadSubScription = this._downloadService.isDownloadingObservable.subscribe(function (isDownloading) {
            _this.isDownloading = isDownloading;
        });
        this._updateSubscription = this._versionResolverService.observables['updateAvailable'].subscribe(function (updateAvailable) {
            _this.updateAvailable = updateAvailable;
        });
        this.isAdmin = this._localStorage.retrieve('isAdmin');
        this._localStorage.observe('isAdmin').subscribe(function (value) {
            _this.isAdmin = value;
        });
        this._locationService.locationStatus.subscribe(function (status) {
            _this.locationStatus = status;
        });
    };
    NavigationComponent.prototype.ngOnChanges = function (changes) {
        // wait for loader to be ready, as the app requires trail/snow version data to run the version check
        // since navigator isn't part of the router, we're waiting for the loader to finish (which triggers initialized on the app component)
        if (changes.appInitialized.firstChange === false && this.appInitialized === true) {
            this._versionResolverService.versionCheck();
        }
    };
    // EVENT HANDLERS
    NavigationComponent.prototype.onSettingsClick = function () {
        this.navEvent.emit('settings');
    };
    NavigationComponent.prototype.onBackClick = function () {
        this.visibleClass = 'hide';
        this.oppositeClass = 'show';
        this._loaderOverlay.showOverlay();
        this._router.navigate(['elevation-profile/'], { queryParams: { id: this._router['scrollToPosition'] } });
        this.navEvent.emit('elevation-profile');
    };
    NavigationComponent.prototype.onAdminClick = function () {
        this._router.navigate(['admin']);
        this.navEvent.emit('admin');
    };
    NavigationComponent.prototype.onCenterUserClick = function () {
        this._locationService.onCenterUser();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], NavigationComponent.prototype, "appInitialized", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], NavigationComponent.prototype, "navEvent", void 0);
    NavigationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'navigation-component',
            template: __webpack_require__(/*! ./navigation.component.html */ "./src/app/component/navigation/navigation.component.html"),
            styles: [__webpack_require__(/*! ./navigation.component.sass */ "./src/app/component/navigation/navigation.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_version_resolver_service__WEBPACK_IMPORTED_MODULE_4__["VersionResolverService"],
            _service_location_service__WEBPACK_IMPORTED_MODULE_6__["LocationService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _service_download_service__WEBPACK_IMPORTED_MODULE_3__["DownloadService"],
            _service_loader_service__WEBPACK_IMPORTED_MODULE_7__["LoaderService"]])
    ], NavigationComponent);
    return NavigationComponent;
}());



/***/ }),

/***/ "./src/app/component/navigation/settings/settings.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/component/navigation/settings/settings.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<display-button\n  class=\"button settings\"\n  icon=\"cog\"\n  [badge]=\"(updateAvailable) ? (isDownloading) ? 'spinner' : ['far', 'arrow-alt-circle-down'] : null\"\n  >\n</display-button>\n"

/***/ }),

/***/ "./src/app/component/navigation/settings/settings.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/component/navigation/settings/settings.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9uYXZpZ2F0aW9uL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/component/navigation/settings/settings.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/component/navigation/settings/settings.component.ts ***!
  \*********************************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () { };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], SettingsComponent.prototype, "isDownloading", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], SettingsComponent.prototype, "updateAvailable", void 0);
    SettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'settings-button',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/component/navigation/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.scss */ "./src/app/component/navigation/settings/settings.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/component/poi-list/dynamic-item/dynamic-item.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #container></div>\n"

/***/ }),

/***/ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.sass":
/*!*****************************************************************************!*\
  !*** ./src/app/component/poi-list/dynamic-item/dynamic-item.component.sass ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: #EEE;\n  width: 100%;\n  border-bottom: 1px solid #E6E6E6;\n  height: calc(100vh / 7) !important; }\n\n:host /deep/ .note {\n  background-color: #fbf8f4 !important; }\n\n:host /deep/ fa-icon {\n  font-size: 3vw;\n  color: #444; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC9keW5hbWljLWl0ZW0vZHluYW1pYy1pdGVtLmNvbXBvbmVudC5zYXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFDO0VBQ0Msc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxnQ0FBZ0M7RUFDaEMsa0NBQWtDLEVBQUE7O0FBRW5DO0VBR0csb0NBQStDLEVBQUE7O0FBSGxEO0VBTUcsY0FBYztFQUNkLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC9keW5hbWljLWl0ZW0vZHluYW1pYy1pdGVtLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VFRTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRTZFNkU2O1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLyA3KSAhaW1wb3J0YW50OyB9XG5cbiA6aG9zdCAvZGVlcC8ge1xuXG4gIC5ub3RlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjUxLCAyNDgsIDI0NCkgIWltcG9ydGFudDsgfVxuXG4gIGZhLWljb24ge1xuICAgIGZvbnQtc2l6ZTogM3Z3O1xuICAgIGNvbG9yOiAjNDQ0OyB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/component/poi-list/dynamic-item/dynamic-item.component.ts ***!
  \***************************************************************************/
/*! exports provided: DynamicItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicItemComponent", function() { return DynamicItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../poi-list-item/poi-list-item.component */ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.ts");
/* harmony import */ var _poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../poi-user-item/poi-user-item.component */ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.ts");




var DynamicItemComponent = /** @class */ (function () {
    function DynamicItemComponent(_changeDetector, _componentFactoryResolver) {
        this._changeDetector = _changeDetector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.isHidden = false;
        this.status = 'idle';
    }
    DynamicItemComponent.prototype.ngOnInit = function () {
        this._setup();
    };
    DynamicItemComponent.prototype.ngOnChanges = function (changes) {
        if (!this._instance) {
            return;
        }
        if (changes.data) {
            if (changes.data.currentValue.type !== this._instance.data.type) {
                this.isHidden = (this.data['type'].includes('offtrail'));
                this._changeDetector.markForCheck();
                // item type mismatch, render new instance of correct item
                if (this._instance instanceof _poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_2__["PoiListItemComponent"] && this.data['type'] === 'user'
                    || this._instance instanceof _poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_3__["PoiUserItemComponent"] && this.data['type'] !== 'user') {
                    this.ngOnDestroy();
                    this._setup();
                    return;
                }
            }
        }
        if (changes.status) {
            this._instance.status = changes.status.currentValue;
        }
        if (changes.data) {
            this._instance.data = changes.data.currentValue;
            if (this._instance.setupIcons) {
                this._instance.setupIcons();
            }
        }
        this._instance.timeStamp = new Date().getTime();
    };
    DynamicItemComponent.prototype.ngOnDestroy = function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    DynamicItemComponent.prototype._setup = function () {
        var componentType = (this.data['type'] === 'user') ? _poi_user_item_poi_user_item_component__WEBPACK_IMPORTED_MODULE_3__["PoiUserItemComponent"] : _poi_list_item_poi_list_item_component__WEBPACK_IMPORTED_MODULE_2__["PoiListItemComponent"];
        this.isHidden = (this.data['type'] === 'offtrail');
        var factory = this._componentFactoryResolver.resolveComponentFactory(componentType);
        this._componentRef = this.container.createComponent(factory);
        // set dynamic component data
        this._instance = this._componentRef.instance;
        // inject data
        this._instance.data = this.data;
        this._instance.status = this.status;
        this._instance.timeStamp = new Date().getTime();
        this._changeDetector.markForCheck();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.offtrail'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DynamicItemComponent.prototype, "isHidden", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('container', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"])
    ], DynamicItemComponent.prototype, "container", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DynamicItemComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], DynamicItemComponent.prototype, "status", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], DynamicItemComponent.prototype, "timestamp", void 0);
    DynamicItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'poi-dynamic-item',
            template: __webpack_require__(/*! ./dynamic-item.component.html */ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-item.component.sass */ "./src/app/component/poi-list/dynamic-item/dynamic-item.component.sass")]
        })
        /* renders dynamic list item types based on type
        use multiple components as list items in a CDK virtual scroll
        if type === user, use user-item, else use poi-item */
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]])
    ], DynamicItemComponent);
    return DynamicItemComponent;
}());



/***/ }),

/***/ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-list-item/poi-list-item.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"icon-container\">\n  <display-icon [data]=\"this.poiTypes\" [name]=\"timeStamp\"></display-icon>\n</div>\n<div class=\"mat-list-text\">\n  <h2 matLine [innerHTML]=\"data.label\"></h2>\n  <p matLine *ngIf=\"data.anchorPoint\">\n    <span *ngIf=\"status !== 'tracking'\"> {{data.anchorPoint.distanceTotal | distance:'meters':'miles':false:2:true}} </span>\n    <span *ngIf=\"status === 'tracking' && data.distanceFromUser\"> {{data.distanceFromUser | distance:'meters':'miles':false:2:true:true}} </span>\n    <span *ngIf=\"data.distanceFromPoi\"> {{data.distanceFromPoi | distance:'meters':'miles':false:2:true:true}} </span>\n    <span> ({{data.waypoint.distance | distance:'meters':'miles':true}}) </span>\n  </p>\n</div>\n"

/***/ }),

/***/ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.sass":
/*!*******************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-list-item/poi-list-item.component.sass ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  background-color: white;\n  height: calc(100vh / 7) !important; }\n  :host h2 {\n    font-size: 3.4vh !important;\n    font-weight: 300 !important;\n    margin-bottom: 0.2em !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC9wb2ktbGlzdC1pdGVtL3BvaS1saXN0LWl0ZW0uY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDQyx1QkFBdUI7RUFDdkIsa0NBQWtDLEVBQUE7RUFGbkM7SUFLRywyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLCtCQUErQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L3BvaS1saXN0L3BvaS1saXN0LWl0ZW0vcG9pLWxpc3QtaXRlbS5jb21wb25lbnQuc2FzcyIsInNvdXJjZXNDb250ZW50IjpbIiA6aG9zdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLyA3KSAhaW1wb3J0YW50O1xuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDMuNHZoICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDMwMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1ib3R0b206IDAuMmVtICFpbXBvcnRhbnQ7IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-list-item/poi-list-item.component.ts ***!
  \*****************************************************************************/
/*! exports provided: PoiListItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoiListItemComponent", function() { return PoiListItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_util/poi */ "./src/app/_util/poi.ts");



var PoiListItemComponent = /** @class */ (function () {
    function PoiListItemComponent() {
        this.status = 'idle';
        this.poiTypes = [];
    }
    Object.defineProperty(PoiListItemComponent.prototype, "typeClass", {
        get: function () {
            return 'mat-list-item-content ' + this.data['type'].split(',').join('');
        },
        enumerable: true,
        configurable: true
    });
    ;
    PoiListItemComponent.prototype.ngOnInit = function () {
        this.setupIcons();
    };
    PoiListItemComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    PoiListItemComponent.prototype.setupIcons = function () {
        var _self = this;
        this.poiTypes = [];
        if (this.data) {
            // generate poiTypes (icons)
            var _poiStrArr_1 = this.data['type'].split(', ');
            _poiStrArr_1.forEach(function (poi, index) {
                if (poi === 'offtrail') {
                    return;
                }
                var _poiData = Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])(poi);
                if (_poiData !== undefined) {
                    if (_poiStrArr_1.length > 2 && index === 1) {
                        _self.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])('unknown'));
                    }
                    _self.poiTypes.push(_poiData);
                }
                else {
                    _self.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])('unknown'));
                }
            });
            // if no types
            if (this.poiTypes.length === 0) {
                this.poiTypes.push(Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])('unknown'));
            }
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PoiListItemComponent.prototype, "typeClass", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiListItemComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('status'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PoiListItemComponent.prototype, "status", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PoiListItemComponent.prototype, "timeStamp", void 0);
    PoiListItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'poi-list-item',
            template: __webpack_require__(/*! ./poi-list-item.component.html */ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.html"),
            styles: [__webpack_require__(/*! ./poi-list-item.component.sass */ "./src/app/component/poi-list/poi-list-item/poi-list-item.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PoiListItemComponent);
    return PoiListItemComponent;
}());



/***/ }),

/***/ "./src/app/component/poi-list/poi-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/component/poi-list/poi-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- just to use its classes -->\n<mat-action-list class=\"hidden\"></mat-action-list>\n\n<cdk-virtual-scroll-viewport\n  class=\"mat-list mat-list-base\"\n  id=\"poi-list\"\n  orientation=\"vertical\"\n  [itemSize]=\"itemSize\"\n\n  (scrolledIndexChange)=\"onScroll($event)\"\n\n  autosize\n  #poiList>\n\n\n  <poi-dynamic-item *cdkVirtualFor=\"let poi of this.combinedData; templateCacheSize: cacheSize; trackBy: trackElementBy\"\n\n                    class = \"mat-list-item mat-2-line mat-list-item-avatar mat-list-item-with-avatar\"\n\n                    [data] = \"poi\"\n                    [status] = \"status\"\n                    [timestamp] = \"timestamp\"\n                    (click) = \"onListItemClick(poi, $event)\"\n\n                    matRipple>\n  </poi-dynamic-item>\n\n</cdk-virtual-scroll-viewport>\n\n<user-indicator *ngIf=\"showUser\" [userPosition]=\"userPosition\" [status]=\"status\" (click)=\"centerOnUser()\"></user-indicator>\n"

/***/ }),

/***/ "./src/app/component/poi-list/poi-list.component.sass":
/*!************************************************************!*\
  !*** ./src/app/component/poi-list/poi-list.component.sass ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .offtrail {\n  opacity: 0.5;\n  background-color: grey;\n  pointer-events: none; }\n\n:host .hidden {\n  visibility: hidden;\n  display: none; }\n\n:host #poi-list {\n  padding-top: unset !important;\n  display: block;\n  height: 100%;\n  max-height: 100%;\n  width: 100%;\n  overflow-x: hidden; }\n\n:host /deep/ poi-list-item, :host /deep/ poi-user-item {\n  padding: 0 1vw !important;\n  width: 38vw !important; }\n\n:host /deep/ poi-list-item .mat-list-text, :host /deep/ poi-user-item .mat-list-text {\n    padding-left: 1vw !important;\n    overflow-x: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC9wb2ktbGlzdC5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUdHLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsb0JBQW9CLEVBQUE7O0FBTHZCO0VBUUcsa0JBQWtCO0VBQ2xCLGFBQWEsRUFBQTs7QUFUaEI7RUFZRyw2QkFBNkI7RUFDN0IsY0FBYztFQUNkLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLGtCQUFrQixFQUFBOztBQUVyQjtFQUdHLHlCQUF5QjtFQUN6QixzQkFBc0IsRUFBQTs7QUFKekI7SUFPSyw0QkFBNEI7SUFDNUIsa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvcG9pLWxpc3QvcG9pLWxpc3QuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuXG4gIC5vZmZ0cmFpbCB7XG4gICAgb3BhY2l0eTogMC41O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cblxuICAuaGlkZGVuIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgZGlzcGxheTogbm9uZTsgfVxuXG4gICNwb2ktbGlzdCB7XG4gICAgcGFkZGluZy10b3A6IHVuc2V0ICFpbXBvcnRhbnQ7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuOyB9IH1cblxuIDpob3N0IC9kZWVwLyB7XG5cbiAgcG9pLWxpc3QtaXRlbSwgcG9pLXVzZXItaXRlbSB7XG4gICAgcGFkZGluZzogMCAxdncgIWltcG9ydGFudDtcbiAgICB3aWR0aDogMzh2dyAhaW1wb3J0YW50O1xuXG4gICAgLm1hdC1saXN0LXRleHQge1xuICAgICAgcGFkZGluZy1sZWZ0OiAxdncgIWltcG9ydGFudDtcbiAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjsgfSB9IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/component/poi-list/poi-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/component/poi-list/poi-list.component.ts ***!
  \**********************************************************/
/*! exports provided: PoiListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoiListComponent", function() { return PoiListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/location-based/location-based.component */ "./src/app/base/location-based/location-based.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _service_note_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../service/note.service */ "./src/app/service/note.service.ts");







var PoiListComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PoiListComponent, _super);
    function PoiListComponent(_localStorage, _noteService, _changeDetector) {
        var _this = _super.call(this) || this;
        _this._localStorage = _localStorage;
        _this._noteService = _noteService;
        _this._changeDetector = _changeDetector;
        _this.scrollToEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this.combinedData = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]); // user and pois combined in a single (sorted) array
        _this.cacheSize = 10;
        _this._visibleItemCount = 7;
        _this._staticPoisArray = [];
        return _this;
    }
    // LIFECYCLE HOOKS
    PoiListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _self = this;
        _super.prototype.ngOnInit.call(this);
        this.itemSize = Math.round(this.container.elementRef.nativeElement.clientHeight / this._visibleItemCount);
        this.addSubscription('data', this.combinedData.subscribe(function (data) {
            _this._dataLength = data.length;
        }));
        this.addSubscription('note', this._noteService.noteUpdateObserver.subscribe(function (update) {
            if (update === 'added') {
                var _lastAddedNote = _self._noteService.getLastNote();
                var _newCombinedData = _self.combinedData.getValue();
                _newCombinedData.push(_lastAddedNote);
                _self._sortListData(_newCombinedData);
            }
            else if (update === 'removed') {
                var _deletedNote = _self._noteService.getLastNote();
                var _data = _self.combinedData.getValue();
                var _length = _data.length;
                for (var i = 0; i < _length; i++) {
                    if (_data[i].id === _deletedNote.id) {
                        _data.splice(i, 1);
                        _self._sortListData(_data);
                        break;
                    }
                }
            }
        }));
    };
    PoiListComponent.prototype.ngOnChanges = function (changes) {
        if (changes.milesData || changes.poisData) {
            this.setup();
            this._scrollToCenterMile();
        }
        if (changes.trigger) {
            this.centerOnUser();
        }
    };
    PoiListComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    PoiListComponent.prototype.setup = function () {
        this._staticPoisArray = [];
        var _poiIndexes = [];
        var _maxPoiDistance = this._localStorage.retrieve('poiMaxDistance');
        var _self = this;
        // get all pois within miles
        if (this.milesData) {
            var _length = this.milesData.length;
            for (var i = 0; i < _length; i++) {
                var _mile = this.milesData[i];
                if (_mile.pois && _mile.pois.length > 0) {
                    _poiIndexes = _poiIndexes.concat(_mile.pois);
                }
            }
        }
        else if (this.poisData) {
            _poiIndexes = this.poisData;
        }
        var _poiLength = _poiIndexes.length;
        for (var p = 0; p < _poiLength; p++) {
            var _poiId = _poiIndexes[p];
            // filter out of range pois
            var _poi = _self.trailGenerator.getPoiById(_poiId);
            if (_poi.waypoint.distance > _maxPoiDistance) {
                _poi.type += ', offtrail';
            }
            _self._staticPoisArray.push(_poi);
        }
        if (this.showUser) {
            var _userRef = (this.user !== undefined) ? this.user : _super.prototype.createBlankUser.call(this);
            var _array = this._staticPoisArray.concat(_userRef);
            var _notes = this._noteService.getFlatNotesArray();
            if (_notes) {
                _array = _array.concat(_notes);
            }
            this._sortListData(_array);
            this.onUserLocationChange(_userRef);
        }
        else {
            this._sortListData(this._staticPoisArray);
            if (this.masterPoi) {
                this._calculateDistance(this.masterPoi);
            }
        }
    };
    // SUBSCRIPTION HANDLERS
    PoiListComponent.prototype.onStatusChange = function (status) {
        // if we're switching to tracking
        if (this._userStatus && this._userStatus !== 'tracking' && status === 'tracking') {
            this.centerOnUser();
        }
        this._userStatus = this.status;
        this._changeDetector.markForCheck(); // needed to update user poi list item
    };
    PoiListComponent.prototype.onUserLocationChange = function (user) {
        var _notes = this._noteService.getFlatNotesArray();
        var _poisArray;
        // // if tracking
        if (location && this.status !== 'idle') {
            if (this.showUser) {
                _poisArray = this._staticPoisArray.concat(user);
            }
            if (this.milesData) {
                this._calculateDistance(user);
            }
        }
        else if (this.showUser) {
            user.waypoint = user.anchorPoint = undefined;
            _poisArray = this._staticPoisArray.concat(user);
        }
        if (_notes) {
            _poisArray = _poisArray.concat(_notes);
        }
        this._sortListData(_poisArray);
    };
    PoiListComponent.prototype._calculateDistance = function (master) {
        if (master) {
            var staticPoisLength = this._staticPoisArray.length;
            // figure out where pois are in relation to the master poi
            for (var i = 0; i < staticPoisLength; i++) {
                var _poi = this._staticPoisArray[i];
                if (master.anchorPoint) {
                    if (!this.showUser) {
                        _poi.distanceFromPoi = _poi.anchorPoint.distanceTotal - master.anchorPoint.distanceTotal;
                    }
                    else {
                        _poi.distanceFromUser = _poi.anchorPoint.distanceTotal - master.anchorPoint.distanceTotal;
                    }
                }
            }
        }
    };
    // EVENT HANDLERS
    PoiListComponent.prototype.onListItemClick = function (poi, event) {
        var _event;
        if (poi.type === 'user') {
            this.locationService.toggleTracking();
            return;
        }
        else {
            _event = new CustomEvent('markerClick', {
                bubbles: true,
                cancelable: true,
                detail: poi
            });
        }
        document.getElementsByTagName('app-root')[0].dispatchEvent(_event);
    };
    PoiListComponent.prototype.centerOnUser = function () {
        _super.prototype.centerOnUser.call(this);
        if (!this.showUser) {
            return;
        }
        var _self = this;
        if (this.container) {
            requestAnimationFrame(function () {
                var _padding = _self.itemSize * 2; // this makes sure the user list item is fully on screen, therefor the poi/mile index is correct
                var _verticalOffset = _padding;
                if (_self.directionReversal) {
                    _verticalOffset = _self.container.elementRef.nativeElement.clientHeight - _self.itemSize - _padding;
                }
                _self.container.scrollToOffset((_self.itemSize * _self._userIndex) - _verticalOffset, 'auto');
            });
        }
    };
    PoiListComponent.prototype._scrollToCenterMile = function () {
        var _self = this;
        var trailLength = this.trailGenerator.getTrailData().miles.length;
        var _activeMile;
        // find the first mile containing a poi
        for (var i = this.activeMileId - 1; i < trailLength; i++) {
            if (i > -1) {
                if (this.trailGenerator.getTrailData().miles[i].pois) {
                    _activeMile = this.trailGenerator.getTrailData().miles[i];
                    break;
                }
            }
        }
        if (!_activeMile) {
            return;
        }
        var _middlePoi = _activeMile.pois[Math.floor(_activeMile.pois.length - 1)];
        window.requestAnimationFrame(function () {
            var _maxIndex = _self.combinedData.getValue().length;
            if (_self.directionReversal) {
                _middlePoi = _maxIndex - _middlePoi - _self._visibleItemCount;
                if (_middlePoi < 0) {
                    _middlePoi = 0;
                }
                else if (_middlePoi > _maxIndex) {
                    _middlePoi = _maxIndex;
                }
            }
            // scrolling to 0 somehow scrolls to the end of the list (cdk bug)
            var _total = (_middlePoi === 0) ? 1 : _middlePoi * _self.itemSize;
            _self.container.scrollToIndex(_middlePoi, 'auto');
            _self.container.scrollToOffset(_total, 'auto');
        });
    };
    PoiListComponent.prototype.onScroll = function (event) {
        if (this.combinedData.getValue().length < 1) {
            return; // no data
        }
        this._updateUserListIndicator();
        var _renderedIndexes = [];
        var _renderedPois = [];
        var _renderedMiles = [];
        // get the offset
        var _renderedOffset = this.container.measureScrollOffset('top');
        var _firstIndex = Math.floor(_renderedOffset / this.itemSize);
        // using 8 instead of 7 to compensate for the possibility that there is a user visible in list data
        for (var i = _firstIndex; i < _firstIndex + (this._visibleItemCount + 1); i++) {
            var _poi = this.combinedData.getValue()[i];
            // filter out the user
            if (_poi && _poi.type !== 'user') {
                _renderedIndexes.push(i);
                _renderedPois.push(_poi.id);
                _renderedMiles.push(_poi['belongsTo']);
            }
        }
        // const _firstPoiId: number = (this.directionReversal) ? _renderedIndexes[_renderedIndexes.length - 1] : _renderedIndexes[0];
        var _firstPoi = this.combinedData.getValue()[_renderedIndexes[0]];
        if (!_firstPoi) {
            return;
        }
        var _mile = this.trailGenerator.getTrailData().miles[_firstPoi['belongsTo'] - 1];
        this.scrollToEvent.emit({ mileId: _mile.id, renderedPoiRange: _renderedPois, renderedMileRange: _renderedMiles });
    };
    PoiListComponent.prototype._updateUserListIndicator = function () {
        var _renderedRange = this.container.getRenderedRange();
        if (this._userIndex < _renderedRange.start) {
            this.userPosition = 'above';
        }
        else if (this._userIndex > _renderedRange.end) {
            this.userPosition = 'below';
        }
        else if (this._userIndex >= _renderedRange.start && this._userIndex <= _renderedRange.end) {
            this.userPosition = 'visible';
        }
    };
    // OTHER
    PoiListComponent.prototype._sortListData = function (data) {
        if (!data) {
            return;
        }
        // sort array by the trail distance of the anchor point (the nearest on trail location)
        data.sort(function (a, b) {
            var _aDist = (a.anchorPoint && a.anchorPoint.distanceTotal) ? a.anchorPoint.distanceTotal : 0;
            var _bDist = (b.anchorPoint && b.anchorPoint.distanceTotal) ? b.anchorPoint.distanceTotal : 0;
            return _aDist - _bDist;
        });
        if (this.directionReversal) {
            data.reverse();
        }
        this.cacheSize = Math.floor(data.length / 10);
        this.cacheSize = (this.cacheSize < this._visibleItemCount) ? this._visibleItemCount : this.cacheSize;
        this._userIndex = data.findIndex(function (poi) { return poi.type === 'user'; });
        this.combinedData.next(data);
        this.timestamp = new Date().getTime();
        this.container.checkViewportSize(); // magically fixes everything! somehow...
    };
    // define ID for better li recycling (according to the CDK virtual scroll docs)
    PoiListComponent.prototype.trackElementBy = function (index, element) {
        return element.id;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('poiList'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__["CdkVirtualScrollViewport"])
    ], PoiListComponent.prototype, "container", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], PoiListComponent.prototype, "scrollToEvent", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], PoiListComponent.prototype, "milesData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], PoiListComponent.prototype, "poisData", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiListComponent.prototype, "masterPoi", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], PoiListComponent.prototype, "showUser", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PoiListComponent.prototype, "activeMileId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], PoiListComponent.prototype, "directionReversal", void 0);
    PoiListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'poi-list',
            template: __webpack_require__(/*! ./poi-list.component.html */ "./src/app/component/poi-list/poi-list.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./poi-list.component.sass */ "./src/app/component/poi-list/poi-list.component.sass")]
        })
        // using basic for loops, nothing fancy for performance.
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
            _service_note_service__WEBPACK_IMPORTED_MODULE_6__["NoteService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], PoiListComponent);
    return PoiListComponent;
}(_base_location_based_location_based_component__WEBPACK_IMPORTED_MODULE_2__["LocationBasedComponent"]));



/***/ }),

/***/ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-user-item/poi-user-item.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"icon noselect fa-2x\">\n  <fa-layers id=\"icons\" [fixedWidth]=\"true\">\n    {{userStatus}}\n    <fa-icon icon=\"location-arrow\" [className]=\"!userStatus || userStatus === 'idle' ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon [icon]=\"['far', 'compass']\" [spin]=\"true\" [className]=\"userStatus === 'fetching' ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon [icon]=\"['fa', 'hiking']\" [className]=\"userStatus === 'tracking' ? 'visible' : 'invisible'\"></fa-icon>\n    <fa-icon id=\"error\" icon=\"exclamation-triangle\" [className]=\"userStatus === 'error' ? 'visible' : 'invisible'\"></fa-icon>\n  </fa-layers>\n</div>\n\n<div class=\"mat-list-text\">\n  <h2 matLine>You</h2>\n  <p matLine>\n    <span *ngIf=\"userStatus !== 'tracking'\">{{userStatus}}</span>\n    <span *ngIf=\"userStatus === 'tracking' && data.anchorPoint && data.waypoint\">{{data.anchorPoint.distanceTotal | distance:'meters':'miles':false:2:true}} ({{data.waypoint.distance | distance:'meters':'miles':true}})</span>\n  </p>\n</div>\n"

/***/ }),

/***/ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.sass":
/*!*******************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-user-item/poi-user-item.component.sass ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host.idle {\n  background-color: #DDD; }\n\n:host.fetching {\n  background-color: lightgoldenrodyellow; }\n\n:host.error {\n  background-color: lightsalmon; }\n\n:host.tracking {\n  background-color: lightgreen; }\n\n:host {\n  height: calc(100vh / 7) !important; }\n\n:host h2 {\n    font-size: 3.4vh !important;\n    font-weight: 500 !important;\n    margin-bottom: 0.2em !important; }\n\n:host .visible {\n    opacity: 1;\n    visibility: visible; }\n\n:host .invisible {\n    opacity: 0;\n    visibility: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC9wb2ktdXNlci1pdGVtL3BvaS11c2VyLWl0ZW0uY29tcG9uZW50LnNhc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7RUFDQyxzQkFBc0IsRUFBQTs7QUFFdkI7RUFDQyxzQ0FBc0MsRUFBQTs7QUFFdkM7RUFDQyw2QkFBNkIsRUFBQTs7QUFFOUI7RUFDQyw0QkFBNEIsRUFBQTs7QUFFN0I7RUFFQyxrQ0FBa0MsRUFBQTs7QUFGbkM7SUFhRywyQkFBMkI7SUFDM0IsMkJBQTJCO0lBQzNCLCtCQUErQixFQUFBOztBQWZsQztJQWtCRyxVQUFVO0lBQ1YsbUJBQW1CLEVBQUE7O0FBbkJ0QjtJQXFCRyxVQUFVO0lBQ1Ysa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvcG9pLWxpc3QvcG9pLXVzZXItaXRlbS9wb2ktdXNlci1pdGVtLmNvbXBvbmVudC5zYXNzIiwic291cmNlc0NvbnRlbnQiOlsiIDpob3N0LmlkbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREREOyB9XG5cbiA6aG9zdC5mZXRjaGluZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z29sZGVucm9keWVsbG93OyB9XG5cbiA6aG9zdC5lcnJvciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2FsbW9uOyB9XG5cbiA6aG9zdC50cmFja2luZyB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47IH1cblxuIDpob3N0IHtcblxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLyA3KSAhaW1wb3J0YW50O1xuXG4gIC8vZmEtbGF5ZXJzXG4gIC8vICBiYXNlOiBibG9ja1xuICAvLyAgY29sb3I6ICM1NTVcblxuICAvLy8vZmEtaWNvblxuICAvLy8vICBiYXNlOiBibG9ja1xuICAvLy8vICBwb3NpdGlvbjogYWJzb2x1dGVcbiAgLy8vLyAgdG9wOiA1MCVcbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMy40dmggIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNTAwICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMC4yZW0gIWltcG9ydGFudDsgfVxuXG4gIC52aXNpYmxlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7IH1cbiAgLmludmlzaWJsZSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH0gfVxuIl19 */"

/***/ }),

/***/ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/component/poi-list/poi-user-item/poi-user-item.component.ts ***!
  \*****************************************************************************/
/*! exports provided: PoiUserItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoiUserItemComponent", function() { return PoiUserItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PoiUserItemComponent = /** @class */ (function () {
    function PoiUserItemComponent(_changeDetector) {
        this._changeDetector = _changeDetector;
        // TODO: there has to be a an easier way to add dynamic classes to the host...
        this.isIdle = true;
        this.isFetching = false;
        this.isTracking = false;
        this.isError = false;
        this.isActive = true;
    }
    Object.defineProperty(PoiUserItemComponent.prototype, "status", {
        set: function (value) {
            if (value) {
                this.userStatus = value;
            }
            if (value === 'tracking') {
                this.isTracking = true;
                this.isIdle = this.isFetching = this.isError = false;
            }
            else if (value === 'fetching') {
                this.isFetching = true;
                this.isIdle = this.isTracking = this.isError = false;
            }
            else if (value === 'error') {
                this.isError = true;
                this.isIdle = this.isFetching = this.isTracking = false;
            }
            else {
                this.isIdle = true;
                this.isFetching = this.isTracking = this.isError = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    PoiUserItemComponent.prototype.ngOnInit = function () { };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.idle'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "isIdle", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.fetching'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "isFetching", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.tracking'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "isTracking", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.error'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "isError", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.mat-list-item-content'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "isActive", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PoiUserItemComponent.prototype, "data", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], PoiUserItemComponent.prototype, "timestamp", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('status'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], PoiUserItemComponent.prototype, "status", null);
    PoiUserItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'poi-user-item',
            template: __webpack_require__(/*! ./poi-user-item.component.html */ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.html"),
            styles: [__webpack_require__(/*! ./poi-user-item.component.sass */ "./src/app/component/poi-list/poi-user-item/poi-user-item.component.sass")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], PoiUserItemComponent);
    return PoiUserItemComponent;
}());



/***/ }),

/***/ "./src/app/component/poi-list/user-indicator/user-indicator.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/component/poi-list/user-indicator/user-indicator.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"indicator-bar\" *ngIf=\"userPosition !== 'visible'\" class=\"{{userPosition}} {{status}}\">\n  <fa-icon *ngIf=\"userPosition === 'above'\" icon=\"chevron-up\"></fa-icon>\n  <fa-icon *ngIf=\"userPosition === 'below'\" icon=\"chevron-down\"></fa-icon>\n</div>\n"

/***/ }),

/***/ "./src/app/component/poi-list/user-indicator/user-indicator.component.sass":
/*!*********************************************************************************!*\
  !*** ./src/app/component/poi-list/user-indicator/user-indicator.component.sass ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: absolute;\n  z-index: 1000;\n  right: 0;\n  width: 38.2vw;\n  height: calc(100vh / 14) !important;\n  text-align: center; }\n  :host #indicator-bar {\n    height: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    font-size: 3vh; }\n  :host .idle {\n    background-color: #DDD; }\n  :host .fetching {\n    background-color: lightgoldenrodyellow; }\n  :host .error {\n    background-color: lightsalmon; }\n  :host .tracking {\n    background-color: lightgreen; }\n  :host.above {\n  top: 0; }\n  :host.above #indicator-bar {\n    padding-top: 1.75vh; }\n  :host.below {\n  bottom: 0; }\n  :host.below #indicator-bar {\n    padding-top: 2vh; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2RvdXdlcy93b3JrL2p1c3QtaGlrZS9zcmMvYXBwL2NvbXBvbmVudC9wb2ktbGlzdC91c2VyLWluZGljYXRvci91c2VyLWluZGljYXRvci5jb21wb25lbnQuc2FzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQztFQUNDLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsUUFBUTtFQUNSLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsa0JBQWtCLEVBQUE7RUFObkI7SUFTRyxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixjQUFjLEVBQUE7RUFaakI7SUFlRyxzQkFBc0IsRUFBQTtFQWZ6QjtJQWtCRyxzQ0FBc0MsRUFBQTtFQWxCekM7SUFxQkcsNkJBQTZCLEVBQUE7RUFyQmhDO0lBd0JHLDRCQUE0QixFQUFBO0VBRS9CO0VBQ0MsTUFBTSxFQUFBO0VBRFA7SUFJRyxtQkFBbUIsRUFBQTtFQUV0QjtFQUNDLFNBQVMsRUFBQTtFQURWO0lBSUcsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvcG9pLWxpc3QvdXNlci1pbmRpY2F0b3IvdXNlci1pbmRpY2F0b3IuY29tcG9uZW50LnNhc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgOmhvc3Qge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMDA7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMzguMnZ3O1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLyAxNCkgIWltcG9ydGFudDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICNpbmRpY2F0b3ItYmFyIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAzdmg7IH1cblxuICAuaWRsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0RERDsgfVxuXG4gIC5mZXRjaGluZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRnb2xkZW5yb2R5ZWxsb3c7IH1cblxuICAuZXJyb3Ige1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2FsbW9uOyB9XG5cbiAgLnRyYWNraW5nIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZWVuOyB9IH1cblxuIDpob3N0LmFib3ZlIHtcbiAgdG9wOiAwO1xuXG4gICNpbmRpY2F0b3ItYmFyIHtcbiAgICBwYWRkaW5nLXRvcDogMS43NXZoOyB9IH1cblxuIDpob3N0LmJlbG93IHtcbiAgYm90dG9tOiAwO1xuXG4gICNpbmRpY2F0b3ItYmFyIHtcbiAgICBwYWRkaW5nLXRvcDogMnZoOyB9IH1cblxuIl19 */"

/***/ }),

/***/ "./src/app/component/poi-list/user-indicator/user-indicator.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/component/poi-list/user-indicator/user-indicator.component.ts ***!
  \*******************************************************************************/
/*! exports provided: UserIndicatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserIndicatorComponent", function() { return UserIndicatorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var UserIndicatorComponent = /** @class */ (function () {
    function UserIndicatorComponent() {
    }
    Object.defineProperty(UserIndicatorComponent.prototype, "classes", {
        get: function () { return this.userPosition; },
        enumerable: true,
        configurable: true
    });
    ;
    UserIndicatorComponent.prototype.ngOnInit = function () { };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], UserIndicatorComponent.prototype, "classes", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('userPosition'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], UserIndicatorComponent.prototype, "userPosition", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('status'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], UserIndicatorComponent.prototype, "status", void 0);
    UserIndicatorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'user-indicator',
            template: __webpack_require__(/*! ./user-indicator.component.html */ "./src/app/component/poi-list/user-indicator/user-indicator.component.html"),
            styles: [__webpack_require__(/*! ./user-indicator.component.sass */ "./src/app/component/poi-list/user-indicator/user-indicator.component.sass")]
        })
        // user indicator that shows if the user is north/south of currently rendered list items
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], UserIndicatorComponent);
    return UserIndicatorComponent;
}());



/***/ }),

/***/ "./src/app/factory/dialog.service.ts":
/*!*******************************************!*\
  !*** ./src/app/factory/dialog.service.ts ***!
  \*******************************************/
/*! exports provided: DialogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogService", function() { return DialogService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _component_dialog_note_dialog_note_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/dialog/note-dialog/note-dialog.component */ "./src/app/component/dialog/note-dialog/note-dialog.component.ts");



// supported dialogs

var DialogService = /** @class */ (function () {
    function DialogService(_dialog) {
        this._dialog = _dialog;
    }
    // marker dialog
    DialogService.prototype.openDialog = function (type, properties, callback) {
        var _this = this;
        this._toggleNavigationBar();
        if (this._currentDialog) {
            this._dialog.closeAll();
        }
        if (this._currentCloseSubscription) {
            this._currentCloseSubscription.unsubscribe();
            this._currentCloseSubscription = null;
        }
        this._currentDialog = this._createDialogByType(type, properties);
        // set a self destroying close subscription
        if (this._currentDialog) {
            this._currentCloseSubscription = this._currentDialog.afterClosed().subscribe(function (result) {
                // result should be success/failure or cancel
                _this._currentCloseSubscription.unsubscribe();
                _this._currentCloseSubscription = null;
                if (callback) {
                    callback(result);
                }
                _this._currentDialog = null;
            });
        }
    };
    DialogService.prototype._createDialogByType = function (type, properties) {
        if (type === 'note') {
            return this._dialog.open(_component_dialog_note_dialog_note_dialog_component__WEBPACK_IMPORTED_MODULE_3__["NoteDialogComponent"], {
                autoFocus: false,
                width: '60%',
                height: '75%',
                data: properties
            });
        }
        else {
            console.warn('attempting to open an unknown dialog type');
            return;
        }
    };
    DialogService.prototype._toggleNavigationBar = function () {
        // // get marker poi data
        // if (this.navIsVisible) {
        //   this._toggleNavigationVisibility(false);
        // }
    };
    DialogService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // TODO: generate the correct dialog, should house all dialogs (from app component)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], DialogService);
    return DialogService;
}());



/***/ }),

/***/ "./src/app/factory/marker.service.ts":
/*!*******************************************!*\
  !*** ./src/app/factory/marker.service.ts ***!
  \*******************************************/
/*! exports provided: MarkerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerService", function() { return MarkerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var _util_leaflet_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/leaflet/icon */ "./src/app/_util/leaflet/icon.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/color */ "./src/app/_util/color.ts");






var MarkerService = /** @class */ (function () {
    function MarkerService(_localStorageService) {
        this._localStorageService = _localStorageService;
        // svg pin icon
        this._markerData = 'm16.75,0.75c-8.28366,0 -15,6.71484 -15,15c0,2.32031 0.52734,4.52053 ' +
            '1.46925,6.48047c0.05269,0.11137 13.53075,26.51953 13.53075,26.51953l13.36819,-26.19141c1.04297,-2.04197 ' +
            '1.63181,-4.35647 1.63181,-6.80859c0,-8.28516 -6.71484,-15 -15,-15z';
        this.maxPoiDistanceOffTrail = _localStorageService.retrieve('poiDistanceOffTrail');
    }
    /* deals with multiple poi icons per marker:
    - if a poi has 1 type, base it
    - if a poi has 2 types, base them
    - if a poi has > 2 types, base 1+
    if a poi contains water always show that icon first */
    MarkerService.prototype.setupMarker = function (containerElement, poi, poiTypes) {
        // if there are no explicit poi types set, use all poi types
        if (!poiTypes) {
            poiTypes = poi.type.split(', ');
        }
        var _poiTypesLength = poiTypes.length;
        var _marker;
        var _markerColor;
        var _extraOffset = 0;
        var _iconSize = 16;
        var poiMeta = Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])(poiTypes[0]);
        if (!poiMeta || _poiTypesLength > 1) {
            _markerColor = Object(_util_poi__WEBPACK_IMPORTED_MODULE_2__["getPoiTypeByType"])('multiple').color;
        }
        else {
            _markerColor = poiMeta.color;
        }
        _marker = this._createMarkerType(poi, containerElement, _markerColor);
        // set classes
        var _length = (_poiTypesLength > 2) ? 2 : _poiTypesLength;
        for (var i = 0; i < _length; i++) {
            _marker.addClass(poiTypes[i]);
        }
        if (_poiTypesLength > 1) {
            _marker.addClass('multiple');
            _iconSize = 14;
            _extraOffset = (_iconSize / 2);
        }
        // if multipoi
        if (poiTypes.length > 1) {
            // check if there's water
            var _waterIndex = poiTypes.indexOf('water');
            // swap elements so water is first
            if (_waterIndex > 0) {
                poiTypes[0] = poiTypes.splice(_waterIndex, 1, poiTypes[0])[0];
            }
        }
        for (var t = 0; t < 2; t++) {
            var _type = poiTypes[t];
            if (_type) {
                // max of 2 icons in marker, if more types show plus symbol
                if (t === 1 && poiTypes.length > 2) {
                    _type = 'multiple';
                }
                _marker.use(this.sampleFaIcon(_type)).width(_iconSize).height(_iconSize).move(-(_iconSize / 2) + ((t * 1.5) * (_iconSize / 2)) - _extraOffset, Number(_marker.node.attributes.vOffset.value) + (_iconSize / 2) + (t * _extraOffset));
            }
        }
        return _marker;
    };
    MarkerService.prototype._createMarkerType = function (poi, containerElement, color) {
        var _marker;
        if (poi.waypoint.distance <= this.maxPoiDistanceOffTrail || !this.maxPoiDistanceOffTrail) {
            _marker = this.createSvgPinMarker(containerElement, color);
        }
        else {
            _marker = this.createSvgCircleMarker(containerElement, color);
        }
        return _marker;
    };
    MarkerService.prototype.createSvgFaElement = function (canvas, id, scale, offsetX, offsetY) {
        if (scale === void 0) { scale = 1; }
        if (offsetX === void 0) { offsetX = -16.5; }
        if (offsetY === void 0) { offsetY = -48; }
        var _element = canvas.group();
        _element.use(this.sampleFaIcon(id)).width(33 * scale).height(50 * scale).move(offsetX, offsetY);
        return _element;
    };
    // by default a point marker is 30 x 45px, and the border color is 10% darker than the fill color
    MarkerService.prototype.createSvgPinMarker = function (canvas, color, scale, opacity) {
        if (scale === void 0) { scale = 1; }
        if (opacity === void 0) { opacity = 0.85; }
        var _marker = canvas.group();
        _marker.attr('vOffset', -(50 * scale));
        _marker.attr('fill-opacity', opacity);
        _marker.addClass('fa-marker');
        _marker.attr('type', 'pin');
        _marker.path(this._markerData).fill(color).width(33 * scale).height(50 * scale).stroke({ color: Object(_util_color__WEBPACK_IMPORTED_MODULE_5__["shadeColor"])(color, -15), width: 2 * scale }).move(-(16.5 * scale), -(50 * scale)).addClass('pin');
        return _marker;
    };
    // by default a round marker is 30 x 30px, and the border color is 10% darker than the fill color
    MarkerService.prototype.createSvgCircleMarker = function (canvas, color, scale, opacity) {
        if (scale === void 0) { scale = 1; }
        if (opacity === void 0) { opacity = 0.85; }
        var _marker = canvas.group();
        _marker.attr('vOffset', -(16.5 * scale));
        _marker.attr('fill-opacity', opacity);
        _marker.addClass('fa-marker');
        _marker.attr('type', 'pin');
        _marker.attr('type', 'circle');
        var _size = Math.round(33 * scale);
        _marker.circle(_size, _size).fill(color).stroke({ color: Object(_util_color__WEBPACK_IMPORTED_MODULE_5__["shadeColor"])(color, -15), width: 2 * scale }).move(-(16.5 * scale), -(16.5 * scale)).addClass('circle');
        return _marker;
    };
    // font awesome webfont doesn't seem to render to svg elements
    // to fix this we're cloning svg data from generated (hidden) elements at start-up, see fa-sampler (component)
    // check if the svg data exists, and return the full id string to use
    MarkerService.prototype.sampleFaIcon = function (iconId) {
        // test if Font Awesome SVG data exists
        var svgIcon = document.getElementById('sample-' + iconId);
        if (svgIcon === null) {
            iconId = 'unknown';
            console.log('attempting to use unknown Font Awesome icon', iconId);
        }
        return 'sample-' + iconId;
    };
    // leaflet only, creates a circular leaflet marker that pulses (tracking only, invisible when idle/fetching)
    MarkerService.prototype.createLeafletUserMarker = function () {
        // create root + svg element
        var _element = document.createElement('div');
        _element.classList.add('user-marker');
        // create circle + icon
        var _draw = SVG(_element).size(26, 26).style('overflow', 'visible');
        this.createSvgCircleMarker(_draw, '#7f7f7f', 0.787878);
        _draw.use(this.sampleFaIcon('user-dot')).width(24).height(24).move(-12, -12);
        // pulsing circle
        var _pulse = document.createElement('div');
        _pulse.classList.add('pulse');
        _element.appendChild(_pulse);
        return Object(_util_leaflet_icon__WEBPACK_IMPORTED_MODULE_3__["htmlIcon"])({ className: 'user', html: _element });
    };
    MarkerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // factory for generating markers (leaflet & elevation profile markers)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"]])
    ], MarkerService);
    return MarkerService;
}());



/***/ }),

/***/ "./src/app/parser/pct-data.ts":
/*!************************************!*\
  !*** ./src/app/parser/pct-data.ts ***!
  \************************************/
/*! exports provided: PCTData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PCTData", function() { return PCTData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_geolib_distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/geolib/distance */ "./src/app/_util/geolib/distance.ts");
/* harmony import */ var _util_leaflet_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/leaflet/converter */ "./src/app/_util/leaflet/converter.ts");
/* harmony import */ var _base_trail_parser_trail_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base/trail-parser/trail-parser */ "./src/app/base/trail-parser/trail-parser.ts");





/* Pacific Crest Trail www.pcta.org */
var PCTData = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PCTData, _super);
    function PCTData() {
        return _super.call(this) || this;
    }
    // parses the entire PCT as well as the DEMO trail (the first section of the PCT)
    PCTData.prototype.parse = function (trail, trailData, poiData, snow, towns, direction) {
        _super.prototype.parse.call(this, trail, trailData, poiData, snow, towns, direction);
        // set waypoint string property conversion values
        this.findReplaceArray = [
            { find: 'ele', replace: 'elevation' },
            { find: 'lat=', replace: 'latitude=' },
            { find: 'lon=', replace: 'longitude=' },
            { find: 'desc', replace: 'description' },
            { find: 'cmt', replace: 'comment' },
            { find: 'sym', replace: 'icon' }
        ];
        // WAYPOINTS
        // convert the waypoints
        var _trailData;
        if (Array.isArray(this.trailData)) {
            _trailData = this.parseTrail(this.trailData);
        }
        else {
            _trailData = this.parseTrail([this.trailData]);
        }
        trail.length = this.totalDistance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].MILE;
        // POIS (=points of interest. water sources, campsites etc.)
        poiData = this.convertToWaypointString(poiData);
        var poiAsJson = this.x2js.xml2js(poiData);
        var _pois = this.directionReverse(this.parsePois(poiAsJson['gpx']['wpt']));
        return [trail, _trailData, _pois, snow['datasets'][0], towns];
    };
    PCTData.prototype.parseTrail = function (trailData) {
        var _self = this;
        // TRAIL
        var _waypoints = [];
        trailData.forEach(function (trailString, index) {
            trailString = _self.convertToWaypointString(trailString);
            console.log(trailString);
            var trailAsJson = _self.x2js.xml2js(trailString);
            console.log(trailAsJson);
            // get just the main trail data, ignore side-trails (for now)
            if (!Array.isArray(trailAsJson['gpx']['trk'])) {
                // convert to array with 1 track
                trailAsJson['gpx']['trk'] = [trailAsJson['gpx']['trk']];
            }
            trailAsJson['gpx']['trk'] = _self.directionReverse(trailAsJson['gpx']['trk']);
            var _length = trailAsJson['gpx']['trk'].length;
            for (var i = 0; i < _length; i++) {
                var _section = trailAsJson['gpx']['trk'][i];
                // 'Red' identifies the main track
                if (_section.extensions.TrackExtension.DisplayColor.__text.includes('Red')) {
                    _section.trkseg.trkpt = _self.directionReverse(_section.trkseg.trkpt);
                    var _sectionWaypoints = Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_3__["pointArrayTypeConversion"])(_section.trkseg.trkpt, 'waypoint', 'waypoint');
                    var _trailLength = void 0;
                    // DEMO data has a single number, PCT has an array (sections)
                    if (typeof _self.trail.length === 'number') {
                        _trailLength = _self.trail.length;
                    }
                    else {
                        _trailLength = _self.trail.length[index];
                    }
                    var _scale = Object(_util_geolib_distance__WEBPACK_IMPORTED_MODULE_2__["calculateSectionScale"])(_sectionWaypoints, _trailLength);
                    _sectionWaypoints = _self.addDistanceToWaypoints(_sectionWaypoints, _scale);
                    _waypoints = _waypoints.concat(_sectionWaypoints);
                }
            }
        });
        return _waypoints;
    };
    // TODO: cleanup (dealing with other peoples data files gets messy)
    PCTData.prototype.parsePois = function (pois) {
        var _poisLength = pois.length; // faster
        var _parsedPois = [];
        // a static list of poi types based on the raw data identifiers, which are manually linked to poiTypes (or unknown)
        var _identifierTypes = { MexB: 'end', WR: 'water', RD: 'road', RDB: 'road', PO: 'postoffice', Trad: 'store, food', Hwy: 'highway', RR: 'railroad', CS: 'camp', GT: 'gate', GTB: 'gate', PL: 'powerline', PLB: 'powerline', WRCS: 'water, camp', WACS: 'water, camp', OakS: 'store, food', Kitc: 'water', TR: 'trail', RedT: 'information', RDb: 'road', Deck: 'view', TH: 'trailhead', WRA: 'water', WRB: 'water', WRC: 'water', BV: 'camp', BVB: 'camp', CSC: 'camp', CSB: 'camp', BGCa: 'sight', Ranc: 'view', GTC: 'gate', Eagl: 'sight', HwyB: 'highway', TRb: 'trail', WRb: 'water', Heme: 'store, food', Tqtz: 'water', Humb: 'trailhead', Sadd: 'trail', PSTr: 'trail', TrRo: 'trail', WA: 'water', MtSa: 'view', Roun: 'boundary', SJSh: 'shelter', TrWi: 'trail', Well: 'water', SJTr: 'trail', BY: 'boundary', Suic: 'peak', TrSu: 'trail', Stra: 'trailhead', Zigg: 'resort', RDC: 'road', CCra: 'sight', Fish: 'trail', Anim: 'sight', Spli: 'shelter', Brid: 'bridge', MFSp: 'unknown', Stat: 'boundary', Moja: 'powerline', Fore: 'boundary', McDo: 'food', RRB: 'railroad', RDD: 'road', Bald: 'trailhead', MtBa: 'peak', Memo: 'sight', Door: 'water', TRB: 'trail', TRC: 'trail', HwyC: 'highway', BigR: 'water', Burk: 'peak', Punc: 'water', HwyD: 'highway', HwyE: 'highway', Buck: 'road', HWYF: 'highway', HwyG: 'highway', HwyH: 'highway', HwyI: 'highway', Mess: 'camp', Acto: 'resort', Gold: 'sight', Agua: 'town', Sier: 'highway', Benc: 'sight', Casa: 'resort', Iber: 'postoffice, water', Wind: 'sight', Pass: 'peak', Gull: 'sight', KMSt: 'resort', WAB: 'water', Hors: 'camp', JMT: 'trail', BVI: 'camp', CSH: 'camp', CSL: 'camp', CSM: 'camp', MTWh: 'peak', Trai: 'peak', WAC: 'water', WAD: 'water', WAE: 'water', WAJ: 'water', WAN: 'water', WAO: 'water', WAQ: 'water', WAS: 'water', WAT: 'water', WAU: 'water', Onio: 'trailhead', RaeL: 'information', GTD: 'gate', McCl: 'information', HotS: 'sight', Muir: 'resort', CSD: 'camp', VVR: 'resort', Reds: 'resort', CSO: 'camp', WAF: 'water', WAK: 'water', WAV: 'water', MMSk: 'unknown', NoCa: 'warning', Tuol: 'postoffice, store, food', JMTC: 'camp', Happ: 'road', HWYB: 'highway', JMTW: 'water', Walk: 'trailhead', Cars: 'boundary', Meis: 'water', Echo: 'trailhead', Ski: 'sight', Weat: 'sight', Rest: 'sight', Pete: 'camp', Chur: 'sight', Road: 'road', Paul: 'water', EBra: 'water', WBra: 'water', RDN: 'road', Bear: 'water', Hask: 'store, resort', Lake: 'resort', Beld: 'resort', Will: 'water', Myrt: 'water', Cold: 'water', PCTM: 'sight', HWY: 'highway', Drak: 'resort', OldS: 'town', JJsC: 'food, store', Subw: 'water', HatC: 'view', Crys: 'water', Brit: 'water', Fitz: 'water', Fern: 'water', Dead: 'water', Litt: 'water', Wolf: 'water', Etna: 'road', Shel: 'water', Marb: 'water, camp', Seia: 'resort', Alex: 'water', Ward: 'road', Oreg: 'boundary', Rogu: 'boundary', Call: 'resort', OldH: 'highway', Camp: 'resort', Klum: 'camp, water', Howa: 'water, road', Brow: 'water, camp', RimD: 'highway', RimV: 'information', RimT: 'trailhead', Casc: 'water', Summ: 'trailhead', Maza: 'resort', ORWA: 'sign', CSDi: 'camp', SkiS: 'sight, camp', Isla: 'water', Koos: 'camp', Obsi: 'boundary, warning', Sant: 'trailhead', Jeff: 'boundary', SFor: 'water', Park: 'camp', Many: 'view', Olal: 'resort', Pinh: 'trailhead', OakG: 'water', Kohn: 'boundary', Timb: 'resort', Radi: 'sight', Ramo: 'water', Mudd: 'water, camp', Indi: 'water', Mile: 'sight', High: 'sight', Tunn: 'sight', SWMo: 'road', Tabl: 'information', Blue: 'water, camp', Yaka: 'warning', Krac: 'resort', TwoL: 'water', BigC: 'camp', Mart: 'camp', Uric: 'camp, water', Olla: 'sight', MFor: 'camp, water', Dutc: 'view', Lema: 'camp', Deep: 'water', Dece: 'water', HwyJ: 'highway', Rain: 'water', Monu: 'end', RESO: 'resort' };
        var _count = 0;
        for (var i = 0; i < _poisLength; i++) {
            var _poi = pois[i];
            // delete if poi is mile marker
            if (_poi['icon'] === 'Triangle, Red') {
                delete pois[i];
            }
            else {
                _poi['id'] = _count;
                _count++;
                // create waypoint
                _poi['waypoint'] = { latitude: _poi['latitude'], longitude: _poi['longitude'], elevation: _poi['elevation'] };
                delete _poi['latitude'];
                delete _poi['longitude'];
                delete _poi['elevation'];
                // remove color from icon
                delete _poi['icon'];
                // set the type based on the remaining string
                var _identifier = _poi['name'].replace(/\d+/g, '');
                // '-' means side trail, which we're ignoring for now.
                if (!_poi['name'].includes('-')) {
                    var _last2Letters = _identifier.substr(_identifier.length - 2, _identifier.length - 1).toLowerCase();
                    var _last3Letters = _identifier.substr(_identifier.length - 3, _identifier.length - 1).toLowerCase();
                    var _last4Letters = _identifier.substr(_identifier.length - 4, _identifier.length - 1).toLowerCase();
                    if (_last2Letters === 'tr') {
                        _identifier = 'TR';
                    }
                    else if (_last2Letters === 'th') {
                        _identifier = 'TH';
                    }
                    else if (_last2Letters === 'cg' || _last3Letters === 'cmp') {
                        _identifier = 'WRCS';
                    }
                    else if (_last2Letters === 'np' || _last2Letters === 'nf' || _last2Letters === 'sp' || _last4Letters === 'wild') {
                        _identifier = 'BY';
                    }
                    else if (_last2Letters === 'rd' || _last4Letters === 'road') {
                        _identifier = 'RD';
                    }
                    else if (_last4Letters === 'inn' || _last4Letters === 'odge' || _last4Letters === 'sort') {
                        _identifier = 'RESO';
                    }
                    else if (_last4Letters === 'pass') {
                        _identifier = 'Pass';
                    }
                    else if (_last4Letters === 'ring' || _last4Letters === 'reek' || _last4Letters === 'iver'
                        || _last4Letters === 'trib' || _last4Letters === 'lake' || _last4Letters === 'pond' || _last4Letters === 'seep'
                        || _last3Letters === 'crk' || _last3Letters === 'spg' || _last4Letters === 'fork') {
                        _identifier = 'WA';
                    }
                    else if (_last4Letters === 'camp') {
                        _identifier = 'CS';
                    }
                    else {
                        _identifier = _poi['name'].replace(/\d+/g, '').substr(0, 4);
                    }
                    // generateIdentifierList(_identifier);
                }
                _poi['type'] = _identifierTypes[_identifier];
                if (!_poi['type']) {
                    _poi['type'] = 'unknown';
                }
                // title & description
                console.log(JSON.stringify(_poi['description']));
                var _textArray = this._splitCleanStrings(_poi['description'], [', ', '---', '<br/>']);
                var _labelArray = _textArray.shift().split('. ');
                _poi['label'] = _labelArray.shift();
                _textArray.unshift(_labelArray.join('. '));
                // filter out blank elements
                var _descriptionArray = _textArray.filter(function (element) {
                    return element !== '';
                });
                var _description = _descriptionArray.join(' ').split('. ').join('<br/><br/>');
                _poi['description'] = this._convertDescription(_description);
                _poi['identifier'] = 'HM: ' + _poi['name'];
                delete _poi['name'];
                _parsedPois.push(_poi);
            }
        }
        // 4. adjust individual pois
        // Highway elevation seems to be in feet, while rest of the waypoints is in meters
        var _highwayExceptions = ['Highway 78', 'Highway 74', 'Highway 178', 'Highway 108', 'Highway 50', 'Highway 49', 'Highway 36',
            'Highway 299', 'Highway 5', 'Highway 99', 'Highway 140', 'Hwy 242', 'under Highway 84', 'Stevens Pass', 'Highway 20'];
        var _pLength = _parsedPois.length;
        var _eLength = _highwayExceptions.length;
        for (var p = 0; p < _pLength; p++) {
            var _exception = -1;
            for (var e = 0; e < _eLength; e++) {
                if (_parsedPois[p].label.includes(_highwayExceptions[e])) {
                    _parsedPois[p].waypoint.elevation = _parsedPois[p].waypoint.elevation * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].FOOT;
                    _exception = e;
                    break;
                }
            }
            if (_exception !== -1) {
                _highwayExceptions.splice(_exception, 1);
            }
            if (_highwayExceptions.length === 0) {
                break;
            }
        }
        return _parsedPois;
    };
    PCTData.prototype._convertDescription = function (input) {
        var _description = this.convertStringUrls(input); // a href tag
        _description = this.convertStringTel(_description); // a tel tag
        _description = this._capFirstLetter(_description); // capitalize
        return _description;
    };
    // does not support ~ (tilde), this is slow...
    PCTData.prototype._splitCleanStrings = function (input, remove) {
        remove.push('~');
        var _input = input;
        var _length = remove.length;
        for (var i = 0; i < _length; i++) {
            _input = _input.split(remove[i]);
            if (i !== _length - 1) {
                _input = _input.join('~');
            }
        }
        return _input;
    };
    PCTData.prototype._capFirstLetter = function (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
    return PCTData;
}(_base_trail_parser_trail_parser__WEBPACK_IMPORTED_MODULE_4__["TrailParser"]));



/***/ }),

/***/ "./src/app/parser/shr-data.ts":
/*!************************************!*\
  !*** ./src/app/parser/shr-data.ts ***!
  \************************************/
/*! exports provided: SHRData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHRData", function() { return SHRData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_geolib_distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/geolib/distance */ "./src/app/_util/geolib/distance.ts");
/* harmony import */ var _util_leaflet_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/leaflet/converter */ "./src/app/_util/leaflet/converter.ts");
/* harmony import */ var _base_trail_parser_trail_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base/trail-parser/trail-parser */ "./src/app/base/trail-parser/trail-parser.ts");





/* Sierra High Route, only app that supports it! */
var SHRData = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SHRData, _super);
    function SHRData() {
        return _super.call(this) || this;
    }
    // parses the entire PCT as well as the DEMO trail (the first section of the PCT)
    SHRData.prototype.parse = function (trail, trailData, poiData, snow, towns, direction) {
        _super.prototype.parse.call(this, trail, trailData, poiData, snow, towns, direction);
        // set waypoint string property conversion values
        this.findReplaceArray = [
            { find: 'ele', replace: 'elevation' },
            { find: 'lat=', replace: 'latitude=' },
            { find: 'lon=', replace: 'longitude=' },
            { find: 'desc', replace: 'description' }
        ];
        // WAYPOINTS
        // convert the waypoints
        var _trailData = this.parseTrail(this.trailData);
        trail.length = this.totalDistance / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_1__["environment"].MILE;
        // POIS (=points of interest. water sources, campsites etc.)
        poiData = this.convertToWaypointString(poiData);
        var poiAsJson = this.x2js.xml2js(poiData);
        var _pois = this.directionReverse(this.parsePois(poiAsJson['gpx']['wpt']));
        return [trail, _trailData, _pois, snow, towns];
    };
    SHRData.prototype.parseTrail = function (trailData) {
        var _self = this;
        // TRAIL
        var _waypoints = [];
        trailData = _self.convertToWaypointString(trailData);
        var trailAsJson = _self.x2js.xml2js(trailData);
        var _tracks = _self.directionReverse(trailAsJson['gpx']['trk'][1]['trkseg']);
        // combine all track segments in a single array
        _tracks.forEach(function (track) {
            var _sectionWaypoints = _self.directionReverse(Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_3__["pointArrayTypeConversion"])(track['trkpt'], 'waypoint', 'waypoint'));
            _waypoints = _waypoints.concat(_sectionWaypoints);
        });
        var _trailLength = _self.trail.length;
        var _scale = Object(_util_geolib_distance__WEBPACK_IMPORTED_MODULE_2__["calculateSectionScale"])(_waypoints, _trailLength);
        _waypoints = _self.smoothFlatPoints(_waypoints);
        _waypoints = _self.addDistanceToWaypoints(_waypoints, _scale);
        return _waypoints;
    };
    // remove waypoints that don't have elevation
    SHRData.prototype.smoothFlatPoints = function (waypoints) {
        var _length = waypoints.length;
        for (var i = 0; i < _length; i++) {
            var _waypoint = waypoints[i];
            if (!_waypoint.elevation) {
                _waypoint.elevation = (waypoints[i - 1].elevation + waypoints[i + 1].elevation) / 2;
            }
        }
        return waypoints;
    };
    SHRData.prototype.parsePois = function (pois) {
        pois.forEach(function (poi, index) {
            poi['id'] = index;
            // create waypoint
            poi['waypoint'] = { latitude: poi['latitude'], longitude: poi['longitude'], elevation: poi['elevation'] };
            delete poi['latitude'];
            delete poi['longitude'];
            delete poi['elevation'];
            // fix name
            if (poi['name'].match(/^\d/)) {
                // string starts with a number
                var _parts = poi['name'].split(' - ');
                poi['name'] = _parts[0];
                poi['label'] = _parts[1] || 'unknown';
            }
            else {
                poi['name'] = poi['label'] = poi['name'].split(' - ')[0];
            }
            // if no name, use a part of the description
            if (!poi['name']) {
                if (String(poi['description']).includes(' - ')) {
                    poi['name'] = poi['label'] = poi['description'].split(' - ')[0] || 'unknown';
                }
                else {
                    poi['name'] = poi['label'] = 'alternate';
                }
            }
            // TODO: parse poi types
            // set the type based on the remaining string
            var _identifier = poi['name'] + poi['label'];
            poi['type'] = 'unknown';
            if (_identifier.includes('Begin') || _identifier.includes('Mono Village')) {
                poi['type'] = 'end';
            }
            else if (_identifier.includes('Peak') || _identifier.includes('Mount') || _identifier.includes('Col')) {
                poi['type'] = 'peak';
            }
            else if (_identifier.includes('Lake') || _identifier.includes('Outlet') || _identifier.includes('WA')
                || _identifier.includes('Stream') || _identifier.includes('Tarn') || _identifier.includes('Creek')) {
                poi['type'] = 'water';
            }
            else if (_identifier.includes('WACS')) {
                poi['type'] = 'water, camp';
            }
            else if (_identifier.includes('Pass') || _identifier.includes('Saddle')) {
                poi['type'] = 'view';
            }
            else if (_identifier.includes('Memorial')) {
                poi['type'] = 'sight';
            }
            else if (_identifier.includes('OnionValley')) {
                poi['type'] = 'trailhead';
            }
            else if (_identifier.includes('CS') || _identifier.includes('Campsite')) {
                poi['type'] = 'camp';
            }
            else if (_identifier.includes('Point')) {
                poi['type'] = 'view';
            }
            // TODO: cleanup unused properties
            delete poi['sym'];
            delete poi['name'];
        });
        return pois;
    };
    return SHRData;
}(_base_trail_parser_trail_parser__WEBPACK_IMPORTED_MODULE_4__["TrailParser"]));



/***/ }),

/***/ "./src/app/pipe/distance.pipe.ts":
/*!***************************************!*\
  !*** ./src/app/pipe/distance.pipe.ts ***!
  \***************************************/
/*! exports provided: DistancePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DistancePipe", function() { return DistancePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");



var DistancePipe = /** @class */ (function () {
    function DistancePipe() {
    }
    // converts a number in a string indicating distance
    // optional: distance from trail
    DistancePipe.prototype.transform = function (value, currentUnit, desiredUnit, fromTrailIndicator, round, force, relative) {
        if (fromTrailIndicator === void 0) { fromTrailIndicator = false; }
        if (round === void 0) { round = 2; }
        if (force === void 0) { force = false; }
        if (relative === void 0) { relative = false; }
        var _currentUnit = (currentUnit) ? currentUnit : 'meters';
        var _convertedValue;
        var _format = 'm';
        // convert to meters
        if (_currentUnit !== 'meters') {
            if (_currentUnit === 'miles' || _currentUnit === 'mile') {
                value = value * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].MILE;
            }
            if (_currentUnit === 'feet' || _currentUnit === 'foot') {
                value = value * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].FOOT;
            }
            _currentUnit = 'meters';
        }
        // convert value from meters to desiredUnit (if needed)
        if (desiredUnit === 'miles' || desiredUnit === 'mile') {
            if (value / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].MILE >= 0.1 || force === true) {
                _convertedValue = Number((value / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].MILE).toFixed(round));
                _format = 'mi.';
            }
            else {
                _convertedValue = Number((value / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].FOOT).toFixed(0));
                _format = (_convertedValue > 1) ? 'feet' : 'foot';
                _format = (!fromTrailIndicator) ? _format : 'ft.';
            }
        }
        else if (desiredUnit === 'feet' || desiredUnit === 'foot') {
            _convertedValue = Number((value / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].FOOT).toFixed(0));
            _format = (_convertedValue > 1) ? 'feet' : 'foot';
            _format = (!fromTrailIndicator) ? _format : 'ft.';
        }
        else {
            _convertedValue = Number(value.toFixed(round));
        }
        // on/off trail
        if (fromTrailIndicator) {
            if (value > 10) {
                return '~' + _convertedValue + ' ' + _format + ' off trail';
            }
            else {
                return 'on trail';
            }
        }
        else if (relative) {
            var _relativeString = (value > 0) ? ' ahead' : ' back';
            return Math.abs(_convertedValue) + ' ' + _format + ' ' + _relativeString;
        }
        else {
            // return distance
            return _format + ' ' + _convertedValue;
        }
    };
    DistancePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'distance' })
    ], DistancePipe);
    return DistancePipe;
}());



/***/ }),

/***/ "./src/app/pipe/filesize.pipe.ts":
/*!***************************************!*\
  !*** ./src/app/pipe/filesize.pipe.ts ***!
  \***************************************/
/*! exports provided: FilesizePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesizePipe", function() { return FilesizePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FilesizePipe = /** @class */ (function () {
    function FilesizePipe() {
    }
    FilesizePipe.prototype.transform = function (bytes, decimalPoint) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        var _k = 1000;
        var _dm = decimalPoint || 2;
        var _sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var _i = Math.floor(Math.log(bytes) / Math.log(_k));
        return parseFloat((bytes / Math.pow(_k, _i)).toFixed(_dm)) + ' ' + _sizes[_i];
    };
    FilesizePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'filesize'
        })
    ], FilesizePipe);
    return FilesizePipe;
}());



/***/ }),

/***/ "./src/app/pipe/poi-sorting.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/pipe/poi-sorting.pipe.ts ***!
  \******************************************/
/*! exports provided: PoiSortingPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoiSortingPipe", function() { return PoiSortingPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PoiSortingPipe = /** @class */ (function () {
    function PoiSortingPipe() {
    }
    PoiSortingPipe.prototype.transform = function (subject) {
        if (!subject) {
            return;
        }
        var poiArray = subject.getValue();
        // sort array by the trail distance of the anchor point (the nearest on trail location)
        poiArray.sort(function (a, b) {
            var _aDist = (a.anchorPoint && a.anchorPoint.distanceTotal) ? a.anchorPoint.distanceTotal : 0;
            var _bDist = (b.anchorPoint && b.anchorPoint.distanceTotal) ? b.anchorPoint.distanceTotal : 0;
            return _aDist - _bDist;
        });
        return poiArray;
    };
    PoiSortingPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'poisorting' })
    ], PoiSortingPipe);
    return PoiSortingPipe;
}());



/***/ }),

/***/ "./src/app/service/connection.service.ts":
/*!***********************************************!*\
  !*** ./src/app/service/connection.service.ts ***!
  \***********************************************/
/*! exports provided: ConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionService", function() { return ConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");




var ConnectionService = /** @class */ (function () {
    function ConnectionService() {
        this._connection = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.state = 'unknown';
        this.connectionObserver = this._connection.asObservable();
    }
    ConnectionService.prototype.startTracking = function () {
        window.addEventListener('online', this._toggleConnection.bind(this), true);
        window.addEventListener('offline', this._toggleConnection.bind(this), true);
        this._toggleConnection();
    };
    ConnectionService.prototype.stopTracking = function () {
        window.removeEventListener('online', this._toggleConnection.bind(this), true);
        window.removeEventListener('offline', this._toggleConnection.bind(this), true);
        this._connection.next(null);
    };
    ConnectionService.prototype.getConnectionInfo = function () {
        if (!Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["hasConnection"])()) {
            return { state: 0, message: 'Unknown connection' };
        }
        var _connection = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getConnection"])();
        var _navigator = navigator;
        var _networkState = _navigator.connection.type;
        var _states = {};
        _states[_connection.UNKNOWN] = 'Unknown connection';
        _states[_connection.ETHERNET] = 'Ethernet connection';
        _states[_connection.WIFI] = 'WiFi connection';
        _states[_connection.CELL_2G] = 'Cell 2G connection';
        _states[_connection.CELL_3G] = 'Cell 3G connection';
        _states[_connection.CELL_4G] = 'Cell 4G connection';
        _states[_connection.CELL] = 'Cell generic connection';
        _states[_connection.NONE] = 'No network connection';
        // alert('Connection type: ' + _states[_networkState]);
        return { state: _networkState, message: _states[_networkState] };
    };
    ConnectionService.prototype.getStatus = function () {
        if (!Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["hasConnection"])()) {
            return 'unknown';
        }
        // cordova navigator
        var _connection = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getConnection"])();
        var _navigator = navigator;
        var _networkState = _navigator.connection.type;
        return (_networkState === _connection.NONE || _networkState === _connection.UNKNOWN) ? 'offline' : 'online';
    };
    ConnectionService.prototype._toggleConnection = function (event) {
        var _isOnline = navigator.onLine;
        if (this._connection.getValue() !== _isOnline) {
            this.state = (_isOnline) ? 'online' : 'offline';
            this._connection.next(_isOnline);
        }
    };
    ConnectionService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // TODO: online / offline doesn't seem to work reliably (and is slow), consider using another method/package
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConnectionService);
    return ConnectionService;
}());



/***/ }),

/***/ "./src/app/service/download.service.ts":
/*!*********************************************!*\
  !*** ./src/app/service/download.service.ts ***!
  \*********************************************/
/*! exports provided: DownloadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadService", function() { return DownloadService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _util_downloader_downloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/downloader/downloader */ "./src/app/_util/downloader/downloader.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _filesystem_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");








var DownloadService = /** @class */ (function () {
    function DownloadService(_fileSystemService, _httpClient, _localStorageService) {
        this._fileSystemService = _fileSystemService;
        this._httpClient = _httpClient;
        this._localStorageService = _localStorageService;
        this._downloaders = {};
        this._observers = {};
        this._states = {};
        this._isDownloading = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
        this.isDownloadingObservable = this._isDownloading.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["share"])());
    }
    // create a new downloader or return existing based on name
    DownloadService.prototype.createDownloader = function (name) {
        var _dl = this._downloaders[name];
        if (!_dl) {
            _dl = new _util_downloader_downloader__WEBPACK_IMPORTED_MODULE_3__["Downloader"](name, this._fileSystemService, this._httpClient, this._localStorageService);
            this._downloaders[name] = _dl;
            this._addStatusObserver(name, _dl);
        }
        return _dl;
    };
    DownloadService.prototype.clearDownloaders = function (trailAbbr, force) {
        if (force === void 0) { force = false; }
        this._updateGlobalStatus();
        if (this._isDownloading.getValue() && !force) {
            alert('Trying to cancel actively running downloads, use force!');
            return;
        }
        else {
            var _downloadersToClear = {};
            if (trailAbbr) {
                // only cancel/clear downloaders for trail
                for (var key in this._downloaders) {
                    if (key.includes(trailAbbr)) {
                        _downloadersToClear[key] = this._downloaders[key];
                    }
                }
            }
            else {
                // clear all
                _downloadersToClear = this._downloaders;
            }
            for (var key in _downloadersToClear) {
                var _dl = this._downloaders[key];
                _dl.cancelDownload();
                _dl = null;
                var _ob = this._observers[key];
                _ob.unsubscribe();
                _ob = null;
            }
            if (!trailAbbr) {
                this._downloaders = {};
                this._observers = {};
                this._states = {};
            }
        }
    };
    DownloadService.prototype._addStatusObserver = function (name, downloader) {
        var _this = this;
        // observe status
        var _downloadState = downloader.meta.subscribe(function (status) {
            _this._updateGlobalStatus();
        });
        this._states[name] = downloader.status.isActiveSubject;
        this._observers[name] = _downloadState;
    };
    DownloadService.prototype._updateGlobalStatus = function () {
        var _newState = false;
        for (var key in this._states) {
            var _statusSubject = this._states[key];
            if (_statusSubject.getValue() === true) {
                _newState = true;
            }
        }
        if (this._isDownloading.getValue() !== _newState) {
            this._isDownloading.next(_newState);
        }
    };
    DownloadService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // Downloader manager
        // creates separate downloaders for files that continue when components are removed
        // has a global state (isDownloading), to see if there are still active processes
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_filesystem_service__WEBPACK_IMPORTED_MODULE_6__["FilesystemService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"]])
    ], DownloadService);
    return DownloadService;
}());



/***/ }),

/***/ "./src/app/service/filesystem.service.ts":
/*!***********************************************!*\
  !*** ./src/app/service/filesystem.service.ts ***!
  \***********************************************/
/*! exports provided: FilesystemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesystemService", function() { return FilesystemService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _util_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/file */ "./src/app/_util/file.ts");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");





var FilesystemService = /** @class */ (function () {
    function FilesystemService() {
    }
    // set root
    FilesystemService.prototype.initializeStorage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._setupStorage()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FilesystemService.prototype._setupStorage = function () {
        var _self = this;
        var _window = window;
        return new Promise(function (resolve, reject) {
            if (_self.root) {
                resolve(true);
                return;
            }
            if (Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["cordovaEnabled"])()) {
                // cordova file plugin storage
                _window.resolveLocalFileSystemURL(Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getCordova"])().file.dataDirectory, function (filesystem) {
                    _self.root = filesystem;
                    _self.rootDir = filesystem; // no root!
                    _self.rootPath = Object(_util_file__WEBPACK_IMPORTED_MODULE_2__["convertToIonicUrl"])(filesystem.toURL());
                    resolve(_self.isStorageAvailable = true);
                }, function (error) {
                    reject(false);
                    alert('Filesystem error: ' + error);
                });
            }
            else {
                // chrome (browser storage)
                var _requestFileSystem = window['requestFileSystem'] || window['webkitRequestFileSystem'];
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
                }
                else {
                    resolve(false);
                    alert('No filesystem available, use chrome or do a cordova build (iOS/Android)');
                }
            }
        });
    };
    // DIRECTORY
    // loops through directories within pathName and creates missing directories, callback gets DirectoryEntry of final subDir
    FilesystemService.prototype.setupDirectory = function (pathName, within, callback, createMissing) {
        if (createMissing === void 0) { createMissing = true; }
        var _self = this;
        var _urlSegments = pathName.split('/');
        var _loop = function (directorySegments, wi, cb) {
            _self._getDirectory(directorySegments[0], wi, createMissing, function (directory) {
                directorySegments.shift();
                if (directorySegments.length > 0) {
                    _loop(directorySegments, directory, cb);
                }
                else {
                    cb(directory);
                }
            });
        };
        _loop(_urlSegments, within, callback);
    };
    // get an exisiting directory within another directory (or root), optional to create the dir if it doesn't exist
    FilesystemService.prototype._getDirectory = function (dirName, within, createMissing, callback) {
        var _self = this;
        within = (!within) ? this.rootDir : within;
        if (within === 'error' || !within) {
            callback(within);
            return;
        }
        within.getDirectory(dirName, { create: false, exclusive: true }, function (directory) {
            callback(directory);
        }, function (error) {
            if (error && createMissing) {
                _self._createDirectory(dirName, within, callback);
            }
            else {
                console.log('directory ' + dirName + ' does not exist.');
                callback('error');
            }
        });
    };
    // create a directory in a directory, if it already exists, it returns the existing directory
    FilesystemService.prototype._createDirectory = function (dirName, within, callback) {
        var _self = this;
        within = (!within) ? this.rootDir : within;
        within.getDirectory(dirName, { create: true, exclusive: true }, function (directory) {
            callback(directory);
        }, function (error) {
            if (error.code === 12) {
                _self._getDirectory(dirName, within, false, callback);
            }
        });
    };
    // save a file to file system, parse directories
    FilesystemService.prototype.saveFile = function (data, within, pathName, callback) {
        var _self = this;
        var pathSegments = pathName.split('/');
        var filename = pathSegments[pathSegments.length - 1];
        pathSegments.splice(-1, 1);
        var _directories = pathSegments.join('/');
        this.setupDirectory(_directories, within, function (directory) {
            _self._createFile(directory, filename, function (fileEntry) {
                _self._writeFile(fileEntry, data, callback);
            });
        });
    };
    // create an empty fileEntry
    FilesystemService.prototype._createFile = function (dirEntry, fileName, callback, override) {
        if (override === void 0) { override = true; }
        var _self = this;
        dirEntry = (!dirEntry) ? this.rootDir : dirEntry;
        if (dirEntry === 'error' || !dirEntry) {
            callback(dirEntry);
            return;
        }
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, { create: true, exclusive: !override }, function (fileEntry) {
            callback(fileEntry);
        }, function (error) {
            console.log('error creating file ' + error);
            _self.readFile(dirEntry, fileName, callback);
        });
    };
    // // write to a fileEntry
    FilesystemService.prototype._writeFile = function (file, data, callback) {
        if (data instanceof Blob === false) {
            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }
            data = new Blob([data], { type: 'application/json' });
        }
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
    };
    // TODO: abort write
    FilesystemService.prototype.abort = function () {
        console.warn('abort function (filesystem) is blank');
        // writer.abort();
    };
    // returns the file entry (directry can be string or dirEntry object)
    FilesystemService.prototype.readFile = function (directory, fileName, callback) {
        var _self = this;
        if (typeof directory === 'string') {
            this.setupDirectory(directory, null, function (result) {
                if (result !== 'error') {
                    _self._getFile(result, fileName, callback);
                }
                else {
                    callback(result);
                }
            }, false);
        }
    };
    // will return null if file cant be found
    FilesystemService.prototype._getFile = function (dirEntry, fileName, callback) {
        var _self = this;
        dirEntry = (!dirEntry) ? this.rootDir : dirEntry;
        if (dirEntry === 'error' || !dirEntry) {
            callback(dirEntry);
            return;
        }
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, { create: false }, function (fileEntry) {
            _self._readFileData(fileEntry, callback);
        }, function (error) {
            console.log('file ' + fileName + ' does not exist.');
            callback('error');
        });
    };
    // read the data from a fileEntry
    FilesystemService.prototype._readFileData = function (fileEntry, callback) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log("Successful file read", fileEntry);
                var _res = this.result;
                if (typeof _res === 'string') {
                    _res = JSON.parse(_res);
                }
                callback(_res);
            };
            reader.readAsText(file);
        }, function (error) {
            callback('error');
            alert('error reading file' + error);
        });
    };
    FilesystemService.prototype.unzip = function (filePath, parts) {
        if (parts === void 0) { parts = false; }
        var _self = this;
        var _unzipState = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({ state: 'initialize' });
        if (Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["hasZip"])()) {
            var _seperator = (parts) ? '_' : '.'; // multipart files are _0, _1, _2, else just remove the extension
            var _directoryArr = filePath.split(_seperator);
            _directoryArr.pop();
            var _directoryStr = _directoryArr.join(_seperator) + '/';
            var url = this._joinPaths([Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getCordova"])().file.dataDirectory, filePath]);
            var destination = this._joinPaths([Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getCordova"])().file.dataDirectory, _directoryStr]);
            console.log(url, destination);
            Object(_util_cordova__WEBPACK_IMPORTED_MODULE_3__["getZip"])().unzip(url, destination, function (x) {
                _unzipState.next({ state: 'progress', percentage: 100 });
                _self.deleteFile(filePath);
                _unzipState.next({ state: 'complete' });
            }, function (progressEvent) {
                _unzipState.next({ state: 'progress', percentage: (progressEvent.loaded / progressEvent.total) * 100 });
            });
        }
        else {
            alert('Chrome unzipping currently not implemented.');
            _unzipState.next({ state: 'error' });
        }
        return _unzipState;
    };
    FilesystemService.prototype._joinPaths = function (pathList) {
        var path = '';
        if (pathList.length > 0) {
            path += pathList[0].replace(/\/+$/, '') + '/';
            for (var i = 1; i < pathList.length; i++) {
                path += pathList[i].replace(/^\/+/, '').replace(/\/+$/, '') + '/';
            }
            path = path.slice(0, -1);
        }
        return path;
    };
    // // returns the data from file entry (used for stored json)
    // public readFileData(): any {
    //
    // }
    // delete a file or directory, accepts path
    FilesystemService.prototype.deleteFile = function (filePath) {
        var _pathSegments = filePath.split('/');
        var _filename = _pathSegments.pop();
        var _directory = _pathSegments.join('/') + '/';
        this.setupDirectory(_directory, null, function (dirEntry) {
            dirEntry.getFile(_filename, { create: false }, function (fileEntry) {
                fileEntry.remove(function (file) {
                    // File deleted successfully
                    console.log('file deleted');
                }, function (err) {
                    console.log(err); // Error while removing File
                });
            });
        }, false);
    };
    // delete directory and everything in it
    FilesystemService.prototype.deleteDirectory = function (directoryPath, callback) {
        this.setupDirectory(directoryPath, null, function (dirEntry) {
            if (dirEntry !== 'error') {
                /* poorly described cordova only? function, it's not clear if chrome still has this
                as the status of the filesysem of chrome is unclear. */
                dirEntry.removeRecursively(function (directory) {
                    callback(directory);
                }, function (error) {
                    // TODO: needs an error check, not sure what I'm getting here
                    alert('error deleting directory' + error);
                    callback(error);
                });
            }
            else {
                callback(dirEntry);
            }
        }, false);
    };
    FilesystemService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // TODO: needs better error handling? a retry dialog/function?
        // TODO: unzipping for chrome (desktop), just nice to have...
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FilesystemService);
    return FilesystemService;
}());



/***/ }),

/***/ "./src/app/service/loader.service.ts":
/*!*******************************************!*\
  !*** ./src/app/service/loader.service.ts ***!
  \*******************************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this._overlaySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.observe = this._overlaySubject.asObservable();
    }
    LoaderService.prototype.showOverlay = function () {
        this._overlaySubject.next({ action: 'show', type: 'self' });
    };
    LoaderService.prototype.hideOverlay = function () {
        this._overlaySubject.next({ action: 'hide', type: 'self' });
    };
    LoaderService.prototype.showSpinner = function () {
        this._overlaySubject.next({ action: 'show', type: 'spinner' });
    };
    LoaderService.prototype.showMessage = function (message) {
        this._overlaySubject.next({ action: 'show', type: 'message', data: message });
    };
    LoaderService.prototype.showButton = function (label, action) {
        this._overlaySubject.next({ action: 'show', type: 'button', data: { label: label, action: action } });
    };
    // spinner, button, message
    LoaderService.prototype.hideContent = function (type) {
        if (!type) {
            this.hideOverlay();
        }
        else {
            this._overlaySubject.next({ action: 'hide', type: type });
        }
    };
    LoaderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // to communicate with the overlay loader component, which lives outside of the router
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());



/***/ }),

/***/ "./src/app/service/location.service.ts":
/*!*********************************************!*\
  !*** ./src/app/service/location.service.ts ***!
  \*********************************************/
/*! exports provided: LocationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationService", function() { return LocationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");







var LocationService = /** @class */ (function () {
    /* track user location and status:
        location = gps data > converted to Poi
        holds a mile tree (centerpoints per mile, for nearest trail location)
        status = idle/fetching/tracking/stopping */
    function LocationService(_localStorage, _trailGenerator) {
        this._localStorage = _localStorage;
        this._trailGenerator = _trailGenerator;
        // behaviour subjects
        this._locationStatus = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('idle');
        this._location = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](undefined);
        this._centerUser = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        // Observable streams
        this.locationStatus = this._locationStatus.asObservable();
        this.location = this._location.asObservable();
        this.centerUser = this._centerUser.asObservable();
        this._toggleStatus = false;
        this._locationStatusLocal = '';
        this._updateStatusLabel('idle');
        if (Object(_util_cordova__WEBPACK_IMPORTED_MODULE_6__["cordovaEnabled"])()) {
            document.addEventListener("pause", this._onPause, false);
            document.addEventListener("resume", this._onResume, false);
        }
    }
    // enable / disable location tracking
    LocationService.prototype.toggleTracking = function (force) {
        if (force === void 0) { force = false; }
        var _simulate = (this._localStorage.retrieve('simulatedMile') !== -1);
        this._toggleStatus = (!force) ? !this._toggleStatus : force;
        if (this._toggleStatus) {
            this._updateStatusLabel('fetching');
            if (_simulate) {
                this._stopTracking(true);
                this._simulateLocation();
            }
            else {
                this._trackLocation();
            }
        }
        else {
            this._updateStatusLabel('stopping');
            this._stopTracking();
        }
    };
    // simulate location
    LocationService.prototype._simulateLocation = function () {
        this._parseLocation(this._localStorage.retrieve('simulatedMile'));
    };
    LocationService.prototype._trackLocation = function () {
        var _watchOptions = {
            enableHighAccuracy: true,
            maximumAge: 3000,
            requireAltitude: true
        };
        if (navigator.geolocation) {
            this._locationWatcher = navigator.geolocation.watchPosition(this._parseLocation.bind(this), this._showTrackingErrors.bind(this), _watchOptions);
        }
        else {
            this._showTrackingErrors(null);
        }
    };
    LocationService.prototype._stopTracking = function (simulate) {
        if (simulate === void 0) { simulate = false; }
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(this._locationWatcher);
            this._centerUser.next(0);
            if (!simulate) {
                this._location.next(undefined);
                this._localStorage.store('simulatedMile', -1);
                this._previousLocation = null;
                this._updateStatusLabel('idle');
            }
        }
    };
    LocationService.prototype._parseLocation = function (location) {
        if (typeof location === 'number') {
            var _waypoints = this._trailGenerator.getTrailData().miles[Math.floor(location)].waypoints;
            var _nearestPoint = _waypoints[1];
            var _mileInMeters = location * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].MILE;
            if (_mileInMeters >= _waypoints[_waypoints.length - 1].distanceTotal) {
                // this only applies to the last (incomplete) mile, if your total simulated distance is greater than the trail length, use last waypoint
                _nearestPoint = _waypoints[_waypoints.length - 1];
            }
            else {
                // find nearest 2 waypoints, find out which is closest
                for (var i = 0; i < _waypoints.length - 1; i++) {
                    if (_waypoints[i].distanceTotal <= _mileInMeters && _waypoints[i + 1].distanceTotal >= _mileInMeters) {
                        _nearestPoint = (Math.abs(_waypoints[i].distanceTotal - _mileInMeters) < Math.abs(_waypoints[i + 1].distanceTotal - _mileInMeters)) ? _waypoints[i] : _waypoints[i + 1];
                        break;
                    }
                }
            }
            location = {
                coords: {
                    latitude: _nearestPoint.latitude,
                    longitude: _nearestPoint.longitude,
                    altitude: _nearestPoint.elevation,
                },
                timestamp: new Date().getTime()
            };
            this._updateLocation(location, true);
        }
        else if (location) {
            // only execute if location changed (optimisation)
            if (!this._previousLocation ||
                this._previousLocation['coords']['latitude'] !== location['coords']['latitude'] &&
                    this._previousLocation['coords']['longitude'] !== location['coords']['longitude'] &&
                    this._previousLocation['coords']['altitude'] !== location['coords']['altitude']) {
                this._updateLocation(location);
            }
            this._previousLocation = location;
        }
    };
    LocationService.prototype._updateLocation = function (location, simulate) {
        if (simulate === void 0) { simulate = false; }
        this._location.next(location);
        this._updateStatusLabel('tracking');
    };
    LocationService.prototype._showTrackingErrors = function (error) {
        var _errorMessage;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                _errorMessage = 'User denied request.';
                break;
            case error.POSITION_UNAVAILABLE:
                _errorMessage = 'Location unavailable.';
                break;
            case error.TIMEOUT:
                _errorMessage = 'Location timeout.';
                break;
            case error.UNKNOWN_ERROR:
                _errorMessage = 'Unknown error.';
                break;
        }
        this._updateStatusLabel('error');
    };
    LocationService.prototype._updateStatusLabel = function (label) {
        // prevent duplicates
        if (label !== this._locationStatusLocal) {
            this._locationStatusLocal = label;
            this._locationStatus.next(this._locationStatusLocal);
        }
    };
    LocationService.prototype.onCenterUser = function () {
        if (this._locationStatus.value === 'tracking') {
            this._centerUser.next(new Date().getTime());
        }
    };
    // APPLICATION STATE (BACKGROUND/FOREGROUND)
    LocationService.prototype._onPause = function (event) {
        if (this._toggleStatus === true && !this._paused) {
            this._stopTracking();
            this._paused = true;
        }
    };
    LocationService.prototype._onResume = function (event) {
        if (this._toggleStatus === false && this._paused) {
            this.toggleTracking(true);
            this._paused = false;
        }
    };
    LocationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        /* tracks user location, has a simulated mile (location) option
        also pauses/resumes based on app state (pause/resume) to preserve battery */
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_4__["TrailGeneratorService"]])
    ], LocationService);
    return LocationService;
}());



/***/ }),

/***/ "./src/app/service/note.service.ts":
/*!*****************************************!*\
  !*** ./src/app/service/note.service.ts ***!
  \*****************************************/
/*! exports provided: NoteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteService", function() { return NoteService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _util_generic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_util/generic */ "./src/app/_util/generic.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _connection_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./connection.service */ "./src/app/service/connection.service.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");










var NoteService = /** @class */ (function () {
    function NoteService(_localStorage, _trailGenerator, _http, _connectionService) {
        this._localStorage = _localStorage;
        this._trailGenerator = _trailGenerator;
        this._http = _http;
        this._connectionService = _connectionService;
        this._previouslyOffline = false;
        this.noteSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]('initialize');
        this.noteUpdateObserver = this.noteSubject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["share"])());
        this._setupSubscriptions();
        this._loadFromStorage();
    }
    NoteService.prototype.ngOnDestroy = function () {
        if (this._notesSubscription) {
            this._notesSubscription.unsubscribe();
            this._notesSubscription = null;
        }
        if (this._connectionSubscription) {
            this._connectionSubscription.unsubscribe();
            this._connectionSubscription = null;
        }
        // just to be safe
        this.noteSubject = null;
        this.noteUpdateObserver = null;
    };
    NoteService.prototype._setupSubscriptions = function () {
        var _self = this;
        var _trail = this._trailGenerator.getTrailData();
        var _directionString = (_trail.direction === 1) ? 'sobo' : 'nobo';
        this._notesSubscription = this._localStorage.observe(_trail.abbr + '-' + _directionString + '_notes').subscribe(function (result) {
            _self.noteSubject.next('storage changed');
            _self._shareNotes();
        });
        this._connectionSubscription = this._connectionService.connectionObserver.subscribe(function (result) {
            if (result === true) {
                _self._shareNotes();
            }
        });
    };
    // notes are added 1 at a time, unless there are no notes (initial run)
    NoteService.prototype._parseNotes = function (notes) {
        if (!notes || notes.length < 1) {
            return;
        }
        var _lastAddedNote = notes[notes.length - 1];
        if (!this._notesLibrary) {
            this._notesLibrary = {};
            // sort all notes by belongsTo (mile)
            this._addNotesToLib(notes);
        }
        else {
            // only the last added
            this._addNotesToLib([_lastAddedNote]);
        }
    };
    NoteService.prototype._addNotesToLib = function (notes) {
        var _length = notes.length;
        for (var i = 0; i < _length; i++) {
            var _note = notes[i];
            var _typeLib = this._notesLibrary[_note.belongsToType];
            if (_typeLib) {
                if (_typeLib[_note.belongsTo]) {
                    this._notesLibrary[_note.belongsToType][_note.belongsTo].push(_note);
                }
                else {
                    this._notesLibrary[_note.belongsToType][_note.belongsTo] = [_note];
                }
            }
            else {
                this._notesLibrary[_note.belongsToType] = {};
                this._notesLibrary[_note.belongsToType][_note.belongsTo] = [_note];
            }
            // set the last added note
            if (i === _length - 1) {
                this._lastNote = _note;
                this.noteSubject.next('added');
            }
        }
    };
    // get notes based on a given type and id (of that type)
    NoteService.prototype.getNotes = function (type, id) {
        if (!this._notesLibrary) {
            return;
        }
        return this._notesLibrary[type][id];
    };
    // get the Poi that was last added to the library
    NoteService.prototype.getLastNote = function () {
        return this._lastNote;
    };
    // TODO: double loop, a fetch of new data might be faster with lots of notes?
    NoteService.prototype.deleteNote = function (noteId, type, id) {
        var _group = this._notesLibrary[type][id];
        var _length = _group.length;
        for (var i = 0; i < _length; i++) {
            var _note = _group[i];
            if (_note.id === noteId) {
                this._lastNote = Object(_util_generic__WEBPACK_IMPORTED_MODULE_6__["cloneData"])(_note);
                this._notesLibrary[type][id].splice(i, 1);
                break;
            }
        }
        _length = this._notes.length;
        for (var j = 0; j < _length; j++) {
            var _note = this._notes[j];
            if (_note.id === noteId) {
                this._notes.splice(j, 1);
                break;
            }
        }
        this._updateStorage();
        this.noteSubject.next('removed');
    };
    NoteService.prototype._updateStorage = function () {
        var _trail = this._trailGenerator.getTrailData();
        var _directionString = (_trail.direction === 1) ? 'sobo' : 'nobo';
        this._localStorage.store(_trail.abbr + '-' + _directionString + '_notes', JSON.stringify(this._notes));
    };
    NoteService.prototype._loadFromStorage = function () {
        var _trail = this._trailGenerator.getTrailData();
        var _directionString = (_trail.direction === 1) ? 'sobo' : 'nobo';
        var _notesString = this._localStorage.retrieve(_trail.abbr + '-' + _directionString + '_notes');
        if (_notesString === null || _notesString === undefined || _notesString === '') {
            return;
        }
        this._notes = JSON.parse(_notesString);
        this._parseNotes(this._notes);
    };
    NoteService.prototype.saveNote = function (note) {
        if (!this._notes) {
            this._notes = [];
        }
        this._notes.push(note);
        this._parseNotes([note]);
        if (note.share) {
            this._localStorage.store('shareNotes', true);
        }
        this._updateStorage();
    };
    // easier to sort by distance (poi list)
    NoteService.prototype.getFlatNotesArray = function () {
        return this._notes;
    };
    /* share notes (upload notes to server), runs when internet becomes available
    - TODO: currently used to share notes with developer, will eventually be shared to a personal online map */
    NoteService.prototype._shareNotes = function () {
        var _self = this;
        // check connection
        if (this._connectionService.state !== 'online') {
            this._previouslyOffline = true;
            return;
        }
        if (this._localStorage.retrieve('shareNotes') && this._notes) {
            var _shareableNotes = this._gatherShareableNotes();
            // upload
            if (_shareableNotes.length > 0) {
                var _trail = _self._trailGenerator.getTrailData();
                var _directionString = (_trail.direction === 1) ? 'sobo' : 'nobo';
                // params to send in post object
                var _params = new FormData();
                _params.append('trail', _trail.abbr);
                _params.append('direction', _directionString);
                _params.append('user', _self._localStorage.retrieve('userName'));
                _params.append('data', JSON.stringify(_shareableNotes));
                this._uploadObserver = this._http.post(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__["environment"].mailto, _params, { responseType: 'text' });
                this._uploadSubscription = this._uploadObserver.subscribe(function (result) {
                    if (result === 'success') {
                        // only show an alert if data didn't send before because user was online
                        if (_self._previouslyOffline) {
                            _self._previouslyOffline = false;
                            alert('Successfully shared backed-up note(s) with developer, thanks!');
                        }
                        _self._clearShareableNotes();
                    }
                    else {
                        alert('Error while sending note(s) to developer!');
                    }
                    _self._uploadSubscription.unsubscribe();
                    _self._uploadSubscription = null;
                }, function (error) {
                    // error handling
                    alert('Error while sending note(s) to developer!');
                });
            }
        }
    };
    NoteService.prototype._clearShareableNotes = function () {
        this._notes.forEach(function (note) {
            if (note.share) {
                note.share = false;
            }
        });
        // write to storage
        this._updateStorage();
        this._localStorage.clear('shareNotes');
    };
    NoteService.prototype._gatherShareableNotes = function () {
        var _shareableNotes = [];
        // run through all data and collect notes that need sharing (duplicates)
        this._notes.forEach(function (note) {
            if (note.share) {
                var _clone = Object(_util_generic__WEBPACK_IMPORTED_MODULE_6__["cloneData"])(note);
                _shareableNotes.push(_clone);
            }
        });
        return _shareableNotes;
    };
    NoteService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        /* there are 2 types of notes:
        - notes that belong to a mile (TODO: not implemented yet)
        - notes that belong to a poi
        
        structure of notes library object:
        
        notes.mile
                    1: [Poi, Poi]
                    13: [Poi, Poi, Poi]
                    87: [Poi]
        
        notes.poi
                    5: [Poi, Poi]
                    68: [Poi, Poi, Poi]
                    123: [Poi]
        */
        // keeps track of new notes that should be uploaded (shared with developer)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_3__["TrailGeneratorService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"],
            _connection_service__WEBPACK_IMPORTED_MODULE_8__["ConnectionService"]])
    ], NoteService);
    return NoteService;
}());



/***/ }),

/***/ "./src/app/service/orientation.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/orientation.service.ts ***!
  \************************************************/
/*! exports provided: OrientationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrientationService", function() { return OrientationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var OrientationService = /** @class */ (function () {
    function OrientationService() {
        this._orientation = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.orientationObserver = this._orientation.asObservable();
    }
    OrientationService.prototype.startTracking = function () {
        // if (navigator['compass']) {
        //   this._orientationListener = navigator['compass'].watchHeading(this._handleOrientation.bind(this), function (e) {
        //     console.log('ERROR', e);
        //   });
        // }
    };
    OrientationService.prototype.stopTracking = function () {
        // if (navigator['compass']) {
        //   navigator['compass'].clearWatch(this._orientationListener);
        //   this._orientation.next(null);
        // }
    };
    OrientationService.prototype._handleOrientation = function (event) {
        this._orientation.next(event.trueHeading);
    };
    OrientationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        /* Orientation being compass orientation, not device, web standard doesn't work on android, cordova plugin does */
        // TODO: research a better compass direction solution, as none seem to be compatible with the various devices (mainly android issues)
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OrientationService);
    return OrientationService;
}());



/***/ }),

/***/ "./src/app/service/rate.service.ts":
/*!*****************************************!*\
  !*** ./src/app/service/rate.service.ts ***!
  \*****************************************/
/*! exports provided: RateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateService", function() { return RateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _type_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/rating */ "./src/app/type/rating.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");








var RateService = /** @class */ (function () {
    function RateService(_localStorage, _trailGenerator, _http) {
        this._localStorage = _localStorage;
        this._trailGenerator = _trailGenerator;
        this._http = _http;
        this._lastUpdated = 0; // TODO: needs to be stored/fetched
        this._hasInternet = true;
    }
    // LIFECYCLE
    RateService.prototype.ngOnDestroy = function () {
        this._activeTrailSubscription.unsubscribe();
        this._activeTrailSubscription = null;
    };
    // requires active trail meta data (runs after loading/parsing trail
    // - 1. upload all data that needs uploading (offline mode etc.)
    // - 2. download all new data since last update (TODO: this needs to be limited to the last 10 scores per belongsTo)
    RateService.prototype.setup = function () {
        var _self = this;
        this._activeTrailAbbr = this._trailGenerator.getTrailData().abbr;
        this._lastUpdated = this._localStorage.retrieve(this._activeTrailAbbr + '_ratings' + '-lastUpdated') || 0;
        this._lastUpdated -= 1000000;
        var runCount = 0;
        var _scoreUpdateObservables = this.syncRatingsForTrail();
        var _scoreUpdateLength = 1;
        if (Array.isArray(_scoreUpdateObservables)) {
            _scoreUpdateLength = _scoreUpdateObservables['length'];
        }
        // run in sequence
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["concat"])(_scoreUpdateObservables, this._getRatingsOnline()).subscribe(function (result) {
            if (runCount === _scoreUpdateLength) {
                _self._lastUpdated = new Date().getTime();
                _self._localStorage.store(_self._activeTrailAbbr + '_ratings-lastUpdated', _self._lastUpdated);
            }
            else {
                runCount++;
            }
        });
    };
    // gets/sets all ratings, since it's a (mostly) offline app, deals with both online/offline files and syncs everything
    RateService.prototype.syncRatingsForTrail = function () {
        // get locally stored data
        this._localRatings = this._localStorage.retrieve(this._activeTrailAbbr + '_ratings') || [];
        if (this._hasInternet && this._localRatings.length !== -1) {
            var _localUpdates = this._checkForUnsynced();
            if (_localUpdates) {
                var _postArray = [];
                var _url = 'https://just-hike.firebaseio.com/rating/' + this._activeTrailAbbr + '.json';
                var _length = _localUpdates.length;
                for (var i = 0; i < _length; i++) {
                    _postArray.push(this._http.post(_url, { test: 'test123' }));
                }
                return _postArray;
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
            }
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }
    };
    // whenever a user rates something
    RateService.prototype.saveRatings = function (ratings) {
        if (!Array.isArray(ratings)) {
            ratings = [ratings];
        }
        var _length = ratings.length;
        for (var i = 0; i < _length; i++) {
            var _rating = ratings[i];
            var _aspects = _rating.getAspects();
            var _aspectLength = _aspects.length;
            for (var j = 0; j < _aspectLength; j++) {
                // incorportae a UUID
                var _UUID = Object(_util_cordova__WEBPACK_IMPORTED_MODULE_7__["getUUID"])();
                _aspects[j].userId = _UUID;
                this._saveScoreOnline(_aspects[j]);
            }
        }
    };
    // gets a rating from local storage
    // there's no need to make a separate online call here
    // as the app mostly runs in offline mode and syncRatingsForTrail() is called once the app goes online
    // this way the ratings stay reasonably up to date.
    RateService.prototype.getRatingById = function (type, location, create) {
        if (create === void 0) { create = true; }
        var _trailAbbr = this._trailGenerator.getTrailData().abbr;
        var _id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);
        var _rating;
        var _length = this._localRatings.length;
        for (var i = 0; i < _length; i++) {
            if (this._localRatings[i].id === _id) {
                _rating = this._localRatings[i];
                break;
            }
        }
        if (!_rating && create) {
            _rating = new _type_rating__WEBPACK_IMPORTED_MODULE_2__["Rating"](type, location);
        }
        return _rating;
    };
    // get all updated/new ratings online for trail
    // this will fetch 'Score' objects that have a 'belongTo' field with a waypointId
    RateService.prototype._getRatingsOnline = function () {
        var _since = this._lastUpdated;
        var _trailAbbr = this._activeTrailAbbr;
        var _url = 'https://just-hike.firebaseio.com/score/' + _trailAbbr + '.json' +
            '?orderBy="timestamp"' +
            '&startAt=' + _since + '';
        return this._http.get(_url);
    };
    // markForUpdate means the data still has to be pushed online (but can't be as there is currently no internet)
    RateService.prototype._saveRatingsLocally = function (ratings, markForUpdate) {
        if (markForUpdate === void 0) { markForUpdate = false; }
        if (ratings instanceof _type_rating__WEBPACK_IMPORTED_MODULE_2__["Rating"]) {
            ratings = [ratings];
        }
        var _length = ratings.length;
        for (var i = 0; i < _length; i++) {
            var _rating = ratings[i];
            if (markForUpdate) {
                _rating.unsynced = true;
            }
            this._setRatingLocally(_rating);
            // progress
        }
        // write everything to local storage
        this._writeToLocalStorage();
        // done
        return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"]();
    };
    // check if there are local updates that need to be synced online
    RateService.prototype._checkForUnsynced = function () {
        if (!this._localRatings || this._localRatings.length === -1) {
            return;
        }
        var _ratings = [];
        var _length = this._localRatings.length;
        for (var i = 0; i < _length; i++) {
            if (this._localRatings[i].unsynced) {
                _ratings.push(this._localRatings[i]);
            }
        }
        return (_ratings.length > 0) ? _ratings : undefined;
    };
    // sets or updates local rating
    RateService.prototype._setRatingLocally = function (rating) {
        var _ratingIndex = -1;
        // check if rating already exists
        var _length = this._localRatings.length;
        for (var i = 0; i < _length; i++) {
            if (this._localRatings[i].id === rating.id) {
                _ratingIndex = i;
                break;
            }
        }
        // change rating in local ratings
        if (_ratingIndex !== -1) {
            this._localRatings[_ratingIndex] = rating;
        }
        else {
            this._localRatings.push(rating);
        }
    };
    RateService.prototype._saveScoreOnline = function (score) {
        console.log('WRITING TO ONLINE DB!');
        var _trailAbbr = this._trailGenerator.getTrailData().abbr;
        var _url = 'https://just-hike.firebaseio.com/score/' + _trailAbbr + '.json';
        this._http.post(_url, score).subscribe(function (test) {
            console.log(test);
        });
    };
    RateService.prototype._writeToLocalStorage = function () {
        this._localStorage.store(this._activeTrailAbbr + '_ratings', this._localRatings);
    };
    RateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // Ratings for ratable poi types
        // ratings are stored on local storage and online
        // TODO: check the actual filesize of the data stored locally, if large, possibly save to filesystem instead
        // TODO: very much WIP!
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_5__["TrailGeneratorService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]])
    ], RateService);
    return RateService;
}());



/***/ }),

/***/ "./src/app/service/screen-mode.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/screen-mode.service.ts ***!
  \************************************************/
/*! exports provided: ScreenModeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScreenModeService", function() { return ScreenModeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var ScreenModeService = /** @class */ (function () {
    function ScreenModeService(_localStorage) {
        this._localStorage = _localStorage;
        var _self = this;
        // listen for greyscale mode
        _self._screenModeSubscription = _self._localStorage.observe('screenMode').subscribe(function (result) {
            _self.screenModeSubject.next(result);
            _self._toggleStyleSheet(result);
        });
        var _initial = this._localStorage.retrieve('screenMode');
        _self.screenModeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](_initial);
        _self._toggleStyleSheet(_initial);
        this.screenModeChangeObserver = this.screenModeSubject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])());
    }
    ScreenModeService.prototype._toggleStyleSheet = function (name) {
        var _self = this;
        var _names = (name !== 'nightHike') ? [name] : ['highContrast', name];
        _names.forEach(function (n) {
            _self._injectStylesheet(n);
        });
        if (this._currentScreenMode) {
            this._currentScreenMode.forEach(function (n) {
                _self._removeInjectedStylesheet(n);
            });
        }
        this._currentScreenMode = _names;
    };
    // inject a stylesheet into the head of the
    ScreenModeService.prototype._injectStylesheet = function (name) {
        if (name === 'default' || !name) {
            return;
        }
        var _head = document.head;
        var _link = document.createElement('link');
        _link.type = 'text/css';
        _link.rel = 'stylesheet';
        _link.href = 'assets/css/' + name + '.css';
        _link.setAttribute('data-name', name);
        _head.appendChild(_link);
    };
    ScreenModeService.prototype._removeInjectedStylesheet = function (name) {
        if (name === 'default') {
            return;
        }
        var _link = document.querySelectorAll('[data-name="' + name + '"]')[0];
        if (_link) {
            _link.parentNode.removeChild(_link);
        }
    };
    ScreenModeService.prototype.ngOnDestroy = function () {
        this._screenModeSubscription.unsubscribe();
        this._screenModeSubscription = null;
    };
    ScreenModeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // class that injects stylesheets based on (user) screen settings
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], ScreenModeService);
    return ScreenModeService;
}());



/***/ }),

/***/ "./src/app/service/sequential-resolver.service.ts":
/*!********************************************************!*\
  !*** ./src/app/service/sequential-resolver.service.ts ***!
  \********************************************************/
/*! exports provided: SequentialResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SequentialResolverService", function() { return SequentialResolverService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _version_resolver_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version-resolver.service */ "./src/app/service/version-resolver.service.ts");
/* harmony import */ var _trail_resolver_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trail-resolver.service */ "./src/app/service/trail-resolver.service.ts");
/* harmony import */ var _filesystem_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");









var SequentialResolverService = /** @class */ (function () {
    function SequentialResolverService(_versionResolver, _trailResolver, _fileSystemService, _localStorage) {
        this._versionResolver = _versionResolver;
        this._trailResolver = _trailResolver;
        this._fileSystemService = _fileSystemService;
        this._localStorage = _localStorage;
    }
    // first setup the filesystem
    SequentialResolverService.prototype.resolve = function (route, state) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _self;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                _self = this;
                this._route = route;
                this._state = state;
                this.firstRun();
                // cordova enabled or not
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            document.addEventListener('deviceready', function (event) {
                                resolve(_self._sequencer(event));
                            });
                        })];
                }
                else {
                    return [2 /*return*/, this._sequencer()];
                }
                return [2 /*return*/];
            });
        });
    };
    // set default user settings (unless they already exist)
    // good place to force user settings during development/debugging
    SequentialResolverService.prototype.firstRun = function () {
        var _self = this;
        // always clear simulatedMile
        this._localStorage.store('simulatedMile', -1);
        var _firstRun = this._localStorage.retrieve('firstRun');
        if (_firstRun !== false) {
            this._localStorage.store('firstRun', true);
            // by default show all major pois
            var _majorPoiTypes = Object(_util_poi__WEBPACK_IMPORTED_MODULE_7__["getMajorPoiTypes"])();
            // dynamic subscriptions based on PoiTypes that are set as being major (important)
            _majorPoiTypes.forEach(function (type) {
                var _camelName = 'show' + type.charAt(0).toUpperCase() + type.slice(1);
                _self._localStorage.store(_camelName, true);
            });
            // set default user settings
            for (var key in _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].DEFAULT_USER_SETTINGS) {
                var _value = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_5__["environment"].DEFAULT_USER_SETTINGS[key];
                if (this._localStorage.retrieve(key) === null) {
                    this._localStorage.store(key, _value);
                }
            }
        }
    };
    // app needs version data before it can start resolving trail data, so we await, before returning a promise to the router
    // sets cordova helper functions
    SequentialResolverService.prototype._sequencer = function (event) {
        if (event) {
            // console.log('device');
            // setup cordova helpers
            if (cordova && !Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["getCordova"])()) {
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setCordova"])(cordova);
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setDevice"])(device);
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setScreen"])(screen);
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setConnection"])(Connection);
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setZip"])(zip);
                Object(_util_cordova__WEBPACK_IMPORTED_MODULE_8__["setDialogs"])(navigator['notification']);
            }
        }
        else {
            // console.log('browser');
        }
        var _self = this;
        return this._fileSystemService.initializeStorage().then(function (result) {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _self._versionResolver.resolve().toPromise()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, _self._trailResolver.resolve(_self._route, _self._state).toPromise()];
                    }
                });
            });
        });
    };
    SequentialResolverService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_version_resolver_service__WEBPACK_IMPORTED_MODULE_2__["VersionResolverService"],
            _trail_resolver_service__WEBPACK_IMPORTED_MODULE_3__["TrailResolverService"],
            _filesystem_service__WEBPACK_IMPORTED_MODULE_4__["FilesystemService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_6__["LocalStorageService"]])
    ], SequentialResolverService);
    return SequentialResolverService;
}());



/***/ }),

/***/ "./src/app/service/snow-generator.service.ts":
/*!***************************************************!*\
  !*** ./src/app/service/snow-generator.service.ts ***!
  \***************************************************/
/*! exports provided: SnowGeneratorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnowGeneratorService", function() { return SnowGeneratorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SnowGeneratorService = /** @class */ (function () {
    function SnowGeneratorService() {
    }
    SnowGeneratorService.prototype.setSnowData = function (data) {
        this._snowData = data;
    };
    SnowGeneratorService.prototype.getSnowForMile = function (mileId) {
        if (!this._snowData) {
            return;
        }
        if (typeof mileId === 'number') {
            mileId = [mileId];
        }
        var _partialData = [];
        var _self = this;
        mileId.forEach(function (id) {
            _partialData.push(_self._snowData.snowMiles[id]);
        });
        return (_partialData.length > 0) ? _partialData : undefined;
    };
    // get the snow data version for the current trail
    SnowGeneratorService.prototype.getSnowVersion = function () {
        return this._snowData.version;
    };
    SnowGeneratorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SnowGeneratorService);
    return SnowGeneratorService;
}());



/***/ }),

/***/ "./src/app/service/trail-generator.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/trail-generator.service.ts ***!
  \****************************************************/
/*! exports provided: TrailGeneratorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailGeneratorService", function() { return TrailGeneratorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! geolib */ "./node_modules/geolib/dist/geolib.js");
/* harmony import */ var geolib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(geolib__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var _util_generic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_util/generic */ "./src/app/_util/generic.ts");
/* harmony import */ var _util_geolib_distance__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_util/geolib/distance */ "./src/app/_util/geolib/distance.ts");
/* harmony import */ var _util_leaflet_converter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_util/leaflet/converter */ "./src/app/_util/leaflet/converter.ts");
/* harmony import */ var _util_trail__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_util/trail */ "./src/app/_util/trail.ts");










var TrailGeneratorService = /** @class */ (function () {
    function TrailGeneratorService(_loaderService) {
        this._loaderService = _loaderService;
    }
    TrailGeneratorService.prototype.setTrailData = function (data) {
        this._trailData = data;
    };
    TrailGeneratorService.prototype.getTrailData = function () {
        return this._trailData;
    };
    TrailGeneratorService.prototype.getTrailVersion = function () {
        return this._trailData.version;
    };
    TrailGeneratorService.prototype.getPoiById = function (id) {
        return this._trailData.pois[id];
    };
    TrailGeneratorService.prototype.calcDistanceFlat = function (p1, p2) {
        return geolib__WEBPACK_IMPORTED_MODULE_2__["getDistance"]({ latitude: p1.latitude, longitude: p1.longitude }, { latitude: p2.latitude, longitude: p2.longitude }, 0, 4);
    };
    TrailGeneratorService.prototype.getPoisByIds = function (ids) {
        var _self = this;
        var _result = [];
        ids.forEach(function (id) {
            _result.push(_self.getPoiById(id));
        });
        return _result;
    };
    // called to generate new trail data files (json), only used by admin, not for users)
    // TODO: move this to a webworker, not a priority as it's rarely used (trail data won't update often)
    TrailGeneratorService.prototype.generateMiles = function (trail, waypoints, pois, direction, towns) {
        this._trailData = Object(_util_generic__WEBPACK_IMPORTED_MODULE_6__["cloneData"])(trail);
        this._trailData.version = trail.trailVersion;
        // remove unneeded trail meta
        delete this._trailData['trailVersion'];
        delete this._trailData['tilesVersion'];
        delete this._trailData['snowVersion'];
        delete this._trailData['dataPath'];
        delete this._trailData['dataPath'];
        delete this._trailData['waypointsPerMile'];
        this._trailData.direction = direction;
        // // sobo reversal
        // if (direction === 1) {
        //   waypoints.reverse();
        //   pois.reverse();
        // }
        this._trailData.pois = pois;
        // 1. optimise waypoints
        // const _optimisedWaypoints: Array<Waypoint> = this.simplify(waypoints, this._tolerance);
        this.flatTrailData = Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_8__["pointArrayTypeConversion"])(waypoints, 'waypoint', 'waypoint');
        this._loaderService.showMessage('optimised waypoints');
        // 2. calculate trail properties
        var flatPoints = [];
        // remove elevation, causes errors
        for (var i = 0; i < this.flatTrailData.length; i++) {
            flatPoints.push({ latitude: this.flatTrailData[i].latitude, longitude: this.flatTrailData[i].longitude });
        }
        this._trailData.calcLength = geolib__WEBPACK_IMPORTED_MODULE_2__["getPathLength"](flatPoints) / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE;
        this._trailData.scale = (this._trailData.length / this._trailData.calcLength);
        this._trailData.elevationRange = Object(_util_trail__WEBPACK_IMPORTED_MODULE_9__["calculateOHLC"])(this.flatTrailData, { start: 0, end: waypoints.length - 1 });
        this._loaderService.showMessage('calculated trail properties');
        // 3. split waypoints into miles
        this._trailData.miles = this._createMiles(this.flatTrailData);
        this._loaderService.showMessage('created miles');
        // 4a. generate waypoint tree for easy lookups
        var flatMileCoordinates = this._trailData.miles.map(function (elem) {
            return elem.centerpoint;
        });
        // create a tree structure to quickly find nearest mile (for Geolocating)
        this.createMileTree(flatMileCoordinates);
        this._loaderService.showMessage('created mile tree');
        // 4b. link pois to trail waypoints
        this._trailData.sortedPoiIds = {};
        if (pois) {
            this._linkPoisToMiles(pois, this._trailData.miles);
            this._loaderService.showMessage('linked pois to miles');
        }
        else {
            this._loaderService.showMessage('no pois');
        }
        // 5. Towns
        this._trailData.towns = this._calculateTownsAnchorPoints(towns);
        return this._trailData;
    };
    // create overlapping miles (first/last waypoint overlap, insert 2 new points at 0 & 100%
    // input:     x *--------------------------------------* x             (flat array with lon/lat/elevation points
    // output:    x                                                        (arr)
    //              */------/*                                                  (mile)
    //                    */------/*                                            (mile)
    //                          */------/*                                      (mile)
    //                                */------/*                                (mile)
    //                                      */------/*                          (mile)
    //                                            */------/*                    (mile)
    //                                                       x             (/arr)
    TrailGeneratorService.prototype._createMiles = function (waypoints) {
        this._loaderService.showMessage('create miles');
        var _miles = [];
        var _prevPoint;
        var _prevOffset = 0;
        // distances
        var _distance = 0;
        var _bridgedDistance = 0;
        var _totalDistance = 0;
        // elevation gain
        var _totalGain = 0;
        var _totalLoss = 0;
        // mile waypoints
        var _mileWaypoints = [];
        var _poisWaypoints = []; // for ohlc
        var _wayPointsLength = waypoints.length; // faster.
        for (var i = 0; i < _wayPointsLength; i++) {
            var _waypoint = waypoints[i];
            // elevation
            if (!_waypoint.elevation) {
                _waypoint.elevation = 0;
            }
            _waypoint.elevation = _waypoint.elevation / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].FOOT;
            var _elevationChange = 0;
            // calucalte distance between points
            if (_prevPoint) {
                _distance = _waypoint.distanceTotal - _prevPoint.distanceTotal;
                _totalDistance += _distance;
                _bridgedDistance += _distance;
                // calculate elevation gain/loss
                _elevationChange = _waypoint.elevation - _prevPoint.elevation;
                if (_elevationChange > 0) {
                    _totalGain += _elevationChange;
                }
                else {
                    _totalLoss += Math.abs(_elevationChange);
                }
            }
            _waypoint.distance = _totalDistance - (_miles.length * _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE); // the mile distance
            _mileWaypoints.push(_waypoint);
            // if a distance of 1 mile+ has been bridged, or end of waypoints reached
            if (_bridgedDistance > _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE || waypoints.length - 1 === i) {
                var _combinedWaypoints = (_poisWaypoints.length > 0) ? _mileWaypoints.concat(_poisWaypoints) : _mileWaypoints;
                var _combinedOhlc = Object(_util_trail__WEBPACK_IMPORTED_MODULE_9__["calculateOHLC"])(_combinedWaypoints, { start: 0, end: _combinedWaypoints.length });
                // set data
                _miles.push({
                    id: _miles.length + 1,
                    elevationRange: _combinedOhlc,
                    waypoints: Object(_util_generic__WEBPACK_IMPORTED_MODULE_6__["cloneData"])(_mileWaypoints),
                    elevationGain: Math.round(_totalGain),
                    elevationLoss: Math.round(_totalLoss),
                    centerpoint: Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_8__["waypointToWaypoint"])(geolib__WEBPACK_IMPORTED_MODULE_2__["getCenter"](_mileWaypoints)),
                    isCurrent: false,
                    hasMajorPoi: false,
                    hasMinorPoi: false,
                    poiTypes: {}
                });
                // clear data
                _bridgedDistance -= _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE;
                _totalGain = _totalLoss = 0;
                _mileWaypoints.splice(0, _mileWaypoints.length - 2); // keep last 2
                _poisWaypoints = [];
                // _hasEscape = _hasCamp = _hasOther = false;
                // adjust offset for the last 2 (which are now the first 2)
                for (var _i = 0, _mileWaypoints_1 = _mileWaypoints; _i < _mileWaypoints_1.length; _i++) {
                    var wp = _mileWaypoints_1[_i];
                    wp.distance -= _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].MILE;
                }
            }
            // set the previous point for next distance calc.
            _prevPoint = _waypoint;
            _prevOffset = _distance;
        }
        return _miles;
    };
    /* create data tree, a sorting mechanism to quickly figure out where the user is in relation to the trail,
    and what the closest waypoint it. TODO: research optimal algo, someone smart probably made something for this. */
    TrailGeneratorService.prototype.createMileTree = function (waypoints) {
        this._mileCenterpointTree = this._createWaypointTree(waypoints);
    };
    /* create data tree, a sorting mechanism to quickly figure out where a waypoint is in relationship to a tree of waypoints.
    TODO: research optimal algo, someone smart probably made something for this. */
    TrailGeneratorService.prototype._createWaypointTree = function (startData, returnArray) {
        var resultArray = [];
        var _length = startData.length;
        for (var i = 0; i < _length; i += 2) {
            var _data = void 0;
            if (!startData[i + 1]) {
                _data = startData[i];
            }
            else {
                _data = geolib__WEBPACK_IMPORTED_MODULE_2__["getCenter"]([startData[i], startData[i + 1]]);
            }
            resultArray.push(_data);
        }
        if (returnArray) {
            returnArray.unshift(resultArray);
        }
        else {
            returnArray = [resultArray, startData];
        }
        if (resultArray.length > 2) {
            return this._createWaypointTree(resultArray, returnArray);
        }
        else {
            return returnArray;
        }
    };
    // this should loop
    // TODO: extend geolib.orderByDistance() to include a range within an array, that way I wont have to lookup indexOf(). optimisation!
    TrailGeneratorService.prototype._findNearestWaypointInTree = function (location, waypointTree, branch, index) {
        branch = (branch) ? branch : 0;
        index = (index) ? index : 0;
        var _multiplier = branch;
        var _waypointBranch = waypointTree[branch];
        var _startIndex = ((index * 2) - _multiplier > 0) ? (index * 2) - _multiplier : 0;
        var _endIndex = ((index * 2) + _multiplier < waypointTree[branch].length - 1 && (index * 2) + _multiplier > 1) ? (index * 2) + _multiplier : waypointTree[branch].length - 1;
        var _waypointSelection = _waypointBranch.slice(_startIndex, _endIndex + 1);
        var _orderedWaypoints = geolib__WEBPACK_IMPORTED_MODULE_2__["orderByDistance"](location, _waypointSelection);
        if (branch !== waypointTree.length - 1 && _orderedWaypoints.length > 1) {
            // loop
            branch++;
            return this._findNearestWaypointInTree(location, waypointTree, branch, _startIndex + _waypointSelection.indexOf(_waypointSelection[_orderedWaypoints[0].key]));
        }
        else {
            // get the 3 nearest
            _orderedWaypoints = _orderedWaypoints.slice(0, 3);
            // fix indexes
            _orderedWaypoints.forEach(function (d) {
                d.key = _startIndex + _waypointSelection.indexOf(_waypointSelection[d.key]);
            });
            return _orderedWaypoints;
        }
    };
    /* parses nearest 3 miles, sorts the reulting top 2 waypoints for each mile by distance
    returns 1 of 2 nearest points (in nearest mile) */
    TrailGeneratorService.prototype.findNearestPointInMileTree = function (location, count) {
        if (count === void 0) { count = 1; }
        var _nearestMiles = this._findNearestWaypointInTree(location, this._mileCenterpointTree);
        var _nearestPoints = [];
        var _nearestMileNearestPoints = [];
        var _mLength = _nearestMiles.length;
        for (var i = 0; i < _mLength; i++) {
            var _mile = this._trailData.miles[_nearestMiles[i].key];
            var _nearestWaypoints = this.findNearestWaypointInMile(location, _mile);
            // limit to 2 for faster sorting (as we only really need 2
            var _selection = _nearestWaypoints.slice(0, 2);
            for (var j = 0; j < _selection.length; j++) {
                _selection[j].belongsTo = _nearestMiles[i].key;
            }
            _nearestPoints = _nearestPoints.concat(_selection);
        }
        _nearestPoints = Object(_util_generic__WEBPACK_IMPORTED_MODULE_6__["sortByKey"])(_nearestPoints, 'distance');
        _nearestPoints.filter(function (point) {
            return point.belongsTo === _nearestPoints[0].belongsTo;
        }).map(function (point) {
            _nearestMileNearestPoints.push(point);
        });
        return _nearestMileNearestPoints.slice(0, count + 1);
    };
    // Get the nearest point (this simply sorts a miles waypoints on distance and returns an array.
    // Not very efficient for larger data sets.
    TrailGeneratorService.prototype.findNearestWaypointInMile = function (waypoint, nearestMile) {
        return geolib__WEBPACK_IMPORTED_MODULE_2__["orderByDistance"]({ latitude: waypoint.latitude, longitude: waypoint.longitude }, nearestMile.waypoints);
    };
    // links points of interest to miles, this is a slow loop
    TrailGeneratorService.prototype._linkPoisToMiles = function (pois, miles) {
        var _self = this;
        this._loaderService.showMessage('linking pois to miles');
        var _poisLength = pois.length;
        for (var p = 0; p < _poisLength; p++) {
            var _poi = pois[p];
            // fix string points
            _poi.waypoint = Object(_util_leaflet_converter__WEBPACK_IMPORTED_MODULE_8__["waypointToWaypoint"])(_poi.waypoint);
            _poi.id = p; // to prevent mismatching ids in raw data
            _self._loaderService.showMessage('linking pois to miles:' + _poi.id);
            console.log('linking pois to miles:' + _poi.id + ' of ' + (_poisLength - 1));
            _poi.waypoint.elevation = _poi.waypoint.elevation / _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].FOOT;
            // get nearest point from 3 miles to fix potentially odd trail shape (loops and traverses)
            var _nearestMileWaypoints = _self.findNearestPointInMileTree({ latitude: _poi.waypoint.latitude, longitude: _poi.waypoint.longitude }, 2);
            var _nearestMile = this._trailData.miles[_nearestMileWaypoints[0].belongsTo];
            var _anchorData = _self._anchorDistanceCalculation(_poi.waypoint, _nearestMile, _nearestMileWaypoints);
            _poi.anchorPoint = _anchorData.anchorPoint;
            _poi.belongsTo = _nearestMile.id;
            // setup poi reference in waypoint
            if (!_anchorData.nearestWaypoint.nearestToPois) {
                _anchorData.nearestWaypoint.nearestToPois = [];
            }
            _anchorData.nearestWaypoint.nearestToPois.push(_poi.id);
            // the distance of poi from trail
            _poi.waypoint.distance = _nearestMileWaypoints[0].distance;
            // add poi to mile
            if (!_nearestMile.pois) {
                _nearestMile.pois = [];
            }
            _nearestMile.pois.push(_poi.id);
            // set poi types for current mile, so it's clear what kind of poi a mile has in it
            // differentiates between major and minor poi (major are the ones possibly shown on elevation profile
            // sets a flag for each poi type in 'poiTypes' property
            var _curPoiTypes = String(_poi.type).split(', ');
            var _poiTypesLength = _curPoiTypes.length;
            for (var t = 0; t < _poiTypesLength; t++) {
                var _type = _curPoiTypes[t];
                // create arrays for each type
                if (!_self._trailData.sortedPoiIds.hasOwnProperty(_type)) {
                    _self._trailData.sortedPoiIds[_type] = [];
                }
                _self._trailData.sortedPoiIds[_type].push(_poi.id);
                _nearestMile.poiTypes[_type + ''] = true;
                // identify major/minor poi per mile
                if (Object(_util_poi__WEBPACK_IMPORTED_MODULE_5__["getPoiTypeByType"])(_type) && Object(_util_poi__WEBPACK_IMPORTED_MODULE_5__["getPoiTypeByType"])(_type).isMajor) {
                    _nearestMile.hasMajorPoi = true;
                }
                else {
                    _nearestMile.hasMinorPoi = true;
                }
            }
            if (_nearestMile.hasMajorPoi) {
                // refactor ohlc if needed
                if (_nearestMile.elevationRange.high < _poi.waypoint.elevation) {
                    _nearestMile.elevationRange.high = _poi.waypoint.elevation;
                }
                else if (_nearestMile.elevationRange.low > _poi.waypoint.elevation) {
                    _nearestMile.elevationRange.low = _poi.waypoint.elevation;
                }
            }
        }
    };
    TrailGeneratorService.prototype._calculateTownsAnchorPoints = function (towns) {
        if (!towns) {
            return;
        }
        var _length = towns.length;
        for (var t = 0; t < _length; t++) {
            var _town = towns[t];
            // only calculate the towns anchorpoint if it doesn't have any
            if (!_town.anchorPoint) {
                var _nearestMileWaypoints = this.findNearestPointInMileTree(_town.centerPoint, 2);
                var _nearestMile = this._trailData.miles[_nearestMileWaypoints[0].belongsTo];
                var _anchorData = this._anchorDistanceCalculation(_town.centerPoint, _nearestMile, _nearestMileWaypoints);
                _town.anchorPoint = _anchorData.anchorPoint;
            }
        }
        return towns;
    };
    // distance calculation
    TrailGeneratorService.prototype._anchorDistanceCalculation = function (location, nearestMile, nearestWaypoints) {
        // console.log(location, nearestMile, nearestWaypoints);
        var _nearestWaypoint = nearestMile.waypoints[nearestWaypoints[0].key];
        var _2ndNearestWaypoint = nearestMile.waypoints[nearestWaypoints[1].key];
        // create an anchor waypoint (an on trail point nearest to the poi (simple triangulation)
        var _diffDistPercentage = (nearestWaypoints[0].distance / nearestWaypoints[1].distance);
        var _lat = _nearestWaypoint.latitude + (((_2ndNearestWaypoint.latitude - _nearestWaypoint.latitude) * _diffDistPercentage) || 0);
        var _lon = _nearestWaypoint.longitude + (((_2ndNearestWaypoint.longitude - _nearestWaypoint.longitude) * _diffDistPercentage) || 0);
        var _ele = _nearestWaypoint.elevation + (((_2ndNearestWaypoint.elevation - _nearestWaypoint.elevation) * _diffDistPercentage) || 0);
        var _dist = _nearestWaypoint.distance + (((_2ndNearestWaypoint.distance - _nearestWaypoint.distance) * _diffDistPercentage) || 0);
        var _distT = _nearestWaypoint.distanceTotal + (((_2ndNearestWaypoint.distanceTotal - _nearestWaypoint.distanceTotal) * _diffDistPercentage) || 0);
        // console.log({latitude: _lat, longitude: _lon}, {latitude: location.latitude, longitude: location.longitude});
        // return data
        return {
            anchorPoint: { latitude: _lat, longitude: _lon, elevation: _ele, distance: _dist, distanceTotal: _distT },
            nearestWaypoint: _nearestWaypoint,
            distance: Object(_util_geolib_distance__WEBPACK_IMPORTED_MODULE_7__["calculateDistance"])({ latitude: _lat, longitude: _lon }, { latitude: location.latitude, longitude: location.longitude })
        };
    };
    // simplify an array of data points using 2 methods (radial distance and the douglas peucker alg.)
    TrailGeneratorService.prototype.simplify = function (points, tolerance, highestQuality) {
        if (highestQuality === void 0) { highestQuality = true; }
        var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
        points = highestQuality ? this._simplifyRadialDistance(points, sqTolerance) : points;
        points = this._simplifyDouglasPeucker(points, sqTolerance);
        return points;
    };
    // basic distance-based simplification
    TrailGeneratorService.prototype._simplifyRadialDistance = function (points, sqTolerance) {
        var prevPoint = this._castAsNumbers(points[0]);
        var newPoints = [prevPoint];
        var point;
        for (var i = 1, len = points.length; i < len; i++) {
            // cast as number
            point = this._castAsNumbers(points[i]);
            if (this._getSquareDistance(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }
        if (prevPoint !== point) {
            newPoints.push(point);
        }
        return newPoints;
    };
    TrailGeneratorService.prototype._castAsNumbers = function (point) {
        return { longitude: Number(point['longitude']), latitude: Number(point['latitude']), elevation: Number(point['elevation']) };
    };
    // simplification using optimized Douglas-Peucker algorithm with recursion elimination
    TrailGeneratorService.prototype._simplifyDouglasPeucker = function (points, sqTolerance) {
        var len = points.length, MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array, markers = new MarkerArray(len), first = 0, last = len - 1, stack = [], newPoints = [], i, maxSqDist, sqDist, index;
        markers[first] = markers[last] = 1;
        while (last) {
            maxSqDist = 0;
            for (i = first + 1; i < last; i++) {
                sqDist = this._getSquareSegmentDistance(points[i], points[first], points[last]);
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            if (maxSqDist > sqTolerance) {
                markers[index] = 1;
                stack.push(first, index, index, last);
            }
            last = stack.pop();
            first = stack.pop();
        }
        for (i = 0; i < len; i++) {
            if (markers[i]) {
                newPoints.push(points[i]);
            }
        }
        return newPoints;
    };
    /*
     (c) 2013, Vladimir Agafonkin
     Simplify.js, a high-performance JS polyline simplification library
     mourner.github.io/simplify-js
    */
    // square distance between 2 points
    TrailGeneratorService.prototype._getSquareDistance = function (p1, p2) {
        var dx = p1.latitude - p2.latitude, dy = p1.longitude - p2.longitude, dz = (p1.elevation - p2.elevation) || 0;
        return dx * dx + dy * dy + dz * dz;
    };
    // square distance from a point to a segment
    TrailGeneratorService.prototype._getSquareSegmentDistance = function (p, p1, p2) {
        var x = p1.latitude, y = p1.longitude, z = p1.elevation, dx = p2.latitude - x, dy = p2.longitude - y, dz = p2.elevation - z;
        if (dx !== 0 || dy !== 0 || dz !== 0) {
            var t = ((p.latitude - x) * dx + (p.longitude - y) * dy + (p.elevation - z) * dz) /
                (dx * dx + dy * dy + dz * dz);
            if (t > 1) {
                x = p2.latitude;
                y = p2.longitude;
                z = p2.elevation;
            }
            else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }
        dx = p.latitude - x;
        dy = p.longitude - y;
        dz = p.elevation - z;
        return dx * dx + dy * dy + dz * dz;
    };
    TrailGeneratorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        // TODO: generating multiple trails causes enourmous slowdown in poiToMiles, I'm assuming I'm not clearing something...
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_loader_service__WEBPACK_IMPORTED_MODULE_4__["LoaderService"]])
    ], TrailGeneratorService);
    return TrailGeneratorService;
}());



/***/ }),

/***/ "./src/app/service/trail-resolver.service.ts":
/*!***************************************************!*\
  !*** ./src/app/service/trail-resolver.service.ts ***!
  \***************************************************/
/*! exports provided: TrailResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailResolverService", function() { return TrailResolverService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _trail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./trail.service */ "./src/app/service/trail.service.ts");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _snow_generator_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./snow-generator.service */ "./src/app/service/snow-generator.service.ts");
/* harmony import */ var _util_snow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_util/snow */ "./src/app/_util/snow.ts");
/* harmony import */ var _download_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./download.service */ "./src/app/service/download.service.ts");
/* harmony import */ var _rate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rate.service */ "./src/app/service/rate.service.ts");













var TrailResolverService = /** @class */ (function () {
    // makes sure trail data is available before navigating anywhere
    function TrailResolverService(_localStorage, _trailService, _router, _loaderService, _downloadService, _trailGenerator, _snowGenerator, _rateService) {
        this._localStorage = _localStorage;
        this._trailService = _trailService;
        this._router = _router;
        this._loaderService = _loaderService;
        this._downloadService = _downloadService;
        this._trailGenerator = _trailGenerator;
        this._snowGenerator = _snowGenerator;
        this._rateService = _rateService;
    }
    /* there are 3 locations for trail data
     * - assets: contains default trail data that shipped with the app
     * - filesystem: contains downloaded versions of the trail data
     * - online data */
    TrailResolverService.prototype.resolve = function (route, state) {
        var _this = this;
        this._activeTrailId = this._localStorage.retrieve('activeTrailId') || 0;
        var _direction = this._localStorage.retrieve('direction') || 0;
        if (this._cachedTrail && this._cachedTrail.id === this._activeTrailId && this._cachedTrail.direction === _direction) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({ trail: this._cachedTrail, snow: this._cachedSnow });
        }
        else {
            return this._trailService.getPreParsedTrailData(this._activeTrailId, _direction).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), // closes subscription
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (data) {
                if (data) {
                    // cache trail
                    _this._cachedTrail = data[0];
                    _this._trailGenerator.setTrailData(_this._cachedTrail);
                    // if there's snow data, there might not be
                    if (data[1]) {
                        // parse snow data individually (as it's a separate update/download)
                        _this._cachedSnow = data[1];
                        _this._snowGenerator.setSnowData(_this._cachedSnow);
                        // reverse if needed
                        if (_direction === 1) {
                            _this._cachedSnow = Object(_util_snow__WEBPACK_IMPORTED_MODULE_10__["reverseSnow"])(_this._cachedSnow, _this._cachedTrail.miles.length);
                        }
                    }
                    // generate a mileTree (for GPS location)
                    var flatMileCoordinates = data[0].miles.map(function (elem) {
                        return elem.centerpoint;
                    });
                    _this._trailGenerator.createMileTree(flatMileCoordinates);
                    _this._loaderService.showMessage('created mile tree');
                    // set up the rating system (requires active trail data)
                    _this._rateService.setup();
                    _this._loaderService.showMessage('initialized rating system');
                    _this._loaderService.hideOverlay();
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({ trail: _this._cachedTrail, snow: _this._cachedSnow });
                }
                else {
                    _this._loaderService.hideOverlay();
                    _this._router.navigate(['/error']);
                    return;
                }
            }));
        }
    };
    TrailResolverService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_webstorage__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"],
            _trail_service__WEBPACK_IMPORTED_MODULE_5__["TrailService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _loader_service__WEBPACK_IMPORTED_MODULE_6__["LoaderService"],
            _download_service__WEBPACK_IMPORTED_MODULE_11__["DownloadService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_8__["TrailGeneratorService"],
            _snow_generator_service__WEBPACK_IMPORTED_MODULE_9__["SnowGeneratorService"],
            _rate_service__WEBPACK_IMPORTED_MODULE_12__["RateService"]])
    ], TrailResolverService);
    return TrailResolverService;
}());



/***/ }),

/***/ "./src/app/service/trail.service.ts":
/*!******************************************!*\
  !*** ./src/app/service/trail.service.ts ***!
  \******************************************/
/*! exports provided: TrailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailService", function() { return TrailService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loader.service */ "./src/app/service/loader.service.ts");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _snow_generator_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./snow-generator.service */ "./src/app/service/snow-generator.service.ts");
/* harmony import */ var _util_snow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_util/snow */ "./src/app/_util/snow.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_util/trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var _filesystem_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./filesystem.service */ "./src/app/service/filesystem.service.ts");
/* harmony import */ var _parser_pct_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../parser/pct-data */ "./src/app/parser/pct-data.ts");
/* harmony import */ var _parser_shr_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../parser/shr-data */ "./src/app/parser/shr-data.ts");













// dynamically called
// import { parseCDTData } from '../parser/cdt-data';
// import { parseATData } from '../parser/at-data';


var TrailService = /** @class */ (function () {
    // private _parseCDTData:    Function = parseCDTData;
    // private _parseATData:     Function = parseATData;
    function TrailService(_http, _localStorage, _loaderService, _trailGenerator, _snowGenerator, _fileSystemService) {
        this._http = _http;
        this._localStorage = _localStorage;
        this._loaderService = _loaderService;
        this._trailGenerator = _trailGenerator;
        this._snowGenerator = _snowGenerator;
        this._fileSystemService = _fileSystemService;
        // prevent removal of dynamically used imports (tree shaking), see: https://github.com/Microsoft/TypeScript/issues/9191
        // since each dataset has a different source, they all have their own parsing routine, before step 2 (generateMiles() / parseSnow())
        this._DEMOParser = new _parser_pct_data__WEBPACK_IMPORTED_MODULE_12__["PCTData"]();
        this._PCTParser = new _parser_pct_data__WEBPACK_IMPORTED_MODULE_12__["PCTData"]();
        this._SHRParser = new _parser_shr_data__WEBPACK_IMPORTED_MODULE_13__["SHRData"]();
    }
    // Get raw trail data, for parsing (dev mode)
    // this generates the preparsed data files to be used by regular users (stored online for download + default version in assets)
    // supports trails that consist of multiple files (sections)
    TrailService.prototype.getRawTrailData = function (trailId) {
        var _trailMeta;
        var _observables = [];
        for (var key in _environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__["environment"].TRAILS_GENERATION) {
            if (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__["environment"].TRAILS_GENERATION[key].id === trailId) {
                _trailMeta = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_9__["environment"].TRAILS_GENERATION[key];
            }
        }
        var _metaAsObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(_trailMeta); // so it can be passed into the forkjoin
        _observables.push(_metaAsObservable);
        // AT data from the ATC
        // PCT data from halfmile
        // CDT data from CDTC (might be able to get better dataset)
        // SHR http://onthetrail.org/trekking/shr/ (unofficial)
        // TODO: snow data ripped from postholer (not very nice, I know)
        // .dat is an xml structured file (so a .gpx or .kml)
        var _assetsDir = 'assets/data/';
        if (_trailMeta.multipart) {
            for (var i = 0; i < _trailMeta.parts; i++) {
                var _trailDownloader = this._http.get(_assetsDir + _trailMeta.dataPath + 'trail_' + i + '.dat', { responseType: 'text' });
                _observables[0] = _trailDownloader;
            }
        }
        else {
            var _trail = this._http.get(_assetsDir + _trailMeta.dataPath + 'trail.dat', { responseType: 'text' });
            _observables[1] = _trail;
        }
        var _poi = this._http.get(_assetsDir + _trailMeta.dataPath + 'poi.dat', { responseType: 'text' });
        _observables[2] = _poi;
        // snow is an optional data file
        var _snow;
        if (_trailMeta.snowVersion) {
            _snow = this._http.get(_assetsDir + _trailMeta.dataPath + 'snow.json', { responseType: 'json' });
            _observables[3] = _snow;
        }
        // towns is an optional data file
        var _towns;
        if (_trailMeta.hasTowns) {
            _towns = this._http.get(_assetsDir + _trailMeta.dataPath + 'towns.json', { responseType: 'json' });
            _observables[4] = _towns;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(_observables);
    };
    /* Get the pre parsed trail data (regular user), returns a promise
    2 options
    - get the locally stored (user downloaded) combined trail file (that includes trail & poi), 2 separate JSONs, trail has nobo/sobo versions
    - get the default combined file (from assets, baked into the app), 2 separate JSONs, trail has nobo/sobo versions */
    TrailService.prototype.getPreParsedTrailData = function (trailId, direction) {
        var _self = this;
        var _trailMeta = Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_10__["getTrailMetaDataById"])(trailId);
        var _directionString = (direction === 0) ? 'nobo' : 'sobo';
        this._loaderService.showMessage('fetching trail data');
        var _getData = function (name, hasDirection) {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var _fileName = (hasDirection) ? name + '-' + _directionString + '.json' : name + '.json';
                            _self._fileSystemService.readFile(_trailMeta.abbr, _fileName, function (result) {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
                                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                                        if (result && result !== 'error') {
                                            resolve(result);
                                        }
                                        else {
                                            // if there isn't a trail, get it from assets
                                            _self._http.get('assets/files/' + _trailMeta.abbr + '/' + _fileName, { responseType: 'json' }).subscribe(function (file) {
                                                resolve(file);
                                            });
                                        }
                                        return [2 /*return*/];
                                    });
                                });
                            });
                        })];
                });
            });
        };
        // attempt to get data from filesystem, if that fails, get it from assets
        var _observables = [];
        var _trailData = _getData('trail', true);
        _observables.push(_trailData);
        if (_trailMeta.snowVersion) {
            var _snowData = _getData('snow', false);
            _observables.push(_snowData);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])(_observables);
    };
    // Parse the raw data (routines for each trail), returns a promise
    TrailService.prototype.parseTrailData = function (trail, waypoints, pois, snow, towns, direction) {
        this._loaderService.showMessage('parsing trail data');
        // dynamic function call
        var _parsed = this['_' + trail.abbr + 'Parser'].parse(trail, waypoints, pois, snow, towns, direction);
        var _trail = this._trailGenerator.generateMiles(_parsed[0], _parsed[1], _parsed[2], direction, _parsed[4]);
        var _snow;
        if (_parsed[3]) {
            _snow = Object(_util_snow__WEBPACK_IMPORTED_MODULE_8__["parseSnow"])(_parsed[3], _trail.id, _trail.abbr, trail.snowVersion);
            if (direction === 1) {
                _snow = Object(_util_snow__WEBPACK_IMPORTED_MODULE_8__["reverseSnow"])(_snow, _trail.miles.length);
            }
            this._snowGenerator.setSnowData(_snow);
        }
        return { trail: _trail, snow: _snow };
    };
    TrailService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
        /* trail generating, trail parsing, trail loading:
        trail:
        - consists of trail waypoints (can be multiple files)
        - contists poi data (points of interest), can be multiple files (TODO: multi poi files, when needed)
        - consists of snow data (single file)
         */
        ,
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
            _loader_service__WEBPACK_IMPORTED_MODULE_5__["LoaderService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_6__["TrailGeneratorService"],
            _snow_generator_service__WEBPACK_IMPORTED_MODULE_7__["SnowGeneratorService"],
            _filesystem_service__WEBPACK_IMPORTED_MODULE_11__["FilesystemService"]])
    ], TrailService);
    return TrailService;
}());



/***/ }),

/***/ "./src/app/service/version-resolver.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/service/version-resolver.service.ts ***!
  \*****************************************************/
/*! exports provided: VersionResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionResolverService", function() { return VersionResolverService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/fesm5/ngx-webstorage.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _util_trail_meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/trail-meta */ "./src/app/_util/trail-meta.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _trail_generator_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./trail-generator.service */ "./src/app/service/trail-generator.service.ts");
/* harmony import */ var _snow_generator_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./snow-generator.service */ "./src/app/service/snow-generator.service.ts");
/* harmony import */ var _connection_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./connection.service */ "./src/app/service/connection.service.ts");
/* harmony import */ var _util_cordova__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_util/cordova */ "./src/app/_util/cordova.ts");
/* harmony import */ var _download_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./download.service */ "./src/app/service/download.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");














var VersionResolverService = /** @class */ (function () {
    function VersionResolverService(_router, _localStorage, _snowGeneratorService, _trailGeneratorService, _connectionService, _downloadService) {
        this._router = _router;
        this._localStorage = _localStorage;
        this._snowGeneratorService = _snowGeneratorService;
        this._trailGeneratorService = _trailGeneratorService;
        this._connectionService = _connectionService;
        this._downloadService = _downloadService;
        this.observables = {}; // object containing all observables
        this._subjects = {}; // object containing all behaviorSubjects
        // TODO: incorporate town list (will be a seperate file)
        this._dataTypes = ['trail', 'snow', 'tiles'];
        // create the update available observer
        var _sub = this._subjects['updateAvailable'] = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"](false);
        this.observables['updateAvailable'] = _sub.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["share"])());
        this._internalDownloader = this._downloadService.createDownloader('DATA_version_internal');
        this._externalDownloader = this._downloadService.createDownloader('DATA_version_external');
    }
    VersionResolverService.prototype.resolve = function () {
        var _this = this;
        return this.collectVersionData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(function (data) {
            if (data) {
                var _parseHttpResponce = function (input) {
                    if (input && input instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpResponse"]) {
                        if (input.status === 200) {
                            return input.body; // return just the data
                        }
                        else {
                            return null; // failed http request
                        }
                    }
                    else {
                        return input; // not an http response
                    }
                };
                var _self_1 = _this;
                var _internal = _parseHttpResponce(data[0]);
                var _external = _parseHttpResponce(data[1]);
                var _loop_1 = function (key) {
                    var _trail = _internal[key];
                    _this._dataTypes.forEach(function (type) {
                        var _storedKeyName = _trail.abbr + '_' + type + 'Version';
                        if (type !== 'tiles' && !_self_1._localStorage.retrieve(_storedKeyName)) {
                            // if the trail has data of type (not all trails have snow data)
                            if (_trail[type + 'Version']) {
                                _self_1._localStorage.store(_storedKeyName, _trail[type + 'Version']);
                            }
                        }
                    });
                };
                /* check if this is the first run
                if so, write all the internal version to local storage, so we can later check against those versions) */
                for (var key in _internal) {
                    _loop_1(key);
                }
                // if we have newly downloaded data
                if (_external) {
                    _this._localStorage.store('lastVersionCheck', new Date().getTime());
                    _this._localStorage.store('availableUpdates', _external);
                    Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["setTrailMetaData"])(_external);
                }
                else {
                    /* we're using internal data, so the last version data is what we saved to local storage
                    the last time internet was available, if nothing was ever downloaded use internal data */
                    var _updateData = _this._localStorage.retrieve('availableUpdates');
                    if (_updateData) {
                        Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["setTrailMetaData"])(_updateData);
                    }
                    else {
                        Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["setTrailMetaData"])(_internal);
                    }
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])('success');
            }
            else {
                _this._router.navigate(['/error']);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])('error');
            }
        }));
    };
    /* collect version data, from assets/local storage and external,
    this function is also executed from app.component */
    VersionResolverService.prototype.collectVersionData = function () {
        var _hasInternetConnection = true;
        if (Object(_util_cordova__WEBPACK_IMPORTED_MODULE_11__["hasConnection"])()) {
            _hasInternetConnection = (this._connectionService.getStatus() === 'online');
        }
        // INTERNAL
        // if there is no stored data available (first run) get data from assets
        var _storageVersion = this._localStorage.retrieve('availableUpdates');
        var _internal;
        if (_storageVersion) {
            _internal = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(_storageVersion);
        }
        else {
            _internal = this._internalDownloader.downloadFile('assets/files/version.json', false);
        }
        // EXTERNAL
        // only update once every 24 hours to save bandwidth
        var _lastChecked = this._localStorage.retrieve('lastVersionCheck');
        var _external;
        if (!_lastChecked) {
            _lastChecked = 0;
        }
        if (_lastChecked + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].updateCheckInterval < new Date().getTime() && _hasInternetConnection) {
            _external = this._externalDownloader.downloadFile(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].appDomain + _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].fileBaseUrl + 'version.json', false);
        }
        else {
            _external = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(null);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["forkJoin"])([_internal, _external]);
    };
    /* separately called: if internet were to become available and the app hasn't checked for updates in 24 hours, check.
     * check if the version of currently loaded trail data === the latest available trail data
     * show version mismatch (download available indicator)
     * TODO: trigger auto snow data download if user setting is enabled. */
    VersionResolverService.prototype.versionCheck = function (currentTrailOnly) {
        if (currentTrailOnly === void 0) { currentTrailOnly = false; }
        var _self = this;
        this.resolve().subscribe(function (result) {
            _self._subjects['updateAvailable'].next(false);
            var _activeTrailId = _self._localStorage.retrieve('activeTrailId') | 0;
            var _trails = _self._localStorage.retrieve('availableUpdates');
            if (currentTrailOnly) {
                _trails = { activeTrail: Object(_util_trail_meta__WEBPACK_IMPORTED_MODULE_5__["getTrailMetaDataById"])(_activeTrailId) };
            }
            var _loop_2 = function (key) {
                var _trailMeta = _trails[key];
                // compare versions for each data type
                _self._dataTypes.forEach(function (type) {
                    if (!_self.observables[_trailMeta.abbr + '_' + type + 'Available']) {
                        // dynamically create behavior subjects / observables for each type
                        var _sub = _self._subjects[_trailMeta.abbr + '_' + type] = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"](false);
                        _self.observables[_trailMeta.abbr + '_' + type + 'Available'] = _sub.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["share"])());
                        // subscribe to localstorage
                        _self._localStorage.observe(_trailMeta.abbr + '_' + type + 'Version').subscribe(function () {
                            _self.versionCheck(true); // as soon as the local storage version changes we re-resolve
                        });
                    }
                    // the actual comparison
                    var _storedVersion = _self._localStorage.retrieve(_trailMeta.abbr + '_' + type + 'Version');
                    if (_storedVersion !== _trailMeta[type + 'Version']) {
                        _self._subjects[_trailMeta.abbr + '_' + type].next(true);
                        if (_activeTrailId === _trailMeta.id) {
                            // set the general update available flag
                            _self._subjects['updateAvailable'].next(true);
                        }
                    }
                    else {
                        _self._subjects[_trailMeta.abbr + '_' + type].next(false);
                    }
                });
            };
            // for each trail
            for (var key in _trails) {
                _loop_2(key);
            }
        });
    };
    VersionResolverService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
            _snow_generator_service__WEBPACK_IMPORTED_MODULE_9__["SnowGeneratorService"],
            _trail_generator_service__WEBPACK_IMPORTED_MODULE_8__["TrailGeneratorService"],
            _connection_service__WEBPACK_IMPORTED_MODULE_10__["ConnectionService"],
            _download_service__WEBPACK_IMPORTED_MODULE_12__["DownloadService"]])
    ], VersionResolverService);
    return VersionResolverService;
}());



/***/ }),

/***/ "./src/app/settings.ts":
/*!*****************************!*\
  !*** ./src/app/settings.ts ***!
  \*****************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
var Settings = /** @class */ (function () {
    function Settings() {
    }
    // TODO: this should be moved somewhere else
    Settings.POITYPES = [
        {
            type: 'user',
            label: 'user',
            iconType: 'fa',
            icon: 'hiking'
        }, {
            type: 'user-dot',
            label: '',
            iconType: 'far',
            icon: 'dot-circle'
        }, {
            type: 'water',
            label: 'water source',
            isMajor: true,
            color: '#58aed9',
            iconType: 'fa',
            icon: 'tint',
            rateable: true,
            rateBy: ['quality', 'flow', 'accessibility'],
            userEnabled: true
        }, {
            type: 'camp',
            label: 'campsite',
            isMajor: true,
            color: '#d9a758',
            iconType: 'fa',
            icon: 'campground',
            userEnabled: true
        }, {
            type: 'shelter',
            label: 'shelter',
            isMajor: false,
            color: '#d9a758',
            iconType: 'fa',
            icon: 'house-damage',
            rateBy: ['pests', 'amenities'],
            userEnabled: true
        }, {
            type: 'road',
            label: 'road',
            color: '#878787',
            iconType: 'fa',
            icon: 'road',
            userEnabled: true
        }, {
            type: 'highway',
            label: 'highway',
            isMajor: true,
            color: '#9b9b9b',
            iconType: 'fa',
            icon: 'car',
            userEnabled: true
        }, {
            type: 'railroad',
            label: 'railroad',
            color: '#afafaf',
            iconType: 'fa',
            icon: 'train',
            userEnabled: true
        }, {
            type: 'gate',
            label: 'gate',
            color: '#58d9aa',
            iconType: 'fa',
            icon: 'door-open',
            userEnabled: true
        }, {
            type: 'powerline',
            label: 'powerline',
            color: '#8b6765',
            iconType: 'fa',
            icon: 'bolt',
            userEnabled: true
        }, {
            type: 'store',
            label: 'store',
            color: '#9e58d9',
            iconType: 'fa',
            icon: 'store',
            rateable: true,
            rateBy: ['assortment', 'price'],
            userEnabled: true
        }, {
            type: 'postoffice',
            label: 'post office',
            color: '#d958aa',
            iconType: 'fa',
            icon: 'box-open',
            userEnabled: true
        }, {
            type: 'food',
            label: 'food',
            color: '#805bd9',
            iconType: 'fa',
            icon: 'utensils',
            rateable: true,
            rateBy: ['quantity', 'quality', 'price'],
            userEnabled: true
        }, {
            type: 'information',
            label: 'information',
            color: '#4498d9',
            iconType: 'fa',
            icon: 'info',
            userEnabled: true
        }, {
            type: 'trailhead',
            label: 'trail head',
            color: '#8d5e35',
            iconType: 'fa',
            icon: 'parking',
            userEnabled: true
        }, {
            type: 'sign',
            label: 'sign',
            color: '#d08d4b',
            iconType: 'fa',
            icon: 'map-signs',
            userEnabled: true
        }, {
            type: 'bridge',
            label: 'bridge',
            color: '#d95da5',
            iconType: 'fa',
            icon: 'shoe-prints',
            userEnabled: true
        }, {
            type: 'trail',
            label: 'trail',
            color: '#a5d958',
            iconType: 'fa',
            icon: 'map-signs',
            userEnabled: true
        }, {
            type: 'view',
            label: 'view',
            color: '#d97948',
            iconType: 'fa',
            icon: 'mountain',
            userEnabled: true
        }, {
            type: 'peak',
            label: 'summit',
            color: '#d97948',
            iconType: 'fa',
            icon: 'mountain',
            userEnabled: true
        }, {
            type: 'boundary',
            label: 'boundary',
            color: '#d9c558',
            iconType: 'fa',
            icon: 'map-pin',
            userEnabled: true
        }, {
            type: 'end',
            label: 'sign',
            isMajor: true,
            color: '#d9c558',
            iconType: 'fa',
            icon: 'flag'
        }, {
            type: 'sight',
            label: 'sight',
            color: '#56ccd9',
            iconType: 'fa',
            icon: 'gem'
        }, {
            type: 'resort',
            label: 'resort / inn / lodge / angel',
            isMajor: true,
            color: '#48d965',
            iconType: 'fa',
            icon: 'hotel',
            rateable: true,
            rateBy: ['amenities', 'price'],
            userEnabled: true
        }, {
            type: 'town',
            label: 'town / city',
            isMajor: true,
            color: '#ff0000',
            iconType: 'fa',
            icon: 'city'
        },
        // warning
        {
            type: 'note',
            label: 'note',
            color: '#E8D6BD',
            iconType: 'fas',
            icon: 'pen-alt',
            userEnabled: true
        },
        // warning
        {
            type: 'warning',
            label: 'warning',
            color: '#d75b4e',
            iconType: 'fa',
            icon: 'exclamation-triangle'
        },
        // multiple type
        {
            type: 'multiple',
            label: 'plus',
            color: '#4b4b4b',
            iconType: 'fa',
            icon: 'plus'
        },
        // if all else fails
        {
            type: 'unknown',
            label: '',
            color: '#808080',
            iconType: 'fa',
            icon: 'question-circle'
        }
    ];
    return Settings;
}());



/***/ }),

/***/ "./src/app/type/rating.ts":
/*!********************************!*\
  !*** ./src/app/type/rating.ts ***!
  \********************************/
/*! exports provided: Score, Rating */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Score", function() { return Score; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rating", function() { return Rating; });
/* harmony import */ var _util_poi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/poi */ "./src/app/_util/poi.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");



// maintains a score based on the last 10 inputs
var Score = /** @class */ (function () {
    function Score(belongsTo, aspect, score) {
        if (score === void 0) { score = 0; }
        this.score = []; // max. the last 10 ratings
        this.count = 0; // max. 10
        this.belongsTo = belongsTo;
        this.aspect = aspect;
        // set initial score
        if (score !== 0) {
            this.score.push(score);
            this.count = 1;
        }
        this.timestamp = 0;
    }
    Score.prototype.addToScore = function (rating, force) {
        if (force === void 0) { force = false; }
        // remove old user score
        if (this.timestamp && !force) {
            this.removeFromScore();
        }
        // insert
        this.timestamp = new Date().getTime();
        if (this.count < 10) {
            this.count++;
        }
        this.score.push(rating);
        if (this.score.length > 10) {
            this.score.shift();
        }
    };
    Score.prototype.getScore = function () {
        var _total = 0;
        var _count = 0;
        for (var i = 0; i < this.score.length; i++) {
            var _multiplier = (1 + (i * 0.5)); // make more recent scores count more
            _total += (this.score[i] * _multiplier);
            _count += _multiplier;
        }
        return Number((_total / _count).toFixed(2));
    };
    Score.prototype.getUserScore = function () {
        if (this.timestamp) {
            return this.score[this.score.length - 1];
        }
        else {
            return 0;
        }
    };
    Score.prototype.removeFromScore = function () {
        if (this.timestamp) {
            this.score.pop();
            this.count--;
            this.timestamp = 0;
        }
    };
    return Score;
}());

var Rating = /** @class */ (function () {
    function Rating(type, location) {
        this._aspects = {}; // you can rate different aspects (water: flow / quality / ease of use)
        var _self = this;
        this._type = type;
        this.id = type + '_' + Number(location.latitude).toFixed(4) + '_' + Number(location.longitude).toFixed(4);
        var _poiType = Object(_util_poi__WEBPACK_IMPORTED_MODULE_0__["getPoiTypeByType"])(this._type);
        if (!_poiType.rateable) {
            console.warn('trying to create a rating object for an unrateable type: ' + this._type);
            return;
        }
        _poiType.rateBy.forEach(function (aspect) {
            _self._aspects[aspect] = new Score(_self.id, aspect);
            console.log('setup aspect', aspect);
        });
        this._ratingChangedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](-1);
        this.ratingChangedObserver = this._ratingChangedSubject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        this.calculateRating();
    }
    Rating.prototype.destroy = function () {
        if (this.ratingChangedObserver) {
            this.ratingChangedObserver = null;
            this._ratingChangedSubject = null;
        }
    };
    // updates the user rating within the rating object,
    // sets the new total value
    Rating.prototype.setAspectRating = function (aspect, rating, force) {
        if (force === void 0) { force = false; }
        this._aspects[aspect].addToScore(rating, force);
        this.calculateRating();
    };
    Rating.prototype.removeAspectRating = function (aspect) {
        this._aspects[aspect].removeFromScore();
        this.calculateRating();
    };
    Rating.prototype.calculateRating = function () {
        var _aspectCount = 0;
        var _cummulativeScore = 0;
        for (var key in this._aspects) {
            var _rating = this._aspects[key];
            var _aspectScore = _rating.getScore() || 0;
            if (_aspectScore) {
                _aspectCount++;
                _cummulativeScore += _aspectScore;
            }
        }
        this._rating = Number((_cummulativeScore / _aspectCount).toFixed(2)) || 0;
        // trigger
        this._ratingChangedSubject.next(new Date().getTime());
    };
    Rating.prototype.getRating = function () {
        return this._rating;
    };
    Rating.prototype.getAspect = function (name) {
        return this._aspects[name];
    };
    Rating.prototype.getAspects = function () {
        var _returnArray = [];
        for (var key in this._aspects) {
            var _score = this._aspects[key];
            if (_score.timestamp !== 0) {
                _returnArray.push(this._aspects[key]);
            }
        }
        return _returnArray;
    };
    return Rating;
}());



/***/ }),

/***/ "./src/app/type/snow.ts":
/*!******************************!*\
  !*** ./src/app/type/snow.ts ***!
  \******************************/
/*! exports provided: Snow, Snowpoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snow", function() { return Snow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snowpoint", function() { return Snowpoint; });
var Snow = /** @class */ (function () {
    function Snow() {
    }
    return Snow;
}());

var Snowpoint = /** @class */ (function () {
    function Snowpoint(elevation, distance) {
        this.elevation = elevation;
        this.distance = distance;
    }
    return Snowpoint;
}());



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: true,
    simulateTouch: false,
    version: '1.0',
    // FILES
    // PRODUCTION SERVER:
    // appDomain: 'https://storage.googleapis.com/',
    // fileBaseUrl: 'just-hike/',
    // TEST SERVER:
    appDomain: 'https://hike.frankdouwes.com/',
    fileBaseUrl: 'files/',
    mailto: 'https://hike.frankdouwes.com/scripts/mailto.php',
    updateCheckInterval: 86400000,
    onlineTileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    MILE: 1609.344,
    FOOT: 0.3048,
    LINEHEIGHT: 4,
    // user preferences
    DEFAULT_USER_SETTINGS: {
        activeTrailId: 0,
        purchasedTrails: [],
        direction: 0,
        showSnow: true,
        showMiniMap: true,
        showMileGrid: false,
        animateMap: false,
        poiDistanceOffTrail: 250,
        poiMaxDistance: 1000,
        userDistanceOffTrail: 10,
        autoUpdate: true,
        // major markers visibility (elevation profile)
        showWater: true,
        showCamp: true,
        showHighway: false,
        showEnd: true,
        // internal
        maxPoiDistance: 1,
        scrollbarSegmentSize: 26,
        simulatedMile: -1,
        userName: 'Hiker',
        // elevationProfile
        parallaxEnabled: false,
        screenMode: 'default',
        detectRetina: false // disable retina by default (battery saving)
    },
    // Data set by DEVs before generating new trail data.
    TRAILS_GENERATION: [
        {
            abbr: 'DEMO',
            id: 0,
            trailVersion: '1.1',
            tilesVersion: '1.0',
            snowVersion: '1.0',
            hasTowns: true,
            length: 109.5,
            dataPath: 'DEMO/',
            scrollbarSegmentSize: 100,
            multipart: false
        }, {
            abbr: 'PCT',
            id: 1,
            trailVersion: '1.1',
            tilesVersion: '1.0',
            snowVersion: '1.0',
            hasTowns: true,
            length: [109.5, 100, 132.5, 112.5, 111.9, 85.6, 115, 175.5, 74.4, 75.4,
                64.8, 38.3, 91.4, 132.2, 82.2, 98.5, 56.2, 63, 54.5, 74.4, 60.1, 75.9,
                107.9, 55, 148.2, 98.3, 70.9, 127, 70.3],
            dataPath: 'PCT/',
            scrollbarSegmentSize: 200,
            multipart: true,
            parts: 29
        }, {
            abbr: 'CDT',
            id: 2,
            trailVersion: '1.0',
            tilesVersion: '1.0',
            snowVersion: '1.0',
            length: 3011,
            dataPath: 'CDT/',
            scrollbarSegmentSize: 200,
            multipart: false,
        }, {
            abbr: 'AT',
            id: 3,
            trailVersion: '1.0',
            tilesVersion: '1.0',
            snowVersion: '1.0',
            length: 2199,
            dataPath: 'AT/',
            scrollbarSegmentSize: 200,
            multipart: false,
        }, {
            abbr: 'SHR',
            id: 4,
            trailVersion: '1.0',
            tilesVersion: '1.0',
            length: 215,
            dataPath: 'SHR/',
            scrollbarSegmentSize: 100,
            multipart: false,
        }
    ]
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var hammer_touchemulator_touch_emulator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hammer-touchemulator/touch-emulator */ "./node_modules/hammer-touchemulator/touch-emulator.js");
/* harmony import */ var hammer_touchemulator_touch_emulator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hammer_touchemulator_touch_emulator__WEBPACK_IMPORTED_MODULE_5__);






if (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].simulateTouch) {
    hammer_touchemulator_touch_emulator__WEBPACK_IMPORTED_MODULE_5__();
}
if (_environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/frankdouwes/work/just-hike/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map