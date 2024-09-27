const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

async function generatePDF(products) {
    const htmlContent = generateHTMLFromProducts(products);

    // Define the path to the invoices directory
    const invoicesDir = path.join(__dirname, 'invoices');

    // Ensure the invoices directory exists
    if (!fs.existsSync(invoicesDir)) {
        fs.mkdirSync(invoicesDir);
    }

    // Define the file path for the PDF
    const filePath = path.join(invoicesDir, `quotation-${Date.now()}.pdf`);

    // Options for PDF generation
    const options = { format: 'A4' };

    // Create the PDF
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, options).toFile(filePath, (err, res) => {
            if (err) {
                reject(err);
            } else {
                console.log(`PDF generated at: ${res.filename}`);
                resolve(fs.readFileSync(filePath)); // Return the PDF buffer
            }
        });
    });
}

// Generate HTML from Products
function generateHTMLFromProducts(products) {
    let grandTotal = 0;
    const rows = products.map(product => {
        const totalAmount = product.qty * product.rate;
        grandTotal += totalAmount;
        // HTML and CSS for invoice PDF 
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${product.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${product.qty}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">₹${product.rate.toFixed(2)}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">₹${totalAmount.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    const gst = grandTotal * 0.18;
    const grandTotalWithGST = grandTotal + gst;

    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f4f4f4;
                    }
                    .summary {
                        text-align: right;
                        margin-top: 10px;
                    }
                    .summary table {
                        width: 100%;
                        border: none;
                    }
                    .summary td {
                        padding: 5px;
                        border: none;
                    }
                    .total {
                        font-weight: bold;
                    }
                    .grand-total {
                        font-size: 18px;
                        font-weight: bold;
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <h1>Invoice</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>

                <div class="summary">
                    <table>
                        <tr>
                            <td>Total</td>
                            <td>₹${grandTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>GST (18%)</td>
                            <td>₹${gst.toFixed(2)}</td>
                        </tr>
                        <tr class="grand-total">
                            <td>Grand Total</td>
                            <td>₹${grandTotalWithGST.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
    `;
}

module.exports = { generatePDF };
