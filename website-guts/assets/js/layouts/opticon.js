var urlParams = window.optly.mrkt.utils.deparam(window.location.search);

// Append query params onto all anchor tags
// so we can more accurately track ticket purchases
if (!$.isEmptyObject(urlParams)) {
  $('a').each(function(ind, item) {
    var $item = $(item);
    if ($item.is(':visible')) {
      var prevHref = $item.attr('href');
      var replacementHref = window.optly.mrkt.utils.param(prevHref, urlParams);
      $item.attr('href', replacementHref);
    }
  });
}

//create custom ID for any video on the page
$(function(){
  //first get all videos on the page
  var videosList = $('.session-container').not('.session-container__placeholder');
  
  videosList.each(function(index, element){
    //get first three words of title, first name in speaker section
    var rawTitle = $(element).find('.session-title').text().toLowerCase().split(' ').slice(0, 3).join('-').replace(/[^\w-]/g,'');
    var speaker = $(element).find('.session-speaker').text().toLowerCase().split(' ').slice(0, 1);
    
    //remove all non alphanumeric characters except the dash we added
    var titleEscaped = rawTitle.replace(/[^\w-]/g,'');

    //custom ID is in format of titleword1-titleword2-titleword3-firstname, all lowercase, only a-z and 0-9, separated by dashes
    var customVideoId = titleEscaped + '-' + speaker;

    //add the id to the element's link
    $(element).find('a').attr('id', customVideoId);
  });
});

//script to play video on page load based on videoIndex
  wistiaJQuery(document).ready( function() {
    var videoIndex = window.optly.mrkt.utils.getURLParameter('videoIndex');
    if ( videoIndex ) {
      wistiaJQuery('#' + videoIndex).click();
    }
  });
