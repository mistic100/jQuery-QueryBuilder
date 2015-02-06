/**
 * Utility to iterate over radio/checkbox/selection options.
 * it accept three formats: array of values, map, array of 1-element maps
 *
 * @param options {object|array}
 * @param tpl {callable} (takes key and text)
 */
function iterateOptions(options, tpl) {
    if (options) {
        if ($.isArray(options)) {
            $.each(options, function(index, entry) {
                // array of one-element maps
                if ($.isPlainObject(entry)) {
                    $.each(entry, function(key, val) {
                        tpl(key, val);
                        return false; // break after first entry
                    });
                }
                // array of values
                else {
                    tpl(index, entry);
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
}

/**
 * Replaces {0}, {1}, ... in a string
 * @param str {string}
 * @param args,... {string|int|float}
 * @return {string}
 */
function fmt(str, args) {
    args = Array.prototype.slice.call(arguments);

    return str.replace(/{([0-9]+)}/g, function(m, i) {
        return args[parseInt(i)+1];
    });
}