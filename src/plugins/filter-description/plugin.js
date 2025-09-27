/**
 * @class FilterDescription
 * @memberof module:plugins
 * @description Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
 * @param {object} [options]
 * @param {string} [options.icon='bi-info-circle-fill']
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
        // Helper function to safely access Bootstrap Popover
        var getBootstrapPopover = function() {
            var bootstrapObj = null;
            try {
                if (typeof window !== 'undefined' && window.bootstrap && typeof window.bootstrap.Popover === 'function') {
                    return window.bootstrap.Popover;
                } else if (typeof bootstrap !== 'undefined' && typeof bootstrap.Popover === 'function') {
                    return bootstrap.Popover;
                }
            } catch (e) {
                // Handle any errors silently
            }

            // If we get here, Bootstrap Popover is not available
            throw new Error('Bootstrap Popover is not available. Make sure Bootstrap 5 is loaded.');
        };

        this.on('afterUpdateRuleFilter afterUpdateRuleOperator', function(e, rule) {
            var $b = rule.$el.find('button.filter-description');
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
                $b.hide();

                // Hide existing popover using Bootstrap 5 API
                try {
                    var PopoverClass = getBootstrapPopover();
                    var existingPopover = PopoverClass.getInstance($b.get(0));
                    if (existingPopover) {
                        existingPopover.hide();
                    }
                } catch (e) {
                    console.warn('Failed to hide popover:', e.message);
                }
            }
            else {
                if ($b.length === 0) {
                    $b = $($.parseHTML('<button type="button" class="btn btn-sm btn-info filter-description" data-bs-toggle="popover"><i class="' + options.icon + '"></i></button>'));
                    $b.prependTo(rule.$el.find(QueryBuilder.selectors.rule_actions));

                    // Create Bootstrap 5 popover
                    try {
                        var PopoverClass = getBootstrapPopover();
                        var popover = new PopoverClass($b.get(0), {
                            placement: 'left',
                            container: 'body',
                            html: true,
                            content: description
                        });

                        $b.on('mouseout', function() {
                            popover.hide();
                        });
                    } catch (e) {
                        console.warn('Failed to create popover:', e.message);
                    }
                }
                else {
                    $b.css('display', '');

                    // Update existing popover content
                    try {
                        var PopoverClass = getBootstrapPopover();
                        var existingPopover = PopoverClass.getInstance($b.get(0));
                        if (existingPopover) {
                            // Dispose and recreate with new content (Bootstrap 5 doesn't have easy content update)
                            existingPopover.dispose();
                            var newPopover = new PopoverClass($b.get(0), {
                                placement: 'left',
                                container: 'body',
                                html: true,
                                content: description
                            });

                            $b.on('mouseout', function() {
                                newPopover.hide();
                            });
                        }
                    } catch (e) {
                        console.warn('Failed to update popover:', e.message);
                    }
                }

                // Show popover if it should be visible
                if ($b.attr('aria-describedby')) {
                    try {
                        var PopoverClass = getBootstrapPopover();
                        var currentPopover = PopoverClass.getInstance($b.get(0));
                        if (currentPopover) {
                            currentPopover.show();
                        }
                    } catch (e) {
                        console.warn('Failed to show popover:', e.message);
                    }
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
                    $b = $($.parseHTML('<button type="button" class="btn btn-sm btn-info filter-description" data-bs-toggle="bootbox"><i class="' + options.icon + '"></i></button>'));
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
    icon: 'bi-info-circle-fill',
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
