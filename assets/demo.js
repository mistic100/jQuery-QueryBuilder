// reset builder
$('.reset').on('click', function() {
  var target = $(this).data('target');

  $('#builder-'+target).queryBuilder('reset');
});

// set rules
$('.set-json').on('click', function() {
  var target = $(this).data('target');
  var rules = window['rules_'+target];

  $('#builder-'+target).queryBuilder('setRules', rules);
});

$('.set-sql').on('click', function() {
  var target = $(this).data('target');
  var sql = window['sql_'+target];

  $('#builder-'+target).queryBuilder('setRulesFromSQL', sql);
});

$('.set-mongo').on('click', function() {
  var target = $(this).data('target');
  var mongo = window['mongo_'+target];

  $('#builder-'+target).queryBuilder('setRulesFromMongo', mongo);
});

// get rules
$('.parse-json').on('click', function() {
  var target = $(this).data('target');
  var result = $('#builder-'+target).queryBuilder('getRules');

  if (!$.isEmptyObject(result)) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + format4popup(result) + '</pre>'
    });
  }
});

$('.parse-sql').on('click', function() {
  var target = $(this).data('target');
  var result = $('#builder-'+target).queryBuilder('getSQL', $(this).data('stmt'));

  if (result.sql.length) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + format4popup(result.sql) + (result.params ? '\n\n' + format4popup(result.params) : '') + '</pre>'
    });
  }
});

$('.parse-mongo').on('click', function() {
  var target = $(this).data('target');
  var result = $('#builder-'+target).queryBuilder('getMongo');

  if (!$.isEmptyObject(result)) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + format4popup(result) + '</pre>'
    });
  }
});

function format4popup(object) {
  return JSON.stringify(object, null, 2).replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
