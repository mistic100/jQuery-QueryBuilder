/*!
 * jQuery QueryBuilder Invert
 * Allows to invert a rule operator, a group condition or the entire builder.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
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
    var that = this;

    /**
     * Bind events
     */
    this.on('afterInit', function() {
        that.$el.on('click.queryBuilder', '[data-invert=group]', function() {
            var $group = $(this).closest(Selectors.group_container);
            that.invert(Model($group), options);
        });

        if (options.display_rules_button && options.invert_rules) {
            that.$el.on('click.queryBuilder', '[data-invert=rule]', function() {
                var $rule = $(this).closest(Selectors.rule_container);
                that.invert(Model($rule), options);
            });
        }
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        var $h = $(h.value);
        $h.find(Selectors.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-invert="group"><i class="' + options.icon + '"></i> '+ that.lang.invert +'</button>');
        h.value = $h.prop('outerHTML');
    });

    if (options.display_rules_button && options.invert_rules) {
        this.on('getRuleTemplate.filter', function(h) {
            var $h = $(h.value);
            $h.find(Selectors.rule_actions).prepend('<button type="button" class="btn btn-xs btn-default" data-invert="rule"><i class="' + options.icon + '"></i> '+ that.lang.invert +'</button>');
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
                node.each(function(rule) {
                    if (options.invert_rules) {
                        this.invert(rule, options);
                    }
                }, function(group) {
                    this.invert(group, options);
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
                else  if (!options.silent_fail){
                    Utils.error('InvertOperator', 'Unknown inverse of operator "{0}"', node.operator.type);
                }
            }
        }
    }
});