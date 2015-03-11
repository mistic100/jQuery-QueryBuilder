QueryBuilder.define('unique-filter', function(options) {
    this.status.used_filters = {};

    this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
    this.on('afterDeleteRule', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters', this.applyDisabledFilters);
});

QueryBuilder.extend({
    updateDisabledFilters: function() {
        var that = this;
        this.status.used_filters = {};

        if (!this.model) {
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
        }(this.model.root));

        this.applyDisabledFilters();
    },

    applyDisabledFilters: function() {
        var that = this;

        // re-enable everything
        this.$el.find('.rule-filter-container option').prop('disabled', false);

        // disable some
        $.each(this.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                that.$el.find('.rule-filter-container option[value=' + filterId + ']:not(:selected)').prop('disabled', true);
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
        if (this.settings.plugins && this.settings.plugins['bt-selectpicker']) {
            this.$el.find('.rule-filter-container select').selectpicker('render');
        }
    }
});