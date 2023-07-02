(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'jquery-extendext'], factory);
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'), require('jquery-extendext'));
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
"use strict";

@@js

return QueryBuilder;

}));
