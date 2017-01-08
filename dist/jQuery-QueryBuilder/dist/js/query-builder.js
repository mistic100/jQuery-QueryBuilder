/*!
 * jQuery QueryBuilder 2.4.1
 * Copyright 2014-2017 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

// Languages: en
// Plugins: bt-checkbox, bt-selectpicker, bt-tooltip-errors, change-filters, filter-description, invert, mongodb-support, not-group, sortable, sql-support, unique-filter
(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'doT', 'jQuery.extendext'], factory);
    }
    else {
        factory(root.jQuery, root.doT);
    }
}(this, function($, doT) {
"use strict";

// CLASS DEFINITION
// ===============================
var QueryBuilder = function($el, options) {
    this.init($el, options);
};


// EVENTS SYSTEM
// ===============================
$.extend(QueryBuilder.prototype, {
    change: function(type, value) {
        var event = new $.Event(this.tojQueryEvent(type, true), {
            builder: this,
            value: value
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 2));

        return event.value;
    },

    trigger: function(type) {
        var event = new $.Event(this.tojQueryEvent(type), {
            builder: this
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 1));

        return event;
    },

    on: function(type, cb) {
        this.$el.on(this.tojQueryEvent(type), cb);
        return this;
    },

    off: function(type, cb) {
        this.$el.off(this.tojQueryEvent(type), cb);
        return this;
    },

    once: function(type, cb) {
        this.$el.one(this.tojQueryEvent(type), cb);
        return this;
    },

    tojQueryEvent: function(name, filter) {
        return name.split(' ').map(function(type) {
            return type + '.queryBuilder' + (filter ? '.filter' : '');
        }).join(' ');
    }
});


// PLUGINS SYSTEM
// ===============================
QueryBuilder.plugins = {};

/**
 * Get or extend the default configuration
 * @param options {object,optional} new configuration, leave undefined to get the default config
 * @return {undefined|object} nothing or configuration object (copy)
 */
QueryBuilder.defaults = function(options) {
    if (typeof options == 'object') {
        $.extendext(true, 'replace', QueryBuilder.DEFAULTS, options);
    }
    else if (typeof options == 'string') {
        if (typeof QueryBuilder.DEFAULTS[options] == 'object') {
            return $.extend(true, {}, QueryBuilder.DEFAULTS[options]);
        }
        else {
            return QueryBuilder.DEFAULTS[options];
        }
    }
    else {
        return $.extend(true, {}, QueryBuilder.DEFAULTS);
    }
};

/**
 * Define a new plugin
 * @param {string}
 * @param {function}
 * @param {object,optional} default configuration
 */
