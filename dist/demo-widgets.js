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

        that.refreshOptions();
      }
    },
    onAfterCreateRuleInput: function($rule) {
      $rule.find('.rule-value-container').css('min-width', '200px');
    },
    onAfterSetValue: function($rule, value) {
      var selectize = $rule.find('.rule-value-container input')[0].selectize;
      selectize.setValue(value);
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