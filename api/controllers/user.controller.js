const User = require('../models/User');
const { createError } = require('../utils/error');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) return next(createError(404, 'Users are not found'));
        return res.status(200).json({
            success: true,
            message: 'All users',
            count: users.length,
            users,
        });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');
        if (!user) return next(createError(404, 'User is not found'));
        return res.status(200).json({
            success: true,
            message: 'Single User',
            user,
        });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};
