$(function(){
    var $b = $('#builder');

    QUnit.module('plugins', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * Test plugins loading
     */
    QUnit.test('Plugins loading', function(assert) {
        assert.ok(QueryBuilder.prototype.getSQL !== undefined, 'Should load SQL plugin automatically');

        $b.queryBuilder({
            filters: basic_filters,
            plugins: ['bt-tooltip-errors', 'filter-description']
        });

        assert.deepEqual(
            $b[0].queryBuilder.plugins['bt-tooltip-errors'],
            QueryBuilder.plugins['bt-tooltip-errors'].def,
            'Should load "bt-tooltip-errors" with default config'
        );

        assert.deepEqual(
            $b[0].queryBuilder.plugins['filter-description'],
            QueryBuilder.plugins['filter-description'].def,
            'Should load "filter-description" with default config'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            filters: basic_filters,
            plugins: {
                'bt-tooltip-errors': null,
                'filter-description': { icon: 'fa fa-info' }
            }
        });

        assert.deepEqual(
            $b[0].queryBuilder.plugins['bt-tooltip-errors'],
            QueryBuilder.plugins['bt-tooltip-errors'].def,
            'Should load "bt-tooltip-errors" with default config'
        );

        assert.deepEqual(
            $b[0].queryBuilder.plugins['filter-description'],
            { icon: 'fa fa-info', mode: 'popover' },
            'Should load "filter-description" with custom config'
        );

        $b.queryBuilder('destroy');

        assert.throws(
            function(){
                $b.queryBuilder({
                    filters: basic_filters,
                    plugins: ['__unknown__']
                });
            },
            /Unable to find plugin "__unknown__"/,
            'Should throw error on unknown plugin'
        );
    });

    /**
     * Test unique-filter
     */
    QUnit.test('unique-filter', function(assert) {
        var unique_filters = $.extend(true, [], basic_filters);
        unique_filters[3].unique = 'group';
        unique_filters[4].unique = true;

        $b.queryBuilder({
            plugins: ['unique-filter'],
            filters: unique_filters,
            rules: basic_rules
        });

        assert.ok(
            $('select[name=builder_rule_0_filter] option[value=id]').is(':disabled') &&
            $('select[name=builder_rule_1_filter] option[value=id]').is(':disabled') &&
            $('select[name=builder_rule_2_filter] option[value=id]').is(':disabled'),
            '"Identifier" filter should be disabled everywhere'
        );

        assert.ok(
             $('select[name=builder_rule_1_filter] option[value=price]').is(':disabled') &&
            !$('select[name=builder_rule_2_filter] option[value=price]').is(':disabled') &&
            !$('select[name=builder_rule_3_filter] option[value=price]').is(':disabled'),
            '"Price" filter should be disabled in his group only'
        );
    });

    /**
     * Test inversion
     */
    QUnit.test('invert', function(assert) {
        $b.queryBuilder({
            plugins: ['invert'],
            filters: basic_filters,
            rules: basic_rules
        });

        $b.queryBuilder('invert');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'OR',
                rules: [{
                    id: 'price',
                    field: 'price',
                    operator: 'greater_or_equal',
                    value: 10.25
                }, {
                    id: 'name',
                    field: 'name',
                    operator: 'is_not_null',
                    value: null
                }, {
                    condition: 'AND',
                    rules: [{
                        id: 'category',
                        field: 'category',
                        operator: 'not_in',
                        value: ['mo', 'mu']
                    }, {
                        id: 'id',
                        field: 'id',
                        operator: 'equal',
                        value: '1234-azer-5678'
                    }]
                }]
            },
            'Should have inverted all conditions and operators'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            plugins: {
                invert: {disable_template: true}
            },
            filters: basic_filters,
            rules: basic_rules
        });

        assert.ok(
            $b.find('[data-invert="group"]').length === 0,
            'Should not have added the button with disable_template=true'
        );
    });

    /**
     * Test change filters
     */
    QUnit.test('change-filters', function(assert) {
        var filter_a = {
            id: 'a',
            type: 'string'
        };

        var filter_b = {
            id: 'b',
            type: 'string'
        };

        var filter_c = {
            id: 'c',
            type: 'string'
        };

        var rule_a = {
            id: 'a',
            field: 'a',
            operator: 'equal',
            value: 'foo'
        };

        var rule_b = {
            id: 'b',
            field: 'b',
            operator: 'equal',
            value: 'bar'
        };

        $b.queryBuilder({
            filters: [filter_a, filter_b],
            rules: [rule_a, rule_b]
        });

        assert.throws(
            function(){
                $b.queryBuilder('removeFilter', 'a');
            },
            /A rule is using filter "a"/,
            'Should throw error when deleting filter "a" w/o force'
        );

        $b.queryBuilder('removeFilter', 'a', true);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {condition:'AND', rules: [rule_b]},
            'Should have deleted rule using filter "a"'
        );

        $b.queryBuilder('addFilter', filter_c, 0);

        assert.optionsMatch(
            $('#builder_rule_1 [name$=_filter] option'),
            ['-1', filter_c.id, filter_b.id],
            'Should have added filter "c" at begining'
        );

        $b.queryBuilder('addFilter', filter_a, 'c');

        assert.optionsMatch(
            $('#builder_rule_1 [name$=_filter] option'),
            ['-1', filter_c.id, filter_a.id, filter_b.id],
            'Should have added filter "a" after "c"'
        );
    });
});
