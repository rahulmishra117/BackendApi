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
        required: true
    }
});

const quotationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    products: [productSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
