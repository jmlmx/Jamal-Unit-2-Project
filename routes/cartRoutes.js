const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")

// add items to users cart
router.post("/cart/:id", userController.auth, cartController.addItem)

//remove item from a users cart
router.delete("/cart/:id", userController.auth, cartController.removeItem)

//checkout a user
router.put("/cart/checkout/:id", userController.auth, cartController.checkoutCart)


module.exports = router