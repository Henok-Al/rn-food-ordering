const express = require("express");
const router = express.Router();
const { getMenu, getMenuItem, addMenuItem } = require("../controllers/menuController.js");

router.get("/", getMenu);
router.get("/:id", getMenuItem);

router.post("/add", addMenuItem); 

module.exports = router;



