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
     * Test Collapse Groups
     */
    QUnit.test('collapse-groups', function(assert) {
        $b.queryBuilder({
            plugins: ['collapse-groups'],
            filters: basic_filters,
            rules: basic_rules
        });

        var $collapseButton = $('#builder_group_0 .rules-group-header .btn[data-collapse="group"]');
        var $groupNameInput = $('#builder_group_0 .rules-group-header .group-name');

        assert.ok(
            $collapseButton.length > 0,
            'Should have added button with data-collapse=group in the rules header with '
        );

        assert.ok(
            $collapseButton.find('i').hasClass('glyphicon-chevron-up'),
            'Should have chevron up icon inside the collapse button'
        );

        assert.ok(
            $('#builder_group_0 .rules-group-header .group-name').length > 0,
            'Should have a group name field'
        );

        $collapseButton.trigger('click', [$collapseButton, $b.queryBuilder.options]);

        assert.ok(
            $collapseButton.find('i').hasClass('glyphicon-chevron-down'),
            'Should have chevron down icon inside the collapse button after collapsing'
        );

        assert.ok(
            $collapseButton.closest('#builder_group_0 .rules_list').not(':visible'),
            'Should hide the rules list'
        );

        $b.queryBuilder('destroy');
        $b.queryBuilder({
            plugins: {
                'collapse-groups': {
                    namedGroups: false
                }
            },
            filters: basic_filters,
            rules: basic_rules
        });

        assert.ok(
            $('#builder_group_0 .rules-group-header .group-name').length === 0,
            'Should not have a group name field when named groups option is false'
        );

        $b.queryBuilder('destroy');
        $b.queryBuilder({
            plugins: ['collapse-groups'],
            filters: basic_filters,
            rules: {
              condition: 'AND',
              rules: [
                {
                  id: 'age',
                  field: 'age',
                  type: 'integer',
                  input: 'text',
                  operator: 'equal',
                  value: '24'
                }
              ],
              collapsed: true,
              name: 'foo',
              not: false,
              valid: true
            }
        });

        assert.ok(
            $collapseButton.closest('#builder_group_0 .rules_list').not(':visible'),
            'Should hide rules list when loading a group with collapse === true'
        );

        assert.ok(
            $collapseButton.find('i').hasClass('glyphicon-chevron-down'),
            'Should have chevron down icon inside the collapse button after collapsing'
        );

        assert.ok(
            $groupNameInput.length > 0,
            'Should have a group name field'
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
