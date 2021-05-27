const express = require('express');
const apiEmail = require('../controllers/emailController');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/sendMail', express.json(), apiEmail.sendMail);

router.post('/register', express.json(), UserController.register);

//router.post('/login', express.json(), crud.login);

module.exports = router;