const express = require("express");
const {
  createOrder,
  // getOrders,
  getOrderById,
  // updateOrderStatus,
  // deleteOrder
} = require("../controllers/orderController");

// Create express router
const router = express.Router();

// All routes related to orders
router.post("/add", createOrder);
// router.get("/all", getOrders);
router.get("/get/:id", getOrderById);
// router.patch("/update/:id", updateOrderStatus);
// router.delete("/delete/:id", deleteOrder);

module.exports = router;
