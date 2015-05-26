var signinSSODialogHelperInst = window.optly.mrkt.form.signin({formId: 'signin-sso-form'});

new Oform({
  selector: '#signin-sso-form',
  middleware: w.optly.mrkt.Oform.defaultMiddleware
}).on('before', function() {
  signinSSODialogHelperInst.processingAdd();
  return true;
}).on('error', function(){
  window.alert('error');
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
}).on('load', function(){
  //http://localhost:9000/sp_initiated_signin you should mock this enpoint in
  //grunt/connect because it is returning 404
  // console.log(e);
  window.alert('load');
  signinSSODialogHelperInst.load.bind(signinSSODialogHelperInst);
}).on('done', function(){
  //this always fires which sucks
  window.alert('done');

  signinSSODialogHelperInst.processingRemove({callee: 'done'});
  if (document.body.classList.contains('oform-error')) {
    signinSSODialogHelperInst.showOptionsError();
  }
}).on('validationerror', w.optly.mrkt.Oform.validationError);
