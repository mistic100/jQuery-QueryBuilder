/**
 * Destroy the plugin
 */
QueryBuilder.prototype.destroy = function() {
    this.trigger('beforeDestroy');

    if (this.status.generatedId) {
        this.$el.removeAttr('id');
    }
    
    this.clear();

    this.$el
        .off('click.queryBuilder change.queryBuilder')
        .removeClass('query-builder')
        .removeData('queryBuilder');
};

/**
 * Reset the plugin
 */
QueryBuilder.prototype.reset = function() {
    this.status.group_id = 1;
    this.status.rule_id = 0;

    this.model.empty();
    this.$el.find('>.rules-group-container>.rules-group-body>.rules-list').empty();

    this.addRule(this.$el.find('>.rules-group-container'));

    this.trigger('afterReset');
};

/**
 * Clear the plugin
 */
QueryBuilder.prototype.clear = function() {
    this.status.group_id = 0;
    this.status.rule_id = 0;

    if (this.model) {
        this.model.drop();
        this.model = null;
    }

    this.$el.empty();

    this.trigger('afterClear');
};

/**
 * Get an object representing current rules
 * @return {object}
 */
QueryBuilder.prototype.getRules = function() {
    this.clearErrors();

    var $group = this.$el.find('>.rules-group-container'),
        that = this;

    var rules = (function parse($group) {
        var out = {},
            $elements = $group.find('>.rules-group-body>.rules-list>*');

        out.condition = that.getGroupCondition($group);
        out.rules = [];

        for (var i=0, l=$elements.length; i<l; i++) {
            var $rule = $elements.eq(i),
                rule;

            if ($rule.hasClass('rule-container')) {
                var filter = that.getRuleFilter($rule);

                if (!filter) {
                    that.triggerValidationError(['no_filter'], $rule, null, null, null);
                    return {};
                }

                var operator = that.getRuleOperator($rule),
                    value = null;

                if (operator.accept_values !== 0) {
                    value = that.getRuleValue($rule, filter, operator);

                    var valid = that.validateValue($rule, value, filter, operator);
                    if (valid !== true) {
                        that.triggerValidationError(valid, $rule, value, filter, operator);
                        return {};
                    }
                }

                rule = {
                    id: filter.id,
                    field: filter.field,
                    type: filter.type,
                    input: filter.input,
                    operator: operator.type,
                    value: value
                };

                out.rules.push(rule);
            }
            else {
                rule = parse($rule);
                if (!$.isEmptyObject(rule)) {
                    out.rules.push(rule);
                }
                else {
                    return {};
                }
            }
        }

        if (out.rules.length === 0 && (!that.settings.allow_empty || !$group.data(Node.DATAKEY).isRoot())) {
            that.triggerValidationError(['empty_group'], $group, null, null, null);
            return {};
        }

        return out;
    }($group));

    return this.change('getRules', rules);
};

/**
 * Set rules from object
 * @param data {object}
 */
QueryBuilder.prototype.setRules = function(data) {
    this.clear();

    if (!data || !data.rules || (data.rules.length===0 && !this.settings.allow_empty)) {
        $.error('Incorrect data object passed');
    }

    data = this.change('setRules', data);

    var $container = this.$el,
        that = this;

    (function add(data, $container){
        var $group = that.addGroup($container, false);
        if ($group === null) {
            return;
        }

        if (data.condition === undefined) {
            data.condition = that.settings.default_condition;
        }

        that.updateGroupCondition($group, data.condition.toUpperCase());

        $.each(data.rules, function(i, rule) {
            if (rule.rules && rule.rules.length>0) {
                if (that.settings.allow_groups !== -1 && that.settings.allow_groups < $group.data(Node.DATAKEY).level) {
                    that.reset();
                    $.error(fmt('No more than {0} groups are allowed', that.settings.allow_groups));
                }
                else {
                    add(rule, $group);
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

                var $rule = that.addRule($group);
                if ($rule === null) {
                    return;
                }

                var filter = that.getFilterById(rule.id),
                    operator = that.getOperatorByType(rule.operator);

                $rule.find('.rule-filter-container [name$=_filter]').val(rule.id).trigger('change');
                $rule.find('.rule-operator-container [name$=_operator]').val(rule.operator).trigger('change');

                if (operator.accept_values !== 0) {
                    that.setRuleValue($rule, rule.value, filter, operator);
                }

                that.applyRuleFlags($rule, rule);
            }
        });

    }(data, $container));
};