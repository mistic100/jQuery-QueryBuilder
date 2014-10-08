$(function(){

  QUnit.test('Empty builder', function(assert) {
    $('#container1').queryBuilder({ filters: basic_filters });
    assert.ok(rulesMatch($('#container1').queryBuilder('getRules'), {}), 'Should return empty object');
  });
  
  QUnit.test('Set/get rules', function(assert) {
    $('#container2').queryBuilder({
      filters: basic_filters,
      rules: basic_rules
    });
    
    assert.ok(rulesMatch($('#container2').queryBuilder('getRules'), basic_rules), 'Should return object with rules');
    assert.deepEqual(getOptions($('#container2_rule_2 [name$=_operator] option')), basic_filters[1].operators, 'Should respect the order of operators');
    assert.deepEqual($('#container2').queryBuilder('getSQL', true, false), basic_rules_sql, 'Should create SQL query with statements');
  });
  
  QUnit.test('Empty value check', function(assert) {
    var error_str;
    $('#container3').queryBuilder({
      filters: basic_filters,
      rules: invalid_rules,
      onValidationError: function($rule, error, value, filter, operator) {
        error_str = error;
      }
    });
    
    assert.ok(rulesMatch($('#container3').queryBuilder('getRules'), {}), 'Should return empty object');
    assert.equal(error_str, 'string_empty', 'Should throw "string_empty" error');
  });
  
  QUnit.asyncTest('Language change', function(assert) {
    expect(2);
    var original = $.fn.queryBuilder.defaults.get('lang');
    
    $.getScript('../dist/i18n/fr.js', function() {
      assert.equal($.fn.queryBuilder.defaults.get('lang').delete_rule, 'Supprimer', 'Should be in french');
      $.fn.queryBuilder.defaults.set({ lang: original });
      assert.equal($.fn.queryBuilder.defaults.get('lang').delete_rule, 'Delete', 'Should be in english');
      QUnit.start();
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
    $('#container5-1').queryBuilder({
      filters: basic_filters,
      rules: rules_for_custom_conditions,
      conditions: ['NAND', 'XOR'],
      default_condition: 'NAND'
    });
  
    assert.ok(rulesMatch($('#container5-1').queryBuilder('getRules'), rules_for_custom_conditions), 'Should return correct rules');
    assert.deepEqual(getOptions($('#container5-1_group_0>.rules-group-header [name$=_cond]')), ['NAND', 'XOR'], 'Conditions should be NAND & XOR');
    
    $('#container5-2').queryBuilder({
      filters: basic_filters,
      conditions: ['AND']
    });
  
    assert.deepEqual(getOptions($('#container5-2_group_0>.rules-group-header [name$=_cond]')), ['AND'], 'Condition should be AND');
  });
  
  QUnit.test('No groups', function(assert) {
    $('#container6').queryBuilder({
      filters: basic_filters,
      allow_groups: false
    });
    
    assert.equal($('#container6_group_0>.rules-group-header [data-add=group]').length, 0, 'Should not contain group add button');
    assert.throws(function(){ $('#container6').queryBuilder('setRules', basic_rules); }, /Groups are disabled/, 'Should throw "Groups are disabled" error');
  });
  
  QUnit.test('Readonly', function(assert) {
    $('#container7').queryBuilder({
      filters: basic_filters,
      rules: readonly_rules,
      sortable: true,
      readonly_behavior: {
        sortable: false
      }
    });
    
    assert.equal($('#container7_rule_2').find('.drag-handle, [data-delete=rule]').length, 0, 'Should hide drag handle and delete button of readonly rule');
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
    return a.id==b.id && a.operator==b.operator && a.value==b.value;
  }
}