QueryBuilder.define = function(name, fct, def) {
    QueryBuilder.plugins[name] = {
        fct: fct,
        def: def || {}
    };
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
 * @throws ConfigError
 */
QueryBuilder.prototype.initPlugins = function() {
    if (!this.plugins) {
        return;
    }

    if ($.isArray(this.plugins)) {
        var tmp = {};
        this.plugins.forEach(function(plugin) {
            tmp[plugin] = null;
        });
        this.plugins = tmp;
    }

    Object.keys(this.plugins).forEach(function(plugin) {
        if (plugin in QueryBuilder.plugins) {
            this.plugins[plugin] = $.extend(true, {},
                QueryBuilder.plugins[plugin].def,
                this.plugins[plugin] || {}
            );

            QueryBuilder.plugins[plugin].fct.call(this, this.plugins[plugin]);
        }
        else {
            Utils.error('Config', 'Unable to find plugin "{0}"', plugin);
        }
    }, this);
};


/**
 * Allowed types and their internal representation
 */
QueryBuilder.types = {
    'string':   'string',
    'integer':  'number',
    'double':   'number',
    'date':     'datetime',
    'time':     'datetime',
    'datetime': 'datetime',
    'boolean':  'boolean'
};

/**
 * Allowed inputs
 */
QueryBuilder.inputs = [
    'text',
    'textarea',
    'radio',
    'checkbox',
    'select'
];

/**
 * Runtime modifiable options with `setOptions` method
 */
QueryBuilder.modifiable_options = [
    'display_errors',
    'allow_groups',
    'allow_empty',
    'default_condition',
    'default_filter'
];

/**
 * CSS selectors for common components
 */
var Selectors = QueryBuilder.selectors = {
    group_container:      '.rules-group-container',
    rule_container:       '.rule-container',
    filter_container:     '.rule-filter-container',
    operator_container:   '.rule-operator-container',
    value_container:      '.rule-value-container',
    error_container:      '.error-container',
    condition_container:  '.rules-group-header .group-conditions',

    rule_header:          '.rule-header',
    group_header:         '.rules-group-header',
    group_actions:        '.group-actions',
    rule_actions:         '.rule-actions',

    rules_list:           '.rules-group-body>.rules-list',

    group_condition:      '.rules-group-header [name$=_cond]',
    rule_filter:          '.rule-filter-container [name$=_filter]',
    rule_operator:        '.rule-operator-container [name$=_operator]',
    rule_value:           '.rule-value-container [name*=_value_]',

    add_rule:             '[data-add=rule]',
    delete_rule:          '[data-delete=rule]',
    add_group:            '[data-add=group]',
    delete_group:         '[data-delete=group]'
};

/**
 * Template strings (see `template.js`)
 */
QueryBuilder.templates = {};

/**
 * Localized strings (see `i18n/`)
 */
QueryBuilder.regional = {};

/**
 * Default operators
 */
QueryBuilder.OPERATORS = {
    equal:            { type: 'equal',            nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] },
    not_equal:        { type: 'not_equal',        nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] },
    in:               { type: 'in',               nb_inputs: 1, multiple: true,  apply_to: ['string', 'number', 'datetime'] },
    not_in:           { type: 'not_in',           nb_inputs: 1, multiple: true,  apply_to: ['string', 'number', 'datetime'] },
    less:             { type: 'less',             nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
    less_or_equal:    { type: 'less_or_equal',    nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
    greater:          { type: 'greater',          nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
    greater_or_equal: { type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime'] },
    between:          { type: 'between',          nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime'] },
    not_between:      { type: 'not_between',      nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime'] },
    begins_with:      { type: 'begins_with',      nb_inputs: 1, multiple: false, apply_to: ['string'] },
    not_begins_with:  { type: 'not_begins_with',  nb_inputs: 1, multiple: false, apply_to: ['string'] },
    contains:         { type: 'contains',         nb_inputs: 1, multiple: false, apply_to: ['string'] },
    not_contains:     { type: 'not_contains',     nb_inputs: 1, multiple: false, apply_to: ['string'] },
    ends_with:        { type: 'ends_with',        nb_inputs: 1, multiple: false, apply_to: ['string'] },
    not_ends_with:    { type: 'not_ends_with',    nb_inputs: 1, multiple: false, apply_to: ['string'] },
    is_empty:         { type: 'is_empty',         nb_inputs: 0, multiple: false, apply_to: ['string'] },
    is_not_empty:     { type: 'is_not_empty',     nb_inputs: 0, multiple: false, apply_to: ['string'] },
    is_null:          { type: 'is_null',          nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] },
    is_not_null:      { type: 'is_not_null',      nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean'] }
};

/**
 * Default configuration
 */
QueryBuilder.DEFAULTS = {
    filters: [],
    plugins: [],

    sort_filters: false,
    display_errors: true,
    allow_groups: -1,
    allow_empty: false,
    conditions: ['AND', 'OR'],
    default_condition: 'AND',
    inputs_separator: ' , ',
    select_placeholder: '------',
    display_empty_filter: true,
    default_filter: null,
    optgroups: {},

    default_rule_flags: {
        filter_readonly: false,
        operator_readonly: false,
        value_readonly: false,
        no_delete: false
    },

    default_group_flags: {
        condition_readonly: false,
        no_add_rule: false,
        no_add_group: false,
        no_delete: false
    },

    templates: {
        group: null,
        rule: null,
        filterSelect: null,
        operatorSelect: null
    },

    lang_code: 'en',
    lang: {},

    operators: [
        'equal',
        'not_equal',
        'in',
        'not_in',
        'less',
        'less_or_equal',
        'greater',
        'greater_or_equal',
        'between',
        'not_between',
        'begins_with',
        'not_begins_with',
        'contains',
        'not_contains',
        'ends_with',
        'not_ends_with',
        'is_empty',
        'is_not_empty',
        'is_null',
        'is_not_null'
    ],

    icons: {
        add_group:    'glyphicon glyphicon-plus-sign',
        add_rule:     'glyphicon glyphicon-plus',
        remove_group: 'glyphicon glyphicon-remove',
        remove_rule:  'glyphicon glyphicon-remove',
        error:        'glyphicon glyphicon-warning-sign'
    }
};


/**
 * Init the builder
 */
QueryBuilder.prototype.init = function($el, options) {
    $el[0].queryBuilder = this;
    this.$el = $el;

    // PROPERTIES
    this.settings = $.extendext(true, 'replace', {}, QueryBuilder.DEFAULTS, options);
    this.model = new Model();
    this.status = {
        group_id: 0,
        rule_id: 0,
        generated_id: false,
        has_optgroup: false,
        has_operator_oprgroup: false,
        id: null
    };

    // "allow_groups" can be boolean or int
    if (this.settings.allow_groups === false) {
        this.settings.allow_groups = 0;
    }
    else if (this.settings.allow_groups === true) {
        this.settings.allow_groups = -1;
    }

    // SETTINGS SHORTCUTS
    this.filters = this.settings.filters;
    this.icons = this.settings.icons;
    this.operators = this.settings.operators;
    this.templates = this.settings.templates;
    this.plugins = this.settings.plugins;

    // translations : english << 'lang_code' << custom
    if (QueryBuilder.regional['en'] === undefined) {
        Utils.error('Config', '"i18n/en.js" not loaded.');
    }
    this.lang = $.extendext(true, 'replace', {}, QueryBuilder.regional['en'], QueryBuilder.regional[this.settings.lang_code], this.settings.lang);

    // init templates
    Object.keys(this.templates).forEach(function(tpl) {
        if (!this.templates[tpl]) {
            this.templates[tpl] = QueryBuilder.templates[tpl];
        }
        if (typeof this.templates[tpl] == 'string') {
            this.templates[tpl] = doT.template(this.templates[tpl]);
        }
    }, this);

    // ensure we have a container id
    if (!this.$el.attr('id')) {
        this.$el.attr('id', 'qb_' + Math.floor(Math.random() * 99999));
        this.status.generated_id = true;
    }
    this.status.id = this.$el.attr('id');

    // INIT
    this.$el.addClass('query-builder form-inline');

    this.filters = this.checkFilters(this.filters);
    this.operators = this.checkOperators(this.operators);
    this.bindEvents();
    this.initPlugins();

    this.trigger('afterInit');

    if (options.rules) {
        this.setRules(options.rules);
        delete this.settings.rules;
    }
    else {
        this.setRoot(true);
    }
};

/**
 * Checks the configuration of each filter
 * @throws ConfigError
 */
QueryBuilder.prototype.checkFilters = function(filters) {
    var definedFilters = [];

    if (!filters || filters.length === 0) {
        Utils.error('Config', 'Missing filters list');
    }

    filters.forEach(function(filter, i) {
        if (!filter.id) {
            Utils.error('Config', 'Missing filter {0} id', i);
        }
        if (definedFilters.indexOf(filter.id) != -1) {
            Utils.error('Config', 'Filter "{0}" already defined', filter.id);
        }
        definedFilters.push(filter.id);

        if (!filter.type) {
            filter.type = 'string';
        }
        else if (!QueryBuilder.types[filter.type]) {
            Utils.error('Config', 'Invalid type "{0}"', filter.type);
        }

        if (!filter.input) {
            filter.input = 'text';
        }
        else if (typeof filter.input != 'function' && QueryBuilder.inputs.indexOf(filter.input) == -1) {
            Utils.error('Config', 'Invalid input "{0}"', filter.input);
        }

        if (filter.operators) {
            filter.operators.forEach(function(operator) {
                if (typeof operator != 'string') {
                    Utils.error('Config', 'Filter operators must be global operators types (string)');
                }
            });
        }

        if (!filter.field) {
            filter.field = filter.id;
        }
        if (!filter.label) {
            filter.label = filter.field;
        }

        if (!filter.optgroup) {
            filter.optgroup = null;
        }
        else {
            this.status.has_optgroup = true;

            // register optgroup if needed
            if (!this.settings.optgroups[filter.optgroup]) {
                this.settings.optgroups[filter.optgroup] = filter.optgroup;
            }
        }

        switch (filter.input) {
            case 'radio': case 'checkbox':
                if (!filter.values || filter.values.length < 1) {
                    Utils.error('Config', 'Missing filter "{0}" values', filter.id);
                }
                break;

            case 'select':
                if (filter.placeholder) {
                    if (filter.placeholder_value === undefined) {
                        filter.placeholder_value = -1;
                    }
                    Utils.iterateOptions(filter.values, function(key) {
                        if (key == filter.placeholder_value) {
                            Utils.error('Config', 'Placeholder of filter "{0}" overlaps with one of its values', filter.id);
                        }
                    });
                }
                break;
        }
    }, this);

    if (this.settings.sort_filters) {
        if (typeof this.settings.sort_filters == 'function') {
            filters.sort(this.settings.sort_filters);
        }
        else {
            var self = this;
            filters.sort(function(a, b) {
                return self.translateLabel(a.label).localeCompare(self.translateLabel(b.label));
            });
        }
    }

    if (this.status.has_optgroup) {
        filters = Utils.groupSort(filters, 'optgroup');
    }

    return filters;
};

/**
 * Checks the configuration of each operator
 * @throws ConfigError
 */
QueryBuilder.prototype.checkOperators = function(operators) {
    var definedOperators = [];

    operators.forEach(function(operator, i) {
        if (typeof operator == 'string') {
            if (!QueryBuilder.OPERATORS[operator]) {
                Utils.error('Config', 'Unknown operator "{0}"', operator);
            }

            operators[i] = operator = $.extendext(true, 'replace', {}, QueryBuilder.OPERATORS[operator]);
        }
        else {
            if (!operator.type) {
                Utils.error('Config', 'Missing "type" for operator {0}', i);
            }

            if (QueryBuilder.OPERATORS[operator.type]) {
                operators[i] = operator = $.extendext(true, 'replace', {}, QueryBuilder.OPERATORS[operator.type], operator);
            }

            if (operator.nb_inputs === undefined || operator.apply_to === undefined) {
                Utils.error('Config', 'Missing "nb_inputs" and/or "apply_to" for operator "{0}"', operator.type);
            }
        }

        if (definedOperators.indexOf(operator.type) != -1) {
            Utils.error('Config', 'Operator "{0}" already defined', operator.type);
        }
        definedOperators.push(operator.type);

        if (!operator.optgroup) {
            operator.optgroup = null;
        }
        else {
            this.status.has_operator_optgroup = true;

            // register optgroup if needed
            if (!this.settings.optgroups[operator.optgroup]) {
                this.settings.optgroups[operator.optgroup] = operator.optgroup;
            }
        }
    }, this);

    if (this.status.has_operator_optgroup) {
        operators = Utils.groupSort(operators, 'optgroup');
    }

    return operators;
};

/**
 * Add all events listeners
 */
QueryBuilder.prototype.bindEvents = function() {
    var self = this;

    // group condition change
    this.$el.on('change.queryBuilder', Selectors.group_condition, function() {
        if ($(this).is(':checked')) {
            var $group = $(this).closest(Selectors.group_container);
            Model($group).condition = $(this).val();
        }
    });

    // rule filter change
    this.$el.on('change.queryBuilder', Selectors.rule_filter, function() {
        var $rule = $(this).closest(Selectors.rule_container);
        Model($rule).filter = self.getFilterById($(this).val());
    });

    // rule operator change
    this.$el.on('change.queryBuilder', Selectors.rule_operator, function() {
        var $rule = $(this).closest(Selectors.rule_container);
        Model($rule).operator = self.getOperatorByType($(this).val());
    });

    // add rule button
    this.$el.on('click.queryBuilder', Selectors.add_rule, function() {
        var $group = $(this).closest(Selectors.group_container);
        self.addRule(Model($group));
    });

    // delete rule button
    this.$el.on('click.queryBuilder', Selectors.delete_rule, function() {
        var $rule = $(this).closest(Selectors.rule_container);
        self.deleteRule(Model($rule));
    });

    if (this.settings.allow_groups !== 0) {
        // add group button
        this.$el.on('click.queryBuilder', Selectors.add_group, function() {
            var $group = $(this).closest(Selectors.group_container);
            self.addGroup(Model($group));
        });

        // delete group button
        this.$el.on('click.queryBuilder', Selectors.delete_group, function() {
            var $group = $(this).closest(Selectors.group_container);
            self.deleteGroup(Model($group));
        });
    }

    // model events
    this.model.on({
        'drop': function(e, node) {
            node.$el.remove();
            self.refreshGroupsConditions();
        },
        'add': function(e, node, index) {
            if (index === 0) {
                node.$el.prependTo(node.parent.$el.find('>' + Selectors.rules_list));
            }
            else {
                node.$el.insertAfter(node.parent.rules[index - 1].$el);
            }
            self.refreshGroupsConditions();
        },
        'move': function(e, node, group, index) {
            node.$el.detach();

            if (index === 0) {
                node.$el.prependTo(group.$el.find('>' + Selectors.rules_list));
            }
            else {
                node.$el.insertAfter(group.rules[index - 1].$el);
            }
            self.refreshGroupsConditions();
        },
        'update': function(e, node, field, value, oldValue) {
            if (node instanceof Rule) {
                switch (field) {
                    case 'error':
                        self.displayError(node);
                        break;

                    case 'flags':
                        self.applyRuleFlags(node);
                        break;

                    case 'filter':
                        self.updateRuleFilter(node, oldValue);
                        break;

                    case 'operator':
                        self.updateRuleOperator(node, oldValue);
                        break;

                    case 'value':
                        self.updateRuleValue(node);
                        break;
                }
            }
            else {
                switch (field) {
                    case 'error':
                        self.displayError(node);
                        break;

                    case 'flags':
                        self.applyGroupFlags(node);
                        break;

                    case 'condition':
                        self.updateGroupCondition(node);
                        break;
                }
            }
        }
    });
};

/**
 * Create the root group
 * @param addRule {bool,optional} add a default empty rule
 * @param data {mixed,optional} group custom data
 * @param flags {object,optional} flags to apply to the group
 * @return group {Root}
 */
QueryBuilder.prototype.setRoot = function(addRule, data, flags) {
    addRule = (addRule === undefined || addRule === true);

    var group_id = this.nextGroupId();
    var $group = $(this.getGroupTemplate(group_id, 1));

    this.$el.append($group);
    this.model.root = new Group(null, $group);
    this.model.root.model = this.model;

    this.model.root.data = data;
    this.model.root.__.flags = $.extend({}, this.settings.default_group_flags, flags);

    this.trigger('afterAddGroup', this.model.root);

    this.model.root.condition = this.settings.default_condition;

    if (addRule) {
        this.addRule(this.model.root);
    }

    return this.model.root;
};

/**
 * Add a new group
 * @param parent {Group}
 * @param addRule {bool,optional} add a default empty rule
 * @param data {mixed,optional} group custom data
 * @param flags {object,optional} flags to apply to the group
 * @return group {Group}
 */
QueryBuilder.prototype.addGroup = function(parent, addRule, data, flags) {
    addRule = (addRule === undefined || addRule === true);

    var level = parent.level + 1;

    var e = this.trigger('beforeAddGroup', parent, addRule, level);
    if (e.isDefaultPrevented()) {
        return null;
    }

    var group_id = this.nextGroupId();
    var $group = $(this.getGroupTemplate(group_id, level));
    var model = parent.addGroup($group);

    model.data = data;
    model.__.flags = $.extend({}, this.settings.default_group_flags, flags);

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
        return false;
    }

    var e = this.trigger('beforeDeleteGroup', group);
    if (e.isDefaultPrevented()) {
        return false;
    }

    var del = true;

    group.each('reverse', function(rule) {
        del&= this.deleteRule(rule);
    }, function(group) {
        del&= this.deleteGroup(group);
    }, this);

    if (del) {
        group.drop();
        this.trigger('afterDeleteGroup');
    }

    return del;
};

/**
 * Changes the condition of a group
 * @param group {Group}
 */
QueryBuilder.prototype.updateGroupCondition = function(group) {
    group.$el.find('>' + Selectors.group_condition).each(function() {
        var $this = $(this);
        $this.prop('checked', $this.val() === group.condition);
        $this.parent().toggleClass('active', $this.val() === group.condition);
    });

    this.trigger('afterUpdateGroupCondition', group);
};

/**
 * Update visibility of conditions based on number of rules inside each group
 */
QueryBuilder.prototype.refreshGroupsConditions = function() {
    (function walk(group) {
        if (!group.flags || (group.flags && !group.flags.condition_readonly)) {
            group.$el.find('>' + Selectors.group_condition).prop('disabled', group.rules.length <= 1)
                .parent().toggleClass('disabled', group.rules.length <= 1);
        }

        group.each(function(rule) {}, function(group) {
            walk(group);
        }, this);
    }(this.model.root));
};

/**
 * Add a new rule
 * @param parent {Group}
 * @param data {mixed,optional} rule custom data
 * @param flags {object,optional} flags to apply to the rule
 * @return rule {Rule}
 */
QueryBuilder.prototype.addRule = function(parent, data, flags) {
    var e = this.trigger('beforeAddRule', parent);
    if (e.isDefaultPrevented()) {
        return null;
    }

    var rule_id = this.nextRuleId();
    var $rule = $(this.getRuleTemplate(rule_id));
    var model = parent.addRule($rule);

    if (data !== undefined) {
        model.data = data;
    }

    model.__.flags = $.extend({}, this.settings.default_rule_flags, flags);

    this.trigger('afterAddRule', model);

    this.createRuleFilters(model);

    if (this.settings.default_filter || !this.settings.display_empty_filter) {
        model.filter = this.change('getDefaultFilter',
            this.getFilterById(this.settings.default_filter || this.filters[0].id),
            model
        );
    }

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

    var e = this.trigger('beforeDeleteRule', rule);
    if (e.isDefaultPrevented()) {
        return false;
    }

    rule.drop();

    this.trigger('afterDeleteRule');

    return true;
};

/**
 * Create the filters <select> for a rule
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleFilters = function(rule) {
    var filters = this.change('getRuleFilters', this.filters, rule);
    var $filterSelect = $(this.getRuleFilterSelect(rule, filters));

    rule.$el.find(Selectors.filter_container).html($filterSelect);

    this.trigger('afterCreateRuleFilters', rule);
};

/**
 * Create the operators <select> for a rule and init the rule operator
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleOperators = function(rule) {
    var $operatorContainer = rule.$el.find(Selectors.operator_container).empty();

    if (!rule.filter) {
        return;
    }

    var operators = this.getOperators(rule.filter);
    var $operatorSelect = $(this.getRuleOperatorSelect(rule, operators));

    $operatorContainer.html($operatorSelect);

    // set the operator without triggering update event
    rule.__.operator = operators[0];

    this.trigger('afterCreateRuleOperators', rule, operators);
};

/**
 * Create the main input for a rule
 * @param rule {Rule}
 */
QueryBuilder.prototype.createRuleInput = function(rule) {
    var $valueContainer = rule.$el.find(Selectors.value_container).empty();

    rule.__.value = undefined;

    if (!rule.filter || !rule.operator || rule.operator.nb_inputs === 0) {
        return;
    }

    var self = this;
    var $inputs = $();
    var filter = rule.filter;

    for (var i = 0; i < rule.operator.nb_inputs; i++) {
        var $ruleInput = $(this.getRuleInput(rule, i));
        if (i > 0) $valueContainer.append(this.settings.inputs_separator);
        $valueContainer.append($ruleInput);
        $inputs = $inputs.add($ruleInput);
    }

    $valueContainer.show();

    $inputs.on('change ' + (filter.input_event || ''), function() {
        if (!this._updating_input) {
            rule._updating_value = true;
            rule.value = self.getRuleInputValue(rule);
            rule._updating_value = false;
        }
    });

    if (filter.plugin) {
        $inputs[filter.plugin](filter.plugin_config || {});
    }

    this.trigger('afterCreateRuleInput', rule);

    if (filter.default_value !== undefined) {
        rule.value = filter.default_value;
    }
    else {
        rule._updating_value = true;
        rule.value = self.getRuleInputValue(rule);
        rule._updating_value = false;
    }
};

/**
 * Perform action when rule's filter is changed
 * @param rule {Rule}
 * @param previousFilter {object}
 */
QueryBuilder.prototype.updateRuleFilter = function(rule, previousFilter) {
    this.createRuleOperators(rule);
    this.createRuleInput(rule);

    rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');

    // clear rule data if the filter changed
    if (previousFilter && rule.filter && previousFilter.id !== rule.filter.id) {
        rule.data = undefined;
    }

    this.trigger('afterUpdateRuleFilter', rule);
};

/**
 * Update main <input> visibility when rule operator changes
 * @param rule {Rule}
 * @param previousOperator {object}
 */
QueryBuilder.prototype.updateRuleOperator = function(rule, previousOperator) {
    var $valueContainer = rule.$el.find(Selectors.value_container);

    if (!rule.operator || rule.operator.nb_inputs === 0) {
        $valueContainer.hide();

        rule.__.value = undefined;
    }
    else {
        $valueContainer.show();

        if ($valueContainer.is(':empty') || !previousOperator || rule.operator.nb_inputs !== previousOperator.nb_inputs) {
            this.createRuleInput(rule);
        }
    }

    if (rule.operator) {
        rule.$el.find(Selectors.rule_operator).val(rule.operator.type);
    }

    this.trigger('afterUpdateRuleOperator', rule);

    this.updateRuleValue(rule);
};

/**
 * Perform action when rule's value is changed
 * @param rule {Rule}
 */
QueryBuilder.prototype.updateRuleValue = function(rule) {
    if (!rule._updating_value) {
        this.setRuleInputValue(rule, rule.value);
    }

    this.trigger('afterUpdateRuleValue', rule);
};

/**
 * Change rules properties depending on flags.
 * @param rule {Rule}
 */
QueryBuilder.prototype.applyRuleFlags = function(rule) {
    var flags = rule.flags;

    if (flags.filter_readonly) {
        rule.$el.find(Selectors.rule_filter).prop('disabled', true);
    }
    if (flags.operator_readonly) {
        rule.$el.find(Selectors.rule_operator).prop('disabled', true);
    }
    if (flags.value_readonly) {
        rule.$el.find(Selectors.rule_value).prop('disabled', true);
    }
    if (flags.no_delete) {
        rule.$el.find(Selectors.delete_rule).remove();
    }

    this.trigger('afterApplyRuleFlags', rule);
};

/**
 * Change group properties depending on flags.
 * @param group {Group}
 */
QueryBuilder.prototype.applyGroupFlags = function(group) {
    var flags = group.flags;

    if (flags.condition_readonly) {
        group.$el.find('>' + Selectors.group_condition).prop('disabled', true)
            .parent().addClass('readonly');
    }
    if (flags.no_add_rule) {
        group.$el.find(Selectors.add_rule).remove();
    }
    if (flags.no_add_group) {
        group.$el.find(Selectors.add_group).remove();
    }
    if (flags.no_delete) {
        group.$el.find(Selectors.delete_group).remove();
    }

    this.trigger('afterApplyGroupFlags', group);
};

/**
 * Clear all errors markers
 * @param node {Node,optional} default is root Group
 */
QueryBuilder.prototype.clearErrors = function(node) {
    node = node || this.model.root;

    if (!node) {
        return;
    }

    node.error = null;

    if (node instanceof Group) {
        node.each(function(rule) {
            rule.error = null;
        }, function(group) {
            this.clearErrors(group);
        }, this);
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
            var errorMessage = this.lang.errors[node.error[0]] || node.error[0];
            errorMessage = Utils.fmt(errorMessage, node.error.slice(1));
            errorMessage = this.change('displayError', errorMessage, node.error, node);

            node.$el.addClass('has-error')
              .find(Selectors.error_container).eq(0)
                .attr('title', errorMessage);
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

    var e = this.trigger('validationError', node, error, value);
    if (!e.isDefaultPrevented()) {
        node.error = error;
    }
};


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
 * Modify the builder configuration
 * Only options defined in QueryBuilder.modifiable_options are modifiable
 * @param {object}
 */
QueryBuilder.prototype.setOptions = function(options) {
    $.each(options, function(opt, value) {
        if (QueryBuilder.modifiable_options.indexOf(opt) !== -1) {
            this.settings[opt] = value;
        }
    }.bind(this));
};

/**
 * Return the model associated to a DOM object, or root model
 * @param {jQuery,optional}
 * @return {Node}
 */
QueryBuilder.prototype.getModel = function(target) {
    return !target ? this.model.root : Model(target);
};

/**
 * Validate the whole builder
 * @return {boolean}
 */
QueryBuilder.prototype.validate = function() {
    this.clearErrors();

    var self = this;

    var valid = (function parse(group) {
        var done = 0;
        var errors = 0;

        group.each(function(rule) {
            if (!rule.filter) {
                self.triggerValidationError(rule, 'no_filter', null);
                errors++;
                return;
            }

            if (!rule.operator) {
                self.triggerValidationError(rule, 'no_operator', null);
                errors++;
                return;
            }

            if (rule.operator.nb_inputs !== 0) {
                var valid = self.validateValue(rule, rule.value);

                if (valid !== true) {
                    self.triggerValidationError(rule, valid, rule.value);
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
        else if (done === 0 && (!self.settings.allow_empty || !group.isRoot())) {
            self.triggerValidationError(group, 'empty_group', null);
            return false;
        }

        return true;

    }(this.model.root));

    return this.change('validate', valid);
};

/**
 * Get an object representing current rules
 * @param {object} options
 *      - get_flags: false[default] | true(only changes from default flags) | 'all'
 *      - allow_invalid: false[default] | true(returns rules even if they are invalid)
 * @return {object}
 */
QueryBuilder.prototype.getRules = function(options) {
    options = $.extend({
        get_flags: false,
        allow_invalid: false
    }, options);

    var valid = this.validate();
    if (!valid && !options.allow_invalid) {
        return null;
    }

    var self = this;

    var out = (function parse(group) {
        var groupData = {
            condition: group.condition,
            rules: []
        };

        if (group.data) {
            groupData.data = $.extendext(true, 'replace', {}, group.data);
        }

        if (options.get_flags) {
            var flags = self.getGroupFlags(group.flags, options.get_flags === 'all');
            if (!$.isEmptyObject(flags)) {
                groupData.flags = flags;
            }
        }

        group.each(function(rule) {
            var value = null;
            if (!rule.operator || rule.operator.nb_inputs !== 0) {
                value = rule.value;
            }

            var ruleData = {
                id: rule.filter ? rule.filter.id : null,
                field: rule.filter ? rule.filter.field : null,
                type: rule.filter ? rule.filter.type : null,
                input: rule.filter ? rule.filter.input : null,
                operator: rule.operator ? rule.operator.type : null,
                value: value
            };

            if (rule.filter && rule.filter.data || rule.data) {
                ruleData.data = $.extendext(true, 'replace', {}, rule.filter.data, rule.data);
            }

            if (options.get_flags) {
                var flags = self.getRuleFlags(rule.flags, options.get_flags === 'all');
                if (!$.isEmptyObject(flags)) {
                    ruleData.flags = flags;
                }
            }

            groupData.rules.push(self.change('ruleToJson', ruleData, rule));

        }, function(model) {
            groupData.rules.push(parse(model));
        }, this);

        return self.change('groupToJson', groupData, group);

    }(this.model.root));

    out.valid = valid;

    return this.change('getRules', out);
};

/**
 * Set rules from object
 * @throws RulesError, UndefinedConditionError
 * @param data {object}
 * @param {object} options
 *      - allow_invalid: false[default] | true(silent-fail if the data are invalid)
 */
QueryBuilder.prototype.setRules = function(data, options) {
    options = $.extend({
        allow_invalid: false
    }, options);

    if ($.isArray(data)) {
        data = {
            condition: this.settings.default_condition,
            rules: data
        };
    }

    if (!data || !data.rules || (data.rules.length === 0 && !this.settings.allow_empty)) {
        Utils.error('RulesParse', 'Incorrect data object passed');
    }

    this.clear();
    this.setRoot(false, data.data, this.parseGroupFlags(data));
    this.applyGroupFlags(this.model.root);

    data = this.change('setRules', data);

    var self = this;

    (function add(data, group) {
        if (group === null) {
            return;
        }

        if (data.condition === undefined) {
            data.condition = self.settings.default_condition;
        }
        else if (self.settings.conditions.indexOf(data.condition) == -1) {
            Utils.error(!options.allow_invalid, 'UndefinedCondition', 'Invalid condition "{0}"', data.condition);
            data.condition = self.settings.default_condition;
        }

        group.condition = data.condition;

        data.rules.forEach(function(item) {
            var model;

            if (item.rules !== undefined) {
                if (self.settings.allow_groups !== -1 && self.settings.allow_groups < group.level) {
                    Utils.error(!options.allow_invalid, 'RulesParse', 'No more than {0} groups are allowed', self.settings.allow_groups);
                    self.reset();
                }
                else {
                    model = self.addGroup(group, false, item.data, self.parseGroupFlags(item));
                    if (model === null) {
                        return;
                    }

                    self.applyGroupFlags(model);

                    add(item, model);
                }
            }
            else {
                if (!item.empty) {
                    if (item.id === undefined) {
                        Utils.error(!options.allow_invalid, 'RulesParse', 'Missing rule field id');
                        item.empty = true;
                    }
                    if (item.operator === undefined) {
                        item.operator = 'equal';
                    }
                }

                model = self.addRule(group, item.data, self.parseRuleFlags(item));
                if (model === null) {
                    return;
                }

                if (!item.empty) {
                    model.filter = self.getFilterById(item.id, !options.allow_invalid);

                    if (model.filter) {
                        model.operator = self.getOperatorByType(item.operator, !options.allow_invalid);

                        if (!model.operator) {
                            model.operator = self.getOperators(model.filter)[0];
                        }

                        if (model.operator && model.operator.nb_inputs !== 0 && item.value !== undefined) {
                            model.value = item.value;
                        }
                    }
                }

                self.applyRuleFlags(model);

                if (self.change('jsonToRule', model, item) != model) {
                    Utils.error('RulesParse', 'Plugin tried to change rule reference');
                }
            }
        });

        if (self.change('jsonToGroup', group, data) != group) {
            Utils.error('RulesParse', 'Plugin tried to change group reference');
        }

    }(data, this.model.root));
};


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
                if (value[i] === undefined || value[i].length === 0) {
                    if (!validation.allow_empty_value) {
                        result = ['radio_empty'];
                    }
                    break;
                }
                break;

            case 'checkbox':
                if (value[i] === undefined || value[i].length === 0) {
                    if (!validation.allow_empty_value) {
                        result = ['checkbox_empty'];
                    }
                    break;
                }
                else if (!operator.multiple && value[i].length > 1) {
                    result = ['operator_not_multiple', operator.type];
                    break;
                }
                break;

            case 'select':
                if (value[i] === undefined || value[i].length === 0 || (filter.placeholder && value[i] == filter.placeholder_value)) {
                    if (!validation.allow_empty_value) {
                        result = ['select_empty'];
                    }
                    break;
                }
                if (filter.multiple && !operator.multiple && value[i].length > 1) {
                    result = ['operator_not_multiple', operator.type];
                    break;
                }
                break;

            default:
                switch (QueryBuilder.types[filter.type]) {
                    case 'string':
                        if (value[i] === undefined || value[i].length === 0) {
                            if (!validation.allow_empty_value) {
                                result = ['string_empty'];
                            }
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
                        if (value[i] === undefined || value[i].length === 0) {
                            if (!validation.allow_empty_value) {
                                result = ['number_nan'];
                            }
                            break;
                        }
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
                            if (!validation.allow_empty_value) {
                                result = ['datetime_empty'];
                            }
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
                        if (value[i] === undefined || value[i].length === 0) {
                            if (!validation.allow_empty_value) {
                                result = ['boolean_not_valid'];
                            }
                            break;
                        }
                        tmp = ('' + value[i]).trim().toLowerCase();
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
 * Returns the operators for a filter
 * @param filter {string|object} (filter id name or filter object)
 * @return {object[]}
 */
QueryBuilder.prototype.getOperators = function(filter) {
    if (typeof filter == 'string') {
        filter = this.getFilterById(filter);
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
 * @param id {string}
 * @param [doThrow=true] {boolean}
 * @return {object|null}
 */
QueryBuilder.prototype.getFilterById = function(id, doThrow) {
    if (id == '-1') {
        return null;
    }

    for (var i = 0, l = this.filters.length; i < l; i++) {
        if (this.filters[i].id == id) {
            return this.filters[i];
        }
    }

    Utils.error(doThrow !== false, 'UndefinedFilter', 'Undefined filter "{0}"', id);

    return null;
};

/**
 * Return a particular operator by its type
 * @throws UndefinedOperatorError
 * @param type {string}
 * @param [doThrow=true] {boolean}
 * @return {object|null}
 */
QueryBuilder.prototype.getOperatorByType = function(type, doThrow) {
    if (type == '-1') {
        return null;
    }

    for (var i = 0, l = this.operators.length; i < l; i++) {
        if (this.operators[i].type == type) {
            return this.operators[i];
        }
    }

    Utils.error(doThrow !== false, 'UndefinedOperator', 'Undefined operator "{0}"', type);

    return null;
};

/**
 * Returns rule's input value
 * @param rule {Rule}
 * @return {mixed}
 */
QueryBuilder.prototype.getRuleInputValue = function(rule) {
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
 * Sets the value of a rule's input.
 * @param rule {Rule}
 * @param value {mixed}
 */
QueryBuilder.prototype.setRuleInputValue = function(rule, value) {
    var filter = rule.filter;
    var operator = rule.operator;

    if (!filter || !operator) {
        return;
    }

    this._updating_input = true;

    if (filter.valueSetter) {
        filter.valueSetter.call(this, rule, value);
    }
    else {
        var $value = rule.$el.find(Selectors.value_container);

        if (operator.nb_inputs == 1) {
            value = [value];
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

    this._updating_input = false;
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


QueryBuilder.templates.group = '\
<dl id="{{= it.group_id }}" class="rules-group-container"> \
  <dt class="rules-group-header"> \
    <div class="btn-group pull-right group-actions"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="{{= it.icons.add_rule }}"></i> {{= it.lang.add_rule }} \
      </button> \
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
        <button type="button" class="btn btn-xs btn-success" data-add="group"> \
          <i class="{{= it.icons.add_group }}"></i> {{= it.lang.add_group }} \
        </button> \
      {{?}} \
      {{? it.level>1 }} \
        <button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
          <i class="{{= it.icons.remove_group }}"></i> {{= it.lang.delete_group }} \
        </button> \
      {{?}} \
    </div> \
    <div class="btn-group group-conditions"> \
      {{~ it.conditions: condition }} \
        <label class="btn btn-xs btn-primary"> \
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.lang.conditions[condition] || condition }} \
        </label> \
      {{~}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
    {{?}} \
  </dt> \
  <dd class=rules-group-body> \
    <ul class=rules-list></ul> \
  </dd> \
</dl>';

QueryBuilder.templates.rule = '\
<li id="{{= it.rule_id }}" class="rule-container"> \
  <div class="rule-header"> \
    <div class="btn-group pull-right rule-actions"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule"> \
        <i class="{{= it.icons.remove_rule }}"></i> {{= it.lang.delete_rule }} \
      </button> \
    </div> \
  </div> \
  {{? it.settings.display_errors }} \
    <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
  {{?}} \
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</li>';

QueryBuilder.templates.filterSelect = '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.rule.id }}_filter"> \
  {{? it.settings.display_empty_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.filters: filter }} \
    {{? optgroup !== filter.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = filter.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= filter.id }}">{{= it.translate(filter.label) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

QueryBuilder.templates.operatorSelect = '\
{{? it.operators.length === 1 }} \
<span> \
{{= it.lang.operators[it.operators[0].type] || it.operators[0].type }} \
</span> \
{{?}} \
{{ var optgroup = null; }} \
<select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator"> \
  {{~ it.operators: operator }} \
    {{? optgroup !== operator.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = operator.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= operator.type }}">{{= it.lang.operators[operator.type] || operator.type }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

/**
 * Returns group HTML
 * @param group_id {string}
 * @param level {int}
 * @return {string}
 */
QueryBuilder.prototype.getGroupTemplate = function(group_id, level) {
    var h = this.templates.group({
        builder: this,
        group_id: group_id,
        level: level,
        conditions: this.settings.conditions,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings
    });

    return this.change('getGroupTemplate', h, level);
};

/**
 * Returns rule HTML
 * @param rule_id {string}
 * @return {string}
 */
QueryBuilder.prototype.getRuleTemplate = function(rule_id) {
    var h = this.templates.rule({
        builder: this,
        rule_id: rule_id,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings
    });

    return this.change('getRuleTemplate', h);
};

/**
 * Returns rule filter <select> HTML
 * @param rule {Rule}
 * @param filters {array}
 * @return {string}
 */
QueryBuilder.prototype.getRuleFilterSelect = function(rule, filters) {
    var h = this.templates.filterSelect({
        builder: this,
        rule: rule,
        filters: filters,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings,
        translate: this.translateLabel
    });

    return this.change('getRuleFilterSelect', h, rule);
};

/**
 * Returns rule operator <select> HTML
 * @param rule {Rule}
 * @param operators {object}
 * @return {string}
 */
QueryBuilder.prototype.getRuleOperatorSelect = function(rule, operators) {
    var h = this.templates.operatorSelect({
        builder: this,
        rule: rule,
        operators: operators,
        icons: this.icons,
        lang: this.lang,
        settings: this.settings,
        translate: this.translateLabel
    });

    return this.change('getRuleOperatorSelect', h, rule);
};

/**
 * Return the rule value HTML
 * @param rule {Rule}
 * @param filter {object}
 * @param value_id {int}
 * @return {string}
 */
QueryBuilder.prototype.getRuleInput = function(rule, value_id) {
    var filter = rule.filter;
    var validation = rule.filter.validation || {};
    var name = rule.id + '_value_' + value_id;
    var c = filter.vertical ? ' class=block' : '';
    var h = '';

    if (typeof filter.input == 'function') {
        h = filter.input.call(this, rule, name);
    }
    else {
        switch (filter.input) {
            case 'radio': case 'checkbox':
                Utils.iterateOptions(filter.values, function(key, val) {
                    h+= '<label' + c + '><input type="' + filter.input + '" name="' + name + '" value="' + key + '"> ' + val + '</label> ';
                });
                break;

            case 'select':
                h+= '<select class="form-control" name="' + name + '"' + (filter.multiple ? ' multiple' : '') + '>';
                if (filter.placeholder) {
                    h+= '<option value="' + filter.placeholder_value + '" disabled selected>' + filter.placeholder + '</option>';
                }
                Utils.iterateOptions(filter.values, function(key, val) {
                    h+= '<option value="' + key + '">' + val + '</option> ';
                });
                h+= '</select>';
                break;

            case 'textarea':
                h+= '<textarea class="form-control" name="' + name + '"';
                if (filter.size) h+= ' cols="' + filter.size + '"';
                if (filter.rows) h+= ' rows="' + filter.rows + '"';
                if (validation.min !== undefined) h+= ' minlength="' + validation.min + '"';
                if (validation.max !== undefined) h+= ' maxlength="' + validation.max + '"';
                if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                h+= '></textarea>';
                break;

            default:
                switch (QueryBuilder.types[filter.type]) {
                    case 'number':
                        h+= '<input class="form-control" type="number" name="' + name + '"';
                        if (validation.step !== undefined) h+= ' step="' + validation.step + '"';
                        if (validation.min !== undefined) h+= ' min="' + validation.min + '"';
                        if (validation.max !== undefined) h+= ' max="' + validation.max + '"';
                        if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                        if (filter.size) h+= ' size="' + filter.size + '"';
                        h+= '>';
                        break;

                    default:
                        h+= '<input class="form-control" type="text" name="' + name + '"';
                        if (filter.placeholder) h+= ' placeholder="' + filter.placeholder + '"';
                        if (filter.type === 'string' && validation.min !== undefined) h+= ' minlength="' + validation.min + '"';
                        if (filter.type === 'string' && validation.max !== undefined) h+= ' maxlength="' + validation.max + '"';
                        if (filter.size) h+= ' size="' + filter.size + '"';
                        h+= '>';
                }
        }
    }

    return this.change('getRuleInput', h, rule, name);
};


// Model CLASS
// ===============================
/**
 * Main object storing data model and emitting events
 * ---------
 * Access Node object stored in jQuery objects
 * @param el {jQuery|Node}
 * @return {Node}
 */
function Model(el) {
    if (!(this instanceof Model)) {
        return Model.getModel(el);
    }

    this.root = null;
    this.$ = $(this);
}

$.extend(Model.prototype, {
    trigger: function(type) {
        this.$.triggerHandler(type, Array.prototype.slice.call(arguments, 1));
        return this;
    },

    on: function() {
        this.$.on.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    },

    off: function() {
        this.$.off.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    },

    once: function() {
        this.$.one.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    }
});

/**
 * Access Node object stored in jQuery objects
 * @param el {jQuery|Node}
 * @return {Node}
 */
Model.getModel = function(el) {
    if (!el) {
        return null;
    }
    else if (el instanceof Node) {
        return el;
    }
    else {
        return $(el).data('queryBuilderModel');
    }
};

/*
 * Define Node properties with getter and setter
 * Update events are emitted in the setter through root Model (if any)
 */
Model.defineModelProperties = function(obj, fields) {
    fields.forEach(function(field) {
        Object.defineProperty(obj.prototype, field, {
            enumerable: true,
            get: function() {
                return this.__[field];
            },
            set: function(value) {
                var oldValue = (this.__[field] !== null && typeof this.__[field] == 'object') ?
                  $.extend({}, this.__[field]) :
                  this.__[field];

                this.__[field] = value;

                if (this.model !== null) {
                    this.model.trigger('update', this, field, value, oldValue);
                }
            }
        });
    });
};


// Node abstract CLASS
// ===============================
/**
 * @param {Node}
 * @param {jQuery}
 */
var Node = function(parent, $el) {
    if (!(this instanceof Node)) {
        return new Node();
    }

    Object.defineProperty(this, '__', { value: {} });

    $el.data('queryBuilderModel', this);

    this.__.level = 1;
    this.__.error = null;
    this.__.data = undefined;
    this.$el = $el;
    this.id = $el[0].id;
    this.model = null;
    this.parent = parent;
};

Model.defineModelProperties(Node, ['level', 'error', 'data', 'flags']);

Object.defineProperty(Node.prototype, 'parent', {
    enumerable: true,
    get: function() {
        return this.__.parent;
    },
    set: function(value) {
        this.__.parent = value;
        this.level = value === null ? 1 : value.level + 1;
        this.model = value === null ? null : value.model;
    }
});

/**
 * Check if this Node is the root
 * @return {boolean}
 */
Node.prototype.isRoot = function() {
    return (this.level === 1);
};

/**
 * Return node position inside parent
 * @return {int}
 */
Node.prototype.getPos = function() {
    if (this.isRoot()) {
        return -1;
    }
    else {
        return this.parent.getNodePos(this);
    }
};

/**
 * Delete self
 */
Node.prototype.drop = function() {
    var model = this.model;

    if (!this.isRoot()) {
        this.parent._removeNode(this);
    }

    if (model !== null) {
        model.trigger('drop', this);
    }
};

/**
 * Move itself after another Node
 * @param {Node}
 * @return {Node} self
 */
Node.prototype.moveAfter = function(node) {
    if (this.isRoot()) return;

    this._move(node.parent, node.getPos() + 1);

    return this;
};

/**
 * Move itself at the beginning of parent or another Group
 * @param {Group,optional}
 * @return {Node} self
 */
Node.prototype.moveAtBegin = function(target) {
    if (this.isRoot()) return;

    if (target === undefined) {
        target = this.parent;
    }

    this._move(target, 0);

    return this;
};

/**
 * Move itself at the end of parent or another Group
 * @param {Group,optional}
 * @return {Node} self
 */
Node.prototype.moveAtEnd = function(target) {
    if (this.isRoot()) return;

    if (target === undefined) {
        target = this.parent;
    }

    this._move(target, target.length() === 0 ? 0 : target.length() - 1);

    return this;
};

/**
 * Move itself at specific position of Group
 * @param {Group}
 * @param {int}
 */
Node.prototype._move = function(group, index) {
    this.parent._removeNode(this);
    group._appendNode(this, index, false);

    if (this.model !== null) {
        this.model.trigger('move', this, group, index);
    }
};


// GROUP CLASS
// ===============================
/**
 * @param {Group}
 * @param {jQuery}
 */
var Group = function(parent, $el) {
    if (!(this instanceof Group)) {
        return new Group(parent, $el);
    }

    Node.call(this, parent, $el);

    this.rules = [];
    this.__.condition = null;
};

Group.prototype = Object.create(Node.prototype);
Group.prototype.constructor = Group;

Model.defineModelProperties(Group, ['condition']);

/**
 * Empty the Group
 */
Group.prototype.empty = function() {
    this.each('reverse', function(rule) {
        rule.drop();
    }, function(group) {
        group.drop();
    });
};

/**
 * Delete self
 */
Group.prototype.drop = function() {
    this.empty();
    Node.prototype.drop.call(this);
};

/**
 * Return the number of children
 * @return {int}
 */
Group.prototype.length = function() {
    return this.rules.length;
};

/**
 * Add a Node at specified index
 * @param {Node}
 * @param {int,optional}
 * @param {boolean,optional}
 * @return {Node} the inserted node
 */
Group.prototype._appendNode = function(node, index, trigger) {
    if (index === undefined) {
        index = this.length();
    }

    this.rules.splice(index, 0, node);
    node.parent = this;

    if (trigger && this.model !== null) {
        this.model.trigger('add', node, index);
    }

    return node;
};

/**
 * Add a Group by jQuery element at specified index
 * @param {jQuery}
 * @param {int,optional}
 * @return {Group} the inserted group
 */
Group.prototype.addGroup = function($el, index) {
    return this._appendNode(new Group(this, $el), index, true);
};

/**
 * Add a Rule by jQuery element at specified index
 * @param {jQuery}
 * @param {int,optional}
 * @return {Rule} the inserted rule
 */
Group.prototype.addRule = function($el, index) {
    return this._appendNode(new Rule(this, $el), index, true);
};

/**
 * Delete a specific Node
 * @param {Node}
 * @return {Group} self
 */
Group.prototype._removeNode = function(node) {
    var index = this.getNodePos(node);
    if (index !== -1) {
        node.parent = null;
        this.rules.splice(index, 1);
    }

    return this;
};

/**
 * Return position of a child Node
 * @param {Node}
 * @return {int}
 */
Group.prototype.getNodePos = function(node) {
    return this.rules.indexOf(node);
};

/**
 * Iterate over all Nodes
 * @param {boolean,optional} iterate in reverse order, required if you delete nodes
 * @param {function} callback for Rules
 * @param {function,optional} callback for Groups
 * @return {boolean}
 */
Group.prototype.each = function(reverse, cbRule, cbGroup, context) {
    if (typeof reverse == 'function') {
        context = cbGroup;
        cbGroup = cbRule;
        cbRule = reverse;
        reverse = false;
    }
    context = context === undefined ? null : context;

    var i = reverse ? this.rules.length - 1 : 0;
    var l = reverse ? 0 : this.rules.length - 1;
    var c = reverse ? -1 : 1;
    var next = function() { return reverse ? i >= l : i <= l; };
    var stop = false;

    for (; next(); i+= c) {
        if (this.rules[i] instanceof Group) {
            if (cbGroup !== undefined) {
                stop = cbGroup.call(context, this.rules[i]) === false;
            }
        }
        else {
            stop = cbRule.call(context, this.rules[i]) === false;
        }

        if (stop) {
            break;
        }
    }

    return !stop;
};

/**
 * Return true if the group contains a particular Node
 * @param {Node}
 * @param {boolean,optional} recursive search
 * @return {boolean}
 */
Group.prototype.contains = function(node, deep) {
    if (this.getNodePos(node) !== -1) {
        return true;
    }
    else if (!deep) {
        return false;
    }
    else {
        // the loop will return with false as soon as the Node is found
        return !this.each(function(rule) {
            return true;
        }, function(group) {
            return !group.contains(node, true);
        });
    }
};


// RULE CLASS
// ===============================
/**
 * @param {Group}
 * @param {jQuery}
 */
var Rule = function(parent, $el) {
    if (!(this instanceof Rule)) {
        return new Rule(parent, $el);
    }

    Node.call(this, parent, $el);

    this._updating_value = false;
    this._updating_input = false;

    this.__.filter = null;
    this.__.operator = null;
    this.__.flags = {};
    this.__.value = undefined;
};

Rule.prototype = Object.create(Node.prototype);
Rule.prototype.constructor = Rule;

Model.defineModelProperties(Rule, ['filter', 'operator', 'value']);


// EXPORT
// ===============================
QueryBuilder.Group = Group;
QueryBuilder.Rule = Rule;


var Utils = QueryBuilder.utils = {};

/**
 * Utility to iterate over radio/checkbox/selection options.
 * it accept three formats: array of values, map, array of 1-element maps
 *
 * @param options {object|array}
 * @param tpl {callable} (takes key and text)
 */
Utils.iterateOptions = function(options, tpl) {
    if (options) {
        if ($.isArray(options)) {
            options.forEach(function(entry) {
                // array of one-element maps
                if ($.isPlainObject(entry)) {
                    $.each(entry, function(key, val) {
                        tpl(key, val);
                        return false; // break after first entry
                    });
                }
                // array of values
                else {
                    tpl(entry, entry);
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
};

/**
 * Replaces {0}, {1}, ... in a string
 * @param str {string}
 * @param args,... {Array|*}
 * @return {string}
 */
Utils.fmt = function(str, args) {
    if (!Array.isArray(args)) {
        args = Array.prototype.slice.call(arguments, 1);
    }

    return str.replace(/{([0-9]+)}/g, function(m, i) {
        return args[parseInt(i)];
    });
};

/**
 * Throw an Error object with custom name or logs an error
 * @param [doThrow=true] {boolean}
 * @param type {string}
 * @param message {string}
 * @param args,... {Array|*}
 */
Utils.error = function() {
    var i = 0;
    var doThrow = typeof arguments[i] === 'boolean' ? arguments[i++] : true;
    var type = arguments[i++];
    var message = arguments[i++];
    var args = Array.isArray(arguments[i]) ? arguments[i] : Array.prototype.slice.call(arguments, i);

    if (doThrow) {
        var err = new Error(Utils.fmt(message, args));
        err.name = type + 'Error';
        err.args = args;
        throw err;
    }
    else {
        console.error(type + 'Error: ' + Utils.fmt(message, args));
    }
};

/**
 * Change type of a value to int or float
 * @param value {mixed}
 * @param type {string} 'integer', 'double' or anything else
 * @param boolAsInt {boolean} return 0 or 1 for booleans
 * @return {mixed}
 */
Utils.changeType = function(value, type, boolAsInt) {
    switch (type) {
    // @formatter:off
    case 'integer': return parseInt(value);
    case 'double': return parseFloat(value);
    case 'boolean':
        var bool = value.trim().toLowerCase() === 'true' || value.trim() === '1' || value === 1;
        return boolAsInt ? (bool ? 1 : 0) : bool;
    default: return value;
    // @formatter:on
    }
};

/**
 * Escape string like mysql_real_escape_string
 * @param value {string}
 * @return {string}
 */
Utils.escapeString = function(value) {
    if (typeof value != 'string') {
        return value;
    }

    return value
        .replace(/[\0\n\r\b\\\'\"]/g, function(s) {
            switch (s) {
            // @formatter:off
            case '\0': return '\\0';
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\b': return '\\b';
            default:   return '\\' + s;
            // @formatter:off
            }
        })
        // uglify compliant
        .replace(/\t/g, '\\t')
        .replace(/\x1a/g, '\\Z');
};

/**
 * Escape value for use in regex
 * @param value {string}
 * @return {string}
 */
Utils.escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

/**
 * Escape HTML element id
 * @param value {string}
 * @return {string}
 */
Utils.escapeElementId = function(str) {
    // Regex based on that suggested by:
    // https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
    // - escapes : . [ ] ,
    // - avoids escaping already escaped values
    return (str) ? str.replace(/(\\)?([:.\[\],])/g,
            function( $0, $1, $2 ) { return $1 ? $0 : '\\' + $2; }) : str;
};

/**
 * Sort objects by grouping them by {key}, preserving initial order when possible
 * @param {object[]} items
 * @param {string} key
 * @returns {object[]}
 */
Utils.groupSort = function(items, key) {
    var optgroups = [];
    var newItems = [];

    items.forEach(function(item) {
        var idx;

        if (item[key]) {
            idx = optgroups.lastIndexOf(item[key]);

            if (idx == -1) {
                idx = optgroups.length;
            }
            else {
                idx++;
            }
        }
        else {
            idx = optgroups.length;
        }

        optgroups.splice(idx, 0, item[key]);
        newItems.splice(idx, 0, item);
    });

    return newItems;
};


$.fn.queryBuilder = function(option) {
    if (this.length === 0) {
        Utils.error('Config', 'No target defined');
    }
    if (this.length > 1) {
        Utils.error('Config', 'Unable to initialize on multiple target');
    }

    var data = this.data('queryBuilder');
    var options = (typeof option == 'object' && option) || {};

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

$.fn.queryBuilder.constructor = QueryBuilder;
$.fn.queryBuilder.defaults = QueryBuilder.defaults;
$.fn.queryBuilder.extend = QueryBuilder.extend;
$.fn.queryBuilder.define = QueryBuilder.define;
$.fn.queryBuilder.regional = QueryBuilder.regional;


/*!
 * jQuery QueryBuilder Awesome Bootstrap Checkbox
 * Applies Awesome Bootstrap Checkbox for checkbox and radio inputs.
 */

QueryBuilder.define('bt-checkbox', function(options) {
    if (options.font == 'glyphicons') {
        var injectCSS = document.createElement('style');
        injectCSS.innerHTML = '\
.checkbox input[type=checkbox]:checked + label:after { \
    font-family: "Glyphicons Halflings"; \
    content: "\\e013"; \
} \
.checkbox label:after { \
    padding-left: 4px; \
    padding-top: 2px; \
    font-size: 9px; \
}';
        document.body.appendChild(injectCSS);
    }

    this.on('getRuleInput.filter', function(h, rule, name) {
        var filter = rule.filter;

        if ((filter.input === 'radio' || filter.input === 'checkbox') && !filter.plugin) {
            h.value = '';

            if (!filter.colors) {
                filter.colors = {};
            }
            if (filter.color) {
                filter.colors._def_ = filter.color;
            }

            var style = filter.vertical ? ' style="display:block"' : '';
            var i = 0;

            Utils.iterateOptions(filter.values, function(key, val) {
                var color = filter.colors[key] || filter.colors._def_ || options.color;
                var id = name + '_' + (i++);

                h.value+= '\
<div' + style + ' class="' + filter.input + ' ' + filter.input + '-' + color + '"> \
  <input type="' + filter.input + '" name="' + name + '" id="' + id + '" value="' + key + '"> \
  <label for="' + id + '">' + val + '</label> \
</div>';
            });
        }
    });
}, {
    font: 'glyphicons',
    color: 'default'
});


/*!
 * jQuery QueryBuilder Bootstrap Selectpicker
 * Applies Bootstrap Select on filters and operators combo-boxes.
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('bt-selectpicker', function(options) {
    if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
        Utils.error('MissingLibrary', 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
    }

    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').selectpicker(options);
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').selectpicker(options);
    });

    // update selectpicker on change
    this.on('afterUpdateRuleFilter', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker('render');
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).selectpicker('render');
    });
}, {
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});


/*!
 * jQuery QueryBuilder Bootstrap Tooltip errors
 * Applies Bootstrap Tooltips on validation error messages.
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('bt-tooltip-errors', function(options) {
    if (!$.fn.tooltip || !$.fn.tooltip.Constructor || !$.fn.tooltip.Constructor.prototype.fixTitle) {
        Utils.error('MissingLibrary', 'Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');
    }

    var self = this;

    // add BT Tooltip data
    this.on('getRuleTemplate.filter getGroupTemplate.filter', function(h) {
        var $h = $(h.value);
        $h.find(Selectors.error_container).attr('data-toggle', 'tooltip');
        h.value = $h.prop('outerHTML');
    });

    // init/refresh tooltip when title changes
    this.model.on('update', function(e, node, field) {
        if (field == 'error' && self.settings.display_errors) {
            node.$el.find(Selectors.error_container).eq(0)
              .tooltip(options)
              .tooltip('hide')
              .tooltip('fixTitle');
        }
    });
}, {
    placement: 'right'
});


/*!
 * jQuery QueryBuilder Change Filters
 * Allows to change available filters after plugin initialization.
 */

QueryBuilder.extend({
    /**
     * Change the filters of the builder
     * @throws ChangeFilterError
     * @param {boolean,optional} delete rules using old filters
     * @param {object[]} new filters
     */
    setFilters: function(delete_orphans, filters) {
        var self = this;

        if (filters === undefined) {
            filters = delete_orphans;
            delete_orphans = false;
        }

        filters = this.checkFilters(filters);
        filters = this.change('setFilters', filters);

        var filtersIds = filters.map(function(filter) {
            return filter.id;
        });

        // check for orphans
        if (!delete_orphans) {
            (function checkOrphans(node) {
                node.each(
                    function(rule) {
                        if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                            Utils.error('ChangeFilter', 'A rule is using filter "{0}"', rule.filter.id);
                        }
                    },
                    checkOrphans
                );
            }(this.model.root));
        }

        // replace filters
        this.filters = filters;

        // apply on existing DOM
        (function updateBuilder(node) {
            node.each(true,
              function(rule) {
                  if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                      rule.drop();
                  }
                  else {
                      self.createRuleFilters(rule);

                      rule.$el.find(Selectors.rule_filter).val(rule.filter ? rule.filter.id : '-1');
                      self.trigger('afterUpdateRuleFilter', rule);
                  }
              },
              updateBuilder
            );
        }(this.model.root));

        // update plugins
        if (this.settings.plugins) {
            if (this.settings.plugins['unique-filter']) {
                this.updateDisabledFilters();
            }
            if (this.settings.plugins['bt-selectpicker']) {
                this.$el.find(Selectors.rule_filter).selectpicker('render');
            }
        }

        // reset the default_filter if does not exist anymore
        if (this.settings.default_filter) {
            try {
                this.getFilterById(this.settings.default_filter);
            }
            catch (e) {
                this.settings.default_filter = null;
            }
        }

        this.trigger('afterSetFilters', filters);
    },

    /**
     * Adds a new filter to the builder
     * @param {object|object[]} the new filter
     * @param {mixed,optional} numeric index or '#start' or '#end'
     */
    addFilter: function(new_filters, position) {
        if (position === undefined || position == '#end') {
            position = this.filters.length;
        }
        else if (position == '#start') {
            position = 0;
        }

        if (!$.isArray(new_filters)) {
            new_filters = [new_filters];
        }

        var filters = $.extend(true, [], this.filters);

        // numeric position
        if (parseInt(position) == position) {
            Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
        }
        else {
            // after filter by its id
            if (this.filters.some(function(filter, index) {
                if (filter.id == position) {
                    position = index + 1;
                    return true;
                }
            })) {
                Array.prototype.splice.apply(filters, [position, 0].concat(new_filters));
            }
            // defaults to end of list
            else {
                Array.prototype.push.apply(filters, new_filters);
            }
        }

        this.setFilters(filters);
    },

    /**
     * Removes a filter from the builder
     * @param {string|string[]} the filter id
     * @param {boolean,optional} delete rules using old filters
     */
    removeFilter: function(filter_ids, delete_orphans) {
        var filters = $.extend(true, [], this.filters);
        if (typeof filter_ids === 'string') {
            filter_ids = [filter_ids];
        }

        filters = filters.filter(function(filter) {
            return filter_ids.indexOf(filter.id) === -1;
        });

        this.setFilters(delete_orphans, filters);
    }
});


/*!
 * jQuery QueryBuilder Filter Description
 * Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('filter-description', function(options) {
    /**
     * INLINE
     */
    if (options.mode === 'inline') {
        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $p = rule.$el.find('p.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $p.hide();
            }
            else {
                if ($p.length === 0) {
                    $p = $('<p class="filter-description"></p>');
                    $p.appendTo(rule.$el);
                }
                else {
                    $p.show();
                }

                $p.html('<i class="' + options.icon + '"></i> ' + rule.filter.description);
            }
        });
    }
    /**
     * POPOVER
     */
    else if (options.mode === 'popover') {
        if (!$.fn.popover || !$.fn.popover.Constructor || !$.fn.popover.Constructor.prototype.fixTitle) {
            Utils.error('MissingLibrary', 'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com');
        }

        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $b.hide();

                if ($b.data('bs.popover')) {
                    $b.popover('hide');
                }
            }
            else {
                if ($b.length === 0) {
                    $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + options.icon + '"></i></button>');
                    $b.prependTo(rule.$el.find(Selectors.rule_actions));

                    $b.popover({
                        placement: 'left',
                        container: 'body',
                        html: true
                    });

                    $b.on('mouseout', function() {
                        $b.popover('hide');
                    });
                }
                else {
                    $b.show();
                }

                $b.data('bs.popover').options.content = rule.filter.description;

                if ($b.attr('aria-describedby')) {
                    $b.popover('show');
                }
            }
        });
    }
    /**
     * BOOTBOX
     */
    else if (options.mode === 'bootbox') {
        if (!('bootbox' in window)) {
            Utils.error('MissingLibrary', 'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com');
        }

        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $b.hide();
            }
            else {
                if ($b.length === 0) {
                    $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' + options.icon + '"></i></button>');
                    $b.prependTo(rule.$el.find(Selectors.rule_actions));

                    $b.on('click', function() {
                        bootbox.alert($b.data('description'));
                    });
                }

                $b.data('description', rule.filter.description);
            }
        });
    }
}, {
    icon: 'glyphicon glyphicon-info-sign',
    mode: 'popover'
});


/*!
 * jQuery QueryBuilder Invert
 * Allows to invert a rule operator, a group condition or the entire builder.
 */

QueryBuilder.defaults({
    operatorOpposites: {
        'equal':            'not_equal',
        'not_equal':        'equal',
        'in':               'not_in',
        'not_in':           'in',
        'less':             'greater_or_equal',
        'less_or_equal':    'greater',
        'greater':          'less_or_equal',
        'greater_or_equal': 'less',
        'between':          'not_between',
        'not_between':      'between',
        'begins_with':      'not_begins_with',
        'not_begins_with':  'begins_with',
        'contains':         'not_contains',
        'not_contains':     'contains',
        'ends_with':        'not_ends_with',
        'not_ends_with':    'ends_with',
        'is_empty':         'is_not_empty',
        'is_not_empty':     'is_empty',
        'is_null':          'is_not_null',
        'is_not_null':      'is_null'
    },

    conditionOpposites: {
        'AND': 'OR',
        'OR': 'AND'
    }
});

QueryBuilder.define('invert', function(options) {
    var self = this;

    /**
     * Bind events
     */
    this.on('afterInit', function() {
        self.$el.on('click.queryBuilder', '[data-invert=group]', function() {
            var $group = $(this).closest(Selectors.group_container);
            self.invert(Model($group), options);
        });

        if (options.display_rules_button && options.invert_rules) {
            self.$el.on('click.queryBuilder', '[data-invert=rule]', function() {
                var $rule = $(this).closest(Selectors.rule_container);
                self.invert(Model($rule), options);
            });
        }
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        var $h = $(h.value);
        $h.find(Selectors.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-invert="group"><i class="' + options.icon + '"></i> ' + self.lang.invert + '</button>');
        h.value = $h.prop('outerHTML');
    });

    if (options.display_rules_button && options.invert_rules) {
        this.on('getRuleTemplate.filter', function(h) {
            var $h = $(h.value);
            $h.find(Selectors.rule_actions).prepend('<button type="button" class="btn btn-xs btn-default" data-invert="rule"><i class="' + options.icon + '"></i> ' + self.lang.invert + '</button>');
            h.value = $h.prop('outerHTML');
        });
    }
}, {
    icon: 'glyphicon glyphicon-random',
    recursive: true,
    invert_rules: true,
    display_rules_button: false,
    silent_fail: false
});

QueryBuilder.extend({
    /**
     * Invert a Group, a Rule or the whole builder
     * @throws InvertConditionError, InvertOperatorError
     * @param {Node,optional}
     * @param {object,optional}
     */
    invert: function(node, options) {
        if (!(node instanceof Node)) {
            if (!this.model.root) return;
            options = node;
            node = this.model.root;
        }

        if (typeof options != 'object') options = {};
        if (options.recursive === undefined) options.recursive = true;
        if (options.invert_rules === undefined) options.invert_rules = true;
        if (options.silent_fail === undefined) options.silent_fail = false;
        if (options.trigger === undefined) options.trigger = true;

        if (node instanceof Group) {
            // invert group condition
            if (this.settings.conditionOpposites[node.condition]) {
                node.condition = this.settings.conditionOpposites[node.condition];
            }
            else if (!options.silent_fail) {
                Utils.error('InvertCondition', 'Unknown inverse of condition "{0}"', node.condition);
            }

            // recursive call
            if (options.recursive) {
                var tempOpts = $.extend({}, options, { trigger: false });
                node.each(function(rule) {
                    if (options.invert_rules) {
                        this.invert(rule, tempOpts);
                    }
                }, function(group) {
                    this.invert(group, tempOpts);
                }, this);
            }
        }
        else if (node instanceof Rule) {
            if (node.operator && !node.filter.no_invert) {
                // invert rule operator
                if (this.settings.operatorOpposites[node.operator.type]) {
                    var invert = this.settings.operatorOpposites[node.operator.type];
                    // check if the invert is "authorized"
                    if (!node.filter.operators || node.filter.operators.indexOf(invert) != -1) {
                        node.operator = this.getOperatorByType(invert);
                    }
                }
                else if (!options.silent_fail) {
                    Utils.error('InvertOperator', 'Unknown inverse of operator "{0}"', node.operator.type);
                }
            }
        }

        if (options.trigger) {
            this.trigger('afterInvert', node, options);
        }
    }
});


/*!
 * jQuery QueryBuilder MongoDB Support
 * Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    mongoOperators: {
        // @formatter:off
        equal:            function(v) { return v[0]; },
        not_equal:        function(v) { return { '$ne': v[0] }; },
        in:               function(v) { return { '$in': v }; },
        not_in:           function(v) { return { '$nin': v }; },
        less:             function(v) { return { '$lt': v[0] }; },
        less_or_equal:    function(v) { return { '$lte': v[0] }; },
        greater:          function(v) { return { '$gt': v[0] }; },
        greater_or_equal: function(v) { return { '$gte': v[0] }; },
        between:          function(v) { return { '$gte': v[0], '$lte': v[1] }; },
        not_between:      function(v) { return { '$lt': v[0], '$gt': v[1] }; },
        begins_with:      function(v) { return { '$regex': '^' + Utils.escapeRegExp(v[0]) }; },
        not_begins_with:  function(v) { return { '$regex': '^(?!' + Utils.escapeRegExp(v[0]) + ')' }; },
        contains:         function(v) { return { '$regex': Utils.escapeRegExp(v[0]) }; },
        not_contains:     function(v) { return { '$regex': '^((?!' + Utils.escapeRegExp(v[0]) + ').)*$', '$options': 's' }; },
        ends_with:        function(v) { return { '$regex': Utils.escapeRegExp(v[0]) + '$' }; },
        not_ends_with:    function(v) { return { '$regex': '(?<!' + Utils.escapeRegExp(v[0]) + ')$' }; },
        is_empty:         function(v) { return ''; },
        is_not_empty:     function(v) { return { '$ne': '' }; },
        is_null:          function(v) { return null; },
        is_not_null:      function(v) { return { '$ne': null }; }
        // @formatter:on
    },

    mongoRuleOperators: {
        $ne: function(v) {
            v = v.$ne;
            return {
                'val': v,
                'op': v === null ? 'is_not_null' : (v === '' ? 'is_not_empty' : 'not_equal')
            };
        },
        eq: function(v) {
            return {
                'val': v,
                'op': v === null ? 'is_null' : (v === '' ? 'is_empty' : 'equal')
            };
        },
        $regex: function(v) {
            v = v.$regex;
            if (v.slice(0, 4) == '^(?!' && v.slice(-1) == ')') {
                return { 'val': v.slice(4, -1), 'op': 'not_begins_with' };
            }
            else if (v.slice(0, 5) == '^((?!' && v.slice(-5) == ').)*$') {
                return { 'val': v.slice(5, -5), 'op': 'not_contains' };
            }
            else if (v.slice(0, 4) == '(?<!' && v.slice(-2) == ')$') {
                return { 'val': v.slice(4, -2), 'op': 'not_ends_with' };
            }
            else if (v.slice(-1) == '$') {
                return { 'val': v.slice(0, -1), 'op': 'ends_with' };
            }
            else if (v.slice(0, 1) == '^') {
                return { 'val': v.slice(1), 'op': 'begins_with' };
            }
            else {
                return { 'val': v, 'op': 'contains' };
            }
        },
        between:     function(v) { return { 'val': [v.$gte, v.$lte], 'op': 'between' }; },
        not_between: function(v) { return { 'val': [v.$lt, v.$gt], 'op': 'not_between' }; },
        $in:  function(v) { return { 'val': v.$in, 'op': 'in' }; },
        $nin: function(v) { return { 'val': v.$nin, 'op': 'not_in' }; },
        $lt:  function(v) { return { 'val': v.$lt, 'op': 'less' }; },
        $lte: function(v) { return { 'val': v.$lte, 'op': 'less_or_equal' }; },
        $gt:  function(v) { return { 'val': v.$gt, 'op': 'greater' }; },
        $gte: function(v) { return { 'val': v.$gte, 'op': 'greater_or_equal' }; }
    }
});


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as MongoDB query
     * @throws UndefinedMongoConditionError, UndefinedMongoOperatorError
     * @param data {object} (optional) rules
     * @return {object}
     */
    getMongo: function(data) {
        data = (data === undefined) ? this.getRules() : data;

        var self = this;

        return (function parse(group) {
            if (!group.condition) {
                group.condition = self.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(group.condition.toUpperCase()) === -1) {
                Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', group.condition);
            }

            if (!group.rules) {
                return {};
            }

            var parts = [];

            group.rules.forEach(function(rule) {
                if (rule.rules && rule.rules.length > 0) {
                    parts.push(parse(rule));
                }
                else {
                    var mdb = self.settings.mongoOperators[rule.operator];
                    var ope = self.getOperatorByType(rule.operator);
                    var values = [];

                    if (mdb === undefined) {
                        Utils.error('UndefinedMongoOperator', 'Unknown MongoDB operation for operator "{0}"', rule.operator);
                    }

                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function(v) {
                            values.push(Utils.changeType(v, rule.type, false));
                        });
                    }

                    var ruleExpression = {};
                    var field = self.change('getMongoDBField', rule.field, rule);
                    ruleExpression[field] = mdb.call(self, values);
                    parts.push(self.change('ruleToMongo', ruleExpression, rule, values, mdb));
                }
            });

            var groupExpression = {};
            groupExpression['$' + group.condition.toLowerCase()] = parts;
            return self.change('groupToMongo', groupExpression, group);
        }(data));
    },

    /**
     * Convert MongoDB object to rules
     * @throws MongoParseError, UndefinedMongoConditionError, UndefinedMongoOperatorError
     * @param data {object} query object
     * @return {object}
     */
    getRulesFromMongo: function(data) {
        if (data === undefined || data === null) {
            return null;
        }

        var self = this;

        // allow plugins to manually parse or handle special cases
        data = self.change('parseMongoNode', data);

        // a plugin returned a group
        if ('rules' in data && 'condition' in data) {
            return data;
        }

        var key = andOr(data);
        if (!key) {
            Utils.error('MongoParse', 'Invalid MongoDB query format');
        }

        return (function parse(data, topKey) {
            var rules = data[topKey];
            var parts = [];

            rules.forEach(function(data) {
                // allow plugins to manually parse or handle special cases
                data = self.change('parseMongoNode', data);

                // a plugin returned a group
                if ('rules' in data && 'condition' in data) {
                    parts.push(data);
                    return;
                }

                // a plugin returned a rule
                if ('id' in data && 'operator' in data && 'value' in data) {
                    parts.push(data);
                    return;
                }

                var key = andOr(data);
                if (key) {
                    parts.push(parse(data, key));
                }
                else {
                    var field = Object.keys(data)[0];
                    var value = data[field];

                    var operator = determineMongoOperator(value, field);
                    if (operator === undefined) {
                        Utils.error('MongoParse', 'Invalid MongoDB query format');
                    }

                    var mdbrl = self.settings.mongoRuleOperators[operator];
                    if (mdbrl === undefined) {
                        Utils.error('UndefinedMongoOperator', 'JSON Rule operation unknown for operator "{0}"', operator);
                    }

                    var opVal = mdbrl.call(self, value);

                    var rule = self.change('mongoToRule', {
                        id: self.change('getMongoDBFieldID', field, value),
                        field: field,
                        operator: opVal.op,
                        value: opVal.val
                    }, data);

                    parts.push(rule);
                }
            });

            return self.change('mongoToGroup', {
                condition: topKey.replace('$', '').toUpperCase(),
                rules: parts
            }, data);
        }(data, key));
    },

    /**
     * Set rules from MongoDB object
     * @param data {object}
     */
    setRulesFromMongo: function(data) {
        this.setRules(this.getRulesFromMongo(data));
    }
});

/**
 * Find which operator is used in a MongoDB sub-object
 * @param {mixed} value
 * @param {string} field
 * @return {string|undefined}
 */
function determineMongoOperator(value, field) {
    if (value !== null && typeof value == 'object') {
        var subkeys = Object.keys(value);

        if (subkeys.length === 1) {
            return subkeys[0];
        }
        else {
            if (value.$gte !== undefined && value.$lte !== undefined) {
                return 'between';
            }
            if (value.$lt !== undefined && value.$gt !== undefined) {
                return 'not_between';
            }
            else if (value.$regex !== undefined) { // optional $options
                return '$regex';
            }
            else {
                return;
            }
        }
    }
    else {
        return 'eq';
    }
}

/**
 * Returns the key corresponding to "$or" or "$and"
 * @param {object} data
 * @returns {string}
 */
function andOr(data) {
    var keys = Object.keys(data);

    for (var i = 0, l = keys.length; i < l; i++) {
        if (keys[i].toLowerCase() == '$or' || keys[i].toLowerCase() == '$and') {
            return keys[i];
        }
    }

    return undefined;
}


/*!
 * jQuery QueryBuilder Not
 * Adds a "Not" checkbox in front of group conditions.
 */

Selectors.group_not = Selectors.group_header + ' [data-not=group]';

Model.defineModelProperties(Group, ['not']);

QueryBuilder.define('not-group', function(options) {
    var self = this;

    /**
     * Bind events
     */
    this.on('afterInit', function() {
        self.$el.on('click.queryBuilder', '[data-not=group]', function() {
            var $group = $(this).closest(Selectors.group_container);
            var group = Model($group);
            group.not = !group.not;
        });

        self.model.on('update', function(e, node, field) {
            if (node instanceof Group && field === 'not') {
                self.updateGroupNot(node);
            }
        });
    });

    /**
     * Init "not" property
     */
    this.on('afterAddGroup', function(e, group) {
        group.__.not = false;
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        var $h = $(h.value);
        $h.find(Selectors.condition_container).prepend(
            '<button type="button" class="btn btn-xs btn-default" data-not="group">' +
            '<i class="' + options.icon_unchecked + '"></i> ' + self.lang.NOT +
            '</button>'
        );
        h.value = $h.prop('outerHTML');
    });

    /**
     * Export "not" to JSON
     */
    this.on('groupToJson.filter', function(e, group) {
        e.value.not = group.not;
    });

    /**
     * Read "not" from JSON
     */
    this.on('jsonToGroup.filter', function(e, json) {
        e.value.not = !!json.not;
    });

    /**
     * Export "not" to SQL
     */
    this.on('groupToSQL.filter', function(e, group) {
        if (group.not) {
            e.value = 'NOT ( ' + e.value + ' )';
        }
    });

    /**
     * Parse "NOT" function from sqlparser
     */
    this.on('parseSQLNode.filter', function(e) {
        if (e.value.name && e.value.name.toUpperCase() == 'NOT') {
            e.value = e.value.arguments.value[0];
            e.value.not = true;
        }
    });

    /**
     * Read "not" from parsed SQL
     */
    this.on('sqlToGroup.filter', function(e, data) {
        e.value.not = !!data.not;
    });

    /**
     * Export "not" to Mongo
     */
    this.on('groupToMongo.filter', function(e, group) {
        var key = '$' + group.condition.toLowerCase();
        if (group.not && e.value[key]) {
            e.value = { '$nor': [e.value] };
        }
    });

    /**
     * Parse "$nor" operator from Mongo
     */
    this.on('parseMongoNode.filter', function(e) {
        var keys = Object.keys(e.value);

        if (keys[0] == '$nor') {
            e.value = e.value[keys[0]][0];
            e.value.not = true;
        }
    });

    /**
     * Read "not" from parsed Mongo
     */
    this.on('mongoToGroup.filter', function(e, data) {
        e.value.not = !!data.not;
    });
}, {
    icon_unchecked: 'glyphicon glyphicon-unchecked',
    icon_checked: 'glyphicon glyphicon-check'
});

QueryBuilder.extend({
    /**
     * Apply the "not" property to the DOM
     * @param group
     */
    updateGroupNot: function(group) {
        var options = this.plugins['not-group'];
        group.$el.find('>' + Selectors.group_not)
            .toggleClass('active', group.not)
            .find('i').attr('class', group.not ? options.icon_checked : options.icon_unchecked);

        this.trigger('afterUpdateGroupNot', group);
    }
});


/*!
 * jQuery QueryBuilder Sortable
 * Enables drag & drop sort of rules.
 */

Selectors.rule_and_group_containers = Selectors.rule_container + ', ' + Selectors.group_container;
Selectors.drag_handle = '.drag-handle';

QueryBuilder.defaults({
    default_rule_flags: {
        no_sortable: false,
        no_drop: false
    },
    default_group_flags: {
        no_sortable: false,
        no_drop: false
    }
});

QueryBuilder.define('sortable', function(options) {
    if (!('interact' in window)) {
        Utils.error('MissingLibrary', 'interact.js is required to use "sortable" plugin. Get it here: http://interactjs.io');
    }

    if (options.default_no_sortable !== undefined) {
        Utils.error(false, 'Config', 'Sortable plugin : "default_no_sortable" options is deprecated, use standard "default_rule_flags" and "default_group_flags" instead');
        this.settings.default_rule_flags.no_sortable = this.settings.default_group_flags.no_sortable = options.default_no_sortable;
    }

    // recompute drop-zones during drag (when a rule is hidden)
    interact.dynamicDrop(true);

    // set move threshold to 10px
    interact.pointerMoveTolerance(10);

    var placeholder;
    var ghost;
    var src;

    /**
     * Init drag and drop
     */
    this.on('afterAddRule afterAddGroup', function(e, node) {
        if (node == placeholder) {
            return;
        }

        var self = e.builder;

        /**
         * Inherit flags
         */
        if (options.inherit_no_sortable && node.parent && node.parent.flags.no_sortable) {
            node.flags.no_sortable = true;
        }
        if (options.inherit_no_drop && node.parent && node.parent.flags.no_drop) {
            node.flags.no_drop = true;
        }

        /**
         * Configure drag
         */
        if (!node.flags.no_sortable) {
            interact(node.$el[0])
                .allowFrom(Selectors.drag_handle)
                .draggable({
                    onstart: function(event) {
                        // get model of dragged element
                        src = Model(event.target);

                        // create ghost
                        ghost = src.$el.clone()
                            .appendTo(src.$el.parent())
                            .width(src.$el.outerWidth())
                            .addClass('dragging');

                        // create drop placeholder
                        var ph = $('<div class="rule-placeholder">&nbsp;</div>')
                            .height(src.$el.outerHeight());

                        placeholder = src.parent.addRule(ph, src.getPos());

                        // hide dragged element
                        src.$el.hide();
                    },
                    onmove: function(event) {
                        // make the ghost follow the cursor
                        ghost[0].style.top = event.clientY - 15 + 'px';
                        ghost[0].style.left = event.clientX - 15 + 'px';
                    },
                    onend: function() {
                        // remove ghost
                        ghost.remove();
                        ghost = undefined;

                        // remove placeholder
                        placeholder.drop();
                        placeholder = undefined;

                        // show element
                        src.$el.show();

                        self.trigger('afterMove', src);
                    }
                });
        }

        if (!node.flags.no_drop) {
            /**
             * Configure drop on groups and rules
             */
            interact(node.$el[0])
                .dropzone({
                    accept: Selectors.rule_and_group_containers,
                    ondragenter: function(event) {
                        moveSortableToTarget(placeholder, $(event.target));
                    },
                    ondrop: function(event) {
                        moveSortableToTarget(src, $(event.target), self);
                    }
                });

            /**
             * Configure drop on group headers
             */
            if (node instanceof Group) {
                interact(node.$el.find(Selectors.group_header)[0])
                    .dropzone({
                        accept: Selectors.rule_and_group_containers,
                        ondragenter: function(event) {
                            moveSortableToTarget(placeholder, $(event.target));
                        },
                        ondrop: function(event) {
                            moveSortableToTarget(src, $(event.target), self);
                        }
                    });
            }
        }
    });

    /**
     * Detach interactables
     */
    this.on('beforeDeleteRule beforeDeleteGroup', function(e, node) {
        if (!e.isDefaultPrevented()) {
            interact(node.$el[0]).unset();

            if (node instanceof Group) {
                interact(node.$el.find(Selectors.group_header)[0]).unset();
            }
        }
    });

    /**
     * Remove drag handle from non-sortable items
     */
    this.on('afterApplyRuleFlags afterApplyGroupFlags', function(e, node) {
        if (node.flags.no_sortable) {
            node.$el.find('.drag-handle').remove();
        }
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        if (level > 1) {
            var $h = $(h.value);
            $h.find(Selectors.condition_container).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
            h.value = $h.prop('outerHTML');
        }
    });

    this.on('getRuleTemplate.filter', function(h) {
        var $h = $(h.value);
        $h.find(Selectors.rule_header).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
        h.value = $h.prop('outerHTML');
    });
}, {
    inherit_no_sortable: true,
    inherit_no_drop: true,
    icon: 'glyphicon glyphicon-sort'
});

/**
 * Move an element (placeholder or actual object) depending on active target
 * @param {Node} node
 * @param {jQuery} target
 * @param {QueryBuilder} [builder]
 */
function moveSortableToTarget(node, target, builder) {
    var parent, method;

    // on rule
    parent = target.closest(Selectors.rule_container);
    if (parent.length) {
        method = 'moveAfter';
    }

    // on group header
    if (!method) {
        parent = target.closest(Selectors.group_header);
        if (parent.length) {
            parent = target.closest(Selectors.group_container);
            method = 'moveAtBegin';
        }
    }

    // on group
    if (!method) {
        parent = target.closest(Selectors.group_container);
        if (parent.length) {
            method = 'moveAtEnd';
        }
    }

    if (method) {
        node[method](Model(parent));

        // refresh radio value
        if (builder && node instanceof Rule) {
            builder.setRuleInputValue(node, node.value);
        }
    }
}


/*!
 * jQuery QueryBuilder SQL Support
 * Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    /* operators for internal -> SQL conversion */
    sqlOperators: {
        equal:            { op: '= ?' },
        not_equal:        { op: '!= ?' },
        in:               { op: 'IN(?)',          sep: ', ' },
        not_in:           { op: 'NOT IN(?)',      sep: ', ' },
        less:             { op: '< ?' },
        less_or_equal:    { op: '<= ?' },
        greater:          { op: '> ?' },
        greater_or_equal: { op: '>= ?' },
        between:          { op: 'BETWEEN ?',      sep: ' AND ' },
        not_between:      { op: 'NOT BETWEEN ?',  sep: ' AND ' },
        begins_with:      { op: 'LIKE(?)',        mod: '{0}%' },
        not_begins_with:  { op: 'NOT LIKE(?)',    mod: '{0}%' },
        contains:         { op: 'LIKE(?)',        mod: '%{0}%' },
        not_contains:     { op: 'NOT LIKE(?)',    mod: '%{0}%' },
        ends_with:        { op: 'LIKE(?)',        mod: '%{0}' },
        not_ends_with:    { op: 'NOT LIKE(?)',    mod: '%{0}' },
        is_empty:         { op: '= \'\'' },
        is_not_empty:     { op: '!= \'\'' },
        is_null:          { op: 'IS NULL' },
        is_not_null:      { op: 'IS NOT NULL' }
    },

    /* operators for SQL -> internal conversion */
    sqlRuleOperator: {
        '=': function(v) {
            return {
                val: v,
                op: v === '' ? 'is_empty' : 'equal'
            };
        },
        '!=': function(v) {
            return {
                val: v,
                op: v === '' ? 'is_not_empty' : 'not_equal'
            };
        },
        'LIKE': function(v) {
            if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                return {
                    val: v.slice(1, -1),
                    op: 'contains'
                };
            }
            else if (v.slice(0, 1) == '%') {
                return {
                    val: v.slice(1),
                    op: 'ends_with'
                };
            }
            else if (v.slice(-1) == '%') {
                return {
                    val: v.slice(0, -1),
                    op: 'begins_with'
                };
            }
            else {
                Utils.error('SQLParse', 'Invalid value for LIKE operator "{0}"', v);
            }
        },
        'NOT LIKE': function(v) {
            if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                return {
                    val: v.slice(1, -1),
                    op: 'not_contains'
                };
            }
            else if (v.slice(0, 1) == '%') {
                return {
                    val: v.slice(1),
                    op: 'not_ends_with'
                };
            }
            else if (v.slice(-1) == '%') {
                return {
                    val: v.slice(0, -1),
                    op: 'not_begins_with'
                };
            }
            else {
                Utils.error('SQLParse', 'Invalid value for NOT LIKE operator "{0}"', v);
            }
        },
        'IN':           function(v) { return { val: v, op: 'in' }; },
        'NOT IN':       function(v) { return { val: v, op: 'not_in' }; },
        '<':            function(v) { return { val: v, op: 'less' }; },
        '<=':           function(v) { return { val: v, op: 'less_or_equal' }; },
        '>':            function(v) { return { val: v, op: 'greater' }; },
        '>=':           function(v) { return { val: v, op: 'greater_or_equal' }; },
        'BETWEEN':      function(v) { return { val: v, op: 'between' }; },
        'NOT BETWEEN':  function(v) { return { val: v, op: 'not_between' }; },
        'IS': function(v) {
            if (v !== null) {
                Utils.error('SQLParse', 'Invalid value for IS operator');
            }
            return { val: null, op: 'is_null' };
        },
        'IS NOT': function(v) {
            if (v !== null) {
                Utils.error('SQLParse', 'Invalid value for IS operator');
            }
            return { val: null, op: 'is_not_null' };
        }
    },

    /* statements for internal -> SQL conversion */
    sqlStatements: {
        'question_mark': function() {
            var params = [];
            return {
                add: function(rule, value) {
                    params.push(value);
                    return '?';
                },
                run: function() {
                    return params;
                }
            };
        },

        'numbered': function(char) {
            if (!char || char.length > 1) char = '$';
            var index = 0;
            var params = [];
            return {
                add: function(rule, value) {
                    params.push(value);
                    index++;
                    return char + index;
                },
                run: function() {
                    return params;
                }
            };
        },

        'named': function(char) {
            if (!char || char.length > 1) char = ':';
            var indexes = {};
            var params = {};
            return {
                add: function(rule, value) {
                    if (!indexes[rule.field]) indexes[rule.field] = 1;
                    var key = rule.field + '_' + (indexes[rule.field]++);
                    params[key] = value;
                    return char + key;
                },
                run: function() {
                    return params;
                }
            };
        }
    },

    /* statements for SQL -> internal conversion */
    sqlRuleStatement: {
        'question_mark': function(values) {
            var index = 0;
            return {
                parse: function(v) {
                    return v == '?' ? values[index++] : v;
                },
                esc: function(sql) {
                    return sql.replace(/\?/g, '\'?\'');
                }
            };
        },

        'numbered': function(values, char) {
            if (!char || char.length > 1) char = '$';
            var regex1 = new RegExp('^\\' + char + '[0-9]+$');
            var regex2 = new RegExp('\\' + char + '([0-9]+)', 'g');
            return {
                parse: function(v) {
                    return regex1.test(v) ? values[v.slice(1) - 1] : v;
                },
                esc: function(sql) {
                    return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                }
            };
        },

        'named': function(values, char) {
            if (!char || char.length > 1) char = ':';
            var regex1 = new RegExp('^\\' + char);
            var regex2 = new RegExp('\\' + char + '(' + Object.keys(values).join('|') + ')', 'g');
            return {
                parse: function(v) {
                    return regex1.test(v) ? values[v.slice(1)] : v;
                },
                esc: function(sql) {
                    return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                }
            };
        }
    }
});


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as SQL query
     * @throws UndefinedSQLConditionError, UndefinedSQLOperatorError
     * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
     * @param nl {bool} output with new lines
     * @param data {object} (optional) rules
     * @return {object}
     */
    getSQL: function(stmt, nl, data) {
        data = (data === undefined) ? this.getRules() : data;
        nl = (nl === true) ? '\n' : ' ';

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlStatements[config[1]](config[2]);
        }

        var self = this;

        var sql = (function parse(group) {
            if (!group.condition) {
                group.condition = self.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(group.condition.toUpperCase()) === -1) {
                Utils.error('UndefinedSQLCondition', 'Unable to build SQL query with condition "{0}"', group.condition);
            }

            if (!group.rules) {
                return '';
            }

            var parts = [];

            group.rules.forEach(function(rule) {
                if (rule.rules && rule.rules.length > 0) {
                    parts.push('(' + nl + parse(rule) + nl + ')' + nl);
                }
                else {
                    var sql = self.settings.sqlOperators[rule.operator];
                    var ope = self.getOperatorByType(rule.operator);
                    var value = '';

                    if (sql === undefined) {
                        Utils.error('UndefinedSQLOperator', 'Unknown SQL operation for operator "{0}"', rule.operator);
                    }

                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function(v, i) {
                            if (i > 0) {
                                value+= sql.sep;
                            }

                            if (rule.type == 'integer' || rule.type == 'double' || rule.type == 'boolean') {
                                v = Utils.changeType(v, rule.type, true);
                            }
                            else if (!stmt) {
                                v = Utils.escapeString(v);
                            }

                            if (sql.mod) {
                                v = Utils.fmt(sql.mod, v);
                            }

                            if (stmt) {
                                value+= stmt.add(rule, v);
                            }
                            else {
                                if (typeof v == 'string') {
                                    v = '\'' + v + '\'';
                                }

                                value+= v;
                            }
                        });
                    }

                    var sqlFn = function(v) {
                        return sql.op.replace(/\?/, v);
                    };

                    var ruleExpression = self.change('getSQLField', rule.field, rule) + ' ' + sqlFn(value);
                    parts.push(self.change('ruleToSQL', ruleExpression, rule, value, sqlFn));
                }
            });

            var groupExpression = parts.join(' ' + group.condition + nl);
            return self.change('groupToSQL', groupExpression, group);
        }(data));

        if (stmt) {
            return {
                sql: sql,
                params: stmt.run()
            };
        }
        else {
            return {
                sql: sql
            };
        }
    },

    /**
     * Convert SQL to rules
     * @throws ConfigError, SQLParseError, UndefinedSQLOperatorError
     * @param data {object} query object
     * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
     * @return {object}
     */
    getRulesFromSQL: function(data, stmt) {
        if (!('SQLParser' in window)) {
            Utils.error('MissingLibrary', 'SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser');
        }

        var self = this;

        if (typeof data == 'string') {
            data = { sql: data };
        }

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlRuleStatement[config[1]](data.params, config[2]);
        }

        if (stmt) {
            data.sql = stmt.esc(data.sql);
        }

        if (data.sql.toUpperCase().indexOf('SELECT') !== 0) {
            data.sql = 'SELECT * FROM table WHERE ' + data.sql;
        }

        var parsed = SQLParser.parse(data.sql);

        if (!parsed.where) {
            Utils.error('SQLParse', 'No WHERE clause found');
        }

        // allow plugins to manually parse or handle special cases
        data = self.change('parseSQLNode', parsed.where.conditions);

        // a plugin returned a group
        if ('rules' in data && 'condition' in data) {
            return data;
        }

        // create root group
        var out = self.change('sqlToGroup', {
            condition: this.settings.default_condition,
            rules: []
        }, data);

        // keep track of current group
        var curr = out;

        (function flatten(data, i) {
            // allow plugins to manually parse or handle special cases
            data = self.change('parseSQLNode', data);

            // a plugin returned a group
            if ('rules' in data && 'condition' in data) {
                curr.rules.push(data);
                return;
            }

            // a plugin returned a rule
            if ('id' in data && 'operator' in data && 'value' in data) {
                curr.rules.push(data);
                return;
            }

            // data must be a SQL parser node
            if (!('left' in data) || !('right' in data) || !('operation' in data)) {
                Utils.error('SQLParse', 'Unable to parse WHERE clause');
            }

            // it's a node
            if (['AND', 'OR'].indexOf(data.operation.toUpperCase()) !== -1) {
                // create a sub-group if the condition is not the same and it's not the first level
                if (i > 0 && curr.condition != data.operation.toUpperCase()) {
                    var group = self.change('sqlToGroup', {
                        condition: self.settings.default_condition,
                        rules: []
                    }, data);

                    curr.rules.push(group);
                    curr = group;
                }

                curr.condition = data.operation.toUpperCase();
                i++;

                // some magic !
                var next = curr;
                flatten(data.left, i);

                curr = next;
                flatten(data.right, i);
            }
            // it's a leaf
            else {
                if ($.isPlainObject(data.right.value)) {
                    Utils.error('SQLParse', 'Value format not supported for {0}.', data.left.value);
                }

                // convert array
                var value;
                if ($.isArray(data.right.value)) {
                    value = data.right.value.map(function(v) {
                        return v.value;
                    });
                }
                else {
                    value = data.right.value;
                }

                // get actual values
                if (stmt) {
                    if ($.isArray(value)) {
                        value = value.map(stmt.parse);
                    }
                    else {
                        value = stmt.parse(value);
                    }
                }

                // convert operator
                var operator = data.operation.toUpperCase();
                if (operator == '<>') {
                    operator = '!=';
                }

                var sqlrl = self.settings.sqlRuleOperator[operator];
                if (sqlrl === undefined) {
                    Utils.error('UndefinedSQLOperator', 'Invalid SQL operation "{0}".', data.operation);
                }

                var opVal = sqlrl.call(this, value, data.operation);
                var field = data.left.values.join('.');

                var rule = self.change('sqlToRule', {
                    id: self.change('getSQLFieldID', field, value),
                    field: field,
                    operator: opVal.op,
                    value: opVal.val
                }, data);

                curr.rules.push(rule);
            }
        }(data, 0));

        return out;
    },

    /**
     * Set rules from SQL
     * @param data {object}
     * @param stmt {boolean|string}
     */
    setRulesFromSQL: function(data, stmt) {
        this.setRules(this.getRulesFromSQL(data, stmt));
    }
});

