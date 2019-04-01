# JustHike

ng build > cd mobile > cordova build android (might have to add platform first (cordova platform add))

or

ng serve, run in chrome. Unzipping will be disabled so offline maps wont work, and window resizing is buggy (SVG redraw, not needed for mobile)

todo:

- back and forth between elevation profile and mile detail page results in change of current mile (scroll issue)
- rating system for water / campsites (username field)
- compass heading, all cordova plugins seem to have android issues, iOS only? look at google...
- make sure the user location updates while walking on both map and elevation profile
- pause/resume download of map tiles (since it's 400mb and I'm keeping track of downloaded parts anyway)
- paid cloud storage of downloadable files
- remove font awesome references in index
- Design / CSS / placeholder images
- instructions screen
- iOS bugs (possibly related to the use of the depricated alerts plugin)
- iOS scroll bugs (poi list)
- purchase routines (app store / google play)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
