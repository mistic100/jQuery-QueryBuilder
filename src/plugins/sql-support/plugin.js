/*!
 * jQuery QueryBuilder SQL Support
 * Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    /* operators for internal -> SQL conversion */
    sqlOperators: {
        equal:            { op: '= ?' },
        not_equal:        { op: '!= ?' },
        in:               { op: 'IN(?)',     sep: ', ' },
        not_in:           { op: 'NOT IN(?)', sep: ', ' },
        less:             { op: '< ?' },
        less_or_equal:    { op: '<= ?' },
        greater:          { op: '> ?' },
        greater_or_equal: { op: '>= ?' },
        between:          { op: 'BETWEEN ?',     sep: ' AND ' },
        not_between:      { op: 'NOT BETWEEN ?', sep: ' AND ' },
        begins_with:      { op: 'LIKE(?)',     fn: function(v){ return v+'%'; } },
        not_begins_with:  { op: 'NOT LIKE(?)', fn: function(v){ return v+'%'; } },
        contains:         { op: 'LIKE(?)',     fn: function(v){ return '%'+v+'%'; } },
        not_contains:     { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v+'%'; } },
        ends_with:        { op: 'LIKE(?)',     fn: function(v){ return '%'+v; } },
        not_ends_with:    { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v; } },
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
            if (v.slice(0,1)=='%' && v.slice(-1)=='%') {
                return {
                    val: v.slice(1,-1),
                    op: 'contains'
                };
            }
            else if (v.slice(0,1)=='%') {
                return {
                    val: v.slice(1),
                    op: 'ends_with'
                };
            }
            else if (v.slice(-1)=='%') {
                return {
                    val: v.slice(0,-1),
                    op: 'begins_with'
                };
            }
            else {
                error('Invalid value for LIKE operator');
            }
        },
        'IN':       function(v) { return { val: v, op: 'in' }; },
        'NOT IN':   function(v) { return { val: v, op: 'not_in' }; },
        '<':        function(v) { return { val: v, op: 'less' }; },
        '<=':       function(v) { return { val: v, op: 'less_or_equal' }; },
        '>':        function(v) { return { val: v, op: 'greater' }; },
        '>=':       function(v) { return { val: v, op: 'greater_or_equal' }; },
        'BETWEEN':  function(v) { return { val: v, op: 'between' }; },
        'NOT BETWEEN': function(v) { return { val: v, op: 'not_between' }; },
        'IS':       function(v) {
            if (v !== null) {
                error('Invalid value for IS operator');
            }
            return { val: null, op: 'is_null' };
        },
        'IS NOT':   function(v) {
            if (v !== null) {
                error('Invalid value for IS operator');
            }
            return { val: null, op: 'is_not_null' };
        }
    },

    /* statements for internal -> SQL conversion */
    sqlStatements: {
        'question_mark': function() {
            var bind_params = [];
            return {
                add: function(rule, value) {
                    bind_params.push(value);
                    return '?';
                },
                run: function() {
                    return bind_params;
                }
            };
        },

        'numbered': function() {
            var bind_index = 0;
            var bind_params = [];
            return {
                add: function(rule, value) {
                    bind_params.push(value);
                    bind_index++;
                    return '$' + bind_index;
                },
                run: function() {
                    return bind_params;
                }
            };
        },

        'named': function() {
            var bind_index = {};
            var bind_params = {};
            return {
                add: function(rule, value) {
                    if (!bind_index[rule.field]) bind_index[rule.field] = 0;
                    bind_index[rule.field]++;
                    var key = rule.field + '_' + bind_index[rule.field];
                    bind_params[key] = value;
                    return ':' + key;
                },
                run: function() {
                    return bind_params;
                }
            };
        }
    },

    /* statements for SQL -> internal conversion */
    sqlRuleStatement: {
        'question_mark': function(values) {
            var i = 0;
            return {
                get: function(v) {
                    if ($.isArray(v)) {
                        return v.map(function(v) {
                            return v=='?' ? values[i++] : v;
                        });
                    }
                    else {
                        return v=='?' ? values[i++] : v;
                    }
                },
                esc: function(sql) {
                    return sql.replace(/\?/g, '\'?\'');
                }
            };
        },

        'numbered': function(values) {
            return {
                get: function(v) {
                    if ($.isArray(v)) {
                        return v.map(function(v) {
                            return /^\$[0-9]+$/.test(v) ? values[v.slice(1)-1] : v;
                        });
                    }
                    else {
                        return /^\$[0-9]+$/.test(v) ? values[v.slice(1)-1] : v;
                    }
                },
                esc: function(sql) {
                    return sql.replace(/\$([0-9]+)/g, '\'$$$1\'');
                }
            };
        },

        'named': function(values) {
            return {
                get: function(v) {
                    if ($.isArray(v)) {
                        return v.map(function(v) {
                            return /^:/.test(v) ? values[v.slice(1)] : v;
                        });
                    }
                    else {
                        return /^:/.test(v) ? values[v.slice(1)] : v;
                    }
                },
                esc: function(sql) {
                    return sql.replace(new RegExp(':(' + Object.keys(values).join('|') + ')', 'g'), '\':$1\'');
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
     * @param stmt {false|string} use prepared statements - false, 'question_mark' or 'numbered'
     * @param nl {bool} output with new lines
     * @param data {object} (optional) rules
     * @return {object}
     */
    getSQL: function(stmt, nl, data) {
        data = (data===undefined) ? this.getRules() : data;
        nl = (nl===true) ? '\n' : ' ';

        if (stmt===true || stmt===undefined) stmt = 'question_mark';
        if (typeof stmt == 'string') stmt = this.settings.sqlStatements[stmt]();

        var that = this,
            bind_index = 1,
            bind_params = [];

        var sql = (function parse(data) {
            if (!data.condition) {
                data.condition = that.settings.default_condition;
            }
            if (['AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                error('Unable to build SQL query with condition "{0}"', data.condition);
            }

            if (!data.rules) {
                return '';
            }

            var parts = [];

            data.rules.forEach(function(rule) {
                if (rule.rules && rule.rules.length>0) {
                    parts.push('('+ nl + parse(rule) + nl +')'+ nl);
                }
                else {
                    var sql = that.settings.sqlOperators[rule.operator],
                        ope = that.getOperatorByType(rule.operator),
                        value = '';

                    if (sql === undefined) {
                        error('Unknown SQL operation for operator "{0}"', rule.operator);
                    }

                    if (ope.nb_inputs !== 0) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }

                        rule.value.forEach(function(v, i) {
                            if (i>0) {
                                value+= sql.sep;
                            }

                            if (rule.type=='integer' || rule.type=='double' || rule.type=='boolean') {
                                v = changeType(v, rule.type, true);
                            }
                            else if (!stmt) {
                                v = escapeString(v);
                            }

                            if (sql.fn) {
                                v = sql.fn(v);
                            }

                            if (stmt) {
                                value+= stmt.add(rule, v);
                            }
                            else {
                                if (typeof v === 'string') {
                                    v = '\''+ v +'\'';
                                }

                                value+= v;
                            }
                        });
                    }

                    parts.push(rule.field +' '+ sql.op.replace(/\?/, value));
                }
            });

            return parts.join(' '+ data.condition + nl);
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
     * @param data {object} query object
     * @return {object}
     */
    getRulesFromSQL: function(data, stmt) {
        if (!('SQLParser' in window)) {
            error('SQLParser is required to parse SQL queries. Get it here https://github.com/forward/sql-parser');
        }

        var that = this;

        if (typeof data == 'string') {
            data = { sql: data };
        }
        if (typeof stmt == 'string') {
            stmt = this.settings.sqlRuleStatement[stmt](data.params);
            data.sql = stmt.esc(data.sql);
        }

        if (!data.sql.toUpperCase().startsWith('SELECT')) {
            data.sql = 'SELECT * FROM table WHERE ' + data.sql;
        }

        var parsed = SQLParser.parse(data.sql);

        if (!parsed.where) {
            error('No WHERE clause found');
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
                if (i>0 && curr.condition != data.operation.toUpperCase()) {
                    curr.rules.push({
                        condition: that.settings.default_condition,
                        rules: []
                    });

                    curr = curr.rules[curr.rules.length-1];
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
                    error('Missing field and/or value');
                }

                if ($.isPlainObject(data.right.value)) {
                    error('Value format not supported for {0}.', data.left.value);
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
                    value = stmt.get(value);
                }

                // convert operator
                var operator = data.operation.toUpperCase();
                if (operator == '<>') operator = '!=';

                var sqlrl;
                if (operator == 'NOT LIKE') {
                    sqlrl = that.settings.sqlRuleOperator['LIKE'];
                }
                else {
                    sqlrl = that.settings.sqlRuleOperator[operator];
                }

                if (sqlrl === undefined) {
                    error('Invalid SQL operation {0}.', data.operation);
                }

                var opVal = sqlrl.call(this, value, data.operation);
                if (operator == 'NOT LIKE') opVal.op = 'not_' + opVal.op;

                curr.rules.push({
                    id: that.change('getSQLFieldID', data.left.value, value),
                    field: data.left.value,
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