/*!
 * jQuery QueryBuilder Typeahead Description
 * Extends text input fields to provide typeahead options
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define( 'bootstrap3-typeahead', function(options) {
    this.on('afterCreateRuleInput', function(e, rule) {
        if (rule.__.filter.typeahead) {
            var inputField = '#' + rule.id + ' .rule-value-container .form-control';
            var $inputField = $(inputField);

            // we need Bootstrap-3-Typeahead
            if (!('typeahead' in $inputField)) {
                Utils.error('MissingLibrary', 'Bootstrap-3-Typeahead is not loaded. Get it here https://github.com/bassjobsen/Bootstrap-3-Typeahead/');
            }

            var allOptions = $.extend({}, options, rule.__.filter.typeahead);

            $inputField.attr('autocomplete', 'off');
            $inputField.typeahead(allOptions);
        }
    });
} );
