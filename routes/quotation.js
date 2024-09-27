const express = require('express');
const router = express.Router();
const quotationController = require('../controller/quotationController');
const verifyToken = require('../middleware/verifyToken');

// View all quotations (Protected by token)
router.get('/quotations', verifyToken, quotationController.viewQuotations);
router.get('/quotations/download/:id', verifyToken, quotationController.downloadQuotation);


module.exports = router;
