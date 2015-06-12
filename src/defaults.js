/**
 * Allowed types and their internal representation
 */
QueryBuilder.types = {
    'string': 'string',
    'integer': 'number',
    'double': 'number',
    'date': 'datetime',
    'time': 'datetime',
    'datetime': 'datetime',
    'boolean': 'boolean'
};

/**
 * Allowed inputs
 */
QueryBuilder.inputs = [
    'text',
    'textarea',
    'radio',
    'checkbox',
    'select'
];

/**
 * Runtime modifiable options with `setOptions` method
 */
QueryBuilder.modifiable_options = [
    'display_errors',
    'allow_groups',
    'allow_empty'
];

/**
 * Localized strings (populated by `i18n` files)
 */
QueryBuilder.regional = {};

/**
 * Default configuration
 */
QueryBuilder.DEFAULTS = {
    filters: [],
    plugins: [],

    display_errors: true,
    allow_groups: -1,
    allow_empty: false,
    conditions: ['AND', 'OR'],
    default_condition: 'AND',
    inputs_separator: ' , ',
    select_placeholder: '------',

    default_rule_flags: {
        filter_readonly: false,
        operator_readonly: false,
        value_readonly: false,
        no_delete: false
    },

    template: {
        group: null,
        rule: null
    },

    lang_code: 'en',
    lang: {},

    operators: [
        {type: 'equal',            nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'not_equal',        nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'in',               nb_inputs: 1, multiple: true,  apply_to: ['string', 'number', 'datetime']},
        {type: 'not_in',           nb_inputs: 1, multiple: true,  apply_to: ['string', 'number', 'datetime']},
        {type: 'less',             nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'less_or_equal',    nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'greater',          nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'between',          nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'not_between',      nb_inputs: 2, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'begins_with',      nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_begins_with',  nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'contains',         nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_contains',     nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'ends_with',        nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_ends_with',    nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'is_empty',         nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_not_empty',     nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_null',          nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'is_not_null',      nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']}
    ],

    icons: {
        add_group: 'glyphicon glyphicon-plus-sign',
        add_rule: 'glyphicon glyphicon-plus',
        remove_group: 'glyphicon glyphicon-remove',
        remove_rule: 'glyphicon glyphicon-remove',
        error: 'glyphicon glyphicon-warning-sign'
    }
};