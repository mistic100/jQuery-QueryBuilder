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
        }, function(section) {
            if (parse(section.group)) {
                done++;
            }
            else {
                errors++;
            }
        });

        if (errors > 0) {
            return false;
        }
        else if (done === 0 && (!self.settings.allow_empty || !group.isRoot() || !group.parent instanceof Section)) {
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
 * @return {object}
 */
QueryBuilder.prototype.getRules = function(options) {
    options = $.extend({
        get_flags: false
    }, options);

    if (!this.validate()) {
        return {};
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
            if (rule.operator.nb_inputs !== 0) {
                value = rule.value;
            }

            var ruleData = {
                id: rule.filter.id,
                field: rule.filter.field,
                type: rule.filter.type,
                input: rule.filter.input,
                operator: rule.operator.type,
                value: value
            };

            if (rule.filter.data || rule.data) {
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
        }, function(model) {
            var rule = {
                section: model.type_id,
                exists: model.exists
            };
            rule.group = parse(model.group);
            groupData.rules.push(rule);
        });

        return self.change('groupToJson', groupData, group);

    }(this.model.root));

    return this.change('getRules', out);
};

/**
 * Set rules from object
 * @throws RulesError, UndefinedConditionError
 * @param data {object}
 */
QueryBuilder.prototype.setRules = function(data) {
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
            Utils.error('UndefinedCondition', 'Invalid condition "{0}"', data.condition);
        }

        group.condition = data.condition;

        data.rules.forEach(function(item) {
            var model;

            if (item.rules !== undefined) {
                if (self.settings.allow_groups !== -1 && self.settings.allow_groups < group.level) {
                    self.reset();
                    Utils.error('RulesParse', 'No more than {0} groups are allowed', self.settings.allow_groups);
                }
                else {
                    model = self.addGroup(group, false, item.data, self.parseGroupFlags(item));
                    if (model === null) {
                        return;
                    }

                    add(item, model);
                }
            }
            else if (item.section !== undefined) {
                if (!self.settings.allow_sections) {
                    self.reset();
                    Utils.error('RulesParse', 'No sections are allowed');
                }
                else {
                    var section = self.addSection(group, false, item.data, self.parseSectionFlags(item));
                    if (section === null) {
                        return;
                    }
                    section.type_id = item.section;
                    section.exists = item.exists;
                    if (item.group !== undefined) {
                        var gmodel = self.addGroup(section, false, item.group.data, self.parseGroupFlags(item.group));
                        if (gmodel === null) {
                            return;
                        }
                        add(item.group, gmodel);
                    }
                }
            }
            else {
                if (!item.empty) {
                    if (item.id === undefined) {
                        Utils.error('RulesParse', 'Missing rule field id');
                    }
                    if (item.operator === undefined) {
                        item.operator = 'equal';
                    }
                }

                model = self.addRule(group, item.data);
                if (model === null) {
                    return;
                }

                if (!item.empty) {
                    model.filter = self.getFilterById(item.id, group.section_type_id);
                    model.operator = self.getOperatorByType(item.operator);

                    if (model.operator.nb_inputs !== 0 && item.value !== undefined) {
                        model.value = item.value;
                    }
                }

                model.flags = self.parseRuleFlags(item);

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
