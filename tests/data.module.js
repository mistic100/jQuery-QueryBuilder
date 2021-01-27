$(function() {
    var $b = $('#builder');

    QUnit.module('data', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * Test filters values
     */
    QUnit.test('radio/checkbox/select values', function(assert) {
        $b.queryBuilder({
            filters: [{
                id: '1',
                type: 'string',
                input: 'radio',
                values: ['one', 'two', 'three']
            }, {
                id: '2',
                type: 'string',
                input: 'checkbox',
                values: {
                    one: 'One',
                    two: 'Two',
                    three: 'Three'
                }
            }, {
                id: '3',
                type: 'string',
                input: 'select',
                values: [
                    { one: 'One' },
                    { two: 'Two' },
                    { three: 'Three' }
                ]
            }],
            rules: {
                rules: [{
                    id: '1',
                    value: 'one'
                }, {
                    id: '2',
                    value: 'two'
                }, {
                    id: '3',
                    value: 'three'
                }]
            }
        });

        assert.optionsMatch(
            $('#builder_rule_0 .rule-value-container input'),
            ['one', 'two', 'three'],
            'Should take an array of values'
        );

        assert.optionsMatch(
            $('#builder_rule_1 .rule-value-container input'),
            ['one', 'two', 'three'],
            'Should take an object of values'
        );

        assert.optionsMatch(
            $('#builder_rule_2 .rule-value-container option'),
            ['one', 'two', 'three'],
            'Should take an array of objects of values'
        );
    });

    /**
     * Test data validation
     */
    QUnit.test('validation', function(assert) {
        $b.queryBuilder({
            filters: validation_filters
        });

        assert.validationError($b,
            null,
            /no_filter/
        );

        $b.queryBuilder('clear');
        $b.queryBuilder('setRoot', false);

        assert.validationError($b,
            null,
            /empty_group/
        );

        assert.validationError($b,
            { id: 'radio' },
            /radio_empty/
        );

        assert.validationError($b,
            { id: 'checkbox' },
            /checkbox_empty/
        );

        assert.validationError($b,
            { id: 'checkbox', value: ['one', 'two'] },
            /operator_not_multiple/
        );

        assert.validationError($b,
            { id: 'select' },
            /select_empty/
        );

        assert.validationError($b,
            { id: 'select', value: -1 },
            /select_empty/
        );

        assert.validationError($b,
            { id: 'select_mult' },
            /select_empty/
        );

        assert.validationError($b,
            { id: 'select_mult', value: ['one', 'two'] },
            /operator_not_multiple/
        );

        assert.validationError($b,
            { id: 'string' },
            /string_empty/
        );

        assert.validationError($b,
            { id: 'string_val', value: 'aa' },
            /string_exceed_min_length/
        );

        assert.validationError($b,
            { id: 'string_val', value: 'aaaaaa' },
            /string_exceed_max_length/
        );

        assert.validationError($b,
            { id: 'string_val', value: '12345' },
            /string_invalid_format/
        );

        assert.validationError($b,
            { id: 'textarea' },
            /string_empty/
        );

        assert.validationError($b,
            { id: 'integer', value: 5.2 },
            /number_not_integer/
        );

        assert.validationError($b,
            { id: 'integer', value: -15 },
            /number_exceed_min/
        );

        assert.validationError($b,
            { id: 'integer', value: 15 },
            /number_exceed_max/
        );

        assert.validationError($b,
            { id: 'double', value: 0.05 },
            /number_wrong_step/
        );

        assert.validationError($b,
            { id: 'integer', operator: 'between', value: [5, 1] },
            /number_between_invalid/
        );

        assert.validationError($b,
            { id: 'date' },
            /datetime_empty/
        );

        assert.validationError($b,
            { id: 'date', value: '2014/13/15' },
            /datetime_invalid/
        );

        assert.validationError($b,
            { id: 'time', value: '07:00' },
            /datetime_exceed_min/
        );

        assert.validationError($b,
            { id: 'time', value: '18:00' },
            /datetime_exceed_max/
        );

        assert.validationError($b,
            { id: 'date', operator: 'between', value: ['2015/01/01', '2014/01/01'] },
            /datetime_between_invalid/
        );

        assert.validationError($b,
            { id: 'boolean', value: 'oui' },
            /boolean_not_valid/
        );

        assert.validationError($b,
            { id: 'custom', value: '' },
            /you_fool/
        );
    });

    /**
     * Test custom data
     */
    QUnit.test('custom data', function(assert) {
        var rules = {
            condition: 'AND',
            data: [1, 2, 3],
            rules: [{
                id: 'name',
                value: 'Mistic',
                data: {
                    foo: 'bar'
                }
            }]
        };

        assert.expect(2);

        $b.queryBuilder({
            filters: basic_filters
        });

        $b.on('afterAddRule.queryBuilder', function(e, rule) {
            assert.ok(
                JSON.stringify(rule.data) === JSON.stringify(rules.rules[0].data),
                'Custom data should be accessible in "afterAddRule" event'
            );
        });

        $b.queryBuilder('setRules', rules);

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should keep custom data in "getRules"'
        );
    });

    /**
     * Set an empty rule
     */
    QUnit.test('set empty rule', function(assert) {
        var rules = [{
            id: 'name',
            value: 'Mistic'
        }, {
            empty: true
        }, {
            condition: 'OR',
            rules: []
        }];

        $b.queryBuilder({
            filters: basic_filters,
            rules: rules
        });

        assert.validationError($b,
            null,
            /no_filter/
        );

        assert.equal(
            $b[0].queryBuilder.model.root.rules.length, 3,
            'Should have two rules and one group'
        );

        assert.equal(
            $b[0].queryBuilder.model.root.rules[2].rules.length, 0,
            'Group should be empty'
        );

        assert.equal(
            $('[name=builder_rule_1_filter]').val(), '-1',
            'Second rule should be empty'
        );
    });

    /**
     * Test get flags with getRules
     */
    QUnit.test('get flags', function(assert) {
        var rules_readonly = {
            condition: 'AND',
            flags: {
                condition_readonly: true
            },
            rules: [{
                id: 'price',
                operator: 'less',
                value: 10.25,
                flags: {
                    no_delete: true
                }
            }, {
                condition: 'OR',
                readonly: true,
                rules: [{
                    id: 'id',
                    operator: 'not_equal',
                    value: '1234-azer-5678',
                    readonly: true
                }]
            }]
        };

        $b.queryBuilder({
            filters: basic_filters,
            rules: rules_readonly
        });

        var rules_changed_flags = $.extend(true, {}, rules_readonly);
        rules_changed_flags.rules[1].flags = {
            condition_readonly: true,
            no_add_rule: true,
            no_add_group: true,
            no_delete: true
        };
        rules_changed_flags.rules[1].rules[0].flags = {
            filter_readonly: true,
            operator_readonly: true,
            value_readonly: true,
            no_delete: true
        };

        var rules_all_flags = $.extend(true, {}, rules_changed_flags);
        rules_all_flags.flags = {
            condition_readonly: true,
            no_add_rule: false,
            no_add_group: false,
            no_delete: false,
            no_sortable: false,
            no_drop: false
        };
        rules_all_flags.rules[0].flags = {
            filter_readonly: false,
            operator_readonly: false,
            value_readonly: false,
            no_delete: true,
            no_sortable: false,
            no_drop: false
        };
        rules_all_flags.rules[1].flags = {
            condition_readonly: true,
            no_add_rule: true,
            no_add_group: true,
            no_delete: true,
            no_sortable: false,
            no_drop: false
        };
        rules_all_flags.rules[1].rules[0].flags = {
            filter_readonly: true,
            operator_readonly: true,
            value_readonly: true,
            no_delete: true,
            no_sortable: false,
            no_drop: false
        };

        assert.rulesMatch(
            $b.queryBuilder('getRules', { get_flags: true }),
            rules_changed_flags,
            'Should export rules with changed flags'
        );

        assert.rulesMatch(
            $b.queryBuilder('getRules', { get_flags: 'all' }),
            rules_all_flags,
            'Should export rules with all flags'
        );
    });

    /**
     * Test value separator
     */
    QUnit.test('value separator', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: [{
                id: 'name',
                operator: 'equal',
                value: 'Mistic,Damien'
            }, {
                id: 'age',
                operator: 'not_equal',
                value: '16|17|18'
            }]
        });

        $('[name=builder_rule_0_operator]').val('in').trigger('change');
        $('[name=builder_rule_1_operator]').val('not_in').trigger('change');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'in',
                    value: ['Mistic', 'Damien']
                }, {
                    id: 'age',
                    operator: 'not_in',
                    value: [16, 17, 18]
                }]
            },
            'Should split values on comma and pipe'
        );
    });

    /**
     * Test default operator
     */
    QUnit.test('default operator', function(assert) {
        $b.queryBuilder({
            filters: basic_filters
        });

        $('[name=builder_rule_0_filter]').val('age').trigger('change');

        assert.equal(
            $('[name=builder_rule_0_operator]').val(),
            'in',
            'Should set "age" operator to "in" by default'
        );
    });

    /**
     * Test allow_invalid option
     */
    QUnit.test('allow invalid', function(assert) {
        $b.queryBuilder({
            filters: basic_filters
        });

        $b.queryBuilder('setRules', {
            condition: 'XOR',
            rules: [{
                id: 'name',
                operator: 'unkown_ope',
                value: 'Mistic'
            }, {
                id: 'unknown_id',
                operator: 'equal',
                value: 123
            }]
        }, {
            allow_invalid: true
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules', {
                allow_invalid: true
            }),
            {
                valid: false,
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'Mistic'
                }, {
                    id: null,
                    operator: null,
                    value: null
                }]
            },
            'Should allow invalid rules for setRules and getRules'
        );
    });

    /**
     * Test skip_empty option
     */
    QUnit.test('skip empty', function(assert) {
        $b.queryBuilder({
            filters: basic_filters
        });

        $b.queryBuilder('setRules', {
            condition: 'AND',
            rules: [{
                id: 'name',
                operator: 'equal',
                value: 'Mistic'
            }, {
                empty: true
            }]
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules', {
                skip_empty: true
            }),
            {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'Mistic'
                }]
            },
            'Should skip empty rules for getRules'
        );
    });

    QUnit.test('apply default value', function(assert) {
        $b.queryBuilder({
            filters: [
                {
                    id: 'name',
                    default_value: 'Mistic'
                }
            ],
            rules: [
                {
                    id: 'name'
                }
            ]
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'Mistic'
                }]
            },
            'Should have used the filter default value'
        );
    });

    /**
     * Test allow_empty_value option
     */
    QUnit.test('allow empty value', function(assert) {
        var filters = $.extend(true, [], basic_filters);
        filters.forEach(function(filter) {
            filter.validation = $.extend({ allow_empty_value: true }, filter.validation);
        });

        $b.queryBuilder({
            filters: filters,
            rules: empty_rules
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            empty_rules,
            'Should allow empty value for all filters'
        );
    });


    var validation_filters = [{
        id: 'radio',
        input: 'radio',
        values: ['one', 'two']
    }, {
        id: 'checkbox',
        input: 'checkbox',
        values: ['one', 'two']
    }, {
        id: 'select',
        input: 'select',
        values: ['one', 'two'],
        placeholder: '--',
        placholder_value: -1
    }, {
        id: 'select_mult',
        input: 'select',
        multiple: true,
        values: ['one', 'two']
    }, {
        id: 'string'
    }, {
        id: 'string_val',
        validation: {
            min: '4', max: '5',
            format: '^[a-z]?$'
        }
    }, {
        id: 'textarea',
        input: 'textarea'
    }, {
        id: 'integer',
        type: 'integer',
        validation: {
            min: -10, max: 10
        }
    }, {
        id: 'double',
        type: 'double',
        validation: {
            step: 0.1
        }
    }, {
        id: 'date',
        type: 'date',
        validation: {
            format: 'YYYY/MM/DD'
        }
    }, {
        id: 'time',
        type: 'time',
        validation: {
            format: 'HH:ss',
            min: '08:00',
            max: '17:00'
        }
    }, {
        id: 'boolean',
        type: 'boolean'
    }, {
        id: 'custom',
        type: 'string',
        validation: {
            callback: function(value, rule) {
                if (value == null || !value.length) {
                    return 'you_fool';
                }
            }
        }
    }];

    var empty_rules = {
        condition: 'AND',
        rules: [{
            id: 'name',
            operator: 'equal',
            value: ''
        }, {
            id: 'category',
            operator: 'equal',
            value: []
        }, {
            id: 'in_stock',
            operator: 'equal',
            value: undefined
        }, {
            id: 'price',
            operator: 'equal',
            value: ''
        }]
    };
});
