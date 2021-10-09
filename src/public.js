/**
 * Destroys the builder
 * @fires QueryBuilder.beforeDestroy
 */
QueryBuilder.prototype.destroy = function() {
    /**
     * Before the {@link QueryBuilder#destroy} method
     * @event beforeDestroy
     * @memberof QueryBuilder
     */
    this.trigger('beforeDestroy');

    if (this.status.generated_id) {
        this.$el.removeAttr('id');
    }

    this.clear();
    this.model = null;

    this.$el
        .off('.queryBuilder')
        .removeClass('query-builder')
        .removeData('queryBuilder');

    delete this.$el[0].queryBuilder;
};

/**
 * Clear all rules and resets the root group
 * @fires QueryBuilder.beforeReset
 * @fires QueryBuilder.afterReset
 */
QueryBuilder.prototype.reset = function() {
    /**
     * Before the {@link QueryBuilder#reset} method, can be prevented
     * @event beforeReset
     * @memberof QueryBuilder
     */
    var e = this.trigger('beforeReset');
    if (e.isDefaultPrevented()) {
        return;
    }

    this.status.group_id = 1;
    this.status.rule_id = 0;

    this.model.root.empty();

    this.model.root.data = undefined;
    this.model.root.flags = $.extend({}, this.settings.default_group_flags);
    this.model.root.condition = this.settings.default_condition;

    this.addRule(this.model.root);

    /**
     * After the {@link QueryBuilder#reset} method
     * @event afterReset
     * @memberof QueryBuilder
     */
    this.trigger('afterReset');

    this.trigger('rulesChanged');
};

/**
 * Clears all rules and removes the root group
 * @fires QueryBuilder.beforeClear
 * @fires QueryBuilder.afterClear
 */
QueryBuilder.prototype.clear = function() {
    /**
     * Before the {@link QueryBuilder#clear} method, can be prevented
     * @event beforeClear
     * @memberof QueryBuilder
     */
    var e = this.trigger('beforeClear');
    if (e.isDefaultPrevented()) {
        return;
    }

    this.status.group_id = 0;
    this.status.rule_id = 0;

    if (this.model.root) {
        this.model.root.drop();
        this.model.root = null;
    }

    /**
     * After the {@link QueryBuilder#clear} method
     * @event afterClear
     * @memberof QueryBuilder
     */
    this.trigger('afterClear');

    this.trigger('rulesChanged');
};

/**
 * Modifies the builder configuration.<br>
 * Only options defined in QueryBuilder.modifiable_options are modifiable
 * @param {object} options
 */
QueryBuilder.prototype.setOptions = function(options) {
    $.each(options, function(opt, value) {
        if (QueryBuilder.modifiable_options.indexOf(opt) !== -1) {
            this.settings[opt] = value;
        }
    }.bind(this));
};

/**
 * Returns the model associated to a DOM object, or the root model
 * @param {jQuery} [target]
 * @returns {Node}
 */
QueryBuilder.prototype.getModel = function(target) {
    if (!target) {
        return this.model.root;
    }
    else if (target instanceof Node) {
        return target;
    }
    else {
        return $(target).data('queryBuilderModel');
    }
};

/**
 * Validates the whole builder
 * @param {object} [options]
 * @param {boolean} [options.skip_empty=false] - skips validating rules that have no filter selected
 * @returns {boolean}
 * @fires QueryBuilder.changer:validate
 */
