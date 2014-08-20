# jQuery QueryBuilder

[![Bower version](https://badge.fury.io/bo/jQuery-QueryBuilder.svg)](http://badge.fury.io/bo/jQuery-QueryBuilder)

jQuery plugin offering an interface to create complex queries.

## Documentation
http://mistic100.github.io/jQuery-QueryBuilder

### Requirements
 * Bootstrap 3.x CSS
 * jQuery >= 1.9
 * (optional) MomentJS
 * (optional) any widgets library like jQuery UI

### Browser support
 * Internet Explorer >= 10
 * Mozilla FireFox ??
 * Google Chrome ??
 * Opera ??
 * Safari ??

### Build
Run `grunt` in root directory to generate minified files inside `dist`.

You can choose which modules to include with `--modules`
```bash
# include "sql" module
grunt --modules=sql

# disable all modules
grunt --modules=false
```
All modules are included by default.

You can also include ONE language with `--lang`
```bash
# include French translation
grunt --lang=fr
```

Run `grunt test` to run jsHint and the Mocha test suite.

### Inspiration
 * [Knockout Query Builder](http://kindohm.com/posts/2013/09/25/knockout-query-builder/)
 * [jui_filter_rules](http://www.pontikis.net/labs/jui_filter_rules/)
