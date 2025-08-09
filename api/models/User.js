const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'This email has already been registered'],
            validate: [validator.isEmail, 'please provide a valid email'],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'A password must have at least 8 characters'],
            select: false,
        },
        profileImage: {
            type: String,
            default:
                'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        roles: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Role',
            required: true,
        },
        passwordResetExpires: {
            type: Date,
            default: Date.now() + 1000 * 10,
        },
    },
    {
        //will store the created and updated date for us
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
