$(function () {
    var $b = $('#builder');

    QUnit.module('plugins.sql-support', {
        afterEach: function () {
            $b.queryBuilder('destroy');
        }
    });

    QUnit.test('Raw SQL', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', false),
            basic_rules_sql_raw,
            'Should create SQL query'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_raw);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query'
        );
    });

    QUnit.test('Placeholder SQL', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'question_mark'),
            basic_rules_sql_stmt,
            'Should create SQL query with statements (?)'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt, 'question_mark');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (?)'
        );
    });

    QUnit.test('Numbered SQL', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'numbered'),
            basic_rules_sql_stmt_num,
            'Should create SQL query with statements ($ numbered)'
        );

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'numbered(@)'),
            basic_rules_sql_stmt_num_at,
            'Should create SQL query with statements (@ numbered)'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_num, 'numbered');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements ($ numbered)'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_num_at, 'numbered(@)');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (@ numbered)'
        );
    });

    QUnit.test('Named SQL', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'named'),
            basic_rules_sql_stmt_named,
            'Should create SQL query with statements (: named)'
        );

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'named(@)'),
            basic_rules_sql_stmt_named_at,
            'Should create SQL query with statements (@ named)'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_named, 'named');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (: named)'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_named_at, 'named(@)');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (@ named)'
        );
    });

    QUnit.test('All operators', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: all_operators_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'question_mark'),
            all_operators_rules_sql,
            'Should convert all kind of operators to SQL'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', all_operators_rules_sql, 'question_mark');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            all_operators_rules,
            'Should parse all kind of operators from SQL'
        );
    });

    QUnit.test('Nested rules', function (assert) {

        $b.queryBuilder({
            filters: [
                {id: 'a', type: 'integer'},
                {id: 'b', type: 'integer'},
                {id: 'c', type: 'integer'},
                {id: 'd', type: 'integer'}
            ]
        });

        $b.queryBuilder('setRulesFromSQL', nested_rules_sql);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            nested_rules,
            'Should parse SQL with deep nested rules'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', 'a = 5');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    id: 'a',
                    operator: 'equal',
                    value: 5
                }]
            },
            'Should parse SQL with one rule'
        );
    });

    QUnit.test('Custom export/parsing', function (assert) {
        var rules = {
            condition: 'AND',
            rules: [
                {
                    id: 'name',
                    operator: 'equal',
                    value: 'Mistic'
                },
                {
                    id: 'last_days',
                    operator: 'greater',
                    value: 5
                }
            ]
        };

        var sql = 'name = \'Mistic\' AND display_date > DATE_SUB(NOW(), INTERVAL 5 DAY)';

        $b.queryBuilder({
            filters: [
                {
                    id: 'name',
                    type: 'string'
                },
                {
                    id: 'last_days',
                    field: 'display_date',
                    type: 'integer',
                    operators: ['greater']
                }
            ]
        });

        $b.on('ruleToSQL.queryBuilder.filter', function (e, rule, sqlValue, sqlOperator) {
            if (rule.id === 'last_days') {
                e.value = rule.field + ' ' + sqlOperator('DATE_SUB(NOW(), INTERVAL ' + sqlValue + ' DAY)');
            }
        });

        $b.on('parseSQLNode.queryBuilder.filter', function (e) {
            var data = e.value;
            // left must be the field name and right must be the date_sub function
            if (data.left && data.left.value == 'display_date' && data.operation == '>' && data.right && data.right.name == 'DATE_SUB') {
                var right = data.right;
                // 1st argument is "NOW()" and 2nd argument is a list
                if (right.arguments.value.length === 2 && right.arguments.value[1].value.length === 3) {
                    var params = right.arguments.value[1].value;
                    // 1st item is "INTERVAL", 2nd item is the value, 3rd item is "DAY"
                    if (params[0].value == 'INTERVAL' && params[2].value == 'DAY') {
                        e.value = {
                            id: 'last_days',
                            operator: 'greater',
                            value: params[1].value
                        };
                    }
                }
            }
        });

        $b.queryBuilder('setRules', rules);

        assert.equal(
            $b.queryBuilder('getSQL').sql,
            sql,
            'Should export custom date_sub function'
        );

        $b.queryBuilder('reset');
        $b.queryBuilder('setRulesFromSQL', sql);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should parse date_sub function'
        );
    });

    QUnit.test('Get SQL with subqueries', function (assert) {

        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections,
            rules: section_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', false),
            section_rules_sql,
            'Should create SQL query with sections'
        );
    });

    QUnit.test('Set from SQL with subqueries', function (assert) {

        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections
        });

        $b.queryBuilder('setRulesFromSQL', section_rules_sql);

        var result = $b.queryBuilder('getRules');
        assert.rulesMatch(
            result,
            section_rules,
            'Should parse SQL with rules that include sections'
        );
        assert.rulesMatch(
            result.rules[1].group.rules,
            section_rules.rules[1].group.rules,
            'Should parse SQL with rules that include sections'
        );
    });

    var basic_rules_sql_raw = {
        sql: 'price < 10.25 AND name IS NULL AND ( category IN(\'mo\', \'mu\') OR id != \'1234-azer-5678\' ) '
    };

    var basic_rules_sql_stmt = {
        sql: 'price < ? AND name IS NULL AND ( category IN(?, ?) OR id != ? ) ',
        params: [10.25, 'mo', 'mu', '1234-azer-5678']
    };

    var basic_rules_sql_stmt_num = {
        sql: 'price < $1 AND name IS NULL AND ( category IN($2, $3) OR id != $4 ) ',
        params: [10.25, 'mo', 'mu', '1234-azer-5678']
    };

    var basic_rules_sql_stmt_num_at = {
        sql: 'price < @1 AND name IS NULL AND ( category IN(@2, @3) OR id != @4 ) ',
        params: [10.25, 'mo', 'mu', '1234-azer-5678']
    };

    var basic_rules_sql_stmt_named = {
        sql: 'price < :price_1 AND name IS NULL AND ( category IN(:category_1, :category_2) OR id != :id_1 ) ',
        params: {
            price_1: 10.25,
            category_1: 'mo',
            category_2: 'mu',
            id_1: '1234-azer-5678'
        }
    };

    var basic_rules_sql_stmt_named_at = {
        sql: 'price < @price_1 AND name IS NULL AND ( category IN(@category_1, @category_2) OR id != @id_1 ) ',
        params: {
            price_1: 10.25,
            category_1: 'mo',
            category_2: 'mu',
            id_1: '1234-azer-5678'
        }
    };

    var section_rules_sql = {
        sql: 'name IS NOT NULL AND ( EXISTS ( SELECT * FROM partner WHERE name LIKE(\'%foo%\') AND status NOT IN(\'in\', \'tr\') ) )'
    };

    var section_rules = {
        condition: 'AND',
        rules: [{
            id: 'name',
            operator: 'is_not_null',
        },{
            section: 'partner',
            exists: 'EXISTS',
            group: {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'contains',
                    value: 'foo'
                }, {
                    id: 'status',
                    operator: 'not_in',
                    value: ['in', 'tr']
                }]
            }
        }]
    };

    var all_operators_rules = {
        condition: 'AND',
        rules: [{
            id: 'name',
            operator: 'equal',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'not_equal',
            value: 'foo'
        }, {
            id: 'category',
            operator: 'in',
            value: ['bk', 'mo']
        }, {
            id: 'category',
            operator: 'not_in',
            value: ['bk', 'mo']
        }, {
            id: 'price',
            operator: 'less',
            value: '5'
        }, {
            id: 'price',
            operator: 'less_or_equal',
            value: '5'
        }, {
            id: 'price',
            operator: 'greater',
            value: '4'
        }, {
            id: 'price',
            operator: 'greater_or_equal',
            value: '4'
        }, {
            id: 'price',
            operator: 'between',
            value: ['4', '5']
        }, {
            id: 'price',
            operator: 'not_between',
            value: ['4', '5']
        }, {
            id: 'name',
            operator: 'begins_with',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'not_begins_with',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'contains',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'not_contains',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'ends_with',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'not_ends_with',
            value: 'foo'
        }, {
            id: 'name',
            operator: 'is_empty',
            value: null
        }, {
            id: 'name',
            operator: 'is_not_empty',
            value: null
        }, {
            id: 'name',
            operator: 'is_null',
            value: null
        }, {
            id: 'name',
            operator: 'is_not_null',
            value: null
        }]
    };

    var all_operators_rules_sql = {
        sql: 'name = ? ' +
        'AND name != ? ' +
        'AND category IN(?, ?) ' +
        'AND category NOT IN(?, ?) ' +
        'AND price < ? ' +
        'AND price <= ? ' +
        'AND price > ? ' +
        'AND price >= ? ' +
        'AND price BETWEEN ? AND ? ' +
        'AND price NOT BETWEEN ? AND ? ' +
        'AND name LIKE(?) ' +
        'AND name NOT LIKE(?) ' +
        'AND name LIKE(?) ' +
        'AND name NOT LIKE(?) ' +
        'AND name LIKE(?) ' +
        'AND name NOT LIKE(?) ' +
        'AND name = \'\' ' +
        'AND name != \'\' ' +
        'AND name IS NULL ' +
        'AND name IS NOT NULL',
        params: [
            'foo',
            'foo',
            'bk', 'mo',
            'bk', 'mo',
            5,
            5,
            4,
            4,
            4, 5,
            4, 5,
            'foo%',
            'foo%',
            '%foo%',
            '%foo%',
            '%foo',
            '%foo'
        ]
    };

    var nested_rules = {
        condition: 'OR',
        rules: [
            {
                id: 'a',
                operator: 'equal',
                value: 5
            },
            {
                condition: 'AND',
                rules: [
                    {
                        id: 'b',
                        operator: 'equal',
                        value: 4
                    },
                    {
                        id: 'c',
                        operator: 'equal',
                        value: 7
                    },
                    {
                        condition: 'OR',
                        rules: [
                            {
                                id: 'd',
                                operator: 'equal',
                                value: 1
                            },
                            {
                                condition: 'AND',
                                rules: [
                                    {
                                        id: 'a',
                                        operator: 'equal',
                                        value: 7
                                    },
                                    {
                                        id: 'a',
                                        operator: 'equal',
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'c',
                        operator: 'equal',
                        value: 3
                    },
                    {
                        condition: 'OR',
                        rules: [
                            {
                                condition: 'AND',
                                rules: [
                                    {
                                        id: 'b',
                                        operator: 'equal',
                                        value: 4
                                    },
                                    {
                                        id: 'c',
                                        operator: 'equal',
                                        value: 9
                                    }
                                ]
                            },
                            {
                                id: 'a',
                                operator: 'equal',
                                value: 8
                            },
                            {
                                id: 'a',
                                operator: 'equal',
                                value: 10
                            }
                        ]
                    }
                ]
            },
            {
                id: 'a',
                operator: 'equal',
                value: 0
            },
            {
                condition: 'AND',
                rules: [
                    {
                        id: 'b',
                        operator: 'equal',
                        value: 4
                    },
                    {
                        id: 'a',
                        operator: 'equal',
                        value: 4
                    },
                    {
                        condition: 'OR',
                        rules: [
                            {
                                id: 'a',
                                operator: 'equal',
                                value: 4
                            },
                            {
                                id: 'c',
                                operator: 'equal',
                                value: 8
                            }
                        ]
                    }
                ]
            }
        ]
    };

    var nested_rules_sql = 'a=5 or (b=4 and c=7 and (d=1 or (a=7 and a=1)) and c=3 and ((b=4 and c=9) or a=8 or a=10)) or a=0 or (b=4 and a=4 and (a=4 or c=8))';
});
