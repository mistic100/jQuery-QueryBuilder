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
        'textarea',
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

MicroEvent.mixin(QueryBuilder);


// PLUGINS SYSTEM
// Inspired by https://github.com/brianreavis/microplugin.js
// Very lightened and without dependencies
// ===============================
QueryBuilder.plugins = {};

/**
 * Access to defaults
 */
QueryBuilder.defaults = {
    set: function(options) {
        $.extendext(true, 'replace', QueryBuilder.DEFAULTS, options);
    },
    get: function(key) {
        var options = QueryBuilder.DEFAULTS;
        if (key) {
            options = options[key];
        }
        return $.extend(true, {}, options);
    }
};

/**
 * Define a new plugin
 * @param {string}
 * @param {function}
 */
QueryBuilder.define = function(name, fct) {
    QueryBuilder.plugins[name] = fct;
};

/**
 * Add new methods
 * @param {object}
 */
QueryBuilder.extend = function(methods) {
    $.extend(QueryBuilder.prototype, methods);
};

/**
 * Init plugins for an instance
 */
QueryBuilder.prototype.initPlugins = function() {
    if (!this.settings.plugins) {
        return;
    }

    var that = this,
        queue = {};

    if ($.isArray(this.settings.plugins)) {
        $.each(this.settings.plugins, function(i, plugin) {
            queue[plugin] = {};
        });
    }
    else {
        $.each(this.settings.plugins, function(plugin, options) {
            queue[plugin] = options;
        });
    }

    $.each(queue, function(plugin, options) {
        if (plugin in QueryBuilder.plugins) {
            QueryBuilder.plugins[plugin].call(that, options);
        }
        else {
            $.error('Unable to find plugin "' + plugin +'"');
        }
    });
};


// MAIN METHODS
// ===============================
/**
 * Init the builder
 */
QueryBuilder.prototype.init = function(options) {
    // PROPERTIES
    this.settings = $.extendext(true, 'replace', {}, QueryBuilder.DEFAULTS, options);
    this.model = null;
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

    // CHECK FILTERS
    if (!this.filters || this.filters.length < 1) {
        $.error('Missing filters list');
    }
    this.checkFilters();

    // ensure we have a container id
    if (!this.$el.attr('id')) {
        this.$el.attr('id', 'qb_'+Math.floor(Math.random()*99999));
        this.status.generatedId = true;
    }
    this.$el_id = this.$el.attr('id');

    this.$el.addClass('query-builder');

    // INIT
    this.bindEvents();

    this.initPlugins();

    this.trigger('afterInit');

    if (options.rules) {
        this.setRules(options.rules);
    }
    else {
        this.addGroup(this.$el, true);
    }
};

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

    this.trigger('afterCheckFilters');
};

/**
 * Add all events listeners
 */
