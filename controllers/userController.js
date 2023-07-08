require("dotenv").config()
const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Authorization
exports.auth = async (req, res, next) => {
    try {
        let token = req.header("Authorization").replace("Bearer ", "")
        const data = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({_id: data._id})
        if(!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("Not Authorized")
    }
}

// Create A User
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.json({user, token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Get A Specific User
exports.getAUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.json({user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// Login A User
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.status(400).send("Email not found")
        } else {
            user.loggedIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({user, message: "Logged In", token})
        }
    } catch (error) {
        res.status(400).json ({message: error.message})
    }
}

// Logout A User
exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            res.status400.send("Invalid credentials")
        } else if (req.user.loggedIn === "false") {
            res.send({message: "User already logged out"})
        } else {
            user.loggedIn = false
            await user.save()
            res.json({user, message: "Logged Out"})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update A User
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach((update) => (req.user[update] = req.body[update]))
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete A User
exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({message: "User Deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
