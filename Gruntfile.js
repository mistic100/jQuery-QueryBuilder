var deepmerge = require('deepmerge');

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.util.linefeed = '\n';

    function removeJshint(src) {
        return src
          .replace(/\/\*jshint [a-z:]+ \*\/\r?\n\r?\n?/g, '')
          .replace(/\/\*jshint -[EWI]{1}[0-9]{3} \*\/\r?\n\r?\n?/g, '');
    }

    function process_lang(file, src, wrapper) {
        var lang = file.split(/[\/\.]/)[2];
        var content = JSON.parse(src);
        wrapper = wrapper || ['',''];

        grunt.config.set('lang_locale', content.__locale || lang);
        grunt.config.set('lang_author', content.__author);
        var header = grunt.template.process('<%= langBanner %>');

        loaded_plugins.forEach(function(p) {
            var plugin_file = 'src/plugins/'+ p +'/i18n/'+ lang +'.json';

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
    }


    var all_plugins = {},
        all_langs = {},
        loaded_plugins = [],
        loaded_langs = [],
        js_core_files = [
            'src/main.js',
            'src/defaults.js',
            'src/core.js',
            'src/public.js',
            'src/data.js',
            'src/template.js',
            'src/model.js',
            'src/utils.js',
            'src/jquery.js'
        ],
        js_files_to_load = js_core_files.slice(),
        all_js_files = js_core_files.slice(),
        js_files_for_standalone = [
            'bower_components/jquery-extendext/jQuery.extendext.js',
            'bower_components/doT/doT.js',
            'dist/js/query-builder.js'
        ];


    (function(){
        // list available plugins and languages
        grunt.file.expand('src/plugins/**/plugin.js')
        .forEach(function(f) {
            var n = f.split('/')[2];
            all_plugins[n] = f;
        });

        grunt.file.expand('src/i18n/*.json')
        .forEach(function(f) {
            var n = f.split(/[\/\.]/)[2];
            all_langs[n] = f;
        });

        // fill all js files
        for (var p in all_plugins) {
            all_js_files.push(all_plugins[p]);
        }

        // parse 'plugins' parameter
        var arg_plugins = grunt.option('plugins');
        if (typeof arg_plugins === 'string') {
            arg_plugins.replace(/ /g, '').split(',').forEach(function(p) {
                if (all_plugins[p]) {
                    js_files_to_load.push(all_plugins[p]);
                    loaded_plugins.push(p);
                }
                else {
                    grunt.fail.warn('Plugin '+ p +' unknown');
                }
            });
        }
        else if (arg_plugins === undefined) {
            for (var p in all_plugins) {
                js_files_to_load.push(all_plugins[p]);
                loaded_plugins.push(p);
            }
        }

        // default language
        js_files_to_load.push('.temp/i18n/en.js');
        loaded_langs.push('en');

        // parse 'lang' parameter
        var arg_langs = grunt.option('languages');
        if (typeof arg_langs === 'string') {
            arg_langs.replace(/ /g, '').split(',').forEach(function(l) {
                if (all_langs[l]) {
                    if (l !== 'en') {
                        js_files_to_load.push(all_langs[l].replace(/^src/, '.temp').replace(/json$/, 'js'));
                        loaded_langs.push(l);
                    }
                }
                else {
                    grunt.fail.warn('Language '+ l +' unknown');
                }
            });
        }
    }());


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!\n'+
            ' * jQuery QueryBuilder <%= pkg.version %>\n'+
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        langBanner:
            '/*!\n'+
            ' * jQuery QueryBuilder <%= pkg.version %>\n'+
            ' * Locale: <%= lang_locale %>\n'+
            '<% if (lang_author) { %> * Author: <%= lang_author %>\n<% } %>'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // bump version
        bump: {
            options: {
                files: ['package.json', 'bower.json', 'composer.json'],
                createTag: false,
                commit: false,
                push: false
            }
        },

        // watchers
        watch: {
            js: {
                files: ['src/*.js', 'src/plugins/**/plugin.js'],
                tasks: ['build_js']
            },
            css: {
                files: ['src/scss/*.scss', 'src/plugins/**/plugin.scss'],
                tasks: ['build_css']
            },
            lang: {
                files: ['src/i18n/*.json', 'src/plugins/**/i18n/*.json'],
                tasks: ['build_lang']
            }
        },

        // copy SASS files
        copy: {
            sass_core: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/scss/*.scss'],
                    dest: 'dist/scss'
                }]
            },
            sass_plugins: {
                files: loaded_plugins.map(function(name) {
                    return {
                        src: 'src/plugins/'+ name +'/plugin.scss',
                        dest: 'dist/scss/plugins/' + name + '.scss'
                    };
                })
            }
        },

        concat: {
            // concat all JS
            js: {
                src: js_files_to_load,
                dest: 'dist/js/query-builder.js',
                options: {
                    stripBanners: false,
                    separator: '\n\n',
                    process: function(src) {
                        return removeJshint(src).replace(/\r\n/g, '\n');
                    }
                }
            },
            // create standalone version
            js_standalone: {
                src: js_files_for_standalone,
                dest: 'dist/js/query-builder.standalone.js',
                options: {
                    stripBanners: false,
                    separator: '\n\n',
                    process: function(src, file) {
                        var name = file.match(/([^\/]+?).js$/)[1];

                        return removeJshint(src)
                          .replace(/\r\n/g, '\n')
                          .replace(/define\((.*?)\);/, 'define(\'' + name + '\', $1);');
                    }
                }
            },
            // compile language files with AMD wrapper
            lang: {
                files: Object.keys(all_langs).map(function(name) {
                    return {
                        src: 'src/i18n/'+ name +'.json',
                        dest: 'dist/i18n/query-builder.' + name + '.js'
                    };
                }),
                options: {
                    process: function(src, file) {
                        var wrapper = grunt.file.read('src/i18n/.wrapper.js').replace(/\r\n/g, '\n').split(/@@js\n/);
                        return process_lang(file, src, wrapper);
                    }
                }
            },
            // compîle language files without wrapper
            lang_temp: {
                files: Object.keys(all_langs).map(function(name) {
                    return {
                        src: 'src/i18n/'+ name +'.json',
                        dest: '.temp/i18n/' + name + '.js'
                    };
                }),
                options: {
                    process: function(src, file) {
                        return process_lang(file, src);
                    }
                }
            },
            // add banner to CSS files
            css: {
                options: {
                    banner: '<%= banner %>\n\n',
                },
                files: [{
                    expand: true,
                    src: ['dist/css/*.css', 'dist/scss/*.scss'],
                    dest: ''
                }]
            }
        },

        wrap: {
            // add AMD wrapper and banner
            js: {
                src: ['dist/js/query-builder.js'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        var wrapper = grunt.file.read('src/.wrapper.js').replace(/\r\n/g, '\n').split(/@@js\n/);

                        if (loaded_plugins.length) {
                            wrapper[0] = '// Plugins: ' + loaded_plugins.join(', ') + '\n' + wrapper[0];
                        }
                        if (loaded_langs.length) {
                            wrapper[0] = '// Languages: ' + loaded_langs.join(', ') + '\n' + wrapper[0];
                        }
                        wrapper[0] = grunt.template.process('<%= banner %>\n\n') + wrapper[0];

                        return wrapper;
                    }
                }
            },
            // add plugins SASS imports
            sass: {
                src: ['dist/scss/default.scss'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        return ['', loaded_plugins.reduce(function(wrapper, name) {
                            if (grunt.file.exists('dist/scss/plugins/' + name + '.scss')) {
                                wrapper+= '\n@import \'plugins/' + name + '\';';
                            }
                            return wrapper;
                        }, '\n')];
                    }
                }
            }
        },

        // parse scss
        sass: {
            options: {
                sourcemap: 'none',
                style: 'expanded'
            },
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/scss/*.scss'],
                    dest: 'dist/css',
                    ext: '.css',
                    rename: function(dest, src) {
                        return dest + '/query-builder.' + src;
                    }
                }]
            }
        },

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n\n',
                mangle: { except: ['$'] }
            },
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/js/*.js', '!dist/js/*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },

        // compress css
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/css/*.css', '!dist/css/*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            }
        },

        // clean build dir
        clean: {
            temp: ['.temp']
        },

        // jshint tests
        jshint: {
            lib: {
                options: {
                    '-W069': true // accesses to "regional" in language files
                },
                src: js_files_to_load
            }
        },

        // inject all source files and test modules in the test file
        'string-replace': {
            test: {
                src: 'tests/index.html',
                dest: 'tests/index.html',
                options: {
                    replacements: [{
                        pattern: /(<!-- qunit:imports -->)(?:[\s\S]*)(<!-- \/qunit:imports -->)/m,
                        replacement: function(match, m1, m2) {
                            var scripts = '\n';

                            js_core_files.forEach(function(file) {
                                scripts+= '<script src="../' + file + '" data-cover></script>\n';
                            });

                            scripts+= '\n';

                            for (var p in all_plugins) {
                                scripts+= '<script src="../' + all_plugins[p] + '" data-cover></script>\n';
                            }

                            return m1 + scripts + m2;
                        }
                    }, {
                        pattern: /(<!-- qunit:modules -->)(?:[\s\S]*)(<!-- \/qunit:modules -->)/m,
                        replacement: function(match, m1, m2) {
                            var scripts = '\n';

                            grunt.file.expand('tests/*.module.js').forEach(function(file) {
                                scripts+= '<script src="../' + file + '"></script>\n';
                            });

                            return m1 + scripts + m2;
                        }
                    }]
                }
            }
        },

        // qunit test suite
        qunit: {
            all: {
                options: {
                    urls: ['tests/index.html?coverage=true'],
                    noGlobals: true
                }
            }
        },

        // save LCOV files
        qunit_blanket_lcov: {
            all: {
                files: [{
                    expand: true,
                    src: ['src/*.js', 'src/plugins/**/plugin.js']
                }],
                options: {
                    dest: '.coverage-results/all.lcov'
                }
            }
        },

        // coveralls data
        coveralls: {
            options: {
                force: true
            },
            all: {
                src: '.coverage-results/all.lcov',
            }
        }
    });


    // list the triggers and changes
    grunt.registerTask('describe_triggers', 'List QueryBuilder triggers.', function() {
        var triggers = {};
        var total = 0;

        for (var f in all_js_files) {
            grunt.file.read(all_js_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /(e = )?(?:this|that)\.(trigger|change)\('(\w+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    triggers[matches[3]] = {
                        name: matches[3],
                        type: matches[2],
                        file: all_js_files[f],
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
            grunt.log.writeln('   ' + (triggers[t].file +':'+ triggers[t].line)['red'] + ' ' + triggers[t].args);
            grunt.log.write('\n');
        }

        grunt.log.writeln((total + ' Triggers in QueryBuilder.')['cyan']['bold']);
    });

    // list all possible thrown errors
    grunt.registerTask('describe_errors', 'List QueryBuilder errors.', function() {
        var errors = {};
        var total = 0;

        for (var f in all_js_files) {
            grunt.file.read(all_js_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /Utils\.error\('(\w+)', '([^)]+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    (errors[matches[1]] = errors[matches[1]] || []).push({
                        type: matches[1],
                        message: matches[2],
                        file: all_js_files[f],
                        line: i,
                        args: matches[3].slice(2).split(', ')
                    });

                    total++;
                }
            });
        }

        grunt.log.write('\n');

        for (var e in errors) {
            grunt.log.writeln((e+'Error')['cyan']);
            errors[e].forEach(function(error) {
                var message = error.message.replace(/{([0-9]+)}/g, function(m, i) {
                    return error.args[parseInt(i)]['yellow'];
                });
                grunt.log.writeln('   ' + (error.file +':'+ error.line)['red']);
                grunt.log.writeln('      ' + message);
            });
            grunt.log.write('\n');
        }

        grunt.log.writeln((total + ' Errors in QueryBuilder.')['cyan']['bold']);
    });

    // display available modules
    grunt.registerTask('list_modules', 'List QueryBuilder plugins and languages.', function() {
        grunt.log.writeln('\nAvailable QueryBuilder plugins:\n');

        for (var p in all_plugins) {
            grunt.log.write(p['cyan']);

            if (grunt.file.exists(all_plugins[p].replace(/js$/, 'scss'))) {
                grunt.log.write(' + CSS');
            }

            grunt.log.write('\n');
        }

        grunt.log.writeln('\nAvailable QueryBuilder languages:\n');

        for (var l in all_langs) {
            if (l !== 'en') {
                grunt.log.writeln(l['cyan']);
            }
        }
    });


    grunt.registerTask('build_js', [
        'concat:lang_temp',
        'concat:js',
        'wrap:js',
        'concat:js_standalone',
        'uglify',
        'clean:temp'
    ]);

    grunt.registerTask('build_css', [
        'copy:sass_core',
        'copy:sass_plugins',
        'wrap:sass',
        'sass',
        'cssmin',
        'concat:css'
    ]);

    grunt.registerTask('build_lang', [
        'concat:lang'
    ]);

    grunt.registerTask('default', [
        'build_lang',
        'build_js',
        'build_css'
    ]);

    grunt.registerTask('test', [
        'default',
        'jshint',
        'string-replace:test',
        'qunit_blanket_lcov',
        'qunit'
    ]);
};