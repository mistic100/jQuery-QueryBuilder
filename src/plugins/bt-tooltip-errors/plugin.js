/**
 * @class BtTooltipErrors
 * @memberof module:plugins
 * @description Applies Bootstrap Tooltips on validation error messages.
 * @param {object} [options]
 * @param {string} [options.placement='right']
 * @throws MissingLibraryError
 */
QueryBuilder.define('bt-tooltip-errors', function(options) {
    if (! typeof bootstrap.Tooltip === "function") {
        alert(typeof bootstrap.Tooltip );
        Utils.error('MissingLibrary', 'Bootstrap Popper is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
    }

    var self = this;

    // add BT Tooltip data
    this.on('getRuleTemplate.filter getGroupTemplate.filter', function(h) {
        var $h = $($.parseHTML(h.value));
        $h.find(QueryBuilder.selectors.error_container).attr('data-bs-toggle', 'tooltip');
        h.value = $h.prop('outerHTML');
    });

    // init/refresh tooltip when title changes
    this.model.on('update', function(e, node, field) {
        if (field == 'error' && self.settings.display_errors) {
            node.$el.find(QueryBuilder.selectors.error_container).eq(0)
            .attr('data-bs-original-title',options).attr('data-bs-title',options).tooltip();
        }
    });
}, {
    placement: 'right'
});
