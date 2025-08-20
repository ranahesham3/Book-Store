const { promisify } = require('util');

const User = require('../models/User');
const Role = require('../models/Role');
const { createError } = require('../utils/error');
const Email = require('../utils/email');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const role = await Role.findOne({ role: 'User' });
        const { firstName, lastName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, +process.env.SALT);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
        });
        return res
            .status(200)
            .json({ success: true, message: 'User Registered successfully!' });
    } catch (err) {
        console.log(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.registerAdmin = async (req, res, next) => {
    try {
        const role = await Role.find({ role: 'Admin' });
        const { firstName, lastName, userName, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, +process.env.SALT);
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            isAdmin: true,
            roles: role,
        });
        return res
            .status(200)
            .json({ success: true, message: 'Admin Registered successfully!' });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password)))
            return next(createError(401, 'Incorrect email or password!'));

        //create a token before sending a response
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        //there is a logged in user
        return res
            .cookie('jwt', token, { httpOnly: true })
            .status(200)
            .json({ success: true, message: 'User Logged in successfully!!' });
    } catch (err) {
        console.log(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.sendEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(401, 'Incorrect email!'));

    try {
        //create a token before sending a response
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        user.passwordResetExpires = Date.now() + 1000 * 60 * 10;
        await user.save({ validateBeforeSave: false });
        //send the token in the mail
        const ResetUrl = `http://localhost:4200/viewer/reset/${token}`;
        await new Email(user, ResetUrl).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Check your email',
        });
    } catch (err) {
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );
        const user = await User.findOne({
            _id: decoded.id,
            passwordResetExpires: { $gte: Date.now() },
        }).select('+password');
        if (!user) return next(createError(401, 'Incorrect token!'));

        const hashPassword = await bcrypt.hash(password, +process.env.SALT);

        user.password = hashPassword;
        await user.save({ validateBeforeSave: false });

        //send the token in the cookie
        return res.cookie('jwt', token, { httpOnly: true }).status(200).json({
            success: true,
            message: 'Password Updated successfully!!',
        });
    } catch (err) {
        console.log(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.status(200).json({ success: true });
};

exports.isLoggedIn = async (req, res, next) => {
    //check if the token exist
    if (req.cookies.jwt) {
        try {
            const token = req.cookies.jwt;
            //verification token
            //decoded contains the user's data like:{ id: '123' }
            const decoded = await promisify(jwt.verify)(
                token,
                process.env.JWT_SECRET
            );
            //check if user still exist
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            req.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};
