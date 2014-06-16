$(function(){

  /*
   * BASIC TESTS
   */
  QUnit.test('Empty builder', function(assert) {
    $('#container1').queryBuilder({ filters: basic_filters });
    assert.ok(rulesMatch($('#container1').queryBuilder('getRules'), {}), 'Should return empty object');
  });
  
  QUnit.test('Set/get rules', function(assert) {
    $('#container2').queryBuilder({ filters: basic_filters });
    $('#container2').queryBuilder('setRules', basic_rules);
    assert.ok(rulesMatch($('#container2').queryBuilder('getRules'), basic_rules), 'Should return object with rules');
  });
  
  QUnit.test('Empty value check', function(assert) {
    var error_str;
    
    $('#container3').queryBuilder({
      filters: basic_filters,
      onValidationError: function($rule, error, value, filter, operator) {
        error_str = error;
      }
    });
    $('#container3').queryBuilder('setRules', invalid_rules);
    
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

});

function rulesMatch(a, b) {
  if (a.hasOwnProperty('rules')) {
    if (!b.rules) {
      return false;
    }
    
    for (var i=0, l=a.rules.length; i<l; i++) {
      if (!b.rules[i] || !rulesMatch(a.rules[i], b.rules[i])) {
        return false;
      }
    }
    
    return a.condition == b.condition;
  }
  else {
    return a.id==b.id && a.operator==b.operator && a.value==b.value;
  }
}
