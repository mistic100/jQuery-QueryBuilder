// CLASS DEFINITION
// ===============================
var QueryBuilder = function($el, options) {
    this.init($el, options);
};


// EVENTS SYSTEM
// ===============================
$.extend(QueryBuilder.prototype, {
    change: function(type, value) {
        var event = new $.Event(type + '.queryBuilder.filter', {
            builder: this,
            value: value
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 2));

        return event.value;
    },

    trigger: function(type) {
        var event = new $.Event(type + '.queryBuilder', {
            builder: this
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 1));

        return event;
    },

    on: function(type, cb) {
        this.$el.on(type + '.queryBuilder', cb);
        return this;
    },

    off: function(type, cb) {
        this.$el.off(type + '.queryBuilder', cb);
        return this;
    },

    once: function(type, cb) {
        this.$el.one(type + '.queryBuilder', cb);
        return this;
    }
});


// PLUGINS SYSTEM
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
 * @param {object,optional} default configuration
 */
QueryBuilder.define = function(name, fct, def) {
    QueryBuilder.plugins[name] = {
        fct: fct,
        def: def || {}
    };
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
 * @throws ConfigError
 */
QueryBuilder.prototype.initPlugins = function() {
    if (!this.plugins) {
        return;
    }

    if ($.isArray(this.plugins)) {
        var tmp = {};
        this.plugins.forEach(function(plugin) {
            tmp[plugin] = null;
        });
        this.plugins = tmp;
    }

    Object.keys(this.plugins).forEach(function(plugin) {
        if (plugin in QueryBuilder.plugins) {
            this.plugins[plugin] = $.extend(true, {},
                QueryBuilder.plugins[plugin].def,
                this.plugins[plugin] || {}
            );

            QueryBuilder.plugins[plugin].fct.call(this, this.plugins[plugin]);
        }
        else {
            Utils.error('Config', 'Unable to find plugin "{0}"', plugin);
        }
    }, this);
};
