/*!
 * QueryBuilder v1.0.0-SNAPSHOT
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
 /*
  * Dependencies :
  *   - jQuery
  *   - Bootstrap CSS
  *   - MomentJS (optional)
  */
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
        var that = this;

        // global variables
        this.$el = $el;

        this.settings = $.extend(true, {}, QueryBuilder.DEFAULTS, options);
        if (options.operators) { // force array overwrite
            this.settings.operators = options.operators.slice();
        }

        this.filters = this.settings.filters;
        this.lang = this.settings.lang;
        this.operators = this.settings.operators;
        this.status = { group_id: 0, rule_id: 0, generatedId: false };

        // ensure we have an container id
        if (!this.$el.attr('id')) {
            this.$el.attr('id', 'qb_'+Math.floor(Math.random()*99999));
            this.status.generatedId = true;
        }
        this.$el_id = this.$el.attr('id');

        // CHECK FILTERS
        if (!this.filters || this.filters.length < 1) {
            $.error('Missing filters list');
        }

        var definedFilters = [];

        $.each(this.filters, function(i, filter) {
            if (!filter.field) {
                $.error('Missing filter field: '+ i);
            }
            if (definedFilters.indexOf(filter.field) != -1) {
                $.error('Filter already defined: '+ filter.field);
            }
            definedFilters.push(filter.field);
            
            if (!filter.type) {
                $.error('Missing filter type: '+ filter.field);
            }
            if (types.indexOf(filter.type) == -1) {
                $.error('Invalid type: '+ filter.type);
            }
            
            if (!filter.input) {
                filter.input = 'text';
            }
            else if (inputs.indexOf(filter.input) == -1) {
                $.error('Invalid input: '+ filter.input);
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
                        $.error('Missing values for filter: '+ filter.field);
                    }
                    break;
            }
        });

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
                $rule = $this.closest('li');

            that.createRuleOperators($rule, $this.val());
            that.createRuleInput($rule, $this.val());
        });

        // rule operator change
        this.$el.on('change.queryBuilder', '.rule-operator-container select[name$=_operator]', function() {
            var $this = $(this),
                $rule = $this.closest('li');

            that.updateRuleOperator($rule, $this.val());
        });

        // add rule button
        this.$el.on('click.queryBuilder', '[data-add=rule]', function() {
            var $this = $(this),
                $ul = $this.closest('dl').find('>dd>ul');

            that.addRule($ul);
        });

        // add group button
        this.$el.on('click.queryBuilder', '[data-add=group]', function() {
            var $this = $(this),
                $ul = $this.closest('dl').find('>dd>ul');

            that.addGroup($ul);
        });

        // delete rule button
        this.$el.on('click.queryBuilder', '[data-delete=rule]', function() {
            var $this = $(this),
                $rule = $this.closest('li');

            $rule.remove();
        });

        // delete group button
        this.$el.on('click.queryBuilder', '[data-delete=group]', function() {
            var $this = $(this),
                $group = $this.closest('dl');

            $group.remove();
        });

        // INIT
        this.$el.addClass('query-builder');
        this.addGroup(this.$el);
    };

    QueryBuilder.DEFAULTS = {
        onValidationError: null,
        onAfterAddGroup: null,
        onAfterAddRule: null,
        
        filters: [],

        lang: {
            add_rule: 'Add rule',
            add_group: 'Add group',
            delete_rule: 'Delete',
            delete_group: 'Delete',

            and_condition: 'AND',
            or_condition: 'OR',
            
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

    // expose setDefaults static method
    window.QueryBuilder = {
        setDefaults: function(config) {
            $.extend(true, QueryBuilder.DEFAULTS, config);
        }
    };


    // PUBLIC METHODS
    // ===============================
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

        this.addRule(this.$el.find('>dl>dd>ul').empty());
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
        this.markRuleAsError(this.$el.find('li'), false);

        var $group = this.$el.find('>dl'),
            that = this;

        return (function parse($group) {
            var out = {},
                $elements = $group.find('>dd>ul>*');

            out.condition = $group.find('>dt input[name$=_cond]:checked').val();
            out.rules = [];

            for (var i=0, l=$elements.length; i<l; i++) {
                var $rule = $elements.eq(i);

                if ($rule.hasClass('rule-container')) {
                    var filterField = that.getRuleFilter($rule);

                    if (filterField == '-1') {
                        continue;
                    }

                    var filter = that.getFilterByField(filterField),
                        operator = that.getOperator(that.getRuleOperator($rule)),
                        value = null;
                        
                    if (operator.accept_values) {
                        value = that.getRuleValue($rule, filter);
                        var valid = that.validateValue(value, filter);

                        if (valid !== true) {
                            that.markRuleAsError($rule, true);
                            that.triggerValidationError(valid, filter, operator, value, $rule);
                            return {};
                        }
                    
                        if (filter.valueParser) {
                            value = filter.valueParser.call(this, value, filter, operator);
                        }
                    }

                    var rule = {
                        field: filter.field,
                        type: filter.type,
                        input: filter.input,
                        operator: operator.type,
                        value: value
                    };

                    out.rules.push(rule);
                }
                else {
                    var rule = parse($rule);
                    if (!$.isEmptyObject(rule)) {
                        out.rules.push(rule);
                    }
                }
            }
            
            if (out.rules.length == 0) {
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

        var $container = this.$el,
            that = this;

        (function add(data, $container){
            var $group = that.addGroup($container, false),
                $ul = $group.find('>dd>ul'),
                $buttons = $group.find('>dt input[name$=_cond]');
                
            if (!data.condition) {
                data.condition = 'AND';
            }

            $buttons.filter('[value=AND]').prop('checked', data.condition.toUpperCase() == 'AND');
            $buttons.filter('[value=OR]').prop('checked', data.condition.toUpperCase() == 'OR');
            $buttons.trigger('change');

            $.each(data.rules, function(i, rule) {
                if (rule.rules && rule.rules.length>0) {
                    add(rule, $ul);
                }
                else {
                    if (!rule.field) {
                        $.error('Missing rule field');
                    }
                    if (!rule.value) {
                        rule.value = '';
                    }
                    if (!rule.operator) {
                        rule.operator = 'equal';
                    }

                    var $rule = that.addRule($ul),
                        filter = that.getFilterByField(rule.field),
                        $value = $rule.find('.rule-value-container');

                    $rule.find('.rule-filter-container select[name$=_filter]').val(rule.field).trigger('change');
                    $rule.find('.rule-operator-container select[name$=_operator]').val(rule.operator).trigger('change');

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

                        case 'text': default:
                            $value.find('input[name$=_value]').val(rule.value).trigger('change');
                            break;
                    }
                    
                    if (filter.onAfterSetValue) {
                        filter.onAfterSetValue.call(this, $rule, rule.value, filter, rule.operator);
                    }
                }
            });

        }(data, $container));
    };


    // MAIN METHODS
    // ===============================
    /**
     * Add a new rules group
     * @param container {jQuery} (parent <li>)
     * @param addRule {bool} (optional - add a default empty rule)
     * @return $group {jQuery}
     */
    QueryBuilder.prototype.addGroup = function(container, addRule) {
        addRule = (addRule == null) ? true : addRule;

        var h = '',
            group_id = this.nextGroupId();

        h+= '<dl id='+ group_id +' class="rules-group-container">';
          h+= '<dt class="rules-group-header">'+ this.getGroupHeader(group_id) +'</dt>';
          h+= '<dd class=rules-group-body><ul class=rules-list></ul></dd>';
        h+= '</dl>';

        container.append(h);

        var $group = container.find('#'+ group_id);

        if (this.settings.onAfterAddGroup) {
            this.settings.onAfterAddGroup.call(this, $group);
        }

        if (addRule) {
            this.addRule($group.find('>dd>ul'));
        }

        return $group;
    };

    /**
     * Add a new rule
     * @param container {jQuery} (parent <ul>)
     * @return $rule {jQuery}
     */
    QueryBuilder.prototype.addRule = function(container) {
        var h = '',
            rule_id = this.nextRuleId();

        h+= '<li id='+ rule_id +' class="rule-container">';
          h+= '<div class="rule-header">'+ this.getRuleHeader(rule_id) +'</div>';
          h+= '<div class="rule-filter-container">'+ this.getRuleFilterSelect(rule_id) +'</div>';
          h+= '<div class="rule-operator-container"></div>';
          h+= '<div class="rule-value-container"></div>';
        h+= '</li>';

        container.append(h);
        
        var $rule = container.find('#'+ rule_id);
        
        if (this.settings.onAfterAddRule) {
            this.settings.onAfterAddRule.call(this, $rule);
        }

        return $rule;
    };

    /**
     * Create operators <select> for a rule
     * @param $rule {jQuery} (<li> element)
     * @param filterField {string}
     */
    QueryBuilder.prototype.createRuleOperators = function($rule, filterField) {
        var $operator_container = $rule.find('.rule-operator-container').empty(),
            rule_id = $rule.attr('id');

        if (filterField == '-1') {
            return;
        }

        var h = '',
            operators = this.getOperators(filterField);

        h+= '<select name="'+ rule_id +'_operator">';
        for (var i=0, l=operators.length; i<l; i++) {
            h+= '<option value="'+ operators[i].type +'">'+ operators[i].label +'</option>';
        }
        h+= '</select>';

        $rule.find('.rule-operator-container').html(h);
    };

    /**
     * Create main <input> for a rule
     * @param $rule {jQuery} (<li> element)
     * @param filterField {string}
     */
    QueryBuilder.prototype.createRuleInput = function($rule, filterField) {
        var $value_container = $rule.find('.rule-value-container').empty(),
            rule_id = $rule.attr('id');

        if (filterField == '-1') {
            return;
        }

        var filter = this.getFilterByField(filterField),
            operator = this.getOperator(this.getRuleOperator($rule)),
            validation = filter.validation || {},
            h = '';

        if (!operator.accept_values) {
            return;
        }

        switch (filter.input) {
            case 'radio':
                var c = filter.vertical ? ' class=block' : '';
                $.each(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="radio" name="'+ rule_id +'_value" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'checkbox':
                var c = filter.vertical ? ' class=block' : '';
                $.each(filter.values, function(key, val) {
                    h+= '<label'+ c +'><input type="checkbox" name="'+ rule_id +'_value" value="'+ key +'"> '+ val +'</label> ';
                });
                break;

            case 'select':
                h+= '<select name="'+ rule_id +'_value"';
                if (filter.multiple) {
                    h+= ' multiple';
                }
                h+= '>';
                if (filter.values) {
                    $.each(filter.values, function(key, val) {
                        h+= '<option value="'+ key +'"> '+ val +'</option> ';
                    });
                }
                h+= '</select>';
                break;

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

                    case 'datetime': case 'text': default:
                        h+= '<input type="text" name="'+ rule_id +'_value"';
                        if (filter.placeholder) h+= ' placeholder="'+ filter.placeholder +'"';
                        h+= '>';
                }
        }

        $value_container.html(h).show();
        
        if (filter.onAfterCreateRuleInput) {
            filter.onAfterCreateRuleInput.call(this, $rule, filter);
        }

        // init external jquery plugin
        if (filter.plugin) {
            $value_container.find(filter.input=='select' ? 'select' : 'input')[filter.plugin](filter.plugin_config || {});
        }
    };

    /**
     * Update main <input> visibility when rule operator changes
     * @param $rule {jQuery} (<li> element)
     * @param operatorType {string}
     */
    QueryBuilder.prototype.updateRuleOperator = function($rule, operatorType) {
        var $value_container = $rule.find('.rule-value-container'),
            filter = this.getFilterByField(this.getRuleFilter($rule));

        var operator = this.getOperator(operatorType);

        if (!operator.accept_values) {
            $value_container.hide();
        }
        else {
            $value_container.show();

            if ($value_container.is(':empty')) {
                this.createRuleInput($rule, this.getRulefilter($rule));
            }
        }
        
        if (filter.onAfterChangeOperator) {
            filter.onAfterChangeOperator.call(this, $rule, filter, operator.type);
        }
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


    // HELPERS
    // ===============================
    /**
     * Returns an incremented group ID
     * @return {string}
     */
    QueryBuilder.prototype.nextGroupId = function() {
        var ret = this.$el_id + '_group_' + this.status.group_id;
        this.status.group_id++;
        return ret;
    };

    /**
     * Returns an incremented rule ID
     * @return {string}
     */
    QueryBuilder.prototype.nextRuleId = function() {
        var ret = this.$el_id + '_rule_' + this.status.rule_id;
        this.status.rule_id++;
        return ret;
    };

    /**
     * Returns group header HTML
     * @param group_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getGroupHeader = function(group_id) {
        return '<div class="btn-group"> \
          <label class="btn btn-xs btn-primary active"><input type="radio" name="'+ group_id +'_cond" value="AND" checked> '+ this.lang.and_condition +'</label> \
          <label class="btn btn-xs btn-primary"><input type="radio" name="'+ group_id +'_cond" value="OR"> '+ this.lang.or_condition +'</label> \
        </div> \
        <div class="btn-group pull-right"> \
          <button class="btn btn-xs btn-success" data-add="rule"><i class="glyphicon glyphicon-plus"></i> '+ this.lang.add_rule +'</button> \
          <button class="btn btn-xs btn-success" data-add="group"><i class="glyphicon glyphicon-plus-sign"></i> '+ this.lang.add_group +'</button> \
          <button class="btn btn-xs btn-danger" data-delete="group"><i class="glyphicon glyphicon-remove"></i> '+ this.lang.delete_group +'</button> \
        </div>';
    };

    /**
     * Returns rule header HTML
     * @param rule_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleHeader = function(rule_id) {
        return '<div class="btn-group pull-right"> \
          <button class="btn btn-xs btn-danger" data-delete="rule"><i class="glyphicon glyphicon-remove"></i> '+ this.lang.delete_rule +'</button> \
        </div>';
    };

    /**
     * Returns rule filter <select> HTML
     * @param rule_id {string}
     * @return {string}
     */
    QueryBuilder.prototype.getRuleFilterSelect = function(rule_id) {
        var h = '';
        h+= '<select name="'+ rule_id +'_filter">';
        h+= '<option value="-1">'+ this.lang.filter_select_placeholder +'</option>';

        $.each(this.filters, function(i, filter) {
            h+= '<option value="'+ filter.field +'">'+ filter.label +'</option>';
        });

        h+= '</select>';
        return h;
    };
    
    /**
     * Trigger a validation error event with custom params
     */
    QueryBuilder.prototype.triggerValidationError = function(error, filter, operator, value, $rule) {
        if (filter.onValidationError) {
            filter.onValidationError.call(this, $rule, error, value, filter, operator);
        }
        if (this.settings.onValidationError) {
            this.settings.onValidationError.call(this, $rule, value, error, filter, operator);
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


    // VARIOUS DATA ACCESS
    // ===============================
    /**
     * Returns the operators for a filter
     * @param filter {string|object} (filter field name or filter object)
     * @return {object[]}
     */
    QueryBuilder.prototype.getOperators = function(filter) {
        if (typeof filter == 'string') {
            filter = this.getFilterByField(filter);
        }

        var res = [];

        for (var i=0, l=this.operators.length; i<l; i++) {
            if (this.operators[i].apply_to.indexOf(filter.internalType) == -1) {
                continue;
            }
            
            if (filter.operators) {
                if (filter.operators.indexOf(this.operators[i].type) == -1) {
                    continue;
                }
            }

            res.push({
                type: this.operators[i].type,
                label: this.lang['operator_'+this.operators[i].type]
            });
        }

        return res;
    };

    /**
     * Returns a particular filter by its field name
     * @param filterField {string}
     * @return {object}
     */
    QueryBuilder.prototype.getFilterByField = function(filterField) {
        for (var i=0, l=this.filters.length; i<l; i++) {
            if (this.filters[i].field == filterField) {
                return this.filters[i];
            }
        }

        throw 'Undefined filter: '+ filterField;
    };

    /**
     * Return a particular operator by its type
     * @param type {string}
     * @return {object}
     */
    QueryBuilder.prototype.getOperator = function(type) {
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

            case 'text': default:
                out = $value.find('input[name$=_value]').val();
        }

        return out;
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
                if (value == undefined) {
                    return 'radio_empty';
                }
                break;

            case 'checkbox':
                if (value.length == 0) {
                    return 'checkbox_empty';
                }
                break;

            case 'select':
                if (filter.multiple) {
                    if (value.length == 0) {
                        return 'select_empty';
                    }
                }
                else {
                    if (value == undefined) {
                        return 'select_empty';
                    }
                }
                break;

            case 'text': default:
                switch (filter.internalType) {
                    case 'string':
                        if (validation.min != undefined) {
                            if (value.length < validation.min) {
                                return 'string_exceed_min_length';
                            }
                        }
                        else if (value.length == 0) {
                            return 'string_empty';
                        }
                        if (validation.max != undefined) {
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
                        if (validation.min != undefined) {
                            if (value < validation.min) {
                                return 'number_exceed_min';
                            }
                        }
                        if (validation.max != undefined) {
                            if (value > validation.max) {
                                return 'number_exceed_max';
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

}(jQuery));