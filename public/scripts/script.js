let auth = getCookie("authorization_token");
function validaSession() {
    if(auth==null || auth=="null") {
        logged.style = "display: none;"
    }else {
        btnModal.style = "display: none;"
        logged.style = "display: block;"
    }
}

validaSession();

// BUTTONS
var btnSign = document.querySelector("#btnSign");
var btnLogin = document.querySelector("#btnLogin"); 
var btnLogout = document.querySelector("#btnLogout"); 
var btnForgot = document.querySelector("#btnForgot");
var btnSearch = document.querySelector("#btnSearch");
//INPUTS FOR LOGIN
var inputEmailLogin = document.querySelector("#email"); 
var inputPassLogin = document.querySelector("#password");
var remember = document.querySelector("#remember");
//INPUTS FOR REGISTER
var inputNameCad = document.querySelector("#nameCad");
var inputLastnameCad = document.querySelector("#lastname");
var inputEmailCad = document.querySelector("#emailCad");
var inputPassCad = document.querySelector("#passwordCad");
var inputRepeatPassCad = document.querySelector("#repeatPassword");
//INPUTS FOR FORGOT PASSWORD
var inputEmailForgot = document.querySelector("#emailForgot");
//VALIDATIONS FOR REGISTER
let nameCadOK=false;
let emailCadOK=false;
let passCadOK=false;
let repeatPassCadOK=false;

inputNameCad.addEventListener("blur", function() {
    validaCampoVazio(inputNameCad, erroName, "name");
    ativaSubmit();
});

inputEmailCad.addEventListener("blur", function() {
    validaEmail(inputEmailCad.value);
    ativaSubmit();
});

inputPassCad.addEventListener("blur", function() {
    validaCampoVazio(inputPassCad, erroPass, "pass");
    ativaSubmit();
});

inputRepeatPassCad.addEventListener("blur", function() {
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
        btnSign.removeAttribute("disabled");
    }else{
        btnSign.setAttribute("disabled", "disabled");
    }
}

//Cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

//Sends

btnSign.addEventListener("click", function() {
    let objCadastro = {
        "name": inputNameCad.value,
        "lastname": inputLastnameCad.value,
        "email": inputEmailCad.value,
        "password": inputPassCad.value
    };
    sendSign(objCadastro);
    document.querySelector("body").style.cursor = "progress";
});

function sendSign(obj) {
    const options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/register", options).then(res =>{
        if(res.status == 507) return alert("Usuário já cadastrado!");
        else if(res.status >= 400) return alert("Infelizmente não foi possivel cadastrar o usuário!");
        else {
            console.log(res);
            alert("Usuário cadastrado com sucesso!");
            sendLogin({"email": inputEmailCad.value, "password": inputPassCad.value});
        }
    }).catch(error=>{
        console.log(error);
        alert("Infelizmente não foi possivel cadastrar o usuário!");
    });
}

btnLogin.addEventListener("click", function() {
    let objLogin = {
        "email": inputEmailLogin.value,
        "password": inputPassLogin.value,
        "remember": remember.checked
    };
    sendLogin(objLogin);
});

function sendLogin(obj) {
    const options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/login", options).then(res =>{
        if(res.status==403)return alert("Usuário ou senha incorretos!");
        else if(res.status >= 400)return alert("Erro ao realizar login!");
        else {
            document.querySelector("body").style.cursor = "progress";
            var authorization = res.headers.get("authorization_token");
            setCookie("authorization_token",authorization);
            if(!remember.checked)setCookie("authorization_token",authorization, 1);
            else setCookie("authorization_token",authorization);
            location.reload();
        }
    }).catch(error=>{
        console.log(error);
        alert("Erro ao realizar login!");
    });
}

btnLogout.addEventListener("click", function() {
    logout();
    document.querySelector("body").style.cursor = "progress";
    console.log("Logout...");
    setTimeout(() => {
        deleteCookie("authorization_token");
        window.location.href="./";
    }, 150);
});

function logout() {
    const options = {
        headers: new Headers({"authorization_token": getCookie("authorization_token")}),
    }
    fetch("http://localhost:3000/user/logout", options);
}

btnForgot.addEventListener("click", function() {
    let objForgot = {
        "email": inputEmailForgot.value
    }
    sendResetPassword(objForgot);
    document.querySelector("body").style.cursor = "progress";
});

function sendResetPassword(obj) {
    const options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/auth/forgot_password", options).then(res =>{
        if(res.status == 404) return alert("Usuário não encontrado!");
        else if(res.status == 400) return alert("Não foi possivel enviar o email para redefinição de senha!")
        else if(res.status >= 400) return alert("Infelizmente não foi solicitar a redefinição de senha!");
        else {
            alert("Solicitação realizada, verifique seu email!");
            location.reload();
        }
    }).catch(error=>{
        console.log(error);
        alert("Infelizmente não foi solicitar a redefinição de senha!");
    });
}

btnSearch.addEventListener("click", function() {
    document.querySelector("body").style.cursor = 'progress';
})