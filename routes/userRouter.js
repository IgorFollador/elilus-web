const express = require('express');
const router = express.Router();

const apiEmail = require('../controllers/emailController');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController')
const auth = require('../controllers/authController');

router.post('/sendMail', express.json(), apiEmail.sendMail);

router.post('/register', express.json(), UserController.register);

router.post('/login', express.json(), UserController.login);

router.get('/getFavorites', auth, UserController.getFavorites);

router.post('/setFavorites', express.json(), auth, UserController.setFavorite);

router.get('/list', ProductController.listAll);

module.exports = router;