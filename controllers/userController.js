const User = require("../model/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.auth = async (req, res, next) => {
    try {
        let token = req.header("Authorization").replace("Bearer ", "")
        const data = jwt.verify(token, "cloud-scale")
        const user = await User.findOne({_id: data._id})
        if(!user) {
            throw new Error()
        }
        eq.user = user
        next()
    } catch (error) {
        res.status(401).send("Not Authorized")
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.boy.email})
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        res.status(400).send("Email not found")
        } else {
            user.loggedIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({user, token})
        }
    } catch (error) {
        res.status(400).json ({message: error.message})
    }
}

exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            res.status400.send("Invalid credentials")
        } else {
            const token = await user.generateAuthToken()
            user.loggedIn = false
            await user.save()
            res.json({message: "Logged Out"})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({_id: req.params.id})
        updates.forEach((update) => (user[update] = req.body[update]))
        await user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({message: "User Deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(req.body)//might need to remove req.body
        res.json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.addItem = async (req, res) => {
    try {
        const itemData = req.body
        const user = User.FindOne({_id: req.params.id})
        if (!user) {
            throw new Error("User not found")
        } else {
            const newItem = await Item.create(itemData)
            await newItem.save()
            user.cart.addToSet(newItem)
            await user.save()
            res.json(user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.removeItem = async (req, res) => {
    try {
        const itemData = req.body
        const user = User.FindOne({_id: req.params.id})
        if (!user) {
            throw new Error("No Item found")
        } else {
            
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
