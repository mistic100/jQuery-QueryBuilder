/*!
 * jQuery QueryBuilder Puppet Support
 * Allows to export rules as a PuppetDB Query statement.
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    conditions: ['NOT', 'AND', 'OR'],

    operators: [
        {type: 'equal', nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'regex_match', nb_inputs: 1, multiple: false, apply_to: ['string', 'number']},
        {type: 'regex_array_match', nb_inputs: 1, multiple: false, apply_to: ['string', 'number']},
        {type: 'puppet_equal', nb_inputs: 2, multiple: true, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'not_equal', nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        {type: 'not_in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        {type: 'less', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'less_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'puppet_l', nb_inputs: 2, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_le', nb_inputs: 2, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'greater', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'puppet_g', nb_inputs: 2, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_ge', nb_inputs: 2, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_re_match', nb_inputs: 2, multiple: false, apply_to: ['string']},
        {type: 'puppet_re_amatch', nb_inputs: 2, multiple: false, apply_to: ['string']},
        {type: 'between', nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'is_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_not_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_null', nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'is_not_null', nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']}
    ],

    puppetOperators: {
        equal: function (v) {
            if ($.isNumeric(v[0])) {
                return '["=","certname",' + v[0] + ']';
            }
            return '["=","certname","' + v[0] + '"]';
        },
        less: function (v) {
            if ($.isNumeric(v[0])) {
                return '["=","certname",' + v[0] + ']';
            }
            return '["<","certname","' + v[0] + '"]';
        },
        less_or_equal: function (v) {
            if ($.isNumeric(v[0])) {
                return '["=","certname",' + v[0] + ']';
            }
            return '["<=","certname","' + v[0] + '"]';
        },
        greater: function (v) {
            if ($.isNumeric(v[0])) {
                return '["=","certname",' + v[0] + ']';
            }
            return '[">","certname","' + v[0] + '"]';
        },
        greater_or_equal: function (v) {
            if ($.isNumeric(v[0])) {
                return '["=","certname",' + v[0] + ']';
            }
            return '[">=","certname","' + v[0] + '"]';
        },
        regex_match: function (v) {
            return '["~","certname","' + v[0] + '"]';
        },
        puppet_equal: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["=","' + getValueName(subq) + '",' + v[1] + ']]]]]';
            }
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["=","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_l: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["<","' + getValueName(subq) + '",' + v[1] + ']]]]]';
            }
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["<","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_le: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["<=","' + getValueName(subq) + '",' + v[1] + ']]]]]';
            }
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["<=","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_g: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],[">","' + getValueName(subq) + '",' + v[1] + ']]]]]';
            }
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],[">","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_ge: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],[">=","' + getValueName(subq) + '",' + v[1] + ']]]]]';
            }
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],[">=","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_re_match: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["~","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        puppet_re_amatch: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","' + getSearchName(subq) + '","' + v[0] + '"],["~>","' + getValueName(subq) + '","' + v[1] + '"]]]]]';
        },
        is_null: function (v) {
            return null;
        }
    }
});

function getSearchName(subq) {
    if (subq == 'resources'){
        var puppet_search_name = "type";
    }
    else if (subq == 'facts') {
        var puppet_search_name = "name";
    }
    return puppet_search_name;
}
function getValueName(subq) {
    if (subq == 'resources'){
        var puppet_value_name = "title";
    }
    else if (subq == 'facts') {
        var puppet_value_name = "value";
    }
    return puppet_value_name;
}


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as Puppet query
     * @param data {object} (optional) rules
     * @return {object}
     */
    getPuppet: function (data) {
        data = (data === undefined) ? this.getRules() : data;

        var that = this;
        return (function parse(data) {
            if (!data.condition) {
                data.condition = that.settings.default_condition;
            }
            if (['NOT', 'AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                error('Unable to build Puppet query with condition "{0}"', data.condition);
            }

            if (!data.rules) {
                return {};
            }

            var parts = [];

            data.rules.forEach(function (rule) {
                if (rule.rules && rule.rules.length > 0) {
                    parts.push(parse(rule));
                }
                else {
                    var mdb = that.settings.puppetOperators[rule.operator],
                        ope = that.getOperatorByType(rule.operator),
                        values = [];

                    if (mdb === undefined) {
                        error('Unknown Puppet operation for operator "{0}"', rule.operator);
                    }
                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function (v) {
                            values.push(changeType(v, rule.type));
                        });
                    }
                    var part = mdb.call(that, values, rule.field);
                    parts.push(part);
                }
            });
            var res = "";
            if (parts.length > 0) {
                res += '["' + data.condition.toLowerCase() + '"';
                parts.forEach(function (part) {
                    res += ',' + part;
                });
                res += ']';
            }
            return res;
        }(data));
    }
});
