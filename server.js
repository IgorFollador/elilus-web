const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const db = require("./mysql");


require('dotenv').config();
let port = process.env.PORT;

const transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

app.use('/', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.post('/sendMail', express.json(), (req,res) => {
    let email = req.body.Email;
    let subject = "Mensagem de " + req.body.Name;
    let message  = req.body.Message + "\nTELEFONE PARA CONTATO: " + req.body.Telephone;

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
});

app.post('/sign', express.json(), (req,res) => {
    let name = req.body.Name;
    let lastname = req.body.LastName;
    let email = req.body.Email;
    let pass =  req.body.Password;

    console.log(name);
    console.log(lastname);
    console.log(email);
    console.log(pass);
    
    (async () => {
        const result = await db.insertCustomer({NOME: name, SOBRENOME: lastname, EMAIL: email, SENHA: pass}); 
        console.log(result);
    })().then(info=>{
        console.log(info);
        res.send("Usuário cadastrado com sucesso!");
    }).catch(error=>{
        console.log(error); 
        res.send("Não foi possivel cadastrar o usuário!")
    });
});

app.listen(port, ()=>{
    console.log("Server running on port %s", port);
});
