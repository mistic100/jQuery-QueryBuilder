/**
 * Destroy the plugin
 */
QueryBuilder.prototype.destroy = function() {
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
 * Reset the plugin
 */
QueryBuilder.prototype.reset = function() {
    this.status.group_id = 1;
    this.status.rule_id = 0;

    this.model.root.empty();

    this.addRule(this.model.root);

    this.trigger('afterReset');
};

/**
 * Clear the plugin
 */
QueryBuilder.prototype.clear = function() {
    this.status.group_id = 0;
    this.status.rule_id = 0;

    if (this.model.root) {
        this.model.root.drop();
        this.model.root = null;
    }

    this.trigger('afterClear');
};

/**
 * Modify the builder configuration
 * Only options defined in QueryBuilder.modifiable_options are modifiable
 * @param {object}
 */
QueryBuilder.prototype.setOptions = function(options) {
    $.each(options, function(opt, value) {
        if (QueryBuilder.modifiable_options.indexOf(opt) !== -1) {
            this.settings[opt] = value;
        }
    }.bind(this));
};

/**
 * Return the model associated to a DOM object, or root model
 * @param {jQuery,optional}
 * @return {Node}
 */
QueryBuilder.prototype.getModel = function(target) {
    return !target ? this.model.root : Model(target);
};

/**
 * Validate the whole builder
 * @return {boolean}
 */
QueryBuilder.prototype.validate = function() {
    this.clearErrors();

    var self = this;

    var valid = (function parse(group) {
        var done = 0;
        var errors = 0;

        group.each(function(rule) {
            if (!rule.filter) {
                self.triggerValidationError(rule, 'no_filter', null);
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
            if (parse(group)) {
                done++;
            }
            else {
                errors++;
            }
        });

        if (errors > 0) {
            return false;
        }
        else if (done === 0 && (!self.settings.allow_empty || !group.isRoot())) {
            self.triggerValidationError(group, 'empty_group', null);
            return false;
        }

        return true;

    }(this.model.root));

    return this.change('validate', valid);
};

/**
 * Get an object representing current rules
 * @param {object} options
 *      - get_flags: false[default] | true(only changes from default flags) | 'all'
 * @return {object}
 */
QueryBuilder.prototype.getRules = function(options) {
    options = $.extend({
        get_flags: false
    }, options);

    if (!this.validate()) {
        return {};
    }

    var self = this;

    var out = (function parse(group) {
        var data = {
            condition: group.condition,
            rules: []
        };

        if (group.data) {
            data.data = $.extendext(true, 'replace', {}, group.data);
        }

        if (options.get_flags) {
            var flags = self.getGroupFlags(group.flags, options.get_flags === 'all');
            if (!$.isEmptyObject(flags)) {
                data.flags = flags;
            }
        }

        group.each(function(model) {
            var value = null;
            if (model.operator.nb_inputs !== 0) {
                value = model.value;
            }

            var rule = {
                id: model.filter.id,
                field: model.filter.field,
                type: model.filter.type,
                input: model.filter.input,
                operator: model.operator.type,
                value: value
            };

            if (model.filter.data || model.data) {
                rule.data = $.extendext(true, 'replace', {}, model.filter.data, model.data);
            }

            if (options.get_flags) {
                var flags = self.getRuleFlags(model.flags, options.get_flags === 'all');
                if (!$.isEmptyObject(flags)) {
                    rule.flags = flags;
                }
            }

            data.rules.push(rule);

        }, function(model) {
            data.rules.push(parse(model));
        });

        return data;

    }(this.model.root));

    return this.change('getRules', out);
};

/**
 * Set rules from object
 * @throws RulesError, UndefinedConditionError
 * @param data {object}
 */
QueryBuilder.prototype.setRules = function(data) {
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

    data = this.change('setRules', data);

    var self = this;

    (function add(data, group) {
        if (group === null) {
            return;
        }

        if (data.condition === undefined) {
            data.condition = self.settings.default_condition;
        }
        else if (self.settings.conditions.indexOf(data.condition) == -1) {
            Utils.error('UndefinedCondition', 'Invalid condition "{0}"', data.condition);
        }

        group.condition = data.condition;

        data.rules.forEach(function(item) {
            var model;

            if (item.rules !== undefined) {
                if (self.settings.allow_groups !== -1 && self.settings.allow_groups < group.level) {
                    self.reset();
                    Utils.error('RulesParse', 'No more than {0} groups are allowed', self.settings.allow_groups);
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
                        Utils.error('RulesParse', 'Missing rule field id');
                    }
                    if (item.operator === undefined) {
                        item.operator = 'equal';
                    }
                }

                model = self.addRule(group, item.data);
                if (model === null) {
                    return;
                }

                if (!item.empty) {
                    model.filter = self.getFilterById(item.id);
                    model.operator = self.getOperatorByType(item.operator);

                    if (model.operator.nb_inputs !== 0 && item.value !== undefined) {
                        model.value = item.value;
                    }
                }

                model.flags = self.parseRuleFlags(item);
            }
        });

    }(data, this.model.root));
};
