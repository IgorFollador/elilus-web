const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User')

const connection = new Sequelize(dbConfig);

connection.authenticate().then(function (){
    console.log("Connected to MySQL!")
}).catch(function(err){
    console.log("Couldn't connect to MySQL: " + err)
})

User.init(connection);

module.exports = connection;