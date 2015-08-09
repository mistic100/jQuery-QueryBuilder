/*!
 * jQuery QueryBuilder Change Filters
 * Allows to change available filters after plugin initialization.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

QueryBuilder.extend({
    /**
     * Change the filters of the builder
     * @param {boolean,optional} delete rules using old filters
     * @param {object[]} new filters
     */
    setFilters: function(delete_orphans, filters) {
        var that = this;

        if (filters === undefined) {
            filters = delete_orphans;
            delete_orphans = false;
        }

        filters = this.checkFilters(filters);

        var filtersIds = filters.map(function(filter) {
            return filter.id;
        });

        // check for orphans
        if (!delete_orphans) {
            (function checkOrphans(node) {
                node.each(
                  function(rule) {
                      if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                          Utils.error('A rule is using filter "{0}"', rule.filter.id);
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
                      that.createRuleFilters(rule);

                      rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');
                  }
              },
              updateBuilder
            );
        }(this.model.root));

        // update plugins
        if (that.settings.plugins) {
            if (that.settings.plugins['unique-filter']) {
                this.updateDisabledFilters();
            }
            else if (this.settings.plugins['bt-selectpicker']) {
                this.$el.find(Selectors.rule_filter).selectpicker('render');
            }
        }
    },

    /**
     * Adds a new filter to the builder
     * @param {object} the new filter
     * @param {mixed,optional} numeric index or '#start' or '#end'
     */
    addFilter: function(filter, position) {
        if (position === undefined || position == '#end') {
            position = this.filters.length;
        }
        else if (position == '#start') {
            position = 0;
        }

        var filters = $.extend(true, [], this.filters);

        // numeric position
        if (parseInt(position) == position) {
            filters.splice(position, 0, filter);
        }
        else {
            // after filter by its id
            if (this.filters.some(function(filter, index) {
                if (filter.id == position) {
                    position = index+1;
                    return true;
                }
            })) {
                filters.splice(position, 0, filter);
            }
            // defaults to end of list
            else {
                filters.push(filter);
            }
        }

        this.setFilters(filters);
    },

    /**
     * Removes a filters the builder
     * @param {string} the filter id
     * @param {boolean,optional} delete rules using old filters
     */
    removeFilter: function(filter_id, delete_orphans) {
        var filters = $.extend(true, [], this.filters);

        filters = filters.filter(function(filter) {
            return filter.id != filter_id;
        });

        this.setFilters(delete_orphans, filters);
    }
});