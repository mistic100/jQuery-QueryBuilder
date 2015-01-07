/*!
 * jQuery QueryBuilder
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

/*jshint multistr:true */
/*jshint loopfunc:true */

(function($){
    "use strict";

    // GLOBAL STATIC VARIABLES
    // ===============================
    var types = [
            'string',
            'integer',
            'double',
            'date',
            'time',
            'datetime'
        ],
        internalTypes = [
            'string',
            'number',
            'datetime'
        ],
        inputs = [
            'text',
            'radio',
            'checkbox',
            'select'
        ];


    // CLASS DEFINITION
    // ===============================
    var QueryBuilder = function($el, options) {
        this.$el = $el;
        this.init(options);
    };


    // DEFAULT CONFIG
    // ===============================
    QueryBuilder.DEFAULTS = {
        filters: [],

        onValidationError: null,
        onAfterAddGroup: null,
        onAfterAddRule: null,

        display_errors: true,
        allow_groups: -1,
        sortable: false,
        conditions: ['AND', 'OR'],
        default_condition: 'AND',

        default_rule_flags: {
            filter_readonly: false,
            operator_readonly: false,
            value_readonly: false,
            no_delete: false,
            no_sortable: false
        },

        template: {
            group: null,
            rule: null
        },

        lang: {
            "add_rule": 'Add rule',
            "add_group": 'Add group',
            "delete_rule": 'Delete',
            "delete_group": 'Delete',

            "condition_and": 'AND',
            "condition_or": 'OR',

            "filter_select_placeholder": '------',

            "operators": {
                "equal": "equal",
                "not_equal": "not equal",
                "in": "in",
                "not_in": "not in",
                "less": "less",
                "less_or_equal": "less or equal",
                "greater": "greater",
                "greater_or_equal": "greater or equal",
                "between": "between",
                "begins_with": "begins with",
                "not_begins_with": "doesn't begin with",
                "contains": "contains",
                "not_contains": "doesn't contain",
                "ends_with": "ends with",
                "not_ends_with": "doesn't end with",
                "is_empty": "is empty",
                "is_not_empty": "is not empty",
                "is_null": "is null",
                "is_not_null": "is not null"
            },

            "errors": {
                "no_filter": "No filter selected",
                "empty_group": "The group is empty",
                "radio_empty": "No value selected",
                "checkbox_empty": "No value selected",
                "select_empty": "No value selected",
                "string_empty": "Empty value",
                "string_exceed_min_length": "Must contain at least {0} characters",
                "string_exceed_max_length": "Must not contain more than {0} characters",
                "string_invalid_format": "Invalid format ({0})",
                "number_nan": "Not a number",
                "number_not_integer": "Not an integer",
                "number_not_double": "Not a real number",
                "number_exceed_min": "Must be greater than {0}",
                "number_exceed_max": "Must be lower than {0}",
                "number_wrong_step": "Must be a multiple of {0}",
                "datetime_invalid": "Invalid date format ({0})",
                "datetime_exceed_min": "Must be after {0}",
                "datetime_exceed_max": "Must be before {0}"
            }
        },

        operators: [
            {type: 'equal',            accept_values: 1, apply_to: ['string', 'number', 'datetime']},
            {type: 'not_equal',        accept_values: 1, apply_to: ['string', 'number', 'datetime']},
            {type: 'in',               accept_values: 1, apply_to: ['string', 'number', 'datetime']},
            {type: 'not_in',           accept_values: 1, apply_to: ['string', 'number', 'datetime']},
            {type: 'less',             accept_values: 1, apply_to: ['number', 'datetime']},
            {type: 'less_or_equal',    accept_values: 1, apply_to: ['number', 'datetime']},
            {type: 'greater',          accept_values: 1, apply_to: ['number', 'datetime']},
            {type: 'greater_or_equal', accept_values: 1, apply_to: ['number', 'datetime']},
            {type: 'between',          accept_values: 2, apply_to: ['number', 'datetime']},
            {type: 'begins_with',      accept_values: 1, apply_to: ['string']},
            {type: 'not_begins_with',  accept_values: 1, apply_to: ['string']},
            {type: 'contains',         accept_values: 1, apply_to: ['string']},
            {type: 'not_contains',     accept_values: 1, apply_to: ['string']},
            {type: 'ends_with',        accept_values: 1, apply_to: ['string']},
            {type: 'not_ends_with',    accept_values: 1, apply_to: ['string']},
            {type: 'is_empty',         accept_values: 0, apply_to: ['string']},
            {type: 'is_not_empty',     accept_values: 0, apply_to: ['string']},
            {type: 'is_null',          accept_values: 0, apply_to: ['string', 'number', 'datetime']},
            {type: 'is_not_null',      accept_values: 0, apply_to: ['string', 'number', 'datetime']}
        ],

        icons: {
            add_group: 'glyphicon glyphicon-plus-sign',
            add_rule: 'glyphicon glyphicon-plus',
            remove_group: 'glyphicon glyphicon-remove',
            remove_rule: 'glyphicon glyphicon-remove',
            sort: 'glyphicon glyphicon-sort',
            error: 'glyphicon glyphicon-warning-sign'
        }
    };


    // PUBLIC METHODS
    // ===============================
    /**
     * Init the builder
     */
    QueryBuilder.prototype.init = function(options) {
        // PROPERTIES
        this.settings = merge(QueryBuilder.DEFAULTS, options);
        this.status = {
            group_id: 0,
            rule_id: 0,
            generatedId: false,
            has_optgroup: false
        };

        // "allow_groups" changed in 1.3.1 from boolean to int
        if (this.settings.allow_groups === false) {
            this.settings.allow_groups = 0;
        }
        else if (this.settings.allow_groups === true) {
            this.settings.allow_groups = -1;
        }

        this.filters = this.settings.filters;
        this.lang = this.settings.lang;
        this.icons = this.settings.icons;
        this.operators = this.settings.operators;
        this.template = this.settings.template;

        if (this.template.group === null) {
            this.template.group = this.getGroupTemplate;
        }
        if (this.template.rule === null) {
            this.template.rule = this.getRuleTemplate;
        }

        // ensure we have a container id
        if (!this.$el.attr('id')) {
            this.$el.attr('id', 'qb_'+Math.floor(Math.random()*99999));
            this.status.generatedId = true;
        }
        this.$el_id = this.$el.attr('id');

        this.$el.addClass('query-builder');

        // CHECK FILTERS
        if (!this.filters || this.filters.length < 1) {
            $.error('Missing filters list');
        }
        this.checkFilters();

        // INIT
        this.bindEvents();

        if (this.settings.sortable) {
            this.initSortable();
        }

        if (options.rules) {
            this.setRules(options.rules);
        }
        else {
            this.addGroup(this.$el);
        }
    };

    /**
     * Destroy the plugin
     */
    QueryBuilder.prototype.destroy = function() {
        if (this.status.generatedId) {
            this.$el.removeAttr('id');
        }

        this.$el.empty()
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

        this.$el.find('>.rules-group-container>.rules-group-body>.rules-list').empty();

        this.addRule(this.$el.find('>.rules-group-container'));
    };

    /**
     * Clear the plugin
     */
    QueryBuilder.prototype.clear = function() {
        this.status.group_id = 0;
        this.status.rule_id = 0;

        this.$el.empty();
    };

    /**
     * Get an object representing current rules
     * @return {object}
     */
    QueryBuilder.prototype.getRules = function() {
        this.clearErrors();

        var $group = this.$el.find('>.rules-group-container'),
            that = this;

        return (function parse($group) {
            var out = {},
                $elements = $group.find('>.rules-group-body>.rules-list>*');

            out.condition = that.getGroupCondition($group);
            out.rules = [];

            for (var i=0, l=$elements.length; i<l; i++) {
                var $rule = $elements.eq(i),
                    rule;

                if ($rule.hasClass('rule-container')) {
                    var filterId = that.getRuleFilter($rule);

                    if (filterId == '-1') {
                        that.triggerValidationError(['no_filter'], $rule, null, null, null);
                        return {};
                    }

                    var filter = that.getFilterById(filterId),
                        operator = that.getOperatorByType(that.getRuleOperator($rule)),
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

            if (out.rules.length === 0) {
                that.triggerValidationError(['empty_group'], $group, null, null, null);
                return {};
            }

            return out;
        }($group));
    };

    /**
     * Set rules from object
     * @param data {object}
     */
    QueryBuilder.prototype.setRules = function(data) {
        this.clear();

        if (!data || !data.rules || data.rules.length===0) {
            $.error('Incorrect data object passed');
        }

        var $container = this.$el,
            that = this;

        (function add(data, $container){
            var $group = that.addGroup($container, false),
                $buttons = $group.find('>.rules-group-header input[name$=_cond]');

            if (data.condition === undefined) {
                data.condition = that.settings.default_condition;
            }

            for (var i=0, l=that.settings.conditions.length; i<l; i++) {
                var cond = that.settings.conditions[i];
                $buttons.filter('[value='+ cond +']').prop('checked', data.condition.toUpperCase() == cond.toUpperCase());
            }
            $buttons.trigger('change');

            $.each(data.rules, function(i, rule) {
                if (rule.rules && rule.rules.length>0) {
                    if (that.settings.allow_groups !== -1 && that.settings.allow_groups < $group.data('queryBuilder').level) {
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

                    var $rule = that.addRule($group),
                        filter = that.getFilterById(rule.id),
                        operator = that.getOperatorByType(rule.operator);

                    $rule.find('.rule-filter-container select[name$=_filter]').val(rule.id).trigger('change');
                    $rule.find('.rule-operator-container select[name$=_operator]').val(rule.operator).trigger('change');

                    if (operator.accept_values !== 0) {
                        that.setRuleValue($rule, rule, filter, operator);
                    }

                    if (filter.onAfterSetValue) {
                        filter.onAfterSetValue.call(that, $rule, rule.value, filter, operator);
                    }
                }
            });

        }(data, $container));
    };


    // MAIN METHODS
    // ===============================
    /**
     * Checks the configuration of each filter
     */
    QueryBuilder.prototype.checkFilters = function() {
        var definedFilters = [],
            that = this;

        $.each(this.filters, function(i, filter) {
            if (!filter.id) {
                $.error('Missing filter id: '+ i);
            }
            if (definedFilters.indexOf(filter.id) != -1) {
                $.error('Filter already defined: '+ filter.id);
            }
            definedFilters.push(filter.id);

            if (!filter.type) {
                $.error('Missing filter type: '+ filter.id);
            }
            if (types.indexOf(filter.type) == -1) {
                $.error('Invalid type: '+ filter.type);
            }

            if (!filter.input) {
                filter.input = 'text';
            }
            else if (typeof filter.input != 'function' && inputs.indexOf(filter.input) == -1) {
                $.error('Invalid input: '+ filter.input);
            }

            if (!filter.field) {
                filter.field = filter.id;
            }
            if (!filter.label) {
                filter.label = filter.field;
            }

            that.status.has_optgroup|= !!filter.optgroup;
            if (!filter.optgroup) {
                filter.optgroup = null;
            }

            switch (filter.type) {
                case 'string':
                    filter.internalType = 'string';
                    break;
                case 'integer': case 'double':
                    filter.internalType = 'number';
                    break;
                case 'date': case 'time': case 'datetime':
                    filter.internalType = 'datetime';
                    break;
            }

            switch (filter.input) {
                case 'radio': case 'checkbox':
                    if (!filter.values || filter.values.length < 1) {
                        $.error('Missing values for filter: '+ filter.id);
                    }
                    break;
            }
        });

        // group filters with same optgroup, preserving declaration order when possible
        if (this.status.has_optgroup) {
            var optgroups = [],
                filters = [];

            $.each(this.filters, function(i, filter) {
                var idx;

                if (filter.optgroup) {
                    idx = optgroups.lastIndexOf(filter.optgroup);

                    if (idx == -1) {
                        idx = optgroups.length;
                    }
                }
                else {
                    idx = optgroups.length;
                }

                optgroups.splice(idx, 0, filter.optgroup);
                filters.splice(idx, 0, filter);
            });

            this.filters = filters;
        }
    };

    /**
     * Add all events listeners
     */
    QueryBuilder.prototype.bindEvents = function() {
        var that = this;

        // group condition change
        this.$el.on('change.queryBuilder', '.rules-group-header input[name$=_cond]', function() {
            var $this = $(this);

            if ($this.is(':checked')) {
                $this.parent().addClass('active');
                $this.parent().siblings().removeClass('active');
            }
        });

        // rule filter change
        this.$el.on('change.queryBuilder', '.rule-filter-container select[name$=_filter]', function() {
            var $this = $(this),
                $rule = $this.closest('.rule-container');

            that.updateRuleFilter($rule, $this.val());
        });

        // rule operator change
        this.$el.on('change.queryBuilder', '.rule-operator-container select[name$=_operator]', function() {
            var $this = $(this),
                $rule = $this.closest('.rule-container');

            that.updateRuleOperator($rule, $this.val());
        });

        // add rule button
        this.$el.on('click.queryBuilder', '[data-add=rule]', function() {
            var $this = $(this),
                $group = $this.closest('.rules-group-container');

            that.addRule($group);
        });

        // add group button
        if (this.settings.allow_groups !== 0) {
            this.$el.on('click.queryBuilder', '[data-add=group]', function() {
                var $this = $(this),
                    $group = $this.closest('.rules-group-container');

                that.addGroup($group);
            });
        }

        // delete rule button
        this.$el.on('click.queryBuilder', '[data-delete=rule]', function() {
            var $this = $(this),
                $rule = $this.closest('.rule-container');

            $rule.remove();
        });

        // delete group button
        this.$el.on('click.queryBuilder', '[data-delete=group]', function() {
            var $this = $(this),
                $group = $this.closest('.rules-group-container');

            that.deleteGroup($group);
        });
    };

    /**
     * Add a new rules group
     * @param $parent {jQuery}
     * @param addRule {bool} (optional - add a default empty rule)
     * @return $group {jQuery}
     */
    QueryBuilder.prototype.addGroup = function($parent, addRule) {
        var group_id = this.nextGroupId(),
            level = ($parent.data('queryBuilder') || {}).level || 0,
            $container = level===0 ? $parent : $parent.find('>.rules-group-body>.rules-list'),
            $group = $(this.template.group.call(this, group_id, ++level));

        $group.data('queryBuilder', {level:level});
        $container.append($group);

        if (this.settings.onAfterAddGroup) {
            this.settings.onAfterAddGroup.call(this, $group);
        }

        if (addRule === undefined || addRule === true) {
            this.addRule($group);
        }

        return $group;
    };

    /**
     * Tries to delete a group. The group is not deleted if at least one rule is no_delete.
     * @param $group {jQuery}
     */
    QueryBuilder.prototype.deleteGroup = function($group) {
        if ($group[0].id == this.$el_id + '_group_0') {
            return;
        }

        var that = this,
            keepGroup = false;

        $group.find('>.rules-group-body>.rules-list>*').each(function() {
            var $element = $(this);

            if ($element.hasClass('rule-container')) {
                if ($element.data('queryBuilder').flags.no_delete) {
                    keepGroup = true;
                }
                else {
                    $element.remove();
                }
            }
            else {
                keepGroup|= that.deleteGroup($element);
            }
        });

        if (!keepGroup) {
            $group.remove();
        }

        return keepGroup;
    };

    /**
     * Add a new rule
     * @param $parent {jQuery}
     * @return $rule {jQuery}
     */
    QueryBuilder.prototype.addRule = function($parent) {
        var rule_id = this.nextRuleId(),
            $container = $parent.find('>.rules-group-body>.rules-list'),
            $rule = $(this.template.rule.call(this, rule_id)),
            $filterSelect = $(this.getRuleFilterSelect(rule_id));

        $rule.data('queryBuilder', {flags: {}});
        $container.append($rule);
        $rule.find('.rule-filter-container').append($filterSelect);

        if ($.fn.selectpicker) {
            $filterSelect.selectpicker({
                container: 'body',
                style: 'btn-inverse btn-xs',
                width: 'auto',
                showIcon: false
            });
        }

        if (this.settings.onAfterAddRule) {
            this.settings.onAfterAddRule.call(this, $rule);
        }

        return $rule;
    };

    /**
     * Create operators <select> for a rule
     * @param $rule {jQuery} (<li> element)
     * @param filter {object}
     */
    QueryBuilder.prototype.createRuleOperators = function($rule, filter) {
        var $operatorContainer = $rule.find('.rule-operator-container').empty();

        if (filter === null) {
            return;
        }

        var operators = this.getOperators(filter),
            $operatorSelect = $(this.getRuleOperatorSelect($rule.attr('id'), operators));

        $operatorContainer.html($operatorSelect);

        $rule.data('queryBuilder').operator = operators[0];

        if ($.fn.selectpicker) {
            $operatorSelect.selectpicker({
              container: 'body',
              style: 'btn-inverse btn-xs',
              width: 'auto',
              showIcon: false
            });
        }
    };

    /**
     * Create main <input> for a rule
     * @param $rule {jQuery} (<li> element)
     * @param filter {object}
     */
    QueryBuilder.prototype.createRuleInput = function($rule, filter) {
        var $valueContainer = $rule.find('.rule-value-container').empty();

        if (filter === null) {
            return;
        }

        var operator = this.getOperatorByType(this.getRuleOperator($rule));

        if (operator.accept_values === 0) {
            return;
        }

        var $inputs = $();

        for (var i=0; i<operator.accept_values; i++) {
            var $ruleInput = $(this.getRuleInput($rule.attr('id'), filter, i));
            if (i > 0) $valueContainer.append(' , ');
            $valueContainer.append($ruleInput);
            $inputs = $inputs.add($ruleInput);
        }

        $valueContainer.show();

        if (filter.onAfterCreateRuleInput) {
            filter.onAfterCreateRuleInput.call(this, $rule, filter);
        }

        // init external jquery plugin
        if (filter.plugin) {
            $inputs[filter.plugin](filter.plugin_config || {});
        }
    };

    /**
     * Perform action when rule's filter is changed
     * @param $rule {jQuery} (<li> element)
     * @param filterId {string}
     */
    QueryBuilder.prototype.updateRuleFilter = function($rule, filterId) {
        var filter = filterId != '-1' ? this.getFilterById(filterId) : null;

        this.createRuleOperators($rule, filter);
        this.createRuleInput($rule, filter);

        $rule.data('queryBuilder').filter = filter;
    };

    /**
     * Update main <input> visibility when rule operator changes
     * @param $rule {jQuery} (<li> element)
     * @param operatorType {string}
     */
    QueryBuilder.prototype.updateRuleOperator = function($rule, operatorType) {
        var $valueContainer = $rule.find('.rule-value-container'),
            filter = this.getFilterById(this.getRuleFilter($rule)),
            operator = this.getOperatorByType(operatorType);

        if (operator.accept_values === 0) {
            $valueContainer.hide();
        }
        else {
            $valueContainer.show();

            var previousOperator = $rule.data('queryBuilder').operator;

            if ($valueContainer.is(':empty') || operator.accept_values != previousOperator.accept_values) {
                this.createRuleInput($rule, filter);
            }
        }

        $rule.data('queryBuilder').operator = operator;

        if (filter.onAfterChangeOperator) {
            filter.onAfterChangeOperator.call(this, $rule, filter, operator);
        }
    };

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
            val;

        if (validation.callback) {
            return validation.callback.call(this, value, filter, operator, $rule);
        }

        if (operator.accept_values == 1) {
            val = [value];
        }
        else {
            val = value;
        }

        for (var i=0; i<operator.accept_values; i++) {
            switch (filter.input) {
                case 'radio':
                    if (val[i] === undefined) {
                        return ['radio_empty'];
                    }
                    break;

                case 'checkbox':
                    if (val[i].length === 0) {
                        return ['checkbox_empty'];
                    }
                    break;

                case 'select':
                    if (filter.multiple) {
                        if (val[i].length === 0) {
                            return ['select_empty'];
                        }
                    }
                    else {
                        if (val[i] === undefined) {
                            return ['select_empty'];
                        }
                    }
                    break;

                /* falls through */
                case 'text': default:
                    switch (filter.internalType) {
                        case 'string':
                            if (validation.min !== undefined) {
                                if (val[i].length < validation.min) {
                                    return ['string_exceed_min_length', validation.min];
                                }
                            }
                            else if (val[i].length === 0) {
                                return ['string_empty'];
                            }
                            if (validation.max !== undefined) {
                                if (val[i].length > validation.max) {
                                    return ['string_exceed_max_length', validation.max];
                                }
                            }
                            if (validation.format) {
                                if (!(validation.format.test(val[i]))) {
                                    return ['string_invalid_format', validation.format];
                                }
                            }
                            break;

                        case 'number':
                            if (isNaN(val[i])) {
                                return ['number_nan'];
                            }
                            if (filter.type == 'integer') {
                                if (parseInt(val[i]) != val[i]) {
                                    return ['number_not_integer'];
                                }
                            }
                            else {
                                if (parseFloat(val[i]) != val[i]) {
                                    return ['number_not_double'];
                                }
                            }
                            if (validation.min !== undefined) {
                                if (val[i] < validation.min) {
                                    return ['number_exceed_min', validation.min];
                                }
                            }
                            if (validation.max !== undefined) {
                                if (val[i] > validation.max) {
                                    return ['number_exceed_max', validation.max];
                                }
                            }
                            if (validation.step !== undefined) {
                                var v = val[i]/validation.step;
                                if (parseInt(v) != v) {
                                    return ['number_wrong_step', validation.step];
                                }
                            }
                            break;

                        case 'datetime':
                            // we need MomentJS
                            if (window.moment && validation.format) {
                                var datetime = moment(val[i], validation.format);
                                if (!datetime.isValid()) {
                                    return ['datetime_invalid'];
                                }
                                else {
                                    if (validation.min) {
                                        if (datetime < moment(validation.min, validation.format)) {
                                            return ['datetime_exceed_min', validation.min];
                                        }
                                    }
                                    if (validation.max) {
                                        if (datetime > moment(validation.max, validation.format)) {
                                            return ['datetime_exceed_max', validation.max];
                                        }
                                    }
                                }
                            }
                            break;
                    }
            }
        }

        return true;
    };

    /**
     * Remove 'has-error' from everything
     */
    QueryBuilder.prototype.clearErrors = function() {
      this.$el.find('.has-error').removeClass('has-error');
    };

    /**
     * Trigger a validation error event with custom params
     * @param error {array}
     * @param $target {jQuery}
     * @param value {mixed}
     * @param filter {object}
     * @param operator {object}
     */
    QueryBuilder.prototype.triggerValidationError = function(error, $target, value, filter, operator) {
        if (!$.isArray(error)) {
            error = [error];
        }

        if (filter && filter.onValidationError) {
            filter.onValidationError.call(this, $target, error, value, filter, operator);
        }
        if (this.settings.onValidationError) {
            this.settings.onValidationError.call(this, $target, error, value, filter, operator);
        }

        var e = jQuery.Event('validationError.queryBuilder', {
            error: error,
            filter: filter,
            operator: operator,
            value: value,
            targetRule: $target[0],
            builder: this
        });

        this.$el.trigger(e);

        if (this.settings.display_errors && !e.isDefaultPrevented()) {
            // translate the text without modifying event array
            error = $.extend([], error, [
                this.lang.errors[error[0]] || error[0]
            ]);

            $target.addClass('has-error');
            var $error = $target.find('.error-container').eq(0);
            $error.attr('title', fmt.apply(null, error));

            if ($.fn.tooltip) {
                $error.tooltip('hide').tooltip('fixTitle');
            }
        }
    };

    /**
     * Init HTML5 drag and drop
     */
    QueryBuilder.prototype.initSortable = function() {
        // configure jQuery to use dataTransfer
        $.event.props.push('dataTransfer');

        var placeholder, src, isHandle = false;

        // only init drag from drag handle
        this.$el.on('mousedown', '.drag-handle', function(e) {
            isHandle = true;
        });
        this.$el.on('mouseup', '.drag-handle', function(e) {
            isHandle = false;
        });

        // dragstart: create placeholder and hide current element
        this.$el.on('dragstart', '[draggable]', function(e) {
            e.stopPropagation();

            if (isHandle) {
                isHandle = false;

                // notify drag and drop (only dummy text)
                e.dataTransfer.setData('text', 'drag');

                src = $(e.target);

                placeholder = $('<div class="rule-placeholder">&nbsp;</div>');
                placeholder.css('min-height', src.height());
                placeholder.insertAfter(src);

                // Chrome glitch (helper invisible if hidden immediately)
                setTimeout(function() {
                    src.hide();
                }, 0);
            }
            else {
                e.preventDefault();
            }
        });

        // dragenter: move the placeholder
        this.$el.on('dragenter', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var target = $(e.target), parent;

            // on rule
            parent = target.closest('.rule-container');
            if (parent.length) {
                placeholder.detach().insertAfter(parent);
                return;
            }

            // on group header
            parent = target.closest('.rules-group-header');
            if (parent.length) {
                parent = target.closest('.rules-group-container');
                placeholder.detach().prependTo(parent.find('.rules-list').eq(0));
                return;
            }

            // on group
            parent = target.closest('.rules-group-container');
            if (parent.length) {
                placeholder.detach().appendTo(parent.find('.rules-list').eq(0));
                return;
            }
        });

        // dragover: prevent glitches
        this.$el.on('dragover', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // drop: move current element
        this.$el.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var target = $(e.target), parent;

            // on rule
            parent = target.closest('.rule-container');
            if (parent.length) {
                src.detach().insertAfter(parent);
                return;
            }

            // on group header
            parent = target.closest('.rules-group-header');
            if (parent.length) {
                parent = target.closest('.rules-group-container');
                src.detach().prependTo(parent.find('.rules-list').eq(0));
                return;
            }

            // on group
            parent = target.closest('.rules-group-container');
            if (parent.length) {
                src.detach().appendTo(parent.find('.rules-list').eq(0));
                return;
            }
        });

        // dragend: show current element and delete placeholder
        this.$el.on('dragend', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            src.show();
            placeholder.remove();
        });
    };


    // DATA ACCESS
    // ===============================
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
        if (typeof filter == 'string') {
            filter = this.getFilterById(filter);
        }

        var res = [];

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

            res.push(this.operators[i]);
        }

        // keep sort order defined for the filter
        if (filter.operators) {
            res.sort(function(a, b) {
                return filter.operators.indexOf(a.type) - filter.operators.indexOf(b.type);
            });
        }

        return res;
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
        return $group.find('>.rules-group-header input[name$=_cond]:checked').val();
    };

    /**
     * Returns the selected filter of a rule
     * @param $rule {jQuery} (<li> element)
     * @return {string}
     */
    QueryBuilder.prototype.getRuleFilter = function($rule) {
        return $rule.find('.rule-filter-container select[name$=_filter]').val();
    };

    /**
     * Returns the selected operator of a rule
     * @param $rule {jQuery} (<li> element)
     * @return {string}
     */
    QueryBuilder.prototype.getRuleOperator = function($rule) {
        return $rule.find('.rule-operator-container select[name$=_operator]').val();
    };

    /**
     * Returns rule value
     * @param $rule {jQuery} (<li> element)
     * @param filter {object} (optional - current rule filter)
     * @param operator {object} (optional - current rule operator)
     * @return {string|string[]|undefined}
     */
    QueryBuilder.prototype.getRuleValue = function($rule, filter, operator) {
        filter = filter || this.getFilterById(this.getRuleFilter($rule));
        operator = operator || this.getOperatorByType(this.getRuleOperator($rule));

        var out = [], tmp = [],
            $value = $rule.find('.rule-value-container');

        for (var i=0; i<operator.accept_values; i++) {
            var name = $rule[0].id + '_value_' + i;

            switch (filter.input) {
                case 'radio':
                    out.push($value.find('input[name='+ name +']:checked').val());
                    break;

                case 'checkbox':
                    $value.find('input[name='+ name +']:checked').each(function() {
                        tmp.push($(this).val());
                    });
                    out.push(tmp);
                    break;

                case 'select':
                    if (filter.multiple) {
                        $value.find('select[name='+ name +'] option:selected').each(function() {
                            tmp.push($(this).val());
                        });
                        out.push(tmp);
                    }
                    else {
                        out.push($value.find('select[name='+ name +'] option:selected').val());
                    }
                    break;

                /* falls through */
                case 'text': default:
                    out.push($value.find('input[name='+ name +']').val());
            }
        }

        if (operator.accept_values == 1) {
            out = out[0];
        }

        if (filter.valueParser) {
            out = filter.valueParser.call(this, $rule, out, filter, operator);
        }

        return out;
    };

    /**
     * Sets the value of a rule.
     * @param $rule {jQuery} (<li> element)
     * @param rule {object}
     * @param filter {object}
     * @param operator {object}
     */
    QueryBuilder.prototype.setRuleValue = function($rule, rule, filter, operator) {
        filter = filter || this.getFilterById(this.getRuleFilter($rule));
        operator = operator || this.getOperatorByType(this.getRuleOperator($rule));

        if (filter.valueSetter) {
            filter.valueSetter.call(this, $rule, rule.value, filter, operator);
            return;
        }

        var $value = $rule.find('.rule-value-container'),
            val;

        if (operator.accept_values == 1) {
            val = [rule.value];
        }
        else {
            val = rule.value;
        }

        for (var i=0; i<operator.accept_values; i++) {
            var name = $rule[0].id +'_value_'+ i;

            switch (filter.input) {
                case 'radio':
                    $value.find('input[name='+ name +'][value="'+ val[i] +'"]').prop('checked', true).trigger('change');
                    break;

                case 'checkbox':
                    if (!$.isArray(val[i])) {
                        val[i] = [val[i]];
                    }
                    $.each(val[i], function(i, value) {
                        $value.find('input[name='+ name +'][value="'+ value +'"]').prop('checked', true).trigger('change');
                    });
                    break;

                case 'select':
                    $value.find('select[name='+ name +']').val(val[i]).trigger('change');
                    break;

                /* falls through */
                case 'text': default:
                    $value.find('input[name='+ name +']').val(val[i]).trigger('change');
                    break;
            }
        }

        var flags = this.getRuleFlags(rule);
        $rule.data('queryBuilder').flags = flags;

        if (flags.filter_readonly) {
            $rule.find('select[name$=_filter]').prop('disabled', true);
        }
        if (flags.operator_readonly) {
            $rule.find('select[name$=_operator]').prop('disabled', true);
        }
        if (flags.value_readonly) {
            $rule.find('input[name*=_value_], select[name*=_value_]').prop('disabled', true);
        }
        if (flags.no_delete) {
            $rule.find('[data-delete=rule]').remove();
        }
        if (flags.no_sortable) {
            $rule.find('.drag-handle').remove();
        }
    };


    // TEMPLATES
    // ===============================
    /**
     * Returns group HTML
     * @param group_id {string}
     * @param level {int}
     * @return {string}
     */
    QueryBuilder.prototype.getGroupTemplate = function(group_id, level) {
        var h = '\
<dl id="'+ group_id +'" class="rules-group-container" '+ (this.settings.sortable ? 'draggable="true"' : '') +'> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="' + this.icons.add_rule + '"></i> '+ this.lang.add_rule +' \
      </button> \
      '+ (this.settings.allow_groups===-1 || this.settings.allow_groups>=level ? '<button type="button" class="btn btn-xs btn-success" data-add="group"> \
        <i class="' + this.icons.add_group + '"></i> '+ this.lang.add_group +' \
      </button>' : '') +' \
      '+ (level>1 ? '<button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
        <i class="' + this.icons.remove_group + '"></i> '+ this.lang.delete_group +' \
      </button>' : '') +' \
    </div> \
    <div class="btn-group"> \
      '+ this.getGroupConditions(group_id) +' \
    </div> \
    '+ (this.settings.sortable && level>1 ? '<div class="drag-handle"><i class="' + this.icons.sort + '"></i></div>' : '') +' \
    '+ (this.settings.display_errors ? '<div class="error-container" data-toggle="tooltip" data-placement="right"><i class="' + this.icons.error + '"></i></div>' : '') +'\
  </dt> \
  <dd class=rules-group-body> \
    <ul class=rules-list></ul> \
  </dd> \
</dl>';
        return h;
    };

    /**
     * Returns group conditions HTML
     * @param group_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getGroupConditions = function(group_id) {
        var h = '';

        for (var i=0, l=this.settings.conditions.length; i<l; i++) {
            var cond = this.settings.conditions[i],
                active = cond == this.settings.default_condition,
                label = this.lang['condition_'+ cond.toLowerCase()] || cond;

            h+= '\
            <label class="btn btn-xs btn-primary '+ (active?'active':'') +'"> \
              <input type="radio" name="'+ group_id +'_cond" value="'+ cond +'" '+ (active?'checked':'') +'> '+ label +' \
            </label>';
        }

        return h;
    };

    /**
     * Returns rule HTML
     * @param rule_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleTemplate = function(rule_id) {
        var h = '\
<li id="'+ rule_id +'" class="rule-container" '+ (this.settings.sortable ? 'draggable="true"' : '') +'> \
  <div class="rule-header"> \
    <div class="btn-group pull-right"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule"> \
        <i class="' + this.icons.remove_rule + '"></i> '+ this.lang.delete_rule +' \
      </button> \
    </div> \
  </div> \
  '+ (this.settings.sortable ? '<div class="drag-handle"><i class="' + this.icons.sort + '"></i></div>' : '') +' \
  '+ (this.settings.display_errors ? '<div class="error-container" data-toggle="tooltip" data-placement="right"><i class="' + this.icons.error + '"></i></div>' : '') +'\
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</li>';
        return h;
    };

    /**
     * Returns rule filter <select> HTML
     * @param rule_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleFilterSelect = function(rule_id) {
        var optgroup = null;

        var h = '<select name="'+ rule_id +'_filter">';
        h+= '<option value="-1">'+ this.lang.filter_select_placeholder +'</option>';

        $.each(this.filters, function(i, filter) {
            if (optgroup != filter.optgroup) {
                if (optgroup !== null) h+= '</optgroup>';
                optgroup = filter.optgroup;
                if (optgroup !== null) h+= '<optgroup label="'+ optgroup +'">';
            }

            h+= '<option value="'+ filter.id +'">'+ filter.label +'</option>';
        });

        if (optgroup !== null) h+= '</optgroup>';
        h+= '</select>';
        return h;
    };

    /**
     * Returns rule operator <select> HTML
     * @param rule_id {string}
     * @param operators {object}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleOperatorSelect = function(rule_id, operators) {
        var h = '<select name="'+ rule_id +'_operator">';

        for (var i=0, l=operators.length; i<l; i++) {
            var label = this.lang.operators[operators[i].type] || operators[i].type;
            h+= '<option value="'+ operators[i].type +'">'+ label +'</option>';
        }

        h+= '</select>';
        return h;
    };

    /**
     * Return the rule value HTML
     * @param rule_id {string}
     * @param filter {object}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleInput = function(rule_id, filter, value_id) {
        if (typeof filter.input == 'function') {
            var $rule = this.$el.find('#'+ rule_id);
            return filter.input.call(this, $rule, filter, value_id);
        }

        var validation = filter.validation || {},
            name = rule_id +'_value_'+ value_id,
            h = '', c;

        switch (filter.input) {
            case 'radio':
                c = filter.vertical ? ' class=block' : '';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="radio" name="'+ name +'" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'checkbox':
                c = filter.vertical ? ' class=block' : '';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="checkbox" name="'+ name +'" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'select':
                h+= '<select name="'+ name +'"'+ (filter.multiple ? ' multiple' : '') +'>';
                iterateOptions(filter.values, function(key, val) {
                    h+= '<option value="'+ key +'"> '+ val +'</option> ';
                });
                h+= '</select>';
                break;

            /* falls through */
            case 'text': default:
                switch (filter.internalType) {
                    case 'number':
                        h+= '<input type="number" name="'+ name +'"';
                        if (validation.step !== undefined) h+= ' step="'+ validation.step +'"';
                        if (validation.min !== undefined) h+= ' min="'+ validation.min +'"';
                        if (validation.max !== undefined) h+= ' max="'+ validation.max +'"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        h+= '>';
                        break;

                    /* falls through */
                    case 'datetime': case 'text': default:
                        h+= '<input type="text" name="'+ name +'"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        h+= '>';
                }
        }

        return h;
    };

    /**
     * Clean rule flags.
     * @param rule {object}
     * @return {object}
     */
    QueryBuilder.prototype.getRuleFlags = function(rule) {
        var flags = merge(this.settings.default_rule_flags);

        if (rule.readonly) {
            merge(true, flags, {
                filter_readonly: true,
                operator_readonly: true,
                value_readonly: true,
                no_delete: true
            });
        }

        if (rule.flags) {
            merge(true, flags, rule.flags);
        }

        return flags;
    };


    // JQUERY PLUGIN DEFINITION
    // ===============================
    $.fn.queryBuilder = function(option) {
        if (this.length > 1) {
            $.error('Unable to initialize on multiple target');
        }

        var data = this.data('queryBuilder'),
            options = (typeof option == 'object' && option) || {};

        if (!data && option == 'destroy') {
            return this;
        }
        if (!data) {
            this.data('queryBuilder', new QueryBuilder(this, options));
        }
        if (typeof option == 'string') {
            return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
        }

        return this;
    };

    $.fn.queryBuilder.defaults = {
        set: function(options) {
            merge(true, QueryBuilder.DEFAULTS, options);
        },
        get: function(key) {
            var options = QueryBuilder.DEFAULTS;
            if (key) {
                options = options[key];
            }
            return $.extend(true, {}, options);
        }
    };

    $.fn.queryBuilder.constructor = QueryBuilder;


    // UTILITIES
    // ===============================
    /**
     * From Highcharts library
     * https://gist.github.com/highslide-software/f646f39d51d18b7d6bfb
     * -----------------------
     * Deep merge two or more objects and return a third object. If the first argument is
     * true, the contents of the second object is copied into the first object.
     * Previously this function redirected to jQuery.extend(true), but this had two limitations.
     * First, it deep merged arrays, which lead to workarounds in Highcharts. Second,
     * it copied properties from extended prototypes.
     */
    function merge() {
        var i,
          args = arguments,
          len,
          ret = {};

        function doCopy(copy, original) {
            var value, key;

            // An object is replacing a primitive
            if (typeof copy !== 'object') {
                copy = {};
            }

            for (key in original) {
                if (original.hasOwnProperty(key)) {
                    value = original[key];

                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (value && key !== 'renderTo' && typeof value.nodeType !== 'number' &&
                        typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]') {
                        copy[key] = doCopy(copy[key] || {}, value);
                    }
                    // Primitives and arrays are copied over directly
                    else {
                        copy[key] = original[key];
                    }
                }
            }

            return copy;
        }

        // If first argument is true, copy into the existing object. Used in setOptions.
        if (args[0] === true) {
            ret = args[1];
            args = Array.prototype.slice.call(args, 2);
        }

        // For each argument, extend the return
        len = args.length;
        for (i = 0; i < len; i++) {
            ret = doCopy(ret, args[i]);
        }

        return ret;
    }

    /**
     * Utility to iterate over radio/checkbox/selection options.
     * it accept three formats: array of values, map, array of 1-element maps
     *
     * @param options {object|array}
     * @param tpl {callable} (takes key and text)
     */
    function iterateOptions(options, tpl) {
        if (options) {
            if ($.isArray(options)) {
                $.each(options, function(index, entry) {
                    // array of one-element maps
                    if ($.isPlainObject(entry)) {
                        $.each(entry, function(key, val) {
                            tpl(key, val);
                            return false; // break after first entry
                        });
                    }
                    // array of values
                    else {
                        tpl(index, entry);
                    }
                });
            }
            // unordered map
            else {
                $.each(options, function(key, val) {
                    tpl(key, val);
                });
            }
        }
    }

    /**
     * Replaces {0}, {1}, ... in a string
     * @param str {string}
     * @param args,... {string|int|float}
     * @return {string}
     */
    function fmt(str, args) {
        args = Array.prototype.slice.call(arguments);

        return str.replace(/{([0-9]+)}/g, function(m, i) {
            return args[parseInt(i)+1];
        });
    }

}(jQuery));