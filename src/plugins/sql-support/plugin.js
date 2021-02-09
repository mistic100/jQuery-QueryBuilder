/*!
 * jQuery QueryBuilder SQL Support
 * Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    /* operators for internal -> SQL conversion */
    sqlOperators: {
        equal:            { op: '= ?' },
        not_equal:        { op: '!= ?' },
        in:               { op: 'IN(?)',          sep: ', ' },
        not_in:           { op: 'NOT IN(?)',      sep: ', ' },
        less:             { op: '< ?' },
        less_or_equal:    { op: '<= ?' },
        greater:          { op: '> ?' },
        greater_or_equal: { op: '>= ?' },
        between:          { op: 'BETWEEN ?',      sep: ' AND ' },
        not_between:      { op: 'NOT BETWEEN ?',  sep: ' AND ' },
        begins_with:      { op: 'LIKE(?)',        mod: '{0}%' },
        not_begins_with:  { op: 'NOT LIKE(?)',    mod: '{0}%' },
        contains:         { op: 'LIKE(?)',        mod: '%{0}%' },
        not_contains:     { op: 'NOT LIKE(?)',    mod: '%{0}%' },
        ends_with:        { op: 'LIKE(?)',        mod: '%{0}' },
        not_ends_with:    { op: 'NOT LIKE(?)',    mod: '%{0}' },
        is_empty:         { op: '= \'\'' },
        is_not_empty:     { op: '!= \'\'' },
        is_null:          { op: 'IS NULL' },
        is_not_null:      { op: 'IS NOT NULL' }
    },

    /* operators for SQL -> internal conversion */
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
        'IN':           function(v) { return { val: v, op: 'in' }; },
        'NOT IN':       function(v) { return { val: v, op: 'not_in' }; },
        '<':            function(v) { return { val: v, op: 'less' }; },
        '<=':           function(v) { return { val: v, op: 'less_or_equal' }; },
        '>':            function(v) { return { val: v, op: 'greater' }; },
        '>=':           function(v) { return { val: v, op: 'greater_or_equal' }; },
        'BETWEEN':      function(v) { return { val: v, op: 'between' }; },
        'NOT BETWEEN':  function(v) { return { val: v, op: 'not_between' }; },
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

    /* statements for internal -> SQL conversion */
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

    /* statements for SQL -> internal conversion */
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


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as SQL query
     * @throws UndefinedSQLConditionError, UndefinedSQLOperatorError
     * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
     * @param nl {bool} output with new lines
     * @param data {object} (optional) rules
     * @return {object}
     */
    getSQL: function(stmt, nl, data) {
        data = (data === undefined) ? this.getRules() : data;
        nl = (nl === true) ? '\n' : ' ';

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlStatements[config[1]](config[2]);
        }

        var self = this;

        var sql = (function parse(data) {
            if (!data.condition) {
                data.condition = self.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                Utils.error('UndefinedSQLCondition', 'Unable to build SQL query with condition "{0}"', data.condition);
            }

            if (!data.rules) {
                return '';
            }

            var parts = [];

            data.rules.forEach(function(rule) {
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
                                value+= sql.sep;
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
                                value+= stmt.add(rule, v);
                            }
                            else {
                                if (typeof v == 'string') {
                                    v = '\'' + v + '\'';
                                }

                                value+= v;
                            }
                        });
                    }

                    parts.push(rule.field + ' ' + sql.op.replace(/\?/, value));
                }
            });

            return parts.join(' ' + data.condition + nl);
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
     * Convert SQL to rules
     * @throws ConfigError, SQLParseError, UndefinedSQLOperatorError
     * @param data {object} query object
     * @param stmt {boolean|string} use prepared statements - false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
     * @return {object}
     */
    getRulesFromSQL: function(data, stmt) {
        if (!('SQLParser' in window)) {
            Utils.error('MissingLibrary', 'SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser');
        }

        var self = this;

        if (typeof data == 'string') {
            data = { sql: data };
        }

        if (stmt === true) stmt = 'question_mark';
        if (typeof stmt == 'string') {
            var config = getStmtConfig(stmt);
            stmt = this.settings.sqlRuleStatement[config[1]](data.params, config[2]);
        }

        if (stmt) {
            data.sql = stmt.esc(data.sql);
        }

        if (data.sql.toUpperCase().indexOf('SELECT') !== 0) {
            data.sql = 'SELECT * FROM table WHERE ' + data.sql;
        }

        var parsed = SQLParser.parse(data.sql);

        if (!parsed.where) {
            Utils.error('SQLParse', 'No WHERE clause found');
        }

        var out = {
            condition: this.settings.default_condition,
            rules: []
        };
        var curr = out;

        (function flatten(data, i) {
            // it's a node
            if (['AND', 'OR'].indexOf(data.operation.toUpperCase()) !== -1) {
                // create a sub-group if the condition is not the same and it's not the first level
                if (i > 0 && curr.condition != data.operation.toUpperCase()) {
                    curr.rules.push({
                        condition: self.settings.default_condition,
                        rules: []
                    });

                    curr = curr.rules[curr.rules.length - 1];
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
                if (data.left.value === undefined || data.right.value === undefined) {
                    Utils.error('SQLParse', 'Missing field and/or value');
                }

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
                if (operator == '<>') operator = '!=';

                var sqlrl;
                if (operator == 'NOT LIKE') {
                    sqlrl = self.settings.sqlRuleOperator['LIKE'];
                }
                else {
                    sqlrl = self.settings.sqlRuleOperator[operator];
                }

                if (sqlrl === undefined) {
                    Utils.error('UndefinedSQLOperator', 'Invalid SQL operation "{0}".', data.operation);
                }

                var opVal = sqlrl.call(this, value, data.operation);
                if (operator == 'NOT LIKE') opVal.op = 'not_' + opVal.op;

                var left_value = data.left.values.join('.');

                curr.rules.push({
                    id: self.change('getSQLFieldID', left_value, value),
                    field: left_value,
                    operator: opVal.op,
                    value: opVal.val
                });
            }
        }(parsed.where.conditions, 0));

        return out;
    },

    /**
     * Set rules from SQL
     * @param data {object}
     */
    setRulesFromSQL: function(data, stmt) {
        this.setRules(this.getRulesFromSQL(data, stmt));
    }
});

function getStmtConfig(stmt) {
    var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
    if (!config) config = [null, 'question_mark', undefined];
    return config;
}
