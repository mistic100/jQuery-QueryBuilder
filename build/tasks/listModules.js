module.exports = function(grunt, config) {
    grunt.registerTask('list_modules', 'List QueryBuilder plugins and languages.', function() {
        grunt.log.writeln('\nAvailable QueryBuilder plugins:\n');

        for (var p in config.all_plugins) {
            grunt.log.write(p['cyan']);

            if (grunt.file.exists(config.all_plugins[p].replace(/js$/, 'scss'))) {
                grunt.log.write(' + CSS');
            }

            grunt.log.write('\n');
        }

        grunt.log.writeln('\nAvailable QueryBuilder languages:\n');

        for (var l in config.all_langs) {
            if (l !== 'en') {
                grunt.log.writeln(l['cyan']);
            }
        }
    });
};
