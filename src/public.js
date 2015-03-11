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
                var value = that.getRuleValue(rule),
                    valid = that.validateValue(rule, value);

                if (valid !== true) {
                    that.triggerValidationError(rule, valid, value);
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

    var data = (function parse(group) {
        var out = {
            condition: group.condition,
            rules: []
        };

        group.each(function(rule) {
            var value = null;
            if (rule.operator.nb_inputs !== 0) {
                value = that.getRuleValue(rule);
            }

            out.rules.push({
                id: rule.filter.id,
                field: rule.filter.field,
                type: rule.filter.type,
                input: rule.filter.input,
                operator: rule.operator.type,
                value: value
            });

        }, function(group) {
            out.rules.push(parse(group));
        });

        return out;

    }(this.model.root));

    return this.change('getRules', data);
};

/**
 * Set rules from object
 * @param data {object}
 */
QueryBuilder.prototype.setRules = function(data) {
    this.clear();
    this.setRoot(false);

    if (!data || !data.rules || (data.rules.length===0 && !this.settings.allow_empty)) {
        error('Incorrect data object passed');
    }

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
            error('Invalid condition "{0}"', data.condition);
        }

        group.condition = data.condition.toUpperCase();

        $.each(data.rules, function(i, rule) {
            var model;
            if (rule.rules && rule.rules.length>0) {
                if (that.settings.allow_groups != -1 && that.settings.allow_groups < group.level) {
                    that.reset();
                    error('No more than {0} groups are allowed', that.settings.allow_groups);
                }
                else {
                    model = that.addGroup(group, false);
                    add(rule, model);
                }
            }
            else {
                if (rule.id === undefined) {
                    error('Missing rule field id');
                }
                if (rule.value === undefined) {
                    rule.value = '';
                }
                if (rule.operator === undefined) {
                    rule.operator = 'equal';
                }

                model = that.addRule(group);
                if (model === null) {
                    return;
                }

                model.filter = that.getFilterById(rule.id);
                model.operator = that.getOperatorByType(rule.operator);
                model.flags = that.parseRuleFlags(rule);

                if (model.operator.nb_inputs !== 0) {
                    that.setRuleValue(model, rule.value);
                }
            }
        });

    }(data, this.model.root));
};