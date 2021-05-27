const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async function (req, res) {
        const selectUser = await User.findOne({where: {email: req.body.Email}});
        if(selectUser) return res.status(400).send('Email já cadastrado!');
        const user = new User({
            name: req.body.Name,
            lastname: req.body.LastName,
            email: req.body.Email,
            password: bcrypt.hashSync(req.body.Password)
        })
        
        try{
            const savedUser = await user.save();
            res.send(savedUser)
        }catch (error) {
            res.status(400).send(error)
        }
    }
}