const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Favorite = require('../models/Favorite');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(function (){
    console.log("Connected to MySQL!")
}).catch(function(err){
    console.log("Couldn't connect to MySQL: " + err)
})

User.init(connection);
Product.init(connection);
Category.init(connection);
Favorite.init(connection);

Product.associate(connection.models)
Favorite.associate(connection.models)

module.exports = connection;