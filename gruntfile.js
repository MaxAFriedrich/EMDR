module.exports = function (grunt) {
    grunt.initConfig({
        inline: {
            dist: {
                options: {
                    cssmin: true,
                },
                src: 'dist/index.html',
                dest: 'index.html'
            }
        },
        uglify: {
            build: {
                src: 'src/main.js',
                dest: 'dist/main.js'
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'src/index.html'     // 'destination': 'source'
                }
            }
        },
        copy: {
            main: {
                expand: true,
                files: {                                   // Dictionary of files
                    'dist/main.css': 'src/main.css',     // 'destination': 'source'
                    'dist/jquery.js': 'src/jquery.js'     // 'destination': 'source'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-inline');

    grunt.registerTask('default', ['uglify', 'htmlmin', 'copy', 'inline']);
};