var deepmerge = require('deepmerge');

function removeJshint(src) {
    return src
      .replace(/\/\*jshint [a-z:]+ \*\/\r?\n\r?\n?/g, '')
      .replace(/\/\*jshint -[EWI]{1}[0-9]{3} \*\/\r?\n\r?\n?/g, '');
}

module.exports = function(grunt) {
    grunt.util.linefeed = '\n';

    var all_modules = {},
        all_langs = {},
        loaded_modules = [],
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
        js_files_for_standalone = [
            'bower_components/jquery-extendext/jQuery.extendext.js',
            'dist/js/query-builder.js'
        ];


    (function(){
        // list available modules and languages
        grunt.file.expand('src/plugins/*/plugin.js')
        .forEach(function(f) {
            var n = f.split('/')[2];
            all_modules[n] = f;
        });

        grunt.file.expand('src/i18n/*.json')
        .forEach(function(f) {
            var n = f.split(/[\/\.]/)[2];
            all_langs[n] = f;
        });

        // parse 'modules' parameter
        var arg_modules = grunt.option('modules');
        if (typeof arg_modules === 'string') {
            arg_modules.replace(/ /g, '').split(',').forEach(function(m) {
                if (all_modules[m]) {
                    js_files_to_load.push(all_modules[m]);
                    loaded_modules.push(m);
                }
                else {
                    grunt.fail.warn('Module '+ m +' unknown');
                }
            });
        }
        else if (arg_modules === undefined) {
            for (var m in all_modules) {
                js_files_to_load.push(all_modules[m]);
                loaded_modules.push(m);
            }
        }

        // default language
        js_files_to_load.push('dist/i18n/en.js');
        loaded_langs.push('en');

        // parse 'lang' parameter
        var arg_langs = grunt.option('languages');
        if (typeof arg_langs === 'string') {
            arg_langs.replace(/ /g, '').split(',').forEach(function(l) {
                if (all_langs[l]) {
                    if (l !== 'en') {
                        js_files_to_load.push(all_langs[l].replace(/^src/, 'dist').replace(/json$/, 'js'));
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
            ' * <%= lang_copyright %>\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // bump version
        bump: {
            options: {
                files: ['package.json', 'bower.json', 'composer.json']
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
                files: loaded_modules.map(function(name) {
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
            // compile language files
            lang: {
                files: Object.keys(all_langs).map(function(name) {
                    return {
                        src: 'src/i18n/'+ name +'.json',
                        dest: 'dist/i18n/' + name + '.js'
                    };
                }),
                options: {
                    stripBanners: false,
                    process: function(src, file) {
                        var lang = file.split(/[\/\.]/)[2];
                        var content = JSON.parse(src);

                        grunt.config.set('lang_copyright', content.__copyright || (lang + ' translation'));
                        var header = grunt.template.process('<%= langBanner %>');
                        delete content.__copyright;

                        loaded_modules.forEach(function(m) {
                            var plugin_file = 'src/plugins/'+ m +'/i18n/'+ lang +'.json';

                            if (grunt.file.exists(plugin_file)) {
                                content = deepmerge(content, grunt.file.readJSON(plugin_file));
                            }
                        });
                        
                        return header
                          + '\n\n'
                          + 'jQuery.fn.queryBuilder.regional[\'' + lang + '\'] = '
                          + JSON.stringify(content, null, 2)
                          + ';\n\n'
                          + 'jQuery.fn.queryBuilder.defaults({ lang_code: \'' + lang + '\' });'
                    }
                }
            },
            // add banner to CSS files
            css: {
                options: {
                    stripBanners: { block: true },
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
            // add AMD wrapper
            js: {
                src: ['dist/js/query-builder.js'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        var wrapper = grunt.file.read('src/.wrapper.js').replace(/\r\n/g, '\n').split(/@@js\n/);

                        if (loaded_modules.length) {
                            wrapper[0] = '// Modules: ' + loaded_modules.join(', ') + '\n' + wrapper[0];
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
                        return ['', loaded_modules.reduce(function(wrapper, name) {
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

                            for (var m in all_modules) {
                                scripts+= '<script src="../' + all_modules[m] + '" data-cover></script>\n';
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


    // list the triggers and changes in core code
    grunt.registerTask('describe_triggers', 'List QueryBuilder triggers.', function() {
        var triggers = {};

        for (var f in js_core_files) {
            grunt.file.read(js_core_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /(e = )?(?:this|that)\.(trigger|change)\('(\w+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    triggers[matches[3]] = {
                        name: matches[3],
                        type: matches[2],
                        file: js_core_files[f],
                        line: i,
                        args: matches[4].slice(2),
                        prevent: !!matches[1]
                    };
                }
            });
        }

        grunt.log.writeln('\nTriggers in QueryBuilder:\n');

        for (var t in triggers) {
            grunt.log.write((triggers[t].name)['cyan'] + ' ' + triggers[t].type);
            if (triggers[t].prevent) grunt.log.write(' (*)'['yellow']);
            grunt.log.write('\n');
            grunt.log.write('   ' + (triggers[t].file +':'+ triggers[t].line)['red'] + ' ' + triggers[t].args);
            grunt.log.write('\n\n');
        }
    });

    // display available modules
    grunt.registerTask('list_modules', 'List QueryBuilder plugins and languages.', function() {
        grunt.log.writeln('\nAvailable QueryBuilder plugins:\n');

        for (var m in all_modules) {
            grunt.log.write(m['cyan']);

            if (grunt.file.exists(all_modules[m].replace(/js$/, 'scss'))) {
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


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-qunit-blanket-lcov');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('build_js', [
        'concat:js',
        'wrap:js',
        'concat:js_standalone',
        'uglify'
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