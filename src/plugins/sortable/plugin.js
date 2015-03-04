/*!
 * jQuery QueryBuilder Sortable
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

QueryBuilder.define('sortable', function(options) {
    options = $.extend({
        default_no_sortable: false,
        icon: 'glyphicon glyphicon-sort'
    }, options);

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

            src = Model(e.target);

            var ph = $('<div class="rule-placeholder">&nbsp;</div>');
            ph.css('min-height', src.$el.height());

            placeholder = src.parent.addRule(ph, src.getPos());

            // Chrome glitch (helper invisible if hidden immediately)
            setTimeout(function() {
                src.$el.hide();
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

            src.$el.show();
            placeholder.drop();

            src = placeholder = null;

            that.$el.find('.rule-container, .rules-group-container').removeAttr('draggable');
        });
    });

    /**
     * Remove drag handle from non-sortable rules
     */
    this.on('parseRuleFlags', function(flags) {
        if (flags.no_sortable === undefined) {
            flags.no_sortable = options.default_no_sortable;
        }
        return flags;
    });

    this.on('afterApplyRuleFlags', function(rule) {
        if (rule.flags.no_sortable) {
            rule.$el.find('.drag-handle').remove();
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
 * @param {Node}
 * @param {jQuery}
 */
function moveSortableToTarget(element, target) {
    var parent;

    // on rule
    parent = target.closest('.rule-container');
    if (parent.length) {
        element.moveAfter(Model(parent));
        return;
    }

    // on group header
    parent = target.closest('.rules-group-header');
    if (parent.length) {
        parent = target.closest('.rules-group-container');
        element.moveAtBegin(Model(parent));
        return;
    }

    // on group
    parent = target.closest('.rules-group-container');
    if (parent.length) {
        element.moveAtEnd(Model(parent));
        return;
    }
}