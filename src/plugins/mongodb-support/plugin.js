/**
 * @class MongoDbSupport
 * @memberof module:plugins
 * @description Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.
 */

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
        $eq: function(v) {
            return {
                'val': v,
                'op': v === null ? 'is_null' : (v === '' ? 'is_empty' : 'equal')
            };
        },
        $ne: function(v) {
            v = v.$ne;
            return {
                'val': v,
                'op': v === null ? 'is_not_null' : (v === '' ? 'is_not_empty' : 'not_equal')
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
        between: function(v) {
            return { 'val': [v.$gte, v.$lte], 'op': 'between' };
        },
        not_between: function(v) {
            return { 'val': [v.$lt, v.$gt], 'op': 'not_between' };
        },
        $in: function(v) {
            return { 'val': v.$in, 'op': 'in' };
        },
        $nin: function(v) {
            return { 'val': v.$nin, 'op': 'not_in' };
        },
        $lt: function(v) {
            return { 'val': v.$lt, 'op': 'less' };
        },
        $lte: function(v) {
            return { 'val': v.$lte, 'op': 'less_or_equal' };
        },
        $gt: function(v) {
            return { 'val': v.$gt, 'op': 'greater' };
        },
        $gte: function(v) {
            return { 'val': v.$gte, 'op': 'greater_or_equal' };
        }
    }
});

