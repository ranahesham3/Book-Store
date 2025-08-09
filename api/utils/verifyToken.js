const User = require('../models/user');
const { createError } = require('./error');

const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next(createError(401, 'you are not authenticated'));
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return next(createError(403, 'Token is not valid'));
        req.user = await User.findById(user.id);
        next();
    });
};

exports.verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        return next(createError(403, 'you are not authorized'));
    });
};

exports.verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        return next(createError(403, 'you are not authorized'));
    });
};
