const db = require("./mysql");

(async () => {
    
    console.log('Começou!');
    
    console.log('INSERT INTO USUARIO');
    const result = await db.insertCustomer({NOME: "MATHEUS", SOBRENOME: undefined,TELEFONE: "(54)99975-4548", EMAIL: "matheus@gmail.com", SENHA:"admin123"}); 
    console.log(result);

    console.log('SELECT * FROM USUSARIO');
    const clientes = await db.selectCustomers();
    console.log(clientes);
    
})();