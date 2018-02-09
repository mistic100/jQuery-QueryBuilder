/**
 * @class ChosenSelectpicker
 * @memberof module:plugins
 * @descriptioon Applies chosen-js Select on filters and operators combo-boxes.
 * @param {object} [options] Supports all the options for chosen
 * @throws MissingLibraryError
 */
QueryBuilder.define('chosen-selectpicker', function(options) {

    //Checking if bootstrap select is already chosen as a plugin
    if($.fn.selectpicker){
        console.warn('Plugin Conflict', 'Bootstrap select is already selected as a plugin. chosen-selectpicker plugin is exiting');
        return;
    }

    if (!$.fn.chosen) {
        Utils.error('MissingLibrary', ' chosen is required to use "chosen-selectpicker" plugin. Get it here: https://github.com/harvesthq/chosen');
    }

    var Selectors = QueryBuilder.selectors;
    console.log('Selectors->', QueryBuilder.selectors);    
    console.log('Selectors->', QueryBuilder.plugins);    
    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').chosen();
        console.log(rule.$el.find(Selectors.rule_filter).children());
        console.log(rule.$el);
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
});
