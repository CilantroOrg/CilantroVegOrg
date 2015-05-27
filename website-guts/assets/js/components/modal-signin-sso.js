var signinSSODialogHelperInst = window.optly.mrkt.form.signin({formId: 'signin-sso-form'});

new Oform({
  selector: '#signin-sso-form',
  middleware: w.optly.mrkt.Oform.defaultMiddleware
}).on('before', function() {
  signinSSODialogHelperInst.processingAdd();
  return true;
}).on('error', function(){
  signinSSODialogHelperInst.processingRemove({callee: 'error'});
  signinSSODialogHelperInst.showOptionsError({error: 'UNEXPECTED'});
  window.analytics.track('signin sso xhr error', {
    category: 'account',
    label: w.location.pathname
  }, {
    integrations: {
      Marketo: false
    }
  });
}).on('load', function(result){
  var responseObj = result.XHR ? JSON.parse(result.XHR.response) : {};
  var status = result.XHR ? result.XHR.status : null;

  if (status === 200 && responseObj.url) {
    window.location = responseObj.url;
  } else if (responseObj.succeeded === false && responseObj.error) {
    $('#js-sso-error').text(responseObj.error);
  }
}).on('done', function(){
  signinSSODialogHelperInst.processingRemove({callee: 'done'});
  if (document.body.classList.contains('oform-error')) {
    signinSSODialogHelperInst.showOptionsError();
  }
}).on('validationerror', w.optly.mrkt.Oform.validationError);
