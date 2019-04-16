# JustHike

BETA 1 released to first group of testers on: April 10th 2019.

----- ----- ----- ----- ----

TODO v1:
- add: towns (+info and link towns to nearest trail road/trail junction)
- add: rating system for water / campsite
- add: compass heading, all cordova plugins seem to have android issues, iOS only?
- add: purchase routines (app store / google play)
<br/><br/>
- fix: improve elevation profile scrollbar accuracy
- fix: back and forth between elevation profile and mile detail page results in change of current mile (scroll issue)
- fix: overlapping UTM lines (square miles)
- fix: different contrast settings for online/offline maps.
- fix: downloader state (has downloaded file, but theres an update available)
- fix: optimising (virtual list rendering)
- fix: vertical red lines on startup (android)
- fix: end of trail scrolling (last 2 mile never visible on map)
<br/><br/>
- test: Check/Settings: When is a poi considered off trail
- test: Check/Settings: When is a poi no longer rendered
<br/><br/>
- design: Make it look good / CSS
- design: nightHike background image
- design: instructions screen content
<br/><br/>
- iOS jumping in scroll list (either an event issue or a css issue)
- iOS (sporadically): (possibly related to ionic webview) - [IPC] Connection::waitForSyncReply: Timed-out while waiting for reply
- iOS (sporadically): (possibly related to ionic webview) - [LayoutConstraints] Unable to simultaneously satisfy constraints.

TODO v2:
- add: side trails
- add: comments
- add: lock/mark locations
- add: personal notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server


<b>ng build</b> > <b>cd mobile</b> > <b>cordova build android</b> (might have to add platform first (<b>cordova platform add</b>))

or

<b>ng serve</b>, run in chrome. Unzipping will be disabled so offline maps wont work, and window resizing is buggy (SVG redraw, not needed for mobile), it's even more limited in Safari.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
