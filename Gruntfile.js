module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 9020,
                    open: true,
                    livereload: 35735,
                    base: 'build'

                }
            }
        },

        jade: {
            dev: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/jade/',
                    src: '*.jade',
                    dest: 'build',
                    ext: '.html'
                }]
            },
            prod: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: false
                },
                files: [{
                    expand: true,
                    cwd: 'src/jade/',
                    src: '*.jade',
                    dest: 'build',
                    ext: '.html'
                }]
            }
        },

        validation: {
            options: {
                reset: grunt.option('reset') || false,
                stoponerror: false,
                relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors
                generateReport: true,
                errorHTMLRootDir: "build/w3cErrorFolder",
                useTimeStamp: true
            },
            files: {
                src: ['build/*.html']
            }
        },

        postcss: {
            options: {
                processors: [
                    require('postcss-import')(),
                    require('autoprefixer')(),
                    require('cssnext')()
                ]
            },
            files: {
                src: 'src/css/style.css',
                dest: 'build/style.css'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['build/style.css']
            }
        },

        cssnano: {
            options: {
                sourcemap: true
            },
            dist: {
                files: {
                    'build/style.css': 'build/style.css'
                }
            }
        },

        watch: {
            options: {
                livereload: 35735
            },
            jade: {
                files: ['src/jade/**/*.jade'],
                tasks: ['jade', 'validation'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/css/style.css'],
                tasks: ['postcss'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            build: {
                src: ['build']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-cssnano');

    // Default task(s).
    grunt.registerTask('default', ['dev', 'connect', 'watch']);

    // Init dev task(s).
    grunt.registerTask('dev', ['clean', 'jade:dev', 'validation', 'postcss']);

    // Prod task(s).
    grunt.registerTask('prod', ['clean', 'jade:prod', 'validation', 'postcss', 'csslint', 'cssnano']);


};