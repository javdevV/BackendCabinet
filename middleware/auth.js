const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No Token, auth denied'
        })
    }
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // set user in req.user
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).json({
            msg: 'token is not valid'
        })
    }
}