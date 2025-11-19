const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { // Added password for auth
        type: String,
        required: false, // Optional for now as we might use social auth
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'restaurant_owner'],
        default: 'user',
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
