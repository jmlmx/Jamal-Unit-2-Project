const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Add Item To Cart
exports.addItem = async (req, res) => {
    try {
        const itemData = req.body
        if (!req.user) {
            throw new Error("User not found")
        } else {
            const newItem = await Item.create(itemData)
            await newItem.save()
            await req.user.cart.addToSet(newItem)
            await req.user.save()
            res.json(req.user)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Remove Item From Cart
exports.removeItem = async (req, res) => {
    try {
        const item = req.body
        if (!req.user) {
            throw new Error("User not found")
        } else {
            await req.user.cart.removeItem(item)
            // await req.user.cart.updateOne(
            //     {_id: ObjectId(item._id)},
            //     {$pull: {item}}
            // )
            await req.user.save()
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
        if(!req.user) {
            throw new Error("User not found")
        } else {
            await req.user.cart.removeAll()
            await req.user.save()
            res.json({user, message: "Items Purchased, Thanks For Shopping!"})
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}