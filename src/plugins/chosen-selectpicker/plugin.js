/**
 * @class ChosenSelectpicker
 * @memberof module:plugins
 * @descriptioon Applies chosen-js Select on filters and operators combo-boxes.
 * @param {object} [options] Supports all the options for chosen
 * @throws MissingLibraryError
 */
QueryBuilder.define('chosen-selectpicker', function(options) {

    if (!$.fn.chosen) {
        Utils.error('MissingLibrary', 'chosen is required to use "chosen-selectpicker" plugin. Get it here: https://github.com/harvesthq/chosen');
    }

    if (this.settings.plugins['bt-selectpicker']) {
        Utils.error('Conflict', 'bt-selectpicker is already selected as the dropdown plugin. Please remove chosen-selectpicker from the plugin list');
    }

    var Selectors = QueryBuilder.selectors;

    // init selectpicker
    this.on('afterCreateRuleFilters', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).removeClass('form-control').chosen(options);
    });

    this.on('afterCreateRuleOperators', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).removeClass('form-control').chosen(options);
    });

    // update selectpicker on change
    this.on('afterUpdateRuleFilter', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).trigger('chosen:updated');
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        rule.$el.find(Selectors.rule_operator).trigger('chosen:updated');
    });

    this.on('beforeDeleteRule', function(e, rule) {
        rule.$el.find(Selectors.rule_filter).chosen('destroy');
        rule.$el.find(Selectors.rule_operator).chosen('destroy');
    });
});
