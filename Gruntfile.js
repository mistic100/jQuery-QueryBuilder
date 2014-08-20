module.exports = function(grunt) {
    // list available modules and languages
    var modules = {
            'sql': 'src/query-builder-sql-support.js'
        },
    
        langs = {},
        files = [];
        
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
            if (modules[m]) {
                files.push(modules[m]);
            }
            else {
                grunt.fail.warn('Module '+ m +' unknown');
            }
        });
    }
    else if (arg_modules === undefined) {
        for (var m in modules) {
            files.push(modules[m]);
        }
    }
    
    // parse 'lang' parameter
    var arg_lang = grunt.option('lang');
    if (typeof arg_lang === 'string') {
        if (langs[arg_lang]) {
            if (arg_lang != 'en') {
                files.push(langs[arg_lang]);
            }
        }
        else {
            grunt.fail.warn('Lang '+ arg_lang +' unknown');
        }
    }
    
    grunt.log.writeln('Merged files: ['+ files.join(', ') +']');

    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!\n'+
            ' * jQuery QueryBuilder <%= pkg.version %>\n'+
            ' * Copyright <%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n'+
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
                banner: '<%= banner %>\n',
                stripBanners: {
                    block: true
                }
            },
            src: {
                files: {
                    'dist/query-builder.css': [
                        'src/query-builder.css'
                    ],
                    'dist/query-builder.js': [
                        'src/query-builder.js'
                    ].concat(files)
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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'copy',
        'concat',
        'uglify',
        'cssmin'
    ]);
    
    grunt.registerTask('test', [
        'qunit',
        'jshint'
    ]);
};