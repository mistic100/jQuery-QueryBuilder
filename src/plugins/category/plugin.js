/*!
 * jQuery QueryBuilder Category
 * Enables adding category for the filters.
 * Author: Can Saner
 */

// Selectors added for Category Plugin
// ===============================
Selectors.category_container = '.rule-category-container';
Selectors.rule_category = '.rule-category-container [name$=_category]';
Model.defineModelProperties(Rule, ['category']);

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
  categories: [],
  sort_categories: false,
  display_empty_category: true,
  default_category: null,
  templates: {
    categorySelect: '\
      {{ var optgroup = null; }} \
      <select class="form-control" name="{{= it.rule.id }}_category"> \
        {{? it.settings.display_empty_category }} \
          <option value="-1">{{= it.settings.select_placeholder }}</option> \
        {{?}} \
        {{~ it.categories: category }} \
          {{? optgroup !== category.optgroup }} \
            {{? optgroup !== null }}</optgroup>{{?}} \
            {{? (optgroup = category.optgroup) !== null }} \
              <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
            {{?}} \
          {{?}} \
          <option value="{{= category.id }}">{{= it.translate(category.label) }}</option> \
        {{~}} \
        {{? optgroup !== null }}</optgroup>{{?}} \
      </select>'
  }
});

QueryBuilder.define('category', function(options) {
    var self = this;

    // SETTINGS SHORTCUT
    this.categories = this.settings.categories;

    // CHECK ALL CATEGORIES
    this.categories = this.checkCategories(this.categories);
    /**
     * Bind events
     */
    this.on('afterInit', function() {
        // change event bindind for rule category select box
        self.$el.on('change.queryBuilder', Selectors.rule_category, function() {
            var $rule = $(this).closest(Selectors.rule_container);
            Model($rule).category = self.getCategoryById($(this).val());
        });

        // update event binding for category field of rule model 
        self.model.on('update', function(e, node, field, value, oldValue) {
            if (node instanceof Rule && field === 'category') {
                self.updateRuleCategory(node, oldValue);
            }
        });
    });

    /**
     * Initialize category property of a rule and create rule categories select box when new rule is added
     */
    this.on('afterAddRule', function(e, rule) {
        rule.__.category = null;
        self.createRuleCategories(rule);
    });

    /**
     * Modify templates
     */
    this.on('getRuleTemplate.filter', function(h) {
        var $h = $(h.value);
        $h.find(Selectors.filter_container).before('<div class="rule-category-container"></div>');
        h.value = $h.prop('outerHTML');
    });

    // init selectpicker
    this.on('afterCreateRuleCategories', function(e, rule) {
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(Selectors.rule_category).removeClass('form-control').selectpicker(options);
        }
    });

    // update selectpicker on change
    this.on('afterUpdateRuleCategory', function(e, rule) {
        if (self.settings.plugins && self.settings.plugins['bt-selectpicker']) {
            self.$el.find(Selectors.rule_category).selectpicker('render');
        }
    });

    /**
     * Export "category" to JSON
     */
    this.on('ruleToJson.filter', function(e, rule) {
        e.value.category = rule.category.id;
    });

    /**
     * Read "category" from JSON
     */
    this.on('jsonToRule.filter', function(e, json) {
        //e.value.category = e.builder.getCategoryById(json.category ? json.category : '-1');
    });
}, {
    default_no_category: false,
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});

// keep a pointer to the original addRule method
var originaAddRule = QueryBuilder.prototype.addRule;

