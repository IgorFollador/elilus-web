require('dotenv').config();

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(process.env.MYSQL_ACCESS);
    global.connection = connection;
    return connection;
}

connect();
console.log("Conectou no MySQL!");

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO usuario(NOME,SOBRENOME,EMAIL,SENHA) VALUES (?,?,?,?);';
    const values = [customer.NOME, customer.SOBRENOME, customer.EMAIL, customer.SENHA];
    return await conn.query(sql, values);
}

async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'UPDATE usuario SET nome=?, idade=?, uf=? WHERE id=?';
    const values = [customer.nome, customer.idade, customer.uf, id];
    return await conn.query(sql, values);
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'DELETE FROM usuario where id=?;';
    return await conn.query(sql, [id]);
}
 
module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer}