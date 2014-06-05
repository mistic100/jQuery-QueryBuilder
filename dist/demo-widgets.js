// load data
if (localStorage.demoData == undefined) {
  $.getJSON(baseurl + '/dist/demo-data.json', function(data) {
    localStorage.demoData = JSON.stringify(data);
  });
}

// define filters
$('#builder').queryBuilder({
  filters: [{
    id: 'date',
    label: 'Datepicker',
    type: 'date',
    validation: {
      format: 'YYYY/MM/DD'
    },
    plugin: 'datepicker',
    plugin_config: {
      format: 'yyyy/mm/dd',
      todayBtn: 'linked',
      todayHighlight: true,
      autoclose: true
    }
  }, {
    id: 'rate',
    label: 'Slider',
    type: 'integer',
    validation: {
      min: 0,
      max: 100
    },
    plugin: 'slider',
    plugin_config: {
      min: 0,
      max: 100,
      value: 0
    },
    onAfterSetValue: function($rule, value) {
      var input = $rule.find('.rule-value-container input');
      input.slider('setValue', value);
      input.val(value); // don't know why I need it
    }
  }, {
    id: 'category',
    label: 'Selectize',
    type: 'string',
    plugin: 'selectize',
    plugin_config: {
      valueField: 'id',
      labelField: 'name',
      searchField: 'name',
      sortField: 'name',
      create: true,
      maxItems: 1,
      plugins: ['remove_button'],
      onInitialize: function() {
        var that = this,
            data = JSON.parse(localStorage.demoData);

        data.forEach(function(item) {
          that.addOption(item);
        });
      }
    },
    onAfterCreateRuleInput: function($rule) {
      $rule.find('.rule-value-container').css('min-width', '200px');
    },
    onAfterSetValue: function($rule, value) {
      var selectize = $rule.find('.rule-value-container input')[0].selectize;
      selectize.setValue(value);
    }
  }, {
    id: 'coord',
    label: 'Coordinates',
    type: 'string',
    validation: {
      format: /^[A-C]{1}.[1-6]{1}$/
    },
    input: function($rule, filter) {
      var $container = $rule.find('.rule-value-container');
      
      $container.on('change', '[name=coord_1]', function(){
        var h = '';
        
        switch ($(this).val()) {
          case 'A':
            h = '\
            <option value="-1">-</option> \
            <option value="1">1</option> \
            <option value="2">2</option>';
            break;
          case 'B': case 'C':
            h = '\
            <option value="-1">-</option> \
            <option value="3">3</option> \
            <option value="4">4</option>';
            break;
        }
        
        $container.find('[name=coord_2]').html(h).toggle(h!='');
      });
      
      return '\
      <select name="coord_1"> \
        <option value="-1">-</option> \
        <option value="A">A</option> \
        <option value="B">B</option> \
        <option value="C">C</option> \
      </select> \
      <select name="coord_2" style="display:none;"></select>';
    },
    valueParser: function($rule, value, filter, operator) {
      return $rule.find('[name=coord_1]').val()
        +'.'+$rule.find('[name=coord_2]').val();
    },
    onAfterSetValue: function($rule, value, filter, operator) {
      if (operator.accept_values) {
        var val = value.split('.');
        
        $rule.find('[name=coord_1]').val(val[0]).trigger('change');
        $rule.find('[name=coord_2]').val(val[1]);
      }
    }
  }]
});

// set rules
$('#set').on('click', function() {
  $('#builder').queryBuilder('setRules', {
    condition: 'OR',
    rules: [{
      id: 'date',
      operator: 'equal',
      value: '1991/11/17'
    }, {
      id: 'rate',
      operator: 'equal',
      value: 22
    }, {
      id: 'category',
      operator: 'equal',
      value: '38'
    }, {
      condition: 'AND',
      rules: [{
        id: 'coord',
        operator: 'equal',
        value: 'B.3'
      }]
    }]
  });

  $('#parse').trigger('click');
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