/*jshint loopfunc:true */

/**
 * Check if a value is correct for a filter
 * @param $rule {jQuery} (<li> element)
 * @param value {string|string[]|undefined}
 * @param filter {object}
 * @param operator {object}
 * @return {array|true}
 */
QueryBuilder.prototype.validateValue = function($rule, value, filter, operator) {
    var validation = filter.validation || {},
        result = true;

    if (operator.accept_values == 1) {
        value = [value];
    }
    else {
        value = value;
    }

    if (validation.callback) {
        result = validation.callback.call(this, value, filter, operator, $rule);
        return this.change('validateValue', result, $rule, value, filter, operator);
    }

    for (var i=0; i<operator.accept_values; i++) {
        switch (filter.input) {
            case 'radio':
                if (value[i] === undefined) {
                    result = ['radio_empty'];
                    break;
                }
                break;

            case 'checkbox':
                if (value[i].length === 0) {
                    result = ['checkbox_empty'];
                    break;
                }
                break;

            case 'select':
                if (filter.multiple) {
                    if (value[i].length === 0) {
                        result = ['select_empty'];
                        break;
                    }
                }
                else {
                    if (value[i] === undefined) {
                        result = ['select_empty'];
                        break;
                    }
                }
                break;

            default:
                switch (filter.internalType) {
                    case 'string':
                        if (validation.min !== undefined) {
                            if (value[i].length < validation.min) {
                                result = ['string_exceed_min_length', validation.min];
                                break;
                            }
                        }
                        else if (value[i].length === 0) {
                            result = ['string_empty'];
                            break;
                        }
                        if (validation.max !== undefined) {
                            if (value[i].length > validation.max) {
                                result = ['string_exceed_max_length', validation.max];
                                break;
                            }
                        }
                        if (validation.format) {
                            if (!(validation.format.test(value[i]))) {
                                result = ['string_invalid_format', validation.format];
                                break;
                            }
                        }
                        break;

                    case 'number':
                        if (isNaN(value[i])) {
                            result = ['number_nan'];
                            break;
                        }
                        if (filter.type == 'integer') {
                            if (parseInt(value[i]) != value[i]) {
                                result = ['number_not_integer'];
                                break;
                            }
                        }
                        else {
                            if (parseFloat(value[i]) != value[i]) {
                                result = ['number_not_double'];
                                break;
                            }
                        }
                        if (validation.min !== undefined) {
                            if (value[i] < validation.min) {
                                result = ['number_exceed_min', validation.min];
                                break;
                            }
                        }
                        if (validation.max !== undefined) {
                            if (value[i] > validation.max) {
                                result = ['number_exceed_max', validation.max];
                                break;
                            }
                        }
                        if (validation.step !== undefined) {
                            var v = value[i]/validation.step;
                            if (parseInt(v) != v) {
                                result = ['number_wrong_step', validation.step];
                                break;
                            }
                        }
                        break;

                    case 'datetime':
                        // we need MomentJS
                        if (window.moment && validation.format) {
                            var datetime = moment(value[i], validation.format);
                            if (!datetime.isValid()) {
                                result = ['datetime_invalid'];
                                break;
                            }
                            else {
                                if (validation.min) {
                                    if (datetime < moment(validation.min, validation.format)) {
                                        result = ['datetime_exceed_min', validation.min];
                                        break;
                                    }
                                }
                                if (validation.max) {
                                    if (datetime > moment(validation.max, validation.format)) {
                                        result = ['datetime_exceed_max', validation.max];
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                }
        }

        if (result !== true) {
            break;
        }
    }

    return this.change('validateValue', result, $rule, value, filter, operator);
};

/**
 * Returns an incremented group ID
 * @return {string}
 */
QueryBuilder.prototype.nextGroupId = function() {
    return this.$el_id + '_group_' + (this.status.group_id++);
};

/**
 * Returns an incremented rule ID
 * @return {string}
 */
QueryBuilder.prototype.nextRuleId = function() {
    return this.$el_id + '_rule_' + (this.status.rule_id++);
};

/**
 * Returns the operators for a filter
 * @param filter {string|object} (filter id name or filter object)
 * @return {object[]}
 */
QueryBuilder.prototype.getOperators = function(filter) {
    if (typeof filter === 'string') {
        filter = this.getFilterById(filter);
    }

    var result = [];

    for (var i=0, l=this.operators.length; i<l; i++) {
        // filter operators check
        if (filter.operators) {
            if (filter.operators.indexOf(this.operators[i].type) == -1) {
                continue;
            }
        }
        // type check
        else if (this.operators[i].apply_to.indexOf(filter.internalType) == -1) {
            continue;
        }

        result.push(this.operators[i]);
    }

    // keep sort order defined for the filter
    if (filter.operators) {
        result.sort(function(a, b) {
            return filter.operators.indexOf(a.type) - filter.operators.indexOf(b.type);
        });
    }

    return this.change('getOperators', result, filter);
};

/**
 * Returns a particular filter by its id
 * @param filterId {string}
 * @return {object}
 */
QueryBuilder.prototype.getFilterById = function(filterId) {
    for (var i=0, l=this.filters.length; i<l; i++) {
        if (this.filters[i].id == filterId) {
            return this.filters[i];
        }
    }

    $.error('Undefined filter: '+ filterId);
};

/**
 * Return a particular operator by its type
 * @param type {string}
 * @return {object}
 */
QueryBuilder.prototype.getOperatorByType = function(type) {
    for (var i=0, l=this.operators.length; i<l; i++) {
        if (this.operators[i].type == type) {
            return this.operators[i];
        }
    }

    $.error('Undefined operator: '+ type);
};

/**
 * Returns the selected condition of a group
 * @param $group {jQuery} (<dl> element)
 * @return {string}
 */
QueryBuilder.prototype.getGroupCondition = function($group) {
    return $group.data(Node.DATAKEY).condition;
};

/**
 * Returns the selected filter of a rule
 * @param $rule {jQuery} (<li> element)
 * @return {string}
 */
QueryBuilder.prototype.getRuleFilter = function($rule) {
    return $rule.data(Node.DATAKEY).filter;
};

/**
 * Returns the selected operator of a rule
 * @param $rule {jQuery} (<li> element)
 * @return {string}
 */
QueryBuilder.prototype.getRuleOperator = function($rule) {
    return $rule.data(Node.DATAKEY).operator;
};

/**
 * Returns rule value
 * @param $rule {jQuery} (<li> element)
 * @param filter {object} (optional - current rule filter)
 * @param operator {object} (optional - current rule operator)
 * @return {string|string[]|undefined}
 */
QueryBuilder.prototype.getRuleValue = function($rule, filter, operator) {
    filter = filter || this.getRuleFilter($rule);
    operator = operator || this.getRuleOperator($rule);

    var value = [], tmp,
        $value = $rule.find('.rule-value-container');

    for (var i=0; i<operator.accept_values; i++) {
        var name = $rule[0].id + '_value_' + i;

        switch (filter.input) {
            case 'radio':
                value.push($value.find('[name='+ name +']:checked').val());
                break;

            case 'checkbox':
                tmp = [];
                $value.find('[name='+ name +']:checked').each(function() {
                    tmp.push($(this).val());
                });
                value.push(tmp);
                break;

            case 'select':
                if (filter.multiple) {
                    tmp = [];
                    $value.find('[name='+ name +'] option:selected').each(function() {
                        tmp.push($(this).val());
                    });
                    value.push(tmp);
                }
                else {
                    value.push($value.find('[name='+ name +'] option:selected').val());
                }
                break;

            default:
                value.push($value.find('[name='+ name +']').val());
        }
    }

    if (operator.accept_values == 1) {
        value = value[0];
    }

    if (filter.valueParser) {
        value = filter.valueParser.call(this, $rule, value, filter, operator);
    }

    return this.change('getRuleValue', value, $rule, filter, operator);
};

/**
 * Sets the value of a rule.
 * @param $rule {jQuery} (<li> element)
 * @param value {mixed}
 * @param filter {object}
 * @param operator {object}
 */
QueryBuilder.prototype.setRuleValue = function($rule, value, filter, operator) {
    filter = filter || this.getRuleFilter($rule);
    operator = operator || this.getRuleOperator($rule);

    this.trigger('beforeSetRuleValue', $rule, value, filter, operator);

    if (filter.valueSetter) {
        filter.valueSetter.call(this, $rule, value, filter, operator);
    }
    else {
        var $value = $rule.find('.rule-value-container');

        if (operator.accept_values == 1) {
            value = [value];
        }
        else {
            value = value;
        }

        for (var i=0; i<operator.accept_values; i++) {
            var name = $rule[0].id +'_value_'+ i;

            switch (filter.input) {
                case 'radio':
                    $value.find('[name='+ name +'][value="'+ value[i] +'"]').prop('checked', true).trigger('change');
                    break;

                case 'checkbox':
                    if (!$.isArray(value[i])) {
                        value[i] = [value[i]];
                    }
                    $.each(value[i], function(i, value) {
                        $value.find('[name='+ name +'][value="'+ value +'"]').prop('checked', true).trigger('change');
                    });
                    break;

                default:
                    $value.find('[name='+ name +']').val(value[i]).trigger('change');
                    break;
            }
        }
    }

    this.trigger('afterSetRuleValue', $rule, value, filter, operator);

    if (filter.onAfterSetValue) {
        filter.onAfterSetValue.call(this, $rule, value, filter, operator);
    }
};

/**
 * Clean rule flags.
 * @param rule {object}
 * @return {object}
 */
QueryBuilder.prototype.parseRuleFlags = function(rule) {
    var flags = $.extend({}, this.settings.default_rule_flags);

    if (rule.readonly) {
        $.extend(flags, {
            filter_readonly: true,
            operator_readonly: true,
            value_readonly: true,
            no_delete: true
        });
    }

    if (rule.flags) {
       $.extend(flags, rule.flags);
    }

    return this.change('parseRuleFlags', flags, rule);
};