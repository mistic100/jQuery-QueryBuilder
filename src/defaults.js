QueryBuilder.DEFAULTS = {
    filters: [],
    plugins: null,

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

    lang: {
        "add_rule": 'Add rule',
        "add_group": 'Add group',
        "delete_rule": 'Delete',
        "delete_group": 'Delete',

        "condition_and": 'AND',
        "condition_or": 'OR',

        "operators": {
            "equal": "equal",
            "not_equal": "not equal",
            "in": "in",
            "not_in": "not in",
            "less": "less",
            "less_or_equal": "less or equal",
            "greater": "greater",
            "greater_or_equal": "greater or equal",
            "between": "between",
            "begins_with": "begins with",
            "not_begins_with": "doesn't begin with",
            "contains": "contains",
            "not_contains": "doesn't contain",
            "ends_with": "ends with",
            "not_ends_with": "doesn't end with",
            "is_empty": "is empty",
            "is_not_empty": "is not empty",
            "is_null": "is null",
            "is_not_null": "is not null"
        },

        "errors": {
            "no_filter": "No filter selected",
            "empty_group": "The group is empty",
            "radio_empty": "No value selected",
            "checkbox_empty": "No value selected",
            "select_empty": "No value selected",
            "string_empty": "Empty value",
            "string_exceed_min_length": "Must contain at least {0} characters",
            "string_exceed_max_length": "Must not contain more than {0} characters",
            "string_invalid_format": "Invalid format ({0})",
            "number_nan": "Not a number",
            "number_not_integer": "Not an integer",
            "number_not_double": "Not a real number",
            "number_exceed_min": "Must be greater than {0}",
            "number_exceed_max": "Must be lower than {0}",
            "number_wrong_step": "Must be a multiple of {0}",
            "datetime_invalid": "Invalid date format ({0})",
            "datetime_exceed_min": "Must be after {0}",
            "datetime_exceed_max": "Must be before {0}",
            "boolean_not_valid": "Not a boolean"
        }
    },

    operators: [
        {type: 'equal',            accept_values: 1, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'not_equal',        accept_values: 1, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'in',               accept_values: 1, apply_to: ['string', 'number', 'datetime']},
        {type: 'not_in',           accept_values: 1, apply_to: ['string', 'number', 'datetime']},
        {type: 'less',             accept_values: 1, apply_to: ['number', 'datetime']},
        {type: 'less_or_equal',    accept_values: 1, apply_to: ['number', 'datetime']},
        {type: 'greater',          accept_values: 1, apply_to: ['number', 'datetime']},
        {type: 'greater_or_equal', accept_values: 1, apply_to: ['number', 'datetime']},
        {type: 'between',          accept_values: 2, apply_to: ['number', 'datetime']},
        {type: 'begins_with',      accept_values: 1, apply_to: ['string']},
        {type: 'not_begins_with',  accept_values: 1, apply_to: ['string']},
        {type: 'contains',         accept_values: 1, apply_to: ['string']},
        {type: 'not_contains',     accept_values: 1, apply_to: ['string']},
        {type: 'ends_with',        accept_values: 1, apply_to: ['string']},
        {type: 'not_ends_with',    accept_values: 1, apply_to: ['string']},
        {type: 'is_empty',         accept_values: 0, apply_to: ['string']},
        {type: 'is_not_empty',     accept_values: 0, apply_to: ['string']},
        {type: 'is_null',          accept_values: 0, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'is_not_null',      accept_values: 0, apply_to: ['string', 'number', 'datetime', 'boolean']}
    ],

    icons: {
        add_group: 'glyphicon glyphicon-plus-sign',
        add_rule: 'glyphicon glyphicon-plus',
        remove_group: 'glyphicon glyphicon-remove',
        remove_rule: 'glyphicon glyphicon-remove',
        error: 'glyphicon glyphicon-warning-sign'
    }
};