function getStmtConfig(stmt) {
    var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
    if (!config) config = [null, 'question_mark', undefined];
    return config;
}


/*!
 * jQuery QueryBuilder Unique Filter
 * Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
 */

QueryBuilder.define('unique-filter', function() {
    this.status.used_filters = {};

    this.on('afterUpdateRuleFilter', this.updateDisabledFilters);
    this.on('afterDeleteRule', this.updateDisabledFilters);
    this.on('afterCreateRuleFilters', this.applyDisabledFilters);
    this.on('afterReset', this.clearDisabledFilters);
    this.on('afterClear', this.clearDisabledFilters);

    /**
     * Ensure that the default filter is not already used if unique
     * @throws UniqueFilterError
     */
    this.on('getDefaultFilter.filter', function(e, model) {
        var self = e.builder;

        self.updateDisabledFilters();

        if (e.value.id in self.status.used_filters) {
            var found = self.filters.some(function(filter) {
                if (!(filter.id in self.status.used_filters) || self.status.used_filters[filter.id].length > 0 && self.status.used_filters[filter.id].indexOf(model.parent) === -1) {
                    e.value = filter;
                    return true;
                }
            });

            if (!found) {
                Utils.error('UniqueFilter', 'No more non-unique filters available');
                e.value = undefined;
            }
        }
    });
});

