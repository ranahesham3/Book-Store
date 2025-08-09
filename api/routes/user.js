const express = require('express');
const userContoller = require('../controllers/user.controller');
const verify = require('../utils/verifyToken');

const router = express.Router();

//get all users

router.get('/', verify.verifyUser, userContoller.getAllUsers);

//get a specific user
router.get('/:id', verify.verifyAdmin, userContoller.getUser);

module.exports = router;
