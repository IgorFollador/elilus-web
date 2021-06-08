require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_NOREPLY,
        pass: process.env.EMAIL_PASS,
    }
});

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./resources/mail/')
      },
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',   
}));

module.exports =  transport;