module.exports = function(grunt) {
    grunt.initConfig({
        //metadata
        pkg: {
            root: 'build',
            dev: {
                service: 'build/dev',
                app: 'build/dev/public'
            },
            prod: {
                service: 'build/prod',
                app: 'build/prod/public'
            },
            src: 'src/'
        },
        clean: {
            dev: '<%= pkg.dev.service %>/**/*',
            prod: '<%= pkg.prod.service %>/**/*'
        },
        concat: {
            dev: {
                files: {
                    '<%= pkg.dev.app %>/js/script.js': '<%= pkg.src %>/scripts/*.js',
                    '<%= pkg.dev.service %>/index.js': '<%= pkg.src %>/scripts/service/*.js'
                }
            },
            prod: {
                files: {
                    '<%= pkg.prod.app %>/js/script.js': '<%= pkg.src %>/scripts/*.js',
                    '<%= pkg.prod.service %>/index.js': '<%= pkg.src %>/scripts/service/*.js'
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*',
                    dest: '<%= pkg.dev.app %>',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/partials',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/partials/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/img',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/img/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower_components/Materialize/fonts',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/json/',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/json/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'components/dist',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/components/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/media',
                    src: '**/*',
                    dest: '<%= pkg.dev.app %>/media/',
                    filter: 'isFile'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*',
                    dest: '<%= pkg.prod.app %>',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/partials',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/partials/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/img',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/img/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower_components/Materialize/fonts',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/fonts/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/json/',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/json/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'components/dist',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/components/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '',
                    src: '*.json',
                    dest: '<%= pkg.prod.service %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: '<%= pkg.src %>/media',
                    src: '**/*',
                    dest: '<%= pkg.prod.app %>/media/',
                    filter: 'isFile'
                }]
            }
        },
        bower_concat: {
            dev: {
                dest: {
                    js: '<%= pkg.dev.app %>/js/libs.js'
                }
            },
            prod: {
                dest: {
                    js: '<%= pkg.prod.app %>/js/libs.js'
                }
            }
        },
        uglify: {
            prod: {
                files: {
                    '<%= pkg.prod.app %>/js/script.js': '<%= pkg.prod.app %>/js/script.js',
                    '<%= pkg.prod.app %>/js/libs.js': '<%= pkg.prod.app %>/js/libs.js',
                    '<%= pkg.prod.service %>/index.js': '<%= pkg.prod.service %>/index.js'
                }
            }
        },
        sass: {
            options: {
                includePaths: ['<%= pkg.src %>', 'bower_components/']
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    '<%= pkg.dev.app %>/css/style.css': '<%= pkg.src %>/sass/main.scss'
                }
            },
            prod: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '<%= pkg.prod.app %>/css/style.css': '<%= pkg.src %>/sass/main.scss'
                }
            }
        },
        //less: {
        //    dev: {
        //        paths: ['src', 'bower_components'],
        //        files: {
        //            '<%= pkg.dev.app %>/css/style.css': '<%= pkg.src %>/less/main.less'
        //        }
        //    }
        //},
        //connect: {
        //    server: {
        //        options: {
        //            hostname: 'localhost',
        //            port: 8080,
        //            base: '<%= pkg.dev.app %>',
        //            livereload: true
        //        }
        //    }
        //},
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: '<%= pkg.src %>/scripts/**/*.js',
                tasks: ['concat:dev']
            },
            sass: {
                files: '<%= pkg.src %>/sass/*.scss',
                tasks: ['sass:dev']
            },
            //less: {
            //    files: '<%= pkg.src %>/less/*.less',
            //    tasks: ['less:dev']
            //},
            copy: {
                files: ['<%= pkg.src %>/*.html', '<%= pkg.src %>/img/**/*', '<%= pkg.src %>/json/*', '<%= pkg.src %>/partials/**/*', 'components/dist/**/*'],
                tasks: ['copy:dev']
            },
            bower: {
                files: 'bower_components/**/*',
                tasks: 'bower_concat:dev'
            },
            express: {
                files: ['<%= pkg.dev.service %>/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false,
                    livereload:true
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: '<%= pkg.dev.service %>/index.js',
                    node_env: 'development',
                    port: '8000'
                }
            },
            prod: {
                options: {
                    script: '<%= pkg.prod.service %>/index.js',
                    node_env: 'production',
                    port: '80'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['clean:dev', /*'less'*/ 'sass:dev', 'copy:dev', 'concat:dev', 'bower_concat:dev', 'express:dev', 'watch']);
    grunt.registerTask('prod', ['clean:prod', /*'less'*/ 'sass:prod', 'copy:prod', 'concat:prod', 'bower_concat:prod', 'uglify:prod']);
};