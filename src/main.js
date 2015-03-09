// GLOBAL STATIC VARIABLES
// ===============================
var types = [
        'string',
        'integer',
        'double',
        'date',
        'time',
        'datetime',
        'boolean'
    ],
    internalTypes = [
        'string',
        'number',
        'datetime',
        'boolean'
    ],
    inputs = [
        'text',
        'textarea',
        'radio',
        'checkbox',
        'select'
    ];


// CLASS DEFINITION
// ===============================
var QueryBuilder = function($el, options) {
    $el[0].queryBuilder = this;
    this.$el = $el;
    this.init(options);
};

MicroEvent.mixin(QueryBuilder);


// PLUGINS SYSTEM
// Inspired by https://github.com/brianreavis/microplugin.js
// Very lightened and without dependencies
// ===============================
QueryBuilder.plugins = {};

/**
 * Get or extend the default configuration
 * @param options {object,optional} new configuration, leave undefined to get the default config
 * @return {undefined|object} nothing or configuration object (copy)
 */
QueryBuilder.defaults = function(options) {
    if (typeof options == 'object') {
        $.extendext(true, 'replace', QueryBuilder.DEFAULTS, options);
    }
    else if (typeof options == 'string') {
        if (typeof QueryBuilder.DEFAULTS[options] == 'object') {
            return $.extend(true, {}, QueryBuilder.DEFAULTS[options]);
        }
        else {
            return QueryBuilder.DEFAULTS[options];
        }
    }
    else {
        return $.extend(true, {}, QueryBuilder.DEFAULTS);
    }
};

/**
 * Define a new plugin
 * @param {string}
 * @param {function}
 */
QueryBuilder.define = function(name, fct) {
    QueryBuilder.plugins[name] = fct;
};

/**
 * Add new methods
 * @param {object}
 */
QueryBuilder.extend = function(methods) {
    $.extend(QueryBuilder.prototype, methods);
};

/**
 * Init plugins for an instance
 */
QueryBuilder.prototype.initPlugins = function() {
    if (!this.settings.plugins) {
        return;
    }

    var that = this,
        queue = {};

    if ($.isArray(this.settings.plugins)) {
        $.each(this.settings.plugins, function(i, plugin) {
            queue[plugin] = {};
        });
    }
    else {
        $.each(this.settings.plugins, function(plugin, options) {
            queue[plugin] = options || {};
        });
    }

    $.each(queue, function(plugin, options) {
        if (plugin in QueryBuilder.plugins) {
            QueryBuilder.plugins[plugin].call(that, options);
        }
        else {
            error('Unable to find plugin "{0}"', plugin);
        }
    });
};