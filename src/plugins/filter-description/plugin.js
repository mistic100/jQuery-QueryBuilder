/*!
 * jQuery QueryBuilder Filter Description
 * Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

/**
 * @throws ConfigError
 */
QueryBuilder.define('filter-description', function(options) {
    /**
     * INLINE
     */
    if (options.mode === 'inline') {
        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $p = rule.$el.find('p.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $p.hide();
            }
            else {
                if ($p.length === 0) {
                    $p = $('<p class="filter-description"></p>');
                    $p.appendTo(rule.$el);
                }
                else {
                    $p.show();
                }

                $p.html('<i class="' + options.icon + '"></i> ' + rule.filter.description);
            }
        });
    }
    /**
     * POPOVER
     */
    else if (options.mode === 'popover') {
        if (!$.fn.popover || !$.fn.popover.Constructor || !$.fn.popover.Constructor.prototype.fixTitle) {
            Utils.error('MissingLibrary', 'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com');
        }

        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $b.hide();

                if ($b.data('bs.popover')) {
                    $b.popover('hide');
                }
            }
            else {
                if ($b.length === 0) {
                    $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + options.icon + '"></i></button>');
                    $b.prependTo(rule.$el.find(Selectors.rule_actions));

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

                $b.data('bs.popover').options.content = rule.filter.description;

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
        if (!('bootbox' in window)) {
            Utils.error('MissingLibrary', 'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com');
        }

        this.on('afterUpdateRuleFilter', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');

            if (!rule.filter || !rule.filter.description) {
                $b.hide();
            }
            else {
                if ($b.length === 0) {
                    $b = $('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' + options.icon + '"></i></button>');
                    $b.prependTo(rule.$el.find(Selectors.rule_actions));

                    $b.on('click', function() {
                        bootbox.alert($b.data('description'));
                    });
                }

                $b.data('description', rule.filter.description);
            }
        });
    }
}, {
    icon: 'glyphicon glyphicon-info-sign',
    mode: 'popover'
});