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

        $b.queryBuilder('destroy');

        var unique_sections = $.extend(true, [], basic_sections);
        unique_sections[0].filters[0].unique = true; // partner -> name
        unique_sections[1].filters[1].unique = 'group';    // related -> price

        var unique_rules = {
            condition: 'AND',
            rules: [{
                id: 'price',
                field: 'price',
                operator: 'less',
                value: 10.25
            }, {
                section: 'partner',
                group: {
                    condition: 'OR',
                    rules: [{
                        condition: 'AND',
                        rules: [{
                            id: 'name',
                            field: 'name',
                            operator: 'begins_with',
                            value: 'Best'
                        }, {
                            id: 'status',
                            field: 'status',
                            operator: 'equal',
                            value: 'ac'
                        }]
                    }, {
                        condition: 'AND',
                        rules: [{
                            id: 'name',
                            field: 'name',
                            operator: 'begins_with',
                            value: 'Worst'
                        }, {
                            id: 'status',
                            field: 'status',
                            operator: 'in',
                            value: [ 'in', 'tr' ]
                        }]
                    }]
                }
            }, {
                section: 'related',
                group: {
                    condition: 'OR',
                    rules: [{
                        id: 'category',
                        field: 'category',
                        operator: 'in',
                        value: [ 'bk', 'mo', 'mu' ]
                    },{
                        condition: 'AND',
                        rules: [{
                            id: 'category',
                            field: 'category',
                            operator: 'equal',
                            value: 'cl'
                        }, {
                            id: 'price',
                            field: 'price',
                            operator: 'greater',
                            value: 10.00
                        }]
                    }]
                }
            }]
        };

        $b.queryBuilder({
            plugins: ['unique-filter'],
            filters: basic_filters,
            sections: unique_sections,
            rules: unique_rules
        });

        assert.ok(
            $('#builder_section_0 select[name=builder_rule_2_filter] option[value=name]').is(':disabled') &&
            $('#builder_section_0 select[name=builder_rule_4_filter] option[value=name]').is(':disabled'),
            '"Name" filter in "partner" section should be disabled everywhere'
        );

        assert.ok(
            !$('#builder_section_1 select[name=builder_rule_5_filter] option[value=price]').is(':disabled') &&
             $('#builder_section_1 select[name=builder_rule_6_filter] option[value=price]').is(':disabled'),
            '"Price" filter in "related" section should be disabled in his group only'
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
            plugins: ['invert'],
            filters: basic_filters,
            sections: basic_sections,
            rules: section_rules
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
                    section: 'partner',
                    exists: 'NOT EXISTS',
                    group: {
                        condition: 'OR',
                        rules: [{
                            id: 'name',
                            field: 'name',
                            operator: 'not_begins_with',
                            value: 'Best'
                        }, {
                            id: 'status',
                            field: 'status',
                            operator: 'not_in',
                            value: [ 'ac', 'in' ]
                        }]
                    }
                }]
            },
            'Should have inverted all exist checks, conditions, and operators'
        );
    });

    /**
     * Test change filters
     */
    QUnit.test('change-filters', function(assert) {
        var filter_a = { id: 'a', type: 'string' };
        var filter_b = { id: 'b', type: 'string' };
        var filter_c = { id: 'c', type: 'string' };
        var filter_d = { id: 'd', type: 'string' };
        var filter_e = { id: 'e', type: 'string' };
        var filter_f = { id: 'f', type: 'string' };

        var section_a = { id: 'a', label: 'sec a', filters: [filter_d ] };
        var section_b = { id: 'b', label: 'sec b', filters: [filter_e ] };

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
            sections: [section_a, section_b],
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

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');
        $('[name=builder_section_0_section_type]').val('a').trigger('change');

        $b.queryBuilder('addFilter', filter_f, 0, 'a');

        assert.optionsMatch(
            $('#builder_rule_2 [name$=_filter] option'),
            ['-1', filter_f.id, filter_d.id],
            'Should have added filter "f" at begining for section "a"'
        );

    });
});
