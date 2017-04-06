var initConfig = require('./build/initConfig');
var processLang = require('./build/processLang');
var removeJshint = require('./build/removeJshint');
var cleanLn = require('./build/cleanLn');

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        scsslint: 'grunt-scss-lint',
        sass_injection: 'grunt-sass-injection',
        usebanner: 'grunt-banner'
    });

    grunt.util.linefeed = '\n';

    var config = initConfig(grunt, {
        js_core_files: [
            'src/main.js',
            'src/defaults.js',
            'src/plugins.js',
            'src/core.js',
            'src/public.js',
            'src/data.js',
            'src/template.js',
            'src/model.js',
            'src/utils.js',
            'src/jquery.js'
        ],
        js_files_for_standalone: [
            'bower_components/jquery-extendext/jQuery.extendext.js',
            'bower_components/doT/doT.js',
            'dist/js/query-builder.js'
        ]
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
        ' * jQuery QueryBuilder <%= pkg.version %>\n' +
        ' * Copyright 2014-<%= grunt.template.today("yyyy") %> Damien "Mistic" Sorel (http://www.strangeplanet.fr)\n' +
        ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n' +
        ' */',

        langBanner: '/*!\n' +
        ' * jQuery QueryBuilder <%= pkg.version %>\n' +
        ' * Locale: <%= lang_locale %>\n' +
        '<% if (lang_author) { %> * Author: <%= lang_author %>\n<% } %>' +
        ' * Licensed under MIT (http://opensource.org/licenses/MIT)\n' +
        ' */',

        // serve folder content
        connect: {
            dev: {
                options: {
                    host: '0.0.0.0',
                    port: 9000,
                    livereload: true
                }
            }
        },

        // watchers
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['src/*.js', 'src/plugins/**/plugin.js'],
                tasks: ['injector:example']
            },
            css: {
                files: ['src/scss/*.scss', 'src/plugins/**/plugin.scss'],
                tasks: ['build_css']
            },
            lang: {
                files: ['src/i18n/*.json', 'src/plugins/**/i18n/*.json'],
                tasks: ['build_lang']
            },
            example: {
                files: ['examples/**'],
                tasks: []
            }
        },

        // open example
        open: {
            dev: {
                path: 'http://localhost:<%= connect.dev.options.port%>/examples/index.html'
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
                files: config.loaded_plugins.map(function(name) {
                    return {
                        src: 'src/plugins/' + name + '/plugin.scss',
                        dest: 'dist/scss/plugins/_' + name + '.scss'
                    };
                })
            },
            doc_script: {
                src: 'build/jsdoc.js',
                dest: 'doc/js/custom.js'
            }
        },

        concat: {
            // concat all JS
            js: {
                src: config.js_files_to_load,
                dest: 'dist/js/query-builder.js',
                options: {
                    stripBanners: false,
                    separator: '\n\n',
                    process: function(src) {
                        return cleanLn(removeJshint(src));
                    }
                }
            },
            // create standalone version
            js_standalone: {
                src: config.js_files_for_standalone,
                dest: 'dist/js/query-builder.standalone.js',
                options: {
                    stripBanners: false,
                    separator: '\n\n',
                    process: function(src, file) {
                        var name = file.match(/([^\/]+?).js$/)[1];

                        return cleanLn(removeJshint(src))
                            .replace(/define\((.*?)\);/, 'define(\'' + name + '\', $1);');
                    }
                }
            },
            // compile language files with AMD wrapper
            lang: {
                files: Object.keys(config.all_langs).map(function(name) {
                    return {
                        src: 'src/i18n/' + name + '.json',
                        dest: 'dist/i18n/query-builder.' + name + '.js'
                    };
                }),
                options: {
                    process: function(src, file) {
                        var wrapper = cleanLn(grunt.file.read('src/i18n/.wrapper.js')).split(/@@js\n/);
                        return processLang(grunt, config.loaded_plugins)(file, src, wrapper);
                    }
                }
            },
            // compile language files without AMD wrapper
            lang_temp: {
                files: Object.keys(config.all_langs).map(function(name) {
                    return {
                        src: 'src/i18n/' + name + '.json',
                        dest: '.temp/i18n/' + name + '.js'
                    };
                }),
                options: {
                    process: function(src, file) {
                        return processLang(grunt, config.loaded_plugins)(file, src);
                    }
                }
            }
        },

        // add AMD wrapper
        wrap: {
            js: {
                src: ['dist/js/query-builder.js'],
                dest: '',
                options: {
                    separator: '',
                    wrapper: function() {
                        return cleanLn(grunt.file.read('src/.wrapper.js')).split(/@@js\n/);
                    }
                }
            }
        },

        // add banners
        usebanner: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                src: ['dist/js/*.js']
            },
            css: {
                src: ['dist/css/*.css', 'dist/scss/*.scss']
            }
        },

        // add plugins SASS imports
        sass_injection: {
            dist: {
                options: {
                    replacePath: {
                        pattern: 'dist/scss/',
                        replace: ''
                    }
                },
                src: ['dist/scss/plugins/*.scss'],
                target: 'dist/scss/default.scss'
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
            temp: ['.temp'],
            doc: ['doc']
        },

        // jshint tests
        jshint: {
            lib: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['src/**/*.js', '!src/**/.wrapper.js']
            }
        },

        // jscs tests
        jscs: {
            lib: {
                options: {
                    config: '.jscsrc'
                },
                src: ['src/**/*.js', '!src/**/.wrapper.js']
            }
        },

        // scss tests
        scsslint: {
            lib: {
                options: {
                    colorizeOutput: true,
                    config: '.scss-lint.yml'
                },
                src: ['src/**/*.scss']
            }
        },

        // jsDoc generation
        jsdoc: {
            lib: {
                src: ['src/**/*.js', '!src/**/.wrapper.js'],
                options: {
                    destination: 'doc',
                    config: '.jsdoc.json'
                }
            }
        },

        // inject sources files and tests modules in demo and test
        injector: {
            options: {
                relative: true,
                addRootSlash: false
            },
            example: {
                src: config.all_js_files.concat(['dist/i18n/query-builder.en.js']),
                dest: 'examples/index.html'
            },
            testSrc: {
                options: {
                    starttag: '<!-- injector:src -->',
                    transform: function(filepath) {
                        return '<script src="' + filepath + '" data-cover></script>';
                    }
                },
                src: config.all_js_files,
                dest: 'tests/index.html'
            },
            testModules: {
                options: {
                    starttag: '<!-- injector:modules -->'
                },
                src: ['tests/*.module.js'],
                dest: 'tests/index.html'
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
                src: '.coverage-results/all.lcov'
            }
        }
    });


    grunt.registerTask('build_js', [
        'concat:lang_temp',
        'concat:js',
        'wrap:js',
        'usebanner:js',
        'concat:js_standalone',
        'uglify',
        'clean:temp'
    ]);

    grunt.registerTask('build_css', [
        'copy:sass_core',
        'copy:sass_plugins',
        'sass_injection',
        'sass',
        'cssmin',
        'usebanner:css'
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
        'jshint',
        'jscs',
        'scsslint',
        'build_lang',
        'build_css',
        'injector:testSrc',
        'injector:testModules',
        'qunit_blanket_lcov',
        'qunit'
    ]);

    grunt.registerTask('serve', [
        'build_lang',
        'build_css',
        'injector:example',
        'open',
        'connect',
        'watch'
    ]);

    grunt.registerTask('doc', [
        'clean:doc',
        'jsdoc',
        'copy:doc_script'
    ]);
};
