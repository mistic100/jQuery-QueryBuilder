/*!
 * jQuery QueryBuilder Bootstrap Tooltip Errors
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";
    
    $.fn.queryBuilder.constructor.define('bt-tooltip-errors', function(options) {
        options = $.extend({
            placement: 'right'
        }, options || {});
        
        // add BT Tooltip data
        this.on('rule-template', function(h) {
            return h.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
        });
    
        // init/refresh tooltip when title changes
        this.on('rule-error', function($target, error) {
            $target.find('.error-container').eq(0)
              .tooltip(options)
              .tooltip('hide')
              .tooltip('fixTitle');
        });
    });
    
}(jQuery));