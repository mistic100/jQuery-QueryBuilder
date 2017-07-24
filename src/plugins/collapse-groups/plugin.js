/**
 * @class Collapse Groups
 * @memberof module:plugins
 * @description Allows each rules group to be collapsed.
 * @param {object} [options]
 * @param {string} [options.iconUp='glyphicon glyphicon-chevron-up']
 * @param {string} [options.iconDown='glyphicon glyphicon-chevron-down']
 */
QueryBuilder.define('collapse-groups', function(options) {
    var self = this;
    var Selectors = QueryBuilder.selectors;

    // Bind events
    this.on('afterInit', function() {
        self.$el.on('click.queryBuilder', '[data-collapse=group]', function() {
            var $group = $(this).closest(Selectors.group_container);
            self.collapse($(this), options);
        });
    });

    // Modify templates
    this.on('getGroupTemplate.filter', function(h, level) {
        var $h = $(h.value);
        $h.find(Selectors.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-collapse="group"><i class="' + options.iconUp + '"></i> ' + self.translate('collapse') + '</button>');
        h.value = $h.prop('outerHTML');
    });

}, {
    iconUp: 'glyphicon glyphicon-chevron-up',
    iconDown: 'glyphicon glyphicon-chevron-down'
});

QueryBuilder.extend({
    /**
     * Collapse a group
     * @param {jQuery Element} [$el]
     * @param {object} [options] {@link module:plugins.Collapse}
     */
    collapse: function($el, options) {
        var self = this;
        var selectors = QueryBuilder.selectors;
        var $iconEl = $el.find('i');

        $el.closest(selectors.group_container).find(selectors.rules_list).slideToggle('fast');
        $iconEl.toggleClass(options.iconUp).toggleClass(options.iconDown);
    }
});
