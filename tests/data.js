var basic_filters = [
/*
 * basic
 */
{
  id: 'name',
  label: 'Name',
  type: 'string'
},
/*
 * select
 */
{
  id: 'category',
  label: 'Category',
  type: 'string',
  input: 'select',
  multiple: true,
  values: {
    'bk': 'Books',
    'mo': 'Movies',
    'mu': 'Music',
    'to': 'Tools',
    'go': 'Goodies',
    'cl': 'Clothes'
  },
  operators: ['in', 'not_in', 'equal', 'not_equal', 'is_null', 'is_not_null']
},
/*
 * radio
 */
{
  id: 'in_stock',
  label: 'In stock',
  type: 'integer',
  input: 'radio',
  values: {
    1: 'Yes',
    0: 'No'
  },
  operators: ['equal']
},
/*
 * double
 */
{
  id: 'price',
  label: 'Price',
  type: 'double',
  validation: {
    min: 0,
    step: 0.01
  }
}, 
/*
 * placeholder and regex validation
 */
{
  id: 'id',
  label: 'Identifier',
  type: 'string',
  placeholder: '____-____-____',
  operators: ['equal', 'not_equal'],
  validation: {
    format: /^.{4}-.{4}-.{4}$/
  }
}];

var basic_rules = {
  condition: 'AND',
  rules: [{
    id: 'price',
    operator: 'less',
    value: 10.25
  }, {
    id: 'name',
    operator: 'is_null',
    value: null
  }, {
    condition: 'OR',
    rules: [{
      id: 'category',
      operator: 'in',
      value: ['mo', 'mu']
    }, {
      id: 'id',
      operator: 'not_equal',
      value: '1234-azer-5678'
    }]
  }]
};

var basic_rules_sql_stmt = {
  sql: 'price < ? AND name IS NULL AND ( category IN(?, ?) OR id != ? ) ',
  params: [10.25, 'mo', 'mu', '1234-azer-5678']
};
var basic_rules_sql_raw = {
  sql: 'price < 10.25 AND name IS NULL AND ( category IN(\'mo\', \'mu\') OR id != \'1234-azer-5678\' ) '
};
var basic_rules_mongodb = {'$and': [
  {'price': { '$lt': 10.25 }},
  {'name': null},
  {'$or': [
    {'category': {'$in': ['mo', 'mu']}},
    {'id': {'$ne': '1234-azer-5678'}}
  ]}
]};

var invalid_rules = {
  condition: 'AND',
  rules: [{
    id: 'id',
    operator: 'equal',
    value: ''
  }]
};

var filters_for_validation_callback = [{
  id: 'name',
  type: 'integer',
  validation: {
    callback: function(value, filter, operator, $rule) {
      switch (value) {
        case '1':
          return 'invalid_name';
          
        case '2':
          return ['translated_error', value];
          
        case '3':
          return true;
      }
    }
  }
}];

var rules_for_validation_callback = {
  condition: 'AND',
  rules: [{
    id: 'name',
    operator: 'equal',
    value: 1
  }]
};

var filters_for_value_callback = [{
  id: 'name',
  type: 'string',
  valueSetter: function($rule, value) {
    value = (''+value).split('').map(function(c) {
      return String.fromCharCode(97 + parseInt(c));
    }).join('');
    
    $rule.find('.rule-value-container input').val(value);
  },
  valueParser: function($rule, value) {
    value = value.split('').map(function(c) {
      return c.charCodeAt(0) - 97;
    }).join('');
    
    return value;
  }
}];

var rules_for_value_callback = {
  condition: 'AND',
  rules: [{
    id: 'name',
    operator: 'equal',
    value: '0123456789'
  }]
};

var filters_for_custom_operators = [{
  id: 'name',
  label: 'Name',
  type: 'string'
},
{
  id: 'price',
  label: 'Price',
  type: 'double',
  validation: {
    min: 0,
    step: 0.01
  }
}, 
{
  id: 'release',
  label: 'Release date',
  type: 'date'
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
  {type: 'equal',     accept_values: true,  apply_to: ['string']},
  {type: 'not_equal', accept_values: true,  apply_to: ['string']},
  {type: 'less',      accept_values: true,  apply_to: ['number']},
  {type: 'greater',   accept_values: true,  apply_to: ['number']},
  {type: 'before',    accept_values: true,  apply_to: ['datetime']},
  {type: 'after',     accept_values: true,  apply_to: ['datetime']}
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

var readonly_rules = {
  condition: 'AND',
  rules: [{
    id: 'price',
    operator: 'less',
    value: 10.25
  }, {
    condition: 'OR',
    rules: [{
      id: 'category',
      operator: 'equal',
      value: 'mu'
    }, {
      id: 'id',
      operator: 'not_equal',
      value: '1234-azer-5678',
      readonly: true,
      flags: {
        no_sortable: true
      }
    }, {
      condition: 'AND',
      rules: [{
        id: 'name',
        operator: 'equal',
        value: 'bar'
      }]
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
      value: '1234-azer-5678',
      readonly: true
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
