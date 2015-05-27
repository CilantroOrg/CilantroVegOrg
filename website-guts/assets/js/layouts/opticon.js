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
