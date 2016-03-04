$(function(){
    var $b = $('#builder');

    QUnit.module('plugins-data', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * SQL import/export
     */
    QUnit.test('sql-support', function(assert) {
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

        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', false),
            basic_rules_sql_raw,
            'Should create SQL query'
        );

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'question_mark'),
            basic_rules_sql_stmt,
            'Should create SQL query with statements (?)'
        );

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

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_raw);
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query'
        );

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt, 'question_mark');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (?)'
        );

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_num, 'numbered');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements ($ numbered)'
        );

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_num_at, 'numbered(@)');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (@ numbered)'
        );

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_named, 'named');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (: named)'
        );

        $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_named_at, 'named(@)');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should parse SQL query with statements (@ named)'
        );

        $b.queryBuilder('destroy');
        $b.queryBuilder({
            filters: basic_filters,
            rules: all_operators_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getSQL', 'question_mark'),
            all_operators_rules_sql,
            'Should convert all kind of operators to SQL'
        );

        $b.queryBuilder('setRulesFromSQL', all_operators_rules_sql, 'question_mark');
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            all_operators_rules,
            'Should parse all kind of operators from SQL'
        );

        $b.queryBuilder('destroy');
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

    /**
     * MongoDB import/export
     */
    QUnit.test('mongo-support', function(assert) {
        var basic_rules_mongodb = {'$and': [
            {'price': { '$lt': 10.25 }},
            {'name': null},
            {'$or': [
                {'category': {'$in': ['mo', 'mu']}},
                {'id': {'$ne': '1234-azer-5678'}}
            ]}
        ]};

        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getMongo'),
            basic_rules_mongodb,
            'Should create MongoDB query'
        );

        assert.deepEqual(
            $b.queryBuilder('getRulesFromMongo', basic_rules_mongodb),
            basic_rules,
            'Should return rules object from MongoDB query'
        );

        $b.queryBuilder('destroy');
        $b.queryBuilder({
            filters: basic_filters,
            rules: all_operators_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getMongo'),
            all_operators_rules_mongodb,
            'Should successfully convert all kind of operators to MongoDB'
        );

        $b.queryBuilder('setRulesFromMongo', all_operators_rules_mongodb);
        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            all_operators_rules,
            'Should successfully parse all kind of operators from MongoDB'
        );
    });


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
            value: ['bk','mo']
        }, {
            id: 'category',
            operator: 'not_in',
            value: ['bk','mo']
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
            value: ['4','5']
        }, {
            id: 'price',
            operator: 'not_between',
            value: ['4','5']
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
        sql:
            'name = ? ' +
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

    var all_operators_rules_mongodb = {
        $and: [
            { name: 'foo' },
            { name: {$ne: 'foo'} },
            { category: { $in: ['bk','mo'] }},
            { category: { $nin: ['bk','mo'] }},
            { price: {$lt: 5} },
            { price: {$lte: 5} },
            { price: {$gt: 4} },
            { price: {$gte: 4} },
            { price: {$gte: 4, $lte: 5} },
            { price: {$lt: 4, $gt: 5} },
            { name: {$regex: '^foo'} },
            { name: {$regex: '^(?!foo)'} },
            { name: {$regex: 'foo'} },
            { name: {$regex: '^((?!foo).)*$', $options: 's'} },
            { name: {$regex: 'foo$'} },
            { name: {$regex: '(?<!foo)$'} },
            { name: '' },
            { name: {$ne: ''} },
            { name: null },
            { name: {$ne: null} }
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
