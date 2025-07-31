const express = require("express");
const {
  getAllMenus,
  getSingleMenuById,
  updateMenu,
  deleteMenu,
  addNewMenu,
} = require("../controllers/menuController");

//create express router
const router = express.Router();

//all routes that are related to menus only
router.get("/get", getAllMenus);
router.get("/get/:id", getSingleMenuById);
router.post("/add", addNewMenu);
router.put("/update/:id", updateMenu);
router.delete("/delete/:id", deleteMenu);

module.exports = router;