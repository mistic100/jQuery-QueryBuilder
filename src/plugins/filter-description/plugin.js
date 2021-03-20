/**
 * @class FilterDescription
 * @memberof module:plugins
 * @description Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
 * @param {object} [options]
 * @param {string} [options.icon='glyphicon glyphicon-info-sign']
 * @param {string} [options.mode='popover'] - inline, popover or bootbox
 * @throws ConfigError
 */
QueryBuilder.define('filter-description', function(options) {
    // INLINE
    if (options.mode === 'inline') {
        this.on('afterUpdateRuleFilter afterUpdateRuleOperator', function(e, rule) {
            var $p = rule.$el.find('p.filter-description');
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
                $p.hide();
            }
            else {
                if ($p.length === 0) {
                    $p = $($.parseHTML('<p class="filter-description"></p>'));
                    $p.appendTo(rule.$el);
                }
                else {
                    $p.css('display', '');
                }

                $p.html('<i class="' + options.icon + '"></i> ' + description);
            }
        });
    }
    // POPOVER
    else if (options.mode === 'popover') {
        if (!$.fn.popover || !$.fn.popover.Constructor || !$.fn.popover.Constructor.prototype.fixTitle) {
            Utils.error('MissingLibrary', 'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com');
        }

        this.on('afterUpdateRuleFilter afterUpdateRuleOperator', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
                $b.hide();

                if ($b.data('bs.popover')) {
                    $b.popover('hide');
                }
            }
            else {
                if ($b.length === 0) {
                    $b = $($.parseHTML('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' + options.icon + '"></i></button>'));
                    $b.prependTo(rule.$el.find(QueryBuilder.selectors.rule_actions));

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
                    $b.css('display', '');
                }

                $b.data('bs.popover').options.content = description;

                if ($b.attr('aria-describedby')) {
                    $b.popover('show');
                }
            }
        });
    }
    // BOOTBOX
    else if (options.mode === 'bootbox') {
        if (!('bootbox' in window)) {
            Utils.error('MissingLibrary', 'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com');
        }

        this.on('afterUpdateRuleFilter afterUpdateRuleOperator', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
                $b.hide();
            }
            else {
                if ($b.length === 0) {
                    $b = $($.parseHTML('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' + options.icon + '"></i></button>'));
                    $b.prependTo(rule.$el.find(QueryBuilder.selectors.rule_actions));

                    $b.on('click', function() {
                        bootbox.alert($b.data('description'));
                    });
                }
                else {
                    $b.css('display', '');
                }

                $b.data('description', description);
            }
        });
    }
}, {
    icon: 'glyphicon glyphicon-info-sign',
    mode: 'popover'
});

QueryBuilder.extend(/** @lends module:plugins.FilterDescription.prototype */ {
    /**
     * Returns the description of a filter for a particular rule (if present)
     * @param {object} filter
     * @param {Rule} [rule]
     * @returns {string}
     * @private
     */
    getFilterDescription: function(filter, rule) {
        if (!filter) {
            return undefined;
        }
        else if (typeof filter.description == 'function') {
            return filter.description.call(this, rule);
        }
        else {
            return filter.description;
        }
    }
});
