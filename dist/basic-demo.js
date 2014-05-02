// define filters
$('#builder').queryBuilder({
  filters: [{
    id: 'name',
    label: 'Name',
    type: 'string'
  }, {
    id: 'category',
    label: 'Category',
    type: 'integer',
    input: 'select',
    multiple: true,
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
    id: 'in_stock',
    label: 'In stock',
    type: 'integer',
    input: 'radio',
    values: {
      1: 'Yes',
      0: 'No'
    },
    operators: ['equal']
  }, {
    id: 'price',
    label: 'Price',
    type: 'double',
    validation: {
      min: 0,
      step: 0.01
    }
  }, {
    id: 'id',
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
$('#set').on('click', function() {
  $('#builder').queryBuilder('setRules', {
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
        id: 'category',
        operator: 'equal',
        value: 1
      }]
    }]
  });
});

// reset builder
$('#reset').on('click', function() {
  $('#builder').queryBuilder('reset');
  $('#result').empty().addClass('hide');
});

// get rules
$('#parse').on('click', function() {
  $('#result').removeClass('hide')
    .find('pre').html(JSON.stringify(
      $('#builder').queryBuilder('getRules'),
      undefined, 2
    ));
});