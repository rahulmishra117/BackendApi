const Product = require('../database/models/Product'); // Import Product model
const Quotation = require('../database/models/quotation'); // Import Quotation model

// Controller method to add products
const addProducts = async (req, res) => {
    try {
        const { products } = req.body; // Expecting an array of products

        // Validate input
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Products must be an array and cannot be empty' });
        }

        // Create an array to hold saved products and compute GST
        const savedProducts = [];
        for (const item of products) {
            const { name, qty, rate } = item;

            // Validate each product
            if (!name || !qty || !rate) {
                console.log(`Invalid product data: ${JSON.stringify(item)}`); // Log invalid product data
                return res.status(400).json({ message: 'Each product must have name, quantity, and rate' });
            }

            // Compute GST
            const gst = (rate * 18) / 100;

            // Create a new product instance
            const product = new Product({
                name,
                qty,
                rate,
                gst
            });

            // Save the product to the database
            const savedProduct = await product.save();
            savedProducts.push(savedProduct);
        }

        // Optionally, create a Quotation
        const quotation = new Quotation({
            userId: req.userId, // Assuming you're extracting the user ID from the token
            products: savedProducts
        });

        await quotation.save();

        // Return success response
        res.status(201).json({
            message: 'Products added successfully',
            products: savedProducts
        });
    } catch (error) {
        console.error('Error adding products:', error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to add products', error });
    }
};

module.exports = { addProducts };
