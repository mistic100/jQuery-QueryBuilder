# jQuery QueryBuilder

[![npm version](https://img.shields.io/npm/v/jQuery-QueryBuilder.svg?style=flat-square)](https://www.npmjs.com/package/jQuery-QueryBuilder)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/jQuery-QueryBuilder/badge)](https://www.jsdelivr.com/package/npm/jQuery-QueryBuilder)
[![Build Status](https://img.shields.io/travis/mistic100/jQuery-QueryBuilder.svg?style=flat-square)](https://travis-ci.org/mistic100/jQuery-QueryBuilder)
[![Coverage Status](https://img.shields.io/coveralls/mistic100/jQuery-QueryBuilder/master.svg?style=flat-square)](https://coveralls.io/r/mistic100/jQuery-QueryBuilder)
[![Dependencies Status](https://david-dm.org/mistic100/jQuery-QueryBuilder/status.svg?style=flat-square)](https://david-dm.org/mistic100/jQuery-QueryBuilder)

jQuery plugin offering an simple interface to create complex queries.

[![screenshot](https://raw.githubusercontent.com/mistic100/jQuery-QueryBuilder/master/examples/screenshot.png)](https://querybuilder.js.org)



## Documentation
[querybuilder.js.org](https://querybuilder.js.org)



## Install

#### Manually

[Download the latest release](https://github.com/mistic100/jQuery-QueryBuilder/releases)

#### With Bower

```bash
$ bower install jQuery-QueryBuilder
```

#### With npm

```bash
$ npm install jQuery-QueryBuilder
```

#### Via CDN

jQuery-QueryBuilder is available on [jsDelivr](https://www.jsdelivr.com/package/npm/jQuery-QueryBuilder).
### Dependencies
 * [jQuery 3](https://jquery.com)
 * [Bootstrap 3](https://getbootstrap.com/docs/3.3) (CSS only)
 * [jQuery.extendext](https://github.com/mistic100/jQuery.extendext)
 * [doT.js](https://olado.github.io/doT)
 * [MomentJS](https://momentjs.com) (optional, for Date/Time validation)
 * [SQL Parser](https://github.com/mistic100/sql-parser) (optional, for SQL methods)
 * Other Bootstrap/jQuery plugins used by plugins

($.extendext and doT.js are directly included in the [standalone](https://github.com/mistic100/jQuery-QueryBuilder/blob/master/dist/js/query-builder.standalone.js) file)

### Browser support
 * Internet Explorer >= 9
 * All other recent browsers



## Build

#### Prerequisites

 * NodeJS + NPM: `apt-get install nodejs-legacy npm`
 * Grunt CLI: `npm install -g grunt-cli`

#### Run

Install Node and Bower dependencies `npm install` then run `grunt` in the root directory to generate production files inside `dist`.

#### Options

You can choose which plugins to include with `--plugins` :
```bash
# include "sql-support" and "mongodb-support" plugins
grunt --plugins=sql-support,mongodb-support

# disable all plugins
grunt --plugins=false
```
All plugins are included by default.

You can also include language files with `--languages` :
```bash
# include French & Italian translation
grunt --languages=fr,it
```

#### Other commands

 * `grunt test` to run jshint/jscs/scsslint and the QUnit test suite.
 * `grunt serve` to open the example page with automatic build and livereload.
 * `grunt doc` to generate the documentation.


## License
This library is available under the MIT license.
