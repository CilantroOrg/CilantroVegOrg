var dayTwoDistanceFromTop = 2890,
    $dayTwo = $('#day-two');
/*
   Recalculate the distance from the top
   in order to highlight the Days Nav
*/
function calculateDayTwoDistanceFromTop() {
  dayTwoDistanceFromTop = $dayTwo.offset().top;
  console.log(dayTwoDistanceFromTop);
}

//Accordian for talks
$('.js-toggle-cont').slideToggle('fast'); //all details closed to start
$('.js-accordian-control').click(function(event) {
  $(this).nextAll('.js-arrow').toggleClass('expansion-arrow--open');
  $(this).nextAll('.js-toggle-cont').slideToggle('fast');
  calculateDayTwoDistanceFromTop();
});
$('.js-arrow').click(function(event) {
  $(this).toggleClass('expansion-arrow--open');
  $(this).nextAll('.js-toggle-cont').slideToggle('fast');
  calculateDayTwoDistanceFromTop();
});

// Override smoothScroll to subtrack 180
// TODO: modify smoothscroll to accept optional argument
w.optly.mrkt.utils.smoothScroll = function(event) {
	var targetElmPos = $(this.getAttribute('href')).offset().top - 180;
	event.preventDefault();
	$('html,body').animate({
		scrollTop: targetElmPos
	}, 1000);
};

//Smoothscroll for Days
$('#day-one-link').on('click', w.optly.mrkt.utils.smoothScroll);
$('#day-two-link').on('click', w.optly.mrkt.utils.smoothScroll);

//Scroll logic for day selection
var $filterRow = $('#filter-row'),
    $window = $(window),
    $dayOneNav = $('#day-one-header'),
    $dayTwoNav = $('#day-two-header');
$window.on('scroll', function(e) {
  var scrollTop = $window.scrollTop();
  if (scrollTop < 200) {
    //$filterRow.removeClass('fixed-filter');
    $dayOneNav.removeClass('up-arrow');
    $dayOneNav.addClass('agenda-day--active');
  } else if (scrollTop >= 200) {
    //$filterRow.addClass('fixed-filter');
    if (scrollTop < dayTwoDistanceFromTop) { // activate day one
      $dayOneNav.addClass('agenda-day--active up-arrow');
      $dayTwoNav.removeClass('agenda-day--active up-arrow');
    } else if (scrollTop >= dayTwoDistanceFromTop) { // activate day two
      $dayTwoNav.addClass('agenda-day--active');
      $dayOneNav.removeClass('agenda-day--active up-arrow');
      if (scrollTop >= dayTwoDistanceFromTop + 100) {
        $dayTwoNav.addClass('up-arrow');
      }
    }
  }
});

/*
  If item is in array, remove it
  else, add it
*/
function toggleArrayItem(array, item) {
  var itemIndex = $.inArray(item, array);
  if(itemIndex !== -1) {
    array.splice(itemIndex,1);
  } else {
    array.push(item);
  }
}

/*
  Check that every item in arr1
  is in arr2 i.e. arr1 is subset
  of arr2
*/
function isSubset(arr1, arr2) {
  return arr1.every(function(val) {
    return arr2.indexOf(val) >= 0;
  });
}

var $dropdownElems = $('.js-dropdown'),
    $events = $('.js-event'),
    filterList = [],
    $filterListItem = $('.js-filter-item'),
    $eventsContainers = $('.js-events');

//Top filter dropdown
$dropdownElems.click(function(event) {
  var $this = $(this);
  $this.toggleClass('active');
  $dropdownElems.not( $this ).removeClass( 'active' );
  $this.mouseleave(function(){
    $this.removeClass( 'active' );
  });
});

// The first child of each time slot shouldn't have margin-top
// but every following item should
function changeTalkVisibility() {
  $eventsContainers.each(function(index, eventContainer) {
    var visibleTalks = $(eventContainer).children()
    .filter(function(index, item) {
      return $(item).css('display') !== 'none';
    });


    // If no talks match filter criteria,
    // hide the time slot
    if (visibleTalks.length === 0) {
      $(this).parent().hide();
    } else {
      $(this).parent().show();
    }

    visibleTalks.each(function(index, event) {
      var $event = $(event);
      if (index === 0) {
        $event.css('margin-top', 0);
      } else {
        $event.css('margin-top', '50px');
      }
    });
  });
}

//Filter logic
$filterListItem.on('click', function(event) {
  event.stopPropagation();
  var $this = $(this),
      selectedData = ($.trim($this.attr('data-filter')));

  toggleArrayItem(filterList, selectedData);
  $this.toggleClass('selected');

  if(filterList) {
    $events.each(function(eventIndex, eventItem) {
      // array of tracks and roles for each event
      var eventFilterList = ($(eventItem).data('track') + ' ' + $(eventItem).data('roles')).split(' ');
      // if every item in filterlist isn't present on the event, hide it
      if(!isSubset(filterList, eventFilterList)) {
        $(eventItem).hide();
      } else {
        $(eventItem).show();
      }
    });
  }
  changeTalkVisibility();
  calculateDayTwoDistanceFromTop();
});

// Reset -- clear all filters
$('.js-reset').on('click', function(event) {
  filterList = [];
  $events.each(function(eIndex, eventItem) {
    $(eventItem).show();
  });
  $filterListItem.each(function(eIndex, eventItem) {
    $(this).removeClass('selected');
  });
  changeTalkVisibility();
});
