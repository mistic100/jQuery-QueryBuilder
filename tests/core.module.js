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
      rules_after_ui_events,
      'Should return correct rules after UI events'
    );
  });

  /**
   * Test filter.operators
   */
  QUnit.test('Change operators', function(assert) {
    $b.queryBuilder({
      filters: filters_for_custom_operators,
      rules: rules_for_custom_operators,
      operators: custom_operators
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

    $b.queryBuilder({
      filters: basic_filters,
      rules: rules_for_custom_conditions,
      conditions: ['NAND', 'XOR'],
      default_condition: 'NAND'
    });

    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      rules_for_custom_conditions,
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
      icons: icons
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
      rules: readonly_rules
    });

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
      readonly_rules_after,
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
      filters: optgroups_filters
    });

    var select = [];
    $('[name=builder_rule_0_filter]>*').each(function() {
      if (this.nodeName == 'OPTION') {
        select.push($(this).val());
      }
      else {
        var group = [];
        $(this).find('option').each(function() {
          group.push($(this).val());
        });
        select.push(group);
      }
    });

    assert.deepEqual(
      select,
      ['-1', ['1', '3', '6'], '2', ['4'], '5'],
      'Filters should have been put in optgroup, solving discontinuities and keeping order'
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

    QueryBuilder.defaults({ default_rule_flags: new_default_flags });

    assert.deepEqual(
      QueryBuilder.DEFAULTS.default_rule_flags,
      new_default_flags,
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


  var rules_after_ui_events = {
    condition: 'OR',
    rules: [{
      id: 'name',
      operator: 'not_equal',
      value: 'foo'
    }]
  };

  var filters_for_custom_operators = [{
    id: 'name',
    type: 'string'
  }, {
    id: 'price',
    type: 'double'
  }, {
    id: 'release',
    type: 'date',
    operators: ['before', 'equal', 'after']
  }];

  var rules_for_custom_operators = {
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
  };

  var custom_operators = [
    {type: 'equal',     nb_inputs: 1, apply_to: ['string']},
    {type: 'not_equal', nb_inputs: 1,  apply_to: ['string']},
    {type: 'less',      nb_inputs: 1,  apply_to: ['number']},
    {type: 'greater',   nb_inputs: 1,  apply_to: ['number']},
    {type: 'before',    nb_inputs: 1,  apply_to: ['datetime']},
    {type: 'after',     nb_inputs: 1,  apply_to: ['datetime']}
  ];

  var rules_for_custom_conditions = {
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

  var icons = {
    add_group: 'fa fa-plus-circle',
    add_rule: 'fa fa-plus',
    remove_rule: 'fa fa-times',
    remove_group: 'fa fa-times',
    sort: 'fa fa-sort'
  };

  var readonly_rules = {
    condition: 'AND',
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

  var readonly_rules_after = {
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
  };

  var optgroups_filters = [{
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
  }];

  var new_default_flags = {
    filter_readonly: true,
    operator_readonly: false,
    value_readonly: true,
    no_delete: false
  };
});