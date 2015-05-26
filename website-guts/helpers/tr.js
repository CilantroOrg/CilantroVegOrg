var tr = require('l10n-tr');

module.exports = function _tr(key) {
  var dict;

  tr.setDict(dict);
  return tr.apply(tr, arguments);
};
