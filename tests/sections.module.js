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
            allow_sections: true,
            filters: basic_filters,
            sections: basic_sections
        });

        assert.equal(
            $('#builder_group_0 .rules-group-header .group-actions button[data-add="section"]').length,
            1,
            'Should have the add section button'
        );
    });

    /**
     * Test invalid sections
     */
    QUnit.test('Invalid sections', function(assert) {

        assert.initError($b,
            {allow_sections: true,
            sections: [],
            filters: basic_filters},
            /Missing sections list/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [{}],
            filters: basic_filters},
            /Missing section 0 id/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'foo', filters: basic_filters},
                {id: 'foo', filters: basic_filters}
            ],
            filters: basic_filters},
            /Section "foo" already defined/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'foo'}
            ],
            filters: basic_filters},
            /Missing filters list \[section: foo\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'foo', filters: [{}]}
            ],
            filters: basic_filters},
            /Missing filter 0 id \[section: foo\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'baz', filters: [
                    {id: 'foo'},
                    {id: 'foo'}
                ]}
            ],
            filters: basic_filters},
            /Filter "foo" already defined \[section: baz\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'baz', filters: [
                    {id: 'foo', type: 'bar'}
                ]}
            ],
            filters: basic_filters},
            /Invalid type "bar" \[section: baz\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'baz', filters: [
                    {id: 'foo', input: 'bar'}
                ]}
            ],
            filters: basic_filters},
            /Invalid input "bar" \[section: baz\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'baz', filters: [
                    {id: 'foo', input: 'radio'}
                ]}
            ],
            filters: basic_filters},
            /Missing filter "foo" values \[section: baz\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
                {id: 'baz', filters: [
                    {id:'foo', input: 'select', values:[1,2,3], placeholder: 1, placeholder_value: 1}
                ]}
            ],
            filters: basic_filters},
            /Placeholder of filter "foo" overlaps with one of its values \[section: baz\]/
        );

        assert.initError($b,
            {allow_sections: true,
            sections: [
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
            allow_sections: true,
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
            allow_sections: true,
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
            allow_sections: true,
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

});
