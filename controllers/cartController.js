const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Add Item To Cart
exports.addItem = async (req, res) => {
    try {
        const user = req.user
        //const user = await User.findOne({_id: req.params.id})
        const itemData = req.body
        if (!user) {
            throw new Error("User not found")
        } else {
            const newItem = await Item.create(itemData)
            await newItem.save()
            await user.cart.addToSet(newItem)
            await user.save()
            res.json(user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Remove Item From Cart
exports.removeItem = async (req, res) => {
    try {
        const user = req.user
        const item = await Item.findOne({_id: req.params.id})
        if (!user) {
            throw new Error("User not found")
        } else {
            await user.cart.remove(item)
            await user.save()
            res.json(req.user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Checkout Cart
exports.checkoutCart = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            throw new Error("User not found")
        } else {
            await user.cart.splice(0, user.cart.length)
            await user.save()
            res.json({user, message: "Items Purchased, Thanks For Shopping!"})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}