# jQuery QueryBuilder

[![Bower version](https://badge.fury.io/bo/jQuery-QueryBuilder.svg)](http://badge.fury.io/bo/jQuery-QueryBuilder)
[![Build Status](https://travis-ci.org/mistic100/jQuery-QueryBuilder.svg?branch=master)](https://travis-ci.org/mistic100/jQuery-QueryBuilder)
[![Coverage Status](https://coveralls.io/repos/mistic100/jQuery-QueryBuilder/badge.svg)](https://coveralls.io/r/mistic100/jQuery-QueryBuilder)

jQuery plugin offering an interface to create complex queries.

## Documentation
http://mistic100.github.io/jQuery-QueryBuilder

### Dependencies
 * Bootstrap 3.x CSS
 * jQuery >= 1.9
 * [jQuery.extendext](https://github.com/mistic100/jQuery.extendext)
 * [MicroEvent](https://github.com/mistic100/microevent.js) (mistic100 version)
 * (optional) MomentJS
 * (optional) any widgets library like jQuery UI

($.extendext and MicroEvent are directly included in the [standalone](https://github.com/mistic100/jQuery-QueryBuilder/blob/master/dist/js/query-builder.standalone.js) file)

### Browser support
 * Internet Explorer >= 10
 * Mozilla FireFox ??
 * Google Chrome ??
 * Opera ??
 * Safari ??

### Build
Run `grunt` in root directory to generate minified files inside `dist`.

You can choose which plugins to include with `--modules`
```bash
# include "sql-support" plugin
grunt --modules=sql-support

# disable all modules
grunt --modules=false
```
All plugins are included by default.

You can also include ONE language with `--lang`
```bash
# include French translation
grunt --lang=fr
```

Run `grunt test` to run JSHint and the QUnit test suite.

Run `grunt list_modules` to get the list of available plugins and languages.

Run `grunt watch` to automatically build the library when modifying source files.

### Inspiration
 * [Knockout Query Builder](http://kindohm.com/posts/2013/09/25/knockout-query-builder/)
 * [jui_filter_rules](http://www.pontikis.net/labs/jui_filter_rules/)
