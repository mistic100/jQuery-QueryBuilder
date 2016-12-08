/*jshint loopfunc:true */

/**
 * Check if a value is correct for a filter
 * @param rule {Rule}
 * @param value {string|string[]|undefined}
 * @return {array|true}
 */
QueryBuilder.prototype.validateValue = function(rule, value) {
    var validation = rule.filter.validation || {};
    var result = true;

    if (validation.callback) {
        result = validation.callback.call(this, value, rule);
    }
    else {
        result = this.validateValueInternal(rule, value);
    }

    return this.change('validateValue', result, value, rule);
};

/**
 * Default validation function
 * @throws ConfigError
 * @param rule {Rule}
 * @param value {string|string[]|undefined}
 * @return {Array|boolean} error array or true
 */
QueryBuilder.prototype.validateValueInternal = function(rule, value) {
    var filter = rule.filter;
    var operator = rule.operator;
    var validation = filter.validation || {};
    var result = true;
    var tmp;

    if (rule.operator.nb_inputs === 1) {
        value = [value];
    }

    for (var i = 0; i < operator.nb_inputs; i++) {
        switch (filter.input) {
            case 'radio':
                if (value[i] === undefined) {
                    result = ['radio_empty'];
                    break;
                }
                break;

            case 'checkbox':
                if (value[i] === undefined || value[i].length === 0) {
                    result = ['checkbox_empty'];
                    break;
                }
                else if (!operator.multiple && value[i].length > 1) {
                    result = ['operator_not_multiple', operator.type];
                    break;
                }
                break;

            case 'select':
                if (filter.multiple) {
                    if (value[i] === undefined || value[i].length === 0 || (filter.placeholder && value[i] == filter.placeholder_value)) {
                        result = ['select_empty'];
                        break;
                    }
                    else if (!operator.multiple && value[i].length > 1) {
                        result = ['operator_not_multiple', operator.type];
                        break;
                    }
                }
                else {
                    if (value[i] === undefined || (filter.placeholder && value[i] == filter.placeholder_value)) {
                        result = ['select_empty'];
                        break;
                    }
                }
                break;

            default:
                switch (QueryBuilder.types[filter.type]) {
                    case 'string':
                        if (value[i] === undefined || value[i].length === 0) {
                            result = ['string_empty'];
                            break;
                        }
                        if (validation.min !== undefined) {
                            if (value[i].length < parseInt(validation.min)) {
                                result = [this.getValidationMessage(validation, 'min', 'string_exceed_min_length'), validation.min];
                                break;
                            }
                        }
                        if (validation.max !== undefined) {
                            if (value[i].length > parseInt(validation.max)) {
                                result = [this.getValidationMessage(validation, 'max', 'string_exceed_max_length'), validation.max];
                                break;
                            }
                        }
                        if (validation.format) {
                            if (typeof validation.format == 'string') {
                                validation.format = new RegExp(validation.format);
                            }
                            if (!validation.format.test(value[i])) {
                                result = [this.getValidationMessage(validation, 'format', 'string_invalid_format'), validation.format];
                                break;
                            }
                        }
                        break;

                    case 'number':
                        if (value[i] === undefined || isNaN(value[i])) {
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
                            if (value[i] < parseFloat(validation.min)) {
                                result = [this.getValidationMessage(validation, 'min', 'number_exceed_min'), validation.min];
                                break;
                            }
                        }
                        if (validation.max !== undefined) {
                            if (value[i] > parseFloat(validation.max)) {
                                result = [this.getValidationMessage(validation, 'max', 'number_exceed_max'), validation.max];
                                break;
                            }
                        }
                        if (validation.step !== undefined && validation.step !== 'any') {
                            var v = (value[i] / validation.step).toPrecision(14);
                            if (parseInt(v) != v) {
                                result = [this.getValidationMessage(validation, 'step', 'number_wrong_step'), validation.step];
                                break;
                            }
                        }
                        break;

                    case 'datetime':
                        if (value[i] === undefined || value[i].length === 0) {
                            result = ['datetime_empty'];
                            break;
                        }

                        // we need MomentJS
                        if (validation.format) {
                            if (!('moment' in window)) {
                                Utils.error('MissingLibrary', 'MomentJS is required for Date/Time validation. Get it here http://momentjs.com');
                            }

                            var datetime = moment(value[i], validation.format);
                            if (!datetime.isValid()) {
                                result = [this.getValidationMessage(validation, 'format', 'datetime_invalid'), validation.format];
                                break;
                            }
                            else {
                                if (validation.min) {
                                    if (datetime < moment(validation.min, validation.format)) {
                                        result = [this.getValidationMessage(validation, 'min', 'datetime_exceed_min'), validation.min];
                                        break;
                                    }
                                }
                                if (validation.max) {
                                    if (datetime > moment(validation.max, validation.format)) {
                                        result = [this.getValidationMessage(validation, 'max', 'datetime_exceed_max'), validation.max];
                                        break;
                                    }
                                }
                            }
                        }
                        break;

                    case 'boolean':
                        tmp = value[i].trim().toLowerCase();
                        if (tmp !== 'true' && tmp !== 'false' && tmp !== '1' && tmp !== '0' && value[i] !== 1 && value[i] !== 0) {
                            result = ['boolean_not_valid'];
                            break;
                        }
                }
        }

        if (result !== true) {
            break;
        }
    }

    return result;
};

