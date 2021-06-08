const express = require('express');
const path = require('path');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.use('/', express.static(path.join(__dirname,'../private')));

router.post('/forgot_password', express.json(), UserController.recoveryPassword);

router.post('/reset_password', express.json(), UserController.resetPassword);

module.exports = router;