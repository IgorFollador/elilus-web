module.exports = {
    require('dotenv').config();

    const transporter = nodemailer.createTransport({
        host: 'smtp.umbler.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    app.use(express.urlencoded({extended: true}));

    app.post('/sendMail', express.json(), (req,res) => {
        let email = req.body.Email;
        let subject = "Mensagem de " + req.body.Name;
        let message  = req.body.Message + "\nTELEFONE PARA CONTATO: " + req.body.Telephone;

        console.log(email);
        console.log(subject);
        console.log(message);
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
}