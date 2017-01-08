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

        assert.initError($b,
            {filters: [
                {id: 'foo', operators: ['equal',
                    {type: 'geo', nb_inputs: 3, multiple: false, apply_to: ['string'] }
                ]}
            ]},
            /Filter operators must be global operators types \(string\)/
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

        assert.equal(
            $b.queryBuilder('getRules'),
            null,
            'Should return empty object'
        );

        $b.queryBuilder('setOptions', {
            allow_empty: true
        });

        assert.deepEqual(
            $b.queryBuilder('getRules'),
            { condition: 'AND', rules: [], valid: true},
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
            $('[name=builder_rule_0_filter] [value="-1"]').length,
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
            $('[name=builder_rule_0_filter] [value="-1"]').length,
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

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=rule]').trigger('click');
        $('[name=builder_rule_0_filter]').val('name').trigger('change');
        $('[name=builder_rule_0_operator]').val('not_equal').trigger('change');
        $('[name=builder_rule_0_value_0]').val('foo').trigger('change');
        $('[name=builder_rule_1_filter]').val('category').trigger('change');
        $('[name=builder_rule_1_operator]').val('is_null').trigger('change');
        $('#builder_group_0>.rules-group-header>.group-conditions [value=OR]').trigger('click');
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=rule]').trigger('click');
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=group]').trigger('click');
        $('#builder_rule_2 [data-delete=rule]').trigger('click');
        $('#builder_group_1 [data-delete=group]').trigger('click');

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'OR',
                rules: [{
                    id: 'name',
                    operator: 'not_equal',
                    value: 'foo'
                }, {
                    id: 'category',
                    operator: 'is_null',
                    value: null
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
                }, {
                    condition: 'AND',
                    readonly: true,
                    rules: [{
                        id: 'name',
                        operator: 'equal',
                        value: 'foo'
                    }]
                }]
            }
        });

        assert.equal(
            $('#builder_group_0>.rules-group-header input:not(:disabled)').length, 0,
            'Should disable group condition radio buttons'
        );

        assert.equal(
            $('#builder_rule_0 [data-delete=rule]').length, 0,
            'Should hide delete button of "no_delete" rule'
        );

        assert.equal(
            $('#builder_rule_0').find('input:disabled, select:disabled').length, 0,
            'Should not disable inputs of "no_delete" rule'
        );

        assert.equal(
            $('#builder_rule_1 [data-delete=rule]').length, 0,
            'Should hide delete button of "readonly" rule'
        );

        assert.equal(
            $('#builder_rule_1').find('input:disabled, select:disabled').length, 3,
            'Should disable inputs of "readonly" rule'
        );

        assert.equal(
            $('#builder_group_2').find('[data-delete=group], [data-add=rule], [data-add=group]').length, 0,
            'Should hide all buttons of "readonly" group'
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
                }, {
                    condition: 'AND',
                    rules: [{
                        id: 'name',
                        operator: 'equal',
                        value: 'foo'
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
            operators: [
                {type: 'equal',            optgroup: 'equality'},
                {type: 'not_equal',        optgroup: 'equality'},
                {type: 'in'           },
                {type: 'not_in'       },
                {type: 'less',             optgroup: 'numbers'},
                {type: 'less_or_equal',    optgroup: 'numbers'},
                {type: 'greater',          optgroup: 'numbers'},
                {type: 'greater_or_equal', optgroup: 'numbers'},
                {type: 'between',          optgroup: 'numbers'},
                {type: 'not_between',      optgroup: 'numbers'},
                {type: 'begins_with',      optgroup: 'strings'},
                {type: 'not_begins_with',  optgroup: 'strings'},
                {type: 'ends_with',        optgroup: 'strings'},
                {type: 'not_ends_with',    optgroup: 'strings'},
                {type: 'contains',         optgroup: 'strings'},
                {type: 'not_contains',     optgroup: 'strings'},
                {type: 'is_empty'     },
                {type: 'is_not_empty' },
                {type: 'is_null'      },
                {type: 'is_not_null'  }
            ],
            optgroups: {
                A: {
                    en: 'AA',
                    fr: 'AAA'
                },
                B: 'BB',
                strings: {
                    en: 'Strings',
                    fr: 'Chaines'
                }
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

        $b[0].queryBuilder.model.root.rules[0].filter = '1';

        options = []; groups = [];
        $('[name=builder_rule_0_operator]>*').each(function() {
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
            [['equal', 'not_equal'], 'in', 'not_in', ['begins_with', 'not_begins_with', 'ends_with', 'not_ends_with', 'contains', 'not_contains'], 'is_empty', 'is_not_empty', 'is_null', 'is_not_null'],
            'Operators should have been put in optgroups, solving discontinuities and keeping order'
        );

        assert.deepEqual(
            groups,
            ['equality', 'Chaines'],
            'Optgroups should have been correctly translated and created when needed'
        );
    });

    /**
     * Test filters ordering
     */
    QUnit.test('Sort filters', function(assert) {
        $b.queryBuilder({
            filters: [{
                id: '3',
                label: {
                    fr: 'ccc',
                    en: 'Ccc'
                }
            }, {
                id: '1',
                label: 'AAA'
            }, {
                id: '5',
                label: 'eee'
            }, {
                id: '2',
                label: 'bbb'
            }, {
                id: '4',
                label: {
                    fr: 'ddd',
                    en: 'Ddd'
                }
            }],
            sort_filters: true,
            lang_code: 'fr'
        });

        var options = [];
        $('[name=builder_rule_0_filter]>*').each(function() {
            options.push($(this).val());
        });

        assert.deepEqual(
            options,
            ['-1', '1', '2', '3', '4', '5'],
            'Filters should be sorted by alphabetical order'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            filters: [{
                id: '3',
                label: 'ccc'
            }, {
                id: '1',
                label: 'AAA'
            }, {
                id: '5',
                label: 'eee'
            }, {
                id: '2',
                label: 'bbb'
            }, {
                id: '4',
                label: 'ddd'
            }],
            sort_filters: function(a, b) {
                return parseInt(b.id) - parseInt(a.id);
            }
        });

        options = [];
        $('[name=builder_rule_0_filter]>*').each(function() {
            options.push($(this).val());
        });

        assert.deepEqual(
            options,
            ['-1', '5', '4', '3', '2', '1'],
            'Filters should be sorted by custom order'
        );
    });

    /**
     * Test custom error messages
     */
    QUnit.test('Custom error messages', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            rules: [
                {
                    id: 'id',
                    operator: 'equal',
                    value: 'azerty'
                },
                {
                    id: 'price',
                    operator: 'equal',
                    value: -10
                }
            ]
        });

        $b.on('displayError.queryBuilder.filter', function(e, error, node) {
            if (node.filter.id == 'price' && error[0] == 'number_exceed_min') {
                e.value = 'Custom min error message';
            }
        });

        $b.queryBuilder('validate');

        assert.equal(
            $b.find('.error-container').eq(1).attr('title'),
            'Custom format error message',
            'Should apply custom message from config'
        );

        assert.equal(
            $b.find('.error-container').eq(2).attr('title'),
            'Custom min error message',
            'Should apply custom message from event'
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

        var orig_flags = $.extend({}, QueryBuilder.DEFAULTS.default_rule_flags);
        var flags = {
            filter_readonly: true,
            operator_readonly: false,
            value_readonly: true,
            no_delete: false,
            no_sortable: true,
            no_drop: false
        };

        QueryBuilder.defaults({ default_rule_flags: flags });

        assert.deepEqual(
            QueryBuilder.DEFAULTS.default_rule_flags,
            flags,
            'Should have modified the default config object'
        );

        QueryBuilder.defaults({ default_rule_flags: orig_flags });
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
