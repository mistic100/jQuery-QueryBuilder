/**
 * @class BtSelectpicker
 * @memberof module:plugins
 * @descriptioon Applies Bootstrap Select on filters and operators combo-boxes.
 * @param {object} [options]
 * @param {string} [options.container='body']
 * @param {string} [options.style='btn-inverse btn-xs']
 * @param {int|string} [options.width='auto']
 * @param {boolean} [options.showIcon=false]
 * @throws MissingLibraryError
 */
QueryBuilder.define('chosen-selectpicker', function(options) {
    if (!$.fn.chosen) {
        Utils.error('MissingLibrary', ' chosen is required to use "chosen-selectpicker" plugin. Get it here: https://github.com/harvesthq/chosen');
    }

    var Selectors = QueryBuilder.selectors;
    
        console.log(options)
    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        options.liveSearch = true;    
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').chosen();
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').chosen();
    });

    // update selectpicker on change
    this.on('afterUpdateRuleFilter', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).trigger("chosen:updated");
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).trigger("chosen:updated");

    });

    this.on('beforeDeleteRule', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).chosen('destroy');
        rule.$el.find(Selectors.rule_operator).chosen('destroy');
    });
}, {
    container: 'body',
    style: 'btn-inverse btn-xs',
    width: 'auto',
    showIcon: false
});
