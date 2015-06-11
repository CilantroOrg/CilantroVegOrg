var $productTabs = $('.js-product-tab');
var $productShowcases = $('.js-product-showcase');

//TODO (stew) look at query params to see which tab to activate
$productShowcases.hide().filter(':first').show();
$productTabs.first().addClass('product-tab--active');

$productTabs.on('click', function() {
  var $this = $(this);
  $productTabs.removeClass('product-tab--active');
  $this.addClass('product-tab--active');
  $productShowcases.hide();
  $('#' + $this.attr('id') + '-showcase').show();
});
