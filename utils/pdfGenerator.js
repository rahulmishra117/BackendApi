const pdf = require('html-pdf');

async function generatePDF(products) {
    const htmlContent = generateHTMLFromProducts(products);

    // Options for PDF generation
    const options = { format: 'A4' };

    // Create the PDF directly to a Buffer to avoid disk I/O and leaks
    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            resolve(buffer);
        });
    });
}

// Generate HTML from Products
function generateHTMLFromProducts(products) {
    let grandTotal = 0;
    const rows = products.map(product => {
        const qtyValue = Number(product.qty) || 0;
        const rateValue = Number(product.rate) || 0;
        const totalAmount = qtyValue * rateValue;
        grandTotal += totalAmount;
        // HTML and CSS for invoice PDF (escape user-provided content)
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(product.name)}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${qtyValue}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">₹${rateValue.toFixed(2)}</td>
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

function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) {
        return '';
    }
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

module.exports = { generatePDF };
