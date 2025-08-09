const express = require('express');

const authController = require('../controllers/auth.controller');

const router = express.Router();

//register
router.post('/register', authController.register);
router.post('/register-admin', authController.registerAdmin);

//login
router.post('/login', authController.login);

router.post('/send-email', authController.sendEmail);

router.post('/reset-password', authController.resetPassword);

router.get('/logout', authController.logout);
module.exports = router;
