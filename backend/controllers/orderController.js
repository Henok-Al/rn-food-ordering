const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });  }
};

// Get all orders
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ error: 'Order not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete an order
// const deleteOrder = async (req, res) => {
//   try {
//     const deleted = await Order.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Order not found' });
//     res.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createOrder,
  // getOrders,
  getOrderById,
  // updateOrderStatus,
  // deleteOrder
};
