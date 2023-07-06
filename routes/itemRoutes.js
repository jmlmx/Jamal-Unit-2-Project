const express = require("express")
const router = express.Router()
const itemController = require("../controllers/itemController")


// Create An Item
router.post("/", itemController.createItem)

// Get All Items
router.get("/", itemController.getAllItems)

// Get An Item
router.get("/:id", itemController.getAnItem)

// Update An Item
router.put("/:id", itemController.updateAnItem)

// Delete An Item
router.delete("/:id", itemController.deleteAnItem)

module.exports = router