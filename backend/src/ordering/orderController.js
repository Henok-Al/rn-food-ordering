const Order = require("./Order");
const Menu = require("../catalog/Menu");

// POST /api/v1/orders
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, contactPhone, tipAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!deliveryAddress || !contactPhone) {
      return res.status(400).json({ message: "Delivery address and phone are required" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const orderItem of items) {
      const menuItem = await Menu.findById(orderItem.id);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${orderItem.id} not found` });
      }

      totalAmount += menuItem.price * orderItem.quantity;
      orderItems.push({
        menuItem: menuItem._id,
        quantity: orderItem.quantity,
      });
    }

    // Add tip to total
    const finalTip = tipAmount || 0;
    totalAmount += finalTip;

    const newOrder = new Order({
      items: orderItems,
      totalAmount,
      tipAmount: finalTip,
      deliveryAddress,
      contactPhone,
      status: 'pending',
      statusHistory: [{ status: 'pending' }]
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ error: err.message });
  }
};

// GET /api/v1/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.menuItem");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/v1/orders/:id/review
exports.addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== 'delivered') {
      return res.status(400).json({ message: "Can only review delivered orders" });
    }

    order.rating = rating;
    order.review = review;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/v1/orders/:id/reorder
exports.reorder = async (req, res) => {
  try {
    const oldOrder = await Order.findById(req.params.id);
    if (!oldOrder) return res.status(404).json({ message: "Order not found" });

    // Create new order with same items
    // Recalculate price in case menu prices changed
    let totalAmount = 0;
    const orderItems = [];

    for (const item of oldOrder.items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (menuItem) { // Only add if item still exists
        totalAmount += menuItem.price * item.quantity;
        orderItems.push({
          menuItem: menuItem._id,
          quantity: item.quantity
        });
      }
    }

    const newOrder = new Order({
      items: orderItems,
      totalAmount, // No tip by default on reorder
      deliveryAddress: oldOrder.deliveryAddress,
      contactPhone: oldOrder.contactPhone,
      status: 'pending',
      statusHistory: [{ status: 'pending' }]
    });

    await newOrder.save();
    res.status(201).json(newOrder);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
