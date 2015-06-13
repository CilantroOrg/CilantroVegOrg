window.optly.mrkt.form = window.optly.mrkt.form || {};

var contactSalesHelpers = {
  success: function(returnData) {
    d.body.classList.add('contact-sales-success');

    console.log('i am in contactSalesHelpers method in contact_sales.js and about to pass in returnData into w.optly.mrkt.Oform.trackLead(requestPayload: returnData.requestPayload) which is: ', returnData.requestPayload);
    w.optly.mrkt.Oform.trackLead({
      requestPayload: returnData.requestPayload
    });

    // console.log('i am about to call w.analytics.track by passing in a label, which is: ', w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname));
    w.analytics.track('contact sales succcess', {
      category: 'forms',
      label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
    });

    // console.log('i am about to call something with Munchkin');
    w.Munchkin.munchkinFunction('visitWebPage', {
      url: '/event/contact-sales/success'
    });

    console.log(' i am in contact_sales\'s success function and about to call setTimeout');
    w.setTimeout(function() {
      w.optly.mrkt.modal.open({ modalType: 'contact-sales-thank-you' });
    }, 1000);

  }
};

window.optly.mrkt.form.contactSales = function(argumentsObj) {
  var constructorArgs = {
    formId: argumentsObj.formId,
    prototype: contactSalesHelpers
  };
  // console.log('this is constructorArgs.formId: ', constructorArgs.formId);

  return window.optly.mrkt.form.HelperFactory(constructorArgs);

};
