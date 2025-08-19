const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

// POST /order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalPrice = 0;

    for (const orderItem of items) {
      const menuItem = await MenuItem.findById(orderItem.id);
      if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

      totalPrice += menuItem.price * orderItem.quantity;
    }

    const newOrder = new Order({
      items: items.map(i => ({ menuItem: i.id, quantity: i.quantity })),
      totalPrice
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /order/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.menuItem");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



