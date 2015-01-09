/*!
 * jQuery QueryBuilder Bootstrap Selectpicker
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";

    $.fn.queryBuilder.define('bt-selectpicker', function(options) {
        if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
            $.error('Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');
        }
        
        options = $.extend({
            container: 'body',
            style: 'btn-inverse btn-xs',
            width: 'auto',
            showIcon: false
        }, options || {});

        // init selectpicker on filters
        this.on('afterAddRule', function($rule) {
            $rule.find('.rule-filter-container select').selectpicker(options);
        });

        // init selectpicker on operators
        this.on('afterCreateRuleOperators', function($rule) {
            $rule.find('.rule-operator-container select').selectpicker(options);
        });
    });

}(jQuery));