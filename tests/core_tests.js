$(function(){

  QUnit.test('Empty builder + destroy', function(assert) {
    $('#container1').queryBuilder({ filters: basic_filters });
    assert.ok($.isEmptyObject($('#container1').queryBuilder('getRules')), 'Should return empty object');
    
    $('#container1').queryBuilder('destroy');
    assert.ok(!$('#container1').hasClass('query-builder'), 'Should not have "query-builder" class');
    assert.ok($('#container1').data('queryBuilder')===undefined, 'Should not have "queryBuilder" data');
  });
  
  QUnit.test('Set/get rules', function(assert) {
    $('#container2').queryBuilder({
      filters: basic_filters,
      rules: basic_rules
    });
    
    assert.ok(rulesMatch($('#container2').queryBuilder('getRules'), basic_rules), 'Should return object with rules');
    assert.deepEqual(getOptions($('#container2_rule_2 [name$=_operator] option')), basic_filters[1].operators, 'Should respect the order of operators');
  });
  
  QUnit.test('Empty value check', function(assert) {
    var error_str;
    $('#container3').queryBuilder({
      filters: basic_filters,
      rules: invalid_rules,
      onValidationError: function($rule, error, value, filter, operator) {
        error_str = error[0];
      }
    });
    
    assert.ok(rulesMatch($('#container3').queryBuilder('getRules'), {}), 'Should return empty object');
    assert.equal(error_str, 'string_empty', 'Should throw "string_empty" error');
    assert.equal($('#container3_rule_0 .error-container:visible').attr('title'), 'Empty value', 'Should display error icon with "Empty value" title');
  });
  
  QUnit.test('Language change', function(assert) {
    assert.expect(2);
    
    var done = assert.async(),
        original = $.fn.queryBuilder.defaults.get('lang');
    
    $.getScript('../dist/i18n/fr.js', function() {
      assert.equal($.fn.queryBuilder.defaults.get('lang').delete_rule, 'Supprimer', 'Should be in french');
      $.fn.queryBuilder.defaults.set({ lang: original });
      assert.equal($.fn.queryBuilder.defaults.get('lang').delete_rule, 'Delete', 'Should be in english');
      done();
    });
  });
  
  QUnit.test('Delete/add operators', function(assert) {
    $('#container4').queryBuilder({
      filters: filters_for_custom_operators,
      rules: rules_for_custom_operators,
      operators: custom_operators
    });

    assert.deepEqual(getOptions($('#container4_rule_0 [name$=_operator] option')), ['equal', 'not_equal'], 'String type should have equal & not_equal operators');
    assert.deepEqual(getOptions($('#container4_rule_1 [name$=_operator] option')), ['less', 'greater'], 'Number type should have less & greater operators');
    assert.deepEqual(getOptions($('#container4_rule_2 [name$=_operator] option')), ['before', 'after'], 'Datetime type should have before & after operators');
  });
  
  QUnit.test('Change conditions', function(assert) {
    $('#container5').queryBuilder({
      filters: basic_filters,
      rules: rules_for_custom_conditions,
      conditions: ['NAND', 'XOR'],
      default_condition: 'NAND'
    });
  
    assert.ok(rulesMatch($('#container5').queryBuilder('getRules'), rules_for_custom_conditions), 'Should return correct rules');
    assert.deepEqual(getOptions($('#container5_group_0>.rules-group-header [name$=_cond]')), ['NAND', 'XOR'], 'Conditions should be NAND & XOR');
    
    $('#container5').queryBuilder('destroy');
    
    $('#container5').queryBuilder({
      filters: basic_filters,
      conditions: ['AND']
    });
  
    assert.deepEqual(getOptions($('#container5_group_0>.rules-group-header [name$=_cond]')), ['AND'], 'Condition should be AND');
  });
  
  QUnit.test('No groups', function(assert) {
    $('#container6').queryBuilder({
      filters: basic_filters,
      allow_groups: false
    });
    
    assert.equal($('#container6_group_0>.rules-group-header [data-add=group]').length, 0, 'Should not contain group add button');
    assert.throws(function(){ $('#container6').queryBuilder('setRules', basic_rules); }, /No more than 0 groups are allowed/, 'Should throw "Groups are disabled" error');
  });
  
  QUnit.test('Readonly', function(assert) {
    $('#container7').queryBuilder({
      filters: basic_filters,
      rules: readonly_rules
    });
    
    assert.equal($('#container7_rule_2').find('[data-delete=rule]').length, 0, 'Should hide delete button of readonly rule');
    assert.equal($('#container7_rule_2').find('input:disabled, select:disabled').length, 3, 'Should disabled select and inputs');
    $('#container7_group_1>.rules-group-header [data-delete=group]').trigger('click');
    assert.ok(rulesMatch($('#container7').queryBuilder('getRules'), readonly_rules_after), 'Should not delete group with readonly rule');
  });

  QUnit.test('Icons', function(assert) {
    $('#container8').queryBuilder({
      filters: basic_filters,
      rules: basic_rules,
      icons: icons
    });

    assert.equal($('#container8_group_0.rules-group-container [data-add=rule] i').attr('class'), "fa fa-plus", 'Rule add icon should have been replaced');
    assert.equal($('#container8_group_1.rules-group-container [data-delete=group] i').attr('class'), "fa fa-times", 'Group delete icon should have been replaced');
  });
  
  QUnit.test('SQL/MongoDB export', function(assert) {
    $('#container9').queryBuilder({
      filters: basic_filters,
      rules: basic_rules
    });
    
    assert.deepEqual($('#container9').queryBuilder('getSQL', false, false), basic_rules_sql_raw, 'Should create SQL query');
    assert.deepEqual($('#container9').queryBuilder('getSQL', true, false), basic_rules_sql_stmt, 'Should create SQL query with statements');
    assert.deepEqual($('#container9').queryBuilder('getMongo'), basic_rules_mongodb, 'Should create MongoDB query');
  });

  QUnit.test('Validation callback', function(assert) {
    $('#container10').queryBuilder({
      filters: filters_for_validation_callback,
      lang: {
        errors: {
          translated_error: 'Translated error! {0}'
        }
      }
    });
    
    rules_for_validation_callback.rules[0].value = 1;
    $('#container10').queryBuilder('setRules', rules_for_validation_callback);
    $('#container10').queryBuilder('getRules');
    assert.deepEqual($('#container10_rule_0 .error-container').attr('title'), 'invalid_name', 'Should display "invalid_name" error');
    
    rules_for_validation_callback.rules[0].value = 2;
    $('#container10').queryBuilder('setRules', rules_for_validation_callback);
    $('#container10').queryBuilder('getRules');
    assert.deepEqual($('#container10_rule_0 .error-container').attr('title'), 'Translated error! 2', 'Should display "Translated error! 2" error');
    
    rules_for_validation_callback.rules[0].value = 3;
    $('#container10').queryBuilder('setRules', rules_for_validation_callback);
    $('#container10').queryBuilder('getRules');
    assert.ok(!$('#container10_rule_0 .error-container').is(':visible'), 'Should hide rule error');
  });
  
  QUnit.test('valueSetter & valueParser', function(assert) {
    $('#container11').queryBuilder({
      filters: filters_for_value_callback,
      rules: rules_for_value_callback
    });
    
    assert.equal($('#container11_rule_0 .rule-value-container input').val(), 'abcdefghij', 'Displayed value should be "abcdefghij"');
    
    $('#container11_rule_0 .rule-value-container input').val('iefdabchg');
    assert.equal($('#container11').queryBuilder('getRules').rules[0].value, '845301276', 'Final value should be "845301276"');
  });
});

function getOptions($target) {
  var options = [];
  
  $target.each(function(){
    options.push($(this).val());
  });
  
  return options;
}

function rulesMatch(a, b) {
  if (a.hasOwnProperty('rules')) {
    if (!b.rules) {
      return false;
    }
    
    for (var i=0, l=a.rules.length; i<l; i++) {
      if (b.rules[i]===undefined || !rulesMatch(a.rules[i], b.rules[i])) {
        return false;
      }
    }
    
    for (var i=0, l=b.rules.length; i<l; i++) {
      if (a.rules[i]===undefined || !rulesMatch(a.rules[i], b.rules[i])) {
        return false;
      }
    }
    
    return a.condition == b.condition;
  }
  else {
    var match;
    if ($.isArray(a.value)) {
      match = $(a.value).not(b.value).length == 0 && $(b.value).not(a.value).length == 0;
    }
    else {
      match = a.value==b.value;
    }
    
    return a.id==b.id && a.operator==b.operator && match;
  }
}
