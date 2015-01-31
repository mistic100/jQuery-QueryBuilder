module.exports = function(grunt) {
    // list available modules and languages
    var modules = {},
        langs = {},
        js_files_to_load = [],
        css_files_to_load = [],
        files_for_standalone = [
            'bower_components/microevent-mistic100/microevent.js',
            'bower_components/jquery-extendext/jQuery.extendext.js',
            'dist/query-builder.js'
        ],
        loaded_modules = [],
        loaded_lang = '';

    grunt.file.expand('src/plugins/*/plugin.js')
    .forEach(function(f) {
        modules[f.split('/')[2]] = f;
    });

    grunt.file.expandMapping('src/i18n/*.js', '', {
        flatten: true, ext: ''
    })
    .forEach(function(f) {
        langs[f.dest] = f.src[0];
    });

    // parse 'modules' parameter
    var arg_modules = grunt.option('modules');
    if (typeof arg_modules === 'string') {
        arg_modules.split(',').forEach(function(m) {
            m = m.trim();
            if (modules[m]) {
                js_files_to_load.push(modules[m]);
                loaded_modules.push(m);
            }
            else if (m !== 'none') {
                grunt.fail.warn('Module '+ m +' unknown');
            }
        });
    }
    else if (arg_modules === undefined) {
        for (var m in modules) {
            js_files_to_load.push(modules[m]);
            loaded_modules.push(m);
        }
    }

    // parse 'lang' parameter
    var arg_lang = grunt.option('lang');
    if (typeof arg_lang === 'string') {
        if (langs[arg_lang]) {
            if (arg_lang != 'en') {
                js_files_to_load.push(langs[arg_lang]);
            }
            loaded_lang = arg_lang;
        }
        else {
            grunt.fail.warn('Lang '+ arg_lang +' unknown');
        }
    }

    // get css files for loaded mofules
    js_files_to_load.forEach(function(js_file) {
        var css_file = js_file.replace(/js$/, 'css');
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

        // copy i18n
        copy: {
            i18n: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/i18n/*.js'],
                    dest: 'dist/i18n'
                }]
            }
        },

        // copy src
        concat: {
            options: {
                separator: '\n',
                stripBanners: {
                    block: true
                }
            },
            css: {
                src: ['src/query-builder.css'].concat(css_files_to_load),
                dest: 'dist/query-builder.css',
                options: {
                    banner: '<%= banner %>\n',
                    // remove sections comments
                    process: function(src) {
                        return src.replace(/\/\* [^\r\n]* \*\/\r?\n/g, '');
                    }
                }
            },
            js: {
                src: ['src/query-builder.js'].concat(js_files_to_load),
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
            dist: {
                src: ['dist/query-builder.js'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        var wrapper = grunt.file.read('src/.wrapper.js').split('@@js\n');

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
                    src: ['src/query-builder.js'].concat(js_files_to_load)
                }
            }
        },

        // qunit test suite
        qunit: {
            all: ['tests/*.html']
        }
    });

    // from https://github.com/brianreavis/selectize.js/blob/master/Gruntfile.js
    grunt.registerTask('build_standalone', '', function() {
        var files = [],
            modules = [];

        // get sources with named definitions
        for (var i=0, n=files_for_standalone.length; i<n; i++) {
            var path = files_for_standalone[i],
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

    // display avilable modules
    grunt.registerTask('list_modules', '', function() {
        grunt.log.writeln('\nAvailable QueryBuilder plugins:\n');

        for (var m in modules) {
          grunt.log.write(m['cyan']);

          if (grunt.file.exists(modules[m].replace(/js$/, 'css'))) {
            grunt.log.write(' + CSS');
          }

          grunt.log.write('\n');
        }
        
        grunt.log.writeln('\nAvailable QueryBuilder languages:\n');

        for (var l in langs) {
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
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('default', [
        'copy',
        'concat',
        'wrap',
        'build_standalone',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('test', [
        'qunit',
        'jshint'
    ]);
};