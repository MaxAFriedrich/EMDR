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
        }, uglify: {
            build: {
                options: {
                    ie8: true
                }, src: 'dist/main.js', dest: 'dist/main.js'
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
                expand: true, files: {
                    'dist/': ['static/.']
                }
            }
        }, inline: {
            dist: {
                options: {
                    cssmin: true,
                }, src: 'dist/index.html', dest: 'dist/index.html'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-inline');

    grunt.registerTask('default', ['uglify', 'htmlmin', 'copy', 'inline']);
};
