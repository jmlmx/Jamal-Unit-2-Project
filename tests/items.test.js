const request = require("supertest")
const mongoose = require("mongoose")
const {MongoMemoryServer} = require("mongodb-memory-server")
const app = require("../app")
const server = app.listen(8081, () => console.log("Testing on Port 8080"))
const User = require("../models/user")
const Cart = require("../models/cart")
const Item = require("../models/item")
const { token } = require("morgan")
const { addItem } = require("../controllers/cartController")
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterEach( async () => {
    await Item.deleteMany()
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})


describe("Test the item endpoints", () => {
    test("It should create an item", async () => {
        const response = await request(app)
            .post("/items")
            .send({
                name: "bananas",
                description: "A delicious bundle of dole bananas",
                price: 1.50
            })
            console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual("bananas")
        expect(response.body.description).toEqual("A delicious bundle of dole bananas")
        expect(response.body.price).toBe(1.50)
    })

    test("It should get a specific item", async () => {
        const item = new Item({
            name: "strawberries",
            description: "delicious bundle of plump, natural strawberries",
            price: 3.50
        })
        await item.save()

        const response = await request(app)
            .get(`/items/${item._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.item._id).toEqual(item.id)
    })

    test("It should update an item", async () => {
        const item = new Item({
            name: "Adidas Running Shoes",
            description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
            price: 65
        })
        await item.save()

        const response = await request(app)
            .put(`/items/${item._id}`)
            .send({
                name: "Adidas Running Shoes",
                description: "A super comfortable pair of Adidas Max Lite Runner Sneakers",
                price: 75
            })
        
        expect(response.statusCode).toBe(200)
        expect(response.body.price).toBe(75)
    })

    test("It should get all items", async () => {
        const item1 = new Item({
            name: "Adidas Running Shoes",
            description: "A comfortable pair of Adidas Max Lite Runner Sneakers",
            price: 65
        })
        await item1.save()

        const item2 = new Item({
            name: "strawberries",
            description: "delicious bundle of plump, natural strawberries",
            price: 3.50
        })
        await item2.save()

        const items = [item1, item2]

        const response = await request(app).get("/items")
        expect(response.statusCode).toBe(200)
    })

    test("It should delete an item", async () => {
        const item = new Item({
            name: "strawberries",
            description: "delicious bundle of plump, natural strawberries",
            price: 3.50
        })
        await item.save()

        const response = await request(app)
            .delete(`/items/${item._id}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual("Item Deleted")
    })
})