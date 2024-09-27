const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        required: true,
        default: 18 
    }
});

// Create Product model using productSchema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
