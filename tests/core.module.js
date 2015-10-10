$(function(){
    var $b = $('#builder');

    QUnit.module('core', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * Test invalid filters
     */
    QUnit.test('Invalid filters', function(assert) {
        assert.initError($b,
            {},
            /Missing filters list/
        );

        assert.initError($b,
            {filters: [{}]},
            /Missing filter 0 id/
        );

        assert.initError($b,
            {filters: [
                {id: 'foo'},
                {id: 'foo'}
            ]},
            /Filter "foo" already defined/
        );

        assert.initError($b,
            {filters: [
                {id: 'foo', type: 'bar'}
            ]},
            /Invalid type "bar"/
        );

        assert.initError($b,
            {filters: [
                {id: 'foo', input: 'bar'}
            ]},
            /Invalid input "bar"/
        );

        assert.initError($b,
            {filters: [
                {id: 'foo', input: 'radio'}
            ]},
            /Missing filter "foo" values/
        );

        assert.initError($b,
            {filters: [
                {id:'foo', input: 'select', values:[1,2,3], placeholder: 1, placeholder_value: 1}
            ]},
            /Placeholder of filter "foo" overlaps with one of its values/
        );
    });

    /**
     * Test getRules with an empty builder
     */
    QUnit.test('Empty builder', function(assert) {
        assert.expect(3);

        $b.queryBuilder({
            filters: basic_filters
        });
        $('#builder_rule_0 [data-delete]').click();

        $b.on('validationError.queryBuilder', function(e, node, error, value) {
            assert.equal(
                error[0],
                'empty_group',
                'Should throw "empty_group" error'
            );
        });

        assert.deepEqual(
            $b.queryBuilder('getRules'),
            {},
            'Should return empty object'
        );

        $b.queryBuilder('setOptions', {
            allow_empty: true
        });

        assert.deepEqual(
            $b.queryBuilder('getRules'),
            { condition: 'AND', rules: [] },
            'Should return object with no rules'
        );
    });

    /**
     * Test setRules and getRules
     */
    QUnit.test('Set/get rules', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: basic_rules
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            basic_rules,
            'Should return object with rules'
        );
    });

    /**
     * Test default filter
     */
    QUnit.test('Default filter', function(assert) {
        $b.queryBuilder({
            default_filter: 'in_stock',
            filters: basic_filters
        });

        assert.equal(
            $('[name=builder_rule_0_filter] [value=-1]').length,
            1,
            'Should have the placeholder filter'
        );

        assert.equal(
            $('[name=builder_rule_0_filter]').val(),
            'in_stock',
            'Sould have used "in_stock" as default filter'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            display_empty_filter: false,
            filters: basic_filters
        });

        assert.equal(
            $('[name=builder_rule_0_filter] [value=-1]').length,
            0,
            'Should not have the placeholder filter'
        );

        assert.equal(
            $('[name=builder_rule_0_filter]').val(),
            'name',
            'Sould have used the first filter as default one'
        );
    });

    /**
     * Test UI events
     */
    QUnit.test('UI events', function(assert) {
        $b.queryBuilder({
            filters: basic_filters
        });

        $('#builder_group_0>.rules-group-header>.group-conditions [value=OR]').trigger('click');
        $('[name=builder_rule_0_filter]').val('name').trigger('change');
        $('[name=builder_rule_0_operator]').val('not_equal').trigger('change');
        $('[name=builder_rule_0_value_0]').val('foo').trigger('change');
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=rule]').trigger('click');
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=group]').trigger('click');
        $('#builder_rule_1 [data-delete=rule]').trigger('click');
        $('#builder_group_1 [data-delete=group]').trigger('click');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'OR',
                rules: [{
                    id: 'name',
                    operator: 'not_equal',
                    value: 'foo'
                }]
            },
            'Should return correct rules after UI events'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            filters: [{
                id: 'name',
                label: 'Name',
                type: 'string',
                input_event: 'custom.evt'
            }]
        });

        $('[name=builder_rule_0_filter]').val('name').trigger('change');
        $('[name=builder_rule_0_operator]').val('equal').trigger('change');
        $('[name=builder_rule_0_value_0]').val('bar').trigger('custom.evt');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'bar'
                }]
            },
            'Should return correct rules after UI events with custom change event'
        );
    });

    /**
     * Test filter.operators
     */
    QUnit.test('Change operators', function(assert) {
        $b.queryBuilder({
            filters: [{
                id: 'name',
                type: 'string'
            }, {
                id: 'price',
                type: 'double'
            }, {
                id: 'release',
                type: 'date',
                operators: ['before', 'equal', 'after']
            }],
            rules: {
                condition: 'AND',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'foo'
                }, {
                    id: 'price',
                    operator: 'less',
                    value: 10
                }, {
                    id: 'release',
                    operator: 'before',
                    value: '1995-5-1'
                }]
            },
            operators: [
                {type: 'equal',         nb_inputs: 1, apply_to: ['string']},
                {type: 'not_equal', nb_inputs: 1,    apply_to: ['string']},
                {type: 'less',            nb_inputs: 1,    apply_to: ['number']},
                {type: 'greater',     nb_inputs: 1,    apply_to: ['number']},
                {type: 'before',        nb_inputs: 1,    apply_to: ['datetime']},
                {type: 'after',         nb_inputs: 1,    apply_to: ['datetime']}
            ]
        });

        assert.optionsMatch(
            $('#builder_rule_0 [name$=_operator] option'),
            ['equal', 'not_equal'],
            '"name" filter should have "equal" & "not_equal" operators'
        );

        assert.optionsMatch(
            $('#builder_rule_1 [name$=_operator] option'),
            ['less', 'greater'],
            '"price" filter should have "less" & "greater" operators'
        );

        assert.optionsMatch(
            $('#builder_rule_2 [name$=_operator] option'),
            ['before', 'equal', 'after'],
            '"release" filter should have "before" & "equal" & "after" operators'
        );
    });

    /**
     * Test custom conditions
     */
    QUnit.test('Change conditions', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            conditions: ['AND']
        });

        assert.optionsMatch(
            $b.find('[name$=_cond]'),
            ['AND'],
            'Available condition should be AND'
        );

        $b.queryBuilder('destroy');

        var rules = {
            condition: 'NAND',
            rules: [{
                id: 'name',
                operator: 'equal',
                value: 'foo'
            }, {
                condition: 'XOR',
                rules: [{
                    id: 'name',
                    operator: 'equal',
                    value: 'bar'
                }]
            }]
        };

        $b.queryBuilder({
            filters: basic_filters,
            rules: rules,
            conditions: ['NAND', 'XOR'],
            default_condition: 'NAND'
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            rules,
            'Should return correct rules'
        );

        assert.optionsMatch(
            $('#builder_group_0 > .rules-group-header [name$=_cond]'),
            ['NAND', 'XOR'],
            'Available onditions should be NAND & XOR'
        );

        assert.equal(
            $('#builder_group_1 [name$=_cond]:checked').val(),
            'XOR',
            'The second group should have "XOR" condition selected'
        );
    });

    /**
     * Test icons
     */
    QUnit.test('Change icons', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            icons: {
                add_group: 'fa fa-plus-circle',
                add_rule: 'fa fa-plus',
                remove_rule: 'fa fa-times',
                remove_group: 'fa fa-times',
                sort: 'fa fa-sort'
            }
        });

        assert.equal(
            $b.find('[data-add=rule] i').attr('class'),
            'fa fa-plus',
            'Rule add icon should have been replaced'
        );

        assert.equal(
            $b.find('[data-delete=rule] i').attr('class'),
            'fa fa-times',
            'Rule delete icon should have been replaced'
        );
    });

    /**
     * Test readonly
     */
    QUnit.test('Readonly', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: {
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
            }
        });

        assert.ok(
            $('#builder_group_0>.rules-group-header input:not(:disabled)').length == 0,
            'Should disable group condition radio buttons'
        );

        assert.ok(
            $('#builder_rule_0 [data-delete=rule]').length == 0,
            'Should hide delete button of "no_delete" rule'
        );

        assert.ok(
            $('#builder_rule_0').find('input:disabled, select:disabled').length == 0,
            'Should not disable inputs of "no_delete" rule'
        );

        assert.ok(
            $('#builder_rule_1 [data-delete=rule]').length == 0,
            'Should hide delete button of "readonly" rule'
        );

        assert.ok(
            $('#builder_rule_1').find('input:disabled, select:disabled').length == 3,
            'Should disable inputs of "readonly" rule'
        );

        $('#builder_group_1 [data-delete=group]').click();

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    id: 'price',
                    operator: 'less',
                    value: 10.25
                }, {
                    condition: 'OR',
                    rules: [{
                        id: 'id',
                        operator: 'not_equal',
                        value: '1234-azer-5678'
                    }]
                }]
            },
            'Should not delete group with readonly rule'
        );
    });

    /**
     * Test groups limit
     */
    QUnit.test('No groups', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            allow_groups: false
        });

        assert.ok(
            $('#builder_group_0 [data-add=group]').length == 0,
            'Should not contain group add button'
        );

        assert.throws(
            function(){ $b.queryBuilder('setRules', basic_rules); },
            /No more than 0 groups are allowed/,
            'Should throw "No more than 0 groups are allowed" error'
        );
    });

    /**
     * Test optgroups
     */
    QUnit.test('Optgroups', function(assert) {
        $b.queryBuilder({
            filters: [{
                id: '1',
                optgroup: 'A'
            }, {
                id: '2'
            }, {
                id: '3',
                optgroup: 'A'
            }, {
                id: '4',
                optgroup: 'B'
            }, {
                id: '5'
            }, {
                id: '6',
                optgroup: 'A'
            }, {
                id: '7',
                optgroup: 'C'
            }],
            optgroups: {
                A: {
                    en: 'AA',
                    fr: 'AAA'
                },
                B: 'BB'
            },
            lang_code: 'fr'
        });

        var options = [], groups = [];
        $('[name=builder_rule_0_filter]>*').each(function() {
            if (this.nodeName == 'OPTION') {
                options.push($(this).val());
            }
            else {
                var group = [];
                $(this).find('option').each(function() {
                    group.push($(this).val());
                });
                options.push(group);
                groups.push($(this).attr('label'));
            }
        });

        assert.deepEqual(
            options,
            ['-1', ['1', '3', '6'], '2', ['4'], '5', ['7']],
            'Filters should have been put in optgroups, solving discontinuities and keeping order'
        );

        assert.deepEqual(
            groups,
            ['AAA', 'BB', 'C'],
            'Optgroups should have been correctly translated and created when needed'
        );
    });

    /**
     * Test access to defaults
     */
    QUnit.test('Access to defaults', function(assert) {
        if (QueryBuilder.defaults() == QueryBuilder.DEFAULTS) {
            assert.push(false, '[copy]', '[original]', 'Should return full copy of defaults');
        }
        else {
            assert.deepEqual(
                QueryBuilder.defaults(),
                QueryBuilder.DEFAULTS,
                'Should return full copy of defaults'
            );
        }

        assert.equal(
            QueryBuilder.defaults('allow_empty'),
            QueryBuilder.DEFAULTS.allow_empty,
            'Should return a specific default primitive'
        );

        assert.deepEqual(
            QueryBuilder.defaults('lang'),
            QueryBuilder.DEFAULTS.lang,
            'Should return a specific default object'
        );

        var flags = {
            filter_readonly: true,
            operator_readonly: false,
            value_readonly: true,
            no_delete: false
        };

        QueryBuilder.defaults({ default_rule_flags: flags });

        assert.deepEqual(
            QueryBuilder.DEFAULTS.default_rule_flags,
            flags,
            'Should have modified the default config object'
        );
    });

    /**
     * Test language load
     */
    QUnit.test('Change language', function(assert) {
        assert.expect(2);
        var done = assert.async();

        $.getScript('../dist/i18n/query-builder.fr.js', function() {
            $b.queryBuilder({
                filters: basic_filters
            });

            assert.equal(
                $b.find('[data-delete=rule]').text().trim(),
                'Supprimer',
                'Should be in french'
            );

            $b.queryBuilder('destroy');

            $b.queryBuilder({
                filters: basic_filters,
                lang_code: 'en'
            });

            assert.equal(
                $b.find('[data-delete=rule]').text().trim(),
                'Delete',
                'Should be in english'
            );

            QueryBuilder.defaults({ lang_code: 'en' });

            done();
        });
    });
});