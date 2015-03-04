var deepmerge = require('deepmerge');

module.exports = function(grunt) {
    var all_modules = {},
        all_langs = {},
        loaded_modules = [],
        loaded_lang = '',
        js_core_files = [
            'src/main.js',
            'src/model.js',
            'src/defaults.js',
            'src/public.js',
            'src/data.js',
            'src/template.js',
            'src/jquery.js',
            'src/utils.js'
        ],
        css_core_files = [
            'src/scss/default.scss'
        ],
        js_files_to_load = js_core_files.slice(),
        css_files_to_load = css_core_files.slice(),
        js_files_for_standalone = [
            'bower_components/microevent-mistic100/microevent.js',
            'bower_components/jquery-extendext/jQuery.extendext.js',
            'dist/query-builder.js'
        ];

    // list available modules and languages
    grunt.file.expand('src/plugins/*/plugin.js')
    .forEach(function(f) {
        all_modules[f.split('/')[2]] = f;
    });

    grunt.file.expandMapping('src/i18n/*.js', '', {
        flatten: true, ext: ''
    })
    .forEach(function(f) {
        all_langs[f.dest] = f.src[0];
    });

    // parse 'modules' parameter
    var arg_modules = grunt.option('modules');
    if (typeof arg_modules === 'string') {
        arg_modules.split(',').forEach(function(m) {
            m = m.trim();
            if (all_modules[m]) {
                js_files_to_load.push(all_modules[m]);
                loaded_modules.push(m);
            }
            else if (m !== 'none') {
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

    // parse 'lang' parameter
    var arg_lang = grunt.option('lang');
    if (typeof arg_lang === 'string') {
        if (all_langs[arg_lang]) {
            if (arg_lang != 'en') {
                js_files_to_load.push(all_langs[arg_lang].replace(/^src/, 'dist'));
            }
            loaded_lang = arg_lang;
        }
        else {
            grunt.fail.warn('Lang '+ arg_lang +' unknown');
        }
    }

    // get css files for loaded modules
    loaded_modules.forEach(function(m) {
        var css_file = 'src/plugins/'+ m +'/plugin.scss';
        if (grunt.file.exists(css_file)) {
            css_files_to_load.push(css_file);
        }
    });


    function removeJshint(src) {
        return src
          .replace(/\/\*jshint [a-z:]+ \*\/\r?\n/g, '')
          .replace(/\/\*jshint -[EWI]{1}[0-9]{3} \*\/\r?\n/g, '');
    }

    function removeWrapper(src) {
        return src
          .replace(/\(function\(\$\){\r?\n/g, '')
          .replace(/\r?\n}\(jQuery\)\);/g, '')
          .replace(/[ \t]*"use strict";\r?\n/g, '')
          .replace(/\r?\n( *\/\/ [^\r\n]*\r?\n)+ *\/\/ =+/g, '');
    }


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
            ' * <%= copyright %>\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // watcher
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
                files: ['src/i18n/*.js', 'src/plugins/**/i18n/*.js'],
                tasks: ['build_lang']
            }
        },

        // concat plugins
        concat: {
            options: {
                separator: '\n\n',
                stripBanners: {
                    block: true
                }
            },
            css: {
                src: css_files_to_load,
                dest: 'dist/query-builder.scss',
                options: {
                    banner: '<%= banner %>\n\n'
                }
            },
            js: {
                src: js_files_to_load,
                dest: 'dist/query-builder.js',
                options: {
                    // remove wrappers, use strict, jshint directives, sections comments
                    process: function(src) {
                        return removeWrapper(removeJshint(src));
                    }
                }
            }
        },

        // add AMD wrapper
        wrap: {
            js: {
                src: ['dist/query-builder.js'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        var wrapper = grunt.file.read('src/.wrapper.js').split(/@@js\r?\n/);

                        if (loaded_modules.length) {
                            wrapper[0] = '// Modules: ' + loaded_modules.join(', ') + '\n' + wrapper[0];
                        }
                        if (loaded_lang.length) {
                            wrapper[0] = '// Language: ' + loaded_lang + '\n' + wrapper[0];
                        }
                        wrapper[0] = grunt.template.process('<%= banner %>\n\n') + wrapper[0];

                        return wrapper;
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
            files: {
                src: 'dist/query-builder.scss',
                dest: 'dist/query-builder.css'
            }
        },

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n',
                mangle: { except: ['$'] }
            },
            dist: {
                files: {
                    'dist/query-builder.min.js': [
                        'dist/query-builder.js'
                    ],
                    'dist/query-builder.standalone.min.js': [
                        'dist/query-builder.standalone.js'
                    ]
                }
            }
        },

        // compress css
        cssmin: {
            options: {
                banner: '<%= banner %>',
                keepSpecialComments: 0
            },
            dist: {
                files: {
                    'dist/query-builder.min.css': [
                        'dist/query-builder.css'
                    ]
                }
            }
        },

        // jshint tests
        jshint: {
            lib: {
                files: {
                    src: js_files_to_load
                }
            }
        },

        // qunit test suite
        qunit: {
            all: ['tests/*.html']
        }
    });

    // build standalone version with dependencies
    // from https://github.com/brianreavis/selectize.js/blob/master/Gruntfile.js
    grunt.registerTask('build_standalone', '', function() {
        var files = [],
            modules = [];

        // get sources with named definitions
        for (var i=0, n=js_files_for_standalone.length; i<n; i++) {
            var path = js_files_for_standalone[i],
                name = path.match(/([^\/]+?).js$/)[1],
                source = grunt.file.read(path);

            source = source.replace(/define\((.*?)factory\);/, 'define(\'' + name + '\', $1factory);');
            source = removeJshint(source);
            modules.push(source);
        }

        // write output
        path = 'dist/query-builder.standalone.js';
        grunt.file.write(path, modules.join('\n\n'));
        grunt.log.writeln('Built "' + path + '".');
    });

    // compile language files
    // create executable JS files from JSON + optional plugins JSON
    grunt.registerTask('build_lang', '', function() {
        var content, header, plugin_lang;

        for (var l in all_langs) {
            content = grunt.file.readJSON(all_langs[l]);
            grunt.config.set('copyright', content.__copyright || (l + ' translation'));
            header = grunt.template.process('<%= langBanner %>\n');

            delete content.__copyright;

            loaded_modules.forEach(function(m) {
                plugin_lang = 'src/plugins/'+ m +'/i18n/'+ l +'.js';

                if (grunt.file.exists(plugin_lang)) {
                    content = deepmerge(content, grunt.file.readJSON(plugin_lang));
                }
            });

            content = 'jQuery.fn.queryBuilder.defaults({ lang: ' +  JSON.stringify(content, null, 2) + '});';
            path = 'dist/i18n/'+ l  +'.js';

            grunt.file.write(path, header + content);
        }
    });

    // list the triggers and changes in core code
    grunt.registerTask('describe_triggers', '', function() {
        var triggers = {};

        core = grunt.file.read('src/query-builder.js').split('\n').forEach(function(line, i) {
            var matches = /(?:this|that)\.(trigger|change)\('(\w+)'[^)]*\);/.exec(line);
            if (matches !== null) {
                triggers[matches[2]] = triggers[matches[2]] || {
                    name: matches[2],
                    type: matches[1],
                    usages: []
                };

                triggers[matches[2]].usages.push([i, matches[0].slice(0,-1)]);
            }
        });

        grunt.log.writeln('\nTriggers in QueryBuilder:\n');

        for (var t in triggers) {
            grunt.log.write((triggers[t].name)['cyan']);
            grunt.log.writeln(' (' + triggers[t].type + ')');

            triggers[t].usages.forEach(function(line) {
                grunt.log.write('+-- ');
                grunt.log.write((':' + line[0])['red']);
                grunt.log.writeln(' ' + line[1]);
            });

            grunt.log.write('\n');
        }
    });

    // display available modules
    grunt.registerTask('list_modules', '', function() {
        grunt.log.writeln('\nAvailable QueryBuilder plugins:\n');

        for (var m in all_modules) {
            grunt.log.write(m['cyan']);

            if (grunt.file.exists(all_modules[m].replace(/js$/, 'css'))) {
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('build_js', [
        'concat:js',
        'wrap:js',
        'build_standalone',
        'uglify'
    ]);

    grunt.registerTask('build_css', [
        'concat:css',
        'sass',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'build_lang',
        'build_js',
        'build_css'
    ]);

    grunt.registerTask('test', [
        'default',
        'qunit',
        'jshint'
    ]);
};