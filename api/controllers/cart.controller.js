const Cart = require('../models/Cart');
const Book = require('../models/Book');
const { createError } = require('../utils/error');

exports.AddBook = async (req, res, next) => {
    try {
        const { isbn13 } = req.body;

        // 1. Check if the book exists
        const book = await Book.findOne({ isbn13 });
        if (!book) {
            return next(createError(404, 'Book not found!'));
        }

        // 2. Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create a new cart with this book
            cart = await Cart.create({ user: req.user.id, book: [book._id] });
        } else {
            // Avoid duplicate book IDs in the cart
            if (!cart.book.includes(book._id)) {
                cart.book.push(book._id);
                await cart.save();
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Book added successfully!',
        });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(200).json({ success: true, count: 0, data: [] });
        }

        return res.status(200).json({
            success: true,
            count: cart.book.length,
            data: cart.book,
        });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Internal server error!'));
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { isbn13 } = req.body;

        // 1. Check if the book exists
        const book = await Book.findOne({ isbn13 });
        if (!book) {
            return next(createError(404, 'Book not found!'));
        }

        // 2. Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });
        cart.book = cart.book.filter((id) => !id.equals(book._id));
        await cart.save();
        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully!',
        });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Internal server error!'));
    }
};
