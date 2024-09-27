const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).send('Token is required.');
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    jwt.verify(token,"abc", (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }

        req.userId = decoded.id; // Set the user ID from the token
        next();
    });
};

module.exports = verifyToken;
