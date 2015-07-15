//Code below manages Wistia gating. Enter email address once, then rest are ungated
wistiaEmbeds.onFind(function(video) {
  var email = Wistia.localStorage("golden-ticket");
  if (email) {
    video.setEmail(email);
  }
});
wistiaEmbeds.bind("conversion", function(video, type, data) {
  if (/^(pre|mid|post)-roll-email$/.test(type)) {
    Wistia.localStorage("golden-ticket", data);
    for (var i = 0; i < wistiaEmbeds.length; i++) {
      wistiaEmbeds[i].setEmail(data);
    }
  }
});

//code below allows users to resume video from whence they left off
wistiaEmbeds.onFind(function(video) {
  video.addPlugin("resumable", {
    src: "//fast.wistia.com/labs/resumable/plugin.js"
  });
});

