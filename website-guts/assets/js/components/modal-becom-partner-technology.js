// // make this global in case someone needs to remove the Oform instance
// //this runs when it shouldn't.
// console.log('is my server working?');
// w.optly.mrkt.activeModals = {};

// var contactSalesHelperInst = window.optly.mrkt.form.contactSales({formId: 'contact-sales-form'});

// w.optly.mrkt.activeModals.contactSales = new Oform({

//   selector: 'form#contact-sales-form',
//   middleware: w.optly.mrkt.Oform.defaultMiddleware

// });

// var contactSalesForm = w.optly.mrkt.activeModals.contactSales;

// contactSalesForm.on('before', function(){

//   d.body.classList.add('contact-sales-submit');

//   w.optly.mrkt.Oform.before();

//   w.analytics.track('contact sales submit', {
//     category: 'forms',
//     label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
//   });

//   contactSalesHelperInst.removeErrors();
//   contactSalesHelperInst.processingAdd();

//   return true;

// }).on('validationError', function(element){

//   w.optly.mrkt.Oform.validationError(element);

// }).on('success', function(returnData){
//   console.log('i am in modal-becom-patner-tech and about to run the \'on success\' fx passing in return data: ', returnData);
//   contactSalesHelperInst.success(returnData);

// }.bind(contactSalesHelperInst)).on('done', function() {
//   if(document.body.classList.contains('oform-error')) {
//     contactSalesHelperInst.processingRemove({callee: 'done'});
//     contactSalesHelperInst.showOptionsError();
//   }
// });
