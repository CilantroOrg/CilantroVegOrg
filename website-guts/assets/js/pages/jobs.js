window.optly.mrkt.jobsPage = {};
var jobList = require('jobList');

window.optly.mrkt.jobsPage.testimonials = function() {
    var lastIndex = 0;
    var $quotes = $('h4.quotes q');
    var $icons = $('.employee-icons li');

    $icons.on('click', function(e){
        e.preventDefault();
        var index = $(this).index();

        if(index !== lastIndex) {
            $( $quotes[index] ).removeClass('hide');
            $(this).removeClass('opaque');

            $( $quotes[lastIndex] ).addClass('hide');
            $( $icons[lastIndex] ).addClass('opaque');

            lastIndex = index;
        }
    });
};

$('#view-all-jobs').click(function() {
    $('html, body').animate({scrollTop: $('#jobs-list').offset().top}, 700);
    return false;
});

window.optly.mrkt.jobsPage.testimonials();

function getGreenhouseData(data) {
  var locations = ['All Locations'];

  if(typeof data === 'object'){

    $.each(data.departments, function(i, department) {
      if(department.jobs.length === 0){
        delete data.departments[i];
      } else {
        // iterate over jobs to get all locations
        $.each(department.jobs, function(j, job) {
          locations.push(job.location.name);
        });
      }
    });

        //for(var i = 0; i < data.departments.length; i++){
          //if(data.departments[i].jobs.length === 0){
            //delete data.departments[i];
          //} else {
            //// iterate over jobs to get all locations
            //for(var j = 0; j < data.departments[i].jobs.length; j++){
            //}
          //}
        //}

    $.unique(locations);
    $('#js-locations').append(locations);
    $('#job-list-cont').append( jobList(data) );
  }
}

var deferred = $.getJSON('https://api.greenhouse.io/v1/boards/optimizely7/embed/departments?callback=?');

deferred.then(getGreenhouseData, function(err) {
    window.analytics.track('https://api.greenhouse.io/v1/boards/optimizely7/embed/departments?callback=?', {
      category: 'api error',
      label: err.responseText + ', Response Code: ' + err.status,
    }, {
      integrations: {
        Marketo: false
      }
    });
});
