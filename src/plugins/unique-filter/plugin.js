QueryBuilder.define('unique-filter', function() {
    this.status.used_filters = {};

    this.on('afterUpdateRuleFilter.queryBuilder', this.updateDisabledFilters);
    this.on('afterDeleteRule.queryBuilder', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters.queryBuilder', this.applyDisabledFilters);
});

QueryBuilder.extend({
    updateDisabledFilters: function(e) {
        var self = e.builder;
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

    applyDisabledFilters: function(e) {
        var self = e.builder;

        // re-enable everything
        self.$el.find('.rule-filter-container option').prop('disabled', false);

        // disable some
        $.each(self.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                self.$el.find('.rule-filter-container option[value=' + filterId + ']:not(:selected)').prop('disabled', true);
            }
            else {
                groups.forEach(function(group) {
                    group.each(function(rule) {
                        rule.$el.find('.rule-filter-container option[value=' + filterId + ']:not(:selected)').prop('disabled', true);
                    });
                });
            }
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find('.rule-filter-container select').selectpicker('render');
        }
    }
});