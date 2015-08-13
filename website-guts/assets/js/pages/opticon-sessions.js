//turnstile, to allow single login with email:
//more info up on http://wistia.com/labs/turnstile-golden-ticket/
wistiaEmbeds.onFind(function(video) {
  var email = Wistia.localStorage('golden-ticket');
  if (email) {
    video.setEmail(email);
  }
});
wistiaEmbeds.bind('conversion', function(video, type, data) {
  if (/^(pre|mid|post)-roll-email$/.test(type)) {
    Wistia.localStorage('golden-ticket', data);
    for (var i = 0; i < wistiaEmbeds.length; i++) {
      wistiaEmbeds[i].setEmail(data);
    }
  }
});

//resume video at the same spot, see more at http://wistia.com/labs/resumable/
wistiaEmbeds.onFind(function(video) {
  video.addPlugin('resumable', {
    src: '//fast.wistia.com/labs/resumable/plugin.js'
  });
});
