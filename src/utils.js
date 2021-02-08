var Utils = QueryBuilder.utils = {};

/**
 * Utility to iterate over radio/checkbox/selection options.
 * it accept three formats: array of values, map, array of 1-element maps
 *
 * @param options {object|array}
 * @param tpl {callable} (takes key and text)
 */
Utils.iterateOptions = function(options, tpl) {
    if (options) {
        if ($.isArray(options)) {
            options.forEach(function(entry) {
                // array of one-element maps
                if ($.isPlainObject(entry)) {
                    $.each(entry, function(key, val) {
                        tpl(key, val);
                        return false; // break after first entry
                    });
                }
                // array of values
                else {
                    tpl(entry, entry);
                }
            });
        }
        // unordered map
        else {
            $.each(options, function(key, val) {
                tpl(key, val);
            });
        }
    }
};

/**
 * Replaces {0}, {1}, ... in a string
 * @param str {string}
 * @param args,... {mixed}
 * @return {string}
 */
Utils.fmt = function(str/*, args*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    return str.replace(/{([0-9]+)}/g, function(m, i) {
        return args[parseInt(i)];
    });
};

/**
 * Throw an Error object with custom name
 * @param type {string}
 * @param message {string}
 * @param args,... {mixed}
 */
Utils.error = function(type, message/*, args*/) {
    var err = new Error(Utils.fmt.apply(null, Array.prototype.slice.call(arguments, 1)));
    err.name = type + 'Error';
    err.args = Array.prototype.slice.call(arguments, 2);
    throw err;
};

/**
 * Change type of a value to int or float
 * @param value {mixed}
 * @param type {string} 'integer', 'double' or anything else
 * @param boolAsInt {boolean} return 0 or 1 for booleans
 * @return {mixed}
 */
Utils.changeType = function(value, type, boolAsInt) {
    switch (type) {
        case 'integer': return parseInt(value);
        case 'double': return parseFloat(value);
        case 'boolean':
            var bool = value.trim().toLowerCase() === 'true' || value.trim() === '1' || value === 1;
            return boolAsInt ? (bool ? 1 : 0) : bool;
        default: return value;
    }
};

/**
 * Escape string like mysql_real_escape_string
 * @param value {string}
 * @return {string}
 */
Utils.escapeString = function(value) {
    if (typeof value != 'string') {
        return value;
    }

    return value
      .replace(/[\0\n\r\b\\\'\"]/g, function(s) {
          switch (s) {
              case '\0': return '\\0';
              case '\n': return '\\n';
              case '\r': return '\\r';
              case '\b': return '\\b';
              default:   return '\\' + s;
          }
      })
      // uglify compliant
      .replace(/\t/g, '\\t')
      .replace(/\x1a/g, '\\Z');
};

/**
 * Escape value for use in regex
 * @param value {string}
 * @return {string}
 */
Utils.escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

/**
 * Escape HTML element id
 * @param value {string}
 * @return {string}
 */
Utils.escapeElementId = function(str) {
    // Regex based on that suggested by:
    // https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
    // - escapes : . [ ] ,
    // - avoids escaping already escaped values
    return (str) ? str.replace(/(\\)?([:.\[\],])/g,
            function( $0, $1, $2 ) { return $1 ? $0 : '\\' + $2; }) : str;
};

/**
 * Sort objects by grouping them by {key}, preserving initial order when possible
 * @param {object[]} items
 * @param {string} key
 * @returns {object[]}
 */
Utils.groupSort = function(items, key) {
    var optgroups = [];
    var newItems = [];

    items.forEach(function(item) {
        var idx;

        if (item[key]) {
            idx = optgroups.lastIndexOf(item[key]);

            if (idx == -1) {
                idx = optgroups.length;
            }
            else {
                idx++;
            }
        }
        else {
            idx = optgroups.length;
        }

        optgroups.splice(idx, 0, item[key]);
        newItems.splice(idx, 0, item);
    });

    return newItems;
};
