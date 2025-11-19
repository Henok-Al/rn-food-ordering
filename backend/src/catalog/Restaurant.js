const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    settings: {
        currency: { type: String, default: 'USD' },
        deliveryRadius: { type: Number, default: 10 }, // in km
    }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
