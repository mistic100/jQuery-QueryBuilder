/*!
 * jQuery QueryBuilder 3.0.0
 * Locale: Latvian (lv)
 * Author: Edgars Voroboks
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'query-builder'], factory);
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
"use strict";

var QueryBuilder = $.fn.queryBuilder;

QueryBuilder.regional['lv'] = {
  "__locale": "Latvian (lv)",
  "__author": "Edgars Voroboks",
  "add_rule": "Pievienot noteikumu",
  "add_group": "Pievienot grupu",
  "delete_rule": "Dzēst",
  "delete_group": "Dzēst",
  "conditions": {
    "AND": "UN",
    "OR": "VAI"
  },
  "operators": {
    "equal": "vienāds",
    "not_equal": "nav vienāds",
    "in": "ietver",
    "not_in": "neietver",
    "less": "mazāks",
    "less_or_equal": "mazāks vai vienāds",
    "greater": "lielāks",
    "greater_or_equal": "lielāks vai vienāds",
    "between": "starp",
    "not_between": "nav starp",
    "begins_with": "sākas ar",
    "not_begins_with": "nesākas ar",
    "contains": "satur",
    "not_contains": "nesatur",
    "ends_with": "beidzas ar",
    "not_ends_with": "nebeidzas ar",
    "is_empty": "ir tukša vērtība",
    "is_not_empty": "nav tukša vērtība",
    "is_null": "ir tukšs",
    "is_not_null": "nav tukšs"
  },
  "errors": {
    "no_filter": "Nav izvēlēts filtrs",
    "empty_group": "Grupa ir tukša",
    "radio_empty": "Nav izvēlēta vērtība",
    "checkbox_empty": "Nav izvēlēta vērtība",
    "select_empty": "Nav izvēlēta vērtība",
    "string_empty": "Tukša vērtība",
    "string_exceed_min_length": "Jābūt vismaz {0} rakstzīmēm",
    "string_exceed_max_length": "Jābūt ne vairāk kā {0} rakstzīmēm",
    "string_invalid_format": "Nederīgs formāts ({0})",
    "number_nan": "Nav skaitlis",
    "number_not_integer": "Nav vesels skaitlis",
    "number_not_double": "Nav reāls skaitlis",
    "number_exceed_min": "Jābūt lielākam par {0}",
    "number_exceed_max": "Jābūt mazākam par {0}",
    "number_wrong_step": "Jābūt {0} reizinājumam",
    "number_between_invalid": "Nederīgas vērtības, {0} ir lielāks par {1}",
    "datetime_empty": "Tukša vērtība",
    "datetime_invalid": "Nederīgs datuma formāts ({0})",
    "datetime_exceed_min": "Jābūt pēc {0}",
    "datetime_exceed_max": "Jābūt pirms {0}",
    "datetime_between_invalid": "Nederīgas vērtības, {0} ir lielāks par {1}",
    "boolean_not_valid": "Nav loģiska vērtība",
    "operator_not_multiple": "Operators \"{1}\" nevar pieņemt vairākas vērtības"
  },
  "invert": "Apgriezt",
  "NOT": "NAV"
};

QueryBuilder.defaults({ lang_code: 'lv' });
}));