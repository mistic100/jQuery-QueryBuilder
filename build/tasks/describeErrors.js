module.exports = function(grunt, config) {
    grunt.registerTask('describe_errors', 'List QueryBuilder errors.', function() {
        var errors = {};
        var total = 0;

        for (var f in config.all_js_files) {
            grunt.file.read(config.all_js_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /Utils\.error\((?:[^)]+, )?'(\w+)', '([^)]+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    (errors[matches[1]] = errors[matches[1]] || []).push({
                        type: matches[1],
                        message: matches[2],
                        file: config.all_js_files[f],
                        line: i,
                        args: matches[3].slice(2).split(', ')
                    });

                    total++;
                }
            });
        }

        grunt.log.write('\n');

        for (var e in errors) {
            grunt.log.writeln((e + 'Error')['cyan']);
            errors[e].forEach(function(error) {
                var message = error.message.replace(/{([0-9]+)}/g, function(m, i) {
                    return error.args[parseInt(i)]['yellow'];
                });
                grunt.log.writeln('   ' + (error.file + ':' + error.line)['red']);
                grunt.log.writeln('      ' + message);
            });
            grunt.log.write('\n');
        }

        grunt.log.writeln((total + ' Errors in QueryBuilder.')['cyan']['bold']);
    });
};
