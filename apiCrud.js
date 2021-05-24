const db = require('./mysql');

function sign(req,res) {
    let name = req.body.Name;
    let lastname = req.body.LastName;
    let email = req.body.Email;
    let pass =  req.body.Password;

    // console.log(name);
    // console.log(lastname);
    // console.log(email);
    // console.log(pass);

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
}

module.exports = {sign};