(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'dot/doT', 'jquery-extendext'], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'), require('dot/doT'), require('jquery-extendext'));
    }
    else {
        factory(root.jQuery, root.doT);
    }
}(this, function($, doT) {
"use strict";

@@js

return QueryBuilder;

}));
