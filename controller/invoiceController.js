const puppeteer = require('puppeteer');

const generateInvoiceImage = async (req, res) => {
    try {
        const { invoiceData } = req.body; 

        // Launch Puppeteer browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

     
        await page.setContent(`
            <html>
                <head>
                    <style>
                        /* Add your invoice styles here */
                        body { font-family: Arial, sans-serif; }
                        .invoice { padding: 20px; border: 1px solid #000; }
                    </style>
                </head>
                <body>
                    <div class="invoice">
                        <h1>Invoice</h1>
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                        <p>Customer Name: ${invoiceData.customerName}</p>
                        <p>Products:</p>
                        <ul>
                            ${invoiceData.products.map(product => `<li>${product.name}: ${product.qty} x $${product.rate}</li>`).join('')}
                        </ul>
                        <p>Total: $${invoiceData.total}</p>
                    </div>
                </body>
            </html>
        `);

        // Capture screenshot of the invoice
        const imageBuffer = await page.screenshot({ fullPage: true });
        await browser.close();

        // Set response type as image
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error) {
        console.error("Error generating invoice image:", error);
        res.status(500).json({ message: "Failed to generate invoice image" });
    }
};

module.exports = {
    generateInvoiceImage,
};
