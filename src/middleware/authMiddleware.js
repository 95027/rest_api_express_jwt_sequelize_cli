const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid'});
    }
}



module.exports = auth;