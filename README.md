# Nomz Finder
A webapp mostly that provides restaurant results on a map. It features the ability to save favorites into cloud storage, and consequently, two 'views', one for the saved entries, and one for search results. You can also make the map larger.

Press on map markers to have the list display the location, or on the circle on a list item, to center the map on that location's marker.

Visually, it is optimized for mobile screens.

This was a fun little project to work on, so thanks for the opportunity!

## How to run
Open https://notyourbear.github.io/nomz_finder/.

## More info the on the build.
This app was built with plain old ES5/ES6 Javscript and LESS. It also includes a little bit of linting for JS files.

The only outside libraries it uses are the Places Library, Firebase Library, and Normalize.css.

Everything is compiled via gulp(the 4.0 version) and Rollup. In order to run the entire build process, you need Node installed on your system.

* npm install (or yarn install)
* "npm build" for the development verison
* "npm prod" for the minified production version.
