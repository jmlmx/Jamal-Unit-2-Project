const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// get all users
router.get("/", userController.getUsers)

// get a specific user
router.get("/:id", userController.getAUser)

//create a user
router.post("/", userController.createUser) 

// login a user
router.post("/login", userController.auth, userController.loginUser)

// logout a user
router.post("/logout", userController.auth, userController.logoutUser)

// update a user
router.put("/:id", userController.auth, userController.updateUser)

// delete user
router.delete("/:id", userController.auth, userController.deleteUser)

module.exports = router