$(function(){
  var $b = $('#builder');

  QUnit.module('core', {
    afterEach: function() {
      $b.queryBuilder('destroy');
    }
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

    $b.queryBuilder('on', 'validationError', function(node, error, value) {
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
   * Test access to defaults
   */
  QUnit.test('Access to defaults', function(assert) {
    var def = QueryBuilder.defaults();
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
      'Chould return a specific default object'
    );

    QueryBuilder.defaults({ default_rule_flags: {
      filter_readonly: true,
      operator_readonly: false,
      value_readonly: true,
      no_delete: false
    }});

    assert.deepEqual(
      QueryBuilder.DEFAULTS.default_rule_flags,
      {
        filter_readonly: true,
        operator_readonly: false,
        value_readonly: true,
        no_delete: false
      },
      'Should have modified the default config object'
    );
  });

  /**
   * Test language load
   */
  QUnit.test('Change language', function(assert) {
    assert.expect(2);

    var done = assert.async(),
        original = $.fn.queryBuilder.defaults('lang');

    $.getScript('../dist/i18n/fr.js', function() {
      assert.equal($.fn.queryBuilder.defaults('lang').delete_rule, 'Supprimer', 'Should be in french');
      $.fn.queryBuilder.defaults({ lang: original });
      assert.equal($.fn.queryBuilder.defaults('lang').delete_rule, 'Delete', 'Should be in english');
      done();
    });
  });


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
});