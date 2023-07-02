# jQuery QueryBuilder

[![npm version](https://img.shields.io/npm/v/jQuery-QueryBuilder.svg?style=flat-square)](https://www.npmjs.com/package/jQuery-QueryBuilder)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/jQuery-QueryBuilder/badge)](https://www.jsdelivr.com/package/npm/jQuery-QueryBuilder)
[![Build Status](https://github.com/mistic100/jQuery-QueryBuilder/workflows/CI/badge.svg)](https://github.com/mistic100/jQuery-QueryBuilder/actions)
[![Dependencies Status](https://david-dm.org/mistic100/jQuery-QueryBuilder/status.svg?style=flat-square)](https://david-dm.org/mistic100/jQuery-QueryBuilder)
[![gitlocalized](https://gitlocalize.com/repo/5259/whole_project/badge.svg)](https://gitlocalize.com/repo/5259/whole_project?utm_source=badge)

jQuery plugin offering an simple interface to create complex queries.

[![screenshot](https://raw.githubusercontent.com/mistic100/jQuery-QueryBuilder/master/examples/screenshot.png)](https://querybuilder.js.org)



## Documentation
[querybuilder.js.org](https://querybuilder.js.org)



## Install

#### Manually

[Download the latest release](https://github.com/mistic100/jQuery-QueryBuilder/releases)

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
 * Internet Explorer >= 11
 * All other recent browsers



## Developement

Install Node dependencies with `npm install`.

#### Build

Run `npm run build` in the root directory to generate production files inside `dist`.

#### Serve

Run `npm run serve` to open the example page with automatic build and livereload.


## License
This library is available under the MIT license.
