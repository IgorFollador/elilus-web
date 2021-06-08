const User = require('../models/User');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const Blacklist = require('../models/Blacklist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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

    logout: async function (req, res) {
        const token = req.header('authorization-token');
        const blacklist = new Blacklist({
            token:token
        })
        await blacklist.save();
        res.end();
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

        const selectFavorite =  await Favorite.findOne({where: {id_product: req.body.id_product, id_user: req.userId}});

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
    },

    recoveryPassword: async function (req, res) {
        try {
            const email = req.body.email;
            const selectUser = await User.findOne({where: {email}});
            if(!selectUser) return res.status(400).send('Email não encontrado!');

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);
            
            await selectUser.update({
                password_reset_token: token,
                password_reset_expires: now
            });

            mailer.sendMail({
                to: email,
                from: process.env.EMAIL_NOREPLY,
                subject: 'Esqueceu sua senha?',
                template: 'auth/forgot_password',
                context: { token },
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).send({ error: 'Não foi possivel enviar o email forgot_password' });
                }
                res.send();
            })
        } catch (error) {
            res.status(400).send({ error: 'Erro ao redefinir senha, tente novamente'})
        }
    },

    resetPassword: async function(req, res) {
        const { email, token, password} = req.body;
        try {
            const selectUser = await User.findOne({where: { email }});

            if(!selectUser)
                return res.status(400).send('Email não encontrado!');

            if(token != selectUser.password_reset_token)
                return res.status(400).send('Token inválido!');

            if(Date.now() > selectUser.password_reset_expires)
                return res.status(400).send('Token expirado, gere um novo!');
            
            selectUser.password = bcrypt.hashSync(password);
            selectUser.save();
            res.send();
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Erro ao redefinir senha, tente novamente'})
        }
    }
}