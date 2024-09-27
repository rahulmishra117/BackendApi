const Quotation = require('../database/models/quotation'); 
const { generatePDF } = require('../utils/pdfGenerator'); 
exports.viewQuotations = async (req, res) => {
    try {
        // Fetch all quotations for the logged-in user
        const quotations = await Quotation.find({ userId: req.userId });

        if (!quotations.length) {
            return res.status(404).json({ message: 'No quotations found' });
        }

        // Map to include download link
        const response = quotations.map(quotation => ({
            id: quotation._id,
            date: quotation.date,
            downloadLink: `/api/quotations/download/${quotation._id}`
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching quotations', error });
    }
};

exports.downloadQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);

        if (!quotation || quotation.userId.toString() !== req.userId) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        const pdfBuffer = await generatePDF(quotation.products);
        console.log("PDF Buffer Size:", pdfBuffer.length);
        if (pdfBuffer.length === 0) {
            throw new Error('PDF buffer is empty');
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=quotation-${quotation._id}.pdf`,
        });

        return res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error("Error downloading PDF:", error);
        return res.status(500).json({ message: 'Error downloading PDF', error });
    }
};

