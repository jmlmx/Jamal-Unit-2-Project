const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const cartController = require("../controllers/cartController")

router.post("/cart/:id", userController.auth, cartController.addItem)// add items to users cart

router.delete("/cart/:id", userController.auth, cartController.removeItem)//remove item from a users cart

router.put("/checkout/:id", userController.auth, cartController.checkoutCart)//checkout a user


module.exports = router