QueryBuilder.extend({
    /**
     * Update the list of used filters
     * @param [e]
     */
    updateDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        if (!self.model) {
            return;
        }

        // get used filters
        (function walk(group) {
            group.each(function(rule) {
                if (rule.filter && rule.filter.unique) {
                    if (!self.status.used_filters[rule.filter.id]) {
                        self.status.used_filters[rule.filter.id] = [];
                    }
                    if (rule.filter.unique == 'group') {
                        self.status.used_filters[rule.filter.id].push(rule.parent);
                    }
                }
            }, function(group) {
                walk(group);
            });
        }(self.model.root));

        self.applyDisabledFilters(e);
    },

    /**
     * Clear the list of used filters
     * @param [e]
     */
    clearDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        self.applyDisabledFilters(e);
    },

    /**
     * Disabled filters depending on the list of used ones
     * @param [e]
     */
    applyDisabledFilters: function(e) {
        var self = e ? e.builder : this;

        // re-enable everything
        self.$el.find(Selectors.filter_container + ' option').prop('disabled', false);

        // disable some
        $.each(self.status.used_filters, function(filterId, groups) {
            if (groups.length === 0) {
                self.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
            }
            else {
                groups.forEach(function(group) {
                    group.each(function(rule) {
                        rule.$el.find(Selectors.filter_container + ' option[value="' + filterId + '"]:not(:selected)').prop('disabled', true);
                    });
                });
            }
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(Selectors.rule_filter).selectpicker('render');
        }
    }
});


/*!
 * jQuery QueryBuilder 2.4.1
 * Locale: English (en)
 * Author: Damien "Mistic" Sorel, http://www.strangeplanet.fr
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

QueryBuilder.regional['en'] = {
  "__locale": "English (en)",
  "__author": "Damien \"Mistic\" Sorel, http://www.strangeplanet.fr",
  "add_rule": "Add rule",
  "add_group": "Add group",
  "delete_rule": "Delete",
  "delete_group": "Delete",
  "conditions": {
    "AND": "AND",
    "OR": "OR"
  },
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
    "not_between": "not between",
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
    "datetime_empty": "Empty value",
    "datetime_invalid": "Invalid date format ({0})",
    "datetime_exceed_min": "Must be after {0}",
    "datetime_exceed_max": "Must be before {0}",
    "boolean_not_valid": "Not a boolean",
    "operator_not_multiple": "Operator {0} cannot accept multiple values"
  },
  "invert": "Invert",
  "NOT": "NOT"
};

QueryBuilder.defaults({ lang_code: 'en' });
}));