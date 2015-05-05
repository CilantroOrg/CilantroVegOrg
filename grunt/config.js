//get configs
var config = function(grunt, options) {
  var creds;

  try{
    creds = grunt.file.read('./configs/s3Config.json', {encoding: 'utf-8'});
    if(creds){
      creds = JSON.parse(creds);
    }
  } catch(err){
    console.log('error reading s3 credentials: ', err);
  }

  return {
    options: {
      logOutput: false
    },
    production: {
      options: {
        variables: {
          environment: 'production',
          environmentData: 'website-guts/data/environments/production/environmentVariables.json',
          apiDomain: '//www.optimizely.com',
          assetsDir: '/dist/assets',
          imageUrl: '//du7782fucwe1l.cloudfront.net/img',
          link_path: '',
          sassImagePath: '/img',
          compress_js: true,
          drop_console: true,
          exclude_from_assemble: '**/fixture.hbs',
          concat_banner: '(function($, w, d){ \n\n' +
            '  window.optly = window.optly || {}; \n\n' +
            '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
            '  window.linkPath = "" \n\n' +
            '  try { \n\n',
          concat_footer: '  } catch(error){ \n\n' +
            '    console.error(error, targetName);\n\n' +
            '    if(typeof error === "object") { try { error = JSON.stringify(error, ["message", "arguments", "type", "name"]); } catch (innerErr) { error = innerErr.message || "cannot parse error message"; } }; \n\n' +
            '    var path = window.location.pathname;\n\n' +
            '    var trimpath = path.lastIndexOf("/") === path.length - 1 && path.length > 1 ? path.substr(0, path.lastIndexOf("/")) : path;\n\n' +
            '    w.analytics.ready(function() { w.analytics.track(trimpath + ": " + targetName, {category: "JavaScript Error", label: error}, { integrations: {"All": false, "Google Analytics": true} }); });\n\n' +
            '  } \n' +
            '})(jQuery, window, document);'
        }
      }
    },
    staging: {
      options: {
        variables: {
          aws: creds,
          environment: 'staging',
          exclude_from_assemble: 'bobloblaw.hbs',
          apiDomain: '//app.optimizely.com',
          environmentData: 'website-guts/data/environments/staging/environmentVariables.json',
          assetsDir: '/<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/assets',
          link_path: '/<%= grunt.option("branch") || gitinfo.local.branch.current.name %>',
          sassImagePath: '/<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/assets/img',
          imageUrl: '/<%= grunt.option("branch") || gitinfo.local.branch.current.name %>/assets/img',
          compress_js: true,
          drop_console: false,
          concat_banner: '(function($, w, d){ \n\n' +
            '  window.optly = window.optly || {}; \n\n' +
            '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
            '  window.linkPath = "/<%= grunt.option("branch") || gitinfo.local.branch.current.name %>"; \n\n' +
            '  try { \n\n',
          concat_footer: '  } catch(error){ \n\n' +
            '    console.error(error, targetName);\n\n' +
            '    if(typeof error === "object") { try { error = JSON.stringify(error, ["message", "arguments", "type", "name"]); } catch (innerErr) { error = innerErr.message || "cannot parse error message"; } }; \n\n' +
            '    var path = window.location.pathname;\n\n' +
            '    var trimpath = path.lastIndexOf("/") === path.length - 1 && path.length > 1 ? path.substr(0, path.lastIndexOf("/")) : path;\n\n' +
            '    w.analytics.ready(function() { w.analytics.track(trimpath + ": " + targetName, {category: "JavaScript Error", label: error}, { integrations: {"All": false, "Google Analytics": true} }); });\n\n' +
            '  } \n' +
            '})(jQuery, window, document);'
        }
      }
    },
    smartlingStaging: {
      options: {
        variables: {
          aws: creds,
          environment: 'smartling-staging',
          exclude_from_assemble: '**/fixture.hbs',
          environmentData: 'website-guts/data/environments/staging/environmentVariables.json',
          apiDomain: '//app.optimizely.com',
          assetsDir: '/assets',
          link_path: '',
          sassImagePath: '/assets/img',
          imageUrl: '/assets/img',
          compress_js: true,
          drop_console: false,
          concat_banner: '(function($, w, d){ \n\n' +
            '  window.optly = window.optly || {}; \n\n' +
            '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
            '  window.linkPath = "<%= gitinfo.local.branch.current.name %>"; \n\n' +
            '  try { \n\n',
          concat_footer: '  } catch(error){ \n\n' +
            '  //report errors to GA \n\n' +
            '  window.console.log("js error: " + error);' +
            '  } \n' +
            '})(jQuery, window, document);'
        }
      }
    },
    dev: {
      options: {
        variables: {
          environment: 'dev',
          exclude_from_assemble: 'bobloblaw.hbs',
          environmentData: 'website-guts/data/environments/development/environmentVariables.json',
          apiDomain: '',
          assetsDir: '/dist/assets',
          link_path: '/dist',
          sassSourceMap: true,
          sassImagePath: '/dist/assets/img',
          imageUrl: '/dist/assets/img',
          compress_js: false,
          drop_console: false,
          concat_banner: '(function($, w, d){ \n\n' +
                         '  window.optly = window.optly || {}; \n\n' +
                         '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
                         '  window.linkPath = "/dist"; \n\n',
          concat_footer: '})(jQuery, window, document);'
        }
      }
    },
    release: {
      options: {
        variables: {
          environment: 'staging',
          exclude_from_assemble: 'bobloblaw.hbs',
          environmentData: 'website-guts/data/environments/development/environmentVariables.json',
          apiDomain: '//app.optimizely.test',
          assetsDir: '/dist/assets',
          link_path: '',
          sassSourceMap: true,
          sassImagePath: '/dist/assets/img',
          compress_js: false,
          drop_console: false,
          concat_banner: '(function($, w, d){ \n\n' +
                         '  window.optly = window.optly || {}; \n\n' +
                         '  window.optly.mrkt = window.optly.mrkt || {}; \n\n' +
                         '  window.linkPath = "/dist"; \n\n',
          concat_footer: '})(jQuery, window, document);'
        }
      }
    },
    content: 'website',
    guts: 'website-guts',
    dist: 'dist',
    temp: 'temp',
    helpers: 'website-guts/helpers',
    bowerDir: 'bower_components',
  };

};

module.exports = config;
