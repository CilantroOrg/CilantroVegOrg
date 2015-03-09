'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var extend = require('extend-shallow');

function isIndex(fp, testStr) {
  if(fp[0] !== '/') {
    fp = '/' + fp;
  }
  return fp.indexOf('/' + testStr + '/') !== -1;
}


module.exports = function (assemble) {
  var websiteRoot = assemble.get('data.websiteRoot');
  var locales = assemble.get('data.locales');
  var generateKey = require('./generate-key');

  return function (fp) {
    var pageData = assemble.get('pageData');
    var subfoldersRoot = assemble.get('data.subfoldersRoot');
    var data = {
      dataKey: generateKey(fp)
    };
    var localeIndex, parentKey, localePath;

    if( isIndex(fp, websiteRoot) ) {
      data.locale = websiteRoot;
      data.isRoot = true;
    } else if( isIndex(fp, subfoldersRoot) ) {
      localeIndex = _.findIndex(Object.keys(locales), function(locale) {
        var split = fp.replace(process.cwd(), '').replace(subfoldersRoot, '').split('/');
        return split.indexOf(locale) !== -1;
      });
      data.locale = Object.keys(locales)[localeIndex];
      localePath = '/' + subfoldersRoot + '/' + data.locale + '/';
      parentKey = data.dataKey.replace(localePath, '/' + websiteRoot + '/');
      data.parentKey = parentKey;
      data.isSubfolder = true;
    } else {
      data.locale = path.dirname(fp).split('/').slice(-1)[0];

      switch(data.locale) {
        case 'modals':
          data.isModal = true;
          break;
        case 'partials':
          data.isPartial = true;
          break;
        case 'layouts':
          data.isLayout = true;
          break;
      }
    }

    return data;
  };
};

