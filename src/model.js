// Node abstract CLASS
// ===============================
var Node = function() {};

Node.DATAKEY = 'queryBuilderModel';

/**
 * Common constructor
 * @param {Node}
 * @param {jQuery}
 */
Node.prototype.init = function(parent, $el) {
    $el.data(Node.DATAKEY, this);
    
    this.$el = $el;
    this.parent = (parent instanceof $) ? parent.data(Node.DATAKEY) : parent;
    this.level = !!this.parent ? this.parent.level+1 : 1;
};

/**
 * Get the root Node object
 * @return {Node}
 */
Node.prototype.getRoot = function() {
    if (this.isRoot()) {
        return this;
    }
    else {
        return this.parent.getRoot();
    }
};

/**
 * Check if this Node is the root
 * @return {boolean}
 */
Node.prototype.isRoot = function() {
    return this.level === 1;
};

/**
 * Delete self from parent
 */
Node.prototype.drop = function() {
    if (!this.isRoot()) {
        this.parent.deleteNode(this);
        this.parent = null;
    }
    this.$el.removeData(Node.DATAKEY);
};

/**
 * Move itself after another Node, or at the beginning if `target` is null
 * @param {Node}
 * @return {Node} self
 */
Node.prototype.moveAfter = function(target) {
    this.parent.moveNodeAfter(this, target);
    return this;
};


// GROUP CLASS
// ===============================
/**
 * @param {Group}
 * @param {jQuery}
 */
var Group = function(parent, $el) {
    var that = this;
    
    this.init(parent, $el);
    
    this.condition = null;
    this.rules = [];
};

Group.prototype = new Node();
Group.prototype.constructor = Group;

/**
 * Empty the Group
 */
Group.prototype.empty = function() {
    this.each(function(node) {
        node.drop();
    });
};

/**
 * Delete self from parent
 */
Group.prototype.drop = function() {
    this.empty();
    Node.prototype.drop.call(this);
};

/**
 * Return the number of children
 * @return {int}
 */
Group.prototype.length = function() {
    return this.rules.length;
};

/**
 * Add a Node at specified index
 * @param {Node}
 * @param {int,optional}
 * @return {Node} the inserted node
 */
Group.prototype.addNode = function(node, index) {
    if (index === undefined) {
        index = this.length();
    }
    this.rules.splice(index, 0, node);
    return node;
};

/**
 * Add a Group by raw data at specied index
 * @param {jQuery}
 * @param {object}
 * @param {int,optional}
 * @return {Group} the inserted group
 */
Group.prototype.addGroup = function($el, data, index) {
    return this.addNode(new Group(this, $el, data), index);
};

/**
 * Add a Rule by raw data at specied index
 * @param {jQuery}
 * @param {object}
 * @param {int,optional}
 * @return {Rule} the inserted rule
 */
Group.prototype.addRule = function($el, data, index) {
    return this.addNode(new Rule(this, $el, data), index);
};

/**
 * Delete a specific Node
 * @param {Node}
 * @return {Group} self
 */
Group.prototype.deleteNode = function(node) {
    var index = this.rules.indexOf(node);
    if (index !== -1) {
        this.rules.splice(index, 1);
    }
    return this;
};

/**
 * Move one node after another, or at the begining if `target` is null
 * @param {Node}
 * @param {Node,optional}
 * @param {Group} self
 */
Group.prototype.moveNodeAfter = function(node, target) {
    this.deleteNode(node);
    var index = 0;
    if (target !== undefined) {
        index = this.rules.indexOf(target) + 1;
    }
    this.addNode(node, index);
    return this;
};

/**
 * Iterate over all Nodes
 * @param {function} callback for Rules
 * @param {function,optional} callback for Groups
 * @param {object,optional} context, default is root
 */
Group.prototype.each = function(cbRule, cbGroup, context) {
    if (arguments.length === 2) {
        if (typeof cbGroup !== 'function') {
            context = cbGroup;
            cbGroup = null;
        }
        else {
            context = this.getRoot();
        }
    }
    else if (arguments.length === 1) {
        cbGroup = null;
        context = this.getRoot();
    }
    
    $.each(this.rules, function(i, rule) {
        if (rule instanceof Group) {
            if (cbGroup !== null) {
                cbGroup.call(context, rule);
            }
            rule.each(cbGroup, cbRule, context);
        }
        else {
            cbRule.call(context, rule);
        }
    });
};


// RULE CLASS
// ===============================
/**
 * @param {Group}
 * @param {jQuery}
 */
var Rule = function(parent, $el) {
    this.init(parent, $el);
    
    this.filter = null;
    this.operator = null;
    this.flags = null;
};

Rule.prototype = new Node();
Rule.prototype.constructor = Rule;