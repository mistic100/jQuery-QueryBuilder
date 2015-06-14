$(function(){
  var $b = $('#builder');

  QUnit.module('plugins', {
    afterEach: function() {
      $b.queryBuilder('destroy');
    }
  });

  /**
   * Test plugins loading
   */
  QUnit.test('Plugins loading', function(assert) {
    assert.ok(QueryBuilder.prototype.getSQL !== undefined, 'Should load SQL plugin automatically');

    $b.queryBuilder({
      filters: basic_filters,
      plugins: ['bt-tooltip-errors', 'filter-description']
    });

    assert.deepEqual(
      $b[0].queryBuilder.plugins['bt-tooltip-errors'],
      QueryBuilder.plugins['bt-tooltip-errors'].def,
      'Should load "bt-tooltip-errors" with default config'
    );

    assert.deepEqual(
      $b[0].queryBuilder.plugins['filter-description'],
      QueryBuilder.plugins['filter-description'].def,
      'Should load "filter-description" with default config'
    );

    $b.queryBuilder('destroy');

    $b.queryBuilder({
      filters: basic_filters,
      plugins: {
        'bt-tooltip-errors': null,
        'filter-description': { icon: 'fa fa-info' }
      }
    });

    assert.deepEqual(
      $b[0].queryBuilder.plugins['bt-tooltip-errors'],
      QueryBuilder.plugins['bt-tooltip-errors'].def,
      'Should load "bt-tooltip-errors" with default config'
    );

    assert.deepEqual(
      $b[0].queryBuilder.plugins['filter-description'],
      { icon: 'fa fa-info', mode: 'popover' },
      'Should load "filter-description" with custom config'
    );

    $b.queryBuilder('destroy');

    assert.throws(
      function(){
        $b.queryBuilder({
          filters: basic_filters,
          plugins: ['__unknown__']
        });
      },
      /Unable to find plugin "__unknown__"/,
      'Should throw error on unknown plugin'
    );
  });

  /**
   * SQL import/export
   */
  QUnit.test('sql-support', function(assert) {
    $b.queryBuilder({
      filters: basic_filters,
      rules: basic_rules
    });

    assert.deepEqual(
      $b.queryBuilder('getSQL', false),
      basic_rules_sql_raw,
      'Should create SQL query'
    );

    assert.deepEqual(
      $b.queryBuilder('getSQL', 'question_mark'),
      basic_rules_sql_stmt,
      'Should create SQL query with statements (?)'
    );

    assert.deepEqual(
      $b.queryBuilder('getSQL', 'numbered'),
      basic_rules_sql_stmt_num,
      'Should create SQL query with statements (numbered)'
    );

    assert.deepEqual(
      $b.queryBuilder('getSQL', 'named'),
      basic_rules_sql_stmt_named,
      'Should create SQL query with statements (named)'
    );

    $b.queryBuilder('setRulesFromSQL', basic_rules_sql_raw);
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      basic_rules,
      'Should parse SQL query'
    );

    $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt, 'question_mark');
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      basic_rules,
      'Should parse SQL query with statements (?)'
    );

    $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_num, 'numbered');
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      basic_rules,
      'Should parse SQL query with statements (numbered)'
    );

    $b.queryBuilder('setRulesFromSQL', basic_rules_sql_stmt_named, 'named');
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      basic_rules,
      'Should parse SQL query with statements (named)'
    );

    $b.queryBuilder('destroy');
    $b.queryBuilder({
      filters: basic_filters,
      rules: all_operators_rules
    });

    assert.deepEqual(
      $b.queryBuilder('getSQL', 'question_mark'),
      all_operators_rules_sql,
      'Should convert all kind of operators to SQL'
    );

    $b.queryBuilder('setRulesFromSQL', all_operators_rules_sql, 'question_mark');
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      all_operators_rules,
      'Should parse all kind of operators from SQL'
    );

    $b.queryBuilder('destroy');
    $b.queryBuilder({
      filters: simple_filters
    });

    $b.queryBuilder('setRulesFromSQL', nested_rules_sql);
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      nested_rules,
      'Should parse SQL with deep nested rules'
    );

    $b.queryBuilder('setRulesFromSQL', one_rule_sql);
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      one_rule,
      'Should parse SQL with one rule'
    );
  });

  /**
   * MongoDB import/export
   */
  QUnit.test('mongo-support', function(assert) {
    $b.queryBuilder({
      filters: basic_filters,
      rules: basic_rules
    });

    assert.deepEqual(
      $b.queryBuilder('getMongo'),
      basic_rules_mongodb,
      'Should create MongoDB query'
    );

    assert.deepEqual(
      $b.queryBuilder('getRulesFromMongo', basic_rules_mongodb),
      basic_rules,
      'Should return rules object from MongoDB query'
    );

    $b.queryBuilder('destroy');
    $b.queryBuilder({
      filters: basic_filters,
      rules: all_operators_rules
    });

    assert.deepEqual(
      $b.queryBuilder('getMongo'),
      all_operators_rules_mongodb,
      'Should successfully convert all kind of operators to MongoDB'
    );

    $b.queryBuilder('setRulesFromMongo', all_operators_rules_mongodb);
    assert.rulesMatch(
      $b.queryBuilder('getRules'),
      all_operators_rules,
      'Should successfully parse all kind of operators from MongoDB'
    );
  });

  /**
   * Test bt-checkbox
   */
  QUnit.test('bt-checkbox', function(assert) {
    $b.queryBuilder({
      plugins: ['bt-checkbox'],
      filters: bt_checkbox_filters,
      rules: bt_checkbox_rules
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
      rules: invalid_rules
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
    $b.queryBuilder({
      plugins: {
        'filter-description': { mode: 'inline' }
      },
      filters: description_filters,
      rules: description_rules
    });

    assert.match(
      $('#builder_rule_0 p.filter-description').html(),
      new RegExp(description_filters[0].description),
      'Paragraph should contain filter description'
    );

    $b.queryBuilder('destroy');

    $b.queryBuilder({
      plugins: {
        'filter-description': { mode: 'popover' }
      },
      filters: description_filters,
      rules: description_rules
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
      filters: description_filters,
      rules: description_rules
    });

    assert.ok(
      $('#builder_rule_0 button.filter-description').data('toggle') == 'bootbox',
      'Rule should contain a new button enabled with Bootbox'
    );
  });

  /**
   * Test unique-filter
   */
  QUnit.test('unique-filter', function(assert) {
      $b.queryBuilder({
          plugins: ['unique-filter'],
          filters: unique_filters,
          rules: basic_rules
      });

      assert.ok(
        $('select[name=builder_rule_0_filter] option[value=id]').is(':disabled') &&
        $('select[name=builder_rule_1_filter] option[value=id]').is(':disabled') &&
        $('select[name=builder_rule_2_filter] option[value=id]').is(':disabled'),
        '"Identifier" filter should be disabled everywhere'
      );

      /*
      FIXME: the test always fails in Grunt
      assert.ok(
         $('select[name=builder_rule_1_filter] option[value=price]').is(':disabled') &&
        !$('select[name=builder_rule_2_filter] option[value=price]').is(':disabled') &&
        !$('select[name=builder_rule_3_filter] option[value=price]').is(':disabled'),
        '"Price" filter should be disabled in his group only'
      );
      */
  });

  /**
   * Test sortable
   */
  QUnit.test('sortable', function(assert) {
      assert.expect(1);
      var done = assert.async();

      $b.queryBuilder({
          plugins: ['sortable'],
          filters: basic_filters,
          rules: basic_rules
      });

      $('#builder_rule_3').simulateDragDrop({
          dropTarget: $('#builder_rule_1'),
          start: function() {
            $(this).find('.drag-handle').trigger('mouseover');
          },
          done: function() {
            assert.rulesMatch(
              $b.queryBuilder('getRules'),
              sorted_rules,
              'Should have moved "Identifier" rule'
            );
            done();
          }
      });
  });

  /**
   * Test inversion
   */
  QUnit.test('invert', function(assert) {
      $b.queryBuilder({
          plugins: ['invert'],
          filters: basic_filters,
          rules: basic_rules
      });

      $b.queryBuilder('invert');

      assert.rulesMatch(
        $b.queryBuilder('getRules'),
        basic_rules_invert,
        'Should have inverted all conditions and operators'
      );
  });


  var basic_rules_sql_raw = {
    sql: 'price < 10.25 AND name IS NULL AND ( category IN(\'mo\', \'mu\') OR id != \'1234-azer-5678\' ) '
  };

  var basic_rules_sql_stmt = {
    sql: 'price < ? AND name IS NULL AND ( category IN(?, ?) OR id != ? ) ',
    params: [10.25, 'mo', 'mu', '1234-azer-5678']
  };

  var basic_rules_sql_stmt_num = {
    sql: 'price < $1 AND name IS NULL AND ( category IN($2, $3) OR id != $4 ) ',
    params: [10.25, 'mo', 'mu', '1234-azer-5678']
  };

  var basic_rules_sql_stmt_named = {
    sql: 'price < :price_1 AND name IS NULL AND ( category IN(:category_1, :category_2) OR id != :id_1 ) ',
    params: {
      price_1: 10.25,
      category_1: 'mo',
      category_2: 'mu',
      id_1: '1234-azer-5678'
    }
  };

  var basic_rules_mongodb = {'$and': [
    {'price': { '$lt': 10.25 }},
    {'name': null},
    {'$or': [
      {'category': {'$in': ['mo', 'mu']}},
      {'id': {'$ne': '1234-azer-5678'}}
    ]}
  ]};

  var basic_rules_loopback = {'and': [
    {'price': { 'lt': 10.25 }},
    {'name': null},
    {'or': [
      {'category': {'inq': ['mo', 'mu']}},
      {'id': {'neq': '1234-azer-5678'}}
    ]}
  ]};

  var all_operators_rules = {
    condition: 'AND',
    rules: [{
      id: 'name',
      operator: 'equal',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'not_equal',
      value: 'foo'
    }, {
      id: 'category',
      operator: 'in',
      value: ['bk','mo']
    }, {
      id: 'category',
      operator: 'not_in',
      value: ['bk','mo']
    }, {
      id: 'price',
      operator: 'less',
      value: '5'
    }, {
      id: 'price',
      operator: 'less_or_equal',
      value: '5'
    }, {
      id: 'price',
      operator: 'greater',
      value: '4'
    }, {
      id: 'price',
      operator: 'greater_or_equal',
      value: '4'
    }, {
      id: 'price',
      operator: 'between',
      value: ['4','5']
    }, {
      id: 'price',
      operator: 'not_between',
      value: ['4','5']
    }, {
      id: 'name',
      operator: 'begins_with',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'not_begins_with',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'contains',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'not_contains',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'ends_with',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'not_ends_with',
      value: 'foo'
    }, {
      id: 'name',
      operator: 'is_empty',
      value: null
    }, {
      id: 'name',
      operator: 'is_not_empty',
      value: null
    }, {
      id: 'name',
      operator: 'is_null',
      value: null
    }, {
      id: 'name',
      operator: 'is_not_null',
      value: null
    }]
  };

  var all_operators_rules_sql = {
    sql: 
      'name = ? ' +
      'AND name != ? ' +
      'AND category IN(?, ?) ' +
      'AND category NOT IN(?, ?) ' +
      'AND price < ? ' +
      'AND price <= ? ' +
      'AND price > ? ' +
      'AND price >= ? ' +
      'AND price BETWEEN ? AND ? ' +
      'AND price NOT BETWEEN ? AND ? ' +
      'AND name LIKE(?) ' +
      'AND name NOT LIKE(?) ' +
      'AND name LIKE(?) ' +
      'AND name NOT LIKE(?) ' +
      'AND name LIKE(?) ' +
      'AND name NOT LIKE(?) ' +
      'AND name = \'\' ' +
      'AND name != \'\' ' +
      'AND name IS NULL ' +
      'AND name IS NOT NULL',
    params: [
      'foo',
      'foo',
      'bk', 'mo',
      'bk', 'mo',
      5,
      5,
      4,
      4,
      4, 5,
      4, 5,
      'foo%',
      'foo%',
      '%foo%',
      '%foo%',
      '%foo',
      '%foo'
    ]
  };

  var all_operators_rules_mongodb = {
    $and: [
      { name: 'foo' },
      { name: {$ne: 'foo'} },
      { category: { $in: ['bk','mo'] }},
      { category: { $nin: ['bk','mo'] }},
      { price: {$lt: 5} },
      { price: {$lte: 5} },
      { price: {$gt: 4} },
      { price: {$gte: 4} },
      { price: {$gte: 4, $lte: 5} },
      { price: {$lt: 4, $gt: 5} },
      { name: {$regex: '^foo'} },
      { name: {$regex: '^(?!foo)'} },
      { name: {$regex: 'foo'} },
      { name: {$regex: '^((?!foo).)*$', $options: 's'} },
      { name: {$regex: 'foo$'} },
      { name: {$regex: '(?<!foo)$'} },
      { name: '' },
      { name: {$ne: ''} },
      { name: null },
      { name: {$ne: null} }
    ]
  };

  var simple_filters = [
    {id: 'a', type: 'integer'},
    {id: 'b', type: 'integer'},
    {id: 'c', type: 'integer'},
    {id: 'd', type: 'integer'}
  ];

  var nested_rules = {
    condition: 'OR',
    rules: [
      {
        id: 'a',
        operator: 'equal',
        value: 5
      },
      {
        condition: 'AND',
        rules: [
          {
            id: 'b',
            operator: 'equal',
            value: 4
          },
          {
            id: 'c',
            operator: 'equal',
            value: 7
          },
          {
            condition: 'OR',
            rules: [
              {
                id: 'd',
                operator: 'equal',
                value: 1
              },
              {
                condition: 'AND',
                rules: [
                  {
                    id: 'a',
                    operator: 'equal',
                    value: 7
                  },
                  {
                    id: 'a',
                    operator: 'equal',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            id: 'c',
            operator: 'equal',
            value: 3
          },
          {
            condition: 'OR',
            rules: [
              {
                condition: 'AND',
                rules: [
                  {
                    id: 'b',
                    operator: 'equal',
                    value: 4
                  },
                  {
                    id: 'c',
                    operator: 'equal',
                    value: 9
                  }
                ]
              },
              {
                id: 'a',
                operator: 'equal',
                value: 8
              },
              {
                id: 'a',
                operator: 'equal',
                value: 10
              }
            ]
          }
        ]
      },
      {
        id: 'a',
        operator: 'equal',
        value: 0
      },
      {
        condition: 'AND',
        rules: [
          {
            id: 'b',
            operator: 'equal',
            value: 4
          },
          {
            id: 'a',
            operator: 'equal',
            value: 4
          },
          {
            condition: 'OR',
            rules: [
              {
                id: 'a',
                operator: 'equal',
                value: 4
              },
              {
                id: 'c',
                operator: 'equal',
                value: 8
              }
            ]
          }
        ]
      }
    ]
  };

  var nested_rules_sql = 'a=5 or (b=4 and c=7 and (d=1 or (a=7 and a=1)) and c=3 and ((b=4 and c=9) or a=8 or a=10)) or a=0 or (b=4 and a=4 and (a=4 or c=8))';

  var one_rule = {
    condition: 'AND',
    rules: [{
      id: 'a',
      operator: 'equal',
      value: 5
    }]
  };

  var one_rule_sql = 'a = 5';

  var bt_checkbox_filters = [{
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
  }];

  var bt_checkbox_rules = {
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
  };

  var invalid_rules = {
    condition: 'AND',
    rules: [{
      id: 'id',
      operator: 'equal',
      value: ''
    }]
  };

  var description_filters = [{
    id: 'name',
    type: 'string',
    description: '<b>Lorem Ipsum</b> sit amet.'
  }];

  var description_rules = {
    rules: [{
      id: 'name',
      value: 'Mistic'
    }]
  };

  var unique_filters = $.extend(true, [], basic_filters);
  unique_filters[3].unique = 'group';
  unique_filters[4].unique = true;

  var sorted_rules = $.extend(true, {}, basic_rules);
  sorted_rules.rules.splice(2, 0, sorted_rules.rules[2].rules.pop());

  var basic_rules_invert = {
    condition: 'OR',
    rules: [{
      id: 'price',
      field: 'price',
      operator: 'greater_or_equal',
      value: 10.25
    }, {
      id: 'name',
      field: 'name',
      operator: 'is_not_null',
      value: null
    }, {
      condition: 'AND',
      rules: [{
        id: 'category',
        field: 'category',
        operator: 'not_in',
        value: ['mo', 'mu']
      }, {
        id: 'id',
        field: 'id',
        operator: 'equal',
        value: '1234-azer-5678'
      }]
    }]
  };
});