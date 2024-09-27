// #Rahul Mishra Code base 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;

const db = require('./database/db');
const urlDb = 'mongodb://localhost:27017/productdb';

// Defining the user routes
const userRoutes = require('./routes/index');
const productRoutes  = require('./routes/product.routes');
const quotation  = require('./routes/quotation');
const invoiceRoutes = require('./routes/invoices');
const bodyParser = require('body-parser');

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Use user routes
app.use('/api', userRoutes);
app.use('/api',productRoutes);
app.use('/api',quotation);
app.use('/api',invoiceRoutes);
// Connect to the database
db.connect(urlDb)
    .then(() => {
        console.log("Database Connection Done!");

        // Start the server after a successful database connection
        app.listen(PORT, (err) => {
            if (err) {
                console.error(`Error in Application ${err}`);
            } else {
                console.log(`Application listening on port ${PORT}`);
            }
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
