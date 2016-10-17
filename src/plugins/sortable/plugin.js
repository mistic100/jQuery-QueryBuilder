/*!
 * jQuery QueryBuilder Sortable
 * Enables drag & drop sort of rules.
 */

Selectors.rule_and_group_containers = Selectors.rule_container + ', ' + Selectors.group_container;
Selectors.drag_handle = '.drag-handle';

QueryBuilder.define('sortable', function(options) {
    if (!('interact' in window)) {
        Utils.error('MissingLibrary', 'interact.js is required to use "sortable" plugin. Get it here: http://interactjs.io');
    }

    // recompute drop-zones during drag (when a rule is hidden)
    interact.dynamicDrop(true);

    // set move threshold to 10px
    interact.pointerMoveTolerance(10);

    var placeholder;
    var ghost;
    var src;

    /**
     * Init drag and drop
     */
    this.on('afterAddRule afterAddGroup', function(e, node) {
        if (node == placeholder) {
            return;
        }

        /**
         * Configure drag
         */
        interact(node.$el[0])
            .allowFrom(Selectors.drag_handle)
            .draggable({
                onstart: function(event) {
                    // get model of dragged element
                    src = Model(event.target);

                    // create ghost
                    ghost = src.$el.clone()
                        .appendTo(src.$el.parent())
                        .width(src.$el.outerWidth())
                        .addClass('dragging');

                    // create drop placeholder
                    var ph = $('<div class="rule-placeholder">&nbsp;</div>')
                        .height(src.$el.outerHeight());

                    placeholder = src.parent.addRule(ph, src.getPos());

                    // hide dragged element
                    src.$el.hide();
                },
                onmove: function(event) {
                    // make the ghost follow the cursor
                    ghost[0].style.top = event.clientY - 15 + 'px';
                    ghost[0].style.left = event.clientX - 15 + 'px';
                },
                onend: function(event) {
                    // remove ghost
                    ghost.remove();
                    ghost = undefined;

                    // remove placeholder
                    placeholder.drop();
                    placeholder = undefined;

                    // show element
                    src.$el.show();
                }
            });

        /**
         * Configure drop on groups and rules
         */
        interact(node.$el[0])
            .dropzone({
                accept: Selectors.rule_and_group_containers,
                ondragenter: function(event) {
                    moveSortableToTarget(placeholder, $(event.target));
                },
                ondrop: function(event) {
                    moveSortableToTarget(src, $(event.target));
                }
            });

        /**
         * Configure drop on group headers
         */
        if (node instanceof Group) {
            interact(node.$el.find(Selectors.group_header)[0])
                .dropzone({
                    accept: Selectors.rule_and_group_containers,
                    ondragenter: function(event) {
                        moveSortableToTarget(placeholder, $(event.target));
                    },
                    ondrop: function(event) {
                        moveSortableToTarget(src, $(event.target));
                    }
                });
        }
    });

    /**
     * Detach interactables
     */
    this.on('beforeDeleteRule beforeDeleteGroup', function(e, node) {
        if (!e.isDefaultPrevented()) {
            interact(node.$el[0]).unset();

            if (node instanceof Group) {
                interact(node.$el.find(Selectors.group_header)[0]).unset();
            }
        }
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
     * Remove drag handle from non-sortable groups
     */
    this.on('parseGroupFlags.filter', function(flags) {
        if (flags.value.no_sortable === undefined) {
            flags.value.no_sortable = options.default_no_sortable;
        }
    });

    this.on('afterApplyGroupFlags', function(e, group) {
        if (group.flags.no_sortable) {
            group.$el.find('.drag-handle').remove();
        }
    });

    /**
     * Modify templates
     */
    this.on('getGroupTemplate.filter', function(h, level) {
        if (level > 1) {
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
 * @param {Node} node
 * @param {jQuery} target
 */
function moveSortableToTarget(node, target) {
    var parent;

    // on rule
    parent = target.closest(Selectors.rule_container);
    if (parent.length) {
        node.moveAfter(Model(parent));
        return;
    }

    // on group header
    parent = target.closest(Selectors.group_header);
    if (parent.length) {
        parent = target.closest(Selectors.group_container);
        node.moveAtBegin(Model(parent));
        return;
    }

    // on group
    parent = target.closest(Selectors.group_container);
    if (parent.length) {
        node.moveAtEnd(Model(parent));
        return;
    }
}
