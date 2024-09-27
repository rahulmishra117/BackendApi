const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const verifyToken = require('../middleware/verifyToken');


router.post('/add-products', verifyToken, productController.addProducts);

module.exports = router;
