/**
 * @class UniqueFilter
 * @memberof module:plugins
 * @description Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
 */
QueryBuilder.define('unique-filter', function() {
    this.status.used_filters = {};

    this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
    this.on('afterDeleteRule', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters', this.applyDisabledFilters);
    this.on('afterReset', this.clearDisabledFilters);
    this.on('afterClear', this.clearDisabledFilters);

    // Ensure that the default filter is not already used if unique
    this.on('getDefaultFilter.filter', function(e, model) {
        var self = e.builder;

        self.updateDisabledFilters();

        if (e.value.id in self.status.used_filters) {
            var found = self.filters.some(function(filter) {
                if (!(filter.id in self.status.used_filters) || self.status.used_filters[filter.id].length > 0 && self.status.used_filters[filter.id].indexOf(model.parent) === -1) {
                    e.value = filter;
                    return true;
                }
            });

            if (!found) {
                Utils.error(false, 'UniqueFilter', 'No more non-unique filters available');
                e.value = undefined;
            }
        }
    });
});

QueryBuilder.extend(/** @lends module:plugins.UniqueFilter.prototype */ {
    /**
     * Updates the list of used filters
     * @param {$.Event} [e]
     * @private
     */
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

    /**
     * Clear the list of used filters
     * @param {$.Event} [e]
     * @private
     */
    clearDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        self.applyDisabledFilters(e);
    },

    /**
     * Disabled filters depending on the list of used ones
     * @param {$.Event} [e]
     * @private
     */
    applyDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        // re-enable everything
        self.$el.find(QueryBuilder.selectors.filter_container + ' option').prop('disabled', false);

        // disable some
        $.each(self.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                self.$el.find(QueryBuilder.selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
            }
            else {
                groups.forEach(function(group) {
                    group.each(function(rule) {
                        rule.$el.find(QueryBuilder.selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
                    });
                });
            }
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(QueryBuilder.selectors.rule_filter).selectpicker('render');
        }
    }
});
