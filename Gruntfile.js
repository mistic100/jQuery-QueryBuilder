module.exports = function(grunt) {
    var lang = grunt.option('lang') || 'en';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner:
            '/*!\n'+
            ' * jQuery QueryBuilder <%= pkg.version %>\n'+
            ' * Copyright <%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n'+
            ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n'+
            ' */',

        // compress js
        uglify: {
            options: {
                banner: '<%= banner %>\n'
            },
            nolang: {
                files: {
                    'dist/query-builder.min.js': ['src/query-builder.js']
                }
            },
            lang: {
                files: {
                    'dist/query-builder.min.js': [
                        'src/query-builder.js',
                        'src/i18n/'+ lang +'.js'
                    ]
                }
            }
        },

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

        // compress css
        cssmin: {
            options: {
                banner: '<%= banner %>',
                keepSpecialComments: 0
            },
            dist: {
                files: {
                    'dist/query-builder.min.css': [
                        'src/query-builder.css'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        'uglify:nolang',
        'copy',
        'cssmin'
    ]);

    grunt.registerTask('onelang', [
        'uglify:lang',
        'cssmin'
    ]);
};