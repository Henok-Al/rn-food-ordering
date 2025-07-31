const Menu = require("../models/MenuItem");

const getAllMenus = async (req, res) => {
  try {
    const allMenus = await Menu.find({});
    if (allMenus?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of menus fetched successfully",
        data: allMenus,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Bo menus found in collection",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getSingleMenuById = async (req, res) => {
  try {
    const getCurrentMenuID = req.params.id;
    const menuDetailsByID = await Menu.findById(getCurrentMenuID);

    if (!menuDetailsByID) {
      return res.status(404).json({
        success: false,
        message:
          "Menu with the current ID is not found! Please try with a different ID",
      });
    }

    res.status(200).json({
      success: true,
      data: menuDetailsByID,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const addNewMenu = async (req, res) => {
  try {
    const newMenuFormData = req.body;
    const newlyCreatedMenu = await Menu.create(newMenuFormData);
    if (newMenuFormData) {
      res.status(201).json({
        success: true,
        message: "Menu added successfully",
        data: newlyCreatedMenu,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const updatedMenuFormData = req.body;
    const getCurrentMenuID = req.params.id;
    const updatedMenu = await Menu.findByIdAndUpdate(
      getCurrentMenuID,
      updatedMenuFormData,
      {
        new: true,
      }
    );

    if (!updatedMenu) {
      res.status(404).json({
        success: false,
        message: "Menu is not found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: updatedMenu,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const getCurrentMenuID = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(getCurrentMenuID);

    if (!deletedMenu) {
      res.status(404).json({
        success: false,
        message: "Menu is not found with this ID",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedMenu,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  getAllMenus,
  getSingleMenuById,
  addNewMenu,
  updateMenu,
  deleteMenu,
};