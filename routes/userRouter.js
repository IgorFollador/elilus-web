const express = require('express');
const router = express.Router();

const apiEmail = require('../controllers/emailController');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController')
const auth = require('../controllers/authController');

router.post('/sendMail', express.json(), apiEmail.sendMail);

router.post('/register', express.json(), auth, UserController.register);

router.post('/login', express.json(), UserController.login, auth);

router.get('/list', ProductController.listAll);

router.get('/favorites', auth, ProductController.getFavorites);

module.exports = router;