/*!
 * jQuery QueryBuilder Bootstrap Selectpicker
 * Applies Bootstrap Select on filters and operators combo-boxes.
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('bt-selectpicker', function(options) {
    if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
        Utils.error('MissingLibrary', 'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
    }

    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').selectpicker(options);
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').selectpicker(options);
    });

    // update selectpicker on change
    this.on('afterUpdateRuleFilter', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker('render');
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).selectpicker('render');
    });
}, {
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});
