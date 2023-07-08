const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")

// add items to users cart
router.post("/:id", userController.auth, cartController.addItem)

//remove item from a users cart
router.delete("/:id", userController.auth, cartController.removeItem)

//checkout a user
router.put("/checkout/:id", userController.auth, cartController.checkoutCart)


module.exports = router