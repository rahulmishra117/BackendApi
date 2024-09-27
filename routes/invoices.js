// routes/index.js
const express = require('express');
const router = express.Router();
const { generateInvoiceImage } = require('../controller/invoiceController');

router.post('/invoices/image', generateInvoiceImage);

module.exports = router;
