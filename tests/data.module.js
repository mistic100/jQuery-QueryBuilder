$(function(){
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
                    {one: 'One'},
                    {two: 'Two'},
                    {three: 'Three'}
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
            { id: 'double', value: 'abc' },
            /number_not_double/
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
            data: [1,2,3],
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
                rules: [{
                    id: 'id',
                    operator: 'not_equal',
                    value: '1234-azer-5678',
                    readonly: true
                }]
            }]
        };

        var rules_all_flags = $.extend(true, {}, rules_readonly);
        rules_all_flags.flags = {
            condition_readonly: true,
            no_delete: false
        };
        rules_all_flags.rules[0].flags = {
            filter_readonly: false,
            operator_readonly: false,
            value_readonly: false,
            no_delete: true
        };
        rules_all_flags.rules[1].flags = {
            condition_readonly: false,
            no_delete: false
        };
        rules_all_flags.rules[1].rules[0].flags = {
            filter_readonly: true,
            operator_readonly: true,
            value_readonly: true,
            no_delete: true
        };

        $b.queryBuilder({
            filters: basic_filters,
            rules: rules_readonly
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules', {get_flags: true}),
            rules_readonly,
            'Should export rules with changed flags'
        );

        assert.rulesMatch(
            $b.queryBuilder('getRules', {get_flags: 'all'}),
            rules_all_flags,
            'Should export rules with all flags'
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
});
