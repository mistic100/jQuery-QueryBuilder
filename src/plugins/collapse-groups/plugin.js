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

        self.$el.on('change.queryBuilder', '.group-name', function() {
            self.setGroupName($(this));
        });
    });

    // Collapse any groups that were saved as collapsed
    this.on('afterSetRules', function() {
        $.each($(Selectors.group_container), function(i, el) {
            var group = self.getModel($(el));
            if (group.collapsed) {
                self.collapse($(el).find('[data-collapse="group"]'), options);
            }
            if (group.name) {
                $(el).find('.group-name').val(group.name);
            }
        });
    });

    // Modify templates
    this.on('getGroupTemplate.filter', function(h, level) {
        var $h = $(h.value);
        $h.find(Selectors.group_header).append('<button type="button" class="btn btn-xs btn-default" data-collapse="group"><i class="' + options.iconUp + '"></i> ' + self.translate('collapse') + '</button>');
        h.value = $h.prop('outerHTML');
    });
    if (options.namedGroups) {
        this.on('getGroupTemplate.filter', function(h, level) {
            var $h = $(h.value);
            $h.find(Selectors.group_header).append('<input type="text" maxlength="32" class="group-name">');
            h.value = $h.prop('outerHTML');
        });
    }

    // Export "collapse" and "name" to JSON
    this.on('groupToJson.filter', function(e, group) {
        e.value.collapsed = group.collapsed;
        e.value.name = group.name;
    });

    // Import "collapse" and "name" from JSON
    this.on('jsonToGroup.filter', function(e, json) {
        e.value.collapsed = json.collapsed;
        e.value.name = json.name;
    });

}, {
    iconUp: 'glyphicon glyphicon-chevron-up',
    iconDown: 'glyphicon glyphicon-chevron-down',
    namedGroups: true
});

Utils.defineModelProperties(Group, ['name', 'collapsed']);

QueryBuilder.extend({
    /**
     * Collapse a group into it's header
     * @param {jQuery Element} [$el]
     * @param {object} [options] {@link module:plugins.Collapse}
     */
    collapse: function($el, options) {
        var self = this;
        var selectors = QueryBuilder.selectors;
        var $iconEl = $el.find('i');
        var group = self.getModel($el.closest(selectors.group_container));
        group.collapsed = !(!!group.collapsed);

        $el.closest(selectors.group_container).find(selectors.rules_list).slideToggle('fast');
        $iconEl.toggleClass(options.iconUp).toggleClass(options.iconDown);
    },

    /**
     * Save the entered group name on the group object
     * @param {jQuery Element} [$el]
     */
    setGroupName: function($el) {
        var name = $el.val();
        var selectors = QueryBuilder.selectors;
        var group = this.getModel($el.closest(selectors.group_container));
        group.name = name;
    }
});