QueryBuilder.prototype.validate = function(options) {
    options = $.extend({
        skip_empty: false
    }, options);

    this.clearErrors();

    var self = this;

    var valid = (function parse(group) {
        var done = 0;
        var errors = 0;

        group.each(function(rule) {
            if (!rule.filter && options.skip_empty) {
                return;
            }

            if (!rule.filter) {
                self.triggerValidationError(rule, 'no_filter', null);
                errors++;
                return;
            }

            if (!rule.operator) {
                self.triggerValidationError(rule, 'no_operator', null);
                errors++;
                return;
            }

            if (rule.operator.nb_inputs !== 0) {
                var valid = self.validateValue(rule, rule.value);

                if (valid !== true) {
                    self.triggerValidationError(rule, valid, rule.value);
                    errors++;
                    return;
                }
            }

            done++;

        }, function(group) {
            var res = parse(group);
            if (res === true) {
                done++;
            }
            else if (res === false) {
                errors++;
            }
        });

        if (errors > 0) {
            return false;
        }
        else if (done === 0 && !group.isRoot() && options.skip_empty) {
            return null;
        }
        else if (done === 0 && (!self.settings.allow_empty || !group.isRoot())) {
            self.triggerValidationError(group, 'empty_group', null);
            return false;
        }

        return true;

    }(this.model.root));

    /**
     * Modifies the result of the {@link QueryBuilder#validate} method
     * @event changer:validate
     * @memberof QueryBuilder
     * @param {boolean} valid
     * @returns {boolean}
     */
    return this.change('validate', valid);
};

/**
 * Gets an object representing current rules
 * @param {object} [options]
 * @param {boolean|string} [options.get_flags=false] - export flags, true: only changes from default flags or 'all'
 * @param {boolean} [options.allow_invalid=false] - returns rules even if they are invalid
 * @param {boolean} [options.skip_empty=false] - remove rules that have no filter selected
 * @returns {object}
 * @fires QueryBuilder.changer:ruleToJson
 * @fires QueryBuilder.changer:groupToJson
 * @fires QueryBuilder.changer:getRules
 */
QueryBuilder.prototype.getRules = function(options) {
    options = $.extend({
        get_flags: false,
        allow_invalid: false,
        skip_empty: false
    }, options);

    var valid = this.validate(options);
    if (!valid && !options.allow_invalid) {
        return null;
    }

    var self = this;

    var out = (function parse(group) {
        var groupData = {
            condition: group.condition,
            rules: []
        };

        if (group.data) {
            groupData.data = $.extendext(true, 'replace', {}, group.data);
        }

        if (options.get_flags) {
            var flags = self.getGroupFlags(group.flags, options.get_flags === 'all');
            if (!$.isEmptyObject(flags)) {
                groupData.flags = flags;
            }
        }

        group.each(function(rule) {
            if (!rule.filter && options.skip_empty) {
                return;
            }

            var value = null;
            if (!rule.operator || rule.operator.nb_inputs !== 0) {
                value = rule.value;
            }

            var ruleData = {
                id: rule.filter ? rule.filter.id : null,
                field: rule.filter ? rule.filter.field : null,
                type: rule.filter ? rule.filter.type : null,
                input: rule.filter ? rule.filter.input : null,
                operator: rule.operator ? rule.operator.type : null,
                value: value
            };

            if (rule.filter && rule.filter.data || rule.data) {
                ruleData.data = $.extendext(true, 'replace', {}, rule.filter ? rule.filter.data : {}, rule.data);
            }

            if (options.get_flags) {
                var flags = self.getRuleFlags(rule.flags, options.get_flags === 'all');
                if (!$.isEmptyObject(flags)) {
                    ruleData.flags = flags;
                }
            }

            /**
             * Modifies the JSON generated from a Rule object
             * @event changer:ruleToJson
             * @memberof QueryBuilder
             * @param {object} json
             * @param {Rule} rule
             * @returns {object}
             */
            groupData.rules.push(self.change('ruleToJson', ruleData, rule));

        }, function(model) {
            var data = parse(model);
            if (data.rules.length !== 0 || !options.skip_empty) {
                groupData.rules.push(data);
            }
        }, this);

        /**
         * Modifies the JSON generated from a Group object
         * @event changer:groupToJson
         * @memberof QueryBuilder
         * @param {object} json
         * @param {Group} group
         * @returns {object}
         */
        return self.change('groupToJson', groupData, group);

    }(this.model.root));

    out.valid = valid;

    /**
     * Modifies the result of the {@link QueryBuilder#getRules} method
     * @event changer:getRules
     * @memberof QueryBuilder
     * @param {object} json
     * @returns {object}
     */
    return this.change('getRules', out);
};

