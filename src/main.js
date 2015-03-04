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
 * Get or extend the default configuration
 * @param options {object,optional} new configuration, leave undefined to get the default config
 * @return {undefined|object} nothing or configuration object (copy)
 */
QueryBuilder.defaults = function(options) {
    if (typeof options === 'object') {
        $.extendext(true, 'replace', QueryBuilder.DEFAULTS, options);
    }
    else if (typeof options === 'string') {
        if (typeof QueryBuilder.DEFAULTS[options] === 'object') {
            return $.extend(true, {}, QueryBuilder.DEFAULTS[options]);
        }
        else {
            return QueryBuilder.DEFAULTS[options];
        }
    }
    else {
        return $.extend(true, {}, QueryBuilder.DEFAULTS)
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
            queue[plugin] = options || {};
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
    this.model = new Model();
    this.status = {
        group_id: 0,
        rule_id: 0,
        generated_id: false,
        has_optgroup: false,
        id: null
    };

    // "allow_groups" changed in 1.3.1 from boolean to int
    if (this.settings.allow_groups === false) {
        this.settings.allow_groups = 0;
    }
    else if (this.settings.allow_groups === true) {
        this.settings.allow_groups = -1;
    }

    // SETTINGS SHORTCUTS
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
        this.status.generated_id = true;
    }
    this.status.id = this.$el.attr('id');

    // INIT
    this.$el.addClass('query-builder');

    this.checkFilters();
    this.bindEvents();
    this.initPlugins();

    this.trigger('afterInit');

    if (options.rules) {
        this.setRules(options.rules);
    }
    else {
        this.setRoot(true);
    }
};

/**
 * Checks the configuration of each filter
 */
QueryBuilder.prototype.checkFilters = function() {
    var definedFilters = [],
        that = this;

    if (!this.filters || this.filters.length === 0) {
        $.error('Missing filters list');
    }

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
        if ($(this).is(':checked')) {
            var $group = $(this).closest('.rules-group-container');
            Model($group).condition = $(this).val();
        }
    });

    // rule filter change
    this.$el.on('change.queryBuilder', '.rule-filter-container [name$=_filter]', function() {
        var $rule = $(this).closest('.rule-container');
        Model($rule).filter = that.getFilterById($(this).val());
    });

    // rule operator change
    this.$el.on('change.queryBuilder', '.rule-operator-container [name$=_operator]', function() {
        var $rule = $(this).closest('.rule-container');
        Model($rule).operator = that.getOperatorByType($(this).val());
    });

    // add rule button
    this.$el.on('click.queryBuilder', '[data-add=rule]', function() {
        var $group = $(this).closest('.rules-group-container');
        that.addRule(Model($group));
    });

    // delete rule button
    this.$el.on('click.queryBuilder', '[data-delete=rule]', function() {
        var $rule = $(this).closest('.rule-container');
        that.deleteRule(Model($rule));
    });

    if (this.settings.allow_groups !== 0) {
        // add group button
        this.$el.on('click.queryBuilder', '[data-add=group]', function() {
            var $group = $(this).closest('.rules-group-container');
            that.addGroup(Model($group));
        });

        // delete group button
        this.$el.on('click.queryBuilder', '[data-delete=group]', function() {
            var $group = $(this).closest('.rules-group-container');
            that.deleteGroup(Model($group));
        });
    }

    // model events
    this.model.on({
        'drop': function(node) {
            node.$el.remove();
        },
        'add': function(node, index) {
            node.$el.detach();

            if (index === 0) {
                node.$el.prependTo(node.parent.$el.find('>.rules-group-body>.rules-list'));
            }
            else {
                node.$el.insertAfter(node.parent.rules[index-1].$el);
            }
        },
        'update': function(node, field, value, oldValue) {
            switch (field) {
                case 'error':
                    that.displayError(node);
                    break;

                case 'condition':
                    that.updateGroupCondition(node);
                    break;

                case 'filter':
                    that.updateRuleFilter(node);
                    break;

                case 'operator':
                    that.updateRuleOperator(node, oldValue);
                    break;

                case 'flags':
                    that.applyRuleFlags(node);
                    break;
            }
        }
    });
};

/**
 * Create the root group and bind events
 * @param addRule {bool} (optional - add a default empty rule)
 * @return group {Root}
 */
