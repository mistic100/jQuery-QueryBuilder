/*!
 * jQuery QueryBuilder Sortable
 * Enables drag & drop sort of rules.
 * Copyright 2014-2015 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 */

Selectors.rule_and_group_containers = Selectors.rule_container + ', ' + Selectors.group_container;

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
        self.$el.on('mouseover.queryBuilder', '.drag-handle', function() {
            self.$el.find(Selectors.rule_and_group_containers).attr('draggable', true);
        });
        self.$el.on('mouseout.queryBuilder', '.drag-handle', function() {
            self.$el.find(Selectors.rule_and_group_containers).removeAttr('draggable');
        });

        // dragstart: create placeholder and hide current element
        self.$el.on('dragstart.queryBuilder', '[draggable]', function(e) {
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
        self.$el.on('dragenter.queryBuilder', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (placeholder) {
                moveSortableToTarget(placeholder, $(e.target));
            }
        });

        // dragover: prevent glitches
        self.$el.on('dragover.queryBuilder', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // drop: move current element
        self.$el.on('drop.queryBuilder', function(e) {
            e.preventDefault();
            e.stopPropagation();

            moveSortableToTarget(src, $(e.target));
        });

        // dragend: show current element and delete placeholder
        self.$el.on('dragend.queryBuilder', '[draggable]', function(e) {
            e.preventDefault();
            e.stopPropagation();

            src.$el.show();
            placeholder.drop();

            src = placeholder = null;

            self.$el.find(Selectors.rule_and_group_containers).removeAttr('draggable');
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
            $h.find(Selectors.condition_container).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
            h.value = $h.prop('outerHTML');
        }
    });

    this.on('getRuleTemplate.filter', function(h) {
        var $h = $(h.value);
        $h.find(Selectors.rule_header).after('<div class="drag-handle"><i class="' + options.icon + '"></i></div>');
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
    parent = target.closest(Selectors.rule_container);
    if (parent.length) {
        element.moveAfter(Model(parent));
        return;
    }

    // on group header
    parent = target.closest(Selectors.group_header);
    if (parent.length) {
        parent = target.closest(Selectors.group_container);
        element.moveAtBegin(Model(parent));
        return;
    }

    // on group
    parent = target.closest(Selectors.group_container);
    if (parent.length) {
        element.moveAtEnd(Model(parent));
        return;
    }
}