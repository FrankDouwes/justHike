/* just some helper functions to make sure everything is available,
 * useful for debugging in browser (when cordova isn't available) and simple guarding */

/* cordova for native stuff (that tends to be buggy) */
let _cordova: any;

/* cordova */
export function getCordova(): any {
  return _cordova;
}

export function setCordova(c): void {
  _cordova = c;
}

export function cordovaEnabled(): boolean {
  return !!(_cordova);
}



/* device (general device info) */
let _device: any
export function setDevice(device: any): void {
  _device = device
}

export function getUUID(): string {
  if (cordovaEnabled()) {
    return _device.uuid;
  } else {
    return '1234567890';
  }
}



/* screen is used to lock orientation using cordova-plugin-screen-orientation */
let _screen: any;

export function getScreen(): any {
  return _screen;
}

export function setScreen(s): void {
  _screen = s;
}



/* used to test connection using cordova-plugin-network-information */
/* TODO plugin not working as advertised, what else is new! */
let _connection: any;

export function getConnection(): any {
  return _connection;
}

export function setConnection(c): void {
  _connection = c;
}

export function hasConnection(): boolean {
  return !!(_connection);
}



/* zip plugin cordova */
let _zip: any;

export function setZip(z): void {
  _zip = z;
}

export function getZip(): any {
  return _zip;
}

export function hasZip(): boolean {
  return !!(_zip);
}


/* cordova dialogs plugin, to use native dialogs for warnings etc. */
let _dialogs: any;

export function setDialogs(d): void {
  _dialogs = d;
}

export function getDialogs(): any {
  return _dialogs;
}

export function hasDialogs(): boolean {
  return !!(_dialogs);
}


