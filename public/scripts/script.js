var btnSign = document.querySelector("#btnSign");
var btnLogin = document.querySelector("#btnLogin"); 
var btnLogout = document.querySelector("#btnLogout"); 

var inputEmailLogin = document.querySelector("#email"); 
var inputPassLogin = document.querySelector("#password");

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

//Cookies

function setCookie(name, value) {
    var cookie = name + "=" + escape(value);

    document.cookie = cookie;
}

function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
        begin = cookies.indexOf(prefix);
        if (begin != 0) return null;
    } else begin += 2;
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) end = cookies.length;
 
    return unescape(cookies.substring(begin + prefix.length, end));
}

function deleteCookie(name) {
    if (getCookie(name)) {
           document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function deleteCookie(name) {
    if (getCookie(name)) {
           document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

//Sends

btnSign.addEventListener('click', function() {
    let objCadastro = {
        "name": inputNameCad.value,
        "lastname": inputLastnameCad.value,
        "email": inputEmailCad.value,
        "password": inputPassCad.value
    };
    sendSign(objCadastro);
    document.querySelector("body").style.cursor = 'progress';
});

function sendSign(obj) {

    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/register", options).then(res =>{
        console.log(res);
        alert("Usuário cadastrado com sucesso!");
        location.reload();
    }).catch(error=>{
        console.log(error);
        alert("Infelizmente não foi possivel cadastrar o usuário!");
    });
}

btnLogin.addEventListener('click', function() {
    let objLogin = {
        "email": inputEmailLogin.value,
        "password": inputPassLogin.value
    };
    sendLogin(objLogin);
    document.querySelector("body").style.cursor = 'progress';
});

function sendLogin(obj) {
    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/login", options).then(res =>{
        var authorization = res.headers.get('authorization-token');
        setCookie("authorization-token",authorization);
        location.reload();
    }).catch(error=>{
        console.log(error);
        alert("Email ou senha incorretos!");
    });
}


btnLogout.addEventListener('click', function() {
    logout();
    document.querySelector("body").style.cursor = 'progress';
});

function logout() {
    deleteCookie("authorization-token");
    location.reload()
}



