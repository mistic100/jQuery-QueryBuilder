/*!
 * jQuery QueryBuilder Unique Filter
 * Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
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
        var that = e ? e.builder : this;

        that.status.used_filters = {};

        if (!that.model) {
            return;
        }

        // get used filters
        (function walk(group) {
            group.each(function(rule) {
                if (rule.filter && rule.filter.unique) {
                    if (!that.status.used_filters[rule.filter.id]) {
                        that.status.used_filters[rule.filter.id] = [];
                    }
                    if (rule.filter.unique == 'group') {
                        that.status.used_filters[rule.filter.id].push(rule.parent);
                    }
                }
            }, function(group) {
                walk(group);
            });
        }(that.model.root));

        that.applyDisabledFilters(e);
    },

    clearDisabledFilters: function(e) {
        var that = e ? e.builder : this;

        that.status.used_filters = {};

        that.applyDisabledFilters(e);
    },

    applyDisabledFilters: function(e) {
        var that = e ? e.builder : this;

        // re-enable everything
        that.$el.find(Selectors.filter_container + ' option').prop('disabled', false);

        // disable some
        $.each(that.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                that.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
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
        if (that.settings.plugins && that.settings.plugins['bt-selectpicker']) {
            that.$el.find(Selectors.rule_filter).selectpicker('render');
        }
    }
});