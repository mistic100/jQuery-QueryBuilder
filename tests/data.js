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
  operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
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

var invalid_rules = {
  condition: 'AND',
  rules: [{
    id: 'id',
    operator: 'equal',
    value: ''
  }]
};