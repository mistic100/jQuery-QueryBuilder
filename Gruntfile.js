module.exports = function(grunt) {
    // list available modules and languages
    var modules = {},
        langs = {},
        files_to_load = [],
        files_for_standalone = [
            'bower_components/microevent-mistic100/microevent.js',
            'dist/query-builder.js'
        ],
        loaded_modules = [],
        loaded_lang = '';
        
    grunt.file.expandMapping('src/plugins/*.js', '', {
        flatten: true, ext: ''
    })
    .forEach(function(f) {
        modules[f.dest] = f.src[0];
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
                files_to_load.push(modules[m]);
                loaded_modules.push(m);
            }
            else {
                grunt.fail.warn('Module '+ m +' unknown');
            }
        });
    }
    else if (arg_modules === undefined) {
        for (var m in modules) {
            files_to_load.push(modules[m]);
            loaded_modules.push(m);
        }
    }
    
    // parse 'lang' parameter
    var arg_lang = grunt.option('lang');
    if (typeof arg_lang === 'string') {
        if (langs[arg_lang]) {
            if (arg_lang != 'en') {
                files_to_load.push(langs[arg_lang]);
            }
            loaded_lang = arg_lang;
        }
        else {
            grunt.fail.warn('Lang '+ arg_lang +' unknown');
        }
    }
    
    grunt.log.writeln('Merged files: ['+ files_to_load.join(', ') +']');

    
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
                separator: '',
                stripBanners: {
                    block: true
                }
            },
            css: {
                src: ['src/query-builder.css'],
                dest: 'dist/query-builder.css',
                options: {
                    banner: '<%= banner %>\n'
                }
            },
            js: {
                src: ['src/query-builder.js'].concat(files_to_load),
                dest: 'dist/query-builder.js',
                options: {
                    // remove wrappers, use strict, jshint directives, sections comments
                    process: function(src, file) {
                        return src
                          .replace(/\(function\(\$\){\n/g, '')
                          .replace(/\n}\(jQuery\)\);/g, '')
                          .replace(/[ \t]*"use strict";\n/g, '')
                          .replace(/\/\*jshint [a-z:]+ \*\/\n/g, '')
                          .replace(/\n( *\/\/ [^\n]*\n)+ *\/\/ =+/g, '');
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
                banner: '<%= banner %>\n'
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
                    src: [
                        'src/query-builder.js',
                        'src/query-builder-sql-support.js'
                    ]
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
            modules.push(source);
        }
        
        // write output
        path = 'dist/query-builder.standalone.js';
        grunt.file.write(path, modules.join('\n\n'));
        grunt.log.writeln('Built "' + path + '".');
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