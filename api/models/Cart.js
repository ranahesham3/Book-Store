const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Cart must belong to a user'],
        },
        book: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Book',
                required: [true, ''],
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

cartSchema.pre(/^find/, function (next) {
    //this query won't happen that often
    this.populate('user').populate('book');
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
