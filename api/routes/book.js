const express = require('express');

const bookController = require('../controllers/book.controller');

const router = express.Router();
router.get('/', bookController.getAllBooks);
router.get('/:isbn13', bookController.getBook);

module.exports = router;
