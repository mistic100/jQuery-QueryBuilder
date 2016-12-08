/*!
 * jQuery QueryBuilder Unique Filter
 * Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
 */

QueryBuilder.define('unique-filter', function() {
    this.status.used_filters = {};
    this.status.used_filters_by_section = {};

    this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
    this.on('afterDeleteRule', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters', this.applyDisabledFilters);
    this.on('afterReset', this.clearDisabledFilters);
    this.on('afterClear', this.clearDisabledFilters);

    /**
     * Ensure that the default filter is not already used if unique
     * @throws UniqueFilterError
     */
    this.on('getDefaultFilter.filter', function(e, model) {
        var self = e.builder;

        self.updateDisabledFilters();

        var used = [];
        var available = [];
        if (model.section_type_id === undefined) {
            used = self.status.used_filters;
            available = self.filters;
        }
        else {
            var s = self.getSectionById(model.section_type_id);
            if (s === undefined) {
                Utils.error('UniqueFilter', 'Unknown section "${0}"', model.section_type_id);
                e.value = undefined;
                return;
            }
            if (self.status.used_filters_by_section[s.id] === undefined) {
                self.status.used_filters_by_section[s.id] = {};
            }
            used = self.status.used_filters_by_section[s.id];
            available = s.filters;
        }

        if (e.value.id in used) {
            var found = available.some(function(filter) {
                if (!(filter.id in used) || used[filter.id].length > 0 && used[filter.id].indexOf(model.parent) === -1) {
                    e.value = filter;
                    return true;
                }
            });

            if (!found) {
                Utils.error('UniqueFilter', 'No more non-unique filters available');
                e.value = undefined;
            }
        }
    });
});

QueryBuilder.extend({
    /**
     * Update the list of used filters
     * @param [e]
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
                    if (rule.section_type_id) {
                        if (!self.status.used_filters_by_section[rule.section_type_id]) {
                            self.status.used_filters_by_section[rule.section_type_id] = {};
                        }
                        if (!self.status.used_filters_by_section[rule.section_type_id][rule.filter.id]) {
                            self.status.used_filters_by_section[rule.section_type_id][rule.filter.id] = [];
                        }
                        if (rule.filter.unique == 'group') {
                            self.status.used_filters_by_section[rule.section_type_id][rule.filter.id].push(rule.parent);
                        }
                    }
                    else {
                        if (!self.status.used_filters[rule.filter.id]) {
                            self.status.used_filters[rule.filter.id] = [];
                        }
                        if (rule.filter.unique == 'group') {
                            self.status.used_filters[rule.filter.id].push(rule.parent);
                        }
                    }
                }
            }, function(group) {
                walk(group);
            }, function(section) {
                if (section.group) {
                    walk(section.group);
                }
            });
        }(self.model.root));

        self.applyDisabledFilters(e);
    },

    /**
     * Clear the list of used filters
     * @param [e]
     */
    clearDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};
        self.status.used_filters_by_section = {};

        self.applyDisabledFilters(e);
    },

    /**
     * Disabled filters depending on the list of used ones
     * @param [e]
     */
    applyDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        // re-enable everything
        self.$el.find(Selectors.filter_container + ' option').prop('disabled', false);

        // disable some
        var disableSome = function(filterId, groups) {
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
        };
        $.each(self.status.used_filters, disableSome);
        $.each(self.status.used_filters_by_section, function(section_id, filters) {
            $.each(filters, disableSome);
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(Selectors.rule_filter).selectpicker('render');
        }
    }
});
