var $productTabs = $('.js-product-tab');

$productTabs.on('click', function() {
  $productTabs.removeClass('product-tab--active');
  $(this).addClass('product-tab--active');
});
