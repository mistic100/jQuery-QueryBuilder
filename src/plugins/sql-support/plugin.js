/**
 * @class SqlSupport
 * @memberof module:plugins
 * @description Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
 */

QueryBuilder.defaults({
    // operators for internal -> SQL conversion
    sqlOperators: {
        equal: { op: '= ?' },
        not_equal: { op: '!= ?' },
        in: { op: 'IN(?)', sep: ', ' },
        not_in: { op: 'NOT IN(?)', sep: ', ' },
        less: { op: '< ?' },
        less_or_equal: { op: '<= ?' },
        greater: { op: '> ?' },
        greater_or_equal: { op: '>= ?' },
        between: { op: 'BETWEEN ?', sep: ' AND ' },
        not_between: { op: 'NOT BETWEEN ?', sep: ' AND ' },
        begins_with: { op: 'LIKE(?)', mod: '{0}%' },
        not_begins_with: { op: 'NOT LIKE(?)', mod: '{0}%' },
        contains: { op: 'LIKE(?)', mod: '%{0}%' },
        not_contains: { op: 'NOT LIKE(?)', mod: '%{0}%' },
        ends_with: { op: 'LIKE(?)', mod: '%{0}' },
        not_ends_with: { op: 'NOT LIKE(?)', mod: '%{0}' },
        is_empty: { op: '= \'\'' },
        is_not_empty: { op: '!= \'\'' },
        is_null: { op: 'IS NULL' },
        is_not_null: { op: 'IS NOT NULL' }
    },

    // operators for SQL -> internal conversion
    sqlRuleOperator: {
        '=': function(v) {
            return {
                val: v,
                op: v === '' ? 'is_empty' : 'equal'
            };
        },
        '!=': function(v) {
            return {
                val: v,
                op: v === '' ? 'is_not_empty' : 'not_equal'
            };
        },
        'LIKE': function(v) {
            if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                return {
                    val: v.slice(1, -1),
                    op: 'contains'
                };
            }
            else if (v.slice(0, 1) == '%') {
                return {
                    val: v.slice(1),
                    op: 'ends_with'
                };
            }
            else if (v.slice(-1) == '%') {
                return {
                    val: v.slice(0, -1),
                    op: 'begins_with'
                };
            }
            else {
                Utils.error('SQLParse', 'Invalid value for LIKE operator "{0}"', v);
            }
        },
        'NOT LIKE': function(v) {
            if (v.slice(0, 1) == '%' && v.slice(-1) == '%') {
                return {
                    val: v.slice(1, -1),
                    op: 'not_contains'
                };
            }
            else if (v.slice(0, 1) == '%') {
                return {
                    val: v.slice(1),
                    op: 'not_ends_with'
                };
            }
            else if (v.slice(-1) == '%') {
                return {
                    val: v.slice(0, -1),
                    op: 'not_begins_with'
                };
            }
            else {
                Utils.error('SQLParse', 'Invalid value for NOT LIKE operator "{0}"', v);
            }
        },
        'IN': function(v) {
            return { val: v, op: 'in' };
        },
        'NOT IN': function(v) {
            return { val: v, op: 'not_in' };
        },
        '<': function(v) {
            return { val: v, op: 'less' };
        },
        '<=': function(v) {
            return { val: v, op: 'less_or_equal' };
        },
        '>': function(v) {
            return { val: v, op: 'greater' };
        },
        '>=': function(v) {
            return { val: v, op: 'greater_or_equal' };
        },
        'BETWEEN': function(v) {
            return { val: v, op: 'between' };
        },
        'NOT BETWEEN': function(v) {
            return { val: v, op: 'not_between' };
        },
        'IS': function(v) {
            if (v !== null) {
                Utils.error('SQLParse', 'Invalid value for IS operator');
            }
            return { val: null, op: 'is_null' };
        },
        'IS NOT': function(v) {
            if (v !== null) {
                Utils.error('SQLParse', 'Invalid value for IS operator');
            }
            return { val: null, op: 'is_not_null' };
        }
    },

    // statements for internal -> SQL conversion
    sqlStatements: {
        'question_mark': function() {
            var params = [];
            return {
                add: function(rule, value) {
                    params.push(value);
                    return '?';
                },
                run: function() {
                    return params;
                }
            };
        },

        'numbered': function(char) {
            if (!char || char.length > 1) char = '$';
            var index = 0;
            var params = [];
            return {
                add: function(rule, value) {
                    params.push(value);
                    index++;
                    return char + index;
                },
                run: function() {
                    return params;
                }
            };
        },

        'named': function(char) {
            if (!char || char.length > 1) char = ':';
            var indexes = {};
            var params = {};
            return {
                add: function(rule, value) {
                    if (!indexes[rule.field]) indexes[rule.field] = 1;
                    var key = rule.field + '_' + (indexes[rule.field]++);
                    params[key] = value;
                    return char + key;
                },
                run: function() {
                    return params;
                }
            };
        }
    },

    // statements for SQL -> internal conversion
    sqlRuleStatement: {
        'question_mark': function(values) {
            var index = 0;
            return {
                parse: function(v) {
                    return v == '?' ? values[index++] : v;
                },
                esc: function(sql) {
                    return sql.replace(/\?/g, '\'?\'');
                }
            };
        },

        'numbered': function(values, char) {
            if (!char || char.length > 1) char = '$';
            var regex1 = new RegExp('^\\' + char + '[0-9]+$');
            var regex2 = new RegExp('\\' + char + '([0-9]+)', 'g');
            return {
                parse: function(v) {
                    return regex1.test(v) ? values[v.slice(1) - 1] : v;
                },
                esc: function(sql) {
                    return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                }
            };
        },

        'named': function(values, char) {
            if (!char || char.length > 1) char = ':';
            var regex1 = new RegExp('^\\' + char);
            var regex2 = new RegExp('\\' + char + '(' + Object.keys(values).join('|') + ')', 'g');
            return {
                parse: function(v) {
                    return regex1.test(v) ? values[v.slice(1)] : v;
                },
                esc: function(sql) {
                    return sql.replace(regex2, '\'' + (char == '$' ? '$$' : char) + '$1\'');
                }
            };
        }
    }
});

