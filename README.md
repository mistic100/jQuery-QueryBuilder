# jQuery QueryBuilder

[![Bower version](https://badge.fury.io/bo/jQuery-QueryBuilder.svg)](http://badge.fury.io/bo/jQuery-QueryBuilder)
[![Build Status](https://travis-ci.org/mistic100/jQuery-QueryBuilder.svg?branch=master)](https://travis-ci.org/mistic100/jQuery-QueryBuilder)
[![Coverage Status](https://coveralls.io/repos/mistic100/jQuery-QueryBuilder/badge.svg)](https://coveralls.io/r/mistic100/jQuery-QueryBuilder)
[![Gratipay](https://img.shields.io/gratipay/mistic100.svg)](https://gratipay.com/mistic100)
[![Online documentation](https://img.shields.io/badge/documentation-online-blue.svg)](http://mistic100.github.io/jQuery-QueryBuilder)

jQuery plugin offering an simple interface to create complex queries.

## Documentation
http://mistic100.github.io/jQuery-QueryBuilder

### Dependencies
 * Bootstrap >= 3.1 (CSS only)
 * jQuery >= 1.9
 * [jQuery.extendext](https://github.com/mistic100/jQuery.extendext)
 * (optional) MomentJS for date/time validation
 * (optional) some JS components used by plugins

($.extendext is directly included in the [standalone](https://github.com/mistic100/jQuery-QueryBuilder/blob/master/dist/js/query-builder.standalone.js) file)

### Browser support
 * Internet Explorer >= 10 (9 with various shims)
 * Mozilla FireFox ??
 * Google Chrome ??
 * Opera ??
 * Safari ??

### Build

#### Prerequisites

 * NodeJS + NPM: `apt-get install nodejs-legacy npm`
 * Ruby Dev: `apt-get install ruby-dev`
 * Grunt CLI: `npm install -g grunt-cli`
 * Bower: `npm install -g bower`
 * SASS: `gem install sass`

#### Run

Install Node and Bower dependencies `npm install & bower install` then run `grunt` in the root directory to generate production files inside `dist`.

#### Options

You can choose which plugins to include with `--plugins` :
```bash
# include "sql-support" plugin
grunt --plugins=sql-support

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

 * `grunt test` to run JSHint and the QUnit test suite.
 * `grunt list_modules` to get the list of available plugins and languages.
 * `grunt watch` to automatically build the library when modifying source files.

### Inspiration
 * [Knockout Query Builder](http://kindohm.github.io/knockout-query-builder/)
 * [jui_filter_rules](http://www.pontikis.net/labs/jui_filter_rules/)
