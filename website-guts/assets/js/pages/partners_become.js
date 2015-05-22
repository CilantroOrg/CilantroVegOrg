console.log('partners_become.js');

$('.join-link.technology-form').on('click', function(e){
  e.preventDefault();
  w.optly.mrkt.modal.open({ modalType: 'become-partner-technology' });
});

$('.join-link.solutions-form').on('click', function(e){
  e.preventDefault();
  w.optly.mrkt.modal.open({ modalType: 'become-partner-solutions' });
});


//Reveal follow up field
$('.become-partner-fields select#company_type').on('change', function(e, a){
  if (e.target.value === 'Subsidiary'){
    $('.parent-company-row').removeClass('hidden');
  } else {
    $('.parent-company-row').addClass('hidden');
  }
});