QueryBuilder.extend(/** @lends module:plugins.MongoDbSupport.prototype */ {
    /**
     * Returns rules as a MongoDB query
     * @param {object} [data] - current rules by default
     * @returns {object}
     * @fires module:plugins.MongoDbSupport.changer:getMongoDBField
     * @fires module:plugins.MongoDbSupport.changer:ruleToMongo
     * @fires module:plugins.MongoDbSupport.changer:groupToMongo
     * @throws UndefinedMongoConditionError, UndefinedMongoOperatorError
     */
    getMongo: function(data) {
        data = (data === undefined) ? this.getRules() : data;

        if (!data) {
            return null;
        }

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

                    if (mdb === undefined) {
                        Utils.error('UndefinedMongoOperator', 'Unknown MongoDB operation for operator "{0}"', rule.operator);
                    }

                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }
                    }

                    /**
                     * Modifies the MongoDB field used by a rule
                     * @event changer:getMongoDBField
                     * @memberof module:plugins.MongoDbSupport
                     * @param {string} field
                     * @param {Rule} rule
                     * @returns {string}
                     */
                    var field = self.change('getMongoDBField', rule.field, rule);

                    var ruleExpression = {};
                    ruleExpression[field] = mdb.call(self, rule.value);

                    /**
                     * Modifies the MongoDB expression generated for a rul
                     * @event changer:ruleToMongo
                     * @memberof module:plugins.MongoDbSupport
                     * @param {object} expression
                     * @param {Rule} rule
                     * @param {*} value
                     * @param {function} valueWrapper - function that takes the value and adds the operator
                     * @returns {object}
                     */
                    parts.push(self.change('ruleToMongo', ruleExpression, rule, rule.value, mdb));
                }
            });

            var groupExpression = {};
            groupExpression['$' + group.condition.toLowerCase()] = parts;

            /**
             * Modifies the MongoDB expression generated for a group
             * @event changer:groupToMongo
             * @memberof module:plugins.MongoDbSupport
             * @param {object} expression
             * @param {Group} group
             * @returns {object}
             */
            return self.change('groupToMongo', groupExpression, group);
        }(data));
    },

    /**
     * Converts a MongoDB query to rules
     * @param {object} query
     * @returns {object}
     * @fires module:plugins.MongoDbSupport.changer:parseMongoNode
     * @fires module:plugins.MongoDbSupport.changer:getMongoDBFieldID
     * @fires module:plugins.MongoDbSupport.changer:mongoToRule
     * @fires module:plugins.MongoDbSupport.changer:mongoToGroup
     * @throws MongoParseError, UndefinedMongoConditionError, UndefinedMongoOperatorError
     */
    getRulesFromMongo: function(query) {
        if (query === undefined || query === null) {
            return null;
        }

        var self = this;

        /**
         * Custom parsing of a MongoDB expression, you can return a sub-part of the expression, or a well formed group or rule JSON
         * @event changer:parseMongoNode
         * @memberof module:plugins.MongoDbSupport
         * @param {object} expression
         * @returns {object} expression, rule or group
         */
        query = self.change('parseMongoNode', query);

        // a plugin returned a group
        if ('rules' in query && 'condition' in query) {
            return query;
        }

        // a plugin returned a rule
        if ('id' in query && 'operator' in query && 'value' in query) {
            return {
                condition: this.settings.default_condition,
                rules: [query]
            };
        }

        var key = self.getMongoCondition(query);
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

                var key = self.getMongoCondition(data);
                if (key) {
                    parts.push(parse(data, key));
                }
                else {
                    var field = Object.keys(data)[0];
                    var value = data[field];

                    var operator = self.getMongoOperator(value);
                    if (operator === undefined) {
                        Utils.error('MongoParse', 'Invalid MongoDB query format');
                    }

                    var mdbrl = self.settings.mongoRuleOperators[operator];
                    if (mdbrl === undefined) {
                        Utils.error('UndefinedMongoOperator', 'JSON Rule operation unknown for operator "{0}"', operator);
                    }

                    var opVal = mdbrl.call(self, value);

                    var id = self.getMongoDBFieldID(field, value);

                    /**
                     * Modifies the rule generated from the MongoDB expression
                     * @event changer:mongoToRule
                     * @memberof module:plugins.MongoDbSupport
                     * @param {object} rule
                     * @param {object} expression
                     * @returns {object}
                     */
                    var rule = self.change('mongoToRule', {
                        id: id,
                        field: field,
                        operator: opVal.op,
                        value: opVal.val
                    }, data);

                    parts.push(rule);
                }
            });

            /**
             * Modifies the group generated from the MongoDB expression
             * @event changer:mongoToGroup
             * @memberof module:plugins.MongoDbSupport
             * @param {object} group
             * @param {object} expression
             * @returns {object}
             */
            return self.change('mongoToGroup', {
                condition: topKey.replace('$', '').toUpperCase(),
                rules: parts
            }, data);
        }(query, key));
    },

    /**
     * Sets rules a from MongoDB query
     * @see module:plugins.MongoDbSupport.getRulesFromMongo
     */
    setRulesFromMongo: function(query) {
        this.setRules(this.getRulesFromMongo(query));
    },

    /**
     * Returns a filter identifier from the MongoDB field.
     * Automatically use the only one filter with a matching field, fires a changer otherwise.
     * @param {string} field
     * @param {*} value
     * @fires module:plugins.MongoDbSupport:changer:getMongoDBFieldID
     * @returns {string}
     * @private
     */
    getMongoDBFieldID: function(field, value) {
        var matchingFilters = this.filters.filter(function(filter) {
            return filter.field === field;
        });

        var id;
        if (matchingFilters.length === 1) {
            id = matchingFilters[0].id;
        }
        else {
            /**
             * Returns a filter identifier from the MongoDB field
             * @event changer:getMongoDBFieldID
             * @memberof module:plugins.MongoDbSupport
             * @param {string} field
             * @param {*} value
             * @returns {string}
             */
            id = this.change('getMongoDBFieldID', field, value);
        }

        return id;
    },

    /**
     * Finds which operator is used in a MongoDB sub-object
     * @param {*} data
     * @returns {string|undefined}
     * @private
     */
    getMongoOperator: function(data) {
        if (data !== null && typeof data === 'object') {
            if (data.$gte !== undefined && data.$lte !== undefined) {
                return 'between';
            }
            if (data.$lt !== undefined && data.$gt !== undefined) {
                return 'not_between';
            }

            var knownKeys = Object.keys(data).filter(function(key) {
                return !!this.settings.mongoRuleOperators[key];
            }.bind(this));

            if (knownKeys.length === 1) {
                return knownKeys[0];
            }
        }
        else {
            return '$eq';
        }
    },


    /**
     * Returns the key corresponding to "$or" or "$and"
     * @param {object} data
     * @returns {string|undefined}
     * @private
     */
    getMongoCondition: function(data) {
        var keys = Object.keys(data);

        for (var i = 0, l = keys.length; i < l; i++) {
            if (keys[i].toLowerCase() === '$or' || keys[i].toLowerCase() === '$and') {
                return keys[i];
            }
        }
    }
});
