$(function(){
    var $b = $('#builder');

    QUnit.module('plugins-gui', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * Test bt-checkbox
     */
    QUnit.test('bt-checkbox', function(assert) {
        $b.queryBuilder({
            plugins: ['bt-checkbox'],
            filters: [{
                id: 'no-color',
                type: 'integer',
                input: 'checkbox',
                values: {
                    10: 'foo',
                    20: 'bar'
                }
            }, {
                id: 'one-color',
                type: 'integer',
                input: 'checkbox',
                values: {
                    1: 'one',
                    2: 'two',
                    3: 'three'
                },
                color: 'primary'
            }, {
                id: 'multi-color',
                type: 'integer',
                input: 'radio',
                values: {
                    0: 'no',
                    1: 'yes',
                    2: 'perhaps'
                },
                colors: {
                    0: 'danger',
                    1: 'success'
                }
            }],
            rules: {
                condition: 'AND',
                rules: [{
                    id: 'no-color',
                    value: 10
                }, {
                    id: 'one-color',
                    value: [1,2,3]
                }, {
                    id: 'multi-color',
                    value: 2
                }]
            }
        });

        assert.ok(
            $('#builder_rule_0 .checkbox.checkbox-default').length == 2,
            'Should have 2 checkboxes with default color'
        );

        assert.ok(
            $('#builder_rule_1 .checkbox.checkbox-primary').length == 3,
            'Should have 3 checkboxes with primary color'
        );

        assert.ok(
            $('#builder_rule_2 .radio.radio-danger').length == 1 &&
            $('#builder_rule_2 .radio.radio-success').length == 1 &&
            $('#builder_rule_2 .radio.radio-default').length == 1,
            'Should have 3 radios with danger, success and default colors'
        );
    });

    /**
     * Test bt-selectpicker
     */
    QUnit.test('bt-selectpicker', function(assert) {
        $b.queryBuilder({
            plugins: ['bt-selectpicker'],
            filters: basic_filters,
            rules: basic_rules
        });

        assert.ok(
            $b.find('.bootstrap-select').length == 8,
            'Should have initialized Bootstrap Select on all filters and operators selectors'
        );
    });

    /**
     * Test bt-tooltip-errors
     */
    QUnit.test('bt-tooltip-errors', function(assert) {
        $b.queryBuilder({
            plugins: ['bt-tooltip-errors'],
            filters: basic_filters,
            rules: {
                condition: 'AND',
                rules: [{
                    id: 'id',
                    operator: 'equal',
                    value: ''
                }]
            }
        });

        $b.queryBuilder('validate');

        assert.equal(
            $('#builder_group_0 .error-container').eq(0).data('toggle'),
            'tooltip',
            'Should have added data-toggle="tooltip" in the template'
        );

        assert.equal(
            $('#builder_rule_0 .error-container').data('originalTitle'),
            'Empty value',
            'Error title should be "Empty value"'
        );
    });

    /**
     * Test filter-description
     */
    QUnit.test('filter-description', function(assert) {
        var filters = [{
            id: 'name',
            type: 'string',
            description: '<b>Lorem Ipsum</b> sit amet.'
        }, {
            id: 'age',
            type: 'integer',
            description: function(rule) {
                return 'Description of operator ' + rule.operator.type;
            }
        }];

        var rules = {
            condition: 'AND',
            rules: [{
                id: 'name',
                value: 'Mistic'
            }, {
                id: 'age',
                value: 25
            }]
        };

        $b.queryBuilder({
            plugins: {
                'filter-description': { mode: 'inline' }
            },
            filters: filters,
            rules: rules
        });

        assert.match(
            $('#builder_rule_0 p.filter-description').html(),
            new RegExp('<b>Lorem Ipsum</b> sit amet.'),
            'Paragraph should contain filter description'
        );

        assert.match(
            $('#builder_rule_1 p.filter-description').html(),
            new RegExp('Description of operator equal'),
            'Paragraph should contain filter description after function execution'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            plugins: {
                'filter-description': { mode: 'popover' }
            },
            filters: filters,
            rules: rules
        });

        assert.ok(
            $('#builder_rule_0 button.filter-description').data('toggle') == 'popover',
            'Rule should contain a new button enabled with Popover'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            plugins: {
                'filter-description': { mode: 'bootbox' }
            },
            filters: filters,
            rules: rules
        });

        assert.ok(
            $('#builder_rule_0 button.filter-description').data('toggle') == 'bootbox',
            'Rule should contain a new button enabled with Bootbox'
        );
    });
});