/**
 * @typedef {object} SqlQuery
 * @memberof module:plugins.SqlSupport
 * @property {string} sql
 * @property {object} params
 */

QueryBuilder.extend(/** @lends module:plugins.SqlSupport.prototype */ {
    /**
     * Returns rules as a SQL query
     * @param {boolean|string} [stmt] - use prepared statements: false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
     * @param {boolean} [nl=false] output with new lines
     * @param {object} [data] - current rules by default
     * @returns {module:plugins.SqlSupport.SqlQuery}
     * @fires module:plugins.SqlSupport.changer:getSQLField
     * @fires module:plugins.SqlSupport.changer:ruleToSQL
     * @fires module:plugins.SqlSupport.changer:groupToSQL
     * @throws UndefinedSQLConditionError, UndefinedSQLOperatorError
     */
    getSQL: function(stmt, nl, data) {
        data = (data === undefined) ? this.getRules() : data;
        nl = !!nl ? '\n' : ' ';

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlStatements[config[1]](config[2]);
        }

        var self = this;

        var sql = (function parse(group) {
            if (!group.condition) {
                group.condition = self.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(group.condition.toUpperCase()) === -1) {
                Utils.error('UndefinedSQLCondition', 'Unable to build SQL query with condition "{0}"', group.condition);
            }

            if (!group.rules) {
                return '';
            }

            var parts = [];

            group.rules.forEach(function(rule) {
                if (rule.rules && rule.rules.length > 0) {
                    parts.push('(' + nl + parse(rule) + nl + ')' + nl);
                }
                else {
                    var sql = self.settings.sqlOperators[rule.operator];
                    var ope = self.getOperatorByType(rule.operator);
                    var value = '';

                    if (sql === undefined) {
                        Utils.error('UndefinedSQLOperator', 'Unknown SQL operation for operator "{0}"', rule.operator);
                    }

                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function(v, i) {
                            if (i > 0) {
                                value += sql.sep;
                            }

                            if (rule.type == 'integer' || rule.type == 'double' || rule.type == 'boolean') {
                                v = Utils.changeType(v, rule.type, true);
                            }
                            else if (!stmt) {
                                v = Utils.escapeString(v);
                            }

                            if (sql.mod) {
                                v = Utils.fmt(sql.mod, v);
                            }

                            if (stmt) {
                                value += stmt.add(rule, v);
                            }
                            else {
                                if (typeof v == 'string') {
                                    v = '\'' + v + '\'';
                                }

                                value += v;
                            }
                        });
                    }

                    var sqlFn = function(v) {
                        return sql.op.replace(/\?/, v);
                    };

                    /**
                     * Modifies the SQL field used by a rule
                     * @event changer:getSQLField
                     * @memberof module:plugins.SqlSupport
                     * @param {string} field
                     * @param {Rule} rule
                     * @returns {string}
                     */
                    var field = self.change('getSQLField', rule.field, rule);

                    var ruleExpression = field + ' ' + sqlFn(value);

                    /**
                     * Modifies the SQL generated for a rule
                     * @event changer:ruleToSQL
                     * @memberof module:plugins.SqlSupport
                     * @param {string} expression
                     * @param {Rule} rule
                     * @param {*} value
                     * @param {function} valueWrapper - function that takes the value and adds the operator
                     * @returns {string}
                     */
                    parts.push(self.change('ruleToSQL', ruleExpression, rule, value, sqlFn));
                }
            });

            var groupExpression = parts.join(' ' + group.condition + nl);

            /**
             * Modifies the SQL generated for a group
             * @event changer:groupToSQL
             * @memberof module:plugins.SqlSupport
             * @param {string} expression
             * @param {Group} group
             * @returns {string}
             */
            return self.change('groupToSQL', groupExpression, group);
        }(data));

        if (stmt) {
            return {
                sql: sql,
                params: stmt.run()
            };
        }
        else {
            return {
                sql: sql
            };
        }
    },

    /**
     * Convert a SQL query to rules
     * @param {string|module:plugins.SqlSupport.SqlQuery} query
     * @param {boolean|string} stmt
     * @returns {object}
     * @fires module:plugins.SqlSupport.changer:parseSQLNode
     * @fires module:plugins.SqlSupport.changer:getSQLFieldID
     * @fires module:plugins.SqlSupport.changer:sqlToRule
     * @fires module:plugins.SqlSupport.changer:sqlToGroup
     * @throws MissingLibraryError, SQLParseError, UndefinedSQLOperatorError
     */
    getRulesFromSQL: function(query, stmt) {
        if (!('SQLParser' in window)) {
            Utils.error('MissingLibrary', 'SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser');
        }

        var self = this;

        if (typeof query == 'string') {
            query = { sql: query };
        }

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlRuleStatement[config[1]](query.params, config[2]);
        }

        if (stmt) {
            query.sql = stmt.esc(query.sql);
        }

        if (query.sql.toUpperCase().indexOf('SELECT') !== 0) {
            query.sql = 'SELECT * FROM table WHERE ' + query.sql;
        }

        var parsed = SQLParser.parse(query.sql);

        if (!parsed.where) {
            Utils.error('SQLParse', 'No WHERE clause found');
        }

        /**
         * Custom parsing of an AST node generated by SQLParser, you can return a sub-part of the tree, or a well formed group or rule JSON
         * @event changer:parseSQLNode
         * @memberof module:plugins.SqlSupport
         * @param {object} AST node
         * @returns {object} tree, rule or group
         */
        var data = self.change('parseSQLNode', parsed.where.conditions);

        // a plugin returned a group
        if ('rules' in data && 'condition' in data) {
            return data;
        }

        // a plugin returned a rule
        if ('id' in data && 'operator' in data && 'value' in data) {
            return {
                condition: this.settings.default_condition,
                rules: [data]
            };
        }

        // create root group
        var out = self.change('sqlToGroup', {
            condition: this.settings.default_condition,
            rules: []
        }, data);

        // keep track of current group
        var curr = out;

        (function flatten(data, i) {
            // allow plugins to manually parse or handle special cases
            data = self.change('parseSQLNode', data);

            // a plugin returned a group
            if ('rules' in data && 'condition' in data) {
                curr.rules.push(data);
                return;
            }

            // a plugin returned a rule
            if ('id' in data && 'operator' in data && 'value' in data) {
                curr.rules.push(data);
                return;
            }

            // data must be a SQL parser node
            if (!('left' in data) || !('right' in data) || !('operation' in data)) {
                Utils.error('SQLParse', 'Unable to parse WHERE clause');
            }

            // it's a node
            if (['AND', 'OR'].indexOf(data.operation.toUpperCase()) !== -1) {
                // create a sub-group if the condition is not the same and it's not the first level
                if (i > 0 && curr.condition != data.operation.toUpperCase()) {
                    /**
                     * Modifies the group generated from the SQL expression (this is called before the group is filled with rules)
                     * @event changer:sqlToGroup
                     * @memberof module:plugins.SqlSupport
                     * @param {object} group
                     * @param {object} AST
                     * @returns {object}
                     */
                    var group = self.change('sqlToGroup', {
                        condition: self.settings.default_condition,
                        rules: []
                    }, data);

                    curr.rules.push(group);
                    curr = group;
                }

                curr.condition = data.operation.toUpperCase();
                i++;

                // some magic !
                var next = curr;
                flatten(data.left, i);

                curr = next;
                flatten(data.right, i);
            }
            // it's a leaf
            else {
                if ($.isPlainObject(data.right.value)) {
                    Utils.error('SQLParse', 'Value format not supported for {0}.', data.left.value);
                }

                // convert array
                var value;
                if ($.isArray(data.right.value)) {
                    value = data.right.value.map(function(v) {
                        return v.value;
                    });
                }
                else {
                    value = data.right.value;
                }

                // get actual values
                if (stmt) {
                    if ($.isArray(value)) {
                        value = value.map(stmt.parse);
                    }
                    else {
                        value = stmt.parse(value);
                    }
                }

                // convert operator
                var operator = data.operation.toUpperCase();
                if (operator == '<>') {
                    operator = '!=';
                }

                var sqlrl = self.settings.sqlRuleOperator[operator];
                if (sqlrl === undefined) {
                    Utils.error('UndefinedSQLOperator', 'Invalid SQL operation "{0}".', data.operation);
                }

                var opVal = sqlrl.call(this, value, data.operation);

                // find field name
                var field;
                if ('values' in data.left) {
                    field = data.left.values.join('.');
                }
                else if ('value' in data.left) {
                    field = data.left.value;
                }
                else {
                    Utils.error('SQLParse', 'Cannot find field name in {0}', JSON.stringify(data.left));
                }

                var id = self.getSQLFieldID(field, value);

                /**
                 * Modifies the rule generated from the SQL expression
                 * @event changer:sqlToRule
                 * @memberof module:plugins.SqlSupport
                 * @param {object} rule
                 * @param {object} AST
                 * @returns {object}
                 */
                var rule = self.change('sqlToRule', {
                    id: id,
                    field: field,
                    operator: opVal.op,
                    value: opVal.val
                }, data);

                curr.rules.push(rule);
            }
        }(data, 0));

        return out;
    },

    /**
     * Sets the builder's rules from a SQL query
     * @see module:plugins.SqlSupport.getRulesFromSQL
     */
    setRulesFromSQL: function(query, stmt) {
        this.setRules(this.getRulesFromSQL(query, stmt));
    },

    /**
     * Returns a filter identifier from the SQL field.
     * Automatically use the only one filter with a matching field, fires a changer otherwise.
     * @param {string} field
     * @param {*} value
     * @fires module:plugins.SqlSupport:changer:getSQLFieldID
     * @returns {string}
     * @private
     */
    getSQLFieldID: function(field, value) {
        var matchingFilters = this.filters.filter(function(filter) {
            return filter.field === field;
        });

        var id;
        if (matchingFilters.length === 1) {
            id = matchingFilters[0].id;
        }
        else {
            /**
             * Returns a filter identifier from the SQL field
             * @event changer:getSQLFieldID
             * @memberof module:plugins.SqlSupport
             * @param {string} field
             * @param {*} value
             * @returns {string}
             */
            id = this.change('getSQLFieldID', field, value);
        }

        return id;
    }
});

/**
 * Parses the statement configuration
 * @memberof module:plugins.SqlSupport
 * @param {string} stmt
 * @returns {Array} null, mode, option
 * @private
 */
function getStmtConfig(stmt) {
    var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
    if (!config) config = [null, 'question_mark', undefined];
    return config;
}
