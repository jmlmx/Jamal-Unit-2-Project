const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// Create An Item
exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// Get All Items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({})
        res.json(items)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Get An Item
exports.getAnItem = async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.id})
        res.json({item})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// Update An Item
exports.updateAnItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({_id: req.params.id})
        updates.forEach((update) => (item[update] = req.body[update]))
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete An Item
exports.deleteAnItem = async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.id})
        await item.deleteOne()
        res.json({message: "Item Deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}