/**
 * Sets rules from object
 * @param {object} data
 * @param {object} [options]
 * @param {boolean} [options.allow_invalid=false] - silent-fail if the data are invalid
 * @throws RulesError, UndefinedConditionError
 * @fires QueryBuilder.changer:setRules
 * @fires QueryBuilder.changer:jsonToRule
 * @fires QueryBuilder.changer:jsonToGroup
 * @fires QueryBuilder.afterSetRules
 */
QueryBuilder.prototype.setRules = function(data, options) {
    options = $.extend({
        allow_invalid: false
    }, options);

    if ($.isArray(data)) {
        data = {
            condition: this.settings.default_condition,
            rules: data
        };
    }

    if (!data || !data.rules || (data.rules.length === 0 && !this.settings.allow_empty)) {
        Utils.error('RulesParse', 'Incorrect data object passed');
    }

    this.clear();
    this.setRoot(false, data.data, this.parseGroupFlags(data));

    /**
     * Modifies data before the {@link QueryBuilder#setRules} method
     * @event changer:setRules
     * @memberof QueryBuilder
     * @param {object} json
     * @param {object} options
     * @returns {object}
     */
    data = this.change('setRules', data, options);

    var self = this;

    (function add(data, group) {
        if (group === null) {
            return;
        }

        if (data.condition === undefined) {
            data.condition = self.settings.default_condition;
        }
        else if (self.settings.conditions.indexOf(data.condition) == -1) {
            Utils.error(!options.allow_invalid, 'UndefinedCondition', 'Invalid condition "{0}"', data.condition);
            data.condition = self.settings.default_condition;
        }

        group.condition = data.condition;

        data.rules.forEach(function(item) {
            var model;

            if (item.rules !== undefined) {
                if (self.settings.allow_groups !== -1 && self.settings.allow_groups < group.level) {
                    Utils.error(!options.allow_invalid, 'RulesParse', 'No more than {0} groups are allowed', self.settings.allow_groups);
                    self.reset();
                }
                else {
                    model = self.addGroup(group, false, item.data, self.parseGroupFlags(item));
                    if (model === null) {
                        return;
                    }

                    add(item, model);
                }
            }
            else {
                if (!item.empty) {
                    if (item.id === undefined) {
                        Utils.error(!options.allow_invalid, 'RulesParse', 'Missing rule field id');
                        item.empty = true;
                    }
                    if (item.operator === undefined) {
                        item.operator = 'equal';
                    }
                }

                model = self.addRule(group, item.data, self.parseRuleFlags(item));
                if (model === null) {
                    return;
                }

                if (!item.empty) {
                    model.filter = self.getFilterById(item.id, !options.allow_invalid);
                }

                if (model.filter) {
                    model.operator = self.getOperatorByType(item.operator, !options.allow_invalid);

                    if (!model.operator) {
                        model.operator = self.getOperators(model.filter)[0];
                    }
                }

                if (model.operator && model.operator.nb_inputs !== 0) {
                    if (item.value !== undefined) {
                        model.value = item.value;
                    }
                    else if (model.filter.default_value !== undefined) {
                        model.value = model.filter.default_value;
                    }
                }

                /**
                 * Modifies the Rule object generated from the JSON
                 * @event changer:jsonToRule
                 * @memberof QueryBuilder
                 * @param {Rule} rule
                 * @param {object} json
                 * @returns {Rule} the same rule
                 */
                if (self.change('jsonToRule', model, item) != model) {
                    Utils.error('RulesParse', 'Plugin tried to change rule reference');
                }
            }
        });

        /**
         * Modifies the Group object generated from the JSON
         * @event changer:jsonToGroup
         * @memberof QueryBuilder
         * @param {Group} group
         * @param {object} json
         * @returns {Group} the same group
         */
        if (self.change('jsonToGroup', group, data) != group) {
            Utils.error('RulesParse', 'Plugin tried to change group reference');
        }

    }(data, this.model.root));

    /**
     * After the {@link QueryBuilder#setRules} method
     * @event afterSetRules
     * @memberof QueryBuilder
     */
    this.trigger('afterSetRules');
};