QueryBuilder.prototype.setRoot = function(addRule) {
    addRule = (addRule === undefined || addRule === true);

    var group_id = this.nextGroupId(),
        $group = $(this.template.group.call(this, group_id, 1));

    this.model.root = new Group(null, $group);
    this.$el.append(this.model.root.$el);
    this.model.root.model = this.model;
    this.model.root.condition = this.settings.default_condition;

    if (addRule) {
        this.addRule(this.model.root);
    }

    return this.model.root;
};

/**
 * Add a new rules group
 * @param parent {Group}
 * @param addRule {bool} (optional - add a default empty rule)
 * @return group {Group}
 */
QueryBuilder.prototype.addGroup = function(parent, addRule) {
    addRule = (addRule === undefined || addRule === true);

    var group_id = this.nextGroupId(),
        level = parent.level + 1,
        $group = $(this.template.group.call(this, group_id, level)),
        model;

    var e = $.Event('addGroup.queryBuilder', {
        group: $group,
        level: level,
        addRule: addRule,
        parent: parent,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return null;
    }

    model = parent.addGroup($group);

    if (this.settings.onAfterAddGroup) {
        this.settings.onAfterAddGroup.call(this, $group);
    }

    this.trigger('afterAddGroup', model);

    model.condition = this.settings.default_condition;

    if (addRule) {
        this.addRule(model);
    }

    return model;
};

/**
 * Tries to delete a group. The group is not deleted if at least one rule is no_delete.
 * @param group {Group}
 * @return {boolean} true if the group has been deleted
 */
QueryBuilder.prototype.deleteGroup = function(group) {
    if (group.isRoot()) {
        return;
    }

    var e = $.Event('deleteGroup.queryBuilder', {
        group: group,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return false;
    }

    this.trigger('beforeDeleteGroup', group);

    var that = this,
        del = true;

    group.each('reverse', function(rule) {
        del&= that.deleteRule(rule);
    }, function(group) {
        del&= that.deleteGroup(group);
    });

    if (del) {
        group.drop();
    }

    return del;
};

/**
 * Changes the condition of a group
 * @param group {Group}
 */
QueryBuilder.prototype.updateGroupCondition = function(group) {
    group.$el.find('>.rules-group-header [name$=_cond]').each(function() {
        var $this = $(this);
        $this.prop('checked', $this.val() === group.condition);
        $this.parent().toggleClass('active', $this.val() === group.condition);
    });
};

/**
 * Add a new rule
 * @param parent {Group}
 * @return rule {Rule}
 */
QueryBuilder.prototype.addRule = function(parent) {
    var rule_id = this.nextRuleId(),
        $rule = $(this.template.rule.call(this, rule_id));

    var e = $.Event('addRule.queryBuilder', {
        rule: $rule,
        parent: parent,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return null;
    }

    var model = parent.addRule($rule);

    if (this.settings.onAfterAddRule) {
        this.settings.onAfterAddRule.call(this, $rule);
    }

    this.trigger('afterAddRule', model);

    this.createRuleFilters(model);

    return model;
};

/**
 * Delete a rule.
 * @param rule {Rule}
 * @return {boolean} true if the rule has been deleted
 */
QueryBuilder.prototype.deleteRule = function(rule) {
    if (rule.flags.no_delete) {
        return false;
    }

    var e = $.Event('deleteRule.queryBuilder', {
        rule: rule,
        builder: this
    });

    this.$el.trigger(e);

    if (e.isDefaultPrevented()) {
        return false;
    }

    this.trigger('beforeDeleteRule', rule);

    rule.drop();

    return true;
};

/**
 * Create filters <select> for a rule
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleFilters = function(rule) {
    var $filterSelect = $(this.getRuleFilterSelect(rule, this.filters));

    rule.$el.find('.rule-filter-container').append($filterSelect);

    this.trigger('afterCreateRuleFilters', rule);
};

/**
 * Create operators <select> for a rule
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleOperators = function(rule) {
    var $operatorContainer = rule.$el.find('.rule-operator-container').empty();

    if (!rule.filter) {
        return;
    }

    var operators = this.getOperators(rule.filter),
        $operatorSelect = $(this.getRuleOperatorSelect(rule, operators));

    $operatorContainer.html($operatorSelect);

    rule.operator = operators[0];

    this.trigger('afterCreateRuleOperators', rule, operators);
};

/**
 * Create main <input> for a rule
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleInput = function(rule) {
    var $valueContainer = rule.$el.find('.rule-value-container').empty();

    if (!rule.filter || rule.operator.accept_values === 0) {
        return;
    }

    var $inputs = $();

    for (var i=0; i<rule.operator.accept_values; i++) {
        var $ruleInput = $(this.getRuleInput(rule, i));
        if (i > 0) $valueContainer.append(' , ');
        $valueContainer.append($ruleInput);
        $inputs = $inputs.add($ruleInput);
    }

    $valueContainer.show();

    if (rule.filter.onAfterCreateRuleInput) {
        rule.filter.onAfterCreateRuleInput.call(this, rule);
    }

    if (rule.filter.plugin) {
        $inputs[rule.filter.plugin](rule.filter.plugin_config || {});
    }

    if (rule.filter.default_value !== undefined) {
        this.setRuleValue(rule, rule.filter.default_value);
    }

    this.trigger('afterCreateRuleInput', rule);
};

/**
 * Perform action when rule's filter is changed
 * @param rule {Rule}
 */
QueryBuilder.prototype.updateRuleFilter = function(rule) {
    this.createRuleOperators(rule);

    rule.$el.find('.rule-filter-container [name$=_filter]').val(rule.filter ? rule.filter.id : '-1');

    this.trigger('afterUpdateRuleFilter', rule);
};

/**
 * Update main <input> visibility when rule operator changes
 * @param rule {Rule}
 * @param previousOperator {object}
 */
QueryBuilder.prototype.updateRuleOperator = function(rule, previousOperator) {
    var $valueContainer = rule.$el.find('.rule-value-container');

    if (!rule.operator || rule.operator.accept_values === 0) {
        $valueContainer.hide();
    }
    else {
        $valueContainer.show();

        if ($valueContainer.is(':empty') || rule.operator.accept_values != previousOperator.accept_values) {
            this.createRuleInput(rule);
        }

        rule.$el.find('.rule-operator-container [name$=_operator]').val(rule.operator.type);
    }

    if (rule.filter && rule.filter.onAfterChangeOperator) {
        rule.filter.onAfterChangeOperator.call(this, rule);
    }

    this.trigger('afterChangeOperator', rule);
};

/**
 * Change rules properties depending on flags.
 * @param rule {Rule}
 * @param readonly {boolean}
 */
QueryBuilder.prototype.applyRuleFlags = function(rule, readonly) {
    var flags = rule.flags;

    if (flags.filter_readonly) {
        rule.$el.find('[name$=_filter]').prop('disabled', true);
    }
    if (flags.operator_readonly) {
        rule.$el.find('[name$=_operator]').prop('disabled', true);
    }
    if (flags.value_readonly) {
        rule.$el.find('[name*=_value_]').prop('disabled', true);
    }
    if (flags.no_delete) {
        rule.$el.find('[data-delete=rule]').remove();
    }

    this.trigger('afterApplyRuleFlags', rule);
};

/**
 * Clear all errors markers
 * @param node {Node,optional}
 */
QueryBuilder.prototype.clearErrors = function(node) {
    node = node || this.model.root;

    var that = this;

    node.error = null;

    if (!(node instanceof Rule)) {
        node.each(function(rule) {
            rule.error = null;
        }, function(group) {
            that.clearErrors(group);
        });
    }
};

/**
 * Add/Remove class .has-error and update error title
 * @param node {Node}
 */
QueryBuilder.prototype.displayError = function(node) {
    if (this.settings.display_errors) {
        if (node.error === null) {
            node.$el.removeClass('has-error');
        }
        else {
            // translate the text without modifying event array
            var error = $.extend([], node.error, [
                this.lang.errors[node.error[0]] || node.error[0]
            ]);

            node.$el.addClass('has-error');
            node.$el.find('.error-container').eq(0)
              .attr('title', fmt.apply(null, error));
        }
    }
};

/**
 * Trigger a validation error event
 * @param node {Node}
 * @param error {array}
 * @param value {mixed}
 */
QueryBuilder.prototype.triggerValidationError = function(node, error, value) {
    if (!$.isArray(error)) {
        error = [error];
    }

    if ((node instanceof Rule) && node.filter && node.filter.onValidationError) {
        node.filter.onValidationError.call(this, node, error, value);
    }
    if (this.settings.onValidationError) {
        this.settings.onValidationError.call(this, node, error, value);
    }

    var e = $.Event('validationError.queryBuilder', {
        node: node,
        error: error,
        value: value,
        builder: this
    });

    this.$el.trigger(e);

    if (!e.isDefaultPrevented()) {
        node.error = error;
    }

    this.trigger('validationError', node, error, value);
};