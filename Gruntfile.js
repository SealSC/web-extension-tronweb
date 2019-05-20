module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      tronweb: {
        files: {
          'dist/sealsc-web-extension-tronweb.js': [ 'src/extension.js' ]
        },

        options: {
          transform: [["babelify"]],
          browserifyOptions: {
            standalone: 'sealsc-web-extension-tronweb'
          }
        }
      },
    },
    uglify: {
      options: {
        sourceMap: true
      },
      tronweb: {
        files:{
          'dist/sealsc-web-extension-tronweb.min.js': [ 'dist/sealsc-web-extension-tronweb.js' ],
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('build', ['browserify', 'uglify']);
};
