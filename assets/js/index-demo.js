$('#demo-builder').queryBuilder({
  filters: [{
    field: 'name',
    label: 'Name',
    type: 'string'
  }, {
    field: 'category',
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
  }, {
    field: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    values: {
      1: 'Yes',
      0: 'No'
    },
    operators: ['equal']
  }, {
    field: 'price',
    label: 'Price',
    type: 'double',
    validation: {
      min: 0,
      step: 0.01
    }
  }, {
    field: 'id',
    label: 'Identifier',
    type: 'string',
    placeholder: '____-____-____',
    operators: ['equal', 'not_equal'],
    validation: {
      format: /^.{4}-.{4}-.{4}$/
    }
  }]
});

// set rules
$('#demo-builder').queryBuilder('setRules', {
  condition: 'AND',
  rules: [{
    field: 'price',
    operator: 'less',
    value: 10.25
  }, {
    condition: 'OR',
    rules: [{
      field: 'category',
      operator: 'equal',
      value: 2
    }, {
      field: 'category',
      operator: 'equal',
      value: 1
    }]
  }]
});