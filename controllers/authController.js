const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

module.exports = async function (req, res, next) {
    const token_acess = req.header('authorization-token');
    const selectBlacklist = await Blacklist.findOne({where: {token:token_acess}})
    if(!token_acess) return res.status(401).send("Acesso negado!")
    if(selectBlacklist) return res.status(401).send("Acesso negado!")
    jwt.verify(token_acess, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido '});

        req.userId = decoded.userId;
        return next();
    });
}
