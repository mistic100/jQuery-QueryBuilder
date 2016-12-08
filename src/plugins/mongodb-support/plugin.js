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
     * @throws UndefinedMongoConditionError, UndefinedMongoBehavior, UndefinedMongoOperatorError
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
                else if (rule.section) {
                    Utils.error('UndefinedMongoBehavior', 'Sections are not currently supported for MongoDB queries');
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
