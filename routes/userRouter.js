const express = require('express');
const router = express.Router();

const apiEmail = require('../controllers/emailController');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const auth = require('../controllers/authController');

// CONTACT
router.post('/sendMail', express.json(), apiEmail.sendMail);

// USER SIGN
router.post('/register', express.json(), UserController.register);

router.post('/login', express.json(), UserController.login);

router.get('/logout', UserController.logout);

// USER FAVORITES
router.get('/getFavorites', auth.User, UserController.getFavorites);

router.post('/setFavorites', express.json(), auth.User, UserController.setFavorite);

// PRODUCTS AND CATEGORIES
router.get('/listCategories', CategoryController.listAll);

router.get('/listProducts', ProductController.listAll);

module.exports = router;