/**
 * Returns an incremented group ID
 * @return {string}
 */
QueryBuilder.prototype.nextGroupId = function() {
    return this.status.id + '_group_' + (this.status.group_id++);
};

/**
 * Returns an incremented rule ID
 * @return {string}
 */
QueryBuilder.prototype.nextRuleId = function() {
    return this.status.id + '_rule_' + (this.status.rule_id++);
};

/**
 * Returns an incremented section ID
 * @return {string}
 */
QueryBuilder.prototype.nextSectionId = function() {
    return this.status.id + '_section_' + (this.status.section_id++);
};

/**
 * Returns a particular section by its id
 * @throws UndefinedSectionError
 * @param sectionId {string}
 * @return {object|null}
 */
QueryBuilder.prototype.getSectionById = function(id) {
    if (id == '-1') {
        return null;
    }

    for (var i = 0, l = this.sections.length; i < l; i++) {
        if (this.sections[i].id == id) {
            return this.sections[i];
        }
    }

    Utils.error('UndefinedSection', 'Undefined section "{0}"', id);
};

/**
 * Returns the operators for a filter
 * @param filter {string|object} (filter id name or filter object)
 * @return {object[]}
 */
QueryBuilder.prototype.getOperators = function(filter, sectionId) {
    if (typeof filter == 'string') {
        filter = this.getFilterById(filter, sectionId);
    }

    var result = [];

    for (var i = 0, l = this.operators.length; i < l; i++) {
        // filter operators check
        if (filter.operators) {
            if (filter.operators.indexOf(this.operators[i].type) == -1) {
                continue;
            }
        }
        // type check
        else if (this.operators[i].apply_to.indexOf(QueryBuilder.types[filter.type]) == -1) {
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
 * @throws UndefinedFilterError
 * @param filterId {string}
 * @param sectionId {string|null}
 * @return {object|null}
 */
QueryBuilder.prototype.getFilterById = function(id, sectionId) {
    if (id == '-1') {
        return null;
    }

    var filters = [];
    if (sectionId) {
        var s = this.getSectionById(sectionId);
        filters = s ? s.filters : [];
    }
    else {
        filters = this.filters;
    }
    for (var i = 0, l = filters.length; i < l; i++) {
        if (filters[i].id == id) {
            return filters[i];
        }
    }

    Utils.error('UndefinedFilter', 'Undefined filter "{0}"', id);
};

/**
 * Return a particular operator by its type
 * @throws UndefinedOperatorError
 * @param type {string}
 * @return {object|null}
 */
QueryBuilder.prototype.getOperatorByType = function(type) {
    if (type == '-1') {
        return null;
    }

    for (var i = 0, l = this.operators.length; i < l; i++) {
        if (this.operators[i].type == type) {
            return this.operators[i];
        }
    }

    Utils.error('UndefinedOperator', 'Undefined operator "{0}"', type);
};

/**
 * Returns rule value
 * @param rule {Rule}
 * @return {mixed}
 */
QueryBuilder.prototype.getRuleValue = function(rule) {
    var filter = rule.filter;
    var operator = rule.operator;
    var value = [];

    if (filter.valueGetter) {
        value = filter.valueGetter.call(this, rule);
    }
    else {
        var $value = rule.$el.find(Selectors.value_container);

        for (var i = 0; i < operator.nb_inputs; i++) {
            var name = Utils.escapeElementId(rule.id + '_value_' + i);
            var tmp;

            switch (filter.input) {
                case 'radio':
                    value.push($value.find('[name=' + name + ']:checked').val());
                    break;

                case 'checkbox':
                    tmp = [];
                    $value.find('[name=' + name + ']:checked').each(function() {
                        tmp.push($(this).val());
                    });
                    value.push(tmp);
                    break;

                case 'select':
                    if (filter.multiple) {
                        tmp = [];
                        $value.find('[name=' + name + '] option:selected').each(function() {
                            tmp.push($(this).val());
                        });
                        value.push(tmp);
                    }
                    else {
                        value.push($value.find('[name=' + name + '] option:selected').val());
                    }
                    break;

                default:
                    value.push($value.find('[name=' + name + ']').val());
            }
        }

        if (operator.multiple && filter.value_separator) {
            value = value.map(function(val) {
                return val.split(filter.value_separator);
            });
        }

        if (operator.nb_inputs === 1) {
            value = value[0];
        }

        // @deprecated
        if (filter.valueParser) {
            value = filter.valueParser.call(this, rule, value);
        }
    }

    return this.change('getRuleValue', value, rule);
};

/**
 * Sets the value of a rule.
 * @param rule {Rule}
 * @param value {mixed}
 */
QueryBuilder.prototype.setRuleValue = function(rule, value) {
    var filter = rule.filter;
    var operator = rule.operator;

    if (filter.valueSetter) {
        filter.valueSetter.call(this, rule, value);
    }
    else {
        var $value = rule.$el.find(Selectors.value_container);

        if (operator.nb_inputs == 1) {
            value = [value];
        }
        else {
            value = value;
        }

        for (var i = 0; i < operator.nb_inputs; i++) {
            var name = Utils.escapeElementId(rule.id + '_value_' + i);

            switch (filter.input) {
                case 'radio':
                    $value.find('[name=' + name + '][value="' + value[i] + '"]').prop('checked', true).trigger('change');
                    break;

                case 'checkbox':
                    if (!$.isArray(value[i])) {
                        value[i] = [value[i]];
                    }
                    value[i].forEach(function(value) {
                        $value.find('[name=' + name + '][value="' + value + '"]').prop('checked', true).trigger('change');
                    });
                    break;

                default:
                    if (operator.multiple && filter.value_separator && $.isArray(value[i])) {
                        value[i] = value[i].join(filter.value_separator);
                    }
                    $value.find('[name=' + name + ']').val(value[i]).trigger('change');
                    break;
            }
        }
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

/**
 * Get a copy of flags of a rule.
 * @param {object} flags
 * @param {boolean} all - true to return all flags, false to return only changes from default
 * @returns {object}
 */
QueryBuilder.prototype.getRuleFlags = function(flags, all) {
    if (all) {
        return $.extend({}, flags);
    }
    else {
        var ret = {};
        $.each(this.settings.default_rule_flags, function(key, value) {
            if (flags[key] !== value) {
                ret[key] = flags[key];
            }
        });
        return ret;
    }
};

/**
 * Clean group flags.
 * @param group {object}
 * @return {object}
 */
QueryBuilder.prototype.parseGroupFlags = function(group) {
    var flags = $.extend({}, this.settings.default_group_flags);

    if (group.readonly) {
        $.extend(flags, {
            condition_readonly: true,
            no_add_rule: true,
            no_add_group: true,
            no_delete: true
        });
    }

    if (group.flags) {
        $.extend(flags, group.flags);
    }

    return this.change('parseGroupFlags', flags, group);
};

/**
 * Get a copy of flags of a group.
 * @param {object} flags
 * @param {boolean} all - true to return all flags, false to return only changes from default
 * @returns {object}
 */
QueryBuilder.prototype.getGroupFlags = function(flags, all) {
    if (all) {
        return $.extend({}, flags);
    }
    else {
        var ret = {};
        $.each(this.settings.default_group_flags, function(key, value) {
            if (flags[key] !== value) {
                ret[key] = flags[key];
            }
        });
        return ret;
    }
};

/**
 * Clean section flags.
 * @param section {object}
 * @return {object}
 */
QueryBuilder.prototype.parseSectionFlags = function(section) {
    var flags = $.extend({}, this.settings.default_section_flags);

    if (section.readonly) {
        $.extend(flags, {
            exists_readonly: true,
            no_add_rule: true,
            no_add_group: true,
            no_delete: true
        });
    }

    if (section.flags) {
        $.extend(flags, section.flags);
    }

    return this.change('parseSectionFlags', flags, section);
};

/**
 * Get a copy of flags of a section.
 * @param {object} flags
 * @param {boolean} all - true to return all flags, false to return only changes from default
 * @returns {object}
 */
QueryBuilder.prototype.getSectionFlags = function(flags, all) {
    if (all) {
        return $.extend({}, flags);
    }
    else {
        var ret = {};
        $.each(this.settings.default_section_flags, function(key, value) {
            if (flags[key] !== value) {
                ret[key] = flags[key];
            }
        });
        return ret;
    }
};

/**
 * Translate a label
 * @param label {string|object}
 * @return string
 */
QueryBuilder.prototype.translateLabel = function(label) {
    return typeof label == 'object' ? (label[this.settings.lang_code] || label['en']) : label;
};

/**
 * Return a validation message
 * @param {object} validation
 * @param {string} type
 * @param {string} def
 * @returns {string}
 */
QueryBuilder.prototype.getValidationMessage = function(validation, type, def) {
    return validation.messages && validation.messages[type] || def;
};
