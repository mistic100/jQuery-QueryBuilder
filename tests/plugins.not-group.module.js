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

        $b.queryBuilder('reset');

        $b.queryBuilder('setRulesFromSQL', sql);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should parse NOT SQL function'
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
