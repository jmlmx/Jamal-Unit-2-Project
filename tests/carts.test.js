const request = require("supertest")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8082, () => console.log("Testing on Port 8080"))
const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const { token } = require("morgan")
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach( async () => {
    await User.deleteMany()
    await Item.deleteMany()
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe("It should test cart endpoints", () => {
    test("It should add an item to a users cart", async () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password28"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .post(`/cart/${user._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Adidas Running Shoes",
                description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
                price: 65
            })

        expect(response.statusCode).toBe(200)
    })

    test("It should remove an item from a users cart", async () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password28"
        })
        const newItem = new Item({
            name: "Adidas Running Shoes",
            description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
            price: 65
        })
        await user.cart.push(newItem)
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .delete(`/cart/${user._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Adidas Running Shoes",
            description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
            price: 65
        })

        expect(response.statusCode).toBe(200)
    })

    test("It should checkout a users cart", async () => {
        const user = new User({
            name: "Jamal Mayon",
            email: "jmayon@web.com",
            password: "password28"
        })
        const newItem = new Item({
            name: "Adidas Running Shoes",
            description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
            price: 65
        })
        const newItem2 = new Item({
            name: "Polo Shirt",
            description: "Ralph Lauren Polo Shirt",
            price: 65
        })
        user.cart.push(newItem)
        user.cart.push(newItem2)
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .put(`/cart/checkout/${user._id}`)
        .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
    })
})