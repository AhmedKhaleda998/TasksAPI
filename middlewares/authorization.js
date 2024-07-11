const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization required' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).json({ error: 'Not Authorized. Token has been manipulated' });
    }
    if (!decodedToken) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
    try {
        const { email } = decodedToken;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = authorize;