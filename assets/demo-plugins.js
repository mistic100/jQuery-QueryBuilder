var rules_plugins = {
  condition: 'AND',
  rules: [{
    id: 'name',
    operator: 'equal',
    value: 'Mistic'
  }, {
    condition: 'OR',
    rules: [{
      id: 'category',
      operator: 'in',
      value: [1, 2]
    }, {
      id: 'in_stock',
      operator: 'equal',
      value: 0
    }]
  }]
};

$('#builder-plugins').queryBuilder({
  plugins: [
    'sortable',
    'filter-description',
    'unique-filter',
    'bt-tooltip-errors',
    'bt-selectpicker',
    'bt-checkbox'
  ],
  
  filters: [{
    id: 'name',
    label: 'Name',
    type: 'string',
    unique: true,
    description: 'This filter is "unique", it can be used only once'
  }, {
    id: 'category',
    label: 'Category',
    type: 'integer',
    input: 'checkbox',
    values: {
      1: 'Books',
      2: 'Movies',
      3: 'Music',
      4: 'Goodies'
    },
    color: 'primary',
    description: 'This filter uses Awesome Bootstrap Checkboxes',
    operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null']
  }, {
    id: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    values: {
      1: 'Yes',
      0: 'No'
    },
    colors: {
      1: 'success',
      0: 'danger'
    },
    description: 'This filter also uses Awesome Bootstrap Checkboxes',
    operators: ['equal']
  }, {
    id: 'price',
    label: 'Price',
    type: 'double',
    validation: {
      min: 0,
      step: 0.01
    }
  }],

  rules: rules_plugins
});