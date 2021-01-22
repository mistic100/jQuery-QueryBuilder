module.exports = function(src) {
    return src
        .replace(/\/\*jshint [a-z:]+ \*\/\r?\n\r?\n?/g, '')
        .replace(/\/\*jshint -[EWI]{1}[0-9]{3} \*\/\r?\n\r?\n?/g, '');
};
