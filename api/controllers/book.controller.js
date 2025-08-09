const Book = require('../models/Book');
const Role = require('../models/Book');
const { createError } = require('../utils/error');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res
            .status(200)
            .json({ success: true, count: books.length, data: books });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};

exports.getBook = async (req, res) => {
    try {
        const isbn13 = req.params.isbn13;
        const book = await Book.findOne({ isbn13 });
        return res.status(200).json({ success: true, data: book });
    } catch (err) {
        next(createError(500, 'Internal server error!'));
    }
};
