module.exports = function (context)  {
  var lang = this.app.get('lang');
  var pageData = this.app.get('pageData');
  var websiteRoot = this.app.get('data.websiteRoot');
  var locale = this.context.locale;
  var type;
  if(locale !== websiteRoot) {
    type = pageData[context.rootKey].type;
  } else {
    type = this.type;
  }
  type = type.toLowerCase();

  return type;
};
