const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send('Access Denied, No token provided');

    try {
        const decodedToken = jwt.verify(token, config.get('jwtKey'));
        req.user = decodedToken;
        next();
    } catch (exception) {
        res.status(400).send('Token is Invalid');
    }
}