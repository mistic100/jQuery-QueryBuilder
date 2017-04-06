var deepmerge = require('deepmerge');

module.exports = function(grunt, loaded_plugins) {
    return function(file, src, wrapper) {
        var lang = file.split(/[\/\.]/)[2];
        var content = JSON.parse(src);
        wrapper = wrapper || ['', ''];

        grunt.config.set('lang_locale', content.__locale || lang);
        grunt.config.set('lang_author', content.__author);
        var header = grunt.template.process('<%= langBanner %>');

        loaded_plugins.forEach(function(p) {
            var plugin_file = 'src/plugins/' + p + '/i18n/' + lang + '.json';

            if (grunt.file.exists(plugin_file)) {
                content = deepmerge(content, grunt.file.readJSON(plugin_file));
            }
        });

        return header
            + '\n\n'
            + wrapper[0]
            + 'QueryBuilder.regional[\'' + lang + '\'] = '
            + JSON.stringify(content, null, 2)
            + ';\n\n'
            + 'QueryBuilder.defaults({ lang_code: \'' + lang + '\' });'
            + wrapper[1];
    };
};
