const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization-token');
    if(!token) return res.status(401).send("Acesso negado!")

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido '});

        req.userId = decoded.userId;
        return next();
    });
}
