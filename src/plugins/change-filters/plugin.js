/*!
 * jQuery QueryBuilder Change Filters
 * Allows to change available filters after plugin initialization.
 */

QueryBuilder.extend({
    /**
     * Change the filters of the builder
     * @throws ChangeFilterError
     * @param {boolean,optional} delete rules using old filters
     * @param {object[]} new filters
     * @param {string,optional} set these new filters for a particular section
     */
    setFilters: function(delete_orphans, filters, section_id) {
        var self = this;

        if (Object.prototype.toString.call(delete_orphans) === '[object Array]') {
            section_id = filters;
            filters = delete_orphans;
            delete_orphans = false;
        }

        filters = this.checkFilters(filters, section_id);
        filters = this.change('setFilters', filters, section_id);

        var filtersIds = filters.map(function(filter) {
            return filter.id;
        });

        // check for orphans
        if (!delete_orphans) {
            (function checkOrphans(node) {
                node.each(
                    function(rule) {
                        if (section_id !== rule.section_type_id) {
                            // ignore
                        }
                        else if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                            Utils.error('ChangeFilter', 'A rule is using filter "{0}"', rule.filter.id);
                        }
                    },
                    checkOrphans
                );
            }(this.model.root));
        }

        // replace filters
        if (section_id === undefined) {
            this.filters = filters;
        }
        else {
            var found = false;
            for (var i = 0; i < this.sections.length; i++) {
                if (this.sections[i].id === section_id) {
                    this.sections[i].filters = filters;
                    found = true;
                }
            }
            if (!found) {
                Utils.error('ChangeFilter', 'Unknown section "{0}"', section_id);
            }
        }

        // apply on existing DOM
        (function updateBuilder(node) {
            node.each(true,
              function(rule) {
                  if (section_id !== rule.section_type_id) {
                      // ignore
                  }
                  else if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                      rule.drop();
                  }
                  else {
                      self.createRuleFilters(rule);

                      rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');
                      self.trigger('afterUpdateRuleFilter', rule);
                  }
              },
              updateBuilder,
              function(section) {
                  if (section.group) {
                      updateBuilder(section.group);
                  }
              }
            );
        }(this.model.root));

        // update plugins
        if (this.settings.plugins) {
            if (this.settings.plugins['unique-filter']) {
                this.updateDisabledFilters();
            }
            if (this.settings.plugins['bt-selectpicker']) {
                this.$el.find(Selectors.rule_filter).selectpicker('render');
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

        this.trigger('afterSetFilters', filters, section_id);
    },

    /**
     * Adds a new filter to the builder
     * @param {object|object[]} the new filter
     * @param {mixed,optional} numeric index or '#start' or '#end'
     * @param {string,optional} add these new filters for a particular section
     */
    addFilter: function(new_filters, position, section_id) {
        if (position === undefined || position == '#end') {
            position = this.filters.length;
        }
        else if (position == '#start') {
            position = 0;
        }

        if (!$.isArray(new_filters)) {
            new_filters = [new_filters];
        }

        var filters = [];
        if (section_id === undefined) {
            filters = $.extend(true, [], this.filters);
        }
        else {
            var found = false;
            for (var i = 0; i < this.sections.length; i++) {
                if (this.sections[i].id === section_id) {
                    filters = $.extend(true, [], this.sections[i].filters);
                    found = true;
                }
            }
            if (!found) {
                Utils.error('ChangeFilter', 'Unknown section "{0}"', section_id);
            }
        }

        // numeric position
        if (parseInt(position) == position) {
            Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
        }
        else {
            // after filter by its id
            if (filters.some(function(filter, index) {
                if (filter.id == position) {
                    position = index + 1;
                    return true;
                }
            })) {
                Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
            }
            // defaults to end of list
            else {
                Array.prototype.push.apply(filters, new_filters);
            }
        }

        this.setFilters(filters, section_id);
    },

    /**
     * Removes a filter from the builder
     * @param {string|string[]} the filter id
     * @param {boolean,optional} delete rules using old filters
     * @param {string,optional} remove these filters from a particular section
     */
    removeFilter: function(filter_ids, delete_orphans, section_id) {
        var filters = [];
        if (section_id === undefined) {
            filters = $.extend(true, [], this.filters);
        }
        else {
            var found = false;
            for (var i = 0; i < this.sections.length; i++) {
                if (this.sections[i].id === section_id) {
                    filters = $.extend(true, [], this.sections[i].filters);
                    found = true;
                }
            }
            if (!found) {
                Utils.error('ChangeFilter', 'Unknown section "{0}"', section_id);
            }
        }

        if (typeof filter_ids === 'string') {
            filter_ids = [filter_ids];
        }

        filters = filters.filter(function(filter) {
            return filter_ids.indexOf(filter.id) === -1;
        });

        this.setFilters(delete_orphans, filters, section_id);
    }
});
