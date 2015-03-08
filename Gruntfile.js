var deepmerge = require('deepmerge'),
    fs = require('fs');

module.exports = function(grunt) {
    grunt.util.linefeed = '\n';

    var all_modules = {},
        all_langs = {},
        loaded_modules = [],
        loaded_lang = '',
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
        js_files_to_load = [],
        js_files_for_standalone = [
            'bower_components/microevent-mistic100/microevent.js',
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

        grunt.file.expand('src/i18n/*.js')
        .forEach(function(f) {
            var n = f.split('/')[2].split('.')[0];
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
                    loaded_lang = arg_lang;
                }
            }
            else {
                grunt.fail.warn('Lang '+ arg_lang +' unknown');
            }
        }
    }());

    function removeJshint(src) {
        return src
          .replace(/\/\*jshint [a-z:]+ \*\/\r?\n/g, '')
          .replace(/\/\*jshint -[EWI]{1}[0-9]{3} \*\/\r?\n/g, '');
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
                files: ['src/i18n/*.js', 'src/plugins/**/i18n/*.js'],
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
            options: {
                stripBanners: {
                    block: true
                }
            },
            // concat all JS
            js: {
                src: js_core_files.concat(js_files_to_load),
                dest: 'dist/js/query-builder.js',
                options: {
                    separator: '\n\n',
                    process: function(src) {
                        return removeJshint(src).replace(/\r\n/g, '\n');
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
                    flatten: true,
                    src: ['dist/css/*.css', '!dist/css/*.min.css'],
                    dest: 'dist/css'
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
                        var wrapper = grunt.file.read('src/.wrapper.js').replace(/\r\n/g, '\n')
                        wrapper = wrapper.split(/@@js\n/);

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
                banner: '<%= banner %>\n',
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
            options: {
                banner: '<%= banner %>',
                keepSpecialComments: 0
            },
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
                files: {
                    src: js_core_files.concat(js_files_to_load)
                }
            }
        },

        // qunit test suite
        qunit: {
            all: {
                options: {
                    urls: ['tests/index.html?coverage=true&lcovReport'],
                    noGlobals: true
                }
            }
        },

        // coveralls data
        coveralls: {
            options: {
                force: true
            },
            all: {
                src: '.coverage-results/core.lcov',
            }
        }
    });

    // save Blanket code coverage results
    grunt.event.on('qunit.report', function(data) {
        data = data.split("\n");
        data[0] = 'SF:dist/js/query-builder.js';
        data = data.join("\n");

        grunt.file.write('.coverage-results/core.lcov', data);
    });

    // build standalone version with dependencies
    grunt.registerTask('build_standalone', 'Create standalone build of QueryBuilder.', function() {
        var files = [],
            modules = [],
            path, name, source;

        // get sources with named definitions
        for (var i=0, n=js_files_for_standalone.length; i<n; i++) {
            path = js_files_for_standalone[i];
            name = path.match(/([^\/]+?).js$/)[1];
            source = grunt.file.read(path);

            source = source.replace(/define\((.*?)\);/, 'define(\'' + name + '\', $1);');
            source = removeJshint(source).replace(/\r\n/g, '\n');
            modules.push(source);
        }

        // write output
        path = 'dist/js/query-builder.standalone.js';
        grunt.file.write(path, modules.join('\n\n'));
        grunt.log.writeln('File ' + path['cyan'] + ' created.');
    });

    // compile language files
    // create executable JS files from JSON + optional plugins JSON
    grunt.registerTask('build_lang', 'Build QueryBuilder language files.', function() {
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
    grunt.registerTask('describe_triggers', 'List QueryBuilder triggers.', function() {
        var triggers = {};

        for (var f in js_core_files) {
            grunt.file.read(js_core_files[f]).split(/\r?\n/).forEach(function(line, i) {
                var matches = /(?:this|that)\.(trigger|change)\('(\w+)'([^)]*)\);/.exec(line);
                if (matches !== null) {
                    triggers[matches[2]] = triggers[matches[2]] || {
                        name: matches[2],
                        type: matches[1],
                        usages: []
                    };

                    triggers[matches[2]].usages.push([js_core_files[f]+':'+i, matches[3]]);
                }
            });
        }

        grunt.log.writeln('\nTriggers in QueryBuilder:\n');

        for (var t in triggers) {
            grunt.log.write((triggers[t].name)['cyan']);
            grunt.log.writeln(' (' + triggers[t].type + ')');

            triggers[t].usages.forEach(function(line) {
                grunt.log.write('+-- ');
                grunt.log.write(line[0]['red']);
                grunt.log.writeln(' ' + line[1]);
            });

            grunt.log.write('\n');
        }
    });

    // display available modules
    grunt.registerTask('list_modules', 'List QueryBuilder plugins and languages.', function() {
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
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('build_js', [
        'concat:js',
        'wrap:js',
        'build_standalone',
        'uglify'
    ]);

    grunt.registerTask('build_css', [
        'copy:sass_core',
        'copy:sass_plugins',
        'wrap:sass',
        'sass',
        'concat:css',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'build_lang',
        'build_js',
        'build_css'
    ]);

    grunt.registerTask('test', [
        'default',
        'jshint',
        'qunit'
    ]);
};