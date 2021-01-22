module.exports = function(grunt, config) {
    config.all_plugins = {};
    config.all_langs = {};
    config.loaded_plugins = [];
    config.loaded_langs = [];
    config.js_files_to_load = config.js_core_files.slice();
    config.all_js_files = config.js_core_files.slice();

    // list available plugins and languages
    grunt.file.expand('src/plugins/**/plugin.js')
        .forEach(function(f) {
            var n = f.split('/')[2];
            config.all_plugins[n] = f;
        });

    grunt.file.expand('src/i18n/*.json')
        .forEach(function(f) {
            var n = f.split(/[\/\.]/)[2];
            config.all_langs[n] = f;
        });

    // fill all js files
    for (var p in config.all_plugins) {
        config.all_js_files.push(config.all_plugins[p]);
    }

    // parse 'plugins' parameter
    var arg_plugins = grunt.option('plugins');
    if (typeof arg_plugins === 'string') {
        arg_plugins.replace(/ /g, '').split(',').forEach(function(p) {
            if (config.all_plugins[p]) {
                config.js_files_to_load.push(config.all_plugins[p]);
                config.loaded_plugins.push(p);
            }
            else {
                grunt.fail.warn('Plugin ' + p + ' unknown');
            }
        });
    }
    else if (arg_plugins === undefined) {
        for (var p in config.all_plugins) {
            config.js_files_to_load.push(config.all_plugins[p]);
            config.loaded_plugins.push(p);
        }
    }

    // default language
    config.js_files_to_load.push('.temp/i18n/en.js');
    config.loaded_langs.push('en');

    // parse 'lang' parameter
    var arg_langs = grunt.option('languages');
    if (typeof arg_langs === 'string') {
        arg_langs.replace(/ /g, '').split(',').forEach(function(l) {
            if (config.all_langs[l]) {
                if (l !== 'en') {
                    config.js_files_to_load.push(config.all_langs[l].replace(/^src/, '.temp').replace(/json$/, 'js'));
                    config.loaded_langs.push(l);
                }
            }
            else {
                grunt.fail.warn('Language ' + l + ' unknown');
            }
        });
    }

    return config;
};
