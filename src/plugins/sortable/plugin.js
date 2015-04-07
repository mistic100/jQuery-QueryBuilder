/*!
 * jQuery QueryBuilder Sortable
 * Enables drag & drop sort of rules.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

QueryBuilder.define('sortable', function(options) {
    /**
     * Init HTML5 drag and drop
     */
    this.on('afterInit', function(e) {
        // configure jQuery to use dataTransfer
        $.event.props.push('dataTransfer');

        var placeholder, src,
            self = e.builder;

        // only add "draggable" attribute when hovering drag handle
        // preventing text select bug in Firefox
        self.$el.on('mouseover', '.drag-handle', function() {
            self.$el.find('.rule-container, .rules-group-container').attr('draggable', true);
        });
        self.$el.on('mouseout', '.drag-handle', function() {
            self.$el.find('.rule-container, .rules-group-container').removeAttr('draggable');
        });

        // dragstart: create placeholder and hide current element
        self.$el.on('dragstart', '[draggable]', function(e) {
            e.stopPropagation();

            // notify drag and drop (only dummy text)
            e.dataTransfer.setData('text', 'drag');

            src = Model(e.target);

            // Chrome glitchs
            // - helper invisible if hidden immediately
            // - "dragend" is called immediately if we modify the DOM directly
            setTimeout(function() {
                var ph = $('<div class="rule-placeholder">&nbsp;</div>');
                ph.css('min-height', src.$el.height());

                placeholder = src.parent.addRule(ph, src.getPos());

                src.$el.hide();
            }, 0);
        });

        // dragenter: move the placeholder
        self.$el.on('dragenter', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (placeholder) {
                moveSortableToTarget(placeholder, $(e.target));
            }
        });

        // dragover: prevent glitches
        self.$el.on('dragover', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // drop: move current element
        self.$el.on('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();

            moveSortableToTarget(src, $(e.target));
        });

        // dragend: show current element and delete placeholder
        self.$el.on('dragend', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            src.$el.show();
            placeholder.drop();

            src = placeholder = null;

            self.$el.find('.rule-container, .rules-group-container').removeAttr('draggable');
        });
    });

    /**
     * Remove drag handle from non-sortable rules
     */
    this.on('parseRuleFlags.filter', function(flags) {
        if (flags.value.no_sortable === undefined) {
            flags.value.no_sortable = options.default_no_sortable;
        }
    });

    this.on('afterApplyRuleFlags', function(e, rule) {
        if (rule.flags.no_sortable) {
            rule.$el.find('.drag-handle').remove();
        }
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        if (level>1) {
            var $h = $(h.value);
            $h.find('.group-conditions').after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
            h.value = $h.prop('outerHTML');
        }
    });

    this.on('getRuleTemplate.filter', function(h) {
        var $h = $(h.value);
        $h.find('.rule-header').after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
        h.value = $h.prop('outerHTML');
    });
}, {
    default_no_sortable: false,
    icon: 'glyphicon glyphicon-sort'
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