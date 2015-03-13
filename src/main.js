// CLASS DEFINITION
// ===============================
var QueryBuilder = function($el, options) {
    this.init($el, options);
};


// PLUGINS SYSTEM
// ===============================
MicroEvent.mixin(QueryBuilder);

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

    var that = this;

    if ($.isArray(this.settings.plugins)) {
        var tmp = {};
        this.settings.plugins.forEach(function(plugin) {
            tmp[plugin] = {};
        });
        this.settings.plugins = tmp;
    }
    else {
        $.each(this.settings.plugins, function(plugin, options) {
            if (!options) {
                that.settings.plugins[plugin] = {};
            }
        });
    }

    $.each(this.settings.plugins, function(plugin, options) {
        if (plugin in QueryBuilder.plugins) {
            QueryBuilder.plugins[plugin].call(that, options);
        }
        else {
            error('Unable to find plugin "{0}"', plugin);
        }
    });
};