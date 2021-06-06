const User = require('../models/User');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function (req, res) {
        const selectUser = await User.findOne({where: {email: req.body.email}});
        if(selectUser) return res.status(400).send('Email já cadastrado!');
        const user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        
        try{
            const savedUser = await user.save();
            const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
            res.header('authorization-token', token);
            user.password = undefined;
            res.send(savedUser);
        }catch (error) {
            res.status(400).send(error)
        }
    },

    login: async function (req, res) {
        const selectUser = await User.findOne({where: {email: req.body.email}});
        if(!selectUser) return res.status(401).send('Email ou senha incorretos');
        
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectUser.password);
        if(!passwordAndUserMatch) return res.status(401).send('Email ou senha incorretos');
        
        const token = jwt.sign({userId: selectUser.id}, process.env.TOKEN_SECRET);
        res.header('authorization-token', token);
        res.send("Usuário logado!");
    },

    getFavorites: async function (req, res) {
        const products = await Favorite.findAll({
            where: { id_user: req.userId },
            order: [ [ 'id_product'] ],
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Product,
                        as: 'product',
                        attributes: ['id', 'description', 'path_image']}]
            });
        return res.json(products);
    },

    setFavorite: async function (req, res) {
        const favorites = new Favorite({
            id_product: req.body.id_product,
            id_user: req.userId
        })

        selectFavorite =  await Favorite.findOne({where: {id_product: req.body.id_product, id_user: req.userId}});

        if(selectFavorite){
            selectFavorite.destroy();
            return res.send("Produto excluido")
        } 
        try{
            await favorites.save();
            res.send("Produto cadastrado");
        }catch (error) {
            res.status(400).send(error)
        }
        
    }
}