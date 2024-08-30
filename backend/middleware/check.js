const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkToken = async (req, res, next) => {
    try {
        const token = req.body.token
        const decode = jwt.verify(token, process.env.KEY)
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired' });
        } else {
            return res.status(403).json({ msg: 'Invalid token' });
        }
    }
}

module.exports = {checkToken}