QueryBuilder.extend({
    /** //OVERRIDEN to change flow of creating rule filter when new rule is added, prevented filter select creation and created category select instead.
     * Add a new rule
     * @param parent {Group}
     * @param data {mixed,optional} rule custom data
     * @param flags {object,optional} flags to apply to the rule
     * @return rule {Rule}
     */
     addRule: function(parent, data, flags) {
        //originaAddRule.call(this);
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

        this.createRuleCategories(model);

        if (this.settings.default_category || !this.settings.display_empty_category) {
            model.category = this.change('getDefaultCategory',
                this.getCategoryById(this.settings.default_category || this.categories[0].id),
                model
            );
        }

        return model;
    },

    /** //OVERRIDEN to change flow of creating rule filters
     * Create the filters <select> for a rule
     * @param rule {Rule}
     */
    createRuleFilters: function(rule, categoryId) {
        var filters = this.getFiltersForCategoryId(categoryId);
        var $filterSelect = $(this.getRuleFilterSelect(rule, filters));

        rule.$el.find(Selectors.filter_container).html($filterSelect);

        this.trigger('afterCreateRuleFilters', rule);
    },

    /** //OVERRIDEN to change flow of creating rules from JSON object
     * Set rules from object
     * @throws RulesError, UndefinedConditionError
     * @param data {object}
     * @param {object} options
     *      - allow_invalid: false[default] | true(silent-fail if the data are invalid)
     */
    setRules: function(data, options) {
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
                        if (item.category){
                            model.category = self.getCategoryById(item.category ? item.category : '-1');
                            if (self.isFilterOKForCategory(item.id, item.category)){

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
    },

    /**
     * Decide if filter is available for category
     * @param filterId {string}
     * @param categoryId {string}
     * @return {boolean} true if filter belongs to that category
     */
    isFilterOKForCategory: function(filterId, categoryId) {
        var filtersOfCategory = this.getFiltersForCategoryId(categoryId);

        for (var i = 0; i < filtersOfCategory.length; i++) { 
            if (filtersOfCategory[i].id == filterId){
                return true;
            }
        }
        
        return false;
    },

    /**
     * Filter filters array according to categories of filters 
     * @param categoryId {string}
     * @return {array}
     */
    getFiltersForCategoryId: function(categoryId) {
        var filtersOfCategory = [];
        var category = this.getCategoryById(categoryId);
        this.filters.forEach(function(filter, i) {
            category.filters.forEach(function(filterOfCategory, i) {
                if (filter.id == filterOfCategory){
                    filtersOfCategory.push(filter);
                }
            }, this);
        }, this);

        return filtersOfCategory;
    },

    /**
     * Returns rule category <select> HTML
     * @param rule {Rule}
     * @param categories {array}
     * @return {string}
     */
    getRuleCategorySelect: function(rule, categories) {
        var h = this.templates.categorySelect({
            builder: this,
            rule: rule,
            categories: categories,
            icons: this.icons,
            lang: this.lang,
            settings: this.settings,
            translate: this.translateLabel
        });

        return this.change('getRuleCategorySelect', h, rule);
    },

    /**
     * Create the categories <select> for a rule
     * @param rule {Rule}
     */
    createRuleCategories: function(rule) {
        var categories = this.change('getRuleCategories', this.categories, rule);
        var $categorySelect = $(this.getRuleCategorySelect(rule, categories));

        rule.$el.find(Selectors.category_container).html($categorySelect);
        
        this.trigger('afterCreateRuleCategories', rule);
    },

    /**
     * Returns a particular category by its id
     * @throws UndefinedCategoryError
     * @param id {string}
     * @param [doThrow=true] {boolean}
     * @return {object|null}
     */
    getCategoryById: function(id, doThrow) {
        if (id == '-1') {
            return null;
        }

        for (var i = 0, l = this.categories.length; i < l; i++) {
            if (this.categories[i].id == id) {
                return this.categories[i];
            }
        }

        Utils.error(doThrow !== false, 'UndefinedCategory', 'Undefined category "{0}"', id);

        return null;
    },

    /**
     * Perform action when rule's category is changed
     * @param rule {Rule}
     * @param previousCategory {object}
     */
    updateRuleCategory: function(rule, previousCategory) {
        if (rule.category) {
            this.createRuleFilters(rule, rule.category.id);

            rule.$el.find(Selectors.rule_category).val(rule.category ? rule.category.id : '-1');

            // clear rule data if category is changed
            if (previousCategory && rule.category && previousCategory.id !== rule.category.id) {
                rule.data = undefined;
            }

            this.trigger('afterUpdateRuleCategory', rule);
        }
    },

    /**
     * Checks the configuration of each category
     * @throws ConfigError
     */
    checkCategories: function(categories) {
        var definedCategories = [];

        if (!categories || categories.length === 0) {
            Utils.error('Config', 'Missing categories list');
        }

        categories.forEach(function(category, i) {
            if (!category.id) {
                Utils.error('Config', 'Missing category {0} id', i);
            }
            if (definedCategories.indexOf(category.id) != -1) {
                Utils.error('Config', 'Category "{0}" already defined', category.id);
            }
            definedCategories.push(category.id);

            if (!category.type) {
                category.type = 'string';
            }
            else if (!QueryBuilder.types[category.type]) {
                Utils.error('Config', 'Invalid type "{0}"', category.type);
            }

            if (!category.field) {
                category.field = category.id;
            }
            if (!category.label) {
                category.label = category.field;
            }

            if (!category.optgroup) {
                category.optgroup = null;
            }
            else {
                this.status.has_optgroup = true;

                // register optgroup if needed
                if (!this.settings.optgroups[category.optgroup]) {
                    this.settings.optgroups[category.optgroup] = category.optgroup;
                }
            }
        }, this);

        if (this.settings.sort_categories) {
            if (typeof this.settings.sort_categories == 'function') {
                categories.sort(this.settings.sort_categories);
            }
            else {
                var self = this;
                categories.sort(function(a, b) {
                    return self.translateLabel(a.label).localeCompare(self.translateLabel(b.label));
                });
            }
        }

        if (this.status.has_optgroup) {
            categories = Utils.groupSort(categories, 'optgroup');
        }

        return categories;
    }
});