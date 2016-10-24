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
        section_id: 0,
        group_id: 0,
        rule_id: 0,
        generated_id: false,
        has_optgroup: false,
        has_operator_oprgroup: false,
        id: null,
        updating_value: false
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
    this.sections = this.settings.sections;
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
    if (this.settings.allow_sections) {
        for (var k in this.sections) {
            if (this.sections.hasOwnProperty(k)) {
                this.sections[k].filters = this.checkFilters(this.sections[k].filters);
            }
        }
    }
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
        var m = Model($rule);
        m.filter = self.getFilterById($(this).val(), m.section_id);
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

    if (this.settings.allow_sections) {
        // section exists change
        this.$el.on('change.queryBuilder', Selectors.section_exists_flag, function() {
            if ($(this).is(':checked')) {
                var $section = $(this).closest(Selectors.section_container);
                Model($section).exists = $(this).val();
            }
        });

        // section type change
        this.$el.on('change.queryBuilder', Selectors.rule_stype, function() {
            var sid = $(this).val();
            var $section = $(this).closest(Selectors.section_container);
            var model = Model($section);
            model.id = sid;
            self.refreshSection(model);
        });

        // add section button
        this.$el.on('click.queryBuilder', Selectors.add_section, function() {
            var $group = $(this).closest(Selectors.group_container);
            self.addSection(Model($group));
        });

        // delete section button
        this.$el.on('click.queryBuilder', Selectors.delete_section, function() {
            var $section = $(this).closest(Selectors.section_container);
            self.deleteSection(Model($section));
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
        'set': function(e, node) {
            node.parent.$el.find('>' + Selectors.section_body).empty().append(node.$el);
            self.updateSectionExistsFlag(node.parent);
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
            else if (node instanceof Group) {
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
            else if (node instanceof Section) {
                switch (field) {
                    case 'exists':
                        self.updateSectionExistsFlag(node);
                        break;
                    case 'flags':
                        self.applySectionFlags(node);
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
    this.model.root.flags = $.extend({}, this.settings.default_group_flags, flags);

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
    var $group = $(this.getGroupTemplate(group_id, level, parent instanceof Section || parent.section_id ? true : false));
    var model = null;
    if (parent instanceof Section) {
        model = parent.setGroup($group);
    }
    else {
        model = parent.addGroup($group);
    }

    model.data = data;
    model.flags = $.extend({}, this.settings.default_group_flags, flags);

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
    }, function(section) {
        del&= this.deleteSection(section);
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
        }, function(section) {
            if (section.group) {
                walk(section.group);
            }
        }, this);
    }(this.model.root));
};

/**
 * Add a new section
 * @param parent {Group}
 * @param addRule {bool,optional} add a default empty rule
 * @param data {mixed,optional} section custom data
 * @param flags {object,optional} flags to apply to the section
 * @return section {Section}
 */
QueryBuilder.prototype.addSection = function(parent, addRule, data, flags) {
    addRule = (addRule === undefined || addRule === true);

    var level = parent.level + 1;

    var e = this.trigger('beforeAddSection', parent, addRule, level);
    if (e.isDefaultPrevented()) {
        return null;
    }

    var section_id = this.nextSectionId();
    var $section = $(this.getSectionTemplate(section_id, level));
    var model = parent.addSection($section);

    model.data = data;
    model.flags = $.extend({}, this.settings.default_section_flags, flags);

    this.trigger('afterAddSection', model);

    model.exists = this.settings.default_exists;

    this.createSectionTypes(model);

    if (this.settings.default_section) {
        model.id = this.settings.default_section;
        this.addGroup(model, true, data, flags);
    }

    return model;
};

/**
 * Tries to delete a section. The section is not deleted if at least one rule is no_delete.
 * @param section {Section}
 * @return {boolean} true if the section has been deleted
 */
QueryBuilder.prototype.deleteSection = function(section) {
    var e = this.trigger('beforeDeleteSection', section);
    if (e.isDefaultPrevented()) {
        return false;
    }

    if (!this.deleteGroup(section.group)) {
        return false;
    }

    section.drop();
    this.trigger('afterDeleteSection');

    return true;
};

/**
 * Changes the exists setting of a section
 * @param section {Section}
 */
QueryBuilder.prototype.updateSectionExistsFlag = function(section) {
    section.$el.find('>' + Selectors.section_exists_flag).each(function() {
        var $this = $(this);
        $this.prop('checked', $this.val() === section.exists);
        $this.parent().toggleClass('active', $this.val() === section.exists);
    });

    this.trigger('afterUpdateSectionExistsFlag', section);
};

/**
 * Create the type <select> for a section
 * @param section {Section}
 */
QueryBuilder.prototype.createSectionTypes = function(section) {
    var stypes = this.change('getSectionTypes', this.sections, section);
    var $stypesSelect = $(this.getSectionTypeSelect(section, stypes));

    section.$el.find(Selectors.stype_container).html($stypesSelect);

    this.trigger('afterCreateSectionStypes', section);
};

/**
 * Refreshes a section after a type change
 * @param section {Section}
 */
QueryBuilder.prototype.refreshSection = function(model) {

    if (model.id) {
        // Clear out the section if there's any group or rule that don't belong
        var ok = true;
        model.$el.find(Selectors.group_container).each(function() {
            var group = Model($(this));
            if (group.section_id != model.id) {
                ok = false;
            }
        });
        if (ok) {
            model.$el.find(Selectors.rule_container).each(function() {
                var rule = Model($(this));
                if (rule.section_id != model.id) {
                    ok = false;
                }
            });
        }
        if (!ok) {
            model.empty();
        }
        if (!model.group) {
            var group = this.addGroup(model, true);
        }
    }
    else {
        model.empty();
    }

    this.trigger('afterRefreshSection', model);
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

    model.flags = $.extend({}, this.settings.default_rule_flags, flags);

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
    var filters = [];
    if (rule.section_id) {
        var section = this.getSectionById(rule.section_id);
        if (section) {
            filters = this.change('getRuleFilters', section.filters, rule);
        }
        else {
            filters = this.change('getRuleFilters', [], rule);
        }
    }
    else {
        filters = this.change('getRuleFilters', this.filters, rule);
    }
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
        self.status.updating_value = true;
        rule.value = self.getRuleValue(rule);
        self.status.updating_value = false;
    });

    if (filter.plugin) {
        $inputs[filter.plugin](filter.plugin_config || {});
    }

    this.trigger('afterCreateRuleInput', rule);

    if (filter.default_value !== undefined) {
        rule.value = filter.default_value;
    }
    else {
        self.status.updating_value = true;
        rule.value = self.getRuleValue(rule);
        self.status.updating_value = false;
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

        if ($valueContainer.is(':empty') || rule.operator.nb_inputs !== previousOperator.nb_inputs) {
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
    if (!this.status.updating_value) {
        this.setRuleValue(rule, rule.value);
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
 * Change section properties depending on flags.
 * @param section {Section}
 */
QueryBuilder.prototype.applySectionFlags = function(section) {
    var flags = section.flags;

    if (flags.exists_readonly) {
        section.$el.find('>' + Selectors.section_exists_flag).prop('disabled', true)
            .parent().addClass('readonly');
    }
    if (flags.no_add_rule) {
        section.$el.find(Selectors.add_rule).remove();
    }
    if (flags.no_add_group) {
        section.$el.find(Selectors.add_group).remove();
    }
    if (flags.no_delete) {
        section.$el.find(Selectors.delete_section).remove();
    }
    this.trigger('afterApplySectionFlags', section);

    if (section.group) {
        this.applyGroupFlags(section.group);
    }
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
        }, function(section) {
            this.clearErrors(section.group);
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
