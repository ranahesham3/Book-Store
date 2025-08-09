const express = require('express');

const roleController = require('../controllers/role.controller');
const verify = require('../utils/verifyToken');

const router = express.Router();

//create a new role
router.post('/', verify.verifyAdmin, roleController.createRole);

//update a role
router.put('/:id', verify.verifyAdmin, roleController.updateRole);

//get all roles
router.get('/', roleController.getAllRoles);

//delete role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
