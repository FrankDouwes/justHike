// get the file extension as different filetypes are parsed differently
export function getExtensionFromString(filename: string): string {

  const _urlSplit = filename.split('.');
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
export function convertToIonicUrl(fileUrl: string): string {
  const _window: any = window;

  //window.Ionic.normalizeURL... does not exist

  if (!_window.Ionic || !_window.Ionic.WebView.convertFileSrc) {
    alert('Unsupported filesystem.');
    return;
  } else {
    return _window.Ionic.WebView.convertFileSrc(fileUrl);
  }
}
