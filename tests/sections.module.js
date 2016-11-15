$(function(){
    var $b = $('#builder');

    QUnit.module('sections', {
        afterEach: function() {
            $b.queryBuilder('destroy');
        }
    });

    /**
     * Disallow sections
     */
    QUnit.test('Disallow sections', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            allow_sections: false,
            sections: basic_sections
        });

        assert.equal(
            $('#builder_group_0 .rules-group-header .group-actions button[data-add="section"]').length,
            0,
            'Should not have the add section button'
        );
    });

    /**
     * Allow sections
     */
    QUnit.test('Allow sections', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections
        });

        assert.equal(
            $('#builder_group_0 .rules-group-header .group-actions button[data-add="section"]').length,
            1,
            'Should have the add section button'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            allow_sections: false,
            filters: basic_filters,
            sections: basic_sections
        });

        assert.equal(
            $('#builder_group_0 .rules-group-header .group-actions button[data-add="section"]').length,
            0,
            'Should not have the add section button'
        );
    });

    /**
     * Test invalid sections
     */
    QUnit.test('Invalid sections', function(assert) {
        assert.initError($b,
            {sections: [{}],
            filters: basic_filters},
            /Missing section 0 id/
        );

        assert.initError($b,
            {sections: [
                {id: 'foo', filters: basic_filters},
                {id: 'foo', filters: basic_filters}
            ],
            filters: basic_filters},
            /Section "foo" already defined/
        );

        assert.initError($b,
            {sections: [
                {id: 'foo'}
            ],
            filters: basic_filters},
            /Missing filters list \[section: foo\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'foo', filters: [{}]}
            ],
            filters: basic_filters},
            /Missing filter 0 id \[section: foo\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id: 'foo'},
                    {id: 'foo'}
                ]}
            ],
            filters: basic_filters},
            /Filter "foo" already defined \[section: baz\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id: 'foo', type: 'bar'}
                ]}
            ],
            filters: basic_filters},
            /Invalid type "bar" \[section: baz\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id: 'foo', input: 'bar'}
                ]}
            ],
            filters: basic_filters},
            /Invalid input "bar" \[section: baz\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id: 'foo', input: 'radio'}
                ]}
            ],
            filters: basic_filters},
            /Missing filter "foo" values \[section: baz\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id:'foo', input: 'select', values:[1,2,3], placeholder: 1, placeholder_value: 1}
                ]}
            ],
            filters: basic_filters},
            /Placeholder of filter "foo" overlaps with one of its values \[section: baz\]/
        );

        assert.initError($b,
            {sections: [
                {id: 'baz', filters: [
                    {id: 'foo', operators: ['equal',
                        {type: 'geo', nb_inputs: 3, multiple: false, apply_to: ['string'] }
                    ]}
                ]}
            ],
            filters: basic_filters},
            /Filter operators must be global operators types \(string\) \[section: baz\]/
        );
    });

    /**
     * Test setRules and getRules with sections
     */
    QUnit.test('Set/get rules with sections', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections,
            rules: section_rules
        });

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            section_rules,
            'Should return object with rules for sections'
        );
    });

    /**
     * Test default section
     */
    QUnit.test('Default section', function(assert) {
        $b.queryBuilder({
            default_section: 'related',
            sections: basic_sections,
            filters: basic_filters
        });

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');

        assert.equal(
            $('[name=builder_section_0_section_type] [value="-1"]').length,
            1,
            'Should have the placeholder section type'
        );

        assert.equal(
            $('[name=builder_section_0_section_type]').val(),
            'related',
            'Sould have used "related" as default section type'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            display_empty_stype_filter: false,
            sections: basic_sections,
            filters: basic_filters
        });

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');

        assert.equal(
            $('[name=builder_section_0_section_type] [value="-1"]').length,
            0,
            'Should not have the placeholder section type'
        );

        assert.equal(
            $('[name=builder_section_0_section_type]').val(),
            'partner',
            'Sould have used the first section as default one'
        );
    });

    /**
     * Test UI events
     */
    QUnit.test('UI events', function(assert) {
        $b.queryBuilder({
            sections: basic_sections,
            filters: basic_filters
        });

        // set the top-level rule
        $('[name=builder_rule_0_filter]').val('name').trigger('change');
        $('[name=builder_rule_0_operator]').val('not_equal').trigger('change');
        $('[name=builder_rule_0_value_0]').val('foo').trigger('change');

        // add a section
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');

        // set the first rule in the section
        $('[name=builder_section_0_section_type]').val('partner').trigger('change');
        $('[name=builder_rule_1_filter]').val('name').trigger('change');
        $('[name=builder_rule_1_operator]').val('begins_with').trigger('change');
        $('[name=builder_rule_1_value_0]').val('bar').trigger('change');

        // add a second rule to the section and set it
        $('#builder_section_0 #builder_group_1>.rules-group-header>.group-actions [data-add=rule]').trigger('click');
        $('[name=builder_rule_2_filter]').val('status').trigger('change');
        $('[name=builder_rule_2_operator]').val('is_null').trigger('change');

        // set the section group to "or"
        $('#builder_section_0 #builder_group_1>.rules-group-header>.group-conditions [value=OR]').trigger('click');

        // set the section exists to "does not exist"
        $('#builder_section_0>.rules-section-header>.section-exists-options [value="DOES NOT EXIST"]').trigger('click');

        // add a section rule and delete it
        $('#builder_section_0 #builder_group_1>.rules-group-header>.group-actions [data-add=rule]').trigger('click');
        $('#builder_section_0 #builder_rule_3 [data-delete=rule]').trigger('click');

        // add a section group and delete it
        $('#builder_section_0 #builder_group_1>.rules-group-header>.group-actions [data-add=group]').trigger('click');
        $('#builder_section_0 #builder_group_2 [data-delete=group]').trigger('click');

        // add a section and delete it
        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');
        $('#builder_section_1 [data-delete=section]').trigger('click');

        var generated = $b.queryBuilder('getRules');
        var expected = {
            condition: 'AND',
            rules: [{
                id: 'name',
                operator: 'not_equal',
                value: 'foo'
            }, {
                section: 'partner',
                exists: 'DOES NOT EXIST',
                group: {
                    condition: 'OR',
                    rules: [{
                        id: 'name',
                        operator: 'begins_with',
                        value: 'bar'
                    },{
                        id: 'status',
                        operator: 'is_null'
                    }]
                }
            }]
        };

        assert.rulesMatch(
            generated,
            expected,
            'Should return correct rules after UI events'
        );
        assert.rulesMatch(
            generated.rules != undefined && generated.rules[1] != undefined ? generated.rules[1].group : 'missing',
            expected.rules[1].group,
            'Should return correct section group after UI events'
        );
    });

    /**
     * Test filter.operators within sections
     */
    QUnit.test('Change operators within sections', function(assert) {
        $b.queryBuilder({
            filters: [{
                id: 'name',
                type: 'string'
            }],
            sections: [{
                id: 'test',
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
                }]
            }],
            rules: {
                condition: 'AND',
                rules: [{
                    section: 'test',
                    exists: 'EXISTS',
                    group: {
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
                    }
                }]
            },
            operators: [
                {type: 'equal',     nb_inputs: 1,    apply_to: ['string']},
                {type: 'not_equal', nb_inputs: 1,    apply_to: ['string']},
                {type: 'less',      nb_inputs: 1,    apply_to: ['number']},
                {type: 'greater',   nb_inputs: 1,    apply_to: ['number']},
                {type: 'before',    nb_inputs: 1,    apply_to: ['datetime']},
                {type: 'after',     nb_inputs: 1,    apply_to: ['datetime']}
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
     * Test custom conditions within sections
     */
    QUnit.test('Change conditions within sections', function(assert) {
        var rules = {
            condition: 'NAND',
            rules: [{
                section: 'partner',
                exists: 'EXISTS',
                group: {
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
                }
            }]
        };

        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections,
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
            $('#builder_group_2 [name$=_cond]:checked').val(),
            'XOR',
            'The second group should have "XOR" condition selected'
        );
    });

    /**
     * Test readonly
     */
    QUnit.test('Readonly within sections', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections,
            rules: {
                condition: 'AND',
                flags: {
                    condition_readonly: true
                },
                rules: [{
                    section: 'partner',
                    exists: 'EXISTS',
                    flags: {
                        exists_readonly: true
                    },
                    group: {
                        condition: 'AND',
                        flags: {
                            condition_readonly: true
                        },
                        rules: [{
                            id: 'name',
                            operator: 'not_equal',
                            value: 'foo',
                            flags: {
                                no_delete: true
                            }
                        }, {
                            condition: 'OR',
                            rules: [{
                                id: 'status',
                                operator: 'not_equal',
                                value: 'ac',
                                readonly: true
                            }]
                        }, {
                            condition: 'AND',
                            readonly: true,
                            rules: [{
                                id: 'name',
                                operator: 'not_equal',
                                value: 'bar'
                            }]
                        }]
                    }
                }]
            }
        });

        assert.equal(
            $('#builder_section_0 #builder_group_1>.rules-group-header input:not(:disabled)').length, 0,
            'Should disable group condition radio buttons'
        );

        assert.equal(
            $('#builder_section_0>.rules-section-header input:not(:disabled)').length, 0,
            'Should disable section exists radio buttons'
        );

        assert.equal(
            $('#builder_section_0 #builder_rule_0 [data-delete=rule]').length, 0,
            'Should hide delete button of "no_delete" rule'
        );

        assert.equal(
            $('#builder_section_0 #builder_rule_0').find('input:disabled, select:disabled').length, 0,
            'Should not disable inputs of "no_delete" rule'
        );

        assert.equal(
            $('#builder_section_0 #builder_rule_1 [data-delete=rule]').length, 0,
            'Should hide delete button of "readonly" rule'
        );

        assert.equal(
            $('#builder_section_0 #builder_rule_1').find('input:disabled, select:disabled').length, 3,
            'Should disable inputs of "readonly" rule'
        );

        assert.equal(
            $('#builder_section_0 #builder_group_3').find('[data-delete=group], [data-add=rule], [data-add=group]').length, 0,
            'Should hide all buttons of "readonly" group'
        );

        $('#builder_section_0 #builder_group_2 [data-delete=group]').click();

        assert.rulesMatch(
            $b.queryBuilder('getRules'),
            {
                condition: 'AND',
                rules: [{
                    section: 'partner',
                    exists: 'EXISTS',
                    group: {
                        condition: 'AND',
                        rules: [{
                            condition: 'AND',
                            rules: [{
                                id: 'name',
                                operator: 'not_equal',
                                value: 'foo'
                            }, {
                                condition: 'OR',
                                rules: [{
                                    id: 'status',
                                    operator: 'not_equal',
                                    value: 'ac'
                                }]
                            }, {
                                condition: 'AND',
                                rules: [{
                                    id: 'name',
                                    operator: 'not_equal',
                                    value: 'bar'
                                }]
                            }]
                        }]
                    }
                }]
            },
            'Should not delete group with readonly rule'
        );
    });

    /**
     * Test groups limit within section
     */
    QUnit.test('No groups allowed, other than the section group', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            sections: basic_sections,
            allow_groups: false
        });

        assert.ok(
            $('#builder_group_0 [data-add=group]').length == 0,
            'Should not contain group add button'
        );

        assert.throws(
            function(){ $b.queryBuilder('setRules', {
                condition: 'AND',
                rules: [{
                    id: 'price',
                    field: 'price',
                    operator: 'less',
                    value: 10.25
                }, {
                    section: 'partner',
                    group: {
                        condition: 'AND',
                        rules: [{
                            id: 'name',
                            field: 'name',
                            operator: 'begins_with',
                            value: 'Best'
                        }, {
                            condition: 'OR',
                            rules: [{
                                id: 'status',
                                field: 'status',
                                operator: 'equal',
                                value: 'ac'
                            },{
                                id: 'status',
                                field: 'status',
                                operator: 'not_equal',
                                value: 'iv'
                            }]
                        }]
                    }
                }]
            }); },
            /No more than 0 groups are allowed/,
            'Should throw "No more than 0 groups are allowed" error'
        );
    });

    /**
     * Test filters ordering in sections
     */
    QUnit.test('Sort filters in sections', function(assert) {
        $b.queryBuilder({
            filters: basic_filters,
            sections: [{
                id: 'partner',
                label: 'Partner',
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
                }]
            }],
            sort_filters: true,
            lang_code: 'fr'
        });

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');
        $('[name=builder_section_0_section_type]').val('partner').trigger('change');

        var options = [];
        $('[name=builder_rule_1_filter]>*').each(function() {
            options.push($(this).val());
        });

        assert.deepEqual(
            options,
            ['-1', '1', '2', '3', '4', '5'],
            'Filters should be sorted by alphabetical order'
        );

        $b.queryBuilder('destroy');

        $b.queryBuilder({
            filters: basic_filters,
            sections: [{
                id: 'partner',
                label: 'Partner',
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
                }]
            }],
            sort_filters: function(a, b) {
                return parseInt(b.id) - parseInt(a.id);
            }
        });

        $('#builder_group_0>.rules-group-header>.group-actions [data-add=section]').trigger('click');
        $('[name=builder_section_0_section_type]').val('partner').trigger('change');

        options = [];
        $('[name=builder_rule_1_filter]>*').each(function() {
            options.push($(this).val());
        });

        assert.deepEqual(
            options,
            ['-1', '5', '4', '3', '2', '1'],
            'Filters should be sorted by custom order'
        );
    });
});
