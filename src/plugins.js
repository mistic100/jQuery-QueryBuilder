/**
 * @module plugins
 */

/**
 * Definition of available plugins
 * @type {object.<String, object>}
 */
QueryBuilder.plugins = {};

/**
 * Gets or extends the default configuration
 * @param {object} [options] - new configuration
 * @returns {undefined|object} nothing or configuration object (copy)
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
 * Registers a new plugin
 * @param {string} name
 * @param {function} fct - init function
 * @param {object} [def] - default options
 */
QueryBuilder.define = function(name, fct, def) {
    QueryBuilder.plugins[name] = {
        fct: fct,
        def: def || {}
    };
};

/**
 * Adds new methods to QueryBuilder prototype
 * @param {object.<string, function>} methods
 */
QueryBuilder.extend = function(methods) {
    $.extend(QueryBuilder.prototype, methods);
};
