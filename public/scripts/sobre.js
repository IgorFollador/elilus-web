var btnEntraContato = document.querySelector("#btn-contato");

var inputName = document.querySelector("#nameContact");
var inputEmail = document.querySelector("#emailContact");
var inputTelephone = document.querySelector("#telephoneContact");
var inputMessage = document.querySelector("#messageContact");

var nameOK=false;
var emailOK=false;
var messageOK=false;
var telephoneOK=false;

inputName.addEventListener("blur", function() {
    validaCampoVazio(inputName, erroNameContact, "name");
    ativaSubmit();
});

inputEmail.addEventListener("blur", function() {
    validaEmail(inputEmail.value);
    ativaSubmit();
});

inputTelephone.addEventListener("blur", function() {
    inputTelephone.value = validaTelephone(inputTelephone.value);
})

inputMessage.addEventListener("keyup", function() {
    validaCampoVazio(inputMessage, erroMessage, "message");
    ativaSubmit();
});

function validaCampoVazio(input, erro, validar) {
    if(input.value.trim().length==0){
        input.style = "border-color: red";
        erro.style = "display: block";
        if(validar == "name"){
            nameOK=false;
        }else if(validar == "message"){
            messageOK=false;
        }
    }else{
        input.style = "border-color: #888";
        erro.style = "display: none";
        if(validar == "name"){
            nameOK=true;
        }else if(validar == "message"){
            messageOK=true;
        }
    }
}

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)){
        inputEmail.style = "border-color: #888";
        erroEmailContact.style = "display: none";
        emailOK=true;
    }else{
        inputEmail.style = "border-color: red";
        erroEmailContact.style = "display: block";
        emailOK=false;
    }
}

function validaTelephone(telephone){
    telephone=telephone.replace(/\D/g,"");
    telephone=telephone.replace(/^(\d{2})(\d)/g,"($1) $2");
    telephone=telephone.replace(/(\d)(\d{4})$/,"$1-$2");
    telephoneOK=true;
    
    return telephone;
}

function ativaSubmit() {
    
    if(nameOK && emailOK && messageOK){
        btnEntraContato.removeAttribute("disabled");
    }else{
        btnEntraContato.setAttribute("disabled", "disabled");
    }
}

btnEntraContato.addEventListener("click", function(){

    let objContato = {
        "name": inputName.value,
        "email": inputEmail.value,
        "telephone": inputTelephone.value,
        "message": inputMessage.value
    };
    
    sendMail(objContato);
    document.querySelector("body").style.cursor = "progress";
}); 

function sendMail(obj) {

    const options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/sendMail", options).then(res =>{
        if(res.status >= 400) return alert("Infelizmente não foi possivel enviar sua mensagem :(");
        else {
            console.log(res);
            alert("Mensagem enviada com sucesso!\nEntraremos em contato...");
            location.reload();
        }
    }).catch(error=>{
        console.log(error);
        alert("Infelizmente não foi possivel enviar sua mensagem :(");
    });
}
