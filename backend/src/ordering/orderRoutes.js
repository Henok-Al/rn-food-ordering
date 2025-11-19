const express = require("express");
const router = express.Router();
const { createOrder, getOrder, addReview, reorder } = require("./orderController");

router.post("/", createOrder);
router.get("/:id", getOrder);
router.post("/:id/review", addReview);
router.post("/:id/reorder", reorder);

module.exports = router;






