/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        sourceMap: 'jquery.textoverlay.min.map'
      },
      all: {
        files: {
          'jquery.textoverlay.min.js': [
            'jquery.textoverlay.js'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '../',
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', ['connect']);
};
