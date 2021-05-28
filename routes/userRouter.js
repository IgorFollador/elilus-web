const express = require('express');
const router = express.Router();

const apiEmail = require('../controllers/emailController');
const UserController = require('../controllers/UserController');
const auth = require('../controllers/authController') 

router.post('/sendMail', express.json(), apiEmail.sendMail);

router.post('/register', express.json(), UserController.register);

router.post('/login', express.json(), UserController.login);

router.get('/favorites', auth, (req, res) => {
    res.send('Este dado só deve ser visto pelos usuarios logados!')
});

module.exports = router;