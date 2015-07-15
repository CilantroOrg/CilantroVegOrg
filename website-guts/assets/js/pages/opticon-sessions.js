//Code below manages Wistia gating. Enter email address once, then rest are ungated
wistiaEmbeds.onFind(function(video) {
  var email = Wistia.localStorage("golden-ticket");
  if (email) {
    console.log('email being set');
    video.setEmail(email);
  }
});
wistiaEmbeds.bind("conversion", function(video, type, data) {
  if (/^(pre|mid|post)-roll-email$/.test(type)) {
    console.log('about to save on local storage');
    Wistia.localStorage("golden-ticket", data);
    for (var i = 0; i < wistiaEmbeds.length; i++) {
      wistiaEmbeds[i].setEmail(data);
    }
  }
});