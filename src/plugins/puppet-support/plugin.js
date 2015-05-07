/*!
 * jQuery QueryBuilder SQL Support
 * Allows to export rules as a SQL WHERE statement.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    puppetOperators: {
        equal: function (v) {
            return '["=","certname","' + v[0] + '"]';
        },
        less: function (v) {
            return '["<","certname","' + v[0] + '"]';
        },
        less_or_equal: function (v) {
            return '["<=","certname","' + v[0] + '"]';
        },
        greater: function (v) {
            return '[">","certname","' + v[0] + '"]';
        },
        greater_or_equal: function (v) {
            return '[">=","certname","' + v[0] + '"]';
        },
        puppet_equal: function (v, subq) {
            console.log(subq);
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],["=","value","' + v[1] + '"]]]]]';
        },
        puppet_l: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],["<","value","' + v[1] + '"]]]]]';
        },
        puppet_le: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],["<=","value","' + v[1] + '"]]]]]';
        },
        puppet_g: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["","name","' + v[0] + '"],[">","value","' + v[1] + '"]]]]]';
        },
        puppet_ge: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],[">=","value","' + v[1] + '"]]]]]';
        },
        puppet_re_match: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],["~","value","' + v[1] + '"]]]]]';
        },
        puppet_re_amatch: function (v, subq) {
            return '["in","certname",["extract","certname",["select-' + subq + '",["and",["=","name","' + v[0] + '"],["~>","value","' + v[1] + '"]]]]]';
        },
        is_null: function (v) {
            return null;
        }
    }
});


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
        console.log(data);
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
            console.log(parts);
            var res = "";
            if (parts.length > 0) {
                res += '["' + data.condition.toLowerCase() + '"';
                parts.forEach(function (part){
                    res += ',' + part;
                });
                res += ']';
            }
            console.log(res);
            return res;
        }(data));
    }
});
