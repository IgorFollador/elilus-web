require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

function sendMail(req,res) {
    let email = req.body.email;
    let subject = "Mensagem de " + req.body.name;
    let message  = req.body.message + "\nTELEFONE PARA CONTATO: " + req.body.telephone;

    // console.log(email);
    // console.log(subject);
    // console.log(message);
    
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
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