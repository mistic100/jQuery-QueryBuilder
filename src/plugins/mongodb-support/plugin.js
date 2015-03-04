/*!
 * jQuery QueryBuilder MongoDB Support
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    mongoOperators: {
        equal:            function(v){ return v[0]; },
        not_equal:        function(v){ return {'$ne': v[0]}; },
        in:               function(v){ return {'$in': v}; },
        not_in:           function(v){ return {'$nin': v}; },
        less:             function(v){ return {'$lt': v[0]}; },
        less_or_equal:    function(v){ return {'$lte': v[0]}; },
        greater:          function(v){ return {'$gt': v[0]}; },
        greater_or_equal: function(v){ return {'$gte': v[0]}; },
        between:          function(v){ return {'$gte': v[0], '$lte': v[1]}; },
        begins_with:      function(v){ return {'$regex': '^' + escapeRegExp(v[0])}; },
        not_begins_with:  function(v){ return {'$regex': '^(?!' + escapeRegExp(v[0]) + ')'}; },
        contains:         function(v){ return {'$regex': escapeRegExp(v[0])}; },
        not_contains:     function(v){ return {'$regex': '^((?!' + escapeRegExp(v[0]) + ').)*$', '$options': 's'}; },
        ends_with:        function(v){ return {'$regex': escapeRegExp(v[0]) + '$'}; },
        not_ends_with:    function(v){ return {'$regex': '(?<!' + escapeRegExp(v[0]) + ')$'}; },
        is_empty:         function(v){ return ''; },
        is_not_empty:     function(v){ return {'$ne': ''}; },
        is_null:          function(v){ return null; },
        is_not_null:      function(v){ return {'$ne': null}; }
    }
});


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as MongoDB query
     * @param data {object} (optional) rules
     * @return {object}
     */
    getMongo: function(data) {
        data = (data===undefined) ? this.getRules() : data;

        var that = this;

        return (function parse(data) {
            if (!data.condition) {
                data.condition = that.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                $.error('Unable to build MongoDB query with '+ data.condition +' condition');
            }

            if (!data.rules) {
                return {};
            }

            var parts = [];

            $.each(data.rules, function(i, rule) {
                if (rule.rules && rule.rules.length>0) {
                    parts.push(parse(rule));
                }
                else {
                    var mdb = that.settings.mongoOperators[rule.operator],
                        ope = that.getOperatorByType(rule.operator),
                        values = [];

                    if (mdb === undefined) {
                        $.error('MongoDB operation unknown for operator '+ rule.operator);
                    }

                    if (ope.accept_values) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function(v, i) {
                            values.push(changeType(v, rule.type));
                        });
                    }

                    var part = {};
                    part[rule.field] = mdb.call(that, values);
                    parts.push(part);
                }
            });

            var res = {};
            if (parts.length > 0) {
                res[ '$'+data.condition.toLowerCase() ] = parts;
            }
            return res;
        }(data));
    }
});