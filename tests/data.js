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
  type: 'integer',
  input: 'select',
  values: {
    1: 'Books',
    2: 'Movies',
    3: 'Music',
    4: 'Tools',
    5: 'Goodies',
    6: 'Clothes'
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
      operator: 'equal',
      value: 2
    }, {
      id: 'id',
      operator: 'not_equal',
      value: '1234-azer-5678'
    }]
  }]
};

var basic_rules_sql = {
  sql: 'price < ? AND name IS NULL AND ( category = ? OR id != ? ) ',
  params: [10.25, 2, '1234-azer-5678']
};

var invalid_rules = {
  condition: 'AND',
  rules: [{
    id: 'id',
    operator: 'equal',
    value: ''
  }]
};

var filters_for_custom_operators = [
{
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
}
];

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
      value: 2
    }, {
      id: 'id',
      operator: 'not_equal',
      value: '1234-azer-5678',
      readonly: true
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
