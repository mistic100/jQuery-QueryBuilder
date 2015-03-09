// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    sqlOperators: {
        equal:            '= ?',
        not_equal:        '!= ?',
        in:               { op: 'IN(?)',     list: true, sep: ', ' },
        not_in:           { op: 'NOT IN(?)', list: true, sep: ', ' },
        less:             '< ?',
        less_or_equal:    '<= ?',
        greater:          '> ?',
        greater_or_equal: '>= ?',
        between:          { op: 'BETWEEN ?',   list: true, sep: ' AND ' },
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
        stmt = (stmt===true || stmt===undefined) ? 'question_mark' : stmt;
        nl =   (nl || nl===undefined) ? '\n' : ' ';

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

            $.each(data.rules, function(i, rule) {
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

                    if (ope.accept_values) {
                        if (!(rule.value instanceof Array)) {
                            rule.value = [rule.value];
                        }
                        else if (!sql.list && rule.value.length>1) {
                            error('Operator "{0}" cannot accept multiple values', rule.operator);
                        }

                        rule.value.forEach(function(v, i) {
                            if (i>0) {
                                value+= sql.sep;
                            }

                            if (rule.type=='integer' || rule.type=='double') {
                                v = changeType(v, rule.type);
                            }
                            else if (!stmt) {
                                v = escapeString(v);
                            }

                            if (sql.fn) {
                                v = sql.fn(v);
                            }

                            if (stmt) {
                                if (stmt == 'question_mark') {
                                    value+= '?';
                                }
                                else {
                                    value+= '$'+bind_index;
                                }

                                bind_params.push(v);
                                bind_index++;
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
                params: bind_params
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

        if (typeof sql === 'string') {
            sql = { op: sql };
        }
        if (!sql.list) {
            sql.list = false;
        }
        if (sql.list && !sql.sep) {
            sql.sep = ', ';
        }

        return sql;
    }
});