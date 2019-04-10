# JustHike

TODO:

- back and forth between elevation profile and mile detail page results in change of current mile (scroll issue)
- rating system for water / campsite
- username field (only used for Admin mode right now, not needed for rating, so remove it?)
- compass heading, all cordova plugins seem to have android issues, iOS only?
- overlapping UTM lines (square miles)
- contact form
- optimising (virtual list rendering)
- different contrast settings for online/offline maps.
- Check/Settings: When is a poi considered off trail
- Check/Settings: When is a poi no longer rendered
<br/><br/>
- Design / CSS / placeholder images
- instructions screen content
- fix nightHike background image
<br/><br/>
- improve elevation profile scrollbar accuracy
- purchase routines (app store / google play)
<br/><br/>
- update to Cordova 9 (assuming this will break everything!)
<br/><br/>
- iOS still not animating to correct mile when clicking on mile in elevation profile?
- iOS scroll jump bug
- iOS locator bug
- iOS unknown navigation error: Scroll on leaflet map (id = 70?), go back to elevation profile, grey screen...

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server


<b>ng build</b> > <b>cd mobile</b> > <b>cordova build android</b> (might have to add platform first (<b>cordova platform add</b>))

or

<b>ng serve</b>, run in chrome. Unzipping will be disabled so offline maps wont work, and window resizing is buggy (SVG redraw, not needed for mobile), it's even more limited in Safari.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
