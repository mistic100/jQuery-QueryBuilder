// set rules
$('.set').on('click', function() {
  var rules = window['rules_'+$(this).data('target')];
  $('#builder-'+$(this).data('target')).queryBuilder('setRules', rules);
});

// reset builder
$('.reset').on('click', function() {
  $('#builder-'+$(this).data('target')).queryBuilder('reset');
});

// get rules
$('.parse-json').on('click', function() {
  var res = $('#builder-'+$(this).data('target')).queryBuilder('getRules');
  if (!$.isEmptyObject(res)) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + JSON.stringify(res, null, 2) + '</pre>'
    });
  }
});

$('.parse-sql').on('click', function() {
  var res = $('#builder-'+$(this).data('target')).queryBuilder('getSQL', $(this).data('stmt'));
  if (res.sql.length) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, null, 2) : '') + '</pre>'
    });
  }
});

$('.parse-mongo').on('click', function() {
  var res = $('#builder-'+$(this).data('target')).queryBuilder('getMongo');
  if (!$.isEmptyObject(res)) {
    bootbox.alert({
      title: $(this).text(),
      message: '<pre class="code-popup">' + JSON.stringify(res, null, 2) + '</pre>'
    });
  }
});