(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'microevent'], factory);
    }
    else {
        factory(root.jQuery, root.MicroEvent);
    }
}(this, function($, MicroEvent) {
    "use strict";
  
    @@js
}));