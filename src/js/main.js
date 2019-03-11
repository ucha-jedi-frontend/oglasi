/*MODALI*/
$( '#btn-prijava' ).click(function() {
  $('#modal-prijava').addClass('opened');
  $('body').addClass('non-scroll');
});
$( '#btn-registracija' ).click(function() {
  $('#modal-registracija').addClass('opened');
  $('body').addClass('non-scroll');
});


$( '.close-modal' ).click(function() {
  $(this).parent().parent().removeClass('opened');
  $('body').removeClass('non-scroll');
});
