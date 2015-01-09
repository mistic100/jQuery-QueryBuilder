/*!
 * jQuery QueryBuilder Sortable
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

(function($){
    "use strict";

    $.fn.queryBuilder.defaults.set({
        default_rule_flags: {
            no_sortable: false
        },
        icons: {
            sort: 'glyphicon glyphicon-sort'
        }
    });

    $.fn.queryBuilder.define('sortable', function(options) {
        /**
         * Init HTML5 drag and drop
         */
        this.on('afterInit', function() {
            // configure jQuery to use dataTransfer
            $.event.props.push('dataTransfer');

            var placeholder, src, isHandle = false;

            // only init drag from drag handle
            this.$el.on('mousedown', '.drag-handle', function(e) {
                isHandle = true;
            });
            this.$el.on('mouseup', '.drag-handle', function(e) {
                isHandle = false;
            });

            // dragstart: create placeholder and hide current element
            this.$el.on('dragstart', '[draggable]', function(e) {
                e.stopPropagation();

                if (isHandle) {
                    isHandle = false;

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
                }
                else {
                    e.preventDefault();
                }
            });

            // dragenter: move the placeholder
            this.$el.on('dragenter', '[draggable]', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var target = $(e.target), parent;

                // on rule
                parent = target.closest('.rule-container');
                if (parent.length) {
                    placeholder.detach().insertAfter(parent);
                    return;
                }

                // on group header
                parent = target.closest('.rules-group-header');
                if (parent.length) {
                    parent = target.closest('.rules-group-container');
                    placeholder.detach().prependTo(parent.find('.rules-list').eq(0));
                    return;
                }

                // on group
                parent = target.closest('.rules-group-container');
                if (parent.length) {
                    placeholder.detach().appendTo(parent.find('.rules-list').eq(0));
                    return;
                }
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

                var target = $(e.target), parent;

                // on rule
                parent = target.closest('.rule-container');
                if (parent.length) {
                    src.detach().insertAfter(parent);
                    return;
                }

                // on group header
                parent = target.closest('.rules-group-header');
                if (parent.length) {
                    parent = target.closest('.rules-group-container');
                    src.detach().prependTo(parent.find('.rules-list').eq(0));
                    return;
                }

                // on group
                parent = target.closest('.rules-group-container');
                if (parent.length) {
                    src.detach().appendTo(parent.find('.rules-list').eq(0));
                    return;
                }
            });

            // dragend: show current element and delete placeholder
            this.$el.on('dragend', '[draggable]', function(e) {
                e.preventDefault();
                e.stopPropagation();

                src.show();
                placeholder.remove();
            });
        });

        /**
         * Remove drag handle from non-sortable rules
         */
        this.on('afterApplyRuleFlags', function($rule, rule, flags) {
            if (flags.no_sortable) {
                $rule.removeAttr('draggable').find('.drag-handle').remove();
            }
        });

        /**
         * Modify templates
         */
        this.on('getGroupTemplate', function(h, level) {
            if (level>1) {
                var $h = $(h);

                $h.attr('draggable', 'true')
                  .find('.group-conditions').after('<div class="drag-handle"><i class="' + this.icons.sort + '"></i></div>');

                h = $h.prop('outerHTML');
            }

            return h;
        });

        this.on('getRuleTemplate', function(h) {
            var $h = $(h);

            $h.attr('draggable', 'true')
              .find('.rule-header').after('<div class="drag-handle"><i class="' + this.icons.sort + '"></i></div>');

            return $h.prop('outerHTML');
        });
    });

}(jQuery));