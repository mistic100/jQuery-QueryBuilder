(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'uevent', 'jQuery.extendext'], factory);
    }
    else {
        factory(root.jQuery, root.uEvent);
    }
}(this, function($, uEvent) {
    "use strict";

    @@js
}));
