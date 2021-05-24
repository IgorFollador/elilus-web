const express = require('express');
const path = require('path');
const app = express();
//const db = require('./mysql');
const apiEmail = require('./apiEmail');
const crud = require('./apiCrud');

require('dotenv').config();
let port = process.env.PORT;

app.use('/', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.post('/sendMail', express.json(), (req,res) => {
    apiEmail.sendMail(req,res);
});

app.post('/sign', express.json(), (req,res) => {
    crud.sign(req,res);
});

app.listen(port, ()=>{
    console.log("Server running on port %s", port);
});
