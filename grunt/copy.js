var path = require('path');

function getRoot(file) {
  return path.join(process.cwd(), file);
}

module.exports = {
  cssSourceMap: {
    src: '<%= config.temp %>/css/styles.css.map',
    dest: '<%= config.dist %>/assets/css/styles.css.map'
  },
  libraryCSS: {
    src: '<%= config.bowerDir %>/magnific-popup/dist/magnific-popup.css',
    dest: '<%= config.dist %>/assets/css/magnific-popup.css'
  },
  libs: {
    files: [
      {
        '<%= config.dist %>/assets/js/libraries/fastclick.js': ['<%= config.bowerDir %>/fastclick/lib/fastclick.js']
      },
      {
        '<%= config.dist %>/assets/js/libraries/magnific.js': ['<%= config.guts %>/assets/js/libraries/magnific.js']
      }
    ]
  },
  img: {
    files: [
      {
        cwd: '<%= config.guts %>/assets/img/',
        src: '**',
        dest: '<%= config.dist %>/assets/img/',
        expand: true
      },
      {src: ['<%= config.guts %>/assets/img/favicon.ico'], dest: '<%= config.dist %>/favicon.ico'},
      {src: ['<%= config.guts %>/assets/img/apple-touch-icon.png'], dest: '<%= config.dist %>/apple-touch-icon.png'},
      {src: ['<%= config.guts %>/assets/img/apple-touch-icon-precomposed.png'], dest: '<%= config.dist %>/apple-touch-icon-precomposed.png'}
    ]
  },
  js: {
    files: [
      {
        cwd: '<%= config.guts %>/assets/js/om/libraries',
        src: '**',
        dest: '<%= config.dist %>/assets/js/om/libraries/',
        expand: true
      }
    ]
  },
  scribe: {
    files: [
      {
        src: [getRoot('node_modules/scribe/build/stories/*')],
        dest: '<%= config.content %>/case-studies/',
        rename: function(dest, src) {
          return dest + '/' + src.substring(src.lastIndexOf('/') + 1, src.indexOf('.')) + '/index.hbs';
        },
        expand: true
      },
      {
        src: [getRoot('node_modules/scribe/build/assets/css/scribe.css')],
        dest: '<%= config.dist %>/assets/css/scribe.css'
      }
    ]
  },
  seo: {
    files: [
      {src: [getRoot('robots.txt')], dest: '<%= config.dist %>/robots.txt'},
      {src: [getRoot('sitemap.xml')], dest: '<%= config.dist %>/sitemap.xml'}
    ]
  },
  omUITest: {
    files: [
      {
        src: '<%= config.guts %>/assets/js/om/test/test.js',
        dest: '<%= config.dist %>/assets/js/om/test/',
        expand: true,
        flatten: true
      },
      {
        src: '<%= config.guts %>/assets/css/om/libraries/qunit-1.17.1.css',
        dest: '<%= config.dist %>/assets/css/',
        expand: true,
        flatten: true
      },
      {
        src: '<%= config.guts %>/assets/js/om/libraries/qunit-1.17.1.js',
        dest: '<%= config.dist %>/assets/js/om/libraries/',
        expand: true,
        flatten: true
      }
    ]
  }
};
