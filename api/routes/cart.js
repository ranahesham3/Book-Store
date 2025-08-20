const express = require('express');

const cartController = require('../controllers/cart.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();
router.get('/', authController.isLoggedIn, cartController.getAllBooks);
router.post('/', authController.isLoggedIn, cartController.AddBook);
router.post('/delete', authController.isLoggedIn, cartController.deleteBook);
router.patch('/update', authController.isLoggedIn, cartController.updateBook);

module.exports = router;
