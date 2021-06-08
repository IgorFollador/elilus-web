require('dotenv').config();
const nodemailer = require('nodemailer');

const transporterCONTACT = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_CONTACT,
        pass: process.env.EMAIL_PASS,
    }
});

function sendMail(req,res) {
    let email = req.body.email;
    let subject = "Mensagem de " + req.body.name;
    let message  = req.body.message + "\nTELEFONE PARA CONTATO: " + req.body.telephone;
    
    transporterCONTACT.sendMail({
        from: process.env.EMAIL_CONTACT,
        to: process.env.EMAIL_CONTACT,
        replyTo: email,
        subject: subject,
        text: message
    }).then(info=>{
            console.log(info);
            res.send("Mensagem enviada com sucesso!");
    }).catch(error=>{
        console.log(error); 
        res.send("Não foi possivel enviar sua mensagem :(")
    })
}

module.exports = {sendMail};