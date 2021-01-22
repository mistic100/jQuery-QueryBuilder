/**
 * Main object storing data model and emitting model events
 * @constructor
 */
function Model() {
    /**
     * @member {Group}
     * @readonly
     */
    this.root = null;

    /**
     * Base for event emitting
     * @member {jQuery}
     * @readonly
     * @private
     */
    this.$ = $(this);
}

$.extend(Model.prototype, /** @lends Model.prototype */ {
    /**
     * Triggers an event on the model
     * @param {string} type
     * @returns {$.Event}
     */
    trigger: function(type) {
        var event = new $.Event(type);
        this.$.triggerHandler(event, Array.prototype.slice.call(arguments, 1));
        return event;
    },

    /**
     * Attaches an event listener on the model
     * @param {string} type
     * @param {function} cb
     * @returns {Model}
     */
    on: function() {
        this.$.on.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    },

    /**
     * Removes an event listener from the model
     * @param {string} type
     * @param {function} [cb]
     * @returns {Model}
     */
    off: function() {
        this.$.off.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    },

    /**
     * Attaches an event listener called once on the model
     * @param {string} type
     * @param {function} cb
     * @returns {Model}
     */
    once: function() {
        this.$.one.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
    }
});


/**
 * Root abstract object
 * @constructor
 * @param {Node} [parent]
 * @param {jQuery} $el
 */
var Node = function(parent, $el) {
    if (!(this instanceof Node)) {
        return new Node(parent, $el);
    }

    Object.defineProperty(this, '__', { value: {} });

    $el.data('queryBuilderModel', this);

    /**
     * @name level
     * @member {int}
     * @memberof Node
     * @instance
     * @readonly
     */
    this.__.level = 1;

    /**
     * @name error
     * @member {string}
     * @memberof Node
     * @instance
     */
    this.__.error = null;

    /**
     * @name flags
     * @member {object}
     * @memberof Node
     * @instance
     * @readonly
     */
    this.__.flags = {};

    /**
     * @name data
     * @member {object}
     * @memberof Node
     * @instance
     */
    this.__.data = undefined;

    /**
     * @member {jQuery}
     * @readonly
     */
    this.$el = $el;

    /**
     * @member {string}
     * @readonly
     */
    this.id = $el[0].id;

    /**
     * @member {Model}
     * @readonly
     */
    this.model = null;

    /**
     * @member {Group}
     * @readonly
     */
    this.parent = parent;
};

Utils.defineModelProperties(Node, ['level', 'error', 'data', 'flags']);

Object.defineProperty(Node.prototype, 'parent', {
    enumerable: true,
    get: function() {
        return this.__.parent;
    },
    set: function(value) {
        this.__.parent = value;
        this.level = value === null ? 1 : value.level + 1;
        this.model = value === null ? null : value.model;
    }
});

/**
 * Checks if this Node is the root
 * @returns {boolean}
 */
Node.prototype.isRoot = function() {
    return (this.level === 1);
};

/**
 * Returns the node position inside its parent
 * @returns {int}
 */
Node.prototype.getPos = function() {
    if (this.isRoot()) {
        return -1;
    }
    else {
        return this.parent.getNodePos(this);
    }
};

/**
 * Deletes self
 * @fires Model.model:drop
 */
Node.prototype.drop = function() {
    var model = this.model;

    if (!!this.parent) {
        this.parent.removeNode(this);
    }

    this.$el.removeData('queryBuilderModel');

    if (model !== null) {
        /**
         * After a node of the model has been removed
         * @event model:drop
         * @memberof Model
         * @param {Node} node
         */
        model.trigger('drop', this);
    }
};

/**
 * Moves itself after another Node
 * @param {Node} target
 * @fires Model.model:move
 */
Node.prototype.moveAfter = function(target) {
    if (!this.isRoot()) {
        this.move(target.parent, target.getPos() + 1);
    }
};

/**
 * Moves itself at the beginning of parent or another Group
 * @param {Group} [target]
 * @fires Model.model:move
 */
Node.prototype.moveAtBegin = function(target) {
    if (!this.isRoot()) {
        if (target === undefined) {
            target = this.parent;
        }

        this.move(target, 0);
    }
};

/**
 * Moves itself at the end of parent or another Group
 * @param {Group} [target]
 * @fires Model.model:move
 */
Node.prototype.moveAtEnd = function(target) {
    if (!this.isRoot()) {
        if (target === undefined) {
            target = this.parent;
        }

        this.move(target, target.length() === 0 ? 0 : target.length() - 1);
    }
};

/**
 * Moves itself at specific position of Group
 * @param {Group} target
 * @param {int} index
 * @fires Model.model:move
 */
Node.prototype.move = function(target, index) {
    if (!this.isRoot()) {
        if (typeof target === 'number') {
            index = target;
            target = this.parent;
        }

        this.parent.removeNode(this);
        target.insertNode(this, index, false);

        if (this.model !== null) {
            /**
             * After a node of the model has been moved
             * @event model:move
             * @memberof Model
             * @param {Node} node
             * @param {Node} target
             * @param {int} index
             */
            this.model.trigger('move', this, target, index);
        }
    }
};


/**
 * Group object
 * @constructor
 * @extends Node
 * @param {Group} [parent]
 * @param {jQuery} $el
 */
var Group = function(parent, $el) {
    if (!(this instanceof Group)) {
        return new Group(parent, $el);
    }

    Node.call(this, parent, $el);

    /**
     * @member {object[]}
     * @readonly
     */
    this.rules = [];

    /**
     * @name condition
     * @member {string}
     * @memberof Group
     * @instance
     */
    this.__.condition = null;
};

