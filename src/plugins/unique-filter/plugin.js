/*!
 * jQuery QueryBuilder Unique Filter
 * Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
 */

QueryBuilder.define('unique-filter', function() {
    this.status.used_filters = {};

    this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
    this.on('afterDeleteRule', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters', this.applyDisabledFilters);
    this.on('afterReset', this.clearDisabledFilters);
    this.on('afterClear', this.clearDisabledFilters);
});

QueryBuilder.extend({
    updateDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        if (!self.model) {
            return;
        }

        // get used filters
        (function walk(group) {
            group.each(function(rule) {
                if (rule.filter && rule.filter.unique) {
                    if (!self.status.used_filters[rule.filter.id]) {
                        self.status.used_filters[rule.filter.id] = [];
                    }
                    if (rule.filter.unique == 'group') {
                        self.status.used_filters[rule.filter.id].push(rule.parent);
                    }
                }
            }, function(group) {
                walk(group);
            });
        }(self.model.root));

        self.applyDisabledFilters(e);
    },

    clearDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        self.applyDisabledFilters(e);
    },

    applyDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        // re-enable everything
        self.$el.find(Selectors.filter_container + ' option').prop('disabled', false);

        // disable some
        $.each(self.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                self.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
            }
            else {
                groups.forEach(function(group) {
                    group.each(function(rule) {
                        rule.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
                    });
                });
            }
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(Selectors.rule_filter).selectpicker('render');
        }
    }
});
