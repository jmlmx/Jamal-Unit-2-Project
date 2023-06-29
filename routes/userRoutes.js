const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/", userController.createUser) //create a user
router.get("/", userController.getUsers)// get all users
router.get("/:id", userController.getAUser)// get a specific user
router.post("/login", userController.auth, userController.loginUser)// login a user
router.put("/:id", userController.auth, userController.updateUser)// update a user
router.put("/cart/:id", userController.auth, userController.addItem)// add items to users cart
router.delete("/cart/:id", userController.auth, userController.removeItem)//remove item from a users cart
router.put("/checkout/:id", userController.auth, userController.checkoutUser)//checkout a user
router.post("/:id", userController.auth, userController.logoutUser)// logout a user
router.delete("/:id", userController.auth, userController.deleteUser)// delete user

module.exports = router