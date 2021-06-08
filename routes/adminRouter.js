const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/', express.static(path.join(__dirname,'../private/admin')));

//router.post('/reset_password', express.json(), adminController.login);
//router.post('/reset_password', express.json(), adminController.createProduct);
//router.post('/reset_password', express.json(), adminController.createProduct);
//router.post('/reset_password', express.json(), adminController.createPhoto);

module.exports = router;