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
    // use jQuery utils to filter options keys
    $.makeArray($(Object.keys(options)).filter(QueryBuilder.modifiable_options))
        .forEach(function(opt) {
            this.settings[opt] = options[opt];
        }, this);
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

    var that = this;

    var valid = (function parse(group) {
        var done = 0, errors = 0;

        group.each(function(rule) {
            if (!rule.filter) {
                that.triggerValidationError(rule, 'no_filter', null);
                errors++;
                return;
            }

            if (rule.operator.nb_inputs !== 0) {
                var valid = that.validateValue(rule, rule.value);

                if (valid !== true) {
                    that.triggerValidationError(rule, valid, rule.value);
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
        else if (done === 0 && (!that.settings.allow_empty || !group.isRoot())) {
            that.triggerValidationError(group, 'empty_group', null);
            return false;
        }

        return true;

    }(this.model.root));

    return this.change('validate', valid);
};

/**
 * Get an object representing current rules
 * @return {object}
 */
QueryBuilder.prototype.getRules = function() {
    if (!this.validate()) {
        return {};
    }

    var that = this;

    var out = (function parse(group) {
        var data = {
            condition: group.condition,
            rules: []
        };

        if (group.data) {
            data.data = $.extendext(true, 'replace', {}, group.data);
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

    if (!data || !data.rules || (data.rules.length===0 && !this.settings.allow_empty)) {
        Utils.error('RulesParse', 'Incorrect data object passed');
    }

    this.clear();
    this.setRoot(false, data.data);
    
    this.model.root.flags = this.parseGroupFlags(data);

    data = this.change('setRules', data);

    var that = this;

    (function add(data, group){
        if (group === null) {
            return;
        }

        if (data.condition === undefined) {
            data.condition = that.settings.default_condition;
        }
        else if (that.settings.conditions.indexOf(data.condition) == -1) {
            Utils.error('UndefinedCondition', 'Invalid condition "{0}"', data.condition);
        }

        group.condition = data.condition;

        data.rules.forEach(function(item) {
            var model;
            if (item.rules && item.rules.length>0) {
                if (that.settings.allow_groups != -1 && that.settings.allow_groups < group.level) {
                    that.reset();
                    Utils.error('RulesParse', 'No more than {0} groups are allowed', that.settings.allow_groups);
                }
                else {
                    model = that.addGroup(group, false, item.data);
                    if (model === null) {
                        return;
                    }
                    
                    model.flags = that.parseGroupFlags(item);
                    
                    add(item, model);
                }
            }
            else {
                if (item.id === undefined) {
                    Utils.error('RulesParse', 'Missing rule field id');
                }
                if (item.operator === undefined) {
                    item.operator = 'equal';
                }

                model = that.addRule(group, item.data);
                if (model === null) {
                    return;
                }

                model.filter = that.getFilterById(item.id);
                model.operator = that.getOperatorByType(item.operator);
                model.flags = that.parseRuleFlags(item);

                if (model.operator.nb_inputs !== 0 && item.value !== undefined) {
                    model.value = item.value;
                }
            }
        });

    }(data, this.model.root));
};