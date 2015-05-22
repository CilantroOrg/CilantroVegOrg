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
  var locations = [];

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
    $.unique(locations);

    $.each(locations, function(index, location) {
      $('#js-locations').append('<li class="filter-item js-location-filter">' + location + '</li>');
    });
    $('#job-list-cont').append( jobList(data) );

    $('.js-location-filter').on('click', function() {
      var filterText = $(this).text();
      $('.js-filter-holder').text(filterText);
      var $departmentTitles = $('.department-title');
      $('.job-location').each(function() {
        var $jobLocation = $(this);
        var $closestDepartmentTitle = $jobLocation.closest('li');

        if (!filterText.includes($jobLocation.text())) {
          if (filterText === 'All Locations') {
            $closestDepartmentTitle.show();
            $departmentTitles.show();
          } else {
            $closestDepartmentTitle.hide();
            $departmentTitles.each(function() {
              var hideTitle = $(this).next().children().filter(function() {
                                return this.style.display !== 'none';
                              }).length === 0;
              if (hideTitle) {
                $(this).hide();
              }
            });
          }
        } else { // filter text matches target text
          $closestDepartmentTitle.show();
          $jobLocation.closest('ul').prev().show(); //Show the department title
        }
      });
    });
  }
}
//Top filter dropdown
var $dropdownElems = $('.js-dropdown');
$dropdownElems.click(function() {
  var $this = $(this);
  $this.toggleClass('active');
  $dropdownElems.not( $this ).removeClass( 'active' );
  $this.one('mouseleave', function(){
    $this.removeClass( 'active' );
  });
});

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
