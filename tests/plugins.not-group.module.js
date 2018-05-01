$(function () {
    var $b = $('#builder');

    QUnit.module('plugins.not-group', {
        afterEach: function () {
            $b.queryBuilder('destroy');
        }
    });

    QUnit.test('Not checkbox', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules,
            plugins: ['not-group']
        });

        assert.ok(
            $b.find('[data-not=group]').length > 0,
            'Should add "not" buttons"'
        );

        $('#builder_group_0>.rules-group-header [data-not=group]').trigger('click');

        assert.ok(
            $b.queryBuilder('getModel').not,
            'The root group should have "not" flag set to true'
        );

        assert.ok(
            $b.queryBuilder('getRules').not,
            'The root json should have "not" flag set to true'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            plugins: {
                'not-group': {disable_template: true}
            },
            filters: basic_filters,
            rules: basic_rules
        });

        assert.ok(
            $b.find('[data-not="group"]').length === 0,
            'Should not have added the button with disable_template=true'
        );
    });

    QUnit.test('SQL export', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: rules,
            plugins: ['not-group']
        });

        assert.equal(
            $b.queryBuilder('getSQL').sql,
            sql,
            'Should export SQL with NOT function'
        );
    });

    QUnit.test('SQL import', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            plugins: ['not-group']
        });

        $b.queryBuilder('setRulesFromSQL', sql);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should parse NOT SQL function'
        );

        $b.queryBuilder('setRulesFromSQL', sql2);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules2,
            'Should parse NOT SQL function with only one rule'
        );

        $b.queryBuilder('setRulesFromSQL', sql3);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules3,
            'Should parse NOT SQL function with same operation'
        );

        $b.queryBuilder('setRulesFromSQL', sql4);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules4,
            'Should parse NOT SQL function with negated root group'
        );

        $b.queryBuilder('setRulesFromSQL', sql5);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules5,
            'Should parse NOT SQL function with double negated root group'
        );
    });

    QUnit.test('Mongo export', function (assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: rules,
            plugins: ['not-group']
        });

        assert.deepEqual(
            $b.queryBuilder('getMongo'),
            mongo,
            'Should export MongoDB with $nor function'
        );

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromMongo', mongo);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should parse $nor MongoDB function'
        );
    });

    var rules = {
        condition: 'OR',
        not: false,
        rules: [{
            id: 'name',
            operator: 'equal',
            value: 'Mistic'
        }, {
            condition: 'AND',
            not: true,
            rules: [{
                id: 'price',
                operator: 'less',
                value: 10.25
            }, {
                id: 'category',
                field: 'category',
                operator: 'in',
                value: ['mo', 'mu']
            }]
        }]
    };

    var sql = 'name = \'Mistic\' OR ( NOT ( price < 10.25 AND category IN(\'mo\', \'mu\') ) ) ';

    var rules2 = {
        condition: 'OR',
        not: false,
        rules: [{
            id: 'name',
            operator: 'equal',
            value: 'Mistic'
        }, {
            condition: 'AND',
            not: true,
            rules: [{
                id: 'price',
                operator: 'less',
                value: 10.25
            }]
        }]
    };

    var sql2 = 'name = \'Mistic\' OR ( NOT ( price < 10.25 ) ) ';

    var rules3 = {
        condition: 'OR',
        not: false,
        rules: [{
            id: 'name',
            operator: 'equal',
            value: 'Mistic'
        }, {
            condition: 'OR',
            not: true,
            rules: [{
                id: 'price',
                operator: 'less',
                value: 10.25
            }, {
                id: 'category',
                field: 'category',
                operator: 'in',
                value: ['mo', 'mu']
            }]
        }]
    };

    var sql3 = 'name = \'Mistic\' OR ( NOT ( price < 10.25 OR category IN(\'mo\', \'mu\') ) ) ';

    var rules4 = {
        condition: 'AND',
        not: true,
        rules: [{
            id: 'price',
            operator: 'less',
            value: 10.25
        }]
    };

    var sql4 = 'NOT ( price < 10.25 )';

    var rules5 = {
        condition: 'AND',
        not: false,
        rules: [{
            condition: 'AND',
            not: true,
            rules: [{
                id: 'price',
                operator: 'less',
                value: 10.25
            }]
        }, {
            condition: 'AND',
            not: true,
            rules: [{
                id: 'price',
                operator: 'greater',
                value: 20.5
            }]
        }]
    };

    var sql5 = 'NOT ( price < 10.25 ) AND NOT ( price > 20.5 )';

    var mongo = {
        "$or": [{
            "name": "Mistic"
        },
            {
                "$nor": [{
                    "$and": [{
                        "price": {"$lt": 10.25}
                    }, {
                        "category": {"$in": ["mo", "mu"]}
                    }]
                }]
            }]
    };

});
