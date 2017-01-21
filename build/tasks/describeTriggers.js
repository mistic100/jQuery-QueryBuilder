module.exports = function(grunt, config) {
    grunt.registerTask('describe_triggers', 'List QueryBuilder triggers.', function() {
        var triggers = {};
        var total = 0;

        for (var f in config.all_js_files) {
            grunt.file.read(config.all_js_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /(e = )?(?:this|that)\.(trigger|change)\('(\w+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    triggers[matches[3]] = {
                        name: matches[3],
                        type: matches[2],
                        file: config.all_js_files[f],
                        line: i,
                        args: matches[4].slice(2),
                        prevent: !!matches[1]
                    };

                    total++;
                }
            });
        }

        grunt.log.write('\n');

        for (var t in triggers) {
            grunt.log.write(t['cyan'] + ' ' + triggers[t].type['magenta']);
            if (triggers[t].prevent) grunt.log.write(' (*)'['yellow']);
            grunt.log.write('\n');
            grunt.log.writeln('   ' + (triggers[t].file + ':' + triggers[t].line)['red'] + ' ' + triggers[t].args);
            grunt.log.write('\n');
        }

        grunt.log.writeln((total + ' Triggers in QueryBuilder.')['cyan']['bold']);
    });
};
