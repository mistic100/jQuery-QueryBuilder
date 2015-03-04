/**
 * Destroy the plugin
 */
QueryBuilder.prototype.destroy = function() {
    this.trigger('beforeDestroy');

    if (this.status.generated_id) {
        this.$el.removeAttr('id');
    }

    this.clear();

    this.$el
        .off('.queryBuilder')
        .removeClass('query-builder')
        .removeData('queryBuilder');
};

/**
 * Reset the plugin
 */
QueryBuilder.prototype.reset = function() {
    this.status.group_id = 1;
    this.status.rule_id = 0;

    this.model.root.empty();
    //this.$el.find('>.rules-group-container>.rules-group-body>.rules-list').empty();

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
 * Get an object representing current rules
 * @return {object}
 */
QueryBuilder.prototype.getRules = function() {
    this.clearErrors();

    var that = this;

    var data = (function parse(group) {
        var out = {
            condition: group.condition,
            rules: []
        };

        var done = group.each(function(rule) {
            if (!rule.filter) {
                that.triggerValidationError(rule, 'no_filter', null);
                return false;
            }

            var value = null;

            if (rule.operator.accept_values !== 0) {
                value = that.getRuleValue(rule);

                var valid = that.validateValue(rule, value);
                if (valid !== true) {
                    that.triggerValidationError(rule, valid, value);
                    return false;
                }
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
            var data = parse(group);
            if (!$.isEmptyObject(data)) {
                out.rules.push(data);
            }
            else {
                return false;
            }
        });

        if (!done) {
            out = {};
        }
        else if (out.rules.length === 0 && (!that.settings.allow_empty || !group.isRoot())) {
            that.triggerValidationError(group, 'empty_group', null);
            out = {};
        }

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
        $.error('Incorrect data object passed');
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
        group.condition = data.condition.toUpperCase();

        $.each(data.rules, function(i, rule) {
            var model;
            if (rule.rules && rule.rules.length>0) {
                if (that.settings.allow_groups !== -1 && that.settings.allow_groups < group.level) {
                    that.reset();
                    $.error(fmt('No more than {0} groups are allowed', that.settings.allow_groups));
                }
                else {
                    model = that.addGroup(group, false);
                    add(rule, model);
                }
            }
            else {
                if (rule.id === undefined) {
                    $.error('Missing rule field id');
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

                model.filter = that.getFilterById(rule.id),
                model.operator = that.getOperatorByType(rule.operator);
                model.flags = that.parseRuleFlags(rule);

                if (model.operator.accept_values !== 0) {
                    that.setRuleValue(model, rule.value);
                }
            }
        });

    }(data, this.model.root));
};