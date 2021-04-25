var btnEntraContato = document.querySelector("#btn-contato");

var inputName = document.querySelector("#name");
var inputEmail = document.querySelector("#email");
var inputTelephone = document.querySelector("#telephone");
var inputMessage = document.querySelector("#message");

// var inputsCorrects = [];

btnEntraContato.addEventListener('click', function(){
    console.log(inputName.value);
    console.log(inputEmail.value);
    console.log(inputTelephone.value);
    console.log(inputMessage.value);
}); 


// function inputCheck(data) {
//     inputsCorrects+=data;
// };


