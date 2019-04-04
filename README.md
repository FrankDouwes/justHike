# JustHike

TODO:

- back and forth between elevation profile and mile detail page results in change of current mile (scroll issue)
- rating system for water / campsites (username field)
- compass heading, all cordova plugins seem to have android issues, iOS only?
- overlapping UTM lines (square miles)
- contact form
- optimising (virtual list rendering)
<br/><br/>
- Design / CSS / placeholder images
- instructions screen content
<br/><br/>
- improve elevation profile scrollbar accuracy
- paid cloud storage for downloadable files (map tiles)
- purchase routines (app store / google play)
<br/><br/>
- update to Cordova 9 (assuming this will break everything!)
<br/><br/>
- iOS still not animating to correct mile when clicking on mile in elevation profile?
- iOS bugs (possibly related to the use of the depricated alerts plugin)
- iOS scroll bugs (poi list)
- iOS locator bug
- iOS unknown navigation error: Scroll on leaflet map (id = 70?), go back to elevation profile, grey screen...

recently added/fixed:
- resume multipart downloads (saves bandwidth + hosting costs)
- disable GPS tracking when application is in background, resume once in foreground
- fix: 2 location updates before showing locator?


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server


<b>ng build</b> > <b>cd mobile</b> > <b>cordova build android</b> (might have to add platform first (<b>cordova platform add</b>))

or

<b>ng serve</b>, run in chrome. Unzipping will be disabled so offline maps wont work, and window resizing is buggy (SVG redraw, not needed for mobile), it's even more limited in Safari.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
