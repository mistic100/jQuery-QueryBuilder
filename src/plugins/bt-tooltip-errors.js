/*!
 * jQuery QueryBuilder Bootstrap Tooltip Errors
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";

    $.fn.queryBuilder.define('bt-tooltip-errors', function(options) {
        if (!$.fn.tooltip || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.prototype.fixTitle) {
            $.error('Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
        }
    
        options = $.extend({
            placement: 'right'
        }, options || {});

        // add BT Tooltip data
        this.on('ruleTemplate', function(h) {
            return h.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
        });

        // init/refresh tooltip when title changes
        this.on('validationError', function($target) {
            $target.find('.error-container').eq(0)
              .tooltip(options)
              .tooltip('hide')
              .tooltip('fixTitle');
        });
    });

}(jQuery));