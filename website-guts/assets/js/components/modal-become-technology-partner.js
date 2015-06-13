//make this global in case someone needs to remove the Oform instance
//THIS IS THE FORM WE NEED TO USE TO BUILD OUT THE TECH PARTNERS FORM
w.optly.mrkt.activeModals = {};

//I think we might want to change the formID here but doing so just here breaks the form
var solutionsPartnerHelperInst = window.optly.mrkt.form.contactSales({formId: 'contact-sales-form'});

w.optly.mrkt.activeModals.contactSales = new Oform({

  selector: 'form#become-partner-technology-form',
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

  //passes all data from the form into
  solutionsPartnerHelperInst.success(returnData);

}.bind(solutionsPartnerHelperInst))

.on('done', function() {
  if(document.body.classList.contains('oform-error')) {
    solutionsPartnerHelperInst.processingRemove({callee: 'done'});
    solutionsPartnerHelperInst.showOptionsError();
  }
});
