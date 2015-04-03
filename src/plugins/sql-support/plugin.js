/*!
 * jQuery QueryBuilder SQL Support
 * Allows to export rules as a SQL WHERE statement.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    sqlOperators: {
        equal:            '= ?',
        not_equal:        '!= ?',
        in:               { op: 'IN(?)',     sep: ', ' },
        not_in:           { op: 'NOT IN(?)', sep: ', ' },
        less:             '< ?',
        less_or_equal:    '<= ?',
        greater:          '> ?',
        greater_or_equal: '>= ?',
        between:          { op: 'BETWEEN ?',   sep: ' AND ' },
        begins_with:      { op: 'LIKE(?)',     fn: function(v){ return v+'%'; } },
        not_begins_with:  { op: 'NOT LIKE(?)', fn: function(v){ return v+'%'; } },
        contains:         { op: 'LIKE(?)',     fn: function(v){ return '%'+v+'%'; } },
        not_contains:     { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v+'%'; } },
        ends_with:        { op: 'LIKE(?)',     fn: function(v){ return '%'+v; } },
        not_ends_with:    { op: 'NOT LIKE(?)', fn: function(v){ return '%'+v; } },
        is_empty:         '== ""',
        is_not_empty:     '!= ""',
        is_null:          'IS NULL',
        is_not_null:      'IS NOT NULL'
    },

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
                    var sql = that.getSqlOperator(rule.operator),
                        ope = that.getOperatorByType(rule.operator),
                        value = '';

                    if (sql === false) {
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
     * Sanitize the "sql" field of an operator
     * @param sql {string|object}
     * @return {object}
     */
    getSqlOperator: function(type) {
        var sql = this.settings.sqlOperators[type];

        if (sql === undefined) {
            return false;
        }

        if (typeof sql == 'string') {
            sql = { op: sql };
        }
        if (sql.list && !sql.sep) {
            sql.sep = ', ';
        }

        return sql;
    }
});