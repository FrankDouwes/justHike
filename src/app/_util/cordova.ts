/* cordova for native stuff (that tends to be buggy) */
let _cordova: any;

export function getCordova(): any {
  return _cordova;
}

export function setCordova(c): void {
  _cordova = c;
}

export function cordovaEnabled(): boolean {
  return !!(_cordova);
}


/* screen is used to lock orientation using cordova-plugin-screen-orientation */
let _screen: any;

export function getScreen(): any {
  return _screen;
}

export function setScreen(s): void {
  _screen = s;
}


/* connection is used to test connection using cordova-plugin-network-information */
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

