w.optly.mrkt.Oform = {};

w.optly.mrkt.Oform.before = function(){

  $('body').addClass('oform-processing');

  return true;

};

w.optly.mrkt.Oform.validationError = function(element){

  w.optly.mrkt.formHadError = true;

  var elementValue = $(element).val();

  var elementHasValue = elementValue ? 'has value' : 'no value';

  w.analytics.track($(element).closest('form').attr('id') + ' ' + element.getAttribute('name') + ' error submit', {

    category: 'form error',

    label: elementHasValue,

    value: elementValue.length

  }, {

    integrations: {

      Marketo: false

    }

  });

};

w.optly.mrkt.Oform.defaultMiddleware = function(XHR, data){

  XHR.withCredentials = true;

  return data;

};

w.optly.mrkt.Oform.trackLead = function(args){

  var pageData = args.pageData,
    XHRevent = args.XHRevent,
    formElm = args.formElm,
    propertyName,
    reportingObject,
    source,
    response,
    token;

  source = w.optly.mrkt.source;

  try {
    response = JSON.parse(XHRevent.XHR.responseText);
  } catch(e) {
    if(typeof error === 'object') {
      try {
        error = JSON.stringify(err, ['message', 'arguments', 'type', 'name']);
      } catch (innerErr) {
        error = innerErr.message || 'cannot parse error message';
      }
    }
    w.analytics.ready(function() {
      w.analytics.track(window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname) + ':trackLead', {
          category: 'api error',
          label: error
        }, {
          integrations: {
            'All': false,
            'Google Analytics': true
          }
        });
    });
  }

  if(response.token){

    token = response.token;

  } else if(response.munchkin_token){

    token = response.munchkin_token;

  } else {

    token = '';

  }

  reportingObject = {
    utm_Campaign__c: source.utm.campaign || '',
    utm_Content__c: source.utm.content || '',
    utm_Medium__c: source.utm.medium || '',
    utm_Source__c: source.utm.source || '',
    utm_Keyword__c: source.utm.keyword || '',
    otm_Campaign__c: source.otm.campaign || '',
    otm_Content__c: source.otm.content || '',
    otm_Medium__c: source.otm.medium || '',
    otm_Source__c: source.otm.source || '',
    otm_Keyword__c: source.otm.keyword || '',
    GCLID__c: source.gclid || '',
    Signup_Platform__c: pageData.Signup_Platform__c || source.Signup_Platform__c || '',
    Email: response.email ? response.email : '',
    FirstName: response.first_name || '',
    LastName: response.last_name || '',
    Phone: response.phone_number || '',
    Web__c: $(formElm + ' input[type="checkbox"][name="web"]').is(':checked') + '',
    Mobile_Web__c: $(formElm + ' input[type="checkbox"][name="mobile_web"]').is(':checked') + '',
    iOS__c: $(formElm + ' input[type="checkbox"][name="ios"]').is(':checked') + '',
    Android__c: $(formElm + ' input[type="checkbox"][name="android"]').is(':checked') + ''
  };

  $.cookie('sourceCookie',
  source.utm.campaign + '|||' +
  source.utm.content + '|||' +
  source.utm.medium + '|||' +
  source.utm.source + '|||' +
  source.utm.keyword + '|||' +
  source.otm.campaign + '|||' +
  source.otm.content + '|||' +
  source.otm.medium + '|||' +
  source.otm.source + '|||' +
  source.otm.keyword + '|||' +
  source.signup_platform + '|||');

  function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //only add the pageData property if the property is not already in the reportingObject (with different case)
  for(propertyName in pageData){
    if(typeof reportingObject[cap(propertyName)] === 'undefined'){
      reportingObject[propertyName] = pageData[propertyName];
    }
  }

  //make a raw Munchkin associateLead Request
  w.Munchkin.munchkinFunction('associateLead', reportingObject, token);

  w.analytics.identify(response.unique_user_id, reportingObject, {
    integrations: {
      'Marketo': true
    }
  });

  /* legacy reporting - to be deprecated */

  w.analytics.track('/account/create/success', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      'Marketo': false
    }
  });

  w.Munchkin.munchkinFunction('visitWebPage', {
    url: '/account/create/success'
  });

  w.analytics.track('/account/signin', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      'Marketo': false
    }
  });
  /*
  temporarily commented out to decrease marketo queue
  w.Munchkin.munchkinFunction('visitWebPage', {
  url: '/event/account/signin'
  });
  w.Munchkin.munchkinFunction('visitWebPage', {
  url: '/event/customer/signedin'
  });
  */
  w.Munchkin.munchkinFunction('visitWebPage', {
    url: '/event/plan/null'
  });

  /* new reporting */

  w.analytics.track('account created', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      Marketo: false
    }
  });
  w.analytics.track('account signin', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      Marketo: false
    }
  });

};
