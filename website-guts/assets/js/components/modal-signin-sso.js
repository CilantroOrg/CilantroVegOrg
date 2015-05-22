new Oform({
  selector: '#signin-sso-form',
  middleware: w.optly.mrkt.Oform.defaultMiddleware
}).on('error', function(){
  window.alert('error');
}).on('load', function(){
  //http://localhost:9000/sp_initiated_signin you should mock this enpoint in
  //grunt/connect because it is returning 404
  // console.log(e);
  window.alert('load');
}).on('done', function(){
  //this always fires which sucks
  window.alert('done');
});
