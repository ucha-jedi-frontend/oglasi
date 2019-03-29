// const _api = axios.create({
//   baseURL: `http://localhost:3000`
// });
import {_api} from "./main.js"
/*MODALI*/
$( `#btn-prijava` ).click(function() {
  $(`#modal-prijava`).addClass(`opened`);
  $(`body`).addClass(`non-scroll`);
});

$( `#btn-registracija` ).click(function() {
	openregistracija();
});

// dugme na modalu prijava
$( `#dugme-registracija1` ).click(function() {
	$(`#modal-prijava`).removeClass(`opened`);
	openregistracija();
});


function openregistracija() {
  $(`#modal-registracija`).addClass(`opened`);
  $(`body`).addClass(`non-scroll`);
}

$( `.close-modal` ).click(function() {
  $(this).parent().parent().removeClass(`opened`);
  $(`body`).removeClass(`non-scroll`);
});



$( `#dugme-login1` ).click(function() {
  var accessGranted = false;
  checkUser($(`#email-prijava`).val(),$(`#lozinka-prijava`).val()).then(function(result) {
  accessGranted = result;
  if(accessGranted){
    //$('#btn-registracija').addClass('hidden');
    $(`#btn-prijava`).addClass(`hidden`);
    //   $(`#btn-registracija`).html(`Uspesno ste se ulogovali`).attr(`disabled`,`true`);                 	
    $(`.crta`).addClass(`hidden`);
    $(`#modal-prijava`).removeClass(`opened`);
    $(`body`).removeClass(`non-scroll`);		                 
  }else {
    alert(`Pogrešna e-mail adresa ili lozinka. Pokušajte ponovo.`); 	
  }    				
  });
});

let logedUser = {};
class User {
  constructor(user,name) {
    this.user = user;
    this.name = name;
  }
}

 async function checkUser(in_email,in_password){
                let response = await _api.get(`/users`);
                let users = await response.data; 
                for (const user of users) {
                  let name = user.user;
                  let userpass = user.password;
                  let email = user.email;
                  if (in_email==email && in_password==userpass) {
                    logedUser = new User (name,email);
                    sessionStorage.setItem(`user`,JSON.stringify(logedUser));
                    $(`#btn-prijava`).html(`${name}`).attr(`disabled`,`true`);
                    $(`#dugme-registracija`).html(`Odjava`)
                    //  .attr(`id`,`loggOut`).click(()=>{
                    //   console.log(`uslo u logout`)
                    //   sessionStorage.removeItem(`user`);
                    //   this.attr(`id`,`btn-registracija`).text(`Registracija`);
                    // })
                    return true;
                  } 
                 
                }
                return false;
              }
              
  $(`.nosubmit`).submit(function (evt) {
    evt.preventDefault();
});            

$(`#dugme-registracija`).click(()=>{
  const mail = $(`#email-registracija`).val();
  const pass1 = $(`#lozinka-registracija1`).val();
  const pass2 = $(`#lozinka-registracija2`).val();
  if(pass1 === pass2){
   _api.post(`/users`, {
        email: mail,
        password: pass1
      })
      .catch(function (error) {
        console.log(error);
      });
      $(`#btn-registracija`).html(`Uspesno ste se registrovali. Mozete da se ulogujete`).attr(`disabled`,`true`); 
      $(`#modal-registracija`).removeClass(`opened`);
      $(`body`).removeClass(`non-scroll`);	
      
    }else{
      alert(`Ponovljena lozinka nije odgovarajuca`)
    }
  })