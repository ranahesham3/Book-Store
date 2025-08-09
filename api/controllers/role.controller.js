const Role = require('../models/Role');
const { createError } = require('../utils/error');

exports.createRole = async (req, res) => {
    try {
        const role = req.body.role;
        if (role && role !== '') {
            await Role.create({ role });
            return res
                .status(200)
                .json({ success: true, message: 'Role is created' });
        }
        return next(createError(400, 'Bad Request'));
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (role) {
            await Role.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            return res
                .status(200)
                .json({ success: true, message: 'Role is updated' });
        }
        return next(createError(400, 'Role not found'));
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res
            .status(400)
            .send({ success: true, count: roles.length, data: roles });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (role) {
            await Role.findByIdAndDelete(req.params.id);
            return res
                .status(200)
                .json({ success: true, message: 'Role is deleted' });
        }
        return next(createError(400, 'Role not found'));
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};
