var sql_import_export = 'name LIKE "%Johnny%" AND (category = 2 OR in_stock = 1)';

var mongo_import_export = {
  "$and": [{
    "price": { "$lt": 10.25 }
  }, {
    "$or": [{
      "category": 2
    }, {
      "category": 1
    }]
  }]
}

$('#builder-import_export').queryBuilder({
  plugins: [
    'bt-tooltip-errors',
    'not-group'
  ],

  filters: [{
    id: 'name',
    label: 'Name',
    type: 'string'
  }, {
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

$('#btn-reset').on('click', function() {
  $('#builder-import_export').queryBuilder('reset');
});

$('#btn-set-sql').on('click', function() {
  $('#builder-import_export').queryBuilder('setRulesFromSQL', sql_import_export);
});

$('#btn-set-mongo').on('click', function() {
  $('#builder-import_export').queryBuilder('setRulesFromMongo', mongo_import_export);
});

$('#btn-get-sql').on('click', function() {
  var result = $('#builder-import_export').queryBuilder('getSQL', 'question_mark');

  if (result.sql.length) {
    alert(result.sql + '\n\n' + JSON.stringify(result.params, null, 2));
  }
});

$('#btn-get-mongo').on('click', function() {
  var result = $('#builder-import_export').queryBuilder('getMongo');

  if (!$.isEmptyObject(result)) {
    alert(JSON.stringify(result, null, 2));
  }
});