QueryBuilder.prototype.bindEvents = function() {
    var that = this;

    // group condition change
    this.$el.on('change.queryBuilder', '.rules-group-header [name$=_cond]', function() {
        var $this = $(this),
            $group = $this.closest('.rules-group-container');

        if ($this.is(':checked')) {
            that.updateGroupCondition($group, $this.val());
        }
    });

    // rule filter change
    this.$el.on('change.queryBuilder', '.rule-filter-container [name$=_filter]', function() {
        var $this = $(this),
            $rule = $this.closest('.rule-container');

        that.updateRuleFilter($rule, $this.val());
    });

    // rule operator change
    this.$el.on('change.queryBuilder', '.rule-operator-container [name$=_operator]', function() {
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

    // delete rule button
    this.$el.on('click.queryBuilder', '[data-delete=rule]', function() {
        var $this = $(this),
            $rule = $this.closest('.rule-container');

        that.deleteRule($rule);
    });

    if (this.settings.allow_groups !== 0) {
        // add group button
        this.$el.on('click.queryBuilder', '[data-add=group]', function() {
            var $this = $(this),
                $group = $this.closest('.rules-group-container');

            that.addGroup($group);
        });

        // delete group button
        this.$el.on('click.queryBuilder', '[data-delete=group]', function() {
            var $this = $(this),
                $group = $this.closest('.rules-group-container');

            that.deleteGroup($group);
        });
    }
};

/**
 * Add a new rules group
 * @param $parent {jQuery}
 * @param addRule {bool} (optional - add a default empty rule)
 * @return $group {jQuery}
 */
QueryBuilder.prototype.addGroup = function($parent, addRule) {
    var is_root = !$parent.data(Node.DATAKEY),
        group_id = this.nextGroupId(),
        level = is_root ? 1 : $parent.data(Node.DATAKEY).level + 1,
        $container = is_root ? $parent : $parent.find('>.rules-group-body>.rules-list'),
        $group = $(this.template.group.call(this, group_id, level));

    var e = $.Event('addGroup.queryBuilder', {
        group_id: group_id,
        level: level,
        addRule: addRule,
        group: $group,
        parent: $parent,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return null;
    }

    var model = new Group(is_root ? null : $parent, $group);
    if (is_root) {
        this.model = model;
    }

    $container.append($group);

    if (this.settings.onAfterAddGroup) {
        this.settings.onAfterAddGroup.call(this, $group);
    }

    this.trigger('afterAddGroup', $group);

    if (addRule === undefined || addRule === true) {
        this.addRule($group);
    }

    return $group;
};

/**
 * Tries to delete a group. The group is not deleted if at least one rule is no_delete.
 * @param $group {jQuery}
 * @return {boolean} true if the group has been deleted
 */
QueryBuilder.prototype.deleteGroup = function($group) {
    if ($group.data(Node.DATAKEY).isRoot()) {
        return;
    }

    var e = $.Event('deleteGroup.queryBuilder', {
        group_id: $group[0].id,
        group: $group,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return false;
    }

    this.trigger('beforeDeleteGroup', $group);

    var that = this,
        keepGroup = false;

    $group.find('>.rules-group-body>.rules-list>*').each(function() {
        var $element = $(this);

        if ($element.hasClass('rule-container')) {
            if ($element.data(Node.DATAKEY).flags.no_delete) {
                keepGroup = true;
            }
            else {
                keepGroup |= !that.deleteRule($element);
            }
        }
        else {
            keepGroup|= !that.deleteGroup($element);
        }
    });

    if (!keepGroup) {
        $group.data(Node.DATAKEY).drop();
        $group.remove();
    }

    return !keepGroup;
};

/**
 * Changes the condition of a group
 * @param $group {jQuery}
 * @param condition {string}
 */
QueryBuilder.prototype.updateGroupCondition = function($group, condition) {
    $group.find('>.rules-group-header [name$=_cond]').each(function() {
        var $this = $(this);
        if ($this.val() === condition) {
            $this.prop('checked', true);
            $this.parent().addClass('active');
        }
        else {
            $this.prop('checked', false);
            $this.parent().removeClass('active');
        }
    });
    
    $group.data(Node.DATAKEY).condition = condition;
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

    var e = $.Event('addRule.queryBuilder', {
        rule_id: rule_id,
        rule: $rule,
        parent: $parent,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return null;
    }

    var model = new Rule($parent, $rule);

    $container.append($rule);
    $rule.find('.rule-filter-container').append($filterSelect);

    if (this.settings.onAfterAddRule) {
        this.settings.onAfterAddRule.call(this, $rule);
    }

    this.trigger('afterAddRule', $rule);

    return $rule;
};

/**
 * Delete a rule.
 * @param $rule {jQuery}
 * @return {boolean} true if the rule has been deleted
 */
QueryBuilder.prototype.deleteRule = function($rule) {
    var e = $.Event('deleteRule.queryBuilder', {
        rule_id: $rule[0].id,
        rule: $rule,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return false;
    }

    this.trigger('beforeDeleteRule', $rule);

    $rule.data(Node.DATAKEY).drop();
    $rule.remove();

    return true;
};

/**
 * Create operators <select> for a rule
 * @param $rule {jQuery} (<li> element)
 * @param filter {object}
 */
QueryBuilder.prototype.createRuleOperators = function($rule, filter) {
    var $operatorContainer = $rule.find('.rule-operator-container').empty();

    if (filter === null) {
        $rule.data(Node.DATAKEY).operator = null;
        return;
    }

    var operators = this.getOperators(filter),
        $operatorSelect = $(this.getRuleOperatorSelect($rule.attr('id'), operators));

    $operatorContainer.html($operatorSelect);

    $rule.data(Node.DATAKEY).operator = operators[0];

    this.trigger('afterCreateRuleOperators', $rule, filter, operators);
};

/**
 * Create main <input> for a rule
 * @param $rule {jQuery} (<li> element)
 * @param filter {object}
 */
QueryBuilder.prototype.createRuleInput = function($rule, filter, operator) {
    var $valueContainer = $rule.find('.rule-value-container').empty();

    if (filter === null) {
        return;
    }

    operator = operator || this.getRuleOperator($rule);

    if (operator.accept_values === 0) {
        return;
    }

    var $inputs = $();

    for (var i=0; i<operator.accept_values; i++) {
        var $ruleInput = $(this.getRuleInput($rule, filter, i));
        if (i > 0) $valueContainer.append(' , ');
        $valueContainer.append($ruleInput);
        $inputs = $inputs.add($ruleInput);
    }

    $valueContainer.show();

    if (filter.onAfterCreateRuleInput) {
        filter.onAfterCreateRuleInput.call(this, $rule, filter);
    }

    if (filter.plugin) {
        $inputs[filter.plugin](filter.plugin_config || {});
    }

    if (filter.default_value !== undefined) {
        this.setRuleValue($rule, filter.default_value, filter, operator);
    }

    this.trigger('afterCreateRuleInput', $rule, filter, operator);
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

    $rule.data(Node.DATAKEY).filter = filter;

    this.trigger('afterUpdateRuleFilter', $rule, filter);
};

/**
 * Update main <input> visibility when rule operator changes
 * @param $rule {jQuery} (<li> element)
 * @param operatorType {string}
 */
QueryBuilder.prototype.updateRuleOperator = function($rule, operatorType) {
    var $valueContainer = $rule.find('.rule-value-container'),
        filter = this.getRuleFilter($rule),
        operator = this.getOperatorByType(operatorType);

    if (operator.accept_values === 0) {
        $valueContainer.hide();
    }
    else {
        $valueContainer.show();

        var previousOperator = $rule.data(Node.DATAKEY).operator;

        if ($valueContainer.is(':empty') || operator.accept_values != previousOperator.accept_values) {
            this.createRuleInput($rule, filter, operator);
        }
    }

    $rule.data(Node.DATAKEY).operator = operator;

    if (filter.onAfterChangeOperator) {
        filter.onAfterChangeOperator.call(this, $rule, filter, operator);
    }

    this.trigger('afterChangeOperator', $rule, filter, operator);
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

    var e = $.Event('validationError.queryBuilder', {
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
        var errorLoc = $.extend([], error, [
            this.lang.errors[error[0]] || error[0]
        ]);

        $target.addClass('has-error');
        var $error = $target.find('.error-container').eq(0);
        $error.attr('title', fmt.apply(null, errorLoc));
    }

    this.trigger('validationError', $target, error);
};

/**
 * Change rules properties depending on flags.
 * @param $rule {jQuery} (<li> element)
 * @param rule {object}
 */
QueryBuilder.prototype.applyRuleFlags = function($rule, rule) {
    var flags = this.parseRuleFlags(rule);
    $rule.data(Node.DATAKEY).flags = flags;

    if (flags.filter_readonly) {
        $rule.find('[name$=_filter]').prop('disabled', true);
    }
    if (flags.operator_readonly) {
        $rule.find('[name$=_operator]').prop('disabled', true);
    }
    if (flags.value_readonly) {
        $rule.find('[name*=_value_]').prop('disabled', true);
    }
    if (flags.no_delete) {
        $rule.find('[data-delete=rule]').remove();
    }

    this.trigger('afterApplyRuleFlags', $rule, rule, flags);
};