const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');
const User = require('../models/User');

module.exports = {
    User: async function (req, res, next) {
        const { cookies } = req;
        const token_acess = cookies.authorization_token;
        const selectBlacklist = await Blacklist.findOne({where: {token:token_acess}})
        if(!token_acess) return res.status(401).send("Acesso negado!")
        if(selectBlacklist) return res.status(401).send("Acesso negado!")
        jwt.verify(token_acess, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err) return res.status(401).send({ error: 'Token inválido '});

            req.userId = decoded.userId;
            return next();
        });
    },

    Admin: async function (req, res, next) {
        const selectUser = await User.findOne({where: {email: req.body.email}});
        if(!selectUser) return res.status(401).send('Email ou senha incorretos');

        if(!selectUser.admin) return res.status(400).send('Usuário não é adminstrador');

        const token_acess = req.header('authorization_token');
        const selectBlacklist = await Blacklist.findOne({where: {token:token_acess}})
        if(!token_acess) return res.status(401).send("Acesso negado!")
        if(selectBlacklist) return res.status(401).send("Acesso negado!")
        jwt.verify(token_acess, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err) return res.status(401).send({ error: 'Token inválido '});

            req.userId = decoded.userId;
            return next();
        });
    }
}