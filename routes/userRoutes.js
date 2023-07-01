const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


router.get("/", userController.getUsers)// get all users

router.get("/:id", userController.getAUser)// get a specific user

router.post("/", userController.createUser) //create a user

router.post("/login", userController.auth, userController.loginUser)// login a user

router.post("/:id", userController.auth, userController.logoutUser)// logout a user

router.put("/:id", userController.auth, userController.updateUser)// update a user

router.put("/cart/:id", userController.auth, userController.addItem)// add items to users cart

router.put("/checkout/:id", userController.auth, userController.checkoutUser)//checkout a user

router.delete("/cart/:id", userController.auth, userController.removeItem)//remove item from a users cart

router.delete("/:id", userController.auth, userController.deleteUser)// delete user

module.exports = router