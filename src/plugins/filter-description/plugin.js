/*!
 * jQuery QueryBuilder Filter Description
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";

    $.fn.queryBuilder.define('filter-description', function(options) {
        options = $.extend({
            icon: 'glyphicon glyphicon-info-sign',
            mode: 'popover'
        }, options || {});

        /**
         * INLINE
         */
        if (options.mode === 'inline') {
            this.on('afterUpdateRuleFilter', function($rule, filter) {
                var $p = $rule.find('p.filter-description');

                if (!filter || !filter.description) {
                    $p.hide();
                }
                else {
                    if ($p.length === 0) {
                        $p = $('<p class="filter-description"></p>');
                        $p.appendTo($rule);
                    }
                    else {
                        $p.show();
                    }

                    $p.html('<i class="' + options.icon + '"></i> ' + filter.description);
                }
            });
        }
        /**
         * POPOVER
         */
        else if (options.mode === 'popover') {
            if (!$.fn.popover || !$.fn.popover.Constructor || !$.fn.popover.Constructor.prototype.fixTitle) {
                $.error('Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com');
            }

            this.on('afterUpdateRuleFilter', function($rule, filter) {
                var $b = $rule.find('button.filter-description');

                if (!filter || !filter.description) {
                    $b.hide();

                    if ($b.data('bs.popover')) {
                        $b.popover('hide');
                    }
                }
                else {
                    if ($b.length === 0) {
                        $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + options.icon + '"></i></button>');
                        $b.prependTo($rule.find('.rule-actions'));

                        $b.popover({
                            placement: 'left',
                            container: 'body',
                            html: true
                        });

                        $b.on('mouseout', function() {
                            $b.popover('hide');
                        });
                    }
                    else {
                        $b.show();
                    }

                    $b.data('bs.popover').options.content = filter.description;

                    if ($b.attr('aria-describedby')) {
                        $b.popover('show');
                    }
                }
            });
        }
        /**
         * BOOTBOX
         */
        else if (options.mode === 'bootbox') {
            if (!window.bootbox) {
                $.error('Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com');
            }

            this.on('afterUpdateRuleFilter', function($rule, filter) {
                var $b = $rule.find('button.filter-description');

                if (!filter || !filter.description) {
                    $b.hide();
                }
                else {
                    if ($b.length === 0) {
                        $b = $('<button type="button" class="btn btn-xs btn-info filter-description"><i class="' + options.icon + '"></i></button>');
                        $b.prependTo($rule.find('.rule-actions'));

                        $b.on('click', function() {
                            bootbox.alert($b.data('description'));
                        });
                    }

                    $b.data('description', filter.description);
                }
            });
        }
    });

}(jQuery));