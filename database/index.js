const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')

const connection = new Sequelize(dbConfig);

// connection.authenticate().then(function (){
//     console.log("Conectado no MySQL!")
// }).catch(function(err){
//     console.log("Não foi possivel conectar ao MySQL: " + err)
// })

User.init(connection);

module.exports = connection;