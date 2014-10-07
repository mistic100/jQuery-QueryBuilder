/*!
 * jQuery QueryBuilder 1.3.0-SNAPSHOT
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
/*jshint multistr:true */

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
        inputs = [
            'text',
            'radio',
            'checkbox',
            'select'
        ];


    // CLASS DEFINITION
    // ===============================
    var QueryBuilder = function($el, options) {
        // variables
        this.$el = $el;

        this.settings = merge(QueryBuilder.DEFAULTS, options);
        this.status = { group_id: 0, rule_id: 0, generatedId: false };

        this.filters = this.settings.filters;
        this.lang = this.settings.lang;
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

        // check filters
        if (!this.filters || this.filters.length < 1) {
            $.error('Missing filters list');
        }
        this.checkFilters();

        // init
        this.init(options);
    };


    // DEFAULT CONFIG
    // ===============================
    QueryBuilder.DEFAULTS = {
        onValidationError: null,
        onAfterAddGroup: null,
        onAfterAddRule: null,

        allow_groups: true,
        sortable: false,
        filters: [],
        conditions: ['AND', 'OR'],
        default_condition: 'AND',
        readonly_behavior: {
            delete_group: false,
            sortable: true
        },

        template: {
            group: null,
            rule: null
        },

        lang: {
            add_rule: 'Add rule',
            add_group: 'Add group',
            delete_rule: 'Delete',
            delete_group: 'Delete',

            condition_and: 'AND',
            condition_or: 'OR',

            filter_select_placeholder: '------',

            operator_equal: 'equal',
            operator_not_equal: 'not equal',
            operator_in: 'in',
            operator_not_in: 'not in',
            operator_less: 'less',
            operator_less_or_equal: 'less or equal',
            operator_greater: 'greater',
            operator_greater_or_equal: 'greater or equal',
            operator_begins_with: 'begins with',
            operator_not_begins_with: 'doesn\'t begin with',
            operator_contains: 'contains',
            operator_not_contains: 'doesn\'t contain',
            operator_ends_with: 'ends with',
            operator_not_ends_with: 'doesn\'t end with',
            operator_is_empty: 'is empty',
            operator_is_not_empty: 'is not empty',
            operator_is_null: 'is null',
            operator_is_not_null: 'is not null'
        },

        operators: [
            {type: 'equal',            accept_values: true,  apply_to: ['string', 'number', 'datetime']},
            {type: 'not_equal',        accept_values: true,  apply_to: ['string', 'number', 'datetime']},
            {type: 'in',               accept_values: true,  apply_to: ['string', 'number', 'datetime']},
            {type: 'not_in',           accept_values: true,  apply_to: ['string', 'number', 'datetime']},
            {type: 'less',             accept_values: true,  apply_to: ['number', 'datetime']},
            {type: 'less_or_equal',    accept_values: true,  apply_to: ['number', 'datetime']},
            {type: 'greater',          accept_values: true,  apply_to: ['number', 'datetime']},
            {type: 'greater_or_equal', accept_values: true,  apply_to: ['number', 'datetime']},
            {type: 'begins_with',      accept_values: true,  apply_to: ['string']},
            {type: 'not_begins_with',  accept_values: true,  apply_to: ['string']},
            {type: 'contains',         accept_values: true,  apply_to: ['string']},
            {type: 'not_contains',     accept_values: true,  apply_to: ['string']},
            {type: 'ends_with',        accept_values: true,  apply_to: ['string']},
            {type: 'not_ends_with',    accept_values: true,  apply_to: ['string']},
            {type: 'is_empty',         accept_values: false, apply_to: ['string']},
            {type: 'is_not_empty',     accept_values: false, apply_to: ['string']},
            {type: 'is_null',          accept_values: false, apply_to: ['string', 'number', 'datetime']},
            {type: 'is_not_null',      accept_values: false, apply_to: ['string', 'number', 'datetime']}
        ]
    };


    // PUBLIC METHODS
    // ===============================
    /**
     * Init event handlers and default display
     */
    QueryBuilder.prototype.init = function(options) {
        var that = this;

        // EVENTS
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

            that.createRuleOperators($rule, $this.val());
            that.createRuleInput($rule, $this.val());
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
                $ul = $this.closest('.rules-group-container').find('>.rules-group-body>.rules-list');

            that.addRule($ul);
        });

        // add group button
        if (this.settings.allow_groups) {
            this.$el.on('click.queryBuilder', '[data-add=group]', function() {
                var $this = $(this),
                    $ul = $this.closest('.rules-group-container').find('>.rules-group-body>.rules-list');

                that.addGroup($ul);
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

        // INIT
        if (this.settings.sortable) {
            this.initSortable();
        }

        this.$el.addClass('query-builder');

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

        this.addRule(this.$el.find('>.rules-group-container>.rules-group-body>.rules-list').empty());
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
        this.markRuleAsError(this.$el.find('.rule-container'), false);

        var $group = this.$el.find('>.rules-group-container'),
            that = this;

        return (function parse($group) {
            var out = {},
                $elements = $group.find('>.rules-group-body>.rules-list>*');

            out.condition = $group.find('>.rules-group-header input[name$=_cond]:checked').val();
            out.rules = [];

            for (var i=0, l=$elements.length; i<l; i++) {
                var $rule = $elements.eq(i),
                    rule;

                if ($rule.hasClass('rule-container')) {
                    var filterId = that.getRuleFilter($rule);

                    if (filterId == '-1') {
                        continue;
                    }

                    var filter = that.getFilterById(filterId),
                        operator = that.getOperatorByType(that.getRuleOperator($rule)),
                        value = null;

                    if (operator.accept_values) {
                        value = that.getRuleValue($rule, filter);
                        if (filter.valueParser) {
                            value = filter.valueParser.call(this, $rule, value, filter, operator);
                        }

                        var valid = that.validateValue(value, filter);
                        if (valid !== true) {
                            that.markRuleAsError($rule, true);
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
                $ul = $group.find('>.rules-group-body>.rules-list'),
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
                    if (!that.settings.allow_groups) {
                        $.error('Groups are disabled');
                    }
                    else {
                        add(rule, $ul);
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

                    var $rule = that.addRule($ul),
                        filter = that.getFilterById(rule.id),
                        operator = that.getOperatorByType(rule.operator),
                        $value = $rule.find('.rule-value-container');

                    $rule.find('.rule-filter-container select[name$=_filter]').val(rule.id).trigger('change');
                    $rule.find('.rule-operator-container select[name$=_operator]').val(rule.operator).trigger('change');

                    if (operator.accept_values) {
                        switch (filter.input) {
                            case 'radio':
                                $value.find('input[name$=_value][value="'+ rule.value +'"]').prop('checked', true).trigger('change');
                                break;

                            case 'checkbox':
                                if (!$.isArray(rule.value)) {
                                    rule.value = [rule.value];
                                }
                                $.each(rule.value, function(i, value) {
                                    $value.find('input[name$=_value][value="'+ value +'"]').prop('checked', true).trigger('change');
                                });
                                break;

                            case 'select':
                                $value.find('select[name$=_value]').val(rule.value).trigger('change');
                                break;

                            /* falls through */
                            case 'text': default:
                                $value.find('input[name$=_value]').val(rule.value).trigger('change');
                                break;
                        }

                        if (rule.readonly) {
                            $rule.find('input, select').prop('disabled', true);
                            $rule.addClass('disabled').find('[data-delete=rule]').remove();

                            if (that.settings.sortable && !that.settings.readonly_behavior.sortable) {
                                $rule.find('.drag-handle').remove();
                            }
                        }
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
    };

    /**
     * Add a new rules group
     * @param container {jQuery} (parent <li>)
     * @param addRule {bool} (optional - add a default empty rule)
     * @return $group {jQuery}
     */
    QueryBuilder.prototype.addGroup = function(container, addRule) {
        var group_id = this.nextGroupId(),
            first = group_id == this.$el_id + '_group_0',
            $group = $(this.template.group.call(this, group_id, first));

        container.append($group);

        if (this.settings.onAfterAddGroup) {
            this.settings.onAfterAddGroup.call(this, $group);
        }

        if (addRule === undefined || addRule === true) {
            this.addRule($group.find('>.rules-group-body>.rules-list'));
        }

        return $group;
    };

    /**
     * Tries to delete a group after checks
     * @param $group {jQuery}
     */
    QueryBuilder.prototype.deleteGroup = function($group) {
        if ($group[0].id == this.$el_id + '_group_0') {
            return;
        }

        if (this.settings.readonly_behavior.delete_group) {
            $group.remove();
        }

        var that = this,
            keepGroup = false;

        $group.find('>.rules-group-body>.rules-list>*').each(function() {
            var $element = $(this);

            if ($element.hasClass('rule-container')) {
                if ($element.hasClass('disabled')) {
                    keepGroup = true;
                }
                else {
                    $element.remove();
                }
            }
            else {
                that.deleteGroup($element);
            }
        });

        if (!keepGroup) {
            $group.remove();
        }
    };

    /**
     * Add a new rule
     * @param container {jQuery} (parent <ul>)
     * @return $rule {jQuery}
     */
    QueryBuilder.prototype.addRule = function(container) {
        var rule_id = this.nextRuleId(),
            $rule = $(this.template.rule.call(this, rule_id)),
            $filterSelect = $(this.getRuleFilterSelect(rule_id));

        container.append($rule);
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
     * @param filterId {string}
     */
    QueryBuilder.prototype.createRuleOperators = function($rule, filterId) {
        var $operatorContainer = $rule.find('.rule-operator-container').empty();

        if (filterId == '-1') {
            return;
        }

        var operators = this.getOperators(filterId),
            $operatorSelect = $(this.getRuleOperatorSelect($rule.attr('id'), operators));

        $operatorContainer.html($operatorSelect);

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
     * @param filterId {string}
     */
    QueryBuilder.prototype.createRuleInput = function($rule, filterId) {
        var $valueContainer = $rule.find('.rule-value-container').empty();

        if (filterId == '-1') {
            return;
        }

        var operator = this.getOperatorByType(this.getRuleOperator($rule));

        if (!operator.accept_values) {
            return;
        }

        var filter = this.getFilterById(filterId),
            $ruleInput = $(this.getRuleInput($rule.attr('id'), filter));

        $valueContainer.append($ruleInput).show();

        if (filter.onAfterCreateRuleInput) {
            filter.onAfterCreateRuleInput.call(this, $rule, filter);
        }

        // init external jquery plugin
        if (filter.plugin) {
            $ruleInput[filter.plugin](filter.plugin_config || {});
        }
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

        if (!operator.accept_values) {
            $valueContainer.hide();
        }
        else {
            $valueContainer.show();

            if ($valueContainer.is(':empty')) {
                this.createRuleInput($rule, filter.id);
            }
        }

        if (filter.onAfterChangeOperator) {
            filter.onAfterChangeOperator.call(this, $rule, filter, operator);
        }
    };

    /**
     * Check if a value is correct for a filter
     * @param value {string|string[]|undefined}
     * @param filter {object}
     * @return {string|true}
     */
    QueryBuilder.prototype.validateValue = function(value, filter) {
        var validation = filter.validation || {};

        if (validation.callback) {
            return validation.callback.call(this, value, filter);
        }

        switch (filter.input) {
            case 'radio':
                if (value === undefined) {
                    return 'radio_empty';
                }
                break;

            case 'checkbox':
                if (value.length === 0) {
                    return 'checkbox_empty';
                }
                break;

            case 'select':
                if (filter.multiple) {
                    if (value.length === 0) {
                        return 'select_empty';
                    }
                }
                else {
                    if (value === undefined) {
                        return 'select_empty';
                    }
                }
                break;

            /* falls through */
            case 'text': default:
                switch (filter.internalType) {
                    case 'string':
                        if (validation.min !== undefined) {
                            if (value.length < validation.min) {
                                return 'string_exceed_min_length';
                            }
                        }
                        else if (value.length === 0) {
                            return 'string_empty';
                        }
                        if (validation.max !== undefined) {
                            if (value.length > validation.max) {
                                return 'string_exceed_max_length';
                            }
                        }
                        if (validation.format) {
                            if (!(validation.format.test(value))) {
                                return 'string_invalid_format';
                            }
                        }
                        break;

                    case 'number':
                        if (isNaN(value)) {
                            return 'number_nan';
                        }
                        if (filter.type == 'integer') {
                            if (parseInt(value) != value) {
                                return 'number_not_integer';
                            }
                        }
                        else {
                            if (parseFloat(value) != value) {
                                return 'number_not_double';
                            }
                        }
                        if (validation.min !== undefined) {
                            if (value < validation.min) {
                                return 'number_exceed_min';
                            }
                        }
                        if (validation.max !== undefined) {
                            if (value > validation.max) {
                                return 'number_exceed_max';
                            }
                        }
                        if (validation.step) {
                            var v = value/validation.step;
                            if (parseInt(v) != v) {
                                return 'number_wrong_step';
                            }
                        }
                        break;

                    case 'datetime':
                        // we need MomentJS
                        if (window.moment) {
                            if (validation.format) {
                                var datetime = moment(value, validation.format);
                                if (!datetime.isValid()) {
                                    return 'datetime_invalid';
                                }
                                else {
                                    if (validation.min) {
                                        if (datetime < moment(validation.min, validation.format)) {
                                            return 'datetime_exceed_min';
                                        }
                                    }
                                    if (validation.max) {
                                        if (datetime > moment(validation.max, validation.format)) {
                                            return 'datetime_exceed_max';
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
        }

        return true;
    };

    /**
     * Add CSS for rule error
     * @param $rule {jQuery} (<li> element)
     * @param status {bool}
     */
    QueryBuilder.prototype.markRuleAsError = function($rule, status) {
        if (status) {
            $rule.addClass('has-error');
        }
        else {
            $rule.removeClass('has-error');
        }
    };

    /**
     * Trigger a validation error event with custom params
     */
    QueryBuilder.prototype.triggerValidationError = function(error, $rule, value, filter, operator) {
        if (filter.onValidationError) {
            filter.onValidationError.call(this, $rule, error, value, filter, operator);
        }
        if (this.settings.onValidationError) {
            this.settings.onValidationError.call(this, $rule, error, value, filter, operator);
        }

        var e = jQuery.Event('validationError.queryBuilder', {
            error: error,
            filter: filter,
            operator: operator,
            value: value,
            targetRule: $rule[0],
            builder: this
        });

        this.$el.trigger(e);
    };

    /**
     * Init HTML5 drag and drop
     */
    QueryBuilder.prototype.initSortable = function() {
        // configure jQuery to use dataTransfer
        $.event.props.push('dataTransfer');

        var placeholder, src, isHandle = false;

        this.$el.on('mousedown', '.drag-handle', function(e) {
            isHandle = true;
        });
        this.$el.on('mouseup', '.drag-handle', function(e) {
            isHandle = false;
        });

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

        this.$el.on('dragenter', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var target = $(e.target), parent;

            parent = target.closest('.rule-container');
            if (parent.length) {
                placeholder.detach().insertAfter(parent);
                return;
            }

            parent = target.closest('.rules-group-container');
            if (parent.length) {
                placeholder.detach().appendTo(parent.find('.rules-list').eq(0));
                return;
            }
        });

        this.$el.on('dragover', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        this.$el.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var target = $(e.target), parent;

            parent = target.closest('.rule-container');
            if (parent.length) {
                src.detach().insertAfter(parent);
                return;
            }

            parent = target.closest('.rules-group-container');
            if (parent.length) {
                src.detach().appendTo(parent.find('.rules-list').eq(0));
                return;
            }
        });

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

            res.push({
                type: this.operators[i].type,
                label: this.lang['operator_'+this.operators[i].type] || this.operators[i].type
            });
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

        throw 'Undefined filter: '+ filterId;
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

        throw 'Undefined operator: '+ type;
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
     * @return {string|string[]|undefined}
     */
    QueryBuilder.prototype.getRuleValue = function($rule, filter) {
        filter = filter || this.getFilterByType(this.getRulefilter($rule));

        var out,
            $value = $rule.find('.rule-value-container');

        switch (filter.input) {
            case 'radio':
                out = $value.find('input[name$=_value]:checked').val();
                break;

            case 'checkbox':
                out = [];
                $value.find('input[name$=_value]:checked').each(function() {
                    out.push($(this).val());
                });
                break;

            case 'select':
                if (filter.multiple) {
                    out = [];
                    $value.find('select[name$=_value] option:selected').each(function() {
                        out.push($(this).val());
                    });
                }
                else {
                    out = $value.find('select[name$=_value] option:selected').val();
                }
                break;

            /* falls through */
            case 'text': default:
                out = $value.find('input[name$=_value]').val();
        }

        return out;
    };


    // TEMPLATES
    // ===============================
    /**
     * Returns group HTML
     * @param group_id {string}
     * @param main {boolean}
     * @return {string}
     */
    QueryBuilder.prototype.getGroupTemplate = function(group_id, main) {
        var h = '\
<dl id="'+ group_id +'" class="rules-group-container" '+ (this.settings.sortable ? 'draggable="true"' : '') +'> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="glyphicon glyphicon-plus"></i> '+ this.lang.add_rule +' \
      </button> \
      '+ (this.settings.allow_groups ? '<button type="button" class="btn btn-xs btn-success" data-add="group"> \
        <i class="glyphicon glyphicon-plus-sign"></i> '+ this.lang.add_group +' \
      </button>' : '') +' \
      '+ (!main ? '<button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
        <i class="glyphicon glyphicon-remove"></i> '+ this.lang.delete_group +' \
      </button>' : '') +' \
    </div> \
    <div class="btn-group"> \
      '+ this.getGroupConditions(group_id) +' \
    </div> \
    '+ (this.settings.sortable && !main ? '<div class="drag-handle"><i class="glyphicon glyphicon-sort"></i></div>' : '') +' \
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
        <i class="glyphicon glyphicon-remove"></i> '+ this.lang.delete_rule +' \
      </button> \
    </div> \
  </div> \
  '+ (this.settings.sortable ? '<div class="drag-handle"><i class="glyphicon glyphicon-sort"></i></div>' : '') +' \
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
        var h = '<select name="'+ rule_id +'_filter">';
        h+= '<option value="-1">'+ this.lang.filter_select_placeholder +'</option>';

        $.each(this.filters, function(i, filter) {
            h+= '<option value="'+ filter.id +'">'+ filter.label +'</option>';
        });

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
            h+= '<option value="'+ operators[i].type +'">'+ operators[i].label +'</option>';
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
    QueryBuilder.prototype.getRuleInput = function(rule_id, filter) {
        if (typeof filter.input == 'function') {
          var $rule = this.$el.find('#'+ rule_id);
          return filter.input.call(this, $rule, filter);
        }

        var validation = filter.validation || {},
            h = '', c;

        switch (filter.input) {
            case 'radio':
                c = filter.vertical ? ' class=block' : '';
                $.each(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="radio" name="'+ rule_id +'_value" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'checkbox':
                c = filter.vertical ? ' class=block' : '';
                $.each(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="checkbox" name="'+ rule_id +'_value" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'select':
                h+= '<select name="'+ rule_id +'_value"'+ (filter.multiple ? ' multiple' : '') +'>';
                if (filter.values) {
                    $.each(filter.values, function(key, val) {
                        h+= '<option value="'+ key +'"> '+ val +'</option> ';
                    });
                }
                h+= '</select>';
                break;

            /* falls through */
            case 'text': default:
                switch (filter.internalType) {
                    case 'number':
                        h+= '<input type="number" name="'+ rule_id +'_value"';
                        if (validation.step) h+= ' step="'+ validation.step +'"';
                        if (validation.min) h+= ' min="'+ validation.min +'"';
                        if (validation.max) h+= ' max="'+ validation.max +'"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        h+= '>';
                        break;

                    /* falls through */
                    case 'datetime': case 'text': default:
                        h+= '<input type="text" name="'+ rule_id +'_value"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        h+= '>';
                }
        }

        return h;
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

    /**
     * From Highcharts library
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

}(jQuery));

(function($){

    $.fn.queryBuilder.defaults.set({
        sqlOperators: {
            equal:            '= ?',
            not_equal:        '!= ?',
            in:               { op: 'IN(?)',     list: true },
            not_in:           { op: 'NOT IN(?)', list: true },
            less:             '< ?',
            less_or_equal:    '<= ?',
            greater:          '> ?',
            greater_or_equal: '>= ?',
            begins_with:      { op: 'LIKE(?)',     fn: function(v){ return v+'%'; } },
            not_begins_with:  { op: 'NOT LIKE(?)', fn: function(v){ return v+'%'; } },
            contains:         { op: 'LIKE(?)',     fn: function(v){ return '%'+v+'%'; } },
            not_contains:     { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v+'%'; } },
            ends_with:        { op: 'LIKE(?)',     fn: function(v){ return '%'+v; } },
            not_ends_with:    { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v; } },
            is_empty:         '== ""',
            is_not_empty:     '!= ""',
            is_null:          'IS NULL',
            is_not_null:      'IS NOT NULL'
        }
    });

    $.extend($.fn.queryBuilder.constructor.prototype, {

        /**
         * Get rules as SQL query
         * @param stmt {false|string} use prepared statements - false, 'question_mark' or 'numbered'
         * @param nl {bool} output with new lines
         * @param data {object} (optional) rules
         * @return {object}
         */
        getSQL: function(stmt, nl, data) {
            data = (data===undefined) ? this.getRules() : data;
            stmt = (stmt===true || stmt===undefined) ? 'question_mark' : stmt;
            nl =   (nl || nl===undefined) ? '\n' : ' ';

            var that = this,
                bind_index = 1,
                bind_params = [];

            var sql = (function parse(data) {
                if (!data.condition) {
                    data.condition = that.settings.default_condition;
                }
                if (that.settings.conditions.indexOf(data.condition.toUpperCase()) === -1) {
                    $.error('Unable to build SQL query with '+ data.condition +' condition');
                }

                if (!data.rules) {
                    return '';
                }

                var parts = [];

                $.each(data.rules, function(i, rule) {
                    if (rule.rules && rule.rules.length>0) {
                        parts.push('('+ nl + parse(rule) + nl +')'+ nl);
                    }
                    else {
                        var sql = that.getSqlOperator(rule.operator),
                            ope = that.getOperatorByType(rule.operator),
                            value = '';

                        if (sql === false) {
                            $.error('SQL operation unknown for operator '+ rule.operator);
                        }
                        
                        if (ope.accept_values) {
                            if (!(rule.value instanceof Array)) {
                                rule.value = [rule.value];
                            }
                            else if (!sql.list && rule.value.length>1) {
                                $.error('Operator '+ rule.operator +' cannot accept multiple values');
                            }

                            rule.value.forEach(function(v, i) {
                                if (i>0) {
                                    value+= ', ';
                                }

                                if (rule.type=='integer' || rule.type=='double') {
                                    v = changeType(v, rule.type);
                                }
                                else if (!stmt) {
                                    v = escapeString(v);
                                }

                                v = sql.fn(v);

                                if (stmt) {
                                    if (stmt == 'question_mark') {
                                        value+= '?';
                                    }
                                    else {
                                        value+= '$'+bind_index;
                                    }

                                    bind_params.push(v);
                                    bind_index++;
                                }
                                else {
                                    if (typeof v === 'string') {
                                        v = '\''+ v +'\'';
                                    }

                                    value+= v;
                                }
                            });
                        }

                        parts.push(rule.field +' '+ sql.op.replace(/\?/, value));
                    }
                });

                return parts.join(' '+ data.condition + nl);
            }(data));

            if (stmt) {
                return {
                    sql: sql,
                    params: bind_params
                };
            }
            else {
                return {
                    sql: sql
                };
            }
        },
        
        /**
         * Sanitize the "sql" field of an operator
         * @param sql {string|object}
         * @return {object}
         */
        getSqlOperator: function(type) {
            var sql = this.settings.sqlOperators[type];
            
            if (sql === undefined) {
                return false;
            }

            if (typeof sql === 'string') {
                sql = { op: sql };
            }
            if (!sql.fn) {
                sql.fn = passthru;
            }
            if (!sql.list) {
                sql.list = false;
            }

            return sql;
        }
    });


    /**
     * Does nothing !
     */
    function passthru(v) {
        return v;
    }

    /**
     * Change type of a value to int or float
     * @param value {mixed}
     * @param type {string}
     * @return {mixed}
     */
    function changeType(value, type) {
        switch (type) {
            case 'integer': return parseInt(value);
            case 'double': return parseFloat(value);
            default: return value;
        }
    }

    /**
     * Escape SQL value
     * @param value {string}
     * @return {string}
     */
    function escapeString(value) {
        if (typeof value !== 'string') {
            return value;
        }

        return value
          .replace(/[\0\n\r\b\\\'\"]/g, function(s) {
              switch(s) {
                  case '\0': return '\\0';
                  case '\n': return '\\n';
                  case '\r': return '\\r';
                  case '\b': return '\\b';
                  default:   return '\\' + s;
              }
          })
          // uglify compliant
          .replace(/\t/g, '\\t')
          .replace(/\x1a/g, '\\Z');
    }

}(jQuery));