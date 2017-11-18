/**
 * @typedef {object} Filter
 * @memberof QueryBuilder
 * @description See {@link http://querybuilder.js.org/index.html#filters}
 */

/**
 * @typedef {object} Operator
 * @memberof QueryBuilder
 * @description See {@link http://querybuilder.js.org/index.html#operators}
 */

/**
 * @param {jQuery} $el
 * @param {object} options - see {@link http://querybuilder.js.org/#options}
 * @constructor
 */
var QueryBuilder = function($el, options) {
    $el[0].queryBuilder = this;

    /**
     * Element container
     * @member {jQuery}
     * @readonly
     */
    this.$el = $el;

    /**
     * Configuration object
     * @member {object}
     * @readonly
     */
    this.settings = $.extendext(true, 'replace', {}, QueryBuilder.DEFAULTS, options);

    /**
     * Internal model
     * @member {Model}
     * @readonly
     */
    this.model = new Model();

    /**
     * Internal status
     * @member {object}
     * @property {string} id - id of the container
     * @property {boolean} generated_id - if the container id has been generated
     * @property {int} group_id - current group id
     * @property {int} rule_id - current rule id
     * @property {boolean} has_optgroup - if filters have optgroups
     * @property {boolean} has_operator_optgroup - if operators have optgroups
     * @readonly
     * @private
     */
    this.status = {
        id: null,
        generated_id: false,
        group_id: 0,
        rule_id: 0,
        has_optgroup: false,
        has_operator_optgroup: false
    };

    /**
     * List of filters
     * @member {QueryBuilder.Filter[]}
     * @readonly
     */
    this.filters = this.settings.filters;

    /**
     * List of icons
     * @member {object.<string, string>}
     * @readonly
     */
    this.icons = this.settings.icons;

    /**
     * List of operators
     * @member {QueryBuilder.Operator[]}
     * @readonly
     */
    this.operators = this.settings.operators;

    /**
     * List of templates
     * @member {object.<string, function>}
     * @readonly
     */
    this.templates = this.settings.templates;

    /**
     * Plugins configuration
     * @member {object.<string, object>}
     * @readonly
     */
    this.plugins = this.settings.plugins;

    /**
     * Translations object
     * @member {object}
     * @readonly
     */
    this.lang = null;

    // translations : english << 'lang_code' << custom
    if (QueryBuilder.regional['en'] === undefined) {
        Utils.error('Config', '"i18n/en.js" not loaded.');
    }
    this.lang = $.extendext(true, 'replace', {}, QueryBuilder.regional['en'], QueryBuilder.regional[this.settings.lang_code], this.settings.lang);

    // "allow_groups" can be boolean or int
    if (this.settings.allow_groups === false) {
        this.settings.allow_groups = 0;
    }
    else if (this.settings.allow_groups === true) {
        this.settings.allow_groups = -1;
    }

    // init templates
    Object.keys(this.templates).forEach(function(tpl) {
        if (!this.templates[tpl]) {
            this.templates[tpl] = QueryBuilder.templates[tpl];
        }
        if (typeof this.templates[tpl] == 'string') {
            this.templates[tpl] = doT.template(this.templates[tpl]);
        }
    }, this);

    // ensure we have a container id
    if (!this.$el.attr('id')) {
        this.$el.attr('id', 'qb_' + Math.floor(Math.random() * 99999));
        this.status.generated_id = true;
    }
    this.status.id = this.$el.attr('id');

    // INIT
    this.$el.addClass('query-builder form-inline');

    this.filters = this.checkFilters(this.filters);
    this.operators = this.checkOperators(this.operators);
    this.bindEvents();
    this.initPlugins();
};

$.extend(QueryBuilder.prototype, /** @lends QueryBuilder.prototype */ {
    /**
     * Triggers an event on the builder container
     * @param {string} type
     * @returns {$.Event}
     */
    trigger: function(type) {
        var event = new $.Event(this._tojQueryEvent(type), {
            builder: this
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 1));

        return event;
    },

    /**
     * Triggers an event on the builder container and returns the modified value
     * @param {string} type
     * @param {*} value
     * @returns {*}
     */
    change: function(type, value) {
        var event = new $.Event(this._tojQueryEvent(type, true), {
            builder: this,
            value: value
        });

        this.$el.triggerHandler(event, Array.prototype.slice.call(arguments, 2));

        return event.value;
    },

    /**
     * Attaches an event listener on the builder container
     * @param {string} type
     * @param {function} cb
     * @returns {QueryBuilder}
     */
    on: function(type, cb) {
        this.$el.on(this._tojQueryEvent(type), cb);
        return this;
    },

    /**
     * Removes an event listener from the builder container
     * @param {string} type
     * @param {function} [cb]
     * @returns {QueryBuilder}
     */
    off: function(type, cb) {
        this.$el.off(this._tojQueryEvent(type), cb);
        return this;
    },

    /**
     * Attaches an event listener called once on the builder container
     * @param {string} type
     * @param {function} cb
     * @returns {QueryBuilder}
     */
    once: function(type, cb) {
        this.$el.one(this._tojQueryEvent(type), cb);
        return this;
    },

    /**
     * Appends `.queryBuilder` and optionally `.filter` to the events names
     * @param {string} name
     * @param {boolean} [filter=false]
     * @returns {string}
     * @private
     */
    _tojQueryEvent: function(name, filter) {
        return name.split(' ').map(function(type) {
            return type + '.queryBuilder' + (filter ? '.filter' : '');
        }).join(' ');
    }
});
