//TODO(peng-wen): Remove this component once the dev account signup logic is moved to the developers site
var signupDialogHelperInst = window.optly.mrkt.form.createAccount({formId: 'dev-signup-form', dialogId: 'dev-signup-dialog'});

var devSignupForm = new Oform({
  selector: '#dev-signup-form',
  customValidation: {
    password1: function(elm) {
      return signupDialogHelperInst.password1Validate(elm);
    },
    password2: function(elm) {
      return signupDialogHelperInst.password2Validate(elm);
    }
  },
  middleware: w.optly.mrkt.Oform.defaultMiddleware
});

devSignupForm.on('before', function() {
  //set the hidden input value
  signupDialogHelperInst.formElm.querySelector('[name="hidden"]').value = 'touched';
  signupDialogHelperInst.processingAdd();
  if(signupDialogHelperInst.characterMessageElm.classList.contains('oform-error-show')) {
    signupDialogHelperInst.characterMessageElm.classList.remove('oform-error-show');
  }
  return true;
})
.on('validationerror', function(elm) {
  w.optly.mrkt.Oform.validationError(elm);
  signupDialogHelperInst.showOptionsError({error: 'DEFAULT'});
  if(!signupDialogHelperInst.characterMessageElm.classList.contains('oform-error-show')) {
    signupDialogHelperInst.characterMessageElm.classList.add('oform-error-show');
  }
})
.on('error', function() {
  signupDialogHelperInst.processingRemove({callee: 'error'});
  signupDialogHelperInst.showOptionsError({error: 'UNEXPECTED'});
  window.analytics.track('create account xhr error', {
    category: 'account',
    label: w.location.pathname
  }, {
    integrations: {
      Marketo: false
    }
  });
}.bind(signupDialogHelperInst))
.on('load', signupDialogHelperInst.load.bind(signupDialogHelperInst))
.on('done', function() {
  if (document.body.classList.contains('oform-error')) {
    signupDialogHelperInst.processingRemove({callee: 'done'});
  }
}.bind(signupDialogHelperInst));
