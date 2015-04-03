/*!
 * jQuery QueryBuilder Bootstrap Tooltip errors
 * Applies Bootstrap Tooltips on validation error messages.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

QueryBuilder.define('bt-tooltip-errors', function(options) {
    if (!$.fn.tooltip || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.prototype.fixTitle) {
        error('Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
    }

    var self = this;

    // add BT Tooltip data
    this.on('getRuleTemplate.filter', function(h) {
        h.value = h.value.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
    });

    this.on('getGroupTemplate.filter', function(h) {
        h.value = h.value.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
    });

    // init/refresh tooltip when title changes
    this.model.on('update', function(e, node, field) {
        if (field == 'error' && self.settings.display_errors) {
            node.$el.find('.error-container').eq(0)
              .tooltip(options)
              .tooltip('hide')
              .tooltip('fixTitle');
        }
    });
}, {
    placement: 'right'
});