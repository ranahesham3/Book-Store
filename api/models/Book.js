const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        isbn13: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        authors: {
            type: String,
            required: true,
        },
        pages: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    {
        //will store the created and updated date for us
        timestamps: true,
    }
);

// const book = mongoose.model('book', bookSchema);
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
module.exports = Book;
