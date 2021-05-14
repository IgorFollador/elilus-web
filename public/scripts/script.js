var btnSign = document.querySelector("#btnSign");

var inputNameCad = document.querySelector("#nameCad");
var inputLastnameCad = document.querySelector("#lastname");
var inputEmailCad = document.querySelector("#emailCad");
var inputPassCad = document.querySelector("#passwordCad");
var inputRepeatPassCad = document.querySelector("#repeatPassword");

let nameCadOK=false;
let emailCadOK=false;
let passCadOK=false;
let repeatPassCadOK=false;

inputNameCad.addEventListener('blur', function() {
    validaCampoVazio(inputNameCad, erroName, "name");
    ativaSubmit();
});

inputEmailCad.addEventListener('blur', function() {
    validaEmail(inputEmailCad.value);
    ativaSubmit();
});

inputPassCad.addEventListener('blur', function() {
    validaCampoVazio(inputPassCad, erroPass, "pass");
    ativaSubmit();
});

inputRepeatPassCad.addEventListener('blur', function() {
    validaPass(inputRepeatPassCad.value);
    ativaSubmit();
});

function validaCampoVazio(input, erro, validar) {
    if(input.value.trim().length==0){
        input.style = "border-color: red";
        erro.style = "display: block";
        if(validar == "name"){
            nameCadOK=false;
        }else if(validar == "pass"){
            passCadOK=false;
        }
    }else{
        input.style = "border-color: #888";
        erro.style = "display: none";
        if(validar == "name"){
            nameCadOK=true;
        }else if(validar == "pass"){
            passCadOK=true;
        }
    }
}

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){
        inputEmailCad.style = "border-color: #888";
        erroEmail.style = "display: none";
        emailCadOK=true;
    }else{
        inputEmailCad.style = "border-color: red";
        erroEmail.style = "display: block";
        emailCadOK=false;
    }
}

function validaPass(RepeatPass) {
    if(RepeatPass == inputPassCad.value){
        inputRepeatPassCad.style = "border-color: #888";
        erroRepeatPass.style = "display: none";
        repeatPassCadOK=true;
    }else{
        inputRepeatPassCad.style = "border-color: red";
        erroRepeatPass.style = "display: block";
        repeatPassCadOK=false;
    }
}

function ativaSubmit() {
    if(nameCadOK && emailCadOK && passCadOK && repeatPassCadOK){
        btnSign.removeAttribute('disabled');
    }else{
        btnSign.setAttribute('disabled', 'disabled');
    }
}


btnSign.addEventListener('click', function() {
    let objCadastro = {
        "Name": inputNameCad.value,
        "LastName": inputLastnameCad,
        "Email": inputEmailCad.value,
        "Password": inputPass.value
    };
    
    console.log(objCadastro);
    //sendSign(objCadastro);
});

// function sendSign(obj) {

//     const options = {
//         method: "POST",
//         headers: new Headers({'content-type': 'application/json'}),
//         body: JSON.stringify(obj)
//     }

//     fetch("http://localhost:3000/sign", options).then(res =>{
//         console.log(res);
//         alert("Usuário cadastrado com sucesso!");
//         location.reload();
//     }).catch(error=>{
//         console.log(error);
//         alert("Infelizmente não foi possivel cadastrar o usuário!");
//     });
// }
