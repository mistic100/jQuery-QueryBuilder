/*!
 * jQuery QueryBuilder MongoDB Support
 * Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
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
        not_between:      function(v){ return {'$lt': v[0], '$gt': v[1]}; },
        begins_with:      function(v){ return {'$regex': '^' + Utils.escapeRegExp(v[0])}; },
        not_begins_with:  function(v){ return {'$regex': '^(?!' + Utils.escapeRegExp(v[0]) + ')'}; },
        contains:         function(v){ return {'$regex': Utils.escapeRegExp(v[0])}; },
        not_contains:     function(v){ return {'$regex': '^((?!' + Utils.escapeRegExp(v[0]) + ').)*$', '$options': 's'}; },
        ends_with:        function(v){ return {'$regex': Utils.escapeRegExp(v[0]) + '$'}; },
        not_ends_with:    function(v){ return {'$regex': '(?<!' + Utils.escapeRegExp(v[0]) + ')$'}; },
        is_empty:         function(v){ return ''; },
        is_not_empty:     function(v){ return {'$ne': ''}; },
        is_null:          function(v){ return null; },
        is_not_null:      function(v){ return {'$ne': null}; }
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
            if (v.slice(0,4) == '^(?!' && v.slice(-1) == ')') {
                return { 'val': v.slice(4,-1), 'op': 'not_begins_with' };
            }
            else if (v.slice(0,5) == '^((?!' && v.slice(-5) == ').)*$') {
                return { 'val': v.slice(5,-5), 'op': 'not_contains' };
            }
            else if (v.slice(0,4) == '(?<!' && v.slice(-2) == ')$') {
                return { 'val': v.slice(4,-2), 'op': 'not_ends_with' };
            }
            else if (v.slice(-1) == '$') {
                return { 'val': v.slice(0,-1), 'op': 'ends_with' };
            }
            else if (v.slice(0,1) == '^') {
                return { 'val': v.slice(1), 'op': 'begins_with' };
            }
            else {
                return { 'val': v, 'op': 'contains' };
            }
        },
        between : function(v) { return {'val': [v.$gte, v.$lte], 'op': 'between'}; },
        not_between : function(v) { return {'val': [v.$lt, v.$gt], 'op': 'not_between'}; },
        $in :     function(v) { return {'val': v.$in, 'op': 'in'}; },
        $nin :    function(v) { return {'val': v.$nin, 'op': 'not_in'}; },
        $lt :     function(v) { return {'val': v.$lt, 'op': 'less'}; },
        $lte :    function(v) { return {'val': v.$lte, 'op': 'less_or_equal'}; },
        $gt :     function(v) { return {'val': v.$gt, 'op': 'greater'}; },
        $gte :    function(v) { return {'val': v.$gte, 'op': 'greater_or_equal'}; }
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
        data = (data===undefined) ? this.getRules() : data;

        var that = this;

        return (function parse(data) {
            if (!data.condition) {
                data.condition = that.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', data.condition);
            }

            if (!data.rules) {
                return {};
            }

            var parts = [];

            data.rules.forEach(function(rule) {
                if (rule.rules && rule.rules.length>0) {
                    parts.push(parse(rule));
                }
                else {
                    var mdb = that.settings.mongoOperators[rule.operator],
                        ope = that.getOperatorByType(rule.operator),
                        values = [];

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

                    var part = {};
                    part[rule.field] = mdb.call(that, values);
                    parts.push(part);
                }
            });

            var res = {};
            if (parts.length > 0) {
                res['$'+data.condition.toLowerCase()] = parts;
            }
            return res;
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

        var that = this,
            conditions = ['$and','$or'];

        return (function parse(data) {
            var topKeys = Object.keys(data);

            if (topKeys.length > 1) {
                Utils.error('MongoParse', 'Invalid MongoDB query format');
            }
            if (conditions.indexOf(topKeys[0].toLowerCase()) === -1) {
                Utils.error('UndefinedMongoCondition', 'Unable to build MongoDB query with condition "{0}"', topKeys[0]);
            }

            var condition = topKeys[0].toLowerCase() === conditions[0] ? 'AND' : 'OR',
                rules = data[topKeys[0]],
                parts = [];

            rules.forEach(function(rule) {
                var keys = Object.keys(rule);

                if (conditions.indexOf(keys[0].toLowerCase()) !== -1) {
                    parts.push(parse(rule));
                }
                else {
                    var field = keys[0],
                        value = rule[field];

                    var operator = that.determineMongoOperator(value, field);
                    if (operator === undefined) {
                        Utils.error('MongoParse', 'Invalid MongoDB query format');
                    }

                    var mdbrl = that.settings.mongoRuleOperators[operator];
                    if (mdbrl === undefined) {
                        Utils.error('UndefinedMongoOperator', 'JSON Rule operation unknown for operator "{0}"', operator);
                    }

                    var opVal = mdbrl.call(that, value);
                    parts.push({
                        id: that.change('getMongoDBFieldID', field, value),
                        field: field,
                        operator: opVal.op,
                        value: opVal.val
                    });
                }
            });

            var res = {};
            if (parts.length > 0) {
                res.condition = condition;
                res.rules = parts;
            }
            return res;
        }(data));
    },

    /**
     * Set rules from MongoDB object
     * @param data {object}
     */
    setRulesFromMongo: function(data) {
        this.setRules(this.getRulesFromMongo(data));
    },

    /**
     * Find which operator is used in a MongoDB sub-object
     * @param {mixed} value
     * @param {string} field
     * @return {string|undefined}
     */
    determineMongoOperator: function(value, field) {
        if (value !== null && typeof value === 'object') {
            var subkeys = Object.keys(value);

            if (subkeys.length === 1) {
                return subkeys[0];
            }
            else {
                if (value.$gte !==undefined && value.$lte !==undefined) {
                    return 'between';
                }
                if (value.$lt !==undefined && value.$gt !==undefined) {
                    return 'not_between';
                }
                else if (value.$regex !==undefined) { // optional $options
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
});