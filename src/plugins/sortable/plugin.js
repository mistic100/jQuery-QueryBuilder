/*!
 * jQuery QueryBuilder Sortable
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";

    $.fn.queryBuilder.define('sortable', function(options) {
        options = $.extend({
            default_no_sortable: false,
            icon: 'glyphicon glyphicon-sort'
        }, options || {});

        /**
         * Init HTML5 drag and drop
         */
        this.on('afterInit', function() {
            // configure jQuery to use dataTransfer
            $.event.props.push('dataTransfer');

            var placeholder, src,
                that = this;

            // only add "draggable" attribute when hovering drag handle
            // preventing text select bug in Firefox
            this.$el.on('mouseover', '.drag-handle', function() {
                that.$el.find('.rule-container, .rules-group-container').attr('draggable', true);
            });
            this.$el.on('mouseout', '.drag-handle', function() {
                that.$el.find('.rule-container, .rules-group-container').removeAttr('draggable');
            });

            // dragstart: create placeholder and hide current element
            this.$el.on('dragstart', '[draggable]', function(e) {
                e.stopPropagation();

                // notify drag and drop (only dummy text)
                e.dataTransfer.setData('text', 'drag');

                src = $(e.target);

                placeholder = $('<div class="rule-placeholder">&nbsp;</div>');
                placeholder.css('min-height', src.height());
                placeholder.insertAfter(src);

                // Chrome glitch (helper invisible if hidden immediately)
                setTimeout(function() {
                    src.hide();
                }, 0);
            });

            // dragenter: move the placeholder
            this.$el.on('dragenter', '[draggable]', function(e) {
                e.preventDefault();
                e.stopPropagation();

                moveSortableToTarget(placeholder, $(e.target));
            });

            // dragover: prevent glitches
            this.$el.on('dragover', '[draggable]', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            // drop: move current element
            this.$el.on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();

                moveSortableToTarget(src, $(e.target));
            });

            // dragend: show current element and delete placeholder
            this.$el.on('dragend', '[draggable]', function(e) {
                e.preventDefault();
                e.stopPropagation();

                src.show();
                placeholder.remove();

                src = placeholder = null;

                that.$el.find('.rule-container, .rules-group-container').removeAttr('draggable');
            });
        });

        /**
         * Remove drag handle from non-sortable rules
         */
        this.on('getRuleFlags', function(flags) {
            if (flags.no_sortable === undefined) {
                flags.no_sortable = options.default_no_sortable;
            }

            return flags;
        });

        this.on('afterApplyRuleFlags', function($rule, rule, flags) {
            if (flags.no_sortable) {
                $rule.find('.drag-handle').remove();
            }
        });

        /**
         * Modify templates
         */
        this.on('getGroupTemplate', function(h, level) {
            if (level>1) {
                var $h = $(h);
                $h.find('.group-conditions').after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
                h = $h.prop('outerHTML');
            }

            return h;
        });

        this.on('getRuleTemplate', function(h) {
            var $h = $(h);
            $h.find('.rule-header').after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
            return $h.prop('outerHTML');
        });
    });

    /**
     * Move an element (placeholder or actual object) depending on active target
     */
    function moveSortableToTarget(element, target) {
        var parent;

        // on rule
        parent = target.closest('.rule-container');
        if (parent.length) {
            element.detach().insertAfter(parent);
            return;
        }

        // on group header
        parent = target.closest('.rules-group-header');
        if (parent.length) {
            parent = target.closest('.rules-group-container');
            element.detach().prependTo(parent.find('.rules-list').eq(0));
            return;
        }

        // on group
        parent = target.closest('.rules-group-container');
        if (parent.length) {
            element.detach().appendTo(parent.find('.rules-list').eq(0));
            return;
        }
    }

}(jQuery));