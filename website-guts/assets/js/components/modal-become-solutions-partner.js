//make this global in case someone needs to remove the Oform instance
w.optly.mrkt.activeModals = {};

var solutionsPartnerHelperInst = window.optly.mrkt.form.contactSales({formId: 'contact-sales-form'});

w.optly.mrkt.activeModals.contactSales = new Oform({

  selector: 'form#become-partner-solutions-form',
  middleware: w.optly.mrkt.Oform.defaultMiddleware

});

var contactSalesForm = w.optly.mrkt.activeModals.contactSales;

contactSalesForm.on('before', function(){

  d.body.classList.add('contact-sales-submit');

  w.optly.mrkt.Oform.before();

  w.analytics.track('contact sales submit', {
    category: 'forms',
    label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  });

  solutionsPartnerHelperInst.removeErrors();
  solutionsPartnerHelperInst.processingAdd();

  return true;

}).on('validationError', function(element){

  w.optly.mrkt.Oform.validationError(element);

}).on('success', function(returnData){

  solutionsPartnerHelperInst.success(returnData);

}.bind(solutionsPartnerHelperInst)).on('done', function() {
  if(document.body.classList.contains('oform-error')) {
    solutionsPartnerHelperInst.processingRemove({callee: 'done'});
    solutionsPartnerHelperInst.showOptionsError();
  }
});
