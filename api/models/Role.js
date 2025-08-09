const mongoose = require('mongoose');

const roleSchema = mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
        },
    },
    {
        //will store the created and updated date for us
        timestamps: true,
    }
);

// const Role = mongoose.model('Role', roleSchema);
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
module.exports = Role;
