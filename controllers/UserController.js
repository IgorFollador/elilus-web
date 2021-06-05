const User = require('../models/User');
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
        if(!selectUser) return res.status(400).send('Email ou senha incorretos');
        
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectUser.password);
        if(!passwordAndUserMatch) return res.status(400).send('Email ou senha incorretos');
        
        const token = jwt.sign({userId: selectUser.id}, process.env.TOKEN_SECRET);
        res.header('authorization-token', token);
        res.send("Usuário logado!");
    }
}