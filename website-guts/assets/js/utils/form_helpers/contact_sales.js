window.optly.mrkt.form = window.optly.mrkt.form || {};

var contactSalesHelpers = {
  success: function(returnData) {
    d.body.classList.add('contact-sales-success');

    w.optly.mrkt.Oform.trackLead({
      requestPayload: returnData.requestPayload
    });

    w.analytics.track('contact sales succcess', {
      category: 'forms',
      label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
    });

    w.Munchkin.munchkinFunction('visitWebPage', {
      url: '/event/contact-sales/success'
    });

    var continueTo = w.optly.mrkt.utils.getURLParameter('continue_to');
    if (continueTo) {
      w.location = w.apiDomain + continueTo;
    } else {
      w.setTimeout(function() {
        w.optly.mrkt.modal.open({ modalType: 'contact-sales-thank-you' });
      }, 1000);
    }
  }
};

window.optly.mrkt.form.contactSales = function(argumentsObj) {
  var constructorArgs = {
    formId: argumentsObj.formId,
    prototype: contactSalesHelpers
  };

  return window.optly.mrkt.form.HelperFactory(constructorArgs);

};
