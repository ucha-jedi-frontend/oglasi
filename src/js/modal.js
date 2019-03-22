/*MODALI*/
$( '#btn-prijava' ).click(function() {
  $('#modal-prijava').addClass('opened');
  $('body').addClass('non-scroll');
});

$( '#btn-registracija' ).click(function() {
	openregistracija();
});

// dugme na modalu prijava
$( '#dugme-registracija1' ).click(function() {
	$('#modal-prijava').removeClass('opened');
	openregistracija();
});


function openregistracija() {
  $('#modal-registracija').addClass('opened');
  $('body').addClass('non-scroll');
}

$( '.close-modal' ).click(function() {
  $(this).parent().parent().removeClass('opened');
  $('body').removeClass('non-scroll');
});


// const _api = axios.create({
//   baseURL:`http://localhost:3000`
// });


$('#dugme-login1').click(async()=>{
  const user = $('#email-prijava').val();
  const pass = $('#lozinka-prijava').val();
  let response = await _api.get(`/users?email=${user}&password=${pass}`);
  let users = await response.data;
  if(users[0]=== undefined){
    console.log('prazan')
  } else  {
    console.log('ima korisnika')
  }
})

$('#dugme-registracija').click(()=>{
  const mail = $('#email-registracija').val();
  const pass1 = $('#lozinka-registracija1').val();
  const pass2 = $('#lozinka-registracija2').val();
  if(pass1 === pass2){
   _api.post('/users', {
        email: mail,
        password: pass1
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      alert('Ponovljena lozinka nije odgovarajuca')
    }
  })