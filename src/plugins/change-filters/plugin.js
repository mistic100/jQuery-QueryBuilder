/**
 * Allows to change available filters after plugin initialization.
 * @class ChangeFiltersPlugin
 */
QueryBuilder.extend(/** @lends ChangeFiltersPlugin.prototype */ {
    /**
     * Change the filters of the builder
     * @param {boolean} [deleteOrphans=false] - delete rules using old filters
     * @param {object[]} filters
     * @fires ChangeFiltersPlugin#afterSetFilters
     * @throws ChangeFilterError
     */
    setFilters: function(deleteOrphans, filters) {
        var self = this;

        if (filters === undefined) {
            filters = deleteOrphans;
            deleteOrphans = false;
        }

        filters = this.checkFilters(filters);

        /**
         * @event ChangeFiltersPlugin#filter:setFilters
         * @param {object[]} filters
         * @returns {object[]}
         */
        filters = this.change('setFilters', filters);

        var filtersIds = filters.map(function(filter) {
            return filter.id;
        });

        // check for orphans
        if (!deleteOrphans) {
            (function checkOrphans(node) {
                node.each(
                    function(rule) {
                        if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                            Utils.error('ChangeFilter', 'A rule is using filter "{0}"', rule.filter.id);
                        }
                    },
                    checkOrphans
                );
            }(this.model.root));
        }

        // replace filters
        this.filters = filters;

        // apply on existing DOM
        (function updateBuilder(node) {
            node.each(true,
                function(rule) {
                    if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                        rule.drop();
                    }
                    else {
                        self.createRuleFilters(rule);

                        rule.$el.find(QueryBuilder.selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');
                        self.trigger('afterUpdateRuleFilter', rule);
                    }
                },
                updateBuilder
            );
        }(this.model.root));

        // update plugins
        if (this.settings.plugins) {
            if (this.settings.plugins['unique-filter']) {
                this.updateDisabledFilters();
            }
            if (this.settings.plugins['bt-selectpicker']) {
                this.$el.find(QueryBuilder.selectors.rule_filter).selectpicker('render');
            }
        }

        // reset the default_filter if does not exist anymore
        if (this.settings.default_filter) {
            try {
                this.getFilterById(this.settings.default_filter);
            }
            catch (e) {
                this.settings.default_filter = null;
            }
        }

        /**
         * @event ChangeFiltersPlugin#afterSetFilters
         * @param {object[]} filters
         */
        this.trigger('afterSetFilters', filters);
    },

    /**
     * Adds a new filter to the builder
     * @param {object|object[]} newFilters
     * @param {*} [position=#end] - numeric index or '#start' or '#end'
     * @fires ChangeFiltersPlugin#afterSetFilters
     * @throws ChangeFilterError
     */
    addFilter: function(newFilters, position) {
        if (position === undefined || position == '#end') {
            position = this.filters.length;
        }
        else if (position == '#start') {
            position = 0;
        }

        if (!$.isArray(newFilters)) {
            newFilters = [newFilters];
        }

        var filters = $.extend(true, [], this.filters);

        // numeric position
        if (parseInt(position) == position) {
            Array.prototype.splice.apply(filters, [position, 0].concat(newFilters));
        }
        else {
            // after filter by its id
            if (this.filters.some(function(filter, index) {
                    if (filter.id == position) {
                        position = index + 1;
                        return true;
                    }
                })
            ) {
                Array.prototype.splice.apply(filters, [position, 0].concat(newFilters));
            }
            // defaults to end of list
            else {
                Array.prototype.push.apply(filters, newFilters);
            }
        }

        this.setFilters(filters);
    },

    /**
     * Removes a filter from the builder
     * @param {string|string[]} filterIds
     * @param {boolean} [deleteOrphans=false] delete rules using old filters
     * @fires ChangeFiltersPlugin#afterSetFilters
     * @throws ChangeFilterError
     */
    removeFilter: function(filterIds, deleteOrphans) {
        var filters = $.extend(true, [], this.filters);
        if (typeof filterIds === 'string') {
            filterIds = [filterIds];
        }

        filters = filters.filter(function(filter) {
            return filterIds.indexOf(filter.id) === -1;
        });

        this.setFilters(deleteOrphans, filters);
    }
});
