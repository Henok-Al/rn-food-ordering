const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: false, // Optional for now until we fully implement multi-tenancy
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    tipAmount: {
        type: Number,
        default: 0,
    },
    driverTip: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'delivering', 'delivered', 'cancelled'],
        default: 'pending',
    },
    statusHistory: [
        {
            status: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        }
    ],
    deliveryAddress: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
    },
}, { timestamps: true });

// Middleware to update statusHistory when status changes
orderSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.statusHistory.push({ status: this.status });
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
