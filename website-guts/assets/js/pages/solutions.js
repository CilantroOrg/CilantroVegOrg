var $productTabs = $('.js-product-tab'),
    $productShowcases = $('.js-product-showcase'),
    urlProduct = w.location.hash;

// look at the hash to determine what tab to display
if (!!urlProduct) {
  var productTab = '#' + urlProduct.substring(1, urlProduct.length);
  $(productTab + '-tab').addClass('product-tab--active');
  $productShowcases.hide();
  $(productTab + '-showcase').show();
} else {
  //otherwise open the first tab (testing)
  $productShowcases.hide();
  $('#testing-showcase').show();
  $('#testing-tab').addClass('product-tab--active');
}

$productTabs.on('click', function() {
  var $this = $(this);
  var tabTitle = $this.attr('id');

  $productTabs.removeClass('product-tab--active');
  $this.addClass('product-tab--active');
  $productShowcases.hide();
  tabTitle = tabTitle.substring(0, tabTitle.indexOf('-'));
  $('#' +  tabTitle + '-showcase').show();
});

// If user selects nav dropdown, it changes the hash and needs to change the tabs
$(window).on('hashchange', function() {
  var productTab = '#' + w.location.hash.substring(1, w.location.hash.length);
  $('.js-product-tab').removeClass('product-tab--active');
  $(productTab + '-tab').addClass('product-tab--active');
  $productShowcases.hide();
  $(productTab + '-showcase').show();
});
