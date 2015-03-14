QueryBuilder.define('bt-tooltip-errors', function(options) {
    if (!$.fn.tooltip || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.prototype.fixTitle) {
        error('Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
    }

    // add BT Tooltip data
    this.on('getRuleTemplate', function(h) {
        return h.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
    });

    this.on('getGroupTemplate', function(h) {
        return h.replace('class="error-container"', 'class="error-container" data-toggle="tooltip"');
    });

    // init/refresh tooltip when title changes
    this.on('validationError', function(node) {
        node.$el.find('.error-container').eq(0)
          .tooltip(options)
          .tooltip('hide')
          .tooltip('fixTitle');
    });
}, {
    placement: 'right'
});