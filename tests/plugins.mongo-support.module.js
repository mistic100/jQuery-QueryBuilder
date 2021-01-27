$(function(){
    var $b = $('#builder');

    QUnit.module('plugins.mongo-support', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    QUnit.test('Basics', function(assert) {
        var basic_rules_mongodb = {
            '$and': [
                {'price': {'$lt': 10.25}},
                {'name': null},
                {
                    '$or': [
                        {'category': {'$in': ['mo', 'mu']}},
                        {'id': {'$ne': '1234-azer-5678'}}
                    ]
                }
            ]
        };

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
    });

    QUnit.test('All operators', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: all_operators_rules
        });

        assert.deepEqual(
            $b.queryBuilder('getMongo'),
            all_operators_rules_mongodb,
            'Should successfully convert all kind of operators to MongoDB'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromMongo', all_operators_rules_mongodb);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            all_operators_rules,
            'Should successfully parse all kind of operators from MongoDB'
        );
    });

    QUnit.test('Automatically use filter from field', function(assert) {
        var rules = {
            condition: 'AND',
            rules: [
                {
                    id: 'name',
                    operator: 'equal',
                    value: 'Mistic'
                }
            ]
        };

        var mongo = {
            $and: [{
                username: 'Mistic'
            }]
        };

        $b.queryBuilder({
            filters: [
                {
                    id: 'name',
                    field: 'username',
                    type: 'string'
                },
                {
                    id: 'last_days',
                    field: 'display_date',
                    type: 'integer'
                }
            ]
        });

        $b.queryBuilder('setRulesFromMongo', mongo);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should use "name" filter from "username" field'
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
            value: 5
        }, {
            id: 'price',
            operator: 'less_or_equal',
            value: 5
        }, {
            id: 'price',
            operator: 'greater',
            value: 4
        }, {
            id: 'price',
            operator: 'greater_or_equal',
            value: 4
        }, {
            id: 'price',
            operator: 'between',
            value: [4,5]
        }, {
            id: 'price',
            operator: 'not_between',
            value: [4,5]
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
});