Group.prototype = Object.create(Node.prototype);
Group.prototype.constructor = Group;

Utils.defineModelProperties(Group, ['condition']);

/**
 * Removes group's content
 */
Group.prototype.empty = function() {
    this.each('reverse', function(rule) {
        rule.drop();
    }, function(group) {
        group.drop();
    });
};

/**
 * Deletes self
 */
Group.prototype.drop = function() {
    this.empty();
    Node.prototype.drop.call(this);
};

/**
 * Returns the number of children
 * @returns {int}
 */
Group.prototype.length = function() {
    return this.rules.length;
};

/**
 * Adds a Node at specified index
 * @param {Node} node
 * @param {int} [index=end]
 * @param {boolean} [trigger=false] - fire 'add' event
 * @returns {Node} the inserted node
 * @fires Model.model:add
 */
Group.prototype.insertNode = function(node, index, trigger) {
    if (index === undefined) {
        index = this.length();
    }

    this.rules.splice(index, 0, node);
    node.parent = this;

    if (trigger && this.model !== null) {
        /**
         * After a node of the model has been added
         * @event model:add
         * @memberof Model
         * @param {Node} parent
         * @param {Node} node
         * @param {int} index
         */
        this.model.trigger('add', this, node, index);
    }

    return node;
};

/**
 * Adds a new Group at specified index
 * @param {jQuery} $el
 * @param {int} [index=end]
 * @returns {Group}
 * @fires Model.model:add
 */
Group.prototype.addGroup = function($el, index) {
    return this.insertNode(new Group(this, $el), index, true);
};

/**
 * Adds a new Rule at specified index
 * @param {jQuery} $el
 * @param {int} [index=end]
 * @returns {Rule}
 * @fires Model.model:add
 */
Group.prototype.addRule = function($el, index) {
    return this.insertNode(new Rule(this, $el), index, true);
};

/**
 * Deletes a specific Node
 * @param {Node} node
 */
Group.prototype.removeNode = function(node) {
    var index = this.getNodePos(node);
    if (index !== -1) {
        node.parent = null;
        this.rules.splice(index, 1);
    }
};

/**
 * Returns the position of a child Node
 * @param {Node} node
 * @returns {int}
 */
Group.prototype.getNodePos = function(node) {
    return this.rules.indexOf(node);
};

/**
 * @callback Model#GroupIteratee
 * @param {Node} node
 * @returns {boolean} stop the iteration
 */

/**
 * Iterate over all Nodes
 * @param {boolean} [reverse=false] - iterate in reverse order, required if you delete nodes
 * @param {Model#GroupIteratee} cbRule - callback for Rules (can be `null` but not omitted)
 * @param {Model#GroupIteratee} [cbGroup] - callback for Groups
 * @param {object} [context] - context for callbacks
 * @returns {boolean} if the iteration has been stopped by a callback
 */
Group.prototype.each = function(reverse, cbRule, cbGroup, context) {
    if (typeof reverse !== 'boolean' && typeof reverse !== 'string') {
        context = cbGroup;
        cbGroup = cbRule;
        cbRule = reverse;
        reverse = false;
    }
    context = context === undefined ? null : context;

    var i = reverse ? this.rules.length - 1 : 0;
    var l = reverse ? 0 : this.rules.length - 1;
    var c = reverse ? -1 : 1;
    var next = function() {
        return reverse ? i >= l : i <= l;
    };
    var stop = false;

    for (; next(); i += c) {
        if (this.rules[i] instanceof Group) {
            if (!!cbGroup) {
                stop = cbGroup.call(context, this.rules[i]) === false;
            }
        }
        else if (!!cbRule) {
            stop = cbRule.call(context, this.rules[i]) === false;
        }

        if (stop) {
            break;
        }
    }

    return !stop;
};

/**
 * Checks if the group contains a particular Node
 * @param {Node} node
 * @param {boolean} [recursive=false]
 * @returns {boolean}
 */
Group.prototype.contains = function(node, recursive) {
    if (this.getNodePos(node) !== -1) {
        return true;
    }
    else if (!recursive) {
        return false;
    }
    else {
        // the loop will return with false as soon as the Node is found
        return !this.each(function() {
            return true;
        }, function(group) {
            return !group.contains(node, true);
        });
    }
};


/**
 * Rule object
 * @constructor
 * @extends Node
 * @param {Group} parent
 * @param {jQuery} $el
 */
var Rule = function(parent, $el) {
    if (!(this instanceof Rule)) {
        return new Rule(parent, $el);
    }

    Node.call(this, parent, $el);

    this._updating_value = false;
    this._updating_input = false;

    /**
     * @name filter
     * @member {QueryBuilder.Filter}
     * @memberof Rule
     * @instance
     */
    this.__.filter = null;

    /**
     * @name operator
     * @member {QueryBuilder.Operator}
     * @memberof Rule
     * @instance
     */
    this.__.operator = null;

    /**
     * @name value
     * @member {*}
     * @memberof Rule
     * @instance
     */
    this.__.value = undefined;
};

Rule.prototype = Object.create(Node.prototype);
Rule.prototype.constructor = Rule;

Utils.defineModelProperties(Rule, ['filter', 'operator', 'value']);

/**
 * Checks if this Node is the root
 * @returns {boolean} always false
 */
Rule.prototype.isRoot = function() {
    return false;
};


/**
 * @member {function}
 * @memberof QueryBuilder
 * @see Group
 */
QueryBuilder.Group = Group;

/**
 * @member {function}
 * @memberof QueryBuilder
 * @see Rule
 */
QueryBuilder.Rule = Rule;
