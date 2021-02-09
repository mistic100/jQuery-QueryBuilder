(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'doT', 'jQuery.extendext'], factory);
    }
    else {
        factory(root.jQuery, root.doT);
    }
}(this, function($, doT) {
"use strict";

@@js

}));