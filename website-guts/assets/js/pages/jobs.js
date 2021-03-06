window.optly.mrkt.jobsPage = {};
var jobList = require('jobList');

window.optly.mrkt.jobsPage.testimonials = function() {
    var lastIndex = 0;
    var $quotes = $('h4.quotes span');
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
  $('html, body').animate({
    scrollTop: $('#jobs-list').offset().top
  }, 700);
  return false;
});

window.optly.mrkt.jobsPage.testimonials();

/*
* Jobs and Department titles are hidden or
* shown based on the filter criteria.
*/
function showOrHideJobs(filterText, $jobLocation, $closestDepartmentTitle, $departmentTitles) {
  if ($jobLocation.text().indexOf(filterText) === -1) {
    if (filterText === 'All Locations') {
      $closestDepartmentTitle.show();
      $departmentTitles.show();
    } else {
      $closestDepartmentTitle.hide();
      $departmentTitles.each(function() {
        var hideTitle = $(this).next().children().filter(function(filterIndex, filterElement) {
          return filterElement.style.display !== 'none';
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
}

/*
* Click event on jobs dropdown filter
*/
function registerJobsFilterClick() {
  $('.js-location-filter').on('click', function() {
    var filterText = $(this).text();
    var $departmentTitles = $('.department-title');
    $('.js-filter-holder').text(filterText);
    $('.job-location').each(function() {
      var $jobLocation = $(this);
      var $closestDepartmentTitle = $jobLocation.closest('li');

      showOrHideJobs(filterText, $jobLocation, $closestDepartmentTitle, $departmentTitles);
    });
  });
}

/*
 * Go through all departments in an office
 * to determine if there are jobs in that office
 */
function officeHasJobs(office) {
  var jobPresent = false;
  $.each(office.departments, function(i, department) {
    if (department.jobs.length !== 0) {
      jobPresent = true;
    }
  });
  return jobPresent;
}

function getGreenhouseOfficeData(officeJSON) {
  if(typeof officeJSON === 'object'){
    $.each(officeJSON.offices, function(i, office) {
      if (officeHasJobs(office)) {
        $('#js-locations').append('<li class="filter-item js-location-filter">' + office.name + '</li>');
      }
    });
    registerJobsFilterClick();
  }
}

function getGreenhouseDepartmentData(departmentJSON) {
  if(typeof departmentJSON === 'object'){

    $.each(departmentJSON.departments, function(i, department) {
      if(department.jobs.length === 0){
        delete departmentJSON.departments[i];
      }
    });

    $('#job-list-cont').append( jobList(departmentJSON) );
  }
}

// Jobs location filter dropdown
var $dropdownElems = $('.js-dropdown');
$dropdownElems.click(function() {
  var $this = $(this);
  $this.toggleClass('active');
  $dropdownElems.not( $this ).removeClass( 'active' );
  $this.one('mouseleave', function(){
    $this.removeClass( 'active' );
  });
});

var deferredDepartments = $.getJSON('https://api.greenhouse.io/v1/boards/optimizely7/embed/departments?callback=?');
deferredDepartments.then(getGreenhouseDepartmentData, function(err) {
    window.analytics.track('https://api.greenhouse.io/v1/boards/optimizely7/embed/departments?callback=?', {
      category: 'api error',
      label: err.responseText + ', Response Code: ' + err.status,
    }, {
      integrations: {
        Marketo: false
      }
    });
});

var deferredOffices = $.getJSON('https://api.greenhouse.io/v1/boards/optimizely7/embed/offices?callback=?');
deferredOffices.then(getGreenhouseOfficeData, function(err) {
    window.analytics.track('https://api.greenhouse.io/v1/boards/optimizely7/embed/offices?callback=?', {
      category: 'api error',
      label: err.responseText + ', Response Code: ' + err.status,
    }, {
      integrations: {
        Marketo: false
      }
    });
});
