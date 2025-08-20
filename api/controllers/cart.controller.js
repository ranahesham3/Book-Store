const Cart = require('../models/Cart');
const Book = require('../models/Book');
const { createError } = require('../utils/error');

exports.AddBook = async (req, res, next) => {
    try {
        if (!req.user)
            return next(createError(401, 'Not authorized ,Log in first!'));
        let { isbn13, quantity } = req.body;
        if (!quantity) quantity = 1;
        // 1. Check if the book exists
        const book = await Book.findOne({ isbn13 });
        if (!book) {
            return next(createError(404, 'Book not found!'));
        }

        // 2. Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // Create a new cart with this book
            cart = await Cart.create({
                user: req.user.id,
                book: [
                    {
                        details: book._id,
                        price: book.price * quantity,
                        count: +quantity,
                    },
                ],
            });
        } else {
            // Avoid duplicate book IDs in the cart
            let found = false;
            for (let e of cart.book) {
                if (e.details._id.equals(book._id)) {
                    e.price += book.price * quantity;
                    e.count += +quantity;

                    found = true;
                    break;
                }
            }

            if (!found) {
                cart.book.push({
                    details: book._id,
                    price: book.price * quantity,
                    count: +quantity,
                });
            }
            await cart.save();
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
        if (!req.user)
            return next(createError(401, 'Not authorized ,Log in first!'));

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

exports.deleteBook = async (req, res, next) => {
    try {
        if (!req.user)
            return next(createError(401, 'Not authorized ,Log in first!'));

        const { isbn13 } = req.body;

        // 1. Check if the book exists
        const book = await Book.findOne({ isbn13 });
        if (!book) {
            return next(createError(404, 'Book not found!'));
        }

        // 2. Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });
        cart.book = cart.book.filter((e) => !e.details._id.equals(book._id));
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

exports.updateBook = async (req, res, next) => {
    try {
        if (!req.user)
            return next(createError(401, 'Not authorized ,Log in first!'));

        const { isbn13, quantity } = req.body;

        // 1. Check if the book exists
        const book = await Book.findOne({ isbn13 });
        if (!book) {
            return next(createError(404, 'Book not found!'));
        }

        // 2. Find user's cart
        let cart = await Cart.findOne({ user: req.user.id });

        for (let e of cart.book) {
            if (e.details._id.equals(book._id)) {
                e.price = book.price * quantity;
                e.count = +quantity;

                break;
            }
        }
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully!',
        });
    } catch (err) {
        console.error(err);
        next(createError(500, 'Internal server error!'));
    }
};
