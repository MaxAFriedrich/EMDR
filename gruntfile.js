/* eslint-disable no-undef */
module.exports = function (grunt) {
    grunt.initConfig({
        'npm-command': {
            lint: {
                options: {
                    cwd: 'run', args: ['lint']
                }, build: {
                    options: {
                        cwd: 'run', args: ['build']
                    }
                }
            }
        }, htmlmin: {
            dist: {
                options: {
                    removeComments: true, collapseWhitespace: true
                }, files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        }, copy: {
            main: {
                expand: true, cwd: 'static/', src: '**', dest: 'dist/'
            }
        }, cssmin: {
            target: {
                files: [{
                    expand: true, cwd: 'dist/', src: ['*.css', '!*.min.css'], dest: 'dist/', ext: '.css'
                }]
            },
        }, browserify: {
            dist: {
                options: {
                    transform: [['babelify', {presets: ['@babel/preset-env']}]]
                }, files: {
                    'dist/bundle.js': ['dist/main.js']
                }
            }
        }, clean: {
            js: {
                src: ['dist/**/*.js', '!dist/bundle.js']
            }
        }, uglify: {
            build: {
                options: {
                    ie8: true
                }, src: 'dist/bundle.js', dest: 'dist/bundle.js'
            }
        },

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['htmlmin', 'copy', 'cssmin', 'browserify', 'uglify', 'clean']);
};
